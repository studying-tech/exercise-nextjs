import type { PostData } from '@/types'

export function getReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function getRelatedPosts(currentPost: PostData, allPosts: PostData[], limit = 3): PostData[] {
  const otherPosts = allPosts.filter((post) => post.slug !== currentPost.slug)

  const scoredPosts = otherPosts.map((post) => {
    let score = 0

    currentPost.tags.forEach((tag) => {
      if (post.tags.includes(tag)) {
        score += 2
      }
    })

    const titleWords = currentPost.title.toLowerCase().split(' ')
    const postTitleWords = post.title.toLowerCase().split(' ')
    titleWords.forEach((word) => {
      if (postTitleWords.includes(word) && word.length > 3) {
        score += 1
      }
    })

    return { post, score }
  })

  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post)
}

export function extractHeadings(content: string): { id: string; text: string; level: number }[] {
  const headingRegex = /<h([1-6]).*?>(.*?)<\/h[1-6]>/gi
  const headings: { id: string; text: string; level: number }[] = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = Number.parseInt(match[1])
    const text = match[2].replace(/<[^>]*>/g, '')
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')

    headings.push({ id, text, level })
  }

  return headings
}
