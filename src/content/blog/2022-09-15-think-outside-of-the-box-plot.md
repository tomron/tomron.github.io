---
title: "Think outside of the Box Plot"
pubDate: 2022-09-15T20:25:05.000Z
permalink: "/2022/09/15/think-outside-of-the-box-plot/"
tags:
  - "box plot"
  - "datatlv"
  - "python"
  - "visualization"
  - "plotly"
draft: false
---
<!-- wp:paragraph -->
<p>Earlier today, I spoke at <a rel="noreferrer noopener" href="http://datatlv.com/" target="_blank">DataTLV</a> conference about box plots - what they expose, what they hide, and how they mislead. My slides can be found <a href="/wp-content/uploads/2022/09/thingoutsideoftheboxplot.pdf">here</a>, and the code used to generate the plots is <a href="https://gist.github.com/tomron/8a8e2e17538c303f3bef60cd7f41f315">here</a>. </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Key takeaways</strong></p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Boxplots show 5 number statistics - min, max, median, q1 and,q3.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>The flaws of Box Plots can be divided into two - data that is not present in the visualization (e.g. number of samples, distribution) and the visualization being counter-intuitive (e.g. quartiles is hard to grasp the concept).</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>I choose solutions that are easy to implement, either by leveraging existing packages code or by adding small tweaks. I used plotly.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Aside of those adjustment&nbsp;I many times box plot is just not the right graph for the job.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>If the&nbsp;statistical&nbsp;literacy of your audience is not well founded I would try avoiding using box plot.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>Topics I didn't talk about and worth mentioning</strong></p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Mary Eleanor Hunt Spear -  data visualization specialize who pioneered the development of the bar chart and box plot. I had a slide about her but went too fast, and skipped it. See <a href="https://en.wikipedia.org/wiki/Mary_Eleanor_Spear">here</a>.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>How percentiles are calculated - Several methods exist, and different Python packages use different default methods. Read more -<a href="http://jse.amstat.org/v14n3/langford.html">http://jse.amstat.org/v14n3/langford.html</a></li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>Resources I used to prepare the talk</strong></p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li><a href="https://blog.minitab.com/en/statistics-and-quality-data-analysis/how-to-think-outside-the-boxplot?hs_amp=true" rel="noreferrer noopener" target="_blank">https://blog.minitab.com/en/statistics-and-quality-data-analysis/how-to-think-outside-the-boxplot</a></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><a href="https://www.statisticshowto.com/probability-and-statistics/descriptive-statistics/box-plot/" rel="noreferrer noopener" target="_blank">https://www.statisticshowto.com/probability-and-statistics/descriptive-statistics/box-plot/</a></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><a href="https://asklexph.com/thinking-outside-the-box-plot" rel="noreferrer noopener" target="_blank">https://asklexph.com/thinking-outside-the-box-plot</a></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><a href="https://nightingaledvs.com/ive-stopped-using-box-plots-should-you/" target="_blank" rel="noreferrer noopener">https://nightingaledvs.com/ive-stopped-using-box-plots-should-you/</a></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><a href="https://www.greenbook.org/mr/market-research-news/replacing-boxplots-and-histograms-with-rugs-violins-and-bean-plots/" rel="noreferrer noopener" target="_blank">https://www.greenbook.org/mr/market-research-news/replacing-boxplots-and-histograms-with-rugs-violins-and-bean-plots/</a></li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->
