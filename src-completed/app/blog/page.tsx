import { PostCard } from '@/components/blog/PostCard'
import { getAllPosts } from '@/lib/markdown'

export const metadata = {
  title: 'ブログ記事一覧',
  description: '技術ブログの記事一覧です。Web開発、プログラミング、最新技術について発信しています。',
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-4xl font-bold mb-8'>ブログ記事</h1>

        {posts.length === 0 ? (
          <p className='text-gray-600'>記事がまだありません。</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
