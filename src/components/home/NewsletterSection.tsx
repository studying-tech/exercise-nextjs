/**
 * Next.js Product Catalog - Newsletter Section Component
 * ニュースレターセクションコンポーネント
 */

'use client'

import { CheckCircleIcon, EnvelopeIcon } from '@heroicons/react/24/outline'
import type React from 'react'
import { useState } from 'react'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setIsLoading(true)

    // APIコールのシミュレーション
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitted(true)
    setIsLoading(false)
    setEmail('')

    // 3秒後にリセット
    setTimeout(() => {
      setIsSubmitted(false)
    }, 3000)
  }

  return (
    <section className='py-16 bg-gradient-to-r from-blue-600 to-purple-700'>
      <div className='container mx-auto px-4'>
        <div className='max-w-4xl mx-auto text-center text-white'>
          <div className='flex justify-center mb-6'>
            <div className='p-3 bg-white bg-opacity-20 rounded-full'>
              <EnvelopeIcon className='h-8 w-8' />
            </div>
          </div>

          <h2 className='text-3xl lg:text-4xl font-bold mb-4'>最新情報をお届けします</h2>
          <p className='text-xl text-blue-100 mb-8 leading-relaxed'>
            新商品の入荷情報、お得なキャンペーン、特別セールなどの情報を
            <br className='hidden sm:block' />
            いち早くメールでお知らせします。
          </p>

          {isSubmitted ? (
            <div className='max-w-md mx-auto'>
              <div className='bg-green-500 text-white p-6 rounded-lg flex items-center justify-center space-x-3'>
                <CheckCircleIcon className='h-6 w-6' />
                <span className='font-medium'>登録ありがとうございます！</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className='max-w-md mx-auto'>
              <div className='flex flex-col sm:flex-row gap-3'>
                <div className='flex-1'>
                  <label htmlFor='newsletter-email' className='sr-only'>
                    メールアドレス
                  </label>
                  <input
                    type='email'
                    id='newsletter-email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='メールアドレスを入力'
                    className='w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500
                             focus:ring-2 focus:ring-white focus:ring-offset-2
                             focus:ring-offset-blue-600 transition-all duration-200'
                    required
                  />
                </div>
                <button
                  type='submit'
                  disabled={isLoading || !email.trim()}
                  className='bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold
                           hover:bg-gray-100 transition-colors duration-200
                           disabled:opacity-50 disabled:cursor-not-allowed
                           focus:ring-2 focus:ring-white focus:ring-offset-2
                           focus:ring-offset-blue-600'
                >
                  {isLoading ? (
                    <div className='flex items-center space-x-2'>
                      <svg className='animate-spin h-4 w-4' viewBox='0 0 24 24'>
                        <circle
                          className='opacity-25'
                          cx='12'
                          cy='12'
                          r='10'
                          stroke='currentColor'
                          strokeWidth='4'
                          fill='none'
                        />
                        <path
                          className='opacity-75'
                          fill='currentColor'
                          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                        />
                      </svg>
                      <span>登録中...</span>
                    </div>
                  ) : (
                    '登録する'
                  )}
                </button>
              </div>

              <p className='text-blue-100 text-sm mt-4'>
                ご登録いただいたメールアドレスは、ニュースレターの配信にのみ使用いたします。
                <br />
                いつでも配信停止が可能です。
              </p>
            </form>
          )}

          {/* 特典の紹介 */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-12'>
            <div className='text-center'>
              <div className='w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3'>
                <span className='text-2xl'>🎁</span>
              </div>
              <h3 className='font-semibold mb-2'>特別オファー</h3>
              <p className='text-blue-100 text-sm'>会員限定の特別価格でご提供</p>
            </div>

            <div className='text-center'>
              <div className='w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3'>
                <span className='text-2xl'>⚡</span>
              </div>
              <h3 className='font-semibold mb-2'>早期アクセス</h3>
              <p className='text-blue-100 text-sm'>新商品を一般公開前にチェック</p>
            </div>

            <div className='text-center'>
              <div className='w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3'>
                <span className='text-2xl'>📱</span>
              </div>
              <h3 className='font-semibold mb-2'>トレンド情報</h3>
              <p className='text-blue-100 text-sm'>最新トレンドを見逃さない</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
