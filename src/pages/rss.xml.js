import rss from '@astrojs/rss';
import sanitizeHtml from 'sanitize-html';
import { getPublishedPosts, postDescription } from '../lib/posts.ts';
import { highlightCodeBlocks } from '../lib/highlight.ts';

export async function GET(context) {
  const posts = await getPublishedPosts();

  const items = await Promise.all(
    posts.map(async (post) => {
      const highlighted = await highlightCodeBlocks(post.body ?? '');
      const content = sanitizeHtml(highlighted, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat([
          'img',
          'figure',
          'figcaption',
          'h1',
          'h2',
        ]),
        allowedAttributes: {
          ...sanitizeHtml.defaults.allowedAttributes,
          '*': ['class', 'style'],
          span: ['class', 'style'],
        },
        // Make relative image/link URLs absolute so feed readers resolve them.
        transformTags: {
          a: sanitizeHtml.simpleTransform('a', {}, false),
        },
      }).replace(/(src|href)="\/(?!\/)/g, `$1="${context.site}`);

      return {
        title: post.data.title,
        pubDate: post.data.pubDate,
        link: post.data.permalink,
        categories: post.data.tags,
        description: postDescription(post),
        content,
      };
    }),
  );

  return rss({
    title: 'Tom Ron',
    description:
      'Tom Ron — data scientist. Notes on data, Python, machine learning, and things worth reading.',
    site: context.site,
    items,
    customData: `<language>en</language>`,
  });
}
