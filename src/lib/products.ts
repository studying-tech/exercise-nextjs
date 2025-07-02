/**
 * Next.js Product Catalog - Product Data Library
 * 商品データ取得・管理ライブラリ
 */

import { notFound } from 'next/navigation'
import { cache } from 'react'
import categoriesData from '@/data/categories.json'
import productsData from '@/data/products.json'
import type { Category, Pagination, Product, ProductFilter, ProductSearchResult, SortOption, StockInfo } from '@/types'

// 商品データをキャッシュ付きで取得
export const getProducts = cache(async (): Promise<Product[]> => {
  // 実際のアプリケーションではAPIから取得
  // ここではJSONファイルから読み込み
  await new Promise((resolve) => setTimeout(resolve, 100)) // APIコール時間をシミュレート
  return productsData as Product[]
})

// カテゴリーデータをキャッシュ付きで取得
export const getCategories = cache(async (): Promise<Category[]> => {
  await new Promise((resolve) => setTimeout(resolve, 50))
  return categoriesData as Category[]
})

// 特定の商品を取得
export const getProduct = cache(async (id: string): Promise<Product> => {
  const products = await getProducts()
  const product = products.find((p) => p.id === id)

  if (!product) {
    notFound()
  }

  return product
})

// 特定のカテゴリーを取得
export const getCategory = cache(async (slug: string): Promise<Category> => {
  const categories = await getCategories()
  const findCategoryBySlug = (cats: Category[]): Category | undefined => {
    for (const cat of cats) {
      if (cat.slug === slug) return cat
      if (cat.children) {
        const found = findCategoryBySlug(cat.children)
        if (found) return found
      }
    }
    return undefined
  }

  const category = findCategoryBySlug(categories)

  if (!category) {
    notFound()
  }

  return category
})

// 商品検索とフィルタリング
export async function searchProducts(
  filter: ProductFilter = {},
  sort: SortOption = 'newest',
  page = 1,
  limit = 12,
): Promise<ProductSearchResult> {
  const products = await getProducts()
  const categories = await getCategories()

  // フィルタリング
  const filteredProducts = products.filter((product) => {
    // カテゴリーフィルター
    if (filter.category && product.categoryId !== filter.category) {
      return false
    }

    // 価格フィルター
    if (filter.priceMin && product.price < filter.priceMin) {
      return false
    }
    if (filter.priceMax && product.price > filter.priceMax) {
      return false
    }

    // 在庫フィルター
    if (filter.inStock !== undefined && product.inStock !== filter.inStock) {
      return false
    }

    // 評価フィルター
    if (filter.rating && product.rating < filter.rating) {
      return false
    }

    // タグフィルター
    if (filter.tags && filter.tags.length > 0) {
      if (!filter.tags.some((tag) => product.tags.includes(tag))) {
        return false
      }
    }

    // 検索フィルター
    if (filter.search) {
      const searchTerm = filter.search.toLowerCase()
      return (
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
      )
    }

    return true
  })

  // ソート
  filteredProducts.sort((a, b) => {
    switch (sort) {
      case 'name_asc':
        return a.name.localeCompare(b.name)
      case 'name_desc':
        return b.name.localeCompare(a.name)
      case 'price_asc':
        return a.price - b.price
      case 'price_desc':
        return b.price - a.price
      case 'rating_desc':
        return b.rating - a.rating
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
  })

  // ページネーション
  const total = filteredProducts.length
  const totalPages = Math.ceil(total / limit)
  const offset = (page - 1) * limit
  const paginatedProducts = filteredProducts.slice(offset, offset + limit)

  // フィルター情報の生成
  const priceRange = {
    min: Math.min(...products.map((p) => p.price)),
    max: Math.max(...products.map((p) => p.price)),
  }

  const availableTags = Array.from(new Set(products.flatMap((p) => p.tags))).sort()

  const pagination: Pagination = {
    page,
    limit,
    total,
    totalPages,
  }

  return {
    products: paginatedProducts,
    pagination,
    filters: {
      categories,
      priceRange,
      availableTags,
    },
  }
}

// カテゴリー別商品取得
export async function getProductsByCategory(categoryId: string, limit?: number): Promise<Product[]> {
  const products = await getProducts()
  const categoryProducts = products.filter((p) => p.categoryId === categoryId)

  if (limit) {
    return categoryProducts.slice(0, limit)
  }

  return categoryProducts
}

// 関連商品取得
export async function getRelatedProducts(productId: string, limit = 4): Promise<Product[]> {
  const products = await getProducts()
  const currentProduct = products.find((p) => p.id === productId)

  if (!currentProduct) {
    return []
  }

  // 同じカテゴリーの商品から関連商品を取得
  const relatedProducts = products
    .filter((p) => p.id !== productId && p.categoryId === currentProduct.categoryId)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit)

  return relatedProducts
}

// 人気商品取得
export const getFeaturedProducts = cache(async (limit = 8): Promise<Product[]> => {
  const products = await getProducts()

  return products
    .filter((p) => p.inStock)
    .sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount)
    .slice(0, limit)
})

// 新着商品取得
export const getNewProducts = cache(async (limit = 8): Promise<Product[]> => {
  const products = await getProducts()

  return products
    .filter((p) => p.inStock)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit)
})

// セール商品取得
export const getSaleProducts = cache(async (limit = 8): Promise<Product[]> => {
  const products = await getProducts()

  return products
    .filter((p) => p.inStock && p.originalPrice && p.originalPrice > p.price)
    .sort((a, b) => {
      const discountA = a.originalPrice ? (a.originalPrice - a.price) / a.originalPrice : 0
      const discountB = b.originalPrice ? (b.originalPrice - b.price) / b.originalPrice : 0
      return discountB - discountA
    })
    .slice(0, limit)
})

// 在庫情報取得（リアルタイムデータをシミュレート）
export async function getStockInfo(productId: string): Promise<StockInfo> {
  // 実際のアプリケーションでは在庫管理APIから取得
  const product = await getProduct(productId)

  return {
    productId,
    inStock: product.inStock,
    stockCount: product.stockCount,
    reservedCount: Math.floor(product.stockCount * 0.1), // 予約分を10%と仮定
    lastUpdated: new Date().toISOString(),
  }
}

// 検索候補取得
export async function getSearchSuggestions(query: string): Promise<string[]> {
  if (query.length < 2) return []

  const products = await getProducts()
  const categories = await getCategories()

  const suggestions = new Set<string>()

  // 商品名から候補を取得
  products.forEach((product) => {
    if (product.name.toLowerCase().includes(query.toLowerCase())) {
      suggestions.add(product.name)
    }
  })

  // カテゴリー名から候補を取得
  const flattenCategories = (cats: Category[]): Category[] => {
    const result: Category[] = []
    cats.forEach((cat) => {
      result.push(cat)
      if (cat.children) {
        result.push(...flattenCategories(cat.children))
      }
    })
    return result
  }

  flattenCategories(categories).forEach((category) => {
    if (category.name.toLowerCase().includes(query.toLowerCase())) {
      suggestions.add(category.name)
    }
  })

  // タグから候補を取得
  products.forEach((product) => {
    product.tags.forEach((tag) => {
      if (tag.toLowerCase().includes(query.toLowerCase())) {
        suggestions.add(tag)
      }
    })
  })

  return Array.from(suggestions).slice(0, 8)
}

// 価格フォーマット
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
    minimumFractionDigits: 0,
  }).format(price)
}

// 割引率計算
export function calculateDiscountPercentage(price: number, originalPrice: number): number {
  if (!originalPrice || originalPrice <= price) return 0
  return Math.round(((originalPrice - price) / originalPrice) * 100)
}
