---
title: "5 interesting things (11/9/2015)"
pubDate: 2015-09-11T12:28:40.000Z
permalink: "/2015/09/11/5-interesting-things-1192015/"
tags: []
draft: false
---
<strong><u>Density based clustering</u></strong> - the clearest and most practical guide I read about density based clustering.

<a href="https://archive.org/details/stackexchange" target="_blank">http://blog.dominodatalab.com/topology-and-density-based-clustering/</a>

<strong><u>Word segment</u></strong> - this python library which is train with over a trillion-word corpus aims to help segment text to words. E.g "thisisatest" to "this is a test". I tried a random example -"helloworld' and it didn't split it at all. I tried other examples as well ("mynameis&lt;x&gt;", "ilivein&lt;y&gt;", etc) and it worked well. Beside the segmentation functionality it also offers unigrams and bigrams counting this can be usable for all kind of applications without the need to get the data, clean it and process it yourself. Numbers do not appear in the unigram count, I find it interesting for other needs rather than splitting.

<a href="http://www.grantjenks.com/docs/wordsegment" target="_blank">http://www.grantjenks.com/docs/wordsegment</a>

<strong><u>Funny haha?!</u></strong> Predicting if a joke is funny or not based on the words it contains using Naive Bayes classifier from NLTK package. It is a good and funny beginners tutorial. NLTK contains additional classifiers beside Naive Bayes Classifier, e..g Decision Tree Classifier, it would also be interesting to see how they preform on this dataset.

<a href="http://vknight.org/unpeudemath/code/2015/06/14/natural-language-and-predicting-funny/">http://vknight.org/unpeudemath/code/2015/06/14/natural-language-and-predicting-funny/</a>

<strong><u>Scaling decision forests lessons learned</u></strong> - some of those lessons are specific to decision forests, some are for scaling and some are general good practices. I wish there was a more found discussion about dealing with missing data \ features. Not specifically in this post but in general.

<a href="http://blog.siftscience.com/blog/2015/large-scale-decision-forests-lessons-learned">http://blog.siftscience.com/blog/2015/large-scale-decision-forests-lessons-learned</a>

<strong><u>Redshift howto</u></strong> - very extensive guide to redshift, mostly admin and configuration related stuff. I miss another chapter regarding tools above redshift such as <a href="http://docs.redash.io/en/latest/">re:dash</a>.

<a href="https://www.periscope.io/amazon-redshift-guide">https://www.periscope.io/amazon-redshift-guide</a>
