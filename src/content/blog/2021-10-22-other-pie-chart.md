---
title: "Other pie chart"
pubDate: 2021-10-22T09:56:56.000Z
permalink: "/2021/10/22/other-pie-chart/"
heroImage: "/wp-content/uploads/2021/10/other_pie.png"
tags:
  - "pie chart"
  - "plotly"
  - "visualization"
draft: false
---
<!-- wp:paragraph -->
<p>This morning I read "<a href="https://uxdesign.cc/20-ideas-for-better-data-visualization-73f7e3c2782d">20 ideas for better data visualization</a>". I liked it very much and specially I found 8th idea - "Limit the number of slices displayed in a pie chart" very relevant for me. So I jumped into the plotly express code and created a figure of type <code>other_pie</code> which given a number (<code>n</code>) and a label (<code>other_label</code>) created a pie chart with <code>n</code> sectors. <code>n-1</code> of those sectors are the top values according to the `values` column and the other section is the sum of the other rows.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>A gist of the code can be found <a href="https://gist.github.com/tomron/37b33223b73159aea4783c49ac80f5d4">here</a> (check <a href="https://github.com/plotly/plotly.py/blob/master/release.md">here</a> how to build plotly)</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>I used the following code to generate standard pie chart and pie chart with 5 sectors -</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>import plotly.express as px
df = px.data.gapminder().query("year == 2007").query("continent == 'Europe'")
df.loc&#091;df&#091;'pop'] &lt; 2.e6, 'country'] = 'Other countries' # Represent only large countries
pie_fig = px.pie(df, values='pop', names='country', title='Population of European continent')
otherpie_fig = px.other_pie(df, values='pop', names='country', title='Population of European continent', n=5, other_label="others")
</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>And this is how it looks like - </p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":1574,"sizeSlug":"large","linkDestination":"media"} -->
<figure class="wp-block-image size-large"><a href="/wp-content/uploads/2021/10/pie.png"><img src="/wp-content/uploads/2021/10/pie.png" alt="Pie chart" class="wp-image-1574" /></a><figcaption>Pie chart</figcaption></figure>
<!-- /wp:image -->

<!-- wp:image {"id":1575,"sizeSlug":"large","linkDestination":"media"} -->
<figure class="wp-block-image size-large"><a href="/wp-content/uploads/2021/10/other_pie.png"><img src="/wp-content/uploads/2021/10/other_pie.png" alt="" class="wp-image-1575" /></a><figcaption>Other pie chart</figcaption></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->
