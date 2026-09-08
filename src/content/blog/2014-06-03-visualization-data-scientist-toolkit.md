---
title: "Visualization - Data scientist toolkit"
pubDate: 2014-06-03T10:16:03.000Z
permalink: "/2014/06/03/visualization-data-scientist-toolkit/"
tags:
  - "google charts"
  - "graphviz"
  - "matplotlib"
  - "networkx"
  - "plotly"
  - "pygraphviz"
  - "python"
  - "visualization"
draft: false
---
<p dir="ltr">Data scientist are said to have better development knowledge than the average statistician and better statistic knowledge than the average developer. However, together with those skills one also needs marketing skills - the ability to communicate your, no so simple job and results to other people. Those people can be the CTO or VP R&amp;D, team members, customers or sales and marketing people. They don't necessarily share your knowledge or dive into the details as fast as you.</p>
<p dir="ltr">One of the best ways to make data and results accessible is creating visualizations, automatically of course. In this post I'll review several visualizations tools, mostly for Python with some additional side kicks.</p>
<a href="http://matplotlib.org"><strong>Matplotlib</strong></a> - probably the most known python visualization package. Includes most of the standard charts - bar charts, pie charts, scatters, ability to embed images, etc. Since there are many users using it there are many questions, examples and documentations around the web. However, the downside for me is that it is more complex than it should be. I have used it in several projects and I don't yet acquired the intuition to fully utilize.

Matplotlib have several extensions including -
<ul>
	<li><strong><a href="http://matplotlib.org/1.3.1/mpl_toolkits/mplot3d/index.html">mplot3d</a></strong> - 3d visualization</li>
	<li><strong><a href="http://scitools.org.uk/cartopy/docs/latest/">cartopy</a></strong> - for maps charts</li>
</ul>
<p dir="ltr"><strong><a href="http://www.graphviz.org/">graphviz</a></strong> - Designated for drawing graphs. Graph drawing software with python package. <a href="http://pygraphviz.github.io/">pygraphviz</a> is a python package for graphviz which provides a drawing layer and graph layout algorithms. The first downside of this is that you need to download the graphviz software. I have done it several times on several different machines (most of the consist of ubuntu) it never passed smoothly and I was not able to do it only from the command line which make it problematic if one wants to deploy it on remote machines. I believe that it could be done but at the moment I find this process only as an irksome overhead.</p>
<p dir="ltr">Side kicks -</p>

<ul>
	<li><strong><a href="https://code.google.com/p/pydot/">PyDot</a></strong> - Implements <a href="http://en.wikipedia.org/wiki/DOT_(graph_description_language)">DOT graph description language</a>. PyDot is basically an interface to interact with PyGraphviz dot layout. The main advantage of the dot files and data is the advantage in standardization - one can create dot file in one process and use it in other process. DOT is an intuitive language which focuses on drawing the graph and not on calculating the graph. I would say that it is the last step in the chain.</li>
	<li><strong><a style="font-style:normal;" href="networkx.lanl.gov">Networkx</a></strong> - a package for working and manipulating graph. Implements many graph algorithms such as shortest path, clustering, minimum spanning tree, etc. The graphs created in Networkx can be drawn using either matplotlib or pygraphviz and can also create dot files.</li>
</ul>
<p dir="ltr"><strong><a href="http://vincent.readthedocs.org/en/latest/">Vincent</a></strong> - A relatively new python visualization package. Vincent translates Python to <a href="http://trifacta.github.io/vega/">Vega</a> which is a visualization  grammar. I like it because it is easy, interactive and simple to output either as JSON or as HTML . However, I'm not sure that both Vincent and Vega are mature enough at this point to answer all the needs. It is important to mention that Vega is actually a wrapper above <a href="http://d3js.org/">D3</a> which is an amazing tool with growing community.</p>
<p dir="ltr">Additional related tools I'm not (yet) experienced with -</p>

<ul>
	<li><strong><a style="font-style:normal;" href="https://xlsxwriter.readthedocs.org/">xlsxwriter</a></strong> - creating excel files (xlsx format) including embedding charts on those files.</li>
	<li><strong><a href="https://plot.ly/">plot.ly</a></strong> - very talked about tool for collaborating data and graphing tool which have a Python client. I try to keep my data as private as possible and don't want to be dependent on internet connection (for example - creating graph with a lot of data) so this is the down side for me in this tool. However, the social \ collaborative aspect of this product is also an important part and the graphing is only one aspect of it.</li>
	<li><strong><a href="https://developers.google.com/chart/">Google charts</a></strong> - same downside as plot.ly - I like to be as independent as possible. However, comparing to plot.ly it looks more mature and has far more options, chart types than plot.ly at this stage and there is also a sand box to play with it. Plot.ly has advantages over Google charts in the ease of usage for non programmers.</li>
	<li><strong><a href="http://bokeh.pydata.org/">Bokeh</a></strong> - Nice, interactive charts on large data sets. Maybe the next big thing for plotting in Python.</li>
</ul>
<p dir="ltr"></p>
