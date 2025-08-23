import Link from 'next/link'
import type { PostData } from '@/types'
import { formatDate, getReadingTime } from '@/lib/posts'
import { ClockIcon } from '@heroicons/react/24/outline'

interface PostCardProps {
  post: PostData
}

export function PostCard({ post }: PostCardProps) {
  const readingTime = getReadingTime(post.content)

  return (
    <article className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col'>
      <Link href={`/blog/${post.slug}`} className='block'>
        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={`${post.title}のカバー画像`}
            className='w-full h-48 object-cover'
          />
        )}
      </Link>

      <div className='p-6 flex flex-col flex-grow'>
        <div className='flex-grow'>
          {post.tags && post.tags.length > 0 && (
            <div className='flex gap-2 mb-3 flex-wrap'>
              {post.tags.slice(0, 3).map((tag: string) => (
                <span
                  key={tag}
                  className='text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full'
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h2 className='text-xl font-bold mb-2'>
            <Link
              href={`/blog/${post.slug}`}
              className='hover:text-blue-600 transition-colors duration-200'
            >
              {post.title}
            </Link>
          </h2>

          <p className='text-gray-600 text-base mb-4'>{post.excerpt}</p>
        </div>

        <div className='flex items-center justify-between text-sm text-gray-500 mt-auto pt-4 border-t'>
          <span>{post.author}</span>
          <div className='flex items-center gap-2'>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className='text-gray-400'>&middot;</span>
            <div className='flex items-center gap-1'>
              <ClockIcon className='h-4 w-4 text-gray-400' />
              <span>約{readingTime}分</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
