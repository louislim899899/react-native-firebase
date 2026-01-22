import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScreenLayout } from '../components';
import { useAuth } from '../hooks';
import { USER_SCREENS } from '../navigation';

/**
 * Forgot Password Screen
 *
 * Allows users to initiate password reset flow.
 *
 * @see specs/user/current/module_user_v2_FINAL.md
 */

type Props = NativeStackScreenProps<any, typeof USER_SCREENS.ForgotPassword>;

export function ForgotPasswordScreen({ navigation }: Props) {
  const { sendPasswordReset, isLoading, error } = useAuth();
  const [email, setEmail] = React.useState('');
  const [success, setSuccess] = React.useState(false);

  const handleSendReset = async () => {
    try {
      await sendPasswordReset(email);
      setSuccess(true);
    } catch {
      // Error already captured in hook
    }
  };

  if (success) {
    return (
      <ScreenLayout containerStyle={styles.layoutContainer}>
        <View style={styles.content}>
          <Text style={styles.successTitle}>Check your email</Text>
          <Text style={styles.successText}>
            We&apos;ve sent a password reset link to {email}
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.buttonText}>Back to Login</Text>
          </TouchableOpacity>
        </View>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout showBackButton={true} containerStyle={styles.layoutContainer}>
      <View style={styles.content}>
        <Text style={styles.title}>Reset Password</Text>
        {error && <Text style={styles.error}>{error}</Text>}
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
          style={[styles.button, !email || isLoading ? styles.disabledButton : {}]}
          onPress={handleSendReset}
          disabled={!email || isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  layoutContainer: {
    paddingHorizontal: 20,
  },
  content: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#00AA00',
  },
  successText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 12,
    fontSize: 16,
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
  error: {
    color: '#ff3333',
    marginBottom: 15,
    textAlign: 'center',
  },
});
