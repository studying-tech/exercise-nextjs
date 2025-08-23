import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { remark } from 'remark'
import html from 'remark-html'
import { serialize } from 'next-mdx-remote/serialize'
import type { Post, PostData } from '@/types'

const postsDirectory = path.join(process.cwd(), 'src/content/blog')

/**
 * /src/content/blog 内のすべての .md と .mdx ファイル名をslugとして取得
 */
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.(md|mdx)$/, ''))
}

/**
 * slugに基づいて記事のデータを取得
 */
export async function getPostBySlug(slug: string): Promise<PostData | null> {
  try {
    // .md と .mdx の両方をチェック
    let fullPath = path.join(postsDirectory, `${slug}.md`)
    let isMdx = false
    
    if (!fs.existsSync(fullPath)) {
      fullPath = path.join(postsDirectory, `${slug}.mdx`)
      isMdx = true
    }
    
    if (!fs.existsSync(fullPath)) {
      return null
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // gray-matterでfrontmatterとcontentを解析
    const { data, content } = matter(fileContents)

    let contentHtml: string

    if (isMdx) {
      // MDXファイルの場合、next-mdx-remoteでシリアライズ
      const mdxSource = await serialize(content)
      // シリアライズされたMDXをHTMLとして扱う（実際の表示はMDXRemoteで行う）
      contentHtml = content // MDXの生のコンテンツを保持
    } else {
      // Markdownファイルの場合、remarkでHTMLに変換
      const processedContent = await remark().use(html).process(content)
      contentHtml = processedContent.toString()
    }

    // PostDataオブジェクトとして返す
    return {
      slug,
      content: contentHtml,
      isMdx,
      ...(data as { [key: string]: any }),
    } as PostData
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

/**
 * すべての記事を日付の新しい順で取得
 */
export async function getAllPosts(): Promise<PostData[]> {
  const slugs = getAllPostSlugs()
  const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)))

  const validPosts = posts.filter((post): post is PostData => post !== null)

  return validPosts
    .filter((post) => post.published !== false) // 下書き(published: false)を除外
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
}

/**
 * 特定のタグを持つ記事を取得
 */
export async function getPostsByTag(tag: string): Promise<PostData[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter((post) => post.tags && post.tags.includes(tag))
}