---
title: "3 follow-up notes on 3 python list comprehension tricks"
pubDate: 2020-01-26T10:00:27.000Z
permalink: "/2020/01/26/3-follow-up-notes-on-3-python-list-comprehension-tricks/"
tags:
  - "list-comprehension"
  - "python"
draft: false
---
I saw the following post about <a href="https://levelup.gitconnected.com/3-python-list-comprehension-tricks-you-might-not-know-yet-5891d904ee76"> list comprehension tricks in Python</a>. I really like python comprehension functionality - dict, set, list, I don’t discriminate. So 3 follow up notes about this post -
<p style="padding-left:40px;"><strong>1. Set Comprehension</strong></p>
<span style="font-weight:400;">Beside dictionary and lists, comprehensions also work for sets -</span>

[sourcecode language="python" wraplines="false" collapse="false"]
{s for s in [1, 2, 1, 0]}
#set(0,1,2))
{s**2 for s in [1,2,1,0,-1]}
#set(0,1,4)
[/sourcecode]
<p style="padding-left:40px;"><strong>2. Filtering (and a glimpse to generators)</strong></p>
<span style="font-weight:400;">In order to filter a list, one can iterate over the list or generator, apply the filter function and output a list or can use the build-in </span><a href="https://thepythonguru.com/python-builtin-functions/filter/"><span style="font-weight:400;">filter</span></a><span style="font-weight:400;"> function and receive a generator that is more efficient as described further in the original post.</span>

[sourcecode language="python" wraplines="false" collapse="false"]
words = ['deified', 'radar', 'guns']
palindromes = filter(lambda w: w==w[::-1], words)
list(palindromes)
#['deified', 'radar']
[/sourcecode]

<span style="font-weight:400;">Additional nice to know the build-in function is the </span><a href="https://thepythonguru.com/python-builtin-functions/map/"><span style="font-weight:400;">map</span></a><span style="font-weight:400;"> function, that for example can yield the words’ lengths as generators - </span>

[sourcecode language="python" wraplines="false" collapse="false"]
words = ['deified', 'radar', 'guns']
lengths = map(lambda w: len(w), words)
list(lengths)
#[7, 5, 4]
[/sourcecode]

<p style="padding-left:40px;"><strong>3. Generators</strong></p>
<span style="font-weight:400;">Another nice usage of generators is to create an infinite sequence - </span>

[sourcecode language="python" wraplines="false" collapse="false"]

def infinite_sequence():

    num=0

    while True:

        yield num

        num+=1


gen = infinite_sequence()

next(gen)

#0

next(gen)

#1

next(gen)

#2

[/sourcecode]

Generators can be piped, return multiple outputs, and more. I recommend this <a href="https://realpython.com/introduction-to-python-generators/">post</a>to a better understand generators.
