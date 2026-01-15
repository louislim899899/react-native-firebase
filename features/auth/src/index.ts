/**
 * Auth Feature Public API
 *
 * This file exports all public interfaces and components for the auth feature.
 * Features should only import from this file, not from internal modules.
 */

// Models & Types
export { UserAppState } from './models';
export type { AuthSession, UserProfile, UserSettings } from './models';

// Services (if screen developers need direct access)
export { authService, userService, settingsService } from './services';

// Hooks (main way to interact with auth feature)
export { useAuth, useUser, useUserState } from './hooks';
export type {
  UseAuthResult,
  UseUserResult,
  UseUserStateResult,
} from './hooks';

// Navigation
export { UserRootNavigator, USER_SCREENS } from './navigation';

// State & Context
export { useUserContext } from './state';
export type { UserContextState } from './state';

// Utilities (for app-level use)
export {
  mapFirebaseErrorToMessage,
  hasSeenIntroSlider,
  markIntroSliderSeen,
  resetFirstInstallFlag,
} from './utils';
