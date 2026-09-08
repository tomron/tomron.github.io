// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
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
      filter: (page) => !redirectUrls.has(page) && !page.endsWith('/404/'),
    }),
  ],
});
