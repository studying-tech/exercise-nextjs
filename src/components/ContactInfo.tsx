"use client";

import { useState } from "react";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

export function ContactInfo() {
  const [showEmail, setShowEmail] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 復号化関数
  const simpleDecode = (encoded: string): string => {
    return Buffer.from(encoded, 'base64').toString('utf-8');
  };

  const revealEmail = async () => {
    if (email) {
      // 既に取得済みの場合はメールクライアントを開く
      window.location.href = `mailto:${email}`;
      return;
    }

    setLoading(true);
    setError('');

    try {
      // APIからメールアドレスを取得
      const response = await fetch('/api/contact');
      
      if (!response.ok) {
        throw new Error('メールアドレスの取得に失敗しました');
      }

      const data = await response.json();
      
      // 暗号化されたメールアドレスを復号化
      const decodedEmail = simpleDecode(data.email);
      
      setEmail(decodedEmail);
      setShowEmail(true);
      
      // メールクライアントを開く
      setTimeout(() => {
        window.location.href = `mailto:${decodedEmail}`;
      }, 100);
      
    } catch (err) {
      setError('メールアドレスの表示に失敗しました。しばらくしてからもう一度お試しください。');
      console.error('Email fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <h3 className="text-xl font-semibold text-gray-800">お問い合わせ方法</h3>

      {/* ボタン式メール表示 */}
      <div className="flex items-center space-x-3">
        <EnvelopeIcon className="h-5 w-5 text-gray-500" />
        {!showEmail ? (
          <button
            onClick={revealEmail}
            disabled={loading}
            className={`font-medium underline ${
              loading 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-blue-600 hover:text-blue-800'
            }`}
          >
            {loading ? '取得中...' : 'メールアドレスを表示'}
          </button>
        ) : (
          <span className="font-mono text-gray-700">{email}</span>
        )}
      </div>

      {/* エラー表示 */}
      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
          {error}
        </div>
      )}
    </div>
  );
}
