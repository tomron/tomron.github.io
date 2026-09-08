---
title: "Kill Skill"
pubDate: 2026-03-18T10:20:53.000Z
permalink: "/2026/03/18/kill-skill/"
heroImage: "/wp-content/uploads/2026/02/gemini_generated_image_b4a3knb4a3knb4a3.png"
tags:
  - "coding agents"
  - "security"
  - "skills"
draft: false
---
<!-- wp:paragraph -->
<p>Three recent incidents that should make all of us pause:</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>→ A hallucinated npx command spread through a single LLM-generated skill file to 237 repositories. Real agents executed it. A researcher claimed the package name before an attacker could.<br><br>→ 230+ malicious skills uploaded to OpenClaw's ClawHub in days. The #1-ranked skill was silently exfiltrating data and injecting prompts to bypass safety guidelines. Thousands of downloads before anyone noticed.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>→ An audit of 2,890+ OpenClaw skills found 41.7% contain serious security vulnerabilities.&nbsp;</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>This isn't a niche problem. If you use Claude Code, Cursor, Copilot, or any modern coding agent, you're likely installing multiple skills a week. They are recommended by colleagues, appear in blog posts, and are bundled into project templates. The install command is one line. The trust is implicit.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Skills blur the line between configuration and code, but we treat them like documentation. A SKILL.md file can contain natural-language instructions, executable scripts, and package dependencies. There's no clear boundary where "docs" ends and "code" begins. No lockfile. No integrity checks. No verified publisher identity. The skills CLI has a package-lock.json for its own dependencies - just not for the skills you install.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>So what should we do today? At a minimum, read the skill files before installing. It takes 2 minutes and is the equivalent of reviewing a PR. Beyond that, copy and commit your skills folder to git - your repo becomes your lockfile. Treat any skill update like a dependency upgrade: review the diff before merging, also for testing and quality purposes.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>The tools are coming - Longer term, this ecosystem needs what npm took 6 years to build: lockfiles, signed packages, verified publishers, and scanners that flag malicious instructions before they reach your agent. Cisco developed an open-source skill file scanner.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Links -</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Snyk Finds Prompt Injection in 36%, 1467 Malicious Payloads in a ToxicSkills Study of Agent Skills Supply Chain Compromise - <a href="https://snyk.io/blog/toxicskills-malicious-ai-agent-skills-clawhub/">https://snyk.io/blog/toxicskills-malicious-ai-agent-skills-clawhub/</a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Update #40: Agent Skill Security Issues - <a href="https://maxcorbridge.substack.com/p/update-40-agent-skill-security-issues">https://maxcorbridge.substack.com/p/update-40-agent-skill-security-issues</a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Agent Skills Are Spreading Hallucinated npx Commands - <a href="https://www.aikido.dev/blog/agent-skills-spreading-hallucinated-npx-commands">https://www.aikido.dev/blog/agent-skills-spreading-hallucinated-npx-commands</a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Over 41% of Popular OpenClaw Skills Found to Contain Security Vulnerabilities - <a href="https://www.esecurityplanet.com/threats/over-41-of-popular-openclaw-skills-found-to-contain-se">https://www.esecurityplanet.com/threats/over-41-of-popular-openclaw-skills-found-to-contain-se</a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Skill Scanner - <a href="https://github.com/cisco-ai-defense/skill-scanner">https://github.com/cisco-ai-defense/skill-scanner</a></p>
<!-- /wp:paragraph -->
