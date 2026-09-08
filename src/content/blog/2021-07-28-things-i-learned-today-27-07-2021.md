---
title: "Things I learned today (27/07/2021)"
pubDate: 2021-07-28T07:18:42.000Z
permalink: "/2021/07/28/things-i-learned-today-27-07-2021/"
tags:
  - "asg"
  - "auto-scaling"
  - "aws"
  - "ec2"
draft: true
---
<!-- wp:paragraph -->
<p>Instances in auto-scaling groups can be replaced based on a maximum instance lifetime parameter. I.e. "As an instance approaches its maximum duration, it is terminated and replaced, and cannot be used again" (<a href="https://docs.aws.amazon.com/autoscaling/ec2/userguide/asg-max-instance-lifetime.html">here</a>)</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Auto-scaling groups is a set of EC2 instances that are logically grouped together in order to automatically adjust to the capacity requirements of underlying application. ASG can scale-in and scale-out based on different policies - scheduled action, target tracking, simple and step policies. ASGs are super useful and common constructs for supporting HA applications.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><br>As of November 2019, EC2 instances in ASG can be replaced at a regular, given rate, not shorter than 1 day (values should be specified in seconds).Note that the exact interval is not guaranteed since AWS tries not to replace all the instances at once. Therefore, instances would be replaced before they reach their maximum lifetime. Unless they already reached the maximum lifetime when it was set and then they would be replaced immediately.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><br>The motivation for this feature as mentioned in the documentation is compliance reasons. Another way to think of it is as a sort of deployment. If the launch template changed it would be deployed to all instances within the max instance lifetime parameter. Of course, a faster and more predictable way to achieve it would be to initiate an instance replace but this is also an option.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>See more here -</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><li>https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html</li><li>https://docs.aws.amazon.com/autoscaling/ec2/userguide/asg-max-instance-lifetime.html</li><li>https://aws.amazon.com/about-aws/whats-new/2019/11/amazon-ec2-auto-scaling-supports-max-instance-lifetime/</li></ul>
<!-- /wp:list -->
