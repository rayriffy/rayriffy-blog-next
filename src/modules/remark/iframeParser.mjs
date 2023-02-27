import fs from 'fs'
import path from 'path'

import axios from 'axios'
import { selectAll } from 'unist-util-select'
import { stringify } from 'querystring'

import { getProviderEndpoint } from './services/getProviderEndpoint.mjs'

const providerCache = path.join(process.cwd(), '.cache/providers.json')

/**
 * Create iframe template
 * @param {import('@astrojs/markdown-remark'.Node)} node
 * @param {string} url
 */
const createIframe = (node, url) => {
  node.type = 'html'
  node.value = `
    <div class="w-full aspect-[16/9]">
      <iframe
        src="${url}"
        class="w-full aspect-[16/9]"
        style="border:0"
        loading="lazy"
        allowfullscreen
      ></iframe>
    </div>
  `
}

/** @type {import('@astrojs/markdown-remark').RemarkPlugin} */
export const iframeParser = () => {
  return async markdownAST => {
    // get oembed providers into cache
    if (!fs.existsSync(providerCache)) {
      if (!fs.existsSync(path.dirname(providerCache)))
        fs.mkdirSync(path.dirname(providerCache), {
          recursive: true,
        })
      const { data: providersRemote } = await axios.get('https://oembed.com/providers.json')
      fs.writeFileSync(providerCache, JSON.stringify(providersRemote))
    }

    // transform
    // visit(markdownAST, 'inlineCode', visitor)
    const nodes = selectAll('[type=inlineCode]', markdownAST)

    await Promise.all(
      nodes.map(async node => {
        const matcher = node.value.match(/(\w+):\s?(.+)/)
        if (matcher !== null) {
          const provider = matcher[1]
          const targetValue = matcher[2]

          switch (provider) {
            case 'niconico':
              createIframe(
                node,
                `https://embed.nicovideo.jp/watch/${targetValue}`
              )
              break
            case 'youtube':
              createIframe(node, `https://www.youtube.com/embed/${targetValue}`)
              break
            case 'oembed':
              const providers = JSON.parse(
                fs.readFileSync(providerCache).toString()
              )
              const extractedUrl = node.value.slice('oembed: '.length)

              // get provider endpoint
              const endpoint = getProviderEndpoint(extractedUrl, providers)

              if (endpoint !== undefined) {
                try {
                  // call api
                  const { data: oembedResult } = await axios.get(endpoint, {
                    params: {
                      format: 'json',
                      url: extractedUrl,
                    }
                  })

                  // override node
                  node.type = `html`
                  node.value = `
                <div class="flex justify-center">${oembedResult.html}</div>
              `
                } catch (e) {}
              }
              break
          }
        }
      })
    )
  }
}
