interface TocItem {
  id: string
  title: string
  level: number
}

interface TableOfContentsInlineProps {
  headings: { id: string; text: string; level: number }[]
}

export default function TableOfContentsInline({ headings }: TableOfContentsInlineProps) {
  if (headings.length === 0) {
    return null
  }

  // headingsをTocItem形式に変換
  const tocItems: TocItem[] = headings.map(heading => ({
    id: heading.id,
    title: heading.text,
    level: heading.level
  }))

  return (
    <nav className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <span className="mr-2">📑</span>
        目次
      </h3>
      <ul className="space-y-2">
        {tocItems.map((item) => (
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