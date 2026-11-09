/*!
 * LZY.Comp.HalftoneReveal — 网点显影（Canvas 2D 双层，ReactBits 原生移植）
 * 原 WebGL 双 pass（MASK 衰减 + VIEW 网点）改为：
 *   ① 静态印刷层（离屏 printCanvas）：旋转网格（默认 45°），格心采样亮度，
 *      t = (shade - paper) / (ink - paper)，reach(t)（shader 公式原样移植）→ 画圆；
 *      duotone 第二套网屏 +30°（accent），暗纸加色 / 亮纸multiply
 *   ② 显影层（半分辨率 Float32Array trail）：线性衰减 linger + 光标软边圆
 *      （1-exp(-dt/0.035) 平滑），合成 drawImage(照片) → destination-in(trail) → 叠印刷层
 *   点击 burst 扩散环；reverse 反相（起点照片、划过处印刷）
 * 接口：window.LZY.Comp.HalftoneReveal.init(el, options) → { destroy(), setOptions(o), el }
 * options: src, fit('cover'|'contain'), mode('mono'|'duotone'),
 *          shape('dot' 完整实现；其余值回落圆点、reach 曲线仍生效),
 *          cellSize:6, angle:45, dotScale:1, inkColor:'#00d9ff', accentColor:'#9e59ee',
 *          paperColor:'#0f0820'（对齐页面背景）, contrast:1.1, brightness:0, invert:false,
 *          revealRadius:160, softness:0.6, linger:1.2, reverse:false,
 *          clickBurst:true, intro:true
 * 注意：图片必须同源或带 CORS 头，且页面经 http 访问（file:// 会污染采样）。
 */
(function () {
  'use strict';

  window.LZY = window.LZY || {};
  window.LZY.Comp = window.LZY.Comp || {};

  var MODES = { mono: 0, duotone: 1 };
  var SHAPES = { dot: 0, ellipse: 1, square: 2, diamond: 3, line: 4, cross: 5 };
  var LUMA = [0.2126, 0.7152, 0.0722];
  var MASK_SCALE = 0.5;          // trail 半分辨率（同原 MASK_SCALE）
  var BURST_SECONDS = 1.3;
  var MAX_BURSTS = 4;
  var INTRO_SECONDS = 1.4;
  var PER_DOT_DELAY_LIMIT = 24000; // 点数超过此值时 intro 退化为整体生长
  var DEFAULT_SRC = '../../assets/2024扬州大学智能视觉比赛现场.jpg';

  function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }
  function mix(a, b, t) { return a + (b - a) * t; }
  function smooth(t) { t = clamp(t, 0, 1); return t * t * (3 - 2 * t); }
  function fract(v) { return v - Math.floor(v); }

  /* hash：原 shader（L147-151）公式移植 */
  function hash2(x, y) {
    var px = fract(x * 123.34), py = fract(y * 456.21);
    var d = px * (px + 45.32) + py * (py + 45.32);
    return fract((px + d) * (py + d));
  }

  /* —— reach：原 VIEW shader（L234-242）数学原样移植。
     注：shape 仅 'dot' 做了完整 2D 几何（圆点）；其余取值回落圆点绘制，
     但各形状的 reach() 半径曲线保留生效（密度/显影节奏与原版一致）。 —— */
  function reach(shape, t) {
    t = clamp(t, 0, 1);
    if (shape < 0.5) return t < 0.785 ? Math.sqrt(t / Math.PI) : mix(0.5, 0.72, (t - 0.785) / 0.215);
    if (shape < 1.5) return t < 0.7 ? Math.sqrt(t * 0.92 / Math.PI) : mix(0.4497, 0.72, (t - 0.7) / 0.3);
    if (shape < 2.5) return 0.5 * Math.sqrt(t) + 0.02 * t;
    if (shape < 3.5) return t < 0.5 ? Math.sqrt(t * 0.5) : 1 - Math.sqrt((1 - t) * 0.5);
    if (shape < 4.5) return 0.52 * t;
    return (1 - Math.sqrt(1 - t)) * 0.5 + 0.02 * t;
  }

  var probe = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
  var colorCache = {};
  function toRgb(value) {
    if (colorCache[value]) return colorCache[value];
    var rgb = [0, 0, 0];
    if (probe && value) {
      probe.fillStyle = '#000000';
      probe.fillStyle = /^[0-9a-f]{3,8}$/i.test(value) ? '#' + value : value;
      probe.fillRect(0, 0, 1, 1);
      var d = probe.getImageData(0, 0, 1, 1).data;
      rgb = [d[0] / 255, d[1] / 255, d[2] / 255];
    }
    colorCache[value] = rgb;
    return rgb;
  }
  function tone1(v) { return Math.pow(Math.max(v, 0), 1.5); }
  function lumaOf(rgb) { return rgb[0] * LUMA[0] + rgb[1] * LUMA[1] + rgb[2] * LUMA[2]; }

  function create(mount, options) {
    var o = {
      src: DEFAULT_SRC, fit: 'cover', mode: 'mono', shape: 'dot',
      cellSize: 6, angle: 45, dotScale: 1,
      inkColor: '#00d9ff', accentColor: '#9e59ee', paperColor: '#0f0820',
      contrast: 1.1, brightness: 0, invert: false,
      revealRadius: 160, softness: 0.6, linger: 1.2,
      reverse: false, clickBurst: true, intro: true
    };

    var root = mount;
    root.classList.add('cz-halftone');
    var cs = window.getComputedStyle(root);
    if (cs.position === 'static') root.classList.add('cz-halftone--pos');

    var canvas = document.createElement('canvas');
    canvas.className = 'cz-halftone__canvas';
    canvas.setAttribute('aria-hidden', 'true');
    root.appendChild(canvas);

    var ctx = canvas.getContext('2d', { alpha: false });
    var printCanvas = document.createElement('canvas');
    var pctx = printCanvas.getContext('2d');
    var revealCanvas = document.createElement('canvas');
    var rctx = revealCanvas.getContext('2d');
    var trailCanvas = document.createElement('canvas');
    var tctx = trailCanvas.getContext('2d');
    var invCanvas = document.createElement('canvas');   // reverse 反相遮罩
    var ictx = invCanvas.getContext('2d');
    var printMaskCanvas = document.createElement('canvas');
    var pmctx = printMaskCanvas.getContext('2d');
    var sampler = document.createElement('canvas').getContext('2d', { willReadFrequently: true });

    var reduce = window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

    var state = {
      w: 1, h: 1, dpr: 1, image: null,
      presence: 0, introStart: 0, introDone: false,
      trailUntil: 0, trailWasActive: false,
      dotsInk: new Float32Array(0), dotsAccent: new Float32Array(0),
      delaysInk: null, delaysAccent: null,
      printValid: false, printPainted: false, composited: false
    };
    var trail = null, trailImg = null, trailData = null;
    var pointer = { x: 0, y: 0, inside: false, fresh: true };
    var brush = { x: 0, y: 0, px: 0, py: 0 };
    var bursts = [];
    var sprites = {};
    var raf = 0, last = 0, visible = true, alive = true;

    function sprite(color) {
      if (sprites[color]) return sprites[color];
      var s = document.createElement('canvas');
      s.width = s.height = 64;
      var sc = s.getContext('2d');
      sc.fillStyle = color;
      sc.beginPath();
      sc.arc(32, 32, 31, 0, Math.PI * 2);
      sc.fill();
      sprites[color] = s;
      return s;
    }

    function frameRect() {
      var img = state.image;
      if (!img) return [0, 0, state.w, state.h];
      var s = (o.fit === 'contain' ? Math.min : Math.max)(
        state.w / img.naturalWidth, state.h / img.naturalHeight);
      var w = img.naturalWidth * s, h = img.naturalHeight * s;
      return [(state.w - w) / 2, (state.h - h) / 2, w, h];
    }

    /* ================= ① 静态印刷层 ================= */
    function buildPrint() {
      var img = state.image;
      var W = Math.max(1, Math.round(state.w * state.dpr));
      var H = Math.max(1, Math.round(state.h * state.dpr));
      printCanvas.width = W;
      printCanvas.height = H;
      state.printValid = false;
      if (!img) return;

      var dpr = state.dpr;
      var sw = W, sh = H;
      sampler.canvas.width = sw;
      sampler.canvas.height = sh;
      var fr = frameRect();
      sampler.clearRect(0, 0, sw, sh);
      sampler.drawImage(img, fr[0] * dpr, fr[1] * dpr, fr[2] * dpr, fr[3] * dpr);
      var data;
      try {
        data = sampler.getImageData(0, 0, sw, sh).data;
      } catch (e) {
        return; // 跨域污染：保底只画纸色
      }

      var paper = toRgb(o.paperColor);
      var paperToned = [tone1(paper[0]), tone1(paper[1]), tone1(paper[2])];
      var paperL = lumaOf(paperToned);
      var ink = toRgb(o.inkColor);
      var inkL = lumaOf([tone1(ink[0]), tone1(ink[1]), tone1(ink[2])]);
      var span = inkL - paperL;

      var shape = SHAPES[o.shape] != null ? SHAPES[o.shape] : 0;
      var mode = MODES[o.mode] != null ? MODES[o.mode] : 0;
      var cell = clamp(o.cellSize, 2, 80);
      var dotScale = clamp(o.dotScale, 0.2, 2);
      var contrast = o.contrast, brightness = o.brightness, invert = !!o.invert;
      var w = state.w, h = state.h, maxDim = Math.max(w, h);
      var dotsInk = [], dotsAccent = [], delaysInk = [], delaysAccent = [];
      var storeDelay = o.intro && !reduce;

      function screen(ang, isAccent) {
        var c = Math.cos(ang), s = Math.sin(ang);
        var corners = [[0, 0], [w, 0], [0, h], [w, h]];
        var minI = Infinity, maxI = -Infinity, minJ = Infinity, maxJ = -Infinity;
        for (var k = 0; k < 4; k++) {
          var qx = (c * corners[k][0] + s * corners[k][1]) / cell;
          var qy = (-s * corners[k][0] + c * corners[k][1]) / cell;
          if (qx < minI) minI = Math.floor(qx);
          if (qx > maxI) maxI = Math.ceil(qx);
          if (qy < minJ) minJ = Math.floor(qy);
          if (qy > maxJ) maxJ = Math.ceil(qy);
        }
        for (var j = minJ; j <= maxJ; j++) {
          for (var i = minI; i <= maxI; i++) {
            var qu = (i + 0.5) * cell, qv = (j + 0.5) * cell;
            var px = c * qu - s * qv, py = s * qu + c * qv;
            if (px < -cell || px > w + cell || py < -cell || py > h + cell) continue;
            var sx = clamp(Math.round(px * dpr), 0, sw - 1);
            var sy = clamp(Math.round(py * dpr), 0, sh - 1);
            var di = (sy * sw + sx) * 4;
            var r0 = data[di] / 255, g0 = data[di + 1] / 255, b0 = data[di + 2] / 255;
            var a0 = data[di + 3] / 255;
            // grade：对比/亮度/反相（同原 grade()）
            r0 = clamp((r0 - 0.5) * contrast + 0.5 + brightness, 0, 1);
            g0 = clamp((g0 - 0.5) * contrast + 0.5 + brightness, 0, 1);
            b0 = clamp((b0 - 0.5) * contrast + 0.5 + brightness, 0, 1);
            if (invert) { r0 = 1 - r0; g0 = 1 - g0; b0 = 1 - b0; }
            // coverage()：shade/tone/press 移植
            var shade = tone1(r0) * LUMA[0] + tone1(g0) * LUMA[1] + tone1(b0) * LUMA[2];
            var t = Math.abs(span) < 0.02 ? 1 - shade : (shade - paperL) / span;
            var tPress = clamp((0.05 + clamp(t, 0, 1) * 0.89) * a0, 0, 1);
            var rr;
            if (mode === 0) {
              rr = reach(shape, tPress) * dotScale * cell;
              if (rr * 1.1 < 0.45) continue;
              dotsInk.push(px * dpr, py * dpr, rr * dpr);
              if (storeDelay && dotsInk.length / 3 < PER_DOT_DELAY_LIMIT) {
                var fx = (px - w / 2) / maxDim, fy = (py - h / 2) / maxDim;
                delaysInk.push(Math.hypot(fx, fy) * 1.15 + hash2(i + (isAccent ? 17.31 : 0), j) * 0.06);
              }
            } else if (!isAccent) {
              // duotone 主网屏（墨）：t^1.9
              rr = reach(shape, Math.pow(tPress, 1.9)) * dotScale * cell;
              if (rr * 1.1 < 0.45) continue;
              dotsInk.push(px * dpr, py * dpr, rr * dpr);
            } else {
              // duotone 副网屏（accent）：+30°，clamp(t*1.3)*0.8
              rr = reach(shape, clamp(tPress * 1.3, 0, 1) * 0.8) * dotScale * cell;
              if (rr * 1.1 < 0.45) continue;
              dotsAccent.push(px * dpr, py * dpr, rr * dpr);
            }
          }
        }
      }

      screen(o.angle * Math.PI / 180, false);
      if (mode === 1) screen((o.angle + 30) * Math.PI / 180, true); // +30° 副网屏

      state.dotsInk = new Float32Array(dotsInk);
      state.dotsAccent = new Float32Array(dotsAccent);
      state.delaysInk = delaysInk.length === dotsInk.length / 3 ? new Float32Array(delaysInk) : null;
      state.delaysAccent = delaysAccent.length === dotsAccent.length / 3 ? new Float32Array(delaysAccent) : null;
      state.printValid = true;
    }

    function paintPrint(growOf) {
      var W = printCanvas.width, H = printCanvas.height;
      pctx.clearRect(0, 0, W, H);
      pctx.globalCompositeOperation = 'source-over';
      pctx.fillStyle = o.paperColor;
      pctx.fillRect(0, 0, W, H);
      if (!state.printValid) return;

      var mode = MODES[o.mode] != null ? MODES[o.mode] : 0;
      var dark = lumaOf(toRgb(o.paperColor)) <= 0.5;
      var one = growOf ? null : 1;

      function paint(arr, delays, color) {
        if (!arr || !arr.length) return;
        var sp = sprite(color);
        for (var k = 0, idx = 0; k < arr.length; k += 3, idx++) {
          var g = growOf ? growOf(idx, delays) : one;
          if (g <= 0.02) continue;
          var r = arr[k + 2] * g;
          if (r < 0.3) continue;
          pctx.drawImage(sp, arr[k] - r, arr[k + 1] - r, r * 2, r * 2);
        }
      }

      if (mode === 0) {
        paint(state.dotsInk, state.delaysInk, o.inkColor);
      } else if (dark) {
        // 暗纸：min(paper + accent*kB + ink*kA) → 加色
        pctx.globalCompositeOperation = 'lighter';
        paint(state.dotsAccent, state.delaysAccent, o.accentColor);
        paint(state.dotsInk, state.delaysInk, o.inkColor);
      } else {
        // 亮纸：paper * accent * ink → multiply
        pctx.globalCompositeOperation = 'multiply';
        paint(state.dotsAccent, state.delaysAccent, o.accentColor);
        paint(state.dotsInk, state.delaysInk, o.inkColor);
      }
      pctx.globalCompositeOperation = 'source-over';
    }

    /* ================= ② 显影层（浮点 trail） ================= */
    function allocTrail() {
      var tw = Math.max(2, Math.round(state.w * MASK_SCALE));
      var th = Math.max(2, Math.round(state.h * MASK_SCALE));
      if (trail && tw === trailCanvas.width && th === trailCanvas.height) return;
      trailCanvas.width = tw;
      trailCanvas.height = th;
      invCanvas.width = tw;
      invCanvas.height = th;
      trail = new Float32Array(tw * th);
      trailImg = tctx.createImageData(tw, th);
      trailData = trailImg.data;
      for (var i = 0; i < tw * th; i++) {
        trailData[i * 4] = 255;
        trailData[i * 4 + 1] = 255;
        trailData[i * 4 + 2] = 255;
        trailData[i * 4 + 3] = 0;
      }
    }

    function decayTrail(fade) {
      if (fade <= 0) return;
      if (fade >= 1) {
        if (trail) trail.fill(0);
        return;
      }
      for (var i = 0; i < trail.length; i++) {
        var v = trail[i];
        if (v > 0) trail[i] = v > fade ? v - fade : 0;
      }
    }

    function stampCircle(cx, cy, R, band, strength) {
      var tw = trailCanvas.width, th = trailCanvas.height;
      var x0 = Math.max(0, Math.floor(cx - R)), x1 = Math.min(tw - 1, Math.ceil(cx + R));
      var y0 = Math.max(0, Math.floor(cy - R)), y1 = Math.min(th - 1, Math.ceil(cy + R));
      for (var y = y0; y <= y1; y++) {
        for (var x = x0; x <= x1; x++) {
          var dist = Math.hypot(x - cx, y - cy);
          if (dist >= R) continue;
          var v = smooth((R - dist) / band) * strength;
          var idx = y * tw + x;
          if (v > trail[idx]) trail[idx] = v;
        }
      }
    }

    function stampRing(cx, cy, ringR, ringW, strength) {
      if (ringR <= 0 || strength <= 0) return;
      var tw = trailCanvas.width, th = trailCanvas.height;
      var outer = ringR + ringW * 0.35;
      var x0 = Math.max(0, Math.floor(cx - outer)), x1 = Math.min(tw - 1, Math.ceil(cx + outer));
      var y0 = Math.max(0, Math.floor(cy - outer)), y1 = Math.min(th - 1, Math.ceil(cy + outer));
      for (var y = y0; y <= y1; y++) {
        for (var x = x0; x <= x1; x++) {
          var dist = Math.hypot(x - cx, y - cy);
          var off = dist - ringR;
          if (off > ringW * 0.35 || off < -ringW) continue;
          var edge = off > 0 ? off / (ringW * 0.35) : -off / ringW;  // 原 burst() 环形衰减
          var v = clamp(1 - edge, 0, 1) * strength;
          var idx = y * tw + x;
          if (v > trail[idx]) trail[idx] = v;
        }
      }
    }

    function pushTrail() {
      var n = trail.length;
      for (var i = 0; i < n; i++) trailData[i * 4 + 3] = (trail[i] * 255) | 0;
      tctx.putImageData(trailImg, 0, 0);
    }

    /* ================= 合成 ================= */
    function composite(trailActive) {
      var W = canvas.width, H = canvas.height;
      var dpr = state.dpr;
      ctx.drawImage(printCanvas, 0, 0);
      if (!trailActive && !o.reverse) return;

      var fr = frameRect();
      var fx = fr[0] * dpr, fy = fr[1] * dpr, fw = fr[2] * dpr, fh = fr[3] * dpr;
      if (!o.reverse) {
        rctx.clearRect(0, 0, W, H);
        if (state.image) rctx.drawImage(state.image, fx, fy, fw, fh);
        rctx.globalCompositeOperation = 'destination-in';
        rctx.drawImage(trailCanvas, 0, 0, W, H);
        rctx.globalCompositeOperation = 'source-over';
        ctx.drawImage(revealCanvas, 0, 0);
      } else {
        // reverse：起点照片，划过处印刷 —— 照片在下，print×(1-trail) 叠上
        if (state.image) ctx.drawImage(state.image, fx, fy, fw, fh);
        ictx.clearRect(0, 0, invCanvas.width, invCanvas.height);
        ictx.fillStyle = '#ffffff';
        ictx.fillRect(0, 0, invCanvas.width, invCanvas.height);
        ictx.globalCompositeOperation = 'destination-out';
        ictx.drawImage(trailCanvas, 0, 0);
        ictx.globalCompositeOperation = 'source-over';
        pmctx.clearRect(0, 0, W, H);
        pmctx.drawImage(printCanvas, 0, 0);
        pmctx.globalCompositeOperation = 'destination-in';
        pmctx.drawImage(invCanvas, 0, 0, W, H);
        pmctx.globalCompositeOperation = 'source-over';
        ctx.drawImage(printMaskCanvas, 0, 0);
      }
    }

    function renderStatic() {
      if (!state.printPainted) {
        paintPrint(null); // printValid=false 时 paintPrint 会兜底填纸色
        state.printPainted = true;
      }
      composite(false);
      state.composited = true;
    }

    /* ================= 帧循环 ================= */
    function frame(now) {
      raf = 0;
      if (!alive || !visible || document.hidden) return;
      var dt = last ? clamp((now - last) / 1000, 0, 0.05) : 1 / 60;
      last = now;

      // presence 平滑（原 1-exp(-dt/0.16)）
      var target = pointer.inside ? 1 : 0;
      state.presence += (target - state.presence) * (1 - Math.exp(-dt / 0.16));
      if (state.presence < 0.002 && !pointer.inside) state.presence = 0;

      // 光标软边圆平滑（原 1-exp(-dt/0.035)）
      if (pointer.fresh) {
        brush.x = brush.px = pointer.x;
        brush.y = brush.py = pointer.y;
        pointer.fresh = false;
      } else {
        var f = 1 - Math.exp(-dt / 0.035);
        brush.x += (pointer.x - brush.x) * f;
        brush.y += (pointer.y - brush.y) * f;
      }

      // intro 生长
      var introK = 1;
      var introActive = false;
      if (state.image && o.intro && !state.introDone) {
        introK = clamp((now - state.introStart) / 1000 / INTRO_SECONDS, 0, 1);
        introActive = introK < 1;
        if (!introActive) state.introDone = true;
      }

      // trail：衰减 → 光标 → burst
      var trailActive = false;
      if (!reduce) {
        decayTrail(o.linger > 0 ? dt / o.linger : 1);
        if (state.presence > 0.002) {
          state.trailUntil = now + o.linger * 1000 + 200;
          var R = o.revealRadius * (0.45 + 0.55 * state.presence) * MASK_SCALE;
          var band = Math.max(R * clamp(o.softness, 0, 1), 1);
          stampCircle(brush.x * MASK_SCALE, brush.y * MASK_SCALE, R, band, state.presence);
        }
        var bWidth = Math.max(60, o.revealRadius * 0.9) * MASK_SCALE;
        for (var i = bursts.length - 1; i >= 0; i--) {
          var bk = (now - bursts[i].start) / 1000 / BURST_SECONDS;
          if (bk >= 1) { bursts.splice(i, 1); continue; }
          var b = bursts[i];
          var reachPx = Math.hypot(Math.max(b.x, state.w - b.x), Math.max(b.y, state.h - b.y)) + 80;
          stampRing(b.x * MASK_SCALE, b.y * MASK_SCALE,
            reachPx * Math.sin(bk * Math.PI / 2) * MASK_SCALE, bWidth, 1 - bk * bk * bk);
        }
        trailActive = state.presence > 0.002 || bursts.length > 0 || now < state.trailUntil;
        if (trailActive) pushTrail();
        else if (state.trailWasActive) { trail.fill(0); pushTrail(); }
      }
      state.trailWasActive = trailActive;

      // 印刷层：intro 期间逐帧重绘，之后静态
      if (introActive) {
        var P = 1 - (1 - introK) * (1 - introK); // 原 uIntro 缓动
        paintPrint(function (idx, delays) {
          if (!delays) return smooth(P * 1.7 / 0.45);
          return smooth((P * 1.7 - delays[idx]) / 0.45);
        });
      } else if (!state.printPainted) {
        paintPrint(null);
        state.printPainted = true;
      }

      // 合成
      if (trailActive || introActive || !state.composited) {
        composite(trailActive);
        state.composited = !trailActive && !introActive;
      }

      if (introActive || trailActive || pointer.inside) raf = requestAnimationFrame(frame);
      else last = 0;
    }

    function wake() {
      if (reduce) {
        if (!state.composited) renderStatic();
        return;
      }
      if (!raf && alive && visible && !document.hidden) raf = requestAnimationFrame(frame);
    }

    /* ================= 事件与生命周期 ================= */
    function locate(e) {
      var r = root.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
    }
    function onMove(e) {
      if (reduce) return;
      locate(e);
      if (!pointer.inside) { pointer.inside = true; pointer.fresh = true; }
      wake();
    }
    function onLeave() {
      pointer.inside = false;
      wake();
    }
    function onDown(e) {
      onMove(e);
      if (reduce || !o.clickBurst) return;
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      bursts.push({ x: pointer.x, y: pointer.y, start: performance.now() });
      if (bursts.length > MAX_BURSTS) bursts.shift();
      wake();
    }
    function onVisibility() {
      if (document.hidden) { if (raf) { cancelAnimationFrame(raf); raf = 0; } last = 0; }
      else wake();
    }

    root.addEventListener('pointermove', onMove, { passive: true });
    root.addEventListener('pointerdown', onDown, { passive: true });
    root.addEventListener('pointerleave', onLeave, { passive: true });
    root.addEventListener('pointercancel', onLeave, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);

    var resizeRaf = 0;
    function doResize() {
      resizeRaf = 0;
      var w = Math.max(1, root.clientWidth);
      var h = Math.max(1, root.clientHeight);
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var cw = Math.max(1, Math.round(w * dpr));
      var ch = Math.max(1, Math.round(h * dpr));
      state.w = w; state.h = h; state.dpr = dpr;
      if (canvas.width !== cw || canvas.height !== ch) { canvas.width = cw; canvas.height = ch; }
      if (printCanvas.width !== cw || printCanvas.height !== ch) { printCanvas.width = cw; printCanvas.height = ch; }
      allocTrail();
      state.printPainted = false;
      state.composited = false;
      if (state.image) buildPrint();
      if (!pointer.placed) { pointer.x = w / 2; pointer.y = h / 2; }
      wake();
    }
    function requestResize() {
      if (!resizeRaf) resizeRaf = requestAnimationFrame(doResize);
    }
    var ro = new ResizeObserver(requestResize);
    ro.observe(root);
    var io = new IntersectionObserver(function (entries) {
      visible = entries.some(function (en) { return en.isIntersecting; });
      if (visible) wake();
      else if (raf) { cancelAnimationFrame(raf); raf = 0; }
    });
    io.observe(root);

    function load(src) {
      state.image = null;
      state.printValid = false;
      state.printPainted = false;
      state.composited = false;
      if (!src) { pctx.fillStyle = o.paperColor; pctx.fillRect(0, 0, printCanvas.width, printCanvas.height); renderStatic(); return; }
      var img = new Image();
      img.crossOrigin = 'anonymous';
      img.decoding = 'async';
      img.onload = function () {
        if (!alive) return;
        state.image = img;
        state.introStart = performance.now();
        state.introDone = false;
        buildPrint();
        wake();
      };
      img.onerror = function () {
        if (!alive) return;
        pctx.fillStyle = o.paperColor;
        pctx.fillRect(0, 0, printCanvas.width, printCanvas.height);
        renderStatic();
      };
      img.src = src;
    }

    apply(options, true); // 先并入参数（不触发加载/重建）
    doResize();
    load(o.src);

    function apply(patch, silent) {
      if (!patch) return;
      var srcChanged = 'src' in patch && patch.src !== o.src;
      var rebuild = false;
      for (var key in patch) {
        if (!Object.prototype.hasOwnProperty.call(patch, key)) continue;
        var watch = ['fit', 'mode', 'shape', 'cellSize', 'angle', 'dotScale', 'inkColor',
          'accentColor', 'paperColor', 'contrast', 'brightness', 'invert'];
        if (watch.indexOf(key) > -1 && patch[key] !== o[key]) rebuild = true;
        o[key] = patch[key];
      }
      if (silent) return;
      if (srcChanged) load(o.src);
      else if (rebuild && state.image) {
        state.printPainted = false;
        state.composited = false;
        buildPrint();
        wake();
      }
    }

    return {
      el: root,
      setOptions: function (patch) {
        apply(patch || {});
        if (!reduce) wake(); else renderStatic();
      },
      destroy: function () {
        alive = false;
        if (raf) cancelAnimationFrame(raf);
        if (resizeRaf) cancelAnimationFrame(resizeRaf);
        ro.disconnect();
        io.disconnect();
        root.removeEventListener('pointermove', onMove);
        root.removeEventListener('pointerdown', onDown);
        root.removeEventListener('pointerleave', onLeave);
        root.removeEventListener('pointercancel', onLeave);
        document.removeEventListener('visibilitychange', onVisibility);
        if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
        root.classList.remove('cz-halftone', 'cz-halftone--pos');
      }
    };
  }

  window.LZY.Comp.HalftoneReveal = {
    version: '1.0.0',
    init: function (el, options) {
      if (!el || !el.appendChild) return null;
      return create(el, Object.assign({}, options || {}));
    }
  };
})();
