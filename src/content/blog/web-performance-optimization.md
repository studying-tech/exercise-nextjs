---
title: 'Webパフォーマンス最適化の完全ガイド：Core Web Vitalsを改善する方法'
date: '2024-03-12'
author: '田中健二'
tags: ['パフォーマンス', 'Web開発', 'Core Web Vitals', '最適化']
excerpt: 'Webサイトのパフォーマンスを劇的に改善し、Core Web Vitalsのスコアを向上させるための実践的なテクニックを紹介します。'
coverImage: '/images/performance.jpg'
published: true
---

## Core Web Vitals とは

Core Web Vitals は、Google が提唱する Web ページのユーザー体験を測定するための重要な指標です。

### 3 つの主要指標

1. **LCP (Largest Contentful Paint)**: 最大コンテンツの描画時間
2. **FID (First Input Delay)**: 初回入力遅延
3. **CLS (Cumulative Layout Shift)**: 累積レイアウトシフト

## パフォーマンス測定ツール

### 1. Lighthouse

```bash
# CLI でLighthouseを実行
npx lighthouse https://example.com --output html --output-path ./report.html
```

### 2. Web Vitals ライブラリ

```javascript
import { getCLS, getFID, getLCP } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getLCP(console.log);
```

## 画像の最適化

### 1. 次世代フォーマットの使用

```html
<picture>
  <source srcset="image.avif" type="image/avif" />
  <source srcset="image.webp" type="image/webp" />
  <img src="image.jpg" alt="Description" loading="lazy" />
</picture>
```

### 2. Next.js Image コンポーネント

```tsx
import Image from 'next/image';

export function OptimizedImage() {
  return (
    <Image
      src='/hero.jpg'
      alt='Hero image'
      width={1200}
      height={600}
      priority // LCPに影響する画像の場合
      placeholder='blur'
      blurDataURL='data:image/jpeg;base64,...'
    />
  );
}
```

### 3. レスポンシブ画像

```tsx
<Image
  src='/photo.jpg'
  alt='Photo'
  sizes='(max-width: 768px) 100vw,
         (max-width: 1200px) 50vw,
         33vw'
  fill
  style={{ objectFit: 'cover' }}
/>
```

## JavaScript の最適化

### 1. コード分割

```tsx
// 動的インポート
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false,
});

// ルートベースの分割
const routes = [
  {
    path: '/dashboard',
    component: lazy(() => import('./pages/Dashboard')),
  },
  {
    path: '/analytics',
    component: lazy(() => import('./pages/Analytics')),
  },
];
```

### 2. Tree Shaking

```javascript
// ❌ 全体をインポート
import _ from 'lodash';
const result = _.debounce(fn, 300);

// ✅ 必要な関数のみインポート
import debounce from 'lodash/debounce';
const result = debounce(fn, 300);
```

### 3. バンドルサイズの分析

```json
{
  "scripts": {
    "analyze": "ANALYZE=true next build"
  }
}
```

```javascript
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // 設定
});
```

## CSS の最適化

### 1. Critical CSS

```tsx
// Critical CSSをインライン化
export default function Document() {
  return (
    <Html>
      <Head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
              .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

### 2. CSS-in-JS の最適化

```tsx
// styled-components の設定
import { ServerStyleSheet } from 'styled-components';

export async function getInitialProps(ctx) {
  const sheet = new ServerStyleSheet();
  const originalRenderPage = ctx.renderPage;

  try {
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {sheet.getStyleElement()}
        </>
      ),
    };
  } finally {
    sheet.seal();
  }
}
```

## ネットワーク最適化

### 1. リソースヒント

```html
<!-- DNS プリフェッチ -->
<link rel="dns-prefetch" href="https://fonts.googleapis.com" />

<!-- プリコネクト -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

<!-- プリロード -->
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin />

<!-- プリフェッチ -->
<link rel="prefetch" href="/next-page.js" />
```

### 2. キャッシュ戦略

```javascript
// Service Worker でのキャッシュ
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // キャッシュがあれば返す
      if (response) {
        return response;
      }

      // なければネットワークから取得
      return fetch(event.request).then((response) => {
        // レスポンスをキャッシュに保存
        return caches.open('v1').then((cache) => {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});
```

### 3. CDN の活用

```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['cdn.example.com'],
    loader: 'cloudinary',
    path: 'https://res.cloudinary.com/myaccount/',
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://cdn.example.com' : '',
};
```

## レンダリング最適化

### 1. サーバーサイドレンダリング (SSR)

```tsx
export async function getServerSideProps(context) {
  const data = await fetchData();

  return {
    props: {
      data,
    },
  };
}
```

### 2. 静的生成 (SSG)

```tsx
export async function getStaticProps() {
  const posts = await getAllPosts();

  return {
    props: {
      posts,
    },
    revalidate: 3600, // ISR: 1時間ごとに再生成
  };
}
```

### 3. ストリーミング SSR

```tsx
// app/page.tsx (App Router)
import { Suspense } from 'react';

async function SlowComponent() {
  const data = await slowDataFetch();
  return <div>{data}</div>;
}

export default function Page() {
  return (
    <>
      <FastComponent />
      <Suspense fallback={<Loading />}>
        <SlowComponent />
      </Suspense>
    </>
  );
}
```

## 実装チェックリスト

### LCP 改善

- [ ] 重要な画像に priority 属性を設定
- [ ] フォントの事前読み込み
- [ ] Critical CSS のインライン化
- [ ] サーバー応答時間の最適化

### FID 改善

- [ ] 大きな JavaScript タスクの分割
- [ ] Web Worker の活用
- [ ] 入力イベントの優先度設定
- [ ] メインスレッドのブロッキング回避

### CLS 改善

- [ ] 画像・動画のサイズ指定
- [ ] 広告要素の領域予約
- [ ] フォントの事前読み込み
- [ ] アニメーションの transform 使用

## パフォーマンス監視

```typescript
// Real User Monitoring (RUM)
export function reportWebVitals(metric) {
  const body = JSON.stringify(metric);

  // Analyticsサービスに送信
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/analytics', body);
  } else {
    fetch('/analytics', {
      body,
      method: 'POST',
      keepalive: true,
    });
  }
}
```

## まとめ

Web パフォーマンスの最適化は、ユーザー体験と SEO の両方に大きな影響を与えます。Core Web Vitals の改善は継続的なプロセスであり、定期的な測定と改善が必要です。

これらのテクニックを実装することで、より高速で快適な Web サイトを提供し、ユーザー満足度とコンバージョン率の向上を実現できるでしょう。
