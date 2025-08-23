import type { MDXComponents } from 'mdx/types'

// 文字列からslugを生成する関数
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g, '') // 英数字とひらがな・カタカナ・漢字のみ
    .replace(/\s+/g, '-')
    .trim()
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => {
      const id = typeof children === 'string' ? generateSlug(children) : undefined
      return (
        <h1 id={id} className="text-4xl font-bold mb-6 text-gray-900">
          {children}
        </h1>
      )
    },
    h2: ({ children }) => {
      const id = typeof children === 'string' ? generateSlug(children) : undefined
      return (
        <h2 id={id} className="text-3xl font-semibold mb-4 text-gray-800">
          {children}
        </h2>
      )
    },
    h3: ({ children }) => {
      const id = typeof children === 'string' ? generateSlug(children) : undefined
      return (
        <h3 id={id} className="text-2xl font-medium mb-3 text-gray-700">
          {children}
        </h3>
      )
    },
    p: ({ children }) => {
      // pタグの代わりにdivを使用してネストエラーを防ぐ
      return (
        <div className="mb-4 text-gray-600 leading-relaxed prose-p">{children}</div>
      );
    },
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-2 text-gray-600">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-600">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="text-gray-600">{children}</li>
    ),
    a: ({ href, children }) => (
      <a href={href} className="text-blue-600 hover:text-blue-800 underline">
        {children}
      </a>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 mb-4">
        {children}
      </blockquote>
    ),
    code: ({ children, className, ...props }) => {
      // preタグ内のcodeタグかどうかを確認（シンタックスハイライト用）
      const isInPre = className?.includes('hljs') || className?.includes('language-');
      if (isInPre) {
        return (
          <code className={`${className || ''} block`} {...props}>
            {children}
          </code>
        );
      }
      // インラインコード（CSSで既にスタイル適用済み）
      return (
        <code {...props}>
          {children}
        </code>
      );
    },
    pre: ({ children, className }) => (
      <pre className={`overflow-x-auto mb-6 text-sm leading-relaxed ${className || ''}`}>
        {children}
      </pre>
    ),
    ...components,
  }
}