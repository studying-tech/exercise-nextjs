/**
 * Next.js Product Catalog - Product Card Component
 * 商品カードコンポーネント
 */

'use client'

import { EyeIcon, HeartIcon, ShoppingBagIcon, StarIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid, StarIcon as StarIconSolid } from '@heroicons/react/24/solid'
import Image from 'next/image'
import Link from 'next/link'
import type React from 'react'
import { useState } from 'react'
import { calculateDiscountPercentage, formatPrice } from '@/lib/products'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
  className?: string
  showQuickView?: boolean
  showAddToWishlist?: boolean
}

export default function ProductCard({
  product,
  className = '',
  showQuickView = true,
  showAddToWishlist = true,
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [imageError, setImageError] = useState(false)

  const discountPercentage = product.originalPrice
    ? calculateDiscountPercentage(product.price, product.originalPrice)
    : 0

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
    // 実際のアプリケーションではここでAPIを呼び出し
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // クイックビューモーダルを開く
    console.log('Quick view:', product.id)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // カートに追加
    console.log('Add to cart:', product.id)
  }

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<StarIconSolid key={i} className='h-4 w-4 text-yellow-400' />)
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className='relative h-4 w-4'>
            <StarIcon className='h-4 w-4 text-gray-300 absolute' />
            <div className='w-1/2 overflow-hidden absolute'>
              <StarIconSolid className='h-4 w-4 text-yellow-400' />
            </div>
          </div>,
        )
      } else {
        stars.push(<StarIcon key={i} className='h-4 w-4 text-gray-300' />)
      }
    }

    return stars
  }

  return (
    <div className={`group card card-hover ${className}`}>
      <Link href={`/products/${product.id}`} className='block'>
        {/* 商品画像 */}
        <div className='relative aspect-square overflow-hidden bg-gray-100'>
          {!imageError ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className='object-cover transition-transform duration-300 group-hover:scale-105'
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
              onError={() => setImageError(true)}
            />
          ) : (
            <div className='w-full h-full flex items-center justify-center bg-gray-200'>
              <svg className='w-16 h-16 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1}
                  d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                />
              </svg>
            </div>
          )}

          {/* バッジ */}
          <div className='absolute top-2 left-2 flex flex-col space-y-1'>
            {!product.inStock && <span className='badge badge-error text-xs'>在庫切れ</span>}
            {discountPercentage > 0 && (
              <span className='badge bg-red-600 text-white text-xs'>{discountPercentage}% OFF</span>
            )}
            {product.tags.includes('新商品') && <span className='badge badge-primary text-xs'>NEW</span>}
          </div>

          {/* アクションボタン */}
          <div className='absolute top-2 right-2 flex flex-col space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
            {showAddToWishlist && (
              <button
                onClick={handleWishlistToggle}
                className='p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors'
                aria-label={isWishlisted ? 'ウィッシュリストから削除' : 'ウィッシュリストに追加'}
              >
                {isWishlisted ? (
                  <HeartIconSolid className='h-4 w-4 text-red-500' />
                ) : (
                  <HeartIcon className='h-4 w-4 text-gray-600' />
                )}
              </button>
            )}
            {showQuickView && (
              <button
                onClick={handleQuickView}
                className='p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors'
                aria-label='クイックビュー'
              >
                <EyeIcon className='h-4 w-4 text-gray-600' />
              </button>
            )}
          </div>

          {/* ホバー時のカートボタン */}
          <div className='absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className='w-full btn btn-primary btn-sm disabled:opacity-50 disabled:cursor-not-allowed'
              aria-label='カートに追加'
            >
              <ShoppingBagIcon className='h-4 w-4 mr-1' />
              {product.inStock ? 'カートに追加' : '在庫切れ'}
            </button>
          </div>
        </div>

        {/* 商品情報 */}
        <div className='p-4'>
          {/* カテゴリー */}
          <p className='text-sm text-gray-500 mb-1'>{product.category}</p>

          {/* 商品名 */}
          <h3 className='font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors'>
            {product.name}
          </h3>

          {/* 評価 */}
          <div className='flex items-center space-x-2 mb-2'>
            <div className='flex'>{renderStars(product.rating)}</div>
            <span className='text-sm text-gray-500'>({product.reviewCount})</span>
          </div>

          {/* 価格 */}
          <div className='flex items-center space-x-2 mb-3'>
            <span className='price text-gray-900'>{formatPrice(product.price)}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className='price-original'>{formatPrice(product.originalPrice)}</span>
            )}
          </div>

          {/* タグ */}
          {product.tags.length > 0 && (
            <div className='flex flex-wrap gap-1'>
              {product.tags.slice(0, 3).map((tag) => (
                <span key={tag} className='badge badge-secondary text-xs'>
                  {tag}
                </span>
              ))}
              {product.tags.length > 3 && <span className='text-xs text-gray-500'>+{product.tags.length - 3}</span>}
            </div>
          )}

          {/* 在庫状況 */}
          {product.inStock ? (
            <div className='flex items-center mt-2'>
              <div className='w-2 h-2 bg-green-400 rounded-full mr-2' />
              <span className='text-sm text-gray-600'>
                {product.stockCount > 10 ? '在庫あり' : `残り${product.stockCount}点`}
              </span>
            </div>
          ) : (
            <div className='flex items-center mt-2'>
              <div className='w-2 h-2 bg-red-400 rounded-full mr-2' />
              <span className='text-sm text-red-600'>在庫切れ</span>
            </div>
          )}
        </div>
      </Link>
    </div>
  )
}

// スケルトンローディング
export function ProductCardSkeleton() {
  return (
    <div className='card animate-pulse'>
      <div className='aspect-square bg-gray-200' />
      <div className='p-4'>
        <div className='h-4 bg-gray-200 rounded mb-2' />
        <div className='h-6 bg-gray-200 rounded mb-2' />
        <div className='flex space-x-1 mb-2'>
          {[...Array(5)].map((_, i) => (
            <div key={i} className='h-4 w-4 bg-gray-200 rounded' />
          ))}
        </div>
        <div className='h-6 bg-gray-200 rounded mb-3' />
        <div className='flex space-x-1'>
          <div className='h-4 w-12 bg-gray-200 rounded' />
          <div className='h-4 w-12 bg-gray-200 rounded' />
        </div>
      </div>
    </div>
  )
}
