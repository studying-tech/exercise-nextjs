---
title: 'React コンポーネント設計：再利用可能で保守しやすいUIの構築'
date: '2024-03-15'
author: '鈴木一郎'
tags: ['React', 'コンポーネント設計', 'UI/UX', 'フロントエンド']
excerpt: '再利用可能で保守しやすいReactコンポーネントを設計するための実践的なパターンとテクニックを解説します。'
coverImage: '/images/react-components.jpg'
published: true
---

## はじめに

React アプリケーションの成功は、コンポーネント設計の質に大きく依存します。本記事では、スケーラブルで保守しやすいコンポーネントアーキテクチャを構築するための実践的なアプローチを紹介します。

## コンポーネント設計の原則

### 1. 単一責任の原則（SRP）

各コンポーネントは 1 つの責任のみを持つべきです。

```tsx
// ❌ 複数の責任を持つコンポーネント
function UserProfile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchUser().then(setUser);
    fetchPosts().then(setPosts);
  }, []);

  return (
    <div>
      <h1>{user?.name}</h1>
      <div>
        {posts.map((post) => (
          <div>{post.title}</div>
        ))}
      </div>
    </div>
  );
}

// ✅ 責任を分離したコンポーネント
function UserProfile({ userId }) {
  return (
    <>
      <UserInfo userId={userId} />
      <UserPosts userId={userId} />
    </>
  );
}
```

### 2. コンポジション優先

継承よりもコンポジションを使用してコンポーネントを構築します。

```tsx
// Compound Components パターン
function Card({ children }) {
  return <div className='card'>{children}</div>;
}

Card.Header = function CardHeader({ children }) {
  return <div className='card-header'>{children}</div>;
};

Card.Body = function CardBody({ children }) {
  return <div className='card-body'>{children}</div>;
};

Card.Footer = function CardFooter({ children }) {
  return <div className='card-footer'>{children}</div>;
};

// 使用例
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>Actions</Card.Footer>
</Card>;
```

## Custom Hooks の活用

### ロジックの抽出と再利用

```tsx
// カスタムフック
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// 使用例
function SearchInput() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      performSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder='Search...' />;
}
```

### データフェッチングフック

```tsx
function useFetch<T>(url: string): {
  data: T | null;
  loading: boolean;
  error: Error | null;
} {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(url, {
          signal: abortController.signal,
        });
        const data = await response.json();
        setData(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err as Error);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => abortController.abort();
  }, [url]);

  return { data, loading, error };
}
```

## パフォーマンス最適化

### 1. メモ化の適切な使用

```tsx
// React.memo でコンポーネントをメモ化
const ExpensiveComponent = React.memo(
  ({ data }) => {
    return <ComplexVisualization data={data} />;
  },
  (prevProps, nextProps) => {
    // カスタム比較関数
    return prevProps.data.id === nextProps.data.id;
  }
);

// useMemo で計算結果をメモ化
function DataProcessor({ items }) {
  const processedData = useMemo(() => {
    return items
      .filter((item) => item.active)
      .map((item) => ({
        ...item,
        processed: true,
      }))
      .sort((a, b) => b.priority - a.priority);
  }, [items]);

  return <DataTable data={processedData} />;
}
```

### 2. 遅延ロード

```tsx
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <HeavyComponent />
    </Suspense>
  );
}
```

## 状態管理パターン

### 1. Lifting State Up

```tsx
function TemperatureCalculator() {
  const [temperature, setTemperature] = useState('');
  const [scale, setScale] = useState('c');

  const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
  const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

  return (
    <>
      <TemperatureInput
        scale='c'
        temperature={celsius}
        onTemperatureChange={(temp) => {
          setTemperature(temp);
          setScale('c');
        }}
      />
      <TemperatureInput
        scale='f'
        temperature={fahrenheit}
        onTemperatureChange={(temp) => {
          setTemperature(temp);
          setScale('f');
        }}
      />
    </>
  );
}
```

### 2. Context API の活用

```tsx
// テーマコンテキスト
const ThemeContext = createContext<{
  theme: 'light' | 'dark';
  toggleTheme: () => void;
} | null>(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
```

## テスト可能なコンポーネント

### Presentational と Container の分離

```tsx
// Presentational Component
interface UserListProps {
  users: User[];
  onUserClick: (user: User) => void;
  loading?: boolean;
  error?: Error | null;
}

export function UserList({ users, onUserClick, loading, error }: UserListProps) {
  if (loading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id} onClick={() => onUserClick(user)}>
          {user.name}
        </li>
      ))}
    </ul>
  );
}

// Container Component
export function UserListContainer() {
  const { data: users, loading, error } = useFetch<User[]>('/api/users');
  const navigate = useNavigate();

  const handleUserClick = (user: User) => {
    navigate(`/users/${user.id}`);
  };

  return <UserList users={users || []} onUserClick={handleUserClick} loading={loading} error={error} />;
}
```

## アクセシビリティ

```tsx
function AccessibleButton({ onClick, children, ...props }) {
  return (
    <button
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(e);
        }
      }}
      role='button'
      tabIndex={0}
      aria-label={props['aria-label']}
      {...props}
    >
      {children}
    </button>
  );
}
```

## まとめ

優れた React コンポーネントは、再利用可能で、テスト可能で、保守しやすいものです。これらのパターンとベストプラクティスを活用することで、スケーラブルな React アプリケーションを構築できます。

常にコードの簡潔性と可読性を心がけ、必要以上に複雑にしないことが重要です。チーム全体でこれらの原則を共有し、一貫性のあるコードベースを維持しましょう。
