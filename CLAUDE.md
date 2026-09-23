# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目

刘致远个人简历网站 — **LZY Engineer Station · 0324**，部署地址 `https://jefferyshadowcmwl-dot.github.io/my-introduce/`。参考 [HXY-0124 宇宙观察站](https://hahaaa520.github.io/hxy-0124/) 的"信号收集 + 暗色霓虹"视觉语言，结合工程师语境调整为代码符号 / 脉冲信号风格。

## 技术栈

- **纯静态前端**：HTML + CSS + JS，**无构建工具 / 无 npm / 无框架**
- **字体**：Google Fonts CDN（DM Sans / Fraunces / JetBrains Mono / Noto Sans SC / Noto Serif SC / ZCOOL XiaoWei / Monoton）
- **部署**：GitHub Pages
- **设计风格**：暗紫底 `#160d20` + 霓虹紫 `#7828d6` + 强调青 `#00d9ff` + 强调橙 `#ff6b35`

## 常用命令

```bash
# 本地预览（任选其一）
python -m http.server 8000           # 起 http server，访问 http://localhost:8000
# 或直接双击 index.html 用浏览器打开

# Git 推送（走 SSH deploy key，不要用 HTTPS）
git add .
git commit -m "..."
git push                                # 已配 remote，无需输密码

# Git Bash 崩溃后清理 stackdump
git rm --cached bash.exe.stackdump && rm -f bash.exe.stackdump && git commit --amend --no-edit && git push --force
```

**没有 build / lint / test 命令** — 项目是纯静态，浏览器即运行结果。

## 架构（看多文件才能理解）

### 页面结构（index.html）
**启动页（`.intro-gate`）** + **主站（`#top` 区块起，9 区块）**：
```
intro-gate (固定全屏，点击 character-button 触发 leaveIntro 跳转)
├── canvas#cosmos-canvas (粒子背景)
├── intro-stars (22 个渐变小星星 twinkle)
├── intro-bg-grid (网格)
├── intro-brand / intro-eyebrow / h1#intro-title (4 个标题块各自律动)
├── character-button (矩形容器，内含 halo + photo-sticker + sticker-label + 4 question 标签)
├── intro-hint (行楷 ZCOOL XiaoWei + 律动)
├── intro-deco (6 个装饰符号 ⚡ { } </> Σ ∞ ∂)
├── formula (6 个飘浮公式 λ=h/p、O(n log n)、∇·E=ρ/ε₀ 等)
└── intro-skip

#top (主站)
├── site-header (顶部导航)
├── signal-dock (右下浮动信号收集，5/5 nodes)
├── mini-guide (左下浮动快速导航)
├── #about (首屏：h1 + CTA + 展柜 + 数据带 + role-cloud)
├── #internship (5 段实习 Tab 切换)
├── #projects (7 项目卡片 grid)
├── #awards (9 荣誉卡片，6 张带 award-evidence modal)
├── #gallery (全册 33 张挂画墙)
├── #constellation (5 站点导览图)
├── #archive (4 抽屉库房目录)
├── #skills (6 技能卡 + skill-bars)
├── #contact (4 联系卡片)
└── .site-footer
```

> 原 `.hero` 与 `.quick-stats` 两个区块已于 2026-09-23 删除/并入：
> hero 与 #about 内容重复（同一张肖像、同一段自述），
> quick-stats 并入 #about 成为 `.about-stats` 数据带。
> 编号 01–09 连续，删 hero 不需要重排。

### 样式系统（styles.css）
- **`@root` 变量层**：颜色 / 间距（4px 网格） / **字号阶梯（9 档）** / 字体 / 阴影 / 过渡
- **字号阶梯**：`--fs-display/-h1/-h2/-h3/-h4/-h5/-lead/-body/-micro` 是全站字号的唯一来源。
  新增标题一律用令牌，**不要写死 px**。三处刻意豁免：`#intro-title`（启动页独立全屏层）、
  `.award-modal-*`（脱离文档流的独立密度层）、展陈层 9–10px 展签微字（铭牌物理尺寸）
- **全局标题**：h1-h6 用 `--font-display` (Fraunces + Noto Serif SC)，字号由阶梯兜底
- **两种语言**：博物馆展陈（`--hall-*` / `.mu-*`，见下）与编辑杂志（`--ed-*` / `.ed-*`）
- **背景节奏**：`about(暗厅) → internship(坡) → projects(bg) → awards(bg-2) → gallery/constellation/archive(暗厅×3 展翼) → skills(坡) → contact(bg-2)`
  —— 规则是「**出展厅用坡，进展厅用切**」，两个方向的差异是有意的
- **`@media` 响应式断点**：991 / 767 / 575
- **`prefers-reduced-motion`**：关闭所有动画（5+2 个块，分散在启动页 / 展陈层 / 编辑层）

### 脚本交互（script.js IIFE 封装）
| 函数 | 功能 |
|------|------|
| `leaveIntro()` | intro-gate is-leaving → 0.85s 后隐藏 + 显示主站 |
| `initCanvas()` | requestAnimationFrame 粒子 + 连线 |
| `initReveal()` | IntersectionObserver 滚动揭示 .reveal |
| `initInternshipTabs()` | 5 段实习 Tab 切换 + 触发 'builder'/'origin' 信号 |
| `initSignalAutoUnlock()` | data-signal 节点自动解锁 |
| `initCountUp()` | Quick Stats 数字滚动 |
| `initTheme()` | data-theme="light" 切换 + localStorage |
| `initMiniGuide()` / `initMobileMenu()` | 浮动菜单 + 移动端菜单 |
| `initScrollSpy()` | 导航高亮 + header 阴影 |
| `initAwards()` | **动态注入 DOM**：6 张 .award-evidence 点击 → modal 详情 |
| `initKeys()` | ESC 关闭 mini-menu |

**JS 选择器约定**：`$()` 和 `$$()` 是别名函数（封装 querySelector）。所有 querySelector 都在 init 函数内查找 DOM，运行前必须有对应元素。

## 关键约束

### 隐私保护（.gitignore 已配）
- `刘致远简历.docx` — 源简历
- `pictute_source/` — 原始照片源目录（含 liuzhiyuan.jpg 源文件）
- `*.stackdump` — Git Bash 崩溃文件

**已推到 GitHub 的图片**：`assets/liuzhiyuan.jpg`（公开版，已做 arch 裁剪）。
**不要**把 `刘致远简历.docx` 或 `pictute_source/` 任何文件 git add 进去。

### 部署走 SSH
公司网络**拦截 HTTPS push**，必须用 SSH deploy key：
- key：`~/.ssh/lzy_deploy_key`（ed25519，无 passphrase，仅 `my-introduce` 仓库写权限）
- `~/.ssh/config`：`Host github-my-introduce` 别名
- HTTPS push 会 `Recv failure: Connection was reset`，改用 SSH 即可

### 内容可信度
任何 Edit/Write 后 PostToolUse hook 会跑 `post-code-honesty-audit`，捕获虚假实现（占位、声明但未接线 CSS变量、未绑定 @keyframes、重复选择器、孤儿 `}` 等）。

**Commit 前 checklist**：
- 改 HTML 时检查新 class 是否有对应 CSS
- 改 CSS 时检查新变量/keyframes 是否被消费
- 改 JS 时检查所有 `$('selector')` 在 HTML 中存在
- 跨 ≥3 文件改动建议 spawn Explore 做完整审计

### 启动页关键 CSS 模式
- **arch 拱形照片**（hero 区 + 启动页）：`border-radius: 48% 48% 43% 43% / 35% 35% 23% 23%`（不是正圆）+ 9px 白色边框 + rotate 2°
- **character-halo 虚线圆环**：dashed border + ::before/::after 内嵌双环，rotate 28s
- **question 标签**：4 角错落位置 + `--rot` CSS 变量注入旋转 + questionFloat 律动（不是 opacity 闪烁！）

## 设计风格规范（保持一致）

- **暗色主题**为默认（`[data-theme="light"]` 是次要态）
- **律动动画**统一用 ease-in-out infinite，translateY 浮动（不引入 opacity 闪烁 — 用户明确反对）
- **新增视觉元素**优先参考参考站 HXY-0124 + 工程师语境适配
- **6 类飘浮装饰**：intro-deco（符号）+ formula（数学公式），全部在屏幕边缘（left/right 2-5%），z-index 1，不挡 character-button 周围
- **标题字**：Fraunces（英文）+ Noto Serif SC（中文），行楷场景用 ZCOOL XiaoWei

## 博物馆展陈层（HALL LAYER）约定

`#about` / `#gallery` / `#constellation` / `#archive` 四区块走「暗色展厅」语境，
样式集中在 `styles.css` 末尾的 HALL LAYER 段（H0 令牌 → H9 reduced-motion）。

**新增样式必须遵守**：
- **令牌**：`--hall-bg / -bg-2 / -mat / -plate / -cone / -brass`、`--ar-landscape(1.45)` / `--ar-portrait(.70)`、`--scrim`
- **类名**：新类一律 `mu-` 前缀（`.mu-hall` `.mu-no` `.mu-vitrine` `.mu-frame-no` `.mu-map-legend`）
- **禁止 `#id` 前缀选择器** —— section 级样式由 `.mu-hall` 类承载
- **不新增 `!important`**（现有 10 处均为启动页历史遗留）
- **keyframes** 用 `mu` 前缀，与旧动画名零交叉
- **`.mu-hall` 是主题无关的暗色孤岛**：浅色模式下它复位 `--line/--ink/--muted/--cyan` 等令牌

**改 HTML 时的硬约束**：
- `main > section[id]` 必须是直接子元素（`styles.css` 有 `main > section` 组合子，scrollspy 靠 offsetTop）
- `.photo-wall` / `.archive-grid` / `.constellation-stage` 是 JS 注入容器，**类名不能改**
- `.constellation-stage` 一容器担三职：SVG 父级 + append `.award-star` + prepend `.constellation-bg-canvas`
- `button` 内只允许 phrasing content —— `.photo-card` / `.archive-item` / `.award-star` 内部不能用 `<div>`
- 新注入的 `.reveal` 必须调 `observeReveals()`，否则永远停在 `opacity:0`
- SVG `viewBox` 与节点坐标系必须同为 `0 0 100 100`，否则站点与折线错位

**`IMG_CATALOG.aspect` 必须用真实像素核对**：原人工标注有 11 处标反。
新增图片时用 JPEG SOF 标记读宽高（EXIF Orientation 全为 1，SOF 即渲染尺寸），不要手填。

**验证方式**：本机 Playwright 浏览器未安装且下载会卡住。
用系统 Chrome + CDP（脚本见 `%TEMP%\shots\verify.mjs`）：契约状态 smoke test、
站点-折线对齐、reduced-motion、4 视口横向溢出。提交前应跑到全绿。

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

## 本地 memory

`~/.claude/projects/E--github--/memory/github-resume-project.md` — 项目状态 + 下次开发提示词（自动加载，无需手动粘贴）。