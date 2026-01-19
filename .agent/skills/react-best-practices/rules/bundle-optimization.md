# Bundle Size Optimization

**Impact: CRITICAL**

브라우저가 다운로드해야 하는 자바스크립트 양을 최소화하여 첫 방문 시의 성능을 극대화하십시오.

### 1. Avoid Barrel Imports
통합 `index.ts` (Barrel file)를 통해 전체 라이브러리를 임포트하면 트리쉐이킹이 실패하여 사용하지 않는 코드까지 번들에 포함될 수 있습니다.

**Incorrect:**
```tsx
import { HeavyComponent } from '@/components'; // components/index.ts가 모든 컴포넌트를 불러옴
```

**Correct:**
```tsx
import { HeavyComponent } from '@/components/HeavyComponent';
```

### 2. Dynamic Imports (Code Splitting)
초기 로드에 필요하지 않은 무거운 컴포넌트는 필요한 시점에 불러오도록 설정합니다.

**Example (React with Vite):**
```tsx
import { lazy, Suspense } from 'react';

const HeavyChart = lazy(() => import('./HeavyChart'));

function Dashboard() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyChart />
    </Suspense>
  );
}
```

### 3. Analyze Bundle
- `rollup-plugin-visualizer`를 사용하여 어떤 라이브러리가 번들 크기를 차지하는지 주기적으로 확인하십시오.
- 불필요한 대형 라이브러리(예: moment.js)는 가벼운 대안(date-fns)으로 교체하십시오.
