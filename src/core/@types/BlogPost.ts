import type { Asset } from './Asset'
import type { Author } from './Author'
import type { Category } from './Category'

export interface BlogPost {
  slug: string
  banner: Asset
  title: string
  subtitle: string
  date: string
  featured: boolean
  author: Author
  content: string
  categoryCollection: {
    items: Category[]
  }
  sys: {
    publishedAt: string | null
  }
}
