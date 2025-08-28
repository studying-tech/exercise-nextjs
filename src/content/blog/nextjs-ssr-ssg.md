---
title: "App Router における SSR、SSG、ISR の違い"
date: "2025-08-23"
author: "Tech Blog編集部"
coverImage: "https://picsum.photos/seed/mdx/800/400"
tags: ["MDX", "Next.js", "React", "Markdown"]
excerpt: "App Router における SSR、SSG、ISR の違い"
published: true
---

# Next.js App Router における SSR、SSG、ISR の違い

Next.js App Router では、従来の Pages Router とは異なり、より直感的でシンプルな方法でサーバーサイドレンダリング（SSR）、静的サイト生成（SSG）、そして増分静的再生成（ISR）を実装できます。この記事では、App Router における各手法の違いと実装方法を詳しく解説します。

## SSR（Server-Side Rendering）とは

SSR は、ページがリクエストされるたびにサーバー上で HTML を生成する手法です。

**特徴**

- **リクエストごとに実行**：ユーザーがページにアクセスするたびにサーバーで処理
- **リアルタイムデータ**：最新のデータを常に取得可能
- **レスポンス時間**：毎回サーバー処理が必要なため若干遅い
- **サーバー負荷**：アクセスが多いと負荷が高い

### App Router での SSR 実装

```typescript
// src/app/news/page.tsx
async function NewsPage() {
  // リクエストごとに実行される
  const res = await fetch("https://api.example.com/news", {
    cache: "no-store", // キャッシュを無効化
  });
  const news = await res.json();

  return (
    <div>
      <h1>最新ニュース</h1>
      {news.map((item: any) => (
        <article key={item.id}>
          <h2>{item.title}</h2>
          <p>{item.content}</p>
          <time>{new Date(item.createdAt).toLocaleString()}</time>
        </article>
      ))}
    </div>
  );
}

export default NewsPage;
```

### SSR が適している場面

- **リアルタイム性が重要**：株価、ニュース、チャット
- **ユーザー固有のデータ**：ダッシュボード、プロフィール
- **頻繁に更新される情報**：在庫情報、イベント情報
- **SEO が重要で動的コンテンツ**：検索結果、商品詳細

## SSG（Static Site Generation）とは

SSG は、ビルド時に事前に HTML を生成しておく手法です。

**特徴**

- **高速表示**：事前生成された HTML をそのまま配信
- **低コスト**：CDN で配信可能、サーバー負荷が少ない
- **安定性**：サーバーエラーの影響を受けにくい
- **更新頻度**：データ更新にはリビルドが必要

### App Router での SSG 実装

```typescript
// src/app/blog/page.tsx
async function BlogPage() {
  // ビルド時に一度だけ実行される
  const res = await fetch("https://api.example.com/blog-posts", {
    cache: "force-cache", // キャッシュを強制（デフォルト）
  });
  const posts = await res.json();

  return (
    <div>
      <h1>ブログ一覧</h1>
      {posts.map((post: any) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
          <time>{new Date(post.publishedAt).toLocaleDateString()}</time>
        </article>
      ))}
    </div>
  );
}

export default BlogPage;
```

### SSG が適している場面

- **静的コンテンツ**：ブログ記事、企業サイト
- **更新頻度が低い**：商品カタログ、ドキュメント
- **高速性重視**：ランディングページ、マーケティングサイト
- **トラフィックが多い**：アクセス数の多いページ

## ISR（Incremental Static Regeneration）とは

ISR は、SSG の利点を活かしながら、定期的にコンテンツを更新できる手法です。ビルド時に静的ファイルを生成し、指定した間隔でバックグラウンドで再生成を行います。

**特徴**

- **高速表示**：初回は静的ファイルを配信
- **自動更新**：バックグラウンドで定期的に再生成
- **スケーラビリティ**：大量のページでもビルド時間を短縮
- **柔軟性**：時間ベースまたはイベントベースで更新可能

### 時間ベース ISR の実装

```typescript
// src/app/products/page.tsx
async function ProductsPage() {
  const res = await fetch("https://api.example.com/products", {
    next: { revalidate: 3600 }, // 1時間ごとに再生成
  });
  const products = await res.json();

  return (
    <div>
      <h1>商品一覧</h1>
      <p>最終更新: {new Date().toLocaleString()}</p>
      {products.map((product: any) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>¥{product.price.toLocaleString()}</p>
          <p>在庫: {product.stock}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductsPage;
```

### タグベース ISR の実装

```typescript
// src/app/news/page.tsx
async function NewsPage() {
  const res = await fetch("https://api.example.com/news", {
    next: {
      revalidate: 60, // 60秒でキャッシュ
      tags: ["news"], // タグ指定
    },
  });
  const news = await res.json();

  return (
    <div>
      <h1>ニュース</h1>
      {news.map((article: any) => (
        <article key={article.id}>
          <h2>{article.title}</h2>
          <p>{article.summary}</p>
        </article>
      ))}
    </div>
  );
}

export default NewsPage;
```

### 手動でのキャッシュ無効化

```typescript
// src/app/api/revalidate/route.ts
import { revalidateTag, revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const tag = request.nextUrl.searchParams.get("tag");
  const path = request.nextUrl.searchParams.get("path");

  // セキュリティチェック
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    if (tag) {
      // 特定のタグを無効化
      revalidateTag(tag);
      return NextResponse.json({ message: `Tag ${tag} revalidated` });
    }

    if (path) {
      // 特定のパスを無効化
      revalidatePath(path);
      return NextResponse.json({ message: `Path ${path} revalidated` });
    }

    return NextResponse.json(
      { message: "No tag or path specified" },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 }
    );
  }
}
```

### ISR の動作フロー

1. **初回リクエスト**：静的生成されたページを配信
2. **バックグラウンド再生成**：設定された間隔で新しいバージョンを生成
3. **古いキャッシュの配信**：再生成中は古いバージョンを配信
4. **新しいキャッシュの配信**：再生成完了後は新しいバージョンを配信

### ISR が適している場面

- **定期的な更新が必要**：商品情報、ブログ記事
- **大量のページ**：EC サイトの商品ページ
- **パフォーマンス重視**：高速表示と最新情報の両立
- **ビルド時間の短縮**：全ページの事前生成が困難な場合

## パラメータ付きルートでの実装

### パラメータ付きルートでの SSG 実装

```typescript
// src/app/blog/[slug]/page.tsx

// 事前生成するパスを指定
export async function generateStaticParams() {
  const posts = await fetch("https://api.example.com/blog-posts");
  const data = await posts.json();

  return data.map((post: any) => ({
    slug: post.slug,
  }));
}

// 各ページのデータを取得
async function BlogPost({ params }: { params: { slug: string } }) {
  const res = await fetch(`https://api.example.com/blog-posts/${params.slug}`, {
    cache: "force-cache", // SSG
  });
  const post = await res.json();

  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}

export default BlogPost;
```

### パラメータ付きルートでの ISR 実装

```typescript
// src/app/products/[id]/page.tsx

export async function generateStaticParams() {
  // 人気商品のみ事前生成
  const popularProducts = await fetch(
    "https://api.example.com/products/popular"
  );
  const data = await popularProducts.json();

  return data.map((product: any) => ({
    id: product.id.toString(),
  }));
}

async function ProductDetail({ params }: { params: { id: string } }) {
  const res = await fetch(`https://api.example.com/products/${params.id}`, {
    next: {
      revalidate: 1800, // 30分ごとに更新
      tags: [`product-${params.id}`],
    },
  });
  const product = await res.json();

  return (
    <div>
      <h1>{product.name}</h1>
      <p>価格: ¥{product.price.toLocaleString()}</p>
      <p>在庫: {product.stock}個</p>
      <p>最終更新: {new Date(product.updatedAt).toLocaleString()}</p>
    </div>
  );
}

// 事前生成されていないパスも動的に対応
export const dynamicParams = true;

export default ProductDetail;
```

### パラメータ付きルートでの SSR 実装

```typescript
// src/app/user/[id]/page.tsx
async function UserProfile({ params }: { params: { id: string } }) {
  const res = await fetch(`https://api.example.com/users/${params.id}`, {
    cache: "no-store", // SSR - 毎回最新データを取得
  });
  const user = await res.json();

  return (
    <div>
      <h1>{user.name}のプロフィール</h1>
      <p>最終ログイン: {new Date(user.lastLogin).toLocaleString()}</p>
      <p>投稿数: {user.postCount}</p>
    </div>
  );
}

export default UserProfile;
```

## Pages Router との比較

| 項目                 | Pages Router            | App Router                           |
| -------------------- | ----------------------- | ------------------------------------ |
| SSR                  | `getServerSideProps()`  | `cache: 'no-store'`                  |
| SSG                  | `getStaticProps()`      | `cache: 'force-cache'`（デフォルト） |
| ISR（時間ベース）    | `revalidate` プロパティ | `next: { revalidate }`               |
| ISR（タグベース）    | 非対応                  | `next: { tags }` + `revalidateTag()` |
| パラメータ付きルート | `getStaticPaths()`      | `generateStaticParams()`             |
| 書き方               | 別関数で定義            | コンポーネント内で直接実装           |
| キャッシュ制御       | ページ単位              | fetch 単位で細かく制御可能           |

## キャッシュ戦略まとめ

```typescript
// SSG（静的生成）- デフォルト
fetch(url, { cache: "force-cache" });
fetch(url); // デフォルトでforce-cache

// SSR（毎回実行）
fetch(url, { cache: "no-store" });

// ISR（時間ベース再検証）
fetch(url, { next: { revalidate: 60 } });

// ISR（タグベース再検証）
fetch(url, { next: { tags: ["products"] } });

// 複合設定
fetch(url, {
  next: {
    revalidate: 3600,
    tags: ["products", "featured"],
  },
});

// リクエスト単位でキャッシュ（同一リクエスト内で重複排除）
fetch(url, { cache: "no-cache" });
```

## ISR のベストプラクティス

### 1. 適切な再検証間隔の設定

```typescript
// データの更新頻度に応じて設定
const getRevalidateTime = (dataType: string) => {
  switch (dataType) {
    case "stock":
      return 60; // 1分（在庫情報）
    case "price":
      return 300; // 5分（価格情報）
    case "article":
      return 3600; // 1時間（記事）
    case "category":
      return 86400; // 24時間（カテゴリ）
    default:
      return 1800; // 30分（デフォルト）
  }
};
```

### 2. エラーハンドリング

```typescript
async function ProductsPage() {
  try {
    const res = await fetch("https://api.example.com/products", {
      next: { revalidate: 1800 },
    });

    if (!res.ok) {
      // フォールバック用の静的データを返す
      return <div>商品情報を読み込めませんでした</div>;
    }

    const products = await res.json();
    return (
      <div>
        {products.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  } catch (error) {
    // エラー時のフォールバック
    return <div>一時的にサービスをご利用いただけません</div>;
  }
}
```

### 3. 効率的なタグ管理

```typescript
// タグの階層化
const CACHE_TAGS = {
  PRODUCTS: "products",
  PRODUCT: (id: string) => `product-${id}`,
  CATEGORY: (slug: string) => `category-${slug}`,
  USER: (id: string) => `user-${id}`,
} as const;

// 使用例
fetch(`/api/products/${productId}`, {
  next: {
    tags: [
      CACHE_TAGS.PRODUCTS,
      CACHE_TAGS.PRODUCT(productId),
      CACHE_TAGS.CATEGORY(categorySlug),
    ],
  },
});
```

### 4. パフォーマンス監視

```typescript
// 再検証の成功/失敗をログに記録
export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    revalidateTag("products");

    console.log(`Revalidation completed in ${Date.now() - startTime}ms`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Revalidation failed:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
```

## 手法の比較と選択指針

| 手法 | レスポンス速度 | データの新しさ | サーバー負荷 | 開発・運用コスト |
| ---- | -------------- | -------------- | ------------ | ---------------- |
| SSR  | 遅い           | 常に最新       | 高い         | 中程度           |
| SSG  | 非常に速い     | 古い可能性     | 低い         | 低い             |
| ISR  | 速い           | ほぼ最新       | 中程度       | 中程度           |

### 選択指針

**SSR を選ぶべき場合：**

- リアルタイムデータが必要
- ユーザー固有の情報を表示
- 頻繁にデータが更新される
- 動的な SEO 最適化が必要

**SSG を選ぶべき場合：**

- 静的コンテンツが中心
- 高速表示が最重要
- データの更新頻度が低い（週単位、月単位）
- CDN での配信を最大限活用したい

**ISR を選ぶべき場合：**

- 静的生成の利点を活かしつつ定期的な更新が必要
- 大量のページがある（EC サイトなど）
- ビルド時間を短縮したい
- パフォーマンスとデータの新しさのバランスが重要

## まとめ

App Router では、SSR、SSG、ISR の 3 つの手法を適材適所で使い分けることで、パフォーマンスとユーザーエクスペリエンスの両方を最適化できます。

**特に ISR の活用により：**

- 静的サイトの高速性を維持
- データの新鮮さを確保
- スケーラブルな Web アプリケーションを構築

適切な戦略を選択し、キャッシュタグや再検証間隔を最適化することで、モダンで高性能な Web アプリケーションを構築できるでしょう。
