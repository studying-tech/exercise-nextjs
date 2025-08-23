import Link from 'next/link'
import { PostCard } from '@/components/blog/PostCard'
import { getAllTags } from '@/lib/posts'
import { getAllPosts } from '@/lib/markdown'

// メタデータを設定
export const metadata = {
  title: 'ホーム',
  description: 'Tech Blogのトップページです。最新記事、注目記事などをチェックできます。',
}

export default async function HomePage() {
  const posts = await getAllPosts()
  const latestPosts = posts.slice(0, 6)
  const featuredPost = posts[0] || null
  const tags = await getAllTags()

  return (
    <div className='min-h-screen'>
      {/* ヒーローセクション */}
      <section className='bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20'>
        <div className='container mx-auto px-4 text-center'>
          <h1 className='text-5xl font-bold mb-6'>Tech Blog</h1>
          <p className='text-xl mb-8'>
            最新のプログラミング技術や開発トレンドをわかりやすく解説します。
          </p>
          <Link
            href='/blog'
            className='bg-white text-blue-600 font-bold py-3 px-6 rounded-full hover:bg-gray-100 transition-colors'
          >
            記事一覧へ
          </Link>
        </div>
      </section>

      {/* 注目記事セクション */}
      {featuredPost && (
        <section className='py-16'>
          <div className='container mx-auto px-4'>
            <h2 className='text-3xl font-bold text-center mb-12'>注目記事</h2>
            <div className='bg-white rounded-2xl shadow-xl overflow-hidden'>
              <Link href={`/blog/${featuredPost.slug}`} className='block group'>
                <div className='md:flex'>
                  <div className='md:w-1/2'>
                    <img
                      src={featuredPost.coverImage}
                      alt={`Cover image for ${featuredPost.title}`}
                      className='h-64 w-full object-cover md:h-full transition-transform duration-300 group-hover:scale-105'
                    />
                  </div>
                  <div className='p-8 md:w-1/2 flex flex-col justify-center'>
                    <p className='text-sm text-gray-500 uppercase tracking-wide'>
                      {new Date(featuredPost.date).toLocaleDateString('ja-JP')}
                    </p>
                    <h3 className='text-3xl font-bold my-2 group-hover:text-blue-600 transition-colors'>
                      {featuredPost.title}
                    </h3>
                    <p className='text-gray-700 text-lg mb-4'>{featuredPost.excerpt}</p>
                    <span className='text-blue-600 font-semibold'>続きを読む &rarr;</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 最新記事セクション */}
      <section className='py-16'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold mb-4'>最新記事</h2>
            <p className='text-gray-600'>最近投稿された記事の一覧です。</p>
          </div>

          {latestPosts.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {latestPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className='text-center text-gray-500'>まだ記事がありません。</p>
          )}

          <div className='text-center mt-12'>
            <Link
              href='/blog'
              className='bg-blue-600 text-white font-bold py-3 px-6 rounded-full hover:bg-blue-700 transition-colors'
            >
              すべての記事を見る
            </Link>
          </div>
        </div>
      </section>

      {/* カテゴリー（トピック）セクション */}
      <section className='py-16 bg-gray-100'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-12'>人気のトピック</h2>
          <div className='flex flex-wrap justify-center gap-4'>
            {tags.map((tag) => (
              <Link
                key={tag.name}
                href={`/blog/tag/${tag.name}`}
                className='bg-white text-gray-700 px-5 py-2 rounded-full text-lg shadow-md hover:shadow-lg hover:bg-blue-500 hover:text-white transition-all duration-300'
              >
                {tag.name}
                <span className='ml-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full'>
                  {tag.count}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}