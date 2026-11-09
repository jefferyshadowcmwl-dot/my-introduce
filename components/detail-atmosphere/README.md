# Detail Atmosphere 挂载说明

## 分区职责

- `#gallery`：只使用 `GalleryAtmosphere`。它调用项目现有 `window.LZY.Comp.GradientASCII`，石墨黑 / 冰川青 / 香槟色字符画位于背景；`DomeGallery` 仍挂载到原 `.photo-wall`，位于前景。不要再给此区叠加 Lightfall 或 LightTunnel。
- `#awards`：只使用 `AwardsAtmosphere`。它直接渲染原版 React `Lightfall`，默认使用 `AWARDS_LIGHTFALL_PROPS`，低保底辉光、低白色高光和较强纵深衰减；不要再叠加字符画。
- 两层都有边缘渐隐、标题区背景遮罩和 `pointer-events: none`。运行时只给最近的宿主 `section` 添加 `da-atmosphere-host`，并抬高其直接子元素 `.shell`，不会改动 DomeGallery 的节点或交互。

## React Root 挂载

在主对话的整合入口中导入：

```jsx
import { createRoot } from 'react-dom/client';
import {
  AwardsAtmosphere,
  GalleryAtmosphere,
  AWARDS_LIGHTFALL_PROPS,
  GALLERY_ASCII_OPTIONS
} from './components/detail-atmosphere/DetailAtmosphere.jsx';
```

默认导出按 `variant` 选择背景；更清晰的方式是使用两个命名导出。将专用空挂载点放在 section 内、`.shell` 之前：

```jsx
const mountAtmosphere = (section, Component) => {
  if (!section || section.querySelector(':scope > [data-atmosphere-mount]')) return null;
  const mount = document.createElement('div');
  mount.dataset.atmosphereMount = '';
  section.prepend(mount);
  const root = createRoot(mount);
  root.render(<Component />);
  return () => {
    root.unmount();
    mount.remove();
  };
};

const disposeGallery = mountAtmosphere(document.querySelector('#gallery'), GalleryAtmosphere);
const disposeAwards = mountAtmosphere(document.querySelector('#awards'), AwardsAtmosphere);
```

`GalleryAtmosphere` 依赖现有 `components/gradient-ascii/gradient-ascii.js` 先注册 `window.LZY.Comp.GradientASCII`，其 `gradient-ascii.css` 也应保持加载。缺失时组件保留原背景并给出警告，不影响内容。`AwardsAtmosphere` 不依赖这个全局脚本。

## 独立挂载原版组件

```jsx
import LightTunnel from './react-src/LightTunnel.jsx';
import Lightfall from './react-src/Lightfall.jsx';
import { AWARDS_LIGHTFALL_PROPS } from './components/detail-atmosphere/DetailAtmosphere.jsx';

const tunnelRoot = createRoot(document.querySelector('#tunnel-mount'));
tunnelRoot.render(<LightTunnel />);

const lightfallRoot = createRoot(document.querySelector('#lightfall-mount'));
lightfallRoot.render(<Lightfall {...AWARDS_LIGHTFALL_PROPS} />);
```

挂载容器必须有非零尺寸，例如 `position: relative; width: 100%; height: 600px`。React 19 下在卸载时调用对应 `root.unmount()`，组件会取消 RAF、断开 Observer、移除全局指针/可见性监听并释放 WebGL 资源。不要在同一个 DOM 节点重复 `createRoot`；更新参数用 `root.render(...)`。

两个实现都要求浏览器支持 WebGL2。组件自身处理离屏暂停、页面隐藏、DPR、ResizeObserver 和 `prefers-reduced-motion`。作为装饰背景时保留 `aria-hidden`，背景层不接管点击；Lightfall 默认预设关闭 `holdToWarp`，只保留轻微鼠标透镜。

## 默认参数覆盖

- `GalleryAtmosphere`：`options = GALLERY_ASCII_OPTIONS`、`paused = false`、`className = ''`、`style` 可覆盖外层样式。
- `AwardsAtmosphere`：`lightfallProps = AWARDS_LIGHTFALL_PROPS`、`paused = false`、`className = ''`、`style` 可覆盖外层样式。
- `DetailAtmosphere`：`variant = 'gallery'`，传 `'awards'` 切换；其余 props 转交对应组件。

不要整体替换 `options` 时只写单项；先展开对应默认对象再覆盖。此次未修改 `react-src/index.jsx`、`components-init.js`、`index.html` 或既有 bundle，因此上述导入和挂载需由主整合入口完成。
