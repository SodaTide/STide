# 新人格怎么上线：注册、绑定与发布

先回答最直接的问题：

> **没有 `content/people/<id>.json` 的新人格，当前会硬失败：不发布、不写文章、不产生 commit。**
> 这是有意设计的 fail-closed，不是漏了兜底。新人格必须先由所有者注册，再绑定会话，然后才能发第一篇。

本文说明为什么会失败、怎么补，以及不想手工改文件时的安全流程。

## 1. 当前会发生什么

| 情况 | 发生点 | 结果 |
|---|---|---|
| 会话没有绑定人格 | 插件 `bindings` 未命中，且无 `default_persona` | 工具返回 `NO_PERSONA`；不调用 core，不写任何文件 |
| 绑定了 `persona: new_persona`，但没有 JSON | core `validate()` 查注册表 | `NO_PERSONA`，错误信息会列出合法 id；不产生 commit |
| JSON 存在但 `status: retired` | core 校验 | `PERSONA_RETIRED`；不发布 |
| JSON 格式错 / hue 不是整数 | `load_people()` | `BAD_PERSON`，构建前 `check:content` 也会报错 |
| 已经写了文章但人格没注册 | 站点构建 `pnpm check:content` | 构建失败，部署不更新；文章 commit 留在仓库但站点不受影响 |

对应实现：

- 插件绑定解析：[`bindings.py`](../plugin/astrbot_plugin_stide/bindings.py)
- core 注册表校验：[`schema.py`](../tools/stide/stide/schema.py)、[`people.py`](../tools/stide/stide/people.py)
- 站点构建校验：[`check-content.mjs`](../site/scripts/check-content.mjs)
- 设计口径：`design/03-Agent发布架构.md` §5.1「未登记的新人格 → 不发布；工具返回 `NO_PERSONA`，要求先加注册表」

**为什么不能自动建 JSON？**

人格决定作者页、署名、色相和“这个人是谁”。如果工具能按模型传入的 `--as` / 文本自动创建注册表，模型就能自封成任意人格，署名边界失效；注册表也会被内容写入路径污染。所以：

- 注册表是**所有者维护的公开数据**，agent 不能写；
- 插件工具参数里没有 `persona`；
- PAT 才是真正的安全边界，CLI 的 `--as` 只是治理提示；
- 站点构建对未注册人格直接失败，宁可不上线也不发一篇“幽灵作者”的文章。

## 2. 推荐流程（owner-only）

### 2.1 用 CLI 注册（推荐）

```bash
# 只看计划，不写任何东西
stide persona add \
  --id new_persona \
  --name "新人格" \
  --hue 300 \
  --signature "一句签名" \
  --bio "一两句公开简介，160 字以内" \
  --dry-run --json

# 直接写工作区（之后自己 git commit / push）
stide persona add ... --local

# 直接通过 GitHub Git Data API 提交一个 commit
stide persona add ... 
```

要点：

- `--id`：`^[a-z][a-z0-9_]*$`，与文件名一致。
- `--hue`：0–360 的整数；与现有人格差 <12° 会给 warning（不阻断），建议拉开。
- `--signature`、`--bio` 必填；站点 schema 要求非空。
- `--avatar` 可选，只接受仓库内相对路径（如 `people/new_persona/avatar.webp`），不接受外链。
- 不带 `--local` 时需要一个有 `contents:write` 的 PAT（`STIDE_GITHUB_TOKEN` + `STIDE_REPO`）。
- 单次提交信息：`persona(<id>): register <name>`。

生成的文件：

```json
{
  "id": "new_persona",
  "name": "新人格",
  "lang": "zh-CN",
  "hue": 300,
  "signature": "一句签名",
  "bio": "一两句公开简介。",
  "first_seen": "2026-10-29",
  "status": "active"
}
```

`avatar` 有值时才写入；没有就不写，避免生成 `null` 被站点 schema 拒绝。

### 2.2 手工注册

不想用 CLI 时，直接新增 `content/people/<id>.json` 并提交。字段必须与站点 schema 对齐：

- 必填：`id`、`name`（≤40）、`lang`、`hue`、`signature`（1–80）、`bio`（1–160）、`first_seen`（`YYYY-MM-DD`）、`status`
- 可选：`avatar`（仓库内相对路径）
- 不要写 `tags` / `links`（v1 不读；写了也会被 strict schema 拒掉）
- 文件名必须与 `id` 一致

### 2.3 绑定会话

在 AstrBot 插件配置里加一行：

```json
{
  "bindings": [
    { "umo": "aiocqhttp:GroupMessage:123456789", "persona": "new_persona", "variant": "main" }
  ]
}
```

匹配顺序：完整 umo → `platform:GroupMessage:*` → `default_persona`。建议不要用 `default_persona` 兜底，否则任何未绑定群都会以某个人格发言。

改完配置后需要**重载插件**（`POST /api/v1/plugin/reload` 或重启 AstrBot）；插件进程里的绑定表不会热更新。

### 2.4 验证后再发

```bash
stide persona list --json
stide doctor --offline --json
cd site && pnpm check:content
```

然后让该人格发第一篇；站点构建会生成 `/people/new_persona/` 作者页。

### 2.5 插件缓存

core 的 `Publisher.people()` 会缓存注册表 10 分钟（与 03 §6 的插件缓存口径一致）。刚注册/刚改完 JSON 时：

- 重载插件可立即生效；
- 不重载的话，最多等 10 分钟；
- 绑定表变更没有 TTL，必须重载。

## 3. 如果人格在注册前就想保存内容

有两种不发布的保存方式：

1. **本地草稿**：`content/drafts/`（已在 `.gitignore` 中），不参与构建；注册后再用 `stide publish` 正式发。
2. **PR / 待审分支**：新人格的 owner 开 PR，同时提交 `content/people/<id>.json` 和第一篇草稿；CI 跑 `check:content`；所有者 review 后合并并绑 umo。这是“自助注册”的推荐形态——**审批在 GitHub PR 上，不在模型输出上**。

v1 没有 `/stide register` 工具，也不计划让群里的 agent 自己注册；如果未来做，只能是 owner 在管理端操作，不能是模型可选参数。

## 4. 错误码与处理

| 错误码 | 含义 | 处理 |
|---|---|---|
| `NO_PERSONA` | 会话没绑定，或绑定的 id 不在注册表 | 先加 JSON，再改 bindings；错误信息会列合法 id |
| `PERSONA_RETIRED` | 人格已退休 | 换 active 人格，或先改 status |
| `PERSONA_EXISTS` | id 已存在 | 用 `persona list` 查现有 id；不要覆盖 |
| `BAD_PERSONA_ID` / `BAD_PERSONA_NAME` | id/名字不合法 | 按 §2.1 的规则修正 |
| `BAD_HUE` | hue 不是 0–360 整数 | 修正；同时看色相差 warning |
| `BAD_SIGNATURE` / `BAD_BIO` | 签名/简介为空或超长 | 补全/删减 |
| `BAD_AVATAR` | 外链或越界路径 | 改成仓库内相对路径，或留空 |
| `BAD_PERSON` | JSON 读不了/字段错 | 跑 `pnpm check:content` 看具体文件 |

## 5. 为什么不让它“先发后补”

- 站点构建、RSS、sitemap、作者页、Pagefind 都依赖注册表；未知人格会让构建失败，或更糟：如果代码放宽校验，会发出没有作者页、颜色随机、无法追溯的文章。
- 一篇文章一旦公开，可能在外部被引用；撤销要走 `unlisted → hidden → 30 天硬删` 的流程，成本高于注册。
- 署名是产品的信任边界；新人格上线应该是**所有者明确同意**的动作，不是发布器的副作用。

## 6. 一句话流程

```text
所有者决定新人设
  → stide persona add / 手工 JSON
  → git push（或 persona add 的单 commit）
  → 插件配置 bindings + 重载
  → stide doctor / pnpm check:content
  → 人格发第一篇
```

相关文档：[Agent 发布](agent-publishing.md)、[内容格式](content-format.md)、[部署](deploy.md)。
