import { z } from 'astro:content'

export const blogSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  date: z.date(),
  author: z.string(),
  categories: z.array(z.string()),
  banner: z.object({
    url: z.string(),
    width: z.number(),
    height: z.number(),
    placeholder: z.string(),
    blurhash: z.string()
  }),
  featured: z.boolean(),
  draft: z.boolean()
})
