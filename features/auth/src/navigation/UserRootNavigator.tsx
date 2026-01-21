import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { useUserState } from '../hooks';
import { UserAppState } from '../models';
import {
    ForgotPasswordScreen,
    HomeScreen,
    IntroSliderScreen,
    LoginScreen,
    OnboardingProfileScreen,
    ProfileScreen,
    RegisterScreen,
    SettingsScreen,
    VerifyEmailScreen,
} from '../screens';
import { hasSeenIntroSlider } from '../utils';

/**
 * User Root Navigator
 *
 * Main entry point for user-facing navigation.
 * Routes users based on their UserAppState:
 * - First time? → Intro slider
 * - Not logged in? → Auth stack
 * - Not verified? → Verification stack
 * - Not onboarded? → Onboarding stack
 * - Verified & onboarded? → Main app stack
 *
 * @see specs/user/current/technical_architecture.md
 */

const Stack = createNativeStackNavigator();

/**
 * Screen names for type safety
 */
export const USER_SCREENS = {
  IntroSlider: 'IntroSlider',
  Login: 'Login',
  Register: 'Register',
  ForgotPassword: 'ForgotPassword',
  VerifyEmail: 'VerifyEmail',
  OnboardingProfile: 'OnboardingProfile',
  Home: 'Home',
  Profile: 'Profile',
  Settings: 'Settings',
} as const;

/**
 * Intro Stack - Shown only on first app install
 */
function IntroStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={USER_SCREENS.IntroSlider}
        component={IntroSliderScreen}
      />
    </Stack.Navigator>
  );
}

/**
 * Auth Stack - For guest users
 */
function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={USER_SCREENS.Login}
        component={LoginScreen}
      />
      <Stack.Screen
        name={USER_SCREENS.Register}
        component={RegisterScreen}
      />
      <Stack.Screen
        name={USER_SCREENS.ForgotPassword}
        component={ForgotPasswordScreen}
      />
    </Stack.Navigator>
  );
}

/**
 * Verification Stack - For users with unverified email
 */
function VerificationStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={USER_SCREENS.VerifyEmail}
        component={VerifyEmailScreen}
      />
    </Stack.Navigator>
  );
}

/**
 * Onboarding Stack - For users who haven't completed profile
 */
function OnboardingStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={USER_SCREENS.OnboardingProfile}
        component={OnboardingProfileScreen}
      />
    </Stack.Navigator>
  );
}

/**
 * Main App Stack - For fully onboarded users
 */
function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name={USER_SCREENS.Home}
        component={HomeScreen}
      />
      <Stack.Screen
        name={USER_SCREENS.Profile}
        component={ProfileScreen}
      />
      <Stack.Screen
        name={USER_SCREENS.Settings}
        component={SettingsScreen}
      />
    </Stack.Navigator>
  );
}

/**
 * Root Navigator for User Feature
 *
 * Routes users based on their state.
 * Order of checks:
 * 1. First install? → IntroStack
 * 2. Guest? → AuthStack
 * 3. Unverified? → VerificationStack
 * 4. Not onboarded? → OnboardingStack
 * 5. Otherwise → MainStack
 */
export function UserRootNavigator() {
  const { userAppState, isLoading } = useUserState();
  const [hasSeenIntro, setHasSeenIntro] = useState<boolean | null>(null);

  // Check first install on mount
  useEffect(() => {
    hasSeenIntroSlider()
      .then((seen) => setHasSeenIntro(seen))
      .catch(() => setHasSeenIntro(true)); // Assume seen on error
  }, []);

  // Show loading state while determining current state
  if (isLoading || hasSeenIntro === null) {
    return null; // Will be replaced by splash screen in production
  }

  // Routing logic based on state
  if (!hasSeenIntro) {
    return <IntroStack />;
  }

  switch (userAppState) {
    case UserAppState.GUEST:
      return <AuthStack />;

    case UserAppState.AUTHENTICATED_UNVERIFIED:
      return <VerificationStack />;

    case UserAppState.VERIFIED_NOT_ONBOARDED:
      return <OnboardingStack />;

    case UserAppState.FULLY_ONBOARDED_USER:
    case UserAppState.FULLY_ONBOARDED_ADMIN:
      return <MainStack />;

    default:
      const exhaustiveCheck: never = userAppState;
      return exhaustiveCheck;
  }
}
