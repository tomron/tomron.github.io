/**
 * Optional webmention support. The WordPress migration dropped native comments;
 * webmention.io gives them back in a static-friendly way.
 *
 * To enable: register your domain at https://webmention.io, add
 *   <link rel="webmention" href="https://webmention.io/tomron.net/webmention">
 * (BaseLayout does this when PUBLIC_WEBMENTION_DOMAIN is set), and set
 *   PUBLIC_WEBMENTION_DOMAIN=tomron.net
 * in the build environment. Left unset -> no fetch, nothing rendered.
 */

export type Mention = {
  type: 'like' | 'repost' | 'reply' | 'mention';
  url: string;
  author: { name: string; photo?: string; url?: string };
  content?: string;
  published?: string;
};

const DOMAIN = import.meta.env.PUBLIC_WEBMENTION_DOMAIN as string | undefined;

let cache: Map<string, Mention[]> | null = null;

const KIND: Record<string, Mention['type']> = {
  'like-of': 'like',
  'repost-of': 'repost',
  'in-reply-to': 'reply',
  'mention-of': 'mention',
};

async function loadAll(): Promise<Map<string, Mention[]>> {
  if (cache) return cache;
  cache = new Map();
  if (!DOMAIN) return cache;

  try {
    const res = await fetch(
      `https://webmention.io/api/mentions.jf2?domain=${encodeURIComponent(
        DOMAIN,
      )}&per-page=1000`,
    );
    if (!res.ok) return cache;
    const data = (await res.json()) as { children?: any[] };
    for (const item of data.children ?? []) {
      const target: string | undefined = item['wm-target'];
      if (!target) continue;
      const key = new URL(target).pathname.replace(/\/+$/, '') + '/';
      const list = cache.get(key) ?? [];
      list.push({
        type: KIND[item['wm-property']] ?? 'mention',
        url: item.url ?? item['wm-source'] ?? '',
        author: {
          name: item.author?.name ?? 'Someone',
          photo: item.author?.photo,
          url: item.author?.url,
        },
        content:
          typeof item.content === 'object' ? item.content?.text : item.content,
        published: item.published ?? item['wm-received'],
      });
      cache.set(key, list);
    }
  } catch {
    // Network failure during build -> just render no mentions.
  }
  return cache;
}

/** Webmentions targeting a given site path, or [] when disabled/none. */
export async function getMentions(pathname: string): Promise<Mention[]> {
  const all = await loadAll();
  const key = pathname.replace(/\/+$/, '') + '/';
  return all.get(key) ?? [];
}

export const webmentionsEnabled = Boolean(DOMAIN);
export const webmentionEndpoint = DOMAIN
  ? `https://webmention.io/${DOMAIN}/webmention`
  : undefined;
