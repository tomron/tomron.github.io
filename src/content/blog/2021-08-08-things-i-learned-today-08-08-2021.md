---
title: "Things I learned today (08/08/2021)"
pubDate: 2021-08-08T15:06:39.000Z
permalink: "/2021/08/08/things-i-learned-today-08-08-2021/"
tags: []
draft: true
---
<!-- wp:paragraph -->
<p>S3 Object Lock provides two retention modes:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><li>Governance mode</li><li>Compliance mode</li></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>What is the difference?</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Governance mode</strong> allows user with <code>s3:BypassGovernanceRetention</code> permission to delete protected objects while in <strong>Compliance mode</strong> no user, including root user can delete protected objects.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Why does it matter?</strong></p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><li>Cost perspective - governance mode allows you to delete unnecessary objects and save storage costs.  </li><li>Compliance perspective - compliance mode ensures that no user can accidentally delete required objects.</li></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>See documentation <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock-overview.html">here</a></p>
<!-- /wp:paragraph -->
