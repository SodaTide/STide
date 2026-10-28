#!/usr/bin/env node
/**
 * check:content —— 构建前的内容自检（03 §4.3、§7.2、P1-16）
 *
 * 退出码：0 通过；2 有错误。警告不阻断。
 * 只依赖 node 标准库 + yaml + sharp（构建依赖）。
 */
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse as parseYaml } from 'yaml';
import sharp from 'sharp';

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, '..', '..');
const contentRoot = path.join(repo, 'content');
const errors = [];
const warnings = [];

const err = (file, message) => errors.push(`${path.relative(repo, file)}: ${message}`);
const warn = (file, message) => warnings.push(`${path.relative(repo, file)}: ${message}`);

const KINDS = new Set(['note', 'story', 'photo', 'link']);
const ULID = /^[0-9A-HJKMNP-TV-Z]{26}$/;
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const IMAGE_EXT = new Set(['.webp', '.jpg', '.jpeg', '.png']);

function charCount(text) {
  return [...text.replace(/\s+/g, '')].length;
}

function normalizeBody(text) {
  return text.replace(/\s+/g, ' ').trim();
}

function bodyHash(text) {
  return createHash('sha256').update(normalizeBody(text)).digest('hex');
}

async function walk(dir) {
  const out = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

function splitFrontmatter(raw, file) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    err(file, '缺少 frontmatter');
    return null;
  }
  let data;
  try {
    data = parseYaml(match[1]) ?? {};
  } catch (e) {
    err(file, `frontmatter YAML 解析失败：${e.message}`);
    return null;
  }
  return { data, body: match[2] ?? '', rawFrontmatter: match[1] };
}

// ---- 人格注册表 ---------------------------------------------------------
const peopleFiles = (await walk(path.join(contentRoot, 'people'))).filter((f) => f.endsWith('.json'));
const people = new Map();
for (const file of peopleFiles) {
  const base = path.basename(file, '.json');
  let data;
  try {
    data = JSON.parse(await readFile(file, 'utf8'));
  } catch (e) {
    err(file, `JSON 解析失败：${e.message}`);
    continue;
  }
  for (const key of ['id', 'name', 'lang', 'hue', 'signature', 'bio', 'first_seen', 'status']) {
    if (data[key] === undefined || data[key] === '') err(file, `缺少字段 ${key}`);
  }
  if (data.id !== base) err(file, `id（${data.id}）与文件名不一致`);
  if (!Number.isInteger(data.hue) || data.hue < 0 || data.hue > 360) err(file, 'hue 必须是 0–360 的整数');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(data.first_seen ?? ''))) err(file, 'first_seen 必须是 YYYY-MM-DD');
  if (!['active', 'retired'].includes(data.status)) err(file, `status 只能是 active / retired`);
  if (charCount(String(data.bio ?? '')) > 160) err(file, `bio 超过 160 字（${charCount(data.bio)}）`);
  if (data.signature && charCount(data.signature) > 40) warn(file, `signature 较长（${charCount(data.signature)} 字）`);
  if (data.avatar) {
    const avatarFile = path.join(contentRoot, data.avatar);
    if (!existsSync(avatarFile)) err(file, `avatar 不存在：${data.avatar}`);
    else if (!IMAGE_EXT.has(path.extname(avatarFile).toLowerCase())) err(file, 'avatar 必须是 webp / jpg / png');
  }
  people.set(data.id, { ...data, file });
}

const sortedHues = [...people.values()].filter((p) => p.status === 'active').sort((a, b) => a.hue - b.hue);
for (let i = 1; i < sortedHues.length; i += 1) {
  const diff = Math.abs(sortedHues[i].hue - sortedHues[i - 1].hue);
  if (diff < 12) {
    warn(
      sortedHues[i].file,
      `hue 与 ${sortedHues[i - 1].name} 只差 ${diff}°，看起来会像同色（建议 ≥12）`,
    );
  }
}

// ---- 文章 ---------------------------------------------------------------
const postFiles = (await walk(path.join(contentRoot, 'posts'))).filter((f) => f.endsWith('.md'));
const ids = new Map();
const bodyHashes = new Map();
const usedMedia = new Set();
const mediaPerDay = new Map();

for (const file of postFiles) {
  const raw = await readFile(file, 'utf8');
  const parsed = splitFrontmatter(raw, file);
  if (!parsed) continue;
  const { data, body, rawFrontmatter } = parsed;
  const rel = path.relative(contentRoot, file).split(path.sep).join('/');
  const slug = path.basename(file, '.md');

  if (/^\s*tags\s*:/m.test(rawFrontmatter)) err(file, 'v1 不接受 tags（02 §12 / 05 P0-7）');
  if (!SLUG.test(slug)) err(file, `文件名不是合法 slug：${slug}`);
  if (!ULID.test(String(data.id ?? ''))) err(file, 'id 必须是 26 位 ULID');
  if (ids.has(data.id)) err(file, `id 与 ${ids.get(data.id)} 重复`);
  else ids.set(data.id, rel);

  const person = people.get(data.persona);
  if (!person) err(file, `未知人格 ${data.persona}（合法：${[...people.keys()].join(', ')}）`);
  else if (person.status !== 'active') err(file, `人格 ${data.persona} 已 retired，不再接受新文章`);

  if (data.title !== undefined) {
    if (typeof data.title !== 'string' || !data.title.trim()) err(file, 'title 不能为空');
    else if (charCount(data.title) > 60) err(file, `title 超过 60 字（${charCount(data.title)}）`);
    else if (/[\r\n]/.test(data.title)) err(file, 'title 不能换行');
  }

  const date = new Date(data.date);
  if (Number.isNaN(date.getTime())) err(file, 'date 不是合法时间');
  else {
    const [year, month] = rel.split('/').slice(1, 3);
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    if (`${y}` !== year || m !== month) err(file, `date（${y}-${m}）与路径（${year}/${month}）不一致`);
    if (Math.abs(date.getTime() - Date.now()) > 24 * 3600_000) {
      // 历史种子内容允许，但新发布的时间必须由服务器写入
      if (!data.generated?.at) warn(file, 'date 与当前时间相差 >24h 且没有 generated.at');
    }
  }

  const kind = data.kind ?? (data.link?.url ? 'link' : data.media?.length && !data.title ? 'photo' : data.title ? 'story' : 'note');
  if (!KINDS.has(kind)) err(file, `kind 非法：${kind}`);
  if (data.kind && !KINDS.has(data.kind)) err(file, `kind 非法：${data.kind}`);

  const chars = charCount(body);
  const limits = {
    note: { min: 1, max: 600, title: false },
    story: { min: 200, max: 12000, title: true },
    photo: { min: 1, max: 280, title: false },
    link: { min: 1, max: 280, title: 'optional' },
  };
  const limit = limits[kind];
  if (limit) {
    if (chars < limit.min) err(file, `${kind} 正文至少 ${limit.min} 字（现在 ${chars}）`);
    if (chars > limit.max) err(file, `${kind} 正文最多 ${limit.max} 字（现在 ${chars}）`);
    if (limit.title === true && !data.title) err(file, `${kind} 必须有 title`);
    if (limit.title === false && data.title) err(file, `${kind} 不应该有 title（有 title 会被推断成 story）`);
  }

  if (data.summary && charCount(data.summary) > 200) err(file, 'summary 超过 200 字');

  // 媒体
  const media = Array.isArray(data.media) ? data.media : [];
  if (media.length > 9) err(file, `一篇最多 9 张图（现在 ${media.length}）`);
  let postBytes = 0;
  for (const item of media) {
    if (!item || typeof item !== 'object') {
      err(file, 'media 项必须是对象');
      continue;
    }
    if (!item.alt || !String(item.alt).trim()) err(file, `media[${item.src ?? '?'}] 缺少 alt`);
    if (!item.src || !String(item.src).startsWith('media/')) err(file, `media.src 必须是 content/ 相对路径 media/…（${item.src}）`);
    if (item.caption && charCount(item.caption) > 40) err(file, `caption 超过 40 字：${item.caption}`);
    const mediaFile = path.join(contentRoot, item.src ?? '');
    usedMedia.add(path.relative(contentRoot, mediaFile).split(path.sep).join('/'));
    if (!existsSync(mediaFile)) {
      err(file, `媒体不存在：${item.src}`);
      continue;
    }
    if (!IMAGE_EXT.has(path.extname(mediaFile).toLowerCase())) err(file, `媒体类型不支持：${item.src}（只收 webp/jpg/png）`);
    const info = await stat(mediaFile);
    const size = info.size;
    postBytes += size;
    if (size > 2 * 1024 * 1024) err(file, `单图超过 2 MB：${item.src}`);
    const day = rel.split('/').slice(1, 3).join('-');
    mediaPerDay.set(day, (mediaPerDay.get(day) ?? 0) + size);
    try {
      const meta = await sharp(mediaFile).metadata();
      if ((meta.width ?? 0) > 4096 || (meta.height ?? 0) > 4096) err(file, `图片长边超过 4096px：${item.src}`);
      if (item.width && meta.width && item.width !== meta.width) warn(file, `media.width 与实际不符（${item.src}：${item.width} vs ${meta.width}）`);
      if (item.height && meta.height && item.height !== meta.height) warn(file, `media.height 与实际不符（${item.src}：${item.height} vs ${meta.height}）`);
      if (!item.width || !item.height) warn(file, `media 缺少 width/height（${item.src}），会带来 CLS`);
    } catch (e) {
      err(file, `读图失败（${item.src}）：${e.message}`);
    }
  }
  if (postBytes > 6 * 1024 * 1024) err(file, `单篇媒体超过 6 MB（${(postBytes / 1024 / 1024).toFixed(1)} MB）`);

  // 正文里的图片引用
  for (const match of body.matchAll(/!\[[^\]]*]\(\s*(\/media\/[^)\s]+)/g)) {
    const ref = match[1].replace(/^\//, '');
    usedMedia.add(ref);
    if (!existsSync(path.join(contentRoot, ref))) err(file, `正文图片不存在：/${ref}`);
  }

  // 外链协议
  for (const match of body.matchAll(/\]\(\s*([^)\s]+)/g)) {
    const url = match[1];
    if (/^(javascript|data|vbscript):/i.test(url)) err(file, `正文外链协议不允许：${url}`);
  }
  if (data.link?.url && !/^https:\/\//.test(data.link.url)) err(file, 'link.url 只允许 https');

  // 重复正文
  const hash = bodyHash(body);
  if (bodyHashes.has(hash)) err(file, `正文与 ${bodyHashes.get(hash)} 完全重复`);
  else bodyHashes.set(hash, rel);

  if (!data.generated?.at) warn(file, '缺少 generated.at（发布器会自动写入）');
  if (data.pinned && data.visibility !== 'public') err(file, 'pinned 的文章必须 public');
}

// 单日媒体预算
for (const [day, bytes] of mediaPerDay) {
  if (bytes > 30 * 1024 * 1024) err(path.join(contentRoot, 'media'), `${day} 媒体超过 30 MB（${(bytes / 1024 / 1024).toFixed(1)} MB）`);
}

// 孤儿媒体
const allMedia = (await walk(path.join(contentRoot, 'media')))
  .map((f) => path.relative(contentRoot, f).split(path.sep).join('/'))
  .filter((f) => IMAGE_EXT.has(path.extname(f).toLowerCase()));
for (const file of allMedia) {
  if (!usedMedia.has(file)) warn(path.join(contentRoot, file), '没有被任何文章引用（孤儿媒体）');
}

// ---- 审计 trailer -------------------------------------------------------
const gitDir = path.join(repo, '.git');
if (existsSync(gitDir)) {
  let log = '';
  try {
    log = execFileSync('git', ['-C', repo, 'log', '--format=%B'], { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 });
  } catch {
    warn(repo, '读不到 git 历史，跳过 trailer 审计');
  }
  if (log) {
    const seen = new Set([...log.matchAll(/^Stide-Post-Id:\s*(\S+)\s*$/gm)].map((m) => m[1]));
    const missing = [...ids.keys()].filter((id) => !seen.has(id));
    if (missing.length) {
      const message = `${missing.length} 篇文章的 id 在 git 历史里没有 Stide-Post-Id trailer（${missing.slice(0, 3).join(', ')}…）`;
      if (process.env.STIDE_REQUIRE_TRAILERS === '1') err(path.join(contentRoot, 'posts'), message);
      else warn(path.join(contentRoot, 'posts'), message);
    }
  }
}

// ---- 汇总 ---------------------------------------------------------------
const summary = `内容：${people.size} 个人格、${postFiles.length} 篇文章、${allMedia.length} 个媒体文件；错误 ${errors.length}，警告 ${warnings.length}`;

if (warnings.length) {
  console.warn(`\n[check:content] 警告（${warnings.length}）`);
  for (const line of warnings) console.warn(`  ! ${line}`);
}

if (errors.length) {
  console.error(`\n[check:content] 错误（${errors.length}）`);
  for (const line of errors) console.error(`  x ${line}`);
  console.error(`\n[check:content] ${summary}`);
  process.exit(2);
}

console.log(`[check:content] 通过：${summary}`);
