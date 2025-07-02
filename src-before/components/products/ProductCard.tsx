// 【課題25】クライアントコンポーネントとして宣言してください
// 要件:
// - 'use client' ディレクティブを追加
/* ここに実装 */

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types';

// 【課題26】ProductCardPropsインターフェースを定義してください
// 要件:
// - product: Product
// - priority?: boolean (画像の優先読み込み用)
interface ProductCardProps {
  /* ここに実装 */
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  // 【課題27】お気に入り状態を管理するuseStateを実装してください
  const [isWishlisted, setIsWishlisted] = /* ここに実装 */(false);

  // 【課題28】お気に入りトグル関数を実装してください
  // 要件:
  // - イベントのデフォルト動作を防ぐ
  // - 状態を反転させる
  const toggleWishlist = (e: React.MouseEvent) => {
    /* ここに実装 */
  };

  return (
    <article className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg">
      {/* 【課題29】商品詳細ページへのリンクを実装してください
          要件:
          - Link コンポーネントを使用
          - href="/products/{id}"
      */}
      </* ここに実装 */ href={/* ここに実装 */}>
        <div className="relative aspect-square overflow-hidden bg-gray-200">
          {/* 【課題30】商品画像を実装してください
              要件:
              - fill プロパティ
              - sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              - priority は props から受け取る
              - group-hover:scale-105 でホバー時に拡大
          */}
          <Image
            src={product.images[0]}
            alt={product.name}
            /* ここに実装 - fill */
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            /* ここに実装 - sizes */
            /* ここに実装 - priority */
          />
          {/* 在庫切れバッジ */}
          {product.stock === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <span className="rounded-md bg-red-600 px-3 py-1 text-sm font-medium text-white">
                在庫切れ
              </span>
            </div>
          )}
          {/* セールバッジ */}
          {product.discount && (
            <div className="absolute left-2 top-2">
              <span className="rounded-md bg-red-500 px-2 py-1 text-xs font-bold text-white">
                {product.discount}% OFF
              </span>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.category}</p>
          <div className="mt-2 flex items-center justify-between">
            <div>
              {/* 【課題31】価格表示を実装してください
                  要件:
                  - 割引がある場合は元価格に取り消し線
                  - 割引価格を計算して表示
              */}
              {product.discount ? (
                <>
                  <span className="text-sm text-gray-500 line-through">
                    ¥{product.price.toLocaleString()}
                  </span>
                  <span className="ml-2 text-lg font-bold text-red-600">
                    ¥{/* ここに実装 - 割引価格の計算 */}
                  </span>
                </>
              ) : (
                <span className="text-lg font-bold text-gray-900">
                  ¥{product.price.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>

      {/* お気に入りボタン */}
      <button
        onClick={toggleWishlist}
        className="absolute right-2 top-2 rounded-full bg-white p-2 shadow-md transition-colors hover:bg-gray-100"
        aria-label={isWishlisted ? 'お気に入りから削除' : 'お気に入りに追加'}
      >
        <svg
          className={`h-5 w-5 ${
            isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'
          }`}
          fill={isWishlisted ? 'currentColor' : 'none'}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>
    </article>
  );
}