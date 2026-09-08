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
