// One-shot WordPress -> Astro content migration.
// Reads the WP XML export, writes:
//   src/content/blog/<year>-<month>-<day>-<slug>.md   (HTML body kept verbatim in ---body---)
//   public/wp-content/uploads/...                      (downloaded, self-hosted images)
//   src/data/redirects.json                            (routes that can't be preserved 1:1)
//
// Run: node scripts/migrate-wordpress.mjs ~/Downloads/tomron.WordPress.2026-09-08.xml

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { XMLParser } from 'fast-xml-parser';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const XML_PATH = process.argv[2] || join(process.env.HOME, 'Downloads/tomron.WordPress.2026-09-08.xml');

const BLOG_DIR = join(ROOT, 'src/content/blog');
const UPLOADS_DIR = join(ROOT, 'public/wp-content/uploads');
const DATA_DIR = join(ROOT, 'src/data');

const xml = readFileSync(XML_PATH, 'utf8');
const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  cdataPropName: '__cdata',
  trimValues: false,
});
const doc = parser.parse(xml);
const channel = doc.rss.channel;
const items = Array.isArray(channel.item) ? channel.item : [channel.item];

// --- helpers ---------------------------------------------------------------
const text = (v) => {
  if (v == null) return '';
  if (typeof v === 'string') return v;
  if (typeof v === 'number') return String(v);
  if (v.__cdata != null) return String(v.__cdata);
  if (v['#text'] != null) return String(v['#text']);
  return '';
};
const asArray = (v) => (v == null ? [] : Array.isArray(v) ? v : [v]);

function decodeEntities(s) {
  return String(s)
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0*39;|&#x0*27;|&apos;/gi, "'")
    .replace(/&#8217;|&#x2019;/gi, '’')
    .replace(/&#8216;|&#x2018;/gi, '‘')
    .replace(/&#8220;|&#x201[cC];/g, '“')
    .replace(/&#8221;|&#x201[dD];/g, '”')
    .replace(/&#8211;|&#x2013;/gi, '–')
    .replace(/&#8212;|&#x2014;/gi, '—')
    .replace(/&hellip;|&#8230;/g, '…')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#0*(\d+);/g, (_, n) => String.fromCodePoint(+n))
    .replace(/&#x0*([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)));
}

function yamlEscape(s) {
  return '"' + String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
}

// path portion of a WP <link>, decoded, without leading/trailing slash
function routeOf(link) {
  try {
    const u = new URL(link);
    return decodeURIComponent(u.pathname).replace(/^\/+|\/+$/g, '');
  } catch {
    return link.replace(/^https?:\/\/[^/]+\//, '').replace(/^\/+|\/+$/g, '');
  }
}

// --- image download ------------------------------------------------------
const UPLOAD_RE = /https?:\/\/tomron(?:dotnet\.wordpress\.com|\.net)\/wp-content\/uploads\/([^\s"'?)]+)/g;
const downloaded = new Map(); // remoteUrl -> localPath (site-absolute)

async function fetchImage(remoteUrl, relPath) {
  const dest = join(UPLOADS_DIR, relPath);
  const siteAbs = '/wp-content/uploads/' + relPath;
  if (downloaded.has(remoteUrl)) return downloaded.get(remoteUrl);
  if (existsSync(dest)) {
    downloaded.set(remoteUrl, siteAbs);
    return siteAbs;
  }
  try {
    const res = await fetch(remoteUrl);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const buf = Buffer.from(await res.arrayBuffer());
    mkdirSync(dirname(dest), { recursive: true });
    writeFileSync(dest, buf);
    console.log('  img', relPath, `(${buf.length}b)`);
    downloaded.set(remoteUrl, siteAbs);
    return siteAbs;
  } catch (e) {
    console.warn('  !! failed', remoteUrl, e.message);
    downloaded.set(remoteUrl, remoteUrl); // leave original
    return remoteUrl;
  }
}

async function localizeImages(html) {
  const urls = new Set();
  let m;
  UPLOAD_RE.lastIndex = 0;
  while ((m = UPLOAD_RE.exec(html))) urls.add(m[0]);
  for (const url of urls) {
    const relPath = url.replace(/https?:\/\/tomron(?:dotnet\.wordpress\.com|\.net)\/wp-content\/uploads\//, '')
      .split(/[?#]/)[0];
    const local = await fetchImage(url, relPath);
    // replace the URL and any ?w= / ?resize= query variants pointing at same file
    const esc = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    html = html.replace(new RegExp(esc + '(\\?[^\\s"\')]*)?', 'g'), local);
  }
  return html;
}

// --- build maps ----------------------------------------------------------
mkdirSync(BLOG_DIR, { recursive: true });
mkdirSync(DATA_DIR, { recursive: true });

// Routes WordPress served that have no 1:1 equivalent on the static site.
const redirects = [
  { from: '/feed/', to: '/rss.xml' },
  { from: '/comments/feed/', to: '/rss.xml' },
];
let publishedCount = 0;
let draftCount = 0;

for (const it of items) {
  const type = text(it['wp:post_type']);
  const status = text(it['wp:status']);
  if (type !== 'post' && type !== 'page') continue;

  const title = decodeEntities(text(it.title).trim());
  const link = text(it.link);
  const route = routeOf(link);
  const rawDate = text(it['wp:post_date']) || text(it.pubDate);
  const dateISO = (() => {
    const d = new Date(rawDate.replace(' ', 'T') + (rawDate.includes('T') ? '' : 'Z'));
    return isNaN(d) ? new Date().toISOString() : d.toISOString();
  })();
  let body = text(it['content:encoded']);

  // categories & tags
  const cats = asArray(it.category);
  const tags = cats
    .filter((c) => c && c['@_domain'] === 'post_tag')
    .map((c) => text(c['#text'] || c).trim())
    .filter(Boolean);

  // --- PAGE handling ---
  if (type === 'page') {
    if (route === 'about') {
      body = await localizeImages(body);
      writeFileSync(
        join(ROOT, 'src/data/about.html'),
        body.trim() + '\n',
        'utf8',
      );
      console.log('page  about -> src/data/about.html');
    } else {
      // Hebrew satire page: dropped per decision, 301 -> home
      redirects.push({ from: '/' + route + '/', to: '/' });
      console.log('page  dropped, 301:', '/' + route + '/');
    }
    continue;
  }

  // --- POST handling ---
  if (status !== 'publish' && status !== 'draft') continue;
  const isDraft = status === 'draft';

  // slug + expected route
  let slug = text(it['wp:post_name']).trim();
  const mDate = route.match(/^(\d{4})\/(\d{2})\/(\d{2})\/(.+)$/);
  let y, mo, d;
  if (mDate) {
    [, y, mo, d, slug] = mDate;
    slug = decodeURIComponent(slug);
  } else {
    const dd = new Date(dateISO);
    y = String(dd.getUTCFullYear());
    mo = String(dd.getUTCMonth() + 1).padStart(2, '0');
    d = String(dd.getUTCDate()).padStart(2, '0');
    if (!slug) slug = title.toLowerCase().replace(/[^\w]+/g, '-').replace(/^-|-$/g, '') || 'post';
  }

  body = await localizeImages(body);

  const fm = [
    '---',
    `title: ${yamlEscape(title || 'Untitled')}`,
    `pubDate: ${dateISO}`,
    `permalink: ${yamlEscape('/' + y + '/' + mo + '/' + d + '/' + slug + '/')}`,
    tags.length ? `tags:\n${tags.map((t) => '  - ' + yamlEscape(t)).join('\n')}` : 'tags: []',
    `draft: ${isDraft}`,
    '---',
    '',
  ].join('\n');

  const fname = `${y}-${mo}-${d}-${slug}.md`.replace(/[\/]/g, '-');
  writeFileSync(join(BLOG_DIR, fname), fm + body.trim() + '\n', 'utf8');
  if (isDraft) draftCount++;
  else publishedCount++;
}

writeFileSync(
  join(DATA_DIR, 'redirects.json'),
  JSON.stringify(redirects, null, 2) + '\n',
  'utf8',
);

console.log('\n---');
console.log('published posts:', publishedCount);
console.log('draft posts    :', draftCount);
console.log('redirects      :', redirects.length);
console.log('images fetched :', [...downloaded.values()].filter((v) => v.startsWith('/')).length);
