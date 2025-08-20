'use client'

import Link from 'next/link'
import { useState } from 'react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // TODO: ナビゲーションメニューの項目を定義
  const navigation = [
    // ヒント: { name: 'ホーム', href: '/' },
    // { name: 'ブログ', href: '/blog' },
    // { name: 'About', href: '/about' },
  ]

  return (
    <header className='bg-white shadow-sm border-b'>
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          {/* TODO: サイトロゴ/タイトル */}
          {/* ヒント:
              <Link href='/' className='text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors'>
                Tech Blog
              </Link>
          */}

          {/* TODO: デスクトップナビゲーション */}
          <nav className='hidden md:flex space-x-8'>{/* ヒント: navigation.map()を使用してリンクを生成 */}</nav>

          {/* TODO: モバイルメニューボタン */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            aria-label='メニューを開く'
          >
            {/* TODO: ハンバーガーアイコンと閉じるアイコンを切り替える */}
            {/* ヒント: isMenuOpenの状態に応じてSVGアイコンを表示 */}
          </button>
        </div>

        {/* TODO: モバイルメニュー */}
        {/* ヒント: {isMenuOpen && ( ... )} を使用してメニューを表示/非表示 */}
      </div>
    </header>
  )
}
