import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mb-6 text-gray-900">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold mb-4 text-gray-800">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-medium mb-3 text-gray-700">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="mb-4 text-gray-600 leading-relaxed">{children}</p>
    ),
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
    code: ({ children, ...props }) => {
      // preタグ内のcodeタグかどうかを確認
      const isInPre = props.className?.includes('language-');
      if (isInPre) {
        return (
          <code className="text-white font-mono">
            {children}
          </code>
        );
      }
      return (
        <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">
          {children}
        </code>
      );
    },
    pre: ({ children }) => (
      <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mb-4">
        {children}
      </pre>
    ),
    ...components,
  }
}