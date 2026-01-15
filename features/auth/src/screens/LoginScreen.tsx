import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../hooks';
import { USER_SCREENS } from '../navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

/**
 * Login Screen
 *
 * Allows users to log in with email and password.
 *
 * @see specs/user/current/module_user_v2_FINAL.md
 */

type Props = NativeStackScreenProps<any, typeof USER_SCREENS.Login>;

export function LoginScreen({ navigation }: Props) {
  const { login, isLoading, error } = useAuth();

  const handleDemoLogin = async () => {
    try {
      await login('demo@example.com', 'password123');
      // Navigation handled automatically by useUserState
    } catch {
      // Error is already captured in the hook
    }
  };

  const handleGoToRegister = () => {
    navigation.navigate(USER_SCREENS.Register);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity
        style={[styles.button, isLoading && styles.disabledButton]}
        onPress={handleDemoLogin}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Logging in...' : 'Login (Demo)'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={handleGoToRegister}>
        <Text style={styles.linkText}>Don&apos;t have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginVertical: 10,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  link: {
    marginTop: 20,
  },
  linkText: {
    color: '#007AFF',
    fontSize: 14,
  },
  error: {
    color: '#ff3333',
    marginBottom: 15,
    textAlign: 'center',
  },
});
