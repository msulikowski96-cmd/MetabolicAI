import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DemoScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#F5F5F0]" edges={['top']}>
      <ScrollView className="flex-1 px-4 py-6">
        <Text className="text-3xl font-serif italic text-[#141414] mb-6">Demo</Text>
        <Text className="text-gray-500">To jest wersja demonstracyjna aplikacji mobilnej.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
