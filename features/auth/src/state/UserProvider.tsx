import React, { PropsWithChildren } from 'react';
import { useUserState } from '../hooks';
import { UserContext, UserContextState } from './userContext';

/**
 * User Provider Component
 *
 * Wraps the app to provide user context throughout the app.
 * Manages auth session, user profile, and user application state.
 *
 * Usage:
 * <UserProvider>
 *   <UserRootNavigator />
 * </UserProvider>
 */
export function UserProvider({ children }: PropsWithChildren) {
  // Get user state from hook (handles Firebase listeners and profile fetching)
  const userState = useUserState();

  return (
    <UserContext.Provider value={userState as UserContextState}>
      {children}
    </UserContext.Provider>
  );
}
