import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, cpSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';

const root = mkdtempSync(join(tmpdir(), 'publish-due-drafts-'));
const blog = join(root, 'src/content/blog');
mkdirSync(blog, { recursive: true });
mkdirSync(join(root, 'scripts'));
cpSync(new URL('./publish-due-drafts.mjs', import.meta.url), join(root, 'scripts/publish-due-drafts.mjs'));

function post(name, date, scheduledPublish, draft = true) {
  const filename = join(blog, `${name}.md`);
  writeFileSync(filename, `---\ntitle: Test\npubDate: ${date}\ndraft: ${draft}\n${scheduledPublish === null ? '' : `scheduledPublish: ${scheduledPublish}\n`}---\nBody stays unchanged.\n`);
  return filename;
}

try {
  const oldDraft = post('old-draft', '2014-01-01', null);
  const withdrawn = post('withdrawn', '2026-01-01', false);
  const scheduledDue = post('scheduled-due', '2014-01-01', true);
  const scheduledFuture = post('scheduled-future', '2999-01-01', true);
  const laterToday = new Date(Date.now() + 60 * 60 * 1000).toISOString();
  const scheduledLater = post('scheduled-later-today', laterToday, true);
  const published = post('already-published', '2014-01-01', true, false);
  const out = execFileSync(process.execPath, [join(root, 'scripts/publish-due-drafts.mjs')], { encoding: 'utf8' });
  assert.match(out, /Published 1 draft\(s\):/);
  assert.match(out, /scheduled-due.md/);
  for (const file of [oldDraft, withdrawn, scheduledFuture, scheduledLater]) assert.match(readFileSync(file, 'utf8'), /draft: true/);
  for (const file of [scheduledDue, published]) assert.match(readFileSync(file, 'utf8'), /draft: false/);
  for (const file of [oldDraft, withdrawn, scheduledDue, scheduledFuture, scheduledLater, published]) {
    assert.match(readFileSync(file, 'utf8'), /Body stays unchanged\./);
  }
  const secondRun = execFileSync(process.execPath, [join(root, 'scripts/publish-due-drafts.mjs')], { encoding: 'utf8' });
  assert.match(secondRun, /No due drafts to publish\./);
} finally {
  rmSync(root, { recursive: true, force: true });
}
