/**
 * Next.js Product Catalog - Header Component
 * ヘッダーコンポーネント
 */

'use client'

import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { getSearchSuggestions } from '@/lib/products'

export default function Header() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  // 検索候補の取得
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.length >= 2) {
        try {
          const suggestions = await getSearchSuggestions(searchQuery)
          setSearchSuggestions(suggestions)
          setShowSuggestions(true)
        } catch (error) {
          console.error('Error fetching suggestions:', error)
          setSearchSuggestions([])
        }
      } else {
        setSearchSuggestions([])
        setShowSuggestions(false)
      }
    }

    const debounceTimer = setTimeout(fetchSuggestions, 300)
    return () => clearTimeout(debounceTimer)
  }, [searchQuery])

  // 外部クリックで検索候補を閉じる
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      setShowSuggestions(false)
      setSearchQuery('')
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(searchQuery)
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSearch(suggestion)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navigation = [
    { name: 'ホーム', href: '/' },
    { name: '電子機器', href: '/categories/electronics' },
    { name: 'ファッション', href: '/categories/fashion' },
    { name: 'ホーム・インテリア', href: '/categories/home' },
    { name: '書籍・メディア', href: '/categories/books' },
    { name: 'お問い合わせ', href: '/contact' },
  ]

  return (
    <header className='bg-white shadow-md sticky top-0 z-50'>
      <div className='container mx-auto px-4'>
        {/* メインヘッダー */}
        <div className='flex items-center justify-between h-16'>
          {/* ロゴ */}
          <div className='flex items-center'>
            <Link
              href='/'
              className='flex items-center space-x-2 text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors'
            >
              <ShoppingBagIcon className='h-8 w-8' />
              <span>商品カタログ</span>
            </Link>
          </div>

          {/* 検索バー */}
          <div className='hidden md:flex flex-1 max-w-lg mx-8' ref={searchRef}>
            <div className='relative w-full'>
              <form onSubmit={handleSearchSubmit} className='relative'>
                <input
                  type='text'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder='商品を検索...'
                  className='w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                           transition-colors'
                  aria-label='商品検索'
                />
                <button
                  type='submit'
                  className='absolute right-2 top-1/2 transform -translate-y-1/2
                           text-gray-400 hover:text-gray-600 transition-colors'
                  aria-label='検索実行'
                >
                  <MagnifyingGlassIcon className='h-5 w-5' />
                </button>
              </form>

              {/* 検索候補 */}
              {showSuggestions && searchSuggestions.length > 0 && (
                <div
                  className='absolute top-full left-0 right-0 mt-1 bg-white border
                               border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto'
                >
                  {searchSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className='w-full text-left px-4 py-2 hover:bg-gray-50
                               transition-colors first:rounded-t-lg last:rounded-b-lg'
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* デスクトップナビゲーション */}
          <nav className='hidden lg:flex space-x-6'>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className='text-gray-700 hover:text-blue-600 transition-colors font-medium'
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* モバイルメニューボタン */}
          <button
            onClick={toggleMenu}
            className='lg:hidden p-2 rounded-md text-gray-700 hover:text-blue-600
                     hover:bg-gray-100 transition-colors'
            aria-label='メニューを開く'
          >
            {isMenuOpen ? <XMarkIcon className='h-6 w-6' /> : <Bars3Icon className='h-6 w-6' />}
          </button>
        </div>

        {/* モバイル検索バー */}
        <div className='md:hidden pb-4' ref={searchRef}>
          <div className='relative'>
            <form onSubmit={handleSearchSubmit} className='relative'>
              <input
                type='text'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='商品を検索...'
                className='w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         transition-colors'
                aria-label='商品検索'
              />
              <button
                type='submit'
                className='absolute right-2 top-1/2 transform -translate-y-1/2
                         text-gray-400 hover:text-gray-600 transition-colors'
                aria-label='検索実行'
              >
                <MagnifyingGlassIcon className='h-5 w-5' />
              </button>
            </form>

            {/* モバイル検索候補 */}
            {showSuggestions && searchSuggestions.length > 0 && (
              <div
                className='absolute top-full left-0 right-0 mt-1 bg-white border
                             border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto'
              >
                {searchSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className='w-full text-left px-4 py-2 hover:bg-gray-50
                             transition-colors first:rounded-t-lg last:rounded-b-lg'
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* モバイルメニュー */}
        {isMenuOpen && (
          <div className='lg:hidden border-t border-gray-200 py-4'>
            <nav className='flex flex-col space-y-2'>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className='px-4 py-2 text-gray-700 hover:text-blue-600
                           hover:bg-gray-50 rounded-md transition-colors'
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
