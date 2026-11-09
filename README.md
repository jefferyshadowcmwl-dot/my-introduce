# LZY Engineer Station · 0324

刘致远的个人简历网站：以电影级片头、原版 GhostFibers 光纤丝带入口和原版 Three.js 工牌，呈现真实项目、实习、竞赛与创业经历。

## 体验流程

```text
15 秒纯文字履历片头（可 Skip）
→ 原版 GhostFibers 光纤丝带 + 姓名入口（无照片球）
→ 点击 .character-button 或按 Enter / Space 进入详情页
→ 原版 Three.js Lanyard 工牌与 10 个完整履历区块
```

- 片头不使用人物照片，以粒子镜头和文字讲述 2022–2026 的真实履历；15 秒视频原文件（包括 2024 / 2025 等年份变化及结尾年份）与音轨锁定不改。
- 入口不使用照片球，姓名与 `.character-button` 提供点击 / Enter / Space 进入详情页的操作。
- 入口使用原版 GhostFibers 光纤丝带，不使用 GradientASCII 或照片；英文姓名 `LIU ZHIYUAN` 使用 TechText 科技文字，中文姓名使用 sans 无衬线字体。
- 详情页工牌使用 UI 知识库原版 React + Three.js 物理、织带、金属、PMREM 和正反面材质；收到 `lzy-enter` 后执行真实物理入场，尊重 reduced-motion；Lanyard 使用 `finish: glossy`（非 holographic），旁有点击翻面提示。
- 主站保留 63 张履历图；`#gallery` 保留 GridMotion 平面漂移照片墙，通过独立按钮展开全部 63 图的 ChromaGallery 聚光相册，使用正常文档流中的 BranchedMenu 筛选 7 类，以 6 / 5 / 4 / 2 列响应式小图展示，点击打开原图 Lightbox。七星座的星点、连线与图例保留原分类颜色；保留项目影片、原创 64 秒循环配乐及 reduced-motion。
- `#about` 背景使用持续 drift 的 GradientASCII（尊重 reduced-motion），不再挂载 LightTunnel；`#awards` 仍使用原版 Lightfall。`#skills` 标题左对齐，使用中文 sans 的 6 项 OptionWheel 滚轮选择，联动原有 18 项指标及 6 套真实实践、交付、三步路径和履历锚点；右侧技能卡保持无边框 / 透明背景。
- 校园游历为 9 站：上海 7 站、扬州 1 站、南京 1 站，按 2023 / 2024 / 2025 真实年份稳定排序，使用横向轨道，手机端也保持横向浏览。荣誉与校园图片保留原色、使用 `contain` 并去除闪膜，HoloCard / Halftone 不再初始化；荣誉图片使用独立按钮打开原图，不触发整行详情。
- `#contact` 在原有联系卡片外新增原库 FlyingButton，使用 WebGL2 烟雾起飞效果；点击显示真实邮箱并提供复制，不发送消息，支持 reduced-motion 与 WebGL 不可用时降级。

## 本地运行

```bash
docker compose up -d
```

访问 `http://127.0.0.1:8095/`。Docker 以只读方式挂载目录，修改后刷新即可。

## 文件结构

```text
index.html                  # 单文件页面：HTML + 全部本地 CSS/JS
components/                 # 原生组件源码与演示
react-src/                  # 原版 React Lanyard / GhostFibers 源码
components-init.js          # 组件初始化与站内桥接
script.js                   # 履历数据与主站交互源码
assets/lzy-intro.mp4        # 15 秒纯文字履历片头
assets/lzy-intro-poster.jpg # 抽象文字海报
assets/lzy-badge-back.png   # 工牌背面纹理
assets/lzy-react.js         # React + Three 打包产物
assets/bgm.mp3              # 原创循环配乐
```

最终 `index.html` 已内联全部本地 CSS/JS，无运行时外部脚本依赖；字体仍使用 Google Fonts CDN。最终 CSS 顺序为 cinematic-theme → detail-atmosphere → campus-trail → awards-natural。

## 重新构建 React 组件

```bash
npm ci
npm run build
```

`package-lock.json` 锁定 React、React DOM、Three 和 esbuild 版本。修改原生组件后，运行 `.gstack/sync-inline.cjs` 将源码重新内联到 `index.html`。

## 部署

GitHub Pages 使用 `master` 分支 / root，直接发布静态文件即可。不要执行 Git 提交或推送，除非用户明确要求。

## 素材说明

片头基于 Re-Summer75《从现在看过去 · AI 简史》改编，遵循 CC BY-NC-SA 4.0。Lanyard 与 GhostFibers 来自本地 UI 知识库中的 React Bits 实现。履历照片来自刘致远个人真实经历；主站背景音乐由代码合成，不使用商业录音。
