---
title: "Few thoughts on Cloud FinOps Book"
pubDate: 2023-06-05T08:29:42.000Z
permalink: "/2023/06/05/few-thoughts-on-cloud-finops-book/"
tags:
  - "aws"
  - "cloud"
  - "finops"
  - "cloudfront"
draft: false
---
<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>I just completed “<a href="https://www.finops.org/community/finops-book/">Cloud FinOps</a>” book by J.R. Storment and Mike Fuller, and here are a few thoughts -</p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li>At first, I wondered whether I should read the 1st edition, which I had easy access to, or the 2nd, which I had to buy. After reading a sample, I decided to buy the 2nd edition and am glad. This domain and community move quickly; a 2019 version would have been outdated and misleading.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>FinOps involves a paradigm shift - developers should consider not only the performance of their architecture (i.e., memory and CPU consumption, speed, etc.) but the cost associated with the resources they will use. Procurement is not done and approved by the finance team anymore. Developers’ decisions can have a significant influence on the cloud bill. FinOps teams bridge the engineering and finance teams (and more) and speak the language of all parties, along with additional skill sets and an overview of the entire organization.&nbsp;</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>A general rule of thumb regarding commitments -<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li>Longer commitment period (3 years → 1 year) = lower price (higher discount)</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>More upfront (full upfront → partial upfront → no upfront )= lower price (higher discount)</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>More specific (RI → Convertible RI → SP, region, etc.) = lower price (higher discount)</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list --></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>The FinOps team should be up-to-date about the new cloud technologies updates and cost reduction options. I have been familiar with reserve and spot instances for a long time, but there are many other cost reduction options bits and bytes to pay attention to. For example, the following 2 points -<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li>When purchasing saving plans (SP), which are monetary as appose to resource units commitments, the spend amount you commit to is post discount. Moreover, AWS will apply the SP to the resources that yield the highest discount. This implies that the discount rate diminishes when committing to more money.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>CloudFront security savings bundle (<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/savings-bundle.html">here</a>) is a saving plan that ties together the usage of CloudFront and WAF. The book predicts that such plans, e.g., combining multiple product usage, will become common soon.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list --></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Commitments (e.g., SP, RI) are one of many ways to reduce costs. Removing idle resources (e.g., unattached drives), using correct storage classes (e.g., infrequent access, glacier), or making architecture changes (e.g., rightsizing, moving from servers to serverless, going via VPC endpoints, etc.) can help avoid and reduce cost. Those activities can happen in parallel - centralized FinOps team to manage commitments (aka cost reduction) and decentralized engineering teams optimize the resources they use (aka cost avoidance). Ideally, it is a tango. Each team moves a little step at a time to optimize their part.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>The FinOps domain-specific knowledge goes even further. For example, costs that engineers tend to miss or wrongly estimate e.g. network traffic cost, number of events, data storage events.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>The inform phase is part of the FinOps lifecycle - making the data available to the relevant participants. The Prius effect, i.e., real-time feedback, instantly influences behavior even without explicit recommendations or guidance. Visualizations (done right) can help understand and react to the data better. A point emphasized multiple times in the book - put the data in the path of the engineers or any other stakeholder. Don’t ask them to log in to a different system to review the data; integrate with existing systems they use regularly.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>Few resources I find helpful - </p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li>FinOps foundation website - includes many resources and community knowledge - <a href="https://www.finops.org/introduction/what-is-finops/">https://www.finops.org/introduction/what-is-finops/</a></li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:list {"ordered":true,"start":2} -->
<ol start="2"><!-- wp:list-item -->
<li>FinOps podcast - <a href="https://www.finops.org/community/finops-podcast/">https://www.finops.org/community/finops-podcast/</a></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Infracost lets engineers see a cost breakdown and understand costs before making changes in the terminal, VS Code, or pull requests. <a href="https://www.infracost.io/">https://www.infracost.io/</a></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Cloud Custodian - “Cloud Custodian is a tool that unifies the dozens of tools and scripts most organizations use for managing their public cloud accounts into one open source tool” - <a href="https://cloudcustodian.io/">https://cloudcustodian.io/</a></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>FinOut - A Holistic Cost Management Solution For Your Cloud. I recently participated in a demo and that looks super interesting. <a href="https://www.finout.io/">https://www.finout.io/</a></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Startup guide to data cost optimization - my post summarizing AWS’s ebook about data cost optimization for startups - <a href="https://tomron.net/2023/06/01/startup-guide-to-data-cost-optimization-summary/">https://tomron.net/2023/06/01/startup-guide-to-data-cost-optimization-summary/</a></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Twitter thread I wrote in Hebrew about the book - <a href="https://twitter.com/tomron696/status/1657686198327062529">https://twitter.com/tomron696/status/1657686198327062529</a></li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->
