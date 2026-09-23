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
    { id:'comp_2023_15city',    file:'202315届上海市大学生计算机能力大赛.jpg',                       caption:'第 15 届上海市大学生计算机能力大赛',               category:'competition', year:'2023', tier:'city',     size:349521, aspect:'portrait' },
    { id:'comp_2023_16nat',     file:'202316届中国计算机能力大赛.jpg',                                 caption:'第 16 届中国计算机能力大赛',                       category:'competition', year:'2023', tier:'national', size:285667, aspect:'landscape' },
    { id:'comp_2023_design2',   file:'2023年(第16届》中国大学生计算机设计大赛二等奖.jpg',            caption:'第 16 届中国大学生计算机设计大赛 · 二等奖',       category:'competition', year:'2023', tier:'national', size:245229, aspect:'landscape' },
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
    { id:'campus_top10',         file:'校园十大杰出人物.jpg',                                          caption:'校园十大杰出人物',                                 category:'campus',      year:'2024', tier:'school',   size: 98976, aspect:'landscape'  },
    { id:'campus_chairman',      file:'程序设计设社长.jpg',                                            caption:'程序设计社社长 · 社团建设',                       category:'campus',      year:'2024', tier:'school',   size:438052, aspect:'landscape'  },
    { id:'campus_paddle_1',      file:'百度paddlepaddle领航团团长.jpg',                                caption:'百度 PaddlePaddle 领航团 · 团长 1',               category:'campus',      year:'2024', tier:'school',   size:166648, aspect:'landscape' },
    { id:'campus_paddle_2',      file:'百度paddlepaddle领航团团长2.jpg',                               caption:'百度 PaddlePaddle 领航团 · 团长 2',               category:'campus',      year:'2024', tier:'school',   size:175784, aspect:'landscape' },
    { id:'campus_paddle_1024',   file:'1024百度paddlepaddle领航团程序员节.jpg',                        caption:'1024 百度 PaddlePaddle 领航团 · 程序员节',       category:'campus',      year:'2024', tier:'school',   size:145249, aspect:'landscape' },
    { id:'campus_biye_2025',     file:'2025上海杉达学院本科毕业生.jpg',                                caption:'2025 上海杉达学院 · 本科毕业',                    category:'campus',      year:'2025', tier:'school',   size:272647, aspect:'landscape'  },
    { id:'campus_yanjiusheng_2026',file:'26届上海杉达学院研究生.jpg',                                  caption:'第 26 届上海杉达学院研究生 · 录取',               category:'campus',      year:'2026', tier:'school',   size:342839, aspect:'landscape' },

    /* ---- 实践活动 (4) ---- */
    { id:'practice_efg_base',    file:'2024研究生EFG夏令营孵化基地.jpg',                                caption:'2024 研究生 EFG 夏令营 · 孵化基地',               category:'practice',    year:'2024', tier:'province', size:222426, aspect:'landscape' },
    { id:'practice_efg_group',   file:'2024研究生EFG夏令营孵化基地第七小组.jpg',                       caption:'2024 研究生 EFG 夏令营 · 第七小组',               category:'practice',    year:'2024', tier:'province', size:264460, aspect:'landscape' },
    { id:'practice_luntan',      file:'上海民办高校科技论坛.jpg',                                      caption:'上海民办高校科技论坛',                             category:'practice',    year:'2024', tier:'city',     size:214271, aspect:'landscape' },
    { id:'practice_zhiteng',     file:'上海致远鲸腾信息有限公式.jpg',                                  caption:'上海致远鲸腾信息有限公司 · 实习',                 category:'practice',    year:'2023', tier:'city',     size: 62467, aspect:'portrait' },

    /* ---- 创领创业 (4) ---- */
    { id:'startup_huangpu',      file:'创业黄浦一路繁花黄浦区创业三等级奖.jpg',                        caption:'创业黄浦 · 一路繁花黄浦区创业 · 三等奖',         category:'startup',     year:'2024', tier:'city',     size:342924, aspect:'portrait' },
    { id:'startup_pudong_1',     file:'创领浦东创新大赛暨第六届上海浦东新区选拔赛青年新势力赛道一等奖奖.jpg',   caption:'创领浦东 · 青年新势力赛道 · 一等奖',         category:'startup',     year:'2024', tier:'city',     size:321768, aspect:'portrait' },
    { id:'startup_pudong_2',     file:'创领浦东创新大赛暨第六届上海浦东新区选拔赛青年新势力赛道一等奖奖与奖杯.jpg', caption:'创领浦东 · 一等奖与奖杯',                category:'startup',     year:'2024', tier:'city',     size:239525, aspect:'landscape' },
    { id:'startup_tongji',       file:'同济大学全国大学生创业计划一等奖.jpg',                          caption:'同济大学全国大学生创业计划 · 一等奖',             category:'startup',     year:'2024', tier:'national', size:200429, aspect:'portrait' },

    /* ---- 项目开发 (4) ---- */
    { id:'project_zhilian_1',    file:'智联工翼开发过程1.jpg',                                          caption:'智联工翼 · 开发过程 1',                           category:'project',     year:'2024', tier:'private',  size:305191, aspect:'portrait' },
    { id:'project_zhilian_2',    file:'智联工翼开发过程2.jpg',                                          caption:'智联工翼 · 开发过程 2',                           category:'project',     year:'2024', tier:'private',  size:421034, aspect:'portrait' },
    { id:'project_zhilian_3',    file:'智联工翼开发过程3.jpg',                                          caption:'智联工翼 · 开发过程 3',                           category:'project',     year:'2024', tier:'private',  size:168078, aspect:'landscape' },
    { id:'project_zhilian_4',    file:'智联工翼开发过程4.jpg',                                          caption:'智联工翼 · 开发过程 4',                           category:'project',     year:'2024', tier:'private',  size:175388, aspect:'landscape' },

    /* ---- 知识产权 (1) ---- */
    { id:'ip_ruanzhuquan',       file:'软件著作权.jpg',                                                  caption:'基于 OpenCV + Django 的上位机软件 · 软著',        category:'ip',          year:'2024', tier:'national', size:304300, aspect:'portrait' }
  ];
  const IMG_BY_ID = Object.fromEntries(IMG_CATALOG.map(x=>[x.id,x]));

  /* ---- 工具函数 ---- */
  const assetUrl       = img => 'assets/' + img.file;
  const findImg        = id => IMG_BY_ID[id] || null;
  const categoryLabel  = c => ({ competition:'创新创业', campus:'校园荣誉', project:'项目实践',
                                 practice:'实践探索', startup:'创领创业', ip:'知识产权' })[c] || c;
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

  /* #gallery photo-wall 12 张精选（按用户偏好"故事性强"）
     幅面（横/竖）不在此指定 —— 由 IMG_CATALOG.aspect 驱动，避免两处真相源失同步 */
  const GALLERY_PICKS = [
    { imgId:'comp_2024_intl_nat' },       // 国家级双创
    { imgId:'campus_paddle_1024' },       // PaddlePaddle 程序员节
    { imgId:'startup_pudong_2' },         // 浦东一等奖 + 奖杯
    { imgId:'campus_chairman' },          // 程序设计社长
    { imgId:'practice_efg_group' },       // EFG 小组
    { imgId:'comp_2024_17nat_1' },        // 国赛现场
    { imgId:'startup_tongji' },           // 同济一等奖
    { imgId:'campus_top10' },             // 校园十大
    { imgId:'startup_huangpu' },          // 黄浦三等奖
    { imgId:'ip_ruanzhuquan' },           // 软件著作权
    { imgId:'campus_biye_2025' },         // 本科毕业
    { imgId:'campus_yanjiusheng_2026' }   // 研究生录取
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
    observeReveals();
  }

  /* 注册所有尚未观察的 .reveal —— 带 is-observed 去重。
     注入型渲染函数（initGallery / initArchive / initConstellation）在自己的
     innerHTML 之后各调一次，这样 onReady 末尾那次全局扫描从「唯一保障」
     降级为兜底：将来任何人新增晚于该行执行的注入函数，也不会让元素永远
     停在 opacity:0。 */
  function observeReveals(){
    if(!revealObserver) return;
    $$('.reveal:not(.is-observed)').forEach(el => {
      el.classList.add('is-observed');
      revealObserver.observe(el);
    });
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
    // 点亮展开态按钮（青色边框 + 背景）
    const node = $(`.signal-btn[data-signal-node="${name}"]`);
    if(node) node.classList.add('is-lit');
    // 点亮折叠态指示点（origin/builder/leader/maker/future → 0-4 索引）
    const SIG_INDEX = {origin:0, builder:1, leader:2, maker:3, future:4};
    const idx = SIG_INDEX[name];
    if(typeof idx === 'number'){
      const dot = $$('.handle-dots i')[idx];
      if(dot) dot.classList.add('is-lit');
    }
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

  /* ---------- 奖项详情弹层（双栏：图片视觉区 + 文案） ---------- */
  function initAwards(){
    const cards = $$('.award-evidence');
    if(!cards.length) return;

    // 动态创建 modal（双栏布局：左 visual + 右 copy）
    const modal = document.createElement('div');
    modal.className = 'award-modal';
    modal.setAttribute('role','dialog');
    modal.setAttribute('aria-modal','true');
    modal.setAttribute('aria-hidden','true');
    modal.innerHTML = `
      <div class="award-modal-backdrop" data-award-close></div>
      <div class="award-modal-card">
        <button class="award-modal-close" type="button" aria-label="关闭" data-award-close>✕</button>
        <div class="award-modal-visual">
          <img id="awardImg" alt="" decoding="async" />
        </div>
        <div class="award-modal-copy">
          <p id="awardProject" class="award-modal-project"></p>
          <div class="award-modal-head">
            <span class="award-modal-year" id="awardYear"></span>
            <span class="award-modal-tag" id="awardTag"></span>
          </div>
          <h2 id="awardTitle" class="award-modal-title"></h2>
          <strong id="awardResult" class="award-modal-result"></strong>
          <div class="award-modal-evidence-state" id="awardEvidenceBox">
            <i></i><span id="awardEvidence"></span>
          </div>
          <div id="awardStory" class="award-modal-story"></div>
          <a id="awardLink" class="award-modal-link" target="_blank" rel="noopener" hidden>查看官方公示 ↗</a>
          <span class="award-modal-footer">VERIFIED MOMENT · LIUZHIYUAN</span>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const imgEl       = modal.querySelector('#awardImg');
    const visualEl    = modal.querySelector('.award-modal-visual');
    const projectEl   = modal.querySelector('#awardProject');
    const yearEl      = modal.querySelector('#awardYear');
    const tagEl       = modal.querySelector('#awardTag');
    const titleEl     = modal.querySelector('#awardTitle');
    const resultEl    = modal.querySelector('#awardResult');
    const evidenceBox = modal.querySelector('#awardEvidenceBox');
    const evidenceEl  = modal.querySelector('#awardEvidence');
    const storyEl     = modal.querySelector('#awardStory');
    const linkEl      = modal.querySelector('#awardLink');

    function open(card){
      const cardKey = card.dataset.awardKey || '';
      const binding = AWARD_BINDINGS.find(b => b.cardKey === cardKey);
      const img     = binding && binding.imgId ? findImg(binding.imgId) : null;

      // 图片视觉区：有图则显示，无图降级为 📜
      if(img){
        imgEl.src = assetUrl(img);
        imgEl.alt = img.caption;
        visualEl.classList.remove('is-empty');
      } else {
        imgEl.removeAttribute('src');
        imgEl.alt = '';
        visualEl.classList.add('is-empty');
      }

      // 文案右栏
      projectEl.textContent = card.dataset.project || 'AWARD';
      yearEl.textContent    = card.dataset.year || '';
      tagEl.textContent     = card.dataset.tag || 'AWARD';
      titleEl.textContent   = card.dataset.title || '';
      resultEl.textContent  = card.dataset.result || '';
      storyEl.textContent   = card.dataset.story || '暂无更多细节。';

      // 证据状态徽章
      if(img){
        evidenceBox.classList.remove('is-empty');
        evidenceEl.textContent = `已匹配原始照片 · ${img.file.length > 20 ? img.file.slice(0,18)+'…' : img.file}`;
      } else {
        evidenceBox.classList.add('is-empty');
        evidenceEl.textContent = '仅文字档案 · 当前未匹配照片凭证';
      }

      // 公示链接（如果有 data-link）
      const link = card.dataset.link;
      if(link){
        linkEl.href = link;
        linkEl.hidden = false;
      } else {
        linkEl.hidden = true;
      }

      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden','false');
      document.body.style.overflow = 'hidden';
      // 聚焦态：标记当前 section 激活，其他区降透明度
      const activeSection = card.closest('section');
      if(activeSection) activeSection.classList.add('is-active');
      document.body.classList.add('detail-active');
    }
    function close(){
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden','true');
      document.body.style.overflow = '';
      // 移除聚焦态
      $$('.is-active').forEach(s => s.classList.remove('is-active'));
      document.body.classList.remove('detail-active');
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

  /* ---------- 详情证据墙：Photo Wall ---------- */
  function initGallery(){
    const wall = $('.photo-wall');
    if(!wall) return;
    wall.innerHTML = GALLERY_PICKS.map((pick, i) => {
      const img = IMG_BY_ID[pick.imgId];
      if(!img){ console.warn('Gallery 缺失图片：', pick.imgId); return ''; }
      const no = String(i+1).padStart(2,'0');
      const orient = img.aspect === 'portrait' ? 'is-portrait' : 'is-landscape';
      return `<button class="photo-card ${orient} reveal" type="button"
              data-img-id="${img.id}" data-caption="${img.caption}"
              data-cat="${img.category}" data-no="${no}"
              style="--i:${i}"
              aria-label="展品 ${no} · ${img.caption}">
              <span class="photo-frame">
                <img src="${assetUrl(img)}" alt="${img.caption}" loading="lazy" decoding="async" />
                <b class="mu-frame-no">${no}</b>
              </span>
              <span class="photo-plate">
                <span class="mu-no">EXHIBIT ${no}</span>
                <strong>${img.caption}</strong>
                <small>${img.year} · ${categoryLabel(img.category)} · ${tierLabel(img.tier)}</small>
                <em>打开故事 ↗</em>
              </span>
            </button>`;
    }).join('');
    observeReveals();
    wall.addEventListener('click', e => {
      const btn = e.target.closest('.photo-card');
      if(!btn) return;
      openLightbox(btn.dataset.imgId, btn.dataset.caption);
    });
  }

  /* ---------- 星座实验室：5 大分类星点 ---------- */
  function initConstellation(){
    const stage = $('.constellation-stage');
    if(!stage) return;
    const detail = {
      cat:   $('#star-category'),
      title: $('#star-title'),
      result:$('#star-result')
    };
    CONSTELLATION_NODES.forEach((node, i) => {
      const img = IMG_BY_ID[node.imgId];
      if(!img){ console.warn('Constellation 缺失图片：', node.imgId); return; }
      const btn = document.createElement('button');
      btn.className = 'award-star' + (i===0 ? ' active' : '');
      btn.type = 'button';
      btn.style.setProperty('--x', node.x + '%');
      btn.style.setProperty('--y', node.y + '%');
      btn.setAttribute('aria-label', img.caption);
      btn.dataset.imgId = img.id;
      btn.dataset.cat = img.category;
      btn.innerHTML = `<i>✦</i><span>${node.category}</span>`;
      btn.addEventListener('click', () => {
        stage.querySelectorAll('.award-star').forEach(s => s.classList.remove('active'));
        btn.classList.add('active');
        if(detail.cat)    detail.cat.textContent   = node.category + ' · ' + img.year;
        if(detail.title)  detail.title.textContent = img.caption;
        if(detail.result) detail.result.textContent = categoryLabel(img.category);
        openLightbox(img.id, img.caption);
      });
      stage.appendChild(btn);
    });
  }

  /* ---------- Project / Internship 图片证据注入 ---------- */
  function initProjectMedia(){
    const bindings = [
      { sel:'.project-grid .project-card:nth-child(1)', imgId:'comp_2024_intl_nat' },     // 国家级双创 → 国家级立项图
      { sel:'.project-grid .project-card:nth-child(4)', imgId:'project_zhilian_1' },      // AI 视觉机械臂 → 智联工翼过程1
      { sel:'.project-grid .project-card:nth-child(5)', imgId:'ip_ruanzhuquan' },         // 上位机软件 → 软著
      { sel:'.project-grid .project-card:nth-child(7)', imgId:'project_zhilian_4' }       // 3D 打印 → 智联工翼过程4
    ];
    bindings.forEach(b => {
      const card = $(b.sel);
      if(!card){ console.warn('Project 卡片缺失：', b.sel); return; }
      const img = IMG_BY_ID[b.imgId];
      if(!img){ console.warn('Project 图片缺失：', b.imgId); return; }
      const media = document.createElement('div');
      media.className = 'project-media';
      media.innerHTML = `<img src="${assetUrl(img)}" alt="${img.caption}" loading="lazy" decoding="async" />`;
      card.prepend(media);
    });
  }

  function initInternshipMedia(){
    const bindings = [
      { panel:'hongJing', imgId:'practice_zhiteng' },       // 嵌入式实习 → 致远鲸腾
      { panel:'puZhe',    imgId:'practice_luntan' }         // Python 实习 → 科技论坛
    ];
    bindings.forEach(b => {
      const panel = $(`.internship-panel[data-panel="${b.panel}"] .internship-media`);
      if(!panel){ console.warn('Internship panel 缺失：', b.panel); return; }
      const img = IMG_BY_ID[b.imgId];
      if(!img){ console.warn('Internship 图片缺失：', b.imgId); return; }
      const ev = document.createElement('div');
      ev.className = 'internship-evidence';
      ev.innerHTML = `<img src="${assetUrl(img)}" alt="${img.caption}" loading="lazy" decoding="async"
                       data-img-id="${img.id}" data-caption="${img.caption}" />
                      <small>实习凭证 · ${img.year}</small>`;
      panel.appendChild(ev);
      // 点击实习图片直接进 lightbox
      ev.querySelector('img').addEventListener('click', () => {
        openLightbox(img.id, img.caption);
      });
    });
  }

  /* ---------- Archive 折叠式证据库（4 个库房抽屉） ---------- */
  const ARCHIVE_ACCENTS = ['national','city','school','practice'];
  function initArchive(){
    const grid = $('.archive-grid');
    if(!grid) return;
    grid.innerHTML = ARCHIVE_GROUPS.map((group, gi) => {
      const items = group.imgIds.map(id => IMG_BY_ID[id]).filter(Boolean);
      if(!items.length){ console.warn('Archive 分组为空：', group.key); return ''; }
      const drawerNo = String(gi + 1).padStart(2,'0');
      const letter   = String.fromCharCode(65 + gi);   // 编目字头 A/B/C/D
      return `<details class="archive-group reveal" data-group="${group.key}"
                 data-accent="${ARCHIVE_ACCENTS[gi] || 'school'}" ${gi === 0 ? 'open' : ''}>
        <summary>
          <span class="drawer-no mu-no">柜 ${drawerNo}</span>
          <span class="drawer-label">${group.label}</span>
          <b>${items.length}<small>件</small></b>
          <em></em>
        </summary>
        <div class="archive-list">
          ${items.map((img, ii) => {
            const catNo = `${letter}-${String(ii + 1).padStart(2,'0')}`;
            return `
            <button class="archive-item" type="button"
                    data-img-id="${img.id}" data-caption="${img.caption}"
                    data-cat="${img.category}" data-no="${catNo}"
                    style="--i:${ii}">
              <img src="${assetUrl(img)}" alt="${img.caption}" loading="lazy" decoding="async" />
              <span class="archive-item-info">
                <small>${catNo} · ${img.year} · ${tierLabel(img.tier)}</small>
                <strong>${img.caption}</strong>
                <span>打开凭证 ↗</span>
              </span>
            </button>`;
          }).join('')}
        </div>
      </details>`;
    }).join('');
    observeReveals();
    // 点击 archive-item 进 lightbox
    grid.addEventListener('click', e => {
      const btn = e.target.closest('.archive-item');
      if(!btn) return;
      openLightbox(btn.dataset.imgId, btn.dataset.caption);
    });
  }

  /* ---------- signal-station 折叠/展开 + 5 节点真实联动 ---------- */
  function initSignalDockClick(){
    const station = $('.signal-station');
    const handle  = $('.station-handle');
    const closeBtn = $('.panel-close');
    if(!station || !handle) return;

    // 折叠/展开切换
    function openStation(){
      station.classList.add('is-open');
      handle.setAttribute('aria-expanded','true');
    }
    function closeStation(){
      station.classList.remove('is-open');
      handle.setAttribute('aria-expanded','false');
    }
    function toggleStation(){
      station.classList.contains('is-open') ? closeStation() : openStation();
    }

    // handle 点击（移动端） / hover（桌面端自动展开）
    handle.addEventListener('click', e => {
      e.stopPropagation();
      toggleStation();
    });
    // 桌面 hover 自动展开
    handle.addEventListener('mouseenter', () => openStation());
    station.addEventListener('mouseleave', () => {
      // 仅当用户没有手动锁定为开（用 setTimeout 给用户时间移到 panel 上）
      setTimeout(() => {
        if(!station.matches(':hover')) closeStation();
      }, 200);
    });
    // close 按钮
    closeBtn?.addEventListener('click', e => {
      e.stopPropagation();
      closeStation();
    });
    // 兼容旧类名（如果 HTML 用了 .panel-close 或 .station-close）
    $$('.panel-close').forEach(btn => {
      btn.addEventListener('click', e => { e.stopPropagation(); closeStation(); });
    });
    // 点外部关闭
    document.addEventListener('click', e => {
      if(!station.contains(e.target) && station.classList.contains('is-open')){
        closeStation();
      }
    });
    // ESC 关闭
    document.addEventListener('keydown', e => {
      if(e.key === 'Escape' && station.classList.contains('is-open')) closeStation();
    });

    // TARGETS + NAMES（简化：每个信号 → 对应 section 的唯一 ID）
    const TARGETS = {
      origin:  '#about',           // 起点：关于我
      builder: '#internship',      // 创造：实习轨道
      leader:  '#awards',          // 担当：荣誉奖项
      maker:   '#projects',        // 创客：构建现场
      future:  '#contact'          // 未来：联系坐标
    };
    const NAMES = {
      origin:  '起点 · 第一段实习',
      builder: '创造 · 把想法做出来',
      leader:  '担当 · 国家级立项负责人',
      maker:   '创客 · Arduino + 3D 打印',
      future:  '未来 · 持续建造'
    };

    // 5 按钮绑定
    $$('.signal-btn[data-signal-node]').forEach(node => {
      const sig = node.dataset.signalNode;
      node.addEventListener('click', e => {
        e.stopPropagation();
        focusSignal(sig, node);
      });
      node.addEventListener('keydown', e => {
        if(e.key === 'Enter' || e.key === ' '){
          e.preventDefault();
          focusSignal(sig, node);
        }
      });
    });

    function focusSignal(sig, sourceNode){
      const target = $(TARGETS[sig]);
      if(!target){
        console.warn(`信号 ${sig} 暂未配置目标`);
        return;
      }
      // 解锁信号（被动：is-lit 应用到 .signal-btn + .handle-dots 对应位）
      unlockSignal(sig);
      // 单选切换：清除其他 is-active，再 toggle 当前
      $$('.signal-btn.is-active').forEach(b => {
        if(b !== sourceNode) b.classList.remove('is-active');
      });
      sourceNode.classList.toggle('is-active');
      // 源节点脉冲
      sourceNode.classList.add('is-pulse');
      setTimeout(() => sourceNode.classList.remove('is-pulse'), 1400);
      // 平滑滚动到目标
      const headerH = $('.site-header')?.offsetHeight || 80;
      const y = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
      // 目标高亮脉冲
      target.classList.add('is-pulse-target');
      setTimeout(() => target.classList.remove('is-pulse-target'), 1600);
    }
  }

  /* ---------- 同类联动：hover 一张 → 同类高亮、异类降透明度 ---------- */
  function initCategoryLink(){
    const targets = '.photo-card, .archive-item, .award-star';

    document.body.addEventListener('mouseover', e => {
      const el = e.target.closest(targets);
      if(!el || !el.dataset.cat) return;
      const cat = el.dataset.cat;
      document.body.classList.add('category-linking');
      $$(targets).forEach(node => {
        if(!node.dataset.cat) return;
        node.classList.toggle('is-related', node.dataset.cat === cat);
      });
    });
    document.body.addEventListener('mouseout', e => {
      const el = e.target.closest(targets);
      if(!el) return;
      // 检查鼠标是否真的移到了外部（不是移到子元素）
      const related = e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest(targets);
      if(related) return;
      document.body.classList.remove('category-linking');
      $$(targets).forEach(node => node.classList.remove('is-related'));
    });
  }

  /* 6 大分类色调 —— initConstellation 的展签换色也要用，故提到 IIFE 作用域 */
  const CAT_COLORS = {
    competition:'#ff6b35', campus:'#00d9ff', project:'#7828d6',
    practice:'#ffb347', startup:'#ff4d8d', ip:'#7ee787'
  };

  /* 确定性伪随机（mulberry32）—— 取代 Math.random。
     原实现每次刷新构图都不同，滚动回展区会看到节点"跳"到新位置。 */
  function mulberry32(seed){
    return function(){
      seed |= 0; seed = seed + 0x6D2B79F5 | 0;
      let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- Canvas 节点图（#constellation 展厅导览图叠加层） ---------- */
  function initNodeCanvas(){
    /* 绘制导览图叠加层。返回 stop()，调用方可取消 rAF。 */
    function drawNetwork(canvas, items, options = {}){
      if(!canvas) return () => {};
      const ctx = canvas.getContext('2d');
      if(!ctx) return () => {};
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if(w < 4 || h < 4) return () => {};      // 未布局 / 隐藏时退出，避免 0 尺寸位图
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const rnd = mulberry32(options.seed || 0x0324);

      const groups = {};
      items.forEach(it => {
        if(!groups[it.category]) groups[it.category] = [];
        groups[it.category].push(it);
      });
      const cats = Object.keys(groups);

      const cx = w / 2, cy = h / 2;
      const ringR = Math.min(w, h) * 0.32;

      const catAngle = {};
      cats.forEach((c, i) => { catAngle[c] = (i / cats.length) * Math.PI * 2 - Math.PI / 2; });

      const nodes = [];
      const catCenters = {};
      cats.forEach(c => {
        const arr = groups[c];
        const ang = catAngle[c];
        catCenters[c] = {
          x: cx + Math.cos(ang) * ringR * 0.4,
          y: cy + Math.sin(ang) * ringR * 0.4,
          color: CAT_COLORS[c] || '#fff'
        };
        arr.forEach((it, idx) => {
          const a = ang + (idx - (arr.length - 1) / 2) * 0.35;
          const r = ringR * (0.7 + rnd() * 0.25);
          nodes.push({
            x: cx + Math.cos(a) * r,
            y: cy + Math.sin(a) * r,
            color: CAT_COLORS[c] || '#fff',
            cat: c,
            phase: rnd() * Math.PI * 2
          });
        });
      });

      function render(tick){
        ctx.clearRect(0, 0, w, h);

        // 同类连线（节点 → 分类中心）
        nodes.forEach(n => {
          const cc = catCenters[n.cat];
          if(!cc) return;
          ctx.globalAlpha = 0.18 + 0.12 * Math.sin(tick * 1.5 + n.phase);
          ctx.strokeStyle = n.color;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(cc.x, cc.y);
          ctx.stroke();
        });

        // 分类中心点
        Object.values(catCenters).forEach((cc, i) => {
          const r = 5 * (1 + 0.15 * Math.sin(tick * 2 + i));
          ctx.globalAlpha = 0.25;
          ctx.fillStyle = cc.color;
          ctx.beginPath(); ctx.arc(cc.x, cc.y, r * 2.5, 0, Math.PI * 2); ctx.fill();
          ctx.globalAlpha = 1;
          ctx.beginPath(); ctx.arc(cc.x, cc.y, r, 0, Math.PI * 2); ctx.fill();
        });

        // 节点（每个分类一颗）
        nodes.forEach(n => {
          const pulse = 1 + 0.25 * Math.sin(tick * 2.5 + n.phase);
          ctx.globalAlpha = 0.9;
          ctx.fillStyle = n.color;
          ctx.beginPath(); ctx.arc(n.x, n.y, 3 * pulse, 0, Math.PI * 2); ctx.fill();
          ctx.globalAlpha = 1;
          ctx.fillStyle = '#fff';
          ctx.beginPath(); ctx.arc(n.x, n.y, 1.2, 0, Math.PI * 2); ctx.fill();
        });
      }

      render(0);                                  // 先出一帧静态：reduced-motion 下也有内容
      if(REDUCED_MOTION.matches) return () => {};

      let rafId = 0, running = false, tick = 0;
      const step = () => { if(!running) return; tick += 0.016; render(tick); rafId = requestAnimationFrame(step); };
      const start = () => { if(running) return; running = true; rafId = requestAnimationFrame(step); };
      const stop  = () => { running = false; cancelAnimationFrame(rafId); };

      // 只在本体进入视口时跑；标签页切走也停（原实现是无条件无限 rAF）
      const io = new IntersectionObserver(([e]) => e.isIntersecting ? start() : stop(), { rootMargin:'120px' });
      io.observe(canvas);
      const onVis = () => document.hidden ? stop() : start();
      document.addEventListener('visibilitychange', onVis);

      return () => { stop(); io.disconnect(); document.removeEventListener('visibilitychange', onVis); };
    }

    let stopper = null, resizeTimer;

    function mount(){
      if(stopper){ stopper(); stopper = null; }
      const cStage = $('.constellation-stage');
      if(!cStage) return;
      let cvs = cStage.querySelector('.constellation-bg-canvas');
      if(!cvs){
        cvs = document.createElement('canvas');
        cvs.className = 'constellation-bg-canvas';
        cvs.setAttribute('aria-hidden', 'true');
        cStage.prepend(cvs);
      }
      /* 分类色要用 IMG_CATALOG 的英文 key 查表，而 CONSTELLATION_NODES.category
         是中文标签（'创新创业' 等）—— 直接拿它查 CAT_COLORS 会全部 fallback 成白色。
         故经 imgId 反查真实分类。 */
      const items = CONSTELLATION_NODES.map(n => {
        const img = IMG_BY_ID[n.imgId];
        return { category: img ? img.category : n.category };
      });
      stopper = drawNetwork(cvs, items, { seed: 0x0324 });
    }

    /* #gallery 顶部：藏品索引条。
       不放 canvas —— 环形构图在 1180×120 的扁条上半径只有 ~38px，
       33 个节点会挤成中心一团；分类构成用文字图例反而更清楚。 */
    const gWall = $('.photo-wall');
    if(gWall && gWall.parentNode){
      const counts = {};
      IMG_CATALOG.forEach(img => { counts[img.category] = (counts[img.category] || 0) + 1; });
      const legend = Object.keys(CAT_COLORS).map(c =>
        `<span><i class="cat-${c}"></i>${categoryLabel(c)} <b>${counts[c] || 0}</b></span>`).join('');
      const wrap = document.createElement('div');
      wrap.className = 'node-canvas-wrap';
      wrap.innerHTML =
        `<span class="node-canvas-label">藏品索引 · ${IMG_CATALOG.length} 件 / ${Object.keys(counts).length} 类</span>
         <div class="node-canvas-legend">${legend}</div>`;
      gWall.parentNode.insertBefore(wrap, gWall);
    }

    // 首绘 + 防抖重绘（原实现 resize 后位图尺寸不更新，构图被拉伸变形）
    requestAnimationFrame(mount);
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(mount, 200);
    });
  }

  /* ---------- 全局 Lightbox（多个区块复用） ---------- */
  window.openLightbox = function(imgId, caption){
    const img = IMG_BY_ID[imgId];
    const lb = $('.lightbox');
    if(!img || !lb){ console.warn('Lightbox 缺失图片：', imgId); return; }
    lb.querySelector('img').src = assetUrl(img);
    lb.querySelector('img').alt = img.caption;
    lb.querySelector('p').textContent = caption || img.caption;
    lb.classList.add('is-open');
    lb.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    // 聚焦态：找到触发源所属 section，加 .is-active
    document._lightboxSource = document.activeElement && document.activeElement.closest
      ? document.activeElement.closest('section')
      : null;
    if(document._lightboxSource) document._lightboxSource.classList.add('is-active');
    document.body.classList.add('detail-active');
  };
  function closeLightbox(){
    const lb = $('.lightbox');
    if(!lb) return;
    lb.classList.remove('is-open');
    lb.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
    // 移除聚焦态
    $$('.is-active').forEach(s => s.classList.remove('is-active'));
    document.body.classList.remove('detail-active');
    // 延迟清 src，避免动画中图片突然消失
    setTimeout(() => { lb.querySelector('img').src = ''; }, 400);
  }
  function initLightbox(){
    const lb = $('.lightbox');
    if(!lb) return;
    lb.addEventListener('click', e => {
      if(e.target.classList.contains('lightbox') ||
         e.target.classList.contains('lightbox-close')) closeLightbox();
    });
    document.addEventListener('keydown', e => {
      if(e.key === 'Escape' && lb.classList.contains('is-open')) closeLightbox();
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

  /* ---------- 数量注入：消除正文里的硬编码数字 ----------
     原先文案写死「12 MEMORY FRAMES」「所有 33 张图」，但 ARCHIVE_GROUPS 实际
     只有 31 项（分组间有重叠，去重后才覆盖 33 张）—— 改数组即失同步。
     HTML 里保留当前值作为占位，no-JS 下也正确。 */
  function initCounters(){
    const set = (sel, n) => $$(sel).forEach(el => { el.textContent = n; });
    set('[data-count-total]',   IMG_CATALOG.length);
    set('[data-count-gallery]', GALLERY_PICKS.length);
    set('[data-count-archive]', ARCHIVE_GROUPS.reduce((a, g) => a + g.imgIds.length, 0));
  }

  /* ---------- 启动 ---------- */
  onReady(()=>{
    initCounters();
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
    initGallery();
    initConstellation();
    initArchive();
    initProjectMedia();
    initInternshipMedia();
    initLightbox();
    initSignalDockClick();
    initCategoryLink();
    initNodeCanvas();
    initKeys();
    // 关键：JS 注入的 .reveal 需补 observe（晚于滚动 reveal 初始化）
    observeReveals();
  });

})();