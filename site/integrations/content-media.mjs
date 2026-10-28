/**
 * content/ 媒体与头像的静态发布（本集成只在 dev / build 时工作）
 *
 * - dev：把 /media/**、/people/** 映射到仓库根 content/ 下；
 * - build：复制到 dist/media、dist/people（只复制图片，绝不复制 people/*.json）。
 *
 * 口径：03 §4.1 的路径 `media/YYYY/MM/<hash8>.<ext>` 与 `people/<id>/avatar.webp`。
 */
import { createReadStream } from 'node:fs';
import { cp, mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const IMAGE_EXT = new Set(['.webp', '.jpg', '.jpeg', '.png', '.avif', '.gif', '.svg']);

const TYPES = {
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
};

function contentType(file) {
  return TYPES[path.extname(file).toLowerCase()] ?? 'application/octet-stream';
}

async function listImages(dir, base = dir) {
  const out = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await listImages(full, base)));
    else if (IMAGE_EXT.has(path.extname(entry.name).toLowerCase())) out.push({ full, rel: path.relative(base, full) });
  }
  return out;
}

export default function contentMedia({ contentDir }) {
  return {
    name: 'stide-content-media',
    hooks: {
      'astro:server:setup': ({ server }) => {
        server.middlewares.use(async (req, res, next) => {
          const url = new URL(req.url ?? '/', 'http://localhost');
          const match = url.pathname.match(/^\/(media|people)\/(.+)$/);
          if (!match) return next();
          const [, kind, relRaw] = match;
          let rel;
          try {
            rel = decodeURIComponent(relRaw);
          } catch {
            res.statusCode = 400;
            return res.end('bad path');
          }
          if (rel.includes('..') || rel.includes('\\')) {
            res.statusCode = 400;
            return res.end('bad path');
          }
          const root = kind === 'media' ? path.join(contentDir, 'media') : path.join(contentDir, 'people');
          const file = path.join(root, rel);
          if (!file.startsWith(root)) {
            res.statusCode = 400;
            return res.end('bad path');
          }
          try {
            const info = await stat(file);
            if (!info.isFile() || !IMAGE_EXT.has(path.extname(file).toLowerCase())) return next();
            res.setHeader('Content-Type', contentType(file));
            res.setHeader('Cache-Control', 'no-cache');
            createReadStream(file).pipe(res);
          } catch {
            next();
          }
        });
      },
      'astro:build:done': async ({ dir, logger }) => {
        const dist = dir.pathname.replace(/^\/([A-Za-z]:)/, '$1');
        const mediaRoot = path.join(contentDir, 'media');
        const peopleRoot = path.join(contentDir, 'people');

        try {
          await cp(mediaRoot, path.join(dist, 'media'), { recursive: true });
        } catch {
          logger.warn('content/media 不存在，跳过');
        }

        const avatars = await listImages(peopleRoot, peopleRoot);
        for (const { full, rel } of avatars) {
          const target = path.join(dist, 'people', rel);
          await mkdir(path.dirname(target), { recursive: true });
          await cp(full, target);
        }
        logger.info(`媒体同步：dist/media、dist/people（头像 ${avatars.length} 个）`);
      },
    },
  };
}
