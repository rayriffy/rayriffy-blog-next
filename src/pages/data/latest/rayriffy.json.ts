import { getCollectionBlog } from '$core/services/getCollectionBlog'

export const get = async () => {
  const blogs = await getCollectionBlog()

  const processedItems = blogs
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
