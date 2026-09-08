---
title: "Getting started with Spark and Scala - 3 questions"
pubDate: 2015-06-18T18:17:47.000Z
permalink: "/2015/06/18/getting-started-with-spark-and-scala-3-questions/"
tags: []
draft: true
---
<div>I recently started to dive into Spark and Scala as this is an important tool for data scientist. Few questions crossed my mind while learning and I dug a bit around them -</div>
<div></div>
<div></div>
<strong>1. What is the difference between var and val?</strong>
<div style="text-align:center;"><em>"val means value and var means variable".</em></div>
<p style="text-align:center;"><em>"val means immutable and var means mutable."</em></p>

<div><a href="http://stackoverflow.com/questions/1791408/what-is-the-difference-between-a-var-and-val-definition-in-scala">Answer in stackoverflow</a></div>
<div></div>
<div><strong>2. Why is spark shuffling better that hadoop?</strong></div>
<ul>
	<li>Survey by Cloudera about Spark shuffling and how it changed and improved over the different versions - <a href="http://blog.cloudera.com/blog/2015/01/improving-sort-performance-in-apache-spark-its-a-double/">http://blog.cloudera.com/blog/2015/01/improving-sort-performance-in-apache-spark-its-a-double/</a></li>
	<li>
<div>Spark shuffle under the hood - <a href="http://www.slideshare.net/colorant/spark-shuffle-introduction">http://www.slideshare.net/colorant/spark-shuffle-introduction</a></div></li>
	<li>Strata conference - writing better spark programs - give tips regarding optimization of sparks programs, including avoiding shuffling when needed - <a href="http://strataconf.com/big-data-conference-ca-2015/public/schedule/detail/38391">http://strataconf.com/big-data-conference-ca-2015/public/schedule/detail/38391</a></li>
</ul>
<div><strong>3. PySpark vs Scala</strong></div>
<div></div>
<div>Apache Spark is written in Java and Scala and has API to several other programming language. As I come from Python, the easiest option for me is to use PySpark, but what do I miss? should I invest time learning Scala?</div>
<div>Actually two sides to the questions - performance and capabilities.</div>
<div></div>
<div>I first came across this answer in <a href="http://stackoverflow.com/questions/17236936/api-compatibility-between-scala-and-python">stackoverflow</a> but it was a bit old - spark version 0.9 which today we are on version 1.4. I then saw this <a href="http://emptypipes.org/2015/01/17/python-vs-scala-vs-spark/">blog post</a> which compare the performances of several spark APIs. The main issue I have with this post (beside not mentioning the versions used) is that the test files are quite small but the gaps between the different approaches are clear.</div>
<div></div>
<div></div>
<div>Regarding the capabilities, going briefly over the documentation - <a href="https://spark.apache.org/docs/latest/programming-guide.html">programming guide</a>, <a href="https://spark.apache.org/docs/latest/api/scala/index.html#package">scala API</a>, <a href="https://spark.apache.org/docs/latest/api/python/">pyspark documentation</a>. It naturally seems that for basic usage scala and python API's have the same interfaces, possibly with different input \ output to adjust the the language doctrine. The scala API seems to have a bit more functionality which</div>
<div></div>
<div>
<div>Bottom line - for me, I believe that in order to use spark better and to enjoy the benefits I rather learn and use scala.</div>
<div></div>
<div><strong>4. What's next?</strong></div>
</div>
<div></div>
<div>Spark R API (SparkR) is one of the big new additions in Spark 1.4 version, what's next?</div>
<div>This is the <a href="https://issues.apache.org/jira/browse/SPARK?selectedTab=com.atlassian.jira.jira-projects-plugin:roadmap-panel">road-map of the project</a>.</div>
<div>I'm a specially interested about new features (API \ porting, additional SQL capabilities, etc), but also bug fixing and maintenance is important. As I have only played with Spark so far and didn't work with it extensively I cannot yet point on my features wishlist.</div>
<div></div>
