import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScreenLayout } from '../components';
import { USER_SCREENS } from '../navigation';

/**
 * Profile Screen
 *
 * Placeholder for user profile management.
 *
 * @see specs/user/current/module_user_v2_FINAL.md
 */

type Props = NativeStackScreenProps<any, typeof USER_SCREENS.Profile>;

export function ProfileScreen({ navigation }: Props) {
  return (
    <ScreenLayout showBackButton={false} containerStyle={styles.layoutContainer}>
      <View style={styles.content}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.placeholder}>Profile content coming soon</Text>
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
  },
  placeholder: {
    fontSize: 16,
    color: '#999',
    marginTop: 10,
  },
});
