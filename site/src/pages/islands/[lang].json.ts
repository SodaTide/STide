import type { APIContext } from 'astro';
import { loadSiteData } from '@/lib/content';
import { searchIslandProps, settingsIslandProps } from '@/lib/island-data';
import { siteConfig } from '../../../site.config';

/**
 * 按需岛的文案与数据（首次打开设置/搜索时取一次）。
 * 页面首屏不内联这段 JSON，避免 CSP 与 HTML 体积问题。
 */
export async function getStaticPaths() {
  return siteConfig.locales.map((locale) => ({ params: { lang: locale.code } }));
}

export async function GET({ params }: APIContext) {
  const locale = params.lang ?? siteConfig.defaultLocale;
  const data = await loadSiteData();
  const settings = settingsIslandProps(locale, 'home', siteConfig.defaultHue, data, 'banner');
  const search = searchIslandProps(locale, data);
  return new Response(JSON.stringify({ locale, settings, search }), {
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'public, max-age=300' },
  });
}
