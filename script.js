/* ========================================================================
   LZY Engineer Station · 0303 — 交互层
   - 启动页 → 主站
   - canvas 粒子背景
   - 滚动揭示
   - 实习 Tab 切换
   - 信号收集 / 主题切换 / 移动端菜单 / 滚动监听
   ======================================================================== */
(function(){
  'use strict';

  const $ = (s,root=document)=>root.querySelector(s);
  const $$ = (s,root=document)=>Array.from(root.querySelectorAll(s));
  const onReady = (fn)=>{
    if(document.readyState!=='loading') fn();
    else document.addEventListener('DOMContentLoaded',fn);
  };

  /* ---------- 启动页 ---------- */
  const introGate = $('.intro-gate');
  const header = $('.site-header');
  const miniGuide = $('.mini-guide');
  const signalDock = $('.signal-dock');

  function leaveIntro(){
    if(!introGate) return;
    introGate.classList.add('is-leaving');
    $('.intro-photo-sticker')?.classList.add('is-leaving');
    $('.character-halo')?.classList.add('is-leaving');
    setTimeout(()=>{
      introGate.style.display='none';
      header?.classList.add('is-visible');
      miniGuide?.classList.add('is-visible');
      signalDock?.classList.add('is-visible');
      // 只让 hero 区块的 reveal 元素立即可见（启动页 → 主站的衔接）
      // 其他区块（about/internship/...）保留 IntersectionObserver 滚动揭示
      $$('.hero .reveal').forEach(el=>el.classList.add('is-visible'));
    },850);
  }
  $('.character-button')?.addEventListener('click',leaveIntro);
  $('.intro-skip')?.addEventListener('click',leaveIntro);

  /* ---------- Canvas 粒子背景 ---------- */
  function initCanvas(){
    const canvas = $('#cosmos-canvas');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    if(!ctx) return;

    let dpr = Math.min(window.devicePixelRatio||1,2);
    let w,h,particles;

    function resize(){
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w*dpr;
      canvas.height = h*dpr;
      canvas.style.width = w+'px';
      canvas.style.height = h+'px';
      ctx.scale(dpr,dpr);
    }

    function build(){
      const count = Math.min(90,Math.floor((w*h)/18000));
      particles = Array.from({length:count},()=>({
        x:Math.random()*w,
        y:Math.random()*h,
        vx:(Math.random()-.5)*.25,
        vy:(Math.random()-.5)*.25,
        r:Math.random()*1.4+.5,
        hue:Math.random()<.6?270:Math.random()<.5?195:25
      }));
    }

    function tick(){
      ctx.clearRect(0,0,w,h);
      // 粒子
      for(const p of particles){
        p.x+=p.vx;p.y+=p.vy;
        if(p.x<0)p.x=w;if(p.x>w)p.x=0;
        if(p.y<0)p.y=h;if(p.y>h)p.y=0;
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=`hsla(${p.hue},80%,70%,75%)`;
        ctx.fill();
      }
      // 连线（近距离）
      for(let i=0;i<particles.length;i++){
        for(let j=i+1;j<particles.length;j++){
          const a=particles[i],b=particles[j];
          const dx=a.x-b.x,dy=a.y-b.y;
          const d=Math.sqrt(dx*dx+dy*dy);
          if(d<120){
            ctx.beginPath();
            ctx.moveTo(a.x,a.y);
            ctx.lineTo(b.x,b.y);
            ctx.strokeStyle=`hsla(${(a.hue+b.hue)/2},70%,65%,${.15*(1-d/120)})`;
            ctx.lineWidth=.5;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(tick);
    }

    let resizeTimer;
    function onResize(){
      clearTimeout(resizeTimer);
      resizeTimer=setTimeout(()=>{
        dpr=Math.min(window.devicePixelRatio||1,2);
        resize();build();
      },200);
    }

    resize();build();tick();
    window.addEventListener('resize',onResize);
  }

  /* ---------- 滚动揭示 ---------- */
  let revealObserver;
  function initReveal(){
    revealObserver = new IntersectionObserver((entries)=>{
      entries.forEach(en=>{
        if(en.isIntersecting){
          en.target.classList.add('is-visible');
          revealObserver.unobserve(en.target);
        }
      });
    },{threshold:.12,rootMargin:'0px 0px -60px 0px'});
    $$('.reveal').forEach(el=>revealObserver.observe(el));
  }

  /* ---------- 实习 Tab 切换 ---------- */
  function initInternshipTabs(){
    const tabs = $$('.internship-tab');
    const panels = $$('.internship-panel');
    const progress = $('.route-progress');
    if(!tabs.length) return;

    function activate(idx){
      tabs.forEach((t,i)=>{
        const active=i===idx;
        t.classList.toggle('active',active);
        t.setAttribute('aria-selected',active?'true':'false');
      });
      panels.forEach((p,i)=>{
        const active=i===idx;
        p.classList.toggle('active',active);
        if(active){p.removeAttribute('hidden');}
        else{p.setAttribute('hidden','');}
      });
      // 进度条
      const pct = ((idx)/Math.max(1,tabs.length-1))*100;
      if(progress) progress.style.width = pct+'%';

      // 触发对应 signal
      const sig = tabs[idx].dataset.signal;
      if(sig) unlockSignal(sig);
    }

    tabs.forEach((tab,i)=>{
      tab.addEventListener('click',()=>activate(i));
    });

    // 键盘左右切换
    const route = $('.internship-route');
    route?.addEventListener('keydown',(e)=>{
      const cur = tabs.findIndex(t=>t.classList.contains('active'));
      if(cur<0) return;
      if(e.key==='ArrowRight') activate((cur+1)%tabs.length);
      if(e.key==='ArrowLeft') activate((cur-1+tabs.length)%tabs.length);
    });
  }

  /* ---------- 信号收集 ---------- */
  const litSignals = new Set();
  function unlockSignal(name){
    if(!name||litSignals.has(name)) return;
    litSignals.add(name);
    // 点亮对应节点
    const node = $(`.signal-nodes i[data-signal-node="${name}"]`);
    if(node) node.classList.add('is-lit');
    // 更新计数
    const total = $$('.signal-nodes i').length;
    const count = $$('.signal-nodes i.is-lit').length;
    const counter = $('#signal-count');
    if(counter) counter.textContent = `${count}/${total}`;
    // 弹 toast
    showUnlockToast();
  }

  function showUnlockToast(){
    const toast = $('.unlock-toast');
    if(!toast) return;
    toast.classList.add('is-shown');
    clearTimeout(showUnlockToast._t);
    showUnlockToast._t = setTimeout(()=>toast.classList.remove('is-shown'),2400);
  }

  function initSignalAutoUnlock(){
    // 滚动到含 data-signal 的元素时自动解锁
    const targets = $$('[data-signal]');
    if(!targets.length||!('IntersectionObserver' in window)) return;
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(en=>{
        if(en.isIntersecting){
          const sig = en.target.dataset.signal;
          if(sig) unlockSignal(sig);
          obs.unobserve(en.target);
        }
      });
    },{threshold:.3});
    targets.forEach(t=>obs.observe(t));
  }

  /* ---------- Quick Stats 数字滚动 ---------- */
  function initCountUp(){
    const stats = $$('.quick-stats strong[data-count]');
    if(!stats.length) return;
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(en=>{
        if(!en.isIntersecting) return;
        const el = en.target;
        const target = parseFloat(el.dataset.count);
        const decimals = parseInt(el.dataset.decimals||'0',10);
        const suffix = el.dataset.suffix||'';
        const dur = 1400;
        const start = performance.now();
        function step(now){
          const t = Math.min(1,(now-start)/dur);
          const eased = 1-Math.pow(1-t,3);
          const v = target*eased;
          el.innerHTML = v.toFixed(decimals)+(suffix?suffix:'')+ (el.querySelector('small')?.outerHTML || '');
          if(t<1) requestAnimationFrame(step);
          else el.innerHTML = target.toFixed(decimals)+(suffix?suffix:'')+ (el.querySelector('small')?.outerHTML || '');
        }
        requestAnimationFrame(step);
        obs.unobserve(el);
      });
    },{threshold:.5});
    stats.forEach(s=>obs.observe(s));
  }

  /* ---------- 主题切换 ---------- */
  function initTheme(){
    const btn = $('.theme-button');
    if(!btn) return;
    const saved = localStorage.getItem('lzy-theme');
    if(saved==='light') document.documentElement.setAttribute('data-theme','light');

    btn.addEventListener('click',()=>{
      const cur = document.documentElement.getAttribute('data-theme');
      const next = cur==='light'?'dark':'light';
      if(next==='light') document.documentElement.setAttribute('data-theme','light');
      else document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('lzy-theme',next);
    });
  }

  /* ---------- 迷你导航 ---------- */
  function initMiniGuide(){
    const btn = $('.mini-character');
    const menu = $('#mini-menu');
    if(!btn||!menu) return;
    btn.addEventListener('click',(e)=>{
      e.stopPropagation();
      const open = menu.classList.toggle('is-open');
      btn.setAttribute('aria-expanded',open?'true':'false');
    });
    document.addEventListener('click',(e)=>{
      if(!menu.contains(e.target)&&!btn.contains(e.target)){
        menu.classList.remove('is-open');
        btn.setAttribute('aria-expanded','false');
      }
    });
    menu.querySelectorAll('a').forEach(a=>{
      a.addEventListener('click',()=>{
        menu.classList.remove('is-open');
        btn.setAttribute('aria-expanded','false');
      });
    });
  }

  /* ---------- 移动端菜单 ---------- */
  function initMobileMenu(){
    const btn = $('.menu-button');
    const nav = $('#site-nav');
    if(!btn||!nav) return;
    btn.addEventListener('click',()=>{
      const open = nav.classList.toggle('is-open');
      btn.setAttribute('aria-expanded',open?'true':'false');
    });
    nav.querySelectorAll('a').forEach(a=>{
      a.addEventListener('click',()=>{
        nav.classList.remove('is-open');
        btn.setAttribute('aria-expanded','false');
      });
    });
  }

  /* ---------- 滚动监听：导航高亮 + header 阴影 ---------- */
  function initScrollSpy(){
    const sections = $$('main section[id]');
    const navLinks = $$('.site-nav a[href^="#"]');
    if(!sections.length) return;

    function update(){
      const y = window.scrollY + 120;
      let currentId = '';
      sections.forEach(sec=>{
        const top = sec.offsetTop;
        const bottom = top + sec.offsetHeight;
        if(y>=top && y<bottom) currentId = sec.id;
      });
      navLinks.forEach(a=>{
        const href = a.getAttribute('href');
        a.classList.toggle('is-current', href==='#'+currentId);
      });
      // header 阴影
      if(header){
        header.style.boxShadow = window.scrollY>10?'0 8px 24px rgba(0,0,0,.3)':'none';
      }
    }
    let ticking = false;
    window.addEventListener('scroll',()=>{
      if(!ticking){requestAnimationFrame(()=>{update();ticking=false;});ticking=true;}
    },{passive:true});
    update();
  }

  /* ---------- 奖项详情弹层 ---------- */
  function initAwards(){
    const cards = $$('.award-evidence');
    if(!cards.length) return;

    // 动态创建 modal
    const modal = document.createElement('div');
    modal.className = 'award-modal';
    modal.setAttribute('role','dialog');
    modal.setAttribute('aria-modal','true');
    modal.setAttribute('aria-hidden','true');
    modal.innerHTML = `
      <div class="award-modal-backdrop" data-award-close></div>
      <div class="award-modal-card">
        <button class="award-modal-close" type="button" aria-label="关闭" data-award-close>✕</button>
        <div class="award-modal-head">
          <span class="award-modal-year" id="awardYear"></span>
          <span class="award-modal-tag" id="awardTag"></span>
        </div>
        <h3 id="awardTitle" class="award-modal-title"></h3>
        <p id="awardResult" class="award-modal-result"></p>
        <div class="award-modal-story" id="awardStory"></div>
      </div>
    `;
    document.body.appendChild(modal);

    const yearEl = modal.querySelector('#awardYear');
    const tagEl = modal.querySelector('#awardTag');
    const titleEl = modal.querySelector('#awardTitle');
    const resultEl = modal.querySelector('#awardResult');
    const storyEl = modal.querySelector('#awardStory');

    function open(card){
      yearEl.textContent = card.dataset.year || '';
      tagEl.textContent = card.dataset.tag || 'AWARD';
      titleEl.textContent = card.dataset.title || '';
      resultEl.textContent = card.dataset.result || '';
      storyEl.textContent = card.dataset.story || '暂无更多细节。';
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden','false');
      document.body.style.overflow = 'hidden';
    }
    function close(){
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden','true');
      document.body.style.overflow = '';
    }

    cards.forEach(card=>{
      card.addEventListener('click',(e)=>{
        e.preventDefault();
        open(card);
      });
      card.addEventListener('keydown',(e)=>{
        if(e.key==='Enter'||e.key===' '){e.preventDefault();open(card);}
      });
    });

    // 关闭交互
    modal.addEventListener('click',(e)=>{
      if(e.target.dataset.awardClose!==undefined) close();
    });
    document.addEventListener('keydown',(e)=>{
      if(e.key==='Escape'&&modal.classList.contains('is-open')) close();
    });
  }

  /* ---------- 键盘快捷键 ---------- */
  function initKeys(){
    document.addEventListener('keydown',(e)=>{
      // ESC 关闭 mini-menu
      if(e.key==='Escape'){
        const menu = $('#mini-menu');
        menu?.classList.remove('is-open');
        $('.mini-character')?.setAttribute('aria-expanded','false');
      }
    });
  }

  /* ---------- 启动 ---------- */
  onReady(()=>{
    initCanvas();
    initReveal();
    initInternshipTabs();
    initSignalAutoUnlock();
    initCountUp();
    initTheme();
    initMiniGuide();
    initMobileMenu();
    initScrollSpy();
    initAwards();
    initKeys();
  });

})();