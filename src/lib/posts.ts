import type { Post, PostData } from '@/types'
import { getAllPosts } from './markdown'

/**
 * 記事の読了時間を分単位で計算する
 * @param content - HTMLコンテンツ文字列
 */
export function getReadingTime(content: string): number {
  const WPM = 200 // 1分あたりの単語数 (Words Per Minute)
  
  // HTMLタグを正規表現で削除し、テキストのみを抽出
  const text = content.replace(/<[^>]*>/g, '')
  
  // テキストをスペースで区切り、単語数をカウント
  const wordCount = text.split(/\s+/).filter(Boolean).length
  
  // 読了時間（分）を計算し、切り上げる
  const readingTime = Math.ceil(wordCount / WPM)
  
  return readingTime
}

/**
 * 日付を日本語の年月日形式（例: 2024年8月24日）にフォーマットする
 * @param dateString - 日付文字列 (例: '2024-08-24')
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

// TODO: 関連記事を取得する関数を実装
/**
 * 関連記事を取得する
 * @param currentPost - 現在の記事データ
 * @param allPosts - すべての記事データ
 * @param limit - 取得する関連記事の最大数
 */
export function getRelatedPosts(currentPost: PostData, allPosts: PostData[], limit = 3): PostData[] {
  if (!currentPost || !allPosts || allPosts.length === 0) {
    return [];
  }

  const relatedPostsWithScore = allPosts
    .filter(post => post.slug !== currentPost.slug) // 1. 現在の記事以外の記事をフィルタリング
    .map(post => {
      let score = 0;
      // 共通のタグがある場合: +2点
      if (currentPost.tags && post.tags) {
        currentPost.tags.forEach(currentTag => {
          if (post.tags.includes(currentTag)) {
            score += 2;
          }
        });
      }

      // タイトルに共通の単語がある場合: +1点
      const currentTitleWords = currentPost.title.toLowerCase().split(/\s+/).filter(Boolean);
      const postTitleWords = post.title.toLowerCase().split(/\s+/).filter(Boolean);

      currentTitleWords.forEach(word => {
        if (postTitleWords.includes(word)) {
          score += 1;
        }
      });

      return { post, score };
    })
    .filter(item => item.score > 0) // スコアが0より大きい記事のみ
    .sort((a, b) => b.score - a.score) // スコアの高い順にソート
    .map(item => item.post);

  return relatedPostsWithScore.slice(0, limit); // 上位limit件を返す
}

/**
 * 記事内容から見出しを抽出し、目次用のデータを生成する
 * @param content - HTMLコンテンツ文字列またはMarkdownコンテンツ文字列
 * @param isRawMarkdown - 生のMarkdownかどうか（MDXファイルの場合true）
 * @returns 見出しの配列（id, text, level）
 */
export function extractHeadings(content: string, isRawMarkdown = false): { id: string; text: string; level: number }[] {
  const headings: { id: string; text: string; level: number }[] = [];

  if (isRawMarkdown) {
    // Markdown形式の見出しを検索する正規表現
    const regex = /^(#{1,6})\s+(.+)$/gm;
    let match;

    while ((match = regex.exec(content)) !== null) {
      const level = match[1].length; // # の数が見出しレベル
      const text = match[2].trim(); // 見出しテキスト
      
      // IDを生成（rehypeSlugと同じロジックで生成）
      const id = text
        .toLowerCase()
        .replace(/\s+/g, '-') // スペースをハイフンに
        .replace(/[^\w\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF-]/g, '') // 日本語文字と英数字、ハイフンのみ残す
        .replace(/-+/g, '-') // 連続するハイフンを一つに
        .replace(/^-|-$/g, '') // 先頭・末尾のハイフンを削除

      headings.push({ id, text, level });
    }
  } else {
    // HTML形式の見出しを検索する正規表現
    const regex = /<h([1-6])[^>]*id=["']([^"']+)["'][^>]*>(.*?)<\/h\1>/g;
    let match;

    while ((match = regex.exec(content)) !== null) {
      const level = parseInt(match[1], 10); // 見出しレベル (1～6)
      const id = match[2]; // 既存のID属性を使用
      const rawText = match[3]; // 見出しのHTMLを含むテキスト

      // HTMLタグを除去して純粋なテキストを取得
      const text = rawText.replace(/<[^>]*>/g, '');

      headings.push({ id, text, level });
    }
  }

  return headings;
}

/**
 * すべての記事からタグを集計し、出現回数と共に返す
 */
export async function getAllTags(): Promise<{ name: string; count: number }[]> {
  const posts = await getAllPosts()
  const tagCounts: Record<string, number> = {}

  posts.forEach((post) => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach((tag: string) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1
      })
    }
  })

  const sortedTags = Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)

  return sortedTags
}