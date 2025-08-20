// TODO: メタデータを設定
export const metadata = {
  // ヒント: title, descriptionを設定
}

export default function AboutPage() {
  return (
    <div className='container mx-auto px-4 py-12 max-w-4xl'>
      <h1 className='text-4xl font-bold mb-8'>About Tech Blog</h1>

      <div className='prose prose-lg max-w-none'>
        {/* TODO: 私たちについてセクション */}
        <section className='mb-12'>
          <h2 className='text-2xl font-bold mb-4'>私たちについて</h2>
          {/* TODO: ブログの説明を追加 */}
        </section>

        {/* TODO: ミッションセクション */}
        <section className='mb-12'>
          <h2 className='text-2xl font-bold mb-4'>ミッション</h2>
          {/* TODO: ミッションのリストを追加 */}
          {/* ヒント: <ul className='list-disc list-inside space-y-2'> を使用 */}
        </section>

        {/* TODO: 扱うトピックセクション */}
        <section className='mb-12'>
          <h2 className='text-2xl font-bold mb-4'>扱うトピック</h2>
          {/* TODO: トピックのグリッドを追加 */}
          {/* ヒント: grid grid-cols-2 md:grid-cols-3 gap-4 を使用 */}
        </section>

        {/* TODO: 執筆者セクション */}
        <section className='mb-12'>
          <h2 className='text-2xl font-bold mb-4'>執筆者</h2>
          {/* TODO: 執筆者のリストを追加 */}
          {/* ヒント: 各執筆者にアバター、名前、説明を表示 */}
        </section>

        {/* TODO: お問い合わせセクション */}
        <section>
          <h2 className='text-2xl font-bold mb-4'>お問い合わせ</h2>
          {/* TODO: 連絡先情報を追加 */}
        </section>
      </div>
    </div>
  )
}
