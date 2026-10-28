/* STide 原型截图器 · 通过 CDP 精确控制视口，避免 headless 窗口最小宽度问题
 * 用法: node shoot.mjs <file-url-or-path> <out.png> [width] [height] [--full] [--wait=ms] [--eval="js"]
 */
import { spawn } from 'node:child_process'
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { setTimeout as sleep } from 'node:timers/promises'

const EDGE = process.env.EDGE || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'

const args = process.argv.slice(2)
const positional = args.filter((a) => !a.startsWith('--'))
const flags = Object.fromEntries(
  args
    .filter((a) => a.startsWith('--'))
    .map((a) => {
      const [k, v] = a.replace(/^--/, '').split('=')
      return [k, v ?? true]
    }),
)

const [input, out = 'shot.png', w = '1440', h = '1300'] = positional
const width = Number(w)
const height = Number(h)
const url = /^(file|https?):/.test(input) ? input : 'file:///' + resolve(input).replace(/\\/g, '/')

const profile = process.env.TEMP + '/stide-cdp-' + Date.now()
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
  } else if (msg.method) {
    events.push(msg)
  }
}
const send = (method, params = {}, sessionId) =>
  new Promise((res, rej) => {
    const id = ++seq
    pending.set(id, { res, rej })
    ws.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }))
  })

const { targetId } = await send('Target.createTarget', { url: 'about:blank' })
const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true })
const S = sessionId
await send('Page.enable', {}, S)
await send('Runtime.enable', {}, S)

await send('Emulation.setDeviceMetricsOverride', {
  width, height, deviceScaleFactor: 1, mobile: width < 820,
}, S)

await send('Page.navigate', { url }, S)
await new Promise((res, rej) => {
  const t = setTimeout(() => rej(new Error('load timeout: ' + url)), 20000)
  const iv = setInterval(() => {
    if (events.some((e) => e.method === 'Page.loadEventFired' && e.sessionId === S)) {
      clearInterval(iv); clearTimeout(t); res()
    }
  }, 50)
})
await sleep(Number(flags.wait || 900))

let evalResult
if (flags.eval) {
  const r = await send('Runtime.evaluate', { expression: String(flags.eval), returnByValue: true, awaitPromise: true }, S)
  evalResult = r.result?.value
}

let clip
if (flags.full) {
  const m = await send('Page.getLayoutMetrics', {}, S)
  const cs = m.cssContentSize || m.contentSize
  clip = { x: 0, y: 0, width, height: Math.min(Math.ceil(cs.height), 12000), scale: 1 }
}
const shot = await send('Page.captureScreenshot', {
  format: 'png',
  ...(clip ? { clip, captureBeyondViewport: true } : {}),
}, S)

mkdirSync(dirname(resolve(out)), { recursive: true })
writeFileSync(resolve(out), Buffer.from(shot.data, 'base64'))

if (evalResult !== undefined) console.log(JSON.stringify(evalResult))

try { await send('Browser.close') } catch {}
ws.close()
child.kill()
