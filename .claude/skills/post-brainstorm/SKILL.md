---
name: post-brainstorm
description: Browse what leading AI and dev-infra companies (Anthropic, OpenAI, Google, Irregular, Shopify, Cloudflare, Vercel, AWS) and their leaders are saying on their blogs and on X/Twitter, plus news on AI, LLMs, open source, LLM security and engineering management, then brainstorm takes for Tom's blog — interesting angles, agreements, and especially places where these voices contradict each other or the evidence. Use when the user asks to brainstorm post ideas, wants takes or hot takes, asks "what are people saying about X", "what's the debate around X", or wants to react to what a company or leader posted.
---

# Post brainstorm

Goal: find **what notable people and companies are claiming right now**, set those claims against each other and against evidence, and turn the tension into post ideas with a clear take. This is a brainstorm partner, not a news digest — every idea needs an opinion Tom could defend.

How this differs from the `post-ideas` skill: `post-ideas` scans broad news for topics. This skill starts from **specific voices** (companies, leaders, practitioners) and looks for **takes and contradictions**.

Arguments (all optional):
- a topic ("coding agents", "LLM security", "eng management and AI")
- a company or person ("what is Shopify saying", "@rauchg")
- a time window (default: last 14 days for posts and news, last 3 months for debates)
- "quick" — fewer sources (official blogs + the most relevant 5–6 handles)

## 1. Know what's already on the blog

Skim titles and descriptions in `src/content/blog/` (files are `YYYY-MM-DD-slug.md`) for the last ~6 months, plus older posts on the requested topic. Use this to avoid repeats, find follow-ups ("I wrote X in March; here's what changed"), and spot positions Tom already took — a new claim that contradicts Tom's earlier post is a great hook.

## 2. Gather what the voices are saying

Source list: [references/sources.md](references/sources.md) — companies, official blogs and changelogs, leaders' X handles, and independent voices per topic.

Coverage rules (unless the user named a narrow topic or company):
- **Every company:** read its blog listing and check every listed leader on X. A quick look at recent posts is enough, but skip none.
- **Independent voices:** 2–3 per topic area per run. Rotate, so people skipped last time come first. Always include anyone whose topic matches a tension you're already building.
- Keep track of who you skipped and who you couldn't reach. They're reported separately (see Output).

Compute absolute dates from today's date and use month + year in queries. Run searches in parallel.

**Company blogs and changelogs** — the most reliable source. WebFetch the listing pages in `sources.md` and note posts inside the window. Open the 3–6 most interesting ones; don't build a take on a headline.

**X/Twitter** — X pages can't be fetched directly (login wall). Tom has the Claude in Chrome extension enabled, so that's the main path:
1. Load the `claude-in-chrome` skill and the Chrome tools in one ToolSearch call (include `browser_batch`, `computer`, `javascript_tool`, `get_page_text`). Open one new tab and, in a single `browser_batch`, for each handle: navigate to `https://x.com/<handle>`, wait ~4 seconds (X renders slowly; reading right away returns nothing), then run this with `javascript_tool` to get the 4 newest posts, skipping pinned ones:
   ```js
   [...document.querySelectorAll('article')].filter(a=>!a.innerText.startsWith('Pinned')).slice(0,4).map(a=>a.innerText.slice(0,500)).join('\n=====\n')
   ```
   If the result says `BLOCKED` (the extension's privacy filter can trip on links in posts), fall back to `get_page_text`, which returns only the top post. If that post is pinned, scroll down and read again. Skip posts older than the window. Close the tab when done. Read only; never like, reply, repost, post or follow.
2. If Chrome isn't connected: WebSearch with `site:x.com <handle> <topic>` or `"<name>" <topic> <month year>`.
3. Find where the post was quoted: news articles, Hacker News threads, Simon Willison's blog, newsletters, LinkedIn reposts, Threads/Bluesky mirrors.
If none works, say which handles couldn't be checked rather than guessing what they said. Never invent or paraphrase a quote you haven't seen — attribute only what a source shows, with a link.

**News and evidence** — WebSearch for the topic areas in `sources.md` (`standard` mode; `extended` for very recent or niche items or when results are thin). Look specifically for data that tests the claims: studies, surveys, benchmarks, incident reports, postmortems, layoffs/hiring numbers, pricing changes.

For each item, record: who, what they claimed (short quote or close paraphrase), date, link.

## 3. Find the tensions

This is the core of the skill. Group the claims by theme and look for:

- **Voice vs voice** — two leaders or companies saying opposite things (e.g. "AI will replace junior engineers" vs "we're hiring more juniors because of AI").
- **Claim vs evidence** — a confident statement next to a study, survey or incident that points the other way.
- **Words vs actions** — a company's messaging vs what it ships, prices, open-sources, or how it hires.
- **Then vs now** — someone's position six months ago vs today, or a prediction whose deadline has passed.
- **Vendor incentive** — a claim that conveniently sells the speaker's product; what would a neutral practitioner say?
- **Consensus worth poking** — when everyone agrees, what's the strongest counter-argument?
- **Tom vs the room** — where Tom's experience as an engineering manager (or a past post) disagrees with the popular line.

Weak tensions (a nuance, not a disagreement) are fine as supporting material but not as the main hook. Be fair: state each side in a form its holder would accept before picking a side.

## 4. Turn tensions into ideas

For each strong tension, propose a take. Prefer takes that:
- come from a practitioner/manager view, not a pundit view;
- can be backed by a hands-on experiment, team experience or data;
- connect two topics (e.g. LLM security × engineering management: "who owns prompt-injection risk on a team?").

Pick the 3 strongest. When the material supports it, mix them: one engineering-management idea, one LLM security or open source idea, and one "react to a company/leader" idea.

## 5. Output

Start with a 2–3 line **"What the room is saying"** summary of the main themes this window.

Then 3 ideas, strongest first (more only if the user asks):

```
### <Working title>
**The take:** one or two sentences — the opinion, stated plainly.
**The tension:** who says what vs who says what (or claim vs evidence), each with date and link.
**Tom's angle:** why Tom in particular can write this (experience, past post, experiment to run).
**Counter-argument to address:** the best objection.
**Format:** standalone | "5 interesting things" item | follow-up to <post> | hands-on experiment | response post
**Effort:** quick | medium | deep
```

Then:
- **Quotes worth saving** — up to 4 notable quotes with author, date, link (only ones you actually saw).
- **Coverage gaps**, split in two so Tom knows why each gap exists:
  - **Couldn't reach** — fetch failed, blocked, or no account.
  - **Skipped** — your choice this run (rotation or time). These go first next run.
- One line offering to dig into, outline or draft any idea.

Keep it skimmable. Don't write drafts or create files unless asked; if asked to save, write to a scratch file, not into `src/content/blog/`.
