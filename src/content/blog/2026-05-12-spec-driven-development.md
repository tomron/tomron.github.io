---
title: "Spec-Driven Development"
pubDate: 2026-05-12T06:59:05.000Z
permalink: "/2026/05/12/spec-driven-development/"
tags:
  - "ai"
  - "bookclub"
  - "engineering"
  - "LearnInPublic"
  - "llm"
  - "sdd"
draft: false
---
<!-- wp:paragraph -->
<p><span style="margin: 0px;padding: 0px">I recently read <strong><a href="https://www.amazon.com/dp/B0GHZMJDFP">Spec-Driven Development</a></strong> by Haim Michale, and it resonated with some day-to-day thoughts about SDD.</span></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>The problem SDD aims to solve isn't new</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Missing, incomplete, and ambiguous requirements that evolve over time have always plagued software delivery, but it is now amplified: the pace is faster, LLMs have a strong tendency to fill gaps by guessing, and they carry zero tribal knowledge - no kitchen-table conversations, no "oh, we tried that in 2022" instincts. <a href="https://alistairmavin.com/ears/">EARS syntax</a> (Easy Approach to Requirements Syntax) is an interesting framework for making requirements more machine-readable, but it still requires a human to steer it. The spec is only as good as the intent behind it.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Legacy code and brownfield projects are the elephant in the room</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Most SDD content assumes you're starting fresh. But the vast majority of engineering work happens in systems with years of accumulated decisions, undocumented assumptions, and implicit context baked into the codebase. Making that accessible to coding agents, let alone to SDD, is a real and largely unsolved problem. As far as I'm aware, there are no clear best practices or guidelines here yet. This is an area we need to tackle head-on.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>SDD also accelerates a role blur we're already talking about</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>If specs are first-class artifacts that live in the repo, who writes them? Do PMs start pushing requirements documents directly into codebases, expanding into territory traditionally owned by engineers? Do developers take on deeper responsibility for refining and maintaining specifications? Both are plausible. Neither is cost-free. The boundary is getting blurry fast.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>And drift…</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Drift is what happens when specs and code silently diverge: a requirement changes, but the spec file doesn't, or a PR lands and the corresponding document isn't updated. Over time, specs stop describing the system, and that's arguably worse than having no specs at all, because they create false confidence. My suggestion: drift detection should be treated as a core part of repo gardening. Flag when code changes without a corresponding spec update, and vice versa. Make it visible, not something that accumulates quietly in the background. Expect spec debt terminology coming soon.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>While different SDD methodologies vary in the exact documents they produce, I found the attached screenshot a useful cheat sheet for knowing when to update which document.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":2159,"sizeSlug":"large","linkDestination":"media"} -->
<figure class="wp-block-image size-large"><a href="/wp-content/uploads/2026/05/1000179508.jpg"><img src="/wp-content/uploads/2026/05/1000179508.jpg" alt="" class="wp-image-2159" /></a></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->
