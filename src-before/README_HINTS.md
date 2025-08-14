# ブログアプリケーション実装のヒント

このディレクトリには、ブログアプリケーションを実装するためのヒントとなるコードが含まれています。
TODO コメントとヒントを参考に、完全なブログアプリケーションを構築してください。

## 実装の順序（推奨）

### 1. 型定義の実装

- `types/index.ts` - PostData と PostMeta 型を定義

### 2. Markdown パーサーの実装

- `lib/markdown.ts` - Markdown 記事の読み込みと処理
- `lib/posts.ts` - 記事関連のユーティリティ関数

### 3. コンポーネントの実装

- `components/blog/PostCard.tsx` - 記事カードコンポーネント
- `components/blog/PostContent.tsx` - 記事本文表示コンポーネント
- `components/layout/Header.tsx` - ヘッダーコンポーネント
- `components/layout/Footer.tsx` - フッターコンポーネント

### 4. ページの実装

- `app/layout.tsx` - ルートレイアウト
- `app/page.tsx` - ホームページ
- `app/blog/page.tsx` - ブログ一覧ページ
- `app/blog/[slug]/page.tsx` - 記事詳細ページ
- `app/about/page.tsx` - About ページ

### 5. コンテンツの作成

- `content/blog/` - 最低 5 つの技術記事を Markdown で作成

## 必要なパッケージ

```bash
npm install gray-matter remark remark-html date-fns
npm install -D @types/remark @tailwindcss/typography
```

## ヒント

1. **型定義**: TypeScript の型を正しく定義することで、開発がスムーズになります
2. **Markdown パーサー**: gray-matter で frontmatter を解析し、remark で HTML に変換します
3. **動的ルーティング**: [slug]ディレクトリを使用して動的ルートを実装します
4. **静的生成**: generateStaticParams()を使用してビルド時に静的ページを生成します
5. **レスポンシブデザイン**: Tailwind CSS のユーティリティクラスを活用します

## チェックリスト

- [ ] TypeScript 型定義が完成している
- [ ] Markdown ファイルの読み込みができる
- [ ] 記事一覧が表示される
- [ ] 記事詳細ページが動作する
- [ ] タグによるフィルタリングができる
- [ ] レスポンシブデザインが実装されている
- [ ] 5 つ以上の記事が作成されている

## 参考資料

- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [gray-matter Documentation](https://github.com/jonschlinkert/gray-matter)
- [remark Documentation](https://github.com/remarkjs/remark)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
