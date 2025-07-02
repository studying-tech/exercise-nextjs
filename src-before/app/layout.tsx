import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

// 【課題1】Inter フォントを設定してください
// 要件:
// - subsets: ['latin']
// - variable: '--font-inter'
const inter = Inter({
  /* ここに実装 */
});

// 【課題2】メタデータを定義してください
// 要件:
// - title: デフォルトとテンプレートを設定
// - description: サイトの説明
// - keywords: 関連キーワード配列
// - openGraph: OGP情報
export const metadata: Metadata = {
  title: {
    default: /* ここに実装 - 'モダン商品カタログ' */,
    template: /* ここに実装 - '%s | モダン商品カタログ' */,
  },
  description: /* ここに実装 - 説明文 */,
  keywords: /* ここに実装 - ['Next.js', 'React', ...] */,
  openGraph: {
    /* ここに実装 - type: 'website', locale: 'ja_JP' など */
  },
};

// 【課題3】RootLayoutコンポーネントを実装してください
// 要件:
// - children: React.ReactNode を受け取る
// - html要素にlang="ja"を設定
// - body要素にInterフォントのクラスを適用
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={/* ここに実装 */}>
      <body className={/* ここに実装 - フォントクラス */}>
        {/* 【課題4】レイアウト構造を実装してください
            要件:
            - flex min-h-screen flex-col クラスでラップ
            - Header、main（flex-1）、Footer の順番
        */}
        <div className={/* ここに実装 */}>
          {/* ここに実装 - Header */}
          <main className={/* ここに実装 */}>
            {children}
          </main>
          {/* ここに実装 - Footer */}
        </div>
      </body>
    </html>
  );
}