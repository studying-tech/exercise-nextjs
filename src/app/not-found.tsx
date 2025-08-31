import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
        <div className="mb-6">
          <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">ページが見つかりません</h2>
          <p className="text-gray-600">
            お探しのページは存在しないか、移動された可能性があります。
          </p>
        </div>
        
        <div className="space-y-3">
          <Link
            href="/"
            className="block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            ホームに戻る
          </Link>
          <Link
            href="/blog"
            className="block bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
          >
            ブログ一覧を見る
          </Link>
        </div>
      </div>
    </div>
  )
}