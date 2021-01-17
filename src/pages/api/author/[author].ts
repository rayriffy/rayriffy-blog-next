import { NextApiHandler } from 'next'
import { omit } from 'lodash'
import Cors from 'cors'

import { blogPostField } from '../../../core/constants/blogPostField'
import { intitializeMiddleware } from '../../../core/services/intitializeMiddleware'

import { BlogPost } from '../../../core/@types/BlogPost'

interface RawQueryResult {
  data: {
    blogPostCollection: {
      items: BlogPost[]
    }
  }
}

const cors = intitializeMiddleware(
  Cors({
    methods: ['GET'],
  })
)

const api: NextApiHandler = async (req, res) => {
  const { page, author } = req.query

  await cors(req, res)

  try {
    const itemsPerPage = 6
    const query = `
      query ($author: String) {
        blogPostCollection(where: { author: { user: $author } }, skip: ${
          (Number(page) - 1) * itemsPerPage
        }, limit: ${itemsPerPage}, order: [date_DESC]) {
          items {
            ${blogPostField}
          }
        }
      }
    `

    const queryResult: RawQueryResult = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accepts: 'application/json',
          Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          query,
          variables: {
            author,
          },
        }),
      }
    ).then(o => o.json())

    if (queryResult.data.blogPostCollection.items.length !== 0) {
      return res.status(200).send({
        status: 'success',
        code: 200,
        data: queryResult.data.blogPostCollection.items.map(item => ({
          url: `https://blog.rayriffy.com/${item.slug}`,
          ...omit(item, ['content', 'author']),
        })),
      })
    } else {
      return res.status(404).send({
        status: 'failed',
        code: 404,
        data: 'end of page',
      })
    }
  } catch (e) {
    console.error(e)
    return res.status(500).send({
      status: 'failed',
      code: 500,
      data: 'crashed',
    })
  }
}

export default api
