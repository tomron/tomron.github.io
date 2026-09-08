---
title: "AWS tagging best practices - 5  things to know"
pubDate: 2021-06-30T13:06:00.000Z
permalink: "/2021/06/30/aws-tagging-best-practices-5-things-to-know/"
tags:
  - "aws"
  - "billing"
  - "cost control"
draft: false
---
<!-- wp:paragraph -->
<p>I read <a href="https://docs.aws.amazon.com/whitepapers/latest/tagging-best-practices/tagging-best-practices.pdf">AWS</a><a href="https://docs.aws.amazon.com/whitepapers/latest/tagging-best-practices/tagging-best-practices.pdf"> tagging best practices whitepaper</a> which was published in December 2018 and&nbsp;distilled 5 takeaways.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>1. <strong>Use cases</strong> - tags have several use-cases including:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><li>Cost allocation - using AWS Cost Explorer you can break down AWS costs by tag</li><li>Access Control - AM policies support tag-based conditions</li><li>Automation - for example tags can be used to opt into or out of automated task</li><li>AWS Console Organization and Resource Groups - e.g. create a custom console that organizes and consolidates AWS resources based on one or more tags</li><li>Security Risk Management - use tags to identify resources that require heightened security risk management practices</li><li>Operations Support - I find this use case tightly related to the automation use case</li></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>2. <strong>Standardized tag names and tag values</strong> - <br></p>
<!-- /wp:paragraph -->

<!-- wp:quote -->
<blockquote class="wp-block-quote"><p>There are only two hard things in Computer Science: cache invalidation and naming things.</p><cite>Phil Karlton (<a href="https://www.martinfowler.com/bliki/TwoHardThings.html">check here</a>)</cite></blockquote>
<!-- /wp:quote -->

<!-- wp:paragraph -->
<p>A good practice as suggested in the whitepaper is to gather tagging requirements from all stakeholders and only then start implementing but a minimal step can be to define a convention for tags names and values that everyone can follow, see example from the document below.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":1443,"sizeSlug":"large","linkDestination":"media"} -->
<figure class="wp-block-image size-large"><a href="/wp-content/uploads/2021/06/screen-shot-2021-06-23-at-13.50.55.png"><img src="/wp-content/uploads/2021/06/screen-shot-2021-06-23-at-13.50.55.png" alt="" class="wp-image-1443" /></a><figcaption>tag names example</figcaption></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><br>3. <strong>Cost allocation tags delay</strong> - this is something I experienced personally - "Cost allocation tags appear in your billing data only after you have (1) specified them in the Billing and Cost Management Console and (2) tagged resources with them". And even then it can take around 24 hours to appear, take it into account.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><br>4. <strong>Tag everything</strong> - sounds trivial but sometimes organizations tag only some of the resources, tag everything you can to get a more comprehensive and accurate data of your expenses. A nice feature in the Billing and Cost Management Console is the ability to find resources the don't have a specific tags so you can easily find out what you missed. </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><br>5. <strong>Tags limitations</strong> - until 2016 AWS allowed up to 10 tags for a given resource. The current limit is 50. It definitely allows much more but it is still a limit to bear in mind when creating a tagging strategy. One way to avoid it is by using compound values, e.g. "anycompany:technical-contact = Susan Jones;sue.jones@anycompany.com; +12015551213" rather than a tag for each attribute (e.g. "anycompany:technical-contact-name = Susan Jones").</p>
<!-- /wp:paragraph -->
