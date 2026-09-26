// Flip draft: true -> draft: false for posts whose pubDate has arrived.
// Run daily by .github/workflows/publish-due-drafts.yml, which opens a PR
// with whatever this script changes.
//   node scripts/publish-due-drafts.mjs

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BLOG_DIR = join(ROOT, 'src/content/blog');

const today = new Date();
today.setUTCHours(0, 0, 0, 0);

const published = [];

for (const file of readdirSync(BLOG_DIR)) {
  if (!file.endsWith('.md')) continue;

  const path = join(BLOG_DIR, file);
  const content = readFileSync(path, 'utf8');

  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) continue;
  const frontmatter = frontmatterMatch[1];

  if (!/^draft:\s*true\s*$/m.test(frontmatter)) continue;

  const pubDateMatch = frontmatter.match(/^pubDate:\s*(.+)$/m);
  if (!pubDateMatch) continue;

  const pubDate = new Date(pubDateMatch[1].trim());
  if (Number.isNaN(pubDate.getTime())) continue;

  if (pubDate.getTime() > today.getTime()) continue;

  const updated = content.replace(/^draft:\s*true\s*$/m, 'draft: false');
  writeFileSync(path, updated);
  published.push(file);
}

if (published.length === 0) {
  console.log('No due drafts to publish.');
} else {
  console.log(`Published ${published.length} draft(s):`);
  for (const file of published) console.log(`  - ${file}`);
}
