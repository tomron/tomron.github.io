---
title: "Things I learned today (04/08/2021)"
pubDate: 2021-08-04T12:39:01.000Z
permalink: "/2021/08/04/things-i-learned-today-04-08-2021/"
tags:
  - "aws"
  - "efs"
  - "aws lambda"
  - "s3"
  - "ec2"
  - "ecs"
  - "eks"
  - "fargate"
  - "api gateway"
draft: false
---
<!-- wp:quote -->
<blockquote class="wp-block-quote"><p>AWS Lambda functions can now mount an Amazon Elastic File System (Amazon EFS)</p><cite><a href="https://aws.amazon.com/blogs/aws/new-a-shared-file-system-for-your-lambda-functions/">AWS announcement</a></cite></blockquote>
<!-- /wp:quote -->

<!-- wp:paragraph -->
<p><strong>What is AWS Lambda?</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>AWS Lambda is FaaS (function as a service) offering. It is an event-driven, serverless computing platform which integrates with many other AWS services. For example you can trigger lambda function from API gateway, S3 event notification, etc.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>AWS Lambda runtime includes Python, Node.js. ruby, Java, Go and C#.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>It is very useful and cost-effective when you have infrequent and relatively short executions so you don't need to provision any infrastructure. Lambda has it's limitations, mainly it's running time - max 15 minutes. Storage was also a limitation up to this announcement but this is breakthrough. </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>What is Amazon EFS?</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Amazon Elastic File System (EFS) is a cost-optimized file storage (not setup costs, just pay as you use) that can automatically scale from gigabytes to petabytes of data without needing to provision storage. It also allow multiple instances to connect to it simultaneously.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>EFS are accessible from EC2 instances, ECS containers, EKS and AWS Fargate and AWS lambda.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Comparing to EBS, EFS is usually more expensive. However, the use case is different. EFS is a NFS file system (which means that it is not supported on Windows instances) and EBS is block storage and is usually not multi-attached (there are some EC2 + EBS configurations which allow multi-attach but that's not the main use case). </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Why does it matter?</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>By default, lambda can <code>/tmp</code> storage of up to 512Mb this enables working with larger files. This means that you can import large machine learning models or packages. This also means that you can use an up-to-date version of files since it is easy to share.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Additional you can share information or state across invocations since EFS is a shared drive. I would not say it is optimal and generally I would rather to decouple it but it is possible and it is faster than S3.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>In some cases it can also enable moving data intensive workloads (in AWS or on-premise) to AWS lambda and save cost.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>See more here</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><li>Announcement - <a href="https://aws.amazon.com/blogs/aws/new-a-shared-file-system-for-your-lambda-functions/">https://aws.amazon.com/blogs/aws/new-a-shared-file-system-for-your-lambda-functions/</a></li><li>Comparing Lambda data storage options - <a href="https://aws.amazon.com/blogs/compute/choosing-between-aws-lambda-data-storage-options-in-web-apps/">https://aws.amazon.com/blogs/compute/choosing-between-aws-lambda-data-storage-options-in-web-apps/</a></li><li>Lambda limitations - <a href="https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html">https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html</a></li></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->
