import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import preact from '@astrojs/preact';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import solidJs from '@astrojs/solid-js';
import svelte from '@astrojs/svelte';
import vue from '@astrojs/vue';
import { defineConfig, envField } from 'astro/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import node from '@astrojs/node';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicEnv = { access: 'public', context: 'server', optional: true };

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',

  env: {
    schema: {
      EXAMPLE_STR: envField.string(publicEnv),
      EXAMPLE_INT: envField.number(publicEnv),
      EXAMPLE_FLOAT: envField.number(publicEnv),
      EXAMPLE_BOOL: envField.boolean(publicEnv),
      EXAMPLE_ENUM: envField.enum({ ...publicEnv, values: ['test', 'test2'] }),
    },
  },

  prefetch: true,

  integrations: [
    preact({ compat: true, devtools: true, include: ['**/components/preact/**'] }),
    react({ include: ['**/components/react/**'] }),
    vue({ include: ['**/components/vue/**'], appEntrypoint: path.resolve(__dirname, 'src', 'endpoints', 'vue.ts') }),
    solidJs({ include: ['**/components/solid/**'], devtools: true }),
    svelte({}),
    mdx({}),
    partytown({}),
    sitemap({}),
  ],

  adapter: node({
    mode: 'standalone',
  }),

  experimental: {
    logger: {
      entrypoint: path.resolve(__dirname, 'src', 'libs', 'logger', 'node-logger.js'),
      config: {
        level: 'info',
      },
    },
  },
});
