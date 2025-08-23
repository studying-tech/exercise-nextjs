// ブログ記事のデータ型
export interface PostData {
  slug: string
  title: string
  date: string
  author: string
  excerpt: string
  content: string
  coverImage?: string
  tags?: string[]
  published?: boolean
  isMdx?: boolean
}

// 記事のメタデータ型（contentを除く）
export interface PostMeta {
  slug: string
  title: string
  date: string
  author: string
  excerpt: string
  coverImage?: string
  tags?: string[]
  published?: boolean
}

// ページのメタデータ型（実装済み）
export interface PageMetadata {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
  canonicalUrl?: string
}
