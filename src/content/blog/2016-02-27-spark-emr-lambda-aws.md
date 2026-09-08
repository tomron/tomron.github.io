---
title: "Spark, EMR, Lambda, AWS"
pubDate: 2016-02-27T15:11:17.000Z
permalink: "/2016/02/27/spark-emr-lambda-aws/"
tags: []
draft: false
---
I know the title of this post looks like a collection of buzz words but there is code behind it.

<a href="http://docs.aws.amazon.com/lambda/latest/dg/welcome.html">AWS Lambda</a> function is a service which allow you to create an action (in this example add an EMR step) according to all kind of events. Such events can be cron expressions or schedule event (once an hour, once a day, etc.), change in S3 files, change in DynamoDB table, etc.

The goal of the code is to add an <a href="https://aws.amazon.com/elasticmapreduce/">EMR</a> step to an existing EMR cluster. The step can actually be anything- Map Reduce, Spark job, JAR step , etc. This example show how to add a Spark job but it is easy to adjust it to your needs.

The parameters for the Spark job can depend on the specific event - for example, put file event data will include data about the specific file.

In this example there is only a place holder for the script parameters and the spark configuration parameters.

Note - in order to run this Spark job your code should be in Spark master machine. Possible this could be done in the script as well but here we assume it is already in CODE_DIR.

&nbsp;

https://gist.github.com/tomron/6ebc60cd3450478c7fc4

&nbsp;
