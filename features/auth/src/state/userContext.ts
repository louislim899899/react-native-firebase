import {
  createContext,
  useContext,
} from 'react';
import { AuthSession, UserProfile, UserAppState } from '../models';

/**
 * User Context State
 *
 * Central context for user data and state throughout the app.
 * Provides auth session, user profile, and derived user state.
 */
export interface UserContextState {
  /**
   * Current authentication session
   */
  authSession: AuthSession;

  /**
   * Current user profile (null if not loaded yet)
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
   * Any error during data loading
   */
  error: Error | null;
}

/**
 * User Context
 *
 * Created with default values for GUEST state.
 * Provider will be at app root level.
 */
const UserContext = createContext<UserContextState | undefined>(undefined);

/**
 * Hook to access user context
 *
 * @returns Current UserContextState
 * @throws Error if used outside UserProvider
 */
export function useUserContext(): UserContextState {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within UserProvider');
  }
  return context;
}

export { UserContext };
