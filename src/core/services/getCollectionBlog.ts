import { CollectionEntry, getCollection } from 'astro:content'
import dayjs from 'dayjs'

export const getCollectionBlog = async (): Promise<
  CollectionEntry<'blog'>[]
> => {
  const [remoteBlogs, localBlogs] = await Promise.all([
    getCollection('blog'),
    getCollection('local').then(o => o.filter(o => o.data.title !== 'null')),
  ])

  // @ts-ignore
  return [...remoteBlogs, ...localBlogs].sort(
    (a, b) => dayjs(b.data.date).unix() - dayjs(a.data.date).unix()
  )
}
