---
title: "Learn in Public - week 02"
pubDate: 2026-01-14T10:34:54.000Z
permalink: "/2026/01/14/learn-in-public-week-02/"
tags:
  - "aws"
  - "bedrock"
  - "finops"
  - "LearnInPublic"
draft: false
---
<!-- wp:paragraph -->
<p>I started this week with <a href="https://www.deeplearning.ai/short-courses/semantic-caching-for-ai-agents/">deeplearning.ai’s course on semantic caching</a>, created in collaboration with Redis. That sent me down a rabbit hole, exploring different LLM caching strategies and the products that support them.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>One such product is AWS Bedrock Prompt Caching. If large parts of your prompts are static (specifically, the prefixes), retokenizing the prefix on every request is a waste of time and money. Prompt or context caching lets you process the prefix once and store it, reducing costs and improving performance.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Sounds great, right? Let's check the pricing mode. If your requests are more than 5 minutes apart, your cache will be cleared. If your requests are short, caching won’t be activated; if the cache hit rate is low, you will pay an extra, non-usage-based premium for cache writes. I highly recommend reading the “How Much Does Bedrock Prompt Caching Cost?” section in the article “<a href="https://newsletter.simpleaws.dev/p/amazon-bedrock-prompt-caching">Amazon Bedrock Prompt Caching</a>”.</p>
<!-- /wp:paragraph -->
