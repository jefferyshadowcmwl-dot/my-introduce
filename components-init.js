/* ============================================================
   components-init.js — v2 组件整合层（12 个 cz- 组件的站点初始化）

   时序契约（spec §四 11）：
     组件 js（只定义，不执行）→ script.js（onReady 同步注入数据）
     → 本文件（初始化 + 桥接）

   本文件在 script.js 之后注册 DOMContentLoaded（同事件先注册先触发），
   执行时 script.js 的注入（gallery/campus/awards/archive/项目配图）已完成；
   注入型容器额外用 whenFilled() 轮询兜底，防时序漂移。
   不改 script.js 任何现有函数逻辑 —— 桥接通过
   dataset（data-img-id/data-caption/data-cat）、window.openLightbox
   与原 .intro-skip 点击事件完成。

   红线自检（spec §四 12 条在文件尾部逐条核对，见整合报告）。
   ============================================================ */
(function () {
  'use strict';

  var C = (window.LZY && window.LZY.Comp) || null;

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  /* 注入型容器等待：正常路径一次命中（script.js 已先注入），
     意外未填时轮询兜底（25ms × 240 ≈ 6s 上限，超时静默放弃 ——
     宿主区块保持原样，不影响内容可读） */
  function whenFilled(sel, cb) {
    var n = 0;
    (function poll() {
      var el = document.querySelector(sel);
      if (el && el.children.length) { cb(el); return; }
      if (++n > 240) { console.warn('[components-init] 等待容器超时：' + sel); return; }
      setTimeout(poll, 25);
    })();
  }

  /* 单组件失败不中断其它组件（氛围层挂了不能拖垮内容站） */
  function safe(name, fn) {
    try { fn(); } catch (e) { console.warn('[components-init] ' + name + ' 初始化失败：', e); }
  }

  ready(function () {
    safe('CinematicIntro', function () {
      if (!C || !C.CinematicIntro) return;
      C.CinematicIntro.init({
        layer: document.querySelector('#cinematic-intro'),
        trigger: document.querySelector('.character-button'),
        skipTarget: document.querySelector('.intro-skip'),
        gate: document.querySelector('.intro-gate')
      });
    });

    if (!C) { console.warn('[components-init] LZY.Comp 命名空间缺失（组件 js 未加载？）'); return; }

    safe('IntroGallery', function () {
      if (!C.IntroGallery) {
        console.warn('[components-init] IntroGallery 未加载，原 .intro-skip 仍可进入主站。');
        return;
      }
      C.IntroGallery.init({
        mount: document.querySelector('.character-button .cz-intro-gallery'),
        trigger: document.querySelector('.character-button'),
        skipTarget: document.querySelector('.intro-skip')
      });
    });

    safe('GhostFibers/entry', function () {
      var el = document.querySelector('.cz-intro-ascii');
      var gate = document.querySelector('.intro-gate');
      var api = window.LZYReact;
      if (!el || !gate || !api || !api.mountGhostFibers) return;
      gate.classList.add('cz-fiber-entry');
      gate.classList.remove('cz-ascii-entry');
      el.classList.remove('cz-ghost-fallback');
      var fibers = api.mountGhostFibers(el, { paused: true });
      var sync = function () {
        fibers.setOptions({ paused: gate.hidden || gate.classList.contains('is-leaving') ||
          gate.style.display === 'none' || document.body.classList.contains('cz-cinematic-open') });
      };
      new MutationObserver(sync).observe(gate, { attributes: true, attributeFilter: ['class', 'style', 'hidden'] });
      new MutationObserver(sync).observe(document.body, { attributes: true, attributeFilter: ['class'] });
      sync();
    });

    safe('TechText/entry', function () {
      var name = document.querySelector('.cz-intro-gallery__name');
      if (!name || !C.TechText) return;
      var label = document.createElement('span');
      label.className = 'cz-entry-tech-label';
      name.after(label);
      C.TechText.init(label, {
        text: 'LIU ZHIYUAN', fontFamily: '"JetBrains Mono", monospace',
        fontSize: 72, fontWeight: 600, letterSpacing: .02,
        color: '#e5eeeb', accentColor: '#78cfc5',
        reveal: 'letter', reach: 160, bounce: .18,
        labels: true, selection: true, sweep: true
      });
      name.classList.add('cz-entry-name-compact');
    });

    /* ---- 2. #about · React Three Lanyard ----
       正反面图片完全采用 bundle 默认值；挂载失败时原肖像保持可见。 */
    safe('Lanyard/about', function () {
      var portrait = document.querySelector('#about .vitrine-portrait');
      var img = portrait && portrait.querySelector('img');
      if (!portrait || !img) return;
      var vitrine = portrait.closest('.mu-vitrine');
      var originalAriaLabel = vitrine && vitrine.getAttribute('aria-label');
      var flipHint = null;
      var api = window.LZYReact;
      var fail = function (error) {
        portrait.classList.remove('cz-react-lanyard-ready');
        img.classList.remove('cz-react-lanyard-original');
        img.removeAttribute('aria-hidden');
        if (flipHint) flipHint.remove();
        if (vitrine && originalAriaLabel !== null) vitrine.setAttribute('aria-label', originalAriaLabel);
        console.warn('[components-init] #about Lanyard 挂载失败，已保留原肖像。', error);
      };
      if (!api || typeof api.mountLanyard !== 'function') {
        console.warn('[components-init] #about Lanyard bundle 未加载：请让 assets/lzy-react.js 先于 components-init 执行；已保留原肖像。');
        return;
      }

      portrait.addEventListener('click', function (event) {
        if (portrait.classList.contains('cz-react-lanyard-ready')) event.stopPropagation();
      });
      if (vitrine) vitrine.addEventListener('keydown', function (event) {
        if (!portrait.classList.contains('cz-react-lanyard-ready')) return;
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        event.stopPropagation();
        if (!event.repeat && mount.firstElementChild) mount.firstElementChild.dispatchEvent(new Event('lzy-flip'));
      });
      var mount = document.createElement('div');
      mount.className = 'cz-lanyard-react-mount';
      portrait.appendChild(mount);
      var entered = false;
      var enterWhenVisible = function () {
        if (entered || document.body.classList.contains('is-intro') ||
            document.body.classList.contains('cz-cinematic-open') ||
            !portrait.classList.contains('cz-react-lanyard-ready') || !mount.firstElementChild) return;
        entered = true;
        mount.firstElementChild.dispatchEvent(new Event('lzy-enter'));
        arrivalObserver.disconnect();
      };
      var arrivalObserver = new MutationObserver(enterWhenVisible);
      arrivalObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
      var onReady = function () {
        portrait.classList.add('cz-react-lanyard-ready');
        requestAnimationFrame(enterWhenVisible);
        img.classList.add('cz-react-lanyard-original');
        img.setAttribute('aria-hidden', 'true');
        flipHint = document.createElement('span');
        flipHint.className = 'cz-lanyard-flip-hint';
        flipHint.setAttribute('aria-hidden', 'true');
        flipHint.innerHTML =
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="m17 2 4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/>' +
            '<path d="m7 22-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>' +
          '</svg><span>点击翻面</span>';
        portrait.parentNode.insertBefore(flipHint, portrait.nextSibling);
        if (vitrine) vitrine.setAttribute('aria-label', '工牌点击翻面，展柜其他区域查看刘致远肖像原图');
      };
      try { api.mountLanyard(mount, { intro: true, damping: .28, breeze: 0, gravity: 1, elasticity: .5, onReady: onReady, onError: fail }); }
      catch (error) { fail(error); }
    });

    safe('GradientASCII/about', function () {
      var el = document.querySelector('.cz-about-orb');
      if (!el || !C.GradientASCII) return;
      el.classList.add('cz-about-ascii');
      C.GradientASCII.init(el, {
        colors: ['#0d1519', '#1c2d34', '#36565e', '#597b80', '#829a99'],
        shape: 'horizon', characters: ' .:+=xX0#', cellSize: 18,
        density: .64, glyphOpacity: .34, gradientOpacity: .12,
        glow: .08, grain: .02, flicker: .08,
        softness: .8, speed: 1.2, flow: .65, drift: 1,
        mouseInteraction: false, clickEffect: 'none', intro: true
      });
    });

    safe('Orb/internship', function () {
      var section = document.getElementById('internship');
      if (!section || !C.Orb || section.querySelector('.cz-internship-orb')) return;
      var mount = document.createElement('div');
      mount.className = 'cz-internship-orb';
      mount.setAttribute('aria-hidden', 'true');
      section.insertBefore(mount, section.firstChild);
      var options = function () {
        var light = document.documentElement.getAttribute('data-theme') === 'light';
        return {
          colors: light ? ['#557f7b', '#778b8d', '#ac976f'] : ['#78cfc5', '#809b9f', '#c8b285'],
          backgroundColor: light ? '#f0eee8' : '#0b0f12',
          speed: .16, size: .95, glow: .65, bleed: .45,
          wobble: .35, highlight: .35, trail: .3, opacity: .7,
          hoverIntensity: 0, rotateOnHover: false, followCursor: false,
          clickPulse: false, intro: false
        };
      };
      var orb = C.Orb.init(mount, options());
      if (!orb) { mount.remove(); return; }
      new MutationObserver(function () {
        orb.setOptions(options());
      }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    });

    /* ---- 详情页氛围：#gallery 字符画，#awards 光瀑 ---- */
    safe('DetailAtmosphere', function () {
      var api = window.LZYReact;
      if (!api || typeof api.mountDetailAtmosphere !== 'function') {
        console.warn('[components-init] DetailAtmosphere bundle 未加载。');
        return;
      }
      ['gallery', 'awards'].forEach(function (variant) {
        var section = document.getElementById(variant);
        if (!section || section.querySelector('.da-atmosphere')) return;
        var mount = document.createElement('div');
        mount.setAttribute('aria-hidden', 'true');
        mount.className = 'da-mount';
        section.insertBefore(mount, section.firstChild);
        api.mountDetailAtmosphere(mount, variant);
      });
    });

    /* ---- 3. #about · TechText 英文微标（中文大字标降级方案） ----
       中文标点双行文案在 canvas 单行布局下溢出、虚线轮廓在密笔画
      汉字上观感差，故 TechText 只渲染「LZY ENGINEER STATION」微标，
       h1 保持普通排版。canvas 内部已等 fonts.ready（双保险再等一次）。 */
    safe('TechText', function () {
      var el = document.querySelector('.cz-about-microtech');
      if (!el) return;
      var go = function () {
        C.TechText.init(el, {
          text: 'LZY ENGINEER STATION',
          fontFamily: '"JetBrains Mono", monospace',
          fontWeight: 600, fontSize: 34,
          reveal: 'letter', reach: 120, bounce: .25,
          labels: false, selection: false, sweep: true,
          color: 'currentColor', accentColor: 'currentColor'
        });
      };
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(go);
      else go();
    });

    /* ---- 5. 分区标题 · ScrambledText（接管 h2 内高亮 span） ----
       init(span) 直接取既有 textContent 切字：外层 span 的记号笔底纹
       （ed 区块）/渐变框（hall 区块）原样保留，仅内部文字逐字解码。
       底纹 span 若被清空会丢记号笔效果 → 因此只接管 span、不动 h2 本体。
       color 必传：.section-head h2 span 的 color:transparent（渐变 clip）
       会把组件字符一并变透明，inline 覆盖为分区 accent 实色。 */
    safe('ScrambledText', function () {
      var jobs = [
        { sel: '#projects .section-head h2 > span', color: '#ffb627' },
        { sel: '#gallery   .section-head h2 > span', color: '#5beaff' },
        { sel: '#campus    .section-head h2 > span', color: '#ffb627' },
        { sel: '#skills    .section-head h2 > span', color: '#ffb627' },
        { sel: '#contact   .section-head h2 > span', color: '#5beaff' }
      ];
      jobs.forEach(function (job) {
        document.querySelectorAll(job.sel).forEach(function (span) {
          if (!span.textContent.trim()) return;
          C.ScrambledText.init(span, {
            color: job.color, introDecode: true,
            radius: 140, duration: 700,
            useLift: false, useBlur: false,
            scrambleOnHover: true, clickBurst: false
          });
        });
      });
    });

    /* ---- 6. #projects · BorderGlow ×10（紫 265） ----
       包装类：不动卡片内部结构，仅末尾追加发光 span（红线 3 兼容）；
       backgroundColor 对齐 --surface 值 #1a0f2e。 */
    safe('BorderGlow/projects', function () {
      document.querySelectorAll('.project-grid .project-card').forEach(function (card) {
        C.BorderGlow.init(card, {
          glowColor: '265 90% 60%',
          backgroundColor: '#1a0f2e',
          borderRadius: 18, glowRadius: 36, coneSpread: 25,
          fillOpacity: .45
        });
      });
    });

    /* ---- 7. #contact · BorderGlow ×4（青 190） ---- */
    safe('BorderGlow/contact', function () {
      document.querySelectorAll('.contact-grid .contact-card').forEach(function (card) {
        C.BorderGlow.init(card, {
          glowColor: '190 100% 50%',
          backgroundColor: '#1a0f2e',
          borderRadius: 16, glowRadius: 34
        });
      });
    });

    safe('GridMotion/gallery', function () {
      whenFilled('.photo-wall .photo-card', function () {
        var wall = document.querySelector('.photo-wall');
        var api = window.LZYReact;
        if (!wall || !api || typeof api.mountDriftGallery !== 'function') return;
        var items = Array.from(wall.querySelectorAll('.photo-card')).map(function (card) {
          var image = card.querySelector('img');
          return {
            src: image.getAttribute('src'), alt: image.alt,
            imgId: card.dataset.imgId, caption: card.dataset.caption
          };
        });
        var mount = document.createElement('div');
        mount.className = 'cz-drift-mount';
        var originals = document.createElement('div');
        originals.hidden = true;
        originals.className = 'cz-drift-originals';
        while (wall.firstChild) originals.appendChild(wall.firstChild);
        wall.appendChild(originals);
        wall.appendChild(mount);
        wall.classList.add('cz-wall-drift');
        try { api.mountDriftGallery(mount, { items: items }); }
        catch (error) {
          mount.remove();
          while (originals.firstChild) wall.appendChild(originals.firstChild);
          originals.remove();
          wall.classList.remove('cz-wall-drift');
          throw error;
        }
      });
    });

    /* ---- #skills · 能力工作台：分类、指标与真实实践联动 ---- */
    safe('OptionWheel', function () {
      var wheel = document.querySelector('.cz-skill-wheel');
      var cards = document.querySelectorAll('.skill-grid .skill-card');
      if (!wheel || !cards.length) return;
      var panel = document.querySelector('.skill-grid');
      var row = wheel.closest('.cz-skill-wheel-row');
      if (!row) return;
      var practices = [
        { label: '编程', value: 'programming', scene: '把重复报表交给脚本',
          practice: 'Python 自动生成周报、月报与年报，配合 SQL 提取业务数据。',
          delivery: '可复用脚本 · 周期报表', flow: ['SQL 取数', 'Python 处理', '报表输出'],
          href: '#internship', link: '查看报表实习实践' },
        { label: '数据', value: 'data', scene: '从业务数据到可读结果',
          practice: '围绕 SQL 数据处理与周期报表，把数据整理和业务表达接在一起。',
          delivery: '数据整理 · 汇总报表', flow: ['业务数据', '整理汇总', '结果表达'],
          href: '#internship', link: '查看数据应用经历' },
        { label: 'AI', value: 'ai', scene: '让视觉识别连接实际动作',
          practice: '在机械臂项目中使用 OpenCV 与 YOLO，连接图像处理、目标识别和机械执行。',
          delivery: '视觉识别 · 机械臂联调', flow: ['图像输入', '目标识别', '机械执行'],
          href: '#projects', link: '查看机械臂项目' },
        { label: '硬件', value: 'hardware', scene: '从三维模型到实体原型',
          practice: '使用 SolidWorks、UG 建模，结合 3D 打印完成从结构设计到实物验证的实践。',
          delivery: '三维模型 · 打印原型', flow: ['SW / UG', '3D 打印', '实物验证'],
          href: '#projects', link: '查看硬件创作项目' },
        { label: '营销', value: 'marketing', scene: '把技术理解转成传播表达',
          practice: '参与 SEO / GEO 优化，并取得 Google Ads 认证，连接搜索与广告应用。',
          delivery: '搜索优化实践 · 认证凭证', flow: ['内容表达', 'SEO / GEO', '广告应用'],
          href: '#awards', link: '查看 Google Ads 认证' },
        { label: '办公', value: 'office', scene: '让测试与交付有迹可循',
          practice: '通过 TAPD 参与测试协作，用 Word / PPT 整理交付内容，以 GitHub 管理代码。',
          delivery: '测试记录 · 文档与代码', flow: ['TAPD 测试', '文档整理', 'GitHub 协作'],
          href: '#internship', link: '查看测试协作经历' }
      ];
      function node(tag, className, text) {
        var element = document.createElement(tag);
        element.className = className;
        if (text) element.textContent = text;
        return element;
      }
      panel.classList.add('cz-skill-selected-panel');
      row.appendChild(panel);
      var note = row.querySelector('.cz-skill-wheel-note');
      if (!note) note = node('div', 'cz-skill-wheel-note');
      note.replaceChildren(node('span', 'cz-skill-instruction', '滚动 / 拖拽 / 方向键切换能力'));
      var status = node('span', 'cz-skill-status');
      status.setAttribute('role', 'status');
      status.setAttribute('aria-live', 'polite');
      note.appendChild(status);
      row.insertBefore(note, wheel);
      cards.forEach(function (card, index) {
        var entry = practices[index];
        if (!entry) return;
        var context = node('div', 'cz-skill-context');
        context.appendChild(node('p', 'cz-skill-eyebrow', '应用场景 / 真实实践'));
        context.appendChild(node('h4', 'cz-skill-scene', entry.scene));
        context.appendChild(node('p', 'cz-skill-practice', entry.practice));
        var delivery = node('p', 'cz-skill-delivery');
        delivery.appendChild(node('span', 'cz-skill-eyebrow', '交付方式'));
        delivery.appendChild(node('span', 'cz-skill-output', entry.delivery));
        context.appendChild(delivery);
        var link = node('a', 'cz-skill-evidence', entry.link + ' ↗');
        link.setAttribute('href', entry.href);
        context.appendChild(link);
        card.appendChild(context);
        var workflow = node('div', 'cz-skill-workflow');
        workflow.appendChild(node('span', 'cz-skill-eyebrow', '实践路径'));
        var steps = node('ol', 'cz-skill-steps');
        entry.flow.forEach(function (step) { steps.appendChild(node('li', 'cz-skill-step', step)); });
        workflow.appendChild(steps);
        card.appendChild(workflow);
        card.querySelectorAll('.skill-pct[data-count]').forEach(function (pct) {
          pct.textContent = pct.dataset.count;
        });
      });
      C.OptionWheel.init(wheel, {
        items: practices.map(function (entry) { return { label: entry.label, value: entry.value }; }),
        activeIndex: 0, side: 'left',
        fontSize: 1.65, spacing: 1.85, inset: 28, curve: .35, tilt: 4,
        onChange: function (item, index) {
          cards.forEach(function (card, k) {
            card.classList.toggle('cz-highlight', k === index);
            card.hidden = k !== index;
            if (k === index) card.classList.add('is-visible', 'is-observed');
          });
          panel.setAttribute('aria-label', item.label + '技能与实践');
          status.textContent = '0' + (index + 1) + ' / 06 · ' + item.label;
        }
      });
    });

    safe('LightTunnel/contact', function () {
      var section = document.getElementById('contact');
      var api = window.LZYReact;
      if (!section || !api || typeof api.mountLightTunnel !== 'function' ||
          section.querySelector('.cz-contact-tunnel')) return;
      var mount = document.createElement('div');
      mount.className = 'cz-contact-tunnel';
      mount.setAttribute('aria-hidden', 'true');
      section.insertBefore(mount, section.firstChild);
      var tunnel = api.mountLightTunnel(mount, {
        cableColor: '#658b8d', pulseColor: '#78a9a5', tunnelColor: '#355b60',
        brightness: .48, opacity: .46, glow: .16, tunnelOpacity: .07,
        speed: .09, pulseSpeed: .55, pulseDensity: .22, cableCount: 44,
        thickness: .45, bend: .18, sway: .18, centerX: .26, centerY: -.04,
        mouseInteraction: false, clickSurge: false, intro: false,
        lightMode: document.documentElement.getAttribute('data-theme') === 'light'
      });
      new MutationObserver(function () {
        tunnel.setOptions({ lightMode: document.documentElement.getAttribute('data-theme') === 'light' });
      }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    });

    safe('ContactLaunch', function () {
      var mount = document.querySelector('#contact .cz-contact-launch');
      var api = window.LZYReact;
      if (mount && api && api.mountContactLaunch) api.mountContactLaunch(mount);
    });

    /* ---- 12. footer · PatternWaves（dot 点阵，低透明度氛围层） ----
       interactive:false + pointer-events:none 双保险，不挡页脚链接；
       backgroundColor transparent（组件按 alpha 判定跳过底色填充）。 */
    safe('PatternWaves', function () {
      var el = document.querySelector('.cz-footer-waves');
      if (el) C.PatternWaves.init(el, {
        pattern: 'dot', speed: .3,
        color: '#9e59ee', opacity: .5,
        backgroundColor: 'transparent',
        fade: 'center', fadeSize: .6,
        spacing: 10, interactive: false
      });
    });
  });
})();
