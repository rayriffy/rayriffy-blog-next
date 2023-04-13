import fs from 'fs'
import path from 'path'

import wretch from 'wretch'
import QueryStringAddon from "wretch/addons/queryString"
import { selectAll } from 'unist-util-select'

import { getHash } from './services/getHash'
import { getProviderEndpoint } from './services/getProviderEndpoint.mjs'

const cacheDirectory = path.join(process.cwd(), '.cache')
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
      const providersRemote = await wretch('https://oembed.com/providers.json').get().json()
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
                const oembedCacheDirectory = path.join(
                  cacheDirectory,
                  'fetched'
                )
                const targetFile = getHash([extractedUrl]) + '.json'

                if (
                  fs.existsSync(path.join(oembedCacheDirectory, targetFile))
                ) {
                  const oembedResult = JSON.parse(
                    fs.readFileSync(
                      path.join(oembedCacheDirectory, targetFile),
                      'utf-8'
                    )
                  )

                  node.type = `html`
                  node.value = `<div class="flex justify-center">${oembedResult.html}</div>`
                } else {
                  try {
                    // call api
                    const oembedResult = await wretch(endpoint).addon(QueryStringAddon).query({
                      format: 'json',
                      url: extractedUrl,
                    })

                    if (!fs.existsSync(oembedCacheDirectory)) {
                      fs.mkdirSync(oembedCacheDirectory, {
                        recursive: true,
                      })
                    }

                    fs.writeFileSync(
                      path.join(oembedCacheDirectory, targetFile),
                      JSON.stringify(oembedResult)
                    )

                    // override node
                    node.type = `html`
                    node.value = `<div class="flex justify-center">${oembedResult.html}</div>`
                  } catch (e) {}
                }
              }
              break
          }
        }
      })
    )
  }
}
