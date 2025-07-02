import Image from 'next/image';
import Link from 'next/link';

// 【課題39】HeroSectionコンポーネントを実装してください
// 要件:
// - サーバーコンポーネント（'use client'なし）
export function HeroSection() {
  return (
    <section className="relative h-[600px] w-full overflow-hidden">
      {/* 【課題40】背景画像を実装してください
          要件:
          - Next.js Image コンポーネント
          - fill プロパティ
          - priority={true} でLCP最適化
          - object-cover でフルカバー
      */}
      <Image
        src="/images/hero-bg.jpg"
        alt="Hero background"
        /* ここに実装 - fill */
        className="object-cover"
        /* ここに実装 - priority */
      />
      
      {/* オーバーレイ */}
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      
      {/* コンテンツ */}
      <div className="relative z-10 flex h-full items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="mb-4 text-5xl font-bold text-white md:text-6xl">
              最新のトレンドを<br />
              あなたのもとへ
            </h1>
            <p className="mb-8 text-xl text-white/90">
              厳選された商品で、あなたの生活をより豊かに。
              最高品質の商品を最高のサービスでお届けします。
            </p>
            {/* 【課題41】CTAボタンを実装してください
                要件:
                - Link コンポーネント
                - href="/products"
                - スタイリングを適用
            */}
            </* ここに実装 */
              href={/* ここに実装 */}
              className="inline-block rounded-md bg-blue-600 px-8 py-4 text-lg font-medium text-white transition hover:bg-blue-700"
            >
              商品を見る
            <//* ここに実装 */>
          </div>
        </div>
      </div>
      
      {/* スクロールインジケーター */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="h-6 w-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}