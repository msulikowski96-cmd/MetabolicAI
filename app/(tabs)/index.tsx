import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Scale, Activity, TrendingUp, Target, Calendar } from 'lucide-react-native';
import { LineChart } from 'react-native-gifted-charts';
import { format, parseISO } from 'date-fns';
import { pl } from 'date-fns/locale';

import StatCard from '../../components/StatCard';
import { UserProfile, Measurement } from '../../types';
import { calculateBMI, calculateBMR, calculateTDEE, getBMICategory, getBMICategoryColor, cn } from '../../utils';
import { formatWeight, kgToLbs } from '../../utils/units';

const API_URL = 'http://localhost:3000'; // Adjust for mobile device
const screenWidth = Dimensions.get('window').width;

export default function Dashboard() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [loading, setLoading] = useState(true);
  const [chartRange, setChartRange] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Mock data for now
       setProfile({
        age: 30,
        gender: 'male',
        height: 180,
        weight: 80,
        activityLevel: 'moderately_active',
        targetWeight: 75
      });
      
      const mockMeasurements = Array.from({ length: 30 }, (_, i) => ({
        id: i.toString(),
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString(),
        weight: 80 + Math.sin(i / 5) * 2,
        height: 180,
        bmi: 24.7,
      }));
      setMeasurements(mockMeasurements);
      
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !profile) {
    return (
      <View className="flex-1 justify-center items-center bg-[#F5F5F0]">
        <ActivityIndicator size="large" color="#141414" />
      </View>
    );
  }

  const chartData = measurements.map(m => ({
    value: m.weight,
    label: format(parseISO(m.date), 'd', { locale: pl }),
    dataPointText: m.weight.toFixed(1),
  }));

  const getColor = (className: string) => {
    if (className.includes('blue')) return '#3b82f6';
    if (className.includes('green')) return '#22c55e';
    if (className.includes('yellow')) return '#eab308';
    if (className.includes('red')) return '#ef4444';
    return '#9ca3af';
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F5F5F0]" edges={['top']}>
      <ScrollView className="flex-1 px-4 py-6" contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="mb-8">
          <Text className="text-3xl font-serif italic text-[#141414]">Witaj z powrotem</Text>
          <Text className="text-gray-500 mt-2">Oto Twój aktualny stan metaboliczny.</Text>
        </View>

        <View className="flex-row flex-wrap justify-between">
            <View className="w-[48%]">
                <StatCard 
                label="Waga" 
                value={formatWeight(profile.weight, 'metric')} 
                subValue="kg"
                icon={<Scale size={20} color="#3b82f6" />}
                trend={-1.2}
                />
            </View>
            <View className="w-[48%]">
                <StatCard 
                label="BMI" 
                value={calculateBMI(profile.weight, profile.height).toString()} 
                subValue={getBMICategory(calculateBMI(profile.weight, profile.height))}
                icon={<Activity size={20} color={getColor(getBMICategoryColor(calculateBMI(profile.weight, profile.height)))} />}
                />
            </View>
            <View className="w-[48%]">
                <StatCard 
                label="TDEE" 
                value={`${calculateTDEE(calculateBMR(profile), profile.activityLevel)}`} 
                subValue="kcal"
                icon={<TrendingUp size={20} color="#f97316" />}
                />
            </View>
            <View className="w-[48%]">
                <StatCard 
                label="Cel" 
                value={profile.targetWeight ? formatWeight(profile.targetWeight, 'metric') : 'Brak'} 
                subValue="kg"
                icon={<Target size={20} color="#a855f7" />}
                />
            </View>
        </View>

        <View className="bg-white rounded-3xl p-6 shadow-sm border border-[#141414]/5 mt-4">
            <View className="flex-row justify-between items-center mb-6">
                <Text className="text-xl font-serif italic">Trend wagi</Text>
                <View className="flex-row bg-[#F5F5F0] rounded-lg p-1">
                    {(['daily', 'weekly', 'monthly'] as const).map((range) => (
                        <TouchableOpacity
                            key={range}
                            onPress={() => setChartRange(range)}
                            className={cn(
                                "px-3 py-1 rounded-md",
                                chartRange === range ? "bg-white shadow-sm" : ""
                            )}
                        >
                            <Text className={cn(
                                "text-xs font-medium",
                                chartRange === range ? "text-[#141414]" : "text-gray-400"
                            )}>
                                {range === 'daily' ? 'Dzień' : range === 'weekly' ? 'Tydz' : 'Mies'}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            
            <LineChart
                data={chartData}
                height={250}
                width={screenWidth - 80}
                spacing={40}
                initialSpacing={20}
                color="#141414"
                thickness={2}
                startFillColor="rgba(20, 20, 20, 0.1)"
                endFillColor="rgba(20, 20, 20, 0.01)"
                startOpacity={0.9}
                endOpacity={0.2}
                areaChart
                yAxisTextStyle={{ color: 'gray' }}
                xAxisLabelTextStyle={{ color: 'gray', fontSize: 10 }}
                hideDataPoints={false}
                dataPointsColor="#141414"
                textColor="#141414"
                textFontSize={10}
                hideRules
                yAxisOffset={70}
                curved
            />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
