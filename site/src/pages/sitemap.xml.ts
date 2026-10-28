import type { APIContext } from 'astro';
import { loadSiteData, postHref } from '@/lib/content';
import { localePath } from '@/lib/urls';
import { siteConfig } from '../../site.config';

function url(loc: string, lastmod?: Date): string {
  const absolute = new URL(loc, siteConfig.url).href;
  return `<url><loc>${absolute}</loc>${lastmod ? `<lastmod>${lastmod.toISOString()}</lastmod>` : ''}</url>`;
}

export async function GET(_context: APIContext) {
  const data = await loadSiteData();
  const entries: string[] = [];

  // 壳页（含六语）与静态页
  for (const locale of siteConfig.locales) {
    for (const page of ['home', 'archive', 'people', 'about', 'search'] as const) {
      entries.push(url(localePath(locale.code, page)));
    }
  }

  // 公开文章与人格页
  for (const post of data.publicPosts) entries.push(url(postHref(post), post.data.date));
  for (const person of data.people) entries.push(url(`/people/${person.data.id}/`));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
