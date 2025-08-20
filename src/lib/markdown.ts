import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { remark } from 'remark'
import html from 'remark-html'
import type { PostData } from '@/types'

const postsDirectory = path.join(process.cwd(), 'src/content/blog')

// TODO: すべての記事のスラッグを取得する関数を実装
export function getAllPostSlugs() {
  // ヒント:
  // 1. postsDirectoryが存在するか確認
  // 2. fs.readdirSyncでファイル一覧を取得
  // 3. .mdファイルのみをフィルタリング
  // 4. ファイル名から.mdを除去してslugとして返す
  // 例:
  // return [
  //   { slug: 'getting-started-with-nextjs' },
  //   { slug: 'typescript-best-practices' }
  // ]
}

// TODO: スラッグから記事データを取得する関数を実装
export async function getPostBySlug(slug: string): Promise<PostData | null> {
  try {
    // ヒント:
    // 1. path.joinでファイルパスを作成
    // 2. fs.readFileSyncでファイル内容を読み込み
    // 3. gray-matterでfrontmatterとcontentを分離
    // 4. remarkでMarkdownをHTMLに変換
    // 5. PostData型のオブジェクトを返す

    const fullPath = path.join(postsDirectory, `${slug}.md`)
    // TODO: ファイルを読み込む

    // TODO: gray-matterで解析
    // const { data, content } = matter(fileContents);

    // TODO: MarkdownをHTMLに変換
    // const processedContent = await remark()
    //   .use(html)
    //   .process(content);

    // TODO: PostDataオブジェクトを返す
    return null
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

// TODO: すべての記事を取得する関数を実装
export async function getAllPosts(): Promise<PostData[]> {
  // ヒント:
  // 1. getAllPostSlugs()で全スラッグを取得
  // 2. 各スラッグに対してgetPostBySlug()を実行
  // 3. nullを除外
  // 4. publishedがtrueの記事のみフィルタリング
  // 5. 日付順（新しい順）でソート

  return []
}

// TODO: 特定のタグを持つ記事を取得する関数を実装
export async function getPostsByTag(tag: string): Promise<PostData[]> {
  // ヒント: getAllPosts()を使用してtagsにtagが含まれる記事をフィルタリング

  return []
}

// TODO: すべてのタグを取得する関数を実装
export function getAllTags(): string[] {
  // ヒント:
  // 1. すべての記事からタグを収集
  // 2. Setを使用して重複を除去
  // 3. ソートして返す

  return []
}
