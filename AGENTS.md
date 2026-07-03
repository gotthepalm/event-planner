# Agent Guide

This file gives coding agents the project-specific context needed to work safely in this repository.

## Project Summary

Event Planner is a Next.js 16 App Router application for personal event planning. It uses:

- TypeScript
- React 19
- Material UI 9
- Tailwind CSS 4
- Firebase Authentication
- Firestore
- React Hook Form
- Zod
- date-fns

The UI language is English. Keep all user-facing text, validation messages, metadata, and README content in English.

## Important Next.js Note

This project uses Next.js 16. APIs and conventions may differ from older Next.js versions. Before changing framework-level behavior, consult the installed Next.js docs in `node_modules/next/dist/docs/` when available.

## Commands

Use these commands for verification:

```bash
npm.cmd run lint
npm.cmd run build
```

On Windows PowerShell, prefer `npm.cmd` instead of `npm` if script execution policy blocks `npm.ps1`.

For local development:

```bash
npm.cmd run dev
```

If port `3000` is occupied:

```bash
npm.cmd run dev -- -p 3001
```

## Environment

Firebase config is read from public Next.js environment variables:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

Use `.env.local` for real values. Do not commit secrets or local env files.

## App Architecture

Routes:

- `/` renders the protected dashboard.
- `/login` renders the sign-in page.
- `/register` renders the registration page.

Key files:

- `src/app/layout.tsx`: root layout and `AppProviders`.
- `src/providers/AppProviders.tsx`: MUI theme, date picker localization, auth provider, CSS baseline.
- `src/providers/AuthProvider.tsx`: Firebase auth state and auth actions.
- `src/components/AuthGuard.tsx`: redirects unauthenticated users to `/login`.
- `src/components/Dashboard.tsx`: dashboard shell, filters, event CRUD wiring.
- `src/components/EventCalendar.tsx`: calendar presentation.
- `src/components/EventList.tsx`: list presentation.
- `src/components/EventFormDrawer.tsx`: create/edit event form.
- `src/lib/firebase.ts`: Firebase app/auth/firestore initialization.
- `src/lib/events.ts`: Firestore subscription and event mutations.
- `src/lib/errorMessages.ts`: Firebase-to-user-message mapping.
- `src/lib/validation.ts`: Zod schemas.
- `src/types/event.ts`: event types, labels, importance constants.
- `src/theme.ts`: MUI design system overrides.

## Data Model

Firestore collection: `events`

Event fields:

- `ownerId: string`
- `title: string`
- `dateTime: Timestamp`
- `description: string`
- `importance: "normal" | "important" | "critical"`
- `createdAt: serverTimestamp`
- `updatedAt: serverTimestamp`

Client type: `PlannerEvent` in `src/types/event.ts`.

All event queries must remain scoped to the authenticated user's `uid` via `ownerId`.

## Security and Error Handling

- Do not expose raw Firebase errors, Firebase error codes, stack traces, or technical details to users.
- Route all Firebase-facing UI errors through `getUserFriendlyError` from `src/lib/errorMessages.ts`.
- Do not reintroduce the old Firebase setup/tutorial screen in the UI.
- Keep Firestore operations user-scoped.

Recommended Firestore rules are documented in `README.md`.

## Styling Rules

The current visual direction is a modern light SaaS dashboard inspired by Linear, Vercel Dashboard, Notion Calendar, Raycast, and Stripe Dashboard.

Use:

- MUI components and `sx` for component-level styling.
- Tailwind utility classes only where they help with layout or simple global utility styling.
- `src/theme.ts` for shared visual rules: colors, typography, buttons, inputs, chips, dialogs, menus.
- `src/app/globals.css` for global CSS and Tailwind import.

Do not make visual changes that alter app behavior or page flow unless explicitly requested.

Current design tokens:

- App background: `#F7F9FC`
- Cards: `#FFFFFF`
- Secondary background: `#F3F5F8`
- Borders: `#E8EDF3`
- Primary text: `#0F172A`
- Secondary text: `#64748B`
- Placeholder text: `#94A3B8`
- Primary green: `#22C55E`
- Accent blue: `#2563EB`

## Implementation Constraints

- Keep TypeScript strict.
- Preserve existing route structure unless the task explicitly asks otherwise.
- Do not change Firebase collection names or event field names without updating rules/docs.
- Do not move shared auth, Firebase, or event logic into UI components.
- Do not use raw `error.message` for user-visible Firebase errors.
- Keep client-only components marked with `"use client"`.
- Avoid adding dependencies unless they clearly serve the requested task.

## Verification Checklist

Before finishing code changes, run:

```bash
npm.cmd run lint
npm.cmd run build
```

For UI changes, also check:

- No hydration warnings in the browser console.
- No horizontal overflow on mobile.
- Login/register still render.
- The protected dashboard still redirects unauthenticated users.
