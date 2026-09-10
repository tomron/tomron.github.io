import { OGImageRoute } from 'astro-og-canvas';
import { getPublishedPosts } from '../../lib/posts';

const posts = await getPublishedPosts();

// Key each image by the post's permalink with slashes flattened to dashes,
// matching the `/og/<key>.png` URL built in [...slug].astro.
type OgPage = { title: string; description: string };
const pages: Record<string, OgPage> = {
  home: {
    title: 'Tom Ron',
    description: 'Engineering leadership & management, Python and ML notes',
  },
  ...Object.fromEntries(
    posts.map((post) => [
      post.data.permalink.replace(/^\/+|\/+$/g, '').replace(/\//g, '-'),
      {
        title: post.data.title,
        description: post.data.pubDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      },
    ]),
  ),
};

export const { getStaticPaths, GET } = await OGImageRoute({
  pages,
  getImageOptions: (_path, page: (typeof pages)[string]) => ({
    title: page.title,
    description: page.description,
    bgGradient: [
      [16, 17, 20],
      [26, 32, 44],
    ],
    border: { color: [122, 162, 255], width: 8, side: 'inline-start' },
    padding: 80,
    font: {
      title: {
        color: [232, 232, 232],
        size: 64,
        lineHeight: 1.2,
        weight: 'Bold',
        families: ['Inter', 'Helvetica', 'sans-serif'],
      },
      description: {
        color: [154, 154, 154],
        size: 28,
        weight: 'Normal',
        families: ['Inter', 'Helvetica', 'sans-serif'],
      },
    },
  }),
});
