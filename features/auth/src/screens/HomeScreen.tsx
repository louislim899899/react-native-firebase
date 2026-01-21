import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth, useUserState } from '../hooks';

/**
 * Home Screen
 *
 * Main app screen shown to fully onboarded users.
 *
 * @see specs/user/current/technical_architecture.md
 */

export function HomeScreen() {
  const { logout } = useAuth();
  const { userProfile } = useUserState();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Home</Text>
      {userProfile && (
        <Text style={styles.greeting}>
          Hello, {userProfile.firstName} {userProfile.lastName}!
        </Text>
      )}
      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Logout</Text>
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
  greeting: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#ff3333',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
