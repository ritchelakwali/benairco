import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import { site } from './src/config/site.ts';

const noindexPaths = ['/diensten', '/offerte'];

export default defineConfig({
  site: site.url,
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  integrations: [
    sitemap({
      filter: (page) => !noindexPaths.some((p) => page.includes(p)),
    }),
    mdx(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
