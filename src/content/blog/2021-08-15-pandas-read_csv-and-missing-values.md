---
title: "pandas read_csv and missing values"
pubDate: 2021-08-15T08:58:03.000Z
permalink: "/2021/08/15/pandas-read_csv-and-missing-values/"
tags:
  - "missing values"
  - "pandas"
  - "python"
draft: false
---
<!-- wp:paragraph -->
<p>I read Domino Lab post about "<a href="https://blog.dominodatalab.com/data-exploration-with-pandas-profiler-and-d-tale/">Data Exploration with Pandas Profiler and D-Tale"</a> where they load diagnostic mammograms used in the diagnostic of breast cancer from UCI website. Instead of missiing values the data contains <code>?</code>. When reading the data using pandas <code>read_csv</code> function naively interpret the value as string value and change the column type to be object instead of float in this case.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>In the post mentioned above the authors dealt with the issue in the following way - </p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>masses = masses.replace('?', np.NAN)
masses.loc&#091;:,names&#091;:-1]] = masses.loc&#091;:,names&#091;:-1]].apply(pd.to_numeric)</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>That is, they first replaced the <code>?</code> values in all the columns with <code>np.NAN</code> and then convert all the columns to numeric. Let's call this method the manual method.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>If we know the know the non default missing values in advance, can we do something better? The answer is yes!</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>See code <a href="https://gist.github.com/tomron/fa56ae15723b862d2d93a49b74c831a9">here</a> </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Use <code>na_values</code> parameter</strong></p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>df = pd.read_csv(url, names=names, na_values=&#091;"?"])</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p><code>na_values</code> parameter can get scalar, string, list-like or dict parameters. If you pass a scalar, string or list-like parameter all columns are treated the same way. If you pass dict you can specify different set of NaN values per column.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>The advantage of this method over the manual method is that you don't need to convert the columns after replacing the nan values. In the manual method the column types are specified (in the given case they are all numeric), if there are multiple columns types you need to know it and specify it in advance.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Side note - likewise, for non trivial boolean values you can use <code>true_values</code> and <code>false_values</code> parameters.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Use <code>converters</code> parameter</strong></p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>df = pd.read_csv(url, names=names, converters={"BI-RADS": lambda x: x if x!="?" else np.NAN})</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>This is usually used to convert values of specific columns. If you would like to convert values in all the columns in the same way this is not the preferred method since you will have to add an entry for each column and if new column is added you won't take care of it by default (this can be both advantage and disadvantage). However, for other use-cases, <code>converters</code> can help with more complex conversions.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Note that the result here is different then the result in the other methods since we only converted the values in one column.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Conclusion</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Pandas provides several ways to deal with non-trivial missing values. If you know the non-trivial value in advance you are good to go and <code>na_values</code> is most likely the best way to go.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Performance wise (time) all methods perform roughly the same for the given dataset but that can change as a function on the dataset size (columns and rows), row types, number of non-trivial missing values.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>On top of it, make reading documentation your superpower. It can use your tools smarter and more efficient and it can save you a lot of time. </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>See pandas <code>read_csv</code> documentation <a href="https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.read_csv.html">here</a></p>
<!-- /wp:paragraph -->
