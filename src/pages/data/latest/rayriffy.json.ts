import { getCollection } from 'astro:content'

export const get = async () => {
  const blogs = await getCollection('blog')

  const processedItems = blogs
    .sort(
      (a, b) =>
        new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
    )
    .filter(o => o.data.author === 'Phumrapee Limpianchop')
    .slice(0, 12)
    .map(item => ({
      url: `/${item.slug}`,
      banner: {
        url: item.data.banner.url,
        width: item.data.banner.width,
        height: item.data.banner.height,
        hash: item.data.banner.blurhash,
      },
      title: item.data.title,
      subtitle: item.data.subtitle,
      date: item.data.date,
      featured: item.data.featured,
      categories: item.data.categories,
    }))

  return {
    body: JSON.stringify(processedItems),
  }
}
