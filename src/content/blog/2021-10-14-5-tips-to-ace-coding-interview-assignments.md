---
title: "5 tips to ace coding interview assignments"
pubDate: 2021-10-14T08:39:36.000Z
permalink: "/2021/10/14/5-tips-to-ace-coding-interview-assignments/"
tags:
  - "interviews"
draft: false
---
<!-- wp:paragraph -->
<p>Now days, it is a very common practice to give a coding home tests as part of interview process. Beside solving the task you are ask to I believe there are few additional things you can do in order to impress the reviewers and ace this step of the process.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><br>1. <strong>Push the code to a private repository and share it with the reviewers</strong> - this creates a two fold advantage. First, it demonstrates the reviewers that you are familiar with version control tools and second it shows your working process and that you keep track of your work. Don't forget to write <a href="https://chris.beams.io/posts/git-commit/">meaningful commit messages</a>.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>2. <strong>Write README file</strong> - the readme file gives a context to the entire project and reflects the way you understand the assignment. One of the annoting things as a reviewer is to guess how to run the code, what are the requirments and so on. Beside packaging or building the code in a way the runs smoothly (e.g in Python if using pip add a requirements.txt) a README file should help me find my way inside the project. In such assignments where you don't have a direct communication with the reviewers the README files also serves as a place to document your decisions and thoughts.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>What should you include in the README file? Short introduction explaining the project purpose and scre.  How to install and run or use it, preferably with some snippet that one can just copy-paste. How to run the tests (see next section :). Additional sections can include explainations about choices you made architecture wise or implementation wise, charts, performance evaluation, future ideas, dependencies, etc. This will help the reviewers get into your code quickly and run, understand your thinking and show that you are eager to share your knowledge with your peers.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>For ease of use, check the template suggested <a href="https://www.makeareadme.com/">here</a>.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>3. <strong>Write tests</strong> - usually unit tests are enough for this scope. This will help you debug your code and make sure it works properly. It will also signal the reviewers that you care about the quality of your code and know your job.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>4. <strong>Run linters, spell check and do a proof reading for everything</strong> - make sure your code uses the common conventions and style for the tools you are using (e.g PEP-8 for python). Bonus points if you add the linters as <a href="https://pre-commit.com/">pre-commit hooks</a> to your repository. This make your code smoother and easier for the reviewers to read. The formatted code indicates that you are used to sharing your code with others and the hooks signal that you are productive and <a href="http://blogoscoped.com/archive/2005-08-24-n14.html">lazy</a> by automating stuff.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>5. <strong>Document everything</strong> - the idea behind this tip is not to annoy the reviewers by letting them guess what you meant. That is document what each module, function and parameter does. For example, in Python, use type annotation and docstrings.</p>
<!-- /wp:paragraph -->
