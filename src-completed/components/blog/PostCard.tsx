import Link from 'next/link'
import { formatDate } from '@/lib/posts'
import type { PostData } from '@/types'

interface PostCardProps {
  post: PostData
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow'>
      {post.coverImage && (
        <Link href={`/blog/${post.slug}`}>
          <img src={post.coverImage} alt={post.title} className='w-full h-48 object-cover' />
        </Link>
      )}
      <div className='p-6'>
        <div className='flex gap-2 mb-3'>
          {post.tags.slice(0, 3).map((tag) => (
            <span key={tag} className='text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded'>
              {tag}
            </span>
          ))}
        </div>
        <h2 className='text-xl font-bold mb-2 hover:text-blue-600'>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>
        <p className='text-gray-600 mb-4 line-clamp-3'>{post.excerpt}</p>
        <div className='flex items-center justify-between text-sm text-gray-500'>
          <span>{post.author}</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
      </div>
    </article>
  )
}
