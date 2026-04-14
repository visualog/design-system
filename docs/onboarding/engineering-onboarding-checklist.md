# Engineering Onboarding Checklist

## 목적
- 새 팀원이 이 레포를 빠르게 실행하고, 어디를 수정해야 하는지 감을 잡을 수 있도록 돕습니다.
- 디자인 시스템 문서 사이트의 정보 구조와 Firebase 운영 포인트를 초반에 익히게 합니다.

## 1. 개발 환경 준비
- Node.js와 npm이 설치되어 있는지 확인
- 저장소 클론
- 의존성 설치
```bash
npm install
```
- 예제 환경 변수 복사
```bash
cp .env.example .env
```
- Firebase 웹앱 설정값 입력
- 관리자 테스트가 필요하면 `VITE_PROPOSAL_ADMIN_EMAILS`도 함께 설정

## 2. 로컬 실행
- 개발 서버 실행
```bash
npm run dev
```
- 기본 검증 실행
```bash
npm run verify:agent
```

## 3. 레포 구조 먼저 읽기
- `AGENTS.md`
- `docs/architecture/agent-context.md`
- `src/App.tsx`
- `src/components/Sidebar.tsx`
- `src/components/MainContent.tsx`
- `src/components/ui/ProposalNotification.tsx`

## 4. 정보 구조 이해
- `Foundation`
  - 디자인 토큰과 시스템 기반 요소
- `Components`
  - 공통 디자인 시스템 컴포넌트 가이드
- `Site Settings`
  - 현재 사이트 자체의 설정/구현 참고 정보

## 5. 작업 유형별 진입점
- 페이지/디자인 수정
  - `docs/agent-playbooks/ui-page-change.md`
- Firebase/Auth/권한 수정
  - `docs/agent-playbooks/firebase-auth-rules.md`
- Firebase와 Vercel 운영 반영
  - `docs/configuration/firebase-and-deployment.md`

## 6. 제안 기능 이해
- 로그인 사용자만 제안 기능 사용
- 제안은 Firestore `proposals` 컬렉션에 저장
- 삭제 버튼 노출은 작성자 또는 관리자 이메일 기준
- 실제 권한 강제는 Firestore Rules에서 처리

## 7. 작업 전에 확인할 것
- 이 변경이 `Foundation`, `Components`, `Site Settings` 중 어디에 속하는지
- 사용자 노출 문구가 한국어 기준에 맞는지
- 디자인 시스템 색상/토큰을 따르는지
- Firebase 관련 작업이면 env, Rules, 배포 반영이 같이 필요한지

## 8. 작업 후 기본 확인
- `npm run verify:agent`
- `npm run build`
- 필요 시 `npm run lint`
- Firebase 관련 변경이면 아래도 확인
  - 로컬 `.env`
  - Vercel 환경 변수
  - Firebase Console Rules publish 여부

## 9. 자주 헷갈리는 지점
- `Components`와 `Site Settings > Components`는 다른 영역
- 프론트에서 버튼을 숨겨도 보안은 아님
- 로컬 env 수정만으로 배포 반영되지는 않음
- 영문 시안은 구조 참고용이고 실제 페이지는 한국어 맥락에 맞춰야 함

## 10. 이후 확장 예정
- Realtime Database 기반 커서/typing/presence
- 관련 계획 문서
  - `docs/04-patterns/realtime-collaboration-implementation-plan.md`
