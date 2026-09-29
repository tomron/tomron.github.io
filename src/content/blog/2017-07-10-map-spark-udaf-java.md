---
title: "Map Spark UDAF (Java)"
pubDate: 2017-07-10T17:06:46.000Z
permalink: "/2017/07/10/map-spark-udaf-java/"
tags: []
draft: false
---
I run Spark code on Java. I had data with the following schema -

```text
root
|-- userId: string (nullable = true)
|-- dt: string (nullable = true)
|-- result: map (nullable = true)
|    |-- key: string
|    |-- value: long (valueContainsNull = true)
```

And I wanted to get a single record for a user which has the following schema -

```text
root
|-- userId: string (nullable = true)
|-- result: map (nullable = true)
|    |-- key: string
|    |-- value: map (valueContainsNull = true)
|    |    |-- key: string
|    |    |-- value: long (valueContainsNull = true)
```

Attached the user defined aggregation function I wrote to achieve it. Before that -

```java
MergeMapUDAF mergeMapUDAF = new MergeMapUDAF();
df.groupBy("userId").agg(mergeMapUDAF.apply(df.col("dt"), df.col("result")).as("result"));
```

<script src="https://gist.github.com/tomron/36fd3c1b41169fc40acaeb4dbe95067d.js"></script>
