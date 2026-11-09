/*!
 * LZY.Comp.HoloCard — 全息卡（CSS 烫箔路线，原生移植 ReactBits HoloCard）
 * 接口：window.LZY.Comp.HoloCard.init(el, options) → { destroy(), setOptions(o), el }
 * options: image, backImage(有点击翻面), alt, preset('bursts'|'glitter'),
 *          ratio('63/88' 默认 | '3/2' 证书比例 | 数字), width, fill,
 *          tiltMax:14, hoverScale:1.04, intensity:0.85, scale:1,
 *          edgeSparkle:0.8, frame:4, glare:0.5, foilColor:'#e2e6ec',
 *          foilColors:[c1..c5], idle:true, shadow:true
 * JS 只写 --mx/--my/--cz-awake 归一化坐标与状态类；弹簧简化为 CSS transition。
 */
(function () {
  'use strict';

  window.LZY = window.LZY || {};
  window.LZY.Comp = window.LZY.Comp || {};

  var PRESETS = ['bursts', 'glitter'];
  var FOIL_DEFAULT = ['#7828d6', '#00d9ff', '#b77aff', '#ff2e88', '#7828d6'];

  function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }

  function create(mount, options) {
    var o = {
      image: '', backImage: '', alt: '', preset: 'bursts',
      ratio: '63/88', width: 320, fill: false, radius: 14,
      tiltMax: 14, hoverScale: 1.04, intensity: 0.85, scale: 1,
      edgeSparkle: 0.8, frame: 4, glare: 0.5, foilColor: '#e2e6ec',
      foilColors: null, idle: true, shadow: true
    };

    var root = document.createElement('div');
    root.className = 'cz-holo-card';
    root.innerHTML =
      '<span class="cz-holo-card__shadow" aria-hidden="true"></span>' +
      '<div class="cz-holo-card__rotor">' +
        '<div class="cz-holo-card__flipper">' +
          '<div class="cz-holo-card__face cz-holo-card__face--front">' +
            '<img class="cz-holo-card__img" alt="" draggable="false">' +
            '<span class="cz-holo-card__layer cz-holo-card__rainbow" aria-hidden="true"></span>' +
            '<span class="cz-holo-card__layer cz-holo-card__tint" aria-hidden="true"></span>' +
            '<span class="cz-holo-card__layer cz-holo-card__pattern" aria-hidden="true"></span>' +
            '<span class="cz-holo-card__layer cz-holo-card__frame" aria-hidden="true"></span>' +
            '<span class="cz-holo-card__layer cz-holo-card__glare" aria-hidden="true"></span>' +
          '</div>' +
        '</div>' +
      '</div>';
    mount.appendChild(root);

    var reduce = window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

    var frontImg = root.querySelector('.cz-holo-card__img');
    var flipper = root.querySelector('.cz-holo-card__flipper');
    var hovering = false;
    var alive = true;
    var visible = true;
    var raf = 0;
    var clock = Math.random() * 40;
    var last = 0;

    /* ---- 状态应用：options → CSS vars / attrs ---- */
    function apply(patch) {
      if (!patch) return;
      for (var k in patch) {
        if (Object.prototype.hasOwnProperty.call(patch, k)) o[k] = patch[k];
      }
      var st = root.style;
      var foil = o.foilColors && o.foilColors.length >= 5 ? o.foilColors : FOIL_DEFAULT;
      st.setProperty('--cz-hc-w', typeof o.width === 'string' ? o.width : o.width + 'px');
      st.setProperty('--cz-hc-ratio', String(o.ratio));
      st.setProperty('--cz-hc-radius', o.radius + 'px');
      st.setProperty('--cz-hc-tilt', String(clamp(+o.tiltMax || 0, 0, 45)));
      st.setProperty('--cz-hc-hover', String(clamp(+o.hoverScale || 1, 0.8, 1.3)));
      st.setProperty('--cz-hc-intensity', String(clamp(+o.intensity, 0, 1)));
      st.setProperty('--cz-hc-scale', String(clamp(+o.scale || 1, 0.25, 4)));
      st.setProperty('--cz-hc-edge', String(clamp(+o.edgeSparkle, 0, 1)));
      st.setProperty('--cz-hc-frame', String(clamp(+o.frame, 0, 20)));
      st.setProperty('--cz-hc-glare', String(clamp(+o.glare, 0, 1)));
      st.setProperty('--cz-hc-foil', o.foilColor);
      for (var i = 0; i < 5; i++) st.setProperty('--cz-hc-foil-c' + (i + 1), foil[i]);
      root.classList.toggle('cz-hc-fill', !!o.fill);
      root.querySelector('.cz-holo-card__shadow').style.display = o.shadow ? '' : 'none';

      root.dataset.preset = PRESETS.indexOf(o.preset) > -1 ? o.preset : 'bursts';

      var flippable = !!o.backImage;
      if (flippable) root.dataset.flippable = ''; else delete root.dataset.flippable;
      root.setAttribute('role', flippable ? 'button' : 'img');
      if (flippable) root.setAttribute('tabindex', '0'); else root.removeAttribute('tabindex');
      if (o.alt) root.setAttribute('aria-label', o.alt); else root.removeAttribute('aria-label');

      loadImage(o.image, frontImg, 'ready');
      var backImg = flipper.querySelector('.cz-holo-card__face--back img');
      if (flippable && !backImg) {
        var back = document.createElement('div');
        back.className = 'cz-holo-card__face cz-holo-card__face--back';
        back.innerHTML = '<img alt="" draggable="false">';
        flipper.appendChild(back);
        backImg = back.firstChild;
      }
      if (backImg) loadImage(o.backImage, backImg, 'back-ready');
      if (!flippable) {
        root.classList.remove('is-flipped');
        root.removeAttribute('aria-pressed');
      }
    }

    function loadImage(src, img, attr) {
      img.removeAttribute('src');
      root.removeAttribute('data-' + attr);
      if (!src) return;
      img.onload = function () { if (alive) root.setAttribute('data-' + attr, ''); };
      img.src = src;
    }

    /* ---- 倾斜（~30 行）：pointermove 写归一化坐标 ---- */
    function setPointer(mx, my, inside) {
      var st = root.style;
      st.setProperty('--mx', mx.toFixed(4));
      st.setProperty('--my', my.toFixed(4));
      var awake = clamp(Math.hypot(mx - 0.5, my - 0.5) * 3.2 + (inside ? 0.3 : 0), 0.35, 1);
      st.setProperty('--cz-awake', awake.toFixed(3));
      hovering = inside;
      root.classList.toggle('is-hover', inside);
    }

    function onMove(e) {
      if (reduce) return;
      if (e.pointerType === 'touch' && e.type === 'pointermove' && !e.buttons) return;
      var r = root.getBoundingClientRect();
      setPointer(
        clamp((e.clientX - r.left) / r.width, 0, 1),
        clamp((e.clientY - r.top) / r.height, 0, 1),
        true
      );
      stopIdle();
    }

    function onLeave() {
      setPointer(0.5, 0.5, false); // pointerleave 回正（transition 平滑）
      wake();
    }

    function toggleFlip() {
      if (!o.backImage) return;
      var flipped = root.classList.toggle('is-flipped');
      root.setAttribute('aria-pressed', String(flipped));
    }

    function onKey(e) {
      if (!o.backImage || (e.key !== 'Enter' && e.key !== ' ')) return;
      e.preventDefault();
      if (!e.repeat) toggleFlip();
    }
    function onClick() { toggleFlip(); }

    /* ---- 闲置自动漂移：正弦双频 idle（频率取自原实现 0.7 / 0.53） ---- */
    function tick(now) {
      raf = 0;
      if (!alive || hovering || reduce || !o.idle || !visible || document.hidden) return;
      var dt = last ? clamp((now - last) / 1000, 0, 0.05) : 0.016;
      last = now;
      clock += dt;
      var mx = 0.5 + Math.sin(clock * 0.53 + 1.2) * 0.2;
      var my = 0.5 - Math.sin(clock * 0.7) * 0.14;
      var st = root.style;
      st.setProperty('--mx', mx.toFixed(4));
      st.setProperty('--my', my.toFixed(4));
      st.setProperty('--cz-awake', clamp(0.45 + Math.abs(Math.sin(clock * 0.7)) * 0.55, 0, 1).toFixed(3));
      raf = requestAnimationFrame(tick);
    }
    function wake() {
      if (!raf && alive && !reduce && o.idle && !hovering && visible && !document.hidden) {
        last = 0;
        raf = requestAnimationFrame(tick);
      }
    }
    function stopIdle() {
      if (raf) { cancelAnimationFrame(raf); raf = 0; }
      last = 0;
    }

    /* ---- 生命周期：IO 离屏暂停 + 切页暂停 ---- */
    root.addEventListener('pointerenter', onMove);
    root.addEventListener('pointermove', onMove);
    root.addEventListener('pointerdown', onMove);
    root.addEventListener('pointerleave', onLeave);
    root.addEventListener('pointercancel', onLeave);
    root.addEventListener('click', onClick);
    root.addEventListener('keydown', onKey);

    var io = new IntersectionObserver(function (entries) {
      visible = entries.some(function (en) { return en.isIntersecting; });
      if (visible) wake(); else stopIdle();
    });
    io.observe(root);
    var onVis = function () { if (document.hidden) stopIdle(); else wake(); };
    document.addEventListener('visibilitychange', onVis);

    apply(options);

    return {
      el: root,
      setOptions: function (patch) {
        apply(patch);
        if (!reduce) wake();
      },
      destroy: function () {
        alive = false;
        stopIdle();
        io.disconnect();
        document.removeEventListener('visibilitychange', onVis);
        root.removeEventListener('pointerenter', onMove);
        root.removeEventListener('pointermove', onMove);
        root.removeEventListener('pointerdown', onMove);
        root.removeEventListener('pointerleave', onLeave);
        root.removeEventListener('pointercancel', onLeave);
        root.removeEventListener('click', onClick);
        root.removeEventListener('keydown', onKey);
        if (root.parentNode) root.parentNode.removeChild(root);
      }
    };
  }

  window.LZY.Comp.HoloCard = {
    version: '1.0.0',
    init: function (el, options) {
      if (!el || !el.appendChild) return null;
      return create(el, options || {});
    }
  };
})();
