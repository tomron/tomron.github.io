---
title: "How an Agent Eval Lies"
description: "Eleven old and new ways an agent eval can show a healthy score while the agent is wrong, told through one SQL agent."
pubDate: 2026-11-01T09:00:00.000Z
permalink: "/2026/10/30/llm-eval-failure-modes-sql-agent/"
heroImage: "/wp-content/uploads/2026/10/evals_dashboard.png"
heroImageAlt: "A dashboard card with a green check badge above a struck-through 320.00, with an arrow pointing to the correct figure, 210.00, in a red-orange box"
tags:
  - "llm"
  - "ai"
  - "evals"
  - "agents"
  - "testing"
  - "sql"
  - "machine learning"
draft: true
---

<!-- wp:paragraph -->
<p>A SQL agent is asked the simplest question finance can ask: what was our net revenue last month? It answers 320.00. The right answer is 210.00. Nothing errors, the query looks plausible, and the eval score is green.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Everyone talks about evals now. Model launches lead with benchmark tables, agent products call themselves eval-driven, and there's a growing shelf of eval platforms. It sounds like a solved problem: write some test cases, get a score, ship. It isn't. An eval score can look healthy and correct while the agent is wrong, and there are many ways for that to happen.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>The failure modes come in two kinds. Some are inherited. Classic machine learning and software testing met them long ago and named them: proxy metrics, overfitting the validation set, train-serve skew, concept drift, the flaky test. If you've shipped a model before, you already know the defenses. Others are new, because an agent is a different beast. It doesn't give the same answer twice. It takes many steps, with costs and side effects. It's often graded by another model with biases of its own. And sometimes the right output is a question back to the user.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>The running example is that SQL agent, which answers business questions about an e-commerce database, and that net revenue question. We'll build its eval one step at a time, and each step adds a new way to be fooled.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Note: this is a constructed example. The scores are invented to make the mechanics visible. The failure modes are real.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>What are we measuring?</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>An eval exists to support decisions: is this good enough to ship, did the last change help, which of two options wins, and where does it fail. Without one, those calls rest on a handful of examples someone tried by hand. Correctness is the obvious thing to measure, and the one most evals stop at. For an agent it's rarely enough:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li><strong>Correctness:</strong> is the answer right? For a SQL agent, is the number right, not just the query plausible?</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Cost and time:</strong> tokens spent by the model, compute spent by the database, and how long the user waits. An agent that answers correctly after scanning a terabyte isn't free, and latency grows with every retry and tool call. (Step 4)</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Reliability:</strong> does it give the right answer every time, or only most times? (Step 3)</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Safety:</strong> does it stay inside its permissions? No writes, no unbounded scans, no data the user shouldn't see. (Step 4)</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Behavior:</strong> when the question is ambiguous, does it ask or state its assumption instead of guessing silently? (Step 6)</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>These trade off against each other. A bigger model may be more correct and slower. More retries may be more reliable and more expensive. So decide upfront which are gates and which are budgets. For a finance question, correctness and safety are gates: fail either and nothing else matters. Cost and time are budgets: they should stay under a limit, and within it, lower is better. Blending everything into one score hides exactly the trade-offs you need to see. Most of the failure modes below are about correctness, because that's where evals lie most convincingly, but cost, reliability and behavior come back along the way.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>The system under test</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>The agent gets a natural-language question and writes SQL against five tables: customers, orders, order_items, refunds and products. The schema is deliberately boring, apart from the highlighted fields, which are the traps.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="/wp-content/uploads/2026/10/sql-eval-schema.svg" alt="Entity relationship diagram of five tables: customers, orders, order_items, refunds and products, with the order status, UTC timestamp, line-level discount and partial refund amount fields highlighted" /><figcaption class="wp-element-caption">The schema. Highlighted fields are where plausible-looking queries go wrong.</figcaption></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Orders have a status, and not every status is revenue: cancelled and pending orders exist. Timestamps are stored in UTC while the business reports in New York time. Discounts live on the line item. Refunds are partial and attach to the order, not to an item. None of this is exotic. It's what a real schema looks like after a few years.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>The question, and two answers</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Here is a reference query for "what was our net revenue last month?". It keeps only paid, shipped and delivered orders, computes the month boundaries in New York time, subtracts discounts per line, and nets out refunds after aggregating them per order.</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code language-sql"><code class="language-sql">WITH bounds AS (
  SELECT
    (date_trunc('month', now() AT TIME ZONE 'America/New_York') - interval '1 month')
      AT TIME ZONE 'America/New_York' AS lo,
    date_trunc('month', now() AT TIME ZONE 'America/New_York')
      AT TIME ZONE 'America/New_York' AS hi
),
month_orders AS (
  SELECT o.id,
         SUM(oi.quantity * oi.unit_price_cents - oi.discount_cents) AS gross_cents
  FROM orders o
  JOIN order_items oi ON oi.order_id = o.id
  CROSS JOIN bounds b
  WHERE o.status IN ('paid', 'shipped', 'delivered')
    AND o.created_at &gt;= b.lo AND o.created_at &lt; b.hi
  GROUP BY o.id
),
refunded AS (
  SELECT order_id, SUM(amount_cents) AS refund_cents
  FROM refunds
  GROUP BY order_id
)
SELECT SUM(m.gross_cents - COALESCE(r.refund_cents, 0)) / 100.0 AS net_revenue
FROM month_orders m
LEFT JOIN refunded r ON r.order_id = m.id;</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>And here is what an agent plausibly writes:</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code language-sql"><code class="language-sql">SELECT SUM(oi.unit_price_cents * oi.quantity) / 100.0
FROM order_items oi
JOIN orders o ON o.id = oi.order_id
WHERE o.created_at &gt;= date_trunc('month', now()) - interval '1 month'
  AND o.created_at &lt;  date_trunc('month', now());</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>It ignores status, discounts, refunds and timezone, and it returns a clean, plausible number. Take a small <em>trap fixture</em>: three September orders, one of them cancelled and one with a discount and a partial refund.</p>
<!-- /wp:paragraph -->

<!-- wp:table {"hasFixedLayout":false} -->
<figure class="wp-block-table"><table><thead><tr><th>Order</th><th>Status</th><th>Gross</th><th>Discount</th><th>Refund</th><th>Reference counts</th><th>Agent counts</th></tr></thead><tbody><tr><td>A</td><td>delivered</td><td>100</td><td>0</td><td>0</td><td>100</td><td>100</td></tr><tr><td>B</td><td>shipped</td><td>150</td><td>10</td><td>30</td><td>110</td><td>150</td></tr><tr><td>C</td><td>cancelled</td><td>70</td><td>0</td><td>0</td><td>0</td><td>70</td></tr><tr><td><strong>Total</strong></td><td></td><td></td><td></td><td></td><td><strong>210</strong></td><td><strong>320</strong></td></tr></tbody></table></figure>
<!-- /wp:table -->

<!-- wp:paragraph -->
<p>The reference returns 210.00 and the agent's query returns 320.00. Nothing errors. A dashboard built on it would look fine for months.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Step 1: Match the SQL text</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Start simple. Write 50 questions with reference SQL and check whether the agent's query matches. The score is 38%. Read the failures and most of them aren't failures: a subquery where the reference used a CTE, a column aliased differently. A string comparison can't tell those apart from a wrong answer.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>This is measuring a proxy. Many different queries are valid for one question, so surface similarity punishes style and says nothing about correctness.<sup id="fnref-1"><a href="#fn-1">1</a></sup></p>
<!-- /wp:paragraph -->

<!-- wp:quote -->
<blockquote class="wp-block-quote"><p><strong>Inherited from classic ML:</strong> judging machine translation with BLEU, or summaries with ROUGE. Same disease. You reward overlap with one reference when many outputs are right.</p></blockquote>
<!-- /wp:quote -->

<!-- wp:heading -->
<h2>Step 2: Run on one thin database</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>The obvious fix is to run both queries and compare the results. This is execution accuracy, and the score jumps to 84%. Everyone relaxes. But the <em>thin test database</em> has 200 rows, no refunds in the test month and no cancelled orders, so the agent's query that ignores both returns exactly the right number. It passes for the wrong reason.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Exact match gave false negatives. Execution accuracy on a thin database gives false positives, and those are more dangerous because they look like progress. The fix is to stop relying on one database and distill a suite of databases that, between them, separate the reference from plausible wrong answers.<sup id="fnref-1b"><a href="#fn-1">1</a></sup> For us that means trap fixtures seeded on purpose: cancelled orders, partial refunds, multi-item orders, an order placed at 23:30 New York time on the last day of the month, a discount that zeroes out a line.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Here is a second question the thin database misses: refund rate by product category. The agent's version looks reasonable.</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code language-sql"><code class="language-sql">SELECT p.category,
       SUM(r.amount_cents)::numeric
         / SUM(oi.quantity * oi.unit_price_cents - oi.discount_cents) AS refund_rate
FROM order_items oi
JOIN orders o   ON o.id = oi.order_id
JOIN products p ON p.id = oi.product_id
LEFT JOIN refunds r ON r.order_id = o.id
WHERE o.status IN ('paid', 'shipped', 'delivered')
GROUP BY p.category;</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>Refunds attach to the order, so this join repeats the order's refund on every line item. On the thin database, where every order has one item, nothing is off. On the trap fixture, which has a multi-item order, the same refund is counted once per line and charged to every category in the order. The query reports about 31% for books and 50% for toys, when the right figures are about 16% and 25%. The reference aggregates refunds per order first, then allocates them to items in proportion to line revenue.</p>
<!-- /wp:paragraph -->

<!-- wp:quote -->
<blockquote class="wp-block-quote"><p><strong>Inherited from classic ML:</strong> Clever Hans, the horse that seemed to do arithmetic but was reading his trainer's body language. A model can score well for reasons that have nothing to do with the task. If the test data never exercises the hard cases, a passing score tells you nothing about them.</p></blockquote>
<!-- /wp:quote -->

<!-- wp:heading -->
<h2>Step 3: Run each question once</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>The suite is green and the agent gets the net revenue question right. Run it again and it might not. A classic classifier is a function: same input, same output. An agent samples. Ask the same question ten times and you can get ten different queries, say seven that filter on status and three that don't. Temperature 0 doesn't fully save you, because <a href="https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference/">serving-side effects like batching</a> mean identical requests can still produce different outputs. And an agent compounds it: one different token early changes which tables it inspects, and every step after that.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>So one run per question is a sample of one. A 90% score from a single run can't tell an agent that's always right on 90% of questions from one that's right on every question 90% of the time, and for a finance dashboard those are very different products. Run each question several times and report the pass rate per question. For questions that must work every time, require all k runs to pass. <a href="https://arxiv.org/abs/2406.12045">τ-bench</a> calls this pass^k. It found that even state-of-the-art function-calling agents such as GPT-4o succeeded on fewer than half the tasks, with pass^8 below 25% in its retail domain.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>The same applies when comparing two versions of the agent: a two-point gain on 50 questions, one run each, is well within the noise.</p>
<!-- /wp:paragraph -->

<!-- wp:quote -->
<blockquote class="wp-block-quote"><p><strong>New with agents:</strong> classic models are deterministic at inference time. Random seeds made training noisy. Agents make every prediction noisy, and that variance is part of what you're measuring, not noise to average away.</p></blockquote>
<!-- /wp:quote -->

<!-- wp:heading -->
<h2>Step 4: Grade only the final answer</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>An agent doesn't write one query. It lists tables, samples rows, tries a query, reads the error, and tries again. The eval checks the number at the end. Now open a trace that passed. The agent ran fourteen queries, scanned all of <code>order_items</code> three times with no filter, and at one point tried to <code>CREATE TABLE tmp_revenue</code> to stage its results. The answer was correct. On a warehouse billed by bytes scanned, that's a bill. On a production replica with write permissions, it's an incident.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>The final answer can also disagree with the work. Agents summarize what they did, and the summary can describe a filter the query never applied: "excluding cancelled orders" on top of SQL that doesn't mention status. If you grade the prose, you grade the claim, not what actually ran.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Cost needs the same attention, even when the final query is right. Style changes the text of a query. Inefficiency changes its cost, and you can't tell them apart by reading the SQL, so you measure. Run the agent's query and the reference on a scaled copy of the data and compare the query plan, the rows or bytes scanned, and the runtime. If the plans match, the difference is style: a CTE and a subquery usually compile to the same plan, since Postgres 12 inlines a CTE that is referenced once. If the cost differs by a large factor, it's inefficiency, even though the results are identical.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Scale matters here. On 200 rows a correlated subquery and a join both finish in a couple of milliseconds. At 80 million order_items rows one of them can take tens of seconds and the other about one. A thin dataset hides inefficiency as well as logic errors.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="/wp-content/uploads/2026/10/sql-eval-gate.svg" alt="Flowchart: agent SQL runs on a seeded fixture; if the result does not match the reference it fails as incorrect; if it matches it runs on a scaled copy and its cost is compared to the reference, passing as style within 2x, passing with a warning between 2x and 10x, and failing the efficiency budget above 10x or on a banned pattern" /><figcaption class="wp-element-caption">Correctness is a gate. Efficiency is a separate budget, measured against the reference on a scaled copy. The thresholds are illustrative.</figcaption></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Three details make this workable:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li><strong>Use a ratio, not an absolute number.</strong> Compare the agent's cost to the reference's, so the eval survives hardware changes.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Let the agent beat the reference.</strong> The reference can be inefficient too.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Ban a few patterns outright.</strong> Some are wrong whatever the plan says: a function wrapped around an indexed column in a WHERE clause, an accidental cross join, SELECT * on a columnar engine billed by bytes scanned.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>BIRD, a large text-to-SQL benchmark, does something similar with its <a href="https://arxiv.org/abs/2305.03111">Valid Efficiency Score</a>: wrong results score zero, and correct ones are scored on runtime relative to the reference.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>So grade the trajectory as well as the outcome. Give each task a budget for steps and bytes scanned. Run the eval with the same read-only credentials the agent gets in production, in a sandbox that looks like production. Keep a list of actions that fail a task whatever the answer: DDL, DML, unbounded scans of large tables. And check the stated answer against the SQL that executed.</p>
<!-- /wp:paragraph -->

<!-- wp:quote -->
<blockquote class="wp-block-quote"><p><strong>New with agents:</strong> a classifier's output is its prediction. An agent's output is a sequence of actions, and those actions have costs and side effects that the final answer doesn't show.</p></blockquote>
<!-- /wp:quote -->

<!-- wp:heading -->
<h2>Step 5: Trust the LLM judge</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Real questions don't all come with a gold query. "Which customers are at risk of churning?" has no single right answer, so you add an LLM judge. Now the judge is the problem. Judges tend to like long, polished, heavily commented queries and rate the terse correct one as merely fine. They tend to prefer whichever answer comes first, and may favor answers in their own style. The <a href="https://arxiv.org/abs/2306.05685">MT-Bench paper</a> that popularised LLM-as-a-judge documented position and verbosity bias, flagged self-enhancement as a possible third, and found that even GPT-4 gave the same verdict after the answers were swapped only about 65% of the time.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Position bias isn't unique to models. In a <a href="https://doi.org/10.1111/j.1467-9280.2009.02453.x">wine-tasting study</a>, participants given a sequence of samples tended to pick the first as their favorite, even though every sample was the same wine. That's why careful human evaluations randomize the order, and why your human labels need it too when you use them to calibrate the judge.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>None of this makes judges useless. The same paper found GPT-4's agreement with human preferences above 80%, roughly the level at which humans agree with each other. It means a judge is an instrument that needs calibrating. Swap the order and require both verdicts to agree. Give it a rubric. Have it grade the result set and the query plan instead of the prose of the SQL. Measure its agreement with human labels on a sample of a hundred or so, and measure again when you change the judge model.</p>
<!-- /wp:paragraph -->

<!-- wp:quote -->
<blockquote class="wp-block-quote"><p><strong>New with agents:</strong> the grader is now the same kind of system as the thing it grades, with the same tendencies, possibly including a taste for its own style. The fix is borrowed from inter-annotator agreement. You wouldn't trust a labeler you hadn't measured. Don't trust a judge you haven't either.</p></blockquote>
<!-- /wp:quote -->

<!-- wp:heading -->
<h2>Step 6: Never test the ambiguous questions</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Some questions can't be answered correctly as asked. "How many active customers did we have last quarter?" uses a term that appears nowhere in the schema. The agent picks "ordered at least once". Finance means "ordered in the last 90 days and not fully refunded". No amount of SQL skill fixes that, and comparing against a gold query won't catch it, because the gold query just encodes one of the two readings.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>What you can evaluate is behavior. Put ambiguous questions in the set on purpose, and score whether the agent asks a clarifying question or states its assumption in the answer. A silent guess fails, even when it happens to match.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>A related remedy is a confidence signal: have the agent report how sure it is that the question maps cleanly onto the schema and the known definitions, and route low-confidence questions to a clarifying question or a human. Self-reported confidence is often poorly calibrated, so evaluate the signal itself: when the agent says it's confident, is it right? A score that is high on the wrong answers is worse than none.</p>
<!-- /wp:paragraph -->

<!-- wp:quote -->
<blockquote class="wp-block-quote"><p><strong>Inherited:</strong> classic ML met this as out-of-vocabulary words and out-of-distribution inputs, such as extreme values the training set never contained. The classic remedies were confidence thresholds and a reject option: abstain when unsure. What's new is that an agent can do better than abstain. It can ask.</p></blockquote>
<!-- /wp:quote -->

<!-- wp:heading -->
<h2>Step 7: Report one number</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>The dashboard says 91%. Cut by question type, the picture changes.</p>
<!-- /wp:paragraph -->

<!-- wp:table {"hasFixedLayout":false} -->
<figure class="wp-block-table"><table><thead><tr><th>Question type</th><th>Share of eval set</th><th>Accuracy</th><th>Share of real traffic</th></tr></thead><tbody><tr><td>Simple aggregations</td><td>62%</td><td>98%</td><td>25%</td></tr><tr><td>Joins and filters</td><td>28%</td><td>90%</td><td>30%</td></tr><tr><td>Date and timezone logic</td><td>7%</td><td>55%</td><td>25%</td></tr><tr><td>Refunds and net revenue</td><td>3%</td><td>40%</td><td>20%</td></tr></tbody></table></figure>
<!-- /wp:table -->

<!-- wp:paragraph -->
<p>Weighted by the eval set, that's 91%. Weighted by the questions people actually ask, the same agent scores about 73%. The eval set over-represents easy aggregations and under-represents date logic and refunds, which are the questions where a wrong answer costs the most. The numbers are invented, but the shape is common.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>The mismatch isn't always a mistake. You may oversample hard questions on purpose, because that's where the agent fails and where you need enough cases to measure anything. That's fine, as long as the headline is adjusted. Classic ML does the same when it trains on a balanced sample and then corrects for the real base rates. So report per slice, reweight the headline by the traffic you expect, and watch the worst slice instead of the mean. The traffic weights only exist if you log production questions, which comes back in step 10.</p>
<!-- /wp:paragraph -->

<!-- wp:quote -->
<blockquote class="wp-block-quote"><p><strong>Inherited from classic ML:</strong> inside the eval set, it's class imbalance, the reason we report per-class metrics. Between the eval set and production, it's a test set that doesn't match the population it's meant to represent. The remedy is old too: weight each slice by its share of real traffic, the same correction survey statisticians call post-stratification.</p></blockquote>
<!-- /wp:quote -->

<!-- wp:heading -->
<h2>Step 8: Tune against the test set</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Now the iteration begins. Date logic scores low, so you add schema hints and few-shot examples to the prompt, and the score climbs. Look closely and half the examples are paraphrases of eval questions. The score now measures how well the prompt memorised the eval set. That's Goodhart's law: when a measure becomes a target, it stops being a good measure.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>The remedy is the old three-way split. An agent has no training run, but the roles still map:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li><strong>Training set:</strong> everything that goes into the agent. Few-shot examples, schema hints, and the questions you debug against by hand. Anything that appears in a prompt lives here.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Validation set:</strong> the questions you score every change against while iterating. You will overfit it a little. That's expected, and it's why it can't also be the number you ship on.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Test set:</strong> held out, refreshed from real traffic, and run rarely: before a release or a model switch. Nobody tunes against its failures. If a test question gets copied into a prompt, it moves to training and gets replaced.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>Without the split, the eval that drives iteration is also the one that decides shipping, and it ends up grading its own homework.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Public benchmarks leak in a way your own test set doesn't. Spider and BIRD have been online for years, so their questions and gold queries may be in the model's training data, and a strong public score can be memory. That's one more reason a held-out set built from your own traffic matters more than a leaderboard.</p>
<!-- /wp:paragraph -->

<!-- wp:quote -->
<blockquote class="wp-block-quote"><p><strong>Inherited from classic ML:</strong> overfitting the validation set, and the reason the test set is touched only at the end. What's new is that the model may have seen the public test set before you did.</p></blockquote>
<!-- /wp:quote -->

<!-- wp:heading -->
<h2>Step 9: Trust the labels</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Gold queries are written by people, and people make mistakes. Northcutt and colleagues <a href="https://huggingface.co/papers/2103.14749">found label errors in the test sets of ten widely used machine learning benchmarks</a>, ImageNet among them, enough, they argued, to destabilize benchmark rankings. Text-to-SQL is no better. A <a href="https://arxiv.org/abs/2601.08778">January 2026 study</a> reported annotation error rates of 52.8% in BIRD's Mini-Dev split and 62.8% in Spider 2.0-Snow, and showed that correcting a subset of BIRD's dev set moved agents' leaderboard positions by up to nine places in either direction.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Some label problems aren't mistakes at all, they're definitions. Whether a refund counts against the month of the order or the month of the refund is a business decision, and the net revenue reference above quietly picks the first. The refund-rate reference makes another choice when it allocates refunds by line revenue. If your gold queries embed definitions like these, the metric is pinned in the wrong place. Ideally the definition lives in a semantic layer that both the agent and the eval read, so "which definition is right" has one owner.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Your 50 hand-written gold queries deserve the same suspicion as a public benchmark. Have a second person verify them, and when a strong agent and the reference disagree, treat it as a bug report on the reference first.</p>
<!-- /wp:paragraph -->

<!-- wp:quote -->
<blockquote class="wp-block-quote"><p><strong>Inherited from classic ML:</strong> noisy labels. You'd audit a labeling vendor before trusting its data. Audit your own gold queries the same way.</p></blockquote>
<!-- /wp:quote -->

<!-- wp:heading -->
<h2>Step 10: Ship it, and let it drift</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Production doesn't look like the eval. Users ask vague follow-ups like "and excluding the promo?", which only make sense with the previous turn. They use words the schema doesn't contain. They paste in column names from a dashboard instead of the database. The eval set was written by someone who knows the schema, one clean single-turn question at a time. This is train-serve skew, and it's one of the most common reasons an eval number doesn't transfer. The remedy is dull and effective: log real questions, sample them, and make them the eval set.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>And even a good eval is a photo of a moving target. Five things drift, and each needs its own defense:</p>
<!-- /wp:paragraph -->

<!-- wp:table {"hasFixedLayout":false} -->
<figure class="wp-block-table"><table><thead><tr><th>What drifts</th><th>Example</th><th>Defense</th></tr></thead><tbody><tr><td>Schema</td><td>A payments table is split out or a column is renamed, and yesterday's few-shot examples reference columns that don't exist</td><td>Diff the schema on every migration and rerun the suite</td></tr><tr><td>Data</td><td>A <code>partially_refunded</code> status or a second currency appears, and correct queries become silently wrong</td><td>Daily canary queries with known answers; track error rate, empty-result rate, result size and cost per query</td></tr><tr><td>Definitions</td><td>"Active customer" goes from 30 days to 90</td><td>Version definitions in the semantic layer and rerun the suite when they change</td></tr><tr><td>Questions</td><td>A new team starts asking things nobody put in the eval set</td><td>Keep sampling production questions into the eval set</td></tr><tr><td>Model</td><td>The provider updates the model, or you swap the judge, and scores move with no change on your side</td><td>Pin model versions where you can, and rerun the suite when they change</td></tr></tbody></table></figure>
<!-- /wp:table -->

<!-- wp:paragraph -->
<p>Classic ML has names for most of these: covariate shift when the inputs change, concept drift when the right answer to the same input changes. Concept drift bites hardest: Google Flu Trends estimated flu activity from search queries, and by early 2013 it was predicting more than double the proportion of doctor visits for influenza-like illness that the CDC reported (<a href="https://www.networkscienceinstitute.org/publications/the-parable-of-google-flu-traps-in-big-data-analysis-2">The Parable of Google Flu</a>). A measure that was validated once is not validated forever.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="/wp-content/uploads/2026/10/sql-eval-drift-loop.svg" alt="Diagram of a feedback loop: production traffic is sampled into traces, failures are read in error analysis, new test cases feed the eval suite, a gate decides deployment, and deployment returns to production traffic. Schema changes, definition changes and model or judge updates feed the eval suite, and canary queries with known answers run against production." /><figcaption class="wp-element-caption">The loop that keeps an eval honest. Production failures become test cases, and changes to the schema, definitions or models re-trigger the suite.</figcaption></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Above all, keep that loop running, so every production failure becomes a test case.</p>
<!-- /wp:paragraph -->

<!-- wp:quote -->
<blockquote class="wp-block-quote"><p><strong>Inherited:</strong> train-serve skew and drift are old. Two things are new. In a multi-turn agent the input includes everything said before, so the eval needs multi-turn cases, not just single questions. And with a hosted model, an update you didn't make can move your scores, and your judge, at the same time. In classic ML you retrained on your own schedule.</p></blockquote>
<!-- /wp:quote -->

<!-- wp:heading -->
<h2>Step 11: Nobody reads the failures</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>The score dips one week. Someone lowers the threshold from 90 to 85 so the pipeline goes green again. Nobody opens the 40 failed traces, which would have shown that 31 of them involve refunds. An eval that doesn't gate anything, or whose gate moves whenever it's inconvenient, is a dashboard.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Error analysis, meaning actually reading the failures and sorting them into categories, is the cheapest and highest-value habit in this whole post. A score tells you something changed. Reading the traces tells you what.</p>
<!-- /wp:paragraph -->

<!-- wp:quote -->
<blockquote class="wp-block-quote"><p><strong>Inherited:</strong> the flaky test that gets rerun until it passes, or skipped. As Will Keleher puts it, <a href="https://will-keleher.com/posts/its-broken-not-flaky/">that test isn't flaky, it's broken</a>. An eval case that fails only some of the time is the same signal, and for an agent it's literally what Step 3 measures: a pass^k below one.</p></blockquote>
<!-- /wp:quote -->

<!-- wp:details -->
<details class="wp-block-details" id="checklist"><summary><h2 style="display:inline"><a href="#checklist">A checklist for a trustworthy eval</a></h2></summary>

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Before you trust the score</h3>
<!-- /wp:heading -->

<!-- wp:list {"className":"checklist"} -->
<ul class="wp-block-list checklist" style="list-style:none;padding-left:0"><!-- wp:list-item -->
<li>☐ Every metric the eval checks has one written definition, with an owner, that both the agent and the eval read. (Step 9)</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>☐ Answers are checked by executing queries on fixtures seeded with known traps, never by matching SQL text. (Steps 1–2)</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>☐ Every question runs at least five times, and must-pass questions pass all of them. (Step 3)</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>☐ Each task has a budget for steps and cost, runs under the production read-only credentials, and fails on any write. (Step 4)</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>☐ The LLM judge has been checked against at least 100 human labels, with answer order randomized for both, and is re-checked whenever the judge model changes. (Step 5)</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>☐ The set contains ambiguous questions on purpose, and a silent guess fails them. (Step 6)</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>☐ Scores are reported per slice, the headline is reweighted by production traffic, and the worst slice is shown next to it. (Step 7)</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>☐ A second person has verified every gold query. (Step 9)</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Before you ship</h3>
<!-- /wp:heading -->

<!-- wp:list {"className":"checklist"} -->
<ul class="wp-block-list checklist" style="list-style:none;padding-left:0"><!-- wp:list-item -->
<li>☐ Prompt examples, the validation set and the test set don't overlap, and the test set hasn't been tuned against. (Step 8)</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>☐ Model and judge versions are pinned, and the suite has been rerun on the exact versions you're shipping. (Step 10)</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>☐ The pass threshold is written down, and lowering it requires a written reason. (Step 11)</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">After you ship</h3>
<!-- /wp:heading -->

<!-- wp:list {"className":"checklist"} -->
<ul class="wp-block-list checklist" style="list-style:none;padding-left:0"><!-- wp:list-item -->
<li>☐ A sample of production questions is added to the eval set every month. (Step 10)</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>☐ Every schema migration triggers a rerun, and canary queries with known answers run daily. (Step 10)</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>☐ Every failed case has a named owner who tags it with a cause within a week, and the tag counts are reviewed with the score. (Step 11)</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>☐ A case that fails only sometimes gets investigated, not rerun until it passes. (Steps 3 and 11)</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->
</details>
<!-- /wp:details -->

<!-- wp:details -->
<details class="wp-block-details" id="all-eleven"><summary><h2 style="display:inline"><a href="#all-eleven">Failure modes, side by side</a></h2></summary>
<!-- wp:table {"hasFixedLayout":false} -->
<figure class="wp-block-table"><table><thead><tr><th>Step</th><th>Failure mode</th><th>Kind</th><th>Classic ancestor, or what's new</th></tr></thead><tbody><tr><td>1</td><td>Matching the reference SQL text</td><td>Inherited</td><td>BLEU and ROUGE</td></tr><tr><td>2</td><td>One thin test database</td><td>Inherited</td><td>Clever Hans</td></tr><tr><td>3</td><td>One run per question</td><td>New</td><td>Outputs are sampled, so measure pass^k</td></tr><tr><td>4</td><td>Grading only the final answer</td><td>New</td><td>Many steps, with costs and side effects</td></tr><tr><td>5</td><td>An uncalibrated LLM judge</td><td>New</td><td>The grader is a model; calibrate it like an annotator</td></tr><tr><td>6</td><td>Not testing ambiguous questions</td><td>Inherited</td><td>Out-of-vocabulary and out-of-distribution inputs; the agent can ask</td></tr><tr><td>7</td><td>One headline number</td><td>Inherited</td><td>Class imbalance; a test set that doesn't match production</td></tr><tr><td>8</td><td>Tuning against the test set</td><td>Inherited</td><td>Train, validation and test leakage; Goodhart's law; public-benchmark contamination</td></tr><tr><td>9</td><td>Trusting the labels</td><td>Inherited</td><td>Noisy labels</td></tr><tr><td>10</td><td>Production skew and drift</td><td>Inherited</td><td>Train-serve skew, covariate shift, concept drift; plus multi-turn cases and model updates</td></tr><tr><td>11</td><td>Nobody reads the failures</td><td>Inherited</td><td>The skipped flaky test</td></tr></tbody></table></figure>
<!-- /wp:table -->
</details>
<!-- /wp:details -->

<!-- wp:heading -->
<h2>Know them, plan for them</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Eight of the eleven failure modes are old, which is reassuring. If you've run ML in production, you already know the defenses, and they still work. The three new ones are where the work is. It's tempting to treat an agent like a classifier that outputs text: one input, one run, one grade on the final answer. Most of the new failure modes live in the gap between that picture and what an agent actually does.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>You don't need all eleven defenses on day one. You do need to know the failure modes, so you recognize a score that looks too good. Plan first for the ones your agent is most exposed to: a finance agent needs trap fixtures and pinned definitions, while an agent that talks to customers may need ambiguity handling and a calibrated judge. Monitor for the rest once you ship, because skew and drift only show up in production. Adjust the numbers to what a wrong answer costs you.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>An eval isn't a score you earn once. It's an instrument, and like any instrument, it's only as good as its last calibration.</p>
<!-- /wp:paragraph -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity" />
<!-- /wp:separator -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Notes</h3>
<!-- /wp:heading -->

<!-- wp:list {"ordered":true} -->
<ol class="wp-block-list"><!-- wp:list-item -->
<li id="fn-1">The text-to-SQL community has measured both problems. <a href="https://arxiv.org/abs/2010.02840">Work on test-suite evaluation</a> found that Spider's official exact set match metric had a false negative rate of about 2.5% on average, and up to 8.1% in the worst case. The same paper proposed distilling a suite of databases as the fix for single-database false positives. <a href="#fnref-1">↩</a></li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Sources</h3>
<!-- /wp:heading -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li><a href="https://arxiv.org/abs/2010.02840">Semantic Evaluation for Text-to-SQL with Distilled Test Suites</a> (Zhong, Yu, Klein, EMNLP 2020): false negatives of exact match, false positives of single-database execution accuracy.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><a href="https://arxiv.org/abs/2305.03111">Can LLM Already Serve as A Database Interface? (BIRD)</a>: execution accuracy and the Valid Efficiency Score.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><a href="https://arxiv.org/abs/2406.12045">τ-bench: A Benchmark for Tool-Agent-User Interaction in Real-World Domains</a> (Yao, Shinn, Razavi, Narasimhan, 2024): pass^k and agent inconsistency across runs.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><a href="https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference/">Defeating Nondeterminism in LLM Inference</a> (Thinking Machines Lab, 2025): why temperature 0 still isn't deterministic.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><a href="https://arxiv.org/abs/2306.05685">Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena</a>: position and verbosity bias, possible self-enhancement bias, and agreement with humans.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><a href="https://huggingface.co/papers/2103.14749">Pervasive Label Errors in Test Sets Destabilize Machine Learning Benchmarks</a> (Northcutt, Athalye, Mueller).</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><a href="https://arxiv.org/abs/2601.08778">Pervasive Annotation Errors Break Text-to-SQL Benchmarks and Leaderboards</a> (Jin, Choi, Zhu, Kang, January 2026).</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><a href="https://www.networkscienceinstitute.org/publications/the-parable-of-google-flu-traps-in-big-data-analysis-2">The Parable of Google Flu: Traps in Big Data Analysis</a> (Lazer, Kennedy, King, Vespignani, Science, 2014).</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->
