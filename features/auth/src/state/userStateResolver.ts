import { AuthSession, UserAppState, UserProfile } from '../models';

/**
 * User State Resolver
 *
 * Determines the current user state based on auth session and profile data.
 * This is the brain of the app - it drives all navigation decisions.
 *
 * State resolution order (from spec):
 * 1. If uid is null → GUEST
 * 2. If emailVerified is false → AUTHENTICATED_UNVERIFIED
 * 3. If onboardingDone is false → VERIFIED_NOT_ONBOARDED
 * 4. If role is 'admin' → FULLY_ONBOARDED_ADMIN
 * 5. Otherwise → FULLY_ONBOARDED_USER
 *
 * @see specs/user/current/data_model.md
 */

/**
 * Resolves the current user state from auth session and profile
 *
 * @param authSession - Current authentication session from Firebase
 * @param userProfile - Current user profile from Firestore (null if not loaded yet)
 * @returns The resolved UserAppState
 */
export function resolveUserAppState(
  authSession: AuthSession,
  userProfile: UserProfile | null
): UserAppState {
  // Step 1: If not authenticated, always GUEST
  if (!authSession.uid) {
    return UserAppState.GUEST;
  }

  // Step 2: If email not verified, cannot proceed
  if (!authSession.emailVerified) {
    return UserAppState.AUTHENTICATED_UNVERIFIED;
  }

  // Step 3: If onboarding not complete, must onboard first
  // Note: userProfile might be null while loading, treat as not onboarded
  if (!userProfile || !userProfile.onboardingDone) {
    return UserAppState.VERIFIED_NOT_ONBOARDED;
  }

  // Step 4 & 5: Check role
  if (userProfile.role === 'admin') {
    return UserAppState.FULLY_ONBOARDED_ADMIN;
  }

  return UserAppState.FULLY_ONBOARDED_USER;
}
