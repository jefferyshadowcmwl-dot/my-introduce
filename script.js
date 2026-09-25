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
     履历图（不含 liuzhiyuan.jpg，那张保留给启动页 / #about 展柜）
     ======================================================================== */
  const IMG_CATALOG = [
    /* ---- 比赛获奖 (19) ---- */
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
    { id:'comp_2024_apply16_scene',file:'2024上海师范大学第16届上海市计算机能力大赛.jpg',              caption:'第 16 届上海市大学生计算机应用能力大赛 · 上师大现场', category:'competition', shot:'scene', year:'2024', tier:'city',     size:468907, aspect:'landscape' },
    { id:'comp_2025_school_gold',file:'2025上海杉达学院校赛金奖.jpg',                                  caption:'2025 上海杉达学院校赛 · 金奖',                   category:'competition', shot:'scene', year:'2025', tier:'school',   size:148040, aspect:'landscape' },
    { id:'comp_2025_intl_tong', file:'2025中国国际创新创业大赛上海市铜奖.jpg',                         caption:'中国国际创新创业大赛上海市 · 铜奖',             category:'competition', shot:'cert', year:'2025', tier:'city',     size:397882, aspect:'landscape' },
    { id:'comp_2026_school_te', file:'2026上海杉达学院校赛特等奖.jpg',                                 caption:'2026 上海杉达学院校赛 · 特等奖',                 category:'competition', shot:'scene', year:'2026', tier:'school',   size:230132, aspect:'landscape' },
    /* ↓ 下面 4 张的 caption / year 一律按**现场横幅实况**写，不照抄文件名 ——
       实测文件名有 3 处与现场不符（已在各条上注明）。 */
    { id:'comp_2023_design4c_person', file:'202316届中国计算机能力大赛个人照片.jpg',                   caption:'第 16 届中国大学生计算机设计大赛 · 扬州现场（个人）', category:'competition', shot:'scene', year:'2023', tier:'national', size:238503, aspect:'landscape' },
    { id:'comp_2023_design4c_vision', file:'2024扬州大学智能视觉比赛现场.jpg',                         caption:'第 16 届中国大学生计算机设计大赛 · 智能视觉赛场',     category:'competition', shot:'scene', year:'2023', tier:'national', size:385441, aspect:'landscape' },
    { id:'comp_2023_apply15_group',   file:'上海海洋大学计算机能力大赛比赛现场.jpg',                    caption:'第 15 届上海市大学生计算机应用能力大赛 · 合影',      category:'competition', shot:'scene', year:'2023', tier:'city',     size:345914, aspect:'landscape' },
    { id:'comp_2024_intl_ujs',        file:'2024交通大学中国国际大学生创新创业大赛.jpg',               caption:'中国国际大学生创新大赛 · 上海赛区决赛（交大）',      category:'competition', shot:'scene', year:'2024', tier:'city',     size:294735, aspect:'landscape' },
    { id:'comp_2024_chuangzaobei2',   file:'上海第二工业大学挑战杯二等奖.jpg',                          caption:'2024 年「创造杯」上海第二工业大学校赛 · 二等奖（智联工翼）', category:'competition', shot:'cert', year:'2024', tier:'school', size:141422, aspect:'landscape' },

    /* ---- 校园活动 (8) ---- */
    { id:'campus_top10',         file:'校园十大杰出人物.jpg',                                          caption:'校园十大杰出人物',                                 category:'campus',      shot:'scene', year:'2024', tier:'school',   size: 98976, aspect:'landscape'  },
    { id:'campus_chairman',      file:'程序设计设社长.jpg',                                            caption:'程序设计社社长 · 社团建设',                       category:'campus',      shot:'scene', year:'2024', tier:'school',   size:438052, aspect:'landscape'  },
    { id:'campus_paddle_1',      file:'百度paddlepaddle领航团团长.jpg',                                caption:'百度 PaddlePaddle 领航团 · 团长 1',               category:'campus',      shot:'scene', year:'2024', tier:'school',   size:166648, aspect:'landscape' },
    { id:'campus_paddle_2',      file:'百度paddlepaddle领航团团长2.jpg',                               caption:'百度 PaddlePaddle 领航团 · 团长 2',               category:'campus',      shot:'scene', year:'2024', tier:'school',   size:175784, aspect:'landscape' },
    { id:'campus_paddle_1024',   file:'1024百度paddlepaddle领航团程序员节.jpg',                        caption:'1024 百度 PaddlePaddle 领航团 · 程序员节',       category:'campus',      shot:'scene', year:'2024', tier:'school',   size:145249, aspect:'landscape' },
    { id:'campus_biye_2025',     file:'2025上海杉达学院本科毕业生.jpg',                                caption:'2025 上海杉达学院 · 本科毕业',                    category:'campus',      shot:'scene', year:'2025', tier:'school',   size:272647, aspect:'landscape'  },
    { id:'campus_yanjiusheng_2026',file:'26届上海杉达学院研究生.jpg',                                  caption:'第 26 届上海杉达学院研究生 · 录取',               category:'campus',      shot:'scene', year:'2026', tier:'school',   size:342839, aspect:'landscape' },
    /* 画面是杉达校园的文创路牌（「向星辰许愿 在杉达见面」等），
       文件名写「校园外送到寝服务」与画面不符 —— 按画面写 caption；
       它同时是 #projects 第 6 张卡（校园外送到寝服务）的配图。 */
    { id:'campus_sanda_signs',   file:'校园外送到寝服务.jpg',                                          caption:'上海杉达学院 · 校园文创路牌',                     category:'campus',      shot:'scene', year:'',     tier:'school',   size:266759, aspect:'landscape' },

    /* ---- 实践活动 (5) ---- */
    { id:'practice_efg_base',    file:'2024研究生EFG夏令营孵化基地.jpg',                                caption:'2024 研究生 EFG 夏令营 · 孵化基地',               category:'practice',    shot:'scene', year:'2024', tier:'province', size:222426, aspect:'landscape' },
    { id:'practice_efg_group',   file:'2024研究生EFG夏令营孵化基地第七小组.jpg',                       caption:'2024 研究生 EFG 夏令营 · 第七小组',               category:'practice',    shot:'scene', year:'2024', tier:'province', size:264460, aspect:'landscape' },
    { id:'practice_luntan',      file:'上海民办高校科技论坛.jpg',                                      caption:'上海民办高校科技论坛',                             category:'practice',    shot:'scene', year:'2024', tier:'city',     size:214271, aspect:'landscape' },
    { id:'practice_speech_zhongshan',file:'中山北路小学演讲.jpg',                                       caption:'中山北路小学 · 人工智能科普讲座',                 category:'practice',    shot:'scene', year:'',     tier:'school',   size:411464, aspect:'landscape' },
    { id:'practice_speech_wuning',   file:'武宁路小学演讲.jpg',                                         caption:'武宁路小学 · 人工智能科普讲座',                   category:'practice',    shot:'scene', year:'',     tier:'school',   size:414404, aspect:'landscape' },

    /* ---- 创领创业 (13) ---- */
    { id:'startup_huangpu',      file:'创业黄浦一路繁花黄浦区创业三等级奖.jpg',                        caption:'创业黄浦 · 一路繁花黄浦区创业 · 三等奖',         category:'startup',     shot:'cert', year:'2024', tier:'city',     size:342924, aspect:'portrait' },
    { id:'startup_pudong_1',     file:'创领浦东创新大赛暨第六届上海浦东新区选拔赛青年新势力赛道一等奖奖.jpg',   caption:'创领浦东 · 青年新势力赛道 · 一等奖',         category:'startup',     shot:'cert', year:'2024', tier:'city',     size:321768, aspect:'portrait' },
    { id:'startup_pudong_2',     file:'创领浦东创新大赛暨第六届上海浦东新区选拔赛青年新势力赛道一等奖奖与奖杯.jpg', caption:'创领浦东 · 一等奖与奖杯',                category:'startup',     shot:'cert', year:'2024', tier:'city',     size:239525, aspect:'landscape' },
    { id:'startup_tongji',       file:'同济大学全国大学生创业计划一等奖.jpg',                          caption:'同济大学全国大学生创业计划 · 一等奖',             category:'startup',     shot:'cert', year:'2024', tier:'national', size:200429, aspect:'portrait' },
    { id:'startup_zhiteng_co',      file:'上海致远鲸腾信息有限公司.jpg',         caption:'上海致远鲸腾信息有限公司 · 团队',     category:'startup', shot:'scene', year:'',     tier:'private', size:172804, aspect:'landscape' },
    { id:'startup_zhiteng_license', file:'上海致远鲸腾信息有限公司营业执照.jpg', caption:'上海致远鲸腾信息有限公司 · 营业执照', category:'startup', shot:'cert',  year:'2024', tier:'private', size:301219, aspect:'landscape' },
    /* 文件名是「妇联活动」，但现场易拉宝是本品牌摊位 —— caption 按图上实证写，
       不按文件名。这条同时承担「音行三界」与「妇联市集」两个信息点。 */
    { id:'startup_yinxing_sanjie',  file:'上海市浦东新区妇联活动.jpg',           caption:'音行三界 · 浦聚未来女性智创市集',     category:'startup', shot:'scene', year:'',     tier:'city',    size:310331, aspect:'portrait'  },
    /* 创燃工作室 —— 灯光画产品线（3 张） */
    { id:'startup_chuangran_project',file:'2025年创燃工作室灯光画项目.jpg',      caption:'创燃工作室 · 灯光画项目',             category:'startup', shot:'scene', year:'2025', tier:'private', size:225140, aspect:'landscape' },
    { id:'startup_chuangran_sample', file:'2025年创燃工作室灯光画摆摊样品测试.jpg',caption:'创燃工作室 · 样品点亮测试',          category:'startup', shot:'scene', year:'2025', tier:'private', size:126685, aspect:'landscape' },
    /* 注意：这个文件名末尾有一个空格，是原样保留的 —— 改名要同步这里。 */
    { id:'startup_chuangran_booth',  file:'2025年创燃工作室灯光画摆摊现场 .jpg', caption:'创燃工作室 · 摊位成品展示',          category:'startup', shot:'scene', year:'2025', tier:'private', size:144172, aspect:'landscape' },
    /* 创新创业赛事现场（2 张）—— caption 按现场横幅实况 */
    { id:'startup_wujiaochang_2024', file:'上海理工大学杨浦区创新创业决赛现场.jpg',caption:'2024 五角场创新创业大赛（高校组）· 决赛现场', category:'startup', shot:'scene', year:'2024', tier:'city', size:236947, aspect:'portrait' },
    { id:'startup_pudong_ust_2024',  file:'创领浦东上海科技大学决赛现场.jpg',    caption:'创领浦东 · 青年新势力赛道 · 上科大决赛评选', category:'startup', shot:'scene', year:'2024', tier:'city', size:293941, aspect:'landscape' },
    { id:'startup_huangpu_roadshow', file:'黄埔创新创业初赛决赛.jpg',            caption:'黄浦创卡 · 大学生创新大赛 · 路演现场',  category:'startup', shot:'scene', year:'',     tier:'city', size:229938, aspect:'landscape' },

    /* ---- 项目开发 (9) ---- */
    { id:'project_zhilian_1',    file:'智联工翼开发过程1.jpg',                                          caption:'智联工翼 · 开发过程 1',                           category:'project',     shot:'scene', year:'2024', tier:'private',  size:305191, aspect:'portrait' },
    { id:'project_zhilian_2',    file:'智联工翼开发过程2.jpg',                                          caption:'智联工翼 · 开发过程 2',                           category:'project',     shot:'scene', year:'2024', tier:'private',  size:421034, aspect:'portrait' },
    { id:'project_zhilian_3',    file:'智联工翼开发过程3.jpg',                                          caption:'智联工翼 · 开发过程 3',                           category:'project',     shot:'scene', year:'2024', tier:'private',  size:168078, aspect:'landscape' },
    { id:'project_zhilian_gen2', file:'智联工翼第二代产品图.jpg',                                        caption:'智联工翼 · 第二代产品',                           category:'project',     shot:'scene', year:'',     tier:'private',  size:193798, aspect:'portrait' },
    { id:'project_zhilian_defense',file:'上海第二工业大学挑战杯答辩.jpg',                                caption:'智联工翼 · 挑战杯答辩（第二工业大学）',           category:'project',     shot:'scene', year:'',     tier:'private',  size:156354, aspect:'landscape' },
    /* 原 id 是 practice_zhiteng —— 文件名像「致远鲸腾公司」，打开实为
       「智联工翼-smartnexus」项目海报（顶部「青年新势力赛道—02」）。
       它被错标成「致远鲸腾 · 实习 / 2023」并挂在实习区鸿惊科技面板上，
       而致远鲸腾成立于 2024-04-23，2023 年不可能在此实习。
       现改注为项目海报、归 project、年份改 2024（与同赛事的 startup_pudong_1 一致）。 */
    { id:'project_zhilian_poster',file:'上海致远鲸腾信息有限公式.jpg',                                   caption:'智联工翼 · 青年新势力赛道 项目海报',              category:'project',     shot:'scene', year:'2024', tier:'private',  size: 62467, aspect:'portrait' },
    { id:'project_vision_debug',   file:'2025南京大学智能视觉比赛现场.jpg',                             caption:'智能视觉调试现场 · 机械臂取放',                   category:'project',     shot:'scene', year:'2025', tier:'private',  size:253096, aspect:'landscape' },
    { id:'project_sensetime_case', file:'产教合作商汤linux机箱.jpg',                                     caption:'商汤产教合作 · Linux 边缘设备机箱',                category:'project',     shot:'scene', year:'',     tier:'private',  size:240485, aspect:'portrait' },
    { id:'project_sensetime_lab',  file:'商汤李宝祥博士合作场景.jpg',                                     caption:'商汤产教合作 · 实验室联合调试',                    category:'project',     shot:'scene', year:'',     tier:'private',  size:226635, aspect:'portrait' },

    /* ---- 峰会演讲 (5) ----
       新增分类。category 直接派生星座图（多一个星座）与库房分组，
       故 categoryLabel / CAT_COLORS / SKY_ZONES / ARCHIVE_GROUPS /
       ARCHIVE_ACCENTS 与 styles.css 的 [data-cat] [data-accent] 要一起加。 */
    { id:'talk_2026_huawei',     file:'2026华为开发者大会.jpg',        caption:'2026 华为开发者大会',            category:'talk', shot:'scene', year:'2026', tier:'national', size:373643, aspect:'landscape' },
    { id:'talk_2026_amazon',     file:'2026亚马逊峰会.jpg',            caption:'2026 亚马逊峰会',                category:'talk', shot:'scene', year:'2026', tier:'intl',     size:431535, aspect:'landscape' },
    { id:'talk_2026_baidu',      file:'百度ai时代智能制造.jpg',        caption:'AI 时代「智能制造」数字营销峰会', category:'talk', shot:'scene', year:'2026', tier:'national', size:283089, aspect:'landscape' },
    /* 现场背景屏上的曲目名是 2021，那是屏幕播的内容、不是活动年份，故 year 留空。 */
    { id:'talk_comic_1000',      file:'1000人漫展峰会.jpg',            caption:'1000 人漫展 · 现场合影',          category:'talk', shot:'scene', year:'',     tier:'city',     size:115400, aspect:'landscape' },
    /* 证据类：现场展板写的是「第十八届全国大学生创新年会」，非「创新创业年会」——
       caption 按展板原字写。 */
    { id:'talk_2025_annual_meet',file:'2025年第十八届全国大学生创新创业年会.jpg', caption:'第十八届全国大学生创新年会 · 改革成果展示', category:'talk', shot:'scene', year:'2025', tier:'national', size:434113, aspect:'landscape' },

    /* ---- 知识产权 (4) ---- */
    { id:'ip_ruanzhuquan',       file:'软件著作权.jpg',                                                  caption:'基于 OpenCV + Django 的上位机软件 · 软著',        category:'ip',          shot:'cert', year:'2024', tier:'national', size:304300, aspect:'portrait' },
    /* ⚠️ 证书载明：发明人 **赖哲浩**、专利权人 **上海鸿惊智能科技有限公司**，
       申请日 2019-11-22、授权公告日 2020-08-25 —— **不是本人的发明**。
       caption 与荣誉卡一律据实标注，不认领他人成果。 */
    { id:'ip_zhuanli_arm',       file:'实用新型专利证书.jpg',                                            caption:'实用新型专利 · 工业机器人多方位转向抓取机械臂（公司持有）', category:'ip', shot:'cert', year:'2020', tier:'national', size:226582, aspect:'portrait' },
    /* Google Ads 双认证 —— 证书载明籤发 2025-01-24、**到期 2026-01-24**，
       即展示时已过期。caption 只陈述认证名，不写「有效」之类的时效暗示。 */
    { id:'ip_google_display',    file:'Google Ads Display Certification.jpg',                            caption:'Google Ads Display 认证',        category:'ip', shot:'cert', year:'2025', tier:'intl', size:53844, aspect:'landscape' },
    { id:'ip_google_shopping',   file:'google Al-Powered Shopping ads Certification.jpg',                caption:'Google Ads AI-Powered Shopping 认证', category:'ip', shot:'cert', year:'2025', tier:'intl', size:53294, aspect:'landscape' }
  ];
  const IMG_BY_ID = Object.fromEntries(IMG_CATALOG.map(x=>[x.id,x]));

  /* #about 序厅展柜的肖像 —— 刻意不进 IMG_CATALOG：
     它是启动页 / 展柜复用的门面照，不属于「履历证据」，
     进目录会让 data-count-gallery / -archive 等计数全部虚高。
     但要能被 openLightbox(id, caption) 查到，故单独登记进查找表。 */
  const PORTRAIT_IMG = { id:'portrait_lzy', file:'liuzhiyuan.jpg', caption:'刘致远 · ENGINEER 0324' };
  IMG_BY_ID[PORTRAIT_IMG.id] = PORTRAIT_IMG;

  /* 开发纪实影片 —— 刻意不进 IMG_CATALOG：那是「履历图」的计数源，
     mp4 混进去会让挂画墙分区（只认 shot=cert/scene）与总数一起虚高。
     独立表 + 共用 assetUrl()，走同一个 lightbox。 */
  const VIDEO_CATALOG = [
    { id:'video_zhilian', file:'智联工翼开发过程.mp4', caption:'智联工翼 · 开发过程实录', category:'project' },
    { id:'video_nju',     file:'南京大学开发视频.mp4',  caption:'南京大学 · 开发视频',     category:'project' }
  ];
  const VIDEO_BY_ID = Object.fromEntries(VIDEO_CATALOG.map(x => [x.id, x]));

  /* ---- 工具函数 ---- */
  const assetUrl       = img => 'assets/' + img.file;
  const findImg        = id => IMG_BY_ID[id] || null;
  const categoryLabel  = c => ({ competition:'创新创业', campus:'校园荣誉', project:'项目实践',
                                 practice:'实践探索', startup:'创领创业', talk:'峰会演讲',
                                 ip:'知识产权' })[c] || c;
  const tierLabel      = t => ({ school:'校级', city:'市级', province:'省级',
                                 national:'国家级', intl:'国际级', private:'项目' })[t] || t;
  /* 年份允许为空（新增素材里有多张无法确证年份）。直接模板拼接会渲染出
     「· 市级」「峰会演讲 · 」这类悬空分隔符，故统一走这里，空值整段省略。 */
  const joinMeta       = (...parts) => parts.filter(p => p !== '' && p != null).join(' · ');

  /* ========================================================================
     4 个绑定数组 — 驱动 5 大区块
     确保每张图都至少在一处被引用（覆盖率断言在底部）
     ======================================================================== */

  /* 9 张 award-card 与图片映射（解决 3 张无图痛点） */
  /* 荣誉区配图绑定 —— 每条最多两张：
       certId : 证书 / 奖状本体（详情弹层的主图，卡片里排第一）
       altId  : 第二张证据，通常是**参赛现场照**；也可能就是另一张证书
                （如 Google 双认证 = Display + AI-Powered Shopping 两张）
     顺序与荣誉区显示顺序一致（01 国赛 → 08 专利）。

     ⚠️ shangHaiSan（上海市计算机应用能力大赛）按用户要求**只放奖状、不放现场照**：
     它原先指向 comp_2023_15city（那是现场合影），已改用 comp_2024_apply3（第 16 届三等奖奖状）。
     ⚠️ shiXinZhuanLi：证书载明发明人是**赖哲浩**、专利权人是**上海鸿惊智能科技有限公司**，
     不是本人发明。配图据实展示，卡片文案也据实标注，不认领。 */
  const AWARD_BINDINGS = [
    { cardKey:'guoSaiEr',      certId:'comp_2023_design2',  altId:'comp_2023_design4c_vision' },  // 01 国赛二等奖
    { cardKey:'shangHaiSan',   certId:'comp_2024_apply3',   altId:'comp_2023_apply15_group'  },  // 02 市赛三等奖
    { cardKey:'shuangChuang',  certId:'comp_2024_intl_yin', altId:'comp_2024_intl_ujs'       },  // 03 双创银奖（旗舰）
    { cardKey:'puDongYi',      certId:'startup_pudong_1',   altId:'startup_pudong_ust_2024'  },  // 04 浦东一等奖
    { cardKey:'guoJiaLiXiang', certId:null,                 altId:'talk_2025_annual_meet'    },  // 05 国家级立项（无证书，用年会展示照）
    { cardKey:'ruanZhu',       certId:'ip_ruanzhuquan',     altId:null },                        // 06 软件著作权
    { cardKey:'googleAds',     certId:'ip_google_display',  altId:'ip_google_shopping' },        // 07 双认证 = 两张证书
    { cardKey:'shiXinZhuanLi', certId:'ip_zhuanli_arm',     altId:null }                         // 08 实用新型专利（公司持有）
  ];

  /* #gallery 挂画墙 —— 全部履历图，按「奖状 / 经历」拆两段，每段再按「横版 / 竖版」分两排。
     分组依据（用户诉求：奖状归奖状、经历归经历；横的一排、竖的一排）：
       奖状(cert)  —— 证书 / 奖状本体扫描件
       经历(scene) —— 现场合影、活动、开发过程
     具体张数不在此写死：它随 IMG_CATALOG 变化，写了就会漂移（历史上栽过）。
     两条纪律：
       · 分组读 IMG_CATALOG.shot，不读 category。category 分不出来 ——
         competition 里既有证书（2023年(第16届》…二等奖）也有现场合影（202316届…、
         202417届…现场 1/2、2026 校赛特等奖台上举证）。shot 是逐张看原图判定的。
       · 幅面读 IMG_CATALOG.aspect（已用 JPEG SOF 逐张核对真实像素，全部与渲染一致）。
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
     漏掉了最大的一类 competition —— 那些图在本区块进不去。
     派生后一张不少，且不再有第二处真相源。 */

  /* 大学游历 —— 行程线数据（#campus）
     「一次出行 = 一个站点」，按时间排。数据全部来自 IMG_CATALOG 里已有的 caption
     （扬州大学、上海海洋大学… 都是现场横幅/奖状上的真实校名），不额外编造。
     ⚠️ imgId 只作「查看该站点的图」用，站点本身不依赖它 —— 没有图的站点仍可渲染。 */
  const CAMPUS_TRAIL = [
    { date:'2023.05', city:'上海', uni:'上海海洋大学',     event:'第 15 届上海市大学生计算机应用能力大赛 · 合影', imgId:'comp_2023_apply15_group' },
    { date:'2023.08', city:'扬州', uni:'扬州大学',         event:'第 16 届中国大学生计算机设计大赛 · 智能视觉赛场', imgId:'comp_2023_design4c_vision' },
    { date:'2024.07', city:'上海', uni:'上海交通大学',     event:'中国国际大学生创新大赛 · 上海赛区决赛',          imgId:'comp_2024_intl_ujs' },
    { date:'2024',    city:'上海', uni:'上海师范大学',     event:'第 16 届上海市大学生计算机应用能力大赛 · 现场',  imgId:'comp_2024_apply16_scene' },
    { date:'2024',    city:'上海', uni:'上海科技大学',     event:'创领浦东 · 青年新势力赛道 · 决赛评选',           imgId:'startup_pudong_ust_2024' },
    { date:'2024',    city:'上海', uni:'上海理工大学',     event:'2024 五角场创新创业大赛（高校组）· 决赛',       imgId:'startup_wujiaochang_2024' },
    { date:'2024.10', city:'上海', uni:'上海第二工业大学', event:'「创造杯」校赛二等奖 · 挑战杯答辩',             imgId:'comp_2024_chuangzaobei2' },
    { date:'2024',    city:'上海', uni:'同济大学',         event:'全国大学生创业计划 · 一等奖',                   imgId:'startup_tongji' },
    { date:'2025',    city:'南京', uni:'南京大学',         event:'智能视觉调试现场 · 机械臂取放',                 imgId:'project_vision_debug' }
  ];

  /* #archive 4 个 details 分组（覆盖剩余 18+ 张） */
  const ARCHIVE_GROUPS = [
    { key:'archive_national',     label:'国家级 · 国际认证', imgIds:['comp_2023_16nat','comp_2023_design2','comp_2023_design4c_person','comp_2023_design4c_vision','comp_2024_17nat_1','comp_2024_17nat_2','comp_2024_intl_nat','startup_tongji','ip_zhuanli_arm','ip_google_display','ip_google_shopping'] },
    { key:'archive_city',         label:'市级奖项',    imgIds:['comp_2023_15city','comp_2023_apply3','comp_2023_apply15_group','comp_2024_apply3','comp_2024_apply16_scene','comp_2024_intl_ujs','comp_2024_intl_yin','comp_2025_intl_tong','startup_huangpu','startup_pudong_1','startup_pudong_2'] },
    { key:'archive_school',       label:'校级 + 校园', imgIds:['comp_2024_school_gold','comp_2024_chuangzaobei2','comp_2025_school_gold','comp_2026_school_te','campus_sanda_signs','campus_paddle_1','campus_paddle_2','campus_chairman','campus_biye_2025','campus_yanjiusheng_2026'] },
    { key:'archive_practice',     label:'实践 / 实习 / 项目现场', imgIds:['practice_efg_base','practice_efg_group','practice_luntan','practice_speech_zhongshan','practice_speech_wuning','project_vision_debug','project_sensetime_case','project_sensetime_lab','project_zhilian_1','project_zhilian_2','project_zhilian_3','campus_paddle_1024'] },
    /* 峰会是新分类 talk；「品牌」含致远鲸腾 / 音行三界 / 创燃工作室；
       「赛事」是创新创业类现场。智联工翼三张也归此柜（不属于任何奖项）。 */
    { key:'archive_talk',         label:'峰会 · 品牌 · 赛事', imgIds:['talk_2026_huawei','talk_2026_amazon','talk_2026_baidu','talk_comic_1000','talk_2025_annual_meet','startup_zhiteng_co','startup_zhiteng_license','startup_yinxing_sanjie','startup_chuangran_project','startup_chuangran_sample','startup_chuangran_booth','startup_wujiaochang_2024','startup_pudong_ust_2024','startup_huangpu_roadshow','project_zhilian_poster','project_zhilian_gen2','project_zhilian_defense'] },
    /* 影片组只有 videoIds —— initArchive 的「空组」判定要改成图片+影片合计，
       否则这一组会被当成空组整组消失。 */
    { key:'archive_film',         label:'开发纪实 · 影片', imgIds:[], videoIds:['video_zhilian','video_nju'] }
  ];

  /* ========================================================================
     覆盖率断言 — 确保每张图都至少在一个绑定数组里被引用
     ======================================================================== */
  (function(){
    const ids = new Set();
    /* 荣誉卡现在每条可挂两张（certId + altId），两张都要计入覆盖率，
       否则它们会被误报成「未被引用的图」。 */
    AWARD_BINDINGS.forEach(b => { if(b.certId) ids.add(b.certId); if(b.altId) ids.add(b.altId); });
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
          <span class="award-modal-footer">上海致远鲸腾 CEO · 音行三界技术负责人 · LIUZHIYUAN</span>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    /* 旗舰卡内联展示它的证据缩略图 —— 荣誉区「立主次」的可视化落点：
       头牌卡除了占 4 倍面积，还把证据摊在卡面上；其余 8 张保持纯文字，
       它们的图仍在各自详情弹层里，不重复。无图则保持纯文字，不塞空框。 */
    /* 给荣誉区的**每一行**填图（用户要求：每一项都配图强调，不只旗舰）。
       每条最多两张：cert（证书/奖状）排第一，alt（参赛现场照 / 另一张证书）排第二。
       没绑定的槽直接移除 —— 宁缺勿滥，不留空框。 */
    $$('.award-evidence').forEach(row => {
      const figs = row.querySelector('.award-row-figs');
      if(!figs) return;
      const b = AWARD_BINDINGS.find(x => x.cardKey === row.dataset.awardKey);
      [['cert', b && b.certId], ['alt', b && b.altId]].forEach(([kind, id]) => {
        const el  = figs.querySelector('.award-fig-' + kind);
        const img = id ? findImg(id) : null;
        if(!img){ if(el) el.remove(); return; }
        el.src = assetUrl(img);      // src 不写死在 HTML 里 —— 图由 AWARD_BINDINGS 决定
        el.alt = img.caption;
      });
      if(!figs.children.length) figs.remove();
    });

    /* 摘要（取自 data-story，即详情弹层里那段）。
       HTML 里已留好 .award-brief 空位，这里只填内容 ——
       保持「结构在 HTML、数据在 JS」的分工，也免得 JS 挂掉时整段消失。 */
    $$('.award-evidence').forEach(card => {
      const slot = card.querySelector('.award-brief');
      if(slot) slot.textContent = (card.dataset.story || '').trim();
    });

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
      /* 读 certId（证书/奖状），不是已废弃的 imgId ——
         字段改名时漏改这里，会让详情弹层永远取不到图（曾经踩过）。
         没有证书的条目（如国家级立项）退回用第二张证据，免得弹层空着。 */
      const certImg = binding && binding.certId ? findImg(binding.certId) : null;
      const altImg  = binding && binding.altId  ? findImg(binding.altId)  : null;
      const img     = certImg || altImg;

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
          /* --i 取模 8：每排重新起一次 stagger 波，避免条目多了累积出几秒的尾巴 */
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
                    <small>${joinMeta(img.year, categoryLabel(img.category), tierLabel(img.tier))}</small>
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

  /* ---------- 星座实验室：分类星点 ---------- */
  /* ---------- 星座图：每个分类一个星座 ----------
     取代原「5 大分类导览图」。原设计有两处问题：
       1. 视觉双写 —— canvas 画的 5 个分类节点 与 5 个 S-01~S-05 站点标记
          是同一批东西的两套画法，且互不对应，看起来像散落的杂讯。
       2. 覆盖漏洞 —— 原 CONSTELLATION_NODES 只有 5 项，漏掉了最大的一类
          competition —— 那些图在本区块根本进不去。
     现在星点直接由 IMG_CATALOG 按 category 派生（单一真相源），一张不少。

     排布：每个分类占星空里的一「星座区」，区内星点用黄金角螺旋
     （phyllotaxis）确定性散布 —— 不用 Math.random，否则每次刷新星座形状都变。
     连线：同区内每颗星连到最近的 1-2 颗（张数多时连 2 条，免得 13 颗太稀疏），
     线的透明度随距离衰减（远则淡出），这是本项目 cosmos-canvas 已验证的手法。 */

  /* 各分类的星座区：中心 + 椭圆半径（百分比坐标）。半径按张数缩放。
     加了 talk 一类（6→7 区），原 6 区已占满，故整体重排。
     注意 .sky 是 aspect-ratio:100/46 的扁条 —— y 方向的视觉高度只有 x 的
     约 0.46 倍，所以 ry 一律给得比 rx 小，否则星座在视觉上会被压扁挤在一起。 */
  const SKY_ZONES = {
    competition:{ cx:21, cy:24, rx:18, ry:15 },   /* 18 张，最大 */
    talk:       { cx:49, cy:22, rx:10, ry:8  },   /* 4 张 */
    campus:     { cx:73, cy:20, rx:14, ry:12 },   /* 8 张 */
    practice:   { cx:19, cy:55, rx:12, ry:11 },   /* 5 张 */
    project:    { cx:51, cy:53, rx:12, ry:11 },   /* 9 张 */
    startup:    { cx:80, cy:57, rx:15, ry:13 },   /* 13 张 */
    ip:         { cx:30, cy:86, rx:8,  ry:5  }    /* 4 张（含 2 张 Google 认证）*/
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
      if(detail.cat)    detail.cat.textContent    = joinMeta(categoryLabel(s.cat), s.img.year);
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
    /* ⚠️ 用 nth-child 定位卡片：新增卡片**只能追加在末尾**，
       插在中间会让后面的绑定集体错位（且不报错，只是配错图）。 */
    const bindings = [
      { sel:'.project-grid .project-card:nth-child(1)',  imgId:'comp_2024_intl_nat' },        // 国家级双创 → 国家级立项图
      { sel:'.project-grid .project-card:nth-child(2)',  imgId:'talk_comic_1000' },           // 1000 人漫展营销 → 漫展现场
      { sel:'.project-grid .project-card:nth-child(3)',  imgId:'talk_2025_annual_meet' },     // 全国大学生创业年会入选 → 年会展示现场
      { sel:'.project-grid .project-card:nth-child(4)',  imgId:'project_zhilian_1' },         // AI 视觉机械臂 → 智联工翼过程1
      { sel:'.project-grid .project-card:nth-child(5)',  imgId:'ip_ruanzhuquan' },            // 上位机软件 → 软著
      { sel:'.project-grid .project-card:nth-child(6)',  imgId:'campus_sanda_signs' },        // 校园外送到寝 → 校园路牌
      { sel:'.project-grid .project-card:nth-child(7)',  imgId:'project_zhilian_gen2' },      // 3D 打印 → 智联工翼第二代产品（用户确认该产品的结构件是 3D 打印出来的）
      { sel:'.project-grid .project-card:nth-child(8)',  imgId:'startup_chuangran_project' }, // 新增卡 08 创燃工作室
      { sel:'.project-grid .project-card:nth-child(9)',  imgId:'project_sensetime_lab' },     // 新增卡 09 商汤产教合作
      { sel:'.project-grid .project-card:nth-child(10)', imgId:'project_vision_debug' }       // 新增卡 10 智能视觉调试
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
    /* 绑定表已清空 —— 用户明确要求「实习经历不用放图」：
       · hongJing 那条原本挂的是「智联工翼」项目海报，属错配，已解绑；
       · puZhe（Python 实习 → 科技论坛）那条在本轮按要求移除。
       函数保留（将来要放图时直接往表里加），空表时下面的 forEach 不执行，无副作用。 */
    const bindings = [];
    bindings.forEach(b => {
      const panel = $(`.internship-panel[data-panel="${b.panel}"] .internship-media`);
      if(!panel){ console.warn('Internship panel 缺失：', b.panel); return; }
      const img = IMG_BY_ID[b.imgId];
      if(!img){ console.warn('Internship 图片缺失：', b.imgId); return; }
      const ev = document.createElement('div');
      ev.className = 'internship-evidence';
      ev.innerHTML = `<img src="${assetUrl(img)}" alt="${img.caption}" loading="lazy" decoding="async"
                       data-img-id="${img.id}" data-caption="${img.caption}" />
                      <small>${joinMeta('实习凭证', img.year)}</small>`;
      panel.appendChild(ev);
      // 点击实习图片直接进 lightbox
      ev.querySelector('img').addEventListener('click', () => {
        openLightbox(img.id, img.caption);
      });
    });
  }

  /* ---------- 大学游历：行程线（#campus） ----------
     全站唯一的**横向**轴 —— 与星座图（竖向星点 + 连线）、荣誉区（竖向编年列表）
     刻意区分：这里是「按地理移动」而非「按重要度/分类」组织。
     站点可点：有绑定图的进 lightbox 看该次出行的照片。 */
  function initCampusTrail(){
    const track = $('.trail-track');
    if(!track) return;
    track.innerHTML = CAMPUS_TRAIL.map((s, i) => {
      const img = s.imgId ? findImg(s.imgId) : null;
      return `
        <li class="trail-item">
          <button class="trail-stop" type="button" style="--i:${i}"
                  data-img-id="${img ? img.id : ''}" data-caption="${img ? img.caption : ''}">
            <span class="trail-date">${s.date}</span>
            <span class="trail-node" aria-hidden="true"></span>
            ${img ? `<span class="trail-thumb"><img src="${assetUrl(img)}" alt="" loading="lazy" decoding="async" /></span>` : ''}
            <strong class="trail-uni">${s.uni}</strong>
            <span class="trail-event">${s.event}</span>
            <span class="trail-city mu-no">${s.city}</span>
          </button>
        </li>`;
    }).join('');

    track.addEventListener('click', e => {
      const btn = e.target.closest('.trail-stop');
      if(!btn || !btn.dataset.imgId) return;
      openLightbox(btn.dataset.imgId, btn.dataset.caption);
    });
  }

  /* ---------- Archive 折叠式证据库（6 个库房抽屉，末柜是影片） ---------- */
  const ARCHIVE_ACCENTS = ['national','city','school','practice','talk','film'];
  function initArchive(){
    const grid = $('.archive-grid');
    if(!grid) return;
    grid.innerHTML = ARCHIVE_GROUPS.map((group, gi) => {
      const items  = (group.imgIds   || []).map(id => IMG_BY_ID[id]).filter(Boolean);
      const videos = (group.videoIds || []).map(id => VIDEO_BY_ID[id]).filter(Boolean);
      /* 空组判定必须把影片算进去 —— 影片组的 imgIds 是空数组，
         只看 items 会让这一组整组消失（且只报 console.warn，不显眼）。 */
      if(!items.length && !videos.length){ console.warn('Archive 分组为空：', group.key); return ''; }
      const drawerNo = String(gi + 1).padStart(2,'0');
      const letter   = String.fromCharCode(65 + gi);   // 编目字头 A/B/C/D/E/F
      return `<details class="archive-group reveal" data-group="${group.key}"
                 data-accent="${ARCHIVE_ACCENTS[gi] || 'school'}" ${gi === 0 ? 'open' : ''}>
        <summary>
          <span class="drawer-no mu-no">柜 ${drawerNo}</span>
          <span class="drawer-label">${group.label}</span>
          <b>${items.length + videos.length}<small>件</small></b>
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
                <small>${catNo} · ${joinMeta(img.year, tierLabel(img.tier))}</small>
                <strong>${img.caption}</strong>
                <span>打开凭证 ↗</span>
              </span>
            </button>`;
          }).join('')}
          ${videos.map((vid, vi) => {
            const ii    = items.length + vi;      // 编目号接在图片之后，不重号
            const catNo = `${letter}-${String(ii + 1).padStart(2,'0')}`;
            return `
            <button class="archive-item" type="button"
                    data-video-id="${vid.id}" data-caption="${vid.caption}"
                    data-cat="${vid.category}" data-no="${catNo}"
                    style="--i:${ii}">
              <span class="archive-film-thumb" aria-hidden="true">▶</span>
              <span class="archive-item-info">
                <small>${catNo} · 影片</small>
                <strong>${vid.caption}</strong>
                <span>播放 ↗</span>
              </span>
            </button>`;
          }).join('')}
        </div>
      </details>`;
    }).join('');
    observeReveals();
    // 点击 archive-item 进 lightbox —— 图片与影片共用同一委托，按 data 分流
    grid.addEventListener('click', e => {
      const btn = e.target.closest('.archive-item');
      if(!btn) return;
      if(btn.dataset.videoId) openLightbox(btn.dataset.videoId, btn.dataset.caption);
      else                    openLightbox(btn.dataset.imgId,   btn.dataset.caption);
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

  /* 分类色调 —— initConstellation 的展签换色也要用，故提到 IIFE 作用域 */
  /* 分类星色。talk 用的是 --purple-2 (#9e59ee) —— :root 里已定义但从未
     被用作分类色，故不算新增色相。改这里必须同步 styles.css 的
     [data-cat="talk"]{--cat-color:...}（那是同一份颜色的第二处拷贝）。 */
  const CAT_COLORS = {
    competition:'#ff6b35', campus:'#00d9ff', project:'#7828d6',
    practice:'#ffb347', startup:'#ff4d8d', talk:'#9e59ee', ip:'#7ee787'
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

  /* ---------- 全局 Lightbox（多个区块复用；图片与影片共用同一弹层） ----------
     弹层内 img 与 video 并存、靠 hidden 互斥。
     ⚠️ 查询一律限定在 .lightbox-content 内 —— 原先裸写 lb.querySelector('img')
     取的是整个弹层的第一个 img，且 closeLightbox 无条件写 .src；
     一旦引入 video 分支，img 被 hidden/清空后这里就是 null 解引用。
     ⚠️ 对应的 CSS 必须写 .lightbox-content img[hidden]{display:none} ——
     否则 `.lightbox-content img{display:block}` 会盖掉 hidden 的 display:none。 */
  /* 关灯箱时「延迟清空 img.src」的句柄。**必须可取消** —— 否则关掉后 400ms 内
     再点一张图，陈旧定时器会把刚写入的 src 抹掉，灯箱开着却是空白。 */
  let lbClearTimer = null;

  window.openLightbox = function(mediaId, caption){
    const img = IMG_BY_ID[mediaId];
    const vid = VIDEO_BY_ID[mediaId];
    const lb  = $('.lightbox');
    if((!img && !vid) || !lb){ console.warn('Lightbox 缺失媒体：', mediaId); return; }
    clearTimeout(lbClearTimer);        // 取消上一次关闭遗留的清理

    const imgEl = $('.lightbox-content img',   lb);
    const vidEl = $('.lightbox-content video', lb);

    if(img){
      if(vidEl){ vidEl.pause(); vidEl.removeAttribute('src'); vidEl.hidden = true; }
      if(imgEl){ imgEl.hidden = false; imgEl.src = assetUrl(img); imgEl.alt = img.caption; }
    } else {
      if(imgEl){ imgEl.hidden = true; imgEl.removeAttribute('src'); imgEl.alt = ''; }
      if(vidEl){
        vidEl.hidden = false;
        vidEl.src = assetUrl(vid);
        // 刻意不自动播放：页面上 BGM 可能正在响，且自动播放会被浏览器策略拦下
        vidEl.load();
      }
    }

    const cap = $('.lightbox-content p', lb);
    if(cap) cap.textContent = caption || (img || vid).caption;

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
    /* 影片必须**立刻**停：只 removeAttribute('src') 不暂停，声音会继续放。
       load() 再走一次，把已缓冲的数据一起丢掉。 */
    const vidEl = $('.lightbox-content video', lb);
    if(vidEl){
      vidEl.pause();
      vidEl.removeAttribute('src');
      vidEl.hidden = true;
      vidEl.load();
    }
    // 图片仍延迟清 src，避免关闭动画中画面突然消失；句柄留用，供下次开启时取消
    clearTimeout(lbClearTimer);
    lbClearTimer = setTimeout(() => {
      const imgEl = $('.lightbox-content img', lb);
      if(imgEl) imgEl.src = '';
    }, 400);
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
     原先文案把张数写死在 HTML 里（「12 MEMORY FRAMES」「所有 N 张图」），
     而当时的 ARCHIVE_GROUPS 只有 31 项、与图片总数对不上 —— 改数组即失同步。
     现在这些数字全部由 data-count-* 注入，HTML 里只留占位值。
     HTML 里保留当前值作为占位，no-JS 下也正确。 */
  function initCounters(){
    const set = (sel, n) => $$(sel).forEach(el => { el.textContent = n; });
    /* 注意：不再注入 data-count-total —— 它唯一的消费点（#archive 那句
       「本册 N 项对应全站 M 张」）已改写为「N 项编目，其中 X 张图片 + Y 部影片」，
       全站张数现在由下面这行 + #gallery 承担。若将来要在别处显示全站总数，
       用 data-count-gallery 或重新引入一个带消费点的属性，别留空转的注入。 */
    set('[data-count-gallery]', IMG_CATALOG.length);
    set('[data-count-archive]', ARCHIVE_GROUPS.reduce(
      (a, g) => a + (g.imgIds || []).length + (g.videoIds || []).length, 0));
    /* 图片编目数单列 —— 正文要写「N 项编目，其中 X 张图片 + Y 部影片」。
       不拆开的话「N 项对应 N 张图，另收 Y 部影片」在算术上不成立
       （N 项本身已含影片，且库房并未覆盖全部图片：campus_top10 与 ip_ruanzhuquan
       两张不在任何柜里，这是改版前就有的状态，非疏漏）。 */
    set('[data-count-archive-img]', ARCHIVE_GROUPS.reduce(
      (a, g) => a + (g.imgIds || []).length, 0));
    set('[data-count-video]',   VIDEO_CATALOG.length);
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
    initCampusTrail();
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