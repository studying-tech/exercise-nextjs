'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">エラーが発生しました</h1>
          <p className="text-gray-600">申し訳ありませんが、問題が発生しました。</p>
        </div>
        
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-left">
            <p className="text-sm text-red-600 font-mono">
              {error.message}
            </p>
          </div>
        )}
        
        <button
          onClick={reset}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          再試行
        </button>
      </div>
    </div>
  )
}