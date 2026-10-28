/**
 * 按需加载的 Vue 岛（首次打开设置 / 搜索时才请求这个 chunk）。
 * 首屏 JS 预算留给导航与 ClientRouter，不预载 Vue 运行时与 Mochi 浮层。
 */
import { createApp, type App } from 'vue';
import SettingsDrawer from '@/components/islands/SettingsDrawer.vue';
import SearchOverlay from '@/components/islands/SearchOverlay.vue';
import SearchPanel from '@/components/islands/SearchPanel.vue';

export interface SettingsProps {
  locale: string;
  strings: Record<string, string>;
  page: string;
  siteHue: number;
  serverHue: number;
  pageWall: string;
  people: { id: string; name: string; hue: number }[];
  locales: { code: string; label: string }[];
  currentLocale: string;
  aboutHref: string;
}

export interface SearchProps {
  locale: string;
  strings: Record<string, string>;
  recent: { title: string; url: string; persona: string; date: string }[];
  people: { id: string; name: string; hue: number; signature: string; url: string }[];
  archiveCount: number;
  archiveUrl: string;
  peopleUrl: string;
  aboutUrl: string;
  rssUrl: string;
}

export interface IslandData {
  locale: string;
  settings: SettingsProps;
  search: SearchProps;
}

const cache = new Map<string, Promise<IslandData>>();

export function loadIslandData(locale: string): Promise<IslandData> {
  let pending = cache.get(locale);
  if (!pending) {
    pending = fetch(`/islands/${encodeURIComponent(locale)}.json`).then((res) => {
      if (!res.ok) throw new Error(`islands.json ${res.status}`);
      return res.json() as Promise<IslandData>;
    });
    cache.set(locale, pending);
  }
  return pending;
}

function mount(component: unknown, props: Record<string, unknown>, id: string, host?: HTMLElement): App {
  const target = host ?? document.createElement('div');
  if (!host) {
    target.id = id;
    document.body.appendChild(target);
  }
  const app = createApp(component as never, props);
  app.mount(target);
  return app;
}

export function mountSettings(props: SettingsProps): App {
  return mount(SettingsDrawer, props as unknown as Record<string, unknown>, 'stide-settings-island');
}

export function mountSearch(props: SearchProps): App {
  return mount(SearchOverlay, props as unknown as Record<string, unknown>, 'stide-search-island');
}

/** 搜索页：把静态空壳替换成可用的面板（不需要 Astro 的 client 指令，避免内联 shim） */
export function mountSearchPage(props: SearchProps, host: HTMLElement): App {
  return mount(
    SearchPanel,
    { ...props, open: true, inline: true } as unknown as Record<string, unknown>,
    'stide-search-page',
    host,
  );
}
