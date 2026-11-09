/*!
 * Gradient ASCII 渐变字符画 —— ReactBits Canvas 2D 移植（零依赖，原版为 WebGL2 多 pass）
 * 直译来源（Gradient ASCII.txt）：
 *   L153-200 四形状解析式 horizon/pinch/rise/eclipse（逐行转 JS）
 *   L117-132 value-noise / hash22；L88-92 hash12；L134-151 Oklab 双向转换 + gamma encode
 *   字符索引 = floor(tone*(n-1))；光标 trail 乱码（hash(cell+frame) 选替代字符 + 年龄衰减）；
 *   点击 wave 环形乱码；廉价 bloom（字符层 1/4 离屏放大 'lighter' 叠加）；grain 噪点（source-atop）
 * 接口：LZY.Comp.GradientASCII.init(el, options) → { destroy(), setOptions(o), el }
 */
(function () {
  'use strict';

  var MAX_COLORS = 8;
  var MAX_CLICKS = 4;
  var MAX_TRAIL = 24;
  var CLICK_LIFE = 1.2;
  var TRAIL_LIFE = 0.7;
  var TRAIL_STEP = 0.015;
  var INTRO_SECONDS = 2.4;
  var FONT_SCALE = 0.78;
  var CELL_RATIO = 60 / 100;         /* 原版 ATLAS_CELL_W/H 宽高比 */
  var DEFAULT_COLORS = ['#31136b', '#7828d6', '#00d9ff', '#ffb627', '#b85c2a']; /* 设计系统：紫→青→琥珀（暗→亮）→暗橙回落，峰值在青/琥珀，horizon 顶部不过曝 */
  var DEFAULT_CHARS = ' =+xX0S8#@';
  var DEFAULT_FONT = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
  var SHAPES = { horizon: 0, pinch: 1, rise: 2, eclipse: 3 };
  var CLICK_EFFECTS = { none: 0, wave: 1, burst: 2 };
  var LUT_N = 64;
  var COLOR_STEPS = 16;
  var GRAIN_SIZE = 128;
  var PIXEL_BUDGET = 4.5e6;

  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
  var sstep = function (a, b, x) {
    var t = clamp((x - a) / (b - a), 0, 1);
    return t * t * (3 - 2 * t);
  };
  var fract = function (x) { return x - Math.floor(x); };

  /* GLSL hash12 / hash22 / value-noise 逐行直译 */
  var H2 = [0, 0];
  function hash12(x, y) {
    var qx = fract(x * 0.1031), qy = fract(y * 0.1031), qz = fract(x * 0.1031);
    var d = qx * (qy + 33.33) + qy * (qz + 33.33) + qz * (qx + 33.33);
    return fract((qx + d + qy + d) * (qz + d));
  }
  function hash22(x, y, out) {
    var qx = fract(x * 0.1031), qy = fract(y * 0.103), qz = fract(x * 0.0973);
    var d = qx * (qy + 33.33) + qy * (qz + 33.33) + qz * (qx + 33.33);
    out[0] = fract((qx + qy + d) * (qz + d)) * 2 - 1;
    out[1] = fract((qx + qz + d) * (qy + d)) * 2 - 1;
  }
  function noise2(x, y) {
    var ix = Math.floor(x), iy = Math.floor(y);
    var fx = x - ix, fy = y - iy;
    var ux = fx * fx * fx * (fx * (fx * 6 - 15) + 10);
    var uy = fy * fy * fy * (fy * (fy * 6 - 15) + 10);
    hash22(ix, iy, H2);         var a = H2[0] * fx + H2[1] * fy;
    hash22(ix + 1, iy, H2);     var b = H2[0] * (fx - 1) + H2[1] * fy;
    hash22(ix, iy + 1, H2);     var c = H2[0] * fx + H2[1] * (fy - 1);
    hash22(ix + 1, iy + 1, H2); var d = H2[0] * (fx - 1) + H2[1] * (fy - 1);
    var ab = a + (b - a) * ux;
    var cd = c + (d - c) * ux;
    return 0.5 + 0.5 * (ab + (cd - ab) * uy);
  }

  /* Oklab 直译（txt L134-151） */
  function toLinear(v) { return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }
  function toLab(rgb) {
    var lr = toLinear(rgb[0]), lg = toLinear(rgb[1]), lb = toLinear(rgb[2]);
    var l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
    var m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
    var s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
    return [
      0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
      1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
      0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
    ];
  }
  function labToRgb(lab) {
    var l = lab[0], A = lab[1], B = lab[2];
    var lr = l + 0.3963377774 * A + 0.2158037573 * B;
    var mg = l - 0.1055613458 * A - 0.0638541728 * B;
    var sb = l - 0.0894841775 * A - 1.2914855480 * B;
    lr = lr * lr * lr; mg = mg * mg * mg; sb = sb * sb * sb;
    return [
      4.0767416621 * lr - 3.3077115913 * mg + 0.2309699292 * sb,
      -1.2684380046 * lr + 2.6097574011 * mg - 0.3413193965 * sb,
      -0.0041960863 * lr - 0.7034186147 * mg + 1.7076147010 * sb
    ];
  }
  function encodeC(c) {
    c = clamp(c, 0, 1);
    return c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
  }

  var probeCtx = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
  function parseColor(value) {
    if (!probeCtx) return [0, 0, 0];
    probeCtx.clearRect(0, 0, 1, 1);
    probeCtx.fillStyle = '#000000';
    probeCtx.fillStyle = value;
    probeCtx.fillRect(0, 0, 1, 1);
    var d = probeCtx.getImageData(0, 0, 1, 1).data;
    return d[3] ? [d[0] / 255, d[1] / 255, d[2] / 255] : [0, 0, 0];
  }

  /* 色带 LUT：tone(t) = smoothstep(0.3,1,t) 在 Lab ramp 上插值，alpha = smoothstep(0,0.38,t) */
  function buildLut(colors) {
    var labs = colors.map(function (c) { return toLab(parseColor(c)); });
    var n = labs.length;
    var lut = new Float32Array(LUT_N * 4);
    for (var i = 0; i < LUT_N; i++) {
      var t = i / (LUT_N - 1);
      var x = sstep(0.3, 1, t) * (n - 1);
      var idx = clamp(Math.floor(x), 0, Math.max(0, n - 2));
      var f = Math.min(1, x - idx);
      var a = labs[idx], b = labs[Math.min(idx + 1, n - 1)];
      var rgb = labToRgb([
        a[0] + (b[0] - a[0]) * f,
        a[1] + (b[1] - a[1]) * f,
        a[2] + (b[2] - a[2]) * f
      ]);
      lut[i * 4] = encodeC(rgb[0]);
      lut[i * 4 + 1] = encodeC(rgb[1]);
      lut[i * 4 + 2] = encodeC(rgb[2]);
      lut[i * 4 + 3] = sstep(0, 0.38, t);
    }
    return lut;
  }

  /* 四形状直译（txt L153-200）。out = { t1, t2, z, order } */
  var OUT = { t1: 0, t2: 0, z: 0, order: 0 };
  function shapeHorizon(px, py, time, aspect, softness) {
    var span = 0.5 * Math.max(aspect, 1);
    var x = px / span;
    var arch = -0.17 - 0.2 * x * x + 0.02 * Math.sin(time * 0.6);
    var soft = 0.05 + 0.17 * softness;
    var edge = py - arch;
    var rim = 0.38 * sstep(-soft, 0.42, edge);
    var sunx = 0.08 * Math.sin(time * 0.31) * span;
    var dx = (px - sunx) / (0.95 * span), dy = (py - 0.58) / 0.75;
    var sky = 0.55 + 0.45 * sstep(0.2, 0.95, Math.sqrt(dx * dx + dy * dy));
    OUT.t1 = rim; OUT.t2 = sky; OUT.z = sstep(0.18, 0.62, edge);
    OUT.order = clamp(edge * 1.3, 0, 1);
  }
  function shapePinch(px, py, time, aspect, softness) {
    var span = 0.5 * Math.max(aspect, 0.75);
    var x = px / span;
    var sway = 0.02 * Math.sin(x * 1.7 + time * 0.55);
    var breathe = 1 + 0.06 * Math.sin(time * 0.8);
    var width = (0.13 + 0.22 * x * x) * breathe * (0.85 + 0.35 * softness);
    var ay = Math.abs(py - sway);
    var y = ay / width;
    var t = Math.exp(-Math.pow(y, 2.2)) * (0.42 + 0.58 * Math.exp(-x * x * 1.8));
    OUT.t1 = t; OUT.t2 = t; OUT.z = 0;
    OUT.order = clamp(ay * 2.4 + Math.abs(x) * 0.3, 0, 1);
  }
  function shapeRise(px, py, time, aspect, softness) {
    var wide = Math.max(aspect, 0.9);
    var cx = 0.05 * Math.sin(time * 0.45) * wide, cy = -0.7;
    var rx = 0.82 * wide, ry = 0.64 * (1 + 0.04 * Math.sin(time * 0.8));
    var dx = (px - cx) / rx, dy = (py - cy) / ry;
    var d = Math.sqrt(dx * dx + dy * dy);
    var soft = 0.6 + 0.55 * softness;
    var t = clamp(Math.pow(clamp(1 - d, 0, 1), soft) * 1.35, 0, 1);
    OUT.t1 = t; OUT.t2 = t; OUT.z = 0;
    OUT.order = clamp((d - 0.2) * 1.3, 0, 1);
  }
  function shapeEclipse(px, py, time, aspect, softness) {
    var fit = Math.min(1, aspect * 1.25);
    var r = 0.23 * fit * (1 + 0.015 * Math.sin(time * 0.9));
    var ang = Math.atan2(py, px);
    var rays = noise2(Math.cos(ang) * 2.2 + time * 0.08, Math.sin(ang) * 2.2 + time * 0.08) * 0.8 + 0.6;
    var d = Math.sqrt(px * px + py * py) - r;
    var reach = (0.07 + 0.08 * softness) * rays * fit;
    var t = sstep(-0.006, 0.006 + 0.02 * softness, d) * Math.exp(-Math.max(d, 0) / reach);
    OUT.t1 = t; OUT.t2 = t; OUT.z = 0;
    OUT.order = clamp(d * 2, 0, 1);
  }

  function normalize(options, base) {
    var o = options || {};
    var d = base || null;
    var g = function (key, dv, fn) {
      var v = o[key] != null ? o[key] : (d ? d[key] : dv);
      return fn ? fn(v) : v;
    };
    var palette = g('colors', null, null);
    palette = Array.isArray(palette) && palette.length ? palette.slice(0, MAX_COLORS).map(String) : (d ? d.colors : DEFAULT_COLORS.slice(0, MAX_COLORS));
    if (palette.length === 1) palette = [palette[0], palette[0]];
    var chars = g('characters', null, null);
    chars = typeof chars === 'string' && chars.length ? chars : DEFAULT_CHARS;
    return {
      colors: palette,
      shape: SHAPES[g('shape', 'horizon')] != null ? g('shape', 'horizon') : 'horizon',
      characters: chars,
      cellSize: g('cellSize', 18, function (v) { return clamp(Number(v) || 18, 6, 64); }),
      density: g('density', 0.8, function (v) { return clamp(Number(v), 0, 1); }),
      glyphOpacity: g('glyphOpacity', 0.85, function (v) { return clamp(Number(v), 0, 1); }),
      glow: g('glow', 0.2, function (v) { return clamp(Number(v), 0, 2); }),
      depthOfField: g('depthOfField', 0, function (v) { return clamp(Number(v), 0, 1); }),
      flicker: g('flicker', 0.2, function (v) { return clamp(Number(v), 0, 1); }),
      softness: g('softness', 0.5, function (v) { return clamp(Number(v), 0, 1); }),
      scale: g('scale', 1, function (v) { return clamp(Number(v), 0.4, 2.5); }),
      flow: g('flow', 0.5, function (v) { return clamp(Number(v), 0, 2); }),
      drift: g('drift', 0, function (v) { return clamp(Number(v) || 0, 0, 2); }),
      speed: g('speed', 1, function (v) { return Math.max(0, Number(v) || 0); }),
      gradientOpacity: g('gradientOpacity', 0.9, function (v) { return clamp(Number(v), 0, 1); }),
      grain: g('grain', 0.08, function (v) { return clamp(Number(v), 0, 0.4); }),
      variation: g('variation', 0, function (v) { return Math.max(0, Number(v) || 0); }),
      mouseInteraction: g('mouseInteraction', true, function (v) { return !!v; }),
      scrambleRadius: g('scrambleRadius', 0.1, function (v) { return clamp(Number(v), 0.02, 0.4); }),
      clickEffect: g('clickEffect', 'wave', null),
      intro: g('intro', true, function (v) { return !!v; }),
      lightMode: g('lightMode', false, function (v) { return !!v; }),
      fontFamily: g('fontFamily', null, null) || DEFAULT_FONT,
      dpr: g('dpr', 0, function (v) { return Math.max(0, Number(v) || 0); })
    };
  }

  function init(el, options) {
    if (!el || el.nodeType !== 1) return null;
    var settings = normalize(options, null);

    el.classList.add('cz-ascii');
    var canvas = document.createElement('canvas');
    canvas.className = 'cz-ascii__canvas';
    canvas.setAttribute('aria-hidden', 'true');
    el.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    if (!ctx) {
      el.classList.remove('cz-ascii');
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      console.warn('[GradientASCII] Canvas 2D context unavailable.');
      return null;
    }

    var gradCv = document.createElement('canvas');   /* 低分辨率渐变（每 cell 一像素） */
    var gradCtx = gradCv.getContext('2d');
    var inkCv = document.createElement('canvas');    /* 字符层（bloom 源） */
    var inkCtx = inkCv.getContext('2d');
    var bloomCv = document.createElement('canvas');
    var bloomCtx = bloomCv.getContext('2d');

    /* 预生成 grain 噪点 */
    var grainCv = document.createElement('canvas');
    grainCv.width = GRAIN_SIZE; grainCv.height = GRAIN_SIZE;
    (function () {
      var g = grainCv.getContext('2d');
      if (!g) return;
      var img = g.createImageData(GRAIN_SIZE, GRAIN_SIZE);
      for (var i = 0; i < img.data.length; i += 4) {
        var v = (Math.random() * 255) | 0;
        img.data[i] = v; img.data[i + 1] = v; img.data[i + 2] = v; img.data[i + 3] = 255;
      }
      g.putImageData(img, 0, 0);
    })();
    var grainPattern = ctx.createPattern(grainCv, 'repeat');

    var motionQuery = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    var reduce = motionQuery ? motionQuery.matches : false;

    var lut = null, lutKey = '', colorStrings = null;
    var chars = [];
    var W = 1, H = 1, ratio = 1, aspect = 1;
    var time = 0, glyphTime = 0;
    var introClock = settings.intro && !reduce ? 0 : 1;
    var frameSeed = 0, grainClock = 0;
    var raf = 0, last = 0, visible = true, alive = true;
    var trail = [], clicks = [];
    var pointer = { x: 0, y: 0, inside: false };
    var cells = null; /* { cols, rows, alpha, charIdx, charAlpha, lutIdx, image } */

    var syncLut = function () {
      var key = settings.colors.join(',');
      if (key === lutKey && lut) return;
      lutKey = key;
      lut = buildLut(settings.colors);
      colorStrings = new Array(COLOR_STEPS);
      for (var s = 0; s < COLOR_STEPS; s++) {
        var li = Math.round(s / (COLOR_STEPS - 1) * (LUT_N - 1)) * 4;
        var r = Math.round((lut[li] * 0.55 + 0.03) * 255);
        var g = Math.round((lut[li + 1] * 0.55 + 0.03) * 255);
        var b = Math.round((lut[li + 2] * 0.55 + 0.03) * 255);
        colorStrings[s] = 'rgb(' + r + ',' + g + ',' + b + ')';
      }
    };
    var syncChars = function () {
      chars = [];
      var seen = Object.create(null);
      var list = Array.from(settings.characters);
      for (var i = 0; i < list.length; i++) {
        var ch = list[i];
        if (ch === '\n' || ch === '\r' || seen[ch]) continue;
        seen[ch] = 1;
        chars.push(ch);
      }
      if (!chars.length) chars.push(' ');
    };

    var render = function () {
      var s = settings;
      syncLut();
      syncChars();
      var cellH = s.cellSize * ratio;
      var cellW = cellH * CELL_RATIO;
      if (cellW < 2 || cellH < 2) return;
      var cols = Math.max(1, Math.ceil(W / cellW));
      var rows = Math.max(1, Math.ceil(H / cellH));
      var offX = (W - cols * cellW) / 2;
      var offY = (H - rows * cellH) / 2;

      if (gradCv.width !== cols || gradCv.height !== rows) {
        gradCv.width = cols; gradCv.height = rows;
      }
      if (!cells || cells.cols !== cols || cells.rows !== rows) {
        cells = {
          cols: cols, rows: rows,
          alpha: new Float32Array(cols * rows),
          charIdx: new Uint16Array(cols * rows),
          charAlpha: new Float32Array(cols * rows),
          lutIdx: new Uint8Array(cols * rows),
          image: new ImageData(cols, rows)
        };
      }

      var shapeIdx = SHAPES[s.shape] != null ? SHAPES[s.shape] : 0;
      var shaper = shapeIdx === 0 ? shapeHorizon : shapeIdx === 1 ? shapePinch : shapeIdx === 2 ? shapeRise : shapeEclipse;
      var n = settings.colors.length;
      var nChars = chars.length;
      var seedX = s.variation * 3.17, seedY = s.variation * 1.91;
      var rad2 = s.scrambleRadius * s.scrambleRadius;
      var img = cells.image.data;
      var clickEffect = CLICK_EFFECTS[s.clickEffect] != null ? CLICK_EFFECTS[s.clickEffect] : 1;
      var warpK = s.flow * (shapeIdx === 3 ? 0.04 : 0.18);

      for (var r = 0; r < rows; r++) {
        var py = 0.5 - (offY + (r + 0.5) * cellH) / H;
        for (var c = 0; c < cols; c++) {
          var px = ((offX + (c + 0.5) * cellW) / W - 0.5) * aspect;

          /* flow 扭曲（txt L212-216） */
          var qx = px / s.scale, qy = py / s.scale;
          if (s.drift > 0) {
            qx += s.drift * 0.12 * Math.sin(time * 0.85 + py * 4);
            qy += s.drift * (0.14 * Math.sin(px * 3 - time * 1.4) + 0.06 * Math.sin(px * 6 + time * 0.9));
          }
          if (warpK > 0.001) {
            var w1 = noise2(qx * 1.6 + seedX, qy * 1.6 + seedY + time * 0.3) - 0.5;
            var w2 = noise2(qx * 1.6 + seedY + 4.3, qy * 1.6 + seedX - time * 0.24) - 0.5;
            qx += w1 * warpK; qy += w2 * warpK;
          }

          shaper(qx, qy, time, aspect, s.softness);
          var reveal = clamp((introClock * 1.45 - OUT.order) / 0.45, 0, 1);
          reveal = reveal * reveal * (3 - 2 * reveal);
          var shrink = 0.7 + 0.3 * reveal;
          var t1 = clamp(OUT.t1 * shrink, 0, 1);
          var t2 = clamp(OUT.t2 * shrink, 0, 1);
          var li1 = Math.round(t1 * (LUT_N - 1)) * 4;
          var li2 = Math.round(t2 * (LUT_N - 1)) * 4;
          var z = OUT.z;
          var rr = lut[li1] + (lut[li2] - lut[li1]) * z;
          var gg = lut[li1 + 1] + (lut[li2 + 1] - lut[li1 + 1]) * z;
          var bb = lut[li1 + 2] + (lut[li2 + 2] - lut[li1 + 2]) * z;
          var aa = lut[li1 + 3] + (lut[li2 + 3] - lut[li1 + 3]) * z;
          var alphaGrad = aa * reveal * s.gradientOpacity;

          var id = r * cols + c;
          var pi = id * 4;
          img[pi] = rr * 255; img[pi + 1] = gg * 255; img[pi + 2] = bb * 255; img[pi + 3] = alphaGrad * 255;

          /* 字符：value ≈ 形状亮度 × 渐变 alpha × reveal（对应原版预乘 luma） */
          var value = (t1 + (t2 - t1) * z) * aa * reveal;
          if (s.lightMode) value = aa * reveal * (1 - (t1 + (t2 - t1) * z) * 0.9);
          var pick = hash12(c + s.variation * 7.31, r + s.variation * 7.31);
          var level = hash12(c * 1.73 + 4.1 + s.variation, r * 1.73 + 4.1 + s.variation);
          var tick = Math.floor(glyphTime * 9 + level * 9);
          var wobble = (hash12(c * 2.31 + tick * 17.7, r * 2.31 + tick * 17.7) - 0.5) * s.flicker * 0.4 + (level - 0.5) * 0.1;
          var tone = clamp(Math.pow(value, 0.75) + wobble, 0, 1);
          var index = Math.floor(tone * (nChars - 1));
          if (index > nChars - 1) index = nChars - 1; if (index < 0) index = 0;

          /* 乱码场：cursor trail + click wave/burst（txt L227-244） */
          var scramble = 0;
          for (var ti = 0; ti < trail.length; ti++) {
            var p = trail[ti];
            var ddx = px - p.x, ddy = py - p.y;
            var d2 = ddx * ddx + ddy * ddy;
            if (d2 > 6 * rad2) continue;
            var v = p.z * Math.exp(-d2 / rad2);
            if (v > scramble) scramble = v;
          }
          for (var ci = 0; ci < clicks.length; ci++) {
            var k = clicks[ci];
            var ddx2 = px - k.x, ddy2 = py - k.y;
            var dist = Math.sqrt(ddx2 * ddx2 + ddy2 * ddy2);
            if (clickEffect === 1) {
              var band = Math.abs(dist - k.z * 0.75);
              if (band < 0.25) {
                var vw = Math.exp(-(band / 0.06) * (band / 0.06)) * k.w;
                if (vw > scramble) scramble = vw;
              }
            } else if (clickEffect === 2) {
              var size = 0.08 + 0.22 * (1 - Math.exp(-k.z * 5));
              if (dist < size) {
                var vb = (1 - sstep(size * 0.6, size, dist)) * k.w;
                if (vb > scramble) scramble = vb;
              }
            }
          }
          var decode = Math.max(scramble, 1 - reveal);
          if (decode > 0.02) {
            var frame20 = Math.floor(glyphTime * 20);
            if (hash12(c * 3.7 + frame20 * 5.3, r * 3.7 + frame20 * 5.3) < decode * 1.25) {
              index = 1 + Math.floor(hash12(c + frame20 * 1.37, r + frame20 * 1.37) * (nChars - 1));
              if (index > nChars - 1) index = nChars - 1;
            }
          }

          var present = pick < s.density * (0.615 + 0.605 * tone) ? 1 : 0;
          var cutoff = sstep(0.03, 0.1, value);
          var focus = s.depthOfField > 0 && hash12(c * 0.71 + 9.2 + s.variation, r * 0.71 + 9.2 + s.variation) < s.depthOfField ? 1 : 0;
          var charA = s.glyphOpacity * present * cutoff * (0.6425 + 0.3575 * level) * (1 - focus * 0.5);

          cells.charIdx[id] = index;
          cells.charAlpha[id] = charA;
          cells.lutIdx[id] = Math.round(tone * (COLOR_STEPS - 1));
        }
      }

      /* 渐变底：低分辨率 ImageData → 双线性放大 */
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, W, H);
      gradCtx.putImageData(cells.image, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'low';
      ctx.drawImage(gradCv, 0, 0, W, H);

      /* 字符层（画到 inkCv 再以 lighter 叠加，同原版 base+glyph 加性合成） */
      inkCtx.setTransform(1, 0, 0, 1, 0, 0);
      inkCtx.clearRect(0, 0, W, H);
      inkCtx.font = '300 ' + Math.max(6, Math.round(cellH * FONT_SCALE)) + 'px ' + s.fontFamily;
      inkCtx.textAlign = 'center';
      inkCtx.textBaseline = 'middle';
      var lastStyle = null;
      for (var r2 = 0; r2 < rows; r2++) {
        var cy2 = offY + (r2 + 0.5) * cellH + cellH * 0.03;
        for (var c2 = 0; c2 < cols; c2++) {
          var id2 = r2 * cols + c2;
          var a2 = cells.charAlpha[id2];
          if (a2 < 0.01) continue;
          var style = colorStrings[cells.lutIdx[id2]];
          if (style !== lastStyle) { inkCtx.fillStyle = style; lastStyle = style; }
          inkCtx.globalAlpha = a2;
          inkCtx.fillText(chars[cells.charIdx[id2]], offX + (c2 + 0.5) * cellW, cy2);
        }
      }
      inkCtx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'lighter';
      ctx.drawImage(inkCv, 0, 0);
      ctx.globalCompositeOperation = 'source-over';

      /* 廉价 bloom：字符层 1/4 离屏 → 放大 lighter 叠加 */
      if (s.glow > 0.001) {
        var bw = bloomCv.width, bh = bloomCv.height;
        bloomCtx.setTransform(1, 0, 0, 1, 0, 0);
        bloomCtx.clearRect(0, 0, bw, bh);
        bloomCtx.imageSmoothingEnabled = true;
        bloomCtx.drawImage(inkCv, 0, 0, bw, bh);
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        ctx.globalAlpha = Math.min(1.5, s.glow);
        ctx.imageSmoothingEnabled = true;
        ctx.drawImage(bloomCv, 0, 0, W, H);
        ctx.restore();
      }

      /* grain 噪点（source-atop 只落在已有像素上；24fps 换偏移） */
      if (s.grain > 0.001 && grainPattern) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, W, H);
        ctx.clip();
        ctx.globalCompositeOperation = 'source-atop';
        ctx.globalAlpha = s.grain * 1.2;
        var ox = (frameSeed * 37) % GRAIN_SIZE;
        var oy = (frameSeed * 73) % GRAIN_SIZE;
        ctx.translate(-ox, -oy);
        ctx.fillStyle = grainPattern;
        ctx.fillRect(0, 0, W + GRAIN_SIZE, H + GRAIN_SIZE);
        ctx.restore();
      }
      ctx.globalAlpha = 1;
    };

    var updateInput = function (dt) {
      for (var i = trail.length - 1; i >= 0; i--) {
        trail[i].age += dt;
        if (trail[i].age > TRAIL_LIFE) trail.splice(i, 1);
      }
      for (var j = 0; j < trail.length; j++) {
        var k = 1 - trail[j].age / TRAIL_LIFE;
        trail[j].z = k * k;
      }
      for (var m = 0; m < clicks.length; m++) clicks[m].age += dt;
      for (var i2 = clicks.length - 1; i2 >= 0; i2--) {
        if (clicks[i2].age > CLICK_LIFE) clicks.splice(i2, 1);
      }
      for (var j2 = 0; j2 < clicks.length; j2++) {
        var k2 = clicks[j2].age / CLICK_LIFE;
        clicks[j2].z = clicks[j2].age;
        clicks[j2].w = Math.min(1, clicks[j2].age / 0.08) * (1 - k2) * (1 - k2);
      }
    };

    var frame = function (now) {
      raf = 0;
      if (!alive || !visible || document.hidden) return;
      var s = settings;
      var dt = last ? clamp((now - last) / 1000, 0.001, 0.05) : 1 / 60;
      last = now;
      if (!reduce) {
        time += dt * s.speed * 0.5;
        glyphTime += dt * Math.max(s.speed, 0.15);
      }
      if (introClock < 1) introClock = Math.min(1, introClock + dt / INTRO_SECONDS);
      grainClock += dt;
      if (!reduce && grainClock > 1 / 24) {
        grainClock = 0;
        frameSeed = (frameSeed + 1) % 97;
      }
      updateInput(dt);
      render();
      var busy = !reduce || introClock < 1 || clicks.length > 0 || trail.length > 0;
      if (busy) raf = requestAnimationFrame(frame);
      else last = 0;
    };

    var wake = function () {
      if (!raf && alive && visible && !document.hidden) raf = requestAnimationFrame(frame);
    };

    var resize = function () {
      var cw = Math.max(1, el.clientWidth);
      var ch = Math.max(1, el.clientHeight);
      ratio = Math.min(settings.dpr || window.devicePixelRatio || 1, 2, Math.sqrt(PIXEL_BUDGET / (cw * ch)));
      W = Math.max(1, Math.round(cw * ratio));
      H = Math.max(1, Math.round(ch * ratio));
      aspect = W / H;
      canvas.width = W;
      canvas.height = H;
      inkCv.width = W; inkCv.height = H;
      bloomCv.width = Math.max(1, Math.round(W / 4));
      bloomCv.height = Math.max(1, Math.round(H / 4));
      cells = null;
      render();
      wake();
    };

    var locate = function (event) {
      var rect = el.getBoundingClientRect();
      var x = (event.clientX - rect.left) / Math.max(1, rect.width);
      var y = 1 - (event.clientY - rect.top) / Math.max(1, rect.height);
      aspect = rect.width / Math.max(1, rect.height);
      pointer.inside = x >= 0 && x <= 1 && y >= 0 && y <= 1;
      pointer.x = (x - 0.5) * aspect;
      pointer.y = y - 0.5;
    };

    var onPointerMove = function (event) {
      locate(event);
      var s = settings;
      if (!pointer.inside || !s.mouseInteraction || reduce) return;
      var head = trail[0];
      var gap = head ? Math.hypot(pointer.x - head.x, pointer.y - head.y) : Infinity;
      if (gap < TRAIL_STEP) return;
      if (head && head.age < 0.1) {
        var steps = Math.min(6, Math.floor(gap / (TRAIL_STEP * 2)));
        for (var i = 1; i <= steps; i++) {
          var k = i / (steps + 1);
          trail.unshift({ x: head.x + (pointer.x - head.x) * k, y: head.y + (pointer.y - head.y) * k, age: 0, z: 1 });
        }
      }
      trail.unshift({ x: pointer.x, y: pointer.y, age: 0, z: 1 });
      if (trail.length > MAX_TRAIL) trail.length = MAX_TRAIL;
      wake();
    };

    var onPointerDown = function (event) {
      locate(event);
      var s = settings;
      if (!pointer.inside || CLICK_EFFECTS[s.clickEffect] === 0 || reduce) return;
      clicks.unshift({ x: pointer.x, y: pointer.y, age: 0, z: 0, w: 0 });
      if (clicks.length > MAX_CLICKS) clicks.pop();
      wake();
    };

    var pause = function () {
      cancelAnimationFrame(raf);
      raf = 0;
      last = 0;
    };
    var onVisibility = function () {
      pause();
      wake();
    };
    var onMotion = function (event) {
      reduce = event.matches;
      if (reduce) {
        introClock = 1;
        trail.length = 0;
        clicks.length = 0;
      }
      pause();
      wake();
    };

    var resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(el);
    var intersection = new IntersectionObserver(function (entries) {
      visible = entries.some(function (entry) { return entry.isIntersecting; });
      pause();
      wake();
    });
    intersection.observe(el);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    if (motionQuery) motionQuery.addEventListener('change', onMotion);

    /* spec §1.2：等字体就绪后重绘一次（字体晚到会导致首帧 fallback 字形） */
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        if (!alive) return;
        render();
        wake();
      });
      try {
        document.fonts.load('300 16px ' + settings.fontFamily, settings.characters).then(function () {
          if (!alive) return;
          render();
          wake();
        }, function () {});
      } catch (e) { /* 字体串不合法则忽略 */ }
    }

    resize();

    var setOptions = function (o) {
      if (!o) return;
      settings = normalize(o, settings);
      lutKey = '';
      resize();
      wake();
    };

    var destroy = function () {
      alive = false;
      visible = false;
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersection.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('visibilitychange', onVisibility);
      if (motionQuery) motionQuery.removeEventListener('change', onMotion);
      trail.length = 0;
      clicks.length = 0;
      cells = null;
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      el.classList.remove('cz-ascii');
    };

    return { el: el, destroy: destroy, setOptions: setOptions };
  }

  window.LZY = window.LZY || {};
  window.LZY.Comp = window.LZY.Comp || {};
  window.LZY.Comp.GradientASCII = { init: init };
})();
