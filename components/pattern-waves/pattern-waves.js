/*!
 * Pattern Waves 波纹图案 —— ReactBits Canvas 2D 移植（零依赖，原版为 WebGL/ogl）
 * 公式来源（Pattern Waves.txt）：
 *   L279-301 surface：silk h = sin(dot(p,dir)*5.5 - t*0.45) + 0.32*sin(2*phase+1.3)
 *                     （bend 保留原正弦项 0.4*sin(v*1.6+t*0.2)，gradientNoise 按 Canvas 2D 预算省略）
 *   L352-379 涟漪：next = (邻和*0.5 - 上帧)*0.975，高斯脉冲 exp(-d*d*2)
 *   法线数值差分 ±4px；tone = clamp(dot(N,L)*0.78 + spec)；圆半径 = markSize*spacing*sqrt(tone)*0.5
 * 接口：LZY.Comp.PatternWaves.init(el, options) → { destroy(), setOptions(o), el }
 */
(function () {
  'use strict';

  var WAVE_UNIT = 520;
  var RIPPLE_CELL = 8;
  var RIPPLE_RATE = 60;
  var RIPPLE_DAMPING = 0.975;
  var PIXEL_BUDGET = 4.5e6;
  var INTRO_SECONDS = 2;
  var DIFF_EPS = 4;          /* 法线差分半步长，±4px */
  var BUCKETS = 10;          /* alpha 分桶批量填充 */
  var TAU = Math.PI * 2;

  var SURFACE_PRESETS = {
    silk:     { pattern: 'dot',   wave: 'silk',   spacing: 9,  markSize: 0.95, depth: 0.95, light: 0, shine: 0.8,  contrast: 1.2,  speed: 0.35, scale: 1,   direction: 20 },
    ocean:    { pattern: 'dot',   wave: 'swell',  spacing: 10, markSize: 0.9,  depth: 0.42, light: 0, shine: 1,    contrast: 1.2,  speed: 0.5,  scale: 1,   direction: 100 },
    pond:     { pattern: 'dot',   wave: 'ripple', spacing: 10, markSize: 0.9,  depth: 0.55, light: 0, shine: 1.2,  contrast: 1.2,  speed: 0.5,  scale: 1,   direction: 35 },
    lines:    { pattern: 'line',  wave: 'silk',   spacing: 12, markSize: 0.42, depth: 0.9,  light: 0, shine: 0.6,  contrast: 1.2,  speed: 0.3,  scale: 1,   direction: 20 },
    terminal: { pattern: 'glyph', wave: 'ripple', spacing: 13, markSize: 0.95, depth: 0.75, light: 0, shine: 0.9,  contrast: 1.4,  speed: 0.3,  scale: 1.1, direction: 200 },
    mesh:     { pattern: 'plus',  wave: 'silk',   spacing: 14, markSize: 0.8,  depth: 0.95, light: 0, shine: 1,    contrast: 1.45, speed: 0.4,  scale: 1.1, direction: 325 }
  };
  var PATTERNS = { dot: 0, square: 1, plus: 2, line: 3, glyph: 4 };
  var WAVES = { silk: 0, swell: 1, ripple: 2 };
  var FADES = { none: 0, edges: 1, center: 2, bottom: 3, top: 4 };
  var DEFAULT_CHARACTERS = '.:-=+*#%@';
  var GLYPH_FONT = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

  var clamp = function (value, min, max) { return Math.min(Math.max(value, min), max); };
  var sstep = function (a, b, x) {
    var t = clamp((x - a) / (b - a), 0, 1);
    return t * t * (3 - 2 * t);
  };
  var luminance = function (rgb) { return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]; };

  var parseColor = function (value, fallback) {
    try {
      var ctx = document.createElement('canvas').getContext('2d');
      if (!ctx) return fallback;
      ctx.fillStyle = '#000000';
      ctx.fillStyle = value;
      var resolved = ctx.fillStyle;
      if (resolved.charAt(0) === '#') {
        var n = parseInt(resolved.slice(1), 16);
        return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255, 1];
      }
      var parts = resolved.match(/[\d.]+/g);
      if (!parts || parts.length < 3) return fallback;
      return [Number(parts[0]) / 255, Number(parts[1]) / 255, Number(parts[2]) / 255, parts[3] != null ? Number(parts[3]) : 1];
    } catch (e) { return fallback; }
  };

  /* 波面高度场（场坐标 p = css/unit，y 向上） */
  function surface(px, py, t, dirx, diry, wave) {
    if (wave === 0) { /* silk：txt L279-290 直译（noise 项以三角函数近似省略） */
      var u = px * dirx + py * diry;
      var v = -px * diry + py * dirx;
      var bend = 0.4 * Math.sin(v * 1.6 + t * 0.2);
      var phase = u * 5.5 + bend - t * 0.45;
      var fold = Math.sin(phase) + 0.32 * Math.sin(2 * phase + 1.3);
      var rip = 0.16 * Math.sin(u * 5.5 * 2.5 + bend * 1.9 - t * 0.9 + 2.1);
      return fold + rip;
    }
    if (wave === 1) { /* swell：L291-296 */
      var pu = px * dirx + py * diry;
      var ph = pu * 15 - t * 1.4;
      return 0.8 * (Math.sin(ph) + 0.3 * Math.sin(2 * ph - 0.8));
    }
    /* ripple：L297-300 */
    var rx = px + dirx * 1.2, ry = py + diry * 1.2;
    var r = Math.sqrt(rx * rx + ry * ry);
    return Math.sin(r * 9 - t * 1.8) * (0.45 + 0.55 * Math.exp(-(r - 0.6) * 0.8));
  }

  function buildSettings(target, o, base) {
    var pick = function (key, fallback) {
      if (o && o[key] != null) return o[key];
      if (base && base[key] != null) return base[key];
      return target ? target[key] : fallback;
    };
    var s = target || {};
    s.pattern = String(pick('pattern', 'dot'));
    if (s.pattern === 'line') s.pattern = 'dot'; /* Canvas 2D 未移植 line 轮廓，降级 dot */
    s.wave = String(pick('wave', 'silk'));
    s.spacing = clamp(Number(pick('spacing', 9)) || 9, 4, 120);
    s.markSize = clamp(Number(pick('markSize', 0.95)), 0.05, 1);
    s.depth = clamp(Number(pick('depth', 0.95)), 0, 1.5);
    s.light = clamp(Number(pick('light', 0)) || 0, -90, 90);
    s.shine = clamp(Number(pick('shine', 0.8)), 0, 2);
    s.contrast = clamp(Number(pick('contrast', 1.2)), 0.3, 3);
    s.speed = Number(pick('speed', 0.35)) || 0;
    s.scale = clamp(Number(pick('scale', 1)), 0.2, 5);
    s.direction = Number(pick('direction', 20)) || 0;
    if (o && o.color != null) s.color = String(o.color);
    else if (!s.color) s.color = '#ffffff';
    if (o && o.backgroundColor != null) s.backgroundColor = String(o.backgroundColor);
    else if (!s.backgroundColor) s.backgroundColor = '#000000';
    s.opacity = o && o.opacity != null ? clamp(Number(o.opacity), 0, 1) : (s.opacity != null ? s.opacity : 1);
    s.fade = o && o.fade != null ? String(o.fade) : (s.fade || 'edges');
    s.fadeSize = o && o.fadeSize != null ? clamp(Number(o.fadeSize), 0.05, 1) : (s.fadeSize != null ? s.fadeSize : 0.5);
    if (o && o.characters != null) s.characters = String(o.characters);
    else if (!s.characters) s.characters = DEFAULT_CHARACTERS;
    s.interactive = o && o.interactive != null ? !!o.interactive : (s.interactive != null ? s.interactive : true);
    s.cursorSize = o && o.cursorSize != null ? clamp(Number(o.cursorSize), 8, 400) : (s.cursorSize != null ? s.cursorSize : 50);
    s.cursorStrength = o && o.cursorStrength != null ? clamp(Number(o.cursorStrength), 0, 1) : (s.cursorStrength != null ? s.cursorStrength : 0.6);
    s.intro = o && o.intro != null ? !!o.intro : (s.intro != null ? s.intro : true);
    s.paused = o && o.paused != null ? !!o.paused : (s.paused != null ? s.paused : false);
    return s;
  }

  function init(el, options) {
    if (!el || el.nodeType !== 1) return null;

    var presetName = (options && options.preset) || 'silk';
    var base = SURFACE_PRESETS[presetName] || SURFACE_PRESETS.silk;
    var settings = buildSettings(null, options, base);

    el.classList.add('cz-waves');
    var canvas = document.createElement('canvas');
    canvas.className = 'cz-waves__canvas';
    canvas.setAttribute('aria-hidden', 'true');
    el.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    if (!ctx) {
      el.classList.remove('cz-waves');
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      return { el: el, setOptions: function () {}, destroy: function () {} };
    }

    var reduce = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
    var width = 1, height = 1, dprEff = 1;
    var time = 0;
    var introClock = settings.intro && !reduce ? 0 : 1;
    var visible = true, alive = true, dirty = true;
    var raf = 0, last = 0;
    var ripple = null, rippleLive = false, rippleClock = 0, rippleUntil = 0;
    var pointer = { x: 0, y: 0, inside: false, placed: false, lastX: 0, lastY: 0, burst: 0 };

    /* ---- 涟漪：粗网格双缓冲（txt L352-379） ---- */
    var buildRipple = function () {
      var w = clamp(Math.ceil(width / RIPPLE_CELL), 4, 512);
      var h = clamp(Math.ceil(height / RIPPLE_CELL), 4, 512);
      if (ripple && ripple.w === w && ripple.h === h) return;
      ripple = { w: w, h: h, cur: new Float32Array(w * h), prev: new Float32Array(w * h) };
      rippleLive = false;
    };

    var clearRipple = function () {
      if (!ripple) return;
      ripple.cur.fill(0);
      ripple.prev.fill(0);
    };

    var simulate = function (impulse, fx, fy, tx, ty, radius) {
      var cur = ripple.cur, prev = ripple.prev;
      var w = ripple.w, h = ripple.h, i, j;
      for (j = 0; j < h; j++) {
        var row = j * w;
        var up = (j > 0 ? j - 1 : j) * w;
        var dn = (j < h - 1 ? j + 1 : j) * w;
        for (i = 0; i < w; i++) {
          var l = cur[row + (i > 0 ? i - 1 : i)];
          var r = cur[row + (i < w - 1 ? i + 1 : i)];
          var v = (l + r + cur[up + i] + cur[dn + i]) * 0.5 - prev[row + i];
          prev[row + i] = v * RIPPLE_DAMPING;
        }
      }
      if (impulse > 0.0001) {
        var reach = radius * 2.2;
        var x0 = Math.max(0, Math.floor((Math.min(fx, tx) - reach) / RIPPLE_CELL));
        var x1 = Math.min(w - 1, Math.ceil((Math.max(fx, tx) + reach) / RIPPLE_CELL));
        var y0 = Math.max(0, Math.floor((Math.min(fy, ty) - reach) / RIPPLE_CELL));
        var y1 = Math.min(h - 1, Math.ceil((Math.max(fy, ty) + reach) / RIPPLE_CELL));
        var segx = tx - fx, segy = ty - fy;
        var len2 = Math.max(segx * segx + segy * segy, 1e-4);
        for (j = y0; j <= y1; j++) {
          for (i = x0; i <= x1; i++) {
            var dx = (i + 0.5) * RIPPLE_CELL - fx;
            var dy = (j + 0.5) * RIPPLE_CELL - fy;
            var tt = clamp((dx * segx + dy * segy) / len2, 0, 1);
            var cdx = dx - segx * tt, cdy = dy - segy * tt;
            var d = Math.sqrt(cdx * cdx + cdy * cdy) / radius;
            prev[j * w + i] -= impulse * Math.exp(-d * d * 2);
          }
        }
      }
      ripple.cur = prev;
      ripple.prev = cur;
    };

    var stepRipple = function (s, dt) {
      rippleClock = Math.min(rippleClock + dt * RIPPLE_RATE, 4);
      var strength = s.cursorStrength;
      var moved = Math.hypot(pointer.x - pointer.lastX, pointer.y - pointer.lastY);
      var impulse = (pointer.inside ? Math.min(moved / 14, 1) * 0.35 * strength : 0) + pointer.burst * strength;
      pointer.burst = 0;
      while (rippleClock >= 1) {
        rippleClock -= 1;
        simulate(impulse, pointer.lastX, pointer.lastY, pointer.x, pointer.y, s.cursorSize);
        impulse = 0;
      }
      pointer.lastX = pointer.x;
      pointer.lastY = pointer.y;
    };

    var rippleSample = function (cx, cy) {
      var gx = cx / RIPPLE_CELL - 0.5, gy = cy / RIPPLE_CELL - 0.5;
      var i = Math.floor(gx), j = Math.floor(gy);
      var fx = gx - i, fy = gy - j;
      var w = ripple.w, h = ripple.h;
      var x0 = clamp(i, 0, w - 1), x1 = clamp(i + 1, 0, w - 1);
      var y0 = clamp(j, 0, h - 1), y1 = clamp(j + 1, 0, h - 1);
      var cur = ripple.cur;
      var a = cur[y0 * w + x0], b = cur[y0 * w + x1], c = cur[y1 * w + x0], d = cur[y1 * w + x1];
      return (a * (1 - fx) + b * fx) * (1 - fy) + (c * (1 - fx) + d * fx) * fy;
    };

    /* ---- 每帧绘制 ---- */
    var draw = function (s, amp, appearVal) {
      ctx.setTransform(dprEff, 0, 0, dprEff, 0, 0);
      var bg = s._bg || (s._bg = parseColor(s.backgroundColor, [0, 0, 0, 1]));
      if (bg[3] > 0.004) {
        ctx.globalAlpha = 1;
        ctx.fillStyle = s.backgroundColor;
        ctx.fillRect(0, 0, width, height);
      } else {
        ctx.clearRect(0, 0, width, height);
      }

      var patternIdx = PATTERNS[s.pattern] != null ? PATTERNS[s.pattern] : 0;
      var waveIdx = WAVES[s.wave] != null ? WAVES[s.wave] : 0;
      var fadeIdx = FADES[s.fade] != null ? FADES[s.fade] : 1;
      var unit = WAVE_UNIT * s.scale;
      var heading = s.direction * Math.PI / 180;
      var dirx = Math.cos(heading), diry = Math.sin(heading);
      var lightAngle = (s.direction + 180 + s.light) * Math.PI / 180;
      var Lx = Math.cos(lightAngle) * 0.78, Ly = Math.sin(lightAngle) * 0.78, Lz = 0.62;
      var hl = Math.hypot(Lx, Ly, Lz + 1);
      var hx2 = Lx / hl, hy2 = Ly / hl, hz2 = (Lz + 1) / hl;
      var col = s._col || (s._col = parseColor(s.color, [1, 1, 1, 1]));
      var ink = bg[3] > 0.02 ? luminance(col) < luminance(bg) : luminance(col) < 0.5;
      var tint = ink ? 0 : 1;
      var blend = ink ? 0.35 : 0.55;
      var accent = s._accent;
      if (!accent || s._accentKey !== s.color) {
        accent = s._accent = [
          col[0] + (tint - col[0]) * blend,
          col[1] + (tint - col[1]) * blend,
          col[2] + (tint - col[2]) * blend
        ];
        s._accentKey = s.color;
      }
      var halfDiag = Math.max(0.5 * Math.hypot(width, height), 1);

      var pitch = s.spacing;
      var cols = Math.min(4096, Math.ceil(width / pitch) + 1);
      var rows = Math.min(4096, Math.ceil(height / pitch) + 2);
      var originX = Math.floor((width - cols * pitch) / 2);
      var originY = Math.floor((height - rows * pitch) / 2);
      var fadeSize = s.fadeSize;
      var opacity = s.opacity;
      var markSpan = pitch * s.markSize;
      var plusHalf = Math.max(1.1 * dprEff, pitch * 0.08) * 0.5;

      if (patternIdx === 4) {
        ctx.fillStyle = ink ? s.color : s.color;
        ctx.font = '500 ' + Math.max(6, Math.round(markSpan * 0.86)) + 'px ' + GLYPH_FONT;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
      } else {
        var mainPaths = new Array(BUCKETS), highPaths = new Array(BUCKETS);
        for (var b = 0; b < BUCKETS; b++) { mainPaths[b] = null; highPaths[b] = null; }
      }

      var e = DIFF_EPS;
      var inv2e = 1 / (2 * e);

      for (var j = 0; j < rows; j++) {
        var cy0 = originY + (j + 0.5) * pitch;
        for (var i = 0; i < cols; i++) {
          var cx = originX + (i + 0.5) * pitch;
          var cy = cy0;

          /* 高度 + 中心对称数值差分法线（±4px） */
          var pxc = (cx - 0.5 * width) / unit;
          var pyc = (0.5 * height - cy) / unit;
          var sxm = surface((cx - e - 0.5 * width) / unit, pyc, time, dirx, diry, waveIdx) * amp;
          var sxp = surface((cx + e - 0.5 * width) / unit, pyc, time, dirx, diry, waveIdx) * amp;
          var sym = surface(pxc, (0.5 * height - (cy - e)) / unit, time, dirx, diry, waveIdx) * amp;
          var syp = surface(pxc, (0.5 * height - (cy + e)) / unit, time, dirx, diry, waveIdx) * amp;
          var h0 = surface(pxc, pyc, time, dirx, diry, waveIdx) * amp;
          var hxe = (sxp - sxm) * inv2e;
          var hye = (syp - sym) * inv2e;
          if (rippleLive) {
            h0 += rippleSample(cx, cy) * 0.32;
            hxe += (rippleSample(cx + e, cy) - rippleSample(cx - e, cy)) * 0.32 * inv2e;
            hye += (rippleSample(cx, cy + e) - rippleSample(cx, cy - e)) * 0.32 * inv2e;
          }
          var gx = hxe * unit * s.depth * 0.4;
          var gy = hye * unit * s.depth * 0.4;
          var inv = 1 / Math.sqrt(gx * gx + gy * gy + 1);
          var nx = -gx * inv, ny = -gy * inv, nz = inv;
          var diffuse = Math.max(0, nx * Lx + ny * Ly + nz * Lz);
          var spec = Math.pow(Math.max(0, nx * hx2 + ny * hy2 + nz * hz2), 160) * s.shine * 1.15;
          var hollow = 0.7 + 0.3 * clamp(h0 * 0.5 + 0.5, 0, 1);
          var tone = clamp(diffuse * hollow * 0.78 + spec, 0, 1);
          tone = clamp((tone - 0.42) * s.contrast + 0.42, 0, 1);
          var level = ink ? Math.pow(clamp(1 - tone / 0.46, 0, 1), 2.4) * 0.72 : Math.pow(tone, 2.2);
          var emphasis = ink ? sstep(0.55, 0.95, level) : clamp(spec * 1.6, 0, 1);

          /* fade（txt L331-341，y 向上） */
          var uvx = cx / width, uvy = 1 - cy / height;
          var ccx = uvx * 2 - 1, ccy = uvy * 2 - 1;
          var fade = 1;
          if (fadeIdx === 1) fade = 1 - sstep(1 - fadeSize, 1.18, Math.sqrt(ccx * ccx + ccy * ccy));
          else if (fadeIdx === 2) fade = 0.05 + 0.95 * sstep(0.08, 0.08 + fadeSize, Math.sqrt(ccx * ccx + ccy * ccy * 1.8225));
          else if (fadeIdx === 3) fade = sstep(0, fadeSize, uvy);
          else if (fadeIdx === 4) fade = sstep(0, fadeSize, 1 - uvy);

          /* intro 从中心向外显现 */
          var reach = Math.sqrt((cx - 0.5 * width) * (cx - 0.5 * width) + (cy - 0.5 * height) * (cy - 0.5 * height)) / halfDiag;
          var appear = sstep(reach - 0.05, reach + 0.3, appearVal * 1.35);

          var alpha = opacity * fade * appear * (0.22 + 0.78 * level);
          if (alpha < 0.012) continue;

          var lift = clamp(h0 * s.depth * 0.42, -0.48, 0.48);
          var px = cx;
          var py = cy + lift * pitch;
          var r = Math.max(markSpan * Math.sqrt(tone) * 0.5, 0.4);

          if (patternIdx === 4) { /* glyph */
            var count = s.characters.length || 1;
            var gi = Math.min(count - 1, Math.floor(level * count));
            ctx.globalAlpha = alpha;
            ctx.fillText(s.characters.charAt(gi), px, py);
            continue;
          }

          var bucket = Math.min(BUCKETS - 1, Math.floor(alpha * BUCKETS));
          var path = (emphasis > 0.45 ? highPaths : mainPaths)[bucket];
          if (!path) path = (emphasis > 0.45 ? highPaths : mainPaths)[bucket] = new Path2D();
          if (patternIdx === 0) { /* dot：半径 = markSize*spacing*sqrt(tone)*0.5 */
            path.moveTo(px + r, py);
            path.arc(px, py, r, 0, TAU);
          } else if (patternIdx === 1) { /* square */
            path.rect(px - r, py - r, r * 2, r * 2);
          } else { /* plus */
            var arm = markSpan * 0.5 * (0.3 + 0.7 * level);
            path.rect(px - arm, py - plusHalf, arm * 2, plusHalf * 2);
            path.rect(px - plusHalf, py - arm, plusHalf * 2, arm * 2);
          }
        }
      }

      if (patternIdx !== 4) {
        ctx.fillStyle = s.color;
        for (var b1 = 0; b1 < BUCKETS; b1++) {
          if (!mainPaths[b1]) continue;
          ctx.globalAlpha = (b1 + 0.5) / BUCKETS;
          ctx.fill(mainPaths[b1]);
        }
        ctx.fillStyle = 'rgba(' + Math.round(accent[0] * 255) + ',' + Math.round(accent[1] * 255) + ',' + Math.round(accent[2] * 255) + ',1)';
        for (var b2 = 0; b2 < BUCKETS; b2++) {
          if (!highPaths[b2]) continue;
          ctx.globalAlpha = (b2 + 0.5) / BUCKETS;
          ctx.fill(highPaths[b2]);
        }
      }
      ctx.globalAlpha = 1;
    };

    var frame = function (now) {
      raf = 0;
      if (!alive) return;
      var s = settings;
      var dt = Math.min(0.05, Math.max(1 / 240, (now - last) / 1000));
      last = now;

      var moving = !s.paused && !reduce && s.speed !== 0;
      if (moving) time += dt * s.speed;
      introClock = s.intro && !reduce ? Math.min(1, introClock + dt / INTRO_SECONDS) : 1;
      var appearVal = 1 - Math.pow(1 - clamp(introClock / 0.75, 0, 1), 3);
      var rise = clamp((introClock - 0.1) / 0.9, 0, 1);
      var amp = rise * rise * (3 - 2 * rise);

      var rippling = s.interactive && !reduce && !!ripple && s.cursorStrength > 0;
      if (rippling && pointer.inside && !pointer.placed) {
        pointer.lastX = pointer.x;
        pointer.lastY = pointer.y;
        pointer.placed = true;
      }
      if (rippling && (pointer.inside || pointer.burst > 0)) rippleUntil = now + 5000;
      var rippleActive = rippling && now < rippleUntil;
      if (rippleActive) { stepRipple(s, dt); rippleLive = true; }
      else if (rippleLive) { clearRipple(); rippleLive = false; }

      draw(s, amp, appearVal);
      dirty = false;

      if (visible && (moving || introClock < 1 || rippleActive || dirty)) raf = requestAnimationFrame(frame);
      else last = 0;
    };

    var start = function () {
      if (raf || !visible || !alive) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    var resize = function () {
      width = Math.max(1, el.clientWidth);
      height = Math.max(1, el.clientHeight);
      dprEff = Math.min(window.devicePixelRatio || 1, 2, Math.sqrt(PIXEL_BUDGET / (width * height)));
      canvas.width = Math.max(1, Math.round(width * dprEff));
      canvas.height = Math.max(1, Math.round(height * dprEff));
      settings._bg = null; settings._col = null; settings._accent = null;
      buildRipple();
      dirty = true;
      start();
    };

    var locate = function (e) {
      var rect = el.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      return { x: x, y: y, inside: x >= 0 && y >= 0 && x <= rect.width && y <= rect.height };
    };
    var onPointerMove = function (e) {
      var spot = locate(e);
      pointer.x = spot.x;
      pointer.y = spot.y;
      if (spot.inside !== pointer.inside) pointer.placed = false;
      pointer.inside = spot.inside;
      if (spot.inside) start();
    };
    var onPointerDown = function (e) {
      var spot = locate(e);
      if (!spot.inside) return;
      pointer.x = spot.x;
      pointer.y = spot.y;
      if (!pointer.inside) { pointer.lastX = spot.x; pointer.lastY = spot.y; }
      pointer.burst = 1.2;
      start();
    };
    var onPointerLeave = function () {
      pointer.inside = false;
      pointer.placed = false;
      start();
    };
    var onPointerOut = function (e) { if (!e.relatedTarget) onPointerLeave(); };
    var onPointerUp = function (e) { if (e.pointerType === 'touch') onPointerLeave(); };
    var onVisibility = function () { if (!document.hidden) start(); };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerout', onPointerOut, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    window.addEventListener('blur', onPointerLeave);
    document.addEventListener('visibilitychange', onVisibility);

    var resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(el);
    var intersectionObserver = new IntersectionObserver(function (entries) {
      visible = entries.some(function (entry) { return entry.isIntersecting; });
      start();
    });
    intersectionObserver.observe(el);
    resize();

    var setOptions = function (o) {
      if (!o) return;
      var base2 = o.preset != null ? (SURFACE_PRESETS[o.preset] || base) : null;
      settings = buildSettings(settings, o, base2);
      settings._bg = null; settings._col = null; settings._accent = null;
      dirty = true;
      start();
    };

    var destroy = function () {
      alive = false;
      visible = false;
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerout', onPointerOut);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('blur', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      ripple = null;
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      el.classList.remove('cz-waves');
    };

    return { el: el, destroy: destroy, setOptions: setOptions };
  }

  window.LZY = window.LZY || {};
  window.LZY.Comp = window.LZY.Comp || {};
  window.LZY.Comp.PatternWaves = { init: init };
})();
