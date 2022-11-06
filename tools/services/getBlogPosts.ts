import fetch from 'node-fetch'

import { blogPostField } from '../../src/core/constants/blogPostField'
import { getBlurImage } from '../../src/core/services/getBlurImage'

import type { BlogPost } from '../../src/core/@types/BlogPost'

interface RawQueryResult {
  data: {
    blogPostCollection: {
      items: BlogPost[]
    }
  }
}

interface Option {
  preview?: boolean
  noBlur?: boolean
}

export const getBlogPosts = async (options: Option = {}) => {
  const { preview = false, noBlur = false } = options

  const query = `
    query {
      blogPostCollection(order: [date_DESC], preview: ${
        preview ? 'true' : 'false'
      }) {
        items {
          ${blogPostField}
        }
      }
    }
  `

  const queryResult = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({
        query,
      }),
    }
  ).then(o => o.json() as Promise<RawQueryResult>)

  const res = await Promise.all(
    queryResult.data.blogPostCollection.items.map(async blog => {
      return {
        ...blog,
        banner: {
          ...blog.banner,
          placeholder: noBlur
            ? {
                blurhashCode: '',
                encoded: '',
              }
            : await getBlurImage(blog.banner),
        },
      }
    })
  )

  return res
}
