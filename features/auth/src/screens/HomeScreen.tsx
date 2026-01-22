import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScreenLayout } from '../components';
import { useAuth, useUserState } from '../hooks';
import { USER_SCREENS } from '../navigation';

/**
 * Home Screen
 *
 * Main app screen shown to fully onboarded users.
 *
 * @see specs/user/current/technical_architecture.md
 */

type Props = NativeStackScreenProps<any, typeof USER_SCREENS.Home>;

export function HomeScreen({ navigation }: Props) {
  const { logout } = useAuth();
  const { userProfile } = useUserState();

  return (
    <ScreenLayout containerStyle={styles.layoutContainer}>
      <View style={styles.content}>
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
