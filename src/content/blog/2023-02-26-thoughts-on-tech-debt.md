---
title: "Thoughts on Tech Debt"
pubDate: 2023-02-26T13:18:40.000Z
permalink: "/2023/02/26/thoughts-on-tech-debt/"
tags:
  - "management"
  - "tech debt"
draft: false
---
<!-- wp:paragraph -->
<p>I have been thinking about tech debt for a while now and how to address it daily. Few dilemmas for example - </p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Should we update our Python version or a version of one of the packages we use?</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>We thought of a more efficient implementation for one of our functions. Should we invest time in it? When?</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>What task should we prioritize for the next sprint? </li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>How do we measure our technical debt? Are we getting better, and what does better means? Or at least not worse?</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>So I have compiled a small reading list that I can share with my team and align on terminology and ideas. Feel free to add your thoughts.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>The 4 main types of technical debt</strong> - this is an explanation of Martin Fowler's Technical Debt Quadrant. This is a first step towards establishing a common language about technical debt.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="https://blog.codacy.com/4-types-technical-debt/">https://blog.codacy.com/4-types-technical-debt/</a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>The different types of technical debt</strong> - Another piece in the puzzle to use a common terminology. While the split into categories makes sense, I don't entirely agree with the fixes and impacts.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="https://techdebtguide.com/types-of-technical-debt">https://techdebtguide.com/types-of-technical-debt</a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>The 25 Percent Rule for Tackling Technical Debt</strong> - a post from Shopify engineering blog about their pillars of tech debt and a recommendation on how to invest time on those topics. That made me think about whether the discussion about tech debt should differ between different stages or sizes of companies</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="https://shopify.engineering/technical-debt-25-percent-rule">https://shopify.engineering/technical-debt-25-percent-rule</a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>A Framework for Prioritizing Tech Debt</strong> - this post tries to get the analogy closer to real debt and examine the interest rate. If I took this analogy one step further, I would say that it is a loan, and the prioritization and the remediations are the terms that we choose on loan, and sometimes those terms change either because we recycle the loan, win a big sum and can pay back, etc. Or because something external changed, e.g., interest rate.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="https://www.maxcountryman.com/articles/a-framework-for-prioritizing-tech-debt">https://www.maxcountryman.com/articles/a-framework-for-prioritizing-tech-debt</a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Tech Debt Isn't a Burden, It's a Strategic Lever for Success</strong> - the approach here is closer to the loan analogy - "<strong>view tech debt as a strategic lever</strong> for your organization's success over time". That, together with other points in this post, made me think about the relations and interactions of product debt and tech debt - are they correlated or independent, and what influences them? are there any patterns in this duo or maybe trio (with business debt). I didn't yet find something to read about the topic that I was happy with.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="https://www.reforge.com/blog/managing-tech-debt">https://www.reforge.com/blog/managing-tech-debt</a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>7 Top Metrics for Measuring Your Technical Debt</strong> - this post suggests several metrics to measure technical debt, such as code churn, cycle time, code quality, and tools for measuring technical debt. One issue is that it does not cover infrastructure debt or process debt. For example - the complexity of deploy process, duplication between repositories, etc. Additionally, the underlying assumption in this post is that "tech debt is bad," while I view it as a strategy or a trade-off. I also don't believe that one size fits all - if you want to measure, choose the one thing that is most important and informative for you, and don't worry if it changes over time.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="https://dev.to/alexomeyer/8-top-metrics-for-measuring-your-technical-debt-5bnm">https://dev.to/alexomeyer/8-top-metrics-for-measuring-your-technical-debt-5bnm</a></p>
<!-- /wp:paragraph -->
