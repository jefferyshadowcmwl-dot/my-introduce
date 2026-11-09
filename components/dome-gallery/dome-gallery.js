/* ============================================================
   DomeGallery — 飘逸照片墙（原生 HTML/CSS/JS 移植，零依赖）
   原版：ReactBits DomeGallery（React + @use-gesture/react）
   本版：纯 CSS 3D + 手写 Pointer 拖拽/惯性，几何与阻尼公式
   与原版逐行对应（buildItems / computeItemBaseRotation /
   startInertia 摩擦系数 0.94+0.055*damp、rotY += v/200）

   用法：
     const dg = LZY.Comp.DomeGallery.init(el, {
       items: [{src, alt}, ...],          // 数据源 A：数组
       itemsFromSelector: '.photo-card',  // 数据源 B：既有 DOM 收集（保留原节点）
       segments: 35, grayscale: false, minRadius: 600,
       overlayBlurColor: '#0f0820', enlargeTransitionMs: 300,
       onItemClick(item) {}               // 提供后接管点击（对接站点 lightbox）
     });
     dg.destroy(); dg.setOptions(o);
   ============================================================ */
(function () {
  'use strict';

  var clamp = function (v, min, max) { return Math.min(Math.max(v, min), max); };
  var wrapAngleSigned = function (deg) {
    var a = (((deg + 180) % 360) + 360) % 360;
    return a - 180;
  };
  var now = function () { return performance.now(); };

  /* —— buildItems：平铺逻辑照抄原版 L99-146（含 raw 原始引用扩展） —— */
  function buildItems(pool, seg) {
    var xCols = [];
    for (var i = 0; i < seg; i++) xCols.push(-37 + i * 2);
    var evenYs = [-4, -2, 0, 2, 4];
    var oddYs = [-3, -1, 1, 3, 5];

    var coords = [];
    xCols.forEach(function (x, c) {
      var ys = c % 2 === 0 ? evenYs : oddYs;
      ys.forEach(function (y) { coords.push({ x: x, y: y, sizeX: 2, sizeY: 2 }); });
    });

    var totalSlots = coords.length;
    if (!pool || pool.length === 0) {
      return coords.map(function (c) { return { x: c.x, y: c.y, sizeX: 2, sizeY: 2, src: '', alt: '', raw: null }; });
    }
    if (pool.length > totalSlots) {
      console.warn('[DomeGallery] Provided image count (' + pool.length + ') exceeds available tiles (' + totalSlots + '). Some images will not be shown.');
    }

    var normalizedImages = pool.map(function (image) {
      if (typeof image === 'string') return { src: image, alt: '', raw: null };
      return { src: image.src || '', alt: image.alt || '', raw: image.raw || null };
    });

    var usedImages = [];
    for (var k = 0; k < totalSlots; k++) usedImages.push(normalizedImages[k % normalizedImages.length]);

    for (var j = 1; j < usedImages.length; j++) {
      if (usedImages[j].src === usedImages[j - 1].src && usedImages[j].src) {
        for (var m = j + 1; m < usedImages.length; m++) {
          if (usedImages[m].src !== usedImages[j].src) {
            var tmp = usedImages[j]; usedImages[j] = usedImages[m]; usedImages[m] = tmp;
            break;
          }
        }
      }
    }

    return coords.map(function (c, idx) {
      return {
        x: c.x, y: c.y, sizeX: c.sizeX, sizeY: c.sizeY,
        src: usedImages[idx].src, alt: usedImages[idx].alt, raw: usedImages[idx].raw
      };
    });
  }

  /* —— itemsFromSelector：从既有 DOM 收集（子元素保留原 DOM 节点） ——
     （tile 几何角由 CSS calc 变量 --rot-x/--rot-y 完成，等价原版
       computeItemBaseRotation L148-153，无需 JS 预计算） —— */
  function collectFromSelector(sel) {
    var nodes;
    try { nodes = Array.prototype.slice.call(document.querySelectorAll(sel)); }
    catch (e) { console.warn('[DomeGallery] itemsFromSelector 选择器无效: ' + sel); return []; }
    return nodes.map(function (el) {
      var img = el.tagName === 'IMG' ? el : el.querySelector('img');
      var data = {};
      if (el.dataset) Object.keys(el.dataset).forEach(function (k) { data[k] = el.dataset[k]; });
      return {
        src: (el.getAttribute('data-src') || (img ? img.getAttribute('src') : '')) || '',
        alt: (el.getAttribute('data-alt') || (img ? img.alt || '' : '')) || '',
        raw: { el: el, parent: el.parentNode, next: el.nextSibling },
        data: data
      };
    }).filter(function (it) { return it.src || it.el; });
  }

  function createInstance(el, userOptions) {
    var opts = {
      items: [], itemsFromSelector: null,
      fit: 0.5, fitBasis: 'auto', minRadius: 600, maxRadius: Infinity, padFactor: 0.25,
      overlayBlurColor: '#0f0820', maxVerticalRotationDeg: 5, dragSensitivity: 20,
      enlargeTransitionMs: 300, segments: 35, dragDampening: 2,
      openedImageWidth: '400px', openedImageHeight: '400px',
      imageBorderRadius: '30px', openedImageBorderRadius: '30px',
      grayscale: false, onItemClick: null
    };
    if (userOptions) for (var k in userOptions) if (userOptions[k] !== undefined) opts[k] = userOptions[k];

    /* —— DOM 骨架（对应原版 rootRef/mainRef/sphereRef/…） —— */
    var root = document.createElement('div');
    root.className = 'cz-dg-root';
    root.style.setProperty('--segments-x', opts.segments);
    root.style.setProperty('--segments-y', opts.segments);

    var main = document.createElement('div');
    main.className = 'cz-dg-main';
    var stage = document.createElement('div');
    stage.className = 'cz-dg-stage';
    var sphere = document.createElement('div');
    sphere.className = 'cz-dg-sphere';
    stage.appendChild(sphere);
    main.appendChild(stage);

    var ov1 = document.createElement('div'); ov1.className = 'cz-dg-overlay';
    var ov2 = document.createElement('div'); ov2.className = 'cz-dg-overlay cz-dg-overlay--blur';
    var fadeT = document.createElement('div'); fadeT.className = 'cz-dg-edge-fade cz-dg-edge-fade--top';
    var fadeB = document.createElement('div'); fadeB.className = 'cz-dg-edge-fade cz-dg-edge-fade--bottom';
    main.appendChild(ov1); main.appendChild(ov2); main.appendChild(fadeT); main.appendChild(fadeB);

    var viewer = document.createElement('div');
    viewer.className = 'cz-dg-viewer';
    var scrim = document.createElement('div');
    scrim.className = 'cz-dg-scrim';
    var frame = document.createElement('div');
    frame.className = 'cz-dg-frame';
    viewer.appendChild(scrim);
    viewer.appendChild(frame);
    main.appendChild(viewer);
    root.appendChild(main);
    el.appendChild(root);

    /* —— 状态（对应原版 rotationRef 等） —— */
    var rotation = { x: 0, y: 0 };
    var startRot = { x: 0, y: 0 };
    var startPos = null;
    var dragging = false;
    var dragAxis = null;
    var moved = false;
    var inertiaRAF = 0;
    var opening = false;
    var openStartedAt = 0;
    var lastDragEndAt = 0;
    var scrollLocked = false;
    var enlarging = false;
    var focusedTile = null;
    var samples = [];          /* pointer 速度采样窗口（≈120ms） */
    var reducedMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    var destroyed = false;

    function applyTransform(xDeg, yDeg) {
      sphere.style.transform = 'translateZ(calc(var(--cz-dg-radius) * -1)) rotateX(' + xDeg + 'deg) rotateY(' + yDeg + 'deg)';
    }

    /* —— 数据源 → tile 渲染 —— */
    function currentPool() {
      if (opts.itemsFromSelector) return collectFromSelector(opts.itemsFromSelector);
      return (opts.items || []).map(function (it) {
        return typeof it === 'string' ? { src: it, alt: '', raw: null } : { src: it.src || '', alt: it.alt || '', raw: it.raw || null, data: it.data || {} };
      });
    }

    function restoreBorrowed() {
      /* 把借走的原 DOM 节点按逆序还回原容器（setOptions 重建/destroy 前必须执行，
         否则 collectFromSelector 再也找不到它们 → 宿主节点永久丢失） */
      for (var i = borrowedNodes.length - 1; i >= 0; i--) {
        var r = borrowedNodes[i];
        if (r && r.el && r.parent) {
          try { r.parent.insertBefore(r.el, r.next && r.next.parentNode === r.parent ? r.next : null); }
          catch (err) { r.parent.appendChild(r.el); }
        }
      }
      borrowedNodes = [];
    }

    function renderTiles() {
      restoreBorrowed();
      sphere.innerHTML = '';
      var pool = currentPool();
      var built = buildItems(pool, opts.segments);
      var frag = document.createDocumentFragment();
      var consumed = new Set(); /* 原 DOM 节点只能住进一个 tile，循环槽位用 src 克隆 */
      built.forEach(function (it, i) {
        var item = document.createElement('div');
        item.className = 'cz-dg-item';
        item.style.setProperty('--offset-x', it.x);
        item.style.setProperty('--offset-y', it.y);
        item.style.setProperty('--item-size-x', it.sizeX);
        item.style.setProperty('--item-size-y', it.sizeY);
        var tile = document.createElement('div');
        tile.className = 'cz-dg-item__image';
        var borrowedOriginal = !!(it.raw && it.raw.el && !consumed.has(it.raw.el));
        var original = borrowedOriginal || (!opts.itemsFromSelector && i < pool.length);
        var nativeControl = borrowedOriginal && it.raw.el.tagName === 'BUTTON';
        if (original && !nativeControl) {
          tile.setAttribute('role', 'button');
          tile.tabIndex = 0;
          tile.setAttribute('aria-label', it.alt || 'Open image');
        } else if (!original) {
          tile.setAttribute('aria-hidden', 'true');
        }
        if (borrowedOriginal) {
          consumed.add(it.raw.el);
          tile.appendChild(it.raw.el); /* 保留原 DOM 节点（类名/data-* 全保留） */
        } else if (it.src) {
          var img = document.createElement('img');
          img.src = it.src;
          img.alt = it.alt || '';
          img.draggable = false;
          tile.appendChild(img);
        }
        var meta = { src: it.src, alt: it.alt, x: it.x, y: it.y, index: i };
        if (it.raw && it.raw.el && it.raw.el.dataset) {
          var ds = {};
          Object.keys(it.raw.el.dataset).forEach(function (kk) { ds[kk] = it.raw.el.dataset[kk]; });
          meta.data = ds;
        }
        tile.addEventListener('click', function (e) { onTileClick(e, tile, meta); });
        tile.addEventListener('keydown', function (e) {
          var nextX = rotation.x, nextY = rotation.y;
          var horizontalStep = 360 / Math.max(1, opts.segments);
          var verticalStep = Math.max(1, opts.maxVerticalRotationDeg / 2);
          if (e.key === 'ArrowLeft') nextY = wrapAngleSigned(rotation.y - horizontalStep);
          else if (e.key === 'ArrowRight') nextY = wrapAngleSigned(rotation.y + horizontalStep);
          else if (e.key === 'ArrowUp') nextX = clamp(rotation.x + verticalStep, -opts.maxVerticalRotationDeg, opts.maxVerticalRotationDeg);
          else if (e.key === 'ArrowDown') nextX = clamp(rotation.x - verticalStep, -opts.maxVerticalRotationDeg, opts.maxVerticalRotationDeg);
          else if (e.target === tile && tile.getAttribute('role') === 'button' && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onTileClick(e, tile, meta);
            return;
          } else return;
          e.preventDefault();
          stopInertia();
          rotation = { x: nextX, y: nextY };
          applyTransform(nextX, nextY);
        });
        item.appendChild(tile);
        frag.appendChild(item);
      });
      sphere.appendChild(frag);
      borrowedNodes = pool.map(function (it) { return it.raw; }).filter(Boolean);
    }

    /* —— 半径 / CSS 变量（照抄原版 ResizeObserver 逻辑） —— */
    var ro = new ResizeObserver(function (entries) {
      var cr = entries[0].contentRect;
      var w = Math.max(1, cr.width), h = Math.max(1, cr.height);
      var minDim = Math.min(w, h), maxDim = Math.max(w, h), aspect = w / h;
      var basis;
      switch (opts.fitBasis) {
        case 'min': basis = minDim; break;
        case 'max': basis = maxDim; break;
        case 'width': basis = w; break;
        case 'height': basis = h; break;
        default: basis = aspect >= 1.3 ? w : minDim;
      }
      var radius = basis * opts.fit;
      radius = Math.min(radius, h * 1.35);
      radius = clamp(radius, opts.minRadius, opts.maxRadius);
      root.style.setProperty('--cz-dg-radius', Math.round(radius) + 'px');
      root.style.setProperty('--cz-dg-viewer-pad', Math.max(8, Math.round(minDim * opts.padFactor)) + 'px');
      root.style.setProperty('--cz-dg-overlay-blur-color', opts.overlayBlurColor);
      root.style.setProperty('--cz-dg-tile-radius', opts.imageBorderRadius);
      root.style.setProperty('--cz-dg-enlarge-radius', opts.openedImageBorderRadius);
      root.style.setProperty('--cz-dg-image-filter', opts.grayscale ? 'grayscale(1)' : 'none');
      applyTransform(rotation.x, rotation.y);
    });
    ro.observe(root);

    /* —— 惯性（公式照抄原版 startInertia） —— */
    function stopInertia() {
      if (inertiaRAF) { cancelAnimationFrame(inertiaRAF); inertiaRAF = null; }
    }
    function startInertia(vx, vy) {
      var MAX_V = 1.4;
      var vX = clamp(vx, -MAX_V, MAX_V) * 80;
      var vY = clamp(vy, -MAX_V, MAX_V) * 80;
      var frames = 0;
      var d = clamp(opts.dragDampening == null ? 0.6 : opts.dragDampening, 0, 1);
      var frictionMul = 0.94 + 0.055 * d;
      var stopThreshold = 0.015 - 0.01 * d;
      var maxFrames = Math.round(90 + 270 * d);
      if (reducedMotion) return;
      var step = function () {
        vX *= frictionMul;
        vY *= frictionMul;
        if (Math.abs(vX) < stopThreshold && Math.abs(vY) < stopThreshold) { inertiaRAF = null; return; }
        if (++frames > maxFrames) { inertiaRAF = null; return; }
        var nextX = clamp(rotation.x - vY / 200, -opts.maxVerticalRotationDeg, opts.maxVerticalRotationDeg);
        var nextY = wrapAngleSigned(rotation.y + vX / 200);
        rotation = { x: nextX, y: nextY };
        applyTransform(nextX, nextY);
        inertiaRAF = requestAnimationFrame(step);
      };
      stopInertia();
      inertiaRAF = requestAnimationFrame(step);
    }

    /* —— 手写 pointer 拖拽（替代 use-gesture） —— */
    function onPointerDown(e) {
      if (enlarging || e.button > 0) return;
      stopInertia();
      dragging = true;
      dragAxis = e.pointerType === 'touch' ? null : 'drag';
      moved = false;
      startRot = { x: rotation.x, y: rotation.y };
      startPos = { x: e.clientX, y: e.clientY };
      samples = [{ t: now(), x: e.clientX, y: e.clientY }];
      try { main.setPointerCapture(e.pointerId); } catch (err) { /* noop */ }
    }
    function onPointerMove(e) {
      if (!dragging || !startPos) return;
      var dxTotal = e.clientX - startPos.x;
      var dyTotal = e.clientY - startPos.y;
      var distanceSq = dxTotal * dxTotal + dyTotal * dyTotal;
      if (e.pointerType === 'touch' && !dragAxis) {
        if (distanceSq <= 36) return;
        if (Math.abs(dyTotal) > Math.abs(dxTotal)) {
          dragAxis = 'scroll';
          dragging = false;
          startPos = null;
          samples = [];
          try { main.releasePointerCapture(e.pointerId); } catch (err) { /* noop */ }
          return;
        }
        dragAxis = 'drag';
      }
      if (!moved && distanceSq > 16) moved = true;
      var nextX = clamp(startRot.x - dyTotal / opts.dragSensitivity, -opts.maxVerticalRotationDeg, opts.maxVerticalRotationDeg);
      var nextY = wrapAngleSigned(startRot.y + dxTotal / opts.dragSensitivity);
      if (rotation.x !== nextX || rotation.y !== nextY) {
        rotation = { x: nextX, y: nextY };
        applyTransform(nextX, nextY);
      }
      samples.push({ t: now(), x: e.clientX, y: e.clientY });
      while (samples.length > 2 && samples[0].t < now() - 120) samples.shift();
    }
    function onPointerUp(e) {
      if (!dragging) return;
      dragging = false;
      var vx = 0, vy = 0;
      var first = samples[0], lastS = samples[samples.length - 1];
      if (first && lastS && lastS.t - first.t > 8) {
        vx = (lastS.x - first.x) / (lastS.t - first.t);
        vy = (lastS.y - first.y) / (lastS.t - first.t);
      } else if (startPos && e && typeof e.clientX === 'number') {
        vx = clamp(((e.clientX - startPos.x) / opts.dragSensitivity) * 0.02, -1.2, 1.2);
        vy = clamp(((e.clientY - startPos.y) / opts.dragSensitivity) * 0.02, -1.2, 1.2);
      }
      samples = [];
      if (Math.abs(vx) > 0.005 || Math.abs(vy) > 0.005) startInertia(vx, vy);
      if (moved) lastDragEndAt = now();
      moved = false;
      startPos = null;
      dragAxis = null;
    }
    function onPointerCancel() {
      dragging = false;
      dragAxis = null;
      moved = false;
      startPos = null;
      samples = [];
    }
    main.addEventListener('pointerdown', onPointerDown);
    main.addEventListener('pointermove', onPointerMove);
    main.addEventListener('pointerup', onPointerUp);
    main.addEventListener('pointercancel', onPointerCancel);
    main.addEventListener('lostpointercapture', function () { if (dragging) onPointerUp(null); });

    /* —— 点击放大（FLIP 式 overlay；生产环境由 onItemClick 接管） —— */
    function lockScroll() {
      if (scrollLocked) return;
      scrollLocked = true;
      document.body.classList.add('cz-dg-scroll-lock');
    }
    function unlockScroll() {
      if (!scrollLocked) return;
      if (root.getAttribute('data-enlarging') === 'true') return;
      scrollLocked = false;
      document.body.classList.remove('cz-dg-scroll-lock');
    }

    function onTileClick(e, tile, meta) {
      if (dragging) return;
      if (now() - lastDragEndAt < 80) return; /* 拖后 80ms 内的 click 抑制 */
      if (opening) return;
      if (typeof opts.onItemClick === 'function') { opts.onItemClick(meta); return; }
      openTile(tile, meta);
    }

    var currentOverlay = null;
    var borrowedNodes = []; /* itemsFromSelector 借走的原 DOM 节点（destroy 时还原） */

    function openTile(tile, meta) {
      opening = true;
      openStartedAt = now();
      lockScroll();
      focusedTile = tile;
      var mainR = main.getBoundingClientRect();
      var frameR = frame.getBoundingClientRect();
      var tileR = tile.getBoundingClientRect();
      if (!frameR || tileR.width <= 0) {
        opening = false; focusedTile = null; unlockScroll(); return;
      }
      var overlay = document.createElement('div');
      overlay.className = 'cz-dg-enlarge';
      overlay.style.cssText =
        'position:absolute;left:' + (frameR.left - mainR.left) + 'px;top:' + (frameR.top - mainR.top) + 'px;' +
        'width:' + frameR.width + 'px;height:' + frameR.height + 'px;opacity:0;z-index:30;' +
        'will-change:transform,opacity;transform-origin:top left;' +
        'transition:transform ' + opts.enlargeTransitionMs + 'ms ease, opacity ' + opts.enlargeTransitionMs + 'ms ease;';
      var img = document.createElement('img');
      img.src = meta.src || (tile.querySelector('img') ? tile.querySelector('img').src : '');
      img.alt = meta.alt || '';
      overlay.appendChild(img);
      viewer.appendChild(overlay);
      var tx0 = tileR.left - frameR.left;
      var ty0 = tileR.top - frameR.top;
      var sx0 = tileR.width / frameR.width;
      var sy0 = tileR.height / frameR.height;
      overlay.style.transform = 'translate(' + tx0 + 'px, ' + ty0 + 'px) scale(' + (isFinite(sx0) && sx0 > 0 ? sx0 : 1) + ', ' + (isFinite(sy0) && sy0 > 0 ? sy0 : 1) + ')';
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          if (!overlay.parentElement) return;
          overlay.style.opacity = '1';
          overlay.style.transform = 'translate(0px, 0px) scale(1, 1)';
          enlarging = true;
          root.setAttribute('data-enlarging', 'true');
        });
      });
      /* 二段：满幅 → openedImageWidth/Height 居中（transitionend + setTimeout 双保险，
         reduced-motion 下 CSS 过渡被禁、transitionend 不会来） */
      var secondDone = false;
      var runSecond = function () {
        if (secondDone || !overlay.parentElement) return;
        secondDone = true;
        var prevT = overlay.style.transition;
        overlay.style.transition = 'none';
        var w2 = opts.openedImageWidth || frameR.width + 'px';
        var h2 = opts.openedImageHeight || frameR.height + 'px';
        overlay.style.width = w2; overlay.style.height = h2;
        var nr = overlay.getBoundingClientRect();
        overlay.style.width = frameR.width + 'px'; overlay.style.height = frameR.height + 'px';
        void overlay.offsetWidth;
        overlay.style.transition =
          'left ' + opts.enlargeTransitionMs + 'ms ease, top ' + opts.enlargeTransitionMs + 'ms ease, ' +
          'width ' + opts.enlargeTransitionMs + 'ms ease, height ' + opts.enlargeTransitionMs + 'ms ease';
        requestAnimationFrame(function () {
          overlay.style.left = (frameR.left - mainR.left + (frameR.width - nr.width) / 2) + 'px';
          overlay.style.top = (frameR.top - mainR.top + (frameR.height - nr.height) / 2) + 'px';
          overlay.style.width = w2;
          overlay.style.height = h2;
        });
        var restore = function () {
          if (!overlay.parentElement) return;
          overlay.style.transition = prevT;
        };
        overlay.addEventListener('transitionend', restore, { once: true });
        setTimeout(restore, opts.enlargeTransitionMs + 80);
      };
      overlay.addEventListener('transitionend', function onFirst(ev) {
        if (ev.propertyName !== 'transform' || !overlay.parentElement) return;
        overlay.removeEventListener('transitionend', onFirst);
        runSecond();
      });
      setTimeout(runSecond, opts.enlargeTransitionMs + 60);
      overlay.addEventListener('click', function () { closeOverlay(); });
      currentOverlay = overlay;
    }

    function closeOverlay() {
      if (!currentOverlay || now() - openStartedAt < 250) return;
      var overlay = currentOverlay;
      currentOverlay = null;
      var tile = focusedTile;
      var ms = opts.enlargeTransitionMs;
      if (tile) {
        var mainR = main.getBoundingClientRect();
        var tr = tile.getBoundingClientRect();
        overlay.style.transition =
          'left ' + ms + 'ms ease, top ' + ms + 'ms ease, width ' + ms + 'ms ease, height ' + ms + 'ms ease, opacity ' + ms + 'ms ease';
        requestAnimationFrame(function () {
          overlay.style.left = (tr.left - mainR.left) + 'px';
          overlay.style.top = (tr.top - mainR.top) + 'px';
          overlay.style.width = tr.width + 'px';
          overlay.style.height = tr.height + 'px';
          overlay.style.opacity = '0';
        });
      } else {
        overlay.style.opacity = '0';
      }
      var done = function () {
        overlay.remove();
        enlarging = false;
        opening = false;
        focusedTile = null;
        root.removeAttribute('data-enlarging');
        unlockScroll();
      };
      setTimeout(done, ms + 60); /* 不依赖 transitionend，防丢事件卡死 */
    }

    scrim.addEventListener('click', closeOverlay);
    var onKey = function (e) { if (e.key === 'Escape') closeOverlay(); };
    window.addEventListener('keydown', onKey);

    /* —— 切页/离屏：拖拽事件驱动无需停帧，锁滚动兜底 —— */
    var onVis = function () { if (document.hidden) stopInertia(); };
    document.addEventListener('visibilitychange', onVis);

    renderTiles();
    applyTransform(0, 0);

    return {
      el: el,
      root: root,
      destroy: function () {
        if (destroyed) return;
        destroyed = true;
        stopInertia();
        ro.disconnect();
        document.removeEventListener('visibilitychange', onVis);
        window.removeEventListener('keydown', onKey);
        if (scrollLocked) { document.body.classList.remove('cz-dg-scroll-lock'); scrollLocked = false; }
        if (root.parentNode) root.parentNode.removeChild(root);
        /* itemsFromSelector 模式：还原借走的原 DOM 节点 */
        restoreBorrowed();
      },
      setOptions: function (o) {
        if (!o) return;
        var structural = false;
        for (var kk in o) {
          if (o[kk] === undefined) continue;
          if (kk === 'items' || kk === 'itemsFromSelector' || kk === 'segments') structural = true;
          opts[kk] = o[kk];
        }
        root.style.setProperty('--segments-x', opts.segments);
        root.style.setProperty('--segments-y', opts.segments);
        root.style.setProperty('--cz-dg-overlay-blur-color', opts.overlayBlurColor);
        root.style.setProperty('--cz-dg-tile-radius', opts.imageBorderRadius);
        root.style.setProperty('--cz-dg-enlarge-radius', opts.openedImageBorderRadius);
        root.style.setProperty('--cz-dg-image-filter', opts.grayscale ? 'grayscale(1)' : 'none');
        if (structural) renderTiles();
      }
    };
  }

  window.LZY = window.LZY || {};
  window.LZY.Comp = window.LZY.Comp || {};
  window.LZY.Comp.DomeGallery = {
    init: function (el, options) { return createInstance(el, options); }
  };
})();
