import type { Node } from 'unist'

export interface MarkdownNode extends Node {
  value: string
}
