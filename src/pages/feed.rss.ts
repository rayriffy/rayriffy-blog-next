import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'

export const get = async () => {
  const blogs = await getCollection('blog')

  const rssItems = blogs
    .sort(
      (a, b) =>
        new Date(b.data.date).getTime() -
        new Date(a.data.date).getTime()
    )
    .map(item => {
      const { data, slug } = item

      return {
        title: data.title,
        description: data.subtitle ?? '',
        link: `/${slug}`,
        pubDate: new Date(data.date),
        draft: data.draft,
      }
    })

  return rss({
    title: 'Riffy Blog',
    description: 'The Nerdy Blogger',
    site: 'https://blog.rayriffy.com',
    items: rssItems,
  })
}
