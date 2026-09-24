---
title: "The State Of Computer Use - September 2026"
pubDate: 2026-09-24T09:00:00.000Z
permalink: "/2026/09/24/the-state-of-computer-use-september-2026/"
heroImage: "/wp-content/uploads/2026/09/the-state-of-computer-use-hero.png"
heroImageAlt: "Mondrian-style pop-art illustration of a laptop with colored blocks representing a computer-use agent interface"
description: "a16z's field data on computer-use agents, who sells what as the category consolidates into existing products, how it's benchmarked, and where it fits in testing and automation."
tags:
  - "ai"
  - "agents"
  - "computer-use"
  - "llm"
draft: false
---
<!-- wp:paragraph -->
<p>Computer use means an agent that looks at the screen, moves the mouse and types, so it can work with software that has no API: legacy portals, desktop apps, internal tools. It's the fallback for everything a structured integration can't reach - and in August, a16z published a <a href="https://a16z.com/can-agents-use-a-computer-yet-weve-got-the-data/">field report</a>, drawn from interviews and usage data across their portfolio, on how well that fallback actually holds up in production. Their finding: real but narrow. Standardized back-office work on legacy systems - updating records, moving data through portals, processing IT tickets - is where it earns its keep; one data platform in the report runs 15-20M automated portal interactions a month, using agents as a self-healing fallback when a hand-written scraper breaks. The rest of this post walks through what that means: what works and what doesn't, how the capability is benchmarked, who's selling it, and where it's heading next.</p>
<!-- /wp:paragraph -->

<!-- wp:embed {"url":"https://www.youtube.com/watch?v=hav6hPF7LCE","type":"video","providerNameSlug":"youtube","responsive":true,"className":"wp-embed-aspect-16-9 wp-has-aspect-ratio"} -->
<figure class="wp-block-embed is-type-video is-provider-youtube wp-block-embed-youtube wp-embed-aspect-16-9 wp-has-aspect-ratio"><div class="wp-block-embed__wrapper">
<iframe width="100%" height="420" src="https://www.youtube.com/embed/hav6hPF7LCE" title="Computer Use: How AI agents can automate almost anything" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div></figure>
<!-- /wp:embed -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">What works, and what doesn't</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>What works - the same trait that makes computer use a fallback for missing APIs - is that it exercises software the way a user actually does, through the same UI, rather than through a test harness or integration that can drift out of sync with the app. What doesn't work is anything where success is hard to verify. An agent files an insurance claim, sees "received" and moves on - and nobody learns the policy number was wrong until a phone call two days later. Agents are also slower than people (8-10 minutes for a task a person does in 2-3), and a16z's rough estimate is $6-8 per hour of agent time. The rule of thumb from the field report: this only works where a machine can check the result.</p>
<!-- /wp:paragraph -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity" />
<!-- /wp:separator -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">How computer use gets benchmarked</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><a href="https://leaderboard.steel.dev/leaderboards/osworld/">OSWorld</a> is the benchmark most of the field cites: 369 tasks run inside a real Ubuntu VM - not a simulator - covering office apps, browsers, files, and terminal work, with each task graded by a script that inspects the final machine state rather than the agent's own report of what it did. The human baseline is around 72%. As of September 2026 the top scorers are Qwen3.8-Max at 86.1% and Anthropic's Claude Mythos models close behind at 85.4% and 85.0%, with GPT-5.4 at 75.0% - all now past the human baseline on this particular task set, though the leaderboard's own guidance warns that scores aren't directly comparable across entries because harness, attempt budget, and tool access vary. Cua runs a harder, narrower test: <a href="https://cua.ai/cuabench">CUA Bench</a> scores agents on real KiCad electronics-design tasks, where the best frontier agent currently clears 6 of 25. The gap between the two says most of what you need to know: agents are strong at well-defined office workflows and weak at anything resembling expert tool use.</p>
<!-- /wp:paragraph -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity" />
<!-- /wp:separator -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Which products are out there?</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>The clearest trend in the market: computer use is becoming a feature of products you already use, not a product on its own. OpenAI's Operator, Google's Project Mariner and ChatGPT Atlas were each retired as standalone surfaces within the past year, and their capabilities folded into ChatGPT, Chrome and Codex instead. Meanwhile open-source infrastructure like <a href="https://github.com/trycua/cua">Cua</a> passed 23,000 GitHub stars. Nobody wants to open a separate app for this - they want it built into the tools they already have open.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Claude</strong> - Computer use in the Claude desktop app and Claude Code, launched in March 2026 as a research preview, with Dispatch to send tasks from your phone. Also available as Claude in Chrome. Built for supervised work with approval prompts at each step. <a href="https://www.anthropic.com/news/claude-computer-use">Claude computer use</a> · <a href="https://www.anthropic.com/claude/dispatch">Dispatch</a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>ChatGPT</strong> - After Operator, ChatGPT agent and Atlas, OpenAI <a href="https://help.openai.com/en/articles/20001371-evolving-atlas-into-chatgpt-for-browser-based-agentic-work">moved browser-based agent work</a> into the ChatGPT desktop app, a Chrome extension and Codex. Enterprise admins can restrict which websites and desktop apps the agent may touch.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Gemini</strong> - Google's answer is distribution: the capability lives in Chrome auto browse and Gemini Spark, which can <a href="https://9to5google.com/2026/07/30/gemini-spark-chrome-auto-browse/">use your desktop Chrome</a> with logged-in accounts and asks you to approve payments - Google's help page says you're responsible for the agent's actions, purchases included. Google is also pushing WebMCP so sites can talk to agents directly instead of being clicked through.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>UI-TARS Desktop and Agent S</strong> - ByteDance's <a href="https://themenonlab.blog/blog/ui-tars-desktop-open-source-gui-agent">UI-TARS</a> ships open weights, a desktop app and a CLI that work from pixels alone. Agent S3 <a href="https://github.com/feder-cr/AIHawk/wiki/computer-use-agent-open-source">claims 72.6%</a> on OSWorld - a self-reported number, and you run the whole stack yourself.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong><a href="https://github.com/trycua/cua">Cua</a></strong> - Not an agent but the computer you give one. Four pieces, all MIT licensed: Driver (an MCP server and CLI that lets an agent operate native apps on macOS, Windows and Linux in the background, without taking over your cursor), Fleets (isolated cloud desktops), Lume (local macOS and Linux VMs on Apple Silicon) and <a href="https://cua.ai/cuabench">Bench</a> (tasks, evaluation and trajectory export for training). You bring the agent and the model; Fleet pools can keep billing after a claim ends, and a few optional packages carry AGPL dependencies.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Browser infrastructure</strong> - For web-only work, managed browsers from vendors like <a href="https://www.browserbase.com/">Browserbase</a> and <a href="https://steel.dev/">Steel</a>, plus harnesses like <a href="https://browser-use.com/">Browser Use</a>, are usually the better tool. Driving a browser by pixels costs more tokens and misclicks silently when the page has structure you could have used.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Also worth knowing: the training and evaluation side is now a product category too. CUA Bench and OSWorld measure agents, and a16z lists startups such as <a href="https://www.mechanize.work/">Mechanize</a>, <a href="https://www.rl-list.com/">Habitat</a> and <a href="https://siliconangle.com/2026/07/09/mercor-buys-deeptune-build-training-environments-ai-agents/">Deeptune</a> (acquired by Mercor in July) building the reinforcement-learning environments underneath the frontier models.</p>
<!-- /wp:paragraph -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity" />
<!-- /wp:separator -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Testing and automation</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>One concrete place all of this lands: testing and internal automation. The same trait that makes computer use a fallback for missing APIs makes it useful for QA - it exercises software the way a user actually does, through the same UI, rather than through a test harness or integration that can drift out of sync with the app.</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li><strong>Self-healing end-to-end tests</strong> - instead of a brittle selector breaking every time a component is renamed, an agent locates the element by what it looks like or says, the same way a human tester would. This is the pitch behind tools like <a href="https://www.virtuosoqa.com/post/agent-based-ai-reshaping-software-testing">Virtuoso QA</a> and <a href="https://testrigor.com/ai-agents-in-software-testing/">testRigor</a>.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Exploratory testing</strong> - point an agent at a staging build with a goal ("try to check out with an expired coupon") instead of a fixed script, and let it wander the way a human QA engineer would when hunting for edge cases.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Legacy and desktop app coverage</strong> - most testing infrastructure targets the web. Computer use is one of the few ways to script a native desktop app or an old internal tool that was never built with automation in mind - which is exactly the case Cua Driver targets, and why giving a coding agent a real desktop to test against is one of its stated use cases.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Cross-app workflow automation</strong> - the same 15-20M-interactions-a-month pattern from a16z's field report applies to internal ops: an agent moving data between a legacy portal and a spreadsheet, filing tickets, or reconciling records across systems that don't share an API.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>The catch carries over from the field report: this only works where a machine can check the result. A test that asserts "the checkout page shows an error" is verifiable; a test that asserts "the UI felt right" is not. Scope agent-driven testing to outcomes you can assert on, and keep a human in the loop for anything you can't.</p>
<!-- /wp:paragraph -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity" />
<!-- /wp:separator -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Where this is going</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>The clicking itself is becoming a commodity. What buyers in a16z's interviews paid for was everything around it: verification, escalation and error handling. The pattern to watch is agents that run a workflow once, cache it as deterministic code, and call the model back only when something breaks. Cost per run then falls over the life of the workflow.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>My guesses for 2027, none of them measured: more standalone agents fold into desktop apps, as Atlas and Mariner did. Background input and structured interfaces like WebMCP reduce how often agents need screenshots at all. And the approval and audit layer becomes a product of its own - the same way AI gateways did, and we have already seen those get acquired: <a href="https://tsgpayments.com/stripe-acquires-openrouter-for-7b-turning-model-routing-into-a-payments-infrastructure-problem/">Stripe's reported $7B+ acquisition of OpenRouter</a> and <a href="https://www.paloaltonetworks.com/company/press/2026/palo-alto-networks-completes-acquisition-of-portkey-to-secure-ai-agents">Palo Alto Networks' acquisition of Portkey</a>.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>If you are evaluating this now, start with bounded tasks where a machine can check the result, run the agent in an isolated environment with scoped credentials, and keep the model swappable.</p>
<!-- /wp:paragraph -->
