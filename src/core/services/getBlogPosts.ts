import { BlogPost } from "../@types/BlogPost"
import { blogPostField } from "../constants/blogPostField"

interface RawQueryResult {
  data: {
    blogPostCollection: {
      items: BlogPost[]
    }
  }
}

export const getBlogPosts = async () => {
  const query = `
    query {
      blogPostCollection(order: [date_DESC]) {
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
      query
    })
  }).then(o => o.json())

  return queryResult.data.blogPostCollection.items
}
