---
title: "Running my first EMR - lessons learned"
pubDate: 2014-10-15T17:34:46.000Z
permalink: "/2014/10/15/running-my-first-emr-lessons-learned/"
tags:
  - "aws"
  - "boto"
  - "emr"
  - "mapreduce"
  - "python"
draft: false
---
Today I was trying to run my first EMR, here are few lessons I learned during this day. I have previously run hadoop streaming mapreduce so I was familiar with the mapreduce state of mind. However, I was not familiar with the EMR environment.

I used <a href="https://boto.readthedocs.org/en/latest/">boto</a> - Amazon official python interface.
<div>
<div>1. <strong>AMI version</strong> - default AMI version is 1.0.0 - first release. This means the following specifications -</div>
<div>
<blockquote>Operating system: Debian 5.0 (Lenny)

Applications: Hadoop 0.20 and 0.18 (default); Hive 0.5, 0.7 (default), 0.7.1; Pig 0.3 (on Hadoop 0.18), 0.6 (on Hadoop 0.20)

Languages: Perl 5.10.0, PHP 5.2.6, Python 2.5.2, R 2.7.1, Ruby 1.8.7

File system: ext3 for root and ephemeral

Kernel: Red Hat</blockquote>
</div>
<div><a class="external-link" href="http://docs.aws.amazon.com/ElasticMapReduce/latest/DeveloperGuide/ami-versions-supported.html" rel="nofollow">http://docs.aws.amazon.com/ElasticMapReduce/latest/DeveloperGuide/ami-versions-supported.html</a></div>
<div></div>
<div>For me Python 2.5.2 means -</div>
<ul>
	<li>Does not include <a href="https://docs.python.org/2.6/library/json.html">json</a> - new in version 2.6.</li>
</ul>
<div>
<ul>
	<li><a href="https://docs.python.org/2/library/collections.html">collections</a> is new in python 2.4, but not all the models were added in this version -</li>
</ul>
</div>
</div>
<div>
<div class="table-wrap">
<table class="confluenceTable">
<tbody>
<tr>
<td class="confluenceTd"><a class="external-link" title="collections.namedtuple" href="https://docs.python.org/2/library/collections.html#collections.namedtuple" rel="nofollow"><span class="pre">namedtuple()</span></a></td>
<td class="confluenceTd">factory function for creating tuple subclasses with named fields</td>
<td class="confluenceTd">
<div class="first last versionadded">

<span class="versionmodified">New in version 2.6.</span>

</div></td>
</tr>
<tr>
<td class="confluenceTd"><a class="external-link" title="collections.deque" href="https://docs.python.org/2/library/collections.html#collections.deque" rel="nofollow"><span class="pre">deque</span></a></td>
<td class="confluenceTd">list-like container with fast appends and pops on either end</td>
<td class="confluenceTd">
<div class="first last versionadded">

<span class="versionmodified">New in version 2.4.</span>

</div></td>
</tr>
<tr>
<td class="confluenceTd"><a class="external-link" title="collections.Counter" href="https://docs.python.org/2/library/collections.html#collections.Counter" rel="nofollow"><span class="pre">Counter</span></a></td>
<td class="confluenceTd">dict subclass for counting hashable objects</td>
<td class="confluenceTd">
<div class="first last versionadded">

<span class="versionmodified">New in version 2.7.</span>

</div></td>
</tr>
<tr>
<td class="confluenceTd"><a class="external-link" title="collections.OrderedDict" href="https://docs.python.org/2/library/collections.html#collections.OrderedDict" rel="nofollow"><span class="pre">OrderedDict</span></a></td>
<td class="confluenceTd">dict subclass that remembers the order entries were added</td>
<td class="confluenceTd">
<div class="first last versionadded">

<span class="versionmodified">New in version 2.7.</span>

</div></td>
</tr>
<tr>
<td class="confluenceTd"><a class="external-link" title="collections.defaultdict" href="https://docs.python.org/2/library/collections.html#collections.defaultdict" rel="nofollow"><span class="pre">defaultdict</span></a></td>
<td class="confluenceTd">dict subclass that calls a factory function to supply missing values</td>
<td class="confluenceTd">
<div class="first last versionadded">

<span class="versionmodified">New in version 2.5.</span>
<div><span class="versionmodified"> </span></div>
</div></td>
</tr>
</tbody>
</table>
</div>
<div>
<ul>
	<li> <a href="http://legacy.python.org/dev/peps/pep-0274/">dict comprehensions</a> is also kind of late addition (python 2.7)</li>
</ul>
</div>
<div>Therefore specifying the <em>ami_version</em> version can be critical. Version 2.2.0 worked fine for me.</div>
<div></div>
<div></div>
</div>
<div>2. <strong>Must process all the input!</strong></div>
<div>
<div>Naturally we will want to process all the input. However, for testing I went over only the n-first lines and then added a break to make things run faster. I was not consuming all the lines and therefore got an error. More about it here -</div>
<div><a class="external-link" href="http://stackoverflow.com/questions/9881269/broken-pipe-error-causes-streaming-elastic-mapreduce-job-on-aws-to-fail" rel="nofollow">http://stackoverflow.com/questions/9881269/broken-pipe-error-causes-streaming-elastic-mapreduce-job-on-aws-to-fail</a></div>
<div>
3. <strong>Output folder must not exists</strong>. This is the same as in hadoop streaming map reduce, for me the way to avoid it was to add a timestamp -

[sourcecode language="python" wraplines="false" collapse="false"]
output=&quot;s3n://&lt;my-bucket&gt;/output/&quot;+str(int(time.time()))
[/sourcecode]

</div>
</div>
<div>

4. <strong>Why my process failed</strong> - one option which produces are relatively understandable explanation is  - conn.describe_jobflow(jobid).laststatechangereason

</div>
<div>
<div>

5. <strong>cache_files</strong> - enables you to import files you need for the map reduce process. Super important to "specify a fragment", i.e. specify the local file name

</div>
<div>

[sourcecode language="python" wraplines="false" collapse="false"]
cache_files=['s3n://&lt;file-location&gt;/&lt;file-name&gt;#&lt;local-file-name&gt;']
[/sourcecode]

</div>
</div>
<div>Otherwise you will obtain the following error -</div>
<div><em>"Streaming cacheFile and cacheArchive must specify a fragment"</em></div>
<div></div>
<div></div>
<div>6. <strong>Status</strong> - the are 7 different status your flow may have - COMPLETED, FAILED, TERMINATED, RUNNING, SHUTTING_DOWN, STARTING and WAITING. The right order of statuses if everything goes well is STARTING -&gt; RUNNING -&gt;SHUTTING_DOWN -&gt; COMPLETED.</div>
<div>The SHUTTING_DOWN may take a while even for a very simple flow I measured about 1 minute of SHUTTING_DOWN process.</div>
<div>
<div></div>
<div></div>
<div></div>
</div>
<div><strong>Resources I used -</strong></div>
<a class="external-link" href="http://boto.readthedocs.org/en/latest/emr_tut.html" rel="nofollow">http://boto.readthedocs.org/en/latest/emr_tut.html</a>
<div><a class="external-link" href="http://atbrox.com/2010/10/01/programmatic-deployment-to-elastic-mapreduce-with-boto-and-bootstrap-action/" rel="nofollow">http://atbrox.com/2010/10/01/programmatic-deployment-to-elastic-mapreduce-with-boto-and-bootstrap-action/</a></div>
