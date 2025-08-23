"use client";

import Link from "next/link";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"; // アイコンをインポート

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ナビゲーションメニューの項目を定義
  const navigation = [
    { name: "ホーム", href: "/" },
    { name: "ブログ", href: "/blog" },
    { name: "このサイトについて", href: "/about" },
  ];

  return (
    <header className="bg-white shadow-sm border-b fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* サイトロゴ/タイトル */}
          <Link
            href="/"
            className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
          >
            Tech Blog
          </Link>

          {/* デスクトップナビゲーション */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* モバイルメニューボタン */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
            aria-label="メニューを開く"
          >
            <div className="relative w-8 h-8">
              <Bars3Icon 
                className={`absolute inset-0 h-8 w-8 transition-all duration-300 ease-in-out ${
                  isMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
                }`} 
              />
              <XMarkIcon 
                className={`absolute inset-0 h-8 w-8 transition-all duration-300 ease-in-out ${
                  isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
                }`} 
              />
            </div>
          </button>
        </div>

        {/* モバイルメニュー */}
        <div className={`md:hidden absolute top-16 left-0 right-0 bg-white z-50 shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'max-h-64 opacity-100 transform translate-y-0' 
            : 'max-h-0 opacity-0 transform -translate-y-2'
        }`}>
          <nav className="flex flex-col space-y-2 pb-4">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)} // メニュークリックで閉じる
                className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-all duration-200 ease-in-out ${
                  isMenuOpen 
                    ? 'opacity-100 transform translate-x-0' 
                    : 'opacity-0 transform translate-x-4'
                }`}
                style={{
                  transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms'
                }}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
