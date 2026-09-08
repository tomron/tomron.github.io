---
title: "AI, Paradigm Shifts, and the Future of Building Companies"
pubDate: 2025-08-25T14:09:52.000Z
permalink: "/2025/08/25/ai-paradigm-shifts-and-the-future-of-building-companies/"
tags:
  - "ai"
  - "engineering management"
  - "leadership"
  - "kuhn"
  - "llm"
  - "technology"
draft: false
---
<!-- wp:paragraph -->
<p>Over the past few months, I have been constantly reading conversations about how Generative AI will reshape software engineering. On LinkedIn, Twitter, or in closed professional groups, engineers and product leaders debate how tools like Cursor, GitHub Copilot, or automated testing frameworks will impact the way software is built and teams are organized.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>But the conversation goes beyond just engineering practices. If we zoom out, AI will not only transform the workflows of software teams but also the structure of companies and even the financial models on which they are built. This kind of change feels familiar - it echoes a deeper historical pattern in how science and technology evolve.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading"><strong>Kuhn’s Cycle of Scientific Revolutions</strong></h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>During my bachelor’s, I read Thomas Kuhn’s <em>The Structure of Scientific Revolutions.</em> Kuhn argued that science does not progress in a linear, step-by-step manner. Instead, it moves through cycles of stability and disruption. The <strong>Kuhn Cycle</strong><sup data-fn="aa50f6d7-6eed-444d-9a80-687f0dcc7013" class="fn"><a href="#aa50f6d7-6eed-444d-9a80-687f0dcc7013" id="aa50f6d7-6eed-444d-9a80-687f0dcc7013-link">1</a></sup>, as reframed by later scholars, breaks this process into several stages:</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":2008,"sizeSlug":"large","linkDestination":"media","align":"right"} -->
<figure class="wp-block-image alignright size-large"><a href="/wp-content/uploads/2025/08/kuhncycle_basiccycle.png"><img src="/wp-content/uploads/2025/08/kuhncycle_basiccycle.png" alt="" class="wp-image-2008" /></a></figure>
<!-- /wp:image -->

<!-- wp:list {"ordered":true} -->
<ol class="wp-block-list"><!-- wp:list-item -->
<li><strong>Pre-science</strong> - A field without consensus; multiple competing ideas.<br></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Normal Science</strong> - A dominant paradigm sets the rules of the game, guiding how problems are solved.<br></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Model Drift</strong> - Anomalies accumulate, and cracks in the model appear.<br></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Model Crisis</strong> - The old framework fails; confidence collapses.<br></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Model Revolution</strong> - New models emerge, challenging the old order.<br></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Paradigm Change</strong> - A new model wins acceptance and becomes the new normal.<br></li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading"><strong>The Kuhn Cycle Applied to Software Development</strong></h3>
<!-- /wp:heading -->

<!-- wp:heading {"level":4} -->
<h4 class="wp-block-heading"><strong>Normal Science</strong></h4>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>For decades, software engineering has operated under a shared set of practices and beliefs:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li><strong>Clean Code &amp; Best Practices</strong> - DRY, SOLID, Unit Testing, Peer Reviews.<br></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Agile &amp; Scrum</strong> - Iterative sprints and ceremonies as the “right” way to build products.<br></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>DevOps &amp; CI/CD</strong> - Automation of builds, deployments, and testing.<br></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Organizational Structure</strong> – Specialized roles (frontend, backend, QA, DevOps, PM) and a belief that more engineers equals more output.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>The underlying assumption is <em>hire more engineers + refine practices → better and quicker software</em>.</p>
<!-- /wp:paragraph -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity" />
<!-- /wp:separator -->

<!-- wp:heading {"level":4} -->
<h4 class="wp-block-heading"><strong>Model Drift</strong></h4>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Over time, cracks began to show.</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li>The <strong>talent gap</strong> - demand for software far outstrips available developers.<br></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Velocity mismatch</strong> - Agile rituals can’t keep pace with market demands.<br></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Complexity overload</strong> - Microservices and massive codebases create systems that are too complex for a single person to comprehend fully.<br></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Knowledge silos</strong> - onboarding takes months, and institutional knowledge remains fragile.<br></li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>These anomalies signaled that “hire more engineers and improve processes” was no longer a sustainable model.</p>
<!-- /wp:paragraph -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity" />
<!-- /wp:separator -->

<!-- wp:heading {"level":4} -->
<h4 class="wp-block-heading"><strong>Model Crisis</strong></h4>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>The strain became obvious:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li>Even tech giants with thousands of engineers struggle with code sprawl and coordination overhead.<br></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Brooks’ Law bites - adding more people to a project often makes it slower.<br></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Business pressure grows - leaders demand faster iteration, lower costs, and higher adaptability than human-only teams can deliver.<br></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Early AI tools, such as GitHub Copilot and ChatGPT, reveal something provocative - machines can generate boilerplate, tests, and documentation in seconds - tasks once thought to be unavoidably human.<br></li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>This is where many organizations sit today - patching the old paradigm with AI, but without a coherent new model.</p>
<!-- /wp:paragraph -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity" />
<!-- /wp:separator -->

<!-- wp:heading {"level":4} -->
<h4 class="wp-block-heading"><strong>Model Revolution</strong></h4>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>A new way of working begins to take shape. Here are some already visible in experimenting, we can all see around us - </p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li><strong>AI-first engineering</strong> - using AI agents for scaffolding code, generating tests, or refactoring large systems. Humans act as curators, reviewers, and high-level designers.<br></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Smaller, AI-augmented teams</strong><br></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>New roles and workflows</strong> - QA shifts toward system-level validation; PMs focus less on ticket grooming and more on problem framing and prompting.<br></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Org structures evolve</strong> - less siloing by specialization, more “AI-augmented full-stack builders.”<br></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Economics shift</strong> - productivity is no longer headcount-driven but iteration-driven. Cost models change when iteration is nearly free.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity" />
<!-- /wp:separator -->

<!-- wp:heading {"level":4} -->
<h4 class="wp-block-heading"><strong>Paradigm Change</strong></h4>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>In the coming years, some of the ideas above, and probably additional ideals, could stabilize as the “normal science” of software development and organizational building. But we are not yet there. Once we get there, today’s experiments will feel as obvious as Agile sprints or pull requests do now.</p>
<!-- /wp:paragraph -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity" />
<!-- /wp:separator -->

<!-- wp:paragraph -->
<p>We are in the midst of <strong>model drift tipping into crisis</strong>, with glimpses of revolution already underway. Kuhn’s lesson is that revolutions are not just about better tools - they’re about shifts in worldview. For AI, the shift might be that companies will no longer be limited by headcount and manual processes but by their ability to <strong>ask the right questions, frame the correct problems, and adapt their models of value creation</strong>.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>We are moving toward a future where the shape of companies, not just their software stacks, will look radically different, and that’s an exciting era to be a part of.</p>
<!-- /wp:paragraph -->

<!-- wp:footnotes /-->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->
