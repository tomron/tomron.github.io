---
title: "How an LLM Eval Lies: Seven Failure Modes, Told Through a SQL Agent"
description: "A SQL agent scores 91% on its eval and still gets finance questions wrong. Seven ways an eval quietly stops measuring what you care about, and what classic machine learning already taught us about each."
pubDate: 2026-10-30T09:00:00.000Z
permalink: "/2026/10/30/llm-eval-failure-modes-sql-agent/"
tags:
  - "llm"
  - "ai"
  - "evals"
  - "testing"
  - "sql"
  - "machine learning"
draft: true
---

<!-- wp:paragraph -->
<p>An eval score is a measuring instrument, and most of the ways it fails are quiet. The metric doesn't crash. The number stays healthy, and the thing it was supposed to measure walks off without telling anyone. This post goes through seven such failures, in the order you tend to meet them, using one running example: a SQL agent.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>The agent answers business questions about an e-commerce database. The question we'll keep returning to is the simplest one finance can ask: what was our net revenue last month? We'll build the agent's eval in seven steps. Each step fixes the problem the previous one had, and each introduces a new way to be fooled.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>One caveat up front: this is a constructed example. The scores are invented to make the mechanics visible. The failure modes are real, and most of them are old, so wherever one has a classic machine learning ancestor I'll point at it.</p>
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
<p>It ignores status, discounts, refunds and timezone, and it returns a clean, plausible number. On a tiny fixture with three September orders, one of them cancelled and one with a partial refund, the reference returns 210.00 and the agent's query returns 320.00. Nothing errors. A dashboard built on it would look fine for months.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>One wrinkle belongs to the eval and not the agent. Whether a refund counts against the month of the order or the month of the refund is a business decision, and the reference above quietly picks the first. If your gold queries embed definitions like that, the metric is pinned in the wrong place. Ideally the definition lives in a semantic layer that both the agent and the eval read, so "which definition is right" has one owner.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Step 1: Compare the SQL to a reference query</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Start simple. Write 50 questions with reference SQL and check whether the agent's query matches. Say the score is 38%, and the agent turns out to be mostly fine. It wrote a subquery where the reference used a CTE, or named a column differently, and a string comparison can't tell that apart from a wrong answer.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>This is measuring a proxy. Many different queries are valid for one question, so surface similarity punishes style and says nothing about correctness. The text-to-SQL community has measured this: work on <a href="https://arxiv.org/abs/2010.02840">test-suite evaluation</a> found that Spider's official exact set match metric had a false negative rate of about 2.5% on average, and up to 8.1% in the worst case.</p>
<!-- /wp:paragraph -->

<!-- wp:quote -->
<blockquote class="wp-block-quote"><p><strong>You've seen this before:</strong> judging machine translation with BLEU, or summaries with ROUGE. Same disease. You reward overlap with one reference when many outputs are right.</p></blockquote>
<!-- /wp:quote -->

<!-- wp:heading -->
<h2>Style versus inefficiency</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>The obvious fix is to run the queries and compare results, which is step 2. First there's a fair objection: among the correct queries, some are much slower than others. How do you tell style from inefficiency?</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Style changes the text. Inefficiency changes the cost. You can't separate them by reading the SQL, so you measure. Run the agent's query and the reference on a scaled copy of the data and compare the query plan, the rows or bytes scanned, and the runtime. If the plans match, the difference is style. A CTE and a subquery usually compile to the same plan, since Postgres 12 inlines a CTE that is referenced once. If the cost differs by a large factor, it's inefficiency, even though the results are identical.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Scale matters here. On 200 fixture rows a correlated subquery and a join both finish in a couple of milliseconds. At 80 million order_items rows one of them can take tens of seconds and the other about one. So a thin dataset hides inefficiency as well as logic errors. I'd treat correctness as a gate and efficiency as a separate budget, and never fold slowness into one blended score.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="/wp-content/uploads/2026/10/sql-eval-gate.svg" alt="Flowchart: agent SQL runs on a seeded fixture; if the result does not match the reference it fails as incorrect; if it matches it runs on a scaled copy and its cost is compared to the reference, passing as style within 2x, passing with a warning between 2x and 10x, and failing the efficiency budget above 10x or on a banned pattern" /><figcaption class="wp-element-caption">Correctness is a gate. Efficiency is a separate budget, measured against the reference on a scaled copy. The thresholds are illustrative.</figcaption></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Three details make this workable. Compare against a ratio to the reference instead of an absolute number, so the eval survives hardware changes. Let the agent beat the reference, because the reference can be inefficient too. And keep a short list of banned patterns that are wrong whatever the plan says: a function wrapped around an indexed column in a WHERE clause, an accidental cross join, SELECT * on a columnar engine billed by bytes scanned, like Athena.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>BIRD, a large text-to-SQL benchmark, does something similar with its <a href="https://arxiv.org/abs/2305.03111">Valid Efficiency Score</a>. A query that returns wrong results scores zero, and a correct one is scored on the square root of the reference's runtime divided by its own, so faster than the reference scores above 1.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Step 2: Run both queries and compare the results</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>This is execution accuracy, and the score jumps to 84%. Everyone relaxes. But the test database has 200 rows, no refunds in the test month and no cancelled orders, so the agent's query that ignores both returns exactly the right number. It passes for the wrong reason.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Exact match gave false negatives. Execution accuracy on a thin database gives false positives, and those are more dangerous because they look like progress. The same research that measured the false negatives proposed the fix. Instead of one database, distill a suite of databases that, between them, separate the reference from plausible wrong answers. For us that means a fixture seeded with traps on purpose: cancelled orders, partial refunds, multi-item orders, an order placed at 23:30 New York time on the last day of the month, a discount that zeroes out a line.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Here is a second question a thin fixture misses: refund rate by product category. The agent's version looks reasonable.</p>
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
<p>Refunds attach to the order, so this join repeats the order's refund on every line item. If every fixture order has one item, nothing is off. With multi-item orders, the same refund is counted once per line and charged to every category in the order. On the three-order fixture from earlier, this query reports about 31% for books and 50% for toys. The right figures are about 16% and 25%. The reference aggregates refunds first and then allocates them to items in proportion to line revenue (which is itself a definition worth pinning):</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code language-sql"><code class="language-sql">WITH items AS (
  SELECT oi.order_id, p.category,
         oi.quantity * oi.unit_price_cents - oi.discount_cents AS line_cents
  FROM order_items oi
  JOIN products p ON p.id = oi.product_id
),
order_totals AS (
  SELECT order_id, SUM(line_cents) AS order_cents
  FROM items
  GROUP BY order_id
),
refunded AS (
  SELECT order_id, SUM(amount_cents) AS refund_cents
  FROM refunds
  GROUP BY order_id
)
SELECT i.category,
       SUM(COALESCE(r.refund_cents, 0) * i.line_cents::numeric / NULLIF(t.order_cents, 0))
         / SUM(i.line_cents) AS refund_rate
FROM items i
JOIN orders o       ON o.id = i.order_id
                   AND o.status IN ('paid', 'shipped', 'delivered')
JOIN order_totals t ON t.order_id = i.order_id
LEFT JOIN refunded r ON r.order_id = i.order_id
GROUP BY i.category;</code></pre>
<!-- /wp:code -->

<!-- wp:quote -->
<blockquote class="wp-block-quote"><p><strong>You've seen this before:</strong> the accuracy paradox. A fraud model that always predicts "not fraud" scores 99% on imbalanced data. A metric computed on data that never exercises the hard cases tells you nothing about the hard cases.</p></blockquote>
<!-- /wp:quote -->

<!-- wp:heading -->
<h2>Step 3: Add an LLM judge for questions with no reference</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Real questions don't all come with a gold query. "Which customers are at risk of churning?" has no single right answer, so you add an LLM judge. Now the judge is the problem. Judges tend to like long, polished, heavily commented queries and rate the terse correct one as merely fine. They tend to prefer answers in their own style, and to prefer whichever answer comes first. The <a href="https://arxiv.org/abs/2306.05685">MT-Bench paper</a> that popularised LLM-as-a-judge documented position, verbosity and self-enhancement bias, and found that even GPT-4 gave the same verdict after the answers were swapped only about 65% of the time.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>None of this makes judges useless. The same paper found GPT-4's agreement with human preferences above 80%, roughly the level at which humans agree with each other. It means a judge is an instrument that needs calibrating. Swap the order and require both verdicts to agree. Give it a rubric. Have it grade the result set and the query plan instead of the prose of the SQL. Measure its agreement with human labels on a sample of a hundred or so, and measure again when you change the judge model.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>There's also a failure no judge catches unless you ask for it. "How many active customers did we have last quarter?" uses a term that appears nowhere in the schema. The agent picks "ordered at least once". Finance means "ordered in the last 90 days and not fully refunded". No amount of SQL skill fixes that. What you can evaluate is behavior: does the agent ask, or at least state its assumption in the answer? Comparing against a gold query can't measure that.</p>
<!-- /wp:paragraph -->

<!-- wp:quote -->
<blockquote class="wp-block-quote"><p><strong>You've seen this before:</strong> inter-annotator agreement. You wouldn't trust a labeler you hadn't measured. Don't trust a judge you haven't either.</p></blockquote>
<!-- /wp:quote -->

<!-- wp:heading -->
<h2>Step 4: Report one number</h2>
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
<p>The fix isn't a better average. Report per slice, weight the headline by the traffic you expect, and watch the worst slice instead of the mean. Note that the last column only exists if you log production questions, which comes back in step 6.</p>
<!-- /wp:paragraph -->

<!-- wp:quote -->
<blockquote class="wp-block-quote"><p><strong>You've seen this before:</strong> Simpson's paradox, and the reason we look at per-class metrics. Overall accuracy goes up while the minority class collapses.</p></blockquote>
<!-- /wp:quote -->

<!-- wp:heading -->
<h2>Step 5: Tune against the eval, and trust the labels</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Now the iteration begins. Date logic scores low, so you add schema hints and few-shot examples to the prompt, and the score climbs. Look closely at the examples and half of them are paraphrases of test questions. The score now measures how well the prompt memorised the test set. This is a validation set being overfit, the same dynamic behind Kaggle's public-to-private leaderboard shake-ups, and Goodhart's law in general: when a measure becomes a target, it stops being a good measure. The remedy is the old one. Keep a held-out split that nobody tunes against, refresh it from real traffic, and remove any question you copy into a prompt from the test set.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>There's a second half to this: the labels. Gold queries are written by people, and people make mistakes. Northcutt and colleagues <a href="https://huggingface.co/papers/2103.14749">found label errors in the test sets of ten widely used machine learning benchmarks</a>, ImageNet among them, enough, they argued, to destabilize benchmark rankings. Text-to-SQL is no better. A <a href="https://arxiv.org/abs/2601.08778">January 2026 study</a> reported annotation error rates of 52.8% in BIRD's Mini-Dev split and 62.8% in Spider 2.0-Snow, and showed that correcting a subset of BIRD's dev set moved agents' leaderboard positions by up to nine places in either direction.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Your 50 hand-written gold queries deserve the same suspicion. Have a second person verify them, and when a strong agent and the reference disagree, treat it as a bug report on the reference first.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Step 6: Ship it</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Production doesn't look like the eval. Users ask vague follow-ups like "and excluding the promo?", which only make sense with the previous turn. They use words the schema doesn't contain. They paste in column names from a dashboard instead of the database. The eval set was written by someone who knows the schema, one clean single-turn question at a time.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>This is train-serve skew, and it's one of the most common reasons an eval number doesn't transfer. The remedy is dull and effective: log real questions, sample them, and make them the eval set.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Drift: the eval is a snapshot, production keeps moving</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Even a good eval is a photo of a moving target. Five things drift at once, and they need different defenses. The schema changes: a payments table is split out or a column is renamed, and yesterday's few-shot examples now reference columns that don't exist. The data changes: a partially_refunded status appears, or a second currency, and queries that were right become silently wrong. Definitions change: "active customer" goes from 30 days to 90. The questions change: a new team starts asking things nobody put in the eval set. And the model changes: the provider updates the underlying model, or you swap the judge, and scores move with no change on your side.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Classic ML has names for the middle three: covariate shift, label shift and concept drift, the last being the one that bites hardest, because the right answer to the same input changes. Google Flu Trends is the cautionary tale. It estimated flu activity from search queries, and by early 2013 it was predicting more than double the proportion of influenza-like-illness doctor visits that the CDC reported, as laid out in <a href="https://www.networkscienceinstitute.org/publications/the-parable-of-google-flu-traps-in-big-data-analysis-2">The Parable of Google Flu</a>. A measure that was validated once is not validated forever.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="/wp-content/uploads/2026/10/sql-eval-drift-loop.svg" alt="Diagram of a feedback loop: production traffic is sampled into traces, failures are read in error analysis, new test cases feed the eval suite, a gate decides deployment, and deployment returns to production traffic. Schema changes, definition changes and model or judge updates feed the eval suite, and canary queries with known answers run against production." /><figcaption class="wp-element-caption">The loop that keeps an eval honest. Production failures become test cases, and changes to the schema, definitions or models re-trigger the suite.</figcaption></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>The defenses are mostly plumbing. Diff the schema on every migration and rerun the suite. Run canary queries with known answers against production every day. Track cheap drift signals: execution error rate, empty-result rate, result-size distribution and cost per query. Above all, keep the loop in the diagram running, so every production failure becomes a test case.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Step 7: Nobody reads the failures</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>The score dips one week. Someone lowers the threshold from 90 to 85 so the pipeline goes green again. Nobody opens the 40 failed traces, which would have shown that 31 of them involve refunds. An eval that doesn't gate anything, or whose gate moves whenever it's inconvenient, is a dashboard.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Error analysis, meaning actually reading the failures and sorting them into categories, is the cheapest and highest-value habit in this whole post. A score tells you something changed. Reading the traces tells you what.</p>
<!-- /wp:paragraph -->

<!-- wp:quote -->
<blockquote class="wp-block-quote"><p><strong>You've seen this before:</strong> the flaky test that gets marked as skipped. It stops failing, and it stops telling you anything.</p></blockquote>
<!-- /wp:quote -->

<!-- wp:heading -->
<h2>What a trustworthy version looks like</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Put it together and the eval looks different. The reference is a metric definition, not a string. The fixture is seeded with the traps, in more than one database, with a scaled copy for cost. Correctness is a gate and efficiency is a separate budget. The judge is calibrated against human labels and used only where no execution check exists. Results are reported by slice and weighted by real traffic, with the worst slice in the headline. The test set is refreshed from production, with a held-out part nobody tunes against, and its labels get verified. Canaries and schema diffs watch for drift. And someone reads the failures every week.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>I don't have good answers for everything here, so I'll end on the open parts. Who owns the definition of "net revenue" when the agent, the eval and the finance team each hold a copy? How large does a trap-seeded fixture need to be before more rows stop finding new bugs? And at what point does maintaining the eval cost more than the agent it guards? If you've handled any of these, I'd like to hear how.</p>
<!-- /wp:paragraph -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity" />
<!-- /wp:separator -->

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
<li><a href="https://arxiv.org/abs/2306.05685">Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena</a>: position, verbosity and self-enhancement bias, and agreement with humans.</li>
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
