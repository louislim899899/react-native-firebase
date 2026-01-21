import { UserProvider } from '@/features/auth/src';
import { Stack } from 'expo-router';

/**
 * Root App Component
 *
 * Integrates the auth module's UserProvider for user context.
 * Navigation is handled by Expo Router (app/_layout.tsx).
 *
 * UserProvider wraps the app to provide user context throughout.
 *
 * @see features/auth/src/state/UserProvider.tsx
 * @see app/_layout.tsx
 */
export default function RootApp() {
  return (
    <UserProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </UserProvider>
  );
}
