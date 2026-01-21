import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
  const navigation = useNavigation();
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
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
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
  backButton: {
    position: 'absolute',
    top: 12,
    left: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    zIndex: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: '#007AFF',
    fontWeight: '600',
  },
});
