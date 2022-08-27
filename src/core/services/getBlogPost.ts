import { blogPostField } from '../constants/blogPostField'
import { getBlurImage } from './getBlurImage'

import type { BlogPost } from '../@types/BlogPost'

interface RawQueryResult {
  data: {
    blogPostCollection: {
      items: BlogPost[]
    }
  }
}

export const getBlogPost = async (slug: string, preview = false) => {
  const query = `
    query ($slug: String!) {
      blogPostCollection(where: { slug: $slug }, preview: ${
        preview ? 'true' : 'false'
      }) {
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
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({
        query,
        variables: {
          slug,
        },
      }),
    }
  ).then(o => o.json())

  if (queryResult.data.blogPostCollection.items.length === 0) {
    throw 'no data'
  } else {
    const blog = queryResult.data.blogPostCollection.items[0]
    const blurBanner = await getBlurImage(blog.banner)

    return {
      ...blog,
      banner: {
        ...blog.banner,
        placeholder: blurBanner,
      },
    }
  }
}
