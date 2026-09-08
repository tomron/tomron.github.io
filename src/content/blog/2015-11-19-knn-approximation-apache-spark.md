---
title: "KNN approximation Apache Spark"
pubDate: 2015-11-19T19:30:31.000Z
permalink: "/2015/11/19/knn-approximation-apache-spark/"
tags: []
draft: false
---
<p dir="ltr">K-nearest-neighbors is a very well known classification algorithm. It is based on the phrase - "show me who your friends are and I'll tell you who you are".</p>
<p dir="ltr">Apache Spark MLLib contains several algorithms including linear regression, k-means, etc . But it does not currently include an implementation to KNN. One of the reasons for that is the time complexity it requires (roughly n^2 where n is the number of items, ignoring the dimension).
At Apache Spark JIRA you can see 2 tickets involving this issue - <a href="https://issues.apache.org/jira/browse/SPARK-2335">SPARK-2335</a>, <a href="https://issues.apache.org/jira/browse/SPARK-2336">SPARK-2336</a>. The first ask for KNN feature and discuss the difficulties. The second, open based on the first, discuss approximations to KNN and wish to implement it.</p>
<p dir="ltr">I implemented a very naive approximation to KNN algorithm on Apache Spark with a distance function of similarity (looking for max) rather hen euclidian but this can be easily changed (change distance function and change sorting key in line 71).</p>
<p dir="ltr">The algorithm is based on splitting the data to partitions and calculating item distances only in the same partition. You can increase the accuracy either by decreasing the number of partitions (compare to more items) or by repeating the process several times (repartition differently every time) and choose the best results.</p>
This calculation retrieves the list of the most similar neighbors and then one can decide how to use this data.
<p dir="ltr">My gist - <a href="https://gist.github.com/tomron/70e5fefe128214b7d2a1">https://gist.github.com/tomron/70e5fefe128214b7d2a1</a></p>
