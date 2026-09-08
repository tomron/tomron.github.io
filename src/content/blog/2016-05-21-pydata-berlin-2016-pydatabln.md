---
title: "PyData Berlin 2016 #pydatabln"
pubDate: 2016-05-21T18:15:48.000Z
permalink: "/2016/05/21/pydata-berlin-2016-pydatabln/"
tags: []
draft: false
---
I got a diversity scholarship from <a href="http://www.numfocus.org/">Num Focus</a> to attend the PyData Berlin event. Num Focus is an NGO which supports open source data science projects among them - Jupyter, matplotlib, Numpy, pandas etc.
<div>This post is not a summary of the events or of the talks that I attended in but rather hints to a subset of the talks.</div>
<div></br><b><u>Keynote - </u></b><b><u>Olivier Grisel (Inria)</u></b></div>
<div><a href="http://ogrisel.com/">Grisel</a> talked about the Evolution of predictive modeling and scaling predictive modeling. Why do we need to scale predictive modeling -</div>
<div>
<ol>
	<li>I\O intensive operations - e.g feature engineering and model serving.</li>
	<li>CPU intensive operations - e.g hyper-parameters search and cross validation.</li>
</ol>
</div>
<div>PySpark seems like a very legit tool but it has its' drawbacks -</div>
<div>
<ul>
	<li>No pure python local mode - impossible to use profiler or ipdb</li>
	<li><span style="color:#333333;font-family:Lato, sans-serif;">There is latency which is induced by the network architecture (Python driver -&gt; Scala (JVM) -&gt; Python worker)</span></li>
	<li>Traceback is sometimes hard to understand as there is a mix of scala and python errors and log data.</li>
</ul></div>
<div>Grisel suggest to use instead <a href="https://github.com/dask/dask">Dask</a> and <a href="https://github.com/dask/distributed">Distributed</a> as a native python packages for parallel and distributed computing.</div>
<div>Being a young project dask also have its' limitation - mainly no distributed shuffles which means it does not support distributed merge, join, groupby and aggregation operations at the moment.</div>
<div></br><b><u>Frontera: open source, large scale web crawling framework (Alexander Sibiryakov, ScrapingHub)</u></b></div>
<div>When I read the talk abstract I was not sure what the difference between <a href="https://github.com/scrapinghub/frontera">Frontera</a> and Scrapy. Hearing this talk the goal of Frontera is actually different - schedule crawling and crawling strategy. In their architecture they use scrapy for crawling but can use other crawlers as well.</div>
<div>After introducing Frontera, Sibiryakov showed their result of crawling the Spanish internet and the problems they faced. Some of the solutions were quite trivial - indexing the data differently to avoid hotspot, caching, limiting the depth of crawling \ number of pages per host, etc. I cannot say that I was fully convinced.</div>
<div></br><b><u>Setting up predictive analytics services with Palladium (Andreas Lattner, Otto group)</u></b></div>
<div>The evolution of company tool - 80% development time, 20% deployment overhead which tend to repeat between different projects. So why not make a framework and try to automate it. This is exactly the reason Otto group developed <a href="https://github.com/ottogroup/palladium">Palladium</a> - ease the development, deployment and integration predictive analytics services.</div>
<div>The main limitation of Palladium is that it does no support distributed calculation. Another issue is controlling the results on real time - boosting, filtering, etc. At current time, <a href="http://prediction.io/">prediction.io</a> (not written in Python) is in a more mature state.</div>
<div></br><u><b>Spotting trends and tailoring recommendations: PySpark on Big Data in fashion (Martina Pugliese, Mallzee)</b></u></div>
<div>Mallzee, as stated by Pugliese is "the tinder of fashion". I.e the applications shows you a stream of fashion items from multiple providers and you swipe them left and right according to your preferences.Their current big challenge is to produce valuable recommendation for each customer.</div>
<div>Their input on one hand are the items and the items information which they crawl from the providers websites and normalize to fit into their set of tags and properties and of course the brand itself. The second input is the user behaviors - swipes, buy actions, favourite and non favourite brands, etc. Their current choice is creating a random forest for each user based on their actions. This approach can work for users with a lot of signals and specifically positive signal (buy and positive swipes). Possibly the next step will be to cluster the users to learn more about the users with log positive signals.</div>
<div></br><b><u>Practical Word2Vec in Gensim (</u></b><b><u>Lev Konstantinovskiy, Gensim)</u></b></div>
<div></br><a href="http://radimrehurek.com/gensim/">Gensim</a> is a "topic modeling for humans". It implements many interesting algorithm including lda, word2vec and doc2vec, lot's of potential and interesting to play with.</div>
<div>But this tutorial was a mess.. the class didn't fit to a tutorial, not enough space, not tables people can put their computers on and really run the code.</div>
Konstantinovskiy wanted to present many options and ideas and run too fast between the different algorithms without really explaining them. On the other hand there was not really a focus on running the code and showing the package API. Unfortunately I feel this talked was a bit miss handled.
<div></br><b><u>Bayesian Optimization and it's application to Neural Networks (Moritz Neeb, TU Berlin)</u></b></div>
<div>What I would take from this talk is approaching Hyper parameter tuning as an optimization problem. For example when we use grid search for hyper parameter tuning we invest a lot of resources but the experiments are independent from one another and we don't learn from one another. Instead we can possible introduce a method which have some interactions between the different experiments.</div>
<div>Neeb introduced an approach which treat it as a Gaussian Process and at each point try to evaluate the point with the maximal possible gain.</div>
<div>He also mentioned few Python libraries -</div>
<div>
<ul>
	<li><a href="https://github.com/HIPS/Spearmint">Spearmint</a> - designed to automatically run experiments (thus the code name spearmint) in a manner that iteratively adjusts a number of parameters so as to minimize some objective in as few runs as possible.</li>
	<li><a href="http://www.automl.org/hpolib.html">HPOlib</a> - hyperparameter optimization library</li>
	<li><a href="http://jaberg.github.io/hyperopt/">Hyperopt</a> -  is a Python library for optimizing over awkward search spaces with real-valued, discrete, and conditional dimensions.</li>
</ul>
</div>
<div></br><strong><u>Keynote - Wes McKinney (Cloudera)</u></strong></div>
<div><a href="http://wesmckinney.com/">Wes McKinney</a> is probably Mr. Open Source he involved and leading some of the most known data science open source projects (in python but not only) - pandas, <a href="https://arrow.apache.org/">Apache Parquet</a>, etc.</div>
<div>His talk had roughly 2 parts - talking about the community, code of conduct, etc. and challenges that he believes will play a major role in data science \ python \ big data communities in the near future. Some of the project \ ideas \ challenges he mentioned -</div>
<div>
<ul>
	<li><a href="https://conda-forge.github.io/">conda-forge</a></li>
	<li><a href="https://github.com/pypa/manylinux">manylinux</a> - Python wheels that work on any linux (almost)</li>
</ul>
</div>
<div></br><b><u>What's new in Deep Learning (Dr Kashif Rasul, Zalando SE)</u></b></div>
<div>Deep learning survey on speeds.. Survey of several recent papers in deep learning. Beside on mention of Theano and short example of code no strong connection to Python. I would have compromise to less code and slower pace.</div>
<div>Some of the papers he pointed at -</div>
<div>
<ul>
	<li><a href="http://jmlr.org/proceedings/papers/v9/glorot10a/glorot10a.pdf">Understanding the difficulty of training deep feedforward neural networks</a> (Glorot and Bengio) - The term Xavier initialization comes from here. See <a href="http://andyljones.tumblr.com/post/110998971763/an-explanation-of-xavier-initialization">here</a> for additional information.</li>
	<li><a href="https://arxiv.org/pdf/1502.01852.pdf">Delving Deep into Rectifiers:Surpassing Human-Level Performance on ImageNet Classification</a> (He, Zhang, Ren, Sun - Microsoft research)</li>
	<li><a href="https://arxiv.org/pdf/1502.03167.pdf">Batch Normalization: Accelerating Deep Network Training byReducing Internal Covariate Shift</a> (Ioffe and Szegedy - Google) - A method to accelerate the training of deep neural network by modifying the distribution of activations. See tutorial <a href="https://standardfrancis.wordpress.com/2015/04/16/batch-normalization/">here</a>.</li>
</ul>
</div>
<div></br><b><u>A full Machine learning pipeline in Scikit-learn vs in scala-Spark: pros and cons (Jose Quesada, Data Science Retreat)</u></b></div>
<div>Jose Quesada presented their experience with teaching and using Python Scikit learn versus Scala Spark. The most interesting points in my opinion were the PySpark limitation and future directions and of course comparison of existing features.</div>
<div>One of the most important insights was to use spark <a href="https://databricks.com/blog/2015/02/17/introducing-dataframes-in-spark-for-large-scale-data-science.html">DataFrames</a>. <a href="http://spark.apache.org/docs/latest/ml-guide.html">spark.ml</a> is built on the top of dataframes and will replace Spark MLlib in the future.</div>
<div></br><b><u>Data Integration in the World of Microservices (Valentine Gogichashvili, Zalando)</u></b>
</div>
<div>Gogichashvili is the head of Data Engineering in Zalando and is working there for already 5.5 years which means he was there during business, structural and technological changes the organization went through.</div>
<div>While he talked about micro-services architecture I think there were two other interesting inputs in the talk -</div>
<div>
<ul>
	<li>Team structure - every team is responsible for their own components and infrastructure (including naming) while their align to engineering guidelines such as API structure, data types, etc. which are set by cross team guilds.</li>
	<li>Open source code - whenever a team starts a new project by default the project will grow to be an open source unless they reason about why not. Zalando open source projects can be viewed <a href="https://github.com/zalando/">here</a>.</li>
</ul>
</div>
<div></br><b><u>Brand recognition in real-life photos using deep learning (Lukasz Czarnecki, Samsung)</u></b></div>
<div>Czarnecki presented his project from Data Science retreat - brand recognition in Instagram photos where he combined neural networks with SVM. He showed the base line he started from (+ some preprocessing) and the steps he made to improve his results.</div>
<div>Some of the steps he did -</div>
<div>
<ul>
	<li>Increase training set from 300 images for brand to 800</li>
	<li>Multiply the training set by cropping part of the pictures.</li>
	<li>Looking on the error and adding training examples to make the NN more general</li>
	<li>Increases threshold of the SVM</li>
</ul>
</div>
<div>That's all for now, until next year :)</div>
