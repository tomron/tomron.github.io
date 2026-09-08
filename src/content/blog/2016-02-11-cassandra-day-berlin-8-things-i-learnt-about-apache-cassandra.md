---
title: "Cassandra Day Berlin - 8 things I learnt about Apache Cassandra"
pubDate: 2016-02-11T19:09:38.000Z
permalink: "/2016/02/11/cassandra-day-berlin-8-things-i-learnt-about-apache-cassandra/"
tags: []
draft: false
---
Since I didn't know anything about <a href="http://cassandra.apache.org/">Apache Cassandra</a> (beside being a distributed database) I could probably replace the 8 in the title to any number.. Here is a summary of few things I learned in <a href="https://www.eventbrite.co.uk/e/cassandra-day-berlin-brought-to-you-by-datastax-tickets-20121771761?aff=DataStaxWebsite">Cassandra Day</a> today.
<div>
<ol>
	<li><u>What is Apache Cassandra</u> - open source <b>distributed</b> database donated to Apache foundation by Facebook (actually first to google code and then to ASF). It is <b>decentralized</b> - meaning all nodes are born equal and there are no masters or slaves. It is <b>schema-full </b>database see here more about the <a href="http://rustyrazorblade.com/2014/07/the-myth-of-schema-less/">Myth of Schema-less databases</a>. It supports <b>replications</b>, i.e. data redundancy with default replication factor of 3 and multiple data centers (both physical and virtual). and you can control the consistency level (see next). Therefore it is <b>AP</b> in the CAP theorem. It uses CQL - Cassandra Query Language.</li>
	<li><u>Controlling consistency</u> - having the data replicated in several nodes one can read and write data in 3 ways. The higher consistency level the longer the latency is.
<ul>
	<li><b>One</b> - reading or writing to one node is enough.</li>
	<li><b>Quorum</b> - i.e. value was written \ retrieved at least from half of the relevant nodes. Latest win - when retrieving the data from several nodes the value with the latest time-stamp counts.</li>
	<li><b>All</b> - need to write \ retrieve data from all the relevant nodes. T Note that all mode is dangerous  since it cancels the high available. If one of the replicas is not available we will get no answer.</li>
</ul>
</li>
	<li><u>Data Modelling is important</u><b> </b>- Isn't it right to every database? Well yes. But the issue here is again the trade off. One on hand I feel that data modelling is sometimes neglected on NoSQL databases since we can just through data there and scale it. On the other hand, due to some limitations (see CQL next..) data modelling for Cassandra is quite opposite to best practices in RDBMS. Know your queries in advance and build the schema (e.g keyspace) accordingly.</li>
	<li><u>CQL</u> - Cassandra Query Language. At the first talk they said "Yes, it is exactly like SQL". Well, not exactly. First - no joins, this influences dramatically about the data modelling. Limited aggregations functionality. Update command always work even if record does not exist (can be controlled). See here more about <a href="https://medium.com/@alexbmeng/cassandra-query-language-cql-vs-sql-7f6ed7706b4c#.alockij5y">CQL vs SQL</a>.</li>
	<li><u>CQL containers</u><i> - </i>there are 3 types of containers
<ul>
	<li><strong>Set</strong> - a container of items sorted by the type compare operand.</li>
	<li><strong>List</strong> - a container of items sorted by the insertion operand</li>
	<li><strong>Map</strong> - a key, value container sorted by the type compare operand of the keys. This is kind of a hack which allow you to have it a bit schema less. Up to 64k items in a map.</li>
</ul>
</li>
	<li><a href="https://github.com/datastax/spark-cassandra-connector">Spark connector</a> - connecting to one of the most trending technologies.</li>
	<li><a href="https://docs.datastax.com/en/datastax_enterprise/4.0/datastax_enterprise/srch/srchIntro.html">Solr integration</a> - Cassandra is not a document database. However, sometime users how choose Cassandra as their main solution have indexing \ search needs. Datastax have a patch which also allow you to search the data in RAM (data which was not yet written to the Lucene indices).</li>
	<li>How to go on from here? How can I learn more -
<ul>
	<li><a href="https://academy.datastax.com/">DataStax academy</a></li>
	<li><a href="http://docs.datastax.com/en/landing_page/doc/landing_page/current.html">Official documentation</a> - by version</li>
	<li><a href="http://stackoverflow.com/questions/tagged/cassandra">Stackoverflow</a></li>
	<li><a href="http://www.planetcassandra.org/">Planet Cassandra</a></li>
	<li><a href="https://tobert.github.io/pages/als-cassandra-21-tuning-guide.html">Al's Cassandra 2.1 tuning guide</a></li>
</ul>
</li>
</ol>
</div>
<div>There are much more for me to learn about Apache Cassandra and more things I learned in this day but this is a short review.</div>
