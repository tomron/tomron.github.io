import { getPublishedPosts, postExcerpt, decodeLabel } from '../lib/posts.ts';

/** Lightweight index for the client-side search on /search/. */
export async function GET() {
  const posts = await getPublishedPosts();
  const body = JSON.stringify(
    posts.map((post) => ({
      title: post.data.title,
      url: post.data.permalink,
      date: post.data.pubDate.toISOString().slice(0, 10),
      tags: post.data.tags.map(decodeLabel),
      excerpt: postExcerpt(post, 180),
    })),
  );
  return new Response(body, {
    headers: { 'Content-Type': 'application/json' },
  });
}
