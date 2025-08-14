import Link from 'next/link'
import type { PostData } from '@/types'

interface PostCardProps {
  post: PostData
}

export function PostCard({ post }: PostCardProps) {
  // TODO: 記事カードコンポーネントを実装
  // ヒント:
  // 1. カバー画像があれば表示（post.coverImage）
  // 2. タグを表示（最初の3つまで）
  // 3. タイトルをリンクとして表示（/blog/[slug]へ）
  // 4. 要約（excerpt）を表示
  // 5. 著者名と日付を表示

  return (
    <article className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow'>
      {/* TODO: カバー画像 */}

      <div className='p-6'>
        {/* TODO: タグ */}
        <div className='flex gap-2 mb-3'>{/* ヒント: post.tags.slice(0, 3).map() を使用 */}</div>

        {/* TODO: タイトル */}
        <h2 className='text-xl font-bold mb-2 hover:text-blue-600'>{/* ヒント: Link コンポーネントを使用 */}</h2>

        {/* TODO: 要約 */}

        {/* TODO: 著者と日付 */}
        <div className='flex items-center justify-between text-sm text-gray-500'>
          {/* ヒント: formatDate関数を使用 */}
        </div>
      </div>
    </article>
  )
}
