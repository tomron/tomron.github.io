---
title: "Redmonk programming language ranking"
pubDate: 2015-08-24T11:39:22.000Z
permalink: "/2015/08/24/redmonk-programming-language-ranking/"
tags: []
draft: false
---
I usually don't find those ranking very interesting but <a href="http://redmonk.com/jgovernor/2015/07/31/programming-language-rankings-summer-2015/">Redmonk</a> ranking which compares between programming languages' popularity on GitHub (by projects) and popularity on Stack Overflow (by questions) was interesting for me.

What can we see in the chart below - very popular language (Java, Python, JavaScript, PHP) are very close to the y=x line - popularity on GitHub is almost the same as their popularity in Stack Overflow. Other languages which are very close to this line are - R, perl, Scala, Shell, Objective-C.

Languages that are below the line are languages that are more popular in GitHub the in Stack Overflow.Very extreme example in this category is VimL (vim script). Why is that? one possible reason for that is that those languages are very well documented or that those languages have very limited use cases so the question scope is restricted. Another possible reason is the belief that there is no community, therefore people don't ask questions and don't get answers or ask in under another tag. For example VimL questions are sometimes asked with Vim tag and without VimL tag or a vimscript question. See this <a href="http://stackoverflow.com/search?q=vimscript">search</a>.

The languages above the line are languages which are more popular in Stack Overflow than in Github. Why is that? the opposite reasons - languages which are not documented very well or add new features frequently and therefore users have many questions about it. Another possibility is very common languages that are taught in the university and therefore many students which are not very experience ask a lot about them. A very extreme example for that is SQL. As well, XML is not a programming language and mostly used for configuration so it is quite clear why there are no projects in GitHub that are strictly XML. I think that both XQuery and DOT are above the line from the same reason.

It was therefore surprising for me to see CSS very close to the line (btw could find HTML in the chart) but it possibly depends on the methodology of counting GitHub projects.

Some of the languages are not really programming languages but rather a technology, e.g. Arduino, DOT, xml. It would be also interesting to see such a comparison to general technologies which are not programming languages - MongoDB, Elasticsearch, hadoop, etc. And to see it overtime - maybe documentation gets better, technology reaches to a stable state, etc.

<img class="aligncenter" src="http://jgovernor-media.redmonk.com/jgovernor/files/2015/07/summer-2015-rankings.png" alt="" width="1020" height="723" />
