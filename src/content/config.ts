import { defineCollection } from 'astro:content'

import { blogSchema } from './schemas/_blog'

export const collections = {
  blog: defineCollection({
    schema: blogSchema,
  }),
}
