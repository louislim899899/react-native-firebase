import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
  const navigation = useNavigation();
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
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
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
