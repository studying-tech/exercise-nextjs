/**
 * Next.js Product Catalog - Home Page
 * ホームページ（SSG実装）
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import CategoryCard from '@/components/categories/CategoryCard'
import HeroSection from '@/components/home/HeroSection'
import NewsletterSection from '@/components/home/NewsletterSection'
import ProductCard from '@/components/products/ProductCard'
import { getCategories, getFeaturedProducts, getNewProducts, getSaleProducts } from '@/lib/products'

export const metadata: Metadata = {
  title: 'ホーム',
  description: '最新商品とお得な情報をお届けする商品カタログサイト。人気商品、新着商品、セール商品をチェック！',
  keywords: ['商品カタログ', '人気商品', '新着商品', 'セール', 'おすすめ'],
  openGraph: {
    title: '商品カタログ - 最新商品をお届け',
    description: '人気商品、新着商品、セール商品をチェック！',
    images: ['/og-home.jpg'],
  },
}

// ISR設定 - 1時間ごとに再生成
export const revalidate = 3600

export default async function HomePage() {
  // 並列でデータを取得（SSG時に実行）
  const [featuredProducts, newProducts, saleProducts, categories] = await Promise.all([
    getFeaturedProducts(8),
    getNewProducts(8),
    getSaleProducts(6),
    getCategories(),
  ])

  return (
    <div className='min-h-screen' id='main-content'>
      {/* ヒーローセクション */}
      <HeroSection />

      {/* カテゴリーセクション */}
      <section className='py-12 bg-white'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-8'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>商品カテゴリー</h2>
            <p className='text-gray-600 max-w-2xl mx-auto'>
              幅広い商品カテゴリーから、お探しの商品を見つけてください。
            </p>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* 人気商品セクション */}
      <section className='py-12 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-8'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>人気商品</h2>
            <p className='text-gray-600 max-w-2xl mx-auto'>多くのお客様に選ばれている人気の商品をご紹介します。</p>
          </div>

          <div className='product-grid'>
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className='text-center mt-8'>
            <Link href='/products' className='btn btn-primary btn-lg'>
              すべての商品を見る
            </Link>
          </div>
        </div>
      </section>

      {/* 新着商品セクション */}
      <section className='py-12 bg-white'>
        <div className='container mx-auto px-4'>
          <div className='flex items-center justify-between mb-8'>
            <div>
              <h2 className='text-3xl font-bold text-gray-900 mb-2'>新着商品</h2>
              <p className='text-gray-600'>最新の商品をいち早くお届けします。</p>
            </div>
            <Link href='/products?sort=newest' className='btn btn-outline'>
              すべて見る
            </Link>
          </div>

          <div className='product-grid'>
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* セール商品セクション */}
      {saleProducts.length > 0 && (
        <section className='py-12 bg-gradient-to-r from-red-50 to-pink-50'>
          <div className='container mx-auto px-4'>
            <div className='text-center mb-8'>
              <div
                className='inline-flex items-center px-4 py-2 bg-red-600 text-white
                            rounded-full text-sm font-medium mb-4'
              >
                <span className='animate-pulse mr-2'>🔥</span>
                限定セール開催中
              </div>
              <h2 className='text-3xl font-bold text-gray-900 mb-4'>セール商品</h2>
              <p className='text-gray-600 max-w-2xl mx-auto'>
                お得な価格で購入できる商品を集めました。この機会をお見逃しなく！
              </p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {saleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className='text-center mt-8'>
              <Link href='/products?sale=true' className='btn btn-primary btn-lg'>
                セール商品をすべて見る
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 特集セクション */}
      <section className='py-12 bg-white'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {/* 特集1 */}
            <div className='relative rounded-lg overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white'>
              <div className='absolute inset-0 bg-black opacity-20' />
              <div className='relative p-8'>
                <h3 className='text-2xl font-bold mb-4'>最新テクノロジー特集</h3>
                <p className='mb-6 text-blue-100'>
                  次世代の技術を搭載した最新の電子機器をご紹介。 スマートフォンからノートパソコンまで。
                </p>
                <Link
                  href='/categories/electronics'
                  className='inline-flex items-center px-6 py-3 bg-white text-blue-600
                           rounded-md font-medium hover:bg-gray-100 transition-colors'
                >
                  詳細を見る
                  <svg className='ml-2 h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                  </svg>
                </Link>
              </div>
            </div>

            {/* 特集2 */}
            <div className='relative rounded-lg overflow-hidden bg-gradient-to-r from-green-500 to-teal-600 text-white'>
              <div className='absolute inset-0 bg-black opacity-20' />
              <div className='relative p-8'>
                <h3 className='text-2xl font-bold mb-4'>エコフレンドリー商品</h3>
                <p className='mb-6 text-green-100'>環境に配慮した商品を厳選してお届け。 持続可能な未来のための選択。</p>
                <Link
                  href='/products?tags=環境配慮'
                  className='inline-flex items-center px-6 py-3 bg-white text-green-600
                           rounded-md font-medium hover:bg-gray-100 transition-colors'
                >
                  詳細を見る
                  <svg className='ml-2 h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* お客様の声セクション */}
      <section className='py-12 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-8'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>お客様の声</h2>
            <p className='text-gray-600 max-w-2xl mx-auto'>
              実際にご利用いただいたお客様からの嬉しいお声をご紹介します。
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {[
              {
                name: '田中様',
                comment: '商品の品質が素晴らしく、配送も迅速でした。また利用したいと思います。',
                rating: 5,
                product: 'スマートフォン',
              },
              {
                name: '佐藤様',
                comment: 'サイトが使いやすく、欲しい商品がすぐに見つかりました。',
                rating: 5,
                product: 'ノートパソコン',
              },
              {
                name: '山田様',
                comment: 'カスタマーサポートの対応が丁寧で安心して購入できました。',
                rating: 4,
                product: 'ヘッドホン',
              },
            ].map((review, index) => (
              <div key={index} className='bg-white p-6 rounded-lg shadow-md'>
                <div className='flex items-center mb-4'>
                  <div className='flex text-yellow-400'>
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`}
                        viewBox='0 0 20 20'
                      >
                        <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                      </svg>
                    ))}
                  </div>
                  <span className='ml-2 text-sm text-gray-600'>{review.product}</span>
                </div>
                <p className='text-gray-700 mb-4'>"{review.comment}"</p>
                <p className='text-sm font-medium text-gray-900'>{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ニュースレターセクション */}
      <NewsletterSection />
    </div>
  )
}
