---
title: "5 interesting things - AWS edition (18/06/21)"
pubDate: 2021-06-18T09:37:01.000Z
permalink: "/2021/06/18/5-interesting-things-aws-edition-18-06-21/"
tags:
  - "aws"
  - "snowball"
  - "chalice"
  - "cost control"
  - "dynamodb"
  - "aws lambda"
  - "api gateway"
draft: false
---
<!-- wp:paragraph -->
<p>As I collect items for my posts and wait until I have time to write about them I noticed I have many items related to AWS and decided to have a special edition.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><br><strong><span style="text-decoration:underline;">12 Common Misconceptions about DynamoDB</span></strong> - many times our beliefs about certain tools or technology are based on hearing more than doing or doing but not getting into the depth of things and when running into a problem solving it with a solution we already know. This post describes features and qualities of DynamoDB that are sometimes ignored.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="https://dynobase.dev/dynamodb-11-common-misconceptions/">https://dynobase.dev/dynamodb-11-common-misconceptions/<br></a><br></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Related Bonus</strong> - I really liked the link to Alex DeBrie post about single table design with DynamoDB</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="https://www.alexdebrie.com/posts/dynamodb-single-table/">https://www.alexdebrie.com/posts/dynamodb-single-table/<br></a><br></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong><span style="text-decoration:underline;">AWS Chalice</span></strong> - it is not an official offering but rather a python code package for writing serverless applications. The syntax is very similar to Flask while there is a native support for local testing, AWS SAM and Terraform integration, etc. Disclaimer - if you are on multi-cloud I would not move from Flask or FastAPI to Chalice. Also note the used services (AWS lambda, AWS API Gateway, etc.) limits and make sure they don't limit your app.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="https://aws.github.io/chalice/index">https://aws.github.io/chalice/index<br></a><br></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Related Bonus</strong> - auth0 tutorial on How to Create CRUD REST API with AWS Chalice<br><a rel="noreferrer noopener" href="https://auth0.com/blog/how-to-create-crud-rest-api-with-aws-chalice/" target="_blank">https://auth0.com/blog/how-to-create-crud-rest-api-with-aws-chalice/</a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p> </p>
<!-- /wp:paragraph -->

<!-- wp:html -->
<br>
<!-- /wp:html -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong><span style="text-decoration:underline;">ElectricEye</span></strong> - "ElectricEye is a set of Python scripts (affectionately called Auditors) that continuously monitor your AWS infrastructure looking for configurations related to confidentiality, integrity and availability that do not align with AWS best practices.". It is hard to know and follow all AWS best practices and this bundle of scripts is supposed to help uncover those. I have not tried it myself yet but it seems promising.<br><a rel="noreferrer noopener" href="https://github.com/jonrau1/ElectricEye" target="_blank">https://github.com/jonrau1/ElectricEye</a></p>
<!-- /wp:paragraph -->

<!-- wp:html -->
<br>
<!-- /wp:html -->

<!-- wp:paragraph -->
<p><strong><span style="text-decoration:underline;">My Comprehensive Guide to AWS Cost Control</span></strong> - computing and cloud costs take a big portion of every tech organization those days. Being a more valuable team member also means being aware of the costs and choosing wisely between the different alternatives.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="https://corey.tech/aws-cost/">https://corey.tech/aws-cost/</a></p>
<!-- /wp:paragraph -->

<!-- wp:html -->
<br>
<!-- /wp:html -->

<!-- wp:paragraph -->
<p><strong><span style="text-decoration:underline;">The Best Way To Browse 6K+ Quality AWS GitHub Repositories</span></strong> - most of the time we are not inventing the wheel and someone probably already did something very similar to what we are doing. Let's browse github to find it and accelerate our process.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="https://app.polymersearch.com/discover/aws">https://app.polymersearch.com/discover/aws<br></a><br></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Bonus - AWS snowball</strong> - I found out that this service exists only this week and it blew my mind - <a href="https://aws.amazon.com/snowball/">https://aws.amazon.com/snowball/</a></p>
<!-- /wp:paragraph -->
