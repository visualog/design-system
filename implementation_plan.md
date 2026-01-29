# Implementation Plan - Login Feature

로그인 기능을 추가하여 사이트 접근을 제어하고, 디자인 시스템의 예시 페이지로도 활용할 수 있도록 구현합니다.

## User Goals
- 사이트에 로그인 기능을 추가하고 싶음.
- 12단 그리드 오버레이와 같은 기능과 함께 완성도 높은 사이트 구성을 원함.

## Proposed Changes

### 1. 인증 컨텍스트 (Auth Context)
- `src/contexts/AuthContext.tsx` 생성
- 간단한 패스워드 기반 인증 (비밀번호: `admin` 또는 설정 가능)
- `localStorage`를 이용한 로그인 상태 유지 (`isAuthenticated`)

### 2. 로그인 페이지 (Login Page)
- `src/components/LoginPage.tsx` 생성
- 깔끔하고 모던한 UI 디자인 (Glassmorphism, Centered Card)
- 로고, 환영 메시지, 비밀번호 입력 필드, 로그인 버튼

### 3. 라우팅 보호 (Route Protection)
- `src/components/ProtectedRoute.tsx` 생성
- 로그인되지 않은 사용자가 접근 시 `/login`으로 리다이렉트

### 4. 앱 통합 (App Integration)
- `App.tsx` 수정: `AuthContext` Provider 적용 및 라우팅 구조 변경
- `Sidebar.tsx` 수정: 로그아웃 버튼 추가 (Settings 하단)

## Files to Modify/Create
- `src/contexts/AuthContext.tsx` (New)
- `src/components/LoginPage.tsx` (New)
- `src/components/ProtectedRoute.tsx` (New)
- `src/App.tsx`
- `src/components/Sidebar.tsx`

## Verification Plan
1. 브라우저에서 사이트 접속 시 로그인 페이지로 리다이렉트 되는지 확인.
2. 올바른 비밀번호(`admin`) 입력 시 메인 화면으로 진입 확인.
3. 사이드바의 로그아웃 버튼 클릭 시 다시 로그인 페이지로 이동 확인.
