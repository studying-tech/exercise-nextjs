/**
 * Next.js Product Catalog - Footer Component
 * フッターコンポーネント
 */

import { EnvelopeIcon, MapPinIcon, PhoneIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'カテゴリー',
      links: [
        { name: '電子機器', href: '/categories/electronics' },
        { name: 'ファッション', href: '/categories/fashion' },
        { name: 'ホーム・インテリア', href: '/categories/home' },
        { name: '書籍・メディア', href: '/categories/books' },
      ],
    },
    {
      title: 'ヘルプ',
      links: [
        { name: 'よくある質問', href: '/faq' },
        { name: 'お問い合わせ', href: '/contact' },
        { name: '配送について', href: '/shipping' },
        { name: '返品・交換', href: '/returns' },
      ],
    },
    {
      title: '会社情報',
      links: [
        { name: '会社概要', href: '/about' },
        { name: 'プライバシーポリシー', href: '/privacy' },
        { name: '利用規約', href: '/terms' },
        { name: 'サイトマップ', href: '/sitemap' },
      ],
    },
  ]

  const contactInfo = [
    {
      icon: EnvelopeIcon,
      label: 'メールアドレス',
      value: 'info@product-catalog.com',
      href: 'mailto:info@product-catalog.com',
    },
    {
      icon: PhoneIcon,
      label: '電話番号',
      value: '03-1234-5678',
      href: 'tel:03-1234-5678',
    },
    {
      icon: MapPinIcon,
      label: '住所',
      value: '東京都渋谷区1-2-3',
      href: 'https://maps.google.com/?q=東京都渋谷区1-2-3',
    },
  ]

  return (
    <footer className='bg-gray-900 text-white'>
      <div className='container mx-auto px-4 py-12'>
        {/* メインフッターコンテンツ */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8'>
          {/* ブランド情報 */}
          <div className='lg:col-span-1'>
            <Link
              href='/'
              className='flex items-center space-x-2 text-xl font-bold mb-4 hover:text-blue-400 transition-colors'
            >
              <ShoppingBagIcon className='h-8 w-8' />
              <span>商品カタログ</span>
            </Link>
            <p className='text-gray-300 mb-4 leading-relaxed'>
              最新の商品情報をお届けする商品カタログサイトです。
              電子機器からファッション、ホーム用品まで幅広い商品を取り扱っています。
            </p>

            {/* ソーシャルメディアリンク */}
            <div className='flex space-x-4'>
              <a
                href='https://twitter.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-400 hover:text-white transition-colors'
                aria-label='Twitter'
              >
                <svg className='h-6 w-6' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' />
                </svg>
              </a>
              <a
                href='https://facebook.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-400 hover:text-white transition-colors'
                aria-label='Facebook'
              >
                <svg className='h-6 w-6' fill='currentColor' viewBox='0 0 24 24'>
                  <path
                    fillRule='evenodd'
                    d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z'
                    clipRule='evenodd'
                  />
                </svg>
              </a>
              <a
                href='https://instagram.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-400 hover:text-white transition-colors'
                aria-label='Instagram'
              >
                <svg className='h-6 w-6' fill='currentColor' viewBox='0 0 24 24'>
                  <path
                    fillRule='evenodd'
                    d='M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.328-1.297C4.243 14.794 3.8 13.643 3.8 12.346s.443-2.448 1.321-3.329c.88-.88 2.031-1.32 3.328-1.32s2.447.44 3.328 1.32c.88.881 1.321 2.032 1.321 3.329s-.441 2.448-1.321 3.329c-.881.807-2.031 1.297-3.328 1.297zm7.718 0c-1.297 0-2.448-.49-3.329-1.297-.88-.881-1.32-2.032-1.32-3.329s.44-2.448 1.32-3.329c.881-.88 2.032-1.32 3.329-1.32s2.447.44 3.328 1.32c.88.881 1.321 2.032 1.321 3.329s-.441 2.448-1.321 3.329c-.881.807-2.031 1.297-3.328 1.297z'
                    clipRule='evenodd'
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* フッターセクション */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className='text-lg font-semibold mb-4'>{section.title}</h3>
              <ul className='space-y-2'>
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className='text-gray-300 hover:text-white transition-colors'>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 連絡先情報 */}
        <div className='border-t border-gray-700 pt-8 mb-8'>
          <h3 className='text-lg font-semibold mb-4'>お問い合わせ</h3>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {contactInfo.map((contact) => (
              <a
                key={contact.label}
                href={contact.href}
                className='flex items-center space-x-3 text-gray-300 hover:text-white transition-colors'
                target={contact.href.startsWith('http') ? '_blank' : undefined}
                rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                <contact.icon className='h-5 w-5 flex-shrink-0' />
                <div>
                  <div className='text-sm text-gray-400'>{contact.label}</div>
                  <div>{contact.value}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ニュースレター登録 */}
        <div className='border-t border-gray-700 pt-8 mb-8'>
          <div className='max-w-md'>
            <h3 className='text-lg font-semibold mb-2'>ニュースレター</h3>
            <p className='text-gray-300 mb-4'>最新商品情報やお得なキャンペーン情報をお届けします。</p>
            <form className='flex flex-col sm:flex-row gap-2'>
              <input
                type='email'
                placeholder='メールアドレスを入力'
                className='flex-1 px-4 py-2 bg-gray-800 border border-gray-600 rounded-md
                         text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500
                         focus:border-blue-500 transition-colors'
                aria-label='ニュースレター登録用メールアドレス'
              />
              <button
                type='submit'
                className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md
                         transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500
                         focus:ring-offset-2 focus:ring-offset-gray-900'
              >
                登録
              </button>
            </form>
          </div>
        </div>

        {/* コピーライト */}
        <div className='border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center'>
          <p className='text-gray-400 text-sm'>&copy; {currentYear} 商品カタログ. All rights reserved.</p>
          <div className='flex space-x-4 mt-4 md:mt-0'>
            <Link href='/privacy' className='text-gray-400 hover:text-white text-sm transition-colors'>
              プライバシーポリシー
            </Link>
            <Link href='/terms' className='text-gray-400 hover:text-white text-sm transition-colors'>
              利用規約
            </Link>
            <Link href='/accessibility' className='text-gray-400 hover:text-white text-sm transition-colors'>
              アクセシビリティ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
