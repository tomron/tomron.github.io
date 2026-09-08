---
title: "setdefault vs get vs defaultdict"
pubDate: 2014-08-25T17:55:49.000Z
permalink: "/2014/08/25/setdefault-vs-get-vs-defaultdict/"
tags:
  - "defaultdict"
  - "python"
  - "setdefault"
draft: false
---
<p dir="ltr">You have a python dictionary, you want to get the value of specific key in the dictionary, so far so good, right?</p>
<p dir="ltr">And then a KeyError -</p>
<p dir="ltr"><strong><span style="font-size:18px;">Traceback (most recent call last):
File "&lt;stdin&gt;", line 1, in &lt;module&gt;
KeyError: 1 </span></strong></p>
<p dir="ltr">Hmmm, well if this key does not exist in the dictionary I can use some default value like None, 10, empty string. What's my options of doing so?</p>
I can think of 3 -
<ul>
	<li>get method</li>
	<li>setdefault method</li>
	<li>defaultdict data structure
get method</li>
</ul>
Let's investigate first -

[sourcecode language="python" wraplines="false" collapse="false"]
key, value = &quot;key&quot;, &quot;value&quot;
data = {}
x = data.get(key,value)
print x, data #value {}
data= {}
x = data.setdefault(key,value)
print x, data #value {'key': 'value'}
[/sourcecode]

Well, we get almost the same result, x obtains the same value and in get data is not changed while in setdefault data changes. When does it become a problem?

[sourcecode language="python" wraplines="false" collapse="false"]
key, value = &quot;key&quot;, &quot;value&quot;
data = {}
x = data.get(key,[])append(value)
print x, data #None {}
data= {}
x = data.setdefault(key,[]).append(value)
print x, data None {'key': ['value']}
[/sourcecode]

So, when we are dealing with mutable data types the difference is clearer and error prone.

When to use each? mainly depends on the content of your dictionary and its' size.

We can time the differences but it does not really matter as they produce different output and it was not significant for any direction anyhow.

And for defaultdict -

[sourcecode language="python" wraplines="false" collapse="false"]
from collections import defaultdict
data = defaultdict(list)
print data[key] #[]
data[key].append(value)
print data[key] #['value']
[/sourcecode]

setdefault sets the default value to a <span style="text-decoration:underline;">specific</span> key we access to while defaultdict is the type of the data variable and set this default value to <span style="text-decoration:underline;">every</span> key we access to.

So, if we get roughly the same result I timed the processes for several dictionary sizes (left most column) and run each 1000 times (code below) -
<table border="1">
<tbody>
<tr>
<th>dict size</th>
<th>default value</th>
<th>method</th>
<th>time</th>
</tr>
<tr>
<th rowspan="8">100</th>
<th rowspan="2">list</th>
<td>setdefault</td>
<td>0.0229508876801</td>
</tr>
<tr>
<td>defaultdict</td>
<td>0.0204179286957</td>
</tr>
<tr>
<th rowspan="2">set</th>
<td>setdefault</td>
<td>0.0209970474243</td>
</tr>
<tr>
<td>defaultdict</td>
<td>0.0194549560547</td>
</tr>
<tr>
<th rowspan="2">int</th>
<td>setdefault</td>
<td>0.0236239433289</td>
</tr>
<tr>
<td>defaultdict</td>
<td>0.0225579738617</td>
</tr>
<tr>
<th rowspan="2">string</th>
<td>setdefault</td>
<td>0.020693063736</td>
</tr>
<tr>
<td>defaultdict</td>
<td>0.0240340232849</td>
</tr>
<tr>
<th rowspan="8">10000</th>
<th rowspan="2">list</th>
<td>setdefault</td>
<td>2.09283614159</td>
</tr>
<tr>
<td>defaultdict</td>
<td>2.31266093254</td>
</tr>
<tr>
<th rowspan="2">set</th>
<td>setdefault</td>
<td>2.12825512886</td>
</tr>
<tr>
<td>defaultdict</td>
<td>3.43549799919</td>
</tr>
<tr>
<th rowspan="2">int</th>
<td>setdefault</td>
<td>2.04997992516</td>
</tr>
<tr>
<td>defaultdict</td>
<td>1.87312483788</td>
</tr>
<tr>
<th rowspan="2">""</th>
<td>setdefault</td>
<td>2.05423784256</td>
</tr>
<tr>
<td>defaultdict</td>
<td>1.93679213524</td>
</tr>
<tr>
<th rowspan="8">100000</th>
<th rowspan="2">list</th>
<td>setdefault</td>
<td>22.4799249172</td>
</tr>
<tr>
<td>defaultdict</td>
<td>29.7850298882</td>
</tr>
<tr>
<th rowspan="2">set</th>
<td>setdefault</td>
<td>23.5321040154</td>
</tr>
<tr>
<td>defaultdict</td>
<td>41.7523541451</td>
</tr>
<tr>
<th rowspan="2">int</th>
<td>setdefault</td>
<td>26.6693091393</td>
</tr>
<tr>
<td>defaultdict</td>
<td>23.1293339729</td>
</tr>
<tr>
<th rowspan="2">string</th>
<td>setdefault</td>
<td>26.4119689465</td>
</tr>
<tr>
<td>defaultdict</td>
<td>23.6694099903</td>
</tr>
</tbody>
</table>
Conclusions and summary -
<ul>
	<li>Working with sets is almost always more expensive time-wise than working with lists</li>
	<li>As the dictionary size grows simple types - string and int perform better with defaultdict then with setdefault while set and list perform worse.</li>
	<li>Main conclusion - choosing between defaultdict and setdefault also mainly depends in the type of the default value.</li>
	<li>In this test I tested a particular use case - accessing each key twice. Different use cases \ distributions such as assignment, accessing to the same key over and over again, etc. may have different properties.</li>
	<li>There is no firm conclusion here just investigating some of interpreter capabilities.</li>
</ul>
Code -

[sourcecode language="python" wraplines="false" collapse="false"]
import timeit
from collections import defaultdict
from itertools import product

def measure_setdefault(n, defaultvalue):
 data = {}
 for i in xrange(0,n):
 x = data.setdefault(i,defaultvalue)
 for i in xrange(0,n):
 x = data.setdefault(i,defaultvalue)

def measure_defaultdict(n,defaultvalue):
 data = defaultdict(type(defaultvalue))
 for i in xrange(0,n):
 x = data[i]
 for i in xrange(0,n):
 x = data[i]

if __name__ == '__main__':
 import timeit
 number = 1000
 dict_sizes = [100,10000, 100000]
 defaultvalues = [[], 0, &quot;&quot;, set()]
 for dict_size, defaultvalue in product(dict_sizes, defaultvalues):
 print &quot;dict_size: &quot;, dict_size, &quot; defaultvalue: &quot;, type(defaultvalue)
 print &quot;\tsetdefault:&quot;, timeit.timeit(&quot;measure_setdefault(dict_size, defaultvalue)&quot;, setup=&quot;from __main__ import measure_setdefault, dict_size, defaultvalue&quot;, number=number)
 print &quot;\\tdefaultdict:&quot;, timeit.timeit(&quot;measure_defaultdict(dict_size, defaultvalue)&quot;, setup=&quot;from __main__ import measure_defaultdict, dict_size, defaultvalue&quot;, number=number)

[/sourcecode]
