import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogOut } from 'lucide-react-native';

export default function SettingsScreen() {
  const handleLogout = () => {
    Alert.alert('Wyloguj', 'Czy na pewno chcesz się wylogować?', [
        { text: 'Anuluj', style: 'cancel' },
        { text: 'Wyloguj', style: 'destructive', onPress: () => console.log('Logged out') }
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F5F5F0]" edges={['top']}>
      <View className="flex-1 px-4 py-6">
        <Text className="text-3xl font-serif italic text-[#141414] mb-6">Profil</Text>
        
        <View className="bg-white rounded-3xl p-6 shadow-sm border border-[#141414]/5">
            <View className="items-center mb-6">
                <View className="w-20 h-20 bg-[#141414] rounded-full items-center justify-center mb-4">
                    <Text className="text-white text-2xl font-serif italic">M</Text>
                </View>
                <Text className="text-xl font-bold text-[#141414]">Użytkownik</Text>
                <Text className="text-gray-400">user@example.com</Text>
            </View>

            <TouchableOpacity 
                onPress={handleLogout}
                className="flex-row items-center justify-center gap-2 p-4 bg-red-50 rounded-xl"
            >
                <LogOut size={20} color="#ef4444" />
                <Text className="text-red-600 font-bold">Wyloguj się</Text>
            </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
