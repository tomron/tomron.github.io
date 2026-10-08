---
title: "LLMs Are Changing Open Source Too"
description: "AI-assisted contributions are pushing open source projects to label, gate or ban them. A tour of the reactions, the bug bounty closures, the provider support programs, and what 2027 may bring."
pubDate: 2026-10-08T09:00:00.000Z
permalink: "/2026/10/08/open-source-in-the-llm-era/"
tags:
  - "open source"
  - "llm"
  - "ai"
  - "pull request"
heroImage: "/wp-content/uploads/2026/10/opensource_llm_era.png"
heroImageAlt: "Keith Haring-style illustration of figures running toward a laptop with code, carrying laptops with AI logos, under an open source logo, while a reviewer gives a cross and a check and a crowd watches"
draft: false
---

<!-- wp:paragraph -->
<p>In January 2026, tldraw <a href="https://github.com/tldraw/tldraw/issues/7695">announced</a> it would automatically close pull requests from external contributors "until GitHub provides better tools for managing contributions", and curl <a href="https://daniel.haxx.se/blog/2026/01/26/the-end-of-the-curl-bug-bounty/">announced the end of its bug bounty</a>. In June, GitHub <a href="https://github.blog/changelog/2026-06-17-limit-open-pull-requests-for-users-without-write-access/">shipped a setting</a> that caps open PRs from users without write access, and two weeks later Godot <a href="https://godotengine.org/article/contribution-policy-2026/">banned autonomous AI agents and substantial AI-generated code</a>. In September, Apache Airflow <a href="https://github.com/apache/airflow/commit/298756f2">set that cap to five</a>. This month, Google <a href="https://heise.de/en/news/Google-temporarily-suspends-bug-bounty-program-for-open-source-11477829.html">suspended its open source bug bounty</a>.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>These look like separate decisions, but they share a cause: contributions are growing faster than anyone can review them.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>More code, same reviewers</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>The clearest numbers come from GitHub. In an <a href="https://github.blog/news-insights/company-news/an-update-on-github-availability/">April availability update</a>, CTO Vlad Fedorov wrote that GitHub began planning for 10x capacity in October 2025, and by February concluded it needed 30x. He attributes the surge to agentic workflows, with merged pull requests peaking at 90 million and commits at 1.4 billion. In a June <a href="https://www.latent.space/p/github">Latent Space interview</a>, COO Kyle Daigle said of commits and PRs: "we're doing more in a month than we did in a year last year."</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Maintainers see the same shape. According to <a href="https://tldraw.dev/blog/stay-away-from-my-trash">tldraw's founder</a>, Excalidraw received more than twice as many PRs in Q4 2025 as in Q3. Review capacity hasn't kept up. Automated code review exists, but many projects still want a person to review every change. Godot requires every PR to be "reviewed and approved by a human before merging", and Envoy treats its AI review agent as "an aid to the reviewer, not to the PR author". The bottleneck is human attention.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Four patterns in how projects respond</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Reading the policies of about two dozen projects, mostly large and visible ones, I see four patterns.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>1. Allow it, with disclosure and accountability</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>This is the most common approach: use AI if you like, but you must understand, and be able to explain, what you submit. Examples include <a href="https://github.com/kubernetes/community/blob/HEAD/contributors/guide/pull-requests.md#ai-guidance">Kubernetes</a>, <a href="https://github.com/llvm/llvm-project/blob/main/llvm/docs/AIToolPolicy.md">LLVM</a>, <a href="https://github.com/numpy/numpy/blob/main/doc/source/dev/ai_policy.rst">NumPy</a>, <a href="https://github.com/scikit-learn/scikit-learn/blob/main/doc/developers/contributing.rst">scikit-learn</a>, <a href="https://github.com/Homebrew/brew/blob/HEAD/CONTRIBUTING.md">Homebrew</a>, <a href="https://github.com/envoyproxy/envoy/blob/main/CONTRIBUTING.md">Envoy</a>, <a href="https://github.com/containerd/containerd/blob/main/CONTRIBUTING.md">containerd</a> and <a href="https://github.com/apache/arrow/blob/main/docs/source/developers/overview.rst">Arrow</a>. They differ on attribution: the <a href="https://github.com/torvalds/linux/blob/master/Documentation/process/coding-assistants.rst">Linux kernel</a> and <a href="https://github.com/apache/kafka/blob/trunk/CONTRIBUTING.md">Kafka</a> ask for a commit trailer naming the tool, while Kubernetes and Homebrew prohibit such trailers and want disclosure in the PR description.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>2. Gate who can contribute</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>These projects change who can open a PR rather than how it was written, and not only large foundations do it. Besides tldraw, <a href="https://github.com/streamlit/streamlit/blob/develop/CONTRIBUTING.md">Streamlit</a> paused PRs from outside its maintainer team in July, saying AI coding tools had pushed volume beyond what it could review sustainably. It now asks for issues and feature requests instead. <a href="https://github.com/ghostty-org/ghostty/blob/HEAD/CONTRIBUTING.md">Ghostty</a> auto-closes PRs from first-time contributors whom no maintainer has vouched for. <a href="https://godotengine.org/article/contribution-policy-2026/">Godot</a> asks contributors with three or fewer merged PRs to get permission before sending features or large refactors. Airflow's cap of five open PRs for non-committers is a softer version of the same idea.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>3. Don't accept AI-generated contributions</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><a href="https://github.com/servo/book/blob/main/src/policy/ai-usage.md">Servo</a> cites maintainer burden, security, copyright and ethics. <a href="https://wiki.gentoo.org/wiki/Project:Council/AI_policy">Gentoo</a> and <a href="https://www.qemu.org/docs/master/devel/code-provenance.html#use-of-ai-generated-content">QEMU</a> cite copyright and provenance. <a href="https://ziglang.org/code-of-conduct/#strict-no-llm-no-ai-policy">Zig</a>, <a href="https://github.com/redox-os/redox/blob/HEAD/CONTRIBUTING.md">Redox OS</a> and <a href="https://gitlab.gnome.org/GNOME/gimp/-/blob/master/.gitlab/merge_request_templates/default.md?plain=1">GIMP</a> have explicit bans, and <a href="https://www.netbsd.org/developers/commit-guidelines.html">NetBSD</a> treats LLM output as tainted code that needs the core team's written approval. Godot is close to this group, though it still allows menial help such as code completion and regex.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>4. Use AI on the maintainer side</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Some projects limit outsiders' AI use while building it into their own workflows. Envoy allows AI-assisted review, and Airflow maintains AGENTS.md files and PR triage skills for its maintainers. The principle isn't "no AI" but "AI with someone accountable in the loop".</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>None of these policies stands still, and most revisions tighten. Kubernetes moved from AI-assisted PRs being "acceptable" and AI commit messages "discouraged" in November 2025 to "not allowed" in March 2026. Ghostty went from a disclosure rule in August 2025 to a standalone policy, a vouch system and a denouncement list. LLVM's 2024 policy was about copyright, and its January 2026 rewrite is about maintainer time.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>The same pressure in bug bounties</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Bug bounties follow the same mechanics: cheap, plausible output meets limited human review, with a payout attached. curl ended its bounty citing a drop in the share of reports confirmed as vulnerabilities, from north of 15% to below 5%. HackerOne's Internet Bug Bounty <a href="https://www.privacyguides.org/news/2026/04/17/hackerone-pauses-internet-bug-bounty/">paused new submissions</a> from March 27, and <a href="https://www.techzine.eu/news/security/140713/nextcloud-ends-bug-bounty-program-due-to-too-many-low-quality-reports/">Nextcloud ended its bounty</a> on April 22. Google suspended its open source program over automated submissions, "the vast majority of which are not valid", and promised an update in Q1 2027.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>It isn't only noise. AI also finds real bugs, and the Internet Bug Bounty paused because discovery now outpaces maintainers' capacity to fix. Either way, someone has to review.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>The counterweight: providers supporting maintainers</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>The companies building the models are also investing in maintainers:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li><strong>Anthropic, <a href="https://claude.com/contact-sales/claude-for-oss">Claude for Open Source</a>.</strong> Six months of Claude Max 20x for up to 10,000 maintainers and contributors, with eligibility tracks that include popular packages, foundation committers and critical infrastructure.</li>
<li><strong>OpenAI, <a href="https://openai.com/form/codex-for-oss/">Codex for Open Source</a>.</strong> Six months of ChatGPT Pro with Codex, API credits and selective access to Codex Security for core maintainers, building on a $1 million Codex Open Source Fund.</li>
<li><strong>GitHub.</strong> Free Copilot Pro for maintainers of popular repositories, and, with CNCF, <a href="https://contribute.cncf.io/blog/2025/12/16/github-copilot-enterprise-for-maintainers/">Copilot Enterprise for CNCF maintainers</a>.</li>
<li><strong>Funding.</strong> In March, Anthropic, AWS, GitHub, Google, Google DeepMind, Microsoft and OpenAI jointly gave <a href="https://openssf.org/blog/2026/03/17/leading-tech-coalition-invests-12-5-million-through-openssf-and-alpha-omega-to-strengthen-open-source-security/">$12.5 million</a> to Alpha-Omega and OpenSSF, partly to help maintainers handle AI-generated security reports.</li>
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>So projects limit AI-generated contributions while providers hand maintainers the same tools. The two fit together, since the programs mostly target triage, review and security work. Still, credits don't buy review attention, and that is the scarce resource.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>What I expect in 2027</h2>
<!-- /wp:heading -->

<!-- wp:list -->
<ul>
<li><strong>Gating moves into the platform.</strong> Projects build it themselves today with vouch lists and spam bots, and GitHub's PR cap is a first platform-level step. I expect trust signals such as account history and bypass lists to become standard settings.</li>
<li><strong>Policies converge on a short core.</strong> Disclosure plus "you must be able to explain it" is already close to universal. Attribution is the loose end, and the kernel's switch from naming the model to a generic <code>Assisted-by: LLM</code> hints at where it settles. I don't expect an MIT-style standard, because projects make different governance choices: some ban, some gate, some allow. More likely are reusable templates, closer to the Contributor Covenant or the DCO, with a few presets that foundations publish and projects pick from.</li>
<li><strong>More AI on the maintainer side.</strong> With review load still growing, triage and first-pass review agents are the obvious response. The open question is accountability: who answers for an agent's approval or rejection?</li>
<li><strong>Open source bounties return in a different form.</strong> Google's Q1 2027 update is the first test. I expect returning programs to pay for reproducible, patch-ready findings, and funders to shift money from discovery to remediation.</li>
<li><strong>Contributions shift away from raw code.</strong> If code is cheap, the scarce things are context, reproducers and judgment. Expect more projects to prefer issues, design discussion and verified bug reports over patches, and to accept code mainly from people with a track record.</li>
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>Much of the work around code is moving to LLMs: writing, triage, first-pass review, even security fixes. What open source depends on is still human. Someone has to decide what belongs in the project, take responsibility for what ships, and extend trust to the next contributor. LLMs made producing a contribution cheap without making that judgment any cheaper, so human attention stays the bottleneck.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>That doesn't end open source as a model. Companies still have good reasons to build in the open: adoption, shared standards, and users who find bugs and shape the roadmap. tldraw and Streamlit still do, while changing who can send them code. The likely result isn't less open source but a different shape: open to read, use and report on, and more selective about who writes the code that ships.</p>
<!-- /wp:paragraph -->
