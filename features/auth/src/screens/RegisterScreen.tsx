import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../hooks';
import { USER_SCREENS } from '../navigation';

/**
 * Register Screen
 *
 * Allows users to create a new account with email and password.
 *
 * @see specs/user/current/module_user_v2_FINAL.md
 */

type Props = NativeStackScreenProps<any, typeof USER_SCREENS.Register>;

export function RegisterScreen({ navigation }: Props) {
  const { register, isLoading, error } = useAuth();

  const handleDemoRegister = async () => {
    try {
      const timestamp = Date.now();
      await register(`demo${timestamp}@example.com`, 'password123');
      // Navigation handled automatically by useUserState
    } catch {
      // Error is already captured in the hook
    }
  };

  const handleGoToLogin = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity
        style={[styles.button, isLoading && styles.disabledButton]}
        onPress={handleDemoRegister}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Creating account...' : 'Register (Demo)'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={handleGoToLogin}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
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
