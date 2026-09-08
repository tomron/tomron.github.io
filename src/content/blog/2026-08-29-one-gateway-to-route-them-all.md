---
title: "One Gateway to Route Them All"
pubDate: 2026-08-29T20:03:23.000Z
permalink: "/2026/08/29/one-gateway-to-route-them-all/"
tags:
  - "ai gateway"
  - "bitfrost"
  - "cloudflare"
  - "litellm"
  - "llm"
  - "openrouter"
  - "portkey"
draft: false
---
<!-- wp:paragraph -->
<p>In August, Stripe announced it had agreed to acquire OpenRouter — reportedly for more than $7 billion, per <a href="https://tsgpayments.com/stripe-acquires-openrouter-for-7b-turning-model-routing-into-a-payments-infrastructure-problem/">Bloomberg</a>. OpenRouter helps businesses route and optimize token usage across 400+ models from more than 80 providers, and it fits alongside the token-billing work Stripe has been shipping for a year. Earlier in 2026, <a href="https://www.paloaltonetworks.com/company/press/2026/palo-alto-networks-completes-acquisition-of-portkey-to-secure-ai-agents">Palo Alto Networks bought Portkey</a> to anchor its Prisma AIRS platform.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>The layer in question is the AI gateway: a single service that sits between your application and every model provider you call. Your code talks to the gateway; the gateway talks to OpenAI, Anthropic, Google, Bedrock, or whatever open-weight model you're hosting yourself. If your team calls more than one provider, you've probably built some version of this already, even if you didn't call it that. It usually starts as a thin wrapper around an API client, then grows into something bigger once you realize you can't answer basic questions like "how much did we spend on GPT-5 last week" or "what happens when Anthropic has an outage." A gateway turns that ad-hoc wrapper into infrastructure. Four reasons it's worth doing deliberately:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li><strong>Unified access</strong> - One API, one auth scheme, many models. Instead of maintaining separate SDKs and error-handling paths for OpenAI, Anthropic, Google, and whatever open-weight model your ML team is experimenting with this month, you integrate once and swap models by changing a string - instead of migrating twelve call sites when a provider deprecates an endpoint.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Cost observability and savings</strong> - The gateway sits in the one place that sees every request, making it the natural home for spend attribution by team, project, or feature - and for caching, routing to cheaper models, and budget enforcement.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Compliance</strong> - Once you have that central choke point, you can enforce data residency, redact PII before it leaves your network, log everything for audit, and apply guardrails consistently instead of per-integration.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Business continuity</strong> - the gateway already knows about every provider; it's the natural place to build fallbacks - if Anthropic degrades, silently retry on OpenAI or a self-hosted model, instead of your product going down with the provider.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:image {"id":2190,"sizeSlug":"large","linkDestination":"media"} -->
<figure class="wp-block-image size-large"><a href="/wp-content/uploads/2026/08/untitled-diagram-2026-08-29-173307.png"><img src="/wp-content/uploads/2026/08/untitled-diagram-2026-08-29-173307.png" alt="" class="wp-image-2190" /></a></figure>
<!-- /wp:image -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity" />
<!-- /wp:separator -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Which products are out there?</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><a href="https://openrouter.ai/"><strong>OpenRouter</strong></a> -The household name: a hosted marketplace fronting 400+ models from 80+ providers, with automatic routing between providers serving the same model when one degrades. Breadth and zero setup are the pitch — one API key, immediate access to essentially everything worth calling, per-provider fallback included. Pricing is pass-through on tokens with a flat fee on credit purchases, around 5.5% on card, cheaper via BYOK. Interesting to watch whether the fee or business model changes once it becomes a Stripe subsidiary.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="https://www.litellm.ai/"><strong>LiteLLM</strong></a> - The opposite bet: an open-source proxy you run yourself, OpenAI-compatible across 100+ providers, no vendor in your request path and no markup — you pay providers directly. You get control: your VPC, your logs, your keys, free core routing and failover. You also get the ops - the Kubernetes deployment, the database behind spend tracking, etc. Open-core pricing: free to self-host; Enterprise adds SSO, RBAC, and audit logs.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong><a href="https://developers.cloudflare.com/ai-gateway">Cloudflare AI Gateway</a></strong> - Rides the edge network that already terminates much of the internet's traffic, so the pitch is proximity and operational simplicity rather than model breadth: caching, rate limiting, logging, and guardrails close to your users, obtained by pointing your existing SDK at a new base URL. Dashboard analytics, caching, and rate limiting are free on all plans; persistent logs are across every tier; and it now supports OpenAI, Anthropic, and Responses-compatible endpoints. No markup on inference - a 5% fee applies only if you route third-party model spend through Cloudflare's Unified Billing instead of bringing your own keys. Strongest if you're already on Cloudflare; weakest if you need the deepest guardrail and compliance tooling.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong><a href="https://portkey.ai">Portkey</a></strong> - gateway as security control plane. Routing was never the whole product = observability, a prompt store, and governance guardrails came bundled, aimed at enterprises that need policy enforcement as much as uptime. That's what Palo Alto Networks bought in May, folding it in as the foundational gateway under Prisma AIRS, on the argument that once agents act autonomously, the gateway is the last place you can inspect a bad decision before it executes. Pricing is usage-based on logged requests, with retention gated by tier. Built from the ground up for governing what agents are allowed to do, not just which model answers.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong><a href="https://getmaxim.ai/bifrost">Bifrost</a> </strong>- an open-source gateway written in Go by Maxim AI, unifying 1,000+ models across 23+ providers behind one OpenAI-compatible API. Benchmarked at roughly 11 microseconds of overhead per request at 5,000 RPS. Covers the same ground as the rest - automatic failover, adaptive load balancing across keys and providers, semantic caching, hierarchical budgets, native MCP for agentic tool use - and plugs into Maxim's evaluation and observability platform. Open-core: OSS gateway free and self-hosted; Enterprise adds private networking, security integrations, and support.</p>
<!-- /wp:paragraph -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity" />
<!-- /wp:separator -->

<!-- wp:paragraph -->
<p>If you don't have a gateway yet, you'll probably want one soon. What pushes you there varies - a finance question, an outage, a compliance review, etc. Whichever reason gets you to build it, you tend to pick up the rest on the way, because they all live in the same place: once every request passes through one service, spend attribution, failover, and PII redaction stop being separate projects. And as with everything else in software, what you should protect is your ability to leave. The gateway exists to keep you from being locked into a single model provider, so don't trade it for getting locked into the gateway instead. Ideally, switching from one to another is a base URL change and nothing more.</p>
<!-- /wp:paragraph -->
