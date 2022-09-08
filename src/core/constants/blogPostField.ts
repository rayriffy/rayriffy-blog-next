import { categoryField } from './categoryField'

export const blogPostField = `
slug
banner {
  url
  width
  height
  placeholder: url(transform: { quality: 70 })
}
title
subtitle
date
featured
author {
  name
}
content
categoryCollection {
  items {
    ${categoryField}
  }
}
sys {
  publishedAt
}
`
