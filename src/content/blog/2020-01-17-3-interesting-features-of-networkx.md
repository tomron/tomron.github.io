---
title: "3 interesting features of NetworkX"
pubDate: 2020-01-17T20:54:59.000Z
permalink: "/2020/01/17/3-interesting-features-of-networkx/"
tags:
  - "graphs"
  - "networkx"
  - "python"
  - "pandas"
draft: false
---
<span style="font-weight:400;">“</span><a href="https://networkx.github.io/"><span style="font-weight:400;">NetworkX</span></a><span style="font-weight:400;"> is a Python package for the creation, manipulation, and study of the structure, dynamics, and functions of complex networks.”</span>

<span style="font-weight:400;">NetworkX lets the user create a graph and then study it. For example - find the shortest path between nodes, find node degree, find the maximal clique, find coloring of a graph and so on. In this post, I’ll present a few features I find interesting and are maybe less known.</span>

<span style="text-decoration:underline;"><b>Multigraphs</b></span>

<span style="font-weight:400;">Multigraph is a graph that can store multiedges. Multiedges are multiple edges between two nodes (it is different from hypergraph where an edge can connect any number of nodes and no just two). NetworkX has 4 </span><a href="https://networkx.github.io/documentation/latest/reference/classes/index.html"><span style="font-weight:400;">graph types</span></a><span style="font-weight:400;"> - the well-known commonly used directed and undirected graph and 2 multigraphs -  nx.MultiDiGraph for directed multigraph and nx.MultiGraph for undirected multigraph.</span>

<span style="font-weight:400;">In the example below, we see that if the graph type is not defined correctly, functionalities such as degree calculation may yield the wrong value -</span>

[sourcecode language="python" wraplines="false" collapse="false"]
import networkx as nx</pre>
G = nx.MultiGraph() G.add_nodes_from([1, 2, 3]) G.add_edges_from([(1, 2), (1, 3), (1, 2)]) print(G.degree()) #[(1, 3), (2, 2), (3, 1)] H = nx.Graph() H.add_nodes_from([1, 2, 3]) H.add_edges_from([(1, 2), (1, 3), (1, 2)]) print(H.degree()) #[(1, 2), (2, 1), (3, 1)] [/sourcecode]

<span style="text-decoration:underline;"><b>Create a graph from pandas dataframe</b></span>

<span style="font-weight:400;">Pandas is the swiss knife of every data scientist, so naturally, it would be a good idea to create a graph from pandas dataframe. The other way around is also possible. See the documentation </span><a href="https://networkx.github.io/documentation/latest/reference/generated/networkx.convert_matrix.from_pandas_edgelist.html"><span style="font-weight:400;">here</span></a><span style="font-weight:400;">. The example below shows how to create a multigraph from a pandas dataframe where each edge has a weight property.</span>

[sourcecode language="python" wraplines="false" collapse="false"]
import pandas as pd</pre>
df = pd.DataFrame([[1, 1, 4], [2, 1, 5], [3, 2, 6], [1, 1, 3]], columns=['source', 'destination', 'weight']) print(df) # source destination weight # 0 1 1 4 # 1 2 1 5 # 2 3 2 6 # 3 1 1 3 G = nx.from_pandas_edgelist(df, 'source', 'destination', ['weight'], create_using=nx.MultiGraph) print(nx.info(G)) # Name: # Type: MultiGraph # Number of nodes: 3 # Number of edges: 4 # Average degree: 2.6667 [/sourcecode]

<span style="text-decoration:underline;"><b>Graph generators</b></span>

O<span style="font-weight:400;">ne of the features I find the most interesting and powerful. The </span><a href="https://networkx.github.io/documentation/latest/reference/generators.html"><span style="font-weight:400;">graph generator</span></a><span style="font-weight:400;"> interface allows creating several types we just one line of code. Some of the graphs are deterministic given a parameter (e.g complete graph of k nodes) while some are random (e.g. binomial graph). Below are a few examples of deterministic graphs and random graphs. The examples below are the tip of the iceberg of the graph generator capabilities.</span>

<b>Complete graph</b><span style="font-weight:400;"> - creates a graph with n nodes and an edge between every two nodes.</span>

<b>Empty graph</b><span style="font-weight:400;"> - creates a graph with n nodes and no edges.</span>

<b>Star graph - </b><span style="font-weight:400;">create a graph with one central node connected to n external nodes.</span>

[sourcecode language="python" wraplines="false" collapse="false"]
G = nx.complete_graph(n=9)
print(len(G.edges()), len(G.nodes()))
# 36 9
H = nx.complete_graph(n=9, create_using=nx.DiGraph)
print(len(H.edges()), len(H.nodes()))
# 72 9
J = nx.empty_graph(n=9)
print(len(J.edges()), len(J.nodes()))
# 0 9
K = nx.star_graph(n=9)
print(len(K.edges()), len(K.nodes()))
# 9 10
[/sourcecode]

<b>Binomial Graph</b><span style="font-weight:400;"> - create a graph with n nodes and each edge is created with probability p (alias for gnp_random_graph and erdos_renyi_graph).</span>

[sourcecode language="python" wraplines="false" collapse="false"]
G1 = nx.binomial_graph(n=9, p=0.5, seed=1)
G2 = nx.binomial_graph(n=9, p=0.5, seed=1)
G3 = nx.binomial_graph(n=9, p=0.5)
print(G1.edges()==G2.edges(), G1.edges()==G3.edges())
# True False
[/sourcecode]

<b>Random regular graph</b><span style="font-weight:400;"> - creates a graph with n nodes, edges are created randomly and each node has degree d.</span>

[sourcecode language="python" wraplines="false" collapse="false"]
G = nx.random_regular_graph(d=4, n=10)
nx.draw(G)
plt.show()
[/sourcecode]

<img class="alignnone size-medium wp-image-1323" src="/wp-content/uploads/2020/01/random_graph-e1579287139674.png" alt="Random regula graph" width="300" height="225" />

<b>Random tree</b><span style="font-weight:400;"> - create a uniformly random tree of n nodes.</span>

[sourcecode language="python" wraplines="false" collapse="false"]
G = nx.random_tree(n=10)
nx.draw(G)
plt.show()
[/sourcecode]

<img class="alignnone size-medium wp-image-1324" src="/wp-content/uploads/2020/01/random_tree.png" alt="random_tree" width="300" height="225" />

All the code in this post can be found <a href="https://gist.github.com/tomron/1e9f8286be116f727cee450b06e05428">here</a>

<b>Additional Resource</b>

<a href="http://networkx.github.io/"><span style="font-weight:400;">Official site</span></a>

<a href="https://stackoverflow.com/questions/tagged/networkx"><span style="font-weight:400;">SO questions</span></a>

<a href="https://www.datacamp.com/community/tutorials/networkx-python-graph-tutorial"><span style="font-weight:400;">https://www.datacamp.com/community/tutorials/networkx-python-graph-tutorial</span></a>

<a href="https://www.geeksforgeeks.org/directed-graphs-multigraphs-and-visualization-in-networkx/amp/"><span style="font-weight:400;">https://www.geeksforgeeks.org/directed-graphs-multigraphs-and-visualization-in-networkx/amp/</span></a>
