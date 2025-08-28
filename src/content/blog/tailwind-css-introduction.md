---
title: "Tailwind CSS入門"
date: "2025-08-23"
author: "Tech Blog編集部"
coverImage: "https://picsum.photos/seed/tailwind-css/800/400"
tags: ["Tailwind CSS", "CSS", "デザイン", "スタイリング", "初心者"]
excerpt: "Tailwind CSSとは何か？従来のCSSとの違い、メリット・デメリット、実際の使い方まで、プログラミング初心者にも分かりやすく解説します。"
published: true
---

# Tailwind CSS 入門

現在、私は Next.js での Web 開発を学んでいます。学習を進めにつれて感じるｋとは、「正直、CSS でデザインを作るのは時間がかかり面倒くさい」ということです。そんな悩みを解決してくれるのが**Tailwind CSS**です。今回は、Tailwind CSS の基本的な使い方をまとめました。

## Tailwind CSS って何？

**Tailwind CSS**は、**HTML にクラスを書くだけで美しいデザインが作れる CSS フレームワーク**です。
従来の Bootstrap や Bulma などの CSS フレームワークとは異なり、決まったコンポーネント（ボタン、ナビゲーションなど）は用意されておらず、個別のスタイルを直接 HTML 要素にクラスとして付与していくことで柔軟なデザインを実現します。

## CSS との違い

CSS は HTML にクラスなどのセレクターを設置し、CSS ファイルへそのクラスのスタイルを記述して装飾していましたが（.primary-button { ... }などのように）、Tailwind CSS では、HTML に複数のクラス（bg-primary text-white py-2 px-4 など）を並べることで必要なスタイルを完結できます。

### メリット

- コード量の削減
- スピーディーな開発
- デザインの統一感を保ちやすい
- 不要な CSS の削除で保守性向上

### デメリット

- HTML に多くのクラスが並ぶため、記述が長くなることがある
- クラス名を覚える必要がある
- マンティックな名前による抽象化がしづらい場合がある

## Tailwind CSS の基本クラス

### 1. スペーシング（余白）

```html
<!-- パディング -->
<div class="p-4">全方向に1rem</div>
<div class="px-6">左右に1.5rem</div>
<div class="py-2">上下に0.5rem</div>

<!-- マージン -->
<div class="m-4">全方向に1rem</div>
<div class="mt-8">上に2rem</div>
<div class="mb-2">下に0.5rem</div>
```

### 2. 色

```html
<!-- 背景色 -->
<div class="bg-blue-500">青い背景</div>
<div class="bg-red-100">薄い赤の背景</div>

<!-- 文字色 -->
<p class="text-green-600">緑の文字</p>
<p class="text-gray-800">濃いグレーの文字</p>
```

### 3. フォント

```html
<!-- サイズ -->
<h1 class="text-4xl">大きな見出し</h1>
<p class="text-sm">小さな文字</p>

<!-- 太さ -->
<p class="font-bold">太字</p>
<p class="font-light">細字</p>
```

### 4. レイアウト

```html
<!-- Flexbox -->
<div class="flex justify-center items-center">
  <p>中央揃え</p>
</div>

<!-- Grid -->
<div class="grid grid-cols-3 gap-4">
  <div>アイテム1</div>
  <div>アイテム2</div>
  <div>アイテム3</div>
</div>
```

## レスポンシブデザイン

Tailwind CSS では、簡単にレスポンシブデザインが作れます：

### ブレークポイント

```html
<!-- スマホ: 1列、タブレット: 2列、PC: 3列 -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div class="bg-gray-200 p-4">アイテム1</div>
  <div class="bg-gray-200 p-4">アイテム2</div>
  <div class="bg-gray-200 p-4">アイテム3</div>
</div>

<!-- 文字サイズもレスポンシブ -->
<h1 class="text-2xl md:text-4xl lg:text-6xl">レスポンシブな見出し</h1>
```

## 公式サイトを活用

- [Tailwind CSS 公式サイト](https://tailwindcss.com/) - 全クラスの辞書
- [Tailwind UI](https://tailwindui.com/) - コピペできるコンポーネント集
- [Headless UI](https://headlessui.com/) - アクセシブルなコンポーネント

## まとめ

**Tailwind CSS が適している人**

- 高速でプロトタイプを作りたい
- デザインの一貫性を保ちたい
- CSS ファイルを管理したくない
- レスポンシブデザインを簡単に作りたい

**学習のポイント**

1. **よく使うクラスから覚える** - p-4, m-4, bg-white など
2. **公式ドキュメントを活用** - 困ったときの辞書代わり
3. **実際に手を動かす** - 写経から始めて慣れる
4. **既存のデザインを再現** - 好きなサイトを真似してみる

最初は「クラス名が多くて大変」と感じるかもしれませんが、慣れてくると従来の CSS よりもずっと効率的に開発できるようになります。ぜひ試してみてください！
