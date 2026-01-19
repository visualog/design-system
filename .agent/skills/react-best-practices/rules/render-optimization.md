# Render Optimization

**Impact: MEDIUM**

리액트의 리렌더링 프로세스를 최적화하여 사용자 경험(UX)을 부드럽게 유지하십시오.

### 1. Memoization with `useMemo` & `useCallback`
비싼 연산이나 자식 컴포넌트에 넘겨주는 함수가 매번 새로 생성되는 것을 방지합니다.

**Example:**
```tsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
const memoizedCallback = useCallback(() => { doSomething(a); }, [a]);
```

### 2. Avoid Objects in Props
컴포넌트 props로 매번 새로운 객체나 배열을 전달하면 `React.memo` 등으로 감싸더라도 얕은 비교(shallow comparison) 때문에 리렌더링이 발생합니다.

**Incorrect:**
```tsx
<UserCard style={{ color: 'red' }} /> // 렌더링될 때마다 새로운 객체가 생성됨
```

**Correct:**
```tsx
const cardStyle = useMemo(() => ({ color: 'red' }), []);
// ...
<UserCard style={cardStyle} />
```

### 3. State Location
상태는 필요한 가장 낮은 레벨의 컴포넌트로 내리십시오. (Lift state down) 전역 상태가 변경될 때 앱 전체가 리렌더링되는 것을 방지하십시오.
