/* ========================================================================
   LZY Engineer Station · 0324 — 交互层
   - 启动页 → 主站
   - canvas 粒子背景
   - 滚动揭示
   - 实习 Tab 切换
   - 站台索引（合并原 mini-guide + signal-station）
   - 主题切换 / 移动端菜单 / 滚动监听
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
     33 张履历图（不含 liuzhiyuan.jpg，保留在启动页 / #about 展柜）
     ======================================================================== */
  const IMG_CATALOG = [
    /* ---- 比赛获奖 (13) ---- */
    { id:'comp_2023_15city',    file:'202315届上海市大学生计算机能力大赛.jpg',                       caption:'第 15 届上海市大学生计算机能力大赛',               category:'competition', shot:'scene', year:'2023', tier:'city',     size:349521, aspect:'portrait' },
    { id:'comp_2023_16nat',     file:'202316届中国计算机能力大赛.jpg',                                 caption:'第 16 届中国计算机能力大赛',                       category:'competition', shot:'scene', year:'2023', tier:'national', size:285667, aspect:'landscape' },
    { id:'comp_2023_design2',   file:'2023年(第16届》中国大学生计算机设计大赛二等奖.jpg',            caption:'第 16 届中国大学生计算机设计大赛 · 二等奖',       category:'competition', shot:'cert', year:'2023', tier:'national', size:245229, aspect:'landscape' },
    { id:'comp_2023_apply3',    file:'2023年(第十五届)上海市大学生计算机应用能力大赛3等奖.jpg',       caption:'第 15 届上海市大学生计算机应用能力大赛 · 三等奖', category:'competition', shot:'cert', year:'2023', tier:'city',     size:354238, aspect:'landscape' },
    { id:'comp_2024_17nat_1',   file:'202417届全国计算机能留大赛1.jpg',                                caption:'第 17 届全国计算机能力大赛 · 现场 1',             category:'competition', shot:'scene', year:'2024', tier:'national', size:398753, aspect:'landscape' },
    { id:'comp_2024_17nat_2',   file:'202417届全国计算机能留大赛2.jpg',                                caption:'第 17 届全国计算机能力大赛 · 现场 2',             category:'competition', shot:'scene', year:'2024', tier:'national', size:487355, aspect:'landscape' },
    { id:'comp_2024_school_gold',file:'2024上海杉达学院校赛金奖.jpg',                                  caption:'2024 上海杉达学院校赛 · 金奖',                   category:'competition', shot:'scene', year:'2024', tier:'school',   size:137821, aspect:'landscape' },
    { id:'comp_2024_intl_yin',  file:'2024中国国际创新创业大赛上海市银奖.jpg',                        caption:'中国国际创新创业大赛上海市 · 银奖',             category:'competition', shot:'cert', year:'2024', tier:'city',     size:126382, aspect:'landscape' },
    { id:'comp_2024_intl_nat',  file:'2024中国国际大学生创新创业大赛.jpg',                             caption:'中国国际大学生创新创业大赛',                     category:'competition', shot:'scene', year:'2024', tier:'national', size:200748, aspect:'landscape' },
    { id:'comp_2024_apply3',    file:'2024年(第十六届)上海市大学生计算机应用能力大赛3等奖.jpg',       caption:'第 16 届上海市大学生计算机应用能力大赛 · 三等奖', category:'competition', shot:'cert', year:'2024', tier:'city',     size:421742, aspect:'landscape' },
    { id:'comp_2025_school_gold',file:'2025上海杉达学院校赛金奖.jpg',                                  caption:'2025 上海杉达学院校赛 · 金奖',                   category:'competition', shot:'scene', year:'2025', tier:'school',   size:148040, aspect:'landscape' },
    { id:'comp_2025_intl_tong', file:'2025中国国际创新创业大赛上海市铜奖.jpg',                         caption:'中国国际创新创业大赛上海市 · 铜奖',             category:'competition', shot:'cert', year:'2025', tier:'city',     size:397882, aspect:'landscape' },
    { id:'comp_2026_school_te', file:'2026上海杉达学院校赛特等奖.jpg',                                 caption:'2026 上海杉达学院校赛 · 特等奖',                 category:'competition', shot:'scene', year:'2026', tier:'school',   size:230132, aspect:'landscape' },

    /* ---- 校园活动 (7) ---- */
    { id:'campus_top10',         file:'校园十大杰出人物.jpg',                                          caption:'校园十大杰出人物',                                 category:'campus',      shot:'scene', year:'2024', tier:'school',   size: 98976, aspect:'landscape'  },
    { id:'campus_chairman',      file:'程序设计设社长.jpg',                                            caption:'程序设计社社长 · 社团建设',                       category:'campus',      shot:'scene', year:'2024', tier:'school',   size:438052, aspect:'landscape'  },
    { id:'campus_paddle_1',      file:'百度paddlepaddle领航团团长.jpg',                                caption:'百度 PaddlePaddle 领航团 · 团长 1',               category:'campus',      shot:'scene', year:'2024', tier:'school',   size:166648, aspect:'landscape' },
    { id:'campus_paddle_2',      file:'百度paddlepaddle领航团团长2.jpg',                               caption:'百度 PaddlePaddle 领航团 · 团长 2',               category:'campus',      shot:'scene', year:'2024', tier:'school',   size:175784, aspect:'landscape' },
    { id:'campus_paddle_1024',   file:'1024百度paddlepaddle领航团程序员节.jpg',                        caption:'1024 百度 PaddlePaddle 领航团 · 程序员节',       category:'campus',      shot:'scene', year:'2024', tier:'school',   size:145249, aspect:'landscape' },
    { id:'campus_biye_2025',     file:'2025上海杉达学院本科毕业生.jpg',                                caption:'2025 上海杉达学院 · 本科毕业',                    category:'campus',      shot:'scene', year:'2025', tier:'school',   size:272647, aspect:'landscape'  },
    { id:'campus_yanjiusheng_2026',file:'26届上海杉达学院研究生.jpg',                                  caption:'第 26 届上海杉达学院研究生 · 录取',               category:'campus',      shot:'scene', year:'2026', tier:'school',   size:342839, aspect:'landscape' },

    /* ---- 实践活动 (4) ---- */
    { id:'practice_efg_base',    file:'2024研究生EFG夏令营孵化基地.jpg',                                caption:'2024 研究生 EFG 夏令营 · 孵化基地',               category:'practice',    shot:'scene', year:'2024', tier:'province', size:222426, aspect:'landscape' },
    { id:'practice_efg_group',   file:'2024研究生EFG夏令营孵化基地第七小组.jpg',                       caption:'2024 研究生 EFG 夏令营 · 第七小组',               category:'practice',    shot:'scene', year:'2024', tier:'province', size:264460, aspect:'landscape' },
    { id:'practice_luntan',      file:'上海民办高校科技论坛.jpg',                                      caption:'上海民办高校科技论坛',                             category:'practice',    shot:'scene', year:'2024', tier:'city',     size:214271, aspect:'landscape' },
    { id:'practice_zhiteng',     file:'上海致远鲸腾信息有限公式.jpg',                                  caption:'上海致远鲸腾信息有限公司 · 实习',                 category:'practice',    shot:'scene', year:'2023', tier:'city',     size: 62467, aspect:'portrait' },

    /* ---- 创领创业 (4) ---- */
    { id:'startup_huangpu',      file:'创业黄浦一路繁花黄浦区创业三等级奖.jpg',                        caption:'创业黄浦 · 一路繁花黄浦区创业 · 三等奖',         category:'startup',     shot:'cert', year:'2024', tier:'city',     size:342924, aspect:'portrait' },
    { id:'startup_pudong_1',     file:'创领浦东创新大赛暨第六届上海浦东新区选拔赛青年新势力赛道一等奖奖.jpg',   caption:'创领浦东 · 青年新势力赛道 · 一等奖',         category:'startup',     shot:'cert', year:'2024', tier:'city',     size:321768, aspect:'portrait' },
    { id:'startup_pudong_2',     file:'创领浦东创新大赛暨第六届上海浦东新区选拔赛青年新势力赛道一等奖奖与奖杯.jpg', caption:'创领浦东 · 一等奖与奖杯',                category:'startup',     shot:'cert', year:'2024', tier:'city',     size:239525, aspect:'landscape' },
    { id:'startup_tongji',       file:'同济大学全国大学生创业计划一等奖.jpg',                          caption:'同济大学全国大学生创业计划 · 一等奖',             category:'startup',     shot:'cert', year:'2024', tier:'national', size:200429, aspect:'portrait' },

    /* ---- 项目开发 (4) ---- */
    { id:'project_zhilian_1',    file:'智联工翼开发过程1.jpg',                                          caption:'智联工翼 · 开发过程 1',                           category:'project',     shot:'scene', year:'2024', tier:'private',  size:305191, aspect:'portrait' },
    { id:'project_zhilian_2',    file:'智联工翼开发过程2.jpg',                                          caption:'智联工翼 · 开发过程 2',                           category:'project',     shot:'scene', year:'2024', tier:'private',  size:421034, aspect:'portrait' },
    { id:'project_zhilian_3',    file:'智联工翼开发过程3.jpg',                                          caption:'智联工翼 · 开发过程 3',                           category:'project',     shot:'scene', year:'2024', tier:'private',  size:168078, aspect:'landscape' },
    { id:'project_zhilian_4',    file:'智联工翼开发过程4.jpg',                                          caption:'智联工翼 · 开发过程 4',                           category:'project',     shot:'scene', year:'2024', tier:'private',  size:175388, aspect:'landscape' },

    /* ---- 知识产权 (1) ---- */
    { id:'ip_ruanzhuquan',       file:'软件著作权.jpg',                                                  caption:'基于 OpenCV + Django 的上位机软件 · 软著',        category:'ip',          shot:'cert', year:'2024', tier:'national', size:304300, aspect:'portrait' }
  ];
  const IMG_BY_ID = Object.fromEntries(IMG_CATALOG.map(x=>[x.id,x]));

  /* #about 序厅展柜的肖像 —— 刻意不进 IMG_CATALOG：
     它是启动页 / 展柜复用的门面照，不属于「33 张履历证据」，
     进目录会让 data-count-total / -gallery / -archive 全部虚高。
     但要能被 openLightbox(id, caption) 查到，故单独登记进查找表。 */
  const PORTRAIT_IMG = { id:'portrait_lzy', file:'liuzhiyuan.jpg', caption:'刘致远 · ENGINEER 0324' };
  IMG_BY_ID[PORTRAIT_IMG.id] = PORTRAIT_IMG;

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

  /* #gallery 挂画墙 —— 全 33 张，按「奖状 / 经历」拆两段，每段再按「横版 / 竖版」分两排。
     分组依据（用户诉求：奖状归奖状、经历归经历；横的一排、竖的一排）：
       奖状(cert)  = 10 张 —— 证书 / 奖状本体扫描件
       经历(scene) = 23 张 —— 现场合影、活动、开发过程
     两条纪律：
       · 分组读 IMG_CATALOG.shot，不读 category。category 分不出来 ——
         competition 里既有证书（2023年(第16届》…二等奖）也有现场合影（202316届…、
         202417届…现场 1/2、2026 校赛特等奖台上举证）。shot 是逐张看原图判定的。
       · 幅面读 IMG_CATALOG.aspect（已用 JPEG SOF 逐张核对真实像素，33/33 与渲染一致）。
     清单与数量都从 IMG_CATALOG 派生，避免「数量 / 分组」两处真相源失同步。 */
  const GALLERY_KINDS = [
    { key:'award',  no:'A', label:'奖状 · CERTIFICATES', shot:'cert'  },
    { key:'moment', no:'B', label:'经历 · MOMENTS',      shot:'scene' }
  ];
  const GALLERY_ORIENTS = [
    { key:'landscape', label:'横版' },
    { key:'portrait',  label:'竖版' }
  ];
  const GALLERY_ITEMS = GALLERY_KINDS.flatMap(kind =>
    IMG_CATALOG.filter(img => img.shot === kind.shot)
               .map(img => ({ kind:kind.key, orient:img.aspect, img }))
  );
  /* 自检：shot / aspect 都是没写就静默归错档的字段（缺 shot 会被当成非本组而整个消失，
     拼错 aspect 会掉进「竖版」排）。这里显式兜住，不让缺字段无声通过。 */
  (function(){
    const bad = IMG_CATALOG.filter(x => x.shot !== 'cert' && x.shot !== 'scene');
    if(bad.length) console.error('⚠️ shot 字段非法或缺失：', bad.map(x => x.id));
    const badAr = IMG_CATALOG.filter(x => x.aspect !== 'portrait' && x.aspect !== 'landscape');
    if(badAr.length) console.error('⚠️ aspect 字段非法或缺失：', badAr.map(x => x.id));
    if(GALLERY_ITEMS.length !== IMG_CATALOG.length)
      console.error(`⚠️ 挂画墙漏图：${GALLERY_ITEMS.length} / ${IMG_CATALOG.length}`);
  })();

  /* #constellation 的星点已不再手工维护 —— 它直接由 IMG_CATALOG 按 category
     派生（见 initConstellation）。原先的 CONSTELLATION_NODES 只有 5 项，
     漏掉了最大的一类 competition（13 张，占 39%），那 13 张图在本区块进不去。
     派生后 33 张一张不少，且不再有第二处真相源。 */

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
    GALLERY_ITEMS.forEach(it => ids.add(it.img.id));
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
  const stationIndex = $('.station-index');

  /* 启动页展示期间锁住主站滚动。
     .intro-gate 是 position:fixed —— 它盖在页面上，但**不阻止底层滚动**。
     用户在启动页上滚轮会带动主站，点进去时就停在那个位置：
       · 首屏不在顶部（视口顶部可能是 awards 之类的中段区块）
       · 展柜开帘 / 首屏 reveal 动画已经在屏幕外播完，用户看不到
       · 信号站的指示点会因为中段区块可见而提前点亮
     故在启动页期间给 body 加 is-intro 锁滚动，离开时解锁并强制回顶。 */
  document.body.classList.add('is-intro');

  function leaveIntro(){
    if(!introGate) return;
    // 方案 A v2：5 阶段仪式感过渡（与 styles.css .is-leaving/.is-bursting/.is-streaming/.is-arrive/.is-opacity-out 配合）
    //   0   question 吸进中心 + sticker shine + deco fade
    // 180   8 道脉冲光线放射 + photo emit + halo scan
    // 400   信号字符流扫过 + 顶部扫描线扫一次
    // 600   body.is-arrive → header / dock / guide 三者入场（headerIn/dockIn/guideIn）
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
      // 解锁滚动并强制回顶。
      // 正常路径下（is-intro 生效期间锁了滚动）位置本就是 0，这里是双保险：
      // 覆盖浏览器"刷新后恢复上次滚动位置"的情况。必须显式 instant ——
      // 站点有 scroll-behavior:smooth，否则回顶会变成一段长动画。
      document.body.classList.remove('is-intro');
      window.scrollTo({top:0,behavior:'instant'});
      header?.classList.add('is-visible');
      stationIndex?.classList.add('is-visible');
      /* 背景音乐起播。此刻用户刚点过启动页（或跳过），属于用户手势之后的
         播放，不会被自动播放策略拦。被拦下也静默降级，不打断主线。 */
      $('#bgm')?.play().catch(() => {});
      // 只让首屏（#about）的 reveal 元素立即可见（启动页 → 主站的衔接）
      // 其他区块（internship/projects/...）保留 IntersectionObserver 滚动揭示
      $$('#about .reveal').forEach(el=>el.classList.add('is-visible'));
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
     停在 opacity:0。

     ⚠️ 启动页展示期间**跳过 #about 的 reveal**。
     #about 就在首屏，只是被 position:fixed 的启动页盖着 ——
     IntersectionObserver 在 DOM ready 那一刻就判定它"可见"并加上 is-visible，
     于是展柜开帘 / 首屏入场动画全部在启动页遮罩后面播完，
     用户点进来只看到已经展开的静态画面（动画"消失"）。
     交给 leaveIntro 在 T=1100（启动页真正隐藏时）再点亮。 */
  function observeReveals(){
    if(!revealObserver) return;
    const introShowing = document.body.classList.contains('is-intro');
    $$('.reveal:not(.is-observed)').forEach(el => {
      if(introShowing && el.closest('#about')) return;
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
      // 原先这里会 unlockSignal(tabs[idx].dataset.signal) ——
      // 5 信号体系已废弃（并入 .station-index），故删除该调用。
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

  /* ---------- 信号收集 → 已并入 .station-index ----------
     原先的 5 信号体系（origin/builder/leader/maker/future + 5 指示点 +
     unlockSignal + initSignalAutoUnlock + .unlock-toast 弹窗）是旧版站点
     叙事的产物：页面只有 5 个区块，且靠滚动逐个"解锁"。
     现在页面是 9 个区块，那套 5 对 9 的映射既不完整也无依据
     （同样是"挑一部分高亮"），故整体废弃 —— 进度改由站台索引自身承载
     （当前项高亮 + 到过的项点亮 + 圆钮滚动进度环）。 */

  /* ---------- Quick Stats 数字滚动 ---------- */
  function initCountUp(){
    /* 选择器从 `.about-stats strong[data-count]` 放宽为 `[data-count]` ——
       data-count 只有两处消费者：#about 数据带的 4 个 KPI、
       #skills 的 18 个技能百分比（.skill-pct）。
       两者的结构契约一致（元素内含纯数字；KPI 额外含 <small> 尾标，
       由下面的 querySelector('small') 保住）。 */
    const stats = $$('[data-count]');
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
  /* initMiniGuide 已删除 —— 左下角快速导航整体并入 .station-index
     （展开/收起、点外部关闭、点项关闭的逻辑都在 initStationIndex 里）。 */

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
      // 移除聚焦态。**必须限定到 section** —— 原先写的是全站
      // `$$('.is-active')`，它假设 is-active 只有 section 聚焦态在用；
      // 但 .sky-star 的选中态也是 is-active，全站清场会把它一起抹掉
      // （表现为：开一次灯箱，星点选中就没了）。
      $$('main > section.is-active').forEach(s => s.classList.remove('is-active'));
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

  /* ---------- 详情证据墙：Photo Wall（奖状 / 经历 × 横版 / 竖版） ---------- */
  function initGallery(){
    const wall = $('.photo-wall');
    if(!wall) return;

    /* 展品号跨组连续（01..33），与 lightbox / 展签编号一致 */
    let seq = 0;

    wall.innerHTML = GALLERY_KINDS.map(kind => {
      const owned = GALLERY_ITEMS.filter(it => it.kind === kind.key);
      if(!owned.length){ console.warn('Gallery 分组为空：', kind.key); return ''; }

      const rows = GALLERY_ORIENTS.map(orient => {
        const items = owned.filter(it => it.orient === orient.key);
        if(!items.length) return '';
        const cards = items.map((it, i) => {
          const img = it.img;
          seq += 1;
          const no = String(seq).padStart(2,'0');
          const cls = orient.key === 'portrait' ? 'is-portrait' : 'is-landscape';
          /* --i 取模 8：每排重新起一次 stagger 波，避免 33 项累计出 2s 的尾巴 */
          return `<button class="photo-card ${cls} reveal" type="button"
                  data-img-id="${img.id}" data-caption="${img.caption}"
                  data-cat="${img.category}" data-no="${no}"
                  style="--i:${i % 8}"
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
        return `<div class="mu-wall-sub">
            <span class="mu-wall-sub-label">${orient.label} · ${items.length} 件</span>
            <div class="mu-wall-row" data-orient="${orient.key}">${cards}</div>
          </div>`;
      }).join('');

      return `<div class="mu-wall-group" data-kind="${kind.key}">
          <header class="mu-wall-head">
            <span class="mu-no">${kind.no}</span>
            <h3>${kind.label}</h3>
            <b>${owned.length} 件</b>
          </header>
          ${rows}
        </div>`;
    }).join('');

    observeReveals();
    wall.addEventListener('click', e => {
      const btn = e.target.closest('.photo-card');
      if(!btn) return;
      openLightbox(btn.dataset.imgId, btn.dataset.caption);
    });
  }

  /* ---------- 星座实验室：5 大分类星点 ---------- */
  /* ---------- 星座图：33 张履历 = 6 个星座 ----------
     取代原「5 大分类导览图」。原设计有两处问题：
       1. 视觉双写 —— canvas 画的 5 个分类节点 与 5 个 S-01~S-05 站点标记
          是同一批东西的两套画法，且互不对应，看起来像散落的杂讯。
       2. 覆盖漏洞 —— 原 CONSTELLATION_NODES 只有 5 项，漏掉了最大的一类
          competition（13 张，占 39%），那 13 张图在本区块根本进不去。
     现在星点直接由 IMG_CATALOG 按 category 派生（单一真相源），33 张一张不少。

     排布：每个分类占星空里的一「星座区」，区内星点用黄金角螺旋
     （phyllotaxis）确定性散布 —— 不用 Math.random，否则每次刷新星座形状都变。
     连线：同区内每颗星连到最近的 1-2 颗（张数多时连 2 条，免得 13 颗太稀疏），
     线的透明度随距离衰减（远则淡出），这是本项目 cosmos-canvas 已验证的手法。 */

  /* 各分类的星座区：中心 + 椭圆半径（百分比坐标）。半径按张数缩放。 */
  const SKY_ZONES = {
    competition:{ cx:23, cy:29, rx:17, ry:15 },   /* 13 张，最大 */
    campus:     { cx:67, cy:22, rx:14, ry:13 },   /* 7 张 */
    project:    { cx:44, cy:56, rx:12, ry:11 },   /* 4 张 */
    practice:   { cx:80, cy:55, rx:12, ry:11 },   /* 4 张 */
    startup:    { cx:20, cy:73, rx:12, ry:11 },   /* 4 张 */
    ip:         { cx:60, cy:84, rx:0,  ry:0  }    /* 1 张 —— 孤星 */
  };

  function initConstellation(){
    const sky = $('.sky');
    if(!sky) return;
    const svg       = $('.sky-lines', sky);
    const legendBox = $('.sky-legend', sky);
    const detail = {
      box:   $('.sky-plate'),
      cat:   $('#star-category'),
      title: $('#star-title'),
      result:$('#star-result'),
      open:  $('.star-open')
    };

    /* 按 category 分组 —— 星点由 IMG_CATALOG 派生，不再手工维护节点表 */
    const groups = {};
    IMG_CATALOG.forEach(img => {
      (groups[img.category] = groups[img.category] || []).push(img);
    });

    const rnd = mulberry32(0x0324);              /* 确定性伪随机 */
    const GA  = Math.PI * (3 - Math.sqrt(5));    /* 黄金角 */

    /* 1. 星点坐标 */
    const stars = [];
    Object.keys(groups).forEach(cat => {
      const z = SKY_ZONES[cat];
      if(!z){ console.error('⚠️ 星空缺少分类配置，该类星点会消失：', cat); return; }
      const arr = groups[cat], n = arr.length;
      arr.forEach((img, i) => {
        let x = z.cx, y = z.cy;
        if(n > 1){
          const t = Math.sqrt((i + 0.5) / n);          /* 螺旋：外圈越疏 */
          const a = i * GA;
          x = z.cx + z.rx * t * Math.cos(a) + (rnd() - .5) * z.rx * .24;
          y = z.cy + z.ry * t * Math.sin(a) + (rnd() - .5) * z.ry * .24;
        }
        stars.push({ img, cat, x, y });
      });
    });

    /* 2. 星座线：同区内每颗星连到最近的 k 颗 */
    const edges = [], seen = new Set();
    Object.keys(groups).forEach(cat => {
      const mine = stars.filter(s => s.cat === cat);
      if(mine.length < 2) return;                     /* 孤星不连线 */
      const k = mine.length > 8 ? 2 : 1;
      mine.forEach((a, i) => {
        mine.map((b, j) => ({ j, d: Math.hypot(a.x - b.x, a.y - b.y) }))
            .filter(o => o.j !== i)
            .sort((p, q) => p.d - q.d)
            .slice(0, k)
            .forEach(o => {
              const key = [a.img.id, mine[o.j].img.id].sort().join('|');
              if(seen.has(key)) return;
              seen.add(key);
              edges.push({ a, b: mine[o.j], d: o.d, cat });
            });
      });
    });

    if(svg){
      svg.setAttribute('viewBox', '0 0 100 100');
      const NS = 'http://www.w3.org/2000/svg';
      edges.forEach(e => {
        const ln = document.createElementNS(NS, 'line');
        ln.setAttribute('x1', e.a.x.toFixed(2));
        ln.setAttribute('y1', e.a.y.toFixed(2));
        ln.setAttribute('x2', e.b.x.toFixed(2));
        ln.setAttribute('y2', e.b.y.toFixed(2));
        ln.setAttribute('vector-effect', 'non-scaling-stroke');  /* 1px 发丝线 */
        ln.setAttribute('stroke', CAT_COLORS[e.cat] || '#fff');
        /* 透明度随距离衰减：远则淡出，避免视觉噪声 */
        ln.setAttribute('stroke-opacity', Math.max(.1, Math.min(.45, .62 - e.d / 110)).toFixed(2));
        svg.appendChild(ln);
      });
    }

    /* 3. 星点（真实可点元素，不是 canvas 画上去的 —— 这样有 hover / 焦点 / 无障碍） */
    stars.forEach(s => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'sky-star';
      btn.style.setProperty('--x', s.x.toFixed(2) + '%');
      btn.style.setProperty('--y', s.y.toFixed(2) + '%');
      btn.style.setProperty('--cat-color', CAT_COLORS[s.cat] || '');
      btn.dataset.imgId = s.img.id;
      btn.dataset.cat = s.cat;
      btn.dataset.caption = s.img.caption;
      btn.setAttribute('aria-label', `${categoryLabel(s.cat)} · ${s.img.caption}`);
      btn.innerHTML = '<i></i>';
      btn.addEventListener('click', () => selectStar(s, btn));
      sky.appendChild(btn);
      s.el = btn;
    });

    /* 4. 图例（6 个分类 + 颜色 + 张数） */
    if(legendBox){
      legendBox.innerHTML = Object.keys(groups).map(cat =>
        `<span class="sky-leg" data-cat="${cat}"><i style="background:${CAT_COLORS[cat] || '#fff'}"></i>${categoryLabel(cat)}<b>${groups[cat].length}</b></span>`
      ).join('');
    }

    /* 5. 交互：点星点 → 换展签（不直接弹灯箱，看展节奏是先读签再决定） */
    let current = null;
    function paint(s){
      if(detail.box)    detail.box.style.setProperty('--cat-color', CAT_COLORS[s.cat] || '');
      if(detail.cat)    detail.cat.textContent    = categoryLabel(s.cat) + ' · ' + s.img.year;
      if(detail.title)  detail.title.textContent  = s.img.caption;
      if(detail.result) detail.result.textContent = tierLabel(s.img.tier);
      current = { imgId: s.img.id, caption: s.img.caption };
    }
    function selectStar(s, btn){
      stars.forEach(o => o.el && o.el.classList.remove('is-active'));
      if(btn) btn.classList.add('is-active');
      /* 换牌过渡：先压暗，140ms 后换文本再恢复 —— 像展签被重新打印 */
      if(detail.box) detail.box.classList.add('is-swapping');
      setTimeout(() => {
        paint(s);
        if(detail.box) detail.box.classList.remove('is-swapping');
      }, 140);
    }

    const first = stars[0];
    if(first){ paint(first); if(first.el) first.el.classList.add('is-active'); }

    if(detail.open){
      detail.open.addEventListener('click', () => {
        if(current) openLightbox(current.imgId, current.caption);
      });
    }
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

  /* ---------- 站台索引：展开/收起 + 当前区块跟踪 + 切换反馈 ----------
     合并了原 mini-guide（左下 9 链接）与 signal-station（右下 5 信号按钮）——
     两者是同一件事的两种视角，且 767 断点下位置完全相同（都拿到
     left:12px / right:12px / bottom:12px）会互相盖住。

     设计要点：
       · 收起态圆钮显示「当前区块编号」，外圈是整页滚动进度环
       · 展开态 9 项纵向索引，当前项高亮、到过的项点亮（is-visited）
       · 切换反馈内化在控件自身（is-confirm 脉冲），不再有跨屏弹窗
       · 播报走 aria-live（本项目原先零 aria-live） */
  function initStationIndex(){
    const root = $('.station-index');
    if(!root) return;
    const handle   = $('.si-handle', root);
    const panel    = $('.si-panel', root);
    const closeBtn = $('.si-close', root);
    const live     = $('.si-live', root);
    const nowEl    = $('.si-now', root);
    const ring     = $('.si-ring-fill', root);
    const items    = $$('.si-item', root);
    if(!handle || !panel || !items.length) return;

    const SECS = items.map(a => (a.getAttribute('href') || '').slice(1));
    const visited = new Set();
    let current = -1, closeTimer = 0;
    /* hover 预览 + 点击钉住。
       原先只有 hover 自动开 + click 纯 toggle，两者会打架：鼠标移到 handle 上
       面板自己开了，用户再点一下（自然动作）就被 toggle 关掉 ——
       表现为"点不开"，而且音量控件就在面板里，直接影响可用性。
       现在 click 是"钉住"语义：未钉住时点一下钉住（鼠标移开也不收），
       已钉住再点才收；从未点过则保持 hover 预览、移开自动收。 */
    let pinned = false;

    const open  = () => { clearTimeout(closeTimer); root.classList.add('is-open');
                          handle.setAttribute('aria-expanded','true'); };
    const close = () => { pinned = false; root.classList.remove('is-open');
                          handle.setAttribute('aria-expanded','false'); };

    handle.addEventListener('click', e => {
      e.stopPropagation();
      if(pinned){ close(); } else { pinned = true; open(); }
    });
    closeBtn?.addEventListener('click', close);
    // 桌面 hover 预览；移开后延时收起，给鼠标移到面板上的时间
    handle.addEventListener('mouseenter', () => { if(!pinned) open(); });
    root.addEventListener('mouseenter', () => clearTimeout(closeTimer));
    root.addEventListener('mouseleave', () => {
      if(pinned) return;                       // 已钉住 → 移开也不收
      closeTimer = setTimeout(close, 220);
    });
    document.addEventListener('click', e => { if(!root.contains(e.target)) close(); });
    document.addEventListener('keydown', e => { if(e.key === 'Escape') close(); });

    function setCurrent(i, announce){
      if(i === current) return;
      const prev = current;
      current = i;
      visited.add(i);
      items.forEach((a, k) => {
        a.classList.toggle('is-current', k === i);
        a.classList.toggle('is-visited', visited.has(k));
        if(k === i) a.setAttribute('aria-current','true'); else a.removeAttribute('aria-current');
      });
      const noEl = items[i].querySelector('.si-no');
      if(nowEl && noEl) nowEl.textContent = noEl.textContent;
      if(announce && prev !== -1 && live){
        const nameEl = items[i].querySelector('.si-name');
        live.textContent = `已切换至 ${noEl ? noEl.textContent : ''} ${nameEl ? nameEl.textContent : ''}`;
      }
    }

    // 当前区块 = 顶边已越过「顶栏 + 余量」的最后一个区块。
    // 贴底时强制认定最后一个，否则最后一屏永远高亮不到。
    function syncCurrent(){
      const y = window.scrollY + (($('.site-header')?.offsetHeight || 80) + 24);
      let idx = 0;
      SECS.forEach((id, i) => {
        const sec = document.getElementById(id);
        if(sec && sec.offsetTop <= y) idx = i;
      });
      if(window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) idx = SECS.length - 1;
      setCurrent(idx, false);
    }
    function syncRing(){
      const max = document.body.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if(ring) ring.style.strokeDashoffset = String(100 - p * 100);
    }

    let ticking = false;
    function onScroll(){
      if(ticking) return;
      ticking = true;
      requestAnimationFrame(() => { syncCurrent(); syncRing(); ticking = false; });
    }
    window.addEventListener('scroll', onScroll, { passive:true });
    window.addEventListener('resize', onScroll, { passive:true });

    // 点击索引项：走原生锚点（顶栏偏移由 scroll-margin-top 处理），
    // 控件自身给一次确认脉冲 + 目标区块脉冲 + 读屏播报
    items.forEach((a, i) => {
      a.addEventListener('click', () => {
        setCurrent(i, true);
        root.classList.add('is-confirm');
        setTimeout(() => root.classList.remove('is-confirm'), 460);
        const target = document.getElementById(SECS[i]);
        if(target){
          target.classList.add('is-pulse-target');
          setTimeout(() => target.classList.remove('is-pulse-target'), 1600);
        }
        close();
      });
    });

    syncCurrent();
    syncRing();
  }

  /* ---------- 同类联动：hover 一张 → 同类高亮、异类降透明度 ---------- */
  function initCategoryLink(){
    const targets = '.photo-card, .archive-item, .sky-star';

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
    const clearLink = () => {
      document.body.classList.remove('category-linking');
      $$(targets).forEach(node => node.classList.remove('is-related'));
    };

    document.body.addEventListener('mouseout', e => {
      const el = e.target.closest(targets);
      if(!el) return;
      // 检查鼠标是否真的移到了外部（不是移到子元素）
      const related = e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest(targets);
      if(related) return;
      clearLink();
    });

    /* 兜底：mouseover / mouseout 在滚动、DOM 变化、窗口失焦等情况下未必配对
       出现。一旦漏掉 mouseout，body 会永久带着 .category-linking，
       整个展墙/档案库/星点图会停在 .28 的压暗态且无法自行恢复。 */
    document.documentElement.addEventListener('mouseleave', clearLink);
    window.addEventListener('blur', clearLink);
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

  /* ---------- Canvas 节点图：已删除 ----------
     它只服务 .constellation-stage 的叠加层。星座图改版后（星点改为真实的
     HTML button + SVG 连线），canvas 成了「视觉双写」—— 与站点标记画的是
     同一批分类却互不对应，读起来像散落的杂讯，故整体移除。
     drawNetwork / initNodeCanvas 一并删除；mulberry32 保留（星点排布在用）。
     .constellation-bg-canvas 的 CSS 随之删除。 */

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
    // 移除聚焦态。**必须限定到 section** —— 见 initAwards 里同处的说明：
    // 全站 `$$('.is-active')` 会连带抹掉 .sky-star 的选中态。
    $$('main > section.is-active').forEach(s => s.classList.remove('is-active'));
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

  /* ---------- 序厅展柜：整柜即按钮，点击看肖像原图 ----------
     展柜在 HTML 里已是 <button>，故 Enter / Space 原生可用，无需补键盘处理。
     此前它是纯文本 div 且未设 user-select —— 点上去会划选文字、看着像能编辑。 */
  function initVitrine(){
    const btn = $('.mu-vitrine');
    if(!btn) return;
    btn.addEventListener('click', () => {
      openLightbox(PORTRAIT_IMG.id, PORTRAIT_IMG.caption);
    });
  }

  /* ---------- 键盘快捷键 ---------- */
  /* initKeys 已删除 —— 它唯一的工作是给 mini-menu 处理 ESC，
     该逻辑已并入 initStationIndex（ESC 关闭站台索引）。 */

  /* ---------- 数量注入：消除正文里的硬编码数字 ----------
     原先文案写死「12 MEMORY FRAMES」「所有 33 张图」，但 ARCHIVE_GROUPS 实际
     只有 31 项（分组间有重叠，去重后才覆盖 33 张）—— 改数组即失同步。
     HTML 里保留当前值作为占位，no-JS 下也正确。 */
  function initCounters(){
    const set = (sel, n) => $$(sel).forEach(el => { el.textContent = n; });
    set('[data-count-total]',   IMG_CATALOG.length);
    set('[data-count-gallery]', IMG_CATALOG.length);
    set('[data-count-archive]', ARCHIVE_GROUPS.reduce((a, g) => a + g.imgIds.length, 0));
  }

  /* ---------- 背景音乐 ----------
     起播时机在 leaveIntro（点启动页进入主站）—— 那是一次用户手势，
     之后的 play() 不会被浏览器自动播放策略拦下。
     音量控件在站台索引面板里（项目禁令 3：不新增 fixed 装饰层），
     音量与静音状态持久化到 localStorage，与 initTheme 同一套做法。 */
  const BGM_KEY = 'lzy-bgm-vol';
  let bgmLastVol = 0.35;
  function initBgm(){
    const audio = $('#bgm');
    if(!audio) return;
    const muteBtn = $('.si-mute');
    const range   = $('.si-range');
    const pctEl   = $('.si-vol-pct');

    let vol;
    try{ vol = parseFloat(localStorage.getItem(BGM_KEY)); }catch(e){}
    if(!(vol >= 0 && vol <= 1)) vol = 0.35;      // 首次访问 / 存储损坏都回落到默认
    if(vol > 0) bgmLastVol = vol;

    function apply(save){
      audio.volume = vol;
      audio.muted  = vol === 0;                  // volume=0 在部分浏览器不静音，显式 muted
      const p = String(Math.round(vol * 100));
      if(range)   range.value = p;
      if(pctEl)   pctEl.textContent = p;
      if(muteBtn) muteBtn.setAttribute('aria-pressed', vol === 0 ? 'true' : 'false');
      if(save){ try{ localStorage.setItem(BGM_KEY, String(vol)); }catch(e){} }
    }
    apply(false);

    range?.addEventListener('input', () => {
      vol = Math.min(1, Math.max(0, parseFloat(range.value) / 100));
      if(vol > 0) bgmLastVol = vol;
      apply(true);
    });
    muteBtn?.addEventListener('click', () => {
      vol = vol > 0 ? 0 : (bgmLastVol || 0.35);  // 记住静音前的音量，取消静音时还原
      apply(true);
    });
  }

  /* ---------- 启动 ---------- */
  onReady(()=>{
    initCounters();
    initCanvas();
    initReveal();
    initInternshipTabs();
    initCountUp();
    initTheme();
    initMobileMenu();
    initScrollSpy();
    initAwards();
    initGallery();
    initConstellation();
    initArchive();
    initVitrine();
    initProjectMedia();
    initInternshipMedia();
    initLightbox();
    initStationIndex();     // 合并原 initMiniGuide + initSignalDockClick + initKeys
    initBgm();              // 背景音乐音量（起播在 leaveIntro）
    initCategoryLink();
    // 关键：JS 注入的 .reveal 需补 observe（晚于滚动 reveal 初始化）
    observeReveals();
  });

})();