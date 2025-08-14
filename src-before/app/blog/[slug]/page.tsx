import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PostContent } from '@/components/blog/PostContent'
import { getAllPostSlugs, getPostBySlug } from '@/lib/markdown'
import { formatDate } from '@/lib/posts'

interface PageProps {
  params: {
    slug: string
  }
}

// TODO: 静的生成のためのパラメータを生成
export async function generateStaticParams() {
  // ヒント:
  // 1. getAllPostSlugs()で全スラッグを取得
  // 2. 各スラッグをオブジェクトとして返す
  // 例: return [{ slug: 'post-1' }, { slug: 'post-2' }]

  return []
}

// TODO: メタデータの生成
export async function generateMetadata({ params }: PageProps) {
  // ヒント:
  // 1. getPostBySlug(params.slug)で記事を取得
  // 2. titleとdescriptionを設定
  // 3. openGraphも設定（タイトル、説明、画像）

  return {
    title: 'ブログ記事',
  }
}

export default async function PostPage({ params }: PageProps) {
  // TODO: 記事データを取得
  const post = null // await getPostBySlug(params.slug);

  // TODO: 記事が存在しない、または非公開の場合は404
  // ヒント: if (!post || !post.published) notFound();

  return (
    <article className='container mx-auto px-4 py-8 max-w-4xl'>
      {/* TODO: カバー画像を表示（あれば） */}

      <header className='mb-8'>
        {/* TODO: ブログ一覧へ戻るリンク */}

        {/* TODO: タイトル */}
        <h1 className='text-4xl font-bold mb-4'>{/* post.title */}</h1>

        {/* TODO: 著者と日付 */}
        <div className='flex items-center gap-4 text-gray-600'>
          {/* ヒント: post.author と formatDate(post.date) を使用 */}
        </div>

        {/* TODO: タグ */}
        <div className='flex gap-2 mt-4 flex-wrap'>{/* ヒント: post.tags.map() を使用 */}</div>
      </header>

      {/* TODO: 記事本文 */}
      {/* ヒント: <PostContent content={post.content} /> */}
    </article>
  )
}
