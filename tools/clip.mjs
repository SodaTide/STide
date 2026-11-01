/* 局部截图（CDP clip）：node tools/clip.mjs <url> <out.png> <w> <h> <x> <y> <cw> <ch> [scale] [wait]
 * 用于验收时放大查看某个区块的排版细节。 */
import { spawn } from 'node:child_process'
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { setTimeout as sleep } from 'node:timers/promises'

const EDGE = process.env.EDGE || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
const [url, out, w = '1440', h = '900', x = '0', y = '0', cw = '640', ch = '480', scale = '2', wait = '1200'] =
  process.argv.slice(2)

const width = Number(w)
const height = Number(h)
const profile = process.env.TEMP + '/stide-clip-' + Date.now()
const child = spawn(EDGE, [
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  '--no-first-run',
  '--no-default-browser-check',
  '--disable-extensions',
  '--force-device-scale-factor=1',
  '--remote-debugging-port=0',
  '--user-data-dir=' + profile,
  'about:blank',
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
const events = []
ws.onmessage = (ev) => {
  const msg = JSON.parse(ev.data)
  if (msg.id && pending.has(msg.id)) {
    const { res, rej } = pending.get(msg.id)
    pending.delete(msg.id)
    msg.error ? rej(new Error(msg.error.message)) : res(msg.result)
  } else if (msg.method) events.push(msg)
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
await send('Emulation.setDeviceMetricsOverride', {
  width, height, deviceScaleFactor: 1, mobile: width < 820,
}, S)
await send('Page.navigate', { url }, S)
await new Promise((res, rej) => {
  const t = setTimeout(() => rej(new Error('load timeout')), 20000)
  const iv = setInterval(() => {
    if (events.some((e) => e.method === 'Page.loadEventFired' && e.sessionId === S)) {
      clearInterval(iv); clearTimeout(t); res()
    }
  }, 50)
})
await sleep(Number(wait))

const shot = await send('Page.captureScreenshot', {
  format: 'png',
  clip: { x: Number(x), y: Number(y), width: Number(cw), height: Number(ch), scale: Number(scale) },
  captureBeyondViewport: true,
}, S)
mkdirSync(dirname(resolve(out)), { recursive: true })
writeFileSync(resolve(out), Buffer.from(shot.data, 'base64'))

try { await send('Browser.close') } catch {}
ws.close()
child.kill()
console.log('ok', out)
