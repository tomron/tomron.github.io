---
title: "Things I learned today (21/07/2021)"
pubDate: 2021-07-21T14:20:00.000Z
permalink: "/2021/07/21/things-i-learned-today-21-07-2021/"
tags:
  - "aws"
  - "FIFO"
  - "sns"
  - "sqs"
draft: false
---
<!-- wp:quote -->
<blockquote class="wp-block-quote"><p>You can use Amazon SNS FIFO (first in, first out) topics and Amazon Simple Queue Service (Amazon SQS) FIFO queues together to provide strict message ordering and message deduplication</p><cite><a href="https://docs.aws.amazon.com/sns/latest/dg/sns-fifo-topics.html">AWS documentation</a></cite></blockquote>
<!-- /wp:quote -->

<!-- wp:paragraph -->
<p><br>While, SQS FIFO queues <a href="https://aws.amazon.com/blogs/aws/new-for-amazon-simple-queue-service-fifo-queues-with-exactly-once-delivery-deduplication/">were introduced</a> in 2016, SNS FIFO capabilities were introduced only on October 2020.<br></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>This capability is important for cases in which the order matters. E.g. bank transactions were you commit a transaction only if the balance remains non-negative.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Messages are grouped and ordered according to the <code>message group ID</code>. When sending a message you must specify a message group ID otherwise the action fails. If all the messages have the same message group ID then all the messages are&nbsp;sent and received in strict order.&nbsp;The message group id can be any value, e.g 12, "hello", "user_id-123", etc.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><br>Note that as in the SQS case, the topic name must end with <code>.fifo</code>, a limitation that counts to the 80 characters restriction as well.&nbsp;</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>For further reading -</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><li><a href="https://aws.amazon.com/blogs/aws/introducing-amazon-sns-fifo-first-in-first-out-pub-sub-messaging/">https://aws.amazon.com/blogs/aws/introducing-amazon-sns-fifo-first-in-first-out-pub-sub-messaging/</a></li><li><a href="https://docs.aws.amazon.com/sns/latest/dg/sns-fifo-topics.html">https://docs.aws.amazon.com/sns/latest/dg/sns-fifo-topics.html</a></li><li><a href="https://aws.amazon.com/blogs/aws/new-for-amazon-simple-queue-service-fifo-queues-with-exactly-once-delivery-deduplication/">https://aws.amazon.com/blogs/aws/new-for-amazon-simple-queue-service-fifo-queues-with-exactly-once-delivery-deduplication/</a></li></ul>
<!-- /wp:list -->
