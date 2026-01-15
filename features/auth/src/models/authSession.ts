/**
 * Authentication Session Model
 *
 * Represents the authentication status from Firebase Auth.
 * This is the source of truth for whether a user is logged in.
 *
 * @see specs/user/current/data_model.md
 */
export interface AuthSession {
  /**
   * Firebase User ID (UID)
   * null if user is not authenticated
   */
  uid: string | null;

  /**
   * User's email address
   * null if user is not authenticated
   */
  email: string | null;

  /**
   * Authentication provider
   * 'email' for email/password, 'google' for Google Sign-In
   */
  provider: 'email' | 'google' | null;

  /**
   * Whether the user's email has been verified
   */
  emailVerified: boolean;
}
