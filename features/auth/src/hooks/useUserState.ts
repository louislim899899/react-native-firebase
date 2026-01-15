import { useState, useEffect } from 'react';
import { authService } from '../services';
import { userService } from '../services';
import { AuthSession, UserProfile, UserAppState } from '../models';
import { resolveUserAppState } from '../state';

/**
 * useUserState Hook
 *
 * Combines authentication and profile data to produce the current user state.
 * This is the main source of truth for navigation and access control.
 *
 * @see specs/user/current/code_generation_plan.md
 */

export interface UseUserStateResult {
  /**
   * Current authentication session
   */
  authSession: AuthSession;

  /**
   * Current user profile (null if not loaded yet or user is guest)
   */
  userProfile: UserProfile | null;

  /**
   * Derived user application state
   */
  userAppState: UserAppState;

  /**
   * Whether user data is still loading
   */
  isLoading: boolean;

  /**
   * Any error during state resolution
   */
  error: Error | null;
}

export function useUserState(): UseUserStateResult {
  const [authSession, setAuthSession] = useState<AuthSession>({
    uid: null,
    email: null,
    provider: null,
    emailVerified: false,
  });

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Subscribe to auth state changes
  useEffect(() => {
    const unsubscribe = authService.onAuthStateChange(async (session) => {
      setAuthSession(session);
      setIsLoading(true);
      setError(null);

      // If user is authenticated, fetch their profile
      if (session.uid) {
        try {
          // Try to fetch profile - might not exist yet
          const profile = await userService.fetchUserProfile(session.uid);
          setUserProfile(profile);
        } catch (err) {
          setError(err instanceof Error ? err : new Error(String(err)));
          // Continue anyway - profile might be created after registration
        }
      } else {
        // Guest user
        setUserProfile(null);
      }

      setIsLoading(false);
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  // Derive current user state
  const userAppState = resolveUserAppState(authSession, userProfile);

  return {
    authSession,
    userProfile,
    userAppState,
    isLoading,
    error,
  };
}
