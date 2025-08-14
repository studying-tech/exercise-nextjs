export interface PostData {
  slug: string
  title: string
  date: string
  author: string
  tags: string[]
  excerpt: string
  coverImage?: string
  content: string
  published: boolean
}

export interface PostMeta {
  slug: string
  title: string
  date: string
  author: string
  tags: string[]
  excerpt: string
  coverImage?: string
  published: boolean
}

export interface PageMetadata {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
  canonicalUrl?: string
}
