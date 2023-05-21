import { defineConfig } from 'astro/config'

/* Astro plugins */
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'

/* Remark plugins */
import { iframeParser } from './src/modules/remark/iframeParser.mjs'
import { imageParser } from './src/modules/remark/imageParser.mjs'
import { readingTime } from './src/modules/remark/readingTime.mjs'

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.rayriffy.com/',
  compressHTML: true,
  integrations: [
    sitemap({
      filter: page => !page.includes('/pages/'),
    }),
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
  ],
  markdown: {
    remarkPlugins: [iframeParser, imageParser, readingTime],
  },
})
