# Project Log

## 2025년 12월 30일 화요일

- Completed: Made the sidebar fill the full browser height by adding 'height: 100%;' to the html element and 'h-full' to the body element in `src/index.css`.
- Completed: Explicitly set the sidebar to fill full browser height by changing `h-full` to `h-screen` on the `aside` element in `src/components/Sidebar.tsx`.
- Completed: Made the sidebar always fixed by removing 'md:relative' from the `aside` element's `className` in `src/components/Sidebar.tsx`.
- Completed: Adjusted main content to account for fixed sidebar on desktop by adding 'md:pl-60' to the main content div in `src/App.tsx`.
- Completed: Added a 32px top margin to the main content area by adding 'mt-8' to the main content div in `src/App.tsx`.
- Completed: Adjusted main content top padding to 32px by modifying the 'main' element in `src/components/MainContent.tsx` to use 'pt-8'.
- Completed: Changed the main content wrapper (div) to an 'article' tag in `src/components/MainContent.tsx`.
- Completed: Set the maximum width of the main article to 720px by adding 'max-w-[720px]' to the <article> tag in `src/components/MainContent.tsx`.
- Completed: Set the maximum width of the main article to max-w-3xl (768px) by modifying the <article> tag in `src/components/MainContent.tsx`.
- Completed: Centered the main article content horizontally by adding 'mx-auto' to the <article> tag in `src/components/MainContent.tsx`.
- Completed: Reconciled main content top padding with responsive paddings by removing explicit 'pt-8' from the 'main' element in `src/components/MainContent.tsx`.
- Completed: Updated responsive padding for main content to 'p-6 md:p-8 lg:p-12' in `src/components/MainContent.tsx`.
- Completed: Applied flexbox gap to article and refined breadcrumb spacing.
- Completed: Applied flexbox to ColorsPage content by adding 'flex flex-col gap-8' to the root div and removing redundant 'mb-8' from the h1 element in `src/components/ColorsPage.tsx`.
- Completed: Applied flexbox to ColorPaletteDisplay content by adding 'flex flex-col gap-12' to the root div and removing redundant 'mb-16' from its section elements in `src/components/ColorPaletteDisplay.tsx`.
- Completed: Applied flexbox to ThemeColorMappingDisplay content by adding 'flex flex-col gap-12' to the root div and removing redundant 'mb-12' from its category divs in `src/components/ThemeColorMappingDisplay.tsx`.
- Completed: Applied flexbox to SemanticColorMappingDisplay content by adding 'flex flex-col gap-12' to the root div and removing redundant 'mb-12' from its category divs in `src/components/SemanticColorMappingDisplay.tsx`.
- Completed: Applied flexbox to sections within ColorPaletteDisplay by adding 'flex flex-col gap-4' to the section element and removing 'mb-4' from the h3 within each section in `src/components/ColorPaletteDisplay.tsx'.
- Completed: Updated color family title font color in ColorPaletteDisplay from 'text-gray-700' to 'text-gray-400'.
- Completed: Adjusted the gap between color scale palettes to 2px by adding 'gap-0.5' to the ColorGrid component's root div className in `src/components/ColorPaletteDisplay.tsx`.
- Completed: Refined color palette level filtering based on user clarification in ColorPaletteDisplay.tsx`.
- Completed: Ensured all 'Black Alpha' levels are displayed by removing the `unwantedLevels` filter in `src/components/ColorPaletteDisplay.tsx`.
- Completed: Refined alpha level classification (`isAlpha` logic in sort function and `nonAlphaLevels` filter) to prevent unwanted empty columns in 'Gray' and 'Chromatic' sections in `src/components/ColorPaletteDisplay.PaletteDisplay.tsx`.
- Completed: Fixed component crash by reordering variable definitions (`grayFamilies`, `alphaFamilies`, `chromaticFamilies` moved before their usage) in `src/components/ColorPaletteDisplay.tsx`.
- Completed: Restored 'alpha (10%)' column to Chromatic color palettes with a robust filtering logic in `src/components/ColorPaletteDisplay.tsx`.
- Completed: Fixed 'Tokens' display to correctly render alpha color previews with transparency in `src/components/ColorPaletteDisplay.tsx`.
- Completed: Added conditional checkerboard background to ColorSwatch component for alpha colors, improving visual distinction of transparency in `src/components/ColorPaletteDisplay.tsx`.
- Completed: Applied conditional checkerboard background to alpha color chips within the TokensDisplay component, making transparent tokens visually distinct in `src/components/ColorPaletteDisplay.tsx`.
- Completed: Restored `src/components/ColorPaletteDisplay.tsx` to a stable working state by reverting all tooltip-related modifications and applying all previously successful layout and styling changes. This resolved a persistent application crash.
- Completed: Implemented Color Palette hover tooltip to show color value and token name in `src/components/ColorPaletteDisplay.tsx` and wrapped App.tsx with TooltipProvider.
- Completed: Fixed alpha color hex display in tooltip to include alpha value.
- Completed: Changed "alpha (10%)" header label to "10%" in ColorGrid.
- Completed: Removed "(10%)" from token names in TokensDisplay.
- Completed: Fixed token name generation to replace spaces with hyphens in both ColorSwatch and TokensDisplay for consistency and validity.
- Completed: Changed color level header row height from `h-12` to `h-6` in ColorGrid.
- Failed to implement table rounding for TokensDisplay due to conflicting requirements and technical limitations with table element styling. The user's latest instruction ("테이블 전체가 하나의 둥근 블록형태는 사양이야") clarifies the desired outcome, confirming the approach of wrapping the table in a `div` with `border rounded-lg overflow-hidden`.
- Completed: Reverted the table styling changes for TokensDisplay, going back to the user's initial suggested structure with a single `div` wrapper for overall table rounding.
- Completed: Changed table cell padding from `px-6` to `px-4` in TokensDisplay.
- Completed: Changed TokensDisplay color chip size to `w-6 h-6` (24px).
- Completed: Changed TokensDisplay color chip size to `w-5 h-5` (20px).
- Completed: Refactored `ThemeColorMappingDisplay.tsx` to use Shadcn UI `Table` components and display theme color mappings in a table format.
- Completed: Removed "Raw Token" column from `ThemeColorMappingDisplay.tsx`.
- Completed: Added '$' prefix to theme token names in `ThemeColorMappingDisplay.tsx`.
- Completed: Changed Clipboard icon button size to `h-5 w-5` (20px) in `src/components/ui/clipboard.tsx`.
- Completed: Added functionality to show Clipboard button only on row hover in `ThemeColorMappingDisplay.tsx`.
- Completed: Changed `tbody td` `py-2` to `py-3` in `ThemeColorMappingDisplay.tsx`.
- Completed: Applied Shadcn `Table` components to `TokensDisplay` in `src/components/ColorPaletteDisplay.tsx`.
- Completed: Changed `ThemeColorMappingDisplay.tsx` `TableHead` `p-4` to `px-4 py-2` and `h-auto`.
- Completed: Removed copy button for theme tokens in `ThemeColorMappingDisplay.tsx`.
- Completed: Added "Mapped To" column and reintroduced "Preview" column in `ThemeColorMappingDisplay.tsx`.
- Completed: Displayed hex value next to color chip in "Preview" column in `ThemeColorMappingDisplay.tsx`.
- Completed: Removed `h-10` from `TableHead` in `ThemeColorMappingDisplay.tsx` by adding `h-auto`.
- Clarified token hierarchy (Raw Value -> Palette Token -> Theme Token -> Semantic Token).

## 2026년 1월 7일 수요일

- Completed: Standardized icon layout (illustration icons) and added category filtering.
- Completed: Fixed unicode text display issues in UI components.
- Completed: Standardized search bar width to w-80 across Colors and Icons pages.
- Completed: Refined Shadow page layout: matching Radius page structure, added Description column.
- Completed: Updated Shadow tokens: value simplification (removed spread), renamed to `shadow_X` format, updated descriptions to 'Elevation' concept with Usage (Optional/Mandatory).
- Completed: Updated Shadow display: moved level labels inside sample boxes, removed external labels.
- Completed: Updated Radius tokens: renamed to `rounded_X` format, updated display to handle new naming.
- Completed: Updated Spacing tokens: renamed to `spacing_X` format (removed `--` prefix), updated display table headers to '기기 너비'.
- Completed: Implemented sticky header bottom border interaction on scroll in `MainContent.tsx`.
- Completed: Consolidated and standardized page titles and section headers across Layout/Spacing pages.
- Completed: Refined Color Usage examples to be independent of site theme, using explicit HTML/CSS instead of `shadcn/ui` components.
- Completed: Increased top margin for 'Scale' and 'Usage' tabs in Colors page to `mt-6`.
- Completed: Updated Guideline Item styling with lighter backgrounds (`bg-*-50/30`) and borders (`border-*-100`).
- Completed: Standardized Typography page layout: Left-aligned dropdown and search bar, added search filtering.
- Completed: Standardized all search bars (Colors, Typography, Icons) with search icons and localized Korean placeholders.

## 2026년 1월 9일 금요일

- Completed: Safelisted `rounded-2xl` and `rounded-3xl` classes in `tailwind.config.js` to fix missing styles.
- Completed: Updated `RadiusDisplay.tsx` to enhance visual guides (overlapping circles, increased z-index, adjusted transparency).
- Completed: Syncronized `index.css` radius variable definitions (xl, 2xl, 3xl) with `radius.json` to ensure consistency.
- Completed: Implemented 'Nested Radius' guideline section in `RadiusPage` with an interactive simulator (`NestedRadiusDisplay.tsx`).
- Completed: Refined 'Nested Radius' visual style: applied green padding color (browser inspector style) and removed outer shadow.
- Completed: Implemented snapped sliders for 'Nested Radius' using design system tokens (Radius tokens for outer slider, Spacing tokens for padding slider).
- Completed: Fixed runtime errors in `NestedRadiusDisplay` (React import, state hoisting, data loading) to ensure stable rendering.
- Completed: Refined 'Nested Radius' UI: renamed title to "중첩 라디우스", removed redundant "Calculated" label and formula code block.
- Completed: Fixed 'Nested Radius' slider alignment: used absolute positioning with calc() offset to align markers perfectly with the slider thumb center.
- Completed: Fixed 'Nested Radius' slider thumb vertical alignment: applied explicit Tailwind styles to reset native input appearance and center the thumb on the track.
- **2025-01-09**:
  - Implemented **Search Highlight**: Added `HighlightText` component and applied it to Typography and Color tables.
  - Fixed **Semantic Color Filter**: Resolved bug where filtering by Background/Border/Icon showed empty results (fixed header key mismatch).
  - Fixed **Radius Page Layout**: Resolved excessive bottom whitespace by adding `overflow-hidden` to clip large guide circles.
  - Refined **Nested Radius UI**: Improved slider alignment and visual styles.