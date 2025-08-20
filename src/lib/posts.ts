import type { PostData } from '@/types'

// TODO: 記事の読了時間を計算する関数を実装
export function getReadingTime(content: string): number {
  // ヒント:
  // 1. 1分間に読める単語数を200と仮定
  // 2. contentから単語数をカウント（split(/\s+/)を使用）
  // 3. Math.ceilで切り上げて分数を返す

  return 5 // 仮の値
}

// TODO: 日付を日本語形式にフォーマットする関数を実装
export function formatDate(dateString: string): string {
  // ヒント:
  // 1. new Date(dateString)で日付オブジェクトを作成
  // 2. Intl.DateTimeFormatを使用して日本語形式にフォーマット
  // 例: "2024年3月20日"

  return dateString // 仮の値
}

// TODO: 関連記事を取得する関数を実装
export function getRelatedPosts(currentPost: PostData, allPosts: PostData[], limit = 3): PostData[] {
  // ヒント:
  // 1. 現在の記事以外の記事をフィルタリング
  // 2. 各記事にスコアを付ける
  //    - 共通のタグがある場合: +2点
  //    - タイトルに共通の単語がある場合: +1点
  // 3. スコアの高い順にソート
  // 4. 上位limit件を返す

  return []
}

// TODO: 記事内容から見出しを抽出する関数を実装
export function extractHeadings(content: string): { id: string; text: string; level: number }[] {
  // ヒント:
  // 1. 正規表現で<h1>～<h6>タグを検索
  // 2. 各見出しから以下を抽出:
  //    - level: 見出しレベル（1～6）
  //    - text: 見出しテキスト（HTMLタグを除去）
  //    - id: テキストからIDを生成（小文字、スペースをハイフンに）

  return []
}
