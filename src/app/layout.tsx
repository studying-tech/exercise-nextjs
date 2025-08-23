import type { Metadata } from 'next'
import type React from 'react'
import './globals.css'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'

// メタデータを設定
export const metadata: Metadata = {
  title: {
    default: 'Tech Blog - 最新の技術情報をお届け',
    template: '%s | Tech Blog',
  },
  description: '最新のプログラミング技術や開発トレンドについて発信するブログです。',
  keywords: ['プログラミング', 'Next.js', 'React', 'Web開発', '技術ブログ'],
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    // TODO: 本番環境のURLを設定してください
    // url: 'https://example.com',
    siteName: 'Tech Blog',
    title: 'Tech Blog - 最新の技術情報をお届け',
    description: '最新のプログラミング技術や開発トレンドについて発信するブログです。',
    images: [
      {
        url: '/ogp.png', // OGP画像のパス
        width: 1200,
        height: 630,
        alt: 'Tech Blog OGP Image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tech Blog - 最新の技術情報をお届け',
    description: '最新のプログラミング技術や開発トレンドについて発信するブログです。',
    // TODO: ご自身のTwitterアカウントの@ユーザー名を設定してください
    // site: '@YourTwitterAccount',
    images: ['/ogp.png'], // OGP画像のパス
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
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja' className='scroll-smooth'>
      <body className='min-h-screen bg-gray-50 flex flex-col antialiased'>
        <Header />
        <main className='flex-1'>{children}</main>
        <Footer />
      </body>
    </html>
  )
}