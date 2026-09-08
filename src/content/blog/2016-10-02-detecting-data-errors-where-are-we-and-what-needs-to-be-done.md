---
title: "Detecting Data Errors: Where are we and what needs to be done?"
pubDate: 2016-10-02T14:10:24.000Z
permalink: "/2016/10/02/detecting-data-errors-where-are-we-and-what-needs-to-be-done/"
tags: []
draft: false
---
My summary and notes for "Detecting Data Errors: Where are we and what needs to be done?" by Ziawasch Abedjan, Xu Chu, Dong Deng, Raul Castro Fernandez, Ihab F. Ilyas, Mourad Ouzzani, Paolo Papotti, Michael Stonebraker, Nan Tang Proceedings of the VLDB Endowment 9.12 (2016): 993-1004.

Paper can be found - <a href="https://cs.uwaterloo.ca/~ilyas/papers/AbedjanVLDB2016.pdf">here</a>

In this paper the group of researchers evaluate several data cleaning tools to detect different types of data errors and suggest a strategy to holistically run multiple tools to optimize the detection efforts. This study focus on automatically detecting the errors and not repair them since automatically repairing is rarely allowed.

<b>Current status</b> - current data cleaning solutions are usually belong to one or more of the following categories:
<ul>
	<li>Rules based detection algorithms - the user specify set of rules such as: not null, functional dependencies, user defined function that the data must obey and the data cleaner find any violation. Example: </span><a href="https://github.com/daqcri/NADEEF">NADEEF</a>.</li>
	<li>Pattern enforcement and transformation tools - tools in this category discover either syntactic or semantic patterns in the data and detect those errors. Example:<a href="http://openrefine.org/">OpenRefine</a>, <a href="http://vis.stanford.edu/wrangler/">Data Wrangler</a>, <a href="http://www.dataxformer.org/">DataXFormer</a>, <a href="https://www.trifacta.com/">Trifacta</a>, <a href="http://da.qcri.org/ntang/dcprojects/katara.html">Katara</a>.</li>
	<li>Quantitative error detection algorithms - find outliers and glitches in the data.</span></li>
	<li>Record linkage and de-depulication algorithms - identify data which refer to the same entity and is not consistent \ appear multiple times. Examples: <a href="https://www.csail.mit.edu/node/1951">Data Tamer</a>, <a href="http://www.tamr.com/">TAMR</a>.</li>
</ul>
<b>Evaluation of tools</b>
<ol>
	<li>Precision and recall of each tool</li>
	<li>Errors detected when applying all the tools together</li>
	<li>How many false positives are detected as we would like to minimize the human effort.</li>
</ol>
<b>Error types</b>
<ul>
	<li><i><b><i>Outliers</i></b><i> include data values that deviate from the distribution of values in a column of a table.</i></i></li>
</ul>
<ul>
	<li><b><i>Duplicates</i></b><i> are distinct records that refer to the same real-world entity. If attribute values do not match, this could signify an error.</i></li>
</ul>
<ul>
	<li><b><i>Rule violations</i></b><i> refer to values that violate any kind of integrity constraints, such as Not Null constraints and Uniqueness constraints.</i></li>
</ul>
<ul>
	<li><b><i>Pattern violations</i></b><i> refer to values that violate syntactic and semantic constraints, such as alignment, for matting, misspelling and semantic data types.</i></li>
</ul>
(p. 995)

Some errors overlap and fit into more than one category.

[TR] - are those all the error types which exist? What about correlated errors between several records?

<b>Data sets</b>

[TR] - there are many data sets specific details in the paper. As I am more interested in the ideas those details will be omitted here.

[TR] - the data evaluated relatively small datasets with small number of columns. It would also be interesting to evaluate it bigger and more complex datasets, e.g. wikidata.

[TR]- consider the temporal dimension of the data. I.e some properties may have expiration date which other not (e.g birth place never changes while current location changes).

<b>Data cleaning tools</b>
<table>
<tbody>
<tr>
<td></td>
<td><a href="https://github.com/cpitclaudel/dBoost">DBoost</a></td>
<td>DC-Clean</td>
<td>OpenRefine</td>
<td>Traficata</td>
<td><a href="http://www.pentaho.com/">Pentaho</a></td>
<td><a href="https://www.knime.org/">Knime</a></td>
<td>Katara</td>
<td>TAMR</td>
</tr>
<tr>
<td>Pattern violation</td>
<td></td>
<td></td>
<td>+</td>
<td>+</td>
<td>+</td>
<td>+</td>
<td>+</td>
<td></td>
</tr>
<tr>
<td>Constraint violations</td>
<td></td>
<td>+</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td>Outliers</td>
<td>+</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td>Duplicates</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td>+</td>
</tr>
</tbody>
</table>
<ul>
	<li>DBoost - use 3 common method for outlier detection - histograms, Gaussian and multivariate Gaussian mixtures. The UVP of this tool is decomposing types into their building blocks. For example expanding dates into day, month and year. DBoost require configuration such as number of bins and their width for histograms and mean and standard deviation for Gaussian and GMM.</li>
	<li>DC-Clean - focus on denial constraints and subsume the majority of the commonly used constraint languages. The collect if denial constraints was designed for each data set.</li>
	<li>OpenRefine - can digest data in multiple formats. Data exploration is performed through faceting and filtering operations ([TR] - reminds DBoost histograms)</li>
	<li>Trifacta - commercial product which was developed from DataWrangler. Can predict and apply syntactic data transformation for data preparation and data cleaning. Transformations can also involve business logic.</li>
	<li>Katara - uses external knowledge bases, e.g. Yago in order to detect errors that violate a semantic pattern. It does it by first identifying the type of the column and the relations between two columns in the data set using a knowledge base.</li>
</ul>
         [TR] - assumes that the knowledge base is ground truth. We need to doubt this as well.
<ul>
	<li>Pentaho - provide graphical interface for data wrangling and can orchestrate ETL processes.</li>
	<li>KNIME - focuses on workflow authoring and encapsulating data processing tasks with some machine learning capabilities.</li>
	<li>TAMR - uses machine learning models to learn duplicate features through expert sourcing and similarity metrics.</li>
</ul>
<b>Combination of Multiple tools</b>
<ul>
<ul>
	<li>Union all and Min-K -</span>
<ul>
	<li>Union all - takes the union of the errors emitted by all tools (i.e k=1)</li>
	<li>Min-<i>k</i> - error detected by at least <i>k</i> tools.</li>
</ul>
</li>
	<li>Ordering based on Precision
<ul>
	<li>Cost model -
<ul>
	<li>C - cost of having a human check a detected error</li>
	<li>V - Value of identifying a real error (V &gt; C otherwise make not sense).</li>
	<li>P - Number of true positives</li>
	<li>N - Number of false positives</li>
</ul>
Total value should hold - P * V &gt; (P +N) * C =&gt; P/(P+N&gt; &gt; C/V. P/(P+N) is the precision. Therefore if the model precision is less than C/V we should not run it. Model precision can be evaluated by sampling the detected errors.
<i>"We observed that some tools are not worth evaluating even if their precision is higher than the threshold, since the errors they detect may be covered by other tools with higher estimate precision (which would have been run earlier)." </i>(p. 998)
[TR] - not always the cost and value can be estimated correctly and easily and not all the errors have the same cost and value.
</li>
	<li>Maximum entropy-based order selection - the algorithm estimate the overlap between the tool results and picks the tool with the highest precision to reduce the entropy. Algorithm steps:
<ol>
	<li>Run individual tool - run each tool and get the detected errors.</li>
	<li>Estimate precision for each tool by checking samples</li>
	<li>Pick a tool which maximize the entropy among the unused tools so far - picks the one with the highest estimated precision on the sample and verifies its detected errors on the complete data that have not been verified before.</li>
	<li>Update - update the errors that were detected by the chosen tool in the last step and repeat last two steps.</li>
</ol>
</li>
</ul>
</ul>
<b>Discussion and Improvements</b>
<ul>
	<li>Using Domain specific tools - for example AddressCleaner. [TR] - only relevant when such a tool exists and is easy \ cheap to use.</li>
	<li>Enrichment - rule-based systems and duplicate detection strategies can benefit from additional data. Future work would consider data enrichment system.</li>
</ul>
<b>Conclusions</b>
<ol>
	<li>No clear winner - different tools worked well on different data set mainly due to different error types distribution. Therefore a holistic strategy must be used.</li>
	<li>Since there are errors which overlaps one can order the tools to minimize false positives. However the ordering strategy is data set specific.</li>
	<li>Yet, not 100% of the errors are detected. Suggested way to improve it is -
<ol>
	<li>Type-specific cleaning - for example date cleaning tools, address cleaning tools etc. Even those tools are limited in their recall.</li>
	<li>Enrichment of the data from external sources</li>
</ol>
</li>
</ol>
<b>Future work</b>
<ol>
	<li>A holistic combination of tools - algorithms for combining tools. [TR] - reminds ensemble methods from Machine learning.</li>
	<li>Data enrichment system - adding relevant knowledge and context to the data set.</li>
	<li>Interactive dashboard</li>
	<li>Reasoning on real-world data</li>
</ol>
