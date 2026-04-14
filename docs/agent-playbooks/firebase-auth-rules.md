# Firebase Auth And Rules Playbook

## Use This When
- Changing login or password reset behavior
- Updating proposal permissions
- Adding admin-only behavior
- Adding Firebase-backed collaboration features

## Separation Of Concerns
- Frontend code controls visibility, UX, and client-side gating.
- Firestore or Realtime Database rules control actual backend permission enforcement.
- Local `.env` controls local development behavior.
- Vercel environment variables control deployed frontend behavior.
- Firebase Console rules are not stored automatically in this repo unless explicitly exported.

## Files To Check
- `src/lib/firebase.ts`
- `src/contexts/AuthContext.tsx`
- `src/hooks/useProposals.ts`
- `src/components/ui/ProposalNotification.tsx`
- `.env`
- `.env.example`

## Required Thinking Model
- Never assume frontend hiding equals security.
- If delete/write permissions changed, ask whether backend rules changed too.
- If admin email logic changed, verify `VITE_PROPOSAL_ADMIN_EMAILS`.
- If a new Firebase service is introduced, document any required env additions and console setup.

## Common Scenarios
- Proposal delete button visible only for author/admin:
- Frontend: check email comparison and admin env parsing.
- Backend: Firestore rules must separately allow delete for author/admin.
- Password reset:
- Frontend must normalize or validate the email format expected by the auth flow.
- Deployed behavior:
- Vercel env updates require redeploy before the change appears in production.

## Validation
- Run `npm run build` after Firebase-related code changes.
- Run `npm run lint` when shared auth or proposal logic changed.
- State clearly whether these extra steps are required:
- Firebase Console rules publish
- Vercel env update
- Local dev server restart

## Realtime Collaboration Note
- Planned collaboration features should use:
- Firestore for durable proposal/comment data
- Realtime Database for cursors, presence, and typing state
- Detailed plan: `docs/04-patterns/realtime-collaboration-implementation-plan.md`
