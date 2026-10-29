# Mochi UI 使用反馈：Bug、API 缺口与建议

> 反馈对象：`mochi-ui@1.4.4`（本地源码 `packages/mochi-ui`，`package.json:3`）
> 使用项目：STide v1.0.0（Astro 7 + Vue 3.5 + 静态站，vendor 构建产物）
> 范围：Dialog、Drawer、Select、Segmented、Slider、Icon、全局 base 样式、打包与文档
> 结论：视觉与动效完成度高；问题集中在 **消费者覆盖成本、表单可达性、overlay 可组合性、文档/路径一致性** 四类。
> 本文既是问题清单，也是可直接提 issue 的草稿；每条都附了库内位置、项目内复现与绕过方式。

## 0. 快速总表

| ID | 组件/层 | 级别 | 问题 | 本项目表现 |
|---|---|---|---|---|
| F1 | 全局 base.css | P1 | `html[data-mochi] button` 重置特异性过高，普通 class 无法覆盖 | 色相点、壁纸块变透明；被迫用 `html[data-mochi] .hue-dot` |
| F2 | 全局 GlobalStyle | P2 | `html[data-mochi] a:hover` 强制 accent 色 | 站点自己的链接 hover 被改写 |
| F3 | Select | P1 | `aria-label` / `aria-labelledby` 无法传给 combobox | 设置里的字体选择器没有可访问名称 |
| F4 | Segmented | P1 | 图标选项没有 text / aria-label，可访问名称为空 | 外观三态在屏幕阅读器里是三个无名 radio |
| F5 | Slider | P1 | `aria-label` 硬编码为英文 `Value N` | 色相滑杆无法本地化，也不能说明用途 |
| F6 | Drawer | P2 | 打开后焦点落在关闭按钮；无 `initialFocus` | 设置抽屉一开，右上角 × 出现焦点环 |
| F7 | Dialog/Drawer | P1 | 无 headerless / `aria-label`，`customClass` 只到 panel | 搜索、设置都要用 CSS 隐藏 header，aria-labelledby 指向空标题 |
| F8 | Dialog | P2 | 只能居中，不能 top 定位；宽度是 inline style | 搜索浮层靠 `:has` 改 overlay/wrapper 才到 13vh |
| F9 | Drawer | P2 | 右侧抽屉默认圆角 + 内部极光，没有 flat/方形开关 | 全高设置抽屉要覆盖 radius、background-image、shadow |
| F10 | Dialog/Drawer | P2 | 尺寸是 inline style，覆盖需要 `!important` | 站点 app.css 里有 15 处 `!important`，大半是 overlay 适配 |
| F11 | 打包/文档 | P2 | `style/` 与 `styles/` 两套路径；版本、vendor 方式文档漂移 | 站点给 `mochi-ui/styles/*` 加了 Vite alias，注释还写着 1.4.3 |
| F12 | Teleport/SSR | P2 | 文档没有 Astro/SSR/Teleport 下的样式作用域说明 | 父级 scoped CSS 到不了 Dialog/Drawer，只能写全局选择器 |
| F13 | Icon | P3 | `sun-moon` 在 16px 下两个圆弧挤在一起，像断开的环 | 外观三态里的“自动”图标辨识度低 |

## 1. 详细问题

### F1 · 全局 button 重置特异性过高

**现象**

```css
/* mochi-ui: src/styles/base.css:103-108 */
html[data-mochi] button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}
```

任何消费者写的单类选择器都会输给 `html[data-mochi] button`（0,1,2）。本站的色相圆点：

```css
/* 项目里本来应该生效 */
.hue-dot { background: hsl(var(--h) 52% 58%); }
```

实际计算值是 `rgba(0,0,0,0)`，五个色相点全透明；壁纸缩略图同样被清空。最后只能写成：

```css
/* site/src/styles/app.css:2000、2046 */
html[data-mochi] .wall-tile { background: var(--st-raised); }
html[data-mochi] .hue-dot { background: hsl(var(--h) 52% 58%); }
```

**根因**

重置规则用了元素选择器 + 属性选择器，而且没有放进 CSS layer，也没有用 `:where()` 降低优先级。库自己的组件能覆盖，是因为组件 CSS 在更后面加载；普通消费者的 class 样式如果先加载就会输。

**建议**

1. 把 reset 放进 `@layer mochi.base`，或改成 `:where(html[data-mochi]) button`。
2. 在 README 给出“覆盖优先级/加载顺序”一节：
   ```css
   @layer mochi.base, mochi.components, mochi.overrides;
   ```
3. 如果担心 `:where()` 会让 focus 等 reset 输掉，可只对 `background/border/padding` 用 `:where()`，focus 继续保留高特异性。
4. 加一个消费方回归用例：只写 `.consumer-button { background: red }`，断言生效。

**临时绕过**：本项目所有相关规则加 `html[data-mochi]` 前缀；不能用组件内 scoped 样式。

---

### F2 · 全局链接 hover 强制 accent

```css
/* mochi-ui: src/components/global-style/GlobalStyle.vue:85-87 */
html[data-mochi] a:hover {
  color: var(--mc-accent-text);
}
```

本站链接的 hover 本来想保持墨色/下划线，这个规则会优先命中。它同样是“基础交互”而不是组件，消费者很难局部关掉。

**建议**：`html[data-mochi] :where(a:hover)`，或提供 `--mc-link-hover` 且默认 `inherit`；文档说明 baseline 会改所有链接。

---

### F3 · Select 不能命名（a11y）

`Select` 声明了 `inheritAttrs: false`（`src/components/select/Select.vue:7`），但根节点只接收 `class` / `style`：

```ts
/* Select.vue:862-866 */
const rootClass = computed(() => cx(classes.value, attrs.class, props.customClass))
const rootStyle = computed(() => attrs.style as StyleValue | undefined)
```

真正带 `role="combobox"` 的是内部 `div.mc-select__control`（`Select.vue:874`），它没有 `aria-label` / `aria-labelledby`，也没有对应 prop。传 `:aria-label` 会被丢掉。

**复现**

```html
<Select :options="fontOptions" model-value="song" aria-label="字体" />
```

DOM 计算：

```json
{ "selectAria": { "label": null, "labelledby": null } }
```

外部 `<label>` 也不能用 `for` 关联，因为 combobox 是 `div`，`id` 也不会落到它身上。

**建议**

```ts
interface SelectProps {
  ariaLabel?: string
  ariaLabelledby?: string
}
```

模板绑定到 `.mc-select__control`；或者把非 class/style 的 attrs 显式转发到 control。再给一个“可见 label + aria-labelledby”的示例。

---

### F4 · Segmented 图标选项没有可访问名称

```html
<!-- mochi-ui: src/components/segmented/Segmented.vue:406-432 -->
<button role="radio" :aria-checked="...">
  <span class="mc-segmented__content">
    <McIcon v-if="option.icon" :name="option.icon" :size="16" />
    <span class="mc-segmented__label">{{ option.label }}</span>
  </span>
</button>
```

按钮没有 `aria-label` / `title`。当选项只给 `icon`、`label: ''` 时，可访问名称为空。本站外观三态：

```ts
/* site/src/components/islands/SettingsDrawer.vue:31-35 */
{ label: '', value: 'light', icon: 'sun' },
{ label: '', value: 'dark', icon: 'moon' },
{ label: '', value: 'auto', icon: 'sun-moon' },
```

DOM 实测：3 个按钮 `textContent=""`、`aria-label=null`、`aria-labelledby=null`。

**建议**

1. `SegmentedOption` 增加 `ariaLabel?: string`，渲染到按钮；
2. 如果 `label` 为空且没有 `ariaLabel`，开发环境 warn；
3. 文档给出 icon-only 的完整示例：
   ```ts
   { value: 'light', icon: 'sun', ariaLabel: '浅色' }
   ```
4. 加 a11y 测试：每个 `role=radio` 必须有非空 accessible name。

**临时绕过**：给 `options` 传视觉隐藏的 label 或包一层带 `aria-label` 的容器都不理想；本项目目前保留空标签，属于待修项。

---

### F5 · Slider 的 aria-label 硬编码英文

```html
<!-- mochi-ui: src/components/slider/Slider.vue:286-293 -->
<div role="slider" :aria-valuemin="min" :aria-valuemax="max" :aria-valuenow="handle.value"
     :aria-label="`Value ${handle.value}`" ... />
```

色相滑杆需要“色相，0–360”，当前只能读到 `Value 202`，而且是英文。`Slider` 没有 `ariaLabel` / `formatValue` prop，也没有读 `useLocale`。

**建议**

```ts
interface SliderProps {
  ariaLabel?: string              // 用途
  formatValue?: (n: number) => string // 朗读值
}
```

默认文案走 `useLocale()`，并支持 `aria-describedby` 指向外部说明。

---

### F6 · Drawer 打开后焦点落在关闭按钮

`Dialog` 专门处理了初始焦点（`Dialog.vue:85-98`：优先 body 里第一个可聚焦元素，否则标题）。`Drawer` 没有：

```ts
/* mochi-ui: src/components/drawer/Drawer.vue:84 */
useFocusTrap({ enabled: isOpen, container: panel, isTop: isTopModal })
```

焦点陷阱默认聚焦 panel 内第一个可聚焦元素，也就是 header 里的关闭按钮（`Drawer.vue:188-197`）。

**复现**：打开本站设置抽屉，`document.activeElement` 是 `.icon-btn`（关闭按钮），截图上能看到右上角 × 的焦点环。

**建议**

1. 与 Dialog 共用同一套 `initialFocus` 策略；
2. 暴露 `initialFocus?: string | HTMLElement`，默认优先 `[autofocus]`、然后 body 第一个可聚焦元素、最后标题；
3. 关闭按钮不要抢初始焦点；它的 `:focus-visible` 保留给键盘用户即可。

---

### F7 · Dialog/Drawer 的 header 不可关闭、不可命名，customClass 作用域太窄

**header 永远渲染**

```html
<!-- Dialog.vue:256-277；Drawer.vue:184-198 -->
<header class="mc-dialog__header mc-sheen-sweep">
  <h2 :id="titleId" class="mc-dialog__title"><slot name="title">{{ title }}</slot></h2>
  <button v-if="showClose" class="mc-dialog__close">…</button>
</header>
```

即使 `title=""`、`:show-close="false"`，header 和 `mc-sheen-sweep` 装饰仍然在；`aria-labelledby` 指向一个空 `<h2>`，Dialog 因此没有可访问名称。本站搜索浮层只能：

```css
/* site/src/styles/app.css:1791 */
html[data-mochi] .stide-search .mc-dialog__header { display: none; }
```

**customClass 只到 panel**

```ts
/* Dialog.vue:204-224、Drawer.vue:133-145 */
cx('mc-dialog', ..., props.customClass)
```

`customClass` 只加在 panel 上；overlay、wrapper、header、body 都没有 class/prop。想给某个 Dialog 单独改遮罩、wrapper 对齐或 padding，只能写全局 `.mc-dialog__overlay`（影响所有 Dialog）或用 `:has(.my-panel)` 反向选择：

```css
/* site/src/styles/app.css:1772-1779 */
html[data-mochi] .mc-dialog__overlay:has(.stide-search) {
  align-items: flex-start;
  padding-top: 13vh;
}
html[data-mochi] .mc-dialog__overlay:has(.stide-search) .mc-dialog__wrapper {
  align-items: flex-start;
}
```

**建议**

- `headerless?: boolean`（不渲染 header，也不设置 aria-labelledby）；
- `ariaLabel?: string`（headerless 时必填其一）；
- `parts?: { overlay?: string; wrapper?: string; panel?: string; header?: string; body?: string; close?: string }`；
- 或 `overlayClass` / `wrapperClass` / `bodyClass` 三个显式 prop；
- header 用 slot 可完全替换，而不是只能 CSS 隐藏；
- 文档写清 `customClass` 只作用于 panel，以及 Teleport 到 body 后父级 scoped CSS 不可达。

**临时绕过**：本站全局 CSS 隐藏 header、`:has` 改 overlay，并把 `aria-labelledby` 留空；这是 a11y 债，不是理想方案。

---

### F8 · Dialog 不能 top 定位，宽度是 inline style

```css
/* Dialog.vue:295-315 */
.mc-dialog__overlay { display:flex; align-items:center; justify-content:center; padding: var(--mc-space-6); }
.mc-dialog__wrapper { display:flex; align-items:center; justify-content:center; width:100%; height:100%; }
```

```ts
/* Dialog.vue:198-202 */
const panelStyle = computed(() => ({ width: w, maxWidth: m }))
```

结果：

- 只能垂直居中；命令面板/搜索框想放顶部 13vh，必须覆盖 overlay + wrapper 两层；
- `width`/`maxWidth` 是 inline style，普通 CSS 改不动，必须 `!important` 或改 DOM；
- 没有 `placement`、`offset`、`anchor` 概念。

**建议**

```ts
interface DialogProps {
  placement?: 'center' | 'top' | 'bottom'
  offset?: number | string
  width?: number | string // 内部写成 --mc-dialog-width，不写 inline width
}
```

CSS：

```css
.mc-dialog { width: var(--mc-dialog-width, 520px); max-width: var(--mc-dialog-max-width, 92vw); }
```

这样响应式只需改变量，不需要 `!important`。

---

### F9 · Drawer 默认圆角/内部极光，没有 flat 开关

```css
/* Drawer.vue:250-257 */
.mc-drawer--right {
  top:0; right:0; bottom:0; max-width:92vw;
  border-radius: var(--mc-panel-radius) 0 0 var(--mc-panel-radius);
  box-shadow: var(--mc-panel-shadow), -18px 0 44px -28px var(--mc-accent-glow);
}
```

```css
/* Drawer.vue:232-243 */
.mc-drawer:not(.mc-panel--liquid) {
  background-color: var(--mc-panel-bg);
  background-image: radial-gradient(120% 120% at 10% -12%, color-mix(...), transparent 60%);
}
```

全高右抽屉在视觉规范里是“贴边、直角、纸面”，但库默认是“浮动玻璃卡”。只能：

```css
/* site/src/styles/app.css:1922-1932 */
html[data-mochi] .stide-settings.mc-drawer {
  width: 392px !important;
  border-radius: 0;
  background-image: none;
  border-left: 1px solid var(--st-hair);
  box-shadow: -24px 0 80px rgba(22,23,26,.12);
}
```

**建议**：`variant: 'glass' | 'liquid' | 'flat'`，或至少 `square?: boolean`、`--mc-drawer-radius` / `--mc-drawer-bg-image` 公开 token；`size: '100%'` 时不要被 `max-width:92vw` 夹住（或提供 `width: string`）。

---

### F10 · 宽高 inline style 导致的 `!important` 连锁

Drawer 的 `size` 也是 inline：

```ts
/* Drawer.vue:122-131 */
return isHorizontal ? { width: '420px' } : { height: '40%' }
```

本站为了做 392px 桌面、全宽移动端、88vh bottom sheet，不得不在 `app.css` 写：

```css
width: 392px !important;
width: 360px !important;
width: 100% !important;
max-width: none !important;
top: auto !important;
height: 88vh !important;
```

一个页面出现 15 处 `!important`，大半来自 overlay 适配。建议全部改为 CSS 变量 + 默认值，组件不做 inline width/height。

---

### F11 · 导入路径、版本与 vendor 文档漂移

这一条对“把组件库 vendor 进别的仓库”的团队影响最大。

1. **两套样式路径**  
   README 写：
   ```ts
   import 'mochi-ui/style/button.css'
   import 'mochi-ui/style/dialog.css'
   ```
   `package.json:18-29` 的 exports 是 `./style/*`；但构建产物目录叫 `dist/styles/*`（复数）。  
   本站 vendor 后没有 package exports，直接引 `mochi-ui/styles/select.css`，于是 `site/astro.config.mjs:50-56` 加了一条顺序敏感的 alias：
   ```js
   { find: /^mochi-ui\/styles\/(.*)$/, replacement: './vendor/mochi-ui/styles/$1' }
   ```
   这是一个只有踩过一遍才知道的集成点。

2. **版本漂移**  
   库源码 `package.json:3` 是 `1.4.4`；vendor 的 `VERSION.json` 也是 `1.4.4`（commit `3fce5a5`）；  
   但 `site/astro.config.mjs` 原注释写的是 `1.4.3`，项目设计文档也写 1.4.3。  
   组件库升级后，vendor 脚本、设计文档、CSS 覆盖没有同一条“版本检查”把它们串起来。

3. **没有 Astro/Vite 专用说明**  
   README 的接入示例是 Vue `createApp`；没有提：
   - 必须 `client:only` 或浏览器端挂载（Teleport 依赖 `document`）；
   - 逐组件 CSS 与 app.css 的加载顺序；
   - `:has()` 不是官方推荐；
   - vendor 构建产物时 exports 会消失，需要 alias。

**建议**

- 统一路径：只保留 `styles/`（或只保留 `style/`），或 exports 同时暴露两者；
- README 增加 “Vendoring / Astro / Scoped CSS / override order” 四节；
- 发版时生成 `VERSION` 到构建产物，并提供 `mochi-ui/version` 导出；
- 提供一个 vendor 脚本模板（把 `dist` 复制、重写路径、生成 hash）。

---

### F12 · Teleport + scoped CSS 的文档缺口

`Dialog` / `Drawer` 都 Teleport 到 `body`（`Dialog.vue:226`、`Drawer.vue:154`）。因此：

- 父组件的 `<style scoped>` 选择器**不会**作用到面板；
- 消费方必须把覆盖样式写成全局，或用 `:deep()` 从某个仍然存在的祖先出发（但 panel 已经不在祖先里，`:deep()` 也救不了）；
- 主题 token 由 `useOverlayScope` 处理，但 **class/结构** 没有对应机制。

本站只能在全局 `app.css` 里写一大堆 `html[data-mochi] .stide-*`。建议 README 明确写出这一点，并给出推荐的“全局覆盖类”写法；如果未来支持 `appendTo`，也一并说明 scoped 的边界。

---

### F13 · `sun-moon` 小尺寸辨识度（低优先级）

`src/icons/paths.ts:238` 的 `sun-moon` 由两个圆弧组成；在本站 16px 的外观三态里，视觉上像一个缺口环，不如 sun/moon 清晰。不是功能 bug，但图标在 14–16px 下的光学平衡值得单独调一版，或提供 `theme-auto` 专用图标。

---

## 2. “使用不清楚”清单（文档/API 期望）

按“我作为消费者当时想查但没查到”的顺序：

1. `customClass` 到底加在哪个 DOM 上？Dialog、Drawer、Select 都不一样（panel / root）。
2. `open` 和 `modelValue` 同时传时谁优先？（源码 `Dialog.vue:100-107` 是 `open` 优先，但文档没写。）
3. 每个组件需要 import 哪些 CSS？`Dialog` 是否自动带 `Button` 样式？README 说“组件 CSS 会 @import 内部组件”，但 vendor 后是否成立？
4. `width` / `size` 是 number→px，string 原样；但它们是 inline style，普通 CSS 覆盖不了，文档没提。
5. Dialog 的 `initialFocus` 规则是什么？为什么 Drawer 打开后焦点在关闭按钮？
6. Select 怎么加 label？`aria-label` 为什么不生效？
7. Segmented 的 icon-only 选项怎么给可访问名？
8. Slider 的 `aria-label` 能不能改？`showValue` 的气泡文案能不能格式化？
9. 主题 token 哪些是公开的？`--mc-panel-bg`、`--mc-panel-radius`、`--mc-overlay-bg` 是否稳定？本项目的做法是直接覆盖 `.mc-dialog` / `.mc-drawer` 的背景，而不是改变量。
10. Teleport 之后，父级 scoped CSS 还能不能命中？官方推荐怎么写覆盖？
11. 版本/兼容：1.4.3 → 1.4.4 是否有 breaking？vendor 的 hash 怎么校验？
12. 图标：`sun-moon`、`grip`、`columns` 这些名字在哪份清单里？`Icon` 的 `label` 在 Segmented 里为什么没有传下去？

## 3. 建议的 API 草案

### 3.1 Overlay 通用

```ts
interface OverlayParts {
  overlayClass?: string
  wrapperClass?: string   // Dialog only
  panelClass?: string     // customClass 的别名，保留兼容
  headerClass?: string
  bodyClass?: string
  closeClass?: string
}
```

### 3.2 Dialog

```ts
interface DialogProps extends OverlayParts {
  placement?: 'center' | 'top' | 'bottom'
  offset?: number | string
  headerless?: boolean
  ariaLabel?: string
  initialFocus?: string | HTMLElement
}
```

### 3.3 Drawer

```ts
interface DrawerProps extends OverlayParts {
  variant?: 'glass' | 'liquid' | 'flat'
  square?: boolean
  headerless?: boolean
  ariaLabel?: string
  initialFocus?: string | HTMLElement
  size?: number | string // 内部变量，不写 inline
}
```

### 3.4 表单控件

```ts
// Select
interface SelectProps { ariaLabel?: string; ariaLabelledby?: string }

// Segmented
interface SegmentedOption {
  label?: string
  ariaLabel?: string   // icon-only 时必填
  icon?: string
}

// Slider
interface SliderProps {
  ariaLabel?: string
  ariaDescribedby?: string
  formatValue?: (n: number) => string
}
```

### 3.5 CSS 变量建议

```css
:root {
  --mc-dialog-width: 520px;
  --mc-dialog-max-width: 92vw;
  --mc-dialog-radius: var(--mc-panel-radius);
  --mc-dialog-overlay-padding: var(--mc-space-6);
  --mc-dialog-backdrop: hsl(var(--mc-h) 45% 9% / .46);

  --mc-drawer-width: 420px;
  --mc-drawer-radius: var(--mc-panel-radius);
  --mc-drawer-bg-image: radial-gradient(...);

  --mc-select-control-bg: var(--mc-panel-bg);
}
```

原则：**prop 负责行为，CSS 变量负责皮肤，class 负责局部结构**；不要让 inline style 同时承担三者。

## 4. 可直接提的 issue 草稿

> 下面是精简版，正文可直接贴到 issue；细节引用上方 F 编号。

### Issue 1 · `[a11y] Select 无法通过 aria-label/labelledby 命名`

**Labels**: `a11y`, `select`, `P1`  
**Body**:

```md
Select 的根节点 `inheritAttrs: false`，但只把 class/style 传给根节点；真正 `role=combobox` 的
`.mc-select__control` 没有 aria-label/aria-labelledby，也没有对应 prop。传 `aria-label` 会被丢弃。

复现：
<Select :options="opts" aria-label="字体" />
// document.querySelector('[role=combobox]').getAttribute('aria-label') === null

期望：支持 ariaLabel / ariaLabelledby，并绑定到 combobox；或把非 class/style attrs 转发到 control。
```

### Issue 2 · `[a11y] Segmented icon-only 选项没有可访问名称`

**Labels**: `a11y`, `segmented`, `P1`  
**Body**:

```md
SegmentedOption 只有 label/icon；label 为空时按钮没有 aria-label/title，屏幕阅读器读到空 radio。
外观三态（sun/moon/sun-moon）就是这种情况。

期望：option.ariaLabel；label 为空且无 ariaLabel 时开发环境 warn；补 a11y 测试。
```

### Issue 3 · `[a11y] Drawer 初始焦点落在关闭按钮`

**Labels**: `a11y`, `drawer`, `P2`  
**Body**:

```md
Drawer 调用 useFocusTrap 时没有 initialFocus；panel 内第一个可聚焦元素是 header 的关闭按钮。
Dialog 已经优先聚焦 body 第一个可聚焦元素，Drawer 行为不一致。

期望：与 Dialog 一致，或暴露 initialFocus prop。
```

### Issue 4 · `[api] Dialog 不支持 top 定位，宽高是 inline style`

**Labels**: `dialog`, `enhancement`, `P2`  
**Body**:

```md
Dialog 的 overlay/wrapper 都 align-items:center；width/maxWidth 写进 panelStyle。
命令面板/搜索框需要 top 13vh 时，只能覆盖 overlay + wrapper，并用 !important 改宽度。

期望：placement/offset；宽度走 --mc-dialog-width；overlay/wrapper 支持 class。
```

### Issue 5 · `[api] Dialog/Drawer 需要 headerless、ariaLabel 与 parts class`

**Labels**: `dialog`, `drawer`, `a11y`, `P1`  
**Body**:

```md
title="" + showClose=false 时 header 仍然渲染，aria-labelledby 指向空 h2；customClass 只加在 panel，
overlay/wrapper/header/body 无法单独定位。搜索面板只能 CSS 隐藏 header + :has 改 overlay。

期望：headerless、ariaLabel、overlayClass/wrapperClass/bodyClass/headerClass，以及可替换 header 的 slot。
```

### Issue 6 · `[css] base button reset 特异性过高，消费者 class 无法覆盖`

**Labels**: `css`, `P1`  
**Body**:

```md
html[data-mochi] button { background:none;border:none;padding:0; } 的 (0,1,2) 压过消费者的
.my-button { background: ... }；本站色相点/壁纸块因此透明。

期望：@layer mochi.base 或 :where(html[data-mochi]) button；文档补覆盖顺序。
```

### Issue 7 · `[docs] 统一 style/ 与 styles/，补 Astro/vendor/Teleport 指南`

**Labels**: `docs`, `packaging`, `P2`  
**Body**:

```md
README 用 mochi-ui/style/button.css，exports 也是 ./style/*，但 dist 目录是 styles/*；
vendor 后 exports 消失，消费者要自己加 alias。另缺 Astro/SSR、Teleport + scoped CSS、
版本/hash 校验说明。请统一路径并补一节完整接入指南。
```

## 5. 本项目已采用的绕过（供其他消费者参考）

| 问题 | 本项目绕过 | 位置 |
|---|---|---|
| F1 按钮 reset | 所有覆盖规则加 `html[data-mochi]` | [app.css](site/src/styles/app.css:2000) |
| F7 header | 全局 CSS 隐藏 header | [app.css](site/src/styles/app.css:1791) |
| F7/F8 overlay | `:has(.stide-search)` 改 overlay/wrapper | [app.css](site/src/styles/app.css:1772) |
| F8 宽度 | `!important` + `width:min(640px,92vw)` | [app.css](site/src/styles/app.css:1780) |
| F9 抽屉 | 覆盖 radius/background/shadow | [app.css](site/src/styles/app.css:1922) |
| F11 路径 | Vite alias `mochi-ui/styles/*` | [astro.config.mjs](site/astro.config.mjs:52) |
| F4/F3 a11y | **尚未修**；已记录为债 | [SettingsDrawer.vue](site/src/components/islands/SettingsDrawer.vue:31) |

## 6. 修复后的验收清单（给组件库）

- [ ] 消费者只写 `.my-button {}` 能覆盖全局 button reset（无 `html[data-mochi]` 前缀）。
- [ ] Select 的 combobox 有可访问名称；`:aria-label` 能生效。
- [ ] Segmented 每个 icon-only radio 有非空 accessible name；无 label 时开发环境 warn。
- [ ] Slider 的 aria-label 可配置/可本地化。
- [ ] Drawer 打开后焦点在正文第一个可聚焦元素（或 `initialFocus` 指定的元素），不是关闭按钮。
- [ ] Dialog/Drawer `headerless` 时不渲染 header，且不会生成空 `aria-labelledby`。
- [ ] Dialog 支持 top/bottom 定位与 `offset`，宽度用 CSS 变量而非 inline style。
- [ ] `customClass` 的作用域在文档中写清；overlay/body/header 有独立 class 入口。
- [ ] 官方文档覆盖 Astro/SSR、Teleport、scoped CSS、vendor/alias、版本/hash 校验。
- [ ] 以上每一条都有 Playwright/axe 或视觉回归用例。

---

**说明**：本文件是项目侧的反馈，不修改 `packages/mochi-ui` 源码；组件库修复后，本站可以移除 F1/F7/F8/F9/F10 对应的 `!important` 与 `:has` 绕过，并补上 F3/F4/F5/F6 的无障碍修复。
