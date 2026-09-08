import rss from '@astrojs/rss';
import { getPublishedPosts } from '../lib/posts.ts';

export async function GET(context) {
  const posts = await getPublishedPosts();
  return rss({
    title: 'Tom Ron',
    description:
      'Tom Ron — data scientist. Notes on data, Python, machine learning, and things worth reading.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      link: post.data.permalink,
      categories: post.data.tags,
    })),
  });
}
