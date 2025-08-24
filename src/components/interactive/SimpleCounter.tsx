'use client'

import { useState } from 'react'

export default function SimpleCounter() {
  const [count, setCount] = useState(0)

  return (
    <div className="my-4 sm:my-6 lg:my-8 p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200 shadow-sm">
      <div className="text-center">
        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
          🧮 インタラクティブ カウンター
        </h3>
        <div className="text-3xl sm:text-4xl lg:text-5xl font-mono font-bold text-blue-600 mb-4 sm:mb-6 min-h-[1.2em] flex items-center justify-center">
          {count}
        </div>
        
        {/* デスクトップ: 横並び */}
        <div className="hidden sm:flex justify-center space-x-3 lg:space-x-4 mb-4">
          <button
            className="px-4 lg:px-6 py-2 lg:py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-md text-sm lg:text-base"
            onClick={() => setCount(count + 1)}
          >
            ➕ 増加
          </button>
          <button
            className="px-4 lg:px-6 py-2 lg:py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 active:bg-gray-700 transition-colors shadow-md text-sm lg:text-base"
            onClick={() => setCount(count - 1)}
          >
            ➖ 減少
          </button>
          <button
            className="px-4 lg:px-6 py-2 lg:py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 active:bg-red-700 transition-colors shadow-md text-sm lg:text-base"
            onClick={() => setCount(0)}
          >
            🔄 リセット
          </button>
        </div>
        
        {/* モバイル: 縦並び */}
        <div className="sm:hidden space-y-3 mb-4 max-w-xs mx-auto">
          <button
            className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-md"
            onClick={() => setCount(count + 1)}
          >
            ➕ 増加
          </button>
          <button
            className="w-full px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 active:bg-gray-700 transition-colors shadow-md"
            onClick={() => setCount(count - 1)}
          >
            ➖ 減少
          </button>
          <button
            className="w-full px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 active:bg-red-700 transition-colors shadow-md"
            onClick={() => setCount(0)}
          >
            🔄 リセット
          </button>
        </div>
        
        <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-600 px-2">
          上のボタンをクリックして、useStateの動作を確認してください！
        </p>
      </div>
    </div>
  )
}