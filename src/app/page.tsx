import Link from 'next/link'
import { PostCard } from '@/components/blog/PostCard'
import { getAllPosts } from '@/lib/markdown'

export const metadata = {
  title: 'ホーム',
  description: '最新の技術情報、プログラミング、Web開発に関する記事をお届けするテックブログです。',
}

export default async function HomePage() {
  const posts = await getAllPosts()
  const latestPosts = posts.slice(0, 6)
  const featuredPost = posts[0]

  return (
    <div className='min-h-screen'>
      {/* ヒーローセクション */}
      <section className='bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20'>
        <div className='container mx-auto px-4 text-center'>
          <h1 className='text-5xl font-bold mb-6'>Tech Blog</h1>
          <p className='text-xl mb-8 max-w-2xl mx-auto'>
            最新の技術トレンド、プログラミングのベストプラクティス、Web開発のノウハウを発信しています
          </p>
          <Link
            href='/blog'
            className='inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors'
          >
            記事を読む
          </Link>
        </div>
      </section>

      {/* 注目記事 */}
      {featuredPost && (
        <section className='py-16 bg-gray-50'>
          <div className='container mx-auto px-4'>
            <h2 className='text-3xl font-bold text-center mb-12'>注目の記事</h2>
            <div className='max-w-4xl mx-auto'>
              <article className='bg-white rounded-lg shadow-lg overflow-hidden'>
                {featuredPost.coverImage && (
                  <Link href={`/blog/${featuredPost.slug}`}>
                    <img src={featuredPost.coverImage} alt={featuredPost.title} className='w-full h-64 object-cover' />
                  </Link>
                )}
                <div className='p-8'>
                  <div className='flex gap-2 mb-4'>
                    {featuredPost.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className='text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full'>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className='text-2xl font-bold mb-4 hover:text-blue-600'>
                    <Link href={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
                  </h3>
                  <p className='text-gray-600 mb-6 text-lg'>{featuredPost.excerpt}</p>
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className='inline-flex items-center text-blue-600 hover:underline font-medium'
                  >
                    記事を読む
                    <svg className='ml-2 h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                    </svg>
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </section>
      )}

      {/* 最新記事 */}
      <section className='py-16'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold mb-4'>最新記事</h2>
            <p className='text-gray-600 max-w-2xl mx-auto'>
              プログラミング、Web開発、技術トレンドに関する最新の記事をお届けします
            </p>
          </div>

          {latestPosts.length > 0 ? (
            <>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {latestPosts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
              <div className='text-center mt-12'>
                <Link
                  href='/blog'
                  className='inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors'
                >
                  すべての記事を見る
                </Link>
              </div>
            </>
          ) : (
            <p className='text-center text-gray-600'>記事がまだありません。</p>
          )}
        </div>
      </section>

      {/* カテゴリー */}
      <section className='py-16 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-12'>人気のトピック</h2>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto'>
            {[
              'Next.js',
              'React',
              'TypeScript',
              'Web開発',
              'パフォーマンス',
              'JavaScript',
              'プログラミング',
              'デプロイメント',
            ].map((topic) => (
              <Link
                key={topic}
                href={`/blog?tag=${topic}`}
                className='bg-white p-4 rounded-lg text-center hover:shadow-md transition-shadow'
              >
                <span className='text-gray-800 font-medium'>{topic}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
