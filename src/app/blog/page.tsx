import { PostCard } from '@/components/blog/PostCard'
import { getAllPosts } from '@/lib/markdown'
import type { Metadata } from 'next'

// メタデータを設定
export const metadata: Metadata = {
  title: 'ブログ記事一覧',
  description: 'Tech Blogに投稿されたすべての記事の一覧です。',
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-4xl font-bold mb-8 text-center'>ブログ記事一覧</h1>

        {posts.length === 0 ? (
          <p className='text-center text-gray-500 text-lg'>まだ記事がありません。</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}