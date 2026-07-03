# Event Planner

Event Planner is a personal event management app built with Next.js, TypeScript, Material UI, Tailwind CSS, Firebase Authentication, and Firestore.

Users can sign up, sign in with email/password or Google, and manage only their own events. Events can be created, edited, deleted, searched, filtered by importance, and viewed in both calendar and list layouts.

## Features

- Email/password registration and sign-in.
- Google OAuth sign-in.
- Protected dashboard for authenticated users.
- User-scoped Firestore events.
- Event creation, editing, and delete confirmation.
- Calendar and list views.
- Keyword search across event title and description.
- Importance filter: `Normal`, `Important`, `Critical`.
- Responsive SaaS-style UI with MUI and Tailwind CSS.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Material UI 9
- Tailwind CSS 4
- Firebase Authentication
- Firestore
- React Hook Form
- Zod
- date-fns

## Project Structure

```text
src/
  app/
    layout.tsx          Root layout and providers
    page.tsx            Protected dashboard route
    login/page.tsx      Sign-in page
    register/page.tsx   Registration page
    globals.css         Global CSS and Tailwind import
  components/
    AuthPage.tsx        Shared login/register UI
    AuthGuard.tsx       Client-side route protection
    Dashboard.tsx       Main dashboard shell
    EventCalendar.tsx   Calendar view
    EventList.tsx       List view
    EventFormDrawer.tsx Create/edit event drawer
    ConfirmDialog.tsx   Delete confirmation dialog
  lib/
    firebase.ts         Firebase client initialization
    events.ts           Firestore event operations
    validation.ts       Zod schemas
    errorMessages.ts    User-friendly Firebase errors
  providers/
    AppProviders.tsx    MUI, date picker, and auth providers
    AuthProvider.tsx    Firebase auth state and auth actions
  types/
    event.ts            Event types, labels, and importance constants
  theme.ts              MUI theme and design system overrides
```

## Requirements

- Node.js 20 or newer
- npm
- A Firebase project with Authentication and Firestore enabled

## Setup

Install dependencies:

```bash
npm install
```

Create `.env.local` from `.env.example`:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

Get these values from Firebase Console:

1. Create or open a Firebase project.
2. Add a Web App.
3. Copy the Web App config into `.env.local`.
4. Enable Authentication providers:
   - Email/Password
   - Google
5. Create a Firestore Database.
6. Add the Firestore security rules below.

## Firestore Security Rules

Use these rules so each user can access only their own events:

```js
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /events/{eventId} {
      allow read, update, delete: if request.auth != null
        && request.auth.uid == resource.data.ownerId;

      allow create: if request.auth != null
        && request.auth.uid == request.resource.data.ownerId;
    }
  }
}
```

Firestore documents are stored in the `events` collection. Each event includes:

- `ownerId`
- `title`
- `dateTime`
- `description`
- `importance`
- `createdAt`
- `updatedAt`

## Running Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

If port `3000` is already in use, run:

```bash
npm run dev -- -p 3001
```

After changing `.env.local`, restart the dev server.

## Scripts

```bash
npm run dev      # Start the local development server
npm run build    # Create a production build
npm run start    # Start the production server after build
npm run lint     # Run ESLint
```

## Notes

- `.env.local` must not be committed.
- The app intentionally does not show Firebase setup instructions in the UI.
- Firebase and Firestore technical errors are mapped to user-friendly messages before rendering.
- The dashboard is client-side protected with Firebase auth state.
