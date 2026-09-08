---
title: "5 tips for using Pandas"
pubDate: 2020-12-14T14:45:55.000Z
permalink: "/2020/12/14/6-tips-for-using-pandas/"
tags:
  - "dropna"
  - "pandas"
  - "plotly"
  - "python"
  - "tqdm"
draft: false
---
<!-- wp:paragraph -->
<p>Recently, I worked closely with Pandas and found out a few things that are might common knowledge but were new to me and helped me write more efficient code in less time.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><br>1.&nbsp;<strong>Don't drop the na</strong> </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Count the number of unique values including Na values. </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Consider the following pandas DataFrame -<br></p>
<!-- /wp:paragraph -->

<!-- wp:syntaxhighlighter/code -->
<pre class="wp-block-syntaxhighlighter-code">df = pd.DataFrame({"userId": list(range(5))*2 +[1, 2, 3],
                   "purchaseId": range(13),
                   "discountCode": [1, None]*5 + [2, 2, 2]})</pre>
<!-- /wp:syntaxhighlighter/code -->

<!-- wp:paragraph -->
<p>Result</p>
<!-- /wp:paragraph -->

<!-- wp:image {"align":"center","id":1396,"sizeSlug":"large","linkDestination":"media"} -->
<div class="wp-block-image"><figure class="aligncenter size-large"><a href="/wp-content/uploads/2020/12/screen-shot-2020-12-14-at-14.23.17.png"><img src="/wp-content/uploads/2020/12/screen-shot-2020-12-14-at-14.23.17.png" alt="" class="wp-image-1396" /></a></figure></div>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>If I want to count the discount codes by type I might use -&nbsp; <code>df['discountCode'].value_counts()</code> which yields -&nbsp;</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>1.0    5
2.0    3</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>This will miss the purchases without discount codes. If I also care about those, I should do -</p>
<!-- /wp:paragraph -->

<!-- wp:syntaxhighlighter/code -->
<pre class="wp-block-syntaxhighlighter-code">df['discountCode'].value_counts(dropna=False)</pre>
<!-- /wp:syntaxhighlighter/code -->

<!-- wp:paragraph -->
<p>which yields - </p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>NaN    5
1.0    5
2.0    3
</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>This is also relevant for <code>nuniqiue</code>. For example, if I want to count the number of unique discount&nbsp;codes a user used -&nbsp;<code>df.groupby("userId").agg(count=("discountCode", lambda x: x.nunique(dropna=False)))</code></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>See more here -&nbsp;<a rel="noreferrer noopener" href="https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.nunique.html" target="_blank">https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.nunique.html</a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>2. <strong>Margin on Row \ columns&nbsp; only</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>&nbsp;Following the above example, assume you want to know for each discount code which users used it and for each user which discount code she used. Additionally you want to know has many unique discount codes each user used and how many unique users used each code, you can use pivot table with margins argument - </p>
<!-- /wp:paragraph -->

<!-- wp:syntaxhighlighter/code -->
<pre class="wp-block-syntaxhighlighter-code">df.pivot_table(index="userId", columns="discountCode",
               aggfunc="nunique", fill_value=0,
               margins=True)</pre>
<!-- /wp:syntaxhighlighter/code -->

<!-- wp:paragraph -->
<p>Result -</p>
<!-- /wp:paragraph -->

<!-- wp:image {"align":"center","id":1399,"sizeSlug":"large","linkDestination":"media"} -->
<div class="wp-block-image"><figure class="aligncenter size-large"><a href="/wp-content/uploads/2020/12/screen-shot-2020-12-14-at-14.40.11.png"><img src="/wp-content/uploads/2020/12/screen-shot-2020-12-14-at-14.40.11.png" alt="" class="wp-image-1399" /></a></figure></div>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>It would be nice to have the option to get margins only for rows or only for columns. The dropna option does not act as expected  - the na values are taken into account in the aggregation function but not added as a column or an index in the resulted Dataframe.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>3. <strong>plotly backend</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong><br></strong>Pandas plotting&nbsp;capabilities&nbsp;is nice but you can go one step further and use plotly very easy by setting plotly as pandas plotting backend.&nbsp; Just add the following line after importing pandas (no need to import plotly, you do need to install it) -</p>
<!-- /wp:paragraph -->

<!-- wp:syntaxhighlighter/code -->
<pre class="wp-block-syntaxhighlighter-code">pd.options.plotting.backend = "plotly"</pre>
<!-- /wp:syntaxhighlighter/code -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Note that plotly still don't support all pandas plotting&nbsp;options (e.g subplots, hexbins) but I believe it will improve in the future.&nbsp;</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><br>See more here -&nbsp;<a rel="noreferrer noopener" href="https://plotly.com/python/pandas-backend/" target="_blank">https://plotly.com/python/pandas-backend/</a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><br>4. <strong>Categorical dtype and qcut</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Categorical variables are common - e.g., gender, race, part of day, etc. They can be ordered (e.g part of day) or unordered (e.g gender). Using categorical data type one can validate data values better and compare them in case they are ordered (see user guide <a rel="noreferrer noopener" href="https://pandas.pydata.org/pandas-docs/stable/user_guide/categorical.html" target="_blank">here</a>).&nbsp;qcut allows us to customize binning for discrete and categorical data.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>See documentation <a rel="noreferrer noopener" href="https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.qcut.html" target="_blank">here</a> and the post the caught my attention about it here -&nbsp;<a rel="noreferrer noopener" href="https://medium.com/datadriveninvestor/5-cool-advanced-pandas-techniques-for-data-scientists-c5a59ae0625d" target="_blank">https://medium.com/datadriveninvestor/5-cool-advanced-pandas-techniques-for-data-scientists-c5a59ae0625d</a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>5. <strong><a href="https://github.com/tqdm/tqdm">tqdm</a> integration</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><br>tqdm is a progress bar that wraps any Python iterable, you can also use to follow the progress of pandas apply functionality using <code>progress_apply</code> instead of <code>apply</code> (you need to initialize tqdm before by doing <code>tqdm.pandas()</code>).</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>See more here -&nbsp;<a href="https://github.com/tqdm/tqdm#pandas-integration">https://github.com/tqdm/tqdm#pandas-integration</a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->
