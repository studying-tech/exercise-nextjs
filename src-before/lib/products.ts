import { cache } from 'react';
import type { Product, Category } from '@/types';
import products from '@/data/products.json';
import categories from '@/data/categories.json';

// 【課題16】React cache を使用してデータフェッチ関数をキャッシュしてください
// 要件:
// - cache 関数でラップ
// - 非同期関数として実装
export const getProducts = /* ここに実装 */(async (): Promise<Product[]> => {
  // 実際のアプリケーションではAPIから取得
  // ここではシミュレーションのため遅延を追加
  await new Promise((resolve) => setTimeout(resolve, 100));
  return products as Product[];
});

// 【課題17】商品IDから単一の商品を取得する関数を実装してください
// 要件:
// - cache でラップ
// - 商品が見つからない場合は null を返す
export const getProduct = /* ここに実装 */(async (id: string): Promise<Product | null> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const allProducts = await getProducts();
  return allProducts.find((product) => product.id === id) || /* ここに実装 */;
});

// 【課題18】おすすめ商品を取得する関数を実装してください
// 要件:
// - cache でラップ
// - limit パラメータで取得数を制限
// - featured: true の商品をフィルタリング
export const getFeaturedProducts = /* ここに実装 */(async (limit?: number): Promise<Product[]> => {
  const allProducts = await getProducts();
  const featured = allProducts.filter((product) => /* ここに実装 */);
  return limit ? featured.slice(0, limit) : featured;
});

// 【課題19】新着商品を取得する関数を実装してください
// 要件:
// - cache でラップ
// - createdAt で降順ソート
// - limit で取得数を制限
export const getNewProducts = cache(async (limit?: number): Promise<Product[]> => {
  const allProducts = await getProducts();
  const sorted = [...allProducts].sort((a, b) => {
    // 【課題20】日付の降順ソートを実装してください
    return /* ここに実装 */;
  });
  return limit ? sorted.slice(0, limit) : sorted;
});

// 【課題21】関連商品を取得する関数を実装してください
// 要件:
// - 同じカテゴリーの商品を取得
// - 現在の商品は除外
// - 最大4件まで
export const getRelatedProducts = cache(async (productId: string): Promise<Product[]> => {
  const product = await getProduct(productId);
  if (!product) return [];

  const allProducts = await getProducts();
  return allProducts
    .filter(
      (p) => /* ここに実装 - 同じカテゴリーかつ異なるID */
    )
    .slice(0, 4);
});

// 【課題22】カテゴリー一覧を取得する関数を実装してください
// 要件:
// - cache でラップ
// - Category[] を返す
export const getCategories = /* ここに実装 */(async (): Promise<Category[]> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return categories as Category[];
});

// 【課題23】カテゴリーごとの商品を取得する関数を実装してください
// 要件:
// - cache でラップ
// - カテゴリー名でフィルタリング
export const getProductsByCategory = cache(
  async (category: string): Promise<Product[]> => {
    const allProducts = await getProducts();
    return allProducts.filter((product) => /* ここに実装 */);
  }
);

// 【課題24】商品検索関数を実装してください
// 要件:
// - cache でラップ
// - 商品名と説明文で検索
// - 大文字小文字を区別しない
export const searchProducts = cache(async (query: string): Promise<Product[]> => {
  const allProducts = await getProducts();
  const lowerQuery = query.toLowerCase();

  return allProducts.filter((product) => {
    return (
      /* ここに実装 - nameまたはdescriptionに含まれるか */
    );
  });
});