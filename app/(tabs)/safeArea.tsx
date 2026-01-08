import React from 'react';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { Text } from '@react-navigation/elements';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TestScreen() {
	return (
		// <ThemedView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'#000001' }}>
		// 	<ThemedText>Test screen</ThemedText>
		// </ThemedView>

        <SafeAreaView style={{ flex: 1 }}>
        <Text>Content is in safe area.</Text>
        </SafeAreaView>
	);
}

export const options = {
	title: 'Test',
	tabBarIcon: ({ color }: { color: string }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
};
