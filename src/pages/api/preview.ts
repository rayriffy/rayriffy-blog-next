import { NextApiHandler } from 'next'

import { getBlogPost } from '../../core/services/getBlogPost'

const api: NextApiHandler = async (req, res) => {
  const { secret, slug } = req.query

  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET || !slug) {
    return res.status(401).json({ message: 'Invalid token' })
  } else if (typeof slug !== 'string') {
    return res.status(400).json({ message: 'Type violation' })
  } else {
    try {
      const post = await getBlogPost(slug, true)

      // Enable Preview Mode by setting the cookies
      res.setPreviewData({})

      // Redirect to the path from the fetched post
      // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
      // res.writeHead(307, { Location: `/posts/${post.slug}` })
      const url = `/${post.slug}`
      res.write(
        `<!DOCTYPE html><html><head><meta http-equiv="Refresh" content="0; url=${url}" />
        <script>window.location.href = '${url}'</script>
        </head>`
      )
      res.end()
    } catch {
      return res.status(401).json({ message: 'Slug not found' })
    }
  }
}

export default api
