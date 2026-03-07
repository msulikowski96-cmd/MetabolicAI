import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { UserProfile, ACTIVITY_LABELS, ActivityLevel } from '../../types';
import { cn } from '../../utils';

const schema = z.object({
  age: z.number().min(1).max(120),
  gender: z.enum(['male', 'female']),
  height: z.number().min(50).max(300),
  weight: z.number().min(20).max(500),
  activityLevel: z.enum(['sedentary', 'lightly_active', 'moderately_active', 'very_active', 'super_active']),
  targetWeight: z.number().optional(),
});

export default function CalculatorScreen() {
  const { control, handleSubmit, formState: { errors } } = useForm<UserProfile>({
    resolver: zodResolver(schema),
    defaultValues: {
      age: 30,
      gender: 'male',
      height: 180,
      weight: 80,
      activityLevel: 'moderately_active',
    }
  });

  const onSubmit = (data: UserProfile) => {
    console.log(data);
    // Save to backend/storage
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F5F5F0]" edges={['top']}>
      <ScrollView className="flex-1 px-4 py-6" contentContainerStyle={{ paddingBottom: 100 }}>
        <Text className="text-3xl font-serif italic text-[#141414] mb-6">Kalkulator</Text>
        
        <View className="bg-white rounded-3xl p-6 shadow-sm border border-[#141414]/5">
            <Controller
                control={control}
                name="age"
                render={({ field: { onChange, value } }) => (
                    <View className="mb-4">
                        <Text className="text-sm font-medium text-gray-500 mb-1">Wiek</Text>
                        <TextInput
                            className="bg-[#F5F5F0] p-4 rounded-xl text-[#141414]"
                            keyboardType="numeric"
                            value={value?.toString()}
                            onChangeText={text => onChange(Number(text))}
                        />
                    </View>
                )}
            />
            
            <Controller
                control={control}
                name="gender"
                render={({ field: { onChange, value } }) => (
                    <View className="mb-4">
                        <Text className="text-sm font-medium text-gray-500 mb-1">Płeć</Text>
                        <View className="flex-row gap-4">
                            <TouchableOpacity 
                                onPress={() => onChange('male')}
                                className={cn("flex-1 p-4 rounded-xl items-center", value === 'male' ? "bg-[#141414]" : "bg-[#F5F5F0]")}
                            >
                                <Text className={cn("font-medium", value === 'male' ? "text-white" : "text-[#141414]")}>Mężczyzna</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => onChange('female')}
                                className={cn("flex-1 p-4 rounded-xl items-center", value === 'female' ? "bg-[#141414]" : "bg-[#F5F5F0]")}
                            >
                                <Text className={cn("font-medium", value === 'female' ? "text-white" : "text-[#141414]")}>Kobieta</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />

             <Controller
                control={control}
                name="weight"
                render={({ field: { onChange, value } }) => (
                    <View className="mb-4">
                        <Text className="text-sm font-medium text-gray-500 mb-1">Waga (kg)</Text>
                        <TextInput
                            className="bg-[#F5F5F0] p-4 rounded-xl text-[#141414]"
                            keyboardType="numeric"
                            value={value?.toString()}
                            onChangeText={text => onChange(Number(text))}
                        />
                    </View>
                )}
            />

             <Controller
                control={control}
                name="height"
                render={({ field: { onChange, value } }) => (
                    <View className="mb-4">
                        <Text className="text-sm font-medium text-gray-500 mb-1">Wzrost (cm)</Text>
                        <TextInput
                            className="bg-[#F5F5F0] p-4 rounded-xl text-[#141414]"
                            keyboardType="numeric"
                            value={value?.toString()}
                            onChangeText={text => onChange(Number(text))}
                        />
                    </View>
                )}
            />

            <Controller
                control={control}
                name="activityLevel"
                render={({ field: { onChange, value } }) => (
                    <View className="mb-4">
                        <Text className="text-sm font-medium text-gray-500 mb-1">Poziom aktywności</Text>
                        {Object.entries(ACTIVITY_LABELS).map(([key, label]) => (
                             <TouchableOpacity 
                                key={key}
                                onPress={() => onChange(key as ActivityLevel)}
                                className={cn("p-3 rounded-xl mb-2", value === key ? "bg-[#141414]" : "bg-[#F5F5F0]")}
                            >
                                <Text className={cn("text-xs", value === key ? "text-white" : "text-[#141414]")}>{label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            />

            <TouchableOpacity 
                onPress={handleSubmit(onSubmit)}
                className="bg-[#141414] p-4 rounded-xl items-center mt-4"
            >
                <Text className="text-white font-bold">Zapisz zmiany</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
