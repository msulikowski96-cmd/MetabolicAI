import { Tabs } from 'expo-router';
import { LayoutDashboard, Calculator, History, Utensils, Settings, Sparkles } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#141414', tabBarInactiveTintColor: '#999', tabBarStyle: { height: 60, paddingBottom: 10 } }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <LayoutDashboard size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="calculator"
        options={{
          title: 'Kalkulator',
          tabBarIcon: ({ color }) => <Calculator size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'Historia',
          tabBarIcon: ({ color }) => <History size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="calories"
        options={{
          title: 'Kalorie',
          tabBarIcon: ({ color }) => <Utensils size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color }) => <Settings size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="demo"
        options={{
          title: 'Demo',
          tabBarIcon: ({ color }) => <Sparkles size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
