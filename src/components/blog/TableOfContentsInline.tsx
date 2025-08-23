interface TocItem {
  id: string
  title: string
  level: number
}

interface TableOfContentsInlineProps {
  content: string
}

export default function TableOfContentsInline({ content }: TableOfContentsInlineProps) {
  const headings: TocItem[] = []

  // 生のMarkdownコンテンツから見出しを抽出
  const headingRegex = /^(#{1,3})\s+(.+)$/gm
  let match
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const title = match[2].trim()
    const id = generateSlug(title)
    headings.push({ id, title, level })
  }

  if (headings.length === 0) {
    return null
  }

  return (
    <nav className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <span className="mr-2">📑</span>
        目次
      </h3>
      <ul className="space-y-2">
        {headings.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`
                block py-1 px-2 rounded text-sm transition-colors hover:bg-blue-50 hover:text-blue-700
                ${item.level === 1 ? 'font-medium text-gray-900' : ''}
                ${item.level === 2 ? 'ml-4 text-gray-700' : ''}
                ${item.level === 3 ? 'ml-8 text-gray-600' : ''}
              `}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

// 文字列からslugを生成する関数
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g, '') // 英数字とひらがな・カタカナ・漢字のみ
    .replace(/\s+/g, '-')
    .trim()
}