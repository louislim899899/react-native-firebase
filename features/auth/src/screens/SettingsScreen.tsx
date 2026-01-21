import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/**
 * Settings Screen
 *
 * Placeholder for user settings.
 *
 * @see specs/user/current/module_user_v2_FINAL.md
 */

export function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.placeholder}>Settings content coming soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
