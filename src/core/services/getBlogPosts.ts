import { BlogPost } from '../@types/BlogPost'
import { blogPostField } from '../constants/blogPostField'
import { getBlurImage } from './getBlurImage'

interface RawQueryResult {
  data: {
    blogPostCollection: {
      items: BlogPost[]
    }
  }
}

export const getBlogPosts = async (preview = false) => {
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
      }),
    }
  ).then(o => o.json())

  const res = await Promise.all(queryResult.data.blogPostCollection.items.map(async blog => {
    const blurBanner = await getBlurImage(blog.banner)

    return {
      ...blog,
      banner: {
        ...blog.banner,
        placeholder: blurBanner,
      },
    }
  }))

  return res
}
