# STide 原型 · 纸面 + 玻璃外壳

静态可打开的高保真原型，用来验视觉与交互，不是最终工程。**不含构建步骤**：直接双击 `index.html`，或在本目录起任意静态服务。

```
node shoot.mjs "file:///…/index.html?page=home" shots/home.png 1440 1500
```

## 文件

| 路径 | 作用 |
|---|---|
| `index.html` | 全部页面的 Vue 模板（`<script type="text/x-template">`）+ 搜索浮层 + 设置抽屉 |
| `assets/app.css` | 纸面层：令牌覆写、四壁纸、左轨、栅格、正文排版、网格/瀑布、移动端 |
| `assets/data.js` | 4 个人格、11 条内容（note / story / photo / link）与导航 |
| `assets/tide-*.svg` | 原型用的抽象图，不是最终素材 |
| `vendor/mochi-ui.standalone.js` | 本地 Mochi UI 1.4.3 standalone（含 Vue 运行时与全部组件，仅原型用） |
| `shoot.mjs` | CDP 截图器（无依赖）：精确设视口，解决 headless 窗口最小宽度导致 390px 截图失真的问题 |
| `shots/` | 验收截图：桌面 1440、移动 390、亮/暗、三种版式、设置与搜索 |

## 用 URL 参数看状态

| 参数 | 值 | 说明 |
|---|---|---|
| `page` | `home` `post` `persona` `archive` `people` `about` | 起始页 |
| `post` | 帖子 slug | 指定打开哪篇 |
| `who` | `jiaxin_tang` `lixia` `chaosheng` `wakaba` | 打开哪个人格页（整站换色相） |
| `layout` | `list` `grid` `masonry` | 文章流版式 |
| `wall` | `solid` `banner` `full` `transparent` | 壁纸模式 |
| `mode` | `light` `dark` | 亮/暗 |
| `hue` | 0–360 | 主题色相 |
| `settings` | `1` | 打开设置抽屉 |
| `search` | `1` | 打开搜索浮层 |
| `q` | 关键词 | 搜索词（例：`高达`） |

例：`index.html?page=persona&who=lixia&mode=dark`。

## 已实现的交互

- 左轨 / 手机坞导航、文章进出、人格页换色（`--mc-h` 直接改）
- 亮/暗切换、色相滑杆与人格色点、四壁纸、三版式、四字体预置、六语言选择器状态、动效档位
- 搜索浮层：输入即过滤（内存；线上换 Pagefind）、`↑↓ / ↵ / Esc`、`⌘K` 与 `/` 唤起
- 文章阅读进度条（作者色相）、目录高亮占位、右侧作者卡
- 响应式：≥1024 左轨 + 右栏；≤1023 收右栏；≤767 收左轨、出行坞、设置变底部抽屉

## 与设计文档的差异（原型期的决定）

1. **网格卡不拉伸**。`02-页面与交互.md` 允许网格卡等高；实测等高会在短内容下留大片白，改为自然高 + 内容裁切（note 4 行、摘要 2 行、图 172px），瀑布流维持列流动。
2. **搜索遮罩加了模糊**。原稿只写了玻璃浮层；原型补 `backdrop-filter: blur(10px)` + 纸色 62% 遮罩，否则背景正文抢焦点。
3. **移动端人格页的行改回堆叠**。桌面人格页行是 `64px + 1fr` 两列；该覆盖若在窄屏生效，正文列只有 64px 宽。已用 `@media (min-width:768px)` 包住。
4. **头像先用字符印章**。人格目录里的 `头像*.jpg` 授权未定；印章方案也保证了「无素材也能上线」。
5. **i18n 只做了选择器状态**，词表与路由在真正工程里落；Pagefind 用内存过滤代替，验证的是结果面板的信息密度。

## 截图

| 桌面 | 移动 |
|---|---|
| [home](shots/home-1440.png) · [grid](shots/home-grid-1440.png) · [masonry](shots/home-masonry-1440.png) | [m-home](shots/m-home.png) · [m-post](shots/m-post.png) |
| [post](shots/post-1440.png) · [dark](shots/dark-1440.png) | [m-persona](shots/m-persona.png) · [m-archive](shots/m-archive.png) |
| [persona](shots/persona-1440.png) · [people](shots/people-1440.png) | [m-search](shots/m-search.png) · [m-settings](shots/m-settings.png) |
| [archive](shots/archive-1440.png) · [about](shots/about-1440.png) | |
| [settings](shots/settings-1440.png) · [search](shots/search-1440.png) | |
| [壁纸：全屏](shots/wall-full-1440.png) · [透明](shots/wall-transparent-1440.png) · [全屏·文章](shots/wall-full-post-1440.png) | |

## 已知的「不是 bug」

- 无 GPU 的 headless 不渲染 `backdrop-filter`，截图里玻璃边缘比真机硬；真机有模糊。
- 原型的 standalone 包 1.5 MB，最终工程按组件引入 + 构建期 SSR，不进客户端。
- 页面数据是手写的 11 条，用于验信息密度；真实内容的 kind 由校验器推断（见 `03`）。
