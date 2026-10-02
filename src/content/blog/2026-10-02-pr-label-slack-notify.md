---
title: "PR Labels to Slack, Without a Bot Token"
description: "A webhook-only GitHub Action for PR label notifications, with multi-channel fan-out, author and labeler mentions, and per-destination deduplication."
pubDate: 2026-10-02T09:00:00.000Z
permalink: "/2026/10/02/pr-label-slack-notify/"
tags:
  - "github actions"
  - "slack"
  - "pull request"
  - "open source"
draft: false
---

<!-- wp:paragraph -->
<p>A PR label can carry intent. <code>needs-review</code> asks for a look; <code>release-ready</code> tells another group it can move forward. Getting that signal to the right people shouldn't need a second manual message.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>I built <a href="https://github.com/tomron/pr-label-slack-notify">pr-label-slack-notify</a>, a small GitHub Action that posts to Slack when a configured label is added to a pull request. It uses incoming webhooks (no bot token), supports templates and mentions, and deduplicates with a hidden comment marker. <a href="https://github.com/tomron/pr-label-slack-notify/releases/tag/v1.0.0">v1.0.0</a> is MIT licensed.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Try it with one channel</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Create an incoming webhook in Slack, save its URL as the repository secret <code>SLACK_WEBHOOK</code>, and add this to <code>.github/workflows/notify-pr-label.yml</code> on your default branch:</p>
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
<p>It starts with <code>dry_run: "true"</code>, which logs the rendered payload without calling Slack. Once the message looks right, switch it to <code>"false"</code>. Label names are exact and case-sensitive. Pin <code>@v1.0.0</code> or a full commit SHA for supply-chain safety; <code>@v1</code> follows compatible releases.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>One label, several channels</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>A modern <a href="https://docs.slack.dev/messaging/sending-messages-using-incoming-webhooks/">incoming webhook</a> is tied to one channel, so notifying several channels means several webhooks. Map each label to one URL or a list, and store the JSON as a single secret, <code>SLACK_WEBHOOK_MAP</code>:</p>
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
<p>Then replace <code>slack_webhook</code> in the step above with <code>webhook_map: ${{ secrets.SLACK_WEBHOOK_MAP }}</code>. Map entries win over the optional <code>slack_webhook</code> fallback, duplicate URLs are called once, and all selected destinations are validated before anything is sent.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Author and labeler are different people</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>The template separates the PR author (<code>{author}</code>, <code>{author_mention}</code>) from whoever added the label (<code>{labeler}</code>, <code>{labeler_mention}</code>). <code>mention_map</code> maps GitHub usernames to Slack member IDs; unmapped users stay plain usernames. Event text is escaped, so a PR title can't smuggle in a channel-wide mention.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>When a webhook fails</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>The other destinations still run. Deduplication is per PR, label and webhook, so retrying a partial failure doesn't re-post to channels that already succeeded.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Before posting, the action writes a <code>pending</code> marker, and flips it to <code>sent</code> once Slack replies <code>ok</code>. A definite 4xx rejection removes the marker so a fixed config can retry. A timeout or server error is ambiguous, since Slack may have accepted the message, so the marker stays and the action asks for review instead of posting again. Check the channel, and delete the pending marker only if you need another attempt.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>This is duplicate reduction, not exactly-once delivery. Keep the per-PR, per-label concurrency group, because checking and creating comments isn't atomic. Repository writers can also edit or remove the markers.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Limits</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>The example uses <code>pull_request_target</code> so fork PRs can access secrets, which makes it a privileged workflow. There is deliberately no checkout step; don't add a PR-head checkout or build to that job. Choose the Slack audience carefully for private repositories. Only label-added events are handled, and there is no threading, since incoming webhooks don't return a message timestamp.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>The <a href="https://github.com/tomron/pr-label-slack-notify">README</a> covers all inputs, outputs and recovery steps.</p>
<!-- /wp:paragraph -->
