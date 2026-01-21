import { useCallback, useState } from 'react';
import { AuthSession } from '../models';
import { authService } from '../services';
import { mapFirebaseErrorToMessage } from '../utils';

/**
 * useAuth Hook
 *
 * Provides authentication operations: login, register, logout, password reset.
 * Screens use this hook instead of calling authService directly.
 *
 * @see specs/user/current/code_generation_plan.md
 */

export interface UseAuthResult {
  /**
   * Login with email and password
   *
   * @param email - User's email
   * @param password - User's password
   * @returns AuthSession on success
   * @throws Error with friendly message on failure
   */
  login: (email: string, password: string) => Promise<AuthSession>;

  /**
   * Register new user with email and password
   *
   * @param email - User's email
   * @param password - User's password
   * @returns AuthSession on success
   * @throws Error with friendly message on failure
   */
  register: (email: string, password: string) => Promise<AuthSession>;

  /**
   * Login with Google OAuth
   *
   * @param idToken - Google ID token from native Google Sign-In
   * @returns AuthSession on success
   * @throws Error with friendly message on failure
   */
  loginWithGoogle: (idToken: string) => Promise<AuthSession>;

  /**
   * Send verification email to current user
   *
   * @throws Error with friendly message on failure
   */
  sendVerificationEmail: () => Promise<void>;

  /**
   * Refresh email verification status from Firebase
   *
   * Useful when user clicks "I've verified my email"
   *
   * @returns Updated AuthSession
   */
  refreshEmailVerificationStatus: () => Promise<AuthSession>;

  /**
   * Send password reset email
   *
   * @param email - Email to send reset link to
   * @throws Error with friendly message on failure
   */
  sendPasswordReset: (email: string) => Promise<void>;

  /**
   * Logout current user
   *
   * @throws Error with friendly message on failure
   */
  logout: () => Promise<void>;

  /**
   * Whether an auth operation is in progress
   */
  isLoading: boolean;

  /**
   * Error message from last operation (null if no error)
   */
  error: string | null;
}

export function useAuth(): UseAuthResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeAuthOperation = useCallback(
    async <T,>(operation: () => Promise<T>): Promise<T> => {
      setIsLoading(true);
      setError(null);
      try {
        return await operation();
      } catch (err) {
        const errorMessage = mapFirebaseErrorToMessage(err);
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    login: useCallback(
      (email: string, password: string) =>
        executeAuthOperation(() => authService.login(email, password)),
      [executeAuthOperation]
    ),

    register: useCallback(
      (email: string, password: string) =>
        executeAuthOperation(() => authService.register(email, password)),
      [executeAuthOperation]
    ),

    loginWithGoogle: useCallback(
      (idToken: string) =>
        executeAuthOperation(() => authService.loginWithGoogle(idToken)),
      [executeAuthOperation]
    ),

    sendVerificationEmail: useCallback(
      () => executeAuthOperation(() => authService.sendVerificationEmail()),
      [executeAuthOperation]
    ),

    refreshEmailVerificationStatus: useCallback(
      () =>
        executeAuthOperation(() => authService.refreshEmailVerificationStatus()),
      [executeAuthOperation]
    ),

    sendPasswordReset: useCallback(
      (email: string) =>
        executeAuthOperation(() => authService.sendPasswordResetEmail(email)),
      [executeAuthOperation]
    ),

    logout: useCallback(
      () => executeAuthOperation(() => authService.logout()),
      [executeAuthOperation]
    ),

    isLoading,
    error,
  };
}
