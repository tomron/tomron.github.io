import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

const isProd = import.meta.env.PROD;

/** All posts that should be visible on the live site, newest first. */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection(
    'blog',
    ({ data }) => !isProd || !data.draft,
  );
  return posts.sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime(),
  );
}

/** Turn "/2014/05/12/some-slug/" into route params for [...slug].astro */
export function permalinkToParams(permalink: string) {
  return { slug: permalink.replace(/^\/+|\/+$/g, '') };
}

/**
 * URL-safe slug for a tag. WordPress tags carry spaces, mixed case, and stray
 * HTML entities (e.g. "women&#039;s health"); collapse all of that to a stable
 * lowercase slug used at /tags/<slug>/.
 */
export function tagSlug(tag: string): string {
  return tag
    .replace(/&#0*39;|&apos;|&#x0*27;/gi, '')
    .replace(/&amp;/gi, 'and')
    .toLowerCase()
    .trim()
    .replace(/['’]/g, '') // drop apostrophes rather than turn them into hyphens
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Every tag on published posts -> its posts (newest first) and display label. */
export async function getTagMap(): Promise<
  Map<string, { label: string; posts: Post[] }>
> {
  const posts = await getPublishedPosts();
  const map = new Map<string, { label: string; posts: Post[] }>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      const slug = tagSlug(tag);
      if (!slug) continue;
      if (!map.has(slug)) map.set(slug, { label: tag, posts: [] });
      map.get(slug)!.posts.push(post);
    }
  }
  return map;
}

/** WordPress tag labels can carry HTML entities like &#039; — decode for display. */
export function decodeLabel(s: string): string {
  return s
    .replace(/&#0*39;|&apos;|&#x0*27;/gi, '’')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"');
}

/** Strip HTML/markup to readable plain text. */
export function toPlainText(html: string): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, ' ') // gutenberg comments
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&#0*39;|&apos;|&#x0*27;/gi, '’')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

/** One-line meta description for <head> / OG tags. */
export function postDescription(post: Post, max = 160): string {
  const text = toPlainText(post.body ?? '');
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s+\S*$/, '') + '…';
}

/** Slightly longer excerpt for list pages. */
export function postExcerpt(post: Post, max = 200): string {
  const text = toPlainText(post.body ?? '');
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s+\S*$/, '') + '…';
}

/** Estimated reading time in whole minutes (>= 1), at 200 wpm. */
export function readingMinutes(post: Post): number {
  const words = toPlainText(post.body ?? '')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** The newer and older post around a given one, in publish order. */
export function adjacentPosts(
  posts: Post[],
  current: Post,
): { newer?: Post; older?: Post } {
  const i = posts.findIndex((p) => p.id === current.id);
  if (i === -1) return {};
  return { newer: posts[i - 1], older: posts[i + 1] };
}

/**
 * Posts most related to `current`, ranked by number of shared tags (ties broken
 * by recency). Excludes the current post and anything in `exclude` (e.g. the
 * prev/next posts, which already get their own nav). Returns up to `limit`.
 */
export function relatedPosts(
  posts: Post[],
  current: Post,
  limit = 4,
  exclude: (Post | undefined)[] = [],
): Post[] {
  const mine = new Set(current.data.tags.map(tagSlug).filter(Boolean));
  if (mine.size === 0) return [];
  const skip = new Set(
    [current, ...exclude].filter(Boolean).map((p) => (p as Post).id),
  );
  return posts
    .filter((p) => !skip.has(p.id))
    .map((p) => {
      const shared = p.data.tags
        .map(tagSlug)
        .filter((s) => s && mine.has(s)).length;
      return { post: p, shared };
    })
    .filter((x) => x.shared > 0)
    .sort(
      (a, b) =>
        b.shared - a.shared ||
        b.post.data.pubDate.getTime() - a.post.data.pubDate.getTime(),
    )
    .slice(0, limit)
    .map((x) => x.post);
}
