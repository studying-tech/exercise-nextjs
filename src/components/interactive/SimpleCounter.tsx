"use client";

import { useState } from "react";

export default function SimpleCounter() {
  const [count, setCount] = useState(0);

  return (
    <div className="my-6 p-6 bg-white rounded-lg border border-gray-200 shadow-lg">
      <div className="text-center">
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
          React useState カウンター
        </h3>

        <div className="text-4xl md:text-6xl font-mono font-bold text-blue-600 mb-8">
          {count}
        </div>

        {/* レスポンシブボタン配置 - モバイル: 縦並び / デスクトップ: 横並び */}
        <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 max-w-xs md:max-w-none mx-auto">
          <button
            className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
            onClick={() => setCount(count + 1)}
          >
            １増加
          </button>
          <button
            className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
            onClick={() => setCount(count - 1)}
          >
            １減少
          </button>
          <button
            className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors"
            onClick={() => setCount(0)}
          >
            リセット
          </button>
        </div>
      </div>
    </div>
  );
}
