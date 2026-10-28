/* STide 首帧偏好（外部脚本，<head> 同步引入；CSP script-src 'self' 可用）
 *
 * 键：localStorage['stide.prefs.v1']（02 §9）
 * 与 src/lib/prefs.ts 同构；两边都改时保持字段一致。
 * 这里只写 <html> 上的 data-* 与 --mc-h/--mc-s，不碰 DOM 结构。
 */
(function () {
  var KEY = 'stide.prefs.v1';
  var DEFAULTS = {
    colorMode: 'auto',
    hue: null,
    wall: null,
    layout: 'list',
    sidebar: true,
    font: 'song',
    motion: 'full',
    followPersona: true,
    lang: null,
  };

  function read() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return {};
      var parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch (e) {
      return {};
    }
  }

  function write(patch) {
    var next = Object.assign({}, read(), patch);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch (e) {
      /* 隐私模式：当次仍然生效，只是不持久 */
    }
    apply(next);
    return next;
  }

  function mediaDark() {
    try {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch (e) {
      return false;
    }
  }

  function resolveMode(prefs) {
    var mode = prefs.colorMode || 'auto';
    if (mode === 'light' || mode === 'dark') return mode;
    return mediaDark() ? 'dark' : 'light';
  }

  function apply(prefs) {
    var root = document.documentElement;
    var page = root.getAttribute('data-st-page') || 'home';
    var siteHue = Number(root.getAttribute('data-st-site-hue') || root.getAttribute('data-st-hue') || 202);
    var serverHue = Number(root.getAttribute('data-st-hue') || siteHue);
    var hue = prefs.hue;
    if (hue === null || hue === undefined) {
      if (page === 'persona' && prefs.followPersona !== false) hue = serverHue;
      else hue = siteHue;
    }
    hue = ((Number(hue) % 360) + 360) % 360;

    var mode = resolveMode(prefs);
    root.setAttribute('data-mc-color-mode', mode);
    root.style.colorScheme = mode;

    root.style.setProperty('--mc-h', String(hue));
    root.style.setProperty('--mc-h2', String(hue));
    root.style.setProperty('--mc-h3', String(hue + 326));
    root.style.setProperty('--mc-s', String(prefs.saturation || 58));

    var wall = prefs.wall || root.getAttribute('data-st-wall') || 'solid';
    if (page === 'post' && wall === 'transparent') wall = 'full';
    root.setAttribute('data-st-wall', wall);

    root.setAttribute('data-st-layout', prefs.layout || 'list');
    root.setAttribute('data-st-sidebar', prefs.sidebar === false ? 'off' : 'on');
    root.setAttribute('data-st-font', prefs.font || 'song');
    root.setAttribute('data-st-motion', prefs.motion || 'full');
    root.style.setProperty('--mc-motion-scale', prefs.motion === 'off' ? '0' : prefs.motion === 'lite' ? '0.5' : '1');
  }

  function merged() {
    var prefs = Object.assign({}, DEFAULTS, read());
    // URL 只用于预览与验收，不写入偏好
    try {
      var params = new URLSearchParams(location.search);
      if (params.has('mode')) prefs.colorMode = params.get('mode');
      if (params.has('hue')) prefs.hue = Number(params.get('hue'));
      if (params.has('wall')) prefs.wall = params.get('wall');
      if (params.has('layout')) prefs.layout = params.get('layout');
      if (params.has('sidebar')) prefs.sidebar = params.get('sidebar') !== '0';
      if (params.has('font')) prefs.font = params.get('font');
      if (params.has('motion')) prefs.motion = params.get('motion');
    } catch (e) {
      /* 无 URLSearchParams：按偏好走 */
    }
    return prefs;
  }

  var current = merged();
  apply(current);

  // auto 跟随系统：系统明暗变化时重解析
  try {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var onChange = function () {
      apply(merged());
    };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else if (mq.addListener) mq.addListener(onChange);
  } catch (e) {}

  window.STIDE_PREFS = {
    key: KEY,
    defaults: DEFAULTS,
    read: function () {
      return Object.assign({}, DEFAULTS, read());
    },
    effective: merged,
    write: write,
    apply: function (next) {
      apply(Object.assign({}, DEFAULTS, next || read()));
    },
    reset: function () {
      try {
        localStorage.removeItem(KEY);
      } catch (e) {}
      apply(merged());
    },
  };
})();
