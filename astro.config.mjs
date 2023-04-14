import { defineConfig } from 'astro/config'

/* Astro plugins */
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import prefetch from '@astrojs/prefetch'
import html from 'astro-html-terser'

/* Remark plugins */
import { iframeParser } from './src/modules/remark/iframeParser.mjs'
import { imageParser } from './src/modules/remark/imageParser.mjs'
import { readingTime } from './src/modules/remark/readingTime.mjs'

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.rayriffy.com/',
  integrations: [
    sitemap({
      filter: page => !page.includes('/pages/'),
    }),
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    html(),
    prefetch(),
  ],
  markdown: {
    remarkPlugins: [iframeParser, imageParser, readingTime],
  },
})
