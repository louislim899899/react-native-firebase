import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth, useUserState } from '../hooks';

/**
 * Verify Email Screen
 *
 * Shown when user is authenticated but email is not verified.
 * Allows user to resend verification email and refresh verification status.
 *
 * @see specs/user/current/module_user_v2_FINAL.md
 */

export function VerifyEmailScreen() {
  const { sendVerificationEmail, refreshEmailVerificationStatus, isLoading, error } = useAuth();
  const { authSession } = useUserState();

  const handleResendEmail = async () => {
    try {
      await sendVerificationEmail();
    } catch {
      // Error already captured in hook
    }
  };

  const handleRefreshVerification = async () => {
    try {
      await refreshEmailVerificationStatus();
    } catch {
      // Error already captured in hook
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Your Email</Text>
      <Text style={styles.description}>
        We&apos;ve sent a verification link to {authSession.email}
      </Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity
        style={[styles.button, isLoading && styles.disabledButton]}
        onPress={handleRefreshVerification}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Checking...' : 'I\'ve Verified My Email'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={handleResendEmail}
        disabled={isLoading}
      >
        <Text style={styles.secondaryButtonText}>Resend Verification Email</Text>
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
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
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
  secondaryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  error: {
    color: '#ff3333',
    marginBottom: 15,
    textAlign: 'center',
  },
});
