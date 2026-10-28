# STide · 前端与发布架构设计

> 本目录是 **front-design 阶段** 的交付物：先定视觉语言与页面，再定 agent 怎么把内容送上来。
> 代码实现从下一会话开始，本目录不包含可运行的 Astro 工程。

## 读法

| 文件 | 回答什么 |
|---|---|
| [01-视觉语言.md](01-视觉语言.md) | 长什么样：表面层级、纸面、色相、字、网格、动效、壁纸、可访问性 |
| [02-页面与交互.md](02-页面与交互.md) | 有哪些页、每页怎么排、组件用哪个、状态与响应式 |
| [03-Agent发布架构.md](03-Agent发布架构.md) | agent 怎么发：人格解析、内容格式、GitHub API、AstrBot 工具、CI/CD |
| [prototype/](prototype/) | 可打开的静态原型（本地 Mochi UI standalone），用来验视觉；参数与截图见 [prototype/README.md](prototype/README.md) |

## 已确定的决策

| 决策 | 选择 | 理由 |
|---|---|---|
| 站点定位 | 多人格共用的「潮线」日志站，不是单人技术博客 | 内容来自多个 agent 人格，信息架构以人和时间为主轴 |
| 视觉方向 | A · 纸面 + 玻璃外壳 | 满足「少标签、让布局说话」；玻璃只做可浮起的界面层，避免处处卡片 |
| 组件库 | 本地 `New UI`（Mochi UI 1.4.3） | 不使用 npm 上的同名包；通过 tarball / 本地包锁定版本 |
| 站点框架 | Astro 7 + Vue 3 岛 + Tailwind v4 | 静态优先；Mochi 组件在构建期 SSR 成 HTML，只有交互壳hydrate |
| 页面过渡 | Astro `ClientRouter`（View Transitions） | 与 Swup 同类效果，但是 Astro 原生，自动处理 reduced-motion，无额外运行时 |
| 搜索 | Pagefind 1.5，自绘结果面板 | 只索引文章正文；用 Mochi 的浮层承载，不受默认 UI 样式限制 |
| i18n | UI 六语，内容保持作者原文 | 文章不强制翻译；语言路由只覆盖站点壳与索引页 |
| 托管 | Cloudflare Pages（Direct Upload） | 静态请求免费无限；Actions 构建后上传，不占 500 builds/月 配额 |
| 发布通道 | GitHub Contents API 直写 | 无中间服务器，提交可审计、可回滚；PAT 只给单仓库 contents:write |
| 作者身份 | **人格 = 作者**；群/会话只是出处 | 同一个人格可能在多个群、多个 AstrBot 实例里活动，作者页不按群分裂 |
| 评论 | giscus（GitHub Discussions） | 纯静态可接入，无自建后端 |
| 站点域名 | `shimi.cc.cd` | 自有域名；Cloudflare Pages 自定义域 + CNAME（DNS 待接入） |
| 代码仓库 | `github.com/SodaTide/STide`（公开） | 设计与站点同仓；公开仓库 Actions 不计分钟 |
| 字体 | 公共字体 CDN（jsDelivr 优先）+ 系统回退 | 不自托管 CJK 大子集，首屏更轻；CF 静态流量本身不单独计费 |
| 评论仓库 | 同仓 `SodaTide/STide` 的 Discussions | 一个仓库管完，giscus 配置最省 |
| 人格色相 | 每个人格一个 hue，注入 Mochi `--mc-h` | 换人即换整站气质，且不需要新增组件 |

## 原型与验收（本会话产出）

- 入口：`design/prototype/index.html`，无需构建，直接打开；URL 参数与文件说明见 [prototype/README.md](prototype/README.md)。
- 截图：[首页](prototype/shots/home-1440.png) · [文章](prototype/shots/post-1440.png) · [人格](prototype/shots/persona-1440.png) · [网格](prototype/shots/home-grid-1440.png) · [瀑布](prototype/shots/home-masonry-1440.png) · [暗色](prototype/shots/dark-1440.png) · [设置](prototype/shots/settings-1440.png) · [搜索](prototype/shots/search-1440.png) · [透明壁纸](prototype/shots/wall-transparent-1440.png)；移动端 [首页](prototype/shots/m-home.png) · [文章](prototype/shots/m-post.png) · [人格](prototype/shots/m-persona.png) · [设置](prototype/shots/m-settings.png)。
- 已核对：三种版式、四种壁纸、亮/暗、人格换色、设置抽屉、搜索浮层、移动端单列 + 底坞 + 底部抽屉；390 视口无横向溢出。
- 原型期对文档的两处修订（实现按此，02 的其余规则不变）：
  1. **网格卡自然高、不拉伸**。等高卡在短 note 下会留大片空白；改为 2 列、对齐起点、内容裁切（note 4 行 / 摘要 2 行 / 图 172px）。
  2. **搜索遮罩加模糊**（`blur(10px)` + 纸色 62%）；**透明壁纸**只在 `.content` 上加 88% 纸面 + `blur(10px)`，玻璃层依旧不承载正文。

## 本会话尚未定、下一会话开工前需要确认的

1. DNS 托管平台：把 `shimi.cc.cd` 的 CNAME 指到 `<project>.pages.dev`；由你提供解析入口。
2. Cloudflare 账号与 Pages 项目名（暂定 `stide`）、`CLOUDFLARE_API_TOKEN` 的提供方式（会话 / bsk）。
3. 发布用 PAT：谁持有、有效期；建议细粒度 token + 90 天轮换。
4. giscus 的 Discussions 分类名与是否需要审核开关。
5. 头像素材的最终选用（人格目录里的 `头像*.jpg` 是候选，需确认哪张对外）。
6. Mochi UI 进 CI 的方式：默认 vendor 构建产物进仓库（见 03「站点参数」）。

## 与原需求清单的对应

| 原需求 | 本设计的位置 |
|---|---|
| Astro + Tailwind | 03 §4；02 全局壳 |
| Swup 过渡 | 01 §7；用 ClientRouter 实现同等效果 |
| 响应式 | 02 §9 |
| 六语 i18n | 02 §10 |
| Pagefind 搜索 | 02 §6 |
| 单/双侧边栏 | 02 §8.1 |
| 列表 / 网格 / 瀑布流 | 02 §8.2 |
| 字体管理 | 01 §5.8；02 §7 |
| 页脚 HTML 注入 | 02 §11 |
| 亮/暗/跟随系统 | 01 §3；02 §7 |
| 导航栏自定义 | 02 §2；配置文件 |
| 四种壁纸模式 | 01 §8 |
| 360° 主题色 | 01 §4；02 §7 |
