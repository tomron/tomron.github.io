---
title: "Startup guide to data cost optimization - summary"
pubDate: 2023-06-01T12:44:29.000Z
permalink: "/2023/06/01/startup-guide-to-data-cost-optimization-summary/"
tags:
  - "aws"
  - "data strategy"
  - "finops"
draft: false
---
<!-- wp:paragraph -->
<p>I read a lot about FinOps and cloud cost optimization those days and I came across AWS short ebook about <a href="https://pages.awscloud.com/global-ln-gc-600-sup-guide-data-cost-opt-learn.html?trk=84c75421-1235-4d6e-b008-fc13568796ce&amp;sc_channel=el">data cost optimization</a>.&nbsp;</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Cost optimization is part of AWS’s <a href="https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html">well-architected framework</a>. When we think about cost optimization, we usually only consider computing resources, while there are significant optimizations that can go beyond that - storage optimization, network, etc.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Below is a combination of the six sections that appear in the e-books with some comments -</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Optimize the cost of information infrastructure</strong> - the main point in this section is to use Graviton instances where applicable.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Decouple storage data from compute data </strong>- 5 suggestions here which are pretty standard -</p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li>Compress data when applicable, and use optimal data structures for your task.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Consider data temperature when choosing data store and storage class - use the suitable s3 storage class and manage it using a life-cycle policy.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Use low-cost compute resources, such as Spot Instances, when applicable - I have some dissonance here since I’m not sure that spot instances are attractive those days (see <a href="https://pauley.me/post/2023/spot-price-trends/">here</a>), specifically with the overhead of taking care of preempted instances.&nbsp;</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Deploy compute close to data to reduce data transfer costs - trivial.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Use Amazon S3 Select and Amazon S3 Glacier Select to reduce data retrieval - Amazon S3 Select has several limitations (see <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/selecting-content-from-objects.html">here</a>), so I’m not sure it is worth the effort and better query via Athena.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>Plan and provision capacity for predictable workload usage</strong></p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li>Choosing the right instance type based on workload pattern and growth  - is common sense. You'll save a little less if you purchase convertible reserve instances. However, in a fast-changing startup environment, there is a higher chance the commitment won’t be underutilized.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Deploying rightsizing based on average or medium workload usage - this contradicts best practices described in <a href="https://www.amazon.com/Cloud-FinOps-Collaborative-Real-Time-Management/dp/1492098353">Cloud FinOps </a>book, so I’m a bit hesitant here.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Using automatic scaling capabilities to meet peak demand - is the most relevant advice in this section. Use auto-scaling groups or similar to accommodate for both performance and cost.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>Access capacity on demand for unpredictable workloads</strong></p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol><!-- wp:list-item -->
<li>Use Amazon Athena for ad hoc SQL workloads - as mentioned above, I prefer Athena over AWS S3 Select.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Use AWS Glue instead of Amazon EMR for infrequent ETL jobs - I don’t have a strong opinion here, but if you have a data strategy in mind, I will try to adjust to it. Additionally, I feel that other AWS can be even easier and cost-effective to work with—for example,  Apache Spark in Amazon Athena, step functions, etc.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Use on-demand resources for transient workloads or short-term development and testing needs - having said that, you should still keep an eye on your production services, ensure they are utilized correctly and rightsize them if needed.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>Avoid data duplication with a centralized storage layer</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Implement a central storage layer to share data among tenants - I would shorten it to saying, “have a data strategy” - where you are, where you want to go, etc., which is not trivial in early startup days.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Leverage up to $100,000 in AWS Activate credits</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>This might be a bit contracting to the rest of the document since it feels like free money and delays your concern about cloud costs.</p>
<!-- /wp:paragraph -->
