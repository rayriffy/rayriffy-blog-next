import { Asset } from './Asset'
import { Author } from './Author'
import { Category } from './Category'

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
}
