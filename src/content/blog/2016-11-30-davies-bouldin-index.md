---
title: "Davies-Bouldin Index"
pubDate: 2016-11-30T19:06:54.000Z
permalink: "/2016/11/30/davies-bouldin-index/"
tags: []
draft: false
---
TL;DR - Yet another clustering evaluation metric

Davies-Bouldin index was suggested by David L. Davies and Donald W. Bouldin in "A Cluster Separation Measure" (<i>IEEE Transactions on Pattern Analysis and Machine Intelligence</i>. PAMI-1 (2): 224–227. doi:<a class="external text" href="https://dx.doi.org/10.1109%2FTPAMI.1979.4766909" rel="nofollow">10.1109/TPAMI.1979.4766909</a>, <a href="https://www.researchgate.net/profile/Don_Bouldin/publication/224377470_A_Cluster_Separation_Measure/links/02e7e52d57df1ad121000000.pdf">full pdf</a>)

Just like Silhouette score, Calinski-Harabasz index and Dunn index, Davies-Bouldin index provide an internal evaluation schema. I.e. the score is based on the cluster itself and not on external knowledge such as labels.

The Silhouette score reflects how similar a point is to the cluster it is associated with. I.e .for each point with compute the average distance of the point from the points in the nearest cluster minus the average distance of the point from the points in its own cluster divided by the maximum between those distances. The overall score is the average of the score per point. The Silhouette score is bounded from -1 to 1 and higher score means more distinct clusters.

The Calinski-Harabasz index compares the variance between-clusters to the variance within each cluster. This measure is much simpler to calculate then the Silhouette score however it is not bounded. The higher the score the better the separation is.

The intuition behind Davies-Bouldin index is the ratio between the within cluster distances and the between cluster distances and computing the average overall the clusters. It is therefore relatively simple to compute, bounded - 0 to 1, lower score is better. However, since it measures the distance between clusters' centroids it is restricted to using Euclidean distance function.

Silhouette score and Calinski-Harabasz index were previously implemented and are part of <a href="http://scikit-learn.org/stable/">scikit-learn</a> and I implemented Davies-Bouldin index. Hopefully this will be my first contribution to scikit-learn, my implementation is <a href="https://github.com/tomron/scikit-learn/tree/davies_bouldin_index">here</a>.
