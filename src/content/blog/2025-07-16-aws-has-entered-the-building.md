---
title: "AWS has entered the building"
pubDate: 2025-07-16T20:01:00.000Z
permalink: "/2025/07/16/aws-has-entered-the-building/"
tags:
  - "aws"
  - "kiro"
  - "llm"
  - "s3 vectors"
  - "strand agents"
draft: false
---
<!-- wp:paragraph -->
<p>AWS has released several notable announcements within the LLM ecosystem over the last few days.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="https://aws.amazon.com/blogs/aws/introducing-amazon-s3-vectors-first-cloud-storage-with-native-vector-support-at-scale/"><strong>Introducing Amazon S3 Vectors (preview)</strong></a> - Amazon S3 Vectors is a durable, cost-efficient vector storage solution that natively supports large-scale AI-ready data with subsecond query performance, reducing storage and query costs by up to 90%.<br><br>Why I find it interesting - </p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol class="wp-block-list"><!-- wp:list-item -->
<li>Balancing cost and performance - i.e., storing on a database is more expensive but yields better results. If you know what the "hot vectors" are, you can store them in the database and store the rest in S3.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Designated buckets - it started with&nbsp;<a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-tables.html" target="_blank" rel="noreferrer noopener">table buckets</a>&nbsp;and has now evolved to vector buckets. Interesting direction.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><a href="https://kiro.dev/"><strong>Launch of Kiro</strong></a> - the IDE market is on fire with OpenAI’s acquisition falling apart, Claude code and cursor competition, and now Amazon reveals Kiro with the promise - "helps you do your best work by bringing structure to AI coding with spec-driven development"</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Why I find it interesting - </p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol class="wp-block-list"><!-- wp:list-item -->
<li>At first, I wondered why AWS entered this field, but I assume it is a must-have these days, and might lead to higher adoption of their models or Amazon Q.  </li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>The different IDEs and CLI tools are influenced by each other so it will be interesting to see how a new player influences this space.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><span style="margin: 0px;padding: 0px"><a href="https://aws.amazon.com/blogs/opensource/introducing-strands-agents-1-0-production-ready-multi-agent-orchestration-made-simple/" target="_blank"><strong>Strand agents are now at v1.0.0</strong></a> - Strand Agents are an AWS open-source SDK that enables building and running AI agents across multiple environments and models, with many pre-built tools that are easy to use.</span></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Why I find it interesting - </p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol class="wp-block-list"><!-- wp:list-item -->
<li>The bedrock agents interface was limiting for a production-grade agent, specifically in terms of deployment modes, model support, and observability. Strand agents open many more doors.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>There are many agent frameworks out there (probably two more were released while you read this post). Many of them experience different issues when working with AWS Bedrock. If you are using AWS as your primary cloud provider, it should be a leading candidate.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->
