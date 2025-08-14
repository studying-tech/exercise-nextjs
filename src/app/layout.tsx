import type { Metadata } from 'next'
import type React from 'react'
import './globals.css'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'

export const metadata: Metadata = {
  title: {
    default: 'Tech Blog - 最新の技術情報をお届け',
    template: '%s | Tech Blog',
  },
  description: '最新の技術情報、プログラミング、Web開発に関する記事をお届けするテックブログです。',
  keywords: ['プログラミング', 'Web開発', 'Next.js', 'React', 'TypeScript', 'JavaScript'],
  authors: [{ name: 'Tech Blog Team' }],
  creator: 'Tech Blog',
  publisher: 'Tech Blog',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://techblog.example.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Tech Blog - 最新の技術情報をお届け',
    description: '最新の技術情報、プログラミング、Web開発に関する記事をお届けするテックブログです。',
    url: 'https://techblog.example.com',
    siteName: 'Tech Blog',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Tech Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tech Blog - 最新の技術情報をお届け',
    description: '最新の技術情報、プログラミング、Web開発に関する記事をお届けするテックブログです。',
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
