---
title: "Apache Flink workshop"
pubDate: 2015-09-04T13:25:51.000Z
permalink: "/2015/09/04/apache-flink-workshop/"
tags: []
draft: false
---
<div><span style="font-family:arial, helvetica, sans-serif;">On Wednesday I took part in "<a href="http://www.meetup.com/Apache-Flink-Meetup/" target="_blank">Stream Processing with Apache Flink</a>". The workshop was hosted by Carmeq and was super generous.</span></div>
<div><span style="font-family:arial, helvetica, sans-serif;"> </span></div>
<div><span style="font-family:arial, helvetica, sans-serif;">Apache Flink is a distributed streaming dataflow engine. There are several obvious competitors including Apache Spark, Apache storm and MapReduce (and possible apache tez).</span></div>
<div><span style="font-family:arial, helvetica, sans-serif;"> </span></div>
<div><span style="font-family:arial, helvetica, sans-serif;">The main question for me when coming to adopt a new tool is why it is better than what I already use, which problems that it solves for me.</span></div>
<div><span style="font-family:arial, helvetica, sans-serif;"> </span></div>
<div><span style="color:#252525;font-family:arial, helvetica, sans-serif;">Apache Flink's main advantages comparing to Apache Storm is the batch capabilities, support windowing and exactly once guarantee. Apache storm is designed for event processing, i.e. streaming data. The streaming window allow very easy and native aggregation by both time and capacity windows.</span></div>
<div><span style="color:#252525;font-family:arial, helvetica, sans-serif;"> </span></div>
<div><span style="color:#252525;font-family:arial, helvetica, sans-serif;">Advantages comparing to MapReduce are strong support of pipelines and iterative jobs as well as many types of data - Flink is more high level than MR. And of course the streaming.</span></div>
<div><span style="color:#252525;font-family:arial, helvetica, sans-serif;"> </span></div>
<div><span style="color:#252525;font-family:arial, helvetica, sans-serif;">Comparing to Apache Spark, the implementation of spark streaming is different and is implemented as small batches. Apache Spark is limited by memory size which Flink is less sensitive to it. However, I think Spark has a very big advantage at the moment by having API's to R and Python (in addition to Scala and Java) which are very common for data scientist while Flink currently supports only Scala and Java.</span></div>
<div><span style="font-family:arial, helvetica, sans-serif;"> </span></div>
<div><span style="color:#252525;font-family:arial, helvetica, sans-serif;">Both Spark and Flink has Graph (Graphx and Gelly) and machine learning (MLLib and FlinkML) support which make them much more friendlier and high level than both MapReduce and Storm.</span></div>
<span style="font-family:arial, helvetica, sans-serif;">I think both Spark and Flink have a lot of things in common and knowing one it is relatively easy to switch to the other. Currently Apache spark is much more popular - <a href="http://stackoverflow.com/search?q=apache+spark">2273</a> results vs <a href="http://stackoverflow.com/search?q=apache+flink">59</a> results on stackoverflow and 8270000 results vs 363000 on google.</span>
<div><span style="color:#252525;font-family:arial, helvetica, sans-serif;">For further reading - <a href="http://dataartisans.github.io/flink-training/overview/slides.html">flink overview</a>.</span></div>
<div><span style="font-family:arial, helvetica, sans-serif;"> </span></div>
<div><span style="color:#252525;font-family:arial, helvetica, sans-serif;">The workshop focused on flink and we went through the slides and exercises in the <a href="http://dataartisans.github.io/flink-training/">flink training site</a>. There were few issues - bugs, java version, flink version issues but it was generally well organized and the guides were eager to help and to explain.</span></div>
<div><span style="font-family:arial, helvetica, sans-serif;"> </span></div>
<div><span style="color:#252525;font-family:arial, helvetica, sans-serif;">Related links - </span></div>
<ul>
	<li><span style="font-family:arial, helvetica, sans-serif;"><span style="color:#252525;"><a href="http://www.kdnuggets.com/2015/05/interview-matei-zaharia-creator-apache-spark.html">Interview with </a></span><a href="http://www.kdnuggets.com/2015/05/interview-matei-zaharia-creator-apache-spark.html">Matei Zaharia, creator of Apache Spark</a></span></li>
	<li><span style="font-family:arial, helvetica, sans-serif;"><a href="http://flink-forward.org/">Flink forward conference</a> - in Berlin next month</span></li>
	<li><span style="font-family:arial, helvetica, sans-serif;"><a href="http://www.meetup.com/Apache-Flink-Meetup/">Flink meetup Berlin</a></span></li>
</ul>
