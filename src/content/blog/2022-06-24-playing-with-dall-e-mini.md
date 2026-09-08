---
title: "Playing with DALL·E mini"
pubDate: 2022-06-24T19:40:18.000Z
permalink: "/2022/06/24/playing-with-dall-e-mini/"
tags:
  - "dall-e"
  - "imagen"
  - "openai"
draft: false
---
<!-- wp:paragraph -->
<p>DALL·E 2 is a multimodal AI system that generates images from text. OpenAI announced the model in April 2022. OpenAI is known for GPT-3, an autoregressive language model with 175 billion parameters. DALL·E 2 uses a smaller version of GPT-3. Read more <a rel="noreferrer noopener" href="https://venturebeat.com/2022/04/16/how-dall-e-2-could-solve-major-computer-vision-challenges/" target="_blank">here</a>, <a rel="noreferrer noopener" href="https://fortune.com/2022/04/06/openai-dall-e-2-photorealistic-images-from-text-descriptions/" target="_blank">here</a>, and <a rel="noreferrer noopener" href="https://garymarcus.substack.com/p/horse-rides-astronaut" target="_blank">here</a> (the last one also slightly discusses Google's image).</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>While the results look impressive at first sight, there are some caveats and limitations, including word order and compositionality issues, e.g., "A yellow book and a red vase" from "A red book and a yellow vase" are indistinguishable. Moreover, as one can see in the "A yellow book and a red vase" example below the images or more of the same, another drawback is that the system cannot handle negation, e.g., "A room without an elephant" will create, well, see below. Read more <a rel="noreferrer noopener" href="https://mixed-news.com/en/openais-dall-e-2-still-has-a-few-problems-with-concepts-and-cant-count" target="_blank">here</a>.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Since I don't have access to DALL·E 2, I used DALL·E mini via <a rel="noreferrer noopener" href="https://huggingface.co/spaces/dalle-mini/dalle-mini" target="_blank">Hugging Face</a> for all the examples in this post. However, the two models experience the same issues.</p>
<!-- /wp:paragraph -->

<!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:image {"id":1680,"sizeSlug":"large","linkDestination":"media"} -->
<figure class="wp-block-image size-large"><a href="/wp-content/uploads/2022/06/dallemini_2022-6-24_19-36-59.png"><img src="/wp-content/uploads/2022/06/dallemini_2022-6-24_19-36-59.png" alt="" class="wp-image-1680" /></a><figcaption>A yellow book and a red vase</figcaption></figure>
<!-- /wp:image --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:image {"id":1678,"sizeSlug":"large","linkDestination":"media"} -->
<figure class="wp-block-image size-large"><a href="/wp-content/uploads/2022/06/dallemini_2022-6-24_19-34-13-1.png"><img src="/wp-content/uploads/2022/06/dallemini_2022-6-24_19-34-13-1.png" alt="" class="wp-image-1678" /></a><figcaption>A room without an elephant</figcaption></figure>
<!-- /wp:image --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:paragraph -->
<p>The model might have biases for example check all those software developers who write code, all men (also note that the face are very blurry in contrast to other surfaces in the images) -</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:image {"id":1688,"sizeSlug":"large","linkDestination":"media"} -->
<figure class="wp-block-image size-large"><a href="/wp-content/uploads/2022/06/dallemini_2022-6-24_19-47-29-2.png"><img src="/wp-content/uploads/2022/06/dallemini_2022-6-24_19-47-29-2.png" alt="" class="wp-image-1688" /></a><figcaption>software developer writing code</figcaption></figure>
<!-- /wp:image --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:image {"id":1714,"sizeSlug":"large","linkDestination":"media"} -->
<figure class="wp-block-image size-large"><a href="/wp-content/uploads/2022/06/dallemini_2022-6-24_20-25-23.png"><img src="/wp-content/uploads/2022/06/dallemini_2022-6-24_20-25-23.png" alt="" class="wp-image-1714" /></a><figcaption>A CTO giving a talk</figcaption></figure>
<!-- /wp:image --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:paragraph -->
<p>I decided to troll that a bit to find more limitations or point-out blind spots. Check out the following examples -</p>
<!-- /wp:paragraph -->

<!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:image {"id":1693,"sizeSlug":"large","linkDestination":"media"} -->
<figure class="wp-block-image size-large"><a href="/wp-content/uploads/2022/06/dallemini_2022-6-24_19-56-9.png"><img src="/wp-content/uploads/2022/06/dallemini_2022-6-24_19-56-9.png" alt="" class="wp-image-1693" /></a><figcaption>Object Oriented Programming</figcaption></figure>
<!-- /wp:image --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:image {"id":1694,"sizeSlug":"large","linkDestination":"media"} -->
<figure class="wp-block-image size-large"><a href="/wp-content/uploads/2022/06/dallemini_2022-6-24_19-56-14.png"><img src="/wp-content/uploads/2022/06/dallemini_2022-6-24_19-56-14.png" alt="" class="wp-image-1694" /></a><figcaption>OOP</figcaption></figure>
<!-- /wp:image --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:image {"id":1692,"sizeSlug":"large","linkDestination":"media"} -->
<figure class="wp-block-image size-large"><a href="/wp-content/uploads/2022/06/dallemini_2022-6-24_19-54-57-1.png"><img src="/wp-content/uploads/2022/06/dallemini_2022-6-24_19-54-57-1.png" alt="" class="wp-image-1692" /></a><figcaption>Object Disoriented Programming</figcaption></figure>
<!-- /wp:image --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:image {"id":1698,"sizeSlug":"large","linkDestination":"media"} -->
<figure class="wp-block-image size-large"><a href="/wp-content/uploads/2022/06/dallemini_2022-6-24_19-57-58.png"><img src="/wp-content/uploads/2022/06/dallemini_2022-6-24_19-57-58.png" alt="" class="wp-image-1698" /></a><figcaption>Exploratory Data Analysis</figcaption></figure>
<!-- /wp:image --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:image {"id":1699,"sizeSlug":"large","linkDestination":"media"} -->
<figure class="wp-block-image size-large"><a href="/wp-content/uploads/2022/06/dallemini_2022-6-24_19-57-39.png"><img src="/wp-content/uploads/2022/06/dallemini_2022-6-24_19-57-39.png" alt="" class="wp-image-1699" /></a><figcaption>EDA</figcaption></figure>
<!-- /wp:image --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:paragraph -->
<p>The examples above demonstrate that model does not handle abbreviations well. I can think of several reasons for that, but that emphasizes the need to use precise wording and might need to try several times to get the desired result.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Trying negation again (in this case, the abbreviation worked okish) - </p>
<!-- /wp:paragraph -->

<!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:image {"id":1702,"sizeSlug":"large","linkDestination":"media"} -->
<figure class="wp-block-image size-large"><a href="/wp-content/uploads/2022/06/dallemini_2022-6-24_20-6-40.png"><img src="/wp-content/uploads/2022/06/dallemini_2022-6-24_20-6-40.png" alt="" class="wp-image-1702" /></a><figcaption>SQL</figcaption></figure>
<!-- /wp:image --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:image {"id":1703,"sizeSlug":"large","linkDestination":"media"} -->
<figure class="wp-block-image size-large"><a href="/wp-content/uploads/2022/06/dallemini_2022-6-24_20-6-44.png"><img src="/wp-content/uploads/2022/06/dallemini_2022-6-24_20-6-44.png" alt="" class="wp-image-1703" /></a><figcaption>NoSQL</figcaption></figure>
<!-- /wp:image --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:image {"id":1705,"sizeSlug":"large","linkDestination":"media"} -->
<figure class="wp-block-image size-large"><a href="/wp-content/uploads/2022/06/dallemini_2022-6-24_20-6-57.png"><img src="/wp-content/uploads/2022/06/dallemini_2022-6-24_20-6-57.png" alt="" class="wp-image-1705" /></a><figcaption>Structured Query Language</figcaption></figure>
<!-- /wp:image --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:paragraph -->
<p>Which of course reminds all of us of this one -</p>
<!-- /wp:paragraph -->

<!-- wp:image {"align":"center","width":417,"height":506,"sizeSlug":"large"} -->
<figure class="wp-block-image aligncenter size-large is-resized"><img src="https://img.ifunny.co/images/59bc1310f1032f32e1675cfed70b9d89aa34395fa15214a960f4448169d05d49_1.webp" alt="" width="417" height="506" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>And a few more -</p>
<!-- /wp:paragraph -->

<!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:image {"id":1709,"sizeSlug":"large","linkDestination":"media"} -->
<figure class="wp-block-image size-large"><a href="/wp-content/uploads/2022/06/dallemini_2022-6-24_20-12-31.png"><img src="/wp-content/uploads/2022/06/dallemini_2022-6-24_20-12-31.png" alt="" class="wp-image-1709" /></a><figcaption>SOLID principles</figcaption></figure>
<!-- /wp:image --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:image {"id":1710,"sizeSlug":"large","linkDestination":"media"} -->
<figure class="wp-block-image size-large"><a href="/wp-content/uploads/2022/06/dallemini_2022-6-24_20-12-21.png"><img src="/wp-content/uploads/2022/06/dallemini_2022-6-24_20-12-21.png" alt="" class="wp-image-1710" /></a><figcaption>Clean Code</figcaption></figure>
<!-- /wp:image --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:image {"id":1712,"sizeSlug":"large","linkDestination":"media"} -->
<figure class="wp-block-image size-large"><a href="/wp-content/uploads/2022/06/dallemini_2022-6-24_20-14-54.png"><img src="/wp-content/uploads/2022/06/dallemini_2022-6-24_20-14-54.png" alt="" class="wp-image-1712" /></a><figcaption>Computer Vision</figcaption></figure>
<!-- /wp:image --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:paragraph -->
<p>To conclude, I cannot see a straightforward production-grade usage of this model (and it is anyhow not publically available yet) but maybe one use it for brainstorming and ideation. For me it feels like NLP in the days of TF-IDF there is yet a lot to come. Going forward I would love to have some more tunning possibilities like a color scheme or control the similarity between different results (mainly allow more diversity rather than more of the same).</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->
