# Agent Context

## What This Repository Is
- A Vite + React + TypeScript documentation site for an internal design system.
- The product mixes static guidance pages, component registry-driven documentation, and authenticated collaboration features.
- The current site is Korean-first and should stay aligned with that content model.

## Main User Flows
- Read design system foundation documentation such as color, typography, spacing, layout, radius, icons, and shadows.
- Browse design system component guidance such as the button guide under `/guide/components/button`.
- Browse site-specific configuration references under `Site Settings`.
- Sign in with Firebase Authentication.
- Leave improvement proposals on the current page via the floating proposal UI.

## Route Map
- Route setup lives in `src/App.tsx`.
- Key route groups:
- `/overview`, `/colors`, `/typography`, `/spacing`, `/layout`, `/radius`, `/motion`, `/icons`, `/shadows`
- `/guide/components`
- `/guide/components/button`
- `/site-settings`
- `/site-settings/components`
- `/site-settings/theme`
- `/site-settings/layout`
- `/site-settings/typography`
- `/site-settings/components/:componentName`
- `/login`

## Information Architecture Rules
- `Foundation` is for design tokens and system primitives.
- `Components` under `/guide/components/*` is for shared design-system component guidance.
- `Site Settings` is for current site implementation references.
- Do not merge these branches casually. The project intentionally distinguishes system guidance from site implementation.

## Layout and Navigation
- `src/components/Sidebar.tsx` controls the primary navigation groups.
- `src/components/MainContent.tsx` wraps most page content and mounts `ProposalNotification`.
- `ProposalNotification` is globally available in the main content shell, so collaboration UI changes can affect many pages at once.

## Firebase Surface Area
- Firebase initialization is in `src/lib/firebase.ts`.
- Auth state and password reset behavior live in `src/contexts/AuthContext.tsx`.
- Firestore proposal CRUD logic lives in `src/hooks/useProposals.ts`.
- Proposal permissions and delete button rendering live in `src/components/ui/ProposalNotification.tsx`.
- Current env usage includes Firebase web config and `VITE_PROPOSAL_ADMIN_EMAILS`.

## Collaboration Features
- Proposals are persisted in Firestore collection `proposals`.
- Proposal items store page path, selected element selector, content, and author email.
- Frontend delete visibility is gated by author email and admin email env config.
- Backend enforcement depends on Firebase Console rules and is separate from this repo.
- Realtime cursor and thread-style collaboration are planned, not implemented yet.
- Implementation plan: `docs/04-patterns/realtime-collaboration-implementation-plan.md`

## Content Sources
- Component metadata and examples are registry-driven in `src/data/componentRegistry.ts`.
- Some documentation pages are hand-authored components under `src/components/*Page.tsx`.
- When adding a new guide page, update routes, sidebar entry, and any registry references if needed.

## Operational Notes
- Local `.env` and Vercel environment variables must be managed separately.
- Firebase Console changes are out-of-band from git and must be called out explicitly.
- The repository currently exposes `build`, `lint`, `dev`, and `preview` scripts only.

## Recommended First Read For Agents
1. `AGENTS.md`
2. `src/App.tsx`
3. `src/components/Sidebar.tsx`
4. `src/components/MainContent.tsx`
5. `src/components/ui/ProposalNotification.tsx`
6. `src/lib/firebase.ts`
