(function () {
  'use strict';

  function createInstance(options) {
    var layer = options.layer;
    var trigger = options.trigger;
    var skipTarget = options.skipTarget;
    var gate = options.gate || document.querySelector('.intro-gate');
    if (!layer || !trigger || !skipTarget || !gate) return null;
    if (layer.__czCinematicIntro) return layer.__czCinematicIntro;

    var video = layer.querySelector('.cz-cinematic__video');
    var playButton = layer.querySelector('[data-cz-play]');
    var muteButton = layer.querySelector('[data-cz-mute]');
    var resumeButton = layer.querySelector('[data-cz-resume]');
    var skipButton = layer.querySelector('[data-cz-skip]');
    var fallback = layer.querySelector('.cz-cinematic__fallback');
    var fallbackMessage = layer.querySelector('.cz-cinematic__fallback-message');
    var progress = layer.querySelector('.cz-cinematic__range');
    var time = layer.querySelector('.cz-cinematic__time');
    if (!video || !playButton || !muteButton || !resumeButton || !skipButton || !fallback || !fallbackMessage || !progress || !time) return null;

    var playLabel = playButton.querySelector('[data-cz-label]');
    var muteLabel = muteButton.querySelector('[data-cz-label]');
    var playIcon = playButton.querySelector('[data-cz-icon="play"]');
    var pauseIcon = playButton.querySelector('[data-cz-icon="pause"]');
    var soundIcon = muteButton.querySelector('[data-cz-icon="sound"]');
    var mutedIcon = muteButton.querySelector('[data-cz-icon="muted"]');
    var listeners = [];
    var inertElements = [];
    var state = 'idle';
    var destroyed = false;
    var pointerStart = null;
    var pointerDragged = false;
    var instance;

    function listen(el, type, fn, opts) {
      el.addEventListener(type, fn, opts);
      listeners.push({ el: el, type: type, fn: fn, opts: opts });
    }

    function focusElement(el) {
      if (!el || typeof el.focus !== 'function') return;
      try { el.focus({ preventScroll: true }); }
      catch (e) { el.focus(); }
    }

    function formatTime(seconds) {
      if (!isFinite(seconds) || seconds < 0) seconds = 0;
      var total = Math.floor(seconds);
      var minutes = Math.floor(total / 60);
      var rest = total % 60;
      return String(minutes).padStart(2, '0') + ':' + String(rest).padStart(2, '0');
    }

    function syncProgress() {
      var duration = video.duration;
      var usable = isFinite(duration) && duration > 0;
      var current = usable ? Math.min(video.currentTime, duration) : 0;
      var ratio = usable ? current / duration : 0;
      progress.disabled = !usable;
      progress.value = String(Math.round(ratio * 1000));
      progress.style.setProperty('--cz-progress', (ratio * 100).toFixed(2) + '%');
      progress.setAttribute('aria-valuetext', formatTime(current) + '，共 ' + formatTime(usable ? duration : 0));
      time.value = formatTime(current) + ' / ' + formatTime(usable ? duration : 0);
      time.textContent = time.value;
    }

    function syncPlayback() {
      var paused = video.paused;
      var playText = paused ? '播放' : '暂停';
      if (playLabel) playLabel.textContent = playText;
      playButton.setAttribute('aria-label', paused ? '播放片头' : '暂停片头');
      if (playIcon) playIcon.hidden = !paused;
      if (pauseIcon) pauseIcon.hidden = paused;
    }

    function syncMute() {
      var muted = video.muted;
      if (muteLabel) muteLabel.textContent = muted ? '开启声音' : '关闭声音';
      muteButton.setAttribute('aria-label', muted ? '开启片头声音' : '关闭片头声音');
      muteButton.setAttribute('aria-pressed', muted ? 'true' : 'false');
      if (soundIcon) soundIcon.hidden = muted;
      if (mutedIcon) mutedIcon.hidden = !muted;
    }

    function showFallback(message, buttonText) {
      if (state !== 'video') return;
      fallbackMessage.textContent = message;
      resumeButton.textContent = buttonText || '点击播放';
      fallback.hidden = false;
      focusElement(resumeButton);
    }

    function hideFallback() {
      var restoreControlFocus = fallback.contains(document.activeElement);
      fallback.hidden = true;
      if (restoreControlFocus) focusElement(playButton);
    }

    function attemptPlay() {
      if (state !== 'video') return;
      if (video.error) video.load();
      var promise;
      try { promise = video.play(); }
      catch (error) {
        showFallback('片头未能开始播放，请点击播放重试，或跳过片头。', '点击播放');
        return;
      }
      if (!promise || typeof promise.then !== 'function') {
        hideFallback();
        syncPlayback();
        return;
      }
      promise.then(function () {
        if (state !== 'video') return;
        hideFallback();
        syncPlayback();
      }).catch(function () {
        if (state !== 'video') return;
        showFallback('浏览器未允许自动播放，请点击播放；也可以跳过片头。', '点击播放');
      });
    }

    function setBackgroundInert(value) {
      if (value) {
        inertElements = [];
        [gate, document.querySelector('main'), document.querySelector('.site-header'), document.querySelector('.station-index'), document.querySelector('.lightbox')].forEach(function (el) {
          if (el && !el.inert) {
            el.inert = true;
            inertElements.push(el);
          }
        });
      } else {
        inertElements.forEach(function (el) { el.inert = false; });
        inertElements = [];
      }
    }

    function finish() {
      if (state !== 'video') return;
      state = 'gallery';
      video.pause();
      layer.hidden = true;
      layer.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('cz-cinematic-open');
      setBackgroundInert(false);
      gate.hidden = false;
      gate.removeAttribute('aria-hidden');
      focusElement(trigger);
    }

    function open() {
      if (state !== 'idle' || destroyed) return;
      state = 'video';
      layer.hidden = false;
      layer.setAttribute('aria-hidden', 'false');
      document.body.classList.add('cz-cinematic-open');
      setBackgroundInert(true);
      skipTarget.hidden = true;
      gate.hidden = true;
      gate.setAttribute('aria-hidden', 'true');
      hideFallback();
      video.defaultMuted = true;
      video.muted = true;
      syncPlayback();
      syncMute();
      syncProgress();
      focusElement(playButton);

      var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) showFallback('已遵循减少动态效果设置，未自动播放。请选择播放片头或跳过。', '播放片头');
      else attemptPlay();
    }

    function enterSite() {
      if (state !== 'gallery') return;
      state = 'entered';
      pointerDragged = false;
      pointerStart = null;
      skipTarget.click();
    }

    function onTriggerClick(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      if (state !== 'gallery') return;
      if (pointerDragged && e.detail !== 0) {
        pointerDragged = false;
        pointerStart = null;
        return;
      }
      enterSite();
    }

    function onTriggerKeydown(e) {
      if (e.target !== trigger || (e.key !== 'Enter' && e.key !== ' ')) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      enterSite();
    }

    function onPointerDown(e) {
      if (e.button !== 0) return;
      pointerStart = { id: e.pointerId, x: e.clientX, y: e.clientY };
      pointerDragged = false;
    }

    function onPointerUp(e) {
      if (!pointerStart || pointerStart.id !== e.pointerId) return;
      pointerDragged = Math.hypot(e.clientX - pointerStart.x, e.clientY - pointerStart.y) > 8;
      pointerStart = null;
    }

    function getFocusable() {
      return Array.from(layer.querySelectorAll('button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])')).filter(function (el) {
        return !el.hidden && el.getClientRects().length > 0;
      });
    }

    function onDocumentKeydown(e) {
      if (state !== 'video') return;
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopImmediatePropagation();
        finish();
        return;
      }
      if (e.key !== 'Tab') return;
      var focusable = getFocusable();
      if (!focusable.length) {
        e.preventDefault();
        return;
      }
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      var active = document.activeElement;
      if (!layer.contains(active)) {
        e.preventDefault();
        focusElement(first);
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        focusElement(last);
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        focusElement(first);
      }
    }

    listen(trigger, 'click', onTriggerClick, true);
    listen(trigger, 'keydown', onTriggerKeydown);
    listen(trigger, 'pointerdown', onPointerDown, true);
    listen(trigger, 'pointerup', onPointerUp, true);
    listen(trigger, 'pointercancel', function () { pointerStart = null; pointerDragged = true; }, true);
    listen(document, 'keydown', onDocumentKeydown, true);
    listen(skipButton, 'click', finish);
    listen(resumeButton, 'click', attemptPlay);
    listen(playButton, 'click', function () {
      if (video.paused) attemptPlay();
      else video.pause();
    });
    listen(muteButton, 'click', function () {
      video.muted = !video.muted;
      syncMute();
    });
    listen(progress, 'input', function () {
      if (!isFinite(video.duration) || video.duration <= 0) return;
      video.currentTime = Number(progress.value) / 1000 * video.duration;
      syncProgress();
    });
    listen(video, 'loadedmetadata', syncProgress);
    listen(video, 'durationchange', syncProgress);
    listen(video, 'timeupdate', syncProgress);
    listen(video, 'play', function () { if (state === 'video') hideFallback(); syncPlayback(); });
    listen(video, 'pause', syncPlayback);
    listen(video, 'volumechange', syncMute);
    listen(video, 'ended', finish);
    listen(video, 'error', function () {
      showFallback('片头加载失败，请重试；也可以跳过片头。', '重新播放');
    });

    instance = {
      el: layer,
      open: open,
      finish: finish,
      destroy: function () {
        if (destroyed) return;
        destroyed = true;
        if (state === 'video') {
          video.pause();
          gate.hidden = false;
          gate.removeAttribute('aria-hidden');
        }
        state = 'entered';
        skipTarget.hidden = false;
        layer.hidden = true;
        layer.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('cz-cinematic-open');
        setBackgroundInert(false);
        listeners.forEach(function (item) { item.el.removeEventListener(item.type, item.fn, item.opts); });
        listeners = [];
        if (layer.__czCinematicIntro === instance) delete layer.__czCinematicIntro;
      },
      setOptions: function (next) {
        if (next && next.skipTarget) skipTarget = next.skipTarget;
      }
    };
    layer.__czCinematicIntro = instance;
    open();
    return instance;
  }

  window.LZY = window.LZY || {};
  window.LZY.Comp = window.LZY.Comp || {};
  window.LZY.Comp.CinematicIntro = {
    init: function (options) { return createInstance(options || {}); }
  };
})();
