/* ========================================================================
   LZY Engineer Station · 0324 — 交互层
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

  /* ========================================================================
     履历图片证据集 — 详情页单一真相源
     33 张履历图（不含 liuzhiyuan.jpg，保留在 hero / 启动页）
     ======================================================================== */
  const IMG_CATALOG = [
    /* ---- 比赛获奖 (13) ---- */
    { id:'comp_2023_15city',    file:'202315届上海市大学生计算机能力大赛.jpg',                       caption:'第 15 届上海市大学生计算机能力大赛',               category:'competition', year:'2023', tier:'city',     size:349521, aspect:'landscape' },
    { id:'comp_2023_16nat',     file:'202316届中国计算机能力大赛.jpg',                                 caption:'第 16 届中国计算机能力大赛',                       category:'competition', year:'2023', tier:'national', size:285667, aspect:'landscape' },
    { id:'comp_2023_design2',   file:'2023年(第16届)中国大学生计算机设计大赛二等奖.jpg',              caption:'第 16 届中国大学生计算机设计大赛 · 二等奖',       category:'competition', year:'2023', tier:'national', size:245229, aspect:'landscape' },
    { id:'comp_2023_apply3',    file:'2023年(第十五届)上海市大学生计算机应用能力大赛3等奖.jpg',       caption:'第 15 届上海市大学生计算机应用能力大赛 · 三等奖', category:'competition', year:'2023', tier:'city',     size:354238, aspect:'landscape' },
    { id:'comp_2024_17nat_1',   file:'202417届全国计算机能留大赛1.jpg',                                caption:'第 17 届全国计算机能力大赛 · 现场 1',             category:'competition', year:'2024', tier:'national', size:398753, aspect:'landscape' },
    { id:'comp_2024_17nat_2',   file:'202417届全国计算机能留大赛2.jpg',                                caption:'第 17 届全国计算机能力大赛 · 现场 2',             category:'competition', year:'2024', tier:'national', size:487355, aspect:'landscape' },
    { id:'comp_2024_school_gold',file:'2024上海杉达学院校赛金奖.jpg',                                  caption:'2024 上海杉达学院校赛 · 金奖',                   category:'competition', year:'2024', tier:'school',   size:137821, aspect:'landscape' },
    { id:'comp_2024_intl_yin',  file:'2024中国国际创新创业大赛上海市银奖.jpg',                        caption:'中国国际创新创业大赛上海市 · 银奖',             category:'competition', year:'2024', tier:'city',     size:126382, aspect:'landscape' },
    { id:'comp_2024_intl_nat',  file:'2024中国国际大学生创新创业大赛.jpg',                             caption:'中国国际大学生创新创业大赛',                     category:'competition', year:'2024', tier:'national', size:200748, aspect:'landscape' },
    { id:'comp_2024_apply3',    file:'2024年(第十六届)上海市大学生计算机应用能力大赛3等奖.jpg',       caption:'第 16 届上海市大学生计算机应用能力大赛 · 三等奖', category:'competition', year:'2024', tier:'city',     size:421742, aspect:'landscape' },
    { id:'comp_2025_school_gold',file:'2025上海杉达学院校赛金奖.jpg',                                  caption:'2025 上海杉达学院校赛 · 金奖',                   category:'competition', year:'2025', tier:'school',   size:148040, aspect:'landscape' },
    { id:'comp_2025_intl_tong', file:'2025中国国际创新创业大赛上海市铜奖.jpg',                         caption:'中国国际创新创业大赛上海市 · 铜奖',             category:'competition', year:'2025', tier:'city',     size:397882, aspect:'landscape' },
    { id:'comp_2026_school_te', file:'2026上海杉达学院校赛特等奖.jpg',                                 caption:'2026 上海杉达学院校赛 · 特等奖',                 category:'competition', year:'2026', tier:'school',   size:230132, aspect:'landscape' },

    /* ---- 校园活动 (7) ---- */
    { id:'campus_top10',         file:'校园十大杰出人物.jpg',                                          caption:'校园十大杰出人物',                                 category:'campus',      year:'2024', tier:'school',   size: 98976, aspect:'portrait'  },
    { id:'campus_chairman',      file:'程序设计设社长.jpg',                                            caption:'程序设计社社长 · 社团建设',                       category:'campus',      year:'2024', tier:'school',   size:438052, aspect:'portrait'  },
    { id:'campus_paddle_1',      file:'百度paddlepaddle领航团团长.jpg',                                caption:'百度 PaddlePaddle 领航团 · 团长 1',               category:'campus',      year:'2024', tier:'school',   size:166648, aspect:'landscape' },
    { id:'campus_paddle_2',      file:'百度paddlepaddle领航团团长2.jpg',                               caption:'百度 PaddlePaddle 领航团 · 团长 2',               category:'campus',      year:'2024', tier:'school',   size:175784, aspect:'landscape' },
    { id:'campus_paddle_1024',   file:'1024百度paddlepaddle领航团程序员节.jpg',                        caption:'1024 百度 PaddlePaddle 领航团 · 程序员节',       category:'campus',      year:'2024', tier:'school',   size:145249, aspect:'landscape' },
    { id:'campus_biye_2025',     file:'2025上海杉达学院本科毕业生.jpg',                                caption:'2025 上海杉达学院 · 本科毕业',                    category:'campus',      year:'2025', tier:'school',   size:272647, aspect:'portrait'  },
    { id:'campus_yanjiusheng_2026',file:'26届上海杉达学院研究生.jpg',                                  caption:'第 26 届上海杉达学院研究生 · 录取',               category:'campus',      year:'2026', tier:'school',   size:342839, aspect:'landscape' },

    /* ---- 实践活动 (4) ---- */
    { id:'practice_efg_base',    file:'2024研究生EFG夏令营孵化基地.jpg',                                caption:'2024 研究生 EFG 夏令营 · 孵化基地',               category:'practice',    year:'2024', tier:'province', size:222426, aspect:'landscape' },
    { id:'practice_efg_group',   file:'2024研究生EFG夏令营孵化基地第七小组.jpg',                       caption:'2024 研究生 EFG 夏令营 · 第七小组',               category:'practice',    year:'2024', tier:'province', size:264460, aspect:'landscape' },
    { id:'practice_luntan',      file:'上海民办高校科技论坛.jpg',                                      caption:'上海民办高校科技论坛',                             category:'practice',    year:'2024', tier:'city',     size:214271, aspect:'landscape' },
    { id:'practice_zhiteng',     file:'上海致远鲸腾信息有限公式.jpg',                                  caption:'上海致远鲸腾信息有限公司 · 实习',                 category:'practice',    year:'2023', tier:'city',     size: 62467, aspect:'landscape' },

    /* ---- 创领创业 (4) ---- */
    { id:'startup_huangpu',      file:'创业黄浦一路繁花黄浦区创业三等级奖.jpg',                        caption:'创业黄浦 · 一路繁花黄浦区创业 · 三等奖',         category:'startup',     year:'2024', tier:'city',     size:342924, aspect:'landscape' },
    { id:'startup_pudong_1',     file:'创领浦东创新大赛暨第六届上海浦东新区选拔赛青年新势力赛道一等奖奖.jpg',   caption:'创领浦东 · 青年新势力赛道 · 一等奖',         category:'startup',     year:'2024', tier:'city',     size:321768, aspect:'landscape' },
    { id:'startup_pudong_2',     file:'创领浦东创新大赛暨第六届上海浦东新区选拔赛青年新势力赛道一等奖奖与奖杯.jpg', caption:'创领浦东 · 一等奖与奖杯',                category:'startup',     year:'2024', tier:'city',     size:239525, aspect:'landscape' },
    { id:'startup_tongji',       file:'同济大学全国大学生创业计划一等奖.jpg',                          caption:'同济大学全国大学生创业计划 · 一等奖',             category:'startup',     year:'2024', tier:'national', size:200429, aspect:'landscape' },

    /* ---- 项目开发 (4) ---- */
    { id:'project_zhilian_1',    file:'智联工翼开发过程1.jpg',                                          caption:'智联工翼 · 开发过程 1',                           category:'project',     year:'2024', tier:'private',  size:305191, aspect:'landscape' },
    { id:'project_zhilian_2',    file:'智联工翼开发过程2.jpg',                                          caption:'智联工翼 · 开发过程 2',                           category:'project',     year:'2024', tier:'private',  size:421034, aspect:'landscape' },
    { id:'project_zhilian_3',    file:'智联工翼开发过程3.jpg',                                          caption:'智联工翼 · 开发过程 3',                           category:'project',     year:'2024', tier:'private',  size:168078, aspect:'landscape' },
    { id:'project_zhilian_4',    file:'智联工翼开发过程4.jpg',                                          caption:'智联工翼 · 开发过程 4',                           category:'project',     year:'2024', tier:'private',  size:175388, aspect:'landscape' },

    /* ---- 知识产权 (1) ---- */
    { id:'ip_ruanzhuquan',       file:'软件著作权.jpg',                                                  caption:'基于 OpenCV + Django 的上位机软件 · 软著',        category:'ip',          year:'2024', tier:'national', size:304300, aspect:'landscape' }
  ];
  const IMG_BY_ID = Object.fromEntries(IMG_CATALOG.map(x=>[x.id,x]));

  /* ---- 工具函数 ---- */
  const assetUrl       = img => 'assets/' + img.file;
  const findImg        = id => IMG_BY_ID[id] || null;
  const categoryLabel  = c => ({ competition:'创新创业', campus:'校园荣誉', project:'项目实践',
                                 practice:'实践探索', startup:'创领创业', ip:'知识产权' })[c] || c;
  const categoryShort  = c => ({ competition:'创业', campus:'校园', project:'项目',
                                 practice:'实践', startup:'创领', ip:'知产' })[c] || c;
  const tierLabel      = t => ({ school:'校级', city:'市级', province:'省级',
                                 national:'国家级', intl:'国际级', private:'项目' })[t] || t;

  /* ========================================================================
     4 个绑定数组 — 驱动 5 大区块
     确保 33 张图全部至少在一处被引用（覆盖率断言在底部）
     ======================================================================== */

  /* 9 张 award-card 与图片映射（解决 3 张无图痛点） */
  const AWARD_BINDINGS = [
    { cardKey:'shuangChuang',  imgId:'comp_2024_intl_yin' },  // 1 双创上海市银奖
    { cardKey:'guoSaiEr',      imgId:'comp_2023_design2' },   // 2 国赛二等奖
    { cardKey:'guoJiaLiXiang', imgId:'comp_2024_intl_nat' },  // 3 国家级立项
    { cardKey:'puDongYi',      imgId:'startup_pudong_1' },    // 4 浦东一等奖
    { cardKey:'shangHaiSan',   imgId:'comp_2023_15city' },    // 5 上海市赛三等奖
    { cardKey:'shiJiang',      imgId:null },                   // 6 奖学金（无图 → 降级）
    { cardKey:'shiXinZhuanLi', imgId:null },                   // 7 实用新型专利（无图 → 降级）
    { cardKey:'ruanZhu',       imgId:'ip_ruanzhuquan' },      // 8 软件著作权
    { cardKey:'googleAds',     imgId:null }                    // 9 Google ADS（无图 → 降级）
  ];

  /* #gallery photo-wall 12 张精选（按用户偏好"故事性强"） */
  const GALLERY_PICKS = [
    { imgId:'comp_2024_intl_nat',  variant:'photo-feature' },     // 国家级双创
    { imgId:'campus_paddle_1024',  variant:'photo-portrait' },    // PaddlePaddle 程序员节
    { imgId:'startup_pudong_2',    variant:'photo-landscape' },   // 浦东一等奖 + 奖杯
    { imgId:'campus_chairman',     variant:'photo-square' },      // 程序设计社长
    { imgId:'practice_efg_group',  variant:'photo-slim' },        // EFG 小组
    { imgId:'comp_2024_17nat_1',   variant:'photo-campus' },      // 国赛现场
    { imgId:'startup_tongji',      variant:'photo-finale' },      // 同济一等奖
    { imgId:'campus_top10',        variant:'photo-certificate' }, // 校园十大
    { imgId:'startup_huangpu',     variant:'photo-medal' },       // 黄浦三等奖
    { imgId:'ip_ruanzhuquan',      variant:'photo-small' },       // 软件著作权
    { imgId:'campus_biye_2025',    variant:'photo-feature' },     // 本科毕业
    { imgId:'campus_yanjiusheng_2026',variant:'photo-portrait' }  // 研究生录取
  ];

  /* #constellation 5 大分类星点 */
  const CONSTELLATION_NODES = [
    { category:'创新创业', imgId:'startup_pudong_1',       x:12, y:70 },
    { category:'校园荣誉', imgId:'campus_top10',           x:32, y:22 },
    { category:'项目实践', imgId:'project_zhilian_2',      x:50, y:60 },
    { category:'实践探索', imgId:'practice_efg_group',     x:68, y:24 },
    { category:'知识产权', imgId:'ip_ruanzhuquan',         x:88, y:66 }
  ];

  /* #archive 4 个 details 分组（覆盖剩余 18+ 张） */
  const ARCHIVE_GROUPS = [
    { key:'archive_national',     label:'国家级奖项',  imgIds:['comp_2023_16nat','comp_2023_design2','comp_2024_17nat_1','comp_2024_17nat_2','comp_2024_intl_nat','startup_tongji'] },
    { key:'archive_city',         label:'市级奖项',    imgIds:['comp_2023_15city','comp_2023_apply3','comp_2024_apply3','comp_2024_intl_yin','comp_2025_intl_tong','startup_huangpu','startup_pudong_1','startup_pudong_2'] },
    { key:'archive_school',       label:'校级 + 校园', imgIds:['comp_2024_school_gold','comp_2025_school_gold','comp_2026_school_te','campus_paddle_1','campus_paddle_2','campus_chairman','campus_biye_2025','campus_yanjiusheng_2026'] },
    { key:'archive_practice',     label:'实践 / 实习', imgIds:['practice_efg_base','practice_efg_group','practice_luntan','practice_zhiteng','project_zhilian_1','project_zhilian_2','project_zhilian_3','project_zhilian_4','campus_paddle_1024'] }
  ];

  /* ========================================================================
     覆盖率断言 — 确保 33 张图全部被引用
     ======================================================================== */
  (function(){
    const ids = new Set();
    AWARD_BINDINGS.forEach(b => b.imgId && ids.add(b.imgId));
    GALLERY_PICKS.forEach(p => ids.add(p.imgId));
    CONSTELLATION_NODES.forEach(n => ids.add(n.imgId));
    ARCHIVE_GROUPS.forEach(g => g.imgIds.forEach(i => ids.add(i)));
    console.log(`📊 图像覆盖率：${ids.size} / ${IMG_CATALOG.length}`);
    if(ids.size < IMG_CATALOG.length){
      const orphans = IMG_CATALOG.filter(x => !ids.has(x.id));
      console.error('⚠️ 未引用的图：', orphans.map(o => o.id));
    }
  })();

  /* ---------- 启动页 ---------- */
  const introGate = $('.intro-gate');
  const header = $('.site-header');
  const miniGuide = $('.mini-guide');
  const signalDock = $('.signal-dock');

  function leaveIntro(){
    if(!introGate) return;
    // 方案 A v2：5 阶段仪式感过渡（与 styles.css .is-leaving/.is-bursting/.is-streaming/.is-arrive/.is-opacity-out 配合）
    //   0   question 吸进中心 + sticker shine + deco fade
    // 180   8 道脉冲光线放射 + photo emit + halo scan
    // 400   信号字符流扫过 + 顶部扫描线扫一次
    // 600   body.is-arrive → header/dock/guide/hero-stagger 入场
    // 900   introGate 整体渐隐
    // 1100  introGate 完全隐藏 + 兼容旧 is-visible class
    introGate.classList.add('is-leaving');
    setTimeout(()=> introGate.classList.add('is-bursting'), 180);
    setTimeout(()=> introGate.classList.add('is-streaming'), 400);
    // 时序 fix: 把 body.is-arrive 移到 T=900，与 is-opacity-out 同步
    // 旧时序在 T=600 触发 stagger，但启动页直到 T=900 才 fade，导致 stagger 在不透明启动页后方"空跑"用户看不到
    setTimeout(()=>{
      introGate.classList.add('is-opacity-out');  // 启动页整体 fade 0.4s
      document.body.classList.add('is-arrive');   // 主站 stagger 同步启动
    }, 900);
    setTimeout(()=>{
      introGate.style.display='none';
      header?.classList.add('is-visible');
      miniGuide?.classList.add('is-visible');
      signalDock?.classList.add('is-visible');
      // 只让 hero 区块的 reveal 元素立即可见（启动页 → 主站的衔接）
      // 其他区块（about/internship/...）保留 IntersectionObserver 滚动揭示
      $$('.hero .reveal').forEach(el=>el.classList.add('is-visible'));
    },1100);
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