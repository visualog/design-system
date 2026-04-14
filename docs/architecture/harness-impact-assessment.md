# Harness Impact Assessment

## 목적
- 현재 레포에 추가한 하네스 문서와 검증 스크립트가 실제 작업 효율과 품질에 어떤 영향을 주는지 정리합니다.

## 확인한 변화
- 에이전트 진입 경로가 명확해졌습니다.
  - `AGENTS.md`
  - `docs/architecture/agent-context.md`
  - `docs/agent-playbooks/*`
  - `docs/configuration/firebase-and-deployment.md`
  - `docs/onboarding/engineering-onboarding-checklist.md`
- 공통 작업 흐름이 `README.md`와 `verify:agent`로 고정됐습니다.
- Firebase/Auth/Proposal 관련 변경에서 프론트, env, Firebase Console Rules를 분리해서 보게 됐습니다.

## 작업 효율 영향
- 레포 탐색 비용 감소
  - 핵심 파일과 문서가 지정되어 있어 처음 보는 에이전트가 전체 코드를 넓게 뒤질 필요가 줄었습니다.
- 누락 방지
  - `verify:agent`가 라우트, 사이드바, env 계약, Firebase 제안 기능 핵심 계약을 함께 검사합니다.
- 작업 재개성 향상
  - 실시간 협업 계획, Firebase 운영 문서, 온보딩 체크리스트가 남아 있어 다음 작업으로 이어가기 쉬워졌습니다.

## 성능 영향
- 하네스 자체는 런타임 성능을 직접 개선하지 않습니다.
- 다만 하네스가 성능 개선 작업을 더 빠르고 안전하게 진행하게 도왔습니다.
- 실제 레포에서 확인한 변화
  - 페이지 라우트 lazy loading 적용
  - `ParticleBackground` lazy loading 적용
  - `IconDisplay`의 SVG eager import 제거
  - `manualChunks` 적용
- 그 결과 초기 진입 청크와 일부 페이지 청크는 크게 줄었습니다.

## 레포 기준 판단
- 작업 효율: 영향 있음
  - 근거: 문서 경로 표준화, 검증 스크립트 도입, Firebase 운영 절차 명문화
- 작업 품질: 영향 있음
  - 근거: 빌드 외에 구조 계약까지 자동 확인
- 런타임 성능: 간접 영향 있음
  - 근거: 하네스 덕분에 성능 개선 작업을 반복적으로 안전하게 적용하고 검증할 수 있었음

## 한계
- `verify:agent`는 아직 정적 계약 검사 중심입니다.
- Firebase Console Rules 자체를 자동으로 검증하지는 못합니다.
- 번들 성능은 아직 `three-vendor`, 일부 공통 `vendor` 청크 최적화 여지가 남아 있습니다.

## 다음 단계
- `verify:agent`에 더 많은 운영 계약 추가
- 번들 분석 기준을 문서화하고 청크 목표치를 정하기
- Firebase Rules를 레포 내 버전 관리 대상으로 끌어올릴지 결정하기
