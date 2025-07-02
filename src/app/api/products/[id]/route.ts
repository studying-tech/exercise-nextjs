/**
 * Next.js Product Catalog - Individual Product API Route
 * 個別商品API エンドポイント
 */

import { type NextRequest, NextResponse } from 'next/server'
import { getProduct, getRelatedProducts } from '@/lib/products'

interface RouteParams {
  params: {
    id: string
  }
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: '商品IDが指定されていません',
            code: 'MISSING_PRODUCT_ID',
          },
          meta: {
            timestamp: new Date().toISOString(),
          },
        },
        { status: 400 },
      )
    }

    // 商品データと関連商品を並列取得
    const [product, relatedProducts] = await Promise.all([getProduct(id), getRelatedProducts(id, 4)])

    const response = NextResponse.json({
      success: true,
      data: {
        product,
        relatedProducts,
      },
      meta: {
        timestamp: new Date().toISOString(),
      },
    })

    // ISR対応 - 商品詳細は1分ごとに更新
    response.headers.set('Cache-Control', 's-maxage=60, stale-while-revalidate=3600')

    return response
  } catch (error) {
    console.error('Product API Error:', error)

    // 商品が見つからない場合
    if (error instanceof Error && error.message.includes('not found')) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: '指定された商品が見つかりません',
            code: 'PRODUCT_NOT_FOUND',
          },
          meta: {
            timestamp: new Date().toISOString(),
          },
        },
        { status: 404 },
      )
    }

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
