(function () {
  'use strict';

  var DEFAULTS = {
    colors: ['#F2F0EA', '#78CFC5', '#C8B285'],
    backgroundColor: '#78CFC5',
    speed: 0.42,
    streakCount: 3,
    streakWidth: 0.75,
    streakLength: 1.1,
    density: 0.58,
    twinkle: 0.22,
    glow: 0.86,
    backgroundGlow: 0.14,
    headGlow: 0.55,
    depth: 0.65,
    bloom: 0.22,
    zoom: 3,
    opacity: 0.86,
    mouseInteraction: true,
    mouseStrength: 0.24,
    mouseRadius: 0.45,
    mouseDampening: 0.18,
    lens: 0.28,
    holdToWarp: true,
    intro: true,
    fade: 0.16,
    lightMode: false,
    mixBlendMode: '',
    paused: false,
    dpr: 0
  };

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, Number(value) || 0));
  }

  function rgb(value) {
    var match = /^#([\da-f]{3}|[\da-f]{6})$/i.exec(String(value || ''));
    if (!match) return [242, 240, 234];
    var hex = match[1];
    if (hex.length === 3) hex = hex.replace(/./g, function (c) { return c + c; });
    return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)];
  }

  function color(value, alpha) {
    var c = rgb(value);
    return 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + clamp(alpha, 0, 1) + ')';
  }

  function random(seed) {
    var state = seed >>> 0;
    return function () {
      state += 0x6d2b79f5;
      var t = state;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function createInstance(el, options) {
    var opts = {};
    Object.keys(DEFAULTS).forEach(function (key) { opts[key] = DEFAULTS[key]; });
    Object.keys(options || {}).forEach(function (key) {
      if (options[key] !== undefined) opts[key] = options[key];
    });

    var root = document.createElement('div');
    root.className = 'cz-lightfall';
    root.setAttribute('aria-hidden', 'true');
    var canvas = document.createElement('canvas');
    canvas.className = 'cz-lightfall__canvas';
    canvas.setAttribute('aria-hidden', 'true');
    root.appendChild(canvas);
    el.appendChild(root);

    var ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!ctx) root.classList.add('cz-lightfall--poster');
    var motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    var mobile = window.matchMedia('(max-width: 767px)');
    var alive = true;
    var visible = true;
    var raf = 0;
    var last = 0;
    var lastPaint = 0;
    var travel = 7.3;
    var intro = opts.intro && !motion.matches ? 0 : 1;
    var warp = 0;
    var touch = 0;
    var mouseX = 0;
    var mouseY = 0;
    var lensX = 0;
    var lensY = 0;
    var width = 1;
    var height = 1;
    var streaks = [];
    var pointer = { x: 0, y: 0, inside: false, held: false };
    var topGlow = null;
    var fadeX = null;
    var fadeY = null;

    function rebuild() {
      var rand = random(324 + Math.round(clamp(opts.density, 0, 1) * 100));
      var count = Math.round(20 + clamp(opts.streakCount, 1, 16) * 10 + clamp(opts.density, 0, 1) * 22);
      if (mobile.matches) count = Math.min(count, 58);
      streaks = [];
      for (var i = 0; i < count; i++) {
        streaks.push({
          x: rand() * 2 - 1,
          z: 0.18 + rand() * 0.82,
          phase: rand(),
          rate: 0.72 + rand() * 0.58,
          tail: 0.58 + rand() * 0.84,
          sway: rand() * 8 + 2,
          tone: Math.floor(rand() * 20),
          flicker: rand() * Math.PI * 2
        });
      }
    }

    function resize() {
      if (!ctx) return;
      width = Math.max(1, el.clientWidth);
      height = Math.max(1, el.clientHeight);
      var cap = mobile.matches ? 1 : 1.5;
      var ratio = Math.min(opts.dpr > 0 ? opts.dpr : (window.devicePixelRatio || 1), cap);
      ratio = Math.min(ratio, 1800 / Math.max(width, height));
      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      topGlow = ctx.createRadialGradient(width * 0.5, -height * 0.08, 0, width * 0.5, 0, Math.max(width * 0.58, height * 0.48));
      topGlow.addColorStop(0, color(opts.backgroundColor, clamp(opts.backgroundGlow, 0, 1)));
      topGlow.addColorStop(0.42, color(opts.backgroundColor, clamp(opts.backgroundGlow, 0, 1) * 0.28));
      topGlow.addColorStop(1, color(opts.backgroundColor, 0));
      fadeX = ctx.createLinearGradient(0, 0, width, 0);
      fadeY = ctx.createLinearGradient(0, 0, 0, height);
      var edge = clamp(opts.fade, 0, 0.48);
      [fadeX, fadeY].forEach(function (gradient) {
        gradient.addColorStop(0, 'rgba(0,0,0,0)');
        gradient.addColorStop(edge, '#000');
        gradient.addColorStop(1 - edge, '#000');
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
      });
      render();
    }

    function render() {
      if (!ctx || !topGlow) return;
      ctx.setTransform(canvas.width / width, 0, 0, canvas.height / height, 0, 0);
      ctx.clearRect(0, 0, width, height);
      root.style.opacity = clamp(opts.opacity, 0, 1);
      root.style.mixBlendMode = opts.mixBlendMode || '';
      ctx.fillStyle = topGlow;
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = opts.lightMode ? 'source-over' : 'lighter';
      ctx.lineCap = 'round';
      var palette = Array.isArray(opts.colors) && opts.colors.length ? opts.colors : DEFAULTS.colors;
      var speed = clamp(opts.speed, 0, 4);
      var stretch = 1 + (1 - intro) * 3.5 + warp * 2.2;
      var glow = clamp(opts.glow, 0, 3);
      var zoom = Math.max(0.5, Number(opts.zoom) || 3) / 3;
      var engaged = opts.mouseInteraction && !motion.matches ? touch : 0;
      for (var i = 0; i < streaks.length; i++) {
        var s = streaks[i];
        var p = (s.phase + travel * s.rate * speed * 0.12) % 1;
        var spread = width * (0.1 + p * 0.48) * zoom;
        var x = width * 0.5 + s.x * spread + Math.sin(p * 5 + s.flicker) * s.sway * p;
        var y = -height * 0.08 + p * height * 1.18;
        var dx = x - lensX;
        var dy = y - lensY;
        var distance = Math.sqrt(dx * dx + dy * dy);
        var radius = Math.max(60, width * clamp(opts.mouseRadius, 0.05, 1) * 0.42);
        var influence = engaged * Math.exp(-distance * distance / (radius * radius));
        x += dx * influence * clamp(opts.lens, 0, 1) * 0.28;
        var tail = height * (0.045 + s.z * 0.13) * s.tail * Math.max(0.05, opts.streakLength) * stretch;
        var tone = palette[s.tone % palette.length];
        var flicker = 1 - clamp(opts.twinkle, 0, 1) * (0.5 + 0.5 * Math.sin(travel * 2.2 + s.flicker));
        var depthLight = 1 - clamp(opts.depth, 0, 1) * (1 - s.z) * 0.7;
        var alpha = glow * flicker * depthLight * (0.3 + p * 0.7) * (1 + influence * opts.mouseStrength * 2);
        var line = ctx.createLinearGradient(x, y - tail, x, y);
        line.addColorStop(0, color(tone, 0));
        line.addColorStop(0.62, color(tone, alpha * 0.18));
        line.addColorStop(0.92, color(tone, alpha * 0.72));
        line.addColorStop(1, color('#F2F0EA', alpha * clamp(opts.headGlow, 0, 1)));
        if (opts.bloom > 0) {
          ctx.strokeStyle = color(tone, alpha * opts.bloom * 0.12);
          ctx.lineWidth = Math.max(0.5, opts.streakWidth * s.z * 5);
          ctx.beginPath();
          ctx.moveTo(x, y - tail * 0.76);
          ctx.lineTo(x, y);
          ctx.stroke();
        }
        ctx.strokeStyle = line;
        ctx.lineWidth = Math.max(0.45, opts.streakWidth * (0.45 + s.z * 1.15));
        ctx.beginPath();
        ctx.moveTo(x, y - tail);
        ctx.lineTo(x, y);
        ctx.stroke();
        if (s.z > 0.58 && opts.headGlow > 0) {
          ctx.fillStyle = color('#F2F0EA', alpha * opts.headGlow * 0.72);
          ctx.beginPath();
          ctx.arc(x, y, Math.max(0.45, opts.streakWidth * s.z * 0.82), 0, Math.PI * 2);
          ctx.fill();
        }
      }
      if (opts.fade > 0) {
        ctx.globalCompositeOperation = 'destination-in';
        ctx.fillStyle = fadeX;
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = fadeY;
        ctx.fillRect(0, 0, width, height);
      }
      ctx.globalCompositeOperation = 'source-over';
    }

    function frame(now) {
      raf = 0;
      if (!alive || !visible || document.hidden) { last = 0; return; }
      var dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
      last = now;
      var running = !opts.paused && !motion.matches && opts.speed !== 0;
      if (running) {
        intro = Math.min(1, intro + dt / 2.2);
        var holding = opts.holdToWarp && pointer.held && pointer.inside;
        warp += ((holding ? 1 : 0) - warp) * (1 - Math.exp(-dt * 2));
        travel += dt * (1 + (1 - intro) * 8 + warp * 5);
      } else {
        intro = 1;
        warp = 0;
      }
      var engaged = opts.mouseInteraction && pointer.inside && !motion.matches;
      var follow = opts.mouseDampening > 0 ? 1 - Math.exp(-dt / opts.mouseDampening) : 1;
      mouseX += (pointer.x - mouseX) * follow;
      mouseY += (pointer.y - mouseY) * follow;
      lensX += (mouseX - lensX) * (1 - Math.exp(-dt * 6));
      lensY += (mouseY - lensY) * (1 - Math.exp(-dt * 6));
      touch += ((engaged ? 1 : 0) - touch) * (1 - Math.exp(-dt * 4));
      var interval = mobile.matches ? 1000 / 30 : 1000 / 45;
      if (now - lastPaint >= interval) {
        render();
        lastPaint = now;
      }
      var settling = Math.abs((engaged ? 1 : 0) - touch) > 0.003 || warp > 0.002 || intro < 1;
      if (running || settling) raf = requestAnimationFrame(frame);
      else last = 0;
    }

    function wake() {
      if (!alive || !visible || document.hidden || !ctx) return;
      if (!raf) raf = requestAnimationFrame(frame);
      else if (opts.paused || motion.matches) render();
    }

    function locate(event) {
      var rect = el.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.inside = pointer.x >= 0 && pointer.y >= 0 && pointer.x <= rect.width && pointer.y <= rect.height;
    }

    function onMove(event) {
      if (!visible || document.hidden || opts.paused || motion.matches || !opts.mouseInteraction) return;
      locate(event);
      wake();
    }
    function onDown(event) {
      if (!visible || document.hidden || opts.paused || motion.matches || !opts.mouseInteraction) return;
      locate(event);
      pointer.held = pointer.inside;
      wake();
    }
    function onUp() { pointer.held = false; wake(); }
    function onLeave() { pointer.inside = false; pointer.held = false; wake(); }
    function onVisibility() { last = 0; wake(); }
    function onMotion() { last = 0; intro = 1; render(); wake(); }

    var resizeObserver = new ResizeObserver(resize);
    var intersection = new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      last = 0;
      if (visible) wake();
    }, { threshold: 0.01 });
    resizeObserver.observe(el);
    intersection.observe(el);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    window.addEventListener('pointercancel', onUp, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    document.addEventListener('visibilitychange', onVisibility);
    motion.addEventListener('change', onMotion);
    rebuild();
    resize();
    wake();

    return {
      el: el,
      destroy: function () {
        if (!alive) return;
        alive = false;
        cancelAnimationFrame(raf);
        resizeObserver.disconnect();
        intersection.disconnect();
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerdown', onDown);
        window.removeEventListener('pointerup', onUp);
        window.removeEventListener('pointercancel', onUp);
        document.documentElement.removeEventListener('pointerleave', onLeave);
        document.removeEventListener('visibilitychange', onVisibility);
        motion.removeEventListener('change', onMotion);
        if (root.parentNode) root.parentNode.removeChild(root);
      },
      setOptions: function (next) {
        if (!next) return;
        var rebuildNeeded = next.streakCount !== undefined || next.density !== undefined;
        var resizeNeeded = next.dpr !== undefined || next.fade !== undefined || next.backgroundColor !== undefined || next.backgroundGlow !== undefined;
        Object.keys(next).forEach(function (key) {
          if (next[key] !== undefined) opts[key] = next[key];
        });
        if (rebuildNeeded) rebuild();
        if (resizeNeeded) resize();
        render();
        last = 0;
        wake();
      }
    };
  }

  window.LZY = window.LZY || {};
  window.LZY.Comp = window.LZY.Comp || {};
  window.LZY.Comp.Lightfall = {
    init: function (el, options) { return createInstance(el, options || {}); }
  };
})();
