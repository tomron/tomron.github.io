---
title: "Code Challenges Anti-Patterns"
pubDate: 2017-03-01T18:03:14.000Z
permalink: "/2017/03/01/code-challenges-anti-patterns/"
tags: []
draft: false
---
Code challenges are a common tool to evaluate candidate ability to develop software. Of course there are other indicators such as - blog posting, open source involvement, github repository, personal recommendations, etc. Yet, code challenges are frequently used.

I recently got to check some code challenges and was surprised from some of the things I found there. Here are my anti-patterns to code challenges -

 
<h3><strong>Call a file \ process on your local machine</strong></h3>
[sourcecode language="python" wraplines="false" collapse="false"]
for line in open('/Users/user/code/data.csv'):
    print ('No, No, No!')
[/sourcecode]

 

The person how check your code challenge cannot just run the code since she will get a file not found error or similar and will have to find where you call the file and why.

If you need to call some resource (file, database, etc.) you can pass it as a command line argument, put it in a config file, use environment variable.
<h3>Reinvent the wheel</h3>
Write everything by yourself. Why you crowd wisdom or mature project which are already debugged and tested when you can write everything by yourself the way you like it with your own unique bugs?

Unless you were told otherwise many times there is already a package \ library \ API \ design pattern which is doing part of what you need. E.g if you need to fetch data from Twitter there is Twitter API and there Twitter clients in different languages. You definitely don't need to crawl twitter and process the HTML.
<h3>Don't write a README file</h3>
No need to write a README file. Whoever is reading your code is a professional in the tech stack you chose and will immediately know how to start your project, which dependencies are there, which environment variables are needed, etc.

The goal of README in this context is to explain how to run the code, what is inside the package and further considerations \ assumptions \ choices you did while working on this challenge.

A detailed README is always priceless and specially in this context when you don't always have a direct communication with the candidate. System diagram \ architecture chart is also recommended when relevant.

If you have further notes such as ideas on how to expand this system, what would you do next, etc. I would put it in IDEAS files (e.g. IDEAS.md) and also link the README from it.
<h3>Don't write tests</h3>
This is actually the part which highlight your genius. You don't need to test your code because it is perfect.

<img class=" size-full wp-image-983 aligncenter" src="/wp-content/uploads/2017/03/15eb8d8feabb0d6c2eb517142c6c9df2.jpg" alt="15eb8d8feabb0d6c2eb517142c6c9df2" width="555" height="369" />

Seriously, testing plays a big role in software development and making sure the code you wrote work as expected. As a viewer from the side it also give me a clue how pedant you are and how much you care about the quality of your work. This is my first impression of your work, don't make it your last.
<h3>ZIP you code</h3>
This is how we deploy and manage versions in our company - I just send my boss a zip file, preferably via slack.

I expect to get a link to a git repository (if you want to be cautious you can use private repos e.g. by bitbucket). In this link I can see the progress you made while working on the challenge, your commit messages (also a signal on how pedant you are). As a candidate you also get to demonstrate your skills in version control system in addition to your coding skills.

 
<h3>Wrap Up</h3>
There are of course many other things I can point to such as general software development practices - magic numbers, meaningful names, spaghetti code, etc. But as said - those are general software development skills that one should use everyday, the anti-patterns stated above are IMO specially important in the case of code challenges.
