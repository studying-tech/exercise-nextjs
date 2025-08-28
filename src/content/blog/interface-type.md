---
title: "interfaceとtypeをどう使い分けるか"
date: "2025-08-28"
author: "Tech Blog編集部"
coverImage: "images/blog-image2.jpg"
tags: ["interface", "type", "Next.js", "React"]
excerpt: "MDXを使ってMarkdownとJSXを組み合わせた高機能なブログ記事の作成方法を学びましょう。"
published: true
---

# TypeScript で interface と type をどう使い分けるか - 初心者が実装で学んだこと

TypeScript を学び始めて、悩んだことの一つが「interface と type って何が違うの？どう使い分けるの？」という疑問でした。どちらも型を定義するために使えるし、多くの場面で同じような動作をします。今回は、私が実装を通じて理解した両者の違いについてまとめてみたいと思います。

## interface と type の基本的な違い

### 宣言方法の違い

まず最も基本的な違いから見ていきましょう。interface は`interface`キーワードを使って宣言し、type は`type`キーワードと`=`を使って宣言します。

```typescript
// interfaceの場合
interface User {
  id: number;
  name: string;
  email: string;
}

// typeの場合
type UserType = {
  id: number;
  name: string;
  email: string;
};
```

一見すると同じように見えますが、この時点で既に大きな違いがあります。interface は新しい名前付きの型を作成するのに対し、type は型エイリアス（別名）を作成しているのです。

### 拡張方法の違い

実装していて最初に「あれ？」と思ったのが、拡張の方法の違いでした。

```typescript
// interfaceの拡張（extends）
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

// typeの拡張（交差型）
type AnimalType = {
  name: string;
};

type DogType = AnimalType & {
  breed: string;
};
```

interface は`extends`を使って継承のような形で拡張できます。一方、type は`&`（交差型）を使って型を組み合わせます。最初はこの違いに戸惑いましたが、実際に使ってみると、interface の方が継承関係が分かりやすいと感じました。

## 実装で気づいた重要な違い

### 同名宣言の扱い（Declaration Merging）

これは実際にライブラリを使っていて知った機能ですが、interface には「宣言のマージ」という特徴があります。

```typescript
interface Config {
  url: string;
}

interface Config {
  timeout: number;
}

// 自動的にマージされる
// Config = { url: string; timeout: number; }
```

一方、type で同じことをしようとするとエラーになります。

```typescript
type ConfigType = {
  url: string;
};

// エラー: Duplicate identifier 'ConfigType'
type ConfigType = {
  timeout: number;
};
```

最初はこの挙動に混乱しましたが、外部ライブラリの型定義を拡張したいときなどに、この機能が非常に便利だということが分かりました。

### ユニオン型やタプル型の定義

type の強みは、より柔軟な型定義ができることです。特にユニオン型やタプル型を定義する場合は、type を使う必要があります。

```typescript
// ユニオン型
type Status = "pending" | "success" | "error";

// タプル型
type Coordinate = [number, number];

// 条件付き型
type IsString<T> = T extends string ? true : false;
```

interface ではこのような定義はできません。実装していて、状態管理や API のレスポンスタイプを定義する際に、この違いが重要になることを実感しました。

## 実践的な使い分けガイドライン

### interface を使うべき場面

私が実装を通じて学んだ、interface を優先的に使うべき場面は以下のケースです。

**オブジェクトの構造を定義する場合**

```typescript
interface UserProfile {
  id: string;
  name: string;
  avatar?: string;
  createdAt: Date;
}
```

**クラスに実装させる場合**

```typescript
interface Repository<T> {
  find(id: string): Promise<T>;
  save(entity: T): Promise<void>;
}

class UserRepository implements Repository<User> {
  async find(id: string): Promise<User> {
    // 実装
  }
  async save(user: User): Promise<void> {
    // 実装
  }
}
```

**外部に公開する API の型定義**

```typescript
// ライブラリの型定義
export interface ApiClient {
  get<T>(url: string): Promise<T>;
  post<T>(url: string, data: any): Promise<T>;
}
```

### type を使うべき場面

一方、以下のようなケースでは type を使う方が適切だと学びました。

**プリミティブ型やユニオン型のエイリアス**

```typescript
type UserId = string;
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type AsyncFunction<T> = () => Promise<T>;
```

**複雑な型の組み合わせ**

```typescript
type ApiResponse<T> = {
  data: T;
  status: number;
} & ({ success: true; error?: never } | { success: false; error: string });
```

**ユーティリティ型を使った型変換**

```typescript
type ReadonlyUser = Readonly<User>;
type PartialUser = Partial<User>;
type UserKeys = keyof User;
```

## 私が採用している実践的なルール

実際のプロジェクトで私が採用しているルールをまとめると：

1. **基本的には interface を使う** - オブジェクトの型定義は原則 interface で統一
2. **プリミティブ型のエイリアスやユニオン型は type** - 単純な型の別名や、複数の値から選択する型は type を使用
3. **関数の型定義は type** - 関数シグネチャの定義は可読性を考慮して type を使用
4. **外部公開 API は interface** - ライブラリやモジュールの公開インターフェースは拡張性を考慮して interface

## まとめ

interface と type の使い分けは、TypeScript 初心者にとって最初は混乱しやすいトピックです。私も最初は「どちらでもいいのでは？」と思っていましたが、実際にアプリケーションを実装していく中で、それぞれに明確な強みと適した使用場面があることが分かりました。

私は「オブジェクトの構造は interface、それ以外の型定義は type」という基本方針が、多くの場面でうまくと理解しています。

また、TypeScript の公式ドキュメントでも、「オブジェクトの形状を定義する場合は、基本的に interface を使用することを推奨」とされています。これは、interface の方が拡張しやすく、エラーメッセージも分かりやすいためです。

最後に、どちらを使うか迷ったときは、将来的な拡張性を考えることが大切です。後から型定義を拡張する可能性がある場合は interface、固定的な型定義で十分な場合は type を選ぶ、という考え方も一つの指針になるでしょう。

TypeScript の型システムは奥が深く、まだまだ学ぶことがたくさんありますが、interface と type の使い分けを理解できたことで、より型安全で保守しやすいコードが書けるようになったと感じています。これからも実際に手を動かしながら、自分なりの使い分けルールを見つけていきます。
