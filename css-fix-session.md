# CSS修正セッション記録

## 問題
Next.jsプロジェクトでTailwind CSSが効いていない問題

## 解決過程

### 1. 初期調査
- プロジェクト構造の確認
- `package.json`でTailwind CSS v4.1.12が使用されていることを確認
- `globals.css`でTailwind directivesが正しく設定されていることを確認
- 設定ファイル不足を発見

### 2. 最初の試行（失敗）
- Tailwind CSS v4用の設定ファイルを作成
- `tailwind.config.js`と`postcss.config.js`を作成
- PostCSS設定で`@tailwindcss/postcss`プラグインを使用
- コンパイルエラーが発生

### 3. エラー解決
- `theme()`関数の問題を修正（直接カラーコードに変更）
- TypeScript設定を更新（`src-before`フォルダを除外）
- ビルドは成功するもCSSが効かない状態

### 4. 最終解決
- **Tailwind CSS v4 → v3.4.0にダウングレード**
  ```bash
  npm uninstall tailwindcss @tailwindcss/postcss
  npm install tailwindcss@^3.4.0 postcss autoprefixer
  ```

- **PostCSS設定を修正**
  ```js
  // postcss.config.js
  module.exports = {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  }
  ```

- **Tailwind設定を簡素化**
  ```js
  // tailwind.config.js
  module.exports = {
    content: [
      './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  ```

### 5. 動作確認
- 赤いテストバーを追加してTailwind CSSの動作を確認
- 正常に動作することを確認後、テストコードを削除

## 修正されたファイル

1. **package.json** - Tailwind CSS v3にダウングレード
2. **postcss.config.js** - 標準的なTailwind設定に変更
3. **tailwind.config.js** - v3対応の設定に変更
4. **tsconfig.json** - `src-before`フォルダを除外
5. **next.config.js** - 非推奨オプション削除、TypeScriptスコープ設定

## 学んだこと

- Tailwind CSS v4はまだ設定が複雑で、v3の方が安定している
- PostCSS設定は正確に記述する必要がある
- 開発時はシンプルなテストケースで動作確認することが重要
- TypeScript設定でビルド対象ディレクトリを適切に制限する

## 最終状態
- Tailwind CSS v3.4.0で動作
- 全てのクラス（グラデーション、レスポンシブ、ホバーエフェクトなど）が正常動作
- ビルドも成功

日時: 2025-08-20