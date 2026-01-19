# Parallel Fetching (Avoid Waterfalls)

**Impact: CRITICAL**

독립적인 비동기 작업들이 서로를 기다리게 하지 마십시오. 이는 "Network Waterfall"을 유발하여 페이지 로드 속도를 크게 저하시킵니다.

### Incorrect
```tsx
const data1 = await fetchData1(); // data1 작업이 끝날 때까지 data2는 시작도 못함
const data2 = await fetchData2();
```

### Correct
```tsx
const [data1, data2] = await Promise.all([
  fetchData1(),
  fetchData2()
]);
```

### Guidelines
- 데이터 간에 의존성이 없다면 항상 `Promise.all` 또는 `Promise.allSettled`를 사용하십시오.
- 리액트 컴포넌트 레벨에서 데이터 페칭을 할 경우, 부모 컴포넌트에서 필요한 데이터를 한꺼번에 페칭하거나 데이터 프리로딩 핵심을 활용하십시오.
