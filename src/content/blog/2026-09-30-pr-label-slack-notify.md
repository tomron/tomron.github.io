---
title: "PR Labels to Slack, Without a Bot Token"
description: "A webhook-only GitHub Action for PR label notifications, with multi-channel fan-out, author and labeler mentions, and per-destination deduplication."
pubDate: 2026-09-30T10:40:00.000Z
permalink: "/2026/09/30/pr-label-slack-notify/"
tags:
  - "github actions"
  - "slack"
  - "pull request"
  - "open source"
draft: true
---

<!-- wp:paragraph -->
<p>A PR label can mean more than a category. <code>needs-review</code> asks someone to look at a change. <code>release-ready</code> tells a different group that it can move forward. The label already captures the intent; getting that signal to the right people should not need a second manual message.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>I built <a href="https://github.com/tomron/pr-label-slack-notify">pr-label-slack-notify</a>, a small GitHub Action that sends a Slack message when a configured label is added to a pull request. It uses incoming webhooks, supports templates and mentions, and keeps a hidden comment marker to avoid posting the same notification again. <a href="https://github.com/tomron/pr-label-slack-notify/releases/tag/v1.0.0">v1.0.0</a> is available under the MIT license.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>One webhook, one channel. One label, several webhooks.</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>The first useful constraint came from Slack: a modern <a href="https://docs.slack.dev/messaging/sending-messages-using-incoming-webhooks/">incoming webhook</a> is tied to one channel. You cannot change the destination by adding a <code>channel</code> field to its payload. Sending one notification to several channels therefore means creating several webhooks and calling each one.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>The action supports that directly. A label can map to a single webhook URL or a list of URLs. For example, <code>release-ready</code> can notify both release and engineering channels, while <code>needs-review</code> goes only to reviewers. This is several channel-specific webhooks, not one webhook overriding its channel. No Slack bot token is needed.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Try it with one channel</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Create an incoming webhook in Slack, select its destination channel, and save its URL as the GitHub repository secret <code>SLACK_WEBHOOK</code>. Then add this workflow to <code>.github/workflows/notify-pr-label.yml</code> on your default branch:</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code language-yaml"><code class="language-yaml">name: Notify Slack on PR label
on:
  pull_request_target:
    types: [labeled]
permissions:
  contents: read
  pull-requests: write
concurrency:
  group: &gt;-
    slack-label-${{ github.repository }}-
    ${{ github.event.pull_request.number }}-
    ${{ github.event.label.name }}
  cancel-in-progress: false
jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      # Do not check out or execute PR code in this privileged job.
      - uses: tomron/pr-label-slack-notify@v1
        with:
          slack_webhook: ${{ secrets.SLACK_WEBHOOK }}
          labels: &#x27;[&quot;release-ready&quot;, &quot;needs-review&quot;]&#x27;
          dedup: &quot;true&quot;
          dry_run: &quot;true&quot;
          message_template: &gt;-
            {author_mention}&#x27;s PR &lt;{url}|#{pr}: {title}&gt;
            was labeled *{label}* by {labeler_mention}.
          mention_map: &#x27;{&quot;octocat&quot;:&quot;U0123456789&quot;}&#x27;</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>It starts with <code>dry_run: "true"</code>: the rendered payload appears in the workflow log, but the action makes no Slack calls and does not read or write PR comments. Once the message looks right, change it to <code>"false"</code>. Label names are exact and case-sensitive. Use <code>@v1.0.0</code> for this release or a reviewed full commit SHA for a supply-chain pin; <code>@v1</code> follows compatible releases.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Send the same label to several channels</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Create one webhook for each destination channel. Save this JSON shape as a single repository secret named <code>SLACK_WEBHOOK_MAP</code>, replacing the placeholders with real URLs. Do not commit those URLs to your repository:</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code language-json"><code class="language-json">{
  &quot;release-ready&quot;: [
    &quot;&lt;incoming webhook URL for release channel&gt;&quot;,
    &quot;&lt;incoming webhook URL for engineering channel&gt;&quot;
  ],
  &quot;needs-review&quot;: &quot;&lt;incoming webhook URL for review channel&gt;&quot;
}</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>Keep the event, permissions and concurrency above, and replace its action step with:</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code language-yaml"><code class="language-yaml">- uses: tomron/pr-label-slack-notify@v1
  with:
    labels: &#x27;[&quot;release-ready&quot;, &quot;needs-review&quot;]&#x27;
    webhook_map: ${{ secrets.SLACK_WEBHOOK_MAP }}
    dedup: &quot;true&quot;
    dry_run: &quot;true&quot;
    message_template: &gt;-
      {author_mention}&#x27;s PR &lt;{url}|#{pr}: {title}&gt;
      was labeled *{label}* by {labeler_mention}.
    mention_map: &#x27;{&quot;octocat&quot;:&quot;U0123456789&quot;}&#x27;</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>A map entry wins over the optional <code>slack_webhook</code> fallback. Duplicate URLs in a list are called only once, empty lists are rejected, and every selected destination is validated before anything is sent. This example also starts in dry-run mode.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>The author and the labeler are different people</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>The person who opens a PR is not necessarily the person who decides it is ready. The template keeps those roles separate: <code>{author}</code> or <code>{pr_author}</code> is the PR author, while <code>{labeler}</code> is the person who added the label. The corresponding mention fields are <code>{author_mention}</code> and <code>{labeler_mention}</code>.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><code>mention_map</code> maps each GitHub username to a Slack member ID, not a display name. A mapped person gets a Slack mention; an unmapped person stays a GitHub username. The other fields include the PR number, title, URL, label and repository. Event text is escaped for Slack controls, so a PR title cannot smuggle in a channel-wide mention.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>What happens if one webhook fails?</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>The other destinations still run. Deduplication is per PR, label and webhook, so a successful channel is not posted to again when you retry a partially failed run with <code>dedup: "true"</code>. Adding a new destination later does not resend to the old ones.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Before posting, the action creates a <code>pending</code> hidden-comment marker. When Slack confirms <code>ok</code>, it changes that marker to <code>sent</code>. A definite HTTP 4xx rejection removes the pending marker, allowing a corrected configuration to be retried. A timeout, lost response or server error is different: Slack may already have accepted the message. The action retains the pending marker and asks for review instead of blindly posting again.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>A retry alone does not clear an uncertain delivery. Check the destination channel first, then remove the relevant pending marker only if another attempt is needed. No automatic webhook retry is performed. If any destination fails, the action fails with a count summary; it still records successful deliveries separately. With dedup disabled, rerunning a partial failure posts to every destination again.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>This is duplicate reduction, not exactly-once delivery. Keep the per-PR, per-label concurrency group in the example because checking and creating GitHub comments is not atomic. The comment body is hidden HTML, but GitHub still records comment activity. Repository writers can also edit or remove those markers.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>A small action with explicit limits</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>The example uses <code>pull_request_target</code> so fork PRs can use the base repository's secrets and comment permissions. That also makes it a privileged workflow. There is deliberately no checkout step, and the action does not execute PR code. Do not add a PR-head checkout or build to that job. Choose the Slack audience deliberately, especially when sharing titles and links from a private repository.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Only label-added events are handled. There is no automatic threading: incoming webhooks can reply to a known message timestamp, but do not return that timestamp when they post. That would need another integration, and this version stays webhook-only.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>The project has 83 mocked tests and <a href="https://github.com/tomron/pr-label-slack-notify/actions/runs/36703588702">passing CI</a> for formatting, lint, TypeScript, the bundled action and dependency auditing. The bundle has also been exercised with a dry-run fixture. A live Slack delivery test is still outstanding; those checks validate the implementation, not delivery into a real workspace.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>The <a href="https://github.com/tomron/pr-label-slack-notify">README</a> covers all inputs, outputs and recovery steps. The useful part is small: a label expresses the intent, a secret map picks the audience, and each destination keeps its own delivery state.</p>
<!-- /wp:paragraph -->
