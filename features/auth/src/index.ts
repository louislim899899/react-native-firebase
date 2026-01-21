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
export { authService, settingsService, userService } from './services';

// Hooks (main way to interact with auth feature)
export { useAuth, useUser, useUserState } from './hooks';
export type {
    UseAuthResult,
    UseUserResult,
    UseUserStateResult
} from './hooks';

// Navigation
export { USER_SCREENS, UserRootNavigator } from './navigation';

// State & Context
export { UserProvider, useUserContext } from './state';
export type { UserContextState } from './state';

// Utilities (for app-level use)
export {
    hasSeenIntroSlider, mapFirebaseErrorToMessage, markIntroSliderSeen,
    resetFirstInstallFlag
} from './utils';

