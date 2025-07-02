/**
 * Next.js Product Catalog - Root Layout
 * アプリケーションのルートレイアウト
 */

import type { Metadata } from 'next'
import type React from 'react'
import './globals.css'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'

export const metadata: Metadata = {
  title: {
    default: '商品カタログ - 最新商品をお届け',
    template: '%s | 商品カタログ',
  },
  description: '最新の商品情報をお届けする商品カタログサイト。電子機器、ファッション、ホーム用品など豊富な品揃え。',
  keywords: ['商品カタログ', 'オンラインショップ', '電子機器', 'ファッション', 'ホーム用品', '最新商品'],
  authors: [{ name: '商品カタログ' }],
  creator: '商品カタログ',
  publisher: '商品カタログ',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://product-catalog.example.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: '商品カタログ - 最新商品をお届け',
    description: '最新の商品情報をお届けする商品カタログサイト',
    url: 'https://product-catalog.example.com',
    siteName: '商品カタログ',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '商品カタログ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '商品カタログ - 最新商品をお届け',
    description: '最新の商品情報をお届けする商品カタログサイト',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja' className='scroll-smooth'>
      <body className='min-h-screen bg-gray-50 flex flex-col antialiased'>
        <Header />
        <main className='flex-1 container mx-auto px-4 py-6'>{children}</main>
        <Footer />

        {/* スキップリンク（アクセシビリティ対応） */}
        <a
          href='#main-content'
          className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4
                     bg-blue-600 text-white px-4 py-2 rounded-md z-50'
        >
          メインコンテンツへスキップ
        </a>

        {/* ページトップに戻るボタン */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className='fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white
                     p-3 rounded-full shadow-lg transition-colors duration-200 z-40
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          aria-label='ページトップに戻る'
        >
          <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 10l7-7m0 0l7 7m-7-7v18' />
          </svg>
        </button>
      </body>
    </html>
  )
}

// エラーバウンダリー
export function ErrorBoundary({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center'>
        <div className='mb-4'>
          <svg className='mx-auto h-12 w-12 text-red-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z'
            />
          </svg>
        </div>
        <h2 className='text-xl font-semibold text-gray-900 mb-2'>エラーが発生しました</h2>
        <p className='text-gray-600 mb-4'>申し訳ございません。ページの読み込み中にエラーが発生しました。</p>
        <button
          onClick={reset}
          className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md
                     transition-colors duration-200 focus:outline-none focus:ring-2
                     focus:ring-blue-500 focus:ring-offset-2'
        >
          再試行
        </button>
      </div>
    </div>
  )
}
