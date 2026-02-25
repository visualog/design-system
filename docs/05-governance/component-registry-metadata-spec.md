# Component Registry Metadata Spec (Draft)

## 목적

- `componentRegistry`에 운영 메타데이터를 추가해 문서/필터/릴리즈 관리를 일관화한다.

## 제안 필드

```ts
interface ComponentMeta {
  // existing...
  atomicLevel?: 'atom' | 'molecule' | 'organism';
  releasePhase?: 'experimental' | 'beta' | 'stable' | 'deprecated';
  owner?: string;           // 예: design-system-core
  since?: string;           // 예: 2026-02-20
  figmaUrl?: string;
  storybookUrl?: string;
  tags?: string[];          // 예: ['form', 'navigation']
}
```

## UI 반영 우선순위

1. 카드/상세에 `releasePhase` 배지 노출
2. 카드/상세에 `atomicLevel` 노출
3. 카테고리 외 필터(`releasePhase`, `atomicLevel`) 추가

## 운영 규칙

- 신규 컴포넌트는 `releasePhase` 필수
- `deprecated`는 대체 컴포넌트 링크 필수
- `since`는 `YYYY-MM-DD` 형식 사용
