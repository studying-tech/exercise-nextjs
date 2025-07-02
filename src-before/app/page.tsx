import { HeroSection } from '@/components/home/HeroSection';
import { NewsletterSection } from '@/components/home/NewsletterSection';
import { ProductCard } from '@/components/products/ProductCard';
import { CategoryCard } from '@/components/categories/CategoryCard';
import { getFeaturedProducts, getNewProducts, getCategories } from '@/lib/products';

// 【課題5】ISR（インクリメンタル静的再生成）を設定してください
// 要件:
// - 1時間（3600秒）ごとに再生成
export const /* ここに実装 */ = /* ここに実装 */;

// 【課題6】HomePage コンポーネントを実装してください
// 要件:
// - 非同期のサーバーコンポーネント
// - データを並列で取得
export default async function HomePage() {
  // 【課題7】複数のデータを並列で取得してください
  // 要件:
  // - Promise.all を使用
  // - featuredProducts (8個)、newProducts (8個)、categories を取得
  const [featuredProducts, newProducts, categories] = await /* ここに実装 */([
    /* ここに実装 */,
    /* ここに実装 */,
    /* ここに実装 */,
  ]);

  return (
    <>
      <HeroSection />

      {/* おすすめ商品セクション */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">
            おすすめ商品
          </h2>
          {/* 【課題8】商品グリッドを実装してください
              要件:
              - grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6
              - featuredProducts をマップ
              - 最初の4つの商品に priority={true}（LCP最適化）
          */}
          <div className={/* ここに実装 */}>
            {featuredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={/* ここに実装 - 条件式 */}
              />
            ))}
          </div>
        </div>
      </section>

      {/* カテゴリーセクション */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">
            カテゴリー
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* 新着商品セクション */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">
            新着商品
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <NewsletterSection />
    </>
  );
}