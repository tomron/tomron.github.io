---
title: "LLM-as-a-Judge Is a Model Too: Four Weaknesses and One Misuse"
description: "LLM-as-a-judge grades open-ended outputs at scale, but the judge has biases of its own, and it's often used where code should decide. A worked example and how each drawback breaks it."
pubDate: 2026-11-04T09:00:00.000Z
permalink: "/2026/11/04/llm-as-a-judge-drawbacks/"
heroImage: "/wp-content/uploads/2026/11/ai_judges.png"
heroImageAlt: "A cartoon courtroom where five judges in black robes have the OpenAI, Anthropic, Google, Meta and Mistral logos for heads, facing two people seen from behind"
tags:
  - "llm"
  - "ai"
  - "evals"
  - "testing"
  - "machine learning"
draft: false
scheduledPublish: true
---

<!-- wp:paragraph -->
<p>In <a href="/2026/11/01/llm-eval-failure-modes-sql-agent/">a previous post</a> I listed eleven ways an agent eval can lie, and one of them was trusting an uncalibrated LLM judge. This post covers what can go wrong with LLM-as-a-judge itself. There's a <a href="#cheat-sheet">cheat sheet</a> at the end if you want the short version.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>What is LLM-as-a-judge?</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Some outputs are easy to validate. A SQL query either returns the right number on the fixture or it doesn't. Many outputs can't: a summary, a support reply, an answer to "which customers are at risk of churning?". There's no single right string to compare against, and having people read thousands of outputs doesn't scale.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>LLM-as-a-judge fills the gap. You give a model the input, the output and a rubric, and ask for a verdict. It comes in two flavors: <strong>pointwise</strong>, grading one output as a score or pass/fail, and <strong>pairwise</strong>, picking the better of two outputs for the same input.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>The <a href="https://arxiv.org/abs/2306.05685">MT-Bench paper</a> (Zheng et al., NeurIPS 2023) made it a standard tool. Its headline result explains the popularity: strong judges like GPT-4 agreed with human preferences more than 80% of the time, about as often as humans agree with each other, at a fraction of the cost and fast enough to run on every change.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>GPT-4 is old now, and newer studies are more mixed. <a href="https://arxiv.org/abs/2510.09738">Judge's Verdict</a> (2025) tested 54 models, 43 open and 11 closed, on scoring RAG and agent answers against ground truth. Half reached human-level agreement, and training mattered more than model size. A strong model is not necessarily a strong judge, and a smaller, cheaper model can do the job.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>An example</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Back to the SQL agent. A user asks, "Which customers are at risk of churning?" The agent runs a query and writes a short answer. There's no gold answer, so we write the rubric most people would write first:</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>You are grading the answer of a data analyst agent.

Question: {question}
Answer: {answer}
SQL that was executed: {sql}

Score each criterion from 1 to 5:
1. Definition: does the answer state how "at risk" was defined?
2. Support: is every claim in the answer backed by the SQL?
3. Usefulness: could a retention team act on this?

Reply with JSON: {"definition": n, "support": n, "usefulness": n, "reason": "..."}</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>And the judge returns:</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code language-json"><code class="language-json">{
  "definition": 4,
  "support": 5,
  "usefulness": 4,
  "reason": "Defines at-risk as no order in 90 days, lists the top 20 by lifetime value, and the SQL matches."
}</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>Run that over 500 answers and you have a dashboard. The stats look reasonable, but each drawback below breaks them in a different way. Four are weaknesses of the judge. The fifth is a mistake in how we use it.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>1. Position bias</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Now compare two versions of the agent on the same question, and order starts to matter. In pairwise grading, judges tend to favor one slot, often the first. The MT-Bench paper found that even GPT-4 gave a consistent verdict after the answers were swapped only about 65% of the time, and <a href="https://arxiv.org/abs/2305.17926">Wang and colleagues</a> showed that reordering a pair could change which of two models won.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>People show the same primacy effect (<a href="https://doi.org/10.1111/j.1467-9280.2009.02453.x">Mantonakis et al., 2009</a>), which is why the human labels you calibrate a judge against need shuffled order too.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Each verdict looks reasonable on its own, so the bias only shows across orders. Judge every pair several times with the order shuffled, count a win only when the verdicts agree, and track the tie rate as a measure of how noisy the judge is.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>2. Verbosity and style bias</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Judges can favor long, confident, well-formatted answers. In our example, an agent that pads its churn answer with a paragraph of caveats and a bulleted summary can outscore one that says "customers with no order in 90 days, top 20 attached" and is right.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>People have the same bias, and judges learn it from human preference data. <a href="https://arxiv.org/abs/2310.03716">Singhal and colleagues</a> found that reward models trained on human preferences lean on length, and that a reward based on length alone reproduced most of RLHF's gains. <a href="https://arxiv.org/abs/2309.16349">Hosking and colleagues</a> found that annotators rated more assertive answers as having fewer factual errors. When you label by hand, include a few padded-but-wrong and terse-but-right answers to see whether your own labels reward style.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Formatting may matter even more. <a href="https://arxiv.org/abs/2604.23178">Judging the Judges</a> (2026) compared nine debiasing strategies and found style bias, a preference for markdown over plain prose, was the largest bias it measured, larger than position bias.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>This bites hardest when you optimize against the judge: tune a prompt against a judge that likes length and you get longer answers, not better ones. AlpacaEval hit this and added a <a href="https://arxiv.org/abs/2404.04475">length-controlled version</a>. Tell the judge not to reward length or formatting, and check whether your scores track token count. If they do, you're measuring verbosity.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>3. Self-preference</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>A judge can favor outputs that look like its own, though the evidence is mixed. The MT-Bench paper listed self-enhancement as a possible bias but said its data couldn't settle it. <a href="https://arxiv.org/abs/2404.13076">Panickssery and colleagues</a> found that models can recognize their own generations and that this correlates with how much they favor them. In their label-swap test on XSum, GPT-4 preferred its own summary 73% of the time, but only 32% when the labels were swapped so that it looked like another model's. <a href="https://arxiv.org/abs/2410.21819">Wataoka and colleagues</a> suggest familiarity as a mechanism: text with lower perplexity under the judge scored higher, whoever wrote it.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>In our example, the agent and the judge are probably the same model, because it's the one you already have a key for. Even a modest effect then rewards a style the judge happens to like. Use a judge from a different model family, or check the scores against a second judge and read where they disagree.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>4. Sensitivity and drift</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>The judge is a prompt on a model, and both move your numbers. Reword the rubric or change the scale and the scores shift. Run the same judge twice on the same answer and you may get two different scores. Our rubric makes this worse twice over: the difference between a 4 and a 5 on "usefulness" has no definition, and the reason comes after the scores, so the judge picks a number and then justifies it.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Then there's drift. If the provider updates a hosted judge, your history shifts with no change on your side, and last month's 4.1 isn't comparable to this month's. Use pass/fail criteria with written definitions, ask for the reason before the verdict, pin the judge version, and when you must change it, rerun old outputs to measure the break. It's the model drift from the previous post, applied to the grader.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>5. Using it where code should decide</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>This one is a misuse, not a weakness of the judge. The "support" criterion asks whether the answer matches the SQL, and code can check that by comparing the customers named in the answer with the rows the query returned. A judge is the wrong tool for checkable questions, and a better judge wouldn't change that.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>A judge also fails at checking in a predictable way. It reads text, so it doesn't run the query or know the schema's traps. Show it the 320.00 net revenue answer from the previous post, where the agent counted cancelled orders, with a clean query and a confident explanation, and it will often approve it. The error is a missing <code>WHERE o.status IN (...)</code> clause, and an absence is harder to spot than a mistake. On <a href="https://arxiv.org/abs/2410.12784">JudgeBench</a>, which pairs plausible answers with correct ones on hard questions, many strong models, including GPT-4o, did only slightly better than random.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>So run the code first and give the judge only what's left. When you have a reference answer, give it to the judge and measure whether it helps: <a href="https://arxiv.org/abs/2608.26623">AgentJudgeBench</a> (EMNLP 2026) found it slightly lowered agreement for two frontier judges.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>The rubric, fixed</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Applying the fixes to the original rubric: "support" moves to code, the scores become pass/fail with written definitions, the reason comes first, and the judge is told what not to reward.</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>You are grading the answer of a data analyst agent.

Question: {question}
Answer: {answer}

For each criterion, write a one-sentence reason, then pass or fail.
Do not reward length, formatting or confident tone.

1. Definition: pass only if the answer states a rule and a time window
   for "at risk" (e.g. "no order in 90 days"). Fail if it only says "at risk".
2. Actionable: pass only if it names specific customers or segments
   and a next step a retention team could take without follow-up questions.

Reply with JSON:
{"definition": {"reason": "...", "pass": true},
 "actionable": {"reason": "...", "pass": false}}</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>A few lines of code now check that every customer named in the answer appears in the query's result rows, and the judge, from a different model family than the agent, pinned to a version, only sees what code can't decide.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Cheaper Judges</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>A judge is cheaper than people, but not cheap. Every call carries the question, the answer and the rubric, and the judge writes its reasoning back. The fixes above multiply the calls: two criteria in separate calls, each run three times, on 500 answers is 3,000 calls for one eval run. Run that on every change to the agent with a reasoning model as the judge, and the eval bill can rival the product's.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Self-hosting an open-weight judge changes the math. You pay for GPUs instead of tokens, the data stays in house, and the drift from drawback 4 mostly goes away, because the weights change only when you change them. Open models are increasingly good enough: in AgentJudgeBench, the open-weight GPT-OSS-120B was the judge most aligned with people. A good benchmark score doesn't guarantee a good score on your task, so compare two or three candidates on a sample you labeled yourself.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Decision models are another option. Reward models and newer general-purpose ones like TypeSafe AI's <a href="https://typesafe.ai/blog/introducing-system-one-models-and-jev">Jev</a> take an input and a typed question and return a label with a probability. A typed answer replaces "ask for JSON and hope", and a calibrated probability lets you route uncertain cases to a person. But a model asked "is this answer supported by the SQL?" is still judging text, so the rule from drawback 5 holds. These models are far less studied than chat-model judges, so measure them like any other.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>So should you use one?</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Yes, for the part code can't check, and only after you've graded the grader. Label about 100 outputs by hand, in random order, and include a few answers you know are wrong. Compare the judge's verdicts to yours with percent agreement and Cohen's kappa, since agreement alone looks good when most answers pass. If the judge passes your known-bad answers or the kappa is low, fix the judge before you trust a dashboard. Re-measure on every judge or prompt change.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>A judge shifts the human work rather than removing it: instead of reading 500 answers, you read 100 and check that the judge reads them the way you would.</p>
<!-- /wp:paragraph -->

<!-- wp:details -->
<details class="wp-block-details" id="cheat-sheet"><summary><h2 style="display:inline"><a href="#cheat-sheet">Cheat sheet</a></h2></summary>
<!-- wp:table {"hasFixedLayout":false} -->
<figure class="wp-block-table"><table><thead><tr><th>Drawback</th><th>Symptom</th><th>Quick test</th><th>Fix</th></tr></thead><tbody><tr><td>1. Position</td><td>Verdict flips when the order flips</td><td>Judge each pair in shuffled orders</td><td>Count a win only when verdicts agree; report the tie rate</td></tr><tr><td>2. Verbosity and style</td><td>Long or markdown answers win</td><td>Score the same answer plain and padded</td><td>Tell the judge not to reward length or formatting; check scores against token count</td></tr><tr><td>3. Self-preference</td><td>Your own model's style wins</td><td>Compare with a judge from another family</td><td>Use a judge from a different family than the system it grades</td></tr><tr><td>4. Sensitivity and drift</td><td>Scores move with no change on your side</td><td>Rerun the same outputs twice, and after any judge change</td><td>Pass/fail with written definitions, reason before verdict, pinned judge version</td></tr><tr><td>5. Code should decide</td><td>Wrong answers pass because they read well</td><td>Seed a known-wrong answer and see if it passes</td><td>Check results, rows and calculations in code; give the judge only what is left</td></tr><tr><td>All</td><td>No idea how good the judge is</td><td>Label about 100 outputs by hand, order randomized, a few known-bad</td><td>Measure agreement and kappa; re-measure on every judge or prompt change</td></tr></tbody></table></figure>
<!-- /wp:table -->
</details>
<!-- /wp:details -->

<!-- wp:details -->
<details class="wp-block-details" id="references"><summary><h3 style="display:inline">References</h3></summary>
<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li><strong>Bias:</strong> <a href="https://arxiv.org/abs/2306.05685">MT-Bench and Chatbot Arena</a> (Zheng et al., 2023) for position and verbosity bias and agreement with humans; <a href="https://arxiv.org/abs/2305.17926">Large Language Models are not Fair Evaluators</a> (Wang et al., 2023) for order effects; <a href="https://doi.org/10.1111/j.1467-9280.2009.02453.x">Order in Choice</a> (Mantonakis et al., 2009) for the same effect in people; <a href="https://arxiv.org/abs/2404.04475">Length-Controlled AlpacaEval</a> (Dubois et al., 2024); <a href="https://arxiv.org/abs/2310.03716">A Long Way to Go</a> (Singhal et al., 2023) for length in human preference data; <a href="https://arxiv.org/abs/2309.16349">Human Feedback is not Gold Standard</a> (Hosking et al., 2023) for assertiveness; <a href="https://arxiv.org/abs/2604.23178">Judging the Judges</a> (Soumik, TMLR 2026) for style bias and mitigations.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Self-preference:</strong> <a href="https://arxiv.org/abs/2404.13076">LLM Evaluators Recognize and Favor Their Own Generations</a> (Panickssery, Bowman, Feng, 2024); <a href="https://arxiv.org/abs/2410.21819">Self-Preference Bias in LLM-as-a-Judge</a> (Wataoka, Takahashi, Ri, 2024) for perplexity as a possible mechanism.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Measuring judges:</strong> <a href="https://arxiv.org/abs/2410.12784">JudgeBench</a> (Tan et al., 2024), strong judges near random on hard pairs; <a href="https://arxiv.org/abs/2608.26623">AgentJudgeBench</a> (Verma et al., EMNLP 2026), judges on agent tool calls by difficulty; <a href="https://arxiv.org/abs/2510.09738">Judge's Verdict</a> (Han et al., 2025), human agreement across 54 models; <a href="https://arxiv.org/abs/2403.13787">RewardBench</a> for reward models.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Prompting and fine-tuned judges:</strong> <a href="https://arxiv.org/abs/2303.16634">G-Eval</a>, which established the criteria-plus-reasoning prompt most rubric judges still use; <a href="https://arxiv.org/abs/2306.05087">PandaLM</a>, <a href="https://arxiv.org/abs/2310.17631">JudgeLM</a>, <a href="https://arxiv.org/abs/2310.08491">Prometheus</a> and <a href="https://arxiv.org/abs/2405.01535">Prometheus 2</a>, and the <a href="https://arxiv.org/abs/2403.02839">empirical study</a> of how far they generalize.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Decision models:</strong> <a href="https://typesafe.ai/blog/introducing-system-one-models-and-jev">Introducing System One Models and Jev</a> (TypeSafe AI). Vendor claims, not independently verified.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->
</details>
<!-- /wp:details -->
