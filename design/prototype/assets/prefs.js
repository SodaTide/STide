/* STide prototype · 首帧偏好
 * 同步脚本，放在 CSS 之前：只读 URL + localStorage，尽快落 <html> 状态，避免闪白。
 * 具体控件绑定与写回在 app.js。
 */
;(function () {
  var PAGES = ['home', 'post', 'persona', 'archive', 'people', 'about']
  var MODES = ['light', 'dark', 'auto']
  var WALLS = ['solid', 'banner', 'full', 'transparent']
  var LAYOUTS = ['list', 'grid', 'masonry']
  var FONTS = ['serif', 'sans', 'kai', 'mono']
  var MOTIONS = ['full', 'half', 'off']
  var LANGS = ['zh-CN', 'zh-TW', 'en', 'ja', 'ru', 'ko']
  var PAGE_WALL = { home: 'banner', people: 'banner', archive: 'banner', persona: 'banner', post: 'solid', about: 'solid' }
  var MOTION_SCALE = { full: '1', half: '.5', off: '0' }
  var KEY = 'stide.prefs'

  var q
  try { q = new URLSearchParams(location.search) } catch (e) { q = new URLSearchParams() }

  var saved = {}
  try {
    var raw = localStorage.getItem(KEY)
    if (raw) saved = JSON.parse(raw) || {}
  } catch (e) { saved = {} }

  function pick(v, allowed, fallback) { return allowed.indexOf(v) >= 0 ? v : fallback }
  function num(v, fallback) {
    var n = Number(v)
    return isFinite(n) && n >= 0 && n <= 360 ? Math.round(n) : fallback
  }

  var page = pick(q.get('page'), PAGES, 'home')
  var prefs = {
    mode: pick(saved.mode, MODES, 'light'),
    hue: num(saved.hue, 202),
    followHue: saved.followHue !== false,
    wall: WALLS.indexOf(saved.wall) >= 0 ? saved.wall : null,
    layout: pick(saved.layout, LAYOUTS, 'list'),
    sidebar: saved.sidebar !== false,
    font: pick(saved.font, FONTS, 'serif'),
    motion: pick(saved.motion, MOTIONS, 'full'),
    lang: pick(saved.lang, LANGS, 'zh-CN'),
  }
  var overrides = {
    mode: pick(q.get('mode'), MODES, null),
    hue: q.get('hue') !== null ? num(q.get('hue'), null) : null,
    wall: pick(q.get('wall'), WALLS, null),
    layout: pick(q.get('layout'), LAYOUTS, null),
    lang: pick(q.get('lang'), LANGS, null),
    sidebar: q.get('sidebar') === '0' ? false : q.get('sidebar') === '1' ? true : null,
  }

  var initial = {
    mode: overrides.mode !== null ? overrides.mode : prefs.mode,
    hue: overrides.hue !== null ? overrides.hue : prefs.hue,
    wall: overrides.wall !== null ? overrides.wall : prefs.wall || PAGE_WALL[page],
    layout: overrides.layout !== null ? overrides.layout : prefs.layout,
    sidebar: overrides.sidebar !== null ? overrides.sidebar : prefs.sidebar,
    font: prefs.font,
    motion: prefs.motion,
    lang: overrides.lang !== null ? overrides.lang : prefs.lang,
  }

  var resolvedMode = initial.mode
  if (resolvedMode === 'auto') {
    try { resolvedMode = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' } catch (e) { resolvedMode = 'light' }
  }
  if (page === 'post' && initial.wall === 'transparent') initial.wall = 'full'

  var root = document.documentElement
  root.setAttribute('data-mc-color-mode', resolvedMode)
  root.setAttribute('data-motion', initial.motion)
  root.lang = initial.lang
  root.style.setProperty('--mc-h', String(initial.hue))
  root.style.setProperty('--mc-motion-scale', MOTION_SCALE[initial.motion] || '1')

  window.STIDE_PREFS = { key: KEY, prefs: prefs, overrides: overrides, initial: initial, page: page }
})()
