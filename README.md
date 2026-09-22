# ⚡ LZY Engineer Station · 0303

刘致远的个人简历网站 — 工程师信号台

> 参考 [HXY-0124 宇宙观察站](https://hahaaa520.github.io/hxy-0124/) 的"信号收集 + 暗色霓虹"视觉语言，结合工程师背景调整为"代码符号 / 脉冲信号 / 工程师语境"。

## 在线访问

部署后：`https://jefferyshadowcmwl-dot.github.io/`

## 本地预览

直接双击 `index.html` 即可在浏览器中打开。

## 项目结构

```
github简历/
├── index.html        # 主页面（9 个区块）
├── styles.css        # 设计系统 + 全部样式
├── script.js         # 启动页 + 滚动揭示 + Tab 切换 + 信号收集
├── assets/           # 图片/头像（预留，本期未使用真实照片）
└── 刘致远简历.docx   # 原始简历源文件
```

## 设计系统

| 维度 | 值 |
|------|---|
| 主色（暗紫底） | `#160d20` |
| 强调紫 | `#7828d6` |
| 强调青 | `#00d9ff` |
| 强调橙 | `#ff6b35` |
| 字体（英文） | DM Sans / JetBrains Mono |
| 字体（中文） | Noto Sans SC |
| 主题 | 暗色（默认） |

## 部署

1. GitHub 创建仓库 `jefferyshadowcmwl-dot.github.io`
2. `git remote add origin git@github.com:jefferyshadowcmwl-dot/jefferyshadowcmwl-dot.github.io.git`
3. `git push -u origin main`
4. 仓库 Settings → Pages → Source: main / root