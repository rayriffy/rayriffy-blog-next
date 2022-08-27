import { defineConfig } from 'astro/config'
/* Astro plugins */

import vercel from '@astrojs/vercel/edge'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import partytown from '@astrojs/partytown'
/* Remark plugins */

import { iframeParser } from './src/modules/remark/iframeParser.mjs'
import { imageParser } from './src/modules/remark/imageParser.mjs'

import compress from 'astro-compress'

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.rayriffy.com',
  adapter: process.env.NODE_ENV === 'production' ? vercel() : undefined,
  integrations: [
    mdx(),
    sitemap(),
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    partytown({
      config: {
        debug: false,
        forward: ['dataLayer.push'],
      },
    }),
    compress({
      img: false,
      svg: false,
      js: false,
    }),
  ],
  markdown: {
    remarkPlugins: [iframeParser, imageParser],
    rehypePlugins: [],
    extendDefaultPlugins: true,
  },
})
