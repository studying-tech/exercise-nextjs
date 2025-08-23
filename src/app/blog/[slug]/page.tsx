import Link from "next/link";
import { notFound } from "next/navigation";
import { PostContent } from "@/components/blog/PostContent";
import { getAllPostSlugs, getPostBySlug, getAllPosts } from "@/lib/markdown"; // getAllPostsを追加
import {
  formatDate,
  getReadingTime,
  getRelatedPosts,
  extractHeadings,
} from "@/lib/posts"; // extractHeadingsを追加
import type { Metadata } from "next";
import { ClockIcon } from "@heroicons/react/24/outline";
import { PostCard } from "@/components/blog/PostCard"; // PostCardを追加

interface PageProps {
  params: {
    slug: string;
  };
}

/**
 * ビルド時に静的生成するパスのリストを生成
 */
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

/**
 * ページごとのメタデータを動的に生成
 */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "記事が見つかりません",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt || "ブログ記事",
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const post = await getPostBySlug(params.slug);
  const allPosts = await getAllPosts(); // 全記事データを取得

  if (!post || !post.published) {
    notFound();
  }

  const readingTime = getReadingTime(post.content);
  const relatedPosts = getRelatedPosts(post, allPosts); // 関連記事を取得

  const headings = extractHeadings(post.content); // 見出しを抽出

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={`${post.title}のカバー画像`}
          className="w-full h-auto max-h-[500px] object-cover rounded-lg mb-8 shadow-lg"
        />
      )}

      <header className="mb-8">
        <Link href="/blog" className="text-blue-600 hover:underline">
          &larr; ブログ一覧へ戻る
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold my-4 leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 text-gray-600">
          <span>{post.author}</span>
          <span>&middot;</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>&middot;</span>
          <div className="flex items-center gap-1">
            <ClockIcon className="h-5 w-5" />
            <span>約{readingTime}分</span>
          </div>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="flex gap-2 mt-4 flex-wrap">
            {post.tags.map((tag: string) => (
              <Link
                key={tag}
                href={`/blog/tag/${tag}`}
                className="bg-gray-200 text-sm text-gray-700 px-3 py-1 rounded-full hover:bg-gray-300 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
      </header>

      {headings.length > 0 && (
        <nav className="mb-8 p-6 bg-gray-50 rounded-lg shadow-inner">
          <h3 className="text-xl font-bold mb-4">目次</h3>
          <ul className="list-disc list-inside space-y-2">
            {headings.map((heading) => (
              <li
                key={heading.id}
                className={`text-gray-700 text-base ml-${
                  (heading.level - 2) * 4
                }`}
              >
                <a
                  href={`#${heading.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <PostContent content={post.content} />

      {relatedPosts.length > 0 && (
        <section className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold mb-6">関連記事</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <PostCard key={relatedPost.slug} post={relatedPost} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
