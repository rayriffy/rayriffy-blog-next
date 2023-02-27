import axios from 'axios'

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

interface ProcessedBlog extends Omit<BlogPost, 'banner'> {
  banner: {
    url: string
    width: number
    height: number
    placeholder: {
      blurhashCode: string
      encoded: string
    }
  }
}

interface Option {
  preview?: boolean
  noBlur?: boolean
}

export const getBlogPosts = async (
  options: Option = {}
): Promise<ProcessedBlog[]> => {
  const { preview = false } = options

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

  console.log('fetching blogs from cms...')
  const { data: queryResult } = await axios.post<RawQueryResult>(`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`, {
    query,
  }, {
    headers: {
      Authorization: `Bearer ${
        preview
          ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
          : process.env.CONTENTFUL_ACCESS_TOKEN}`
    }
  })

  console.log('post-processing...')

  const res = await Promise.all(
    queryResult.data.blogPostCollection.items.map(async blog => ({
      ...blog,
      banner: {
        ...blog.banner,
        placeholder: await getBlurImage(blog.banner),
      },
    }))
  )

  return res
}
