# Foundation Compact IA Audit (v1)

기준 문서: `docs/02-foundations/compact-ia-template.md`  
점검일: 2026-02-24  
범위: Foundation 9개 페이지 (`Overview`, `Colors`, `Typography`, `Spacing`, `Layout`, `Radius`, `Motion`, `Icons`, `Shadows`)

## 체크 항목
- `C1` 섹션 간격이 토큰 외 추가 margin 없이 유지되는가
- `C2` 카드형 박스를 과도하게 사용하지 않았는가
- `C3` 문서형 리스트 블록이 `divide-y + compact row` 기준으로 정렬되는가
- `C4` H1 보조 설명이 2문장 템플릿을 따르는가
- `C5` 같은 유형 페이지에서 제목/설명/리스트 간격이 동일한가

상태 표기: `✅ 충족` / `⚠️ 부분 충족` / `❌ 개선 필요` / `— 해당 없음`

## 1차 점검표
| Page | C1 | C2 | C3 | C4 | C5 | 메모 |
|---|---|---|---|---|---|---|
| Overview | ✅ | ⚠️ | ✅ | ✅ | ⚠️ | 핵심 섹션은 문서형으로 정리됨. `Do/Don't`는 의도적으로 카드형 유지 |
| Colors | ⚠️ | ⚠️ | ✅ | ✅ | ⚠️ | New/Legacy 공존으로 밀도 규칙 혼재 |
| Typography | ⚠️ | ⚠️ | — | ✅ | ⚠️ | Display 내부 블록 밀도 편차 존재 |
| Spacing | ✅ | ⚠️ | — | ✅ | ⚠️ | 구조는 단순하나 내부 예시 블록 밀도 재점검 필요 |
| Layout | ✅ | ✅ | — | ✅ | ⚠️ | 문서형은 양호, 다른 페이지 대비 섹션 수가 적어 리듬 차이 발생 |
| Radius | ✅ | ⚠️ | — | ✅ | ⚠️ | 사용 예시 블록 밀도/여백 재조정 필요 |
| Motion | ✅ | ⚠️ | — | ✅ | ⚠️ | 인터랙션 데모 구역과 텍스트 구역 간 밀도 차이 큼 |
| Icons | ✅ | ⚠️ | — | ✅ | ⚠️ | 아이콘 그리드 특성상 카드 느낌이 강함 |
| Shadows | ✅ | ⚠️ | — | ✅ | ⚠️ | 스케일/플레이그라운드/토큰 블록 간 간격 통일 필요 |

## 페이지별 1차 액션

### Overview
- [ ] `Do/Don't` 섹션의 카드 시각 무게를 한 단계 낮출지 결정 (보더/배경 대비 축소)
- [ ] `시스템 목표` 리스트 스타일을 다른 텍스트형 페이지에 재사용할 수 있도록 패턴화

### Colors
- [ ] New/Legacy 탭별 간격 규칙 분리 정의
- [ ] `사용 가이드` 내부 중첩 스택(`doc-content-stack-tight`) 최소화 여부 검토

### Typography
- [ ] `TypographyDisplay`, `TypographyNewDisplay` 내부 블록 간격을 compact 토큰으로 재매핑
- [ ] 본문 설명 길이 편차를 줄여 섹션 리듬 통일

### Spacing
- [ ] 예시 블록의 상하 패딩을 compact 기준으로 재점검
- [ ] Usage 섹션의 텍스트/예시 간 간격 일관화

### Layout
- [ ] Overview 단일 섹션 구조에 `요약 리스트` 소블록 추가 검토
- [ ] 다른 Foundation 페이지와 섹션 헤더 리듬 정합성 확인

### Radius
- [ ] 토큰 표와 예시 블록 사이 간격 통일
- [ ] 중첩 라디우스 설명 텍스트의 길이/리듬 재정리

### Motion
- [ ] 데모 영역과 토큰 표 사이 공백 최소화
- [ ] 모션 용어 설명을 1~2문장 규칙으로 재압축

### Icons
- [ ] 필터/그리드/상세 패널 간 세로 간격 토큰 통일
- [ ] 카드 느낌을 줄이기 위해 항목 경계 표현(보더/배경) 강도 조정 검토

### Shadows
- [ ] 스케일/플레이그라운드/토큰 섹션 내부 간격 스케일 단일화
- [ ] Usage 블록과 Overview 블록의 헤더-본문 간격 리듬 정합

## 우선순위 (2차 작업 제안)
1. `Typography`, `Motion`, `Shadows` 내부 Display 밀도 정규화
2. `Colors` New/Legacy 밀도 규칙 분리 및 중복 스택 정리
3. `Overview Do/Don't` 시각 무게 조정

