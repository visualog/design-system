# AGENTS.md

## Project Purpose
- This repository is the internal design system guide site for company services.
- The product is not a generic marketing site. It combines documentation, design-system foundations, component guidance, site settings references, and in-app proposal workflows.
- The primary audience is internal designers and developers working in Korean.

## Product Boundaries
- `Foundation` and `Components` are design-system guidance areas for shared internal service usage.
- `Site Settings` documents the current site implementation and is a separate information architecture branch.
- Proposal features are collaboration tooling layered onto the documentation experience.
- Authentication and proposal persistence are Firebase-backed.

## Working Principles
- Keep Korean as the default language for user-facing copy unless the task explicitly asks for English.
- Preserve the existing sidebar structure and navigation patterns unless the task is specifically about IA changes.
- Prefer defined design-system tokens and existing theme variables over ad hoc Tailwind values.
- Match the existing visual language of the site. Do not introduce an unrelated design direction.
- Treat Firebase changes as a cross-cutting concern: frontend conditions, env vars, and backend rules must all be checked together.

## High-Value Files
- App routes: `src/App.tsx`
- Sidebar IA and navigation: `src/components/Sidebar.tsx`
- Main layout shell: `src/components/MainContent.tsx`
- Firebase initialization: `src/lib/firebase.ts`
- Auth flow: `src/contexts/AuthContext.tsx`
- Proposal persistence: `src/hooks/useProposals.ts`
- Proposal UI and permissions: `src/components/ui/ProposalNotification.tsx`
- Component registry metadata: `src/data/componentRegistry.ts`

## Task Playbooks
- UI and page structure changes: `docs/agent-playbooks/ui-page-change.md`
- Firebase auth, env, and rules work: `docs/agent-playbooks/firebase-auth-rules.md`
- Architecture overview for new agents: `docs/architecture/agent-context.md`
- Firebase and deployment operations: `docs/configuration/firebase-and-deployment.md`
- Team onboarding checklist: `docs/onboarding/engineering-onboarding-checklist.md`

## Change Rules
- If the task touches navigation, verify whether the change belongs under `Foundation`, `Components`, or `Site Settings`.
- If the task touches proposal deletion or admin behavior, confirm both the frontend gating and Firestore rules path.
- If the task introduces a Firebase feature, document the required `.env` and Vercel variables.
- If the task references external mockups or English drafts, adapt them to the existing Korean site structure rather than copying them literally.

## Validation Expectations
- For code changes, run `npm run build` before finishing when feasible.
- Run `npm run lint` when the task changes logic-heavy React/TypeScript files or shared utilities.
- If a task changes Firebase behavior, explicitly state whether Firebase Console rules or Vercel env updates are required.
- If a task only adds planning or documentation, say that no runtime validation was needed.

## Common Failure Modes
- Mixing up `Components` under design-system guidance with `Site Settings > Components`.
- Applying visual colors that do not match the design system primary/secondary definitions.
- Updating frontend permissions without matching backend rules.
- Forgetting that local `.env` changes and Vercel environment variables are separate deployment steps.
- Copying English reference content directly into Korean documentation pages.

## Definition of Done
- The change fits the existing IA and product intent.
- User-facing copy is aligned with the Korean documentation experience.
- Required env/rules/deployment implications are called out.
- Relevant validation has been run or explicitly skipped with reason.
