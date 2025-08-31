# Next.js Markdown/MDX 処理ガイド

## markdown.ts の概要

Next.jsプロジェクトでMarkdownやMDXファイルを使用する場合、**必須の処理ライブラリ**です。ブラウザはMarkdownを直接理解できないため、HTMLに変換する処理が不可欠になります。

## 主要機能

### 1. ファイル検索・取得
```typescript
export function getAllPostSlugs(): string[] {
  // /src/content/blog から .md と .mdx ファイルを検索
  // ファイル名をslugとして返す
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.(md|mdx)$/, ''))
}
```

### 2. 記事データの解析・変換
```typescript
export async function getPostBySlug(slug: string): Promise<PostData | null> {
  // 1. ファイル読み込み (.md または .mdx)
  // 2. frontmatter解析 (gray-matter)
  // 3. コンテンツ変換 (Markdown→HTML または MDX処理)
  // 4. シンタックスハイライト適用
}
```

## 処理パイプライン

### Markdownファイル (.md) の処理
```typescript
// remark → remarkRehype → rehypeSlug → rehypeHighlight → rehypeStringify
const processedContent = await remark()
  .use(remarkRehype, { allowDangerousHtml: true })    // Markdown → HTML AST変換
  .use(rehypeSlug)                                    // 見出しにid属性追加
  .use(rehypeHighlight, {                             // シンタックスハイライト
    detect: true,
    subset: false
  })
  .use(rehypeStringify, { allowDangerousHtml: true }) // HTML文字列に変換
  .process(content)
```

### MDXファイル (.mdx) の処理
```typescript
// next-mdx-remote でシリアライズ
const mdxSource = await serialize(content, {
  mdxOptions: {
    rehypePlugins: [
      rehypeSlug,           // 見出しにid属性追加
      rehypeHighlight       // シンタックスハイライト
    ],
  },
})
```

## 使用ライブラリ

| ライブラリ | 用途 |
|------------|------|
| **gray-matter** | Frontmatter（メタデータ）解析 |
| **remark** | Markdown処理のメイン |
| **rehype** | HTML AST処理 |
| **next-mdx-remote** | MDXファイル処理 |
| **rehype-highlight** | シンタックスハイライト |
| **rehype-slug** | 見出しID自動生成 |
| **rehype-autolink-headings** | 見出しリンク生成 |

## データフロー

```
.md/.mdx ファイル
    ↓ fs.readFileSync()
生ファイル内容
    ↓ gray-matter
frontmatter + content
    ↓ remark/serialize
HTML/MDX処理済み
    ↓ rehype plugins
最終的なPostData
```

## 返されるPostDataの構造

```typescript
interface PostData {
  slug: string,           // ファイル名（URLパス）
  content: string,        // 処理済みHTML/MDX
  rawContent: string,     // 生のMarkdownコンテンツ（目次生成用）
  isMdx: boolean,         // MDXファイルかどうか
  title: string,          // frontmatterから取得
  date: string,           // frontmatterから取得
  author: string,         // frontmatterから取得
  tags: string[],         // frontmatterから取得
  published: boolean,     // frontmatterから取得
  excerpt: string,        // frontmatterから取得
  coverImage: string,     // frontmatterから取得
}
```

## 主要な関数

### getAllPosts() - 記事一覧取得
```typescript
export async function getAllPosts(): Promise<PostData[]> {
  const slugs = getAllPostSlugs()
  const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)))
  
  return posts
    .filter((post): post is PostData => post !== null)
    .filter((post) => post.published !== false)  // 下書き除外
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))  // 日付順
}
```

### getPostsByTag() - タグフィルタリング
```typescript
export async function getPostsByTag(tag: string): Promise<PostData[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter((post) => post.tags && post.tags.includes(tag))
}
```

## なぜ必須なのか

### 1. ブラウザはMarkdownを理解できない
```
❌ ブラウザ: # Hello → そのまま「# Hello」と表示
✅ 変換後: <h1>Hello</h1> → 見出しとして表示
```

### 2. Next.jsの標準機能にはMarkdown処理がない
```typescript
// ❌ これは動かない
export default function Page() {
  return <div># Hello World</div>  // ただの文字列
}

// ✅ HTML変換が必要
export default function Page() {
  return <div dangerouslySetInnerHTML={{ __html: processedMarkdown }} />
}
```

## 他のプロジェクトでの実装例

### 最小構成（簡単なブログ）
```typescript
import fs from 'fs'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

export async function getPost(slug: string) {
  const fileContent = fs.readFileSync(`posts/${slug}.md`, 'utf8')
  const { data, content } = matter(fileContent)
  const processedContent = await remark().use(html).process(content)
  
  return {
    ...data,
    content: processedContent.toString()
  }
}
```

### フル機能版（このプロジェクト）
```typescript
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkRehype from 'remark-rehype'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { serialize } from 'next-mdx-remote/serialize'

// 高機能な処理パイプライン
```

## 代替手段

### 1. 他のMarkdownライブラリ
- **markdown-it**: remarkの代替
- **marked**: 軽量なMarkdownパーサー

### 2. CMS使用
- **Contentful**: APIでコンテンツ取得
- **Strapi**: ヘッドレスCMS
- でも内部的にはMarkdown処理が必要

### 3. 静的サイトジェネレーター
- **Gatsby**: GraphQLでMarkdown処理
- **Astro**: 内蔵Markdown処理
- でも同様の処理を内部で実行

## frontmatter の例

```markdown
---
title: "記事のタイトル"
date: "2024-01-01"
author: "作者名"
tags: ["Next.js", "React", "TypeScript"]
published: true
excerpt: "記事の要約"
coverImage: "images/cover.jpg"
---

# 記事の本文

ここから記事の内容が始まります。
```

## 処理の流れ（具体例）

### 1. 入力（Markdownファイル）
```markdown
---
title: "Hello World"
date: "2024-01-01"
---

# はじめに

これは**太字**のテキストです。

```javascript
console.log("Hello World");
```
```

### 2. 出力（PostData）
```typescript
{
  slug: "hello-world",
  title: "Hello World",
  date: "2024-01-01",
  content: `
    <h1 id="はじめに">はじめに</h1>
    <p>これは<strong>太字</strong>のテキストです。</p>
    <pre><code class="hljs language-javascript">
      console.log("Hello World");
    </code></pre>
  `,
  rawContent: "# はじめに\n\nこれは**太字**のテキストです。\n\n```javascript...",
  isMdx: false
}
```

## まとめ

**markdown.ts のような処理は：**

- **Markdown/MDXブログには100%必須**
- ライブラリは違っても**同様の処理が必要**
- **「ファイル→ブラウザ表示可能データ」変換**は避けられない
- プロジェクトの規模に応じて**機能を選択**
- **frontmatter解析**でメタデータ管理
- **シンタックスハイライト**でコード表示
- **見出しID自動生成**で目次機能サポート

Markdownベースのブログやドキュメントサイトでは、**このような変換処理は必ず実装する必要がある**基盤技術です。