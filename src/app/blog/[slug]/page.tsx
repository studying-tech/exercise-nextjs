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

export async function generateStaticParams() {
  const posts = getAllPostSlugs()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return {
      title: 'Not Found',
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
  }
}

export default async function PostPage({ params }: PageProps) {
  const post = await getPostBySlug(params.slug)

  if (!post || !post.published) {
    notFound()
  }

  return (
    <article className='container mx-auto px-4 py-8 max-w-4xl'>
      {post.coverImage && (
        <img src={post.coverImage} alt={post.title} className='w-full h-64 md:h-96 object-cover rounded-lg mb-8' />
      )}

      <header className='mb-8'>
        <Link href='/blog' className='text-blue-600 hover:underline mb-4 inline-block'>
          ← ブログ一覧に戻る
        </Link>

        <h1 className='text-4xl font-bold mb-4'>{post.title}</h1>

        <div className='flex items-center gap-4 text-gray-600'>
          <span>{post.author}</span>
          <span>•</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>

        <div className='flex gap-2 mt-4 flex-wrap'>
          {post.tags.map((tag) => (
            <span key={tag} className='px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm'>
              #{tag}
            </span>
          ))}
        </div>
      </header>

      <PostContent content={post.content} />
    </article>
  )
}
