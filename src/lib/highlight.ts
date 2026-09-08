import { createHighlighter, type Highlighter } from 'shiki';

/**
 * Posts are WordPress HTML kept verbatim, so code lives in bare
 * `<pre class="wp-block-code">`, `<pre class="wp-block-syntaxhighlighter-code">`,
 * or `<pre>` blocks with no language hint and no Shiki markup. We highlight them
 * at build time: pull out the text, guess the language, and swap in Shiki's
 * themed output. Everything else in the body is passed through untouched.
 */

let hlPromise: Promise<Highlighter> | null = null;

const LANGS = [
  'python',
  'bash',
  'json',
  'javascript',
  'typescript',
  'sql',
  'yaml',
  'java',
  'scala',
  'r',
  'html',
  'css',
  'diff',
];

function getHighlighter() {
  if (!hlPromise) {
    hlPromise = createHighlighter({
      themes: ['github-light', 'github-dark'],
      langs: LANGS,
    });
  }
  return hlPromise;
}

const decodeEntities = (s: string) =>
  s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0*39;|&apos;|&#x0*27;/gi, "'")
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/g, '&');

/** Very rough language guess for an un-annotated snippet. */
function guessLang(code: string): string {
  const c = code.trim();
  if (/^\s*[\{\[]/.test(c) && /[\}\]]\s*$/.test(c) && /"[^"]*"\s*:/.test(c))
    return 'json';
  if (
    /\b(SELECT|INSERT|UPDATE|DELETE|CREATE TABLE)\b/i.test(c) &&
    /\bFROM\b|\bWHERE\b|;/i.test(c)
  )
    return 'sql';
  if (/^(\$ |sudo |apt |pip |npm |cd |ls |git |curl |wget |export )/m.test(c))
    return 'bash';
  if (
    /\b(def |import |print\(|self\.|lambda |elif )\b/.test(c) ||
    /\bpd\.|np\./.test(c)
  )
    return 'python';
  if (/\b(const |let |=>|function |console\.log|require\()\b/.test(c))
    return 'javascript';
  if (/\b(public |private |static |void |System\.out)\b/.test(c)) return 'java';
  if (/<[a-z][\s\S]*>/i.test(c)) return 'html';
  return 'python';
}

const PRE_RE = /<pre\b([^>]*)>([\s\S]*?)<\/pre>/gi;

/** Replace every `<pre>…</pre>` in `html` with a Shiki-highlighted block. */
export async function highlightCodeBlocks(html: string): Promise<string> {
  if (!html || html.indexOf('<pre') === -1) return html;
  const hl = await getHighlighter();

  return html.replace(PRE_RE, (_full, attrs: string, inner: string) => {
    // Unwrap an inner <code> if present.
    const codeMatch = inner.match(/^\s*<code\b[^>]*>([\s\S]*?)<\/code>\s*$/i);
    const raw = codeMatch ? codeMatch[1] : inner;
    const text = decodeEntities(
      raw.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, ''),
    );

    const declared = /\blang(?:uage)?-([a-z0-9]+)/i.exec(attrs)?.[1];
    const lang =
      declared && LANGS.includes(declared) ? declared : guessLang(text);

    try {
      return hl.codeToHtml(text.replace(/\n+$/, ''), {
        lang,
        themes: { light: 'github-light', dark: 'github-dark' },
        defaultColor: false,
      });
    } catch {
      return `<pre${attrs}>${raw}</pre>`;
    }
  });
}
