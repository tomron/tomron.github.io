---
title: "Things I learned today (28/07/2021)"
pubDate: 2021-07-28T10:32:28.000Z
permalink: "/2021/07/28/things-i-learned-today-28-07-2021/"
tags: []
draft: true
---
<!-- wp:paragraph -->
<p>When replicating object, either same region or cross region, versioning should be enabled on both source bucket and destination bucket.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>This was slightly surprising for me at first since I was expecting the same behaviour as in the object lock case - if object lock is enabled in the source bucket it should also be enabled in the destination bucket. But since the replicated objects retain all the metadata, including  the version ID it makes sense.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Another surprising feature is the ability to replicate an object to a different storage class. That is you can replicate an object to Glacier, Glacier Deep Dive, etc. Trivially </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>See more here - https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html</p>
<!-- /wp:paragraph -->
