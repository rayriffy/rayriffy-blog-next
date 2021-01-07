import fs from 'fs'
import path from 'path'

import { Plugin } from 'unified'
import { selectAll } from 'unist-util-select'
import querystring from 'querystring'

import { getProviderEndpoint } from '../getProviderEndpoint'

import { MarkdownNode } from '../../@types/MarkdownNode'
import { OembedProvider } from '../../@types/OembedProvider'
import { OembedResult } from '../../@types/OembedResult'

const createIframe = (node: MarkdownNode, url: string) => {
  node.type = `html`
  node.value = `
    <div class="w-full aspect-w-16 aspect-h-9">
      <iframe
        src="${url}"
        class="w-full"
        style="border:0"
        loading="lazy"
        allowfullscreen
      ></iframe>
    </div>
  `
}

const providerCachePath = path.join(process.cwd(), '.next/cache/providers.json')

export const iframeParser: Plugin = () => {
  const transform = async (markdownAST: MarkdownNode) => {
    // get oembed providers into cache
    if (!fs.existsSync(providerCachePath)) {
      const providersRemote: OembedProvider[] = await fetch(
        'https://oembed.com/providers.json'
      ).then(o => o.json())
      fs.writeFileSync(providerCachePath, JSON.stringify(providersRemote))
    }

    // transform
    // visit(markdownAST, 'inlineCode', visitor)
    const nodes = selectAll('[type=inlineCode]', markdownAST) as MarkdownNode[]

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
              const providers: OembedProvider[] = JSON.parse(
                fs.readFileSync(providerCachePath).toString()
              )
              const extractedUrl = node.value.slice('oembed: '.length)

              // get provider endpoint
              const endpoint = getProviderEndpoint(extractedUrl, providers)

              if (endpoint !== undefined) {
                // call api
                const oembedResult: OembedResult = await fetch(
                  `${endpoint}?${querystring.stringify({
                    format: 'json',
                    url: extractedUrl,
                  })}`
                ).then(o => o.json())

                // override node
                node.type = `html`
                node.value = `
                <div class="flex justify-center">${oembedResult.html}</div>
              `
              }
              break
          }
        }
      })
    )
  }

  return transform
}
