import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';

export async function GET(context: APIContext) {
  const docs = await getCollection('docs');
  return rss({
    title: 'ZTeam | Docs',
    description: '',
    site: context.site!,
    items: docs.map((item) => ({
      title: item.data.title,
      pubDate: item.data.pubDate,
      description: item.data.description,
      link: `/docs/${item.id}`,
    })),
    customData: '<language>zh-CN</language>',
  });
}
