import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../hooks';

/**
 * Forgot Password Screen
 *
 * Allows users to initiate password reset flow.
 *
 * @see specs/user/current/module_user_v2_FINAL.md
 */

export function ForgotPasswordScreen() {
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
      <View style={styles.container}>
        <Text style={styles.successTitle}>Check your email</Text>
        <Text style={styles.successText}>
          We&apos;ve sent a password reset link to {email}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        editable={!isLoading}
        placeholderTextColor="#999"
      />
      <TouchableOpacity
        style={[styles.button, isLoading && styles.disabledButton]}
        onPress={handleSendReset}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Sending...' : 'Send Reset Email'}
        </Text>
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
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginVertical: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
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
