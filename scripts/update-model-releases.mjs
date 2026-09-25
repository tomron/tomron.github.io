#!/usr/bin/env node
/**
 * Model release monitor.
 *
 * Scans official sources for new model releases and merges them into
 * src/data/model-releases.json. New entries are added with
 * "provisional": true so a human reviews them in the PR before merge.
 *
 * Sources (all official, all machine-readable unless noted):
 *   - OpenAI:    https://developers.openai.com/changelog/ (HTML changelog)
 *                + https://platform.openai.com/docs/pricing (pricing fill)
 *   - Google:    https://ai.google.dev/gemini-api/docs/changelog (HTML)
 *   - Anthropic: https://docs.claude.com/en/release-notes/overview.md (markdown)
 *                + models overview page for pricing fill
 *   - DeepSeek, Moonshot (Kimi), Zhipu (GLM), Meta (Llama):
 *                Hugging Face API, createdAt of the lab's own org repos
 *                (for open-weight labs the weights upload IS the release).
 *   - TypeSafe AI (Jev): NO machine-readable source exists (typesafe.ai is
 *                client-rendered, no RSS). Not monitored automatically;
 *                add entries by hand. This is a known limitation.
 *
 * The monitor is incremental: per lab it only considers candidates newer
 * than the newest entry already in the data file (same-day candidates are
 * name-deduped). It never edits or deletes existing entries; it only adds
 * provisional ones and fills standard-tier pricing and cache-hit prices where matched.
 *
 * Usage:
 *   node scripts/update-model-releases.mjs            # dry run, print diff
 *   node scripts/update-model-releases.mjs --update   # write data file
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DATA_FILE = join(ROOT, 'src/data/model-releases.json');
const UPDATE = process.argv.includes('--update');

const UA = { 'User-Agent': 'model-release-monitor (github.com/tomron)' };
const MONTHS = {
  january: 1, february: 2, march: 3, april: 4, may: 5, june: 6, july: 7,
  august: 8, september: 9, october: 10, november: 11, december: 12,
};
const SHORT_MONTHS = {
  jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9,
  oct: 10, nov: 11, dec: 12,
};

async function fetchText(url) {
  const res = await fetch(url, { headers: UA, redirect: 'follow' });
  if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`);
  return res.text();
}

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, '\n')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
}

const iso = (y, m, d) =>
  `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

function parseLongDate(s) {
  const m = s.match(
    /(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2}),?\s+(20\d\d)/i,
  );
  return m ? iso(m[3], MONTHS[m[1].toLowerCase()], m[2]) : null;
}

/** Title-case a model id like gpt-6-sol / gemini-3.8-flash.
 * `prefix` is the display prefix including its separator: 'GPT-' or 'Gemini '. */
function prettify(id, prefix) {
  const rest = id.replace(/^[a-z]+-/, '');
  return (
    prefix +
    rest
      .split('-')
      .map((p) => (p.match(/^\d/) ? p : p[0].toUpperCase() + p.slice(1)))
      .join(' ')
  );
}

// ---------- source: Anthropic release notes (markdown) ----------
async function scanAnthropic() {
  const md = await fetchText(
    'https://docs.claude.com/en/release-notes/overview.md',
  );
  const out = [];
  const sections = md.split(/^### /m).slice(1);
  for (const sec of sections) {
    const nl = sec.indexOf('\n');
    const date = parseLongDate(sec.slice(0, nl));
    if (!date) continue;
    for (const line of sec.slice(nl).split('\n')) {
      const m = line.match(/launched \*\*(Claude [^*]+)\*\*\s*\(?`?([a-z0-9.\-]+)?`?\)?/i);
      if (m) {
        out.push({
          date,
          lab: 'anthropic',
          model: m[1].trim(),
          url: 'https://docs.claude.com/en/release-notes/overview',
        });
      }
    }
  }
  return out;
}

// Prices are parsed from the labs' own pricing pages at scan time. Never infer
// one version's price from another, or use batch/priority prices for standard.
const PRICING_URLS = {
  openai: 'https://platform.openai.com/docs/pricing',
  anthropic: 'https://docs.anthropic.com/en/docs/about-claude/pricing.md',
  google: 'https://ai.google.dev/gemini-api/docs/pricing',
  deepseek: 'https://api-docs.deepseek.com/quick_start/pricing',
};

function htmlText(s) {
  return s.replace(/<[^>]*>/g, ' ').replace(/&(?:nbsp|amp|lt|gt|quot|#39);/g, ' ').replace(/\s+/g, ' ').trim();
}

function htmlCells(row) {
  return [...row.matchAll(/<t[dh]\b[^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((m) => htmlText(m[1]));
}

function money(s) {
  const m = s?.match(/^\$?([\d]+(?:\.[\d]+)?)$/);
  return m ? `$${m[1]}` : null;
}

function price(input, output, cache, label = 'Cached input') {
  const p = {};
  if (money(input) && money(output)) p.pricing = `${money(input)} / ${money(output)} per MTok`;
  if (money(cache)) p.cache_pricing = `${label}: ${money(cache)} / MTok`;
  return p;
}

function anthropicPrices(md) {
  const map = {};
  const section = md.split('## Model pricing')[1]?.split('## ')[0] || '';
  for (const line of section.split('\n')) {
    if (!line.startsWith('| Claude ')) continue;
    const cells = line.split('|').slice(1, -1).map((v) => v.trim());
    const name = cells[0].replace(/\s*\(.*$/, '');
    const value = price(cells[1]?.split(' ')[0], cells[5]?.split(' ')[0], cells[4]?.split(' ')[0], 'Cache hit');
    if (value.pricing) map[normalize(name)] = value;
  }
  return map;
}

function openaiPrices(html) {
  const map = {};
  // The first table is the Standard tier. Its first price group is short context;
  // later groups and tables are long context, Batch, Priority, etc.
  const tables = [...html.matchAll(/<table\b[^>]*>[\s\S]*?<\/table>/gi)];
  for (const [, row] of (tables[0]?.[0] || '').matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)) {
    const cells = htmlCells(row);
    const id = cells[0]?.replace(/\s*\(.*$/, '');
    if (!/^(?:gpt-[a-z0-9.\-]+|o\d[a-z0-9.\-]*)$/i.test(id || '')) continue;
    const value = price(cells[1], cells[4], cells[2]);
    if (value.pricing) map[normalize(id)] = value;
  }
  // GPT-5.6 flagship rows are server-embedded for client hydration, not in
  // the first rendered table. The first occurrence is the Standard tier;
  // later occurrences are Batch, Flex, and Priority. Require all three
  // adjacent variants in the same rows payload before accepting it.
  const embedded = html.match(
    /gpt-5\.6-sol&quot;\]\s*,\s*\[0,([\d.]+)\]\s*,\s*\[0,([\d.]+)\]\s*,\s*\[0,[\d.]+\]\s*,\s*\[0,([\d.]+)\][\s\S]{0,200}gpt-5\.6-terra&quot;\]\s*,\s*\[0,([\d.]+)\]\s*,\s*\[0,([\d.]+)\]\s*,\s*\[0,[\d.]+\]\s*,\s*\[0,([\d.]+)\][\s\S]{0,200}gpt-5\.6-luna&quot;\]\s*,\s*\[0,([\d.]+)\]\s*,\s*\[0,([\d.]+)\]\s*,\s*\[0,[\d.]+\]\s*,\s*\[0,([\d.]+)\]/i,
  );
  if (embedded) {
    ['sol', 'terra', 'luna'].forEach((name, i) => {
      const cells = embedded.slice(1 + i * 3, 4 + i * 3);
      map[normalize(`gpt-5.6-${name}`)] = price(cells[0], cells[2], cells[1]);
    });
  }
  return map;
}

function geminiPrices(html) {
  const map = {};
  // Each Gemini model has its own h2 section with Standard first, then Batch,
  // Flex, etc. Read only the first table after Standard and the paid column.
  const sections = html.split(/<h2\b/);
  for (const section of sections) {
    const id = section.match(/<code\b[^>]*>(gemini-[a-z0-9.\-]+)<\/code>/i)?.[1];
    if (!id) continue;
    const standard = section.split(/<h3\b[^>]*id="standard(?:_\d+)?"/i)[1];
    const table = standard?.match(/<table\b[^>]*>[\s\S]*?<\/table>/i)?.[0];
    if (!table) continue;
    const rows = [...table.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)].map((r) => htmlCells(r[1]));
    const paid = (name) => rows.find((r) => r[0]?.toLowerCase().startsWith(name))?.at(-1)?.match(/\$[\d.]+/)?.[0];
    const value = price(paid('input price'), paid('output price'), paid('context caching price'), 'Context caching');
    if (value.pricing) map[normalize(id)] = value;
  }
  return map;
}

function deepseekPrices(html) {
  const map = {};
  const table = html.match(/<table\b[^>]*>[\s\S]*?<\/table>/i)?.[0] || '';
  const rows = [...table.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)].map((r) => htmlCells(r[1]));
  const versions = rows.find((r) => r[0] === 'MODEL VERSION')?.slice(-2) || [];
  const peak = (kind) => {
    const at = rows.findIndex((r) => r.some((c) => c.includes(kind)));
    return at < 0 ? [] : rows[at + 1]?.slice(-2) || [];
  };
  const input = peak('CACHE MISS');
  const output = peak('1M OUTPUT TOKENS');
  const cache = peak('CACHE HIT');
  versions.forEach((v, i) => {
    const value = price(input[i], output[i], cache[i], 'Cache hit (peak)');
    if (value.pricing) map[normalize(v)] = value;
  });
  return map;
}

const PRICE_PARSERS = {
  openai: openaiPrices,
  anthropic: anthropicPrices,
  google: geminiPrices,
  deepseek: deepseekPrices,
};

async function loadPrices(labs, errors) {
  const prices = {};
  await Promise.all([...labs].filter((lab) => PRICING_URLS[lab]).map(async (lab) => {
    try {
      prices[lab] = PRICE_PARSERS[lab](await fetchText(PRICING_URLS[lab]));
      if (!Object.keys(prices[lab]).length) errors.push(`No usable ${lab} pricing rows at ${PRICING_URLS[lab]}`);
    } catch (e) {
      errors.push(`Pricing ${lab}: ${e.message}`);
    }
  }));
  return prices;
}

function quotedPrices(labPrices, names) {
  const values = names.map((name) => labPrices?.[normalize(name)]);
  // Composite entry: only publish if every named model matches independently.
  if (values.some((v) => !v?.pricing)) return {};
  if (values.length === 1) return values[0];
  const result = { pricing: names.map((n, i) => `${n}: ${values[i].pricing}`).join('; ') };
  if (values.every((v) => v.cache_pricing)) {
    result.cache_pricing = names.map((n, i) => `${n}: ${values[i].cache_pricing}`).join('; ');
  }
  return result;
}

function modelNames(model) {
  if (model === 'GPT-5.6 family') return ['GPT-5.6 Sol', 'GPT-5.6 Terra', 'GPT-5.6 Luna'];
  return model.split(/\s+\+\s+/);
}

// ---------- source: OpenAI changelog (HTML) ----------
const OPENAI_MODEL_TAG = /^(gpt|o[0-9]|sora|chatgpt)[a-z0-9.\-]*$/;
async function scanOpenAI() {
  const html = await fetchText('https://developers.openai.com/changelog/');
  const lines = stripHtml(html);
  const start = lines.findIndex((l) =>
    /^(January|February|March|April|May|June|July|August|September|October|November|December), 20\d\d$/.test(l),
  );
  const body = start >= 0 ? lines.slice(start) : lines;
  const entries = [];
  let ym = null;
  let cur = null;
  for (const l of body) {
    const y = l.match(
      /^(January|February|March|April|May|June|July|August|September|October|November|December), (20\d\d)$/,
    );
    if (y) {
      ym = { m: MONTHS[y[1].toLowerCase()], y: y[2] };
      continue;
    }
    const d = l.match(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{1,2})$/);
    if (d && ym) {
      cur = { date: iso(ym.y, ym.m, d[2]), lines: [] };
      entries.push(cur);
      continue;
    }
    if (cur) cur.lines.push(l);
  }
  const out = [];
  for (const e of entries) {
    const text = e.lines.join(' ');
    if (!/\b(Released|Launched)\b/.test(text)) continue;
    if (!/gpt|GPT|\bo[0-9]\b|Sora|sora/.test(text)) continue;
    const tags = e.lines.slice(1, 6).filter((l) => OPENAI_MODEL_TAG.test(l));
    if (!tags.length) continue;
    // Display names: "Released GPT-6 Sol" phrasing where present, else
    // prettified model-id tags (max 3, skip dated snapshots).
    const models = [];
    const named = text.matchAll(
      /Released (?:the )?((?:GPT|o)[A-Za-z0-9. ]+?)(?=\s*(?:\(|,|\.(?:\s|$)| to the | in the | for | and ))/g,
    );
    for (const n of named) models.push(n[1].trim());
    if (!models.length) {
      for (const t of tags.filter((t) => !/-20\d{6}$/.test(t)).slice(0, 3)) {
        models.push(prettify(t, 'GPT-'));
      }
    }
    for (const model of models) {
      out.push({
        date: e.date,
        lab: 'openai',
        model,
        url: 'https://developers.openai.com/changelog/',
      });
    }
  }
  return out;
}

// ---------- source: Gemini changelog (HTML) ----------
async function scanGemini() {
  const html = await fetchText('https://ai.google.dev/gemini-api/docs/changelog');
  const lines = stripHtml(html);
  const dateIdx = lines
    .map((l, i) => ({ l, i }))
    .filter(({ l }) => parseLongDate(l));
  const out = [];
  for (let k = 0; k < dateIdx.length; k++) {
    const date = parseLongDate(dateIdx[k].l);
    const end = k + 1 < dateIdx.length ? dateIdx[k + 1].i : lines.length;
    const blk = lines.slice(dateIdx[k].i, Math.min(end, dateIdx[k].i + 10));
    const title = blk[1] || '';
    const text = blk.join(' ');
    if (!/Gemini/i.test(title)) continue;
    if (!/generally available|\(GA\)|Preview|Launched|Released/i.test(text))
      continue;
    // Model id in the body, else derive from the title.
    const ids = text.match(/gemini-[0-9][a-z0-9.\-]*/g);
    let model;
    if (ids) {
      model = prettify(ids[0], 'Gemini ');
    } else {
      const t = title.match(/(Gemini [A-Za-z0-9. ]+?)( generally| in public| preview| \(GA|$)/i);
      if (!t) continue;
      model = t[1].trim();
    }
    // Clean Preview/GA qualifiers from the id-derived name.
    model = model.replace(/-preview$/i, '').replace(/ Preview$/i, '');
    out.push({
      date,
      lab: 'google',
      model,
      url: 'https://ai.google.dev/gemini-api/docs/changelog',
    });
  }
  return out;
}

// ---------- source: Hugging Face orgs (open-weight labs) ----------
const HF_LABS = [
  { org: 'deepseek-ai', lab: 'deepseek', keep: /^DeepSeek/ },
  { org: 'moonshotai', lab: 'moonshot', keep: /^Kimi/ },
  { org: 'zai-org', lab: 'zhipu', keep: /^GLM/ },
  { org: 'meta-llama', lab: 'meta', keep: /^(Meta-)?Llama-\d/ },
];
const HF_EXCLUDE = /-(BF16|GGUF|FP8|AWQ|GPTQ|MLX|ONNX|INT4|INT8|8BIT|4BIT|Base)$/i;
async function scanHF() {
  const out = [];
  for (const { org, lab, keep } of HF_LABS) {
    const res = await fetch(
      `https://huggingface.co/api/models?author=${org}&sort=createdAt&direction=-1&limit=100&full=false`,
      { headers: UA },
    );
    if (!res.ok) throw new Error(`HF ${org} -> HTTP ${res.status}`);
    const models = await res.json();
    for (const m of models) {
      const name = m.id.split('/')[1];
      if (!keep.test(name) || HF_EXCLUDE.test(name)) continue;
      if ((m.likes ?? 0) < 150 && (m.downloads ?? 0) < 100000) continue;
      out.push({
        date: m.createdAt.slice(0, 10),
        lab,
        model: name,
        url: `https://huggingface.co/${m.id}`,
      });
    }
  }
  return out;
}

// ---------- merge ----------
function normalize(s) {
  return s
    .toLowerCase()
    .replace(/\s+(family|preview|ga)$/i, '')
    .replace(/[^a-z0-9.]+/g, ' ')
    .trim();
}

const isVersionToken = (t) => /\d/.test(t);

/** True when `short` covers `long`: equal, or a token-prefix whose boundary
 * does not split a version distinction ("claude opus 5" must not cover
 * "claude opus 5.5", but "gpt 6 sol" covers "gpt 6 sol + gpt 6 luna"). */
function covers(short, long) {
  if (short === long) return true;
  const a = short.split(' ');
  const b = long.split(' ');
  if (a.length >= b.length) return false;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
  // Boundary check: a version distinction at the boundary means no cover.
  if (isVersionToken(a[a.length - 1]) && isVersionToken(b[a.length]))
    return false;
  return true;
}

function alreadyTracked(existing, cand) {
  const c = normalize(cand.model);
  return existing.some((e) => {
    if (e.lab !== cand.lab) return false;
    const n = normalize(e.model);
    return covers(n, c) || covers(c, n);
  });
}

async function main() {
  const data = JSON.parse(readFileSync(DATA_FILE, 'utf8'));
  const watermark = {};
  for (const r of data.releases) {
    if (!watermark[r.lab] || r.date > watermark[r.lab]) watermark[r.lab] = r.date;
  }

  const scans = await Promise.allSettled([
    scanOpenAI(),
    scanGemini(),
    scanAnthropic(),
    scanHF(),
  ]);
  const candidates = [];
  const errors = [];
  for (const s of scans) {
    if (s.status === 'fulfilled') candidates.push(...s.value);
    else errors.push(s.reason.message);
  }

  const added = [];
  const seen = new Set();
  for (const c of candidates) {
    if (!c.date || !c.model) continue;
    const wm = watermark[c.lab] || '0000-00-00';
    if (c.date < wm) continue; // incremental: only newer than our newest entry
    // Same-day releases are almost always covered by the existing entry for
    // that date (naming differs across sources); hand-add rare misses.
    if (c.date === wm) continue;
    if (alreadyTracked(data.releases, c)) continue;
    const key = `${c.lab}|${normalize(c.model)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    added.push({ ...c, provisional: true });
  }

  // Existing grouped OpenAI entries predate the cache field. Fill only these
  // known gaps; leave all other historical, curated entries untouched.
  const backfill = data.releases.filter(
    (r) => r.lab === 'openai' && !r.cache_pricing &&
      ['GPT-5.6 family', 'GPT-6 Sol + GPT-6 Luna'].includes(r.model),
  );
  const pricedLabs = new Set([...added, ...backfill].map((r) => r.lab));
  const prices = pricedLabs.size ? await loadPrices(pricedLabs, errors) : {};
  const unmatched = [];
  for (const a of [...added, ...backfill]) {
    if (a.lab === 'meta') {
      if (added.includes(a)) a.pricing = 'Open weights';
      continue;
    }
    if (!PRICING_URLS[a.lab]) continue; // open-weight labs without API prices, TypeSafe
    const match = quotedPrices(prices[a.lab], modelNames(a.model));
    if (added.includes(a) && match.pricing) a.pricing = match.pricing;
    if (match.cache_pricing) a.cache_pricing = match.cache_pricing;
    if (!match.pricing || !match.cache_pricing) unmatched.push(`${a.lab}: ${a.model}`);
  }
  if (added.length || backfill.some((r) => r.cache_pricing)) {
    data.releases.push(...added);
    data.releases.sort((a, b) => a.date.localeCompare(b.date));
    data.updated = new Date().toISOString().slice(0, 10);
  }

  const lines = [];
  lines.push(`## Model release scan — ${new Date().toISOString().slice(0, 10)}`);
  lines.push('');
  if (added.length) {
    lines.push(`**${added.length} new provisional entr${added.length === 1 ? 'y' : 'ies'}:**`);
    for (const a of added) {
      lines.push(
        `- ${a.date} — ${a.model} (${a.lab})${a.pricing ? ` — ${a.pricing}` : ''} — ${a.url}`,
      );
    }
  } else {
    lines.push('No new releases found.');
  }
  if (unmatched.length) {
    lines.push('', '**Pricing unmatched or incomplete (review manually):**');
    for (const name of unmatched) lines.push(`- ${name}`);
  }
  if (backfill.some((r) => r.cache_pricing)) {
    lines.push('', `Filled cache pricing on ${backfill.filter((r) => r.cache_pricing).length} existing OpenAI group entries.`);
  }
  if (errors.length) {
    lines.push('');
    lines.push('**Source errors (treated as non-fatal):**');
    for (const e of errors) lines.push(`- ${e}`);
  }
  const summary = lines.join('\n');
  console.log(summary);

  if (process.env.GITHUB_STEP_SUMMARY) {
    writeFileSync(process.env.GITHUB_STEP_SUMMARY, summary + '\n', {
      flag: 'a',
    });
  }
  if (added.length || backfill.some((r) => r.cache_pricing)) {
    writeFileSync('/tmp/model-releases-pr-body.md', summary + '\n');
    if (UPDATE) {
      writeFileSync(DATA_FILE, JSON.stringify(data, null, 2) + '\n');
      console.error(`WROTE ${DATA_FILE} with ${added.length} new entries`);
    } else {
      console.error('DRY RUN (pass --update to write)');
    }
  }
  // Non-zero exit only on total failure (every source errored).
  if (errors.length && errors.length === scans.length) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
