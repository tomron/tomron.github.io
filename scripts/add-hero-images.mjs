// One-off: add heroImage frontmatter to posts that had a WordPress featured
// image (postmeta _thumbnail_id). Downloads each into public/wp-content/uploads.
//   node scripts/add-hero-images.mjs

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { XMLParser } from 'fast-xml-parser';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const XML_PATH =
  process.argv[2] || join(process.env.HOME, 'Downloads/tomron.WordPress.2026-09-08.xml');
const BLOG_DIR = join(ROOT, 'src/content/blog');
const UPLOADS_DIR = join(ROOT, 'public/wp-content/uploads');

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  cdataPropName: '__cdata',
  trimValues: false,
});
const channel = parser.parse(readFileSync(XML_PATH, 'utf8')).rss.channel;
const items = Array.isArray(channel.item) ? channel.item : [channel.item];

const text = (v) => {
  if (v == null) return '';
  if (typeof v === 'string') return v;
  if (typeof v === 'number') return String(v);
  if (v.__cdata != null) return String(v.__cdata);
  if (v['#text'] != null) return String(v['#text']);
  return '';
};
const asArray = (v) => (v == null ? [] : Array.isArray(v) ? v : [v]);

// attachment id -> url
const att = new Map();
for (const it of items) {
  if (text(it['wp:post_type']) !== 'attachment') continue;
  att.set(text(it['wp:post_id']), text(it['wp:attachment_url']));
}

async function fetchImage(remoteUrl, relPath) {
  const dest = join(UPLOADS_DIR, relPath);
  const siteAbs = '/wp-content/uploads/' + relPath;
  if (existsSync(dest)) return siteAbs;
  const res = await fetch(remoteUrl);
  if (!res.ok) throw new Error(`${remoteUrl} -> HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, buf);
  console.log(`  downloaded ${relPath} (${buf.length}b)`);
  return siteAbs;
}

// route path (/2026/08/29/slug) -> blog md filename
function fileForRoute(link) {
  const m = new URL(link).pathname.match(/^\/(\d{4})\/(\d{2})\/(\d{2})\/(.+?)\/?$/);
  if (!m) return null;
  return `${m[1]}-${m[2]}-${m[3]}-${decodeURIComponent(m[4])}.md`;
}

let updated = 0;
for (const it of items) {
  if (text(it['wp:post_type']) !== 'post') continue;
  if (text(it['wp:status']) !== 'publish') continue;

  let thumbId = '';
  for (const pm of asArray(it['wp:postmeta'])) {
    if (text(pm['wp:meta_key']) === '_thumbnail_id') thumbId = text(pm['wp:meta_value']);
  }
  if (!thumbId) continue;

  const attUrl = att.get(thumbId);
  if (!attUrl || !/\/wp-content\/uploads\//.test(attUrl)) {
    console.warn(`! ${text(it.title)}: thumbnail ${thumbId} not resolvable`);
    continue;
  }

  const fname = fileForRoute(text(it.link));
  const path = fname && join(BLOG_DIR, fname);
  if (!path || !existsSync(path)) {
    console.warn(`! ${text(it.title)}: no md file (${fname})`);
    continue;
  }

  const relPath = attUrl
    .replace(/https?:\/\/tomron(?:dotnet\.wordpress\.com|\.net)\/wp-content\/uploads\//, '')
    .split(/[?#]/)[0];
  const heroImage = await fetchImage(attUrl, relPath);

  const src = readFileSync(path, 'utf8');
  if (/^heroImage:/m.test(src)) {
    console.log(`  = ${fname} already has heroImage`);
    continue;
  }
  // insert heroImage right after the permalink line
  const out = src.replace(
    /^(permalink: .*\n)/m,
    `$1heroImage: "${heroImage}"\n`,
  );
  if (out === src) {
    console.warn(`! ${fname}: could not find permalink line to anchor heroImage`);
    continue;
  }
  writeFileSync(path, out, 'utf8');
  console.log(`  + ${fname}  heroImage=${heroImage}`);
  updated++;
}

console.log(`\n${updated} posts updated`);
