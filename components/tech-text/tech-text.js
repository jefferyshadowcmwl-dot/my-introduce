/*!
 * LZY.Comp.TechText — 科技文字（ReactBits TechText 零依赖裁剪移植版）
 * Canvas 2D：实心字层 + 虚线轮廓层双 sprite 预渲染；
 * 保留 reveal(letter/area) / selection 选框 / clickKick 弹跳传播 / sweep 离屏自动扫过；
 * 删除 dragging / intro / guides / specks。
 * 物理与采样参数照抄原版：SPRING=320、damping=2√S*(1-bounce*0.96)、approach() 指数平滑。
 */
(function () {
  'use strict';
  window.LZY = window.LZY || {};
  window.LZY.Comp = window.LZY.Comp || {};

  var LABEL_FONT = '10px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
  var FALLOFF_STEPS = 8;
  var SPRING = 320;
  var KICK_DECAY = 0.62;
  var INHERIT = /^(currentcolor|inherit)$/i;

  var approach = function (current, target, dt, seconds) {
    return current + (target - current) * (1 - Math.exp(-dt / seconds));
  };
  var clamp01 = function (v) { return Math.min(1, Math.max(0, Number(v) || 0)); };

  var DEFAULTS = {
    text: 'LZY ENGINEER STATION',
    fontFamily: '',
    fontWeight: 600,
    fontSize: 150,
    letterSpacing: -0.05,
    align: 'center',
    color: 'currentColor',
    accentColor: 'currentColor',
    reveal: 'letter',      // 'letter' | 'area' | 'off'
    reach: 200,
    softness: 0.7,
    dashLength: 4,
    dashGap: 2,
    strokeWidth: 1.5,
    lineStyle: 'dashed',
    selection: true,
    labels: true,
    bounce: 0.4,
    clickKick: true,
    sweep: true,
    speed: 1
  };

  function init(el, options) {
    if (!el || el.nodeType !== 1) throw new Error('[TechText] init 需要一个挂载元素');
    var settings = Object.assign({}, DEFAULTS, options || {});
    var reducedMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    el.classList.add('cz-tech-text');
    var canvas = document.createElement('canvas');
    canvas.className = 'cz-tech-text-canvas';
    canvas.setAttribute('role', 'img');
    el.appendChild(canvas);
    var sr = document.createElement('span');
    sr.className = 'cz-tech-text-sr';
    sr.textContent = settings.text;
    el.appendChild(sr);
    var syncA11y = function () {
      canvas.setAttribute('aria-label', settings.text);
      sr.textContent = settings.text;
    };
    syncA11y();

    var ctx = canvas.getContext('2d');
    var scratch = document.createElement('canvas');
    var scratchCtx = scratch.getContext('2d');
    if (!ctx || !scratchCtx) return { destroy: function () {}, setOptions: function () {}, el: el };

    var width = 1, height = 1, dpr = 1;
    var raf = 0, last = performance.now();
    var visible = false, alive = true;
    var layoutKey = '', requestedFont = '';
    var fontsReady = !document.fonts;
    var word = null, glyphs = [];
    var presence = 0, clock = 0, pulse = 0, placed = false;
    var cursor = '';
    var kicks = [];
    var press = { x: 0, y: 0, time: 0, index: -1 };
    var pointer = { x: 0, y: 0, inside: false };
    var lens = { x: 0, y: 0 };
    var frame = { x1: 0, y1: 0, x2: 0, y2: 0, alpha: 0, index: -1 };

    var family = function () {
      return settings.fontFamily || getComputedStyle(el).fontFamily || 'sans-serif';
    };
    var fontFor = function (size) { return settings.fontWeight + ' ' + size + 'px ' + family(); };

    var palette = function () {
      var current = getComputedStyle(el).color || '#000000';
      var pick = function (v) { return (!v || INHERIT.test(String(v).trim()) ? current : v); };
      return { ink: pick(settings.color), accent: pick(settings.accentColor) };
    };

    var setFont = function (target, size) {
      target.font = fontFor(size);
      if ('letterSpacing' in target) target.letterSpacing = (settings.letterSpacing * size) + 'px';
      target.textAlign = 'left';
      target.textBaseline = 'alphabetic';
    };

    /* 双 sprite 预渲染：实心 fillText / 虚线 strokeText 后 destination-out fillText 挖空 */
    var sprite = function (view, glyph, stroke, ink) {
      var s = settings;
      var pad = Math.ceil(s.strokeWidth * 2 + 4);
      var left = glyph.box.x1 - pad;
      var top = glyph.box.y1 - pad;
      var w = glyph.box.x2 - glyph.box.x1 + pad * 2;
      var h = glyph.box.y2 - glyph.box.y1 + pad * 2;
      var image = document.createElement('canvas');
      image.width = Math.max(1, Math.ceil(w * dpr));
      image.height = Math.max(1, Math.ceil(h * dpr));
      var c = image.getContext('2d');
      if (!c) return { image: image, left: left, top: top };
      c.setTransform(dpr, 0, 0, dpr, -left * dpr, -top * dpr);
      setFont(c, view.size);
      if (stroke) {
        c.lineJoin = 'round';
        c.lineWidth = s.strokeWidth * 2;
        c.lineCap = 'butt';
        c.strokeStyle = ink;
        if (s.lineStyle !== 'solid') c.setLineDash([Math.max(1, s.dashLength), Math.max(1, s.dashGap)]);
        c.strokeText(glyph.char, glyph.x, view.baseline);
        c.setLineDash([]);
        c.globalCompositeOperation = 'destination-out';
        c.fillStyle = '#000000';
        c.fillText(glyph.char, glyph.x, view.baseline);
        c.globalCompositeOperation = 'source-over';
      } else {
        c.fillStyle = ink;
        c.fillText(glyph.char, glyph.x, view.baseline);
      }
      return { image: image, left: left, top: top };
    };

    /* measureText 布局 + 自适应缩放（宽 90% / 高 66% 内取最小缩放） */
    var ensureLayout = function (ink) {
      var s = settings;
      var key = [s.text, family(), s.fontWeight, s.fontSize, s.letterSpacing, s.align, ink,
        s.dashLength, s.dashGap, s.strokeWidth, s.lineStyle, width, height, dpr].join('|');
      if (key === layoutKey && word) return word;
      layoutKey = key;
      var wanted = fontFor(64);
      if (document.fonts && wanted !== requestedFont) {
        requestedFont = wanted;
        document.fonts.load(wanted, s.text).then(function () { layoutKey = ''; wake(); }, function () {});
      }
      var probe = scratchCtx;
      setFont(probe, s.fontSize);
      var m = probe.measureText(s.text);
      var fit = Math.min(
        1,
        (width * 0.9) / Math.max(m.actualBoundingBoxLeft + m.actualBoundingBoxRight, 1),
        (height * 0.66) / Math.max(m.actualBoundingBoxAscent + m.actualBoundingBoxDescent, 1)
      );
      var size = s.fontSize * fit;
      setFont(probe, size);
      m = probe.measureText(s.text);
      var inkWidth = m.actualBoundingBoxLeft + m.actualBoundingBoxRight;
      var inkHeight = m.actualBoundingBoxAscent + m.actualBoundingBoxDescent;
      var margin = width * 0.05;
      var start = s.align === 'left' ? margin : s.align === 'right' ? width - margin - inkWidth : (width - inkWidth) / 2;
      var x = start + m.actualBoundingBoxLeft;
      var baseline = (height - inkHeight) / 2 + m.actualBoundingBoxAscent;
      word = {
        size: size,
        baseline: baseline,
        left: x - m.actualBoundingBoxLeft,
        right: x + m.actualBoundingBoxRight,
        top: baseline - m.actualBoundingBoxAscent,
        bottom: baseline + m.actualBoundingBoxDescent
      };
      var chars = Array.from(s.text);
      var previous = glyphs;
      glyphs = [];
      var prefix = '';
      chars.forEach(function (char, i) {
        prefix += char;
        var own = probe.measureText(char);
        var gx = x + probe.measureText(prefix).width - own.width;
        if (!char.trim()) return;
        var base = {
          char: char,
          x: gx,
          box: {
            x1: gx - own.actualBoundingBoxLeft,
            y1: baseline - own.actualBoundingBoxAscent,
            x2: gx + own.actualBoundingBoxRight,
            y2: baseline + own.actualBoundingBoxDescent
          }
        };
        var kept = previous[glyphs.length];
        glyphs.push({
          char: char, x: gx, box: base.box, index: i,
          offset: kept && kept.char === char ? kept.offset : { x: 0, y: 0 },
          velocity: { x: 0, y: 0 },
          outline: 0,
          fill: sprite(word, base, false, ink),
          dashes: sprite(word, base, true, ink)
        });
      });
      frame.index = -1;
      return word;
    };

    var glyphAt = function (x, y) {
      if (!word || y < word.top - 24 || y > word.bottom + 24) return -1;
      var best = -1, bestDistance = Infinity;
      glyphs.forEach(function (glyph, i) {
        var x1 = glyph.box.x1 + glyph.offset.x;
        var x2 = glyph.box.x2 + glyph.offset.x;
        var d = x < x1 ? x1 - x : x > x2 ? x - x2 : 0;
        if (d < bestDistance) { bestDistance = d; best = i; }
      });
      return bestDistance < 28 ? best : -1;
    };

    /* 径向渐变 falloff（softness 控制实心→轮廓过渡带） */
    var falloff = function (target, cx, cy, radius, strength, softness) {
      var inner = Math.min(1, Math.max(0, 1 - softness));
      var gradient = target.createRadialGradient(cx, cy, 0, cx, cy, radius);
      gradient.addColorStop(0, 'rgba(0, 0, 0, ' + strength + ')');
      if (inner > 0.995) {
        gradient.addColorStop(0.995, 'rgba(0, 0, 0, ' + strength + ')');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        return gradient;
      }
      for (var i = 0; i <= FALLOFF_STEPS; i++) {
        var t = i / FALLOFF_STEPS;
        var eased = t * t * (3 - 2 * t);
        gradient.addColorStop(inner + (1 - inner) * t, 'rgba(0, 0, 0, ' + (strength * (1 - eased)) + ')');
      }
      return gradient;
    };

    var blit = function (target, art, dx, dy, originX, originY) {
      target.drawImage(
        art.image,
        Math.round((art.left + dx) * dpr - originX),
        Math.round((art.top + dy) * dpr - originY)
      );
    };

    /* area 模式：实心层按指针径向擦除，擦除区补画虚线轮廓层 */
    var drawReveal = function () {
      var s = settings;
      var radius = s.reach * dpr;
      var cx = lens.x * dpr;
      var cy = lens.y * dpr;
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = falloff(ctx, cx, cy, radius, presence, s.softness);
      ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
      ctx.globalCompositeOperation = 'source-over';

      var x0 = Math.max(0, Math.floor(cx - radius));
      var y0 = Math.max(0, Math.floor(cy - radius));
      var x1 = Math.min(canvas.width, Math.ceil(cx + radius));
      var y1 = Math.min(canvas.height, Math.ceil(cy + radius));
      if (x1 <= x0 || y1 <= y0) return;
      var w = x1 - x0, h = y1 - y0;
      if (scratch.width < w || scratch.height < h) {
        scratch.width = Math.max(scratch.width, w);
        scratch.height = Math.max(scratch.height, h);
      }
      scratchCtx.setTransform(1, 0, 0, 1, 0, 0);
      scratchCtx.globalCompositeOperation = 'source-over';
      scratchCtx.clearRect(0, 0, w, h);
      for (var i = 0; i < glyphs.length; i++) {
        var g = glyphs[i];
        blit(scratchCtx, g.dashes, g.offset.x, g.offset.y, x0, y0);
      }
      scratchCtx.globalCompositeOperation = 'destination-in';
      scratchCtx.fillStyle = falloff(scratchCtx, cx - x0, cy - y0, radius, 1, s.softness);
      scratchCtx.fillRect(0, 0, w, h);
      scratchCtx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = presence;
      ctx.drawImage(scratch, 0, 0, w, h, x0, y0, w, h);
      ctx.globalAlpha = 1;
    };

    var crisp = function (value) { return (Math.round(value * dpr) + 0.5) / dpr; };

    /* selection 选框：细框 + 四角角标 + 刻度标签 */
    var drawFrame = function (accent) {
      var glyph = glyphs[frame.index];
      if (!glyph || frame.alpha < 0.01) return;
      var a = frame.alpha;
      var x1 = crisp(frame.x1), y1 = crisp(frame.y1), x2 = crisp(frame.x2), y2 = crisp(frame.y2);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = accent;
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.rect(x1, y1, x2 - x1, y2 - y1);
      ctx.globalAlpha = 0.5 * a;
      ctx.stroke();
      ctx.beginPath();
      var corners = [[x1, y1], [x2, y1], [x2, y2], [x1, y2]];
      for (var i = 0; i < corners.length; i++) {
        ctx.rect(Math.round(corners[i][0]) - 2, Math.round(corners[i][1]) - 2, 5, 5);
      }
      ctx.globalAlpha = 0.95 * a;
      ctx.fill();
      ctx.globalAlpha = 1;
      if (settings.labels) {
        ctx.font = LABEL_FONT;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'bottom';
        ctx.fillStyle = accent;
        ctx.globalAlpha = 0.62 * a;
        var label = glyph.char + '  ' + Math.round(glyph.box.x2 - glyph.box.x1) + ' × ' +
          Math.round(glyph.box.y2 - glyph.box.y1);
        ctx.fillText(label, Math.round(frame.x1), Math.round(frame.y1) - 7);
        ctx.globalAlpha = 1;
      }
    };

    /* clickKick：点击字向上弹，按 KICK_DECAY 向邻字传播 */
    var kick = function (index) {
      var strength = (word ? word.size : 120) * 11;
      kicks.push({ index: index, at: pulse, velocity: strength });
      for (var d = 1; d < glyphs.length; d++) {
        var velocity = strength * Math.pow(KICK_DECAY, d);
        if (velocity < 30) break;
        var j1 = index - d, j2 = index + d;
        if (j1 >= 0 && j1 < glyphs.length) kicks.push({ index: j1, at: pulse + d * 0.055, velocity: velocity });
        if (j2 >= 0 && j2 < glyphs.length) kicks.push({ index: j2, at: pulse + d * 0.055, velocity: velocity });
      }
      wake();
    };

    var tick = function (now) {
      raf = 0;
      var s = settings;
      if (!alive || !s) return;
      var dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;
      var pal = palette();
      var view = ensureLayout(pal.ink);
      var damping = 2 * Math.sqrt(SPRING) * (1 - clamp01(s.bounce) * 0.96);

      var sweeping = s.sweep && !pointer.inside;
      if (sweeping) clock += dt * s.speed;
      pulse += dt;
      var targetX = pointer.x, targetY = pointer.y;
      if (sweeping) {
        targetX = view.left + (view.right - view.left) * (0.5 - 0.5 * Math.cos(clock * 0.45));
        targetY = view.top + (view.bottom - view.top) * (0.45 + 0.1 * Math.sin(clock * 0.8));
      }
      var active = pointer.inside || sweeping;
      if (active && !placed) { lens.x = targetX; lens.y = targetY; }
      if (active) {
        var lag = pointer.inside ? 0.05 : 0.22;
        lens.x = approach(lens.x, targetX, dt, lag);
        lens.y = approach(lens.y, targetY, dt, lag);
      }
      placed = active;
      var presenceTarget = s.reveal === 'area' && active ? 1 : 0;
      presence = approach(presence, presenceTarget, dt, 0.16);

      for (var k = kicks.length - 1; k >= 0; k--) {
        if (kicks[k].at > pulse) continue;
        var kg = glyphs[kicks[k].index];
        if (kg) kg.velocity.y -= kicks[k].velocity;
        kicks.splice(k, 1);
      }

      var moving = false;
      for (var m = 0; m < glyphs.length; m++) {
        var glyph = glyphs[m];
        var offset = glyph.offset, velocity = glyph.velocity;
        if (Math.abs(offset.x) < 0.05 && Math.abs(offset.y) < 0.05 && Math.hypot(velocity.x, velocity.y) < 0.5) {
          offset.x = 0; offset.y = 0; velocity.x = 0; velocity.y = 0;
          continue;
        }
        velocity.x += (-SPRING * offset.x - damping * velocity.x) * dt;
        velocity.y += (-SPRING * offset.y - damping * velocity.y) * dt;
        offset.x += velocity.x * dt;
        offset.y += velocity.y * dt;
        moving = true;
      }

      var focus = active ? glyphAt(lens.x, lens.y) : -1;
      if (focus >= 0 && s.selection) {
        var fg = glyphs[focus];
        var bx1 = fg.box.x1 + fg.offset.x - 6;
        var by1 = fg.box.y1 + fg.offset.y - 6;
        var bx2 = fg.box.x2 + fg.offset.x + 6;
        var by2 = fg.box.y2 + fg.offset.y + 6;
        if (frame.index < 0 || frame.alpha < 0.02) {
          frame.x1 = bx1; frame.y1 = by1; frame.x2 = bx2; frame.y2 = by2;
        }
        frame.x1 = approach(frame.x1, bx1, dt, 0.08);
        frame.y1 = approach(frame.y1, by1, dt, 0.08);
        frame.x2 = approach(frame.x2, bx2, dt, 0.08);
        frame.y2 = approach(frame.y2, by2, dt, 0.08);
        frame.index = focus;
      }
      frame.alpha = approach(frame.alpha, focus >= 0 && s.selection ? 1 : 0, dt, 0.1);

      for (var i = 0; i < glyphs.length; i++) {
        var target = s.reveal === 'letter' && i === focus ? 1 : 0;
        var g2 = glyphs[i];
        g2.outline = approach(g2.outline, target, dt, 0.09);
        if (Math.abs(g2.outline - target) > 0.002) moving = true;
        else g2.outline = target;
      }

      var hovering = focus >= 0 && pointer.inside;
      var nextCursor = hovering && s.clickKick ? 'pointer' : '';
      if (nextCursor !== cursor) { cursor = nextCursor; el.style.cursor = nextCursor; }

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      /* 弹跳中的字留虚线残影 */
      for (var r = 0; r < glyphs.length; r++) {
        var rg = glyphs[r];
        var moved = Math.hypot(rg.offset.x, rg.offset.y);
        if (moved > 1) {
          ctx.globalAlpha = Math.min(1, moved / 24) * 0.55;
          blit(ctx, rg.dashes, rg.offset.x, rg.offset.y, 0, 0);
          ctx.globalAlpha = 1;
        }
      }
      for (var d2 = 0; d2 < glyphs.length; d2++) {
        var dg = glyphs[d2];
        if (dg.outline < 0.999) {
          ctx.globalAlpha = 1 - dg.outline;
          blit(ctx, dg.fill, dg.offset.x, dg.offset.y, 0, 0);
        }
        if (dg.outline > 0.001) {
          ctx.globalAlpha = dg.outline;
          blit(ctx, dg.dashes, dg.offset.x, dg.offset.y, 0, 0);
        }
        ctx.globalAlpha = 1;
      }
      if (presence > 0.001) drawReveal();
      drawFrame(pal.accent);

      var settling = moving || kicks.length > 0 ||
        Math.abs(presence - presenceTarget) > 0.002 ||
        (frame.alpha > 0.01 && frame.alpha < 0.99);
      if ((active || settling) && visible && alive) raf = requestAnimationFrame(tick);
    };

    var wake = function () {
      if (raf || !visible || !alive || !fontsReady) return;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };

    /* reduced-motion：静态 poster（一次绘制实心字，无 rAF 循环、不绑指针动画） */
    var renderStatic = function () {
      var pal = palette();
      ensureLayout(pal.ink);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalAlpha = 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < glyphs.length; i++) blit(ctx, glyphs[i].fill, 0, 0, 0, 0);
      ctx.globalAlpha = 1;
    };

    var resize = function () {
      width = Math.max(1, el.clientWidth);
      height = Math.max(1, el.clientHeight);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      layoutKey = '';
      if (reducedMotion) { if (fontsReady) renderStatic(); }
      else wake();
    };

    var locate = function (e) {
      var rect = el.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    var onMove = function (e) { locate(e); pointer.inside = true; wake(); };
    var onLeave = function () { pointer.inside = false; wake(); };
    var onDown = function (e) {
      locate(e);
      pointer.inside = true;
      var primary = e.pointerType !== 'mouse' || e.button === 0;
      press.x = pointer.x; press.y = pointer.y;
      press.time = performance.now();
      press.index = primary ? glyphAt(pointer.x, pointer.y) : -1;
      wake();
    };
    var onUp = function (e) {
      if (e.type === 'pointerup' && press.index >= 0 && settings.clickKick && !reducedMotion &&
        performance.now() - press.time < 450) {
        var rect = el.getBoundingClientRect();
        if (Math.hypot(e.clientX - rect.left - press.x, e.clientY - rect.top - press.y) < 6) kick(press.index);
      }
      press.index = -1;
      wake();
    };

    var resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(el);
    var intersectionObserver = null;
    var themeObserver = null;
    if (reducedMotion) {
      if (document.fonts) {
        document.fonts.ready.then(function () {
          if (!alive) return;
          fontsReady = true; layoutKey = ''; renderStatic();
        }, function () {});
      } else {
        renderStatic();
      }
      resize();
    } else {
      intersectionObserver = new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        wake();
      });
      intersectionObserver.observe(el);
      themeObserver = new MutationObserver(function () { layoutKey = ''; wake(); });
      themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'style', 'data-theme'] });
      if (document.fonts) {
        document.fonts.ready.then(function () { fontsReady = true; layoutKey = ''; wake(); }, function () {});
      }
      el.addEventListener('pointermove', onMove, { passive: true });
      el.addEventListener('pointerenter', onMove, { passive: true });
      el.addEventListener('pointerdown', onDown, { passive: true });
      el.addEventListener('pointerup', onUp, { passive: true });
      el.addEventListener('pointercancel', onUp, { passive: true });
      el.addEventListener('pointerleave', onLeave, { passive: true });
      resize();
      /* 离屏时停帧；visibilitychange 切页暂停（spec §1.4 三件套） */
      document.addEventListener('visibilitychange', onVisChange);
    }

    function onVisChange() {
      if (document.hidden) { if (raf) { cancelAnimationFrame(raf); raf = 0; } }
      else wake();
    }

    var destroy = function () {
      alive = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      resizeObserver.disconnect();
      if (intersectionObserver) intersectionObserver.disconnect();
      if (themeObserver) themeObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisChange);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerenter', onMove);
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointercancel', onUp);
      el.removeEventListener('pointerleave', onLeave);
      el.style.cursor = '';
      el.classList.remove('cz-tech-text');
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      if (sr.parentNode) sr.parentNode.removeChild(sr);
      glyphs = [];
      word = null;
    };

    var setOptions = function (o) {
      if (!o) return;
      Object.assign(settings, o);
      syncA11y();
      kicks.length = 0;
      layoutKey = '';
      if (reducedMotion) { if (fontsReady) renderStatic(); }
      else wake();
    };

    return { destroy: destroy, setOptions: setOptions, el: el };
  }

  window.LZY.Comp.TechText = { init: init };
})();
