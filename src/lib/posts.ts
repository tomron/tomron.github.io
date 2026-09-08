import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

const isProd = import.meta.env.PROD;

/** All posts that should be visible on the live site, newest first. */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => !isProd || !data.draft);
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
