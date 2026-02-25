# Project Log

## 2025년 12월 30일 화요일

- **사이드바 높이 수정**: `src/index.css`에서 `html`과 `body` 요소에 `height: 100%;` 및 `h-full`을 추가하여 사이드바가 브라우저 전체 높이를 채우도록 수정했습니다.
- **사이드바 높이 명시적 설정**: `src/components/Sidebar.tsx`의 `aside` 요소에서 `h-full`을 `h-screen`으로 변경하여 사이드바가 브라우저 전체 높이를 채우도록 명시적으로 설정했습니다.
- **사이드바 고정**: `src/components/Sidebar.tsx`의 `aside` 요소 `className`에서 `md:relative`를 제거하여 사이드바가 항상 고정되도록 수정했습니다.
- **메인 콘텐츠 조정**: `src/App.tsx`의 메인 콘텐츠 div에 `md:pl-60`을 추가하여 데스크톱에서 고정 사이드바를 고려하도록 메인 콘텐츠를 조정했습니다.
- **메인 콘텐츠 상단 여백**: `src/App.tsx`의 메인 콘텐츠 div에 `mt-8`을 추가하여 상단 여백 32px를 추가했습니다.
- **메인 콘텐츠 상단 패딩**: `src/components/MainContent.tsx`의 `main` 요소를 수정하여 상단 패딩을 32px(`pt-8`)로 조정했습니다.
- **메인 콘텐츠 태그 변경**: `src/components/MainContent.tsx`의 메인 콘텐츠 래퍼(div)를 `article` 태그로 변경했습니다.
- **메인 기사 최대 너비 (720px)**: `src/components/MainContent.tsx`의 `<article>` 태그에 `max-w-[720px]`를 추가하여 최대 너비를 720px로 설정했습니다.
- **메인 기사 최대 너비 (768px)**: `src/components/MainContent.tsx`의 `<article>` 태그를 수정하여 최대 너비를 `max-w-3xl` (768px)로 설정했습니다.
- **메인 기사 중앙 정렬**: `src/components/MainContent.tsx`의 `<article>` 태그에 `mx-auto`를 추가하여 수평 중앙 정렬했습니다.
- **상단 패딩 조정**: `src/components/MainContent.tsx`의 `main` 요소에서 명시적인 `pt-8`을 제거하여 반응형 패딩과 조정을 맞췄습니다.
- **반응형 패딩**: `src/components/MainContent.tsx`의 메인 콘텐츠 반응형 패딩을 `p-6 md:p-8 lg:p-12`로 위데이트했습니다.
- **Flexbox 간격**: `article`에 flexbox gap을 적용하고 브레드크럼 간격을 개선했습니다.
- **ColorsPage 레이아웃**: `src/components/ColorsPage.tsx`의 루트 div에 `flex flex-col gap-8`을 추가하고 `h1` 요소의 불필요한 `mb-8`을 제거하여 flexbox를 적용했습니다.
- **ColorPaletteDisplay 레이아웃**: `src/components/ColorPaletteDisplay.tsx`의 루트 div에 `flex flex-col gap-12`를 추가하고 섹션 요소들의 불필요한 `mb-16`을 제거했습니다.
- **ThemeColorMappingDisplay 레이아웃**: `src/components/ThemeColorMappingDisplay.tsx`의 루트 div에 `flex flex-col gap-12`를 추가하고 카테고리 div들의 불필요한 `mb-12`를 제거했습니다.
- **SemanticColorMappingDisplay 레이아웃**: `src/components/SemanticColorMappingDisplay.tsx`의 루트 div에 `flex flex-col gap-12`를 추가하고 카테고리 div들의 불필요한 `mb-12`를 제거했습니다.
- **ColorPaletteDisplay 섹션 레이아웃**: `src/components/ColorPaletteDisplay.tsx`의 섹션 요소에 `flex flex-col gap-4`를 추가하고 각 섹션 내 `h3`의 `mb-4`를 제거했습니다.
- **컬러 패밀리 제목 색상**: `ColorPaletteDisplay`의 컬러 패밀리 제목 글꼴 색상을 `text-gray-700`에서 `text-gray-400`으로 업데이트했습니다.
- **컬러 스케일 간격**: `src/components/ColorPaletteDisplay.tsx`의 `ColorGrid` 컴포넌트 루트 div className에 `gap-0.5`를 추가하여 컬러 스케일 팔레트 간격을 2px로 조정했습니다.
- **팔레트 필터링**: `ColorPaletteDisplay.tsx`에서 사용자 요청에 따라 컬러 팔레트 레벨 필터링을 개선했습니다.
- **Black Alpha 레벨**: `src/components/ColorPaletteDisplay.tsx`에서 `unwantedLevels` 필터를 제거하여 모든 'Black Alpha' 레벨이 표시되도록 했습니다.
- **알파 레벨 분류**: `src/components/ColorPaletteDisplay.PaletteDisplay.tsx`에서 'Gray' 및 'Chromatic' 섹션에 빈 열이 생기지 않도록 알파 레벨 분류(`isAlpha` 로직 및 `nonAlphaLevels` 필터)를 개선했습니다.
- **충돌 수정 (변수 순서)**: `src/components/ColorPaletteDisplay.tsx`에서 변수 정의 순서(`grayFamilies`, `alphaFamilies`, `chromaticFamilies`를 사용 전으로 이동)를 변경하여 컴포넌트 충돌을 수정했습니다.
- **Chromatic 알파 열**: `src/components/ColorPaletteDisplay.tsx`에서 강력한 필터링 로직으로 Chromatic 컬러 팔레트에 'alpha (10%)' 열을 복구했습니다.
- **토큰 표시 알파**: `src/components/ColorPaletteDisplay.tsx`에서 'Tokens' 표시가 투명도가 적용된 알파 컬러 미리보기를 올바르게 렌더링하도록 수정했습니다.
- **체크무늬 배경**: `src/components/ColorPaletteDisplay.tsx`의 `ColorSwatch` 컴포넌트에 알파 컬러용 체크무늬 배경을 조건부로 추가하여 투명도 구분을 개선했습니다.
- **토큰 체크무늬 배경**: `src/components/ColorPaletteDisplay.tsx`의 `TokensDisplay` 컴포넌트 내 알파 컬러 칩에 조건부 체크무늬 배경을 적용하여 투명 토큰을 시각적으로 구분했습니다.
- **안정 상태 복구**: 툴팁 관련 수정 사항을 되돌리고 이전에 성공한 레이아웃/스타일 변경 사항을 적용하여 `src/components/ColorPaletteDisplay.tsx`를 안정적인 상태로 복구했습니다. (애플리케이션 충돌 해결)
- **툴팁 구현**: `src/components/ColorPaletteDisplay.tsx`에 컬러 값과 토큰 이름을 표시하는 컬러 팔레트 호버 툴팁을 구현하고 `App.tsx`를 `TooltipProvider`로 감쌌습니다.
- **툴팁 헥스 수정**: 툴팁의 알파 컬러 헥스 코드 표시에 알파 값을 포함하도록 수정했습니다.
- **헤더 레이블 변경**: `ColorGrid`에서 "alpha (10%)" 헤더 레이블을 "10%"로 변경했습니다.
- **토큰 이름 정리**: `TokensDisplay`의 토큰 이름에서 "(10%)"를 제거했습니다.
- **토큰 이름 하이픈**: 일관성과 유효성을 위해 `ColorSwatch`와 `TokensDisplay` 모두에서 토큰 이름의 공백을 하이픈으로 대체하도록 수정했습니다.
- **헤더 행 높이**: `ColorGrid`의 컬러 레벨 헤더 행 높이를 `h-12`에서 `h-6`으로 변경했습니다.
- **테이블 라운딩 시도 (실패)**: 테이블 요소 스타일링의 기술적 한계와 요구 사항 상충으로 인해 `TokensDisplay`의 테이블 라운딩 구현에 실패했습니다. 사용자의 최신 지침("테이블 전체가 하나의 둥근 블록형태는 사양이야")에 따라 `border rounded-lg overflow-hidden`을 가진 `div`로 테이블을 감싸는 접근 방식을 확인했습니다.
- **테이블 스타일 복구**: `TokensDisplay`의 테이블 스타일링 변경 사항을 되돌리고, 사용자가 초기에 제안한 대로 전체 테이블 라운딩을 위한 단일 `div` 래퍼 구조로 돌아갔습니다.
- **테이블 셀 패딩**: `TokensDisplay`의 테이블 셀 패딩을 `px-6`에서 `px-4`로 변경했습니다.
- **칩 크기 (24px)**: `TokensDisplay` 컬러 칩 크기를 `w-6 h-6` (24px)로 변경했습니다.
- **칩 크기 (20px)**: `TokensDisplay` 컬러 칩 크기를 `w-5 h-5` (20px)로 변경했습니다.
- **테마 매핑 리팩토링**: `ThemeColorMappingDisplay.tsx`를 Shadcn UI `Table` 컴포넌트를 사용하도록 리팩토링하고 테마 컬러 매핑을 테이블 형식으로 표시했습니다.
- **Raw Token 열 제거**: `ThemeColorMappingDisplay.tsx`에서 "Raw Token" 열을 제거했습니다.
- **토큰 접두사**: `ThemeColorMappingDisplay.tsx`의 테마 토큰 이름에 `$` 접두사를 추가했습니다.
- **클립보드 아이콘 크기**: `src/components/ui/clipboard.tsx`의 클립보드 아이콘 버튼 크기를 `h-5 w-5` (20px)로 변경했습니다.
- **호버 클립보드**: `ThemeColorMappingDisplay.tsx`에서 행 호버 시에만 클립보드 버튼이 표시되도록 기능을 추가했습니다.
- **테이블 행 패딩**: `ThemeColorMappingDisplay.tsx`의 `tbody td` 패딩을 `py-2`에서 `py-3`으로 변경했습니다.
- **TokensDisplay Shadcn Table**: `src/components/ColorPaletteDisplay.tsx`의 `TokensDisplay`에 Shadcn `Table` 컴포넌트를 적용했습니다.
- **TableHead 조정**: `ThemeColorMappingDisplay.tsx`의 `TableHead` 패딩을 `px-4 py-2`로, 높이를 `h-auto`로 변경했습니다.
- **복사 버튼 제거**: `ThemeColorMappingDisplay.tsx`에서 테마 토큰용 복사 버튼을 제거했습니다.
- **Mapped To / Preview 열**: `ThemeColorMappingDisplay.tsx`에 "Mapped To" 열을 추가하고 "Preview" 열을 다시 도입했습니다.
- **미리보기 헥스**: `ThemeColorMappingDisplay.tsx`의 "Preview" 열에 컬러 칩 옆에 헥스 값을 표시했습니다.
- **TableHead 높이**: `ThemeColorMappingDisplay.tsx`의 `TableHead`에서 `h-10`을 제거하고 `h-auto`를 추가했습니다.
- **토큰 계층 구조**: 토큰 계층 구조를 명확히 했습니다 (Raw Value -> Palette Token -> Theme Token -> Semantic Token).

## 2026년 1월 7일 수요일

- **아이콘 레이아웃**: 아이콘 레이아웃(일러스트레이션 아이콘)을 표준화하고 카테고리 필터링을 추가했습니다.
- **유니코드 텍스트**: UI 컴포넌트의 유니코드 텍스트 표시 문제를 수정했습니다.
- **검색바 너비**: Colors 및 Icons 페이지의 검색바 너비를 `w-80`으로 표준화했습니다.
- **Shadow 페이지 레이아웃**: Radius 페이지 구조에 맞춰 Shadow 페이지 레이아웃을 개선하고 Description 열을 추가했습니다.
- **Shadow 토큰 업데이트**: 값 단순화(spread 제거), `shadow_X` 형식으로 이름 변경, 설명을 'Elevation' 개념 및 사용법(Optional/Mandatory)으로 업데이트했습니다.
- **Shadow 디스플레이 업데이트**: 레벨 레이블을 샘플 상자 내부로 이동하고 외부 레이블을 제거했습니다.
- **Radius 토큰 업데이트**: `rounded_X` 형식으로 이름 변경, 새 이름 지정 처리를 위한 디스플레이 업데이트.
- **Spacing 토큰 업데이트**: `spacing_X` 형식으로 이름 변경(`--` 접두사 제거), 디스플레이 테이블 헤더를 '기기 너비'로 업데이트했습니다.
- **스티키 헤더**: `MainContent.tsx`에서 스크롤 시 스티키 헤더 하단 테두리 상호작용을 구현했습니다.
- **페이지 제목 통합**: 레이아웃/스페이싱 페이지 전반에 걸쳐 페이지 제목과 섹션 헤더를 통합하고 표준화했습니다.
- **Color Usage 독립성**: `shadcn/ui` 컴포넌트 대신 명시적인 HTML/CSS를 사용하여 Color Usage 예제가 사이트 테마와 독립적이도록 수정했습니다.
- **Colors 페이지 탭 여백**: Colors 페이지의 'Scale' 및 'Usage' 탭 상단 여백을 `mt-6`으로 늘렸습니다.
- **가이드라인 아이템 스타일**: Guideline Item 스타일을 더 밝은 배경(`bg-*-50/30`)과 테두리(`border-*-100`)로 업데이트했습니다.
- **Typography 레이아웃**: Typography 페이지 레이아웃 표준화: 드롭다운 및 검색바 왼쪽 정렬, 검색 필터링 추가.
- **검색바 표준화**: 모든 검색바(Colors, Typography, Icons)를 검색 아이콘과 현지화된 한국어 플레이스홀더로 표준화했습니다.

## 2026년 1월 9일 금요일

- **Radius 안전 목록**: `tailwind.config.js`에 `rounded-2xl` 및 `rounded-3xl` 클래스를 안전 목록(safelist)에 추가하여 누락된 스타일을 수정했습니다.
- **RadiusDisplay 시각 효과**: `RadiusDisplay.tsx`를 업데이트하여 시각적 가이드(겹치는 원, z-index 증가, 투명도 조정)를 개선했습니다.
- **Radius 동기화**: 일관성을 보장하기 위해 `index.css`의 반경 변수 정의(xl, 2xl, 3xl)를 `radius.json`과 동기화했습니다.
- **중첩 라디우스 섹션**: `RadiusPage`에 대화형 시뮬레이터(`NestedRadiusDisplay.tsx`)가 포함된 '중첩 라디우스(Nested Radius)' 가이드라인 섹션을 구현했습니다.
- **중첩 라디우스 스타일**: '중첩 라디우스' 시각적 스타일 개선: 녹색 패딩 색상(브라우저 검사기 스타일) 적용 및 외부 그림자 제거.
- **스냅 슬라이더**: 디자인 시스템 토큰(외부 슬라이더용 Radius 토큰, 패딩 슬라이더용 Spacing 토큰)을 사용하여 '중첩 라디우스'용 스냅 슬라이더를 구현했습니다.
- **런타임 오류 수정**: `NestedRadiusDisplay`의 런타임 오류(React import, state hoisting, 데이터 로딩)를 수정하여 안정적인 렌더링을 보장했습니다.
- **UI 개선**: '중첩 라디우스' UI 개선: 제목을 "중첩 라디우스"로 변경, 불필요한 "Calculated" 레이블 및 공식 코드 블록 제거.
- **슬라이더 정렬**: '중첩 라디우스' 슬라이더 정렬 수정: `calc()` 오프셋과 절대 위치를 사용하여 마커가 슬라이더 썸(thumb) 중심과 완벽하게 정렬되도록 했습니다.
- **슬라이더 썸 정렬**: '중첩 라디우스' 슬라이더 썸 수직 정렬 수정: 명시적인 Tailwind 스타일을 적용하여 기본 입력 모양을 재설정하고 썸을 트랙 중앙에 배치했습니다.
- **검색 강조 (Search Highlight)**: `HighlightText` 컴포넌트를 추가하고 Typography 및 Color 테이블에 적용했습니다.
- **시맨틱 컬러 필터 (Semantic Color Filter)**: Background/Border/Icon으로 필터링 시 결과가 비어있던 버그를 해결했습니다(헤더 키 불일치 수정).
- **Radius 페이지 레이아웃**: 큰 가이드 원을 잘라내기 위해 `overflow-hidden`을 추가하여 과도한 하단 공백을 해결했습니다.
- **중첩 라디우스 UI (Nested Radius UI)**: 슬라이더 정렬 및 시각적 스타일을 개선했습니다.

## 2026년 1월 14일 화요일

- **헤딩 크기 표준화 (Standardized Heading Sizes)**: 모든 `h3` 및 `h4` 요소에 `text-lg` (1.125rem)를 강제 적용하도록 전역 및 컴포넌트별 스타일을 업데이트했습니다.
    - `index.css`에 전역 규칙을 추가했습니다.
    - 새로운 표준에 맞춰 `ColorUsage.tsx`, `GuidelineItem.tsx`, `TypographyDisplay.tsx`를 수정했습니다.
- **아이콘 클릭 크래시 수정 (Fixed Icon Click Crash)**: `IconDisplay.tsx`에서 데이터 키 불일치(`icons` vs `icon`)로 인해 아이콘 클릭 시 애플리케이션이 충돌하던 문제를 해결했습니다.
- **아이콘 컬러 칩 누락 수정 (Fixed Missing Icon Color Chips)**: `IconDisplay.tsx`의 `ICON_COLOR_ORDER` 키를 `semantic_color_mapping.json`의 새로운 `devToken` 형식(점 표기법)과 일치하도록 수정하여 아이콘 상세 시트에서 컬러 칩을 복구했습니다.
- **아이콘 시트 개선 (Enhanced Icon Sheet)**:
    - **일러스트레이션 아이콘**의 사이즈 옵션을 `[16, 20, 24, 28, 32, 40]`으로 확장했습니다 (기존 아이콘은 `[16, 20, 24]` 유지).
    - 깔끔한 UI를 위해 파일명 표시에서 `.svg` 확장자를 제거했습니다.
- **컴포넌트 상세 페이지 구현 (Component Detail Page Implementation)**:
    - `ComponentDetailPage` 템플릿 및 동적 라우팅을 구현했습니다.
    - `componentRegistry.ts`에 7개 컴포넌트(Button, Card, Input, Tooltip, Separator, Popover, Sheet)에 대한 메타데이터(Props, Variants, Usage)를 정의했습니다.
    - **검색 및 필터링 (Search & Filtering)**: 컴포넌트 이름/설명 검색 및 카테고리 탭(UI, Layout, Feedback 등) 필터링 기능을 추가했습니다.
    - **카드 레이아웃 개선**: 컴포넌트 카드 디자인을 개선(배지 위치 조정, 메타데이터 수직 정렬)하여 가독성을 높였습니다.
- **개발자 경험 기능 (DX Features)**:
    - **코드 토글 (Code Toggle)**: 변형(Variant) 미리보기에서 코드를 기본적으로 숨기고, 호버 시 나타나는 버튼으로 토글하는 기능을 구현했습니다.
    - **측정 모드 (Measurement Mode)**: 컴포넌트의 패딩(Padding)과 크기(Width/Height)를 시각적으로 확인할 수 있는 '측정 모드'를 자(Ruler) 아이콘 버튼으로 구현했습니다. `ComputedStyle`을 활용하여 정확한 픽셀 값을 표시합니다.
- **시각적 개선 제안 (Visual Proposal Feature)**:
    - **요소 선택 모드 (Element Selection Mode)**: 마우스 호버로 화면의 요소를 선택하고 하이라이팅하는 기능을 구현했습니다.
    - **제안 다이얼로그 (Proposal Dialog)**: 선택된 요소에 대해 개선 제안을 작성할 수 있는 모달 다이얼로그를 추가했습니다.
    - **UX 개선 (UX Improvements)**: `React Portal`을 사용하여 오버레이와 모달의 위치(Stacking Context) 문제를 해결하고, 보이지 않는 요소가 선택되는 문제를 수정했습니다.
- **사이트 설정 한글화 (Localization)**:
    - `SiteSettingsPage`, `SiteThemePage`, `SiteLayoutPage`, `SiteTypographyPage`, `SiteComponentsPage`, `Sidebar` 등 주요 설정 페이지와 내비게이션의 텍스트를 한글로 번역했습니다.
- **접근성 개선 (Accessibility)**:
    - **Hidden H2 패턴**: `ComponentDetailPage`, `ColorsPage`, `IconDisplay`의 탭 패널 내에 `sr-only` 클래스를 가진 숨겨진 `h2` 태그를 추가하여, 시각적 디자인을 유지하면서 논리적인 문서 구조(H1 -> H2 -> H3)를 보완했습니다.
- **버그 수정 (Bug Fixes)**: `ComponentDetailPage`에서 `AnimatedTabs` 미리보기가 렌더링되지 않던 문제를 해당 컴포넌트를 직접 렌더링하는 케이스를 추가하여 해결했습니다.
- **기능 개선 (Enhancements)**: `MeasureOverlay`를 업데이트하여 Flex/Grid 컨테이너의 내부 간격(Gap)도 시각적으로 표시하도록 개선했습니다.
- **병합 (Merge)**: `feature/site-ui-management` 브랜치를 `main`으로 병합하여 모든 변경 사항을 배포에 반영했습니다.

## 2026년 1월 15일 목요일

- **UI 스타일링 (UI Styling)**: `SiteComponentsPage`의 검색바 하단 구분선을 제거하여 더 깔끔한 검색 인터페이스를 제공했습니다.
- **시각적 개선 제안 시스템 2.0 (Visual Proposal System 2.0)**:
    - **스티커 오버레이 (Sticker Overlay)**: 제안된 요소 위치에 시각적 스티커(아이콘)를 표시하여 문맥을 파악하기 쉽게 개선했습니다.
    - **영구 저장 (Persistence)**: `useProposals` 훅을 통해 `localStorage`와 연동, 브라우저 종료 후에도 제안 내용이 유지되도록 했습니다.
    - **지능형 탐색 (Smart Navigation)**: 제안 목록 클릭 시 해당 페이지로 라우팅되고, 대상 요소로 스크롤 및 하이라이트 애니메이션이 실행되도록 구현했습니다.
    - **정확한 선택자 (Precise Selector)**: `getUniqueSelector` 유틸리티를 구현하여 ID, 속성, DOM 경로를 기반으로 요소를 정확히 다시 찾을 수 있도록 했습니다.
    - **버그 수정 (Bug Fix)**: `ProposalNotification`에서 발생한 무한 렌더링 루프를 `useMemo`를 사용하여 해결했습니다.
    - **UI 개선 (UI Polish)**:
        - **호버 오버플로우 해결**: 스티커가 화면 우측에 위치할 경우 툴팁이 왼쪽으로 표시되도록 스마트 포지셔닝 적용.
        - **선택자 노출 제거**: 불필요한 CSS 선택자 코드를 UI에서 제거하여 깔끔함 유지.
        - **포커스 링 개선**: 시트 닫기 버튼의 포커스 링이 키보드 조작 시에만 보이도록(`focus-visible`) 수정.
- **아나토미 프리뷰 고도화 (Anatomy Preview Enhancement)**:
    - **Framer Motion 애니메이션**: 탭 전환 시 부드러운 배경 슬라이딩 효과를 구현하여 사용자 경험을 향상시켰습니다.
    - **인터랙션 영역 확장**: 트리거 버튼 개별 호버가 아닌 탭 컨테이너 전체에 대한 호버/진입 감지로 그림자 효과가 반응하도록 개선했습니다.
    - **그림자 로직 세분화**: 상태(Static/Moving/Hover)에 따라 그림자를 동적으로 스타일링하여 정적일 때는 플랫하고 동적일 때는 입체감을 주었습니다.
    - **View Controls 스타일링**: 측정 및 라벨 토글 버튼을 'View Controls'로 그룹화하고, 테두리와 그림자가 없는 고스트 스타일을 적용하여 디자인을 단순화했습니다.
    - **버그 수정**: `SiteComponentsPage`에서 `animated-tabs` 모듈을 찾을 수 없는 404 오류를 해결하기 위해 누락된 컴포넌트 파일을 생성 및 구현했습니다.
- **UI 폴리싱 (UI Polish)**:
    - **검색바 정렬**: 컴포넌트 페이지의 검색바를 왼쪽(`self-start`)으로 정렬하여 디자인 일관성을 높였습니다.
    - **동적 플레이스홀더**: 검색바 플레이스홀더에 현재 카테고리의 총 컴포넌트 개수를 동적으로 표시하도록 개선했습니다 (예: "12개 컴포넌트 검색...").
    - **카드 인터랙션**: 컴포넌트 카드 호버 시 보더 대신 배경색(`bg-muted/50`)이 은은하게 진해지도록 변경하여 더 부드러운 느낌을 적용했습니다.

## 2026년 1월 19일 일요일

- **탭 디자인 복구 (Tabs Restoration)**:
    - **레거시 커밋 복구**: 사용자 요청에 따라 특정 커밋(`955f5d3`) 시점으로 코드를 `git reset` 하여 복구했습니다.
    - **스타일 동기화**: 복구 시점의 `tabs.tsx`가 '라인 스타일'이었던 문제를 해결하기 위해, 아나토미 프리뷰와 동일한 **'세그먼트 필 스타일(Segmented Pill Style)'**로 코드를 수정하여 전체 사이트의 일관성을 확보했습니다.
    - **아나토미 라벨 수정**: 아나토미 뷰에서 '컨테이너' 라벨 위치를 **왼쪽(Left)** 으로 유지하여 레이아웃 깨짐을 방지했습니다.
    - **불필요한 텍스트 제거**: 아나토미 하단의 텍스트 설명 박스가 제거된 상태를 유지했습니다.

## 2026년 1월 20일 월요일

- **타이포그래피 스타일 롤백 (Typography Revert)**:
    - Apple 스타일 타이포그래피 적용 시도 중 발생한 스타일 깨짐 현상 해결을 위해, 사용자 요청에 따라 **이전의 안정적인 상태로 복구**했습니다.
    - `index.css`: 커스텀 타이포그래피 유틸리티를 제거하고 HEAD 시점의 안정적인 코드로 복원했습니다.
    - **컴포넌트 스타일 복구**: `SiteThemePage`, `SiteLayoutPage` 등 주요 설정 페이지의 헤더에 적용했던 커스텀 클래스(`text-heading-xl` 등)를 표준 Tailwind 클래스(`text-3xl`, `text-xl` 등)로 원상 복구하여 가독성과 레이아웃 안정성을 확보했습니다.
    - **UI 개선 (UI Refinements)**:
        - **테마 설정 페이지 개선**: Primary Color, Radius, Mode 섹션 순서를 재배치하고(Color 우선), 각 섹션 간 구분선(Separator) 색상을 뉴트럴 그레이(`bg-zinc-200`)로 변경하여 시각적 구분을 명확히 했습니다.
        - **Radius 레이블 단순화**: Radius 옵션 레이블을 T-shirt 사이즈(S, M, L) 등으로 직관적으로 변경하고, 폰트 크기를 `text-sm` 및 `text-[10px]`로 조정하여 계층 구조를 정리했습니다.
        - **선택 상태 스타일 통일**: 테마 및 라디우스 선택 버튼의 'Selected' 상태에서 검정 테두리를 제거하고 배경색(`bg-muted`)을 적용하여 비활성 상태와 시각적 조화를 이루도록 개선했습니다.
        - **Primary Color 버그 수정**: 테마 색상 선택 시 색상이 적용되지 않던 문제(Oklch 포맷 호환성)를 해결하기 위해 색상 코드를 정수형 HSL 포맷으로 변환하고, 상단 헤더 아이콘(`ProposalNotification`)이 테마 색상을 따르도록 `text-primary` 클래스를 적용했습니다.
        - **탭(Tabs) 컴포넌트 동기화**: `tabs.tsx` 컴포넌트의 기본 스타일을 아나토미 가이드(`AnatomyPreview`)와 동일한 규격(`h-9`, `p-1`, `gap-1`, Segmented Style)으로 업데이트하여, 별도의 사이즈 정의 없이도 기본적으로 올바른 디자인이 적용되도록 수정했습니다. 인디케이터 그림자 애니메이션도 동일하게 적용했습니다.

## 2026년 1월 21일 수요일

- **버튼 아나토미 구현 (Button Anatomy Implementation)**:
    - `AnatomyPreview.tsx`에 버튼 컴포넌트의 상세 구조(Container, Label, Icon)를 시각화하는 `ButtonAnatomy`를 구현했습니다.
    - Default, Secondary, Outline, Ghost, Link 등 다양한 Variant를 지원하며, 각 요소에 대한 토큰 연결 정보를 제공합니다.
    - **레이아웃 수정**: 아나토미 뷰의 래퍼가 전체 너비를 차지하여 라벨이 잘못 표시되던 문제를 `inline-flex` 적용으로 해결했습니다.
    - **초기화 로직 개선**: 상세 페이지 진입 시 컴포넌트에 맞는 유효한 첫 번째 Variant(예: `default`)가 자동으로 선택되도록 초기화 로직을 수정했습니다.
- **그림자 스타일 개선 (Shadow Style Refinement)**:
    - **플랫 디자인 적용**: 버튼(`button.tsx`) 및 탭(`tabs.tsx`) 컴포넌트의 기본 상태에서 그림자(`shadow` 클래스)를 모두 제거하여, 시스템 전반적으로 깔끔하고 현대적인 플랫 스타일을 적용했습니다.
    - **동적 그림자 로직**: 아나토미 뷰의 탭 스위처에 Hover 또는 Sliding 애니메이션 시에만 그림자가 나타나도록 개선된 로직을 적용하여, 정적 상태의 불필요한 입체감을 제거했습니다.
- **UI 폴리싱 (UI Polish)**:
    - **아나토미 옵션 정리**: 버튼 아나토미에서 구조적 변형이 아닌 의미적 구분인 'Destructive' 옵션을 뷰에서 제외했습니다.

## 2026년 1월 30일 금요일 (Spacing & Layout 정제)

- **Usage Guide 표준화**:
    - `TypographyUsage`, `SpacingUsage`, `IconsUsage`, `ShadowsUsage`, `ColorUsage` 모든 가이드 섹션에 표준화된 `DoDont` 및 `DoDontContainer` 컴포넌트를 적용했습니다.
    - 모든 `DoDont` 카드 이미지 영역 높이를 `220px`로 고정하여 시각적 정렬을 맞췄습니다.
    - Usage 카드 내 불필요한 강제 줄바꿈(`<br>`)을 제거하여 텍스트 가독성을 개선했습니다.
    - `PrinciplesSection` (컬러 개요)의 그리드 간격을 `gap-6`에서 반응형 간격(`gap-3 md:gap-4 lg:gap-5`)으로 수정하여 전체 페이지 그리드 시스템과 통일했습니다.
- **스타일 일관성**:
    - 모든 목록형 테이블(`SemanticGroupingDisplay`, `TypographyNewDisplay` 등)에서 중복된 카드 래퍼 스타일(`border`, `shadow-sm`, `bg-card`)을 제거하고 'Clean List Pattern'을 적용했습니다.

- **개발자 경험(DX) 및 접근성 강화**:
    - `componentRegistry.ts`에 컴포넌트별 상세 접근성 정보(WAI-ARIA 역할, 속성, 키보드 인터랙션)를 추가했습니다.
    - `ComponentDetailPage`에 **'Accessibility'** 섹션을 신설하고 `AccessibilitySection` 컴포넌트를 통해 관련 정보를 테이블 형식으로 시각화했습니다.
    - 컴포넌트 속성(Properties) 섹션에 **'인터랙션 상태(States)'** 및 **'지원 크기(Sizes)'** 배지를 추가하여 기술 스펙을 한눈에 파악할 수 있도록 개선했습니다.
- **컬러 시스템 문맥 정보 보강**:
    - `ColorPairingDisplay` 컴포넌트를 구현하여 배경과 포그라운드(텍스트/아이콘) 컬러의 올바른 조합 가이드를 추가했습니다.
    - WCAG AA 표준 준수 여부를 명시하여 디자이너와 개발자가 접근성 있는 컬러를 선택할 수 있도록 돕습니다.
- **디자인 원칙 및 개요(Overview) 페이지 신설**:
    - `IntroductionPage`를 생성하여 디자인 시스템의 핵심 원칙(명료함, 효율성, 일관성, 포용성)과 시스템 목표를 정의했습니다.
    - 사이트의 루트(` / `) 및 `/overview` 경로로 설정하고 사이드바 최상단에 배치하여 시스템의 철학을 먼저 전달하도록 개선했습니다.


## 2026년 2월 4일 수요일

- **타이포그래피 정보 메시지 제거**: `src/components/TypographyNewDisplay.tsx`에서 "행을 클릭하면 토큰 이름이 복사됩니다."라는 정보 메시지와 관련 `Info` 아이콘을 UI에서 제거했습니다.
- **타이포그래피 헤더 정리**: "Typography Foundation" 라벨, 지구본 아이콘, "Live Type Tester" 라벨을 제거하고 헤더 하단의 구분선(`border-b`)을 삭제하여 디자인을 단순화했습니다.
- **타이포그래피 카테고리 스타일 개선**: 각 타이포그래피 카테고리 섹션의 하단 구분선과 스타일 개수 표시(`N Styles`)를 제거하여 더 깔끔한 목록 뷰를 적용했습니다.
- **라이브 텍스트 테스터 스타일 개선**: 입력 필드의 그림자(`shadow-sm`)를 제거하고 최대 너비 제한(`max-w-xl`)을 해제하여 전체 너비(`w-full`)를 사용하도록 변경했습니다.
- **타이포그래피 예시 텍스트 단순화**: 테이블 헤더와 미리보기 셀에서 'Aa' 접두사를 제거하여 텍스트 미리보기에만 집중할 수 있도록 개선했습니다.
- **타이포그래피 정보 표시 간소화**: 불필요한 "Token Identifier" 라벨과 영문 용도 설명(`usage.en`)을 제거하고 한글 설명만 남겨 정보 밀도를 최적화했습니다.
- **Colors 페이지 배지 제거**: Colors 페이지에서 "Experimental" 배지가 항상 표시되던 문제를 수정하여, 해당 배지를 제거했습니다.
- **드롭다운 화살표 회전 방향 변경**: `SmartFilterDropdown` 컴포넌트에서 드롭다운이 열릴 때 화살표가 시계 반대 방향(CCW)으로, 닫힐 때 시계 방향(CW)으로 회전하도록 애니메이션 방향을 반전시켰습니다.
- **원시 컬러 필터 개선**: `ColorPaletteDisplay`의 원시 컬러 목록에서 사용되던 기존 드롭다운을 `SmartFilterDropdown` 컴포넌트로 교체하여 다중 선택 및 UI 일관성을 확보했습니다.
- **인풋 스타일 표준화**: `TypographyNewDisplay`의 입력 필드 보더를 시스템 표준인 `border-input`으로 변경하고, 이 페이지에서 사용된 넓고 은은한 포커스 링 스타일(`ring-4 ring-primary/5`)을 전체 `Input` 컴포넌트에 전역으로 적용했습니다.
- **타이포그래피 스펙 라벨 조정**: `Specs & Usage` 열의 폰트 사이즈, 행간, 두께를 표시하는 라벨의 높이를 줄이기 위해 상하 패딩을 축소(`py-0.5`)하고, 높이값에 영향을 주던 물리적인 보더(`border`) 대신 레이아웃에 영향을 주지 않는 안쪽 그림자 테두리(`ring-1 ring-inset`)로 변경했습니다.
- **타이포그래피 테이블 여백 표준화**: 테이블 셀의 상하 불균형을 유발하던 'Current Sample View' 라벨을 완전히 제거하고, 다른 테이블 컴포넌트(`ColorPaletteDisplay` 등)와 동일한 좌우 여백(`px-4`)을 갖도록 레이아웃을 표준화했습니다.
- **실험 기능 버튼 스타일 개선 for Visibility**: `ExperimentalToggle` 버튼의 `bubble` 애니메이션이 더 잘 보이도록 크기와 색상을 조정하고, `shake` 애니메이션 실행 시 아이콘 크기가 유지되도록 `scale(1.1)`을 키프레임에 포함시켰습니다. 툴팁 메시지 국문 적용도 완료했습니다.

## 2026년 2월 12일 목요일

- **활동 앱 디자인 시스템 구축 (Activity App Design System)**: 제공된 모바일 화면 이미지를 기반으로 한 새로운 디자인 시스템을 설계하고 Pencil(`first.pen`)로 구현했습니다.
    - **컬러 시스템**: Deep Black(#18181B), Sunset Gradient, Cotton Candy Gradient 등 생동감 넘치는 컬러와 그라데이션 토큰 정의.
    - **타이포그래피**: 현대적이고 가독성이 높은 Heading XL(32px), Heading L(24px) 등 계층 구조 표준화.
    - **주요 컴포넌트 구현**:
        - **Meeting Card**: 확장형(Active/Dark) 및 기본형(Standard/White) 배리에이션 구현.
        - **Avatar Group**: 인스턴스화 가능한 아바타 스택 컴포넌트 제작.
        - **Floating Nav**: 하단 고정형 그라데이션 내비게이션 바 설계.
    - **앱 모의 작업 (App Mockup)**: 설계된 디자인 시스템을 활용하여 원본 이미지와 유사한 모바일 앱 화면(Activity Screen) 구성 및 검증 완료.

## 2026년 2월 20일 금요일

- **문서 IA/거버넌스 1차 실행안 작성**: 디자인 시스템 문서 구조 초안과 운영 문서를 생성했습니다.
    - `docs/README.md`, `docs/01-getting-started.md`, `docs/02-foundations/*`, `docs/03-components/*`, `docs/04-patterns/*`, `docs/05-governance/*`, `docs/06-changelog/2026-q1.md`
    - 포함 항목: 기여 가이드, 릴리즈 단계 정의, 레지스트리 메타 스펙, ESLint 범위 정리 초안
- **ESLint 범위 조정**: 백업 폴더(`bak`)를 린트 대상에서 제외하도록 `eslint.config.js`를 업데이트했습니다.
- **컴포넌트 레지스트리 메타 필드 확장**: `src/data/componentRegistry.ts`에 `atomicLevel`, `releasePhase`, `owner`, `since`, `tags` 필드를 추가하고 기존 등록 컴포넌트에 기본값을 반영했습니다.

## 2026년 2월 23일 월요일

- **컴포넌트 목록/상세 메타 표시 강화**: 컴포넌트 카드 및 상세 상단에 아토믹 레벨, 릴리즈 단계, 소유자, 도입일, 파일 경로를 배지 형태로 반영했습니다.
- **검색/필터 UI 통일**: 컴포넌트 페이지에서 공통 컨트롤(`SearchBar`, `SmartFilterDropdown`)을 재사용하도록 정리하고, 기존 패턴과 동일하게 `드롭다운 → 검색바` 순서로 맞췄습니다.
- **필터 동작 안정화**: 단일 선택/전체 선택 전환 시 선택 상태가 흔들리던 로직을 보정했습니다.
- **카드 메타 영역 높이 안정화**: 상단 배지가 1줄/2줄일 때 본문 시작 위치가 흔들리지 않도록 최소 높이를 부여해 정렬을 고정했습니다.
- **Properties 정보 구조 정리**: 상세 페이지에서 `States`, `Sizes` 정보를 상단 분리 블록에서 Props 영역 중심으로 정리해 중복 노출을 줄였습니다.
- **테이블 스타일 전역 통일**:
    - `src/components/ui/table.tsx`를 사이트 기본 테이블 스타일로 표준화
    - 기존 파운데이션 스타일은 `src/components/ui/ghost-table.tsx`로 분리 보관(미사용)
    - `ComponentDetailPage`, `SiteTypographyPage`의 원시 `<table>`을 공통 `Table` 컴포넌트로 교체
- **컴포넌트 레지스트리 누락분 일괄 등록(로컬 반영)**: `src/data/componentRegistry.ts`에 사용 중이던 누락 UI 컴포넌트 15종(`ColorSwatch`, `SmartFilterDropdown`, `animated-tabs`, `clipboard`, `dropdown-menu`, `switch`, `table` 등)을 메타데이터와 함께 추가했습니다.
- **사이드바 컴포넌트 카탈로그 포함**: 앱 셸 내비게이션 컴포넌트인 `src/components/Sidebar.tsx`를 `componentRegistry`에 등록하여 Components 목록에서 조회 가능하도록 반영했습니다.
- **아나토미 기본값 보강**: 레지스트리에 `anatomy`가 비어 있는 컴포넌트도 상세 페이지에서 아나토미 섹션이 노출되도록 카테고리 기반 기본 아나토미 템플릿을 자동 주입하도록 개선했습니다.
- **아나토미 다이어그램 확장 구현**: `AnatomyPreview`에 `switch`, `dropdown-menu`, `table`, `smart-filter-dropdown`, `sidebar`의 실제 아나토미 미리보기를 추가하고, `AnatomyInfoPanel`에 신규 파트 설명(Track/Thumb/MenuSurface/MenuItem/HeaderCell/Cell/SearchField/SectionGroup/NavItem/FooterAction)을 연동했습니다.
- **아나토미 메타 분리**: `colorTokenData`, `getAnatomyVariants`를 `src/components/anatomy-meta.ts`로 분리해 상세 페이지/정보 패널/아나토미 프리뷰가 공통으로 참조하도록 구조를 정리했습니다.
- **아나토미 2차 확장 및 플레이스홀더 제거**: `input`, `card`, `tooltip`, `popover`, `sheet`, `separator`, `clipboard`, `animated-tabs` 아나토미를 추가 구현하고, 미구현 컴포넌트는 제너릭 아나토미 렌더러로 대체해 상세 페이지의 "No anatomy diagram available" 플레이스홀더를 제거했습니다.
- **아나토미 배리언트 정합성 개선**: `anatomy-meta`에 `getAnatomyVariantOptions`를 추가해 스타일 값과 표시 라벨을 분리하고, 상세 페이지 아나토미 스위처가 컴포넌트별 옵션 라벨(예: `Basic Tabs`, `Settings Pattern`, `Desktop Fixed`)을 사용하도록 정리했습니다.
- **미리보기 전수 커버리지 확보**: `ComponentDetailPage`의 `LivePreview`에 누락 15개 컴포넌트(`breadcrumb`, `highlight-text`, `proposal-notification`, `smart-filter-dropdown`, `sidebar` 등) 렌더 케이스를 추가해 레지스트리 등록 컴포넌트 전체가 상세 미리보기에 대응되도록 개선했습니다.
- **컴포넌트 배지 가시성 보강**: 컴포넌트 목록 카드와 상세 헤더에 `tags` 기반 배지를 추가해, category/atomic/release 외에도 메타 배지가 일관되게 노출되도록 개선했습니다.
- **공통 Badge 컴포넌트 도입 및 통일**: `src/components/ui/badge.tsx`를 신설하고, 컴포넌트 목록/상세 메타 칩(`category`, `atomic`, `release`, `tag`, `owner`, `since`, `file`, `props/variants count`)을 `Badge` 컴포넌트 기반으로 통일했습니다.
- **Badge 레지스트리 등록**: `componentRegistry`에 `badge`를 신규 등록하고 상세 미리보기(`LivePreview`) 렌더 케이스를 추가해 컴포넌트 카탈로그에 노출되도록 반영했습니다.
- **용어 체계 표준화(Badge/Tag/Chip/Label)**:
    - `docs/03-components/terminology.md`를 신설해 네이밍 기준과 사용 규칙(역할 기반 분류)을 문서화했습니다.
    - `componentRegistry`의 `badge` 메타/variants 설명을 용어 체계 기준에 맞춰 정리했습니다.
- **Badge 분류 variant 정식 추가**:
    - `src/components/ui/badge.tsx`에 `notification`, `status`, `tag`, `meta` variant를 추가해 역할 기반 분류를 컴포넌트 API로 반영했습니다.
    - `componentRegistry`의 Badge Variants를 `Notification Badge`, `Status Badge`, `Tag`, `Meta Badge` 4종으로 정리하고 상세 미리보기와 예제 코드를 동기화했습니다.
- **메타 배지 API 단순화**:
    - 카드/상세에서 사용하던 `file`, `countProps`, `countVariants` 스타일을 모두 `meta` variant로 통일했습니다.
    - `Badge` 컴포넌트의 legacy 메타 variant(`file`, `countProps`, `countVariants`)를 제거하고 `meta` 하나로 정리했습니다.
- **컴포넌트 카테고리 탭 정규화**:
    - `SiteComponentsPage`에서 카테고리 탭 순서를 고정(`UI → Layout → Form → Feedback → Navigation`)하고, `Ui` 표기를 `UI`로 정정했습니다.
    - 탭 생성 기준을 데이터 등장 순서가 아닌 명시적 순서 + 라벨 맵으로 변경해 탭 구성이 흔들리지 않도록 개선했습니다.
- **`UI` 카테고리 제거 및 기능 기반 재분류**:
    - 카테고리 타입에서 `ui`를 제거하고 `docs`, `utility`를 추가해 의미 기반 분류로 전환했습니다.
    - `button`은 `form`, 문서용 컴포넌트(`GuidelineItem`, `HighlightText`, `AccessibilitySection`, `ColorSwatch`, `TokenAnatomy`)는 `docs`, `clipboard`는 `utility`로 재분류했습니다.
    - 컴포넌트 탭 순서를 `Layout → Form → Feedback → Navigation → Docs → Utility`로 재구성해 포괄 카테고리 없이 탐색되도록 정리했습니다.
- **문서 레이아웃 토큰/컴포넌트 기반 1차 정비**:
    - `src/index.css`에 문서 전용 타이포/간격 토큰(`--doc-space-*`, `--doc-*-size`)과 레이아웃 유틸리티(`doc-page`, `doc-section`, `doc-tab-panel`)를 추가했습니다.
    - `src/components/ui/DocLayout.tsx`를 신설해 `DocPageFrame`, `DocPageHeader`, `DocSection` 공통 문서 구조 컴포넌트를 도입했습니다.
    - `FoundationPageLayout`이 공통 `DocLayout`을 사용하도록 전환하여 파운데이션 메뉴 전반의 헤더/본문 간격 규칙이 일관되게 적용되도록 정리했습니다.
- **컬러 페이지 파일럿 적용 + 컨벤션 정합성 보정**:
    - `ColorsPage`(New 탭)에 `DocSection`을 적용해 `Color Scale / Token Naming Convention / Usage Guide` 섹션 구조를 공통 패턴으로 정리했습니다.
    - `TokenAnatomy`에 `showHeading` 옵션을 추가해 섹션 헤더와 중복 타이틀이 발생하지 않도록 개선했습니다.
    - Usage 예시의 토큰 표기를 실제 클래스와 맞게 `text-error` → `text-destructive`로 수정했습니다(`ColorsPage`, `ColorsNewPage`).
- **Typography/Spacing 문서 템플릿 2차 적용**:
    - `TypographyPage`, `SpacingPage` 탭 콘텐츠에 `DocSection`을 적용해 Overview/Usage 정보 블록 구조를 공통 패턴으로 정리했습니다.
    - `SpacingDisplay`, `SpacingUsage`, `TypographyUsage`의 내부 섹션 레이아웃을 `doc-subsection`, `doc-content-stack-tight`, `text-doc-subsection-title` 기반으로 정비해 여백/텍스트 규칙이 전역 토큰에 연동되도록 개선했습니다.
    - 문서 토큰 확장을 위해 `index.css`에 `--doc-subsection-title-*` 및 대응 유틸 클래스를 추가했습니다.
- **파운데이션 잔여 페이지 템플릿 3차 적용**:
    - `LayoutPage`, `RadiusPage`, `MotionPage`, `IconsPage`, `ShadowsPage`에 `DocSection`을 적용해 페이지 본문 구조를 표준 섹션 패턴으로 통일했습니다.
    - `MotionPage`는 개별 커스텀 헤더 구조를 제거하고 `FoundationPageLayout` 기반으로 이관해 파운데이션 페이지 간 헤더/본문 간격 규칙을 일치시켰습니다.
    - `LayoutDisplay`, `RadiusDisplay`, `NestedRadiusDisplay`, `MotionDisplay`, `ShadowsDisplay`, `IconsUsage`, `ShadowsUsage`의 내부 섹션 제목/간격 클래스를 문서 토큰 클래스(`doc-subsection`, `text-doc-subsection-title`)로 정비했습니다.
- **대형 Display 컴포넌트 내부 블록 표준화(4차 적용)**:
    - `src/components/ui/DocLayout.tsx`에 `DocSubsection`을 추가해 `DocSection` 하위의 세부 블록까지 공통 구조(`title`, `description`, `content`)로 분해할 수 있도록 확장했습니다.
    - `src/components/TypographyDisplay.tsx`를 `타입 토큰 탐색 / Type Tester / 시트 상세(토큰 정보·한글 샘플·영문 샘플)` 블록으로 재구성해 내부 정보 계층을 명확히 했습니다.
    - `TypographyDisplay`의 DOM 직접 조작(`querySelectorAll`)을 상태 기반 프리뷰 업데이트로 교체하고, `any` 타입을 제거해 유지보수성과 린트 정합성을 개선했습니다.
    - `src/components/IconDisplay.tsx`를 탭별 `탐색 및 필터` + `아이콘 그리드` 블록으로 분해하고, 상세 시트도 `프리뷰 크기 / 아이콘 컬러 / 메타 정보 / Usage` 하위 블록으로 정리했습니다.
    - `IconDisplay`의 `any` 타입과 렌더 내부 컴포넌트 선언 이슈를 제거해 ESLint 규칙(`@typescript-eslint/no-explicit-any`, `react-hooks/static-components`) 기준을 충족하도록 보정했습니다.
- **문서 유틸리티 확장**:
    - `src/index.css`에 `doc-subsection-header`, `doc-subsection-content` 레이아웃 유틸리티를 추가해 내부 블록 간 여백/정렬 규칙을 공통 토큰으로 연결했습니다.
- **New 시스템 페이지 블록 표준화 확장**:
    - `src/components/TypographyNewDisplay.tsx`를 `DocSubsection` 기반으로 재구성해 `Typography Foundation / Live Type Tester / 카테고리별 스케일 / Core Philosophy` 블록 구조를 공통화했습니다.
    - `TypographyNewDisplay`의 `any` 타입을 제거하고 카테고리/토큰 타입을 명시해 문서 컴포넌트 품질 기준(타입 안정성)을 맞췄습니다.
    - `src/components/ColorsNewPage.tsx`의 `overview` 탭을 `DocSection` 패턴(`Color Principles / Color Scale / Token Naming Convention / Usage Guide`)으로 정리해 기존 파운데이션 페이지와 동일한 정보 계층/여백 규칙을 적용했습니다.
- **Motion/Layout Display 내부 소블록 표준화**:
    - `src/components/MotionDisplay.tsx`를 `DocSubsection` 구조로 정리하고, 소블록 타이틀을 `인터랙션 플레이그라운드 / 지속 시간 토큰 (Duration) / 가속도 토큰 (Easing)`으로 통일했습니다.
    - `src/components/LayoutDisplay.tsx`를 `DocSubsection` 기반으로 재구성하고, `기기 해상도 / 브레이크포인트 / 모바일·태블릿 레이아웃 / 데스크톱 레이아웃 / 참고사항` 섹션 구조로 명확히 분리했습니다.
    - 두 파일의 `any` 타입을 제거하고 데이터 타입 인터페이스를 추가해 문서 화면 컴포넌트의 타입 안정성을 강화했습니다.
- **Foundation 개요 문구/포맷 일관성 개선**:
    - `IntroductionPage`, `ColorsPage`, `TypographyPage`, `SpacingPage`, `LayoutPage`, `RadiusPage`, `MotionPage`, `IconsPage`, `ShadowsPage`의 헤더 설명을 공통 톤(`무엇을 정의하는지 + 개요에서 무엇을 확인하는지`)으로 정리했습니다.
    - `ColorsPage` 개요 탭에 `컬러 원칙` 섹션(`DocSection`)을 추가해 `원칙 → 스케일 → 네이밍 규칙 → 사용 가이드` 순서가 명확하게 보이도록 정리했습니다.
    - 주요 섹션 타이틀의 한/영 혼용을 줄이기 위해 `Type Tester`, `Interactive Visualizer`, `Shadow Overview`, `Usage` 등 영어 중심 표기를 한글 중심 표기로 통일했습니다.
    - `ShadowsDisplay`의 `any` 타입을 제거하고 토큰 인터페이스를 추가해 린트 품질 기준을 맞췄습니다.
- **Foundation 카피 톤 가이드 및 H1 보조 설명 정비**:
    - `docs/02-foundations/content-style-guide.md`를 신설해 문장 템플릿(정의 문장 + 개요 안내 문장), 용어 규칙, 표준 용어 사전을 문서화했습니다.
    - H1 언어 정책(`H1 영문 유지`, 보조 설명/섹션 설명 한글 기본)을 가이드에 명시해 페이지 타이틀과 본문 설명 언어 역할을 분리했습니다.
    - Foundation 주요 페이지의 H1 보조 설명과 개요 섹션 설명을 가이드에 맞춰 재정렬하고, 페이지 간 문체를 설명형 톤으로 통일했습니다.
    - 용어 정합성을 위해 `속성(Property)-역할(Role)-변형(Variant)-상태(State)`, `간격(gap)/안쪽 여백(padding)`, `라인(Line)/필드(Filled)/일러스트(Illustration)` 표기를 일관되게 반영했습니다.
- **`개요` 중복 표현 축소 및 헤더/섹션 역할 분리**:
    - Foundation 페이지의 H1 보조 설명에서 `개요에서는 ...` 반복 문장을 제거하고, 페이지의 목적/적용 효과 중심 문장으로 정리했습니다.
    - 개요 탭 내부 섹션 타이틀의 `~개요` 표기를 콘텐츠 중심 명칭(`타입 스케일`, `간격 시스템`, `레이아웃 기준`, `모션 토큰`, `아이콘 탐색`, `그림자 스케일`)으로 통일했습니다.
    - 탭(`개요`)은 네비게이션 역할, H1 보조 설명은 페이지 요약 역할, 섹션 타이틀은 콘텐츠 역할로 분리해 정보 중복을 줄였습니다.
- **H1 보조 설명 길이/패턴 규격화**:
    - `content-style-guide.md`에 H1 보조 설명 규칙(`2문장`, `80~130자 권장`)을 추가해 문장 길이와 정보 밀도 기준을 명시했습니다.
    - Foundation 전 페이지 H1 보조 설명을 `정의 문장 + 확인 문장` 패턴으로 재정비해 페이지 간 톤과 리듬을 통일했습니다.
- **Overview 섹션 가독성 1단 정렬 보강**:
    - `IntroductionPage`의 `디자인 원칙` 카드 레이아웃을 `md:grid-cols-1`로 조정해 `시스템 목표`와 동일한 세로 읽기 흐름으로 통일했습니다.
    - 개요 탭에서 핵심 메시지를 좌→우 탐색 없이 위→아래로 연속 소비할 수 있도록 구조를 단순화했습니다.
- **불필요한 헤더 아이콘 축소(Overview)**:
    - `IntroductionPage`의 `시스템 목표` 카드 헤더에서 장식성 아이콘(`Palette`, `Terminal`)을 제거하고 텍스트 중심 정보 구조로 정리했습니다.
- **문서형 레이아웃 정렬(Overview)**:
    - `IntroductionPage`의 `시스템 목표` 영역을 카드형 박스에서 문서형 소블록(`제목 + 리스트 + 구분선`)으로 전환해 최근 개발/디자인 가이드 사이트 스타일에 맞게 단순화했습니다.
- **원칙 섹션 문서형 표준화 + 아이콘 축소**:
    - `PrinciplesSection`에 `variant="list"`를 추가해 원칙/가이드 정보를 카드형이 아닌 문서형 목록(`제목 + 본문 + 구분선`)으로 렌더링할 수 있도록 확장했습니다.
    - `IntroductionPage`, `ColorsPage`, `ColorsNewPage`의 원칙 섹션을 `list` 변형으로 전환하고 장식성 아이콘 의존을 제거해 텍스트 중심 가독성을 강화했습니다.
- **문서 내 실험실 기능 플래그 비활성화**:
    - `src/config/featureFlags.ts`에 `FEATURE_FLAGS.experimentalLab` 플래그를 추가하고 기본값을 `false`로 설정했습니다.
    - `ExperimentalToggle`은 플래그가 꺼져 있으면 렌더링하지 않도록 처리했습니다.
    - `ExperimentalProvider`는 플래그가 꺼져 있을 때 `experimental-design` 클래스와 localStorage 값을 정리해 실험 스타일이 잔존하지 않도록 보정했습니다.
- **Overview 중복 여백 압축(문서 밀도 개선)**:
    - `PrinciplesSection`의 `list` 변형을 `divide-y + compact row` 구조로 재구성해 `stack gap + item padding` 중복 간격을 제거했습니다.
    - `IntroductionPage`의 `시스템 목표` 블록을 동일한 `divide-y + compact row` 구조로 정리하고 리스트 간격을 `gap-2`로 조정했습니다.
    - `IntroductionPage` 마지막 섹션(`빠른 시작 가이드`)의 `mb-10`을 제거했습니다.
    - `ColorsPage`, `ColorsNewPage` 개요 탭 컨테이너의 `mt-6`를 제거해 탭 패널 기본 간격과의 중복을 해소했습니다.
- **문서 전역 간격 토큰 컴팩트 조정**:
    - `src/index.css`의 `--doc-space-5~8` 값을 한 단계 축소(`2/2.5/3/4rem` → `1.75/2/2.5/3rem`)해 Foundation 문서 전반의 세로 밀도를 높였습니다.
- **Compact IA 템플릿 문서화**:
    - `docs/02-foundations/compact-ia-template.md`를 추가해 저콘텐츠 페이지용 문서 구조/밀도 규칙(문서형 블록, divider 중심, 중복 margin 제거)을 정의했습니다.
    - `docs/README.md`와 `content-style-guide.md`에 Compact IA 참조를 연결해 기존 카피/톤 가이드와 함께 사용할 수 있도록 정리했습니다.
- **Compact IA Foundation 1차 점검표 작성**:
    - `docs/02-foundations/compact-ia-audit-v1.md`를 추가해 Foundation 9개 페이지를 체크리스트(`C1~C5`) 기준으로 점검하고 페이지별 액션 아이템/2차 우선순위를 정리했습니다.
- **P1 Display 밀도 정규화(Typography/Motion/Shadows)**:
    - `TypographyDisplay`의 테스터/시트 내부 간격(`p`, `gap`, `space-y`)을 컴팩트하게 조정해 본문 대비 공백을 축소했습니다.
    - `TypographyNewDisplay`의 루트 스택, 테이블 행 높이(`py-10 → py-6`), 원칙 카드 간격/패딩을 조정해 과도한 세로 여백을 줄였습니다.
    - `MotionDisplay`의 플레이그라운드 컨테이너 간격과 시뮬레이터 높이(`h-64 → h-56`)를 조정해 정보 밀도를 높였습니다.
    - `ShadowsDisplay`의 스케일/플레이그라운드 패딩과 간격(`p-8/10`, `gap-8`, `mt-10`)을 축소하고, 호버 배치 계산 패딩 값을 레이아웃과 동기화했습니다.
- **문서 타이포 스케일 재정의(H1/H2/H3)**:
    - `src/index.css`의 문서 토큰을 요청 기준으로 조정했습니다: `H1=32px`, `H2=24px`.
    - `H3`(`text-doc-subsection-title`)는 본문(`text-doc-body`)과 동일 크기/행간을 사용하고 `font-weight:700`으로 고정했습니다.
- **헤딩-본문 간격 규칙 재조정(H1/H2+)**:
    - 전역 문서 레이아웃에서 헤딩-설명 간격을 `H1=12px`, `H2+=8px` 기준으로 조정했습니다(`doc-page-header`, `doc-section-header`, `doc-subsection-header`).
    - `IntroductionPage`와 `PrinciplesSection(list)`의 커스텀 H3 블록 간격도 `gap-2(8px)`로 맞춰 헤딩 리듬을 통일했습니다.
- **H1/H2 보조 텍스트 타이포 통일**:
    - 문서 보조 텍스트 토큰을 `16px / 24px`로 통일했습니다.
    - `--doc-subtitle-size/line-height`와 `--doc-section-subtitle-size/line-height`를 동일 규격으로 조정했습니다.
- **본문 15px → 14px/20px 적용**:
    - 문서 본문 토큰(`--doc-body-size`, `--doc-body-line-height`)을 `14px / 20px`로 조정했습니다.
    - `H3`가 본문 토큰을 참조하도록 구성되어 있어 `text-doc-subsection-title`도 동일한 크기/행간 규칙을 따르도록 동기화되었습니다.
    - 실험 모드 바디 오버라이드도 `14px / 20px` 기준으로 정리했습니다.
- **H2/H3 타이포 및 헤더 간격 재조정**:
    - `H2`를 `20px / 28px / 600`으로 조정했습니다.
    - `H2`와 보조 텍스트 간격을 `gap-1(4px)`로 조정했습니다.
    - `H3`(`text-doc-subsection-title`)의 폰트 두께를 `500`으로 조정했습니다.
    - `H3`와 보조 텍스트 간격을 `gap-0`으로 조정했습니다.
- **Overview 리스트 리듬 재조정(그룹핑 보강)**:
    - `PrinciplesSection(list)`를 `항목 간 gap-4 + 항목 내부 gap-2` 구조로 조정해 리스트가 같은 그룹으로 읽히도록 개선했습니다.
    - `IntroductionPage`의 `시스템 목표` 블록도 동일한 리듬(`그룹 간 gap-4`, `제목-본문 gap-2`)으로 맞췄습니다.
- **Overview 들여쓰기/불릿 적용**:
    - `PrinciplesSection(list)` 항목에 불릿형 마커 + 들여쓰기 구조를 적용해 원칙 목록의 그룹 경계를 시각적으로 강화했습니다.
    - `IntroductionPage`의 `시스템 목표` 하위 문장을 `list-disc + pl-5`로 전환해 정보 계층을 명확히 했습니다.
- **H2/H3 보조 텍스트 타이포 재조정**:
    - `H2`를 `18px / 24px / 600`으로 조정했습니다.
    - `H3` 보조 텍스트가 `14px / 20px` 규칙을 따르도록 `PrinciplesSection(list)`의 `leading-relaxed` 오버라이드를 제거했습니다.
