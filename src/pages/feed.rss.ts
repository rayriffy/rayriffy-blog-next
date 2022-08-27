import rss from '@astrojs/rss'

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
  const items = await import.meta.glob('./*.md')

  const readItems = await Promise.all(
    Object.entries(items).map(
      async ([_, caller]) => (await caller()) as Metadata
    )
  )
  const rssItems = readItems
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    )
    .map(item => {
      const { frontmatter, url } = item

      return {
        title: frontmatter.title,
        description: frontmatter.subtitle,
        link: url,
        pubDate: new Date(frontmatter.date),
      }
    })

  return rss({
    title: 'Riffy Blog',
    description: 'The Nerdy Blogger',
    site: 'https://blog.rayriffy.com',
    items: rssItems,
  })
}
