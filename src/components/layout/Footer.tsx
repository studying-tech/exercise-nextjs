import Link from "next/link";
import { getAllTags } from '@/lib/posts'

export async function Footer() {
  const currentYear = new Date().getFullYear();
  const tags = await getAllTags();

  // フッターリンクを定義
  const footerLinks = [
    {
      title: "コンテンツ",
      links: [
        { name: "ブログ", href: "/blog" },
        { name: "このサイトについて", href: "/about" },
        // 必要に応じてさらにコンテンツリンクを追加
      ],
    },
    {
      title: "リンク",
      links: [
        { name: "GitHub", href: "https://github.com/your-repo" }, // プレースホルダー
        { name: "Twitter", href: "https://twitter.com/your-handle" }, // プレースホルダー
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:max-w-4xl md:mx-auto md:text-center">
          {/* サイト情報セクション */}
          <div>
            <Link
              href="/"
              className="text-lg font-semibold mb-4 block hover:text-blue-400 transition-colors"
            >
              Tech Blog
            </Link>
            <p className="text-gray-400 text-sm">
              最新の技術情報と開発の知見を共有するブログです。
            </p>
          </div>

          {/* フッターリンクセクション */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* タグセクション */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <h3 className="text-lg font-semibold mb-4 text-center text-white">タグ</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {tags.map((tag) => (
              <Link
                key={tag.name}
                href={`/blog/tag/${tag.name}`}
                className="bg-gray-800 text-gray-300 px-3 py-2 rounded-full text-sm border border-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300"
              >
                {tag.name}
                <span className="ml-2 bg-gray-700 text-gray-300 text-xs px-2 py-0.5 rounded-full">
                  {tag.count}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* コピーライトセクション */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Tech Blog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
