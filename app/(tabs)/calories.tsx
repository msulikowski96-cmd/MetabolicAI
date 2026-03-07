import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Trash2, Sparkles } from 'lucide-react-native';

interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  date: string;
}

export default function CaloriesScreen() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [suggestion, setSuggestion] = useState('');
  const [generating, setGenerating] = useState(false);
  const [newMeal, setNewMeal] = useState({ name: '', calories: '', protein: '', carbs: '', fats: '' });

  const handleAddMeal = () => {
    if (!newMeal.name || !newMeal.calories) {
        Alert.alert('Błąd', 'Podaj nazwę i kalorie');
        return;
    }
    const meal: Meal = {
        id: Date.now().toString(),
        name: newMeal.name,
        calories: Number(newMeal.calories),
        protein: Number(newMeal.protein) || 0,
        carbs: Number(newMeal.carbs) || 0,
        fats: Number(newMeal.fats) || 0,
        date: new Date().toISOString(),
    };
    setMeals([meal, ...meals]);
    setNewMeal({ name: '', calories: '', protein: '', carbs: '', fats: '' });
  };

  const handleGenerateSuggestion = async () => {
    setGenerating(true);
    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        setSuggestion("Na podstawie Twojego zapotrzebowania, polecam na obiad grillowaną pierś z kurczaka z ryżem i warzywami (ok. 500 kcal).");
    } catch (error) {
        Alert.alert('Błąd', 'Nie udało się wygenerować sugestii');
    } finally {
        setGenerating(false);
    }
  };

  const totalCalories = meals.reduce((acc, meal) => acc + meal.calories, 0);

  return (
    <SafeAreaView className="flex-1 bg-[#F5F5F0]" edges={['top']}>
      <ScrollView className="flex-1 px-4 py-6" contentContainerStyle={{ paddingBottom: 100 }}>
        <Text className="text-3xl font-serif italic text-[#141414] mb-6">Licznik Kalorii</Text>
        
        <View className="bg-white rounded-3xl p-6 shadow-sm border border-[#141414]/5 mb-6">
            <Text className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Dzisiejsze spożycie</Text>
            <Text className="text-4xl font-mono font-bold text-[#141414]">{totalCalories} <Text className="text-lg text-gray-400 font-sans font-normal">kcal</Text></Text>
            <View className="flex-row gap-4 mt-4">
                <View>
                    <Text className="text-xs text-gray-400">Białko</Text>
                    <Text className="font-bold">{meals.reduce((acc, m) => acc + m.protein, 0)}g</Text>
                </View>
                <View>
                    <Text className="text-xs text-gray-400">Węglowodany</Text>
                    <Text className="font-bold">{meals.reduce((acc, m) => acc + m.carbs, 0)}g</Text>
                </View>
                <View>
                    <Text className="text-xs text-gray-400">Tłuszcze</Text>
                    <Text className="font-bold">{meals.reduce((acc, m) => acc + m.fats, 0)}g</Text>
                </View>
            </View>
        </View>

        <View className="bg-white rounded-3xl p-6 shadow-sm border border-[#141414]/5 mb-6">
            <Text className="text-lg font-serif italic mb-4">Dodaj posiłek</Text>
            <TextInput
                placeholder="Nazwa posiłku"
                className="bg-[#F5F5F0] p-4 rounded-xl mb-3"
                value={newMeal.name}
                onChangeText={t => setNewMeal({...newMeal, name: t})}
            />
            <View className="flex-row gap-3 mb-3">
                <TextInput
                    placeholder="Kcal"
                    className="bg-[#F5F5F0] p-4 rounded-xl flex-1"
                    keyboardType="numeric"
                    value={newMeal.calories}
                    onChangeText={t => setNewMeal({...newMeal, calories: t})}
                />
                 <TextInput
                    placeholder="B (g)"
                    className="bg-[#F5F5F0] p-4 rounded-xl flex-1"
                    keyboardType="numeric"
                    value={newMeal.protein}
                    onChangeText={t => setNewMeal({...newMeal, protein: t})}
                />
            </View>
            <View className="flex-row gap-3 mb-4">
                <TextInput
                    placeholder="W (g)"
                    className="bg-[#F5F5F0] p-4 rounded-xl flex-1"
                    keyboardType="numeric"
                    value={newMeal.carbs}
                    onChangeText={t => setNewMeal({...newMeal, carbs: t})}
                />
                 <TextInput
                    placeholder="T (g)"
                    className="bg-[#F5F5F0] p-4 rounded-xl flex-1"
                    keyboardType="numeric"
                    value={newMeal.fats}
                    onChangeText={t => setNewMeal({...newMeal, fats: t})}
                />
            </View>
            <TouchableOpacity onPress={handleAddMeal} className="bg-[#141414] p-4 rounded-xl items-center flex-row justify-center gap-2">
                <Plus size={20} color="white" />
                <Text className="text-white font-bold">Dodaj</Text>
            </TouchableOpacity>
        </View>

        <View className="bg-indigo-50 rounded-3xl p-6 shadow-sm border border-indigo-100 mb-6">
            <View className="flex-row justify-between items-start mb-4">
                <View className="flex-row items-center gap-2">
                    <Sparkles size={20} color="#4f46e5" />
                    <Text className="text-lg font-serif italic text-indigo-900">Sugestie AI</Text>
                </View>
                <TouchableOpacity 
                    onPress={handleGenerateSuggestion} 
                    disabled={generating}
                    className="bg-indigo-600 px-3 py-1.5 rounded-lg"
                >
                    {generating ? <ActivityIndicator size="small" color="white" /> : <Text className="text-white text-xs font-bold">Generuj</Text>}
                </TouchableOpacity>
            </View>
            <Text className="text-indigo-800 leading-relaxed">
                {suggestion || "Kliknij 'Generuj', aby otrzymać spersonalizowaną sugestię posiłku opartą na Twoich celach."}
            </Text>
        </View>

        <View>
            <Text className="text-lg font-serif italic mb-4">Dzisiejsze posiłki</Text>
            {meals.map(meal => (
                <View key={meal.id} className="bg-white p-4 rounded-2xl mb-3 flex-row justify-between items-center shadow-sm border border-[#141414]/5">
                    <View>
                        <Text className="font-bold text-[#141414]">{meal.name}</Text>
                        <Text className="text-xs text-gray-400">{meal.calories} kcal • B: {meal.protein}g • W: {meal.carbs}g • T: {meal.fats}g</Text>
                    </View>
                    <TouchableOpacity onPress={() => setMeals(meals.filter(m => m.id !== meal.id))} className="p-2">
                        <Trash2 size={16} color="#ef4444" />
                    </TouchableOpacity>
                </View>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
