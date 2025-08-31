---
title: "タプル型とユニオン型を理解しよう"
date: "2025-08-27"
author: "Tech Blog編集部"
coverImage: "images/blog-image1.jpg"
tags: ["tuple", "union", "Next.js", "React", "type"]
excerpt: "タプル型とユニオン型について、これらの型の使用方法などを具体例を交えてまとめました。"
published: true
---

# TypeScript のタプル型とユニオン型を理解しよう

TypeScript でより安全で表現力豊かなコードを書くために、タプル型とユニオン型は欠かせない機能です。この記事では、これらの型のの学びを具体例を交えてまとめました。

## タプル型（Tuple Types）とは

タプル型は**順序と個数が固定された配列**を表現する型です。通常の配列とは異なり、各位置の要素の型と配列の長さが厳密に定義されます。

### 基本的な使い方

```typescript
// 座標を表すタプル型
type Coordinate = [number, number];

const point: Coordinate = [10, 20]; // ✅ OK
const invalid1: Coordinate = [10]; // ❌ Error: 要素が足りない
const invalid2: Coordinate = [10, 20, 30]; // ❌ Error: 要素が多すぎる
const invalid3: Coordinate = ["x", "y"]; // ❌ Error: 型が違う
```

### 通常の配列との違い

```typescript
// 通常の配列：長さ不定、すべて同じ型
const numbers: number[] = [1, 2, 3, 4, 5]; // 何個でもOK

// タプル：長さ固定、位置ごとに型が決まる
const rgb: [number, number, number] = [255, 128, 0]; // 必ず3個
```

### タプル型の実用例

```typescript
// HTTPレスポンスの状態とデータをセットで返す
type ApiResponse<T> = [number, T]; // [ステータスコード, データ]

const userResponse: ApiResponse<User> = [200, { id: 1, name: "田中" }];
const errorResponse: ApiResponse<null> = [404, null];

// 分割代入で使いやすい
const [status, userData] = userResponse;

// データベースのレコードをタプルで表現
type UserRecord = [string, string, number]; // [ID, 名前, 年齢]
const user: UserRecord = ["u001", "田中太郎", 25];
```

### 可変長タプル

```typescript
// 最初の要素は固定、残りは可変
type LogEntry = [Date, ...string[]]; // 最初は日時、その後は任意の文字列

const log1: LogEntry = [new Date(), "User logged in"];
const log2: LogEntry = [
  new Date(),
  "Error occurred",
  "Database connection failed",
];
```

## ユニオン型（Union Types）とは

ユニオン型は**複数の型のうちいずれかを取る**ことができる型です。`|`（パイプ）記号で複数の型を結合します。

### 基本的な使い方

```typescript
// 文字列リテラルのユニオン
type Status = "pending" | "success" | "error";

const currentStatus: Status = "pending"; // ✅ OK
const invalid: Status = "loading"; // ❌ Error: 'loading'は含まれていない
```

### プリミティブ型のユニオン

```typescript
// 複数の基本型を組み合わせ
type StringOrNumber = string | number;

const value1: StringOrNumber = "hello"; // ✅ string
const value2: StringOrNumber = 42; // ✅ number
const invalid: StringOrNumber = true; // ❌ boolean は不可
```

### オブジェクト型のユニオン

```typescript
type SuccessResponse = {
  status: "success";
  data: any;
};

type ErrorResponse = {
  status: "error";
  message: string;
};

type ApiResponse = SuccessResponse | ErrorResponse;

// 型ガードで安全に処理
function handleResponse(response: ApiResponse) {
  if (response.status === "success") {
    console.log(response.data); // SuccessResponse として認識される
  } else {
    console.log(response.message); // ErrorResponse として認識される
  }
}
```

### 判別可能なユニオン（Discriminated Union）

```typescript
type Shape =
  | { type: "circle"; radius: number }
  | { type: "square"; side: number }
  | { type: "triangle"; base: number; height: number };

function calculateArea(shape: Shape): number {
  switch (shape.type) {
    case "circle":
      return Math.PI * shape.radius ** 2; // radius プロパティが使える
    case "square":
      return shape.side ** 2; // side プロパティが使える
    case "triangle":
      return (shape.base * shape.height) / 2; // base, height が使える
    default:
      const _exhaustiveCheck: never = shape; // 型安全性の確保
      return _exhaustiveCheck;
  }
}
```

## タプル型とユニオン型の組み合わせ

```typescript
// 座標またはエラーメッセージを返す関数
type CoordinateResult = [number, number] | { error: string };

function getCoordinate(input: string): CoordinateResult {
  try {
    const [x, y] = input.split(",").map(Number);
    return [x, y]; // タプルを返す
  } catch {
    return { error: "座標の解析に失敗しました" }; // エラーオブジェクトを返す
  }
}

// 使用時の型ガード
const result = getCoordinate("10,20");
if (Array.isArray(result)) {
  const [x, y] = result; // タプルとして安全に分割代入
  console.log(`座標: (${x}, ${y})`);
} else {
  console.log(result.error); // エラーメッセージ
}
```

## 実践的な活用パターン

### API レスポンスの型定義

```typescript
type LoadingState = { status: "loading" };
type SuccessState<T> = { status: "success"; data: T };
type ErrorState = { status: "error"; message: string };

type AsyncState<T> = LoadingState | SuccessState<T> | ErrorState;

// React などでの状態管理に活用
const userState: AsyncState<User> = { status: "loading" };
```

### 設定オプションの型定義

```typescript
type DatabaseConfig = {
  host: string;
  port: number;
  ssl: boolean | { cert: string; key: string }; // ユニオンでssl設定を柔軟に
};

type LogLevel = "debug" | "info" | "warn" | "error"; // ユニオンで許可された値のみ

type AppConfig = [string, DatabaseConfig, LogLevel]; // タプルで設定をまとめて管理
```

## まとめ

タプル型とユニオン型は、TypeScript の型安全性と表現力を大幅に向上させる強力な機能です。

**タプル型**は順序と個数が重要なデータ構造を正確に表現し、**ユニオン型**は複数の可能性を持つ値を安全に扱えるようにします。これらを組み合わせることで、より堅牢で分かりやすいコードが書けるようになります。

特に判別可能なユニオンは、複雑な状態管理や条件分岐を型安全に実装するための重要なパターンなので、ぜひともマスターしたいです。
