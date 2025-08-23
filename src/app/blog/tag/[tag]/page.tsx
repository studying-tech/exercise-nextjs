import { PostCard } from "@/components/blog/PostCard";
import { getAllTags } from "@/lib/posts"; // getAllTagsはposts.tsから
import { getPostsByTag } from "@/lib/markdown"; // getPostsByTagはmarkdown.tsから
import type { Metadata } from "next";
import Link from "next/link";

interface PageProps {
  params: {
    tag: string;
  };
}

// ビルド時に静的生成するパスのリストを生成
export async function generateStaticParams() {
  const tags = await getAllTags(); // すべてのタグを取得
  return tags.map((tag) => ({
    tag: tag.name, // タグ名をparamsとして返す
  }));
}

// ページごとのメタデータを動的に生成
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const tagName = decodeURIComponent(params.tag); // URLエンコードをデコード
  return {
    title: `タグ: ${tagName} の記事一覧 - Tech Blog`,
    description: `タグ「${tagName}」に関連するTech Blogの記事一覧です。`,
  };
}

export default async function TagPage({ params }: PageProps) {
  const tagName = decodeURIComponent(params.tag); // URLエンコードをデコード
  const posts = await getPostsByTag(tagName); // そのタグの記事を取得

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          <span className="text-blue-600">{tagName}</span> の記事
        </h1>

        {posts.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            タグ「{tagName}」に関連する記事はまだありません。
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <Link href="/blog" className="text-blue-600 hover:underline">
            &larr; すべてのブログ記事へ戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
