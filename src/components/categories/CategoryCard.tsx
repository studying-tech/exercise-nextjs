/**
 * Next.js Product Catalog - Category Card Component
 * カテゴリーカードコンポーネント
 */

import Image from 'next/image'
import Link from 'next/link'
import type { Category } from '@/types'

interface CategoryCardProps {
  category: Category
  className?: string
}

export default function CategoryCard({ category, className = '' }: CategoryCardProps) {
  return (
    <Link href={`/categories/${category.slug}`} className={`group block ${className}`}>
      <div className='card card-hover overflow-hidden'>
        <div className='relative aspect-video overflow-hidden bg-gray-100'>
          <Image
            src={category.image}
            alt={category.name}
            fill
            className='object-cover transition-transform duration-300 group-hover:scale-105'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
          />
          <div className='absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-30' />
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='text-center text-white'>
              <h3 className='text-xl font-bold mb-2'>{category.name}</h3>
              <p className='text-sm opacity-90 mb-2'>{category.description}</p>
              <span className='text-xs bg-white bg-opacity-20 px-2 py-1 rounded'>{category.productCount}商品</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
