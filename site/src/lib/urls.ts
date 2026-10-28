import { siteConfig, type LocaleCode } from '../../site.config';

export type ShellPage = 'home' | 'archive' | 'people' | 'about' | 'search';

const PATHS: Record<ShellPage, string> = {
  home: '/',
  archive: '/archive/',
  people: '/people/',
  about: '/about/',
  search: '/search/',
};

export function shellPath(page: ShellPage): string {
  return PATHS[page];
}

/** 壳页本地化：默认语言不带前缀（prefixDefaultLocale: false） */
export function localePath(locale: string, page: ShellPage = 'home'): string {
  const base = PATHS[page];
  if (locale === siteConfig.defaultLocale) return base;
  return base === '/' ? `/${locale}/` : `/${locale}${base}`;
}

/** 从当前 pathname 判断壳页类型（用于语言切换时留在同类页面） */
export function shellPageFromPath(pathname: string): ShellPage {
  const rest = pathname.replace(/^\/(?:zh-TW|en|ja|ru|ko)(?=\/|$)/, '') || '/';
  if (rest.startsWith('/archive')) return 'archive';
  if (rest.startsWith('/people')) return 'people';
  if (rest.startsWith('/about')) return 'about';
  if (rest.startsWith('/search')) return 'search';
  return 'home';
}

export function absoluteUrl(path: string): string {
  return new URL(path, siteConfig.url).href;
}

/** hreflang 只在壳页之间互指（02 §1、§15） */
export function alternatesFor(page: ShellPage): { hreflang: string; href: string }[] {
  const list = siteConfig.locales.map((locale) => ({
    hreflang: locale.code,
    href: absoluteUrl(localePath(locale.code, page)),
  }));
  list.push({ hreflang: 'x-default', href: absoluteUrl(localePath(siteConfig.defaultLocale, page)) });
  return list;
}

export function localeHtmlLang(locale: LocaleCode): string {
  return siteConfig.locales.find((l) => l.code === locale)?.htmlLang ?? 'zh-CN';
}

export function isShellLocale(value: string | undefined): value is LocaleCode {
  return !!value && siteConfig.locales.some((l) => l.code === value);
}

export function localizedNavHref(locale: LocaleCode, page: ShellPage): string {
  return localePath(locale, page);
}
