/* STide prototype · app */
;(function () {
  const Q = new URLSearchParams(location.search)
  const SITE_HUE = 202

  const initialMode = Q.get('mode') === 'dark' ? 'dark' : 'light'
  document.documentElement.setAttribute('data-mc-color-mode', initialMode)
  if (Q.get('hue')) document.documentElement.style.setProperty('--mc-h', Q.get('hue'))

  const PAGES = ['home', 'post', 'persona', 'archive', 'people', 'about']
  const startPage = PAGES.includes(Q.get('page')) ? Q.get('page') : 'home'

  const FONTS = {
    serif: "'Noto Serif SC', 'Source Han Serif SC', 'Songti SC', Georgia, serif",
    sans: "'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif",
    kai: "'LXGW WenKai', 'KaiTi', 'STKaiti', serif",
    mono: "'JetBrains Mono', 'Cascadia Mono', Consolas, monospace",
  }

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

        layout: Q.get('layout') || 'list',
        wall: Q.get('wall') || 'banner',
        mode: initialMode,
        hue: Number(Q.get('hue')) || SITE_HUE,
        followHue: true,
        font: 'serif',
        lang: 'zh-CN',
        motion: 'full',
        filter: null,
        progress: 0,

        searchOpen: Q.get('search') === '1',
        settingsOpen: Q.get('settings') === '1',
        q: Q.get('q') || '高达',

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
        monthBars: [
          { id: 'jiaxin_tang', name: '嘉心糖', hue: 38, pct: 92 },
          { id: 'chaosheng', name: '潮声', hue: 188, pct: 64 },
          { id: 'lixia', name: '立夏', hue: 96, pct: 48 },
          { id: 'wakaba', name: '若叶睦', hue: 158, pct: 26 },
        ],
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
            const hay = [p.title, p.note, p.excerpt, (p.tags || []).join(' ')].join(' ').toLowerCase()
            return hay.includes(q)
          })
          .slice(0, 5)
      },
      searchPeople() {
        const q = this.q.trim().toLowerCase()
        if (!q) return []
        return this.peopleList.filter((p) => (p.name + ' ' + p.signature).toLowerCase().includes(q)).slice(0, 3)
      },
    },

    watch: {
      mode(v) {
        const resolved = v === 'auto'
          ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
          : v
        document.documentElement.setAttribute('data-mc-color-mode', resolved)
      },
      hue(v) {
        document.documentElement.style.setProperty('--mc-h', String(v))
      },
      font(v) {
        document.documentElement.style.setProperty('--st-serif', FONTS[v] || FONTS.serif)
      },
      searchOpen(v) {
        if (v) this.$nextTick(() => this.$refs.searchInput && this.$refs.searchInput.focus())
      },
      page(v) {
        if (v !== 'persona' && this.followHue) this.hue = SITE_HUE
        window.scrollTo(0, 0)
      },
    },

    methods: {
      person(p) { return p ? this.people[p.persona] : this.people.jiaxin_tang },
      seal(p) { return { '--h': this.person(p).hue } },
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
      },
      openPersona(p) {
        this.persona = p
        this.page = 'persona'
        if (this.followHue) this.hue = p.hue
        this.searchOpen = false
        window.scrollTo(0, 0)
      },
      toggleMode() { this.mode = this.mode === 'dark' ? 'light' : 'dark' },
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
      window.addEventListener('keydown', this.onKey)
      window.addEventListener('scroll', this.onScroll, { passive: true })
      document.documentElement.style.setProperty('--st-serif', FONTS[this.font])
      if (this.searchOpen) this.$nextTick(() => this.$refs.searchInput && this.$refs.searchInput.focus())
    },

    beforeUnmount() {
      window.removeEventListener('keydown', this.onKey)
      window.removeEventListener('scroll', this.onScroll)
    },
  })

  app.use(MochiUI)
  app.mount('#app')
})()







