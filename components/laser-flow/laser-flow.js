(function () {
  'use strict';

  var DEFAULTS = {
    surfaceRef: null,
    beamPosition: 0.66,
    surfaceLevel: 0.74,
    color: '#78CFC5',
    accentColor: '#C8B285',
    intensity: 0.78,
    beamWidth: 1.25,
    flare: 1.1,
    spread: 1.35,
    spill: 0.72,
    fog: 0.12,
    dust: 0.7,
    streaks: 1.2,
    dots: 0.45,
    pulse: 0.7,
    speed: 0.72,
    seed: 3,
    mouseInteraction: true,
    intro: true,
    theme: 'dark',
    paused: false,
    dpr: 0
  };

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, Number(value) || 0));
  }

  function rgb(value) {
    var match = /^#([\da-f]{3}|[\da-f]{6})$/i.exec(String(value || ''));
    if (!match) return [120, 207, 197];
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
    root.className = 'cz-laser-flow';
    root.setAttribute('aria-hidden', 'true');
    var canvas = document.createElement('canvas');
    canvas.className = 'cz-laser-flow__canvas';
    canvas.setAttribute('aria-hidden', 'true');
    root.appendChild(canvas);
    el.appendChild(root);

    var ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!ctx) root.classList.add('cz-laser-flow--poster');
    var motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    var mobile = window.matchMedia('(max-width: 767px)');
    var alive = true;
    var visible = true;
    var raf = 0;
    var last = 0;
    var lastPaint = 0;
    var time = 8.2;
    var intro = opts.intro && !motion.matches ? 0 : 1;
    var width = 1;
    var height = 1;
    var fibers = [];
    var dust = [];
    var pointer = { x: 0, y: 0, inside: false, strength: 0 };

    function rebuild() {
      var rand = random(1701 + (Number(opts.seed) || 0) * 97);
      var fiberCount = mobile.matches ? 16 : 26;
      fibers = [];
      for (var i = 0; i < fiberCount; i++) {
        fibers.push({
          side: i % 2 ? 1 : -1,
          lane: Math.floor(i / 2),
          phase: rand(),
          bend: rand() * 2 - 1,
          width: 0.35 + rand() * 0.8,
          tone: rand() > 0.88 ? 1 : 0,
          speed: 0.65 + rand() * 0.8
        });
      }
      dust = [];
      for (var j = 0; j < (mobile.matches ? 20 : 38); j++) {
        dust.push({ x: rand() * 2 - 1, y: rand(), phase: rand() * Math.PI * 2, size: 0.35 + rand() * 0.9 });
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
      render();
    }

    function surface() {
      var target = opts.surfaceRef;
      if (target && target.current) target = target.current;
      if (target && typeof target.getBoundingClientRect === 'function') {
        var box = el.getBoundingClientRect();
        var rect = target.getBoundingClientRect();
        if (rect.width > 0) {
          return {
            left: rect.left - box.left,
            right: rect.right - box.left,
            y: rect.top - box.top
          };
        }
      }
      return { left: -width * 0.1, right: width * 1.1, y: height * clamp(opts.surfaceLevel, 0.1, 1) };
    }

    function render() {
      if (!ctx) return;
      ctx.setTransform(canvas.width / width, 0, 0, canvas.height / height, 0, 0);
      ctx.clearRect(0, 0, width, height);
      var area = surface();
      var beamX = width * clamp(opts.beamPosition, 0.05, 0.95);
      var beamY = area.y;
      var energy = clamp(opts.intensity, 0, 3) * intro;
      var pulse = 1 + Math.sin(time * 1.4) * 0.08 * clamp(opts.pulse, 0, 2);
      var tint = opts.color;
      var accent = opts.accentColor;
      var pointerGlow = pointer.strength * clamp(opts.mouseInteraction ? 1 : 0, 0, 1);
      ctx.globalCompositeOperation = opts.theme === 'light' ? 'source-over' : 'lighter';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (opts.fog > 0) {
        var haze = ctx.createRadialGradient(beamX, beamY, 0, beamX, beamY, width * 0.28);
        haze.addColorStop(0, color(tint, energy * opts.fog * 0.2));
        haze.addColorStop(0.45, color(tint, energy * opts.fog * 0.06));
        haze.addColorStop(1, color(tint, 0));
        ctx.fillStyle = haze;
        ctx.fillRect(0, 0, width, height);
      }

      var dropY = beamY * intro;
      var beam = ctx.createLinearGradient(beamX, 0, beamX, dropY);
      beam.addColorStop(0, color(tint, 0));
      beam.addColorStop(0.24, color(tint, energy * 0.11));
      beam.addColorStop(0.88, color(tint, energy * 0.46));
      beam.addColorStop(1, color('#F2F0EA', energy * 0.75));
      ctx.strokeStyle = beam;
      ctx.lineWidth = Math.max(0.65, opts.beamWidth * 1.15);
      ctx.beginPath();
      ctx.moveTo(beamX, 0);
      ctx.lineTo(beamX, dropY);
      ctx.stroke();
      ctx.strokeStyle = color(tint, energy * 0.055);
      ctx.lineWidth = Math.max(3, opts.beamWidth * 9);
      ctx.beginPath();
      ctx.moveTo(beamX, 0);
      ctx.lineTo(beamX, dropY);
      ctx.stroke();

      var flareRadius = Math.min(width, height) * 0.12 * clamp(opts.flare, 0.2, 3) * pulse;
      var flare = ctx.createRadialGradient(beamX, beamY, 0, beamX, beamY, flareRadius);
      flare.addColorStop(0, color('#F2F0EA', energy * 0.55));
      flare.addColorStop(0.08, color(tint, energy * 0.38));
      flare.addColorStop(0.36, color(tint, energy * 0.09));
      flare.addColorStop(1, color(tint, 0));
      ctx.fillStyle = flare;
      ctx.fillRect(beamX - flareRadius, beamY - flareRadius, flareRadius * 2, flareRadius * 2);

      var spread = width * 0.19 * clamp(opts.spread, 0.2, 3);
      for (var i = 0; i < fibers.length; i++) {
        var f = fibers[i];
        var lane = (f.lane + 1) / (fibers.length * 0.5 + 1);
        var reach = spread * (0.32 + lane * 0.78);
        var endX = beamX + f.side * reach;
        endX = clamp(endX, Math.min(area.left, beamX), Math.max(area.right, beamX));
        var fall = height * 0.19 * clamp(opts.spill, 0, 2) * (0.35 + lane * 0.65);
        var y = beamY + lane * 5 + f.bend * 2;
        var flow = (time * 0.16 * f.speed + f.phase) % 1;
        var gradient = ctx.createLinearGradient(beamX, y, endX, y + fall);
        var alpha = energy * (0.11 + (1 - lane) * 0.23) * opts.streaks;
        gradient.addColorStop(0, color('#F2F0EA', alpha * 0.85));
        gradient.addColorStop(0.35, color(f.tone ? accent : tint, alpha));
        gradient.addColorStop(1, color(f.tone ? accent : tint, 0));
        ctx.strokeStyle = gradient;
        ctx.lineWidth = f.width * Math.max(0.45, opts.beamWidth * 0.58);
        ctx.beginPath();
        ctx.moveTo(beamX, y);
        ctx.bezierCurveTo(beamX + f.side * reach * 0.36, y - 4 - lane * 8, endX - f.side * reach * 0.12, y + fall * 0.12, endX, y + fall);
        ctx.stroke();

        var px = beamX + (endX - beamX) * flow;
        var py = y + fall * flow * flow * 0.7 - Math.sin(flow * Math.PI) * (4 + lane * 8);
        ctx.fillStyle = color('#F2F0EA', energy * (1 - flow) * 0.38);
        ctx.beginPath();
        ctx.arc(px, py, 0.45 + (1 - lane) * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }

      if (opts.dust > 0) {
        for (var j = 0; j < dust.length; j++) {
          var d = dust[j];
          var x = beamX + d.x * spread * 0.92;
          var y = ((d.y + time * 0.018) % 1) * (beamY + height * 0.15);
          var twinkle = 0.35 + 0.65 * Math.sin(time * 1.8 + d.phase) * Math.sin(time * 1.8 + d.phase);
          ctx.fillStyle = color(d.x > 0.72 ? accent : tint, energy * twinkle * opts.dust * 0.24);
          ctx.beginPath();
          ctx.arc(x, y, d.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (pointerGlow > 0.002) {
        var lens = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 100);
        lens.addColorStop(0, color(tint, pointerGlow * energy * 0.055));
        lens.addColorStop(1, color(tint, 0));
        ctx.fillStyle = lens;
        ctx.fillRect(pointer.x - 100, pointer.y - 100, 200, 200);
      }
      if (opts.dots > 0) {
        ctx.fillStyle = color(tint, energy * opts.dots * 0.025);
        for (var gy = 3; gy < beamY; gy += 9) {
          for (var gx = Math.max(0, beamX - spread); gx < Math.min(width, beamX + spread); gx += 9) {
            ctx.fillRect(gx, gy, 0.55, 0.55);
          }
        }
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
        time += dt * Math.max(0, opts.speed);
        intro = Math.min(1, intro + dt / 1.8);
      } else {
        intro = 1;
      }
      var goal = opts.mouseInteraction && pointer.inside && !motion.matches ? 1 : 0;
      pointer.strength += (goal - pointer.strength) * (1 - Math.exp(-dt * 4));
      var interval = mobile.matches ? 1000 / 30 : 1000 / 40;
      if (now - lastPaint >= interval) {
        render();
        lastPaint = now;
      }
      if (running || Math.abs(goal - pointer.strength) > 0.003 || intro < 1) raf = requestAnimationFrame(frame);
      else last = 0;
    }

    function wake() {
      if (!alive || !visible || document.hidden || !ctx) return;
      if (!raf) raf = requestAnimationFrame(frame);
      else if (opts.paused || motion.matches) render();
    }

    function onMove(event) {
      if (!visible || document.hidden || opts.paused || motion.matches || !opts.mouseInteraction) return;
      var rect = el.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.inside = pointer.x >= 0 && pointer.y >= 0 && pointer.x <= rect.width && pointer.y <= rect.height;
      wake();
    }
    function onLeave() { pointer.inside = false; wake(); }
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
    if (opts.surfaceRef) {
      var target = opts.surfaceRef.current || opts.surfaceRef;
      if (target && target.nodeType === 1) resizeObserver.observe(target);
    }
    window.addEventListener('pointermove', onMove, { passive: true });
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
        document.documentElement.removeEventListener('pointerleave', onLeave);
        document.removeEventListener('visibilitychange', onVisibility);
        motion.removeEventListener('change', onMotion);
        if (root.parentNode) root.parentNode.removeChild(root);
      },
      setOptions: function (next) {
        if (!next) return;
        var rebuildNeeded = next.seed !== undefined;
        Object.keys(next).forEach(function (key) {
          if (next[key] !== undefined) opts[key] = next[key];
        });
        if (rebuildNeeded) rebuild();
        if (next.dpr !== undefined) resize();
        render();
        last = 0;
        wake();
      }
    };
  }

  window.LZY = window.LZY || {};
  window.LZY.Comp = window.LZY.Comp || {};
  window.LZY.Comp.LaserFlow = {
    init: function (el, options) { return createInstance(el, options || {}); }
  };
})();
