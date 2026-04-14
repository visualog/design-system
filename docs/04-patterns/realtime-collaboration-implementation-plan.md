# Realtime Collaboration Implementation Plan

## 목적
- 현재 `Firestore` 기반 제안(Proposal) 기능은 유지한다.
- 피그마 유사 협업 경험을 위해 다음을 추가한다.
- 실시간 커서 표시 (접속자별 커서 위치/이름/색상)
- 실시간 코멘트 입력 UX (핀/스레드/입력중 상태)

## 범위
- 포함:
- `Realtime Database`를 Presence/Cursor/Typing 채널로 추가
- 기존 `Firestore`를 제안/코멘트 영구 저장소로 유지
- 페이지 단위 커서 표시 및 코멘트 입력 연동
- 미포함:
- 화상 협업, 권한 그룹/조직도 연동, 알림 메일 자동 발송

## 목표 아키텍처
- Firestore:
- `proposals` (기존)
- `proposalThreads` / `proposalComments` (필요 시 분리)
- Realtime Database:
- `/cursors/{pageKey}/{uid}`
- `/typing/{pageKey}/{uid}`
- `/presence/{uid}`

## 데이터 모델 초안
- Cursor (`RTDB:/cursors/{pageKey}/{uid}`)
  - `x: number`
  - `y: number`
  - `name: string`
  - `email: string`
  - `color: string`
  - `updatedAt: number`
- Typing (`RTDB:/typing/{pageKey}/{uid}`)
  - `targetId: string` (선택한 요소 selector 또는 thread id)
  - `updatedAt: number`
- Comment (`Firestore`)
  - `threadId: string`
  - `targetPage: string`
  - `selector: string | null`
  - `content: string`
  - `authorEmail: string`
  - `createdAt: serverTimestamp`

## 구현 단계
### 1) 인프라 설정
- Firebase Console에서 Realtime Database 활성화 (Locked mode).
- `.env`/Vercel에 `VITE_FIREBASE_DATABASE_URL` 추가.
- `src/lib/firebase.ts`에 `getDatabase` 초기화 및 `rtdb` export 추가.

### 2) 보안 규칙 적용
- Firestore 규칙:
- 읽기/생성: 로그인 사용자 허용
- 삭제: 작성자 + 관리자만 허용 (현재 정책 유지)
- RTDB 규칙:
- read: 로그인 사용자
- write: `auth.uid === $uid` 본인 노드만 허용
- `onDisconnect()`로 세션 종료 시 자동 정리

### 3) 커서 기능(1차)
- `useLiveCursors` 훅 생성:
- 페이지 키(`pageKey`) 생성: `encodeURIComponent(pathname)`
- `mousemove`는 throttle(30~60ms)로 업로드
- 구독 데이터에서 본인 uid 제외 후 렌더링
- `CursorOverlay` 컴포넌트 생성:
- 이름 + 색상 + 커서 점 표시
- 겹침 최소화(이름 라벨 오프셋)

### 4) 타이핑 상태(1.5차)
- 댓글 입력창 포커스 시 `/typing/{pageKey}/{uid}` 업데이트
- blur/submit 시 typing 제거
- 입력중인 사용자 라벨 표시 ("OO님 입력 중")

### 5) 코멘트 UX(2차)
- 현재 Proposal 입력 UI를 스레드형으로 확장:
- 요소 선택 -> 핀 생성 -> 스레드 열기
- 댓글 목록 실시간 렌더링(Firestore `onSnapshot`)
- 작성/수정/삭제 정책은 기존 권한 규칙 준수

### 6) 운영 반영
- Staging 배포 후 동시접속(3~5명) 테스트
- Vercel Production 배포
- 팀 공지: 사용 가이드 + 제한사항 공유

## 수용 기준 (Acceptance Criteria)
- 로그인 사용자끼리 같은 페이지에서 서로 커서가 1초 내 반영된다.
- 페이지 이탈/탭 종료 후 커서가 자동 사라진다.
- 댓글 작성은 로그인 사용자 가능, 삭제는 작성자/관리자만 가능.
- 기존 Proposal 기능 회귀 이슈가 없다.

## 성능/비용 가드레일
- 커서 업데이트 주기 제한(throttle).
- 비활성 탭(`document.hidden`)에서는 업데이트 중지.
- 오래된 presence 데이터 정리(클라이언트 + 필요 시 주기 정리).
- Firestore 고빈도 쓰기 방지(커서/typing은 RTDB만 사용).

## 위험 요소 및 대응
- 위험: RTDB 경로 키 충돌/금지문자
- 대응: `pageKey` 인코딩 강제, 공통 유틸 사용
- 위험: 권한 누락으로 삭제/쓰기 실패
- 대응: Rules Playground + 실제 사용자 계정 테스트 케이스 운영
- 위험: 모바일에서 오버레이 충돌
- 대응: 모바일에서는 커서 라벨 최소화 또는 비활성 옵션 제공

## 테스트 체크리스트
- 계정 A/B 동시 접속 -> 커서 상호 표시 확인
- A 로그아웃/탭종료 -> 커서 제거 확인
- A 댓글 생성, B 조회 가능 확인
- B가 A 댓글 삭제 시도 -> 차단 확인
- 관리자 계정 삭제 가능 확인

## 사전 준비물
- 관리자 이메일 목록 확정 (`VITE_PROPOSAL_ADMIN_EMAILS`)
- Firebase Console 접근 권한 (Firestore/RTDB Rules 반영 가능 권한)
- 검증용 테스트 계정 2개 이상

## 추후 확장 후보
- 선택 요소 hover 공유(협업 포인터 하이라이트)
- 댓글 멘션(@) 및 알림
- 페이지별 참여자 목록/활성 상태 배지
