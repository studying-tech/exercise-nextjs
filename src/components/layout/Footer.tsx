import Link from 'next/link'
// import { getAllTags } from '@/lib/posts' // カテゴリーを動的に生成する場合に必要

export function Footer() {
  const currentYear = new Date().getFullYear()

  // フッターリンクを定義
  const footerLinks = [
    {
      title: 'コンテンツ',
      links: [
        { name: 'ブログ', href: '/blog' },
        { name: 'このサイトについて', href: '/about' },
        // 必要に応じてさらにコンテンツリンクを追加
      ],
    },
    {
      title: 'カテゴリー',
      links: [
        // ヒント: ここを動的にgetAllTags()で生成することも可能
        { name: 'Next.js', href: '/blog?tag=Next.js' },
        { name: 'React', href: '/blog?tag=React' },
        { name: 'Web開発', href: '/blog?tag=Web開発' },
      ],
    },
    {
      title: 'リンク',
      links: [
        { name: 'GitHub', href: 'https://github.com/your-repo' }, // プレースホルダー
        { name: 'Twitter', href: 'https://twitter.com/your-handle' }, // プレースホルダー
      ],
    },
  ]

  return (
    <footer className='bg-gray-900 text-white mt-auto'>
      <div className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* サイト情報セクション */}
          <div className='md:col-span-1'>
            <Link href='/' className='text-2xl font-bold mb-4 block hover:text-blue-400 transition-colors'>
              Tech Blog
            </Link>
            <p className='text-gray-400'>
              最新の技術情報と開発の知見を共有するブログです。
            </p>
          </div>

          {/* フッターリンクセクション */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className='text-lg font-semibold mb-4'>{section.title}</h3>
              <ul className='space-y-2'>
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className='text-gray-400 hover:text-blue-400 transition-colors'>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* コピーライトセクション */}
        <div className='border-t border-gray-800 mt-8 pt-8 text-center text-gray-400'>
          <p>&copy; {currentYear} Tech Blog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}