// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { EnumChangefreq } from 'sitemap';
import redirects from './src/data/redirects.json' with { type: 'json' };

const redirectUrls = new Set(
  redirects.map((r) => new URL(r.from, 'https://tomron.net').toString()),
);

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
        !page.includes('/og/'),
      changefreq: EnumChangefreq.WEEKLY,
      lastmod: new Date(),
      serialize(item) {
        // Home and blog index change most often; deep posts are static.
        if (item.url === 'https://tomron.net/') {
          item.changefreq = EnumChangefreq.DAILY;
          item.priority = 1;
        } else if (/\/blog\/?/.test(item.url) || /\/tags\/?/.test(item.url)) {
          item.changefreq = EnumChangefreq.WEEKLY;
          item.priority = 0.7;
        } else {
          item.changefreq = EnumChangefreq.YEARLY;
          item.priority = 0.6;
        }
        return item;
      },
    }),
  ],
});
