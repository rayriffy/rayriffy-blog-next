import { stringify } from 'querystring'

import { Plugin } from 'unified'
import { selectAll } from 'unist-util-select'

import { encode } from 'html-entities'

import { MarkdownNode } from '../../@types/MarkdownNode'
import { ImageNode } from '../../@types/ImageNode'

const isContentfulImage = (url: string) => url.includes('images.ctfassets.net')
const getContentfulURL = (url: string, type: 'jpg' | 'png' | 'webp') => {
  const options = stringify({
    q: 80,
    fm: type
  })

  return `${url}?${options}`
}

export const imageLazyParser: Plugin = () => {
  const transform = async (markdownAST: MarkdownNode) => {
    // transform
    const nodes = selectAll('[type=image]', markdownAST) as ImageNode[]

    await Promise.all(
      nodes.map(async node => {
        const baseHtml = `<img src="${encode(getContentfulURL(node.url, 'jpg'))}" alt="${encode(
          node.alt
        )}" loading="lazy" />`

        node.type = 'html'
        node.children = undefined

        if (isContentfulImage(node.url)) {
          const html = `
            <picture>
              <source type="image/webp" srcset="${encode(getContentfulURL(node.url, 'webp'))}">
              <source type="image/jpeg" srcset="${encode(getContentfulURL(node.url, 'jpg'))}">
              ${baseHtml}
            </picture>
          `

          node.value = html
        } else {
          node.value = baseHtml
        }
      })
    )
  }

  return transform
}
