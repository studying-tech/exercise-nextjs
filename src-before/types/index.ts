// TODO: ブログ記事のデータ型を定義してください
export type PostData = {}

// TODO: 記事のメタデータ型を定義してください（contentを除く）
export type PostMeta = {}

// ページのメタデータ型（実装済み）
export interface PageMetadata {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
  canonicalUrl?: string
}
