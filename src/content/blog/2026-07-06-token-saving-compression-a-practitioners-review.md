---
title: "Token Saving & Compression: A Practitioner's Review"
pubDate: 2026-07-06T20:34:15.000Z
permalink: "/2026/07/06/token-saving-compression-a-practitioners-review/"
tags:
  - "caveman"
  - "Graphify"
  - "headroom"
  - "llm"
  - "ponytail"
  - "tokens"
draft: false
---
<!-- wp:paragraph -->
<p>AI coding agents burn tokens on things they don't need to see in full - verbose logs, entire files read for one function, repeated context across turns. A wave of tools now attacks this from different angles: some rewrite noisy output before it reaches the model, some compress what's already in context, some change what the agent generates or reads in the first place. Here is a short survey about the different tools.<br></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>rtk</strong> — <a href="https://github.com/rtk-ai/rtk">github.com/rtk-ai/rtk</a><br>A CLI proxy that hooks into Bash tool calls and rewrites common commands (<code>git status</code>, <code>cargo test</code>, <code>kubectl</code>, etc.) into compact equivalents before output hits context - a noisy <code>git push</code> becomes <code>ok main</code>. Claims 60–90% savings on covered operations, plausible since the approach is narrow and mechanical.<br><em>Watch for:</em> only intercepts Bash calls - native <code>Read</code>/<code>Grep</code> tool usage bypasses it entirely, so real-world savings depend heavily on how your agent works. <em>Best for:</em> teams whose agents lean on shell commands for everything (git, test runners, infra CLIs); less useful if the agent mostly reads files directly.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Caveman</strong> — <a href="https://getcaveman.dev/">getcaveman.dev</a><br>A family of products: a compression skill, a standalone token-budgeted coding agent, a persistent memory layer, and a compression proxy (beta). Claims ~65% token reduction.<br><em>Watch for:</em> thin evidence - the site leans on stars and HN placement rather than a reproducible benchmark; the four products make it unclear which piece drives the number. Best for: teams wanting a single umbrella tool across several angles at once, and willing to validate the number themselves before committing.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Ponytail</strong> — alphamatch.ai/blog/ponytail-ai-coding-skill-2026<br>Attacks generation, not context: forces the model through a "does this need to exist" ladder before writing code, preferring stdlib/native/existing-dependency solutions. Own benchmark shows LOC cut to ~46% of baseline and cost down by 47–77%, but token usage itself drops only by ~16%.<br><em>Watch for</em>: it's solving a different problem than the others — don't expect it to shrink context windows; the win is fewer lines and less rework, not less reading. Best for: codebases with a lot of unnecessary custom code; less relevant if your token spend is mostly context/tool output, not generation.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Headroom</strong> — <a href="https://headroom-docs.vercel.app/docs">headroom-docs.vercel.app/docs</a><br>Compresses everything an agent reads — tool output, file reads, API/DB responses — via type-specific compressors, with a reversible retrieve path back to full detail. Vendor case study: 87.6% fewer input tokens in a log-heavy scenario.<br><em>Watch for</em>: numbers are vendor case studies on scenarios they chose; the retrieval mechanism adds a round trip when the model needs detail back. <em>Best for</em>: agents that use tools heavily against verbose sources (logs, API responses, DB queries); less relevant for short, code-only sessions.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Graphify</strong> — <a href="https://github.com/Graphify-Labs/graphify">github.com/Graphify-Labs/graphify</a><br>Avoids re-reading altogether: builds a local knowledge graph of the codebase, then the agent queries it instead of repeatedly grepping files.<br>Watch for: it's not compression — savings materialize only over a session with repeated lookups in a large, stable codebase; non-code content (docs, PDFs) still requires API calls to extract. Best for: large, mature repos with frequent navigation; little benefit for small projects or one-off tasks.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<figure class="wp-block-table"><table class="has-fixed-layout"><thead><tr><th>Tool</th><th>Mechanism</th><th>What it targets</th><th>Claimed savings</th><th>Evidence</th></tr></thead><tbody><tr><td>rtk</td><td>Rewrites known-noisy CLI output</td><td>Bash tool output only</td><td>60–90% on covered ops</td><td>Vendor, narrow scope</td></tr><tr><td>Caveman</td><td>Compression skill + memory layer + proxy</td><td>Prompts, outputs, cross-turn context</td><td>~65% tokens</td><td>Vendor, thin (stars/HN)</td></tr><tr><td>Ponytail</td><td>Decision ladder before writing code</td><td>Code generation, not context</td><td>~16% tokens; 47–77% cost; 3–6x speed</td><td>Vendor benchmark (5 tasks × 3 models)</td></tr><tr><td>Headroom</td><td>Type-aware compression + reversible cache</td><td>All tool/context input</td><td>87.6% input tokens (case study)</td><td>Vendor case study</td></tr><tr><td>Graphify</td><td>Knowledge graph instead of re-reading files</td><td>Repeated file reads/greps</td><td>Not quantified</td><td>Vendor, mechanism differs from compression</td></tr></tbody></table></figure>
<!-- /wp:table -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity" />
<!-- /wp:separator -->

<!-- wp:paragraph -->
<p><strong>I want more. Can we stack them on one another?</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Each method targets different layers, so most combinations aren't mutually exclusive.</strong> Ponytail acts at generation time (what code gets written), Graphify acts at retrieval time (avoiding re-reads), and rtk/Caveman/Headroom all act at the context-shaping layer, i.e., what enters the prompt. In principle, we can run all method at once without them fighting each other structurally.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Where it gets tricky is the overlap among the context-shaping tools.</strong> rtk and Headroom both intercept and rewrite content before it reaches the model, just at different points - rtk hooks Bash tool calls while Headroom sits more generally across tool outputs, file reads, and API responses. Stacked, we're likely to get diminishing returns rather than additive savings: once rtk has already collapsed a <code>git status</code> to one line, there's little left for Headroom to compress on that same output. Caveman's compression skill/proxy likely overlaps with both in the same way—three tools converging on the same noisy CLI output mostly means redundant passes, not three times the savings. Worse case: extra latency for near-zero extra token reduction.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Ponytail and Graphify are the cleaner additions.</strong> Ponytail's effect is upstream of everything else (less code gets written and read in the first place), so it should compound with anything downstream rather than compete with it. Graphify's effect is about not re-fetching content at all - if the agent never re-reads a file, there's nothing left for rtk/Caveman/Headroom to compress on that read, which sidesteps the overlap problem entirely rather than creating one.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>The more promising stack is probably Ponytail (write less) + Graphify (re-read less) + <em>one</em> of rtk/Caveman/Headroom (compress what's left) — rather than running all three context-shaping tools together, which likely adds overhead with little additional token savings.</p>
<!-- /wp:paragraph -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity" />
<!-- /wp:separator -->

<!-- wp:paragraph -->
<p>Reducing token cost is an issue every firm currently deals with, and it isn't one problem - it's at least three: noisy tool output, unnecessary code generation, and repeated re-reading of the same content. rtk, Caveman, and Headroom all attack the first at different points in the pipeline, with real but overlapping coverage. Ponytail attacks the second, upstream of everything else. Graphify sidesteps the third by building a queryable map instead of re-fetching files. None of these are competing solutions to the same problem so much as partial answers to different pieces of it - which means the right setup is probably a small combination, not a single winner, and probably depends more on where your own token spend actually goes (shell noise vs. generated code vs. repeat lookups) than on any vendor's headline number. All of the figures cited here are self-reported, and the stacking behavior is reasoned from mechanism rather than measured - so treat this as a map of what to test, not a verdict on what to use.<br><br></p>
<!-- /wp:paragraph -->
