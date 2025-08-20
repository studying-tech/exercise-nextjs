import Link from 'next/link'
import { PostCard } from '@/components/blog/PostCard'
import { getAllPosts } from '@/lib/markdown'

// TODO: メタデータを設定
export const metadata = {
  // ヒント: title, descriptionを設定
}

export default async function HomePage() {
  // TODO: すべての記事を取得して、最新の6件と注目記事を選ぶ
  const posts = [] // await getAllPosts();
  const latestPosts = [] // posts.slice(0, 6);
  const featuredPost = null // posts[0];

  return (
    <div className='min-h-screen'>
      {/* TODO: ヒーローセクション */}
      <section className='bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20'>
        <div className='container mx-auto px-4 text-center'>
          {/* ヒント: サイトタイトル、説明、CTAボタンを配置 */}
          <h1 className='text-5xl font-bold mb-6'>Tech Blog</h1>
          {/* TODO: 説明文とボタンを追加 */}
        </div>
      </section>

      {/* TODO: 注目記事セクション（featuredPostがある場合のみ表示） */}
      {/* ヒント: {featuredPost && ( ... )} を使用 */}

      {/* TODO: 最新記事セクション */}
      <section className='py-16'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold mb-4'>最新記事</h2>
            {/* TODO: 説明文を追加 */}
          </div>

          {/* TODO: 記事の有無をチェックして表示を切り替える */}
          {/* ヒント: latestPosts.length > 0 の場合、PostCardを使用してグリッド表示 */}

          {/* TODO: 「すべての記事を見る」ボタンを追加 */}
        </div>
      </section>

      {/* TODO: カテゴリー（トピック）セクション */}
      <section className='py-16 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-12'>人気のトピック</h2>
          {/* TODO: タグのリストを表示 */}
          {/* ヒント: ['Next.js', 'React', ...].map() を使用 */}
        </div>
      </section>
    </div>
  )
}
