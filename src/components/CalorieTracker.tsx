import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus, Trash2, Utensils, TrendingUp, Lightbulb, Save, X } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { GoogleGenAI } from "@google/genai";

interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  date: string;
}

interface CalorieTrackerProps {
  user: any;
  token: string;
}

export default function CalorieTracker({ user, token }: CalorieTrackerProps) {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMeal, setNewMeal] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: ''
  });
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [generatingSuggestion, setGeneratingSuggestion] = useState(false);

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const response = await fetch('/api/meals', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setMeals(data);
      }
    } catch (error) {
      console.error('Error fetching meals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMeal = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/meals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...newMeal,
          calories: parseFloat(newMeal.calories),
          protein: parseFloat(newMeal.protein) || 0,
          carbs: parseFloat(newMeal.carbs) || 0,
          fat: parseFloat(newMeal.fat) || 0
        })
      });

      if (response.ok) {
        const addedMeal = await response.json();
        setMeals([addedMeal, ...meals]);
        setShowAddModal(false);
        setNewMeal({ name: '', calories: '', protein: '', carbs: '', fat: '' });
      }
    } catch (error) {
      console.error('Error adding meal:', error);
    }
  };

  const handleDeleteMeal = async (id: string) => {
    try {
      const response = await fetch(`/api/meals/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setMeals(meals.filter(m => m.id !== id));
      }
    } catch (error) {
      console.error('Error deleting meal:', error);
    }
  };

  const generateAISuggestion = async () => {
    setGeneratingSuggestion(true);
    try {
      const ai = new GoogleGenAI({ apiKey: (process.env as any).GEMINI_API_KEY });
      
      // Calculate today's total
      const today = new Date().toISOString().split('T')[0];
      const todayMeals = meals.filter(m => m.date.startsWith(today));
      const todayCalories = todayMeals.reduce((sum, m) => sum + m.calories, 0);
      
      const prompt = `
        User Profile:
        - Age: ${user.age}
        - Gender: ${user.gender}
        - Weight: ${user.weight}kg
        - Height: ${user.height}cm
        - Activity Level: ${user.activityLevel}
        - Target Weight: ${user.targetWeight}kg
        - Daily TDEE (Maintenance): ${user.tdee || 'Unknown'} kcal
        
        Today's Intake: ${todayCalories} kcal
        
        Based on this data, provide a short, encouraging suggestion (max 3 sentences) to help the user meet their daily caloric needs and health goals.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      setSuggestion(response.text || "Keep up the good work!");
    } catch (error) {
      console.error('Error generating suggestion:', error);
      setSuggestion("Unable to generate suggestion at this time.");
    } finally {
      setGeneratingSuggestion(false);
    }
  };

  // Prepare chart data
  const chartData = meals.reduce((acc: any[], meal) => {
    const date = new Date(meal.date).toLocaleDateString();
    const existing = acc.find(d => d.date === date);
    if (existing) {
      existing.calories += meal.calories;
    } else {
      acc.push({ date, calories: meal.calories });
    }
    return acc;
  }, []).reverse().slice(-7); // Last 7 days

  const todayTotal = meals
    .filter(m => new Date(m.date).toDateString() === new Date().toDateString())
    .reduce((sum, m) => sum + m.calories, 0);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white">Calorie Tracker</h2>
          <p className="text-gray-400">Monitor your daily intake and trends</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all"
        >
          <Plus size={20} /> Add Meal
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Daily Summary */}
        <div className="lg:col-span-1 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-4 text-blue-400">
              <Utensils size={24} />
              <h3 className="text-xl font-semibold">Today's Intake</h3>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold text-white">{todayTotal}</span>
              <span className="text-gray-400">kcal</span>
            </div>
            {user.tdee && (
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Target: {user.tdee} kcal</span>
                  <span className={todayTotal > user.tdee ? 'text-red-400' : 'text-green-400'}>
                    {Math.round((todayTotal / user.tdee) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${todayTotal > user.tdee ? 'bg-red-500' : 'bg-blue-500'}`}
                    style={{ width: `${Math.min((todayTotal / user.tdee) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}
          </motion.div>

          {/* AI Suggestion */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-500/20 p-6 rounded-2xl relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3 text-indigo-400">
                <Lightbulb size={24} />
                <h3 className="text-xl font-semibold">AI Suggestion</h3>
              </div>
              <button 
                onClick={generateAISuggestion}
                disabled={generatingSuggestion}
                className="text-xs bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 px-3 py-1 rounded-full transition-all disabled:opacity-50"
              >
                {generatingSuggestion ? 'Thinking...' : 'Refresh'}
              </button>
            </div>
            <p className="text-gray-300 leading-relaxed italic">
              {suggestion || (generatingSuggestion ? "Analyzing your data..." : "Click refresh to get personalized advice based on your current intake.")}
            </p>
          </motion.div>
        </div>

        {/* Trends Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-zinc-900 border border-zinc-800 p-6 rounded-2xl"
        >
          <div className="flex items-center gap-3 mb-6 text-purple-400">
            <TrendingUp size={24} />
            <h3 className="text-xl font-semibold">Calorie Trends (Last 7 Days)</h3>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorCal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  stroke="#71717a" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="#71717a" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                  itemStyle={{ color: '#a78bfa' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="calories" 
                  stroke="#8b5cf6" 
                  fillOpacity={1} 
                  fill="url(#colorCal)" 
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Recent Meals */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-bottom border-zinc-800">
          <h3 className="text-xl font-semibold text-white">Recent Meals</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-zinc-800/50 text-gray-400 text-sm uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">Meal</th>
                <th className="px-6 py-4 font-medium">Calories</th>
                <th className="px-6 py-4 font-medium">P / C / F</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {meals.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No meals logged yet. Start tracking your intake!
                  </td>
                </tr>
              ) : (
                meals.map((meal) => (
                  <tr key={meal.id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="px-6 py-4 text-white font-medium">{meal.name}</td>
                    <td className="px-6 py-4 text-blue-400 font-bold">{meal.calories} kcal</td>
                    <td className="px-6 py-4 text-gray-400 text-sm">
                      {meal.protein}g / {meal.carbs}g / {meal.fat}g
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">
                      {new Date(meal.date).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleDeleteMeal(meal.id)}
                        className="text-gray-500 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Meal Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">Log New Meal</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-white">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddMeal} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Meal Name</label>
                <input
                  required
                  type="text"
                  placeholder="e.g., Grilled Chicken Salad"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newMeal.name}
                  onChange={e => setNewMeal({...newMeal, name: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Calories (kcal)</label>
                  <input
                    required
                    type="number"
                    placeholder="0"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newMeal.calories}
                    onChange={e => setNewMeal({...newMeal, calories: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Protein (g)</label>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newMeal.protein}
                    onChange={e => setNewMeal({...newMeal, protein: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Carbs (g)</label>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newMeal.carbs}
                    onChange={e => setNewMeal({...newMeal, carbs: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Fat (g)</label>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newMeal.fat}
                    onChange={e => setNewMeal({...newMeal, fat: e.target.value})}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 mt-4"
              >
                <Save size={20} /> Save Meal
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
