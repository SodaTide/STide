import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { excerptOf, loadSiteData, postHref } from '@/lib/content';
import { siteConfig } from '../../site.config';

export async function GET(context: APIContext) {
  const data = await loadSiteData();
  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site ?? siteConfig.url,
    items: data.publicPosts.map((post) => ({
      title: post.data.title ?? excerptOf(post, 40),
      pubDate: post.data.date,
      description: excerptOf(post, 220),
      link: postHref(post),
      customData: `<dc:creator>${data.peopleById.get(post.data.persona)?.data.name ?? ''}</dc:creator>`,
    })),
    xmlns: { dc: 'http://purl.org/dc/elements/1.1/' },
    customData: `<language>zh-cn</language><lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
  });
}
