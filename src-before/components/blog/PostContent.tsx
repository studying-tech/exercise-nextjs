'use client'

interface PostContentProps {
  content: string
}

export function PostContent({ content }: PostContentProps) {
  // TODO: 記事本文を表示するコンポーネントを実装
  // ヒント:
  // 1. dangerouslySetInnerHTMLを使用してHTMLコンテンツを表示
  // 2. proseクラスを使用してTailwind CSSの記事スタイルを適用

  return (
    <div
      className='prose prose-lg max-w-none'
      // TODO: dangerouslySetInnerHTMLを設定
      // ヒント: dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
