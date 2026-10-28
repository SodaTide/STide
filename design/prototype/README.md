# STide 原型 · 纸面 + 玻璃外壳

静态可打开的高保真原型，用来验视觉与交互，不是最终工程。**不含构建步骤**：直接双击 `index.html`，或在本目录起任意静态服务。

```
node shoot.mjs "file:///…/index.html?page=home" shots/home.png 1440 1500
node verify.mjs      # 断点 / pack / 三轴 / 搜索 / 无内联脚本
node csp-check.mjs   # 带 CSP 头加载，查违规与内联脚本
```

## 文件

| 路径 | 作用 |
|---|---|
| `index.html` | Vue 模板（`<script type="text/x-template">`）+ 搜索浮层 + 设置抽屉 |
| `assets/prefs.js` | 首帧偏好：读 URL + `localStorage`，先落 `<html>` 的明暗 / 色相 / 语言 / 动效 |
| `assets/app.css` | 纸面层：令牌覆写、Mochi `stide` pack、四壁纸、左轨、栅格、排版、网格/瀑布 |
| `assets/app.js` | 页面状态、搜索、设置持久化、壁纸按页、字体双轴 |
| `assets/data.js` | 4 个人格、11 条内容（note / story / photo / link）与导航 |
| `assets/tide-*.svg` | 原型用抽象图，不是最终素材 |
| `vendor/mochi-ui.standalone.js` | 本地 Mochi UI 1.4.3 standalone（含 Vue 运行时与全部组件，仅原型用） |
| `shoot.mjs` / `verify.mjs` / `csp-check.mjs` | CDP 截图、自检、CSP 自检 |
| `shots/` | 22 张验收截图 |

界面件仍用 Mochi 组件：`MIcon`、`MProse`、`MSegmented`（外观 / 版式 / 动效）、
`MSlider`（色相）、`MSelect`（字体 / 语言）、`MSwitch`（右栏 / 跟随人物色）。左轨外壳与布局、纸面规则是自有 CSS。

## 用 URL 参数看状态

| 参数 | 值 | 说明 |
|---|---|---|
| `page` | `home` `post` `persona` `archive` `people` `about` | 起始页 |
| `post` | slug | 指定文章 |
| `who` | `jiaxin_tang` `lixia` `chaosheng` `wakaba` | 人格页（整页换三轴） |
| `layout` | `list` `grid` `masonry` | 文章流版式 |
| `wall` | `solid` `banner` `full` `transparent` | 壁纸；文章页的 transparent 自动回退 full |
| `mode` | `light` `dark` `auto` | 明暗；`auto` 跟随系统并监听变化 |
| `hue` | 0–360 | 主题色相（同时锁住人格换色） |
| `lang` | `zh-CN` `zh-TW` `en` `ja` `ru` `ko` | 壳页语言状态（只影响 `<html lang>` 与占位文案） |
| `sidebar` | `0` `1` | 右栏开关 |
| `settings` / `search` | `1` | 打开设置抽屉 / 搜索浮层 |
| `q` | 关键词 | 搜索词 |

## 实测（verify.mjs / csp-check.mjs）

| 项 | 结果 |
|---|---|
| 横向溢出 @ 1440 / 1200 / 1024 / 390 | 无 |
| 1024 文章列 / 右栏 | 688px / `display:none` |
| `stide` pack | `--mc-blur: 20px`、`--mc-blur-lg: 28px`、`--mc-glass-alpha: 0.72` |
| 人格三轴 | `lixia`：`--mc-h: 96`、`--mc-h2: 96`、`--mc-h3: 422` |
| `/en/` 搜「巴巴托斯」 | 1 条，标题仍是中文 |
| 内联脚本 | 0 |
| CSP（含 `'unsafe-eval'`，见下） | 6/6 PASS，无违规、无控制台错误 |

断点：左轨 76 在 768–1023 仍在；右栏 <1200 收起；网格/瀑布 1 / 2 / 3；设置抽屉 392（768–1023 为 360，<768 底部 88vh）；
文章目录 ≤1199 折进文末 `<details>`。印章三档 20 / 72 / 160。持久化键 `stide.prefs`。

## 截图（22 张）

| 桌面 | 移动 |
|---|---|
| [home](shots/home-1440.png) · [banner](shots/home-banner-1440.png) · [grid](shots/home-grid-1440.png) · [masonry](shots/home-masonry-1440.png) | [m-home](shots/m-home.png) · [m-post](shots/m-post.png) |
| [post](shots/post-1440.png) · [dark](shots/dark-1440.png) | [m-persona](shots/m-persona.png) · [m-archive](shots/m-archive.png) |
| [persona](shots/persona-1440.png) · [people](shots/people-1440.png) | [m-people](shots/m-people.png) · [m-search](shots/m-search.png) |
| [archive](shots/archive-1440.png) · [about](shots/about-1440.png) | [m-settings](shots/m-settings.png) |
| [settings](shots/settings-1440.png) · [search](shots/search-1440.png) | |
| [壁纸：全屏](shots/wall-full-1440.png) · [透明](shots/wall-transparent-1440.png) · [全屏·文章](shots/wall-full-post-1440.png) | |

## 与设计文档的差异

1. **网格卡自然高、不拉伸**；网格与瀑布共用 1 / 2 / 3 列断点，但网格模式下同一行仍会有自然高度差（要流动的等高请用瀑布）。
2. **搜索遮罩加模糊**（`blur(10px)` + 纸色 62%）；搜索面板 94% 纸色。透明壁纸只在 `.content` 上加 88% 纸面。
3. 原型仍是 UMD 运行时编译模板，CSP 下必须放行 `'unsafe-eval'`；最终工程用构建期编译，生产 CSP 不需要它。
4. **i18n 只有状态**（`<html lang>` + 少量占位），词表与路由在真正工程里落；搜索用内存过滤代替 Pagefind。
5. 头像用字符印章：人格目录里的 `头像*.jpg` 授权未定，印章也保证「无素材也能上线」。

## 已知未做

- 目录滚动高亮（现在是静态目录，不跟随阅读位置）。
- 「同一天」区块（数据里没有同日同人格的第二条，先留位置）。
- 归档年份尺、单人格 RSS、六语文章副本（v1.1）。

## 不是 bug

- 无 GPU 的 headless 不渲染 `backdrop-filter`，截图里玻璃边缘比真机硬；真机有模糊。
- 原型 standalone 包 1.5 MB，最终工程按组件引入 + 构建期渲染，不进客户端。
- 页面数据手写 11 条，用于验信息密度；真实内容的 kind 由校验器推断（见 `03`）。
