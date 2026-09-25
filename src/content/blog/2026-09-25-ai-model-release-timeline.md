---
title: "A Timeline of AI Model Releases"
pubDate: 2026-09-25T07:30:00.000Z
permalink: "/2026/09/25/ai-model-release-timeline/"
tags:
  - "ai"
  - "llm"
  - "openai"
  - "anthropic"
  - "gemini"
  - "deepseek"
  - "llama"
draft: false
---
<!-- wp:paragraph -->
<p>I keep losing track of which model came out when. Between GPT-6, Claude Fable, Gemini 3.8, and the open-weight labs shipping every few weeks, answering "was that before or after X?" got harder than it should be.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>So I built a page for it: the <a href="/model-timeline/">AI Model Release Timeline</a>. One horizontal axis, one lane per lab, a dot for every notable release since Llama 2. Hover or tap a dot for the date, the official announcement link, API pricing, and benchmarks where the lab published them. There is a filter per lab and a search box, since the full list is dense.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>It tracks eight labs: OpenAI, Google (Gemini), Anthropic, Moonshot (Kimi), Zhipu (GLM), DeepSeek, TypeSafe AI (Jev), and Meta (Llama). For the open-weight labs the dates are the Hugging Face uploads, since the upload is the release.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>The data is seeded from official changelogs and docs, and a GitHub Action re-scans those sources daily and opens a PR when something new ships. The page stays current without me remembering to update it, and every automated change still goes through a reviewable PR.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>If a model you care about is missing, the data is <a href="https://github.com/tomron/tomron.github.io/blob/main/src/data/model-releases.json">one JSON file</a> - PRs welcome.</p>
<!-- /wp:paragraph -->
