import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useUser, useUserState } from '../hooks';

/**
 * Onboarding Profile Screen
 *
 * Shown when user's email is verified but profile is incomplete.
 * Allows user to enter their name to complete onboarding.
 *
 * @see specs/user/current/module_user_v2_FINAL.md
 */

export function OnboardingProfileScreen() {
  const { completeOnboarding, isLoading, error } = useUser();
  const { authSession } = useUserState();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleCompleteOnboarding = async () => {
    if (!authSession.uid) return;

    try {
      await completeOnboarding(authSession.uid, firstName, lastName);
      // Navigation handled automatically by useUserState
    } catch {
      // Error already captured in hook
    }
  };

  const isValid = firstName.trim() && lastName.trim();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Complete Your Profile</Text>
      <Text style={styles.description}>Tell us a bit about yourself</Text>

      {error && <Text style={styles.error}>{error}</Text>}

      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        editable={!isLoading}
        placeholderTextColor="#999"
      />

      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        editable={!isLoading}
        placeholderTextColor="#999"
      />

      <TouchableOpacity
        style={[
          styles.button,
          !isValid && styles.disabledButton,
          isLoading && styles.disabledButton,
        ]}
        onPress={handleCompleteOnboarding}
        disabled={!isValid || isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Completing...' : 'Continue'}
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
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
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
    marginTop: 20,
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
