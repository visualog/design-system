---
name: react-best-practices
description: Reusable instructions for best practices when building React and Vite applications. These rules help optimize performance, bundle size, and code quality.
---

# React & Vite Best Practices

이 스킬은 리액트와 비트(Vite)를 사용하는 프로젝트에서 성능 최적화, 번들 크기 관리, 그리고 코드 품질을 유지하기 위한 가이드를 제공합니다.

## When to Use
- 새로운 리액트 컴포넌트를 작성할 때
- 데이터 페칭 로직을 구현할 때 (예: TanStack Query, Fetch API)
- Vite 설정(`vite.config.ts`)을 변경하거나 최적화할 때
- 리렌더링 성능 이슈를 해결하거나 코드 리뷰를 수행할 때

## Key Categories & Rules

### 1. Eliminating Waterfalls (CRITICAL)
- **Parallel Fetching**: 독립적인 데이터 요청은 `Promise.all` 등을 사용하여 병렬로 처리합니다.
- **Preloading**: 필요한 리소스는 가능한 프로젝트의 상위 단계에서 미리 페칭을 시작합니다.

### 2. Bundle Size Optimization (CRITICAL)
- **Barrel Imports Avoidance**: 번들 크기를 줄이기 위해 트리쉐이킹이 잘 작동하도록 직접 임포트 경로를 사용합니다.
- **Dynamic Imports**: 무거운 컴포넌트나 특정 조건에서만 필요한 코드는 `React.lazy()`와 `Suspense`를 사용하여 동적으로 임포트합니다.
- **Vite Split Vendor Chunk**: `splitVendorChunkPlugin` 등을 활용하여 라이브러리 코드를 별도 청크로 분리합니다.

### 3. Rendering Performance (MEDIUM)
- **Memoization**: `useMemo`, `useCallback`을 적절히 사용하여 불필요한 계산과 리렌더링을 방지합니다.
- **Primitive Props**: 객체나 배열 대신 원시 타입(string, number)을 props로 전달하여 불필요한 비교 세션을 줄입니다.

### 4. Vite Specific Optimizations (HIGH)
- **Asset Optimization**: 이미지 및 정적 에셋의 압축 및 올바른 경로 처리를 준수합니다.
- **Config Tuning**: `build.rollupOptions`를 통해 수동으로 청크를 나누어 브라우저 캐싱 효율을 높입니다.

## Detailed Rules
상세 규칙은 `./rules/*.md` 파일들을 참조하십시오.
- [Parallel Fetching](./rules/async-parallel.md)
- [Bundle Optimization](./rules/bundle-optimization.md)
- [Render Optimization](./rules/render-optimization.md)
- [Vite Settings](./rules/vite-config-best-practices.md)
