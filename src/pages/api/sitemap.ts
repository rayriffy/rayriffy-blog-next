import { NextApiHandler } from 'next'
import { SitemapStream, streamToPromise } from 'sitemap'

import { getBlogPosts } from '../../core/services/getBlogPosts'

const api: NextApiHandler = async (req, res) => {
  try {
    const blogPosts = await getBlogPosts()
    
    const sitemapStream = new SitemapStream({ hostname: 'https://' + req.headers.host })
    sitemapStream.write({
      url: '',
      changefreq: 'daily',
      priority: 0.7,
    })
    blogPosts.map(blogPost => {
      sitemapStream.write({
        url: blogPost.slug,
        lastmod: blogPost.date,
        changefreq: 'daily',
        priority: 0.7,
      })
    })
    sitemapStream.end()

    const sitemap = await streamToPromise(sitemapStream)
      .then(sm => sm.toString())
    res.write(sitemap)
    res.end()
  } catch (e) {
    console.error(e)
    return res.status(500).send('Internal Server Error')
  }
}

export default api
