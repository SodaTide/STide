/* STide 原型自检（file:// + CDP）：断点、pack、三轴、/en/ 搜索、无内联脚本。
 * 用法: node verify.mjs
 */
import { spawn } from 'node:child_process'
import { resolve } from 'node:path'
import { setTimeout as sleep } from 'node:timers/promises'

const EDGE = process.env.EDGE || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
const INDEX = 'file:///' + resolve('index.html').replace(/\\/g, '/')
const profile = process.env.TEMP + '/stide-verify-' + Date.now()

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
const errors = []
ws.onmessage = (ev) => {
  const msg = JSON.parse(ev.data)
  if (msg.id && pending.has(msg.id)) {
    const { res, rej } = pending.get(msg.id)
    pending.delete(msg.id)
    msg.error ? rej(new Error(msg.error.message)) : res(msg.result)
    return
  }
  if (msg.method === 'Runtime.exceptionThrown') {
    const d = msg.params.exceptionDetails
    errors.push((d.exception && d.exception.description) || d.text || 'exception')
  }
  if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') {
    errors.push((msg.params.args || []).map((a) => a.value ?? a.description ?? '').join(' '))
  }
}
const send = (method, params = {}, sid) =>
  new Promise((res, rej) => {
    const id = ++seq
    pending.set(id, { res, rej })
    ws.send(JSON.stringify({ id, method, params, ...(sid ? { sessionId: sid } : {}) }))
  })

const { targetId } = await send('Target.createTarget', { url: 'about:blank' })
const { sessionId: S } = await send('Target.attachToTarget', { targetId, flatten: true })
await send('Page.enable', {}, S)
await send('Runtime.enable', {}, S)

async function open(query, width = 1440, height = 1300) {
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 820 }, S)
  await send('Page.navigate', { url: INDEX + query }, S)
  for (let i = 0; i < 100; i++) {
    const r = await send('Runtime.evaluate', { expression: 'document.readyState', returnByValue: true }, S).catch(() => null)
    if (r && r.result && r.result.value === 'complete') break
    await sleep(100)
  }
  await sleep(450)
}
async function ev(expression) {
  const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }, S)
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text)
  return r.result.value
}

const results = []
const check = (name, pass, detail) => results.push([name, pass, detail])

for (const [w, h] of [[1440, 1500], [1200, 1400], [1024, 1400], [390, 844]]) {
  await open('?page=home', w, h)
  const m = await ev('({ s: document.documentElement.scrollWidth, w: innerWidth })')
  check(`无横向溢出 @ ${w}px`, m.s <= m.w + 1, `scrollWidth ${m.s} / innerWidth ${m.w}`)
}

await open('?page=post', 1024, 1400)
const post = await ev(`(() => {
  const rr = document.querySelector('.rail-right');
  const c = document.querySelector('.content');
  return { rr: rr ? getComputedStyle(rr).display : 'missing', cw: c ? Math.round(c.getBoundingClientRect().width) : 0 }
})()`)
check('1024 右栏 display:none', post.rr === 'none', `display=${post.rr}`)
check('1024 文章正文列 = 688px', Math.abs(post.cw - 688) <= 2, `width=${post.cw}`)

await open('?page=home', 1440, 1300)
const pack = await ev(`(() => {
  const cs = getComputedStyle(document.documentElement);
  return {
    blur: cs.getPropertyValue('--mc-blur').trim(),
    blurLg: cs.getPropertyValue('--mc-blur-lg').trim(),
    alpha: cs.getPropertyValue('--mc-glass-alpha').trim(),
    bg: cs.getPropertyValue('--mc-glass-bg').trim(),
    inline: [...document.querySelectorAll('script')].filter(s => !s.src && (!s.type || /javascript|module/i.test(s.type)) && s.textContent.trim()).length,
  }
})()`)
check('pack --mc-blur = 20px', pack.blur === '20px', `实际 ${pack.blur}`)
check('pack --mc-blur-lg = 28px', pack.blurLg === '28px', `实际 ${pack.blurLg}`)
check('pack --mc-glass-alpha = 0.72', pack.alpha === '0.72', `实际 ${pack.alpha}`)
check('pack --mc-glass-bg 已定义', !!pack.bg, pack.bg ? '是' : '空')
check('index.html 无内联脚本', pack.inline === 0, `inline=${pack.inline}`)

await open('?page=persona&who=lixia', 1440, 1400)
const axes = await ev(`(() => {
  const cs = getComputedStyle(document.documentElement);
  const a = document.querySelector('.rail-nav button.active, .rebuild-none');
  return {
    h: cs.getPropertyValue('--mc-h').trim(),
    h2: cs.getPropertyValue('--mc-h2').trim(),
    h3: cs.getPropertyValue('--mc-h3').trim(),
    color: a ? getComputedStyle(a).color : '',
  }
})()`)
check('三轴 --mc-h = 96', axes.h === '96', `实际 ${axes.h}`)
check('三轴 --mc-h2 = 96', axes.h2 === '96', `实际 ${axes.h2}`)
check('三轴 --mc-h3 含 326/422', /326|422/.test(axes.h3), `实际 ${axes.h3}`)

await open('?page=home&lang=en&search=1&q=%E5%B7%B4%E5%B7%B4%E6%89%98%E6%96%AF', 1440, 900)
await sleep(500)
const search = await ev(`(() => {
  const rows = [...document.querySelectorAll('.search-row')].filter(r => r.querySelector('.t'));
  const first = rows[0] ? rows[0].querySelector('.t').textContent.trim() : '';
  return { n: rows.length, first, lang: document.documentElement.lang }
})()`)
check('en 下搜「巴巴托斯」有结果', search.n > 0, `结果 ${search.n} 条；lang=${search.lang}`)
check('第一条标题仍为中文', /巴巴托斯/.test(search.first), `标题：${search.first}`)

check('控制台无 error', errors.length === 0, errors.slice(0, 2).join(' | ') || '无')

for (const [n, ok, d] of results) console.log(`${ok ? 'PASS' : 'FAIL'}  ${n}  — ${d}`)
const pass = results.filter((r) => r[1]).length
console.log(`RESULT: ${pass}/${results.length} PASS`)

try { await send('Browser.close') } catch {}
ws.close()
child.kill()
process.exit(pass === results.length ? 0 : 1)
