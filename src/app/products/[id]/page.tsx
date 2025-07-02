/**
 * Next.js Product Catalog - Product Detail Page
 * 商品詳細ページ（SSG + ISR実装）
 */

import { ChevronLeftIcon, HeartIcon, ShareIcon, ShoppingBagIcon, StarIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ProductCard from '@/components/products/ProductCard'
import { calculateDiscountPercentage, formatPrice, getProduct, getProducts, getRelatedProducts } from '@/lib/products'

interface ProductPageProps {
  params: {
    id: string
  }
}

// 静的パラメータの生成（SSG）
export async function generateStaticParams() {
  const products = await getProducts()

  return products.slice(0, 10).map((product) => ({
    id: product.id,
  }))
}

// メタデータの動的生成
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  try {
    const product = await getProduct(params.id)

    return {
      title: product.name,
      description: product.description,
      keywords: [product.name, product.category, ...product.tags],
      openGraph: {
        title: product.name,
        description: product.description,
        images: [
          {
            url: product.images[0],
            width: 800,
            height: 600,
            alt: product.name,
          },
        ],
        type: 'product',
      },
      twitter: {
        card: 'summary_large_image',
        title: product.name,
        description: product.description,
        images: [product.images[0]],
      },
    }
  } catch {
    return {
      title: '商品が見つかりません',
      description: '指定された商品は存在しないか、削除されています。',
    }
  }
}

// ISR設定 - 1分ごとに再生成
export const revalidate = 60

export default async function ProductPage({ params }: ProductPageProps) {
  let product
  let relatedProducts

  try {
    ;[product, relatedProducts] = await Promise.all([getProduct(params.id), getRelatedProducts(params.id, 4)])
  } catch {
    notFound()
  }

  const discountPercentage = product.originalPrice
    ? calculateDiscountPercentage(product.price, product.originalPrice)
    : 0

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<StarIconSolid key={i} className='h-5 w-5 text-yellow-400' />)
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className='relative h-5 w-5'>
            <StarIcon className='h-5 w-5 text-gray-300 absolute' />
            <div className='w-1/2 overflow-hidden absolute'>
              <StarIconSolid className='h-5 w-5 text-yellow-400' />
            </div>
          </div>,
        )
      } else {
        stars.push(<StarIcon key={i} className='h-5 w-5 text-gray-300' />)
      }
    }

    return stars
  }

  return (
    <div className='min-h-screen bg-white'>
      {/* パンくずナビ */}
      <nav className='bg-gray-50 py-4'>
        <div className='container mx-auto px-4'>
          <ol className='flex items-center space-x-2 text-sm'>
            <li>
              <Link href='/' className='text-blue-600 hover:text-blue-800'>
                ホーム
              </Link>
            </li>
            <li className='text-gray-500'>/</li>
            <li>
              <Link href='/products' className='text-blue-600 hover:text-blue-800'>
                商品一覧
              </Link>
            </li>
            <li className='text-gray-500'>/</li>
            <li>
              <Link href={`/categories/${product.categoryId}`} className='text-blue-600 hover:text-blue-800'>
                {product.category}
              </Link>
            </li>
            <li className='text-gray-500'>/</li>
            <li className='text-gray-900 font-medium truncate'>{product.name}</li>
          </ol>
        </div>
      </nav>

      <div className='container mx-auto px-4 py-8'>
        {/* 戻るボタン */}
        <div className='mb-6'>
          <Link
            href='/products'
            className='inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors'
          >
            <ChevronLeftIcon className='h-5 w-5 mr-1' />
            商品一覧に戻る
          </Link>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16'>
          {/* 商品画像 */}
          <div className='space-y-4'>
            <div className='relative aspect-square overflow-hidden rounded-lg bg-gray-100'>
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className='object-cover'
                sizes='(max-width: 1024px) 100vw, 50vw'
                priority
              />
              {discountPercentage > 0 && (
                <div className='absolute top-4 left-4'>
                  <span className='bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium'>
                    {discountPercentage}% OFF
                  </span>
                </div>
              )}
            </div>

            {/* サムネイル画像 */}
            {product.images.length > 1 && (
              <div className='grid grid-cols-4 gap-2'>
                {product.images.slice(0, 4).map((image, index) => (
                  <div key={index} className='relative aspect-square overflow-hidden rounded-md bg-gray-100'>
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className='object-cover cursor-pointer hover:opacity-80 transition-opacity'
                      sizes='25vw'
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 商品情報 */}
          <div>
            <div className='mb-4'>
              <p className='text-blue-600 font-medium'>{product.category}</p>
              <h1 className='text-3xl font-bold text-gray-900 mt-2 mb-4'>{product.name}</h1>
            </div>

            {/* 評価 */}
            <div className='flex items-center space-x-3 mb-6'>
              <div className='flex'>{renderStars(product.rating)}</div>
              <span className='text-lg font-medium'>{product.rating}</span>
              <span className='text-gray-500'>({product.reviewCount}件のレビュー)</span>
            </div>

            {/* 価格 */}
            <div className='mb-6'>
              <div className='flex items-center space-x-3'>
                <span className='text-3xl font-bold text-gray-900'>{formatPrice(product.price)}</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className='text-xl text-gray-500 line-through'>{formatPrice(product.originalPrice)}</span>
                )}
              </div>
              {discountPercentage > 0 && (
                <p className='text-red-600 font-medium mt-1'>
                  {formatPrice(product.originalPrice! - product.price)}お得！
                </p>
              )}
            </div>

            {/* 在庫状況 */}
            <div className='mb-6'>
              {product.inStock ? (
                <div className='flex items-center text-green-600'>
                  <div className='w-3 h-3 bg-green-400 rounded-full mr-2' />
                  <span className='font-medium'>
                    {product.stockCount > 10 ? '在庫あり' : `残り${product.stockCount}点`}
                  </span>
                </div>
              ) : (
                <div className='flex items-center text-red-600'>
                  <div className='w-3 h-3 bg-red-400 rounded-full mr-2' />
                  <span className='font-medium'>在庫切れ</span>
                </div>
              )}
            </div>

            {/* アクションボタン */}
            <div className='flex space-x-4 mb-8'>
              <button
                disabled={!product.inStock}
                className='flex-1 btn btn-primary btn-lg disabled:opacity-50 disabled:cursor-not-allowed'
              >
                <ShoppingBagIcon className='h-5 w-5 mr-2' />
                {product.inStock ? 'カートに追加' : '在庫切れ'}
              </button>
              <button className='btn btn-outline btn-lg'>
                <HeartIcon className='h-5 w-5' />
              </button>
              <button className='btn btn-outline btn-lg'>
                <ShareIcon className='h-5 w-5' />
              </button>
            </div>

            {/* 商品説明 */}
            <div className='mb-8'>
              <h3 className='text-lg font-semibold mb-3'>商品説明</h3>
              <p className='text-gray-700 leading-relaxed'>{product.description}</p>
            </div>

            {/* 特徴 */}
            {product.features.length > 0 && (
              <div className='mb-8'>
                <h3 className='text-lg font-semibold mb-3'>特徴</h3>
                <ul className='space-y-2'>
                  {product.features.map((feature, index) => (
                    <li key={index} className='flex items-start'>
                      <span className='text-blue-600 mr-2'>•</span>
                      <span className='text-gray-700'>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* タグ */}
            {product.tags.length > 0 && (
              <div>
                <h3 className='text-lg font-semibold mb-3'>タグ</h3>
                <div className='flex flex-wrap gap-2'>
                  {product.tags.map((tag) => (
                    <span key={tag} className='badge badge-secondary'>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 仕様表 */}
        {Object.keys(product.specifications).length > 0 && (
          <div className='mb-16'>
            <h2 className='text-2xl font-bold mb-6'>仕様</h2>
            <div className='bg-gray-50 rounded-lg overflow-hidden'>
              <table className='w-full'>
                <tbody>
                  {Object.entries(product.specifications).map(([key, value], index) => (
                    <tr key={key} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className='px-6 py-4 font-medium text-gray-900 border-r border-gray-200'>{key}</td>
                      <td className='px-6 py-4 text-gray-700'>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 関連商品 */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className='text-2xl font-bold mb-6'>関連商品</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
