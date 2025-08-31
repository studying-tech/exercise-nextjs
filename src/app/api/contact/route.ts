import { NextResponse } from 'next/server'

// 簡単な暗号化/復号化関数（実際にはより強固な暗号化を使用）
function simpleEncode(text: string): string {
  return Buffer.from(text).toString('base64')
}

function simpleDecode(encoded: string): string {
  return Buffer.from(encoded, 'base64').toString('utf-8')
}

export async function GET() {
  try {
    // メールアドレスを暗号化して保存（環境変数から取得することも可能）
    const encodedEmail = simpleEncode('contact@techblog.example.com')
    
    // 少し遅延を追加（スパムボット対策）
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // 暗号化されたメールアドレスを返す
    return NextResponse.json({
      email: encodedEmail,
      timestamp: Date.now()
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'メールアドレスの取得に失敗しました' },
      { status: 500 }
    )
  }
}

// POSTメソッドは無効化（GET以外を拒否）
export async function POST() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}