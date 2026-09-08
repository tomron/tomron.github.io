---
title: "Fun Facts: Automatic Trivia Fact Extraction from Wikipedia"
pubDate: 2017-10-21T11:49:10.000Z
permalink: "/2017/10/21/fun-facts-automatic-trivia-fact-extraction-from-wikipedia/"
tags: []
draft: false
---
Authors: <a href="http://dblp.uni-trier.de/pers/hd/t/Tsurel:David">David Tsurel</a>, <a href="http://www.pelleg.org/shared/hp/">Dan Pelleg</a>, <a href="http://dblp.uni-trier.de/pers/hd/g/Guy:Ido">Ido Guy</a>, <a href="http://www.cs.huji.ac.il/~dshahaf/">Dafna Shahaf</a>
Article can be found <a href="https://arxiv.org/abs/1612.03896">here</a>

Trivia facts can drive users engagement, But what are trivia fact?

Is the fact “Barack Obama is part of the Obama family” a trivia fact?<br>
Is the fact “Barack Obama is Grammy Award winner” a trivia fact?

This paper tackle the problem of automatically extracting trivia facts from Wikipedia.
In this paper Tsurel et al. focussed on exploiting Wikipedia categories structure (i.e. X is a Y). Categories represent set of articles with common theme such as “Epic films based on actual events”, “Capitals in Europe”, “Empirical laws”. An article can have several categories. The main motivation to use categories and not free text is that categories are cleaner than sentences and capture the essence of the sentence better.

According to Miriam-Webster dictionary a trivia is:
<ul>
	<li>unimportant facts or details</li>
	<li>facts about people, events, etc., that are not well-known</li>
</ul>
The first path Tsurel et al. tested was to look for a small categories a”presumably, a small category indicates a rare and unique property if an entity, and would be an interesting trivia fact”. This path proved to be too specific e.g “Muhammad Ali is an alumni of Central High School in Louisville, Kentucky”.

[TR] As commented in the paper this fact is is not a good trivia fact because the specific high school has no importance to the reader and or to Ali’s character. But, as stated later - when coming to personalizing trivia facts there maybe readers which find this fact interesting (e.g other alumni’s of this high school).

This led Tsurel et al. to the first required property of trivia fact - surprise.

<b>Surprise</b>
Surprise reflects how unusual the article with respect to the category. So they would like to define similarity matrix between article <i>a </i>and category <i>C. </i>A category is a set of articles therefore the similarity is defined as:
<p style="text-align:center;">$latex similarity(a, C) = \sigma(a, C)=\frac{1}{|C|-1}\sum_{a \neq a' \in C}\sigma(a, a')$</p>
Surprise is defined as the inverse of the average similarity -
<p style="text-align:center;">$latex surp(a, C)=\frac{1}{\sigma(a, C)}$</p>
Example of results for this measure for Hedy Lamarr -

<img class=" size-full wp-image-1109 aligncenter" src="/wp-content/uploads/2017/10/surprise.png" alt="surprise" width="328" height="93" />

As you can see in the example above the surprise factor itself is not enough as it does not capture other aspects in Hedy Lamarr’s life (e.g. she invented radio encryption!).

Examining those categories and seeing that they are very spread led the team to the define the cohesiveness of category.

<b>Cohesiveness</b>

Cohesiveness of a category measures the similarity between items in the same category. Intuitively if an item is not similar to the other items in the category it might indicate that it is a trivia fact (or as mention later in the paper - detect anomalies).

Practically speaking the cohesiveness if category C is defined as the average similarity between each pair of articles in the category.
<p style="text-align:center;">$latex cohesive(C)=\frac{1}{{|C| \choose 2}}\sum_{a \neq a'} \sigma(a, a')$</p>
Hedy Lamarr's results w.r.t to cohesiveness -

<img class=" size-full wp-image-1114 aligncenter" src="/wp-content/uploads/2017/10/after.png" alt="after" width="326" height="79" />

<b>Tying it together</b>

The trivia score of article a to category C is define as:
<p style="text-align:center;">$latex trivia(a, C)=cohesive(C) \cdot surp(a, C) = \frac{cohesive(C)}{\sigma(a, c)}$</p>
<span style="font-weight:400;">Interpret trivia score:</span>
<ul>
	<li>Around one - this means that $latex cohesive(C) \approx \sigma(a, C)$. Meaning - the article is typical for the category, i.e. similar to other articles in the category.</li>
	<li>Much lower than one - “the article is more similar to other articles in the category than the average”. That means the article is a very good representative of the category.</li>
	<li>Higher than one - the article is not similar to the category, i.e is an “outsider” which make it a good trivia candidate.</li>
</ul>
<img class=" size-full wp-image-1117 aligncenter" src="/wp-content/uploads/2017/10/cohesivenessvssurprise.png" alt="cohesivenessVsSurprise" width="334" height="345" />

<strong>Article similarity</strong>

Standard similarities methods don't fit this case from 2 mains reasons -
<ol>
	<li>The authors look for <strong>broad similarity </strong>and not details similarities.</li>
	<li>Term frequency vector capture semantic similarity which sometimes get lost even after using normalization techniques.</li>
</ol>
Algorithm
<ul>
	<li>Describe each article by the top <em>K TF-IDF</em> in the text. The TF-IDF is trained on a sample of 10,000 wikipedia articles after stemming, stop-words removal and case folding. K=10 in their settings. The table below show the results for the articles "Sherlock Holmes", "Dr. Watson" and "Hercule Poirot". As one can see it captures the spirit of the things but there are not exact matches.</li>
</ul>
<img class="  wp-image-1195 aligncenter" src="/wp-content/uploads/2017/10/tfidf.png" alt="tfidf" width="434" height="271" />
<ul>
	<li>To answer the exact match problem the authors used <a href="https://arxiv.org/abs/1301.3781">Word2Vec</a> pre-trained model from Google News.
<ul>
	<li>$latex T_1$ and $latex T_2$ are the set of the top K TF-IDF term for articles $latex a_1, a_2$ respectively.</li>
	<li>For each term in $latex T_1$ find the most similar term in $latex T_2$ based on Word2Vec pre-trained model (and vice versa) and sum those similarities.</li>
</ul>
</li>
</ul>
<p style="text-align:center;">$latex \sigma(a_1, a_2)=\frac{1}{Z}\sum_{i=1}^K w_{i}\cdot(max_{1 \leq j \leq K}\sigma(T_1[i], T_2[j]) +max_{1 \leq j \leq K}\sigma(T_2[i], T_1[j]))$</p>
where $latex w_i=K-i+1$ and $latex Z=2 \cdot  { K+1 \choose 2}$

Further optimization on the computation such as caching, comparing only to subset of articles and parallel computation can be done when coming to implement this algorithm in production settings.

<strong>Evaluation</strong>

The authors evaluated their algorithm empirically against -
<ul>
	<li><a href="https://arxiv.org/pdf/1510.03025.pdf">Wikipedia Trivia Miner</a> - "A ranking algorithm over wikipedia sentences which learns the notion of interstingness using domain-independent linguistic and entity based features."</li>
	<li>Top Trivia - highest ranking category according to the paper algorithm.</li>
	<li>Middle-ranked Trivia - middle-of-the-pach ranked categories according to the paper algorithm.</li>
	<li>Bottom Trivia - lowest ranked categories according to the paper algorithm.</li>
</ul>
The authors crawled wikipedia and created a dataset of trivia facts for 109 articles. For each article they created a trivia fact for each algorithm. The textual format was "a is in the group C".

<strong>Trivia Evaluation Study</strong>

Using the trivia facts above each fact was presented to 5 crown workers yielding 2180 evaluations.

The respondents were asked to agree \ disagree the facts according to the following statements or note that they don't understand the fact:
<ol>
	<li>Trivia worthiness - "This is a good trivia fact".</li>
	<li>Surprise - "This fact is surprising"</li>
	<li>Personal knowledge - "I knew this fact before reading it here"</li>
</ol>
The score of a fact was determined by the majority vote.

Result -
<ul>
	<li>The top trivia facts are significantly better than the WTM facts</li>
	<li>The consensus on the trivia worthiness of the top facts compared to the WTM facts is higher (32.8% vs 11.9%).</li>
</ul>
[caption id="attachment_1155" align="aligncenter" width="344"]<img class=" size-full wp-image-1155 alignleft" src="/wp-content/uploads/2017/10/goodfact.png" alt="goodFact" width="344" height="237" /> Is it trivia worthy fact?[/caption]

[caption id="attachment_1163" align="aligncenter" width="329"]<img class=" size-full wp-image-1163 alignleft" src="/wp-content/uploads/2017/10/surprisingfact.png" alt="surprisingFact" width="329" height="231" /> Is it a surprising fact?[/caption]

[caption id="attachment_1166" align="aligncenter" width="300"]<img class="  wp-image-1166 aligncenter" src="/wp-content/uploads/2017/10/knewbeforefact.png" alt="knewBeforeFact" width="300" height="210" /> Did you know this fact before?[/caption]

<strong>Engagement Study</strong>

In this part the team used google ad to tie trivia facts to searches and analyzed the bounce rate and time on page for the collected clicks (almost 500).

Results -
<ul>
	<li>CTR was not significantly different than reported results in the market (0.8) - i.e does not indicate willingness of users to explore trivia facts.</li>
	<li>Bounce rate (time of page &lt; 5 seconds) for bottom trivia was 52%, for WTM facts 47% and for top trivia 37%.</li>
	<li>Average time on page was significantly better in top trivia comparing to bottom trivia (48.5 seconds vs 30.7) but was not significant comparing to WTM (43.1 seconds).</li>
	<li>One reason for people to spend time on WTM fact pages was because the presented sentences ware longer than the sentences presented for the top trivia and had a higher change of being confusing so people take time to understand them.</li>
</ul>
<strong>Discussion and Further work</strong>

Limitation - the algorithm works well for human entities but worse on other domain such as movies and cities.

Future work -
<ul>
	<li>Better phrasing of the trivia facts - instead of “X is a member of group Y” —&gt; “Obama won Best Spoken word Album Grammy Awards for abridged audiobook versions of Dreams from My Father in February 2006 and for the Audacity of Hope in February 2008”.</li>
	<li>Turning trivia facts to trivia questions - for the example above generate a question of the form - “Which US presider is a Grammy award winner?” And not “Who won a Grammy award” or “What did Barack Obama win?”</li>
</ul>
<p style="padding-left:30px;">[TR] - this would require additional notation of a good trivia question. The “good” question in this example is interesting since it involves a contrast between two categories.</p>
Other applications -
<ul>
	<li>Anomaly detection - surprising facts are sometimes surprising because they are wrong. Using this algorithm we can clean those and improve Wikipedia reliability.</li>
	<li>Predict most surprising article in a given category</li>
	<li>Improve search experience by enriching result with trivia facts</li>
</ul>
<p style="padding-left:30px;">[TR] - Improve learning experience on learning platforms by enriching the UI with trivia facts.</p>
<span style="font-weight:400;">Extensions -</span>
<ul>
	<li>Personalized trivia score - as commented above, different reader can find different facts more \ less interesting (see <a href="http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.696.9837&amp;rep=rep1&amp;type=pdf">here</a>) so the score should be personalized and take into account different properties of the reader such as demographic and even more temporal like mood.</li>
	<li>[TR] - Additional extensions involve trivia facts between entities such as "Michelle Obama and Melania Trump are in the same height", "X and Y were born in the same date".</li>
</ul>
