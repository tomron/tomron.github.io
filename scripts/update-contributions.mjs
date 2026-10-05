// Fetches Tom's merged and open pull requests to repositories he does not own
// and writes them to src/data/contributions.json for the /open-source/ page.
//
//   node scripts/update-contributions.mjs
//
// Uses GITHUB_TOKEN / GH_TOKEN when set (higher rate limits); public data only.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const USER = 'tomron';
const OUT = fileURLToPath(new URL('../src/data/contributions.json', import.meta.url));
// Rolling window: only PRs from the last 12 months are kept.
const cutoff = new Date();
cutoff.setUTCFullYear(cutoff.getUTCFullYear() - 1);
const CUTOFF = cutoff.toISOString().slice(0, 10);
const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;

async function search(qualifier) {
  // `-user:` drops personal repos; the search API caps at 1000 results.
  const q = `author:${USER} type:pr ${qualifier} -user:${USER}`;
  const items = [];
  for (let page = 1; page <= 10; page++) {
    const url = new URL('https://api.github.com/search/issues');
    url.search = new URLSearchParams({
      q,
      per_page: '100',
      page: String(page),
      sort: 'updated',
    });
    const res = await fetch(url, {
      headers: {
        accept: 'application/vnd.github+json',
        'user-agent': 'tomron.github.io-contributions',
        ...(token && { authorization: `Bearer ${token}` }),
      },
    });
    if (!res.ok) throw new Error(`GitHub search failed: ${res.status} ${await res.text()}`);
    const body = await res.json();
    items.push(...body.items);
    if (items.length >= body.total_count || body.items.length < 100) break;
  }
  return items;
}

const toPr = (i, dateField) => ({
  repo: i.repository_url.replace('https://api.github.com/repos/', ''),
  number: i.number,
  title: i.title,
  url: i.html_url,
  date: i[dateField].slice(0, 10),
});

const inWindow = (pr) => pr.date >= CUTOFF;

const byDateDesc = (a, b) => b.date.localeCompare(a.date) || b.number - a.number;

const merged = (await search('is:merged')).map((i) => toPr(i, 'closed_at'))
  .filter(inWindow).sort(byDateDesc);
const open = (await search('is:open'))
  .filter((i) => !i.draft)
  .map((i) => toPr(i, 'created_at'))
  .filter(inWindow)
  .sort(byDateDesc);

writeFileSync(OUT, JSON.stringify({ merged, open }, null, 2) + '\n');
console.log(`Wrote ${merged.length} merged and ${open.length} open PRs`);
