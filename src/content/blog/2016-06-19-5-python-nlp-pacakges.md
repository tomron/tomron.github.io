---
title: "5 Python NLP pacakges"
pubDate: 2016-06-19T20:42:34.000Z
permalink: "/2016/06/19/5-python-nlp-pacakges/"
tags: []
draft: false
---
<div>NLP is a broad term which contains many types of question and challenges such as - language detection, Part-of-Speech tagging, relation extraction, named entity recognition, OCR, speech recognition, sentiment extraction and many more.</div>
<div></div>
<div>There are of course, several Python libraries which try to tackle some of those problems. This post aims to provide a short overview of those packages.</div>
<div></div>
<div></br><b><u>NLTK</u></b></div>
<div>Probably the oldest and the most known package in this area. Started in 2001 in Penn State Computer Science department the Natural Language Toolkit aims to support scientific research. Last stable release was released at the beginning of April, so the project is live and develops all the time.</div>
<div>The NLTK package includes wide variety of modules including - text tokenization, pos tagging, text classification, sentiment analysis, etc.</div>
<div>The downside of this package is that it is many times ungainly, heavy, complicated. It is more of academic level than on industry level. If you have lot's of text to analyze, specially if it is complicated, expect it to run for ages.</div>
<div></div>
<div><a href="http://www.nltk.org/" target="_blank">http://www.nltk.org/
</a></div>
<div><a href="http://www.nltk.org/book/" target="_blank">http://www.nltk.org/book/
</a></div>
<div></div>
<div></br><b><u>Spacy.io</u></b></div>
<div></div>
<div>Possibly NLTK strongest competitor with the goal of creating production level code.</div>
<div>Main capabilities include tokenizing, tagging, parsing, entity recognition and pattern matching. For now only supports English and German.</div>
<div>It is faster and suits more to industrial needs, but the community is still small comparing to NLTK and the features are also behind.</div>
<div></div>
<div><a href="https://spacy.io/" target="_blank">https://spacy.io/
</a></div>
<div><a href="https://spacy.io/" target="_blank"> </a></div>
<div>
<div>
<b><u>gensim
</u></b></div>
<div>'Topic modelling for humans"</div>
<div>Implements top notch algorithms focusing on topic modeling, documents ranking and significant terms identification, e.g. - tf-idf, word2vec, doc2vec, latent Dirichlet allocation (LDA), latent semantic analysis (LSA). Some of the algorithms can be run in a distributed manner.</div>
<div>Uses NumPy and SciPy for efficient processing.</div>
<div><b> </b></div>
<div><a href="https://radimrehurek.com/gensim/" target="_blank">https://radimrehurek.com/gensim/</a></div>
</div>
<div></div>
<div></div>
<div></br><b><u>LDIG</u></b></div>
<div>While NLTK old the philosophy of "one package rule them all". LDIG does one thing - language detection for short text, i.e n-grams distribution are based on twitter and meant to analyze texts with at least 3 words. Rather then relatively short texts.</div>
<div>They 99.1% accuracy over 17 languages. From my experience the accuracy with ldig was a bit lower (around 80%). However, still relatively good specially for Latin languages.</div>
<div><b><u> </u></b></div>
<div><a href="https://github.com/shuyo/ldig" target="_blank">https://github.com/shuyo/ldig
</a></div>
<div><a href="https://shuyo.wordpress.com/2012/02/21/language-detection-for-twitter-with-99-1-accuracy/" target="_blank">https://shuyo.wordpress.com/2012/02/21/language-detection-for-twitter-with-99-1-accuracy/
</a></div>
<div></br><b><u>scikit-learn</u></b></div>
<div>Scikit-learn is one of the biggest machine learning pacakges in Python. As NLP is one application of machine learning it features also specific modules to deal with text. So once you know the mathematical background of the algorithm you want to use you can use scikit-learn implementation.</div>
<div></div>
<div></br>Text feature extraction - <a href="http://scikit-learn.org/stable/modules/feature_extraction.html#text-feature-extraction">http://scikit-learn.org/stable/modules/feature_extraction.html#text-feature-extraction</a></div>
<div>LDA - <a href="http://scikit-learn.org/dev/modules/generated/sklearn.decomposition.LatentDirichletAllocation.html">http://scikit-learn.org/dev/modules/generated/sklearn.decomposition.LatentDirichletAllocation.html</a></div>
