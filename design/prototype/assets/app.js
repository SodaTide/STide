/* STide prototype · app */
;(function () {
  const Q = new URLSearchParams(location.search)
  const SITE_HUE = 202
  const P = window.STIDE_PREFS || { prefs: {}, overrides: {}, initial: {} }
  const I = Object.assign({
    mode: 'light', hue: SITE_HUE, wall: 'banner', layout: 'list',
    sidebar: true, font: 'serif', motion: 'full', lang: 'zh-CN',
  }, P.initial || {})

  const PAGES = ['home', 'post', 'persona', 'archive', 'people', 'about']
  const startPage = PAGES.includes(Q.get('page')) ? Q.get('page') : 'home'
  const PAGE_WALL = { home: 'banner', people: 'banner', archive: 'banner', persona: 'banner', post: 'solid', about: 'solid' }
  const MOTION_SCALE = { full: '1', half: '.5', off: '0' }

  const FONTS = {
    serif: {
      display: "'Noto Serif SC', 'Source Han Serif SC', 'Songti SC', Georgia, serif",
      body: "'Inter', 'Segoe UI', 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif",
    },
    sans: {
      display: "'Inter', 'Segoe UI', 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif",
      body: "'Inter', 'Segoe UI', 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif",
    },
    kai: {
      display: "'LXGW WenKai', 'KaiTi', 'STKaiti', 'Noto Serif SC', serif",
      body: "'LXGW WenKai', 'KaiTi', 'STKaiti', 'Noto Serif SC', serif",
    },
    mono: {
      display: "'JetBrains Mono', 'Cascadia Mono', Consolas, 'SFMono-Regular', ui-monospace, monospace",
      body: "'Inter', 'Segoe UI', 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif",
    },
  }

  function resolveMode(v) {
    if (v !== 'auto') return v === 'dark' ? 'dark' : 'light'
    try { return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' } catch (e) { return 'light' }
  }

  const root = document.documentElement
  root.setAttribute('data-mc-color-mode', resolveMode(I.mode))
  root.lang = I.lang
  root.style.setProperty('--mc-h', String(I.hue))
  root.style.setProperty('--mc-motion-scale', MOTION_SCALE[I.motion] || '1')

  const app = Vue.createApp({
    template: document.getElementById('app-tpl').innerHTML,

    data() {
      return {
        page: startPage,
        current: POSTS.find((p) => p.slug === Q.get('post')) || POSTS[0],
        persona: PEOPLE[Q.get('who')] || PEOPLE.jiaxin_tang,
        posts: POSTS,
        people: PEOPLE,
        nav: NAV,

        layout: I.layout,
        wall: I.wall,
        mode: I.mode,
        hue: I.hue,
        followHue: P.prefs.followHue !== false,
        sidebar: I.sidebar,
        wallUser: !!(P.overrides && P.overrides.wall) || !!P.prefs.wall,
        font: I.font,
        lang: I.lang,
        motion: I.motion,
        filter: null,
        progress: 0,

        searchOpen: Q.get('search') === '1',
        settingsOpen: Q.get('settings') === '1',
        q: Q.get('q') || '',
        searchActiveKey: '',

        modeOptions: [
          { label: '亮', value: 'light', icon: 'sun' },
          { label: '暗', value: 'dark', icon: 'moon' },
          { label: '跟随', value: 'auto', icon: 'sparkles' },
        ],
        layoutOptions: [
          { label: '列表', value: 'list', icon: 'book' },
          { label: '网格', value: 'grid', icon: 'layers' },
          { label: '瀑布', value: 'masonry', icon: 'image' },
        ],
        motionOptions: [
          { label: '全', value: 'full' },
          { label: '轻', value: 'half' },
          { label: '关', value: 'off' },
        ],
        fontOptions: [
          { label: '宋 · 默认', value: 'serif' },
          { label: '黑 · 直接', value: 'sans' },
          { label: '楷 · 手写', value: 'kai' },
          { label: '等宽 · 档案', value: 'mono' },
        ],
        langOptions: [
          { label: '简体中文', value: 'zh-CN' },
          { label: '繁體中文', value: 'zh-TW' },
          { label: 'English', value: 'en' },
          { label: '日本語', value: 'ja' },
          { label: 'Русский', value: 'ru' },
          { label: '한국어', value: 'ko' },
        ],
        proseStyle: {
          '--mc-prose-bg': 'transparent',
          '--mc-prose-border': '0',
          '--mc-prose-shadow': 'none',
          '--mc-prose-pad': '0',
          '--mc-prose-measure': '688px',
          '--mc-prose-size': '18px',
          '--mc-prose-surface': 'transparent',
          '--mc-prose-text-2': 'var(--st-ink-1)',
          '--mc-prose-accent': 'var(--st-accent)',
          '--mc-prose-accent-soft': 'transparent',
          '--mc-prose-code-bg': 'var(--st-inset)',
          '--mc-prose-rule': 'var(--st-hair-soft)',
          '--mc-prose-heading-font': 'var(--st-serif)',
        },
      }
    },

    computed: {
      lead() { return this.posts[0] },
      rest() { return this.posts.slice(1) },
      peopleList() {
        const last = { jiaxin_tang: '14:03', wakaba: '11:20', chaosheng: '昨天', lixia: '昨天' }
        return Object.values(this.people).map((p) => ({ ...p, last: last[p.id] || '—' }))
      },
      otherPeople() { return this.peopleList.filter((p) => p.id !== this.persona.id) },
      personaPosts() { return this.posts.filter((p) => p.persona === this.persona.id) },
      filtered() { return this.filter ? this.posts.filter((p) => p.persona === this.filter) : this.posts },
      sectionLabel() {
        return { home: '潮线', post: '一篇', persona: '人格', archive: '旧', people: '人', about: '关于' }[this.page] || ''
      },
      searchPosts() {
        const q = this.q.trim().toLowerCase()
        if (!q) return []
        return this.posts
          .filter((p) => {
            const hay = [p.title, p.note, p.excerpt].join(' ').toLowerCase()
            return hay.includes(q)
          })
          .slice(0, 5)
      },
      searchPeople() {
        const q = this.q.trim().toLowerCase()
        if (!q) return []
        return this.peopleList.filter((p) => (p.name + ' ' + p.signature).toLowerCase().includes(q)).slice(0, 3)
      },
      searchItems() {
        return [
          ...this.searchPosts.map((p) => ({ key: 'p:' + p.id, kind: 'post', item: p })),
          ...this.searchPeople.map((p) => ({ key: 'u:' + p.id, kind: 'person', item: p })),
        ]
      },
      monthBars() {
        const ids = Object.keys(this.people)
        const counts = ids.map((id) => ({ id, n: this.posts.filter((p) => p.persona === id).length }))
        const max = Math.max(1, ...counts.map((c) => c.n))
        return counts.map(({ id, n }) => ({
          id, n, name: this.people[id].name, hue: this.people[id].hue,
          pct: Math.round((n / max) * 100),
        }))
      },
    },

    watch: {
      mode(v) {
        document.documentElement.setAttribute('data-mc-color-mode', resolveMode(v))
        this.save()
      },
      hue(v) {
        document.documentElement.style.setProperty('--mc-h', String(v))
        this.save()
      },
      font(v) {
        this.applyFont(v)
        this.save()
      },
      motion(v) {
        document.documentElement.style.setProperty('--mc-motion-scale', MOTION_SCALE[v] || '1')
        this.save()
      },
      lang(v) {
        document.documentElement.lang = v
        this.save()
      },
      sidebar() { this.save() },
      layout() { this.save() },
      searchOpen(v) {
        this.searchActiveKey = ''
        if (v) this.$nextTick(() => this.$refs.searchInput && this.$refs.searchInput.focus())
      },
      page(v) {
        if (v !== 'persona' && this.followHue) this.hue = SITE_HUE
        if (!this.wallUser) this.wall = PAGE_WALL[v] || 'banner'
        if (v === 'post' && this.wall === 'transparent') this.wall = 'full'
        window.scrollTo(0, 0)
      },
    },

    methods: {
      person(p) { return p ? this.people[p.persona] : this.people.jiaxin_tang },
      seal(p) { return { '--h': this.person(p).hue } },
      applyFont(key) {
        const f = FONTS[key] || FONTS.serif
        const r = document.documentElement
        r.style.setProperty('--st-serif', f.display)
        r.style.setProperty('--st-sans', f.body)
        r.style.setProperty('--mc-font-display', f.display)
        r.style.setProperty('--mc-font-sans', f.body)
      },
      save() {
        try {
          localStorage.setItem('stide.prefs', JSON.stringify({
            mode: this.mode, hue: this.hue, followHue: this.followHue,
            wall: this.wallUser ? this.wall : null, layout: this.layout,
            sidebar: this.sidebar, font: this.font, motion: this.motion, lang: this.lang,
          }))
        } catch (e) { /* 隐私模式下不持久化，页面照常 */ }
      },
      setWall(v) { this.wall = v; this.wallUser = true; this.save() },
      moveSearch(delta) {
        const keys = this.searchItems.map((i) => i.key)
        if (!keys.length) return
        let i = keys.indexOf(this.searchActiveKey)
        i = i < 0 ? (delta > 0 ? 0 : keys.length - 1) : (i + delta + keys.length) % keys.length
        this.searchActiveKey = keys[i]
      },
      enterSearch() {
        const it = this.searchItems.find((i) => i.key === this.searchActiveKey) || this.searchItems[0]
        if (!it) return
        if (it.kind === 'post') this.openPost(it.item)
        else this.openPersona(it.item)
        this.searchActiveKey = ''
      },
      navActive(n) {
        return this.page === n.key || (n.key === 'people' && this.page === 'persona') || (n.key === 'home' && this.page === 'post')
      },
      go(key) {
        if (key === 'search') { this.searchOpen = true; return }
        this.page = key
      },
      openPost(p) {
        this.current = p
        this.page = 'post'
        this.searchOpen = false
        this.searchActiveKey = ''
      },
      openPersona(p) {
        this.persona = p
        this.page = 'persona'
        if (this.followHue) this.hue = p.hue
        this.searchOpen = false
        this.searchActiveKey = ''
        window.scrollTo(0, 0)
      },
      toggleMode() { this.mode = this.mode === 'dark' ? 'light' : 'dark' },
      onSystemDark() {
        if (this.mode === 'auto') document.documentElement.setAttribute('data-mc-color-mode', resolveMode('auto'))
      },
      hl(text) {
        const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]))
        const q = this.q.trim()
        if (!q) return esc(text)
        const safe = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        return esc(text).replace(new RegExp('(' + safe + ')', 'gi'), '<mark>$1</mark>')
      },
      onKey(e) {
        const tag = (e.target && e.target.tagName) || ''
        const typing = tag === 'INPUT' || tag === 'TEXTAREA'
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault()
          this.searchOpen = true
        } else if (e.key === '/' && !typing) {
          e.preventDefault()
          this.searchOpen = true
        } else if (e.key === 'Escape') {
          if (this.searchOpen) this.searchOpen = false
          else if (this.settingsOpen) this.settingsOpen = false
        }
      },
      onScroll() {
        if (this.page !== 'post') return
        const h = document.documentElement.scrollHeight - window.innerHeight
        this.progress = h > 0 ? Math.min(100, Math.max(0, (window.scrollY / h) * 100)) : 0
      },
    },

    mounted() {
      if (this.page === 'persona' && this.followHue) this.hue = this.persona.hue
      this.applyFont(this.font)
      document.documentElement.setAttribute('data-mc-color-mode', resolveMode(this.mode))
      document.documentElement.lang = this.lang
      document.documentElement.style.setProperty('--mc-motion-scale', MOTION_SCALE[this.motion] || '1')
      window.addEventListener('keydown', this.onKey)
      window.addEventListener('scroll', this.onScroll, { passive: true })
      try {
        this.mql = matchMedia('(prefers-color-scheme: dark)')
        this.mql.addEventListener('change', this.onSystemDark)
      } catch (e) { /* 老浏览器忽略 */ }
      if (this.searchOpen) this.$nextTick(() => this.$refs.searchInput && this.$refs.searchInput.focus())
    },

    beforeUnmount() {
      window.removeEventListener('keydown', this.onKey)
      window.removeEventListener('scroll', this.onScroll)
      if (this.mql) this.mql.removeEventListener('change', this.onSystemDark)
    },
  })

  app.use(MochiUI)
  app.mount('#app')
})()







