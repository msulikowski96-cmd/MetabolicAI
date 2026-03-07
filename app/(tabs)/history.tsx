import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { format, parseISO } from 'date-fns';
import { pl } from 'date-fns/locale';
import { Trash2 } from 'lucide-react-native';
import { Measurement } from '../../types';

export default function HistoryScreen() {
  const [measurements, setMeasurements] = useState<Measurement[]>([]);

  useEffect(() => {
    // Mock data
    const mockMeasurements = Array.from({ length: 10 }, (_, i) => ({
        id: i.toString(),
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
        weight: 80 + Math.sin(i / 5) * 2,
        height: 180,
        bmi: 24.7,
      }));
    setMeasurements(mockMeasurements);
  }, []);

  const handleDelete = (id: string) => {
    setMeasurements(measurements.filter(m => m.id !== id));
  };

  const renderItem = ({ item }: { item: Measurement }) => (
    <View className="bg-white p-4 rounded-2xl mb-3 flex-row justify-between items-center shadow-sm border border-[#141414]/5">
      <View>
        <Text className="font-mono font-bold text-lg text-[#141414]">{item.weight.toFixed(1)} kg</Text>
        <Text className="text-xs text-gray-400">{format(parseISO(item.date), 'PPP', { locale: pl })}</Text>
      </View>
      <View className="flex-row items-center gap-4">
        <View className="items-end">
            <Text className="text-xs font-medium text-gray-500">BMI</Text>
            <Text className="font-mono font-bold text-[#141414]">{item.bmi}</Text>
        </View>
        <TouchableOpacity onPress={() => handleDelete(item.id)} className="p-2 bg-red-50 rounded-full">
            <Trash2 size={16} color="#ef4444" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#F5F5F0]" edges={['top']}>
      <View className="flex-1 px-4 py-6">
        <Text className="text-3xl font-serif italic text-[#141414] mb-6">Historia</Text>
        <FlatList
            data={measurements}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}
