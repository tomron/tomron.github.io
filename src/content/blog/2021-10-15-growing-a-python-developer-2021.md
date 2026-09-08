---
title: "Growing A Python Developer (2021)"
pubDate: 2021-10-15T10:00:00.000Z
permalink: "/2021/10/15/growing-a-python-developer-2021/"
tags:
  - "personal growth"
  - "python"
  - "pandas"
  - "numpy"
  - "plotly"
  - "flask"
  - "fastapi"
  - "django"
  - "pathlib"
draft: false
---
<!-- wp:paragraph -->
<p>I recently run into a team lead question regarding how to grow a backend Python Developer in her team. Since I also iterated around this topic with my team I already had few ideas in mind.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Few disclaimers before we start. First, I believe that the developer also has a share in the process and should express her interest and aspirations. The team lead or tech lead can direct and light blind spots but does not hold all the responsibility. It is also ok to dive into an idea are a tool that is not required at the moment. They might come in handy in the future and they can inspire you. Second, my view is limited to the areas I work in. Different organizations or products have different needs and focus. Third, build habits to constantly&nbsp;learn and grow - read blogs and books, listen to podcasts, take online or offline courses, watch videos, whatever works for you as&nbsp;long as you keep moving.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Consider the links below as appetizers. Each subject below has many&nbsp;additional resources&nbsp;besides the ones that I posted. Most likely I'm just not familiar with them, please feel free to add them and I'll update the post. Some subjects are so broad and product dependent, e.g. cloud so I didn't add links at all. Additionally, when using a specific product \ service \ package read the documentation and make it your superpower. Know Python standard library well (e.g&nbsp;<a href="https://docs.python.org/3/library/itertools.html">itertools</a>,&nbsp;<a href="https://docs.python.org/3/library/functools.html">functools</a>,&nbsp;<a href="https://docs.python.org/3/library/collections.html">collections</a>,&nbsp;<a href="https://docs.python.org/3/library/pathlib.html">pathlib</a>, etc), it can save you a lot of time, effort, and bugs.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong><u>General ideas and concepts</u></strong></p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol><li>Clean code -&nbsp;<a rel="noreferrer noopener" href="https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882" target="_blank">book</a>,&nbsp;<a rel="noreferrer noopener" href="https://gist.github.com/wojteklu/73c6914cc446146b8b533c0988cf8d29" target="_blank">book&nbsp;summary</a></li><li>Design patterns -&nbsp;<a rel="noreferrer noopener" href="https://www.amazon.com/Refactoring-Improving-Design-Existing-Code/dp/0201485672" target="_blank">refactoring book</a>,&nbsp;<a rel="noreferrer noopener" href="https://refactoring.guru/design-patterns" target="_blank">refactoring guru</a>,&nbsp;<a rel="noreferrer noopener" href="https://github.com/faif/python-patterns" target="_blank">python design patterns GitHub repo</a></li><li>Distributed design patterns -&nbsp;<a rel="noreferrer noopener" href="https://martinfowler.com/articles/patterns-of-distributed-systems/" target="_blank">Patterns of Distributed Systems</a></li><li>SOLID principles -&nbsp;<a rel="noreferrer noopener" href="https://towardsdatascience.com/solid-coding-in-python-1281392a6a94" target="_blank">SOLID coding in Python</a></li><li>Cloud</li><li>Deployment -&nbsp;<a href="https://www.redhat.com/en/topics/devops/what-is-ci-cd">CI\CD</a>,&nbsp;<a href="https://docker-curriculum.com/">docker</a>,&nbsp;<a href="https://www.redhat.com/en/topics/containers/learning-kubernetes-tutorial">Kubernetes</a></li><li>Version control -&nbsp;<a rel="noreferrer noopener" href="https://rogerdudler.github.io/git-guide/" target="_blank">git guide</a></li><li>Databases -&nbsp;<a rel="noreferrer noopener" href="https://www.coursera.org/learn/python-databases" target="_blank">Using Databases with Python</a>,&nbsp;<a rel="noreferrer noopener" href="https://realpython.com/tutorials/databases/" target="_blank">databases tutorials</a></li><li>Secure Development -&nbsp;<a href="https://snyk.io/blog/python-security-best-practices-cheat-sheet/">Python cheat sheet by Snyk</a>,&nbsp;<a href="https://owasp.org/Top10/">OWASP</a></li></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong><span style="text-decoration:underline;">Python specific</span></strong></p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol><li>Webservices - <a rel="noreferrer noopener" href="https://flask.palletsprojects.com/en/2.0.x/tutorial/index.html" target="_blank">flask</a>, <a rel="noreferrer noopener" href="https://docs.djangoproject.com/en/3.2/intro/tutorial01/" target="_blank">Django</a>, <a rel="noreferrer noopener" href="https://fastapi.tiangolo.com/tutorial/first-steps/" target="_blank">FastAPI</a></li><li>Testing - <a rel="noreferrer noopener" href="https://medium.com/swlh/unit-testing-in-python-basics-21a9a57418a0" target="_blank">Unit Testing in Python — The Basics</a></li><li>Packaging -  <a rel="noreferrer noopener" href="https://packaging.python.org/" target="_blank">Python Packaging User Guide</a>, </li><li>Data analysis - <a rel="noreferrer noopener" href="https://pandas.pydata.org/pandas-docs/stable/getting_started/tutorials.html" target="_blank">pandas</a>, <a rel="noreferrer noopener" href="https://cs231n.github.io/python-numpy-tutorial/" target="_blank">NumPy</a>, <a rel="noreferrer noopener" href="https://scikit-learn.org/stable/tutorial/index.html" target="_blank">sci-kit-learn</a></li><li>Visualization - <a rel="noreferrer noopener" href="https://plotly.com/python/plotly-fundamentals/" target="_blank">plotly</a>, <a rel="noreferrer noopener" href="https://www.datacamp.com/community/tutorials/matplotlib-tutorial-python" target="_blank">matlpotlib</a></li><li>Concurrency - <a href="https://realpython.com/python-concurrency/">Speed Up Your Python Program With Concurrency</a></li><li>Debugging - <a rel="noreferrer noopener" href="https://realpython.com/python-debugging-pdb/" target="_blank">debugging with PDB</a>, <a rel="noreferrer noopener" href="https://code.visualstudio.com/docs/python/debugging" target="_blank">Python debugging in VS Code</a></li><li>Dependency management - <a rel="noreferrer noopener" href="https://remastr.com/blog/pip-pipenv-poetry-comparison" target="_blank">Comparison of Pip, Pipenv and Poetry dependency management tools</a></li><li>Type annotation - <a rel="noreferrer noopener" href="https://towardsdatascience.com/type-annotations-in-python-d90990b172dc" target="_blank">Type Annotations in Python</a></li><li>Python 3.10 - <a href="https://towardsdatascience.com/whats-new-in-python-3-10-a757c6c69342">What’s New in Python 3.10?</a>, <a href="https://pythonspeed.com/articles/switch-python-3.10/">Why you can’t switch to Python 3.10 just yet</a></li></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong><span style="text-decoration:underline;">Additional resources</span></strong></p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol><li><a rel="noreferrer noopener" href="https://www.pythonpodcast.com/" target="_blank">Podcast.__init__&nbsp;</a>-&nbsp;The weekly podcast about Python and its use in machine learning and data science.</li><li><a rel="noreferrer noopener" href="https://realpython.com/podcasts/rpp/" target="_blank">The real python podcast</a></li><li><a rel="noreferrer noopener" href="https://towardsdatascience.com/top-8-python-podcasts-you-should-be-listening-to-f3bf07974486" target="_blank">Top 8 Python Podcasts You Should Be Listening to</a></li><li><a rel="noreferrer noopener" href="https://pymotw.com/3/" target="_blank">Python 3 module of the week</a></li><li><a rel="noreferrer noopener" href="https://www.udemy.com/user/lazy-programmer/" target="_blank">Lazy programmer</a>&nbsp;- courses on Udemy mainly AI and ML using Python</li><li><a href="https://cloudonaut.io/page/1/">cloudonaut</a> - podcast and blog about AWS</li></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->
