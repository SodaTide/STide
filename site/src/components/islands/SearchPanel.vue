<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { Skeleton } from 'mochi-ui';
import 'mochi-ui/styles/skeleton.css';

interface PersonLite {
  id: string;
  name: string;
  hue: number;
  signature: string;
  url: string;
}

interface RecentLite {
  title: string;
  url: string;
  persona: string;
  date: string;
}

interface Props {
  open: boolean;
  inline?: boolean;
  locale: string;
  strings: Record<string, string>;
  recent: RecentLite[];
  people: PersonLite[];
  archiveCount: number;
  archiveUrl: string;
  peopleUrl: string;
  aboutUrl: string;
  rssUrl: string;
}

const props = withDefaults(defineProps<Props>(), { inline: false });
const emit = defineEmits<{ (e: 'close'): void }>();

const s = computed(() => props.strings);
const query = ref('');
const activeIndex = ref(0);
const loading = ref(false);
const error = ref(false);
const articleResults = ref<{ url: string; excerpt: string; meta: Record<string, string> }[]>([]);
const inputEl = ref<HTMLInputElement | null>(null);
const bodyEl = ref<HTMLElement | null>(null);

let debounceTimer: ReturnType<typeof setTimeout> | undefined;
let requestSeq = 0;
let pagefind: {
  search: (q: string) => Promise<{ results: { data: () => Promise<{ url: string; excerpt: string; meta: Record<string, string> }> }[] }>;
} | null = null;
let pagefindFailed = false;

const personById = computed(() => new Map(props.people.map((p) => [p.id, p])));

const pages = computed(() => [
  { title: s.value.archive.replace('{n}', String(props.archiveCount)), url: props.archiveUrl },
  { title: s.value.peoplePage, url: props.peopleUrl },
  { title: s.value.aboutPage, url: props.aboutUrl },
  { title: s.value.rss, url: props.rssUrl },
]);

interface Row {
  kind: 'article' | 'person' | 'page';
  url: string;
  title: string;
  sub?: string;
  hue?: number;
  persona?: string;
  excerpt?: string;
}

const groups = computed(() => {
  const q = query.value.trim();
  const list: { label: string; rows: Row[] }[] = [];

  if (!q) {
    list.push({
      label: s.value.recent,
      rows: props.recent.map((r) => ({
        kind: 'article' as const,
        url: r.url,
        title: r.title,
        sub: `${personById.value.get(r.persona)?.name ?? r.persona} · ${r.date}`,
        hue: personById.value.get(r.persona)?.hue,
        persona: r.persona,
      })),
    });
    list.push({
      label: s.value.people,
      rows: props.people.slice(0, 5).map((p) => ({
        kind: 'person' as const,
        url: p.url,
        title: p.name,
        sub: p.signature,
        hue: p.hue,
      })),
    });
    list.push({
      label: s.value.pages,
      rows: pages.value.slice(0, 3).map((p) => ({ kind: 'page' as const, url: p.url, title: p.title })),
    });
    return list;
  }

  if (articleResults.value.length) {
    list.push({
      label: s.value.articles,
      rows: articleResults.value.map((r) => ({
        kind: 'article' as const,
        url: r.url,
        title: r.meta.title ?? r.url,
        sub: [personById.value.get(r.meta.persona ?? '')?.name ?? r.meta.persona, r.meta.date].filter(Boolean).join(' · '),
        excerpt: r.excerpt,
        hue: personById.value.get(r.meta.persona ?? '')?.hue,
        persona: r.meta.persona,
      })),
    });
  }

  const lower = q.toLowerCase();
  const people = props.people
    .filter((p) => `${p.name} ${p.signature} ${p.id}`.toLowerCase().includes(lower))
    .slice(0, 3)
    .map((p) => ({ kind: 'person' as const, url: p.url, title: p.name, sub: p.signature, hue: p.hue }));
  if (people.length) list.push({ label: s.value.people, rows: people });

  const pageRows = pages.value
    .filter((p) => p.title.toLowerCase().includes(lower))
    .slice(0, 3)
    .map((p) => ({ kind: 'page' as const, url: p.url, title: p.title }));
  if (pageRows.length) list.push({ label: s.value.pages, rows: pageRows });

  return list;
});

const flat = computed(() => groups.value.flatMap((group) => group.rows));

const hasResults = computed(() => flat.value.length > 0);
const showNoResult = computed(() => query.value.trim().length > 0 && !loading.value && !error.value && !hasResults.value);

function escapeHtml(text: string): string {
  return text.replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch] ?? ch);
}

function highlight(text: string): string {
  const q = query.value.trim();
  const safe = escapeHtml(text);
  if (!q) return safe;
  const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return safe.replace(new RegExp(escaped, 'gi'), (match) => `<mark>${match}</mark>`);
}

function rowIndex(row: Row): number {
  return flat.value.indexOf(row);
}

async function ensurePagefind() {
  if (pagefind || pagefindFailed) return pagefind;
  try {
    // @ts-expect-error Pagefind 产物在构建后生成，开发期可能不存在
    const mod = await import(/* @vite-ignore */ '/pagefind/pagefind.js');
    await mod.init?.();
    pagefind = mod;
    return pagefind;
  } catch {
    pagefindFailed = true;
    return null;
  }
}

async function runSearch(q: string) {
  const seq = ++requestSeq;
  if (!q) {
    articleResults.value = [];
    loading.value = false;
    error.value = false;
    return;
  }
  loading.value = true;
  error.value = false;
  const pf = await ensurePagefind();
  if (!pf) {
    if (seq === requestSeq) {
      loading.value = false;
      error.value = true;
    }
    return;
  }
  try {
    const search = await pf.search(q);
    const data = await Promise.all(search.results.slice(0, 8).map((r) => r.data()));
    if (seq !== requestSeq) return;
    articleResults.value = data.map((d) => ({ url: d.url, excerpt: d.excerpt, meta: d.meta ?? {} }));
    loading.value = false;
  } catch {
    if (seq !== requestSeq) return;
    loading.value = false;
    error.value = true;
  }
}

function updateQuery(value: string) {
  query.value = value;
  activeIndex.value = 0;
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => runSearch(value.trim()), 120);
}

function onInput(event: Event) {
  updateQuery((event.target as HTMLInputElement).value);
}

function go(url: string) {
  const a = document.createElement('a');
  a.href = url;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function openActive() {
  const row = flat.value[activeIndex.value];
  if (row) {
    emit('close');
    go(row.url);
  }
}

function move(delta: number) {
  if (!flat.value.length) return;
  activeIndex.value = (activeIndex.value + delta + flat.value.length) % flat.value.length;
  nextTick(() => {
    const active = bodyEl.value?.querySelector<HTMLElement>('.search-row.on');
    active?.scrollIntoView({ block: 'nearest' });
  });
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowDown') {
    event.preventDefault();
    move(1);
  } else if (event.key === 'ArrowUp') {
    event.preventDefault();
    move(-1);
  } else if (event.key === 'Home') {
    event.preventDefault();
    activeIndex.value = 0;
  } else if (event.key === 'End') {
    event.preventDefault();
    activeIndex.value = Math.max(0, flat.value.length - 1);
  } else if (event.key === 'Enter') {
    event.preventDefault();
    openActive();
  } else if (event.key === 'Escape') {
    event.preventDefault();
    emit('close');
  }
}

function focusInput() {
  nextTick(() => inputEl.value?.focus());
}

watch(
  () => props.open,
  (open) => {
    if (!open) {
      query.value = '';
      articleResults.value = [];
      error.value = false;
      loading.value = false;
      activeIndex.value = 0;
      return;
    }
    if (props.inline) {
      const q = new URLSearchParams(window.location.search).get('q') ?? '';
      query.value = q;
      if (q) runSearch(q);
    }
    focusInput();
  },
);

onMounted(() => {
  if (props.inline) {
    const q = new URLSearchParams(window.location.search).get('q') ?? '';
    query.value = q;
    if (q) runSearch(q);
    focusInput();
  }
});

onBeforeUnmount(() => {
  if (debounceTimer) clearTimeout(debounceTimer);
});
</script>

<template>
  <div
    class="search-panel"
    :class="{ 'search-panel--inline': inline }"
    :data-search-inline="inline ? '' : undefined"
    role="search"
  >
    <div class="search-input">
      <span aria-hidden="true">⌕</span>
      <input
        ref="inputEl"
        type="search"
        autocomplete="off"
        spellcheck="false"
        :value="query"
        :placeholder="s.placeholder"
        :aria-label="s.placeholder"
        @input="onInput"
        @keydown="onKeydown"
      />
      <kbd>Esc</kbd>
    </div>

    <div ref="bodyEl" class="search-body">
      <template v-if="loading">
        <div style="padding: 12px 20px">
          <Skeleton :rows="2" />
        </div>
      </template>
      <template v-else-if="error">
        <div class="search-empty">
          <div class="t">{{ s.unavailable }}</div>
          <div class="d">
            <a :href="archiveUrl" style="border-bottom: 1px solid var(--st-hair)">{{ s.goArchive }}</a>
          </div>
        </div>
      </template>
      <template v-else-if="showNoResult">
        <div class="search-empty">
          <div class="t">{{ s.none.replace('{q}', query) }}</div>
          <div class="d">{{ s.noneHint }}</div>
        </div>
      </template>
      <template v-else>
        <div v-for="group in groups" :key="group.label">
          <div class="search-group">{{ group.label }}</div>
          <button
            v-for="row in group.rows"
            :key="row.url + row.title"
            type="button"
            class="search-row"
            :class="{ on: rowIndex(row) === activeIndex }"
            @mousedown.prevent
            @click="go(row.url)"
            @mouseenter="activeIndex = rowIndex(row)"
          >
            <span v-if="row.hue !== undefined" class="seal seal-20" :style="{ '--h': row.hue }" aria-hidden="true">
              {{ row.title.slice(0, 1) }}
            </span>
            <span style="min-width: 0">
              <span class="t" v-html="highlight(row.title)" />
              <span v-if="row.sub" class="d">{{ row.sub }}</span>
              <span v-if="row.excerpt" class="d" v-html="row.excerpt" />
            </span>
          </button>
        </div>
      </template>
    </div>

    <div class="search-foot">
      <span>↑↓ {{ s.kbdUp }}</span>
      <span>↵ {{ s.kbdOpen }}</span>
      <span>Esc {{ s.kbdClose }}</span>
      <span class="spacer" />
      <span>{{ s.index }}</span>
    </div>
  </div>
</template>
