---
title: "The Bread Got Thicker"
description: "AI agents didn't remove the work of building software, they moved it. Less time writing code, more time planning before and reviewing after."
pubDate: 2026-11-02T09:00:00.000Z
permalink: "/2026/11/02/the-developer-sandwich/"
heroImage: "/wp-content/uploads/2026/11/brain_sandwich.png"
heroImageAlt: "A cartoon sandwich with a pink brain as the filling between two slices of toast and lettuce"
tags:
  - "ai"
  - "llm"
  - "software engineering"
  - "coding agents"
  - "engineering culture"
draft: true
scheduledPublish: true
---

<!-- wp:paragraph -->
<p>Matheus Lima's <a href="https://terriblesoftware.org/2026/10/02/the-brain-sandwich">Brain Sandwich</a> describes working with AI as think first, delegate, then think again. It maps neatly onto how I see the developer role changing. For most of my career, the time split looked like this: a thin slice of planning at the start, a thick middle of writing code, and whatever testing the schedule allowed at the end. Implementation was the bulk of the job, so it was also where most of the hours went. Planning was often rushed because the clock was already running, and testing got squeezed because the deadline was close.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>With coding agents, the middle layer shrinks and the two outer layers grow. The valuable up-front work is understanding the problem, the complexity, the architecture and the trade-offs well enough to tell an agent what to build and, just as important, what not to. An agent will happily implement a vague idea or a wrong design, quickly and with confidence. Everything I skip before handing off comes back later as rework.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>The back end changes even more. When I wrote the code myself, I understood it by default, and review and testing were a safety net on top. Now they are how I come to understand it at all. I read the diff, question whether the complexity is justified, and test the behavior, including the edge cases the agent never thought about. This is also where a team's quality gets decided, because generating code is cheap and being confident in it is not. The sandwich got a lot of bread, and the filling is the part we outsourced.</p>
<!-- /wp:paragraph -->
