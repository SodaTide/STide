/* 极简静态服务器：给站点验收截图用（不引入依赖）
 * 用法: node tools/dev-server.mjs <dist-dir> [port]
 */
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join, normalize, resolve } from 'node:path'

const root = resolve(process.argv[2] || 'site/dist')
const port = Number(process.argv[3] || 4399)

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.wasm': 'application/wasm',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.woff2': 'font/woff2',
  '.pf_fragment': 'application/octet-stream',
  '.pf_index': 'application/octet-stream',
  '.pf_meta': 'application/octet-stream',
  '': 'application/octet-stream',
}

async function pick(pathname) {
  const base = join(root, normalize(decodeURIComponent(pathname)))
  const candidates = [base, join(base, 'index.html'), base + '.html']
  for (const c of candidates) {
    try {
      const s = await stat(c)
      if (s.isFile()) return c
    } catch {}
  }
  return null
}

createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x')
  const file = (await pick(url.pathname)) || join(root, '404.html')
  try {
    const body = await readFile(file)
    res.writeHead(file.endsWith('404.html') ? 404 : 200, {
      'content-type': TYPES[extname(file)] || 'application/octet-stream',
      'cache-control': 'no-store',
    })
    res.end(body)
  } catch (err) {
    res.writeHead(500).end(String(err))
  }
}).listen(port, '127.0.0.1', () => console.log(`serving ${root} on http://127.0.0.1:${port}`))
