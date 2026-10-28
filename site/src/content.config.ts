import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * 内容真理在仓库根的 `content/`（design/03 §4）。
 * 这里只声明 schema 与 loader；深校验（媒体存在、预算、trailer）在
 * scripts/check-content.mjs 里做，构建前跑。
 *
 * glob loader 的 base 要 file: URL：Windows 绝对路径会被当成带盘符的 URL。
 */
const contentRoot = new URL('../../content/', import.meta.url);

export const postSchema = z
  .object({
    id: z.string().regex(/^[0-9A-HJKMNP-TV-Z]{26}$/, 'id 必须是 ULID'),
    persona: z.string().min(1),
    variant: z.string().min(1).optional(),
    title: z.string().min(1).max(60).optional(),
    date: z.coerce.date(),
    lang: z.string().min(2),
    kind: z.enum(['note', 'story', 'photo', 'link']).optional(),
    summary: z.string().min(1).max(200).optional(),
    media: z
      .array(
        z
          .object({
            src: z.string().min(1),
            alt: z.string().min(1, '图片必须有 alt'),
            width: z.number().int().positive().optional(),
            height: z.number().int().positive().optional(),
            caption: z.string().min(1).max(40).optional(),
          })
          .strict(),
      )
      .max(9)
      .default([]),
    link: z
      .object({
        url: z.string().url(),
        title: z.string().min(1).optional(),
        site: z.string().min(1).optional(),
      })
      .strict()
      .nullable()
      .optional(),
    source: z
      .object({
        instance: z.string().min(1),
        session_hash: z.string().min(1),
        group_alias: z.string().min(1),
      })
      .strict()
      .optional(),
    generated: z
      .object({
        model: z.string().min(1).optional(),
        at: z.coerce.date().optional(),
      })
      .strict()
      .optional(),
    visibility: z.enum(['public', 'unlisted', 'hidden']).default('public'),
    pinned: z.boolean().default(false),
  })
  // strict：frontmatter 不接受 tags，也不接受拼错的字段（05 P0-7）
  .strict();

export const personSchema = z
  .object({
    id: z.string().regex(/^[a-z][a-z0-9_]*$/),
    name: z.string().min(1).max(40),
    lang: z.string().min(2),
    hue: z.number().int().min(0).max(360),
    avatar: z.string().min(1).optional(),
    signature: z.string().min(1).max(80),
    bio: z.string().min(1),
    first_seen: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    status: z.enum(['active', 'retired']),
    links: z.array(z.object({ label: z.string(), url: z.string().url() }).strict()).optional(),
  })
  .strict();

export const collections = {
  posts: defineCollection({
    loader: glob({ base: new URL('posts', contentRoot).href, pattern: '**/*.md' }),
    schema: postSchema,
  }),
  people: defineCollection({
    loader: glob({ base: new URL('people', contentRoot).href, pattern: '*.json' }),
    schema: personSchema,
  }),
};
