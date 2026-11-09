(function () {
  'use strict';

  function init(options) {
    var el = options.mount;
    var trigger = options.trigger;
    var skipTarget = options.skipTarget;
    if (!el || !trigger || !skipTarget) return null;
    if (el.__czIntroGallery) return el.__czIntroGallery;

    var root = document.createElement('div');
    root.className = 'cz-intro-gallery__scene';
    root.innerHTML =
      '<svg class="cz-intro-gallery__traces" viewBox="0 0 1200 480" preserveAspectRatio="none" aria-hidden="true">' +
        '<path class="cz-intro-gallery__trace cz-intro-gallery__trace--primary" d="M-40 274 C180 102 354 386 594 242 S988 112 1240 256"/>' +
        '<path class="cz-intro-gallery__trace cz-intro-gallery__trace--secondary" d="M-40 314 C212 426 364 114 624 260 S1012 368 1240 196"/>' +
      '</svg>' +
      '<span class="cz-intro-gallery__marker cz-intro-gallery__marker--index" aria-hidden="true">0324 / 01 · SIGNAL ONLINE</span>' +
      '<div class="cz-intro-gallery__content">' +
        '<span class="cz-intro-gallery__kicker">PERSONAL PORTFOLIO · SHANGHAI</span>' +
        '<h2 class="cz-intro-gallery__name">' +
          '<span>刘致远</span>' +
          '<span class="cz-intro-gallery__slash" aria-hidden="true">/</span>' +
          '<span class="cz-intro-gallery__latin">LIU ZHIYUAN</span>' +
        '</h2>' +
        '<span class="cz-intro-gallery__rule" aria-hidden="true"></span>' +
        '<span class="cz-intro-gallery__enter">' +
          '<span>点击进入详情页</span>' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
            '<path d="M5 12h14M13 6l6 6-6 6"/>' +
          '</svg>' +
        '</span>' +
        '<span class="cz-intro-gallery__help" id="cz-intro-entry-help">CLICK TO ENTER · ENTER / SPACE</span>' +
      '</div>' +
      '<span class="cz-intro-gallery__marker cz-intro-gallery__marker--coordinates" aria-hidden="true">31.2304° N · 121.4737° E</span>';

    var previous = {
      role: trigger.getAttribute('role'),
      label: trigger.getAttribute('aria-label'),
      describedby: trigger.getAttribute('aria-describedby'),
      tabindex: trigger.getAttribute('tabindex')
    };

    function enter() {
      skipTarget.click();
    }

    function onKeyDown(event) {
      if (event.key !== 'Enter' && event.key !== ' ' && event.key !== 'Spacebar') return;
      event.preventDefault();
      if (!event.repeat) enter();
    }

    function restoreAttribute(name, value) {
      if (value === null) trigger.removeAttribute(name);
      else trigger.setAttribute(name, value);
    }

    el.replaceChildren(root);
    el.classList.add('cz-intro-gallery--ready');
    trigger.setAttribute('role', 'button');
    trigger.setAttribute('tabindex', '0');
    trigger.setAttribute('aria-label', '刘致远，点击进入详情页');
    trigger.setAttribute('aria-describedby', 'cz-intro-entry-help');
    trigger.addEventListener('click', enter);
    trigger.addEventListener('keydown', onKeyDown);

    var handle = {
      el: el,
      root: root,
      destroy: function () {
        trigger.removeEventListener('click', enter);
        trigger.removeEventListener('keydown', onKeyDown);
        restoreAttribute('role', previous.role);
        restoreAttribute('aria-label', previous.label);
        restoreAttribute('aria-describedby', previous.describedby);
        restoreAttribute('tabindex', previous.tabindex);
        el.replaceChildren();
        el.classList.remove('cz-intro-gallery--ready');
        delete el.__czIntroGallery;
      }
    };

    el.__czIntroGallery = handle;
    return handle;
  }

  window.LZY = window.LZY || {};
  window.LZY.Comp = window.LZY.Comp || {};
  window.LZY.Comp.IntroGallery = {
    init: function (options) { return init(options || {}); }
  };
})();
