---
title: "Map Spark UDAF (Java)"
pubDate: 2017-07-10T17:06:46.000Z
permalink: "/2017/07/10/map-spark-udaf-java/"
tags: []
draft: false
---
I run Spark code on Java. I had data with the following schema -

[code language="bash"]
root
|-- userId: string (nullable = true&lt;/span&gt;
|-- dt: string (nullable = true)&lt;/span&gt;
|-- result: map (nullable = true)&lt;/span&gt;
|    |-- key: string
|    |-- value: long (valueContainsNull = true)
[/code]

And I wanted to get a single record for a user which has the following schema -

[code language="bash"]
root
|-- userId: string (nullable = true)&lt;/span&gt;
|-- result: map (nullable = true)
|    |-- key: string
|    |-- value: map (valueContainsNull = true)
|    |    |-- key: string
|    |    |-- value: long (valueContainsNull = true)
[/code]

Attached the user defined aggregation function I wrote to achieve it. Before that -

[code language="bash"]
MergeMapUDAF mergeMapUDAF = new MergeMapUDAF();
df.groupBy(&quot;userId&quot;).agg(mergeMapUDAF.apply(df.col(&quot;dt&quot;), df.col(&quot;result&quot;)).as(&quot;result&quot;));
[/code]

https://gist.github.com/tomron/36fd3c1b41169fc40acaeb4dbe95067d
