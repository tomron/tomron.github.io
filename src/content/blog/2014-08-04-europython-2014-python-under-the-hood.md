---
title: "EuroPython 2014 - Python under the hood"
pubDate: 2014-08-04T17:05:10.000Z
permalink: "/2014/08/04/europython-2014-python-under-the-hood/"
tags:
  - "ep2014"
  - "europython"
  - "python"
draft: false
---
This is actually a summary of few talks which deals with "under the hood" topics, the talks partially overlap. Those topics include - memory allocation and management, inheritance, over-ridden built-in methods, etc.
<div></div>
<div>Relevant talks -</div>
<div></div>
<div>The magic of attribute access by Petr Viktorin</div>
<div><a href="https://ep2014.europython.eu/en/schedule/sessions/123/">https://ep2014.europython.eu/en/schedule/sessions/123/</a></div>
<div></div>
<div>Performance Python for Numerical Algorithms by Yves</div>
<div><a href="https://ep2014.europython.eu/en/schedule/sessions/64/">https://ep2014.europython.eu/en/schedule/sessions/64/</a></div>
<div></div>
<div>Metaprogramming, from Decorators to Macros by Andrea Crotti</div>
<div><a href="https://ep2014.europython.eu/en/schedule/sessions/84/">https://ep2014.europython.eu/en/schedule/sessions/84/</a></div>
<div></div>
<div>Everything you always wanted to know about Memory in Python but were afraid to ask by Piotr Przymus</div>
<div><a href="https://ep2014.europython.eu/en/schedule/sessions/28/">https://ep2014.europython.eu/en/schedule/sessions/28/</a></div>
<div></div>
<div>Practical summary -</div>
<div></div>
<div>
<ul>
	<li><a href="https://docs.python.org/2.7/reference/datamodel.html#slots">__slots__</a> argument - limited the memory allocation for objects in Python by overriding the __dict__ attribute.</li>
	<li>Strings - the empty strings and strings of length=1 are saved as constants. Use <a href="https://docs.python.org/2/library/functions.html#intern">intern</a> (or sys.intern in python 3.x) on strings to avoid allocating string variables with the same values this will help making memory usage more efficiency and quicker string comparison. More about this topic <a href="http://stackoverflow.com/questions/1136826/what-does-python-sys-intern-do-and-when-should-it-be-used">here</a> .</li>
	<li>Numerical algorithms - the way a 2-dimensional array is allocated (row wise or column wise) and store has a great impact on the performance of different algorithms (even for simple sum function).</li>
	<li>Working with the GPU - there are packages that process some of the data on the GPU. It is efficient when the data is big and less efficient when the data is small since copying all the data to the GPU has some overhead.</li>
	<li>Cython use c "malloc" function for re-allocating space when list \ dictionaries \ set grow or shrink. On one hand this function can be overridden, on the other hand one can try to avoid costly processes which cause space allocation operations or to use more efficient data structures, e.g list instead of dictionary where it is possible.</li>
	<li>Note the garbage collector! Python garbage collector is based on reference count. Over-ridding the <a href="https://docs.python.org/2/reference/datamodel.html#object.__del__">__dell__</a> function may disrupt the garbage collector.</li>
	<li>Suggested Profiling and monitoring tools - <a href="https://pypi.python.org/pypi/psutil">psutil</a>, <a href="https://pypi.python.org/pypi/memory_profiler">memory_profiler</a>, <a href="http://mg.pov.lt/objgraph/">objgraph</a>, <a href="https://pypi.python.org/pypi/RunSnakeRun">RunSnakeRun</a> + <a href="https://pypi.python.org/pypi/meliae">Meliae</a>, <a href="http://valgrind.org/">valgrind</a></li>
</ul>
</div>
<div></div>
<div>Bottom line of all of those - "knowledge itself is power". I.e. knowing the internal and the impact of what we are doing can bring to a significant improvements.</div>
<div></div>
<div>There are always several ways to do things and each has cons and pros fitted to the specific case. Some of those are simple to implement and use and can donate to a great improvement on both running time and memory usage. On the other hand some of those suggestion are really "shoot in the foot" - causing memory leaks and other unexpected behavior, beware.</div>
