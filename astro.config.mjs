// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { EnumChangefreq } from 'sitemap';
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import redirects from './src/data/redirects.json' with { type: 'json' };

const redirectUrls = new Set(
  redirects.map((r) => new URL(r.from, 'https://tomron.net').toString()),
);

// Post permalink -> pubDate, so the sitemap can carry a real per-URL lastmod
// instead of the build date. Frontmatter is parsed with regexes because the
// content collection is not available at config load time.
const blogDir = fileURLToPath(new URL('./src/content/blog', import.meta.url));
const postLastmod = new Map();
for (const f of readdirSync(blogDir)) {
  if (!f.endsWith('.md')) continue;
  const src = readFileSync(join(blogDir, f), 'utf8');
  const permalink = src.match(/^permalink:\s*["']?([^"'\n]+?)["']?\s*$/m)?.[1];
  const pubDate = src.match(/^pubDate:\s*([^\n]+)$/m)?.[1]?.trim();
  if (permalink && pubDate) {
    postLastmod.set(
      new URL(permalink, 'https://tomron.net').toString(),
      new Date(pubDate),
    );
  }
}

// https://astro.build/config
export default defineConfig({
  site: 'https://tomron.net',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [
    sitemap({
      filter: (page) =>
        !redirectUrls.has(page) &&
        !page.endsWith('/404/') &&
        !page.includes('/og/') &&
        // Thin tag archives: keep them out of the sitemap so crawl budget
        // goes to real posts.
        !page.includes('/tags/'),
      changefreq: EnumChangefreq.WEEKLY,
      lastmod: new Date(),
      serialize(item) {
        // Home and blog index change most often; deep posts are static.
        if (item.url === 'https://tomron.net/') {
          item.changefreq = EnumChangefreq.DAILY;
          item.priority = 1;
        } else if (/\/blog\/?/.test(item.url)) {
          item.changefreq = EnumChangefreq.WEEKLY;
          item.priority = 0.7;
        } else {
          item.changefreq = EnumChangefreq.YEARLY;
          item.priority = 0.6;
        }
        const published = postLastmod.get(item.url);
        if (published) item.lastmod = published;
        return item;
      },
    }),
  ],
});
