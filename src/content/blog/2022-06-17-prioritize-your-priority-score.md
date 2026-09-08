---
title: "Prioritize your Priority Score"
pubDate: 2022-06-17T09:23:45.000Z
permalink: "/2022/06/17/prioritize-your-priority-score/"
heroImage: "/wp-content/uploads/2022/06/screen-shot-2022-06-17-at-10.20.35.png"
tags:
  - "priority"
  - "scores"
  - "thoughts"
draft: false
---
<!-- wp:paragraph -->
<p>A while ago, a friend asked me about a topic she needed to tackle – her team had many support tickets to prioritize, decide what to work on, and further communicate it to the relevant stakeholders.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>They started as everyone starts – tier 1 and tier 2 support teams in their company stated the issue severity (low, medium, high) in the ticket, and they prioritized accordingly.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"align":"center","id":1659,"width":232,"height":226,"sizeSlug":"large","linkDestination":"media"} -->
<figure class="wp-block-image aligncenter size-large is-resized"><a href="/wp-content/uploads/2022/06/screen-shot-2022-06-17-at-10.20.24.png"><img src="/wp-content/uploads/2022/06/screen-shot-2022-06-17-at-10.20.24.png" alt="" class="wp-image-1659" width="232" height="226" /></a></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>But that was not good enough. It was not always clear how to set the severity level – was it the client size or lifecycle stage, the feature importance, or anything else. Additionally, it was not granular enough to decide what to work on first.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>We brainstormed, and she told me two important things for her: feature importance and client size. Both can be reduced to “t-shirt” size estimation, i.e., small client, medium client, large client, and extra-large client, and features of low/medium/high/crucial importance. Super, we can now generalize the single dimension axis system we previously had to two dimensions.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>The priority score is now - $latex \sqrt{x^2+y^2}$</p>
<!-- /wp:paragraph -->

<!-- wp:image {"align":"center","id":1658,"width":432,"height":302,"sizeSlug":"large","linkDestination":"media"} -->
<figure class="wp-block-image aligncenter size-large is-resized"><a href="/wp-content/uploads/2022/06/screen-shot-2022-06-17-at-10.20.30.png"><img src="/wp-content/uploads/2022/06/screen-shot-2022-06-17-at-10.20.30.png" alt="" class="wp-image-1658" width="432" height="302" /></a></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>That worked great until they had a few tickets that got the same priority score, and they needed to decide what to work on and explain it outside of their team. The main difference between those tickets was the time it would take to fix each one. One would take several hours, one would take 1-2 days, and the last one would take two weeks and has high uncertainty. No problem, I told her – let’s add another axis – the expected time to fix. Time to fix can also be binned – up to 1 day, up to 1 week, up to 1 sprint (2 weeks), and longer. Be cautious here; the ax order is inverted – the longer it takes, the lower priority we want to give it.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>The priority score is now - $latex \sqrt[\leftroot{-2}\uproot{2}3]{x_1^3+x_2^3+x_3^3}$</p>
<!-- /wp:paragraph -->

<!-- wp:image {"align":"center","id":1660,"width":468,"height":398,"sizeSlug":"large","linkDestination":"media"} -->
<figure class="wp-block-image aligncenter size-large is-resized"><a href="/wp-content/uploads/2022/06/screen-shot-2022-06-17-at-10.20.35.png"><img src="/wp-content/uploads/2022/06/screen-shot-2022-06-17-at-10.20.35.png" alt="" class="wp-image-1660" width="468" height="398" /></a></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Then, when I felt we were finally there, she came and said – remember the time to fix dimension? Well, it is not as important as the client size and the feature importance. Is there anything we can do about it?</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Sure I said, let’s add weights. The higher the weight is, the more influential the feature is. To keep things simple in our example, let’s reduce the importance of the time to fix compared to the other dimensions - $latex \sqrt[\leftroot{-2}\uproot{2}3]{x_1^3+x_2^3+0.5 x_3^3}$</p>
<!-- /wp:paragraph -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity" />
<!-- /wp:separator -->

<!-- wp:paragraph -->
<p><strong>To wrap things up</strong></p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol><li>This score can be generalized to include as many dimensions as one would like - $latex \sqrt[\leftroot{-2}\uproot{2}n]{\sum_{i=1}^n w_i x_i^n}$.</li><li>I recommend keeping the score as simple and minimal as possible since it is easier to explain and communicate.</li><li>Math is fun and we can use relatively simple concepts to obtain meaningful results.</li></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->
