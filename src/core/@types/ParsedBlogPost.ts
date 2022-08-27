import type { BlogPost } from './BlogPost'

export interface ParsedBlogPost extends Omit<BlogPost, 'date'> {
  date: string
  content: string
}
