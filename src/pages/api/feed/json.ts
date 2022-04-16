import { NextApiHandler } from 'next'

import { getFeed } from '../../../core/services/getFeed'

const api: NextApiHandler = async (req, res) => {
  const feed = await getFeed()

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=3600, stale-while-revalidate=86400'
  )

  return res.status(200).send(feed.json1())
}

export default api
