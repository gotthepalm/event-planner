import { FirebaseError } from "firebase/app";

const authMessages: Record<string, string> = {
  "auth/email-already-in-use": "An account with this email already exists.",
  "auth/invalid-credential": "Invalid email or password.",
  "auth/invalid-email": "Enter a valid email address.",
  "auth/network-request-failed": "Could not connect to the server. Check your internet connection.",
  "auth/popup-closed-by-user": "Google sign-in was canceled.",
  "auth/too-many-requests": "Too many attempts. Try again later.",
  "auth/user-disabled": "This account has been disabled.",
  "auth/user-not-found": "Invalid email or password.",
  "auth/weak-password": "Password must be at least 6 characters.",
  "auth/wrong-password": "Invalid email or password.",
};

const firestoreMessages: Record<string, string> = {
  "permission-denied": "You do not have access to this data.",
  unavailable: "The service is temporarily unavailable. Try again later.",
  "deadline-exceeded": "The server took too long to respond. Try again.",
};

export function getUserFriendlyError(error: unknown, fallback: string): string {
  if (error instanceof FirebaseError) {
    return authMessages[error.code] ?? firestoreMessages[error.code] ?? fallback;
  }

  return fallback;
}
