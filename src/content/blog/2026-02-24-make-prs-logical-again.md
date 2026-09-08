---
title: "Make PRs Logical Again"
pubDate: 2026-02-24T08:52:45.000Z
permalink: "/2026/02/24/make-prs-logical-again/"
tags:
  - "chrome extension"
  - "github"
  - "openspec"
  - "pull request"
  - "spec driven development"
draft: false
---
<!-- wp:paragraph -->
<p>The day-to-day work of software engineers is shifting -&nbsp; less time is spent on implementation, and more on specifying, planning, and reviewing. As AI coding tools improve, the bottleneck moves upstream and downstream: writing clear specs, structuring changes well, and conducting thoughtful reviews become the highest-leverage skills.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>One surprisingly weak point in that workflow is GitHub PR file order. Files are shown in alphabetical order that rarely reflects the logical flow of the change. Good reviews are narrative: start with the contract, then the core logic, then the edges and tests. When the order is wrong, reviewers waste cognitive energy reconstructing the story instead of evaluating the change.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>That realization pushed me to build a small Chrome extension that lets you reorder files in a PR so the review reads in the <em>right</em> order. Check it out <a href="https://chromewebstore.google.com/detail/pr-file-reorder/gmfiodnajfclbmaihcnoagfaelkfapbh">here</a>.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":2144,"sizeSlug":"large","linkDestination":"media"} -->
<figure class="wp-block-image size-large"><a href="/wp-content/uploads/2026/02/screenshot-2026-02-16-at-22.01.16-1.png"><img src="/wp-content/uploads/2026/02/screenshot-2026-02-16-at-22.01.16-1.png" alt="" class="wp-image-2144" /></a></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>It was also a personal reminder of the joy of doing something for the first time - I never built a Chrome extension before. My first attempt was messy and unsuccessful, so I wiped everything and restarted using Spec-Driven Development (SDD) with <a href="https://openspec.dev/">OpenSpec</a>. The second iteration was dramatically smoother, more structured, and consumed fewer tokens. In a world where implementation is getting cheaper, clarity in specs, understanding of trade-offs, and the review experience are quickly becoming the real craft of engineering.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->
