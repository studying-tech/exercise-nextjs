// 【課題42】Product インターフェースを定義してください
// 要件:
// - id: string
// - name: string
// - description: string
// - price: number
// - category: string
// - images: string[]
// - stock: number
// - featured?: boolean
// - discount?: number
// - createdAt: string
// - details?: Record<string, string>
export interface Product {
  /* ここに実装 */
}

// 【課題43】Category インターフェースを定義してください
// 要件:
// - id: string
// - name: string
// - slug: string
// - description: string
// - image: string
export interface Category {
  /* ここに実装 */
}

// 【課題44】APIレスポンスの型を定義してください
// 要件:
// - ジェネリクス T を使用
// - data: T
// - total?: number
// - error?: string
export interface ApiResponse<T> {
  /* ここに実装 */
}