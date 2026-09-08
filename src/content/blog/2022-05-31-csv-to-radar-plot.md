---
title: "CSV to radar plot"
pubDate: 2022-05-31T19:58:26.000Z
permalink: "/2022/05/31/csv-to-radar-plot/"
tags:
  - "plotly"
  - "radar plot"
  - "visualization"
draft: false
---
<!-- wp:paragraph -->
<p>I find a radar plot a helpful tool for visual comparison between items when there are multiple axes. It helps me sort out my thoughts. Therefore I created a small script that helps me turn CSV to a radar plot.  See the gist below, and read more about the usage of radar plots <a href="https://www.pluscharts.com/why-and-when-to-use-spider-and-radar-chart/">here</a>.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>So how does it works? you provide a csv file where the columns are the different properties and each record (i.e line) is a different item you want to create a scatter for.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>The following figure was obtained based on this csv - </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="https://gist.github.com/tomron/e5069b63411319cdf5955f530209524a#file-examples-csv">https://gist.github.com/tomron/e5069b63411319cdf5955f530209524a#file-examples-csv</a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>The data in the file is based on - <a href="https://www.kaggle.com/datasets/shivamb/company-acquisitions-7-top-companies">https://www.kaggle.com/datasets/shivamb/company-acquisitions-7-top-companies</a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>And I used the following command - </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>python csv_to_radar.py examples.csv --fill toself --show_legend --title "Merger and Acquisitions by Tech Companies" --output_file merger.jpeg</code></pre>
<!-- /wp:code -->

<!-- wp:image {"id":1635,"sizeSlug":"large","linkDestination":"media"} -->
<figure class="wp-block-image size-large"><a href="/wp-content/uploads/2022/05/merger.jpeg"><img src="/wp-content/uploads/2022/05/merger.jpeg" alt="Radar plot" class="wp-image-1635" /></a></figure>
<!-- /wp:image -->

<!-- wp:embed {"url":"https://gist.github.com/tomron/e5069b63411319cdf5955f530209524a","type":"rich","providerNameSlug":"embed-handler"} -->
<figure class="wp-block-embed is-type-rich is-provider-embed-handler wp-block-embed-embed-handler"><div class="wp-block-embed__wrapper">
https://gist.github.com/tomron/e5069b63411319cdf5955f530209524a
</div></figure>
<!-- /wp:embed -->
