---
title: "From Demo Hell to Scale: Two Takes on Building Things That Last"
pubDate: 2025-09-16T11:03:49.000Z
permalink: "/2025/09/16/from-demo-hell-to-scale-two-takes-on-building-things-that-last/"
tags:
  - "ai"
  - "aws"
  - "demo"
  - "docker"
  - "genai"
  - "technology"
draft: false
---
<!-- wp:paragraph -->
<p>​​I recently came across two blog posts that made me think, especially in light of a sobering statistic I've seen floating around: a recent <a href="https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/">MIT study</a> reports that <strong>95% of enterprise generative AI pilots fail to deliver real business impact or move beyond demo mode</strong>.<br></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>One <a href="https://everton.xyz/i-sat-down-with-werner-vogels/">post</a> is a conversation with <strong>Werner Vogels</strong>, Amazon’s long-time CTO, who shares lessons from decades of building and operating systems at internet scale. The <a href="https://www.docker.com/blog/ai-poc-success-rules/">other</a>, from <strong>Docker</strong>, outlines nine rules for making AI proof-of-concepts that don’t die in demo land.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Despite their different starting points, I was surprised by how much the posts resonated with one another. Here’s a short review of where they align and where they differ.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>Where They Agree</strong></h2>
<!-- /wp:heading -->

<!-- wp:list {"ordered":true} -->
<ol class="wp-block-list"><!-- wp:list-item -->
<li><strong>Solve real problems, not hype </strong>- Both warn against chasing the “cool demo.” Docker calls it <em>“Solve Pain, Not Impress”</em>, while Vogels is blunt: <em>“Don’t build for hype.”</em> This advice sounds obvious, but it’s easy to fall into the trap of chasing novelty. Whether you’re pitching to executives or building at AWS scale, both warn that if you’re not anchored in a real customer pain, the project is already off track.<br></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Build with the end in mind - </strong>Neither believes in disposable prototypes. Docker advises to <em>design for production from day zero</em>—add observability, guardrails, testing, and think about scale early. Vogels echoes with <em>“What you build, you run”</em>, highlighting that engineers must take ownership of operations, security, and long-term maintainability. Both perspectives converge on the same principle: if you don’t build like it’s going to live in production, it probably never will.<br></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Discipline over speed</strong> - Both posts emphasize discipline over blind speed. Docker urges teams to embed cost and risk awareness into PoCs, even tracking unit economics from day one. Vogels stresses that “cost isn’t boring—it’s survival” and frames decision-making around reversibility: move fast when you can reverse course, slow down when you can’t. Different wording, same idea: thoughtful choices early save pain later.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity" />
<!-- /wp:separator -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>Where They Differ</strong></h2>
<!-- /wp:heading -->

<!-- wp:list {"ordered":true} -->
<ol class="wp-block-list"><!-- wp:list-item -->
<li><strong>Scope: the lab vs. the long haul </strong>- Docker’s post is tightly focused on how to build POCs in the messy realities of AI prototyping and how to avoid “demo theater” and make something that survives first contact with production. Vogels’ advice is broader, aimed at general engineering, technology leadership, infrastructure, decision-making at scale, and organization-level priorities. Vogels speaks from decades of running Amazon-scale systems, where the horizon is years, not weeks.<br></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Tactics vs. culture</strong> - Docker’s advice is concrete and technical: use remocal workflows, benchmark early, add prompt testing to CI/CD. Vogels is less about specific tools and more about culture: engineers owning what they build, organizations learning to move fast on reversible decisions, and leaders setting clarity as a cultural value. Docker tells you what to do. Vogels tells you how to think.<br></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Organizational Context and Scale </strong>- Docker speaks to teams fighting to get from zero to one—making PoCs credible beyond the demo stage. Vogels speaks from AWS’s point of view,  where the challenge is running infrastructure that millions rely on. Docker’s post is about survival; Vogels is about resilience at scale.<br></li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity" />
<!-- /wp:separator -->

<!-- wp:paragraph -->
<p>What strikes me about these two perspectives is how perfectly they complement each other. Docker's advice isn't really about AI - it's about escaping demo hell by building prototypes with production DNA from day one. Vogels tackles what happens when you actually succeed: keeping systems reliable when thousands depend on them. They're describing the same journey from different ends. Set up your prototypes with the right foundations, and you dramatically increase the odds that your product will one day face the kinds of scale and resilience questions Vogels addresses.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->
