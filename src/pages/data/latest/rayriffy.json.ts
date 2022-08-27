interface Metadata {
  frontmatter: {
    title: string
    subtitle: string
    date: string
    author: string
    categories: string[]
    banner: [string, number, number] // [url, width, height]
    featured: boolean
  }
  url: string
}

export const get = async () => {
  const items = await import.meta.glob('../../*.md')

  const readItems = await Promise.all(
    Object.entries(items).map(
      async ([_, caller]) => (await caller()) as Metadata
    )
  )
  const processedItems = readItems
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    )
    .filter(o => o.frontmatter.author === 'Phumrapee Limpianchop')
    .slice(0, 12)
    .map(item => ({
      url: item.url,
      banner: {
        url: item.frontmatter.banner[0],
        width: item.frontmatter.banner[1],
        height: item.frontmatter.banner[2],
      },
      title: item.frontmatter.title,
      subtitle: item.frontmatter.subtitle,
      date: item.frontmatter.date,
      featured: item.frontmatter.featured,
      categories: item.frontmatter.categories,
    }))

  return {
    body: JSON.stringify(processedItems),
  }
}
