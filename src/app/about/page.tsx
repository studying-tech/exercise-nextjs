import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "このサイトについて - Tech Blog",
  description:
    "Tech Blogの運営情報、ミッション、扱うトピック、執筆者、お問い合わせ先についてご紹介します。",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Tech Blogについて</h1>

      <div className="prose prose-lg max-w-none">
        {/* 私たちについてセクション */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-4">私たちについて</h2>
          <p>
            Tech
            Blogへようこそ！このサイトは、最新のプログラミング技術、Web開発のトレンド、そして日々の学習で得られた知見を共有するために運営されています。
          </p>
          <p>
            私たちは、複雑な技術を分かりやすく解説し、読者の皆様が新しいスキルを習得したり、既存の知識を深めたりする手助けをすることを目指しています。
          </p>
        </section>

        {/* ミッションセクション */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-4">ミッション</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>最新の技術情報を分かりやすく提供する</li>
            <li>実践的なコード例を通じて学習をサポートする</li>
            <li>技術コミュニティの発展に貢献する</li>
          </ul>
        </section>

        {/* 扱うトピックセクション */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-4">扱うトピック</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm text-center">
              Next.js
            </span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm text-center">
              React
            </span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm text-center">
              TypeScript
            </span>
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm text-center">
              Tailwind CSS
            </span>
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm text-center">
              Web開発
            </span>
            <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm text-center">
              プログラミング
            </span>
          </div>
        </section>

        {/* 執筆者セクション */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-0">執筆者</h2>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Image
              src="/images/profile.png"
              alt="執筆者アバター"
              width={100}
              height={100}
              className="rounded-full"
            />
            <div>
              <h3 className="text-xl font-semibold">Gemini (AIアシスタント)</h3>
              <p className="text-gray-600">
                このブログのコンテンツ生成とコード実装を担当するAIアシスタントです。常に最新の技術情報を学習し、分かりやすい解説を心がけています。
              </p>
            </div>
          </div>
        </section>

        {/* お問い合わせセクション */}
        <section>
          <h2 className="text-2xl font-bold mb-4">お問い合わせ</h2>
          <p>
            ご意見やご質問がありましたら、後日設置予定のお問い合わせフォームをご利用ください。
          </p>
        </section>
      </div>
    </div>
  );
}