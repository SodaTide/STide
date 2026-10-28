import type { APIContext } from 'astro';
import { loadSiteData } from '@/lib/content';
import { siteConfig } from '../../site.config';

/** 构建状态（03 §14）：`stide status` 用它回答「刚发的那篇上线了没」 */
export async function GET(_context: APIContext) {
  const data = await loadSiteData();
  const commit = process.env.GITHUB_SHA ?? process.env.STIDE_COMMIT ?? '';
  const payload = {
    site: siteConfig.url,
    built_at: new Date().toISOString(),
    last_commit: commit,
    posts: data.publicPosts.length,
    drafts: data.allPosts.length - data.publicPosts.length,
    people: data.people.length,
    latest_post: data.publicPosts[0]
      ? {
          url: `/p/${data.publicPosts[0].id.split('/').pop()}/`,
          date: data.publicPosts[0].data.date.toISOString(),
          persona: data.publicPosts[0].data.persona,
        }
      : null,
  };
  return new Response(JSON.stringify(payload, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'public, max-age=60' },
  });
}
