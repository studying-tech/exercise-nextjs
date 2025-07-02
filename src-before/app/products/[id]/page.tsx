import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import { getProduct, getProducts, getRelatedProducts } from '@/lib/products';
import { ProductCard } from '@/components/products/ProductCard';

// 【課題9】動的ルートの型定義をしてください
// 要件:
// - params に id: string を含む
type Props = {
  params: { /* ここに実装 */ };
};

// 【課題10】ISR を30分（1800秒）に設定してください
export const /* ここに実装 */ = /* ここに実装 */;

// 【課題11】動的メタデータ生成関数を実装してください
// 要件:
// - async 関数
// - 商品情報からtitle、description、openGraphを生成
export async function /* ここに実装 */({ params }: Props): Promise</* ここに実装 */> {
  const product = await getProduct(params.id);

  if (!product) {
    return {
      title: '商品が見つかりません',
    };
  }

  return {
    title: /* ここに実装 - product.name */,
    description: /* ここに実装 - product.description */,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [/* ここに実装 - 最初の画像 */],
      type: 'website',
    },
  };
}

// 【課題12】静的パラメータ生成関数を実装してください
// 要件:
// - ビルド時に最初の50商品のページを生成
// - id プロパティを持つオブジェクトの配列を返す
export async function /* ここに実装 */() {
  const products = await getProducts();

  // 【課題13】最初の50商品分のパラメータを生成してください
  return products./* ここに実装 */(0, 50).map((product) => ({
    /* ここに実装 */: product.id,
  }));
}

export default async function ProductPage({ params }: Props) {
  const product = await getProduct(params.id);

  // 【課題14】商品が見つからない場合の処理を実装してください
  // 要件:
  // - notFound() を呼び出して404ページを表示
  if (!product) {
    /* ここに実装 */();
  }

  // 関連商品を取得
  const relatedProducts = await getRelatedProducts(product.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* 商品画像セクション */}
          <div className="relative">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-white">
              {/* 【課題15】Next.js Image コンポーネントを実装してください
                  要件:
                  - fill プロパティで親要素にフィット
                  - sizes="(max-width: 1024px) 100vw, 50vw"
                  - priority={true} で優先読み込み
                  - object-cover でアスペクト比維持
              */}
              <Image
                src={product.images[0]}
                alt={product.name}
                /* ここに実装 - fill */
                className="object-cover"
                /* ここに実装 - sizes */
                /* ここに実装 - priority */
              />
            </div>
            {/* サムネイル画像 */}
            {product.images.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-2">
                {product.images.slice(1, 5).map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-square overflow-hidden rounded-md bg-white"
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 2}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 25vw, 10vw"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 商品情報セクション */}
          <div className="lg:pl-8">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="mt-2 text-sm text-gray-600">
              カテゴリー: {product.category}
            </p>

            <div className="mt-4">
              <p className="text-3xl font-bold text-gray-900">
                ¥{product.price.toLocaleString()}
              </p>
            </div>

            <p className="mt-6 text-gray-700">{product.description}</p>

            {/* 商品詳細 */}
            {product.details && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-gray-900">
                  商品詳細
                </h2>
                <dl className="mt-4 space-y-2">
                  {Object.entries(product.details).map(([key, value]) => (
                    <div key={key} className="flex">
                      <dt className="w-1/3 text-gray-600">{key}:</dt>
                      <dd className="w-2/3 text-gray-900">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {/* アクションボタン */}
            <div className="mt-8 space-y-3">
              <button className="w-full rounded-md bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700">
                カートに追加
              </button>
              <button className="w-full rounded-md border border-gray-300 bg-white px-6 py-3 text-gray-900 transition hover:bg-gray-50">
                お気に入りに追加
              </button>
            </div>

            {/* 在庫状況 */}
            <div className="mt-6">
              {product.stock > 0 ? (
                <p className="text-green-600">
                  在庫あり（残り{product.stock}個）
                </p>
              ) : (
                <p className="text-red-600">在庫切れ</p>
              )}
            </div>
          </div>
        </div>

        {/* 関連商品セクション */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-8 text-2xl font-bold text-gray-900">
              関連商品
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}