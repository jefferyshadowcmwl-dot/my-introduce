/*!
 * LZY.Comp.ScrambledText — 乱码文字（ReactBits ScrambledText 零依赖重写，去除 gsap）
 * 切字：sizer(占位,visibility:hidden) + glyph(absolute) 双层结构防抖动；
 * 乱码：每字 {until,nextSwap,active} 状态机，rAF 内换字/还原；
 * 指针进入：until = now + duration*(1-dist/radius)，falloff=(1-(d/r)²)²；
 * 物理效应 lift/blur 照抄原版 paint()（translate3d/blur 按 energy 值）；
 * 点击波：{x,y,age,reach} 环扫命中触发乱码；
 * intro：IntersectionObserver + 按索引 stagger 解码（一次性）。
 * 中文建议字符集 '▓▒░█01<>/#'（未显式传 charset 且文本含 CJK 时自动启用）。
 */
(function () {
  'use strict';
  window.LZY = window.LZY || {};
  window.LZY.Comp = window.LZY.Comp || {};

  var CJK = /[\u2E80-\u9FFF\uF900-\uFBFF\uFF00-\uFFEF]/;
  var CJK_CHARSET = '▓▒░█01<>/#';
  var DEFAULTS = {
    text: '',            // 空 → 取挂载元素自身 textContent
    charset: '',         // 空 → 自动：含 CJK 用 '▓▒░█01<>/#'，否则 '.:'
    radius: 120,
    duration: 800,       // ms，指针正下方字保持乱码的时长
    speed: 0.5,          // 0~1，乱码字符闪烁频率
    strength: 1,         // lift/blur 幅度倍率
    trail: 0.6,          // s，物理效应回落时长
    useLift: false,      // 指针附近字上浮
    useBlur: false,      // 指针附近字模糊+缩放+降透明
    scrambleOnHover: true,
    clickBurst: true,    // 点击发出乱码环扫波
    introDecode: true,   // 首次进入视口按索引 stagger 解码（一次性）
    fontFamily: '',
    color: '',
    scrambleColor: ''
  };

  function init(el, options) {
    if (!el || el.nodeType !== 1) throw new Error('[ScrambledText] init 需要一个挂载元素');
    var settings = Object.assign({}, DEFAULTS, options || {});
    var reduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    var charset = settings.charset;
    var rawText = settings.text || el.textContent || '';
    rawText = rawText.replace(/\s+/g, ' ').trim();
    if (!charset) charset = CJK.test(rawText) ? CJK_CHARSET : '.:';

    el.classList.add('cz-scrambled');
    if (settings.fontFamily) el.style.fontFamily = settings.fontFamily;
    if (settings.color) el.style.color = settings.color;

    var sr = document.createElement('span');
    sr.className = 'cz-scrambled-sr';
    sr.textContent = rawText;
    var textEl = document.createElement('p');
    textEl.className = 'cz-scrambled-text';
    textEl.setAttribute('aria-hidden', 'true');
    el.textContent = '';
    el.appendChild(sr);
    el.appendChild(textEl);

    /* 切字：连续西文数字包 word（防单词内断行），CJK 逐字，空格独立；
       每字一律 sizer(占位) + glyph(absolute) 双层结构——乱码换字不改布局 */
    var originals = [];
    var glyphs = [];   // 内层 glyph span（显示层）
    var chars = [];    // 外层 char span（transform 层）
    var build = function () {
      var parts = Array.from(rawText);
      var word = null;
      var isWordChar = function (ch) { return !/\s/.test(ch) && !CJK.test(ch); };
      var pushChar = function (ch, intoWord) {
        var char = document.createElement('span');
        char.className = 'cz-scr-char';
        var sizer = document.createElement('span');
        sizer.className = 'cz-scr-sizer';
        sizer.textContent = ch;
        var glyph = document.createElement('span');
        glyph.className = 'cz-scr-glyph';
        glyph.textContent = ch;
        char.appendChild(sizer);
        char.appendChild(glyph);
        (intoWord && word ? word : textEl).appendChild(char);
        originals.push(ch);
        glyphs.push(glyph);
        chars.push(char);
      };
      for (var i = 0; i < parts.length; i++) {
        var ch = parts[i];
        if (/\s/.test(ch)) {
          word = null;
          pushChar(' ', false);
          continue;
        }
        if (isWordChar(ch)) {
          if (!word) {
            word = document.createElement('span');
            word.className = 'cz-scr-word';
            textEl.appendChild(word);
          }
          pushChar(ch, true);
        } else {
          word = null;
          pushChar(ch, false);
        }
      }
    };
    build();

    var n = glyphs.length;
    var points = [];
    var scramble = [];
    for (var i0 = 0; i0 < n; i0++) {
      points.push({ x: 0, y: 0, energy: 0, dx: 0, dy: 0, shown: false });
      scramble.push({ until: 0, nextSwap: 0, active: false });
    }
    var randChar = function () { return charset.charAt(Math.floor(Math.random() * charset.length)); };
    var swapMs = function () { return 40 + (1 - Math.max(0, Math.min(1, settings.speed))) * 160; };

    var waves = [];
    var measured = false, fontPx = 16;
    var raf = 0, last = 0, moveFrame = 0;
    var io = null;
    var alive = true;
    var pointer = { x: 0, y: 0, sx: 0, sy: 0, inside: false };

    var falloff = function (distance, radius) {
      if (distance >= radius) return 0;
      var f = 1 - (distance / radius) * (distance / radius);
      return f * f;
    };

    var offsetOf = function (node) {
      var x = 0, y = 0;
      for (var t = node; t; t = t.offsetParent) { x += t.offsetLeft; y += t.offsetTop; }
      return [x, y];
    };
    var measure = function () {
      fontPx = parseFloat(window.getComputedStyle(textEl).fontSize) || 16;
      var rootPos = offsetOf(el);
      for (var i = 0; i < chars.length; i++) {
        var pos = offsetOf(chars[i]);
        points[i].x = pos[0] - rootPos[0] + chars[i].offsetWidth / 2;
        points[i].y = pos[1] - rootPos[1] + chars[i].offsetHeight / 2;
      }
      measured = true;
    };
    var toLocal = function (e) {
      var rect = el.getBoundingClientRect();
      var scaleX = el.offsetWidth ? rect.width / el.offsetWidth : 1;
      var scaleY = el.offsetHeight ? rect.height / el.offsetHeight : 1;
      return [(e.clientX - rect.left) / (scaleX || 1), (e.clientY - rect.top) / (scaleY || 1)];
    };

    var clear = function (i) {
      chars[i].style.transform = '';
      chars[i].style.filter = '';
      chars[i].style.opacity = '';
      chars[i].style.zIndex = '';
      points[i].shown = false;
    };

    /* 物理效应 paint()：lift=translate3d 上浮；blur=filter+opacity+scale。可叠加 */
    var paint = function (i, amount) {
      var p = points[i];
      var e = p.energy;
      if (e < 0.001) { if (p.shown) clear(i); return; }
      var char = chars[i];
      p.shown = true;
      var tf = '';
      if (settings.useLift) tf += 'translate3d(0, ' + (-e * fontPx * 0.75 * amount).toFixed(2) + 'px, 0) ';
      if (settings.useBlur) {
        char.style.filter = 'blur(' + (e * fontPx * 0.24 * amount).toFixed(2) + 'px)';
        char.style.opacity = (1 - e * Math.min(0.7, 0.45 * amount)).toFixed(3);
        tf += 'scale(' + (1 + e * 0.15 * amount).toFixed(4) + ')';
      }
      if (tf) char.style.transform = tf;
    };

    var wake = function () { if (!raf && alive) raf = requestAnimationFrame(tick); };

    var tick = function (now) {
      raf = 0;
      if (!alive) return;
      var dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
      last = now;
      if (!measured) measure();
      var amount = Math.max(0, settings.strength);
      var reach = Math.max(1, settings.radius);
      var width = Math.max(fontPx * 1.3, 16);
      var phys = (settings.useLift || settings.useBlur) && !reduce;
      var follow = 1 - Math.exp(-dt / 0.06);
      var attack = 1 - Math.exp(-dt / 0.08);
      var release = 1 - Math.exp(-dt / Math.max(0.04, settings.trail / 3));
      pointer.sx += (pointer.x - pointer.sx) * follow;
      pointer.sy += (pointer.y - pointer.sy) * follow;

      for (var w = 0; w < waves.length; w++) {
        var wave = waves[w];
        wave.age += dt;
        var t = Math.min(1, wave.age / wave.life);
        wave.r = wave.reach * (1 - (1 - t) * (1 - t));
        wave.fade = t < 0.75 ? 1 : 1 - Math.pow((t - 0.75) / 0.25, 2);
      }

      var busy = waves.length > 0 ||
        Math.abs(pointer.x - pointer.sx) + Math.abs(pointer.y - pointer.sy) > 0.2;
      var nowMs = now;
      for (var i = 0; i < n; i++) {
        /* 乱码状态机：until 内随机换字，到期还原 */
        var sc = scramble[i];
        if (sc.until > nowMs) {
          if (!sc.active) { sc.active = true; sc.nextSwap = 0; }
          if (nowMs >= sc.nextSwap) {
            glyphs[i].textContent = randChar();
            if (settings.scrambleColor) glyphs[i].style.color = settings.scrambleColor;
            sc.nextSwap = nowMs + swapMs();
          }
          busy = true;
        } else if (sc.active) {
          sc.active = false;
          glyphs[i].textContent = originals[i];
          glyphs[i].style.color = '';
        }

        /* 物理 energy：朝 pointer/wave 目标松弛 */
        var p = points[i];
        var target = 0;
        var tx = 0, ty = 0;
        if (phys && pointer.inside) {
          var ax = p.x - pointer.sx, ay = p.y - pointer.sy;
          target = falloff(Math.hypot(ax, ay), reach);
          tx = ax * 0.5 * amount * target;
          ty = ay * 0.5 * amount * target;
        }
        for (var v = 0; v < waves.length; v++) {
          var wv = waves[v];
          var wx = p.x - wv.x, wy = p.y - wv.y;
          var d = Math.hypot(wx, wy);
          var strengthAt = 1 - (0.6 * d) / wv.reach;
          if (!wv.hit[i] && d <= wv.r) {
            wv.hit[i] = 1;
            /* 原版时长语义：下限 0.2s */
            scramble[i].until = nowMs + Math.max(200, settings.duration * (0.2 + 0.5 * strengthAt));
            scramble[i].nextSwap = 0;
          }
          var band = strengthAt * wv.fade * Math.exp(-Math.pow((d - wv.r) / width, 2));
          if (band > target) {
            var push = (fontPx * 0.6 * amount * band) / (d || 1);
            target = band;
            tx = wx * push;
            ty = wy * push;
          }
        }
        var k = target > p.energy ? attack : release;
        p.energy += (target - p.energy) * k;
        if (Math.abs(target - p.energy) > 0.0005) busy = true;
        if (!phys) { if (p.shown) clear(i); continue; }
        paint(i, amount);
      }

      for (var j = waves.length - 1; j >= 0; j--) {
        if (waves[j].age >= waves[j].life) waves.splice(j, 1);
      }
      if (busy) raf = requestAnimationFrame(tick);
      else last = 0;
    };

    /* 指针 hover：半径内 until = now + duration*(1-dist/radius)（gsap overwrite 语义 → 直接覆盖） */
    var scrambleNearPointer = function () {
      moveFrame = 0;
      if (!measured) measure();
      var now = performance.now();
      var radius = Math.max(1, settings.radius);
      for (var i = 0; i < n; i++) {
        var p = points[i];
        var dist = Math.hypot(pointer.x - p.x, pointer.y - p.y);
        if (dist < radius) {
          scramble[i].until = now + settings.duration * (1 - dist / radius);
          scramble[i].nextSwap = 0;
        }
      }
      wake();
    };

    var handleEnter = function () { measured = false; };
    var handleMove = function (e) {
      var local = toLocal(e);
      pointer.x = local[0]; pointer.y = local[1];
      if (!pointer.inside) { pointer.sx = pointer.x; pointer.sy = pointer.y; pointer.inside = true; }
      if (settings.scrambleOnHover && !reduce) {
        if (!moveFrame) moveFrame = requestAnimationFrame(scrambleNearPointer);
      }
      if ((settings.useLift || settings.useBlur) && !reduce) wake();
    };
    var handleLeave = function () { pointer.inside = false; wake(); };
    var handleDown = function (e) {
      if (!settings.clickBurst || reduce || (e.pointerType === 'mouse' && e.button !== 0)) return;
      if (!measured) measure();
      var local = toLocal(e);
      var x = local[0], y = local[1];
      var reach = 0;
      for (var i = 0; i < n; i++) reach = Math.max(reach, Math.hypot(points[i].x - x, points[i].y - y));
      reach += fontPx;
      if (waves.length > 3) waves.shift();
      waves.push({ x: x, y: y, age: 0, r: 0, fade: 1, reach: reach, life: 0.45 + reach / 1100, hit: new Uint8Array(n) });
      wake();
    };

    /* intro：首次进入视口 → 按索引 stagger 解码（一次性）。触发前静态乱码 */
    if (settings.introDecode && !reduce && n > 0) {
      for (var g = 0; g < n; g++) {
        glyphs[g].textContent = randChar();
        scramble[g].active = true;
        scramble[g].until = Infinity;
      }
      io = new IntersectionObserver(function (entries) {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        io = null;
        var now = performance.now();
        for (var i = 0; i < n; i++) {
          scramble[i].until = now + 150 + settings.duration * (0.75 * (i / n) + 0.25 * Math.random());
          scramble[i].nextSwap = 0;
        }
        wake();
      }, { rootMargin: '0px 0px -10% 0px' });
      io.observe(el);
    }

    el.addEventListener('pointerenter', handleEnter);
    el.addEventListener('pointermove', handleMove);
    el.addEventListener('pointerleave', handleLeave);
    el.addEventListener('pointerdown', handleDown);
    var resizeObserver = new ResizeObserver(function () { measured = false; });
    resizeObserver.observe(el);
    document.fonts && document.fonts.ready.then(function () { measured = false; }, function () {});
    var onVisChange = function () {
      if (document.hidden) {
        if (raf) { cancelAnimationFrame(raf); raf = 0; }
        if (moveFrame) { cancelAnimationFrame(moveFrame); moveFrame = 0; }
      }
    };
    document.addEventListener('visibilitychange', onVisChange);

    var destroy = function () {
      alive = false;
      if (raf) cancelAnimationFrame(raf);
      if (moveFrame) cancelAnimationFrame(moveFrame);
      resizeObserver.disconnect();
      if (io) io.disconnect();
      document.removeEventListener('visibilitychange', onVisChange);
      el.removeEventListener('pointerenter', handleEnter);
      el.removeEventListener('pointermove', handleMove);
      el.removeEventListener('pointerleave', handleLeave);
      el.removeEventListener('pointerdown', handleDown);
      el.classList.remove('cz-scrambled');
      el.style.fontFamily = '';
      el.style.color = '';
      el.textContent = rawText;
    };

    var setOptions = function (o) {
      if (!o) return;
      Object.assign(settings, o);
      el.style.fontFamily = settings.fontFamily || '';
      el.style.color = settings.color || '';
      if ('text' in o) {
        rawText = String(settings.text || '').replace(/\s+/g, ' ').trim();
        sr.textContent = rawText;
      }
      charset = settings.charset || (CJK.test(rawText) ? CJK_CHARSET : '.:');
      /* text/charset 变更：就地重建字符结构与乱码状态机 */
      originals = []; glyphs = []; chars = []; points.length = 0; scramble.length = 0;
      textEl.textContent = '';
      build();
      n = glyphs.length;
      for (var i = 0; i < n; i++) {
        points.push({ x: 0, y: 0, energy: 0, dx: 0, dy: 0, shown: false });
        scramble.push({ until: 0, nextSwap: 0, active: false });
      }
      waves.length = 0;
      measured = false;
      if (raf) { cancelAnimationFrame(raf); raf = 0; last = 0; }
    };

    return { destroy: destroy, setOptions: setOptions, el: el };
  }

  window.LZY.Comp.ScrambledText = { init: init };
})();
