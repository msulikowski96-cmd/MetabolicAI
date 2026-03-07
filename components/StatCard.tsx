import React from 'react';
import { View, Text } from 'react-native';
import { TrendingUp, TrendingDown } from 'lucide-react-native';
import { cn } from '../utils';

interface StatCardProps {
  label: string;
  value: string;
  subValue: string;
  icon: React.ReactNode;
  trend?: number;
}

export default function StatCard({ label, value, subValue, icon, trend }: StatCardProps) {
  return (
    <View className="bg-white rounded-3xl p-6 shadow-sm border border-[#141414]/5 mb-4 w-full">
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center gap-2">
          <View className="p-2 bg-[#F5F5F0] rounded-xl">
            {icon}
          </View>
          <Text className="text-sm font-medium text-gray-500 uppercase tracking-wider">{label}</Text>
        </View>
        {trend !== undefined && (
          <View className={cn(
            "flex-row items-center gap-1 px-2 py-1 rounded-full",
            trend <= 0 ? "bg-green-100" : "bg-red-100"
          )}>
            {trend <= 0 ? <TrendingDown size={12} color={trend <= 0 ? "#15803d" : "#b91c1c"} /> : <TrendingUp size={12} color={trend <= 0 ? "#15803d" : "#b91c1c"} />}
            <Text className={cn("text-xs font-medium", trend <= 0 ? "text-green-700" : "text-red-700")}>{Math.abs(trend).toFixed(1)}</Text>
          </View>
        )}
      </View>
      <Text className="text-3xl font-mono font-bold text-[#141414]">{value}</Text>
      <Text className="text-xs text-gray-400 mt-1">{subValue}</Text>
    </View>
  );
}
