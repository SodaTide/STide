/**
 * 全站外壳脚本（构建后是外部模块，不是内联脚本）
 *
 * - 明暗切换（左轨）
 * - 按需挂载设置抽屉 / 搜索浮层（首屏不加载 Vue 与 Mochi 浮层）
 * - 路由切换后的焦点与标题播报（ClientRouter）
 */
import { currentPrefs, savePrefs, resolvedColorMode } from '@/lib/prefs-types';
import type { App } from 'vue';
import type { IslandData, SearchProps, SettingsProps } from '@/client/islands';

declare global {
  interface Window {
    __stideChrome?: boolean;
  }
}

if (typeof window !== 'undefined' && !window.__stideChrome) {
  window.__stideChrome = true;

  let settingsApp: App | null = null;
  let searchApp: App | null = null;
  let searchPageApp: App | null = null;
  let dataCache: { locale: string; promise: Promise<IslandData> } | null = null;
  let opening = false;

  const uiLocale = () => document.documentElement.dataset.stLocale || 'zh-CN';

  function loadData(locale: string): Promise<IslandData> {
    if (dataCache?.locale === locale) return dataCache.promise;
    const promise = import('@/client/islands').then((mod) => mod.loadIslandData(locale));
    dataCache = { locale, promise };
    return promise;
  }

  function liveSettingsProps(data: IslandData): SettingsProps {
    const html = document.documentElement;
    return {
      ...data.settings,
      locale: data.locale,
      currentLocale: data.locale,
      page: html.dataset.stPage ?? 'home',
      siteHue: Number(html.dataset.stSiteHue ?? 202),
      serverHue: Number(html.dataset.stHue ?? 202),
      pageWall: html.dataset.stWall ?? 'solid',
    };
  }

  function liveSearchProps(data: IslandData): SearchProps {
    return { ...data.search, locale: data.locale };
  }

  async function openSettings() {
    if (settingsApp) {
      document.dispatchEvent(new Event('stide:open-settings'));
      return;
    }
    if (opening) return;
    opening = true;
    try {
      const [mod, data] = await Promise.all([import('@/client/islands'), loadData(uiLocale())]);
      settingsApp = mod.mountSettings(liveSettingsProps(data));
      requestAnimationFrame(() => document.dispatchEvent(new Event('stide:open-settings')));
    } catch (error) {
      console.warn('[stide] 设置加载失败', error);
    } finally {
      opening = false;
    }
  }

  async function mountSearchPageIfNeeded() {
    const host = document.querySelector<HTMLElement>('[data-search-page-host]');
    if (!host || searchPageApp) return;
    try {
      const [mod, data] = await Promise.all([import('@/client/islands'), loadData(uiLocale())]);
      searchPageApp = mod.mountSearchPage(liveSearchProps(data), host);
    } catch (error) {
      console.warn('[stide] 搜索页加载失败', error);
    }
  }

  async function openSearch() {
    const pageHost = document.querySelector<HTMLElement>('[data-search-page-host]');
    if (pageHost) {
      await mountSearchPageIfNeeded();
      pageHost.querySelector<HTMLInputElement>('input')?.focus();
      pageHost.scrollIntoView({ block: 'center', behavior: 'smooth' });
      return;
    }
    if (searchApp) {
      document.dispatchEvent(new Event('stide:open-search'));
      return;
    }
    if (opening) return;
    opening = true;
    try {
      const [mod, data] = await Promise.all([import('@/client/islands'), loadData(uiLocale())]);
      searchApp = mod.mountSearch(liveSearchProps(data));
      requestAnimationFrame(() => document.dispatchEvent(new Event('stide:open-search')));
    } catch (error) {
      console.warn('[stide] 搜索加载失败', error);
    } finally {
      opening = false;
    }
  }

  function isTyping(target: EventTarget | null): boolean {
    const el = target as HTMLElement | null;
    if (!el) return false;
    const tag = el.tagName;
    return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable;
  }

  document.addEventListener('click', (event) => {
    const target = event.target as Element | null;
    if (!target) return;

    const theme = target.closest<HTMLElement>('[data-st-theme-toggle]');
    if (theme) {
      event.preventDefault();
      const prefs = currentPrefs();
      const next = resolvedColorMode(prefs.colorMode) === 'dark' ? 'light' : 'dark';
      savePrefs({ colorMode: next });
      theme.setAttribute('aria-pressed', String(next === 'dark'));
      return;
    }

    if (target.closest('[data-st-open-settings]')) {
      event.preventDefault();
      void openSettings();
      return;
    }

    if (target.closest('[data-st-open-search]')) {
      event.preventDefault();
      void openSearch();
    }
  });

  document.addEventListener('keydown', (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      void openSearch();
      return;
    }
    if (event.key === '/' && !isTyping(event.target)) {
      event.preventDefault();
      void openSearch();
    }
  });

  document.addEventListener('astro:before-swap', () => {
    settingsApp?.unmount();
    searchApp?.unmount();
    searchPageApp?.unmount();
    settingsApp = null;
    searchApp = null;
    searchPageApp = null;
    document.getElementById('stide-settings-island')?.remove();
    document.getElementById('stide-search-island')?.remove();
  });

  document.addEventListener('astro:page-load', () => {
    void mountSearchPageIfNeeded();
  });

  void mountSearchPageIfNeeded();

  const announce = (text: string) => {
    let node = document.getElementById('stide-announcer');
    if (!node) {
      node = document.createElement('div');
      node.id = 'stide-announcer';
      node.setAttribute('role', 'status');
      node.setAttribute('aria-live', 'polite');
      node.style.cssText =
        'position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0';
      document.body.appendChild(node);
    }
    node.textContent = text;
  };

  let navigated = false;
  document.addEventListener('astro:before-swap', () => {
    navigated = true;
  });
  document.addEventListener('astro:after-swap', () => {
    if (!navigated) return;
    navigated = false;
    requestAnimationFrame(() => {
      const main = document.getElementById('content');
      if (main) main.focus({ preventScroll: true });
      announce(document.title);
    });
  });
}
