/*!
 * LZY.Comp.BorderGlow — 流光描边卡（ReactBits BorderGlow 原生移植，最轻）
 * 组件形态：包装类 —— init(el) 直接把 .cz-border-glow 挂到任意已有卡片元素上
 * （不改卡片内部 DOM，仅末尾追加发光 span），CSS 见 border-glow.css（1:1 拷贝）。
 * JS 职责（~40 行核心）：pointermove 写
 *   --cursor-angle    = atan2(dy, dx) + 90°
 *   --edge-proximity  = 1 / max(kx, ky)   （kx = cx/|dx|, ky = cy/|dy|，中心处 → 0）
 * 可选 animated 入场扫光（rAF 补间，与原实现同参数：110°→465°，proximity 0→100→0）。
 * 注意：glowColor 是 "H S L" 空格分隔字符串（如 "265 90% 60%"），非 hex！
 * 接口：window.LZY.Comp.BorderGlow.init(el, options) → { destroy(), setOptions(o), el }
 * options: glowColor:'265 90% 60%', glowRadius:40, coneSpread:25, borderRadius:28,
 *          edgeSensitivity:30, glowIntensity:1, fillOpacity:0.5,
 *          backgroundColor:'#1a0f2e', colors:['#7828d6','#00d9ff','#ff6b35'], animated:false
 */
(function () {
  'use strict';

  window.LZY = window.LZY || {};
  window.LZY.Comp = window.LZY.Comp || {};

  var GRADIENT_POSITIONS = ['80% 55%', '69% 34%', '8% 6%', '41% 38%', '86% 85%', '82% 18%', '51% 4%'];
  var GRADIENT_KEYS = ['--gradient-one', '--gradient-two', '--gradient-three', '--gradient-four',
    '--gradient-five', '--gradient-six', '--gradient-seven'];
  var COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];
  var GLOW_OPACITIES = [100, 60, 50, 40, 30, 20, 10];
  var GLOW_KEYS = ['--glow-color', '--glow-color-60', '--glow-color-50', '--glow-color-40',
    '--glow-color-30', '--glow-color-20', '--glow-color-10'];
  var VAR_KEYS = GLOW_KEYS.concat(GRADIENT_KEYS, ['--gradient-base', '--card-bg',
    '--border-radius', '--glow-padding', '--cone-spread', '--edge-sensitivity', '--fill-opacity']);

  function parseHSL(str) {
    var m = String(str).match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
    if (!m) return { h: 40, s: 80, l: 80 };
    return { h: parseFloat(m[1]), s: parseFloat(m[2]), l: parseFloat(m[3]) };
  }

  function isLightColor(color) {
    var value = String(color).trim().replace('#', '');
    if (!/^[\da-f]{3}([\da-f]{3})?$/i.test(value)) return false;
    var hex = value.length === 3 ? value.split('').map(function (c) { return c + c; }).join('') : value;
    var r = parseInt(hex.slice(0, 2), 16);
    var g = parseInt(hex.slice(2, 4), 16);
    var b = parseInt(hex.slice(4, 6), 16);
    return r * 0.2126 + g * 0.7152 + b * 0.0722 > 180;
  }

  function easeOutCubic(x) { return 1 - Math.pow(1 - x, 3); }
  function easeInCubic(x) { return x * x * x; }

  function animateValue(spec) {
    var start = spec.start || 0, end = spec.end == null ? 100 : spec.end;
    var duration = spec.duration || 1000, delay = spec.delay || 0;
    var ease = spec.ease || easeOutCubic;
    var t0 = performance.now() + delay;
    function tick() {
      var t = Math.min((performance.now() - t0) / duration, 1);
      spec.onUpdate(start + (end - start) * ease(t));
      if (t < 1) requestAnimationFrame(tick);
      else if (spec.onEnd) spec.onEnd();
    }
    setTimeout(function () { requestAnimationFrame(tick); }, delay);
  }

  function create(el, options) {
    var o = {
      glowColor: '265 90% 60%',
      glowRadius: 40,
      coneSpread: 25,
      borderRadius: 28,
      edgeSensitivity: 30,
      glowIntensity: 1,
      fillOpacity: 0.5,
      backgroundColor: '#1a0f2e',
      colors: ['#7828d6', '#00d9ff', '#ff6b35'],
      animated: false
    };
    var edge = null;
    var sweepTimers = [];
    var alive = true;

    function setVar(key, value) { el.style.setProperty(key, value); }

    function applyVars() {
      var hsl = parseHSL(o.glowColor);
      var base = hsl.h + 'deg ' + hsl.s + '% ' + hsl.l + '%';
      for (var i = 0; i < GLOW_OPACITIES.length; i++) {
        setVar(GLOW_KEYS[i], 'hsl(' + base + ' / ' + Math.min(GLOW_OPACITIES[i] * (+o.glowIntensity || 1), 100) + '%)');
      }
      var colors = o.colors && o.colors.length ? o.colors : ['#7828d6', '#00d9ff', '#ff6b35'];
      for (var j = 0; j < 7; j++) {
        var c = colors[Math.min(COLOR_MAP[j], colors.length - 1)];
        setVar(GRADIENT_KEYS[j], 'radial-gradient(at ' + GRADIENT_POSITIONS[j] + ', ' + c + ' 0px, transparent 50%)');
      }
      setVar('--gradient-base', 'linear-gradient(' + colors[0] + ' 0 100%)');
      setVar('--card-bg', o.backgroundColor);
      setVar('--border-radius', o.borderRadius + 'px');
      setVar('--glow-padding', o.glowRadius + 'px');
      setVar('--cone-spread', String(o.coneSpread));
      setVar('--edge-sensitivity', String(o.edgeSensitivity));
      setVar('--fill-opacity', String(o.fillOpacity));
      el.classList.toggle('cz-border-glow--light', isLightColor(o.backgroundColor));
    }

    function onMove(e) {
      if (!alive) return;
      var rect = el.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var cx = rect.width / 2, cy = rect.height / 2;
      var dx = x - cx, dy = y - cy;
      var kx = dx !== 0 ? cx / Math.abs(dx) : Infinity;
      var ky = dy !== 0 ? cy / Math.abs(dy) : Infinity;
      var proximity = Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
      var angle = dx === 0 && dy === 0 ? 0 : Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      if (angle < 0) angle += 360;
      el.style.setProperty('--edge-proximity', (proximity * 100).toFixed(3));
      el.style.setProperty('--cursor-angle', angle.toFixed(3) + 'deg');
    }

    function startSweep() {
      if (!alive) return;
      var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) return;
      var angleStart = 110, angleEnd = 465;
      el.classList.add('cz-sweep-active');
      el.style.setProperty('--cursor-angle', angleStart + 'deg');
      animateValue({
        duration: 500,
        onUpdate: function (v) { el.style.setProperty('--edge-proximity', String(v)); }
      });
      animateValue({
        ease: easeInCubic, duration: 1500, end: 50,
        onUpdate: function (v) {
          el.style.setProperty('--cursor-angle', (angleEnd - angleStart) * (v / 100) + angleStart + 'deg');
        }
      });
      animateValue({
        ease: easeOutCubic, delay: 1500, duration: 2250, start: 50, end: 100,
        onUpdate: function (v) {
          el.style.setProperty('--cursor-angle', (angleEnd - angleStart) * (v / 100) + angleStart + 'deg');
        }
      });
      animateValue({
        ease: easeInCubic, delay: 2500, duration: 1500, start: 100, end: 0,
        onUpdate: function (v) { el.style.setProperty('--edge-proximity', String(v)); },
        onEnd: function () { el.classList.remove('cz-sweep-active'); }
      });
    }

    el.classList.add('cz-border-glow');
    edge = el.querySelector(':scope > .cz-edge-light');
    if (!edge) {
      edge = document.createElement('span');
      edge.className = 'cz-edge-light';
      edge.setAttribute('aria-hidden', 'true');
      el.appendChild(edge); // 只在末尾追加
    }
    applyVars();
    el.addEventListener('pointermove', onMove, { passive: true });
    if (o.animated) startSweep();

    function apply(patch) {
      if (!patch) return;
      for (var k in patch) {
        if (Object.prototype.hasOwnProperty.call(patch, k)) o[k] = patch[k];
      }
      applyVars();
    }

    return {
      el: el,
      setOptions: function (patch) { apply(patch); },
      sweep: startSweep,
      destroy: function () {
        alive = false;
        el.removeEventListener('pointermove', onMove);
        el.classList.remove('cz-border-glow', 'cz-border-glow--light', 'cz-sweep-active');
        VAR_KEYS.forEach(function (k) { el.style.removeProperty(k); });
        el.style.removeProperty('--edge-proximity');
        el.style.removeProperty('--cursor-angle');
        if (edge && edge.parentNode === el) el.removeChild(edge);
      }
    };
  }

  window.LZY.Comp.BorderGlow = {
    version: '1.0.0',
    init: function (el, options) {
      if (!el || !el.appendChild) return null;
      return create(el, options || {});
    }
  };
})();
