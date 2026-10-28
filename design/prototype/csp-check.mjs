/* STide 原型 CSP 自检（原型专用）：UMD 含 runtime compiler，必须放行 unsafe-eval；生产构建无此需求。\n * 本地带 CSP 头起一个静态服务器，用 CDP 打开页面，
 * 收集控制台里的 CSP 违规并断言「没有内联脚本、prefs.js 生效」。
 * 用法: node csp-check.mjs [page-query]
 */
import { spawn } from 'node:child_process'
import { createServer } from 'node:http'
import { readFileSync, existsSync } from 'node:fs'
import { extname, join, resolve } from 'node:path'
import { setTimeout as sleep } from 'node:timers/promises'

const ROOT = resolve('.')
const EDGE = process.env.EDGE || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
const QUERY = process.argv[2] || '?page=home&wall=banner'
const PORT = 4173 + Math.floor(Math.random() * 200)

const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-eval' 'wasm-unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "frame-src https://giscus.app",
  "worker-src 'self' blob:",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'none'",
].join('; ')

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
}

const server = createServer((req, res) => {
  const path = decodeURIComponent(new URL(req.url, 'http://x').pathname)
  const file = join(ROOT, path === '/' ? 'index.html' : path)
  if (!file.startsWith(ROOT) || !existsSync(file)) {
    res.writeHead(404); res.end('not found'); return
  }
  res.writeHead(200, {
    'Content-Type': MIME[extname(file)] || 'application/octet-stream',
    'Content-Security-Policy': CSP,
    'Cache-Control': 'no-store',
  })
  res.end(readFileSync(file))
})
await new Promise((r) => server.listen(PORT, '127.0.0.1', r))

const profile = process.env.TEMP + '/stide-csp-' + Date.now()
const child = spawn(EDGE, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
  '--no-default-browser-check', '--disable-extensions', '--force-device-scale-factor=1',
  '--remote-debugging-port=0', '--user-data-dir=' + profile, 'about:blank',
], { stdio: ['ignore', 'ignore', 'pipe'] })

const wsUrl = await new Promise((res, rej) => {
  let buf = ''
  const t = setTimeout(() => rej(new Error('no devtools ws')), 15000)
  child.stderr.on('data', (d) => {
    buf += d.toString()
    const m = buf.match(/DevTools listening on (ws:\/\/\S+)/)
    if (m) { clearTimeout(t); res(m[1]) }
  })
})

const ws = new WebSocket(wsUrl)
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej })

let seq = 0
const pending = new Map()
const consoleLines = []
const logEntries = []
ws.onmessage = (ev) => {
  const msg = JSON.parse(ev.data)
  if (msg.id && pending.has(msg.id)) {
    const { res, rej } = pending.get(msg.id)
    pending.delete(msg.id)
    msg.error ? rej(new Error(msg.error.message)) : res(msg.result)
    return
  }
  if (msg.method === 'Runtime.consoleAPICalled') {
    const text = (msg.params.args || []).map((a) => a.value ?? a.description ?? '').join(' ')
    consoleLines.push({ type: msg.params.type, text })
  }
  if (msg.method === 'Log.entryAdded') {
    logEntries.push({ level: msg.params.entry.level, text: msg.params.entry.text })
  }
  if (msg.method === 'Runtime.exceptionThrown') {
    consoleLines.push({ type: 'exception', text: (msg.params.exceptionDetails.exception && msg.params.exceptionDetails.exception.description) || msg.params.exceptionDetails.text || 'exception' })
  }
}
const send = (method, params = {}, sessionId) =>
  new Promise((res, rej) => {
    const id = ++seq
    pending.set(id, { res, rej })
    ws.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }))
  })

const { targetId } = await send('Target.createTarget', { url: 'about:blank' })
const { sessionId: S } = await send('Target.attachToTarget', { targetId, flatten: true })
await send('Page.enable', {}, S)
await send('Runtime.enable', {}, S)
await send('Log.enable', {}, S)
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1300, deviceScaleFactor: 1, mobile: false }, S)

const url = `http://127.0.0.1:${PORT}/index.html${QUERY}`
await send('Page.navigate', { url }, S)
await new Promise((res, rej) => {
  const t = setTimeout(() => rej(new Error('load timeout')), 20000)
  const iv = setInterval(async () => {
    try {
      const r = await send('Runtime.evaluate', { expression: 'document.readyState', returnByValue: true }, S)
      if (r.result?.value === 'complete') { clearInterval(iv); clearTimeout(t); res() }
    } catch {}
  }, 100)
})
await sleep(1200)

const probe = await send('Runtime.evaluate', {
  expression: `(() => {
    const inline = [...document.querySelectorAll('script')].filter(s => !s.src && (!s.type || /javascript|module/i.test(s.type)) && s.textContent.trim()).length;
    const cs = getComputedStyle(document.documentElement);
    return {
      url: location.href,
      inlineScripts: inline,
      colorMode: document.documentElement.dataset.mcColorMode,
      packBlur: cs.getPropertyValue('--mc-blur').trim(),
      hue: cs.getPropertyValue('--mc-h').trim(),
      h2: cs.getPropertyValue('--mc-h2').trim(),
      title: document.title,
    };
  })()`,
  returnByValue: true,
}, S)

const info = probe.result?.value || {}
const errors = consoleLines.filter((l) => (l.type === 'error' || l.type === 'exception'))
const violations = [...consoleLines, ...logEntries].filter((l) =>
  /content security policy|refused to/i.test(l.text || ''))

const results = [
  ['页面在 CSP 下加载完成', info.title ? 'PASS' : 'FAIL', `title=${info.title}`],
  ['无内联 <script>', info.inlineScripts === 0 ? 'PASS' : 'FAIL', `inline=${info.inlineScripts}`],
  ['prefs 已应用（data-mc-color-mode）', info.colorMode ? 'PASS' : 'FAIL', `mode=${info.colorMode}`],
  ['pack 生效（--mc-blur）', info.packBlur === '20px' ? 'PASS' : 'FAIL', `blur=${info.packBlur}`],
  ['无 CSP 违规', violations.length === 0 ? 'PASS' : 'FAIL', violations.map((v) => v.text).join(' | ').slice(0, 300) || 'none'],
  ['无控制台错误', errors.length === 0 ? 'PASS' : 'FAIL', errors.map((e) => e.text).join(' | ').slice(0, 300) || 'none'],
]

console.log(`CSP: ${CSP}`)
console.log(`URL: ${url}`)
for (const [name, status, detail] of results) console.log(`${status}  ${name}  (${detail})`)
const pass = results.filter((r) => r[1] === 'PASS').length
console.log(`RESULT: ${pass}/${results.length} PASS`)

try { await send('Browser.close') } catch {}
ws.close()
child.kill()
server.close()
process.exit(pass === results.length ? 0 : 1)
