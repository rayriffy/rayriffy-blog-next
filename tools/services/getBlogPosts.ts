import PQueue from 'p-queue'

import { blogPostField } from '../../src/core/constants/blogPostField'
import { getBlurImage } from '../../src/core/services/getBlurImage'

import type { BlogPost } from '../../src/core/@types/BlogPost'

const queue = new PQueue({ concurrency: 10 })

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

  console.log('fetching blogs from cms...')
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

  console.log('post-processing...')
  const res: ProcessedBlog[] = []

  const intervalId = setInterval(() => {
    console.log('in queue:', queue.pending)
  }, 1200)

  await Promise.all(
    queryResult.data.blogPostCollection.items.map(blog =>
      queue.add(async () => {
        res.push({
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
        })
      })
    )
  )

  clearInterval(intervalId)

  return res
}
