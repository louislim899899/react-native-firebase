import { useNavigation } from '@react-navigation/native';
import React, { ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * ScreenLayout Component
 *
 * Reusable layout wrapper for all screens with optional back button.
 * Handles SafeAreaView and consistent screen structure.
 *
 * @param children - Screen content to render
 * @param showBackButton - Whether to show the back button (default: true)
 * @param containerStyle - Optional custom container styles
 */

interface ScreenLayoutProps {
  children: ReactNode;
  showBackButton?: boolean;
  containerStyle?: any;
}

export function ScreenLayout({
  children,
  showBackButton = true,
  containerStyle,
}: ScreenLayoutProps) {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={[styles.container, containerStyle]}>
        {showBackButton && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
        )}
        {children}
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
