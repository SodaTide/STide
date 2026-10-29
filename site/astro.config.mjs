// STide · Astro 7 配置
// 口径来源：design/03 §10、design/05 P0/P1。
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';
import { unified } from '@astrojs/markdown-remark';
import { fileURLToPath } from 'node:url';

import { rehypeStide } from './src/lib/rehype-stide.mjs';
import contentMedia from './integrations/content-media.mjs';

const site = process.env.STIDE_SITE_URL || 'https://shimi.cc.cd';
const contentDir = fileURLToPath(new URL('../content', import.meta.url));

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [vue(), contentMedia({ contentDir })],
  security: {
    // Astro 7 的 CSP：自动为内联脚本/样式生成 hash，写进页面的 <meta>。
    // 因此 script-src 不需要 'unsafe-inline'；_headers 里不再重复一份 CSP。
    csp: {
      algorithm: 'SHA-256',
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self' https://cdn.jsdelivr.net",
        'frame-src https://giscus.app',
        "worker-src 'self' blob:",
        "connect-src 'self'",
        "object-src 'none'",
        "base-uri 'none'",
        "form-action 'self'",
      ],
      scriptDirective: {
        resources: ["'self'", "'wasm-unsafe-eval'"],
      },
      styleDirective: {
        resources: ["'self'", "'unsafe-inline'", 'https://cdn.jsdelivr.net'],
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: [
        { find: /^@\/(.*)$/, replacement: fileURLToPath(new URL('./src/$1', import.meta.url)) },
        // 顺序敏感：styles 前缀必须先匹配，否则会落到 mochi-ui.mjs/styles/…
        {
          find: /^mochi-ui\/styles\/(.*)$/,
          replacement: fileURLToPath(new URL('./vendor/mochi-ui/styles/$1', import.meta.url)),
        },
        // Mochi UI 1.4.4（vendor commit 3fce5a5）构建产物 vendor 进仓库；CI 不拉本地路径（03 §1、05 P1-23）
        { find: /^mochi-ui$/, replacement: fileURLToPath(new URL('./vendor/mochi-ui/mochi-ui.mjs', import.meta.url)) },
      ],
    },
  },
  markdown: {
    // Astro 7 默认 Sätteri；要控制 remark-rehype（禁原始 HTML）必须显式回到 unified。
    processor: unified({
      remarkRehype: { allowDangerousHtml: false },
      rehypePlugins: [rehypeStide],
    }),
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
      wrap: false,
    },
  },
});
