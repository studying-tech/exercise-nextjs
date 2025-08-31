---
title: 'Vercelデプロイ完全ガイド：Next.jsアプリを本番環境へ'
date: '2024-03-10'
author: '高橋美咲'
tags: ['Vercel', 'デプロイメント', 'Next.js', 'CI/CD']
excerpt: 'Next.jsアプリケーションをVercelにデプロイし、本番環境で運用するための完全ガイド。環境変数、ドメイン設定、最適化まで詳しく解説。'
coverImage: '/images/vercel-deploy.jpg'
published: true
---

## Vercel とは

Vercel は、Next.js の開発元が提供するクラウドプラットフォームで、フロントエンドアプリケーションのデプロイと運用に特化しています。

### 主な特徴

- **ゼロコンフィグデプロイ**: GitHub と連携するだけで自動デプロイ
- **グローバル CDN**: 世界中のエッジロケーションから配信
- **自動 HTTPS**: SSL 証明書の自動取得と更新
- **プレビューデプロイ**: PR ごとに独立した環境を自動生成

## デプロイの準備

### 1. プロジェクトの最適化

```javascript
// next.config.js
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.example.com'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizeCss: true,
  },
};
```

### 2. 環境変数の設定

```bash
# .env.local (開発環境)
DATABASE_URL=postgresql://localhost:5432/myapp
NEXT_PUBLIC_API_URL=http://localhost:3001
SECRET_KEY=development-secret-key

# .env.production (本番環境)
DATABASE_URL=$DATABASE_URL
NEXT_PUBLIC_API_URL=https://api.example.com
SECRET_KEY=$SECRET_KEY
```

### 3. ビルドの確認

```bash
# ローカルでビルドテスト
npm run build
npm run start

# ビルドサイズの確認
npm run analyze
```

## Vercel へのデプロイ

### 方法 1: Vercel CLI を使用

```bash
# Vercel CLIのインストール
npm i -g vercel

# ログイン
vercel login

# デプロイ
vercel

# 本番環境へデプロイ
vercel --prod
```

### 方法 2: GitHub と連携

1. [Vercel Dashboard](https://vercel.com) にアクセス
2. "Import Project" をクリック
3. GitHub リポジトリを選択
4. 環境変数を設定
5. "Deploy" をクリック

### 方法 3: vercel.json で詳細設定

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "headers": {
        "Cache-Control": "s-maxage=60"
      }
    },
    {
      "src": "/(.*)",
      "headers": {
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
        "X-XSS-Protection": "1; mode=block"
      }
    }
  ],
  "env": {
    "NODE_ENV": "production"
  },
  "regions": ["hnd1"],
  "functions": {
    "app/api/heavy-task/route.ts": {
      "maxDuration": 60
    }
  }
}
```

## 環境変数の管理

### Vercel Dashboard での設定

```typescript
// 環境変数の型定義
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      NEXT_PUBLIC_API_URL: string;
      SECRET_KEY: string;
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}

// 環境変数のバリデーション
function validateEnv() {
  const required = ['DATABASE_URL', 'SECRET_KEY'];

  for (const key of required) {
    if (!process.env[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  }
}

validateEnv();
```

### 環境別の設定

```typescript
// lib/config.ts
const config = {
  development: {
    apiUrl: 'http://localhost:3001',
    enableDebug: true,
    cacheTime: 0,
  },
  production: {
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
    enableDebug: false,
    cacheTime: 3600,
  },
};

export default config[process.env.NODE_ENV || 'development'];
```

## カスタムドメインの設定

### 1. ドメインの追加

```bash
# CLIでドメインを追加
vercel domains add example.com

# DNSレコードの確認
vercel domains inspect example.com
```

### 2. DNS 設定

```
# Aレコード (Apex domain)
@ A 76.76.21.21

# CNAMEレコード (Subdomain)
www CNAME cname.vercel-dns.com

# ワイルドカード
* CNAME cname.vercel-dns.com
```

### 3. リダイレクト設定

```javascript
// next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: '/old-blog/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
      {
        source: '/(.*)',
        has: [
          {
            type: 'host',
            value: 'www.example.com',
          },
        ],
        destination: 'https://example.com/:path*',
        permanent: true,
      },
    ];
  },
};
```

## モニタリングと Analytics

### 1. Vercel Analytics

```tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

### 2. エラー監視

```typescript
// lib/monitoring.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
  beforeSend(event) {
    if (event.exception) {
      console.error('Error captured:', event.exception);
    }
    return event;
  },
});

export function captureError(error: Error, context?: Record<string, any>) {
  console.error('Application error:', error);
  Sentry.captureException(error, {
    extra: context,
  });
}
```

## CI/CD パイプライン

### GitHub Actions との統合

```yaml
# .github/workflows/preview.yml
name: Vercel Preview Deployment

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Run type check
        run: npm run type-check

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## パフォーマンス最適化

### 1. Edge Functions

```typescript
// app/api/geo/route.ts
import { NextRequest } from 'next/server';
import { geolocation } from '@vercel/edge';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { country, city } = geolocation(request);

  return new Response(
    JSON.stringify({
      country: country || 'unknown',
      city: city || 'unknown',
    }),
    {
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, s-maxage=3600',
      },
    }
  );
}
```

### 2. ISR (Incremental Static Regeneration)

```typescript
// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export const revalidate = 3600; // 1時間ごとに再生成

export default async function BlogPost({ params }) {
  const post = await getPost(params.slug);
  return <Article post={post} />;
}
```

### 3. 画像最適化

```typescript
// Vercel Image Optimization API
import Image from 'next/image';

export function OptimizedImage({ src, alt }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={800}
      height={600}
      quality={85}
      loading='lazy'
      placeholder='blur'
      blurDataURL='data:image/svg+xml;base64,...'
    />
  );
}
```

## セキュリティ設定

### 1. セキュリティヘッダー

```javascript
// next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' *.vercel.com",
  },
];

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};
```

### 2. 認証保護

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAuth } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token');

  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!token || !(await verifyAuth(token.value))) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
```

## トラブルシューティング

### よくある問題と解決策

1. **ビルドエラー**

```bash
# ローカルでビルドを確認
npm run build

# キャッシュをクリア
rm -rf .next
npm run build
```

2. **環境変数が読み込まれない**

```typescript
// 環境変数のデバッグ
console.log('Environment:', process.env.NODE_ENV);
console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
```

3. **デプロイ失敗**

```bash
# Vercel CLIでログを確認
vercel logs

# 特定のデプロイメントのログ
vercel logs [deployment-url]
```

## まとめ

Vercel は Next.js アプリケーションのデプロイに最適化されたプラットフォームで、開発者体験と本番環境のパフォーマンスの両方を高水準で提供します。

適切な設定と最適化により、高速で安全、そしてスケーラブルな Web アプリケーションを簡単に運用できます。継続的なモニタリングと改善により、さらなるパフォーマンス向上を目指しましょう。
