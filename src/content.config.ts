// 导入 glob 加载器（loader）

// 从 `astro:content` 导入工具函数
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
// 导入 Zod
import { z } from 'astro/zod';

// 为每个集合定义一个 `loader` 和 `schema`
const docs = defineCollection({
  loader: glob({ pattern: ['**/[^_]*.(md|mdx)'], base: './src/docs' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    author: z.string(),
    image: z
      .object({
        url: z.string(),
        alt: z.string(),
      })
      .optional(),
    tags: z.array(z.string()).optional(),
  }),
});

// 导出一个单独的 `collections` 对象用以注册你的集合（们）
export const collections = { docs };
