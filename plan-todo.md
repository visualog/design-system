# Design System Website - Plan & To-Do

이 문서는 디자인 시스템 웹사이트 구축 프로젝트의 진행 상황과 향후 계획을 기록합니다.

---

## ✅ 완료된 작업 (Work Done)

- **프로젝트 환경 설정 (Project Setup)**
  - Vite를 사용한 React + TypeScript 프로젝트 생성 (`design-system-site`).
  - Tailwind CSS 설치 및 설정.
  - Pretendard 폰트 CDN 연결 및 Tailwind 설정.
  - `vite-plugin-svgr` 설치 및 SVG 로딩을 위한 Vite 설정.

- **디자인 시스템 데이터 추출 및 저장 (Data Extraction & Storage)**
  - 사용자로부터 제공된 HTML을 파싱하여 모든 파운데이션 정보를 JSON 파일로 저장.
    - **Colors:** `color_palette.json`, `theme_color_mapping.json`, `semantic_color_mapping.json`
    - **Typography:** `typography_styles.json`
    - **Spacing & Layout:** `spacing_system.json`, `device_resolutions.json`, `breakpoints.json`, `main_layouts.json`
    - **Icons:** `line_icons.json`, `filled_icons.json`, `illustration_icons.json`
    - **Shadows:** `shadow_tokens.json`

- **UI 컴포넌트 및 레이아웃 구현 (UI Implementation)**
  - `seed-design.io/docs`를 참고한 기본 레이아웃 구현 (`Sidebar`, `MainContent`).
  - 클라이언트 사이드 라우팅 구현 (`react-router-dom` 사용).
    - `/colors`, `/typography`, `/spacing`, `/icons`, `/shadows` 경로 생성.
  - 각 디자인 시스템 카테고리에 대한 React 컴포넌트 생성 및 통합:
    - `ColorPaletteDisplay`, `ThemeColorMappingDisplay`, `SemanticColorMappingDisplay`
    - `TypographyDisplay`
    - `SpacingLayoutDisplay`
    - `IconDisplay`
    - `ShadowsDisplay`

- **아이콘 시스템 구현 (Icon System Implementation)**
  - `ic` 디렉토리의 모든 아이콘 파일 이름 정규화 (공백 및 특수문자 처리).
  - 한국어 아이콘 설명과 실제 SVG 파일 이름을 매핑하는 `icon_filename_mapping.json` 파일 생성.
  - `IconDisplay.tsx` 컴포넌트에서 동적으로 SVG 아이콘을 로드하여 표시하는 로직 구현.

---

## ⏳ 진행 중 및 예정된 작업 (To-Do / Next Steps)

- **[In Progress] 아이콘 매핑 완료 (Finalize Icon Mapping)**
  - 현재 일부 아이콘이 "No SVG"로 표시되는 문제 해결.
  - 사용자가 `icon_filename_mapping.json`의 내용을 최종 확인하고 수정.
  - 모든 아이콘이 정상적으로 표시되는지 확인.

- **[To-Do] UI/UX 개선 (UI/UX Refinement)**
  - 각 컴포넌트(컬러, 타이포그래피 등)의 스타일을 `seed-design.io/docs`와 더 유사하게 다듬기.
  - 반응형 디자인 개선.

- **[To-Do] 상호작용 기능 추가 (Add Interactivity)**
  - 컬러 코드, 변수 이름 등을 클릭하면 클립보드로 복사되는 기능 추가.
  - 아이콘 검색 기능 추가.
  - 사이드바의 현재 활성화된 메뉴 스타일링.

- **[To-Do] 프로덕션 빌드 (Build & Deploy)**
  - `npm run build`를 사용하여 사이트의 프로덕션 버전을 생성.
  - (선택 사항) Netlify, Vercel 등의 플랫폼에 배포.
