# Event Planner

Современное веб-приложение для планирования личных событий. Стек: Next.js App Router, TypeScript, Material UI, Firebase Authentication и Firestore.

## Запуск

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Firebase

Создайте `.env.local` по примеру `.env.example`:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

В Firebase Console нужно:

1. Создать Firebase project.
2. Добавить Web App и скопировать config в `.env.local`.
3. Включить Authentication providers: Email/Password и Google.
4. Создать Firestore Database.
5. Добавить правила безопасности.

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

После изменения `.env.local` перезапустите dev server.

## Скрипты

```bash
npm run dev
npm run build
npm run lint
```
