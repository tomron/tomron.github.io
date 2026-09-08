---
title: "argparse choices"
pubDate: 2020-02-23T08:56:36.000Z
permalink: "/2020/02/23/argparse-choices/"
tags:
  - "argparse"
  - "python"
draft: false
---
I saw this <a href="https://medium.com/data-science-bootcamp/handling-inputs-using-argparse-command-line-data-science-d91e4cbd4390">post</a> in Medium regarding argparse, which suggests the following -
<pre><span id="cae0" class="id ie du bg hv b bw if ig r ih">parser.add_argument("--model", help="choose model architecture from: vgg19 vgg16 alexnet", type=str)</span></pre>
I think the following variant is better -
<pre><span id="cae0" class="id ie du bg hv b bw if ig r ih">parser.add_argument("--model", help="choose model architecture from: vgg19 vgg16 alexnet", type=str, choices=['vgg19', 'vgg16', 'alexnet'], default='alexnet'])</span></pre>
If an illegal parameter is given, for example <em>--model vgg20</em>, the desired behavior of almost every program is to throw an exception. This won't happen in the first case. If the user mistypes the model name the script will use Alexnet pre-trained instead of throwing an exception (implemented later in the script). Using the choices argument will solve this. Adding <em>default='alexent', </em>takes care in the case where the user does not choose a model actively. For the example presented in the original post this is the desired behavior.

See more here -
<ul>
	<li><a href="https://docs.python.org/3/library/argparse.html">Python documentation</a></li>
	<li><a href="https://pymotw.com/3/argparse/index.html#module-argparse">Python module a week</a></li>
	<li><a href="https://mkaz.blog/code/python-argparse-cookbook/">argparse cookbook</a></li>
</ul>
