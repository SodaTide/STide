import { getCollection, type CollectionEntry } from 'astro:content';
import { siteConfig } from '../../site.config';

export type Post = CollectionEntry<'posts'>;
export type Person = CollectionEntry<'people'>;
export type PersonData = Person['data'];
export type Kind = 'note' | 'story' | 'photo' | 'link';
export type SiteData = Awaited<ReturnType<typeof buildSiteData>>;

export const SITE_TZ = 'Asia/Shanghai';

/** +08:00 固定时区下取年月日（站点所有者时区；无 DST） */
export function dateParts(date: Date): { year: number; month: number; day: number; hour: number; minute: number } {
  const shifted = new Date(date.getTime() + 8 * 3600_000);
  return {
    year: shifted.getUTCFullYear(),
    month: shifted.getUTCMonth() + 1,
    day: shifted.getUTCDate(),
    hour: shifted.getUTCHours(),
    minute: shifted.getUTCMinutes(),
  };
}

export function dayKey(date: Date): string {
  const p = dateParts(date);
  return `${p.year}-${String(p.month).padStart(2, '0')}-${String(p.day).padStart(2, '0')}`;
}

export function slugOf(post: Post): string {
  return post.id.split('/').pop() ?? post.id;
}

export function kindOf(post: Post): Kind {
  if (post.data.kind) return post.data.kind;
  if (post.data.link?.url) return 'link';
  if ((post.data.media?.length ?? 0) > 0 && !post.data.title) return 'photo';
  if (post.data.title) return 'story';
  return 'note';
}

export function visibilityOf(post: Post): 'public' | 'unlisted' | 'hidden' {
  return post.data.visibility ?? 'public';
}

/** 列表 / RSS / sitemap / Pagefind 只收 public（03 §4.4） */
export function isListed(post: Post): boolean {
  return visibilityOf(post) === 'public';
}

export function charCount(text: string): number {
  return [...text.replace(/\s+/g, '')].length;
}

export function plainText(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^>\s?/gm, '')
    .replace(/[*_~`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function excerptOf(post: Post, max = 160): string {
  if (post.data.summary) return post.data.summary;
  const text = plainText(post.body ?? '');
  return text.length > max ? `${text.slice(0, max)}…` : text;
}

/** frontmatter 里的 media/… 与 people/… 都是 content/ 相对路径 */
export function assetUrl(src: string): string {
  return src.startsWith('/') ? src : `/${src}`;
}

export function avatarUrl(person: PersonData): string | null {
  return person.avatar ? assetUrl(person.avatar) : null;
}

export function hueStyle(hue: number): string {
  return `--mc-h:${hue};--mc-h2:${hue};--mc-h3:${hue + 326};`;
}

function byDateDesc(a: Post, b: Post): number {
  return b.data.date.getTime() - a.data.date.getTime();
}

async function buildSiteData() {
  const [allPosts, people] = await Promise.all([getCollection('posts'), getCollection('people')]);

  const peopleById = new Map(people.map((p) => [p.data.id, p]));
  const sortedPeople = [...people].sort((a, b) => {
    if (a.data.status !== b.data.status) return a.data.status === 'active' ? -1 : 1;
    return a.data.first_seen.localeCompare(b.data.first_seen);
  });

  const posts = [...allPosts].sort(byDateDesc);
  const publicPosts = posts.filter(isListed);

  const postsByPersona = new Map<string, Post[]>();
  const countByPersona = new Map<string, number>();
  const lastByPersona = new Map<string, Date>();
  for (const post of publicPosts) {
    const id = post.data.persona;
    countByPersona.set(id, (countByPersona.get(id) ?? 0) + 1);
    if (!lastByPersona.has(id)) lastByPersona.set(id, post.data.date);
    const list = postsByPersona.get(id) ?? [];
    list.push(post);
    postsByPersona.set(id, list);
  }

  const now = new Date();
  const nowParts = dateParts(now);
  const monthKey = `${nowParts.year}-${String(nowParts.month).padStart(2, '0')}`;
  const monthCountByPersona = new Map<string, number>();
  for (const post of publicPosts) {
    const p = dateParts(post.data.date);
    if (`${p.year}-${String(p.month).padStart(2, '0')}` !== monthKey) continue;
    monthCountByPersona.set(post.data.persona, (monthCountByPersona.get(post.data.persona) ?? 0) + 1);
  }

  const lead =
    publicPosts.find((p) => p.data.pinned) ??
    publicPosts.find((p) => kindOf(p) === 'story' || kindOf(p) === 'photo') ??
    publicPosts[0] ??
    null;

  const streams = publicPosts.filter((p) => p !== lead);

  return {
    allPosts: posts,
    publicPosts,
    people,
    peopleById,
    sortedPeople,
    postsByPersona,
    countByPersona,
    lastByPersona,
    monthKey,
    monthCountByPersona,
    lead,
    streams,
    latestDate: publicPosts[0]?.data.date ?? now,
  };
}

let cached: Promise<SiteData> | null = null;

/** 一次构建内只加载一次（页面并行渲染时共享） */
export function loadSiteData(): Promise<SiteData> {
  cached ??= buildSiteData();
  return cached;
}

export async function getPersonaMap(): Promise<Map<string, Person>> {
  const { people } = await loadSiteData();
  return new Map(people.map((p) => [p.data.id, p]));
}

/** 文章页：public + unlisted 可直达；hidden 不生成路由（03 §4.4） */
export async function getReachablePosts(): Promise<Post[]> {
  const { allPosts } = await loadSiteData();
  return allPosts.filter((p) => visibilityOf(p) !== 'hidden');
}

export function postHref(post: Post): string {
  return `/p/${slugOf(post)}/`;
}

export function personHref(person: PersonData): string {
  return `/people/${person.id}/`;
}

export function relativeTime(date: Date, locale: string, now = new Date()): string {
  const diff = now.getTime() - date.getTime();
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  const minutes = Math.round(-diff / 60_000);
  if (Math.abs(minutes) < 60) return rtf.format(minutes, 'minute');
  const hours = Math.round(minutes / 60);
  if (Math.abs(hours) < 24) return rtf.format(hours, 'hour');
  const days = Math.round(hours / 24);
  return rtf.format(days, 'day');
}

export const wallpaperFor = (page: keyof typeof siteConfig.wallpaper) => siteConfig.wallpaper[page];
