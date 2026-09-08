---
title: "4 AWS re:Invent announcment to check"
pubDate: 2025-12-05T21:20:25.000Z
permalink: "/2025/12/05/4-aws-reinvent-announcment-to-check/"
tags:
  - "ai"
  - "aws"
  - "aws lambda"
  - "bedrock"
  - "kiro"
  - "re:invent"
  - "sagemaker"
  - "serverless"
  - "coding agents"
  - "s3"
  - "ec2"
  - "athena"
draft: false
---
<!-- wp:paragraph -->
<p>AWS re:Invent 2025 took place this week, and as always, dozens of announcements were <a href="https://aws.amazon.com/blogs/aws/top-announcements-of-aws-reinvent-2025/">unveiled</a>. At the macro level, announcing Amazon EC2 Trn3 UltraServers for faster, lower-cost generative AI training can make a significant difference in the market, which is primarily biased towards Nvidia GPUs. At the micro-level, I chose four announcements that I find compelling and relevant for my day-to-day.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>AWS Transform custom</strong> - AWS Transform enables organizations to automate the modernization of codebases at enterprise scale, including legacy frameworks, outdated runtimes, infrastructure-as-code, and even company-specific code patterns. The custom agent applies those transformation rules defined in documentation, natural language descriptions, or code samples consistently across the organization's repositories. </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Technical debt tends to accumulate quietly, damaging developer productivity and satisfaction. Transform custom wishes to “crush tech debt” and free up developers to focus on innovation instead. For organizations managing many microservices, legacy modules, or long-standing systems, this could dramatically reduce the maintenance burden and risk and increase employees’ satisfaction and retention over time.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="https://aws.amazon.com/blogs/aws/introducing-aws-transform-custom-crush-tech-debt-with-ai-powered-code-modernization">https://aws.amazon.com/blogs/aws/introducing-aws-transform-custom-crush-tech-debt-with-ai-powered-code-modernization</a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Partially complementary, AWS introduced 2 frontier agents in addition to the already existing <a href="https://kiro.dev/">Kiro</a> agent - </p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li>DevOps agent - an on-call / incident-response agent that integrates across monitoring, code repos, and service tickets to detect root causes and coordinate responses.<br><a href="https://aws.amazon.com/blogs/aws/aws-devops-agent-helps-you-accelerate-incident-response-and-improve-system-reliability-preview/">https://aws.amazon.com/blogs/aws/aws-devops-agent-helps-you-accelerate-incident-response-and-improve-system-reliability-preview/</a></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Security agent - an agent that proactively secures applications throughout the entire development lifecycle by conducting automated design and code reviews, and performing on-demand penetration testing<br><a href="https://aws.amazon.com/blogs/aws/new-aws-security-agent-secures-applications-proactively-from-design-to-deployment-preview/">https://aws.amazon.com/blogs/aws/new-aws-security-agent-secures-applications-proactively-from-design-to-deployment-preview/</a></li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>AWS Lambda Durable Functions</strong> - Durable Functions enable building long-running, stateful, multi-step applications and workflows - directly within the serverless paradigm. Durable functions support a checkpoint-and-replay model: your code can pause (e.g., wait for external events or timeouts) and resume within 1 year without incurring idle compute costs during the pause.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Many real-world use cases, such as approval flows, background jobs, human-in-the-loop automation, and cross-service orchestration, require durable state, retries, and waiting. Previously, these often required dedicated infrastructure or complex orchestration logic. Durable Functions enable teams to build more robust and scalable workflows and reduce overhead.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="https://aws.amazon.com/blogs/aws/build-multi-step-applications-and-ai-workflows-with-aws-lambda-durable-functions">https://aws.amazon.com/blogs/aws/build-multi-step-applications-and-ai-workflows-with-aws-lambda-durable-functions</a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>AWS S3 Vectors (General Availability)</strong> - Amazon S3 Vectors was announced about 6 months ago and is now generally available. This adds native vector storage and querying capabilities to S3 buckets. That is, you can store embedding/vector data at scale, build vector indexes, and run similarity search via S3, without needing a separate vector database. The vectors can be enriched with metadata and integrated with other AWS services for retrieval-augmented generation (RAG) workflows. I think of it as “Athena” for embeddings.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>This makes it much easier and cost-effective for teams to integrate AI/ML features - even if they don’t want to manage a dedicated vector DB and reduces the barrier to building AI-ready data backends.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="https://aws.amazon.com/blogs/aws/amazon-s3-vectors-now-generally-available-with-increased-scale-and-performance">https://aws.amazon.com/blogs/aws/amazon-s3-vectors-now-generally-available-with-increased-scale-and-performance</a></p>
<!-- /wp:paragraph -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity" />
<!-- /wp:separator -->

<!-- wp:paragraph -->
<p><strong>Amazon SageMaker Serverless Customization - Fine-Tuning Models Without Infrastructure</strong> - AWS announced a new capability that accelerates model fine-tuning by eliminating the need for infrastructure management. Teams can upload a dataset and select a base model, and SageMaker handles the fine-tuning pipeline, scaling, and optimization automatically - all in a serverless, pay-per-use model. This customized model can also be deployed using Bedrock for Serverless inference. It is a game-changer, as serving a customized model was previously very expensive. This feature makes fine-tuning accessible to far more teams, especially those without dedicated ML engineers.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="https://aws.amazon.com/blogs/aws/new-serverless-customization-in-amazon-sagemaker-ai-accelerates-model-fine-tuning">https://aws.amazon.com/blogs/aws/new-serverless-customization-in-amazon-sagemaker-ai-accelerates-model-fine-tuning</a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>These are just a handful of the (many) announcements from re:Invent 2025, and they represent a small, opinionated slice of what AWS showcased. Collectively, they highlight a clear trend: Amazon is pushing hard into AI-driven infrastructure and developer automation - while challenging multiple categories of startups in the process.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>While Trn3 UltraServers aim to chip away at NVIDIA’s dominance in AI training, the more immediate impact may come from the developer- and workflow-focused releases. Tools like Transform Custom, the new frontier agents, and Durable Functions promise to reduce engineering pain - if they can handle the real, messy complexity of enterprise systems. S3 Vectors and SageMaker Serverless Customization make it far easier to adopt vector search and fine-tuning without adding a new operational burden.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->
