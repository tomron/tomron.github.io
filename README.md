# tomron.net

Personal site of Tom Ron — a static [Astro](https://astro.build) site, migrated
from WordPress, deployed to GitHub Pages at **https://tomron.net**.

## Development

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in ./dist
npm run preview  # serve the build locally
```

## Structure

| Path | What |
| --- | --- |
| `src/pages/index.astro` | Home / intro |
| `src/pages/blog/index.astro` | Blog archive (grouped by year) |
| `src/pages/[...slug].astro` | One page per post, at its original WordPress permalink (`/YYYY/MM/DD/slug/`) |
| `src/pages/[...redirect].astro` | Static redirect stubs for routes with no 1:1 equivalent (see `src/data/redirects.json`) |
| `src/pages/rss.xml.js` | RSS feed at `/rss.xml` |
| `src/pages/about.astro` | About page, body sourced from `src/data/about.html` |
| `src/content/blog/*.md` | Post content — WordPress HTML kept verbatim below the frontmatter |
| `src/content.config.ts` | Blog content-collection schema |
| `public/wp-content/uploads/` | Images pulled from the old WordPress install and self-hosted |

## URL preservation

Every published WordPress post keeps its exact permalink via the `permalink`
frontmatter field, which drives `getStaticPaths` in `src/pages/[...slug].astro`.
Routes that couldn't be preserved get a redirect entry in
`src/data/redirects.json`, rendered as `<meta refresh>` + canonical + JS stubs
(GitHub Pages has no server-side redirects):

- `/feed/`, `/comments/feed/` → `/rss.xml`
- the old Hebrew satire page's percent-encoded URL → `/`

## Re-running the migration

`scripts/migrate-wordpress.mjs` regenerates `src/content/blog/`,
`src/data/about.html`, `src/data/redirects.json`, and downloads referenced
images. It's idempotent — already-downloaded images are skipped.

```sh
node scripts/migrate-wordpress.mjs ~/Downloads/tomron.WordPress.2026-09-08.xml
```

## Deployment

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push
to `main`. The custom domain is set via `public/CNAME`. In the repo settings,
**Pages → Build and deployment → Source** must be set to **GitHub Actions**.
