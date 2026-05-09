// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.gang4.io',
  integrations: [
    react(),
    mdx(),
    tailwind({
      applyBaseStyles: false, // On gère les styles globaux dans src/styles/global.css
    }),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
  build: {
    format: 'directory', // /blog/article-1/ au lieu de /blog/article-1.html (SEO-friendly)
  },
  output: 'static', // SSG complet par défaut (cible bots LLM)
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
});
