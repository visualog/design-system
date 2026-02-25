# Colors IA Revamp v1

## 목적
- Colors 문서를 `System -> Role -> Palette` 흐름으로 재정렬해 의사결정 경로를 단순화한다.
- 사용자가 "무엇을 먼저 써야 하는지"(Role 우선)를 첫 화면에서 바로 이해하도록 만든다.
- 문서/토큰/컴포넌트의 단일 소스를 구축해 유지보수 비용을 줄인다.

## 참고 레퍼런스
- https://seed-design.io/docs/foundation/color/color-system
- https://seed-design.io/docs/foundation/color/color-role
- https://seed-design.io/docs/foundation/color/palette

## 팀 구성 및 역할
- 기획(DS Planner): IA/내러티브/운영 정책 정의, 우선순위 결정
- UX Designer: 학습 흐름, 탐색 경로, 정보 밀도/가독성 검증
- UI Designer: 표/매트릭스/토큰 시각화 컴포넌트 규격화
- Frontend Engineer: 토큰 단일 소스, 자동 렌더 파이프라인, lint 룰 적용

## 브레인스토밍 요약
- 기획: "현재는 예시가 많아도 의사결정 경로가 약하다. Role 우선 원칙을 전면에 둬야 한다."
- UX: "사용자 질문은 항상 '무엇을 써야 하나'다. Palette는 레퍼런스, Role은 실행 규칙으로 분리해야 한다."
- UI: "텍스트 중심 서술보다 Role Matrix와 Token Anatomy가 빠르게 이해된다."
- FE: "문서를 수작업으로 유지하면 드리프트가 생긴다. 토큰 JSON에서 문서를 자동 생성해야 한다."

## 합의된 IA
1. Color System
- 목적: 철학/원칙/적용 범위를 설명
- 핵심 메시지: 기본은 Role 토큰 사용, Palette 직접 사용은 예외

2. Color Roles
- 목적: 실제 구현 규칙 제공
- 핵심 콘텐츠: PRVS(Property-Role-Variant-State), Role Matrix, 상태별 사용 규칙

3. Palette
- 목적: 원시 색상 레퍼런스 제공
- 핵심 콘텐츠: 스케일, 사용 가능 범위, 연결된 Role 정보

## 페이지 공통 포맷(템플릿)
1. 개요(1~2문장)
2. 핵심 규칙(3~5개)
3. Do/Don't
4. 토큰 표/매트릭스
5. 체크리스트(실무 적용 항목)

## Colors 페이지 상세 구조(제안)
### A. Color System
- H1 보조 설명: "컬러 시스템의 원칙과 사용 기준을 정의합니다."
- Section: Design Principles
- Section: Role-first Rule (강조 배너)
- Section: Quick Checklist

### B. Color Roles
- Section: Token Anatomy (PRVS)
- Section: Role Matrix (role x property x variant x state)
- Section: Context Rules (surface/text/icon/border)
- Section: Accessibility Rules (AA/AAA, 대비 기준)

### C. Palette
- Section: Neutral / Brand / Semantic Candidate Scale
- Section: Allowed vs Restricted Use
- Section: Mapping to Roles

## 컴포넌트/데이터 모델
- `TokenAnatomy`: PRVS 단계별 분해 표시
- `RoleMatrixTable`: 역할 매트릭스 표준 컴포넌트
- `PaletteGrid`: 팔레트 스와치 + token/hex copy
- `GuidelineItem` + `DoDont`: 규칙 설명 일관 포맷

데이터 소스
- 단일 소스: color token JSON
- 문서 렌더: JSON -> Role/Palette 화면 자동 구성

## 운영 규칙
- Raw hex 직접 사용 금지(예외 경로 명시)
- 의미 토큰 우선(`bg.brand.solid.default` 같은 역할 기반 토큰)
- 명도 대비 배지 자동 표기(AA/AAA)
- 문서 예시는 코드 스니펫과 1:1 대응

## 실행 로드맵
### P0 (즉시)
- IA 재배치(`System/Roles/Palette`)
- 공통 섹션 템플릿 적용
- Role-first 원칙 배너 추가

### P1
- Role Matrix 컴포넌트 도입
- Palette 사용 제한/예외 규칙 추가
- Usage Guide를 규칙 중심 문장으로 재작성

### P2
- JSON 단일 소스 기반 자동 렌더
- lint 룰(hex 금지/semantic 우선) 연결
- 대비(AA/AAA) 자동 검사 연동

## 성공 지표
- 문서 탐색 단계 감소(사용자 테스트 기준)
- "어떤 토큰을 써야 하는지" 질문 응답 시간 단축
- Raw color 사용률 감소, semantic token 사용률 증가
