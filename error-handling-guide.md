# Next.js App Router エラーハンドリングガイド

## error.tsxの概要

Next.js App Routerでは、`error.tsx`ファイルを使用して自動的にエラーハンドリングを行うことができます。このファイルは**importする必要がなく**、ファイル名で自動認識される特別なファイルです。

## 配置場所と適用範囲

```
src/app/
├── error.tsx           # アプリ全体のエラーをキャッチ
├── blog/
│   ├── error.tsx       # /blog セクション内のエラーをキャッチ
│   └── [slug]/
│       └── error.tsx   # 特定のブログ記事のエラーをキャッチ
```

## 自動的に使用される場面

### 1. サーバーエラー
```typescript
// 例: /blog/[slug]/page.tsx
export default async function PostPage({ params }: PageProps) {
  const post = await getPostBySlug(params.slug) // データベースエラー
  throw new Error('データ取得に失敗') // ←error.tsxが自動表示
}
```

### 2. JavaScript実行エラー
```typescript
// 例: コンポーネント内でエラー発生
export default function SomeComponent() {
  const data = null
  return <div>{data.property}</div> // ←error.tsxが自動表示
}
```

### 3. 非同期処理のエラー
```typescript
// 例: API呼び出しエラー
useEffect(() => {
  fetchData().catch(error => {
    throw error // ←error.tsxが自動表示
  })
}, [])
```

## error.tsxの実装例

```typescript
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            エラーが発生しました
          </h1>
          <p className="text-gray-600">
            申し訳ありませんが、問題が発生しました。
          </p>
        </div>
        
        {/* 開発環境でのみエラーメッセージを表示 */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-left">
            <p className="text-sm text-red-600 font-mono">
              {error.message}
            </p>
          </div>
        )}
        
        <button
          onClick={reset}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          再試行
        </button>
      </div>
    </div>
  )
}
```

## error.tsxの機能

1. **エラーキャッチ** - JavaScript エラーを自動検知
2. **フォールバック表示** - エラー時の代替UI表示  
3. **リトライ機能** - `reset()`でページ再読み込み
4. **開発環境サポート** - エラーメッセージの詳細表示

## Next.js App Routerの特別ファイル

以下のファイルは**importしなくても自動的に使用**されます：

```
src/app/
├── layout.tsx      # レイアウト（自動適用）
├── page.tsx        # ページコンポーネント（自動ルーティング）
├── loading.tsx     # ローディング画面（自動表示）
├── error.tsx       # エラー画面（自動表示）
├── not-found.tsx   # 404画面（自動表示）
└── template.tsx    # テンプレート（自動適用）
```

## 従来のReactとの違い

### 従来のReact Error Boundary
```typescript
// ❌ 手動でError Boundaryを配置
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
```

### Next.js App Router
```typescript
// ✅ error.tsxを置くだけで自動適用
// src/app/error.tsx ← これだけで全体をカバー
```

## 使用例

```typescript
// 存在しないブログ記事にアクセス
// /blog/non-existent-post
// ↓
// getPostBySlug() でエラー発生
// ↓ 
// error.tsx が自動表示される
```

## まとめ

- `error.tsx`は**React Error Boundary**のNext.js版
- **ファイル名で自動認識**される特別ファイル
- **importは不要**で、配置するだけで機能する
- アプリ内でエラーが発生した際に**自動的に表示**される
- **ファイルベースの自動機能**でエラーハンドリングが簡単に実装できる