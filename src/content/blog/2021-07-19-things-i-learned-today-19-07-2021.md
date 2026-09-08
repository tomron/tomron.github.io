---
title: "Things I learned today (19/07/2021)"
pubDate: 2021-07-19T09:03:50.000Z
permalink: "/2021/07/19/things-i-learned-today-19-07-2021/"
tags:
  - "availability zones"
  - "aws"
draft: false
---
<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->

<!-- wp:quote -->
<blockquote class="wp-block-quote"><p>[AWS] independently map Availability Zones too names for each account</p><cite><a href="https://docs.aws.amazon.com/ram/latest/userguide/working-with-az-ids.html">AWS documentation</a></cite></blockquote>
<!-- /wp:quote -->

<!-- wp:paragraph -->
<p><br>This means that <code>eu-west-1a</code> in my account is not necessarily the same as <code>eu-west-1a</code> in your account.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Why does this matter? for example if you want to share subnets across accounts. Or maybe you want to ensure that services in different accounts are not in the same availability zone.<br></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>So how can you achieve this? use availability zone ids which are unique and consistent identifiers for availability zones.<br></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>See more here - <a href="https://docs.aws.amazon.com/ram/latest/userguide/working-with-az-ids.html">https://docs.aws.amazon.com/ram/latest/userguide/working-with-az-ids.html</a></p>
<!-- /wp:paragraph -->
