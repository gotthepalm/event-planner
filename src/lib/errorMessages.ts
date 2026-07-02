import { FirebaseError } from "firebase/app";

const authMessages: Record<string, string> = {
  "auth/email-already-in-use": "Аккаунт с таким email уже существует.",
  "auth/invalid-credential": "Неверный email или пароль.",
  "auth/invalid-email": "Введите корректный email.",
  "auth/network-request-failed": "Не удалось подключиться к серверу. Проверьте интернет-соединение.",
  "auth/popup-closed-by-user": "Вход через Google был отменен.",
  "auth/too-many-requests": "Слишком много попыток. Попробуйте позже.",
  "auth/user-disabled": "Этот аккаунт отключен.",
  "auth/user-not-found": "Неверный email или пароль.",
  "auth/weak-password": "Пароль должен быть не короче 6 символов.",
  "auth/wrong-password": "Неверный email или пароль.",
};

const firestoreMessages: Record<string, string> = {
  "permission-denied": "У вас нет доступа к этим данным.",
  unavailable: "Сервис временно недоступен. Попробуйте позже.",
  "deadline-exceeded": "Сервер не ответил вовремя. Попробуйте еще раз.",
};

export function getUserFriendlyError(error: unknown, fallback: string): string {
  if (error instanceof FirebaseError) {
    return authMessages[error.code] ?? firestoreMessages[error.code] ?? fallback;
  }

  return fallback;
}
