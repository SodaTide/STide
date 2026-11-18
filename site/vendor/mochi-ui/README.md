<div align="center">

# ✨ Mochi UI

**透光 · 软糯 · 会呼吸的 Vue 3 组件库**

*Soft-glass surfaces · Squishy motion · Spectrum light*

[![Vue](https://img.shields.io/badge/Vue-3.5-42b883)](https://vuejs.org)
[![Vite](https://img.shields.io/badge/Vite-8-646cff)](https://vite.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind-v4%20ready-38bdf8)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/license-MIT-f472b6)](./LICENSE)

</div>

---

## 这是什么

Mochi UI 是一套为**仪表盘、项目展示、控制台、游戏 UI、社交风**场景打造的 Vue 3 组件库。

它从一批 GFX / 社交风设计稿里抽出了共同的视觉规律，并把它们固化成一套可编程的设计令牌：
磨砂玻璃的层次感、单色相浸染的光谱、流动的极光、以及像麻薯一样回弹的交互。

```vue
<script setup>
import { ref } from 'vue'

const hue = ref(340)
</script>

<template>
  <div :style="{ '--mc-h': hue }">
    <MButton variant="gradient" effect="glow">一个色相，整站气质</MButton>
  </div>
</template>
```

---

## 四条设计原则

| 原则 | 含义 | 技术实现 |
| --- | --- | --- |
| **Lens** 透光层叠 | 每个界面都是悬浮的磨砂玻璃 | `backdrop-filter: blur() saturate()` + 半透明 `hsl(... / .55)` + 高光内描边 + 有色柔影 |
| **Prism** 单色浸染 | 一个色相淹没整屏，强调色是它的光谱邻居 | 所有色板由 `--mc-h` / `--mc-h2` / `--mc-h3` 推导，**零硬编码颜色** |
| **Aurora** 呼吸光 | 光会漂移、流淌、在悬停时扫过表面 | `mc-aurora` / `mc-sheen` / `mc-breathe` / `mc-gradient-text` |
| **Mochi** 软糯形变 | 按下会回弹，悬浮会抬起 | `--mc-squish` + `--mc-ease-spring` 的弹性曲线 |

> 换主题 = 换一个色相。整套界面仍然是同一个物种。

---

## 安装

```bash
npm i mochi-ui
```

零运行时依赖，只要求 `vue ^3.4`。

---

## 升级到 1.9.1 要知道的一件小事

**`MGauge` 的拨号盘面现在有了边框。**

1.6.0 起，拨号盘面（archetype C · 凹陷井）带着一条**永远不会渲染的 border 声明**升级而来——
`border: 1px solid var(--mc-well-border)` 里的双重写（`1px solid` + 自带 `1px solid` 的完整简写令牌）值非法，
整条被浏览器丢弃。1.9.1 修正为 `border: var(--mc-well-border)`：面恢复凹陷井的定义线，
与全库其余 12 处井材质一致。**没有 API 变化、没有行为变化**；只是面终于能看见自己的边缘。

顺带：`MEquation` 的 display 公式牌补齐圆角、边框与颗粒（sheet 原型一致性）；
刻度标签的 `<text>` 只渲染主刻度（你大概看不出来，节点少了 8 个而已）。

---

## 升级到 1.9.0 要知道的三件事

**① `Select` 现在默认窗化长列表。**

`Select` 的 `virtual` 属性现在支持三态：`'auto'`（**新默认**）、`true`、`false`（外加 `{ rowHeight, overscan }` 对象）。
等高列表（所有选项单行、无 `description`、无分组头、无「创建」行）在**≥ 200 行**时自动只渲染可视切片——
1500 项的场景从约 9013 个元素 / 70–93 ms 降到 **110 个元素 / ~6 ms**。
**不想要？一行关掉：**`:virtual="false"`。`virtual="true"` 与对象写法语义与之前完全一致；
不等高的列表（带 `description` / 分组 / 创建行）行为不变。

**② `#header` 插槽里的自定义标题会接上可访问名称。**

Dialog / Drawer 的 `#header` 插槽（1.9.0 起）：插槽里标了 **`data-mc-title`** 的元素会被自动接上
`aria-labelledby`（元素没 `id` 就顺手生成）——屏幕阅读器能念出你的自定义标题。
如果插槽里没有 `data-mc-title` 元素、也没传 `ariaLabel`，开发模式会**警告一次**：
给你的标题元素加个 `data-mc-title` 即可，不用改其它东西。

**③ `MGlobalStyle` 的三条注入进了 `@layer mochi.global`。**

`fontFamily` / `background` / `color` 这三条现在按层序输给**未分层**的 CSS：你的普通样式单类就能覆盖它们，
不再需要 `html body.你的` 那种双特异性写法。其余 props（`font-size` / `scroll-behavior` /
`baseline` 等）保持原写法不变。

内部变更（不影响 API）：`@layer mochi.recipes` 共享材质配方层（零视觉差）· 面板内部滚动不再触发重定位 ·
`DataTable` 公共类型支持泛型行（`DataTableColumn<MyRow>`，纯类型层面，可选）。

---

## 升级到 1.8.0 要知道的两件事

**① `defineModel` 组件的 `update:model-value` 现在携带 `| undefined`。**

1.7.0 起 35/42 个组件迁到 `defineModel()`；模型 props 缺省投影为 `undefined`，
于是监听 `update:model-value` 的处理器现在会被推断为可能收到 `undefined`。
模板里用 `v-model` 的双向绑定**不受影响**（Vue 对模板侧做了豁免）；受影响的是
在 TS 里直接写处理器的地方——例如

```ts
// ✗ 1.7.0 会红：(v: string) => void 收不下 string | undefined
const onUpdate = (v: string) => …
// ✓ 1.8.0 正确写法
const onUpdate = (v: string | undefined) => …
```

**② 改名 / 移目录之后，`file:` 与 vendor 消费方必须重新指路径。**

1.5.1 起库已改名就绪，但两个真实外部消费者（一个 `file:` 依赖、一个 vendor 产物）
在改名后**静默断链**——lock 文件解析不出包，`node_modules` 缺失，零报警。
1.8.0 之前已修复并通过重接入验证（见 `docs/feedback/reverify-2026-11-16.md`）。
如果你也是用 `file:` 或把 `dist/` 复制进仓库的方式接入，升级后请重新指路径并跑一次
你自己的构建，别等线上才发现。

其余：1.8.0 是一次**纯结构重构**——四个巨型组件文件（DatePicker / Select / Chart /
DataTable，共约 7,800 行）拆成各自的 `model.ts` / 组合式 / scoped CSS（`.ts` 里
做纯逻辑，SFC 只留交互接线）。**公开 API、props、样式、行为全部不变**，
`DataTable` 的 32 个 prop 与两个回调 prop 也原样保留。

---

## 三种接入方式

### 1. Vite / Nuxt（推荐）

```ts
// main.ts
import { createApp } from 'vue'
import MochiUI from 'mochi-ui'
import 'mochi-ui/style'

createApp(App)
  .use(MochiUI, {
    size: 'medium',
    theme: { name: 'mochi', colorMode: 'light' },
  })
  .mount('#app')
```

所有组件会被注册为 `M<Name>`（`<MButton>`、`<MDataTable>`…）。

> **为什么是 `M` 前缀？**
> 未加前缀的名字（`Button`、`Input`、`Table`…）会和原生 HTML 标签冲突：
> Vue 的 `<component :is="'button'">` 会优先命中全局注册的 `Button`，
> 导致无限递归。因此默认只注册带前缀的名字。
> 如果你确实需要 `<Button>`，可以显式开启：
>
> ```ts
> app.use(MochiUI, { unprefixed: true })
> ```

### 2. 按需引入（1.4.1 起样式也能按需）

组件用具名导出，样式按组件引用 —— 用多少付多少：

```ts
import { Button, Dialog, Select } from 'mochi-ui'
import 'mochi-ui/style/button.css'
import 'mochi-ui/style/dialog.css'
import 'mochi-ui/style/select.css'
```

每个 `style/<组件>.css` 自己 `@import` 了基础层（`base.css`）和**它在内部渲染的组件**
（Dialog 的页脚里有 Button，就会带上 `button.css`），所以 **一个组件一行就够**，
不用记依赖顺序、也不会漏。实测（Vite 生产构建，gzip）：

| 场景 | `import 'mochi-ui/style'` | 逐组件 import |
| --- | --- | --- |
| 只用一个 Button | 97.2 KB | **19.2 KB**（5.1×） |
| 18 个组件的真实页面 | 97.2 KB | **36.0 KB**（2.7×） |

> 全量的 `import 'mochi-ui/style'` 继续可用、行为不变；单文件 IIFE 与
> `tailwind.preset.css` 也不受影响。`npm run check:payload` 每次构建都会
> 真打一个消费者应用把这张表量一遍 —— 数字对不上就红。

##### 每个组件 CSS 的传递依赖链（1.8.0 实测，`dist/styles/*.css` 的 `@import` 闭包）

一个组件 CSS 拉进来的不止 `base.css`。如果你把 `check-styles` 一类的
「不多余即红」门禁装在消费侧，**`needed` 按 `@import` 闭包算**，
否则 `popover.css` 这类只存在于传递依赖里的包会永远互斥
（LyricsX 实际踩过：`popconfirm.css` 内部 `@import "./popover.css"`，
按需逐条列时两条规则互斥 —— 规则 5 红与规则 4 红二选一。修法就是闭包）。

| 组件 | 还带上 |
|---|---|
| `modal` | `dialog` · `button` |
| `popconfirm` | `popover` · `button` |
| `tour` | `button` |
| `image` | `image-group` |
| `page-header` | `avatar` |
| `thing` | `avatar` |
| `kpi-card` | `sparkline` |
| **65 个组件**（含 `icon` 本身之外的绝大多数组件——它们内部渲染 `<McIcon>`） | `icon` |

> **实用结论**：所有传递依赖链都可用 `dist/styles/<组件>.css` 里的
> `@import` 行直接读到；**多 import 一行不算错**——如果你不想记这张表，
> 把直接 import 到的每一个 CSS 都显式列出、让门禁按闭包判即可。
> 顺带：`mochi-ui/styles/*.css` 与 `mochi-ui/style/*.css` 双路径都解析，
> 文档里两种写法都能用。

#### 公共动画词表是按需的（1.5.0）

`CONVENTIONS.md` 里登记了 46 个全局 keyframe，其中 16 个**库内没有组件在用**。
它们从 1.5.0 起不再进默认样式表 —— 不写这些名字的项目不再为它们付费：

```ts
// 只有当你自己写了下面这些名字之一，才需要这一行：
import 'mochi-ui/style/motion-vocabulary.css'
```

`mc-nod`（空状态点头）、`mc-shimmer-x`（骨架屏扫光）、`mc-expand-v` /
`mc-collapse-v`（手风琴）、`mc-slide-in-*` / `mc-slide-out-*`（方向揭示）、
`mc-draw`（图标自绘）、`mc-ring-breathe`、`mc-squish-y`、`mc-spinner-draw`、
`mc-dash-march`、`mc-liquid-b`、`mc-fade-out`、`mc-slide-down` 都在里面。
名字、时长、缓动与 1.4.x **逐字节相同**；组件自己在用的动画（含 `burst.ts`
用代码拼出来的 `mc-particle-fly`）仍然随 `mochi-ui/style` 一起发。

### 3. 单文件引用（任意网页项目）

`dist/mochi-ui.standalone.js` **一个文件**包含全部组件 + 样式 + Vue 运行时（含模板编译器）：

```html
<script src="https://unpkg.com/mochi-ui@1.9.1/dist/mochi-ui.standalone.js"></script>
<script>
  const app = MochiUI.createApp({
    template: '<MButton variant="gradient" effect="glow">Hello Mochi</MButton>',
  })
  app.use(MochiUI)
  app.mount('#app')
</script>
```

也可以直接用全局的 `Vue`：

```html
<script>
  const app = Vue.createApp({ /* … */ })
  app.use(MochiUI)
  app.mount('#app')
</script>
```

也可以走 jsDelivr（版本号保持一致）：

```html
<script src="https://cdn.jsdelivr.net/npm/mochi-ui@1.9.1/dist/mochi-ui.standalone.js"></script>
```

完整示例见 [`examples/standalone/index.html`](../../examples/standalone/index.html)。
流体玻璃的独立演示见 [`examples/liquid-glass/index.html`](../../examples/liquid-glass/index.html)
（一个没有任何构建步骤的页面，可以直接看到折射层如何弯折背后的画面）。

其他产物：

| 文件 | 用途 |
| --- | --- |
| `dist/mochi-ui.standalone.js` | **单文件**，含 Vue 运行时与内联样式 |
| `dist/mochi-ui.global.js` | IIFE，Vue 走全局变量，样式已内联 |
| `dist/mochi-ui.mjs` | ESM，Vue 外部化 |
| `dist/mochi-ui.cjs` | CommonJS |
| `dist/mochi-ui.css` | 纯样式表 |

### 4. 无构建 / 静态页接入 recipe

不想装构建工具、只想把组件放进一个静态页面时，按下面四步走：

**① 拷贝 vendor 文件** —— 把 `dist/mochi-ui.standalone.js` 放进站点目录（不要走 CDN，
首屏更稳）：

```html
<script src="./vendor/mochi-ui.standalone.js"></script>
```

**② 先定主题，再挂载** —— 主题属性必须写在 `<html>` 上，而且要**在脚本之前**，
否则首帧会先用默认色相渲染、再跳到你的主题（俗称「闪屏」）。把这段内联
`<head>` 里：

```html
<html
  lang="zh-CN"
  data-mochi
  data-mc-theme="mochi"
  data-mc-color-mode="light"
  data-mc-density="comfortable"
  data-mc-motion="full"
>
```

若主题由用户选择决定，在 `<head>` 里再插一段同步脚本，把已存的偏好写回
`<html>`，顺序依旧是**先写属性，后加载组件**：

```html
<script>
  try {
    const saved = localStorage.getItem('mochi-theme')
    if (saved) {
      document.documentElement.setAttribute('data-mc-theme', saved)
      document.documentElement.setAttribute(
        'data-mc-color-mode',
        saved === 'ink' ? 'dark' : 'light',
      )
    }
  } catch {}
</script>
```

**③ 挂载根节点** —— `MochiUI.createApp()` 接受字符串模板（standalone 版内含
模板编译器），所以不需要 `.vue` 文件：

```html
<div id="app">
  <MButton variant="gradient" effect="glow">一个色相，整站气质</MButton>
</div>

<script>
  const app = MochiUI.createApp({
    template: `
      <div class="wrap">
        <MButton variant="gradient" effect="glow" @click="count++">
          点了我 {{ count }} 次
        </MButton>
        <MChart type="line" :data="series" :height="220" />
      </div>
    `,
    data() {
      return {
        count: 0,
        series: [{ name: '活跃', data: [12, 26, 18, 34] }],
      }
    },
  })
  app.use(MochiUI, { theme: { name: 'mochi', colorMode: 'light' } })
  app.mount('#app')
</script>
```

> ⚠️ **模板要写成字符串，不要从 DOM 里读。** HTML 解析器会把标签名转成小写，
> `document.getElementById('app').innerHTML` 里的 `<MButton>` 会变成
> `<mbutton>` —— 组件再也解析不出来，页面上只会剩下一堆空标签。
> 完整可运行的版本见
> [`examples/standalone-recipe/index.html`](../../examples/standalone-recipe/index.html)。

**④ 宿主主题联动** —— 页面自己已经有主题开关时，用 `syncHostTheme` 把宿主的
`data-theme` 映射过来，并拿到回调去重绘图表：

```ts
import { syncHostTheme } from 'mochi-ui'

const stop = syncHostTheme(document.documentElement, {
  attribute: 'data-theme',
  darkValue: 'dark',
  lightValue: 'light',
  onChange: (mode) => chart.value?.refresh(),
})
```

> 完整可运行的页面见 [`examples/standalone/index.html`](../../examples/standalone/index.html)。
> 上面四步的最小可复制版本见
> [`examples/standalone-recipe/index.html`](../../examples/standalone-recipe/index.html)
> —— 复制过去就能跑，找不到本地 vendor 时会自动回退到 CDN。

---

## 覆盖成本：为什么你的 class 能赢

一次真实的外部接入（Astro 静态站，vendor `dist/`）把这件事量了出来：它给站点里
每一条覆盖规则都加了 `html[data-mochi]` 前缀，写了 15 处 `!important` —— 因为
`html[data-mochi] button { background: none; border: none; padding: 0 }` 的特异度是
**`(0,1,2)`**，而站点自己的 `.hue-dot { background: hsl(…) }` 是 **`(0,1,0)`**。
特异度在文档顺序**之前**比较，所以无论谁的 CSS 先加载，都是库赢。

1.4.5 起，基础重置全部包在 `:where()` 里 —— 它贡献零特异度：

```css
/* base.css：整条选择器 (0,0,1)，任何单类选择器都能覆盖它 */
:where(html[data-mochi]) button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}
```

| 层 | 谁赢 | 怎么写 |
| --- | --- | --- |
| 基础重置（`base.css` 里的裸元素规则：`button` / `a` / `ul` / `img` / `body` / `h1`…） | **你** | `.my-button { background: red }` 一行就够，不需要前缀、不需要 `!important` |
| 链接 hover | **你** | `.site-link:hover { color: … }`；想全站换一种 hover 色就改 `--mc-link-hover` |
| 组件内部（`.mc-dialog` 这类） | 库 | 用 `panelClass` / `--mc-*` 变量（见上一节）；只有真要大改才需要再加一层类 |
| 你的 `@layer` | 看你把它放在哪 | 见下 |
| `MGlobalStyle` 的 `fontFamily` / `background` / `color`（1.9.0 起） | **你** | 这三条注入的规则进了 `@layer mochi.global`（运行时声明，位于 `mochi.utilities` 之后）——你的**未分层** CSS 直接赢，不再需要 `html body.你的` 双特异性写法；其余 props（`font-size` / `scroll-behavior` / `disableSelection` / `baseline`）保持原写法不变 |

关于 `@layer`：**未分层的规则永远赢过分层的规则**。所以只把站点样式放进
`@layer` 会让它输给库 —— 要么两边都进层，要么都别进。只有一种情况建议用层：
你和库都在层里，然后显式声明顺序。

```css
/* 只声明顺序；库的规则不在任何层里，所以它仍然按上面的表工作 */
@layer site.base, site.components, site.overrides;
```

这条契约有两半，各有一道门禁：

| 门禁 | 证明什么 |
| --- | --- |
| `npm run check:contract`（静态） | 扫描 `base.css` 与注入的基线，**任何以裸元素结尾、且设置皮肤属性的规则，特异度必须是零类级**；顺带核对 `style/` 与 `styles/` 两种子路径都解析到真实文件、文档里写的每个样式路径都存在 |
| `npm run check:contract:browser`（真浏览器） | 一个只写单类选择器、并且**先于库加载**的消费者页面：按钮背景 / 描边 / 内边距、色相圆点、链接 hover 都得是消费者的；再用 CDP 的 `Accessibility.getPartialAXTree` 读**浏览器实际算出来的可访问名**（不是我们以为传进去的属性） |

---

## Vendoring · Astro · Teleport

这一节讲「库被复制进另一个仓库之后」。那时 `package.json` 的 `exports` 不存在了，
构建产物就是全部 —— 这类问题在库内永远测不出来。

### 样式子路径：两种拼写等价

`dist/` 里目录叫 `styles/`，而 README 早期一直写 `style/`。1.4.5 起 `exports`
同时暴露两者，vendor 之后也按同一套规则：

```ts
import 'mochi-ui/style/button.css'   // 旧拼写，继续有效
import 'mochi-ui/styles/button.css'  // 目录的真名
import 'mochi-ui/style'              // 全量样式表
import 'mochi-ui/styles'             // 同上
```

vendor 之后没有 `exports`，两种做法都行：直接引 `vendor/mochi-ui/styles/button.css`，
或者加一条顺序敏感的 alias（`{ find: /^mochi-ui\/styles\/(.*)$/, replacement: './vendor/mochi-ui/styles/$1' }`）。
`check:contract` 会核对两种拼写是否都指向真实文件，也会核对文档里写的每条路径是否存在。

### 版本是能读的

一次 vendor 之后，「这个目录是哪个版本」不该靠注释猜。构建会写出三个形状：

```ts
import { VERSION } from 'mochi-ui/version'          // dist/version.mjs
```

```js
// vendor 脚本里校验
const { version } = JSON.parse(readFileSync('vendor/mochi-ui/VERSION.json', 'utf8'))
if (version !== expected) throw new Error(`vendor 版本 ${version} ≠ ${expected}`)
```

`dist/version.mjs`、`dist/version.d.ts`、`dist/VERSION.json` 由构建最后一步写入，
`npm run check:version` 会把它们和 `package.json` 的三处版本一起对齐。

### Astro / Nuxt / 任何 SSR

`Dialog` / `Drawer` / `Select` 这类浮层都会 `Teleport` 到 `<body>`，那需要 `document`：

* Astro 里用 **`client:only="vue"`**（不是 `client:load`）—— SSR 阶段没有 `document`；
* Nuxt 里同理，用 `<ClientOnly>` 包起来；
* 纯 SSR 只渲染静态组件（`Card` / `Table` / `Typography`…）没有问题，库在服务端不崩
  （见下面的「SSR / 环境降级」）。

### Teleport 之后，父组件的 `<style scoped>` 到不了面板

```vue
<template>
  <MDialog v-model:open="open" panel-class="search-sheet">…</MDialog>
</template>

<style scoped>
/* ✗ 不生效：面板在 <body> 里，不在这个组件的 DOM 子树中 */
.search-sheet { background: red; }
</style>

<style>
/* ✓ 全局写（或在 scoped 里用 :global(.search-sheet)） */
.search-sheet { --mc-dialog-width: 640px; }
</style>
```

### 面板的六个层各有自己的入口

`customClass` 只加在**面板**上 —— 这是 1.4.5 之前唯一的入口，于是「给某个对话框单独改
遮罩 / 居中容器 / 头部」只能写全局 `.mc-dialog__overlay`（影响所有对话框）或 `:has()`
反向选择。现在：

```vue
<MDialog
  v-model:open="open"
  headerless
  aria-label="搜索"
  placement="top"
  :offset="88"
  overlay-class="search-backdrop"
  wrapper-class="search-center"
  panel-class="search-sheet"
  body-class="search-body"
/>
```

| prop | 落在哪 |
| --- | --- |
| `overlayClass` | 遮罩层（`Teleport` 的根节点） |
| `wrapperClass`（仅 Dialog） | 居中容器 |
| `panelClass` / `customClass` | 面板本体 |
| `headerClass` / `bodyClass` / `closeClass` | 头部 / 正文 / 关闭按钮 |

* **`headerless`** 不渲染 header（也没有关闭按钮），并且**不再**生成指向空 `<h2>` 的
  `aria-labelledby`；这时请给 `ariaLabel`，否则对话框没有可访问名称（库会提醒一次）。
* **`#header` 插槽**可以整块替换 header —— 搜索面板把输入框放在标题的位置，
  不必再用 CSS 把它藏起来。`#header` 会替换掉带 `aria-labelledby` 的 `<h2>`，
  所以对话框会失去可访问名称 —— 要么给 `ariaLabel`，要么（1.9.0 起）在插槽里的
  标题元素上标 `data-mc-title`，库会自动把它接上（没标 id 的话还会顺手生成一个）。
  两处都没有，库会提醒一次。Drawer 同理。

### 尺寸是自定义属性，不是 inline style

```css
.search-sheet { --mc-dialog-width: 640px; }   /* Dialog，默认 520px */
.settings     { --mc-drawer-size: 392px; }    /* Drawer，默认 420px */
```

`Drawer` 的 `size="100%"` 不会被 92vw 夹住（百分比 = 明确要占满那条边）；
`variant="flat"` 去极光、去模糊、换发丝边（全高设置抽屉要的「纸面」）；
`square` 去圆角；`Dialog` 的 `placement="top" | "bottom"` + `offset` 用来做命令面板。

---

## Tailwind v4

Mochi 不强制依赖 Tailwind，但提供同源预设，让两套体系的颜色保持一致：

```css
/* app.css */
@import 'tailwindcss';
@import 'mochi-ui/tailwind';

<div class="bg-mochi-500 text-white rounded-mochi shadow-mochi">同一套色相</div>
```

预设通过 `@theme inline` 把 `--mc-*` 映射为 `mochi-*` 色板、圆角、阴影与动效。

---

## 换肤与调参

```vue
<script setup>
import { ref } from 'vue'
import { MochiConfigProvider } from 'mochi-ui'

const theme = ref({
  name: 'mint',        // 内置预设：mochi / sakura / peach / amber / mint / sky / violet / crimson / ink / cocoa
  hue: 166,           // 主色相
  accentHue: 196,     // 强调色相
  colorMode: 'light',  // light / dark / auto
  density: 'comfortable', // comfortable / compact  —— 密度轴
  motion: 'full',     // full / half / subtle / off —— 动效轴
  effect: {
    blur: 24,         // 磨砂模糊
    radius: 20,       // 圆角
    squish: 0.92,     // 按压压缩
    lift: 8,          // 悬浮抬升
    sheenSpeed: 3200, // 流光速度
    auroraSpeed: 16,  // 极光周期
    grainAlpha: 0.04, // 颗粒
  },
})
</script>

<template>
  <MochiConfigProvider :theme="theme" global>
    <slot />
  </MochiConfigProvider>
</template>
```

> **换主题时色相会「流动」**：三个品牌色相被注册为可插值的 `@property`，
> 所以切换主题时所有由色相推导出来的表面、文字、描边与光晕都会跟着一起过渡，
> 而不是硬切。`data-mc-motion="off"` 时这段过渡也会一起关闭。

密度与动效也可以**只作用于一段子树** —— 两个轴都有顶层 props：

```vue
<MochiConfigProvider density="compact" motion="subtle">
  <!-- 这一段是紧凑的、克制的，外面照旧 -->
  <MDataTable :rows="rows" />
</MochiConfigProvider>
```

### 字体：包点名的字面要自己装

组件库**不带字体文件**，只带字体栈。缺字面时浏览器**静默回退**——不回退到方块，
但气质会丢一半（一个 `Playfair Display` 报头退成 Georgia 就不像报头了）。
风格包一共点名这几个家族：

| 家族 | 用在哪 | 建议字重 |
|---|---|---|
| **Inter** | 正文 / `dashboard` 报头 | 400–800（variable） |
| **Quicksand** | `gfx-collage` 报头 | 300–700（variable） |
| **Outfit** | `mint-agency` 报头 | 300–700（variable） |
| **Playfair Display** | `crimson-gothic` 报头 | 400–800 |
| **Archivo Narrow** | `poster` 报头 | 400–700（Windows 自带 `Arial Narrow` 可兜底） |
| **Kaushan Script** | `neon-zine` 报头 | 400 |
| **JetBrains Mono** | 代码 / 读数 | 400–500 |

```css
/* 换成你自己的托管地址即可；family 名必须和字体栈里写的一致 */
@font-face {
  font-family: "Playfair Display";
  src: url("/fonts/playfair-display.woff2") format("woff2");
  font-weight: 400 800;
  font-display: swap;
}
```

`h1–h3` 会自动用 `--mc-font-display`；**字重 / 字距 / 大小写要显式加 `.mc-display`**
（写在裸 `h3` 上会压过你自己的 `font-extrabold`）：

```html
<h2 class="mc-display">TREND · NO.04</h2>
```

七个气质令牌可以单独覆写：`--mc-display-weight` `--mc-display-tracking`
`--mc-display-leading` `--mc-display-transform` `--mc-display-style`
`--mc-shadow-alpha` `--mc-shadow-spread`。

**组件内部的标题也会跟着包走。** `MDialog` / `MModal` / `MDrawer` / `MTour` /
`MResult` / `MErrorBoundary` 的标题吃一套**派生**的标题寄存器 `--mc-title-*`：
家族、字距、大小写、斜体照搬包的显示节奏，**字重封顶 700**——所以默认外观与
以前完全一致，而 `poster`（700 + 大写）和 `mint-agency`（300 细体）一打开对话框
就能看出区别。想单独调：

```css
.my-app { --mc-title-weight: 600; }   /* 只改组件标题，不动报头 */
```

> **浮层与主题作用域**：`MDialog` 这类浮层会被 `Teleport` 到 `<body>`。
> 用 `<MochiConfigProvider pack="poster" :global="false">` 限定一段子树时，
> 浮层会自己把作用域声明回去（库内已处理）；**你自己写的 Teleport 浮层**要照做，
> 见 `useOverlayScope`。`theme.hue` 这类**内联**覆写不会跟随——需要它就用 `global`。

| 轴 | 取值 | 作用范围 |
| --- | --- | --- |
| `density` | `comfortable`（默认） · `compact` | 间距、圆角、行高、控件高度 |
| `motion` | `full`（默认） · `half` · `subtle` · `off` | 所有时长与缓动（`off` 等于页内版 `prefers-reduced-motion`） |

> 两个轴也可以写进 `theme` 里（`theme.density` / `theme.motion`），那是**全局**
> 写法；props 优先，适合"一页之内局部紧凑"这种需求。

任何 CSS 变量都可以直接覆写：

```css
.my-app {
  --mc-h: 196;
  --mc-radius-xl: 12px;
  --mc-blur: 30px;
}
```

---

## 效果工具类（公开 API）

| 类名 | 效果 |
| --- | --- |
| `mc-glass` / `mc-glass-strong` / `mc-glass-weak` | 三档磨砂玻璃 |
| `mc-aurora` | 流动极光网格 |
| `mc-grain` / `mc-dots` | 颗粒 / 网点纹理 |
| `mc-gradient-text` | 光谱渐变文字 |
| `mc-sheen` | 悬停流光扫过 |
| `mc-hover-lift` / `mc-hover-tilt` | 悬浮抬升 / 3D 倾斜 |
| `mc-squish` | 按压回弹 |
| `mc-float` / `mc-breathe` / `mc-blob` / `mc-halo` | 漂浮 / 呼吸 / 有机形状 / 光环 |
| `mc-scroll` / `mc-truncate` / `mc-line-clamp-1…4` | 滚动条 / 省略 / 多行截断 |

**高级光效（第二层）** — 第一层给表面*质感*，这一层给表面*生命*：

| 类名 | 效果 |
| --- | --- |
| `mc-edge-light` / `mc-edge-specular` | 永不停止的活体描边 / 沿边缘滑过的高光 |
| `mc-prism` | 棱镜色散，一道彩虹带横穿表面 |
| `mc-spotlight` | 跟着指针走的柔光 |
| `mc-liquid` | 两团高光错相位滑过磨砂玻璃 |
| `mc-mesh` | 四团色斑织成的底色 |
| `mc-scan` | 向下扫过的光带 |
| `mc-frost` | 顶边霜光 |
| `mc-orbit` | 绕着图标转圈的彗星光 |
| `mc-stagger` | 列表错峰入场（子项设 `--mc-i`） |
| `mc-wave-divider` | 波浪分割线 |

**背景预设** — 页面底子不该是一块死板的纯色：

| 类名 | 效果 |
| --- | --- |
| `mc-bg-mesh` | 四团色斑织成的流动底色 |
| `mc-bg-grid` | 像素网格「HUD 地板」，带径向淡出 |
| `mc-bg-dots` | 安静的点阵（控制台味） |
| `mc-bg-noise` | 胶片颗粒底纹 |
| `mc-bg-beam` | 斜切下来的光柱 |

**组合语汇** — 这些不是组件，是「固定拼法」。以前每块屏都手写一遍，现在一个类名：

| 类名 | 效果 |
| --- | --- |
| `mc-badge-stack` + `mc-badge-stack__badge` | 圆徽章压在卡片 / 头像**外**角（圆环取页面底色） |
| `mc-connector`（`--v` / `--dots`） | 面板之间的 1px 发丝连线，两端可加圆点 |
| `mc-title-arrow` | 区块标题 + `»`（生成内容，悬停右移） |
| `mc-diamond` | 菱形闪烁点（`--mc-diamond-size` / `--still`） |
| `mc-ribbon--arc` | 弧线缎带（配 `.mc-ribbon` 的长度变量） |

> 卡片叠角标不在这里 —— 它是 `Card` 的 `#corner` 插槽。

**交互纪律（会咬人）** — 容器（行 / 列表项 / 卡片 / 分组）的按压**只能沉降**：

```css
/* 对：往下沉 1px，横向不动 */
.mc-tree__node:active { transform: translateY(var(--mc-press-dip)); }
/* 错：行缩了，行里的复选框和展开箭头会跟着缩——指针没动，控件却挪走了，
   mouseup 命中失败，慢按就"没反应"（实测 18px 箭头被挪 15.42px） */
.mc-tree__node:active { transform: scale(var(--mc-press-scale)); }
```

`npm run check:press` 用真浏览器慢按一遍来守这条线。

**材质分层与交互** —

| 类名 | 效果 |
| --- | --- |
| `mc-glass-tier-1/2/3` | 三档玻璃强度（阴影 + 模糊 + 边缘一次到位） |
| `mc-glass-inset` | 玻璃内壁的高光层（角度与强度由令牌控制） |
| `mc-magnetic` | 磁吸悬浮（配合 `useMagnetic` 发布指针位置） |
| `mc-grow-bar` / `mc-grow-bar-x` | 条形图生长入场 |
| `mc-draw-line` | 折线图描线入场 |
| `mc-donut-in` | 环形图扫开入场 |

**流体玻璃** — 「Lens」的第二代。磨砂玻璃是一块平板，流体玻璃是一个*体积*：
它弯折边缘的光，在上缘抓住一道镜面高光，再在下缘把它拆成彩色。

| 类名 | 效果 |
| --- | --- |
| `mc-liquid-glass` | 纯 CSS：磨砂体 + 镜面边缘 + 色散带 + 染色（任何浏览器可用） |
| `mc-liquid-glass--refract` | 追加一层**真实折射**（SVG `feDisplacementMap`，仅 Chromium） |
| `mc-liquid-glass--subtle` / `--strong` / `--pill` / `--dark` | 薄膜 / 厚玻璃 / 药丸 / 暗色 |

对应组件：`<MLiquidGlass>`、`<MCard variant="liquid">`、`<MButton variant="liquid">`。

---

## 滚动条 · 两种做法

| 场景 | 做法 |
| --- | --- |
| **普通滚动区**（列表、预览、日志） | 给容器加 `.mc-scroll` —— 原生滚动条被换成库里的细玻璃滑块，明暗两套都跟手 |
| **需要完全自绘**（控制台、编辑器、播放列表） | 用 `<MScrollbar>` —— 自绘轨道 + 箭头 + 可拖拽滑块，带 `role="slider"` 与键盘操作 |

```html
<!-- ① 原生滚动条，统一外观：只要一个类名 -->
<div class="mc-scroll h-64 overflow-y-auto">…</div>
```

```vue
<!-- ② 自绘滚动条：内容放进默认插槽，尺寸用 height / max-height -->
<MScrollbar :height="320" label="歌词列表">
  <p v-for="line in lines" :key="line">{{ line }}</p>
</MScrollbar>
```

> `.mc-scroll` 不改滚动行为，只改**外观**：滚动条宽度、滑块颜色、悬停态
> 全部走 `--mc-scrollbar-*` 令牌，所以明暗主题天然一致。
> 需要横向滚动时同理（`overflow-x: auto` + `.mc-scroll`）。

---

## 键盘与浮层

浮层不是各自处理 `Escape`：全库 **22 个**处理 Escape 的组件注册进同一座层栈
（`useOverlayStack`），按一次只关**最上层**。所以：

* Dialog 里再开一个 Dialog，Esc 只关上面那个，焦点回到父层里的触发按钮；
* Dialog 里的 Popover / Select 关闭时，**不会连带关掉 Dialog**；
* 可搜索 Select 关闭时焦点交回 combobox，不会掉到 `<body>`；
* Dropdown 是完整的 ARIA menu 按钮：`ArrowDown/ArrowUp` 进入 / 轮转，
  `Home/End` 到首尾，`Esc` 或选中后焦点回触发点，`aria-controls` 指向菜单；
* 模态层（`aria-modal="true"`）拥有 Tab 循环；非模态 Popover 不困住 Tab。

**「能聚焦」和「能操作」是两件事。** 浏览器只给原生 `button` / `a` / `input` 派发
Enter / Space → click；`<span tabindex="0">` 不会因为写了 `role="combobox"` 就响应按键。
1.4.2 把全库 **44 个可聚焦面**逐个走了一遍键盘：

* **Popselect** 关闭态就能用 `Enter` / `Space` / `ArrowDown` 打开（`ArrowUp` 从末项打开），
  选中后焦点留在触发点；
* **Cascader** 打开时用 `aria-activedescendant` 把方向键高亮念出来，`ArrowRight` / `ArrowLeft`
  进列 / 退列；
* **Popconfirm** 的异步确认：等待期焦点停在面板里（不会被 `disabled` 甩到 `<body>`），
  失败后回到确定按钮，成功回触发点；
* **ImageGroup** 灯箱：方向键翻页、`Tab` 在灯箱内回环、`Esc` 回到打开它的那一格；
* **FloatButton** 关闭时隐藏的 action 不在 Tab 序列里，选中后焦点回主按钮，`Esc` 关闭；
* `<MCard focusable>` / `<MTag focusable>` / `<MAvatar interactive>` / `<MWatermark interactive>` /
  `<MDivider interactive>` 现在 `Enter` / `Space` 会像 `<button>` 一样派发 `click`。

门禁：`npm run check:overlay-stack`（静态，22/22）、`npm run check:keyboard`
（静态，46 个可聚焦面）与 `npm run check:focus`（真浏览器 **156 项**，含 3 个嵌套场景
和灯箱 / 异步确认 / **分窗列表** / **分窗树** / **`Transfer` 两栏**，需要 `build:lib` + Edge）。

---

## 大列表：付多少元素，是能选的

一个 `<li>` 一个选项，在 20 个选项时无所谓，在 1500 个时是 **9013 个元素**、
挂一次 **92 ms**——而且这期间页面是白屏的。1.4.3 起有几个组件给了你**逃逸口**：

| 组件 | 开关 | 效果 |
|---|---|---|
| `Select` | `virtual` | 1500 个选项 **9013 → 110** 个元素，挂载 **70–93 → 1.7–4.3 ms** |
| `Tree` | `virtual` + `maxHeight` | 1500 个兄弟 **6002 → 79** 个元素，挂载 **617 → 3.3 ms** |
| `Transfer` | `virtual` | 1200 行 **3628 → 71** 个元素，挂载 **114.6 → 1.1–1.3 ms**（两栏各仍有且只有一个 Tab 站） |
| `DataTable` | `virtual` | 20000 行仍是 **327** 个元素 |
| `Log` | `virtual` | 5000 行仍是 **223** 个元素 |
| `VirtualList` | 天生如此 | 20000 项仍是 **20** 个元素 |

```vue
<MSelect v-model="city" :options="cities" virtual placeholder="城市" />
<!-- 行高不是默认的 40px 时自己报： -->
<MSelect :options="cities" :virtual="{ rowHeight: 32, overscan: 8 }" />

<!-- 树是内容高度，所以 virtual 还要一个高度（不传默认 24rem） -->
<MTree :data="treeData" virtual :max-height="420" />

<!-- 双栏：1.4.6 起每栏是一个多选 listbox，所以分窗不再删掉 Tab 站 -->
<MTransfer v-model="keys" :data="rows" virtual filterable />
```

三个前提值得知道：

* **行高必须齐**。带 `description` 的选项、分组表头、`allow-create` 的创建行都会让行高不一——
  这些列表在 `virtual` 下**仍然全渲染**，因为 spacer 撑出来的滚动条会说谎。
* **`aria-setsize` / `aria-posinset` 已经接好**，读屏报的是"第 46 项，共 300 项"，
  不是"第 7 项，共 12 项"。方向键走出渲染片段时窗口会**跟着滚**（`check:focus` 里有这两节）。
* **分窗的行不播入场动画**。stagger 是「介绍一棵树」，不是「每滚一格重放一次」——
  不关掉的话滚动看起来像列表在指针下面被重建。

想知道别的组件建不建这么多元素？`npm run check:perf` 会给出一张**「元素/行」台账**
（14 个场景 × 2 个音量 × 4 次挂载）：窗化的写 **0.00**，按行付费的写清楚一行的价钱。

## 一次操作要多少钱（1.4.4 起）

挂载只付一次，**操作要付每一次**。同一道门禁现在还有第二条台账——
`interact`：9 个真实操作各量一步（打字 / 点表头排序 / 勾选 / 展开），
**与挂载分开记账、分开预算**：

| 操作 | 小 | 大 | 有逃逸口之后 |
|---|---|---|---|
| `Select` 打一个字符（1500 选项） | 5.2 ms | **79.7 ms** | `virtual` → **1.8** |
| `DataTable` 点一次排序（1000 行） | 16.4 ms | **615 ms** | `virtual` → **23.1** |
| `Tree` 展开一个 60 子节点的分支 | 4.9 ms | 33.7 ms | `virtual` → **2.7** |
| `Transfer` 勾一个勾选框（1200 行） | 2.6 ms | **19.6 ms** | `virtual` → **1.8**（3000 行） |

`Transfer` 是 1.4.6 才拿到的逃逸口，路径与上面三个不同：它先换了**控件模型**——两栏各是一个
多选 listbox（每栏**一个** roving Tab 站，方向键 / Home / End / PageUp / PageDown / Space），
然后才允许 `virtual`。所以 300 行的 Tab 站从 300 个变成 2 个，分窗不再把任何一行从键盘路径里
删掉；`aria-setsize` / `aria-posinset` 报的仍是整份列表里的名次。

---

## 三个容易踩的约定

### ① 浮层的默认插槽是「触发锚点」，不是「面板内容」

`Tooltip` / `Popover` / `Popconfirm` 都把触发元素包在一个 `<span>` 里。
**默认插槽 = 被提示的那个东西**；气泡 / 面板的正文走 `content` / `text` /
`#content` 插槽。

```vue
<!-- ✅ 按钮是锚点，文字是气泡 -->
<MTooltip content="这是一段提示文字">
  <MButton>按钮</MButton>
</MTooltip>

<!-- ✅ 富文本气泡 -->
<MTooltip>
  <template #content><b>带图标的气泡</b></template>
  <MButton>按钮</MButton>
</MTooltip>

<!-- ✅ 面板：默认插槽是锚点，正文在 #content -->
<MPopover title="关于">
  <MButton>展开</MButton>
  <template #content><p>面板正文</p></template>
</MPopover>
```

> 早期版本把默认插槽**同时**渲染进气泡和锚点，于是按钮会出现在气泡正文里。
> 现在两个位置各司其职，锚点与气泡不会再串台。

### ② Tabs 放进 flex 布局：高度链要齐

`Tabs` 自带高度链（`.mc-tabs__panels` / `.mc-tabs__panel` 都有
`flex: 1 1 auto; min-height: 0`），面板**自己就是滚动容器**。
在 flex 列容器里加 `fill`，Tabs 会吃掉父级剩下的高度：

```html
<div class="flex h-72 flex-col overflow-hidden">
  <MTabs fill>
    <template #preview>
      <!-- 内容超出时在面板里滚动，不会把父容器撑高 -->
      <ul>…</ul>
    </template>
  </MTabs>
</div>
```

> ⚠️ 少了 `min-height: 0`（或 `fill`）时，flex 子项的自动最小尺寸会按内容
> 高度算 —— 于是面板被父容器裁掉，**滚轮没反应、也没有滚动条**，但
> `scrollIntoView()` 还能用，极难排查。

### ③ 图标名写错时，开发模式会画一个占位

`name` 写错（比如 `arrowup` 而不是 `arrow-up`）以前只会渲染一个**空白的
`<svg>`** —— 「图标加载失败」和「这个操作本来就没图标」在视觉上完全一样。
现在：

* 少写连字符的名字会自动纠正（`arrowup` → `arrow-up`、`messagecircle` → `message-circle`）；
* 真的不认识的名字，**开发模式**会画一个虚线问号占位，并在控制台报警；
  生产模式仍然什么都不画（不留永久痕迹）。

图标名的完整清单见 [`ICONS.md`](./ICONS.md)，或演示站的可检索图标墙。

---

## 组件总览

**基础（18）** Avatar · Button · Card · Carousel · Collapse · Divider · Dropdown · Ellipsis ·
GradientText · Icon · PageHeader · Tag · Typography · Watermark · FloatButton ·
**Aurora ✨** · **LiquidGlass ✨** · **Segmented ✨**

**数据录入（22）** AutoComplete · Cascader · ColorPicker · Checkbox · DatePicker · DynamicInput ·
DynamicTags · Form · Input · InputNumber · InputOTP · Mention · Radio · Rate · Select · Slider ·
Switch · TimePicker · Transfer · TreeSelect · Upload · **Signature ✨**

**数据展示（29）** Calendar · Countdown · Code · DataTable · Descriptions · Empty · Equation ·
Image · List · Log · NumberAnimation · QRCode · Statistic · Table · Thing · Time · Timeline · Tree ·
InfiniteScroll · Highlight · Heatmap · **Barcode ✨** · **Diff ✨** · **Emoji ✨** · **Sparkline ✨** ·
**KpiCard ✨** · **Chart ✨** · **Prose ✨** · **ImageGroup ✨**

**导航（10）** Affix · Anchor · BackTop · Breadcrumb · LoadingBar · Menu · Pagination · Steps ·
Tabs · **Dock ✨**

**反馈（18）** Alert · Badge · Dialog · Drawer · Marquee · Message · Modal · Notification ·
Popconfirm · Popover · Popselect · Progress · Result · Skeleton · Spin · Tooltip · **Tour ✨** ·
**ErrorBoundary ✨**

**布局（7）** Flex · Layout · Grid · Space · Split · **Masonry ✨**

**工具（6）** CollapseTransition · DiscreteAPI · Scrollbar · VirtualList · **CommandPalette ✨** ·
**ClipboardButton ✨**

**配置（3）** ConfigProvider · Element · GlobalStyle

---

## 组合式 API 与工具

| 名称 | 作用 |
| --- | --- |
| `useInView` | 元素进入视口 —— 滚动入场与错峰编排 |
| `useDebounce` / `useThrottle` | 统一的防抖 / 节流，带 `cancel` / `flush` |
| `useMagnetic` | 磁吸悬浮（配合 `.mc-magnetic` 工具类） |
| `useHostTheme` / `syncHostTheme` | 宿主主题联动，映射 `data-theme` → `data-mc-color-mode` |
| `useHeadings` | 扫正文 h2/h3，自动生成目录（喂给 `Anchor`） |
| `useLocalSearch` | 客户端模糊搜索（喂给 `CommandPalette`） |
| `useClipboard` | 复制到剪贴板（含 `execCommand` 降级） |
| `formatBytes` / `formatDuration` / `formatRelativeTime` / `formatPercent` | 共享格式化器 |
| `contrastRatio` / `checkContrast` / `bestForeground` | WCAG AA 对比度校验（审计脚本同款算法） |
| `safeStorage` | 隐私模式 / iframe 下不抛错的 `localStorage` |
| `useTriggerAnchor` | 判断浮层的触发包装里是否已有可聚焦元素（避免嵌套交互元素） |
| `activateOnKey` / `isActivationKey` | 给非原生可聚焦面补上 `<button>` 的 `Enter` / `Space` → click 语义（配 `@keydown.self`） |
| `v-mc-burst` | 点击粒子指令 |

### 对比度守护（开发期自查）

`utils/contrast.ts` 就是 `npm run check:contrast` 用的那套算法，可以在页面里
随时验证一组颜色：

```ts
import { checkContrast, bestForeground } from 'mochi-ui'

const report = checkContrast('#8ab4f8', '#1b1c22')
// → { ratio: 7.9, aa: true, aaLarge: true, aaa: true }

bestForeground('#f472b6') // → '#111111' 或 '#ffffff'（自动挑对比度更高的那个）
```

> 品牌填充是随**运行期色相**算出来的，亮度会变 —— 所以写死白字在薄荷绿上只有
> `1.62 : 1`。库里所有品牌填充上的文字色都由 `applyAdaptiveText` 在运行时按
> 真实填充色算好（`--mc-on-primary` / `--mc-on-solid` / `--mc-on-gradient` …），
> 自定义填充时也请用同一套令牌。

## 体积与按需

| 产物 | raw | gzip | 说明 |
| --- | --- | --- | --- |
| `mochi-ui.mjs` | 774.8 KB | 200.7 KB | ESM，Vue 外部化；**按需引入时由打包器摇树** |
| `mochi-ui.cjs` | 710.7 KB | 181.7 KB | CommonJS，Vue 外部化 |
| `mochi-ui.css` | 746.4 KB | 96.9 KB | 全量样式表（全部效果工具类 + 120 个组件） |
| `styles/base.css` | 98.9 KB | 17.3 KB | **按需引入时要付的基础层**（令牌 / 重置 / 动效 / 工具类 / 配方层） |
| `styles/<组件>.css` | 中位数 4.8 KB | 中位数 1.3 KB | 单个组件的样式，`@import` base + 它内部渲染的组件 |
| `mochi-ui.global.js` | 1456.5 KB | 278.9 KB | IIFE，Vue 走全局变量、不含模板编译器 |
| `mochi-ui.standalone.js` | 1514.7 KB | 336.4 KB | 单文件，含 Vue 运行时与模板编译器 |
| `version.mjs` / `VERSION.json` | < 1 KB | — | 构建产物的版本，`import { VERSION } from 'mochi-ui/version'` 或直接读 JSON |

> 图表是自绘 SVG（`MChart`），不是 ECharts —— 这是「一个图表组件」与「一整个图表库」
> 的体积差别。按需引入时未使用的组件会被摇掉，只用 `MButton` 不会把 `MChart` 拖进去。

**样式也是按需的（1.4.1）**：`dist/styles/` 是全量样式表的一份**完整划分**——
每个组件的 `<style scoped>` 编译出的选择器都带着自己的 `data-v-*` 作用域，
构建按这个作用域把样式切给各自的文件，所以「漏一条 / 多一条」是可测的：

| 门禁 | 抓什么 |
| --- | --- |
| `npm run check:styles` | 分包必须**逐块等于**全量样式表（顺序也不能变）；每个组件的 `@import` 必须等于它在 `.vue` 里 import 的依赖；再逐个 SSR 渲染 119 个组件，它们渲染出的 class 与作用域必须被自己的样式文件覆盖 |
| `npm run check:payload` | 真打两个消费者应用（1 个组件 / 18 个组件），比较全量与按需的 gzip 字节 |
| `npm run check:split` | 真浏览器：120 个组件各挂两遍（全量样式 vs `base + 本组件`），逐元素比对**计算样式**（~78 个属性，含 `::before` / `::after`）——分包只要改变一点观感就红 |
| `npm run check:keyboard` | 静态：46 个可聚焦面（`tabindex` 求值为 0 的非原生元素）必须有 `@keydown`；只读 role（滚动容器 / `progressbar` / `tabpanel`）自动豁免 |
| `npm run check:perf` | 真浏览器：**12 个场景 × 2 个音量 × 4 次挂载**，量每个场景的**活元素数**、监听器、布局次数与挂载耗时，算出「元素/行」——窗化的必须保持平坦，线性的按行记账 |
| `npm run check:contract` | 静态：裸元素皮肤规则的特异度必须是零类级（消费者的单类选择器永远赢）；`style/*` 与 `styles/*` 两种子路径都解析到真实文件；文档里写的每条样式路径都存在 |
| `npm run check:contract:browser` | 真浏览器：只写单类选择器、且**先于库加载**的消费者页面里，覆盖仍然生效；用 CDP 的 AX 树读 Select / Segmented / Slider / Dialog 的**实际可访问名**；Drawer 初始焦点、Dialog `headerless` / parts / `placement` / 宽度变量逐条断言 |

> `check:split` / `check:perf` / `check:contract:browser` 需要本机有 Edge / Chrome，所以和
> `check:press` / `check:focus` / `check:packs` 一样不串进 `npm run check`（那 19 道只依赖 Node）。
> 想一次跑完六道：`npm run check:browser`（**跳过也会明说跳过了什么**）。

## SSR / 环境降级

* 组件在服务端渲染时不会崩：`useFloating` 在没有 `IntersectionObserver` /
  `ResizeObserver` 的环境下降级为静态定位，`requestAnimationFrame` 有 `setTimeout`
  兜底（见 `src/utils/index.ts`）。
* `useInView` 在旧引擎里直接把元素判为「可见」，内容永远不会卡在入场动画后面。
* `safeStorage` 在隐私模式与 sandbox iframe 里自动退化为内存存储。
* `syncHostTheme` 只在浏览器里注册 `MutationObserver`，服务端调用是无副作用的空函数。

---

## 设计令牌架构

```
Layer 1  Primitive   --mc-h  --mc-s  --mc-radius-*  --mc-dur-*  --mc-ease-*  --mc-blur
Layer 2  Semantic    --mc-bg  --mc-surface-*  --mc-text-*  --mc-border  --mc-accent  --mc-glass-*
Layer 3  Component   --mc-btn-height-*  --mc-input-radius  --mc-card-padding  --mc-overlay-*
```

`--mc-h`（主色相）、`--mc-h2`（强调）、`--mc-h3`（渐变尾色）三个值即可推导出一整套界面。

---

## 材质系统 · Material System

100+ 个组件之所以看起来像同一套设计，而不是拼凑出来的零件，靠的是一套硬性约束。

### 四种表面原型（Surface Archetypes）

任何新组件都必须从这四种里取材，**不得自造背景 / 圆角 / 阴影组合**。

| # | 原型 | 用途 | 令牌 |
|---|---|---|---|
| **A** | **浮层 Panel** | 下拉、气泡、模态、抽屉、通知、命令面板、选择器面板 | `--mc-panel-bg` `--mc-panel-radius` `--mc-panel-border` `--mc-panel-shadow` `--mc-panel-blur` |
| **B** | **面板 Sheet** | 卡片、表格外壳、列表、代码、统计块 | `--mc-sheet-bg` `--mc-sheet-radius` `--mc-sheet-border` `--mc-sheet-shadow` `--mc-sheet-padding` |
| **C** | **凹槽 Well** | 输入框、搜索框、验证码格、骨架屏、进度槽 | `--mc-well-bg` `--mc-well-radius` `--mc-well-border` `--mc-well-shadow` |
| **D** | **胶囊 Chip** | 标签、角标、状态点、小药丸 | `--mc-chip-bg` `--mc-chip-radius` `--mc-chip-border` `--mc-chip-height` |

对应工具类：`.mc-panel` `.mc-sheet` `.mc-well` `.mc-chip`

### 四种签名光效（Signature Effects）

每个组件至少带一种。

| 效果 | 类名 | 说明 |
|---|---|---|
| **流光** | `.mc-sheen-sweep` | 悬停时一道光斜切过表面 |
| **颗粒** | `.mc-grain-overlay` | 极细胶片颗粒，消除纯色的塑料感 |
| **内极光** | `.mc-aurora-inset` | 一团彩色光活在表面内部，缓缓漂移 |
| **光晕** | `.mc-glow-accent` / `.mc-glow-danger` | 聚焦 / 强调时的外发光 |

### 方向性边缘光（Directional Rim）

表面是**体积**，不是一块模糊的矩形。边缘光告诉你光从哪来：

* **凸面**（浮层 / 面板，浮在页面上方）：**左上**亮、**右下**暗
* **凹面**（凹槽 / 输入框，陷进页面里）：**左上**暗、**右下**回弹

两者都用 `--mc-glass-rim-light` / `--mc-glass-rim-dark` / `--mc-glass-rim-blur` /
`--mc-glass-inner-blur` 表达，所以整套库共享同一个光照模型。

### 第二轴 · 密度与动效

除了色相，每个组件还要回答两个问题：**多密**、**多动**。

```html
<html data-mc-density="compact" data-mc-motion="half">
```

| 轴 | 取值 | 作用 |
| --- | --- | --- |
| 密度 | `comfortable` · `compact` | 整体缩放间距、控件高度、行高与圆角 |
| 动效 | `full` · `half` · `subtle` · `off` | 缩放全部动效时长（`off` ≡ `prefers-reduced-motion`） |

### 交互令牌

`--mc-focus-ring` `--mc-press-scale` `--mc-lift-sm` `--mc-hover-tint`
`--mc-glow-accent` `--mc-glow-danger`

### 动态堆叠

浮层不再依赖固定 z-index 阶梯，而是打开时向 `useZIndex` 申请一个槽位——
所以「模态框里的下拉」永远在最上层，不会打架。

```bash
npm run audit   # 逐组件视觉打磨审计（原型 / 光效 / 交互态 / 令牌纪律）
```

---

## 开发

```bash
npm install
npm run dev        # 文档站
npm run build      # 组件库 + 文档站
npm run audit      # 视觉打磨审计
npm run verify     # 自查表覆盖率
npm run check      # 19 道静态门禁（含 check:keyboard / check:contract）
npm run check:browser # 6 道真浏览器门禁统一入口（contract / press / focus / split / perf / packs）
npm run check:focus # 真浏览器键盘 / 焦点（156 项，需要 build:lib + Edge）
npm run check:perf  # 真浏览器运行代价（12 个场景的「元素/行」台账）
npm run check:contract       # 静态：消费者单类覆盖 + 子路径 + 文档路径
npm run check:contract:browser # 真浏览器：单类覆盖 / 可访问名 / 浮层契约
npm run check:render  # 逐组件 SSR 渲染冒烟
```

组件编写规范见 [`CONVENTIONS.md`](./CONVENTIONS.md)。

---

## License

MIT
