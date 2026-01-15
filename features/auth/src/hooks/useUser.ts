import { useState, useCallback } from 'react';
import { userService } from '../services';
import { settingsService } from '../services';
import { UserProfile, UserSettings } from '../models';
import { mapFirebaseErrorToMessage } from '../utils';

/**
 * useUser Hook
 *
 * Provides user profile and settings operations.
 * Handles profile updates, onboarding completion, and settings management.
 *
 * @see specs/user/current/code_generation_plan.md
 */

export interface UseUserResult {
  /**
   * Fetch user profile from Firestore
   *
   * @param uid - Firebase UID
   * @returns UserProfile or null if not found
   * @throws Error with friendly message on failure
   */
  fetchProfile: (uid: string) => Promise<UserProfile | null>;

  /**
   * Create new user profile
   *
   * Called after registration or first social login.
   *
   * @param uid - Firebase UID
   * @param email - User's email
   * @returns Created UserProfile
   * @throws Error with friendly message on failure
   */
  createProfile: (uid: string, email: string) => Promise<UserProfile>;

  /**
   * Complete user onboarding with name information
   *
   * @param uid - Firebase UID
   * @param firstName - User's first name
   * @param lastName - User's last name
   * @returns Updated UserProfile
   * @throws Error with friendly message on failure
   */
  completeOnboarding: (
    uid: string,
    firstName: string,
    lastName: string
  ) => Promise<UserProfile>;

  /**
   * Update user's profile photo
   *
   * @param uid - Firebase UID
   * @param photoURL - New photo URL
   * @returns Updated UserProfile
   * @throws Error with friendly message on failure
   */
  updateProfilePhoto: (uid: string, photoURL: string) => Promise<UserProfile>;

  /**
   * Update user's name (first and/or last name)
   *
   * @param uid - Firebase UID
   * @param firstName - Optional new first name
   * @param lastName - Optional new last name
   * @returns Updated UserProfile
   * @throws Error with friendly message on failure
   */
  updateProfileName: (
    uid: string,
    firstName?: string,
    lastName?: string
  ) => Promise<UserProfile>;

  /**
   * Fetch user settings
   *
   * @param uid - Firebase UID
   * @returns UserSettings with defaults applied if not found
   * @throws Error with friendly message on failure
   */
  fetchSettings: (uid: string) => Promise<UserSettings>;

  /**
   * Initialize user settings with defaults
   *
   * @param uid - Firebase UID
   * @returns Created UserSettings
   * @throws Error with friendly message on failure
   */
  initializeSettings: (uid: string) => Promise<UserSettings>;

  /**
   * Update theme preference
   *
   * @param uid - Firebase UID
   * @param theme - Theme preference
   * @returns Updated UserSettings
   * @throws Error with friendly message on failure
   */
  updateTheme: (
    uid: string,
    theme: 'light' | 'dark' | 'system'
  ) => Promise<UserSettings>;

  /**
   * Update notification preference
   *
   * @param uid - Firebase UID
   * @param enabled - Whether notifications are enabled
   * @returns Updated UserSettings
   * @throws Error with friendly message on failure
   */
  updateNotifications: (uid: string, enabled: boolean) => Promise<UserSettings>;

  /**
   * Whether a user operation is in progress
   */
  isLoading: boolean;

  /**
   * Error message from last operation (null if no error)
   */
  error: string | null;
}

export function useUser(): UseUserResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeUserOperation = useCallback(
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
    fetchProfile: useCallback(
      (uid: string) => executeUserOperation(() => userService.fetchUserProfile(uid)),
      [executeUserOperation]
    ),

    createProfile: useCallback(
      (uid: string, email: string) =>
        executeUserOperation(() => userService.createUserProfile(uid, email)),
      [executeUserOperation]
    ),

    completeOnboarding: useCallback(
      (uid: string, firstName: string, lastName: string) =>
        executeUserOperation(() =>
          userService.completeOnboarding(uid, firstName, lastName)
        ),
      [executeUserOperation]
    ),

    updateProfilePhoto: useCallback(
      (uid: string, photoURL: string) =>
        executeUserOperation(() =>
          userService.updateProfilePhoto(uid, photoURL)
        ),
      [executeUserOperation]
    ),

    updateProfileName: useCallback(
      (uid: string, firstName?: string, lastName?: string) =>
        executeUserOperation(() =>
          userService.updateProfileName(uid, firstName, lastName)
        ),
      [executeUserOperation]
    ),

    fetchSettings: useCallback(
      (uid: string) =>
        executeUserOperation(() => settingsService.fetchUserSettings(uid)),
      [executeUserOperation]
    ),

    initializeSettings: useCallback(
      (uid: string) =>
        executeUserOperation(() => settingsService.initializeUserSettings(uid)),
      [executeUserOperation]
    ),

    updateTheme: useCallback(
      (uid: string, theme: 'light' | 'dark' | 'system') =>
        executeUserOperation(() => settingsService.updateTheme(uid, theme)),
      [executeUserOperation]
    ),

    updateNotifications: useCallback(
      (uid: string, enabled: boolean) =>
        executeUserOperation(() => settingsService.updateNotifications(uid, enabled)),
      [executeUserOperation]
    ),

    isLoading,
    error,
  };
}
