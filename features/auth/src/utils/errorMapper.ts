/**
 * Maps Firebase errors to user-friendly error messages
 *
 * For security: uses generic messages where possible
 * (e.g., both invalid email and invalid password show "Invalid credentials")
 *
 * @param error - Firebase error or generic error
 * @returns User-friendly error message
 */
export function mapFirebaseErrorToMessage(error: unknown): string {
  // Handle missing error
  if (!error) {
    return 'An unexpected error occurred';
  }

  // Handle standard Error objects
  if (error instanceof Error) {
    // Check if it's a Firebase error by code property
    if ('code' in error) {
      const code = (error as { code: string }).code;
      return getFirebaseErrorMessage(code);
    }
    return error.message;
  }

  // Handle error objects with code property
  if (typeof error === 'object' && 'code' in error) {
    const code = (error as { code: string }).code;
    return getFirebaseErrorMessage(code);
  }

  return 'An unexpected error occurred';
}

/**
 * Maps Firebase error codes to friendly messages
 */
function getFirebaseErrorMessage(code: string): string {
  switch (code) {
    // Authentication errors
    case 'auth/invalid-email':
      return 'Invalid email address';

    case 'auth/user-disabled':
      return 'This account has been disabled';

    case 'auth/user-not-found':
    case 'auth/wrong-password':
      // Generic message for security
      return 'Invalid credentials';

    case 'auth/email-already-in-use':
      return 'Email already registered';

    case 'auth/weak-password':
      return 'Password is too weak. Use at least 6 characters';

    case 'auth/account-exists-with-different-credential':
      return 'This email is already registered with another method';

    case 'auth/operation-not-allowed':
      return 'This sign-in method is not enabled';

    case 'auth/invalid-credential':
      return 'Invalid login credentials';

    case 'auth/network-request-failed':
      return 'Network error. Please check your connection';

    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later';

    // Verification errors
    case 'auth/invalid-action-code':
      return 'Verification link is invalid or expired';

    case 'auth/user-token-expired':
      return 'Session expired. Please log in again';

    // Password reset errors
    case 'auth/invalid-recipient-email':
      return 'Could not send reset email. Please check the address';

    // Default
    default:
      return 'An authentication error occurred. Please try again';
  }
}

/**
 * Creates an actionable error message with context
 *
 * @param message - User-friendly message
 * @param context - Where error occurred (for logging)
 * @param originalError - Original error for debugging
 * @returns Error object with context
 */
export function createContextualError(
  message: string,
  context: string,
  originalError?: unknown
): Error {
  const error = new Error(message);
  (error as any).context = context;
  (error as any).originalError = originalError;
  return error;
}
