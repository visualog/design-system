# Design System Site

사내 서비스에서 공통으로 사용하는 디자인 시스템 가이드 사이트입니다. 이 레포는 디자인 토큰과 컴포넌트 가이드를 문서화하고, 현재 사이트 설정 정보를 함께 제공하며, 로그인 기반 개선 제안 기능까지 포함합니다.

## 빠른 시작
```bash
npm install
cp .env.example .env
npm run verify:agent
npm run dev
```

처음 작업을 시작할 때는 아래 문서를 먼저 보면 흐름을 빠르게 잡을 수 있습니다.
- `AGENTS.md`
- `docs/architecture/agent-context.md`
- `docs/onboarding/engineering-onboarding-checklist.md`

## 주요 영역
- `Foundation`
  - 색상, 타이포그래피, 스페이싱, 레이아웃, 라디우스, 모션, 아이콘, 섀도우 등 디자인 시스템 기반 요소를 다룹니다.
- `Components`
  - 공통 컴포넌트 사용 가이드를 제공합니다. 현재 버튼 가이드 페이지가 포함되어 있습니다.
- `Site Settings`
  - 현재 사이트 구현에 대한 설정성 정보와 컴포넌트 레퍼런스를 제공합니다.
- `Proposal`
  - 로그인한 사용자가 페이지 요소를 선택해 개선 제안을 남길 수 있습니다.

## 기술 스택
- Vite
- React 19
- TypeScript
- Tailwind CSS
- Firebase Authentication
- Cloud Firestore

## 라우트 구조
- `/overview`
- `/colors`
- `/typography`
- `/spacing`
- `/layout`
- `/radius`
- `/motion`
- `/icons`
- `/shadows`
- `/guide/components/button`
- `/site-settings`
- `/site-settings/components`
- `/site-settings/theme`
- `/site-settings/layout`
- `/site-settings/typography`
- `/site-settings/components/:componentName`
- `/login`

## 시작하기
1. 의존성 설치
```bash
npm install
```

2. 환경 변수 설정
```bash
cp .env.example .env
```

3. 개발 서버 실행
```bash
npm run dev
```

4. 에이전트용 기본 검증
```bash
npm run verify:agent
```

## 환경 변수
기본 Firebase 설정 외에 관리자 메일 기반 제안 삭제 권한 표시에 아래 변수를 사용합니다.

```env
VITE_PROPOSAL_ADMIN_EMAILS=taikyong@fasoo.com
```

- 로컬 `.env`와 Vercel 환경 변수는 별도로 관리됩니다.
- Firebase Console Rules 변경은 이 레포 변경과 별개로 직접 반영해야 합니다.

## 스크립트
- `npm run dev`
  - 개발 서버 실행
- `npm run verify:agent`
  - 하네스 문서, 주요 라우트, 사이드바 링크, Firebase 제안 기능 핵심 계약 점검
- `npm run build`
  - TypeScript 빌드 후 Vite 프로덕션 번들 생성
- `npm run lint`
  - ESLint 실행

## 협업 기능 메모
- 현재 개선 제안은 Firestore 기반으로 저장됩니다.
- 삭제 버튼 노출은 작성자 또는 `VITE_PROPOSAL_ADMIN_EMAILS`에 포함된 관리자 계정 기준입니다.
- 향후 실시간 커서/타이핑 기능은 Realtime Database를 추가하는 방향으로 계획되어 있습니다.
- 관련 계획 문서: `docs/04-patterns/realtime-collaboration-implementation-plan.md`

## 하네스 문서
- 레포 작업 규칙: `AGENTS.md`
- 레포 구조 요약: `docs/architecture/agent-context.md`
- UI 변경 플레이북: `docs/agent-playbooks/ui-page-change.md`
- Firebase 작업 플레이북: `docs/agent-playbooks/firebase-auth-rules.md`
- Firebase/Vercel 운영 문서: `docs/configuration/firebase-and-deployment.md`
- 온보딩 체크리스트: `docs/onboarding/engineering-onboarding-checklist.md`

## 운영 체크
- Firebase 권한 변경 시 프론트 코드와 별개로 Firebase Console Rules 반영이 필요할 수 있습니다.
- 로컬 `.env` 수정은 배포에 반영되지 않으므로, 운영 값은 Vercel 환경 변수에도 별도로 설정해야 합니다.
- 제안 삭제 정책을 바꾸면 프론트 표시 조건과 Firestore Rules를 함께 확인해야 합니다.
