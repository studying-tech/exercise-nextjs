# Markdown・MDXライブラリ完全ガイド

## 目次
1. [基本概念](#基本概念)
2. [主要ライブラリの比較](#主要ライブラリの比較)
3. [remarkとrehypeの仕組み](#remarkとrehypeの仕組み)
4. [実装パターン別解説](#実装パターン別解説)
5. [今回のプロジェクトでの問題と解決](#今回のプロジェクトでの問題と解決)
6. [まとめ](#まとめ)

---

## 基本概念

### Markdown vs MDX
- **Markdown (.md)** - 純粋なマークアップ言語
- **MDX (.mdx)** - Markdown + JSX（Reactコンポーネントが使える）

### なぜライブラリが必要？

```javascript
// 手動実装（大変）
function markdownToHtml(markdown) {
  // 見出し変換
  html = html.replace(/^# (.+)/gm, '<h1>$1</h1>');
  html = html.replace(/^## (.+)/gm, '<h2>$1</h2>');
  
  // 太字変換
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  
  // シンタックスハイライト（数百行のコードが必要）
  // セキュリティ対策（XSS防止）
  // エッジケース対応
  // ... 膨大な実装が必要
}

// ライブラリ使用（簡単）
import { remark } from 'remark';
import html from 'remark-html';

const result = await remark().use(html).process(markdown);
```

**結論：開発効率とセキュリティのため、ライブラリを使用**

---

## 主要ライブラリの比較

### Next.js でのMDX処理ライブラリ

| ライブラリ | 読み方 | 特徴 | 使用場面 |
|-----------|--------|------|----------|
| `@next/mdx` | ネクストMDX | Next.js公式、ビルド時処理、高速 | 静的サイト、ファイルベース |
| `next-mdx-remote` | ネクストMDXリモート | 動的処理、柔軟性高い | CMS、API連携、動的コンテンツ |

### 処理エンジン

| ライブラリ | 読み方 | 役割 |
|-----------|--------|------|
| `remark` | リマーク | Markdown専用処理エンジン |
| `rehype` | リハイプ | HTML専用処理エンジン |
| `unified` | ユニファイド | remarkとrehypeを統合 |

### よく使うプラグイン

| プラグイン | 読み方 | 機能 |
|------------|--------|------|
| `remark-html` | リマークHTML | Markdown → HTML変換 |
| `remark-rehype` | リマークリハイプ | remark → rehype変換 |
| `rehype-highlight` | リハイプハイライト | シンタックスハイライト |
| `rehype-slug` | リハイプスラグ | 見出しにIDを自動追加 |
| `rehype-autolink-headings` | リハイプオートリンクヘディングス | 見出しに自動リンク |

---

## remarkとrehypeの仕組み

### 処理の流れ

```
Markdown文字列
    ↓
[ remark ] - Markdown専用処理
    ↓
Abstract Syntax Tree (AST)
    ↓  
[ rehype ] - HTML専用処理
    ↓
HTML文字列
```

### 実際のコード例

```javascript
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';     // Markdown → HTML変換
import rehypeHighlight from 'rehype-highlight'; // コードハイライト
import rehypeSlug from 'rehype-slug';          // 見出しID
import rehypeStringify from 'rehype-stringify'; // 文字列化

const processedContent = await remark()
  .use(remarkRehype)      // 1. Markdown → HTML構造に変換
  .use(rehypeSlug)        // 2. 見出しにIDを追加
  .use(rehypeHighlight)   // 3. コードブロックにハイライト
  .use(rehypeStringify)   // 4. 最終的なHTML文字列に変換
  .process(markdown);
```

### 変換例

```markdown
## useState の基本

```javascript
const [count, setCount] = useState(0);
```
```

↓ **remark（Markdown処理）**
```
AST: {
  type: 'heading',
  depth: 2,
  children: [{ type: 'text', value: 'useState の基本' }]
}
```

↓ **remarkRehype（Markdown → HTML変換）**
```html
<h2>useState の基本</h2>
<pre><code class="language-javascript">const [count, setCount] = useState(0);</code></pre>
```

↓ **rehypeSlug（見出しID追加）**
```html
<h2 id="usestate-の基本">useState の基本</h2>
<pre><code class="language-javascript">const [count, setCount] = useState(0);</code></pre>
```

↓ **rehypeHighlight（コードハイライト）**
```html
<h2 id="usestate-の基本">useState の基本</h2>
<pre><code class="language-javascript hljs">
<span class="hljs-keyword">const</span> [<span class="hljs-variable">count</span>, <span class="hljs-variable">setCount</span>] = <span class="hljs-function">useState</span>(<span class="hljs-number">0</span>);
</code></pre>
```

---

## 実装パターン別解説

### パターン1: ライブラリなし（手動実装）

```javascript
// 基本的な変換のみ
function simpleMarkdownToHtml(markdown) {
  return markdown
    .replace(/^# (.+)/gm, '<h1>$1</h1>')
    .replace(/^## (.+)/gm, '<h2>$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}
```

**メリット：** 軽量、依存関係なし  
**デメリット：** 機能限定、セキュリティリスク、メンテナンス大変

### パターン2: 最小限ライブラリ

```javascript
import { remark } from 'remark';
import html from 'remark-html';

const result = await remark().use(html).process(markdown);
```

**メリット：** シンプル、軽量  
**デメリット：** 機能限定（ハイライトなし、目次なし）

### パターン3: 機能豊富（今回のプロジェクト）

```javascript
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';

const processedContent = await remark()
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeSlug)
  .use(rehypeHighlight, {
    detect: true,
    subset: false
  })
  .use(rehypeStringify, { allowDangerousHtml: true })
  .process(content);
```

**メリット：** 高機能、セキュア、拡張性  
**デメリット：** 設定複雑、バンドルサイズ大

### パターン4: MDX対応

```javascript
// next-mdx-remote使用
import { MDXRemote } from "next-mdx-remote/rsc";

<MDXRemote 
  source={content}
  options={{
    mdxOptions: {
      rehypePlugins: [rehypeSlug, rehypeHighlight],
    },
  }}
  components={{ SimpleCounter }}
/>
```

**メリット：** Reactコンポーネント使用可能  
**デメリット：** 複雑、パフォーマンス考慮必要

---

## 今回のプロジェクトでの問題と解決

### 発生した問題

#### 問題1: MDXファイルでコードブロックが認識されない
**原因：**
- MDXパーサーのacornエラー
- コードブロック内のJSX構文（`{count}`）がMDX式として解釈
- `markdown.ts`での処理とPostContentでの処理が競合

**解決過程：**
1. コードブロックを`jsx` → `javascript` → `text`に変更
2. MDXファイルの2重処理を回避
3. `next-mdx-remote`での安定した処理に統一

#### 問題2: MDXファイルで目次が表示されない
**原因：**
- `extractHeadings`関数にMDXフラグが渡されていない
- MDXファイルは生Markdown形式で見出し抽出が必要
- HTMLモードで処理されて目次が生成されない

**解決：**
```javascript
// 修正前
const headings = extractHeadings(post.content);

// 修正後
const headings = extractHeadings(post.content, post.isMdx);
```

### 学んだ重要なポイント

1. **MDXファイルの特殊性**
   - 通常のMarkdownとは異なる処理が必要
   - JSXコンポーネントとMarkdownの混在

2. **処理の分離**
   - 目次生成とコンテンツ表示は別々に処理
   - ライブラリの役割分担を理解する重要性

3. **パフォーマンス考慮**
   - 動的インポート（lazy/Suspense）は遅い
   - 静的処理の方が高速

---

## 実用的な選択指針

### プロジェクトの規模と要件で選択

#### 小規模サイト（基本的なブログ）
```javascript
// remark + remark-html
npm install remark remark-html
```

#### 中規模サイト（機能豊富なブログ）
```javascript
// rehypeプラグイン追加
npm install remark remark-html rehype-highlight rehype-slug
```

#### 大規模サイト（インタラクティブコンテンツ）
```javascript
// MDX対応
npm install next-mdx-remote @mdx-js/react
```

### 実装アプローチの選択

| 要件 | 推奨アプローチ |
|------|----------------|
| 静的コンテンツのみ | `@next/mdx` |
| 動的コンテンツ・CMS連携 | `next-mdx-remote` |
| 最高のパフォーマンス | `@next/mdx` |
| 最大の柔軟性 | `next-mdx-remote` |

---

## まとめ

### ライブラリとプラグインの役割

1. **ライブラリ** = メインの処理エンジン
   - `remark` - Markdown処理
   - `rehype` - HTML処理  
   - `next-mdx-remote` - MDX処理

2. **プラグイン** = 追加機能
   - `rehype-highlight` - コードハイライト
   - `rehype-slug` - 見出しID生成
   - `remark-gfm` - GitHub Flavored Markdown

### 重要な学習ポイント

- **手動実装は理論的には可能だが、実用的ではない**
- **remarkとrehypeの役割分担を理解する**
- **MDXファイルは特殊な処理が必要**
- **パフォーマンスと機能のトレードオフを考慮**
- **プロジェクトの要件に応じたライブラリ選択が重要**

### 覚えておくべき読み方
- `remark` = リマーク
- `rehype` = リハイプ  
- `unified` = ユニファイド

この知識があれば、Next.jsでのMarkdown・MDX処理について理解し、適切な技術選択ができるようになります。