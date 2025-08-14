import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    {
      title: 'コンテンツ',
      links: [
        { name: 'ブログ', href: '/blog' },
        { name: 'About', href: '/about' },
      ],
    },
    {
      title: 'カテゴリー',
      links: [
        { name: 'Next.js', href: '/blog?tag=Next.js' },
        { name: 'React', href: '/blog?tag=React' },
        { name: 'TypeScript', href: '/blog?tag=TypeScript' },
        { name: 'Web開発', href: '/blog?tag=Web開発' },
      ],
    },
    {
      title: 'リンク',
      links: [
        { name: 'GitHub', href: 'https://github.com' },
        { name: 'Twitter', href: 'https://twitter.com' },
      ],
    },
  ]

  return (
    <footer className='bg-gray-900 text-white mt-auto'>
      <div className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          <div className='md:col-span-1'>
            <Link href='/' className='text-2xl font-bold mb-4 block hover:text-blue-400 transition-colors'>
              Tech Blog
            </Link>
            <p className='text-gray-400'>最新の技術情報、プログラミング、Web開発に関する記事をお届けします。</p>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className='text-lg font-semibold mb-4'>{section.title}</h3>
              <ul className='space-y-2'>
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className='text-gray-400 hover:text-white transition-colors'
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className='border-t border-gray-800 mt-8 pt-8 text-center text-gray-400'>
          <p>&copy; {currentYear} Tech Blog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
