---
title: "Back in the codebase — growth or retreat?"
pubDate: 2026-09-29T09:00:00.000Z
permalink: "/2026/09/29/back-in-the-codebase-growth-or-retreat/"
description: "Three 2026 reports tracked the same shift - managers writing more code - and reached three incompatible verdicts. A framework for figuring out which one applies to you."
tags:
  - "leadership"
  - "engineering management"
  - "ai"
draft: true
---
<!-- wp:paragraph -->
<p>Three reports came out this year, all measuring the same shift: engineering managers are writing more code than they did in 2025. None of them agree on what that means.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="https://leaddev.com/management/engineering-managers-are-back-in-the-codebase">LeadDev's Engineering Leadership Report 2026</a> calls it a comeback - hands-on coding among engineering managers jumped from 20% to 35% in a year, and the framing is that AI finally made good on the "player-coach" model <a href="https://newsletter.pragmaticengineer.com/p/zirp-engineering-managers">Gergely Orosz predicted back in 2024</a>. <a href="https://newsletter.eng-leadership.com/p/should-you-go-from-engineering-manager">Gregor Ojstersek</a>, tracking the same underlying trend, calls it dangerous by default - the same delegation instincts that make a good manager make them good at AI-assisted engineering, but doing the work yourself instead of delegating it is a bottleneck he says to avoid "at all costs." And <a href="https://jellyfish.co/blog/2026-engineering-leaders-shifting-from-ai-adoption-to-ai-accountability/">Jellyfish's 2026 State of Engineering Management report</a> barely mentions personal coding time at all - it's about whether anyone can prove the AI spend is working, with rising token cost now the top adoption concern, ahead of security and quality.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Same data point, read three ways: growth, risk, and irrelevant. That's not three groups of people looking at different companies - LeadDev's own article contains the contradiction. Emma Bostian is quoted in the piece celebrating the shift, and she says the opposite of what the headline argues: a manager's impact "comes from empowering their teams rather than increasing output through their own coding." The article disagrees with itself in its own body copy.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Why three good analysts land in three different places</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>None of these reports are wrong about their own data. They're measuring different variables and treating "should managers code more" as if it has one universal answer, when it actually depends on two things that vary independently: how the individual manager is wired, and what the organization actually rewards. Lay those out as two axes and the disagreement stops looking like a disagreement - it's four different situations, and each report is describing the loudest one from its own vantage point.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Personal style: some leaders think better with their hands in the code - reviewing PRs, catching architectural drift, staying credible with the team - and are worse at everything else if you take that away from them. Others were never going to be strong reviewers-of-taste and are better used entirely on the people and roadmap side; for them, coding hours are time subtracted from the job, not added to it.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Org culture: some companies still equate "credible leader" with "ships code," and will reward the exact hours LeadDev is measuring regardless of outcome. Others have built real AI-accountability muscle - Jellyfish's report is basically a snapshot of what that looks like - and will notice fast if a manager's hands-on hours aren't showing up anywhere in the metrics that matter.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Put a manager in one quadrant of that grid and LeadDev's framing is correct for them. Put the same manager in the opposite quadrant and Ojstersek's warning is the one that applies. Neither report is describing all managers - they're each describing one quadrant and generalizing from it.</p>
<!-- /wp:paragraph -->

<!-- wp:html -->
<figure class="wp-block-image size-large quadrant-figure">
<svg viewBox="0 0 640 500" role="img" aria-labelledby="quadrant-title quadrant-desc" style="width:100%;height:auto;font-family:inherit;">
<title id="quadrant-title">Two axes that explain why the three reports disagree</title>
<desc id="quadrant-desc">A 2 by 2 grid. Horizontal axis: personal style, from "thinks better on the roadmap side" to "thinks better in the code". Vertical axis: org culture, from "rewards hands-on hours" to "rewards proven outcomes". Top-left quadrant, roadmap style with a culture that rewards hands-on hours: labeled Coding as costume, coding time is a credibility performance rather than genuine impact. Top-right quadrant, hands-in-code style with a culture that rewards hands-on hours: labeled LeadDev's comeback, coding fits the person and the company applauds it, matching the report's framing. Bottom-left quadrant, roadmap style with a culture that rewards proven outcomes: labeled Correctly delegating, the manager stays out of the code and the org can see the team's output prove it works. Bottom-right quadrant, hands-in-code style with a culture that rewards proven outcomes: labeled Ojstersek's bottleneck risk, coding time has to keep earning its place against measurable outcomes, or it becomes exactly the trap he warns about.</desc>

<!-- axis labels -->
<text x="320" y="24" text-anchor="middle" font-size="15" font-weight="600" fill="var(--fg,#1a1a1a)">Org culture rewards hands-on hours</text>
<text x="320" y="486" text-anchor="middle" font-size="15" font-weight="600" fill="var(--fg,#1a1a1a)">Org culture rewards proven outcomes</text>
<text x="18" y="255" text-anchor="middle" font-size="15" font-weight="600" fill="var(--fg,#1a1a1a)" transform="rotate(-90 18 255)">Manager thinks better on roadmap side</text>
<text x="622" y="255" text-anchor="middle" font-size="15" font-weight="600" fill="var(--fg,#1a1a1a)" transform="rotate(90 622 255)">Manager thinks better in the code</text>

<!-- grid -->
<g stroke="var(--border,#e5e5e5)" stroke-width="1.5">
<line x1="60" y1="50" x2="580" y2="50" />
<line x1="60" y1="460" x2="580" y2="460" />
<line x1="60" y1="50" x2="60" y2="460" />
<line x1="580" y1="50" x2="580" y2="460" />
<line x1="320" y1="50" x2="320" y2="460" />
<line x1="60" y1="255" x2="580" y2="255" />
</g>

<!-- quadrant fills -->
<rect x="61" y="51" width="258" height="203" fill="var(--code-bg,#f4f4f5)" />
<rect x="321" y="51" width="258" height="203" fill="var(--code-bg,#f4f4f5)" opacity="0.4" />
<rect x="61" y="256" width="258" height="203" fill="var(--code-bg,#f4f4f5)" opacity="0.4" />
<rect x="321" y="256" width="258" height="203" fill="var(--code-bg,#f4f4f5)" />

<!-- top-left: coding as costume -->
<text x="190" y="95" text-anchor="middle" font-size="15" font-weight="700" fill="var(--fg,#1a1a1a)">Coding as costume</text>
<text x="190" y="120" text-anchor="middle" font-size="12.5" fill="var(--muted,#5c5c5c)">
<tspan x="190" dy="0">Credibility performance,</tspan>
<tspan x="190" dy="16">not real impact</tspan>
</text>

<!-- top-right: LeadDev's comeback -->
<text x="450" y="95" text-anchor="middle" font-size="15" font-weight="700" fill="var(--accent,#1d4ed8)">LeadDev's comeback</text>
<text x="450" y="120" text-anchor="middle" font-size="12.5" fill="var(--muted,#5c5c5c)">
<tspan x="450" dy="0">Fits the person,</tspan>
<tspan x="450" dy="16">company applauds it</tspan>
</text>

<!-- bottom-left: correctly delegating -->
<text x="190" y="330" text-anchor="middle" font-size="15" font-weight="700" fill="var(--fg,#1a1a1a)">Correctly delegating</text>
<text x="190" y="355" text-anchor="middle" font-size="12.5" fill="var(--muted,#5c5c5c)">
<tspan x="190" dy="0">Stays out of the code,</tspan>
<tspan x="190" dy="16">outcomes prove it works</tspan>
</text>

<!-- bottom-right: Ojstersek's bottleneck risk -->
<text x="450" y="330" text-anchor="middle" font-size="15" font-weight="700" fill="var(--accent,#1d4ed8)">Ojstersek's bottleneck risk</text>
<text x="450" y="355" text-anchor="middle" font-size="12.5" fill="var(--muted,#5c5c5c)">
<tspan x="450" dy="0">Has to keep earning its place</tspan>
<tspan x="450" dy="16">against measurable outcomes</tspan>
</text>
</svg>
<figcaption>Two axes - personal style and org culture - that explain why LeadDev, Ojstersek, and Jellyfish reach different verdicts from the same underlying shift.</figcaption>
</figure>
<!-- /wp:html -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Where you actually sit</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Two questions, honestly answered, place you on that grid:</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Does coding make you better at the rest of your job, or does it substitute for it?</strong> Track a week. If the hours you spend in the codebase are turning into sharper reviews, better-scoped tickets, and roadmap calls informed by what you actually saw break - that's signal, not vanity. If they're hours where delegation, coaching, or planning quietly didn't happen, that's Ojstersek's bottleneck, no matter how good the commits look.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>If you stopped writing code entirely for a quarter, would anyone with a scorecard notice - and would they notice the right thing?</strong> If your org tracks outcomes the way Jellyfish describes, the answer is either "yes, output dropped" or "no, and that's fine because the team's output didn't move." If your org still equates hands-on time with credibility, the honest answer is "yes, but only because I'd look like I stopped leading" - which is a culture problem dressed up as a performance one, and worth naming as such before you let it set your calendar.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>The question worth asking isn't "should managers code more." It's which of those two answers is actually driving your Tuesday afternoon - and whether you'd make the same call if nobody was counting the commits.</p>
<!-- /wp:paragraph -->
