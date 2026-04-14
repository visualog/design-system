# Firebase And Deployment Operations

## 목적
- Firebase 기능 변경 시 프론트 코드, 환경 변수, 콘솔 설정이 분리되어 누락되는 문제를 줄입니다.
- 로컬 개발과 Vercel 배포 반영 절차를 한 문서에서 확인할 수 있게 합니다.

## 현재 사용 중인 Firebase 기능
- Firebase Authentication
  - 로그인 및 비밀번호 재설정
- Cloud Firestore
  - 개선 제안(`proposals`) 저장 및 조회
- 향후 예정
  - Realtime Database
  - 실시간 커서, presence, typing 상태

## 환경 변수 계약
- 로컬 개발
  - 파일: `.env`
- 배포 환경
  - 위치: Vercel Project Settings > Environment Variables

### 필수 변수
```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_PROPOSAL_ADMIN_EMAILS=
```

### 변수 의미
- `VITE_FIREBASE_*`
  - Firebase 웹앱 초기화에 사용
- `VITE_PROPOSAL_ADMIN_EMAILS`
  - 프론트에서 제안 삭제 버튼을 관리자에게 노출할 때 사용
  - 쉼표 구분 이메일 목록
  - 예: `taikyong@fasoo.com,admin2@fasoo.com`

## 변경 유형별 체크리스트

### 1. 로그인/비밀번호 재설정 수정
- 확인 파일
  - `src/contexts/AuthContext.tsx`
  - `src/lib/firebase.ts`
- 체크 항목
  - 이메일 포맷 처리
  - Firebase Auth 설정과 도메인 일치 여부
  - 로컬과 배포 환경 변수 누락 여부

### 2. 제안 권한 수정
- 확인 파일
  - `src/hooks/useProposals.ts`
  - `src/components/ui/ProposalNotification.tsx`
- 체크 항목
  - 프론트에서 버튼이 누구에게 보이는지
  - Firestore Rules에서 실제로 누가 생성/수정/삭제 가능한지
  - 관리자 이메일 env가 최신인지

### 3. 관리자 계정 추가/변경
- 프론트
  - `.env` 또는 Vercel의 `VITE_PROPOSAL_ADMIN_EMAILS` 수정
- 백엔드
  - Firestore Rules의 관리자 이메일 allowlist 수정
- 반영
  - 로컬 개발 서버 재시작
  - Vercel 재배포
  - Firebase Console에서 Rules publish

## Firestore Rules 운영 원칙
- 프론트에서 버튼을 숨겨도 보안은 아닙니다.
- 실제 삭제/수정 권한은 Firestore Rules에서 강제되어야 합니다.
- 제안 기능 기준 기본 원칙
  - 읽기: 로그인 사용자
  - 생성: 작성자 본인 이메일로 생성
  - 삭제/수정: 작성자 또는 관리자

## Vercel 반영 절차
1. Vercel 프로젝트 선택
2. `Settings`
3. `Environment Variables`
4. 대상 변수 추가 또는 수정
5. 저장 후 새 배포 실행

## 로컬 반영 절차
1. `.env` 수정
2. `npm run dev`가 이미 실행 중이면 서버 재시작
3. 필요 시 `npm run verify:agent`
4. Firebase 관련 코드 변경이면 `npm run build`

## Firebase Console 반영이 필요한 경우
- Firestore Rules 변경
- Authentication 제공업체 설정 변경
- 향후 Realtime Database 활성화 및 Rules 설정

## 배포 전 최소 점검
- `npm run verify:agent`
- `npm run build`
- 변경이 Firebase 권한에 영향이 있다면:
  - Rules publish 여부 확인
  - Vercel env 반영 여부 확인
  - 로컬 `.env`와 배포 값 차이 확인
