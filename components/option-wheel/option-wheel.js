(function () {
  'use strict';
  window.LZY = window.LZY || {};
  window.LZY.Comp = window.LZY.Comp || {};
  var instances = new WeakMap();
  var serial = 0;
  var DEFAULTS = {
    items: [
      { label: '编程', value: 'programming' },
      { label: '数据', value: 'data' },
      { label: 'AI', value: 'ai' },
      { label: '硬件', value: 'hardware' },
      { label: '营销', value: 'marketing' },
      { label: '办公', value: 'office' }
    ],
    activeIndex: 0, onChange: null,
    textColor: '#b7cac8', activeColor: '#78cfc5',
    side: 'left', fontSize: 2.6, spacing: 1.5,
    curve: 0.6, tilt: 5, blur: 0, fade: 0.12, minOpacity: 0.44,
    smoothing: 150, inset: 48, loop: false, draggable: true
  };

  function init(el, options) {
    if (!el || el.nodeType !== 1) throw new Error('[OptionWheel] init 需要一个挂载元素');
    if (instances.has(el)) instances.get(el).destroy();
    var settings = Object.assign({}, DEFAULTS, options || {});
    var attributes = ['role', 'tabindex', 'aria-label', 'aria-orientation', 'aria-activedescendant'];
    var originalAttrs = attributes.map(function (name) { return el.getAttribute(name); });
    var variables = ['--ow-text-color', '--ow-active-color', '--ow-font-size', '--ow-inset'];
    var originalVars = variables.map(function (name) {
      return [el.style.getPropertyValue(name), el.style.getPropertyPriority(name)];
    });
    var classNames = ['cz-option-wheel', 'cz-option-wheel--right', 'cz-option-wheel--dragging'];
    var originalClasses = classNames.map(function (name) { return el.classList.contains(name); });
    var prefix;
    do { prefix = 'lzy-option-wheel-' + (++serial); }
    while (document.querySelector('[id^="' + prefix + '-option-"]'));
    var items = [], itemEls = [], selected = -1, pos = 0, target = 0;
    var raf = 0, lastTs = 0, wheelAmount = 0, wheelTimer = 0, clickTimer = 0;
    var drag = null, suppressClick = false, alive = true;
    var motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    var rowH = 64;
    var clamp = function (n) { return Math.min(Math.max(n, 0), Math.max(items.length - 1, 0)); };
    var indexOf = function (n) { return ((Math.round(n) % items.length) + items.length) % items.length; };
    var clearWheel = function () {
      clearTimeout(wheelTimer);
      wheelTimer = 0;
      wheelAmount = 0;
    };
    var syncSelected = function () {
      el.removeAttribute('aria-activedescendant');
      itemEls.forEach(function (node, index) {
        var active = index === selected;
        node.classList.toggle('cz-option-wheel__item--selected', active);
        node.setAttribute('aria-selected', String(active));
        if (active) el.setAttribute('aria-activedescendant', node.id);
      });
    };
    var render = function () {
      var mirror = settings.side === 'right' ? -1 : 1;
      var tilt = Math.max(0, Number(settings.tilt) || 0) * Math.PI / 180;
      var radius = tilt > 0.0005 ? rowH / tilt : 0;
      itemEls.forEach(function (node, index) {
        var d = index - pos;
        if (settings.loop && items.length > 1) {
          d = ((d % items.length) + items.length) % items.length;
          if (d > items.length / 2) d -= items.length;
        }
        var distance = Math.abs(d);
        var angle = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, d * tilt));
        var x = radius ? -mirror * radius * (1 - Math.cos(angle)) * settings.curve : 0;
        var y = radius ? radius * Math.sin(angle) : d * rowH;
        node.style.transform = 'translate(' + x.toFixed(2) + 'px, calc(' + y.toFixed(2) + 'px - 50%)) rotate(' + (mirror * angle * 180 / Math.PI).toFixed(2) + 'deg)';
        node.style.opacity = String(Math.max(0.44, Number(settings.minOpacity) || 0, 1 - distance * Math.min(0.16, Math.max(0, Number(settings.fade) || 0))));
        node.style.filter = 'blur(' + Math.min(0.35, distance * Math.max(0, Number(settings.blur) || 0)).toFixed(2) + 'px)';
        node.style.setProperty('--ow-p', String(Math.max(0, 1 - Math.min(distance, 1))));
      });
    };
    var frame = function (now) {
      raf = 0;
      if (!alive) return;
      var dt = Math.min(now - lastTs, 50);
      lastTs = now;
      pos += (target - pos) * (1 - Math.exp(-dt / Math.max(1, settings.smoothing)));
      if (Math.abs(target - pos) < 0.001) pos = target;
      render();
      if (pos !== target) raf = requestAnimationFrame(frame);
    };
    var animate = function () {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      if (motion.matches || settings.smoothing <= 0) {
        pos = target;
        render();
      } else {
        lastTs = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };
    var applyTarget = function (value, snap) {
      if (!alive || !items.length || !Number.isFinite(value)) return;
      target = settings.loop ? value : clamp(value);
      if (snap) target = Math.round(target);
      var index = indexOf(target);
      if (index !== selected) {
        selected = index;
        syncSelected();
        animate();
        if (typeof settings.onChange === 'function') settings.onChange(items[index], index);
      } else animate();
    };
    var selectItem = function (index) {
      if (suppressClick || !alive) return;
      clearWheel();
      el.focus({ preventScroll: true });
      var delta = index - indexOf(target);
      if (settings.loop && items.length > 1) {
        if (delta > items.length / 2) delta -= items.length;
        else if (delta < -items.length / 2) delta += items.length;
      }
      applyTarget(Math.round(target) + delta, true);
    };
    var onWheel = function (event) {
      if (event.ctrlKey || drag || items.length < 2 || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      var delta = event.deltaY * (event.deltaMode === 1 ? 24 : event.deltaMode === 2 ? el.clientHeight : 1);
      if (!delta) return;
      if (!settings.loop && ((target <= 0 && delta < 0) || (target >= items.length - 1 && delta > 0))) {
        clearWheel();
        return;
      }
      event.preventDefault();
      if (wheelAmount && Math.sign(delta) !== Math.sign(wheelAmount)) wheelAmount = 0;
      wheelAmount += delta;
      if (Math.abs(wheelAmount) >= 24) {
        var direction = Math.sign(wheelAmount);
        wheelAmount = 0;
        applyTarget(Math.round(target) + direction, true);
      }
      clearTimeout(wheelTimer);
      wheelTimer = setTimeout(clearWheel, 160);
    };
    var endDrag = function (event) {
      if (!drag || (event && event.pointerId !== drag.id)) return;
      var old = drag;
      drag = null;
      if (el.hasPointerCapture(old.id)) el.releasePointerCapture(old.id);
      el.classList.remove('cz-option-wheel--dragging');
      if (old.moved) {
        applyTarget(target, true);
        clearTimeout(clickTimer);
        clickTimer = setTimeout(function () { suppressClick = false; }, 0);
      }
    };
    var onPointerDown = function (event) {
      if (!settings.draggable || drag || event.isPrimary === false || event.button !== 0 || items.length < 2) return;
      clearWheel();
      clearTimeout(clickTimer);
      suppressClick = false;
      el.focus({ preventScroll: true });
      drag = { y: event.clientY, start: target, id: event.pointerId, moved: false };
    };
    var onPointerMove = function (event) {
      if (!drag || event.pointerId !== drag.id) return;
      if ((event.pointerType === 'mouse' || event.pointerType === 'pen') && event.buttons === 0) {
        endDrag(event);
        return;
      }
      var dy = event.clientY - drag.y;
      if (!drag.moved && Math.abs(dy) > 4) {
        drag.moved = true;
        suppressClick = true;
        el.setPointerCapture(drag.id);
        el.classList.add('cz-option-wheel--dragging');
      }
      if (drag.moved) applyTarget(drag.start - dy / rowH, false);
    };
    var onKeyDown = function (event) {
      if (event.altKey || event.ctrlKey || event.metaKey || !items.length) return;
      var next;
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = Math.round(target) - 1;
      else if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = Math.round(target) + 1;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = items.length - 1;
      else return;
      event.preventDefault();
      clearWheel();
      applyTarget(next, true);
    };
    var refresh = function () {
      el.style.setProperty('--ow-text-color', settings.textColor);
      el.style.setProperty('--ow-active-color', settings.activeColor);
      el.style.setProperty('--ow-font-size', settings.fontSize + 'rem');
      el.style.setProperty('--ow-inset', settings.inset + 'px');
      el.classList.toggle('cz-option-wheel--right', settings.side === 'right');
      var rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      rowH = Math.max(48, settings.fontSize * settings.spacing * rem);
    };
    var build = function () {
      itemEls.forEach(function (node) { node.remove(); });
      itemEls = [];
      items = (Array.isArray(settings.items) ? settings.items : []).map(function (item) {
        return typeof item === 'string' ? { label: item, value: item } : Object.assign({}, item, {
          label: String(item.label != null ? item.label : item.value),
          value: item.value != null ? item.value : item.label
        });
      });
      items.forEach(function (item, index) {
        var node = document.createElement('div');
        node.className = 'cz-option-wheel__item';
        node.id = prefix + '-option-' + index;
        node.setAttribute('role', 'option');
        node.setAttribute('aria-posinset', String(index + 1));
        node.setAttribute('aria-setsize', String(items.length));
        node.textContent = item.label;
        node.addEventListener('click', function () { selectItem(index); });
        el.appendChild(node);
        itemEls.push(node);
      });
      selected = -1;
      el.removeAttribute('aria-activedescendant');
    };
    el.classList.add('cz-option-wheel');
    el.setAttribute('role', 'listbox');
    el.setAttribute('tabindex', '0');
    el.setAttribute('aria-orientation', 'vertical');
    if (!el.hasAttribute('aria-label')) el.setAttribute('aria-label', '技能分类');
    build();
    refresh();
    pos = target = clamp(Math.round(Number(settings.activeIndex) || 0));
    render();
    var onMotionChange = function () { if (alive) animate(); };
    var onWindowBlur = function () { endDrag(); };
    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('lostpointercapture', endDrag);
    window.addEventListener('pointerup', endDrag);
    window.addEventListener('pointercancel', endDrag);
    window.addEventListener('blur', onWindowBlur);
    el.addEventListener('keydown', onKeyDown);
    motion.addEventListener('change', onMotionChange);
    var api = {
      el: el,
      destroy: function () {
        if (!alive) return;
        alive = false;
        endDrag();
        clearWheel();
        clearTimeout(clickTimer);
        cancelAnimationFrame(raf);
        el.removeEventListener('wheel', onWheel);
        el.removeEventListener('pointerdown', onPointerDown);
        el.removeEventListener('pointermove', onPointerMove);
        el.removeEventListener('lostpointercapture', endDrag);
        window.removeEventListener('pointerup', endDrag);
        window.removeEventListener('pointercancel', endDrag);
        window.removeEventListener('blur', onWindowBlur);
        el.removeEventListener('keydown', onKeyDown);
        motion.removeEventListener('change', onMotionChange);
        itemEls.forEach(function (node) { node.remove(); });
        itemEls = [];
        attributes.forEach(function (name, index) {
          if (originalAttrs[index] === null) el.removeAttribute(name);
          else el.setAttribute(name, originalAttrs[index]);
        });
        variables.forEach(function (name, index) {
          if (originalVars[index][0]) el.style.setProperty(name, originalVars[index][0], originalVars[index][1]);
          else el.style.removeProperty(name);
        });
        classNames.forEach(function (name, index) { el.classList.toggle(name, originalClasses[index]); });
        if (instances.get(el) === api) instances.delete(el);
      },
      setOptions: function (options) {
        if (!alive || !options) return;
        endDrag();
        clearWheel();
        Object.assign(settings, options);
        if ('items' in options) build();
        refresh();
        if ('activeIndex' in options || 'items' in options) {
          pos = target = clamp(Math.round(Number(settings.activeIndex) || 0));
        }
        if (!items.length) { selected = -1; pos = target = 0; render(); }
        else applyTarget(target, true);
      },
      get index() { return selected; },
      get item() { return items[selected]; }
    };
    instances.set(el, api);
    applyTarget(target, true);
    return api;
  }
  window.LZY.Comp.OptionWheel = { init: init };
})();
