import { BlogPost } from '../@types/BlogPost'
import { blogPostField } from '../constants/blogPostField'

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

  return queryResult.data.blogPostCollection.items
}
