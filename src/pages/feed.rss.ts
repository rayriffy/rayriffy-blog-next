import { getCollectionBlog } from '$core/services/getCollectionBlog'
import rss from '@astrojs/rss'

export const get = async () => {
  const blogs = await getCollectionBlog()

  const rssItems = blogs
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
