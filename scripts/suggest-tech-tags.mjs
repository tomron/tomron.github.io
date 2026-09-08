// Scan python-tagged and aws-tagged posts, detect which Python packages / AWS
// services are actually discussed in the body, and print proposed tag additions.
//   node scripts/suggest-tech-tags.mjs           # dry run: print proposals
//   node scripts/suggest-tech-tags.mjs --apply   # write the additions
//
// Detection is conservative: a term counts only if it appears as a whole word
// (case-insensitive) in the rendered text of the post body, at least once.

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const BLOG = join(dirname(fileURLToPath(import.meta.url)), '../src/content/blog');
const APPLY = process.argv.includes('--apply');

// canonical tag -> regex matching how it shows up in prose
const PY_PACKAGES = {
  pandas: /\bpandas\b/i,
  numpy: /\bnumpy\b/i,
  scipy: /\bscipy\b/i,
  matplotlib: /\bmatplotlib\b/i,
  seaborn: /\bseaborn\b/i,
  plotly: /\bplotly\b|\bplot\.ly\b/i,
  'scikit-learn': /\bscikit-?learn\b|\bsklearn\b/i,
  pytest: /\bpytest\b/i,
  requests: /\brequests\b library|\bimport requests\b|\brequests\s+library/i,
  flask: /\bflask\b/i,
  fastapi: /\bfastapi\b/i,
  django: /\bdjango\b(?!\s+under the hood)/i,
  boto3: /\bboto3\b/i,
  sqlalchemy: /\bsqlalchemy\b/i,
  pydantic: /\bpydantic\b/i,
  click: /\bclick\b library|\bimport click\b/i,
  argparse: /\bargparse\b/i,
  tqdm: /\btqdm\b/i,
  networkx: /\bnetworkx\b/i,
  missingno: /\bmissingno\b/i,
  polars: /\bpolars\b/i,
  streamlit: /\bstreamlit\b/i,
  jupyter: /\bjupyter\b/i,
  altair: /\baltair\b/i,
  spacy: /\bspacy\b/i,
  pyspark: /\bpyspark\b/i,
  langchain: /\blangchain\b/i,
  litellm: /\blitellm\b/i,
  textwrap: /\btextwrap\b/i,
  pathlib: /\bpathlib\b/i,
  setuptools: /\bsetuptools\b/i,
};

const AWS_SERVICES = {
  's3': /\bs3\b|simple storage service/i,
  'aws lambda': /\blambda\b/i,
  'ec2': /\bec2\b|elastic compute cloud/i,
  'dynamodb': /\bdynamo\s?db\b/i,
  'sqs': /\bsqs\b|simple queue service/i,
  'sns': /\bsns\b|simple notification service/i,
  'rds': /\brds\b/i,
  'ecs': /\becs\b/i,
  'eks': /\beks\b|elastic kubernetes/i,
  'fargate': /\bfargate\b/i,
  'cloudfront': /\bcloudfront\b/i,
  'route 53': /\broute\s?53\b/i,
  'cloudwatch': /\bcloudwatch\b/i,
  'iam': /\biam\b/i,
  'api gateway': /\bapi gateway\b/i,
  'kinesis': /\bkinesis\b/i,
  'athena': /\bathena\b/i,
  'glue': /\baws glue\b|\bglue\b (job|catalog|crawler)/i,
  'redshift': /\bredshift\b/i,
  'emr': /\bemr\b|elastic mapreduce/i,
  'sagemaker': /\bsagemaker\b/i,
  'bedrock': /\bbedrock\b/i,
  'cdk': /\baws cdk\b|\bcdk\b/i,
  'cloudformation': /\bcloudformation\b/i,
  'step functions': /\bstep functions\b/i,
  'eventbridge': /\beventbridge\b/i,
  'elasticache': /\belasticache\b/i,
  'secrets manager': /\bsecrets manager\b/i,
  'aws batch': /\baws batch\b/i,
  'snowball': /\bsnowball\b/i,
  'efs': /\befs\b|elastic file system/i,
};

const TAG_LINE = /^(\s*-\s*)"(.*)"\s*$/;

function parse(path) {
  const src = readFileSync(path, 'utf8');
  const lines = src.split('\n');
  let start = -1;
  let end = -1;
  for (let i = 0; i < lines.length; i++) {
    if (start === -1 && /^tags:\s*(\[\s*\])?\s*$/.test(lines[i])) start = i;
    else if (start !== -1 && !TAG_LINE.test(lines[i])) {
      end = i;
      break;
    }
  }
  const tags =
    start === -1 || /^tags:\s*\[\s*\]/.test(lines[start])
      ? []
      : lines.slice(start + 1, end).map((l) => l.match(TAG_LINE)[2]);
  // body = everything after the closing frontmatter ---
  let fmEnd = 0;
  for (let i = 1; i < lines.length; i++)
    if (lines[i] === '---') {
      fmEnd = i;
      break;
    }
  const body = lines.slice(fmEnd + 1).join('\n');
  const text = body.replace(/<[^>]+>/g, ' ');
  return { src, lines, start, end, indent: start !== -1 ? (lines[start + 1]?.match(TAG_LINE)?.[1] ?? '  - ') : '  - ', tags, text };
}

function detect(text, vocab, existing) {
  const hits = [];
  for (const [tag, re] of Object.entries(vocab)) {
    if (re.test(text) && !existing.includes(tag)) hits.push(tag);
  }
  return hits;
}

let changed = 0;
for (const name of readdirSync(BLOG)) {
  if (!name.endsWith('.md')) continue;
  const path = join(BLOG, name);
  const p = parse(path);
  if (p.start === -1) continue;

  const isPy = p.tags.includes('python');
  const isAws = p.tags.includes('aws');
  if (!isPy && !isAws) continue;

  let additions = [];
  if (isPy) additions.push(...detect(p.text, PY_PACKAGES, p.tags));
  if (isAws) additions.push(...detect(p.text, AWS_SERVICES, [...p.tags, ...additions]));
  additions = [...new Set(additions)];
  if (!additions.length) continue;

  console.log(`${name}\n  + ${additions.join(', ')}`);

  if (APPLY) {
    const rebuilt = [
      ...p.lines.slice(0, p.end),
      ...additions.map((t) => `${p.indent}"${t}"`),
      ...p.lines.slice(p.end),
    ].join('\n');
    writeFileSync(path, rebuilt, 'utf8');
    changed++;
  }
}
console.log(APPLY ? `\n${changed} files changed` : '\n(dry run — pass --apply to write)');
