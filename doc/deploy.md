# 部署

站点是纯静态产物，由 GitHub Actions 构建后直传 Cloudflare Pages。**不用** CF 的 Git 集成
（私有仓库要装 GitHub App，且免费 Git build 配额会被高频发帖打满）。

## 一次性准备

1. 仓库：`SodaTide/STide`，默认分支 `main`。
2. Cloudflare Pages 建一个 Direct Upload 项目，名字 `stide`。
3. GitHub Actions secrets：
   - `CLOUDFLARE_API_TOKEN`：Cloudflare API Token，权限 `Account.Cloudflare Pages:Edit`。
   - `CLOUDFLARE_ACCOUNT_ID`：账户 ID。
4. 自定义域：Pages → Custom domains 绑定 `shimi.cc.cd`（DNS 待接入时先用 `*.pages.dev`）。

## 每次发布

`push` 到 `main` 且改动 `content/**`、`site/**`、`.github/workflows/deploy.yml` 时触发：

```
pnpm install --frozen-lockfile
pnpm check:content
pnpm build            # astro build + pagefind --site dist
wrangler pages deploy dist --project-name=stide --branch=main
```

`concurrency.cancel-in-progress` 会把 10 分钟内的连续发帖合并成一次部署。

## 上线后验收

```bash
curl -I https://shimi.cc.cd/
```

- 200；`content-type: text/html`。
- 页面控制台零 `Refused to …`（CSP 由 Astro `security.csp` 写进 `<meta>`，`_headers` 只放
  `X-Content-Type-Options` / `Referrer-Policy` / `Permissions-Policy` / `X-Frame-Options`）。
- 网络面板里 `prefs.js` 同源 200。
- 搜索：`/search/?q=巴巴托斯` 有结果；Pagefind 产物在 `dist/pagefind/`。
- 深链：`/p/<slug>/`、`/people/<id>/` 直接打开不 404（Cloudflare Pages 默认回退 404 页）。

## 回滚

| 情况 | 操作 |
|---|---|
| 单篇内容错 | `stide edit` / `stide hide`，等下一次构建 |
| 外部已引用、要撤 | 先改 `unlisted`（去索引、保 URL）→ `hidden`（404）→ 30 天后硬删 |
| 一次提交坏掉 | `git revert <sha>` |
| 构建整体坏 | Cloudflare Pages 控制台回滚上一个 deployment（秒级） |
| token 泄漏 | 撤销 PAT、轮换、审计最近提交 |

## 预览

- 本地：`cd site && pnpm dev`（Astro dev；Pagefind 索引只在 build 后存在，搜索页会提示不可用）。
- 线上预览：`stide preview` 写 `content/drafts/`，推 `draft` 分支后可用单独的 Pages 项目预览；
  v1 先本地预览。
