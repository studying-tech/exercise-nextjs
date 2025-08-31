import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { remark } from 'remark'
import html from 'remark-html'
import type { PostData } from '@/types'

const postsDirectory = path.join(process.cwd(), 'src/content/blog')

export function getAllPostSlugs() {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      return {
        slug: fileName.replace(/\.md$/, ''),
      }
    })
}

export async function getPostBySlug(slug: string): Promise<PostData | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const { data, content } = matter(fileContents)

    const processedContent = await remark().use(html).process(content)
    const contentHtml = processedContent.toString()

    return {
      slug,
      content: contentHtml,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString(),
      author: data.author || 'Anonymous',
      tags: data.tags || [],
      excerpt: data.excerpt || '',
      coverImage: data.coverImage,
      published: data.published ?? true,
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

export async function getAllPosts(): Promise<PostData[]> {
  const slugs = getAllPostSlugs()
  const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug.slug)))

  return posts
    .filter((post): post is PostData => post !== null && post.published)
    .sort((a, b) => (a.date > b.date ? -1 : 1))
}

export async function getPostsByTag(tag: string): Promise<PostData[]> {
  const posts = await getAllPosts()
  return posts.filter((post) => post.tags.includes(tag))
}

export function getAllTags(): string[] {
  const slugs = getAllPostSlugs()
  const tags = new Set<string>()

  slugs.forEach(({ slug }) => {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)

    if (data.tags && Array.isArray(data.tags)) {
      data.tags.forEach((tag: string) => tags.add(tag))
    }
  })

  return Array.from(tags).sort()
}
