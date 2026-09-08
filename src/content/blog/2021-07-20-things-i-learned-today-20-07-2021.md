---
title: "Things I learned today (20/07/2021)"
pubDate: 2021-07-20T09:36:00.000Z
permalink: "/2021/07/20/things-i-learned-today-20-07-2021/"
tags:
  - "aws"
  - "delay queue"
  - "FIFO"
  - "message timer"
  - "sqs"
draft: false
---
<!-- wp:quote -->
<blockquote class="wp-block-quote"><p>Delay queues let you postpone the delivery of new messages to a queue for a number of seconds</p><cite><a href="https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-delay-queues.html">AWS documentation</a></cite></blockquote>
<!-- /wp:quote -->

<!-- wp:paragraph -->
<p>This means that all the messages which are pushed to this queue would be visible to the consumer after the delay period. The minimum delay which is also the default delay is 0 and the maximum is 15 minutes.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Note that when changing the delay of a queue the behaviour of FIFO queues and standard queues is different - </p>
<!-- /wp:paragraph -->

<!-- wp:quote -->
<blockquote class="wp-block-quote"><p><br>For standard queues, the per-queue delay setting is not retroactive—changing the setting doesn't affect the delay of messages already in the queue.</p><p>For FIFO queues, the per-queue delay setting is retroactive—changing the setting affects the delay of messages already in the queue.</p><cite><a href="https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-delay-queues.html">AWS documentation</a></cite></blockquote>
<!-- /wp:quote -->

<!-- wp:paragraph -->
<p>If you need to delay the visibility of specific messages and not all messages in the queue you can use message timers and add an initial invisibility period for a message. This is only supported by standard queues.Note that setting a message timer for individual messages overrides the delay period of the delay queue.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>See the image below to understand message timeline in a queue -</p>
<!-- /wp:paragraph -->

<!-- wp:embed {"url":"https:\/\/docs.aws.amazon.com\/AWSSimpleQueueService\/latest\/SQSDeveloperGuide\/images\/sqs-delay-queues-diagram.png","type":"rich","providerNameSlug":"embed"} -->
<figure class="wp-block-embed is-type-rich is-provider-embed wp-block-embed-embed"><div class="wp-block-embed__wrapper">
https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/images/sqs-delay-queues-diagram.png
</div></figure>
<!-- /wp:embed -->

<!-- wp:paragraph -->
<p>See more here -<br><a href="https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-delay-queues.html">https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-delay-queues.html<br></a><a href="https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-message-timers.html">https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-message-timers.html</a></p>
<!-- /wp:paragraph -->
