import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  // TODO: フッターリンクを定義
  const footerLinks = [
    {
      title: 'コンテンツ',
      links: [
        // ヒント: { name: 'ブログ', href: '/blog' },
        // { name: 'About', href: '/about' },
      ],
    },
    {
      title: 'カテゴリー',
      links: [
        // ヒント: 人気のタグへのリンクを追加
        // { name: 'Next.js', href: '/blog?tag=Next.js' },
      ],
    },
    {
      title: 'リンク',
      links: [
        // ヒント: 外部リンク（GitHub、Twitter等）
      ],
    },
  ]

  return (
    <footer className='bg-gray-900 text-white mt-auto'>
      <div className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* TODO: サイト情報セクション */}
          <div className='md:col-span-1'>
            {/* ヒント: サイトタイトルと説明を表示 */}
            {/* 
              <Link href='/' className='text-2xl font-bold mb-4 block hover:text-blue-400 transition-colors'>
                Tech Blog
              </Link>
              <p className='text-gray-400'>
                説明文...
              </p>
            */}
          </div>

          {/* TODO: フッターリンクセクション */}
          {/* ヒント: footerLinks.map()を使用してセクションを生成 */}
        </div>

        {/* TODO: コピーライトセクション */}
        <div className='border-t border-gray-800 mt-8 pt-8 text-center text-gray-400'>
          {/* ヒント: <p>&copy; {currentYear} Tech Blog. All rights reserved.</p> */}
        </div>
      </div>
    </footer>
  )
}
