import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScreenLayout } from '../components';
import { useAuth } from '../hooks';
import { USER_SCREENS } from '../navigation';

/**
 * Login Screen
 *
 * Multi-step login flow:
 * 1. Enter email
 * 2. Check if email exists
 *    - If yes: Enter password to login
 *    - If no: Navigate to register with email pre-filled
 *
 * @see specs/user/current/module_user_v2_FINAL.md
 */

type Props = NativeStackScreenProps<any, typeof USER_SCREENS.Login>;

export function LoginScreen({ navigation }: Props) {
  const { login, isLoading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [emailCheckError, setEmailCheckError] = useState<string | null>(null);

  const handleCheckEmail = async () => {
    if (!email.trim()) {
      setEmailCheckError('Please enter an email');
      return;
    }

    setEmailCheckError(null);
    try {
      // For demo: treat emails starting with 'demo' as existing
      const exists = email.toLowerCase().includes('demo');
      if (exists) {
        setEmailVerified(true);
      } else {
        // Navigate to register with email pre-filled
        navigation.navigate(USER_SCREENS.Register, { email });
      }
    } catch {
      setEmailCheckError('Error checking email. Please try again.');
    }
  };

  const handleLogin = async () => {
    if (!password.trim()) {
      setEmailCheckError('Please enter your password');
      return;
    }

    try {
      await login(email, password);
      // Navigation handled automatically by useUserState
    } catch {
      // Error is already captured in the hook
    }
  };

  const handleGoBack = () => {
    setEmailVerified(false);
    setPassword('');
    setEmailCheckError(null);
  };

  // Step 1: Email entry
  if (!emailVerified) {
    return (
      <ScreenLayout showBackButton={false}>
        <View style={styles.content}>
          <Text style={styles.title}>Login</Text>
          {emailCheckError && <Text style={styles.error}>{emailCheckError}</Text>}
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            editable={!isLoading}
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={[styles.button, isLoading && styles.disabledButton]}
            onPress={handleCheckEmail}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Checking...' : 'Continue'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScreenLayout>
    );
  }

  // Step 2: Password entry
  return (
    <ScreenLayout showBackButton={false}>
      <View style={styles.content}>
        <Text style={styles.title}>Enter Password</Text>
        <Text style={styles.emailDisplay}>{email}</Text>
        {error && <Text style={styles.error}>{error}</Text>}
        {emailCheckError && <Text style={styles.error}>{emailCheckError}</Text>}
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          editable={!isLoading}
          secureTextEntry
          placeholderTextColor="#999"
        />
        <TouchableOpacity
          style={[styles.button, isLoading && styles.disabledButton]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link} onPress={handleGoBack} disabled={isLoading}>
          <Text style={styles.linkText}>← Use different email</Text>
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  emailDisplay: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20,
    color: '#007AFF',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
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
