/* ============================================================
   Lanyard — 挂绳工牌（2.5D 零依赖替代版）
   原版 ReactBits Lanyard = three.js 绳索物理（L509-749 求解器）。
   本版按规格做 2.5D：SVG 绳 + 阻尼摆 + CSS 3D 双面卡片。
   · 阻尼摆：ω += (-g/L·sinθ - c·ω + wind)·dt
   · 风（原版 L664-665 同款双频）：
       breeze*(sin(t*0.53)*0.7 + sin(t*1.31+1.7)*0.3)
   · 拖拽：锚点/挂孔平滑跟随指针（τ≈0.03），松手把指针速度注入 ω
   · 翻面：rotateY 弹簧 stiffness 170 / damping 20
   · 卡片滞后：拖拽速度 → 附加 rotateZ = clamp(-v·k) + translate 滞后

   用法：
     const ly = LZY.Comp.Lanyard.init(el, {
       frontImage: '../../assets/liuzhiyuan.jpg',
       backContent: '<div>…HTML…</div>',   // 或 'sel:#tpl' 取模板节点
       width: 210, aspectRatio: 63/88, gravity: 1, breeze: 0.5,
       flipOn: 'click'
     });
     ly.destroy(); ly.setOptions(o);
   ============================================================ */
(function () {
  'use strict';

  var PI = Math.PI;
  var clamp = function (v, min, max) {
    if (v !== v) return min; /* NaN 防护 */
    return Math.min(Math.max(v, min), max);
  };
  var now = function () { return performance.now(); };

  /* —— 物理常量（由原版参数体系换算到像素摆） —— */
  var G_UNIT = 2350;        /* gravity=1 → px/s²（对 250px 绳长周期≈2s） */
  var WIND_GAIN = 3.2;      /* breeze=1 → 角加速度幅 rad/s² */
  var FLIP_K = 170;         /* 翻面弹簧刚度（规格指定 ≈170） */
  var FLIP_C = 20;          /* 翻面弹簧阻尼（规格指定 ≈20） */
  var FOLLOW_TAU = 0.03;    /* 拖拽跟随 τ≈0.03（规格指定） */
  var HOLE_Y = 14;          /* 挂孔中心距卡顶 px */
  var ANCHORS = { left: 0.27, center: 0.5, right: 0.73 };  /* 原版同款 */

  var DEFAULTS = {
    frontImage: '',
    frontContent: '',
    backContent: '',
    width: 210,             /* number(px) 或 '46%'（相对容器宽） */
    aspectRatio: 63 / 88,   /* 宽/高，portrait 工牌 */
    anchor: 'center',
    strapLength: 0.46,      /* 0..1 → 相对可用高度 */
    strapWidth: 12,         /* 闭合织带宽度 px */
    strapColor: '#20282a',
    cardColor: '#ffffff',
    gravity: 1,             /* 0..3 */
    damping: 0.5,           /* 0..1 */
    breeze: 0.5,            /* 0..1 */
    interactive: true,
    intro: true,
    flipOn: 'click',        /* 'click' | 'none' */
    clamp: 'champagne',     /* champagne | silver | graphite */
    ariaLabel: '工牌：点击翻面，可拖拽甩动'
  };

  createInstance.count = 0;
  function createInstance(el, userOptions) {
    var opts = {};
    for (var k in DEFAULTS) opts[k] = DEFAULTS[k];
    if (userOptions) for (var u in userOptions) if (userOptions[u] !== undefined) opts[u] = userOptions[u];

    var root = document.createElement('div');
    root.className = 'cz-lanyard';
    root.setAttribute('data-clamp', opts.clamp);
    root.setAttribute('role', 'img');
    root.setAttribute('aria-label', opts.ariaLabel);

    var NS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'cz-lanyard__rope');
    svg.setAttribute('aria-hidden', 'true');
    var textureId = 'cz-lz-weave-' + (++createInstance.count);
    var bodyGradientId = 'cz-lz-body-' + createInstance.count;
    var sheenGradientId = 'cz-lz-sheen-' + createInstance.count;
    svg.innerHTML =
      '<defs>' +
        '<linearGradient id="' + bodyGradientId + '" gradientUnits="userSpaceOnUse">' +
          '<stop offset="0" stop-color="#070a0b"/>' +
          '<stop offset=".16" stop-color="var(--lz-strap-color, #20282a)"/>' +
          '<stop offset=".46" stop-color="#52605d"/>' +
          '<stop offset=".62" stop-color="var(--lz-strap-color, #20282a)"/>' +
          '<stop offset="1" stop-color="#080b0c"/>' +
        '</linearGradient>' +
        '<linearGradient id="' + sheenGradientId + '" gradientUnits="userSpaceOnUse">' +
          '<stop offset="0" stop-color="#f2f0ea" stop-opacity="0"/>' +
          '<stop class="cz-lanyard__sheen-stop" offset=".5" stop-color="#f2f0ea" stop-opacity=".2"/>' +
          '<stop offset="1" stop-color="#f2f0ea" stop-opacity="0"/>' +
        '</linearGradient>' +
        '<pattern id="' + textureId + '" width="4" height="4" patternUnits="userSpaceOnUse">' +
          '<path d="M 0 .5 H 4 M 0 2.5 H 4" fill="none" stroke="#f2f0ea" stroke-opacity=".13" stroke-width=".45"/>' +
          '<path d="M .5 0 V 4 M 2.5 0 V 4" fill="none" stroke="#050708" stroke-opacity=".38" stroke-width=".55"/>' +
          '<path d="M 0 1.5 H 4 M 1.5 0 V 4" fill="none" stroke="#c8b285" stroke-opacity=".07" stroke-width=".3"/>' +
        '</pattern>' +
      '</defs>' +
      '<path class="cz-lanyard__rope-shade"/>' +
      '<path class="cz-lanyard__rope-line"/>' +
      '<path class="cz-lanyard__rope-weave"/>' +
      '<path class="cz-lanyard__rope-edge cz-lanyard__rope-edge--left"/>' +
      '<path class="cz-lanyard__rope-edge cz-lanyard__rope-edge--right"/>' +
      '<path class="cz-lanyard__rope-stitch cz-lanyard__rope-stitch--left"/>' +
      '<path class="cz-lanyard__rope-stitch cz-lanyard__rope-stitch--right"/>' +
      '<path class="cz-lanyard__rope-hi"/>';
    var ropeShade = svg.querySelector('.cz-lanyard__rope-shade');
    var ropeMain = svg.querySelector('.cz-lanyard__rope-line');
    var ropeWeave = svg.querySelector('.cz-lanyard__rope-weave');
    var ropeEdges = svg.querySelectorAll('.cz-lanyard__rope-edge');
    var ropeStitches = svg.querySelectorAll('.cz-lanyard__rope-stitch');
    var ropeHi = svg.querySelector('.cz-lanyard__rope-hi');
    var bodyGradient = svg.querySelector('#' + bodyGradientId);
    var sheenGradient = svg.querySelector('#' + sheenGradientId);
    var sheenStop = svg.querySelector('.cz-lanyard__sheen-stop');
    var weavePattern = svg.querySelector('#' + textureId);
    ropeMain.setAttribute('fill', 'url(#' + bodyGradientId + ')');
    ropeWeave.setAttribute('fill', 'url(#' + textureId + ')');
    ropeHi.setAttribute('stroke', 'url(#' + sheenGradientId + ')');
    root.appendChild(svg);

    var clampEl = document.createElement('div');
    clampEl.className = 'cz-lanyard__clamp';
    clampEl.innerHTML =
      '<span class="cz-lanyard__clamp-bar"></span><span class="cz-lanyard__clamp-eye"></span>';
    root.appendChild(clampEl);

    var card = document.createElement('div');
    card.className = 'cz-lanyard__card';
    var swing = document.createElement('div');
    swing.className = 'cz-lanyard__swing';
    var flip = document.createElement('div');
    flip.className = 'cz-lanyard__flip';
    var faceF = document.createElement('div');
    faceF.className = 'cz-lanyard__face cz-lanyard__face--front';
    faceF.innerHTML =
      '<img class="cz-lanyard__img" alt="" draggable="false">' +
      '<div class="cz-lanyard__front-body"></div>' +
      '<span class="cz-lanyard__slot"></span><span class="cz-lanyard__ring"></span>';
    var faceB = document.createElement('div');
    faceB.className = 'cz-lanyard__face cz-lanyard__face--back';
    faceB.innerHTML =
      '<div class="cz-lanyard__back-body"></div>' +
      '<span class="cz-lanyard__slot"></span><span class="cz-lanyard__ring"></span>';
    flip.appendChild(faceF);
    flip.appendChild(faceB);
    swing.appendChild(flip);
    card.appendChild(swing);
    root.appendChild(card);
    el.appendChild(root);

    var imgEl = faceF.querySelector('img');
    var frontBody = faceF.querySelector('.cz-lanyard__front-body');
    var backBody = faceB.querySelector('.cz-lanyard__back-body');

    /* —— 布局测量 —— */
    var W = 1, H = 1, cardW = 210, cardH = 293, L = 200;
    var anchorHome = { x: 0, y: 26 };
    var anchor = { x: 0, y: 0 };
    var anchorVel = { x: 0, y: 0 };

    /* —— 物理状态 —— */
    var theta = 0, omega = 0;
    var Ldisp = 200, LdispV = 0;          /* 绳显示长度（拖拽可拉伸，松手弹回 L） */
    var flipA = 0, flipV = 0, flipTarget = 0;
    var lagRz = 0, lagTx = 0, tiltX = 0, tiltY = 0;
    var grabbed = false, grabMode = 'card';
    var grabOffset = { x: 0, y: 0 };
    var grabHoleOffL = { x: 0, y: 0 };    /* 抓取点相对挂孔的局部偏移 */
    var pointer = { x: 0, y: 0 };
    var ptrVel = { x: 0, y: 0 };
    var lastPtr = null;
    var down = null;             /* {x,y,t,moved} 判定点击 vs 拖拽 */
    var raf = 0, last = 0, time = 0;
    var alive = true, visible = true;
    var reducedMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    function measure() {
      W = Math.max(1, el.clientWidth);
      H = Math.max(1, el.clientHeight);
      var wOpt = opts.width;
      if (typeof wOpt === 'string' && wOpt.indexOf('%') > 0) {
        cardW = W * parseFloat(wOpt) / 100;
      } else {
        cardW = parseFloat(wOpt) || 210;
      }
      cardW = clamp(cardW, 60, W * 0.92);
      cardH = cardW / (opts.aspectRatio > 0 ? opts.aspectRatio : 63 / 88);
      if (cardH > H * 0.86) { cardH = H * 0.86; cardW = cardH * (opts.aspectRatio > 0 ? opts.aspectRatio : 63 / 88); }
      var avail = H - cardH - HOLE_Y - 30;
      L = clamp(opts.strapLength, 0, 1) * Math.max(avail, 40) + 30;
      anchorHome.x = W * (ANCHORS[opts.anchor] != null ? ANCHORS[opts.anchor] : 0.5);
      anchorHome.y = 26;
      root.style.setProperty('--lz-card-w', cardW + 'px');
      root.style.setProperty('--lz-card-h', cardH + 'px');
      root.style.setProperty('--lz-card-radius', Math.round(13 + Math.min(cardW, cardH) * 0.02) + 'px');
      root.style.setProperty('--lz-strap-width', (opts.strapWidth || 9) + 'px');
      root.style.setProperty('--lz-strap-color', opts.strapColor);
      root.style.setProperty('--lz-card-color', opts.cardColor);
      svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    }

    /* —— 内容注入 —— */
    function resolveContent(v) {
      if (!v) return '';
      if (typeof v === 'string' && (v.charAt(0) === '#' || v.slice(0, 1) === '.')) {
        var tpl = null;
        try { tpl = document.querySelector(v); } catch (e) { /* 非 CSS 选择器 */ }
        if (tpl && tpl !== el) return tpl.innerHTML;
      }
      return v;
    }
    function paintContent() {
      var front = resolveContent(opts.frontContent);
      frontBody.innerHTML = front;
      frontBody.style.display = front ? '' : 'none';
      imgEl.style.display = opts.frontImage ? '' : 'none';
      if (opts.frontImage) imgEl.src = opts.frontImage;
      backBody.innerHTML = resolveContent(opts.backContent);
    }

    /* —— 入场 —— */
    function placeHanging(introSwing) {
      anchor.x = anchorHome.x; anchor.y = anchorHome.y;
      anchorVel.x = 0; anchorVel.y = 0;
      if (introSwing) { theta = 0.95; omega = -1.6; }
      else { theta = 0.04; omega = 0; }
      Ldisp = L; LdispV = 0;
      lagRz = 0; lagTx = 0; tiltX = 0; tiltY = 0;
    }

    /* —— 物理步进 —— */
    function step(dt) {
      time += dt;
      var breezeV = clamp(opts.breeze, 0, 1);
      /* 原版 L664-665 双频风 */
      var wind = breezeV * (Math.sin(time * 0.53) * 0.7 + Math.sin(time * 1.31 + 1.7) * 0.3);
      var gEff = G_UNIT * clamp(opts.gravity, 0, 3);
      var c = 0.7 + 3.3 * clamp(opts.damping, 0, 1);
      var follow = 1 - Math.exp(-dt / FOLLOW_TAU);

      if (grabbed) {
        if (grabMode === 'card') {
          /* 拖卡片：挂孔（带抓取偏移）平滑跟随指针；θ=几何角，ω=平滑差分（松手自带惯性） */
          var cosT = Math.cos(theta), sinT = Math.sin(theta);
          var offX = grabHoleOffL.x * cosT - grabHoleOffL.y * sinT;
          var offY = grabHoleOffL.x * sinT + grabHoleOffL.y * cosT;
          var tX = pointer.x + offX, tY = pointer.y + offY;
          var cur = holeFromTheta();
          var fX = cur.x + (tX - cur.x) * follow;
          var fY = cur.y + (tY - cur.y) * follow;
          var nt = Math.atan2(fX - anchor.x, Math.max(fY - anchor.y, 1e-3));
          var dth = nt - theta;
          while (dth > PI) dth -= 2 * PI;
          while (dth < -PI) dth += 2 * PI;
          omega = dth / dt * 0.35 + omega * 0.65;
          theta += dth * 0.9;
          hangOverride = { x: fX, y: fY };
          Ldisp = Math.max(Math.hypot(fX - anchor.x, fY - anchor.y), 30);
          LdispV = 0;
        } else {
          /* anchor 模式：锚点平滑跟随指针（τ≈0.03），摆方程 + 加速度激励 */
          var tx = clamp(pointer.x - grabOffset.x, 24, W - 24);
          var ty = clamp(pointer.y - grabOffset.y, -18, H * 0.62);
          var anX = anchor.x + (tx - anchor.x) * follow;
          var anY = anchor.y + (ty - anchor.y) * follow;
          var vAx = (anX - anchor.x) / dt, vAy = (anY - anchor.y) / dt;
          var aAx = (vAx - anchorVel.x) / dt;
          aAx = clamp(aAx, -60000, 60000);
          anchor.x = anX; anchor.y = anY;
          anchorVel.x = vAx; anchorVel.y = vAy;
          omega += (-aAx * Math.cos(theta)) / L * dt;
          omega += (-gEff / L * Math.sin(theta) - c * omega) * dt;
          theta += omega * dt;
          hangOverride = null;
        }
      } else {
        hangOverride = null;
        /* 锚点弹簧回 home */
        var kSpring = 90, kDamp = 13;
        anchorVel.x += ((anchorHome.x - anchor.x) * kSpring - anchorVel.x * kDamp) * dt;
        anchorVel.y += ((anchorHome.y - anchor.y) * kSpring - anchorVel.y * kDamp) * dt;
        anchor.x += anchorVel.x * dt;
        anchor.y += anchorVel.y * dt;
        /* 被拉伸的绳弹回原长（原版 elasticity 手感） */
        LdispV += ((L - Ldisp) * 140 - LdispV * 16) * dt;
        Ldisp += LdispV * dt;
        /* 阻尼摆 + 双频风（规格公式） */
        omega += (-gEff / L * Math.sin(theta) - c * omega + wind * WIND_GAIN) * dt;
        theta += omega * dt;
      }

      /* 卡片滞后：拖拽速度 → 附加 rotateZ/translate/tilt（松手弹簧归零） */
      var dvx = grabbed ? ptrVel.x : anchorVel.x;
      var dvy = grabbed ? ptrVel.y : anchorVel.y;
      var tgtRz = grabbed ? clamp(-dvx * 0.02, -14, 14) : 0;
      var tgtTx = grabbed ? clamp(-dvx * 0.06, -26, 26) : 0;
      var tgtRy = grabbed ? clamp(-dvx * 0.012, -10, 10) : 0;
      var tgtRx = grabbed ? clamp(dvy * 0.010, -8, 8) : 0;
      var kl = 1 - Math.exp(-dt / 0.09);
      lagRz += (tgtRz - lagRz) * kl;
      lagTx += (tgtTx - lagTx) * kl;
      tiltY += (tgtRy - tiltY) * kl;
      tiltX += (tgtRx - tiltX) * kl;

      /* 翻面弹簧（stiffness 170 / damping 20） */
      flipV += (FLIP_K * (flipTarget - flipA) - FLIP_C * flipV) * dt;
      flipA += flipV * dt;
    }

    var hangOverride = null;
    function holeFromTheta() {
      return { x: anchor.x + Ldisp * Math.sin(theta), y: anchor.y + Ldisp * Math.cos(theta) };
    }

    /* —— 渲染：闭合织带横截面 + 经纬覆盖 + 双侧缝线 —— */
    var ribbonSamples = [];
    for (var rs = 0; rs < 32; rs++) {
      ribbonSamples.push({ left: [0, 0], right: [0, 0], stitchL: [0, 0], stitchR: [0, 0] });
    }
    function ribbonPath(samples, key, reverse, close) {
      var d = '';
      for (var i = 0; i < samples.length; i++) {
        var p = samples[reverse ? samples.length - 1 - i : i][key];
        d += (i ? ' L ' : 'M ') + p[0].toFixed(2) + ' ' + p[1].toFixed(2);
      }
      return d + (close ? ' Z' : '');
    }
    function render() {
      var hole = hangOverride || holeFromTheta();
      card.style.transform =
        'translate3d(' + (hole.x - cardW / 2 + lagTx) + 'px, ' + (hole.y - HOLE_Y) + 'px, 0)';
      swing.style.transform =
        'perspective(900px) rotateZ(' + (theta * 180 / PI + lagRz) + 'deg) rotateX(' + tiltX + 'deg) rotateY(' + tiltY + 'deg)';
      flip.style.transform = 'rotateY(' + flipA + 'deg)';
      clampEl.style.transform =
        'translate(' + anchor.x.toFixed(1) + 'px, ' + anchor.y.toFixed(1) + 'px)';
      root.style.setProperty('--lz-sheen-shift', clamp(-omega * 8 - tiltY * 1.5, -26, 26).toFixed(2) + '%');
      var mx = (anchor.x + hole.x) / 2, my = (anchor.y + hole.y) / 2;
      var bend = clamp(-omega * 30, -32, 32) + lagTx * 0.25;
      var cx = mx + Math.cos(theta) * bend;
      var cy = my - Math.sin(theta) * bend;
      var width = opts.strapWidth || 12;
      for (var i = 0; i < ribbonSamples.length; i++) {
        var t = i / (ribbonSamples.length - 1), q = 1 - t;
        var x = q * q * anchor.x + 2 * q * t * cx + t * t * hole.x;
        var y = q * q * anchor.y + 2 * q * t * cy + t * t * hole.y;
        var dx = 2 * q * (cx - anchor.x) + 2 * t * (hole.x - cx);
        var dy = 2 * q * (cy - anchor.y) + 2 * t * (hole.y - cy);
        var length = Math.max(0.001, Math.hypot(dx, dy));
        var nx = -dy / length, ny = dx / length;
        var half = width * (0.47 + 0.035 * Math.cos(theta + t * PI));
        var sample = ribbonSamples[i];
        sample.left[0] = x + nx * half; sample.left[1] = y + ny * half;
        sample.right[0] = x - nx * half; sample.right[1] = y - ny * half;
        sample.stitchL[0] = x + nx * half * 0.68; sample.stitchL[1] = y + ny * half * 0.68;
        sample.stitchR[0] = x - nx * half * 0.68; sample.stitchR[1] = y - ny * half * 0.68;
      }
      var closed = ribbonPath(ribbonSamples, 'left', false, false) +
        ribbonPath(ribbonSamples, 'right', true, true).replace(/^M/, 'L');
      ropeShade.setAttribute('d', closed);
      ropeMain.setAttribute('d', closed);
      ropeWeave.setAttribute('d', closed);
      ropeEdges[0].setAttribute('d', ribbonPath(ribbonSamples, 'left', false, false));
      ropeEdges[1].setAttribute('d', ribbonPath(ribbonSamples, 'right', false, false));
      ropeStitches[0].setAttribute('d', ribbonPath(ribbonSamples, 'stitchL', false, false));
      ropeStitches[1].setAttribute('d', ribbonPath(ribbonSamples, 'stitchR', false, false));
      var d = 'M ' + anchor.x.toFixed(1) + ' ' + anchor.y.toFixed(1) +
        ' Q ' + cx.toFixed(1) + ' ' + cy.toFixed(1) + ' ' + hole.x.toFixed(1) + ' ' + hole.y.toFixed(1);
      ropeHi.setAttribute('d', d);
      var middle = ribbonSamples[16];
      [bodyGradient, sheenGradient].forEach(function (gradient) {
        gradient.setAttribute('x1', middle.left[0]); gradient.setAttribute('y1', middle.left[1]);
        gradient.setAttribute('x2', middle.right[0]); gradient.setAttribute('y2', middle.right[1]);
      });
      sheenStop.setAttribute('stop-opacity', clamp(0.16 + Math.abs(omega) * 0.055 + Math.abs(tiltY) * 0.012, 0.16, 0.48));
      weavePattern.setAttribute('patternTransform', 'rotate(' + (-theta * 18).toFixed(2) + ' ' + mx.toFixed(1) + ' ' + my.toFixed(1) + ')');
    }

    /* —— 主循环 —— */
    function tick(t) {
      raf = 0;
      if (!alive) return;
      var dt = Math.min(1 / 30, Math.max(1 / 240, (t - last) / 1000));
      last = t;
      step(dt);
      render();
      var still = !grabbed &&
        Math.abs(omega) < 0.004 && Math.abs(theta) < 0.005 &&
        Math.abs(flipV) < 0.02 && Math.abs(flipA - flipTarget) < 0.05 &&
        Math.abs(anchor.x - anchorHome.x) < 0.6 && Math.abs(anchor.y - anchorHome.y) < 0.6 &&
        Math.abs(anchorVel.x) < 1 && Math.abs(anchorVel.y) < 1 &&
        clamp(opts.breeze, 0, 1) < 0.02;
      if (still) return; /* 静止睡眠：等事件唤醒 */
      if (visible) raf = requestAnimationFrame(tick);
    }
    function wake() {
      if (!alive || !visible) return;
      if (reducedMotion) { render(); return; }  /* 静态 poster：仅重绘一帧 */
      if (raf) { return; }
      last = now();
      raf = requestAnimationFrame(tick);
    }

    /* —— 指针交互 —— */
    function relPointer(e) {
      var r = root.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    }
    function onPointerDown(e) {
      if (!alive || !opts.interactive || e.button > 0) return;
      var p = relPointer(e);
      pointer.x = p.x; pointer.y = p.y;
      var target = e.target;
      var onCard = !!(target && target.closest && target.closest('.cz-lanyard__card'));
      var onClamp = !!(target && target.closest && target.closest('.cz-lanyard__clamp'));
      if (!onCard && !onClamp) return;
      grabMode = onCard ? 'card' : 'anchor';
      grabbed = true;
      grabOffset.x = p.x - anchor.x;
      grabOffset.y = p.y - anchor.y;
      var holeNow = holeFromTheta();
      var offW = { x: holeNow.x - p.x, y: holeNow.y - p.y };
      var cosT = Math.cos(-theta), sinT = Math.sin(-theta);
      grabHoleOffL.x = offW.x * cosT - offW.y * sinT;
      grabHoleOffL.y = offW.x * sinT + offW.y * cosT;
      Ldisp = Math.max(Math.hypot(holeNow.x - anchor.x, holeNow.y - anchor.y), 30);
      down = { x: e.clientX, y: e.clientY, t: now(), moved: false };
      ptrVel.x = 0; ptrVel.y = 0;
      lastPtr = { x: e.clientX, y: e.clientY, t: now() };
      root.classList.add('is-grabbing');
      try { el.setPointerCapture(e.pointerId); } catch (err) { /* noop */ }
      wake();
    }
    function onPointerMove(e) {
      if (!alive || !opts.interactive) return;
      var p = relPointer(e);
      pointer.x = p.x; pointer.y = p.y;
      if (down && Math.hypot(e.clientX - down.x, e.clientY - down.y) > 6) down.moved = true;
      if (lastPtr) {
        var dtm = (now() - lastPtr.t) / 1000;
        if (dtm > 0.004) {
          var ivx = (e.clientX - lastPtr.x) / dtm;
          var ivy = (e.clientY - lastPtr.y) / dtm;
          ptrVel.x = ptrVel.x * 0.4 + ivx * 0.6;
          ptrVel.y = ptrVel.y * 0.4 + ivy * 0.6;
          lastPtr = { x: e.clientX, y: e.clientY, t: now() };
        }
      }
      if (grabbed) wake();
    }
    function onPointerUp(e) {
      if (!grabbed) return;
      grabbed = false;
      root.classList.remove('is-grabbing');
      var wasClick = down && !down.moved && (now() - down.t) < 450;
      down = null;
      if (wasClick) {
        if (opts.flipOn === 'click') doFlip();
      } else {
        /* 松手：指针速度注入 ω（惯性甩动） */
        omega += clamp(ptrVel.x / Math.max(L, 60), -6, 6) * 0.9;
      }
      lastPtr = null;
      wake();
    }

    function doFlip() {
      flipTarget = flipTarget === 0 ? 180 : 0;
      /* 原版 FLIP_SPIN=9 的味道：翻面给摆一个小扰动 */
      omega += (flipTarget > 0 ? 0.35 : -0.35);
      if (reducedMotion) { flipA = flipTarget; flipV = 0; }
      wake();
    }
    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerup', onPointerUp);
    el.addEventListener('pointercancel', onPointerUp);

    /* —— 三件套：Resize + IO + visibility —— */
    var resizeObserver = new ResizeObserver(function () {
      if (!alive) return;
      measure();
      if (!raf) render();
    });
    resizeObserver.observe(el);
    var intersectionObserver = new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible) wake();
    }, { threshold: 0.02 });
    intersectionObserver.observe(root);
    var onVis = function () { if (!document.hidden) wake(); };
    document.addEventListener('visibilitychange', onVis);

    /* —— 启动 —— */
    measure();
    paintContent();
    placeHanging(opts.intro && !reducedMotion);
    render();
    if (reducedMotion) {
      theta = 0; omega = 0; flipA = flipTarget = 0;  /* 静态 poster */
      render();
    } else {
      wake();
    }

    return {
      el: el,
      root: root,
      destroy: function () {
        if (!alive) return;
        alive = false;
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
        resizeObserver.disconnect();
        intersectionObserver.disconnect();
        document.removeEventListener('visibilitychange', onVis);
        el.removeEventListener('pointerdown', onPointerDown);
        el.removeEventListener('pointermove', onPointerMove);
        el.removeEventListener('pointerup', onPointerUp);
        el.removeEventListener('pointercancel', onPointerUp);
        if (root.parentNode) root.parentNode.removeChild(root);
      },
      setOptions: function (o) {
        if (!o) return;
        var repaint = false, remeasure = false;
        for (var kk in o) {
          if (o[kk] === undefined) continue;
          if (kk === 'frontImage' || kk === 'frontContent' || kk === 'backContent') repaint = true;
          if (kk === 'width' || kk === 'aspectRatio' || kk === 'anchor' || kk === 'strapLength' ||
              kk === 'strapWidth' || kk === 'strapColor' || kk === 'cardColor' || kk === 'clamp') remeasure = true;
          opts[kk] = o[kk];
        }
        root.setAttribute('data-clamp', opts.clamp);
        root.setAttribute('aria-label', opts.ariaLabel);
        if (repaint) paintContent();
        if (remeasure) { measure(); if (!raf) render(); }
      },
      flip: function () { doFlip(); }
    };
  }

  window.LZY = window.LZY || {};
  window.LZY.Comp = window.LZY.Comp || {};
  window.LZY.Comp.Lanyard = {
    init: function (el, options) { return createInstance(el, options); }
  };
})();
