import type { Metadata } from 'next'
import type React from 'react'
import './globals.css'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'

// TODO: メタデータを設定
export const metadata: Metadata = {
  title: {
    // ヒント: defaultとtemplateを設定
    // default: 'Tech Blog - 最新の技術情報をお届け',
    // template: '%s | Tech Blog',
  },
  description: '', // TODO: ブログの説明を追加
  // TODO: その他のメタデータ（keywords, openGraph, twitter等）を追加
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja' className='scroll-smooth'>
      <body className='min-h-screen bg-gray-50 flex flex-col antialiased'>
        {/* TODO: HeaderとFooterコンポーネントを配置 */}
        {/* ヒント: 
            <Header />
            <main className='flex-1'>{children}</main>
            <Footer />
        */}
      </body>
    </html>
  )
}
