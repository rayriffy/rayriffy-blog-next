import dayjs from "dayjs";
import { Feed } from "feed";

import { getBlogPosts } from "./getBlogPosts";

export const getFeed = async (): Promise<Feed> => {
  const blogPosts = await getBlogPosts({
    noBlur: true
  })

  const feedStream = new Feed({
    title: 'Riffy Blog',
    description: 'The Nerdy Blogger',
    id: 'https://blog.rayriffy.com',
    link: 'https://blog.rayriffy.com',
    language: "th",
    image: "https://blog.rayriffy.com/default.jpg",
    favicon: 'https://blog.rayriffy.com/favicon.ico',
    copyright: `© 2020 - ${new Date().getFullYear()} Phumrapee Limpianchop`,
    generator: 'Vercel',
    feedLinks: {
      json: "https://blog.rayriffy.com/feed.json",
      atom: "https://blog.rayriffy.com/feed.atom"
    },
    author: {
      name: "Phumrapee Limpianchop",
      email: "contact@rayriffy.com",
      link: "https://rayriffy.com"
    }
  })

  blogPosts.forEach(blogPost => {
    feedStream.addItem({
      title: blogPost.title,
      id: `https://blog.rayriffy.com/${blogPost.slug}`,
      link: `https://blog.rayriffy.com/${blogPost.slug}`,
      description: blogPost.subtitle,
      author: [{
        name: blogPost.author.name,
        email: 'contact@rayriffy.com',
        link: "https://rayriffy.com"
      }],
      image: blogPost.banner.url,
      date: dayjs(blogPost.date).toDate(),
    })
  })

  return feedStream
}