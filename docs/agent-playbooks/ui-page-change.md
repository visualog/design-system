# UI Page Change Playbook

## Use This When
- Adding or revising a documentation page
- Applying a design mockup to an existing page
- Changing sidebar navigation or page hierarchy
- Adjusting typography, spacing, or section layout

## Working Rules
- Keep the existing site shell and sidebar patterns intact unless the task explicitly changes IA.
- Treat English mockups as structure references only. Final user-facing copy should usually remain Korean.
- Prefer the design system's defined colors and tokens over ad hoc Tailwind color choices.
- Preserve the distinction between shared design-system guidance and site-specific settings pages.

## Files To Check
- `src/App.tsx`
- `src/components/Sidebar.tsx`
- `src/components/MainContent.tsx`
- Relevant page components under `src/components/*Page.tsx`
- `src/data/componentRegistry.ts` when the page references registered components

## Common Workflow
1. Confirm which IA branch the change belongs to: `Foundation`, `Components`, or `Site Settings`.
2. Review the current route and sidebar entry before editing content.
3. Apply layout/content changes in the page component.
4. Update navigation only if the page needs a new or changed entry.
5. Check that mobile layout still holds and no shell-level UI regressed.

## Frequent Mistakes
- Putting design-system component guidance under `Site Settings`.
- Translating an English reference too literally instead of adapting it to the Korean information model.
- Introducing one-off colors that do not match the DS palette.
- Changing section spacing or font scale on one page in a way that breaks cross-page consistency.

## Validation
- Run `npm run build` for page changes.
- Run `npm run lint` when shared layout or logic changed.
- Manually verify the target route and nearby sidebar states if navigation changed.
