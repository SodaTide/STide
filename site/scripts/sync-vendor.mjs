/**
 * Mochi UI vendor 同步（本地开发用；CI 不跑）
 *
 *   node scripts/sync-vendor.mjs [--from <mochi-ui 包目录>]
 *
 * 默认从 E:\Works\AICoding\UI Design\New UI\packages\mochi-ui 拉构建产物。
 * 只复制 STide 用到的组件样式；mochi-ui.mjs 是整包 ESM 构建，Vite 按需 tree-shake。
 * 生成 VERSION.json（版本 / 源 commit / 每个文件的 sha256），供 CI 校验 vendor 没被手改。
 */
import { createHash } from 'node:crypto';
import { cp, mkdir, readFile, writeFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(here, '..');

const STYLE_FILES = [
  'base',
  'icon',
  'avatar',
  'prose',
  'image',
  'image-group',
  'masonry',
  'card',
  'dock',
  'drawer',
  'dialog',
  'segmented',
  'slider',
  'switch',
  'select',
  'tooltip',
  'skeleton',
  'empty',
  'back-top',
  'scrollbar',
  'button',
  'input',
  'divider',
];

function arg(name) {
  const i = process.argv.indexOf(name);
  return i === -1 ? null : process.argv[i + 1];
}

const source =
  arg('--from') ||
  process.env.MOCHI_UI_DIR ||
  path.resolve('E:/Works/AICoding/UI Design/New UI/packages/mochi-ui');

if (!existsSync(path.join(source, 'dist', 'mochi-ui.mjs'))) {
  console.error(`[sync-vendor] 找不到 Mochi UI 构建产物：${source}/dist/mochi-ui.mjs`);
  process.exit(2);
}

const outRoot = path.join(projectRoot, 'vendor', 'mochi-ui');
const outStyles = path.join(outRoot, 'styles');
await mkdir(outStyles, { recursive: true });

const files = [];

async function copyFile(from, to, kind) {
  await cp(from, to);
  if (kind === 'style' && path.basename(to) !== 'base.css') {
    // base.css / icon.css 由 mochi.css 全局引入一次；组件样式里的 @import 会让
    // 每个按需 chunk 重复打包 100 KB，去掉后组件 CSS 只含自身规则。
    const raw = await readFile(to, 'utf8');
    const stripped = raw.replace(/^@import "\.\/(?:base|icon)\.css";\r?\n/gm, '');
    if (stripped !== raw) await writeFile(to, stripped, 'utf8');
  }
  const bytes = await readFile(to);
  files.push({ path: path.relative(outRoot, to).split(path.sep).join('/'), kind, sha256: createHash('sha256').update(bytes).digest('hex'), bytes: bytes.length });
}

await copyFile(path.join(source, 'dist', 'mochi-ui.mjs'), path.join(outRoot, 'mochi-ui.mjs'), 'js');

for (const name of STYLE_FILES) {
  const from = path.join(source, 'dist', 'styles', `${name}.css`);
  if (!existsSync(from)) {
    console.warn(`[sync-vendor] 跳过缺失样式：${name}.css`);
    continue;
  }
  await copyFile(from, path.join(outStyles, `${name}.css`), 'style');
}

const pkg = JSON.parse(await readFile(path.join(source, 'package.json'), 'utf8'));

let commit = 'unknown';
try {
  commit = execFileSync('git', ['-C', source, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
} catch {
  /* 副本没有 git 时留 unknown */
}

const version = {
  name: pkg.name,
  version: pkg.version,
  source,
  commit,
  vendored_at: new Date().toISOString(),
  note: '构建产物 vendor；勿手改。重新生成：pnpm sync:vendor',
  files,
};
await writeFile(path.join(outRoot, 'VERSION.json'), `${JSON.stringify(version, null, 2)}\n`, 'utf8');

if (existsSync(path.join(source, 'LICENSE'))) {
  await cp(path.join(source, 'LICENSE'), path.join(outRoot, 'LICENSE'));
}
if (existsSync(path.join(source, 'README.md'))) {
  await cp(path.join(source, 'README.md'), path.join(outRoot, 'README.md'));
}

const total = files.reduce((n, f) => n + f.bytes, 0);
console.log(`[sync-vendor] mochi-ui@${pkg.version} → site/vendor/mochi-ui（${files.length} 个文件，${(total / 1024).toFixed(1)} KB，commit ${commit.slice(0, 8)}）`);
