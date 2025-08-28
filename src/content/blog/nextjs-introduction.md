---
title: "Next.js入門 - 初めてのWebアプリケーション"
date: "2025-08-23"
author: "Tech Blog編集部"
coverImage: "https://picsum.photos/seed/nextjs-intro/800/400"
tags: ["Next.js", "React", "Web開発", "フルスタック", "初心者"]
excerpt: "Next.jsとは何か？なぜ人気なのか？初心者向けにNext.jsの基本概念とWebアプリケーション開発の始め方を分かりやすく解説します。"
published: true
---

# Next.js 入門 - 初めての Web アプリケーション

私は今スタンディングで、React フレームワークの一つ**Next.js**を学んでいま。Next.js は人気のあるフレームワークで、Netflix、TikTok、Hulu など多くの大企業が採用しています。今回は、Next.js の基本概念などをまとめました。

## Next.js って何？

Next.js は、**React を使って Web アプリケーションを作るためのフレームワーク**です。
「React という便利な道具を使って、効率的に Web アプリケーションを作るための仕組み」です。

## なぜ Next.js が人気なのか？

### 1. 開発が簡単

**従来の React 開発：**

```bash
設定ファイルなどたくさんのファイルを用意する必要がある
webpack.config.js
babel.config.js
package.json
その他多くの設定...
```

**Next.js：**

```bash
たった1つのコマンドで必要なファイルが用意される
npx create-next-app my-app

```

### 2. 高速な Web サイト

Next.js は様々な高速化技術を自動で適用してくれます：

**主な高速化機能：**

- **SSG（Static Site Generation）** - ページを事前に生成
- **ISR（Incremental Static Regeneration）** - 必要に応じてページを更新
- **画像最適化** - 自動でサイズ調整・形式変換
- **コード分割** - 必要な部分だけ読み込み

### 3. SEO 対策が簡単

**普通の React：**

```html
<!-- 検索エンジンには空のページに見える -->
<div id="root"></div>
<script>
  /* Reactコード */
</script>
```

**Next.js：**

```html
<!-- すでに内容が書かれている -->
<div>
  <h1>私のWebサイト</h1>
  <p>検索エンジンにも内容が見える</p>
</div>
```

**React の場合**
通常 React は **クライアントサイドレンダリング（CSR）** で動作します
<br/> 1.ブラウザが最初に受け取る HTML → ほぼ空の`<div id="root"></div>`
<br/>2.JavaScript が読み込まれてから → React がコンテンツを生成
<br/>3.検索エンジンのクローラーは → 空のページしか見えない（場合が多い）

**Next.js の場合**
Next.js は **サーバーサイドレンダリング（SSR）や静的生成（SSG）** をサポート
<br/> 1.サーバーで事前に HTML を生成
<br/>2.検索エンジンが最初からコンテンツを確認できる
<br/>3.SEO 対策として非常に有効

## Next.js の基本構造

Next.js プロジェクトの構造を見てみましょう：

```
my-nextjs-app/
├── src/
│   └── app/           # ページとレイアウト
│       ├── page.tsx   # ホームページ
│       ├── about/
│       │   └── page.tsx  # /about ページ
│       └── layout.tsx    # 共通レイアウト
├── public/            # 静的ファイル（画像など）
├── next.config.js     # Next.js設定
└── package.json       # 依存関係
```

## 実際にページを作ってみよう

### 1. シンプルなホームページ

```typescript
// src/app/page.tsx
export default function HomePage() {
  return (
    <div>
      <h1>私のWebサイトへようこそ！</h1>
      <p>Next.jsで作りました。</p>

      <div>
        <h2>最新の記事</h2>
        <ul>
          <li>React入門 - コンポーネントとは？</li>
          <li>TypeScript の基本を学ぼう</li>
          <li>Next.js でWebアプリケーション開発</li>
        </ul>
      </div>
    </div>
  );
}
```

### 2. About ページを追加

```typescript
// src/app/about/page.tsx
export default function AboutPage() {
  return (
    <div>
      <h1>私について</h1>
      <p>Web開発を勉強している学生です。</p>

      <h2>スキル</h2>
      <ul>
        <li>HTML/CSS</li>
        <li>JavaScript</li>
        <li>React</li>
        <li>Next.js ← 今ここ！</li>
      </ul>
    </div>
  );
}
```

## Next.js の便利な機能

### 1. 自動ルーティング

ファイルを作るだけでページができます：

```
src/app/
├── page.tsx          → / (ホーム)
├── about/page.tsx    → /about
├── blog/page.tsx     → /blog
└── contact/page.tsx  → /contact
```

### 2. Link コンポーネント

```typescript
import Link from "next/link";

export default function Navigation() {
  return (
    <nav>
      <Link href="/">ホーム</Link>
      <Link href="/about">私について</Link>
      <Link href="/blog">ブログ</Link>
    </nav>
  );
}
```

### 3. 画像最適化

```typescript
import Image from "next/image";

export default function ProfilePage() {
  return (
    <div>
      <h1>プロフィール</h1>
      {/* Next.jsが自動で最適化 */}
      <Image
        src="/profile.jpg"
        alt="プロフィール写真"
        width={300}
        height={300}
      />
    </div>
  );
}
```

## 実際の Web アプリケーション例

### ブログアプリケーション

```typescript
// ブログ一覧ページ
export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: "Next.js入門",
      date: "2025-08-23",
      excerpt: "Next.jsの基本を学ぼう",
    },
    {
      id: 2,
      title: "React コンポーネント",
      date: "2025-08-22",
      excerpt: "コンポーネントの作り方",
    },
  ];

  return (
    <div>
      <h1>ブログ記事一覧</h1>

      {posts.map((post) => (
        <article key={post.id}>
          <h2>
            <Link href={`/blog/${post.id}`}>{post.title}</Link>
          </h2>
          <p>投稿日: {post.date}</p>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}
```

## まとめ

**Next.js**は、**React を使った現代的な Web アプリケーション開発を簡単にするフレームワーク**です。

**【Next.js を選ぶべき理由】**
<br/>✅ **学習コストが低い** - React の知識がそのまま活かせる
<br/>✅ **高性能** - 自動最適化で高速な Web サイト
<br/>✅ **SEO 対策** - 検索エンジンに優しい
<br/>✅ **人気が高い** - 就職・転職に有利
<br/>✅ **豊富な機能** - フルスタック開発が可能

Next.js を使いこなせるようになり、人の役に立つアプリを制作してゆきたいです。
