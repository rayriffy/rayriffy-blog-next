import { BlogPost } from "../@types/BlogPost"
import { blogPostField } from "../constants/blogPostField"

interface RawQueryResult {
  data: {
    blogPostCollection: {
      items: BlogPost[]
    }
  }
}

export const getBlogPost = async (slug: string) => {
  const query = `
    query ($slug: String!) {
      blogPostCollection(where: { slug: $slug }) {
        items {
          ${blogPostField}
        }
      }
    }
  `

  const queryResult: RawQueryResult = await fetch(`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accepts': 'application/json',
      'Authorization': `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`
    },
    body: JSON.stringify({
      query,
      variables: {
        slug,
      }
    })
  }).then(o => o.json())

  if (queryResult.data.blogPostCollection.items.length === 0) {
    throw 'no data'
  } else {
    return queryResult.data.blogPostCollection.items[0]
  }
}
