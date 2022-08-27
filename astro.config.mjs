import { defineConfig } from 'astro/config'

/* Astro plugins */
import compress from 'astro-compress'
import vercel from '@astrojs/vercel/edge'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import partytown from '@astrojs/partytown'
import prefetch from '@astrojs/prefetch'

/* Remark plugins */
import { iframeParser } from './src/modules/remark/iframeParser.mjs'
import { imageParser } from './src/modules/remark/imageParser.mjs'

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.rayriffy.com',
  adapter: process.env.NODE_ENV === 'production' ? vercel() : undefined,
  integrations: [
    mdx(),
    sitemap({
      filter: page => !page.includes('/pages/')
    }),
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
    prefetch(),
  ],
  markdown: {
    remarkPlugins: [iframeParser, imageParser],
    rehypePlugins: [],
    extendDefaultPlugins: true,
  },
})
