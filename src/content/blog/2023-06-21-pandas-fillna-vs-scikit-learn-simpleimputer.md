---
title: "Pandas fillna vs scikit-learn SimpleImputer"
pubDate: 2023-06-21T11:24:40.000Z
permalink: "/2023/06/21/pandas-fillna-vs-scikit-learn-simpleimputer/"
tags:
  - "fillna"
  - "imputations"
  - "missing values"
  - "pandas"
  - "python"
  - "scikit-learn"
  - "SimpleImputer"
draft: false
---
<!-- wp:paragraph -->
<p>Missing data is prevalent in real-world data and can be missing for various reasons. Gladly, both pandas and scikit-learn several imputation tools to deal with it. Pandas offers a basic yet powerful interface for univariate imputations using <a href="https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.fillna.html"><code>fillna</code></a> and more advanced functionality using <a href="https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.interpolate.html"><code>interpolate</code></a>. scikit-learn offers both <a href="https://scikit-learn.org/stable/modules/generated/sklearn.impute.SimpleImputer.html"><code>SimpleImputer</code></a> for univariate imputations and <a href="https://scikit-learn.org/stable/modules/generated/sklearn.impute.KNNImputer.html"><code>KNNImputer</code></a> and <a href="https://scikit-learn.org/stable/modules/generated/sklearn.impute.IterativeImputer.html#sklearn.impute.IterativeImputer"><code>IterativeImputer</code></a> for multivariate imputations. In this post, we will focus on <code>fillna </code>and <code>SimpleImputer</code> functionality and compare them.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>Basic Functionality</strong></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><code>SimpleImputer</code> offers four strategies to fill in the nan values - mean, median, most_frequet, and constant.</p>
<!-- /wp:paragraph -->

<!-- wp:syntaxhighlighter/code {"language":"python"} -->
<pre class="wp-block-syntaxhighlighter-code">import numpy as np
import pandas as pd
from sklearn.impute import SimpleImputer

df = pd.DataFrame(
    [[7, 2, np.nan], [4, np.nan, 6], [10, 5, 9]])
imp_mean = SimpleImputer(strategy='mean')
pd.DataFrame(imp_mean.fit_transform(df))</pre>
<!-- /wp:syntaxhighlighter/code -->

<!-- wp:paragraph -->
<p>output - </p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>      0    1    2
0   7.0  2.0  7.5
1   4.0  3.5  6.0
2  10.0  5.0  9.0</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>Can we achieve the same with pandas? Yes!</p>
<!-- /wp:paragraph -->

<!-- wp:syntaxhighlighter/code {"language":"python"} -->
<pre class="wp-block-syntaxhighlighter-code">df.fillna(df.mean())</pre>
<!-- /wp:syntaxhighlighter/code -->

<!-- wp:paragraph -->
<p>Want to impute with the most frequent value?</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Asuume - <code>df = pd.DataFrame(['a', 'a', 'b', np.nan])</code></p>
<!-- /wp:paragraph -->

<!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:paragraph -->
<p>With <code>SimpleImputer</code> -</p>
<!-- /wp:paragraph -->

<!-- wp:syntaxhighlighter/code {"language":"python"} -->
<pre class="wp-block-syntaxhighlighter-code">imp_mode = SimpleImputer(
    strategy='most_frequent')
pd.DataFrame(
  
  imp_mode.fit_transform(df))</pre>
<!-- /wp:syntaxhighlighter/code --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:paragraph -->
<p>With <code>fillna</code> -</p>
<!-- /wp:paragraph -->

<!-- wp:syntaxhighlighter/code {"language":"python"} -->
<pre class="wp-block-syntaxhighlighter-code">df.fillna(df.mode()[0])</pre>
<!-- /wp:syntaxhighlighter/code --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:paragraph -->
<p>And the output of both -</p>
<!-- /wp:paragraph -->

<!-- wp:columns -->
<div class="wp-block-columns"></div>
<!-- /wp:columns -->

<!-- wp:code -->
<pre class="wp-block-code"><code>   0
0  a
1  a
2  b
3  a</code></pre>
<!-- /wp:code -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Different Strategies</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Want to apply different strategies for different columns? using scikit-learn you will need several imputers, one per each strategy. Using <code>fillna</code> you can pass a dictionary, for example - </p>
<!-- /wp:paragraph -->

<!-- wp:syntaxhighlighter/code {"language":"python"} -->
<pre class="wp-block-syntaxhighlighter-code">df = pd.DataFrame(
    [[7, 2, np.nan], [4, np.nan, 6], [10, 5, 9]])
df.fillna({1: 10000, 2: df[2].mean()})</pre>
<!-- /wp:syntaxhighlighter/code -->

<!-- wp:code -->
<pre class="wp-block-code"><code>    0        1    2
0   7      2.0  7.5
1   4  10000.0  6.0
2  10      5.0  9.0</code></pre>
<!-- /wp:code -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Advanced Usage</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Want to impute values drawn from a normal distribution, no brainer - </p>
<!-- /wp:paragraph -->

<!-- wp:syntaxhighlighter/code {"language":"python"} -->
<pre class="wp-block-syntaxhighlighter-code">mean = 5
scale = 2
df = pd.DataFrame(
    [[7, 2, np.nan], [4, np.nan, 6], [10, 5, 9]])
df.fillna(
    pd.DataFrame(
        (np.random.normal(mean, scale, df.shape))</pre>
<!-- /wp:syntaxhighlighter/code -->

<!-- wp:code -->
<pre class="wp-block-code"><code>    0         1         2
0   7  2.000000  3.857513
1   4  5.407452  6.000000
2  10  5.000000  9.000000</code></pre>
<!-- /wp:code -->

<!-- wp:heading -->
<h2 class="wp-block-heading">Missing indicator</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Using SimpleImputer, one can add indicator columns that obtain <code>1</code> if the original column was missing, and <code>0</code> otherwise. This can also be done using <a href="https://scikit-learn.org/stable/modules/generated/sklearn.impute.MissingIndicator.html">MissingIndicator</a></p>
<!-- /wp:paragraph -->

<!-- wp:syntaxhighlighter/code {"language":"python"} -->
<pre class="wp-block-syntaxhighlighter-code">df = pd.DataFrame(
    [[7, 2, np.nan], [4, np.nan, 6], [10, 5, 9]])
mean_imp = SimpleImputer(strategy='mean', add_indicator=True)
mean_imp.fit_transform(df)
pd.DataFrame(mean_imp.fit_transform(df))</pre>
<!-- /wp:syntaxhighlighter/code -->

<!-- wp:code -->
<pre class="wp-block-code"><code>      0    1    2    3    4
0   7.0  2.0  7.5  0.0  1.0
1   4.0  3.5  6.0  1.0  0.0
2  10.0  5.0  9.0  0.0  0.0</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>Note that a missing column (i.e., columns 3 and 4 in the example above) corresponds only to columns with missing values. Therefore there is no missing indicator column corresponding to the column <code>0</code>. If you are converting back and forth to pandas dataframes you should note this nuance.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Another nuance to note when working with SimpleImputer is that columns that contain only missing values are dropped by default -</p>
<!-- /wp:paragraph -->

<!-- wp:syntaxhighlighter/code {"language":"python"} -->
<pre class="wp-block-syntaxhighlighter-code">df =  pd.DataFrame(
    [[7, 2, np.nan, np.nan], [4, np.nan, 6, np.nan],
    [10, 5, 9, np.nan]])
mean_imp = SimpleImputer(strategy='mean')
pd.DataFrame(mean_imp.fit_transform(df))</pre>
<!-- /wp:syntaxhighlighter/code -->

<!-- wp:code -->
<pre class="wp-block-code"><code>      0    1    2
0   7.0  2.0  7.5
1   4.0  3.5  6.0
2  10.0  5.0  9.0</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>This behavior is controllable using setting <code>keep_empty_features=True</code>. While it is manageable, tracing columns might be challenging - </p>
<!-- /wp:paragraph -->

<!-- wp:syntaxhighlighter/code {"language":"python"} -->
<pre class="wp-block-syntaxhighlighter-code">mean_imp = SimpleImputer(
    strategy='mean',
    keep_empty_features=True,
    add_indicator=True)
pd.DataFrame(mean_imp.fit_transform(df))</pre>
<!-- /wp:syntaxhighlighter/code -->

<!-- wp:code -->
<pre class="wp-block-code"><code>      0    1    2    3    4    5    6
0   7.0  2.0  7.5  0.0  0.0  1.0  1.0
1   4.0  3.5  6.0  0.0  1.0  0.0  1.0
2  10.0  5.0  9.0  0.0  0.0  0.0  1.0</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>There is an elegant way to achieve similar behavior in pandas - </p>
<!-- /wp:paragraph -->

<!-- wp:syntaxhighlighter/code -->
<pre class="wp-block-syntaxhighlighter-code">df = pd.DataFrame(
    [[7, 2, np.nan, np.nan], [4, np.nan, 6, np.nan],
     [10, 5, 9, np.nan]])
pd.concat(
    [df.fillna(df.mean()), 
     df.isnull().astype(int).add_suffix("_ind")], axis=1)</pre>
<!-- /wp:syntaxhighlighter/code -->

<!-- wp:code -->
<pre class="wp-block-code"><code>    0    1    2   3  0_ind  1_ind  2_ind  3_ind
0   7  2.0  7.5 NaN      0      0      1      1
1   4  3.5  6.0 NaN      0      1      0      1
2  10  5.0  9.0 NaN      0      0      0      1</code></pre>
<!-- /wp:code -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>Working with dates</strong></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Want to work with dates and fill several columns with different types? No problem with pandas - </p>
<!-- /wp:paragraph -->

<!-- wp:syntaxhighlighter/code {"language":"python"} -->
<pre class="wp-block-syntaxhighlighter-code">df = pd.DataFrame(
    {"date": [
        datetime(2023, 6, 20), np.nan,
        datetime(2023, 6, 18), datetime(2023, 6, 16)],
     "values": [np.nan, 1, 3, np.nan]})
df.fillna(df.mean())</pre>
<!-- /wp:syntaxhighlighter/code -->

<!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:paragraph -->
<p>Before -</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>        date  values
0 2023-06-20     NaN
1        NaT     1.0
2 2023-06-18     3.0
3 2023-06-16     NaN</code></pre>
<!-- /wp:code --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:paragraph -->
<p>After -</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>        date  values
0 2023-06-20     2.0
1 2023-06-18     1.0
2 2023-06-18     3.0
3 2023-06-16     2.0</code></pre>
<!-- /wp:code --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:paragraph -->
<p>Working with dates is an advantage that fillna has over SimpleImputer.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">Backward and forward filling</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>So far, we treated the records and their order as independent. That is, we could have shuffled the records and that would not affect the expected imputed value. However, there are cases, for example, when representing time series when the order matters and we would like to impute based on later values (backfill) or earlier values (forward fill). This is done by setting the <code>method</code> property. </p>
<!-- /wp:paragraph -->

<!-- wp:syntaxhighlighter/code {"language":"python"} -->
<pre class="wp-block-syntaxhighlighter-code">df = pd.DataFrame(
    [[7, 2, np.nan], [4, np.nan, 6],
     [10, np.nan, 9], [np.nan, 5, 10]])
df.fillna(method='bfill')</pre>
<!-- /wp:syntaxhighlighter/code -->

<!-- wp:code -->
<pre class="wp-block-code"><code>      0    1     2
0   7.0  2.0   6.0
1   4.0  5.0   6.0
2  10.0  5.0   9.0
3   NaN  5.0  10.0</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>One can also limit the number of consecutive values which are imputed -</p>
<!-- /wp:paragraph -->

<!-- wp:syntaxhighlighter/code {"language":"python"} -->
<pre class="wp-block-syntaxhighlighter-code">df.fillna(method='bfill', limit=1)</pre>
<!-- /wp:syntaxhighlighter/code -->

<!-- wp:code -->
<pre class="wp-block-code"><code>      0    1     2
0   7.0  2.0   6.0
1   4.0  NaN   6.0
2  10.0  5.0   9.0
3   NaN  5.0  10.0</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>Note that when using <code>bfill</code> or <code>ffill</code> and moreover, when specifying <code>limit</code> to value other than <code>None</code> it is possible that not all the values would be imputed.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>For me, that's a killer feature of <code>fillna</code> comparing to <code>SimpleImputer</code></p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">Treat Infinite values as na</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Setting <code>pd.options.mode.use_inf_as_na = True</code> will treat infinite values (i.e. <code>np.inf, np.INF, np.NINF</code>) values as missing values, for example -</p>
<!-- /wp:paragraph -->

<!-- wp:syntaxhighlighter/code {"language":"python"} -->
<pre class="wp-block-syntaxhighlighter-code">df = pd.DataFrame([1, 2, np.inf, np.nan])
df.fillna(1000)</pre>
<!-- /wp:syntaxhighlighter/code -->

<!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:paragraph -->
<p><code>pd.options.mode.use_inf_as_na = False</code></p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>     0
0  1.0
1  2.0
2  inf
3  1000.0</code></pre>
<!-- /wp:code --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:paragraph -->
<p><code>pd.options.mode.use_inf_as_na = True</code></p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>     0
0  1.0
1  2.0
2  1000.0
3  1000.0</code></pre>
<!-- /wp:code --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:paragraph -->
<p>Note that <code>inf</code> and <code>na</code> are not treated the same for other use cases, e.g. - <code>df[0].value_counts(dropna=False)</code>-</p>
<!-- /wp:paragraph -->

<!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column {"width":"100%"} -->
<div class="wp-block-column" style="flex-basis:100%"><!-- wp:code -->
<pre class="wp-block-code"><code>0
1.0    1
2.0    1
NaN    1
NaN    1</code></pre>
<!-- /wp:code --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:heading -->
<h2 class="wp-block-heading">Summary</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Both pandas and scikit-learn offer a basic functionality to deal with missing values. Assuming you are working with pandas Dataframe, pandas <code>fillna</code> functionality can achieve everything <code>SimpleImputer</code> can do and more - working with dates, back and forward fill, etc. Additionally, there are some edge cases and specific behaviors to pay attention to when choosing what to use. For example when using <code>bfill</code> or <code>ffill</code> method some values may not be imputed if there are the last ones or first ones respectively.</p>
<!-- /wp:paragraph -->
