import { NextApiHandler } from 'next'

const api: NextApiHandler = async (req, res) => {
  try {
    if (req.headers.host !== 'blog.rayriffy.com')
      res.write(`User-agent: *\nDisallow: /`)
    else res.write(`User-agent: *\nDisallow: /pages`)
    res.end()
  } catch (e) {
    console.error(e)
    return res.status(500).send('Internal Server Error')
  }
}

export default api
