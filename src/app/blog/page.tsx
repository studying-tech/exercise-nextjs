import { PostCard } from '@/components/blog/PostCard'
import { getAllPosts } from '@/lib/markdown'

// TODO: メタデータを設定
export const metadata = {
  // ヒント: title, descriptionを設定
}

export default async function BlogPage() {
  // TODO: すべての記事を取得
  const posts = [] // await getAllPosts();

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-4xl font-bold mb-8'>ブログ記事</h1>

        {/* TODO: 記事の有無をチェックして表示を切り替える */}
        {/* ヒント: posts.length === 0 の場合とそうでない場合で分岐 */}

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {/* TODO: PostCardコンポーネントを使用して記事を表示 */}
          {/* ヒント: posts.map((post) => <PostCard key={post.slug} post={post} />) */}
        </div>
      </div>
    </div>
  )
}
