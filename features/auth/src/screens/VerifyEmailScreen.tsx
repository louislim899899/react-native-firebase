import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScreenLayout } from '../components';
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
    <ScreenLayout containerStyle={styles.layoutContainer}>
      <View style={styles.content}>
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
  secondaryButton: {
    marginTop: 15,
    paddingVertical: 10,
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },
  error: {
    color: '#ff3333',
    marginBottom: 15,
    textAlign: 'center',
  },
});
