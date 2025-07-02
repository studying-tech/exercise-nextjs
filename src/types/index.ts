/**
 * Next.js Product Catalog - Type Definitions
 * 商品カタログの型定義
 */

// 商品の基本情報
export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  category: string
  categoryId: string
  images: string[]
  features: string[]
  specifications: Record<string, string>
  inStock: boolean
  stockCount: number
  rating: number
  reviewCount: number
  tags: string[]
  createdAt: string
  updatedAt: string
}

// カテゴリー情報
export interface Category {
  id: string
  name: string
  description: string
  slug: string
  image: string
  parentId?: string
  children?: Category[]
  productCount: number
  order: number
}

// 商品フィルター
export interface ProductFilter {
  category?: string
  priceMin?: number
  priceMax?: number
  inStock?: boolean
  rating?: number
  tags?: string[]
  search?: string
}

// ソート設定
export type SortOption = 'name_asc' | 'name_desc' | 'price_asc' | 'price_desc' | 'rating_desc' | 'newest' | 'oldest'

// ページネーション
export interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

// 商品検索結果
export interface ProductSearchResult {
  products: Product[]
  pagination: Pagination
  filters: {
    categories: Category[]
    priceRange: {
      min: number
      max: number
    }
    availableTags: string[]
  }
}

// お問い合わせフォーム
export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
  productId?: string
}

// API レスポンス
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: {
    message: string
    code?: string
  }
  meta?: {
    pagination?: Pagination
    timestamp: string
  }
}

// 在庫情報
export interface StockInfo {
  productId: string
  inStock: boolean
  stockCount: number
  reservedCount: number
  lastUpdated: string
}

// レビュー情報
export interface Review {
  id: string
  productId: string
  userName: string
  rating: number
  title: string
  comment: string
  helpful: number
  verified: boolean
  createdAt: string
}

// ページメタデータ
export interface PageMetadata {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
  canonicalUrl?: string
}

// 検索機能用
export interface SearchSuggestion {
  type: 'product' | 'category' | 'tag'
  value: string
  label: string
  count?: number
}
