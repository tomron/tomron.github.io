---
title: "Common Crawl meetup"
pubDate: 2014-11-18T19:40:52.000Z
permalink: "/2014/11/18/common-crawl-meetup/"
tags:
  - "big data"
  - "common crawl"
  - "meetup"
draft: false
---
<div>Yesterday I attended <a href="http://www.meetup.com/Big-Data-Beers/events/217301572/">big data beers meetup</a>. The meetup included 2 talks by Common Crawl employees - <a href="http://commoncrawl.org/about/team/#lgreen">Lisa Green</a> and <a href="http://smerity.com/" target="_blank">Stephen Merity</a>. Both talks was great and the connection between them  was empowering.</div>
<div></div>
<div>The meetup was sponsored by <a href="http://data-artisans.com/" target="_blank">Data Artisans</a> which are working on <a href="http://flink.incubator.apache.org/">Apache Flink</a>. Too bad I don't have time to go to their meet up <a href="http://www.meetup.com/Apache-Flink-Meetup/events/217541712/">today</a>. <b>
</b></div>
<div></div>
<div><b>What is Common Crawl?</b></div>
<div></div>
<div>Common Crawl is a NGO that makes web data accessible to everyone with little or not cost. They crawl the web, release a monthly build which is stored in AWS S3 under public data sets. They respect no robots and no follow flags and basically try to be good citizens in the internet cosmos. As Lisa Green said in her talk - they believe that the web is "<i>a digital copy of our world"</i> and the greatest data set and their mission is to make it available to everyone.</div>
<div></div>
<div><b>Technicalities</b></div>
<div></div>
<ul>
	<li>Monthly build (currently prefer bigger monthly builds over more frequent builds)</li>
	<li>Latest build was 220TB with crawl data of 2.98 billion web pages.</li>
	<li>Data include 3 type of files -
<ul>
	<li>WARC files of the raw crawl data</li>
	<li>WAT files which include the metadata for the data stored in the WARC (about 1/3 of the raw crawl data)</li>
	<li>WET files which hold the plaintext from the data stored in the WARC (about 15% of the raw crawl data).</li>
</ul>
</li>
	<li>Delay between publication of page and crawl \ public time is approx month-month and a half.</li>
	<li>No incremental dumps are planned at the moment.</li>
	<li>The data is currently skewed to dot com domains. They plan to improve it changes will hopefully be seen on January dump.</li>
	<li>They crawl using <a href="http://nutch.apache.org/" target="_blank">Apache Nutch</a> -  Nutch is an open source web crawler and cooperate with  <a href="http://blekko.com/" target="_blank">Blekko</a> in order to avoid spam.</li>
</ul>
<div>Common Crawl encourages researchers, universities and commercial companies to use their data. If you ask politely they will even grant you some Amazon credit.</div>
<div></div>
<div><b>The Talks</b></div>
<div></div>
<div>Lisa Green talked about the general idea of open data (governments data, commercial data, web data) and gave some examples for using open data in general. The example I liked the most - using Orange cell phone data to identify Ebola spreading patterns, see <a href="http://www.technologyreview.com/news/530296/cell-phone-data-might-help-predict-ebolas-spread/" target="_blank">here</a>. This was a very inspiring introduction to Stephen Merity more technical talk.</div>
<div>Stephen Merity spoke about the more technical parts and gave an amazing examples on how to do both fast and cheap computations (spot instances rock). He showed interesting data about computing PageRank on the entire Common Crawl data, some NLP stuff and other interesting insights about their data.</div>
<div>Another relevant talk in the area is Jordan Mendelson talk from Berlin BuzzWords - "<a href="https://www.youtube.com/watch?v=vWa9CUsNzdw" target="_blank">Big Data for Cheapskates</a>" (if your are on a hurry start from the 18th minute).</div>
<div></div>
<div>Slides are available in -</div>
<ul>
	<li><a href="http://slides.com/smerity/experiments-in-web-scale-data" target="_blank">Stephen Merity slides</a></li>
</ul>
<div></div>
<b>What can you do with Common Crawl</b>
<div></div>
<div>Treating it as a data set there is a lot to explore -</div>
<div>1. Train it for language detection - train it for language detection for specific domains.</div>
<div>2. Named Entity Recognition.</div>
<div>3. Investigate the relations between different domains, web structre - identify competitors, page rank, etc.</div>
<div>4. Investigate the relations between different technologies - which js libraries appear together, changes of technology usage over time.</div>
