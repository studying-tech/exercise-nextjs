# 11 Next.js 商品カタログ - SSG と ISR を活用した高性能サイト構築

[GitHub Repository](https://github.com/studying-tech/exercise-nextjs)

Next.js 14 の App Router を活用して、SSG（静的サイト生成）と ISR（インクリメンタル静的再生成）を駆使した高性能な商品カタログサイトを構築し、モダンな Web 開発の実践的なスキルを学習します。

## この演習で学べること

- Next.js 14 の App Router の活用方法
- SSG/ISR による高性能サイトの構築
- Server Components と Client Components の使い分け
- 画像最適化とパフォーマンス最適化
- SEO 対策とアクセシビリティ対応

## 演習の目標

パフォーマンス、SEO、アクセシビリティに優れた商品カタログサイトを開発します。Lighthouse スコア 95 点以上を目指し、実務で即座に活用できる高品質な Web アプリケーションを完成させます。

## 前提条件

- Node.js 18.0 以上
- npm または yarn
- React の基本知識
- TypeScript の基本文法
- Next.js の基礎知識

## クイックスタート

```sh
# 1. ディレクトリに移動
cd repos/11

# 2. 依存関係のインストール
npm install

# 3. 開発サーバーの起動
npm run dev

# 4. ブラウザでアクセス
# http://localhost:3000

# 5. ビルドとプレビュー
npm run build
npm start

# 6. Vercelへのデプロイ
vercel --prod
```

## プロジェクト構成

```txt
/
├── src/                        # ソースコード
│   ├── app/                    # App Router
│   │   ├── api/                # API Routes
│   │   │   └── products/       # 商品API
│   │   ├── products/           # 商品ページ
│   │   │   └── [id]/           # 動的ルート
│   │   ├── globals.css         # グローバルCSS
│   │   ├── layout.tsx          # ルートレイアウト
│   │   └── page.tsx            # ホームページ
│   ├── components/             # Reactコンポーネント
│   │   ├── layout/             # レイアウト関連
│   │   ├── products/           # 商品関連
│   │   ├── categories/         # カテゴリー関連
│   │   └── home/               # ホーム関連
│   ├── lib/                    # ユーティリティ
│   │   └── products.ts         # データ取得関数
│   ├── types/                  # TypeScript型定義
│   └── data/                   # サンプルデータ
├── public/                     # 静的ファイル
├── tests/                      # テストファイル
├── next.config.js              # Next.js設定
├── tailwind.config.js          # Tailwind設定
├── package.json               # パッケージ設定
├── tsconfig.json              # TypeScript設定
└── README.md                  # このファイル
```

## 開発の進め方

### ステップ 1: App Router の基本構造を作成

ページ、レイアウト、API ルートの基本構成を実装します。

```ts
// src/app/layout.tsx
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Product Catalog',
  description: 'High-performance product catalog with Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

### ステップ 2: SSG/ISR の実装

静的生成とインクリメンタル再生成を設定します。

```ts
// src/app/page.tsx
export const revalidate = 3600; // 1時間ごとに再生成

export default async function HomePage() {
  const [featuredProducts, newProducts, categories] = await Promise.all([
    getFeaturedProducts(8),
    getNewProducts(8),
    getCategories(),
  ]);

  return <main>{/* コンポーネント */}</main>;
}
```

### ステップ 3: パフォーマンス最適化

画像最適化、コード分割、キャッシュ戦略を実装します。

```ts
// 画像最適化
import Image from 'next/image';

<Image
  src={product.images[0]}
  alt={product.name}
  fill
  className='object-cover'
  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
  priority={index < 3} // LCP最適化
/>;
```

## 必須要件

- [ ] Next.js 14 の App Router を使用した実装
- [ ] SSG/ISR による静的生成と再検証
- [ ] 画像最適化とパフォーマンス最適化
- [ ] SEO 対策（動的メタデータ、構造化データ）
- [ ] アクセシビリティ対応（ARIA、キーボード操作）
- [ ] Vercel へのデプロイ

## 追加課題（オプション）

- [ ] 検索機能（リアルタイム候補表示）
- [ ] フィルタリング・ソート機能
- [ ] PWA 対応
- [ ] 国際化（i18n）対応
- [ ] ウィッシュリスト機能
- [ ] A/B テスト機能
- [ ] オフライン対応

## 採点基準

| 項目                  | 配点  | 評価内容                      |
| --------------------- | ----- | ----------------------------- |
| 機能性                | 40 点 | SSG/ISR、データ取得、基本機能 |
| パフォーマンス        | 30 点 | Lighthouse スコア、最適化     |
| SEO・アクセシビリティ | 20 点 | メタデータ、ARIA 属性         |
| コード品質            | 10 点 | TypeScript、コンポーント設計  |

## トラブルシューティング

### ビルドエラー

**問題**: ビルドが失敗する
**解決方法**:

```sh
# キャッシュクリア
rm -rf .next node_modules
npm install
npm run build
```

### 画像が表示されない

**問題**: Next/Image で外部画像が表示されない
**解決方法**:

```js
// next.config.js
module.exports = {
  images: {
    domains: ['example.com'], // 許可するドメインを追加
  },
};
```

### パフォーマンスの問題

**問題**: Lighthouse スコアが低い
**解決方法**:

- 画像の sizes 属性を適切に設定
- priority 属性で LCP 画像を最適化
- 不要な JavaScript の削減

## 参考資料

- [Next.js 14 Documentation](https://nextjs.org/docs)
- [Next.js Learn](https://nextjs.org/learn)
- [React Server Components](https://react.dev/reference/react/use-server)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Web Vitals](https://web.dev/vitals/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## 課題提出方法

1. このリポジトリをフォーク
2. `submission/[あなたの名前]` ブランチを作成
3. Next.js 商品カタログを実装
4. プルリクエストを作成
5. 自動採点の結果を確認
6. 必要に応じて修正

### 詳細な提出手順

#### 1. リポジトリのフォーク

```sh
# GitHub で Fork ボタンをクリック後
git clone https://github.com/[あなたのユーザー名]/exercise-nextjs.git
cd exercise-nextjs
```

#### 2. ブランチ作成

```sh
git checkout -b submission/taro-yamada
```

#### 3. 実装とコミット

```sh
# 基本構造の実装
git add src/app/
git commit -m "feat: App Routerを使用した基本ページ構造を実装"

# SSG/ISRの実装
git add src/app/page.tsx src/app/products/
git commit -m "feat: SSGとISRによる静的生成と再検証を実装"

# パフォーマンス最適化
git add src/app/ src/components/
git commit -m "perf: 画像最適化とコード分割を実装"

# Vercelデプロイ後
git add deployment-url.txt
git commit -m "docs: VercelデプロイURLを記録"
```

#### 4. プッシュと PR 作成

```sh
git push origin submission/taro-yamada
```

GitHub でプルリクエストを作成：

- タイトル: `[提出] 演習11: Next.js商品カタログ - 山田太郎`
- 本文: Vercel の URL、SSG/ISR の詳細、Lighthouse スコアを記載

## 開発のヒント

### App Router の活用

- Server Components をデフォルトで使用
- `'use client'`は必要最小限に
- データフェッチはサーバーコンポーネントで

### SSG/ISR の設定

```ts
// ページレベルでのrevalidate
export const revalidate = 60; // 60秒ごとに再検証

// 動的パラメータの事前生成
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ id: p.id }));
}
```

### パフォーマンス最適化

- 画像の`sizes`属性を適切に設定
- LCP 画像に`priority`を追加
- 動的 import でコンポーネントを分割

頑張って高性能な商品カタログサイトを構築してください！
