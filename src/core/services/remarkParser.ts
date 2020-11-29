
import { Plugin } from 'unified'
import { Node } from 'unist'
import visit from 'unist-util-visit'

interface MarkdownNode extends Node {
  value: string
}
// job: transform code to obembed and handle special cases for nicovideo

const createIframe = (node: MarkdownNode, url: string) => {
  node.type = `html`
  node.value = `
    <div class="w-full aspect-w-16 aspect-h-9">
      <iframe
        src="${url}"
        class="w-full"
        style="border:0"
        allowfullscreen
      ></iframe>
    </div>
  `
}

export const remarkParser: Plugin = () => {
  const visitor = (node: MarkdownNode) => {
    if (node.value.startsWith('niconico: ')) {
      createIframe(node, `https://embed.nicovideo.jp/watch/${node.value.slice('niconico: '.length)}`)
    } else if (node.value.startsWith('youtube: ')) {
      createIframe(node, `https://www.youtube.com/embed/${node.value.slice('youtube: '.length)}`)
    }
  }

  const transform = (markdownAST: Node) => {
    visit(markdownAST, 'inlineCode', visitor)
  }

  return transform
}
