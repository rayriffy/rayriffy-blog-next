import { defineCollection } from 'astro:content'

import { blogSchema } from './schemas/_blog'

export const collections = {
  blog: defineCollection({
    type: 'content',
    schema: blogSchema,
  }),
  local: defineCollection({
    type: 'content',
    schema: blogSchema,
  }),
}
