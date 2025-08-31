---
title: 'Next.js 14入門：App Routerで始めるモダンWeb開発'
date: '2024-03-20'
author: '山田太郎'
tags: ['Next.js', 'React', 'Web開発', 'TypeScript']
excerpt: 'Next.js 14のApp Routerを使って、モダンなWebアプリケーションを構築する方法を基礎から解説します。'
coverImage: '/images/nextjs-cover.jpg'
published: true
---

## はじめに

Next.js 14 は、React ベースの強力なフルスタックフレームワークとして、Web 開発の新しいスタンダードを確立しています。本記事では、App Router を中心に、Next.js の基本概念と実践的な使い方を解説します。

## なぜ Next.js を選ぶのか

### 1. パフォーマンスの最適化

Next.js は、以下の機能により高速な Web サイトを実現します：

- **自動的なコード分割**: 各ページで必要な JavaScript のみをロード
- **画像の最適化**: next/image コンポーネントによる自動最適化
- **フォントの最適化**: Web フォントの自動インライン化

### 2. 開発体験の向上

```typescript
// app/page.tsx
export default function HomePage() {
  return (
    <main className='container mx-auto'>
      <h1>Welcome to Next.js!</h1>
    </main>
  );
}
```

ファイルベースのルーティングにより、直感的にページを作成できます。

## App Router の基本

### ディレクトリ構造

```
app/
├── layout.tsx       # ルートレイアウト
├── page.tsx        # ホームページ
├── about/
│   └── page.tsx    # /about ページ
└── blog/
    ├── page.tsx    # /blog ページ
    └── [slug]/
        └── page.tsx # 動的ルート
```

### Server Components の活用

```typescript
// app/posts/page.tsx
async function getPosts() {
  const res = await fetch('https://api.example.com/posts');
  return res.json();
}

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}
```

Server Components により、サーバーサイドでデータフェッチを行い、クライアントに送信する JavaScript を削減できます。

## 実践的な Tips

### 1. Metadata API の活用

```typescript
export async function generateMetadata({ params }) {
  return {
    title: 'My Blog Post',
    description: 'This is a blog post about Next.js',
    openGraph: {
      images: ['/og-image.jpg'],
    },
  };
}
```

### 2. Loading UI の実装

```typescript
// app/blog/loading.tsx
export default function Loading() {
  return <div>Loading...</div>;
}
```

### 3. Error Boundary の設定

```typescript
// app/error.tsx
'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

## パフォーマンス最適化

### Static Site Generation (SSG)

```typescript
export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
```

### Incremental Static Regeneration (ISR)

```typescript
export const revalidate = 3600; // 1時間ごとに再検証
```

## デプロイメント

Vercel へのデプロイは非常に簡単です：

```bash
# Vercel CLIのインストール
npm i -g vercel

# デプロイ
vercel
```

## まとめ

Next.js 14 の App Router は、モダンな Web 開発に必要な機能を包括的に提供しています。Server Components、並列ルート、インターセプトルートなど、さらに高度な機能を活用することで、より洗練されたアプリケーションを構築できます。

Next.js を使いこなすことで、パフォーマンスと開発体験の両立を実現し、ユーザーに価値のある Web アプリケーションを提供できるでしょう。
