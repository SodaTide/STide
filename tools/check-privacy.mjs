#!/usr/bin/env node
/**
 * 仓库隐私检查（v1.0 发布闸门）
 *
 * 目的：不让「跟 agent 的聊天记录 / 私密草稿」这类文件被 git 跟踪，也不让
 * 手机号、证件号、token、群号等落到仓库里。
 *
 * 用法：
 *   node tools/check-privacy.mjs             只查被 git 跟踪的文件（CI 用）
 *   node tools/check-privacy.mjs --all       追加扫描工作区（含未跟踪文件）
 *   node tools/check-privacy.mjs --staged    只查暂存区（本地 pre-commit 用）
 *
 * 退出码：0 干净；1 有问题。
 * 例外用文件末尾的 `stide-privacy: allow <id>` 注释声明，且必须写明理由。
 */
import { execFileSync } from 'node:child_process'
import { readFileSync, statSync } from 'node:fs'
import { resolve } from 'node:path'

const ROOT = resolve(import.meta.dirname, '..')
const args = new Set(process.argv.slice(2))

/** 文件名/路径命中即视为「不该进仓库」的东西 */
const FORBIDDEN_PATHS = [
  { id: 'chat-export', re: /(^|\/)(chat|chats|conversation|conversations|对话|聊天)([-_.\w]*)?\.(md|txt|json|jsonl|html|log)$/i },
  { id: 'agent-transcript', re: /(^|\/)(transcript|session|sessions|rollout|thread)([-_.\w]*)?\.(md|txt|jsonl|json|log)$/i },
  { id: 'private-dir', re: /(^|\/)(private|secret|secrets|personal|私密|私人)(\/|$)/i },
  { id: 'scratch', re: /(^|\/)(scratch|tmp|temp|草稿)(\/|$)/i },
  { id: 'env-file', re: /(^|\/)\.env(\.|$)/ },
  { id: 'key-file', re: /\.(pem|key|p12|pfx)$/i },
]

/** 内容命中即视为泄漏 */
const FORBIDDEN_CONTENT = [
  { id: 'github-pat', re: /\b(ghp_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,})\b/ },
  { id: 'openai-key', re: /\bsk-[A-Za-z0-9]{24,}\b/ },
  { id: 'aws-key', re: /\bAKIA[0-9A-Z]{16}\b/ },
  { id: 'private-key', re: /-----BEGIN (RSA |OPENSSH |EC |PGP )?PRIVATE KEY-----/ },
  { id: 'bearer-token', re: /\bBearer\s+[A-Za-z0-9._-]{30,}/ },
  { id: 'cn-mobile', re: /(?<!\d)1[3-9]\d{9}(?!\d)/ },
  { id: 'cn-id', re: /(?<!\d)\d{17}[\dXx](?!\d)/ },
]

/** 这些文件本来就可能包含示例号码 / 正则，扫内容没有意义 */
const CONTENT_SKIP = [/^content\/posts\//, /^site\/vendor\//, /^site\/pnpm-lock\.yaml$/]
const TEXT_EXT = /\.(md|mdx|txt|json|jsonl|ya?ml|toml|ts|tsx|mjs|cjs|js|jsx|astro|vue|css|html|py|ps1|sh|xml|env|gitignore|gitattributes)$/i
const MAX_BYTES = 2 * 1024 * 1024

function git(...argv) {
  return execFileSync('git', argv, { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
}

function listTracked() {
  if (args.has('--staged')) {
    return git('diff', '--cached', '--name-only', '--diff-filter=ACMR')
      .split('\n')
      .filter(Boolean)
  }
  const files = git('ls-files').split('\n').filter(Boolean)
  if (!args.has('--all')) return files
  const untracked = git('ls-files', '--others', '--exclude-standard').split('\n').filter(Boolean)
  return [...new Set([...files, ...untracked])]
}

/** 在文件里声明的例外：`stide-privacy: allow cn-mobile 示例号码` */
function allowances(text) {
  const allowed = new Set()
  for (const match of text.matchAll(/stide-privacy:\s*allow\s+([\w-]+)/g)) allowed.add(match[1])
  return allowed
}

const problems = []

for (const file of listTracked()) {
  const normalized = file.replace(/\\/g, '/')
  for (const rule of FORBIDDEN_PATHS) {
    if (rule.re.test(normalized)) {
      problems.push({ file: normalized, id: rule.id, why: '路径像聊天记录/私密内容/密钥' })
    }
  }
}

for (const file of listTracked()) {
  const normalized = file.replace(/\\/g, '/')
  if (CONTENT_SKIP.some((re) => re.test(normalized))) continue
  if (!TEXT_EXT.test(normalized)) continue
  let stat
  try {
    stat = statSync(resolve(ROOT, normalized))
  } catch {
    continue
  }
  if (!stat.isFile() || stat.size > MAX_BYTES) continue
  let text
  try {
    text = readFileSync(resolve(ROOT, normalized), 'utf8')
  } catch {
    continue
  }
  const allowed = allowances(text)
  for (const rule of FORBIDDEN_CONTENT) {
    if (allowed.has(rule.id)) continue
    const hit = rule.re.exec(text)
    if (!hit) continue
    const line = text.slice(0, hit.index).split('\n').length
    problems.push({
      file: `${normalized}:${line}`,
      id: rule.id,
      why: `内容疑似 ${rule.id}，命中 ${hit[0].slice(0, 12)}…`,
    })
  }
}

if (!problems.length) {
  console.log('隐私检查通过：被跟踪的文件里没有聊天记录、密钥或手机号/证件号。')
  process.exit(0)
}

console.error('隐私检查未通过：\n')
for (const problem of problems) {
  console.error(`  [${problem.id}] ${problem.file} —— ${problem.why}`)
}
console.error(
  [
    '',
    '处理方式：',
    '  1. 如果是误报，在文件里加一行注释：stide-privacy: allow <上面方括号里的 id> <理由>',
    '  2. 如果确实不该进仓库：git rm --cached <file>，并按 .gitignore 的「私密内容」一节加规则',
    '  3. 如果已经推上去了：删掉文件后还要清历史（git filter-repo / BFG），并轮换泄漏的密钥',
    '',
  ].join('\n'),
)
process.exit(1)
