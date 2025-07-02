/**
 * Next.js Product Catalog - Products API Route
 * 商品API エンドポイント
 */

import { type NextRequest, NextResponse } from 'next/server'
import { searchProducts } from '@/lib/products'
import type { ProductFilter, SortOption } from '@/types'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // フィルターパラメータの解析
    const filter: ProductFilter = {
      category: searchParams.get('category') || undefined,
      priceMin: searchParams.get('priceMin') ? Number(searchParams.get('priceMin')) : undefined,
      priceMax: searchParams.get('priceMax') ? Number(searchParams.get('priceMax')) : undefined,
      inStock: searchParams.get('inStock') ? searchParams.get('inStock') === 'true' : undefined,
      rating: searchParams.get('rating') ? Number(searchParams.get('rating')) : undefined,
      tags: searchParams.get('tags') ? searchParams.get('tags')?.split(',') : undefined,
      search: searchParams.get('search') || undefined,
    }

    // ソートとページネーションパラメータ
    const sort = (searchParams.get('sort') as SortOption) || 'newest'
    const page = Number(searchParams.get('page')) || 1
    const limit = Number(searchParams.get('limit')) || 12

    // 商品検索の実行
    const result = await searchProducts(filter, sort, page, limit)

    // レスポンスヘッダーの設定
    const response = NextResponse.json({
      success: true,
      data: result,
      meta: {
        timestamp: new Date().toISOString(),
        pagination: result.pagination,
      },
    })

    // キャッシュヘッダーの設定（ISR対応）
    response.headers.set('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400')

    return response
  } catch (error) {
    console.error('Products API Error:', error)

    return NextResponse.json(
      {
        success: false,
        error: {
          message: '商品の取得に失敗しました',
          code: 'FETCH_ERROR',
        },
        meta: {
          timestamp: new Date().toISOString(),
        },
      },
      { status: 500 },
    )
  }
}

// プリフライトリクエスト対応
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
