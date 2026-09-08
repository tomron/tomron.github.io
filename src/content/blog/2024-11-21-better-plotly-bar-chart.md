---
title: "Better Plotly Bar Chart"
pubDate: 2024-11-21T21:22:05.000Z
permalink: "/2024/11/21/better-plotly-bar-chart/"
tags:
  - "bookclub"
  - "visualization"
  - "plotly"
  - "storytelling"
  - "reading"
draft: false
---
<!-- wp:paragraph -->
<p>I'm reading "<a href="https://www.amazon.com/-/he/Cole-Nussbaumer-Knaflic-ebook/dp/B016DHQSM2/">storytelling with data</a>" by Cole Nussbaumer Knaflic. I plan to write my thoughts and insights from the book once I finish it. For now, I wanted to play with it a bit and create a better bar chart visualization that -</p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol class="wp-block-list"><!-- wp:list-item -->
<li>Highlight the category you find most important and assign a special color to it (i.e <code>prominent_color</code> in the code), while the remaining categories used the same color (i.e. <code>latent_color</code>)</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Remove grids and make the background and paper colors the same to remove cognitive load.</li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:image {"id":1953,"sizeSlug":"large","linkDestination":"media"} -->
<figure class="wp-block-image size-large"><a href="/wp-content/uploads/2024/11/barchart_stwd.png"><img src="/wp-content/uploads/2024/11/barchart_stwd.png" alt="" class="wp-image-1953" /></a></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>The implementation is flexible, so if you feel like changing one of the settings(i.e., show the grid lines or center the title) you can pass it via keyword arguments when calling the function. </p>
<!-- /wp:paragraph -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity" />
<!-- /wp:separator -->

<!-- wp:embed {"url":"https://gist.github.com/tomron/dffae6ca7c679094894159b26b1d4d6f","type":"rich","providerNameSlug":"embed-handler"} -->
<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
https://gist.github.com/tomron/dffae6ca7c679094894159b26b1d4d6f
</div></figure>
<!-- /wp:embed -->
