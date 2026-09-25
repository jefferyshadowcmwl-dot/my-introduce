# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## ⚠️⚠️ 先确认你在哪一版（开工第一步）

**当前工作区 = v1（暗紫霓虹单页站），与线上一致。v2 已封存，不在工作区里。**

| 位置 | 内容 |
|---|---|
| **线上 + 本地 `master`** | `3045252` = tag `v1.0` = **暗色霓虹单页站**（本文件描述的就是它） |
| **tag `v2.0` / branch `v2`** | `0f74b82`，苹果风浅色**四页**站（已完成、已验证、**未推送**） |
| `E:\github简历-v2.0-backup.bundle` | 13MB，`git bundle --all`，已实证可还原 |
| `E:\github简历-v2.0-files.zip` | 13MB，v2 文件树快照 |
| tag `pre-refactor` / `pre-swap` | 二轮重构前 / 改名前的逃生门 |

```bash
git log --oneline -1 && ls *.html    # 确认版本
cd E:\github简历 && git checkout v2  # 切到 v2（一条命令）
git checkout -B master v1.0          # 切回 v1
git clone E:/github简历-v2.0-backup.bundle 目标目录   # 从零还原
```

**用户明确说过「先不推送，我说推送再推送」** —— 别自作主张 `git push`。

v2 是完全不同的架构（`css/base.css` 令牌层 + `js/data.js` + 四页），
**它的 CLAUDE.md 在 v2 分支里**（`git show v2:CLAUDE.md`）。v2 分支里本文件描述的
HALL LAYER / EDITORIAL LAYER / `.mu-*` / `.ed-*` **全部不存在** —— 改 v2 前先切过去读那份。
方案稿 `.claude/v2plan.md` 两个版本下都在（gitignored）。

## 项目

刘致远个人简历网站 — **LZY Engineer Station · 0324**（v1 暗色霓虹单页站），
部署地址 `https://jefferyshadowcmwl-dot.github.io/my-introduce/`。
参考 [HXY-0124 宇宙观察站](https://hahaaa520.github.io/hxy-0124/) 的"信号收集 + 暗色霓虹"视觉语言，
结合工程师语境调整为代码符号 / 脉冲信号风格。

## 技术栈

- **纯静态前端**：HTML + CSS + JS，**无构建工具 / 无 npm / 无框架**
- **字体**：Google Fonts CDN（DM Sans / Fraunces / JetBrains Mono / Noto Sans SC /
  Noto Serif SC / ZCOOL XiaoWei / Monoton）
- **部署**：GitHub Pages。**发布源 = `master` 分支 / root**
  （API 的 `default_branch` 显示 `main`，但 `main` 与 master 无共同祖先，**推 main 不生效**）
- **设计风格**：暗紫底 `#160d20` + 霓虹紫 `#7828d6` + 强调青 `#00d9ff` + 强调橙 `#ff6b35`

## 常用命令

```bash
# 本地预览（任选其一）
python -m http.server 8000           # 起 http server，访问 http://localhost:8000
# 或直接双击 index.html 用浏览器打开

# Git 推送（走 SSH deploy key，不要用 HTTPS）
git add . && git commit -m "..." && git push      # 已配 remote，无需输密码

# Git Bash 崩溃后清理 stackdump
git rm --cached bash.exe.stackdump && rm -f bash.exe.stackdump && git commit --amend --no-edit && git push --force
```

**没有 build / lint / test 命令** — 项目是纯静态，浏览器即运行结果。
回归验证靠本机 Chrome + CDP 套件，见「验证」一节。

## 架构（看多文件才能理解）

### 页面结构（index.html）
**启动页（`.intro-gate`）** + **主站（`main > section[id]`，9 区块，`#top` 起）**：
```
intro-gate (固定全屏，点击 character-button 触发 leaveIntro 跳转)
├── canvas#cosmos-canvas (粒子背景)      ← 注意：index.html 里出现两次（重复 #id，历史遗留）
├── intro-stars (22 个渐变小星星 twinkle)
├── intro-bg-grid (网格)
├── intro-brand / intro-eyebrow / h1#intro-title (4 个标题块各自律动)
├── character-button (矩形容器：halo + photo-sticker + sticker-label + 4 question 标签)
├── intro-hint (行楷 ZCOOL XiaoWei + 律动)
├── intro-deco (6 个装饰符号 ⚡ { } </> Σ ∞ ∂)
├── formula (6 个飘浮公式 λ=h/p、O(n log n)、∇·E=ρ/ε₀ 等)
├── signal-burst (8 道脉冲光束) / signal-stream (12 条信号字符流) / scanline
└── intro-skip

main#top (主站)
├── site-header (顶部导航)
├── station-index (右下浮动「站台索引」，收起/展开两态：9 项 + 滚动进度环 + BGM 音量)
├── #about (首屏：h1 + CTA + 展柜 + 数据带 + role-cloud)
├── #internship (5 段实习 Tab 切换)
├── #projects (7 项目卡片 grid)
├── #awards (9 荣誉卡片，6 张带 award-evidence modal)
├── #gallery (全册 33 张挂画墙)
├── #constellation (星座图：33 张履历 = 6 个星座)
├── #archive (4 抽屉库房目录)
├── #skills (6 技能卡 + skill-bars)
├── #contact (4 联系卡片)
└── .site-footer
```
> 原 `.hero` 与 `.quick-stats` 已于 2026-09-23 删除/并入 `#about`；
> 原 `mini-guide` + `signal-station` 两个浮动控件已合并为单一 `station-index`。
> 编号 01–09 连续（`si-item` 恰 9 项），删 hero 不需要重排。

### 样式系统（styles.css，约 2600 行）
- **`:root` 变量层**：颜色 / 间距（4px 网格）/ **字号阶梯（9 档）** / 字体 / 阴影 / 过渡
- **字号阶梯**：`--fs-display/-h1/-h2/-h3/-h4/-h5/-lead/-body/-micro` 是全站字号的唯一来源。
  新增标题一律用令牌，**不要写死 px**。三处刻意豁免：`#intro-title`（启动页独立全屏层）、
  `.award-modal-*`（脱离文档流的独立密度层）、展陈层 9–10px 展签微字（铭牌物理尺寸）
- **全局标题**：h1-h6 用 `--font-display` (Fraunces + Noto Serif SC)，字号由阶梯兜底
- **两种语言**：博物馆展陈（`--hall-*` / `.mu-*`）与编辑杂志（`--ed-*` / `.ed-*`，见下）
- **背景节奏**：`about(暗厅) → internship(坡) → projects(bg) → awards(bg-2) → gallery/constellation/archive(暗厅×3 展翼) → skills(坡) → contact(bg-2)`
  —— 规则是「**出展厅用坡，进展厅用切**」，两个方向的差异是有意的
- **`@media` 响应式断点**：991 / 767 / 575
- **`prefers-reduced-motion`**：**6 个 `@media` 块**（不是 1 个），分散在启动页 / 展陈层 / 编辑层 ——
  改动画时**每个块都要检查**，漏一个就是"某个区块在 reduced 下还在动"

### 脚本交互（script.js IIFE 封装，23 个函数）
| 分组 | 函数 | 功能 |
|------|------|------|
| 启动 | `leaveIntro` | intro-gate `.is-leaving` → 0.85s 后隐藏 + 显示主站 |
| 背景 | `initCanvas` | requestAnimationFrame 粒子 + 连线 |
| 揭示 | `initReveal` / `observeReveals` | IntersectionObserver 滚动揭示 `.reveal`（**注入型必须调 `observeReveals()`**） |
| 数字 | `initCountUp` / `initCounters` | 数字滚动 / 数量注入 |
| 主题 | `initTheme` | `data-theme="light"` 切换 + localStorage |
| 导航 | `initScrollSpy` / `initMobileMenu` | 导航高亮 + header 阴影 / 移动端菜单 |
| 经历 | `initInternshipTabs` / `initInternshipMedia` | 5 段实习 Tab 切换 + 凭证图注入 |
| 项目 | `initProjectMedia` | 项目配图注入（**位置选择器 nth-child，改卡序会挂错**） |
| 荣誉 | `initAwards` | **动态注入 DOM**：`.award-evidence` 点击 → modal 详情 |
| 图库 | `initGallery` / `initConstellation` / `initArchive` | 挂画墙 / 星座图 / 抽屉库房（三块都是注入型） |
| 灯箱 | `initLightbox` / `closeLightbox` | 大图查看 |
| 悬浮 | `initStationIndex` | 站台索引收起/展开 + 滚动进度环 + 音量 |
| 杂项 | `initVitrine` / `initCategoryLink` / `initBgm` / `initKeys` | 展柜 / 同类高亮 / 背景音乐 / ESC 关闭 |
| 工具 | `mulberry` | 确定性伪随机（星座坐标，**不用 Math.random**，否则每次刷新形状都变） |

**JS 选择器约定**：`$()` 和 `$$()` 是别名函数（封装 querySelector）。
所有 querySelector 都在 init 函数内查找 DOM，运行前必须有对应元素。

## 关键约束

### 隐私保护（.gitignore 已配，**不要往仓库里加这些**）
`刘致远简历.docx`（源简历）、`pictute_source/`（原始照片源目录）、
`*.flac` / `*.wav`（53MB 无损源音频）、`*.stackdump`（Git Bash 崩溃转储）、
`.claude/`、`.gstack/`、`.shot.mjs`（本地配置与临时脚本）

**已推到 GitHub 的图片**：`assets/liuzhiyuan.jpg`（公开版，已做 arch 裁剪）。

**⚠️ BGM 版权**：`assets/bgm.mp3` 是商业版权录音（由 53MB FLAC 转码）。
仓库 public + 站点公开 = 侵权分发风险，已明确告知用户、用户知悉自担。

### 部署走 SSH
公司网络**拦截 HTTPS push**，必须用 SSH deploy key：
- key：`~/.ssh/lzy_deploy_key`（ed25519，无 passphrase，仅 `my-introduce` 仓库写权限）
- `~/.ssh/config`：`Host github-my-introduce` 别名
- HTTPS push 会 `Recv failure: Connection was reset`，改用 SSH 即可
- Pages CDN 缓存 1–2 分钟。实证法：`curl -s <URL> | grep <本次新增的 class>` 轮询

### 内容可信度
任何 Edit/Write 后 PostToolUse hook 会跑 `post-code-honesty-audit`，捕获虚假实现
（占位、声明但未接线 CSS 变量、未绑定 `@keyframes`、重复选择器、孤儿 `}` 等）。

**Commit 前 checklist**：
- 改 HTML 时检查新 class 是否有对应 CSS
- 改 CSS 时检查新变量/keyframes 是否被消费
- 改 JS 时检查所有 `$('selector')` 在 HTML 中存在
- 跨 ≥3 文件改动 spawn subagent 跑完整审计

### 启动页关键 CSS 模式
- **arch 拱形照片**（hero 区 + 启动页）：`border-radius: 48% 48% 43% 43% / 35% 35% 23% 23%`（不是正圆）+ 9px 白色边框 + rotate 2°
- **character-halo 虚线圆环**：dashed border + ::before/::after 内嵌双环，rotate 28s
- **question 标签**：4 角错落位置 + `--rot` CSS 变量注入旋转 + questionFloat 律动（不是 opacity 闪烁！）

## 设计风格规范（保持一致）

- **暗色主题**为默认（`[data-theme="light"]` 是次要态）
- **律动动画**统一用 ease-in-out infinite，translateY 浮动（不引入 opacity 闪烁 — 用户明确反对）
- **新增视觉元素**优先参考参考站 HXY-0124 + 工程师语境适配
- **6 类飘浮装饰**：intro-deco（符号）+ formula（数学公式），全部在屏幕边缘（left/right 2-5%），
  z-index 1，不挡 character-button 周围
- **标题字**：Fraunces（英文）+ Noto Serif SC（中文），行楷场景用 ZCOOL XiaoWei

## 博物馆展陈层（HALL LAYER）约定

`#about` / `#gallery` / `#constellation` / `#archive` 四区块走「暗色展厅」语境，
样式集中在 `styles.css` 末尾的 HALL LAYER 段（H0 令牌 → H9 reduced-motion）。

**新增样式必须遵守**：
- **令牌**：`--hall-bg / -bg-2 / -mat / -plate / -cone / -brass`、`--ar-landscape(1.45)` / `--ar-portrait(.70)`、`--scrim`
- **类名**：新类一律 `mu-` 前缀（`.mu-hall` `.mu-no` `.mu-vitrine` `.mu-frame-no` `.mu-map-legend`）
- **禁止 `#id` 前缀选择器** —— section 级样式由 `.mu-hall` 类承载
- **不新增 `!important`**（见下方"现有 11 处"说明）
- **keyframes** 用 `mu` 前缀，与旧动画名零交叉
- **`.mu-hall` 是主题无关的暗色孤岛**：浅色模式下它复位 `--line/--ink/--muted/--cyan` 等令牌

**改 HTML 时的硬约束**：
- `main > section[id]` 必须是直接子元素（`styles.css:176` 有 `main > section[id]{scroll-margin-top:72px}`
  组合子，scrollspy 靠 `offsetTop`）
- `.photo-wall` / `.archive-grid` / `.sky` 是 JS 注入容器，**类名不能改**
  （`#sky` 上还有 `id="sky"`，星座图脚本也依赖它）
- `button` 内只允许 phrasing content —— `.photo-card` / `.archive-item` / `.sky-star` 内部不能用 `<div>`
- 新注入的 `.reveal` 必须调 `observeReveals()`，否则永远停在 `opacity:0`
- SVG `viewBox` 与节点坐标系必须同为 `0 0 100 100`，否则坐标与折线错位
- **清场要限定作用域**：`closeLightbox` / `initAwards` 曾用
  `$$('.is-active')` 做全站清场，它假设 `is-active` 只有 section 在用；
  而 `.sky-star` 的选中态也是 `is-active` → 开一次灯箱星点选中就被抹掉。
  现已限定为 `$$('main > section.is-active')`。**别再用泛化选择器做局部清场。**
- **分类相关的手工枚举数组会漂移**：`CONSTELLATION_NODES` 曾是手工 5 项，
  漏掉最大的 competition（13 张）。分类派生一律走 `IMG_CATALOG` 的 `category`。

**`IMG_CATALOG.aspect` 必须用真实像素核对**：原人工标注有 11 处标反。
新增图片时用 JPEG SOF 标记读宽高（EXIF Orientation 全为 1，SOF 即渲染尺寸），不要手填。

### 现有 11 处 `!important` 的位置（别新增）
**11 处，分布在 9 行**：
- **9 处在启动页离场动画**（`.is-leaving` 强制覆盖动画终态）——
  行 628 / 636 / 646 / 655 / 681 / 684 / 686，其中 686 行有 3 处
- **2 处在 `.award-modal` 的 575px 断点**——行 1604 / 1605（压字号）

⚠️ 别用 `grep -c '!important'` 数：**行 626 / 2276 / 2468 是纯注释**
（2276 与 2468 就是 HALL/EDITORIAL 纪律里"不新增 !important"那句话本身）。
实测三种口径：`grep -c`（数行）= **12**、`grep -o | wc -l`（数次数）= **14**、
**剥掉注释后才是真数 = 11 处 / 9 行**。

## 编辑杂志层（EDITORIAL LAYER）约定

`#internship` / `#projects` / `#awards` / `#skills` / `#contact` 五个**叙事类**区块
走「编辑杂志」语境（大留白 · 衬线正文 · 不对称 · 纸面直角），
与 HALL LAYER 的**证据类**区块（`#about`/`#gallery`/`#constellation`/`#archive`）
构成两种语言 —— **统一靠色调，不靠手法趋同**。

**命名空间**：`--ed-*` / `.ed-*`（与 `mu-` 同构，两个字母便于扫读分离）。
纪律同 HALL LAYER：单类 (0,1,0)、状态最多两段、禁 `#id` 前缀、不新增 `!important`、
不新增色相、不新增 fixed 装饰层。

**三个「靠色调统一」的装置**（可逐条验收，不是笼统的"色板一致"）：
1. 正文换真衬线（`--font-editorial` = Noto Serif SC 优先）—— body 用的
   `--font-xingkai`（ZCOOL XiaoWei）是**展示体**，做正文天然偏"海报"
2. **记号笔底纹代替霓虹渐变** —— `h2 span` 的 cyan→purple 渐变正是"科技落地页"
   的声纹。改为 `--orange-2` 的 `box-shadow:inset 0 -.16em 0`。
   色相没变（`--orange-2` 是 `--hall-brass` 的母色之一），**处理方式变了**
3. 章节顶线与 `.mu-hall::after` 地脚线用**逐字相同**的 `linear-gradient` ——
   全站只有一种横线

**⚠️ E 层必须位于 `styles.css` 末尾**：`.section-head.ed h2 span` 与
`.section-head h2 span` 特异性平局（都是 (0,2,1)），只能靠源码顺序取胜。
挪到中段会被霓虹渐变覆盖回来，**且不报错**。反向验证：把 E 层临时前移，
确认渐变会回来。

**不对称用 `grid-column` 显式放置，不要用 `order`** —— 这些是文本节点，
`order` 会让视觉顺序与 DOM/读屏顺序不一致。
变体：`.ed-indent`（标题缩进）/ `.ed-flip`（镜像）/ `.ed-closing`（收尾堆叠）。

## 验证

**Playwright 装不上，别试 `npx playwright install`（会卡住）。**
用系统 Chrome + CDP over WebSocket，Node 24 内置 `WebSocket`/`fetch`，零依赖。
套件在本机 `%TEMP%\shots\`（**刻意不在仓库内**）：

| 脚本 | 作用 |
|---|---|
| `verify.mjs` | **v1 基线套件**（36 项）：契约 smoke、站折线对齐、reduced-motion、4 视口溢出 |
| `v2verify.mjs` | v2 四页套件（v1 下跑不了，需先 `git checkout v2`） |
| `v2links.mjs` / `v2audit-classes.mjs` / `v2scan-attrs.mjs` | v2 用的断链 / class 对账 / 属性扫描 |

```bash
cd "$TEMP/shots"
node verify.mjs        # v1；自动指向 http://localhost:8000/
```

**v1 基线：36/36 全绿、0 失败、无 console error**（2026-09-24 实测）。
v2 的基线数字见 v2 分支的 CLAUDE.md。

## Git 状态

- **Pages 发布源 = `master`**；`main` 推了不生效
- tag：`v1.0`(3045252) = 线上通过版 / `v2.0`(0f74b82) = 已封存的 v2 / `pre-refactor` / `pre-swap`
- branch：`master`(v1) / `v2`(已封存)
- **Gitee 版本管理默认关闭**，除非用户明确要求

## 本地 memory

`~/.claude/projects/E--github--/memory/github-resume-project.md` — 项目状态 + 下次开发提示词（自动加载）。
