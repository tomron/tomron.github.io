---
title: "Is Python random really random?"
pubDate: 2015-08-20T12:21:57.000Z
permalink: "/2015/08/20/is-python-random-really-random/"
tags: []
draft: false
---
The question I started with, as the title states, was quite simple - "is python random really random"?

Let's divide the question to two - python random and really random.

<a href="https://docs.python.org/2/library/random.html">Python random</a> - a module from python standard library which implements pseudo-random number generators for various distributions. This module allows one to generate random integers in a given range, shuffle a sequence, take a sample from the sequence and so on. This post is a sanity check of whether I can trust python random or not.

Really random - this is matter of statistics. If we have a coin and we tossed it 10 times and got 4 times head and 6 times tails what is our confidence that this coin is really fair? And if we got 8 times head and 2 times tails? or if we tossed it 100 times and got 40 times head and 60 times tails?

So of course the bigger the sample is the higher the confidence we have whether the coin \ dice \ generator is random or not. This test actually asks if a random sequence python random produces has a mean like a "real" random distribution. A repeating sequence of 0, 1, 0, 1, ... will pass this test but it is clearly not random.

[code language="python"]
from random import randint
from collections import Counter
from math import sqrt, exp

sizes = [10, 100, 1000, 10000, 100000]

def normpdf(x, mean, sd):
 var = float(sd)**2
 pi = 3.1415926
 denom = (2*pi*var)**.5
 num = exp(-(float(x)-float(mean))**2/(2*var))
 return num/denom

COIN_SIDES = 2
for size in sizes:
 sample = Counter([randint(1, COIN_SIDES) 
 for i in xrange(0, size)])
 expected_mean = size / COIN_SIDES
 expected_variance = size * \
 (1.0 / COIN_SIDES) * \
 (1 - 1.0/COIN_SIDES)
 expected_stdev = sqrt(expected_variance)
 p = 100 * normpdf(max(sample.values()), 
 expected_mean, expected_stdev)
 q = 100 * normpdf(min(sample.values()), 
 expected_mean, expected_stdev)
 print &quot;size: %s, p(observed_mean &gt; %s) = %s%%&quot;\
 %(&quot;{0:.3f}&quot;.format(1.0/COIN_SIDES),
 size, &quot;{0:.3f}&quot;.format(p))
 print &quot;size: %s, p(observed_mean &lt; %s) = %s%%&quot;\
 %(&quot;{0:.3f}&quot;.format(1.0/COIN_SIDES),
 size, &quot;{0:.3f}&quot;.format(q))
 print &quot;samples: %s&quot;%sample
[/code]

And the output - for sample size 100000 the probability that the observed mean is greater \ less than 0.5 is 0.251%. For p-value of 5%, i.e. the probability that the probability is less or great than 0.5 sample of size 1000+- is enough.

As said before, it is a small sanity check but it passed it well.
