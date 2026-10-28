import type { APIContext } from 'astro';
import { loadSiteData } from '@/lib/content';

/**
 * 给 AstrBot 插件读取的轻量注册表（P1-16）。
 * 只含公开字段；插件 10 分钟缓存一次，失败时用上次缓存。
 */
export async function GET(_context: APIContext) {
  const data = await loadSiteData();
  const payload = {
    generated_at: new Date().toISOString(),
    version: 1,
    people: data.people.map((person) => ({
      id: person.data.id,
      name: person.data.name,
      hue: person.data.hue,
      lang: person.data.lang,
      status: person.data.status,
      first_seen: person.data.first_seen,
    })),
  };
  return new Response(JSON.stringify(payload, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'public, max-age=600' },
  });
}
