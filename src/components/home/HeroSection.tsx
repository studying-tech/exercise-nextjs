/**
 * Next.js Product Catalog - Hero Section Component
 * ヒーローセクションコンポーネント
 */

import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className='relative bg-gradient-to-r from-blue-600 to-purple-700 text-white overflow-hidden'>
      <div className='absolute inset-0 bg-black opacity-20' />
      <div className='relative container mx-auto px-4 py-20 lg:py-32'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          <div className='text-center lg:text-left'>
            <h1 className='text-4xl lg:text-6xl font-bold mb-6 leading-tight'>
              最新商品を
              <span className='block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500'>
                お届け
              </span>
            </h1>
            <p className='text-xl lg:text-2xl mb-8 text-blue-100 leading-relaxed'>
              電子機器、ファッション、ホーム用品まで
              <br />
              豊富な品揃えでお客様をお待ちしています
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'>
              <Link
                href='/products'
                className='bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold
                         hover:bg-gray-100 transition-colors duration-200 text-center'
              >
                商品を見る
              </Link>
              <Link
                href='/categories'
                className='border-2 border-white text-white px-8 py-4 rounded-lg font-semibold
                         hover:bg-white hover:text-blue-600 transition-colors duration-200 text-center'
              >
                カテゴリー一覧
              </Link>
            </div>
          </div>

          <div className='relative'>
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-4'>
                <div className='bg-white p-4 rounded-lg shadow-xl transform rotate-3 hover:rotate-6 transition-transform duration-300'>
                  <Image
                    src='https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop'
                    alt='スマートフォン'
                    width={200}
                    height={200}
                    className='rounded-lg'
                  />
                </div>
                <div className='bg-white p-4 rounded-lg shadow-xl transform -rotate-2 hover:-rotate-3 transition-transform duration-300'>
                  <Image
                    src='https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop'
                    alt='ヘッドホン'
                    width={200}
                    height={200}
                    className='rounded-lg'
                  />
                </div>
              </div>
              <div className='space-y-4 mt-8'>
                <div className='bg-white p-4 rounded-lg shadow-xl transform -rotate-1 hover:rotate-1 transition-transform duration-300'>
                  <Image
                    src='https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop'
                    alt='ノートパソコン'
                    width={200}
                    height={200}
                    className='rounded-lg'
                  />
                </div>
                <div className='bg-white p-4 rounded-lg shadow-xl transform rotate-2 hover:rotate-4 transition-transform duration-300'>
                  <Image
                    src='https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=200&fit=crop'
                    alt='スニーカー'
                    width={200}
                    height={200}
                    className='rounded-lg'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 装飾的な波形 */}
      <div className='absolute bottom-0 left-0 right-0'>
        <svg viewBox='0 0 1200 120' preserveAspectRatio='none' className='w-full h-12 fill-current text-gray-50'>
          <path
            d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z'
            opacity='.25'
          />
          <path
            d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z'
            opacity='.5'
          />
          <path d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z' />
        </svg>
      </div>
    </section>
  )
}
