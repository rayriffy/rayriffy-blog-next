import { Plugin } from 'unified'
import { selectAll } from 'unist-util-select'

import { sample } from 'lodash'
import { encode } from 'html-entities'

import { MarkdownNode } from '../../@types/MarkdownNode'
import { ImageNode } from '../../@types/ImageNode'

export const imageLazyParser: Plugin = () => {
  const transform = async (markdownAST: MarkdownNode) => {
    // transform
    const nodes = selectAll('[type=image]', markdownAST) as ImageNode[]

    await Promise.all(
      nodes.map(async node => {
        const html = `<img src="${encode(node.url)}" alt="${encode(
          node.alt
        )}" loading="lazy" />`

        node.type = 'html'
        node.children = undefined
        node.value = html
      })
    )
  }

  return transform
}
