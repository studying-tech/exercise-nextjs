import { NextRequest, NextResponse } from 'next/server';
import { getProducts, searchProducts, getProductsByCategory } from '@/lib/products';

// 【課題32】GET リクエストハンドラーを実装してください
// 要件:
// - NextRequestを受け取る
// - URLSearchParamsでクエリパラメータを取得
export async function /* ここに実装 */(request: /* ここに実装 */) {
  try {
    // 【課題33】URLからクエリパラメータを取得してください
    // 要件:
    // - request.nextUrl.searchParams を使用
    // - search、category パラメータを取得
    const searchParams = /* ここに実装 */;
    const search = searchParams.get('search');
    const category = searchParams.get('category');

    let products;

    // 【課題34】条件に応じて適切な関数を呼び出してください
    // 要件:
    // - searchがある場合: searchProducts
    // - categoryがある場合: getProductsByCategory  
    // - それ以外: getProducts
    if (search) {
      products = await /* ここに実装 */;
    } else if (category) {
      products = await /* ここに実装 */;
    } else {
      products = await /* ここに実装 */;
    }

    // 【課題35】レスポンスを返してください
    // 要件:
    // - NextResponse.json() を使用
    // - data プロパティに products を含む
    // - total プロパティに商品数を含む
    return /* ここに実装 */({
      data: products,
      total: products.length,
    });
  } catch (error) {
    // 【課題36】エラーレスポンスを返してください
    // 要件:
    // - ステータスコード500
    // - error メッセージを含む
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: /* ここに実装 */ }
    );
  }
}

// 【課題37】レスポンスのキャッシュヘッダーを設定する例を実装してください
// 要件:
// - 別のGETハンドラーとして実装（exportはしない）
// - Cache-Control ヘッダーを設定
async function getCachedProducts() {
  const products = await getProducts();
  const response = NextResponse.json({ data: products });
  
  // 【課題38】キャッシュヘッダーを設定してください
  // 要件:
  // - 1時間キャッシュ（s-maxage=3600）
  // - stale-while-revalidate=86400
  response.headers.set(
    /* ここに実装 - ヘッダー名 */,
    /* ここに実装 - ヘッダー値 */
  );
  
  return response;
}