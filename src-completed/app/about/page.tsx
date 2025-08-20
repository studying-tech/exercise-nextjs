export const metadata = {
  title: 'About',
  description: 'Tech Blogについて。私たちのミッションと価値観をご紹介します。',
}

export default function AboutPage() {
  return (
    <div className='container mx-auto px-4 py-12 max-w-4xl'>
      <h1 className='text-4xl font-bold mb-8'>About Tech Blog</h1>

      <div className='prose prose-lg max-w-none'>
        <section className='mb-12'>
          <h2 className='text-2xl font-bold mb-4'>私たちについて</h2>
          <p className='text-gray-700 mb-4'>
            Tech Blogは、最新の技術トレンドやプログラミングのベストプラクティスを発信する技術ブログです。
            Web開発、プログラミング言語、フレームワーク、ツールなど、エンジニアにとって有益な情報を提供しています。
          </p>
          <p className='text-gray-700'>
            私たちは、技術の民主化を信じています。初心者から上級者まで、すべてのエンジニアが
            より良いコードを書き、より良いプロダクトを作れるようサポートすることが私たちの使命です。
          </p>
        </section>

        <section className='mb-12'>
          <h2 className='text-2xl font-bold mb-4'>ミッション</h2>
          <ul className='list-disc list-inside space-y-2 text-gray-700'>
            <li>最新の技術情報を分かりやすく伝える</li>
            <li>実践的なコード例とベストプラクティスを共有する</li>
            <li>エンジニアコミュニティの成長に貢献する</li>
            <li>技術的な課題解決のヒントを提供する</li>
          </ul>
        </section>

        <section className='mb-12'>
          <h2 className='text-2xl font-bold mb-4'>扱うトピック</h2>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
            {[
              'Next.js',
              'React',
              'TypeScript',
              'JavaScript',
              'Node.js',
              'Web Performance',
              'CSS/Tailwind',
              'Testing',
              'DevOps',
              'Database',
              'Security',
              'Best Practices',
            ].map((topic) => (
              <div key={topic} className='bg-gray-100 p-3 rounded-lg text-center'>
                <span className='text-gray-800 font-medium'>{topic}</span>
              </div>
            ))}
          </div>
        </section>

        <section className='mb-12'>
          <h2 className='text-2xl font-bold mb-4'>執筆者</h2>
          <div className='space-y-6'>
            <div className='flex items-start space-x-4'>
              <div className='w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl'>
                YT
              </div>
              <div>
                <h3 className='font-bold text-lg'>山田太郎</h3>
                <p className='text-gray-600'>フルスタックエンジニア。Next.jsとReactを中心に開発を行っています。</p>
              </div>
            </div>

            <div className='flex items-start space-x-4'>
              <div className='w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl'>
                HS
              </div>
              <div>
                <h3 className='font-bold text-lg'>佐藤花子</h3>
                <p className='text-gray-600'>TypeScriptエキスパート。型安全なコードの書き方を追求しています。</p>
              </div>
            </div>

            <div className='flex items-start space-x-4'>
              <div className='w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl'>
                IS
              </div>
              <div>
                <h3 className='font-bold text-lg'>鈴木一郎</h3>
                <p className='text-gray-600'>UIエンジニア。使いやすく美しいインターフェースの設計が専門です。</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className='text-2xl font-bold mb-4'>お問い合わせ</h2>
          <p className='text-gray-700 mb-4'>
            記事に関するご質問、ご意見、執筆のご依頼などがございましたら、お気軽にお問い合わせください。
          </p>
          <div className='bg-gray-100 p-6 rounded-lg'>
            <p className='text-gray-700'>
              <strong>Email:</strong> contact@techblog.example.com
              <br />
              <strong>Twitter:</strong> @techblog
              <br />
              <strong>GitHub:</strong> github.com/techblog
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
