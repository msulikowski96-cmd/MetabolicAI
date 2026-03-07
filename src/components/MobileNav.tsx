import React from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Calculator, 
  History, 
  Utensils, 
  Settings, 
  Sparkles 
} from 'lucide-react';
import { cn } from '../utils';

type Tab = 'dashboard' | 'calculator' | 'history' | 'settings' | 'demo' | 'calories';

interface MobileNavProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export default function MobileNav({ activeTab, setActiveTab }: MobileNavProps) {
  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Home' },
    { id: 'calories', icon: Utensils, label: 'Dieta' },
    { id: 'calculator', icon: Calculator, label: 'Kalk' },
    { id: 'history', icon: History, label: 'Historia' },
    { id: 'settings', icon: Settings, label: 'Profil' },
  ] as const;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-100 px-6 py-2 pb-safe z-50 md:hidden">
      <div className="flex justify-between items-center">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as Tab)}
            className="flex flex-col items-center gap-1 p-2 relative group"
          >
            <div className={cn(
              "p-1.5 rounded-xl transition-colors duration-200",
              activeTab === item.id 
                ? "bg-zinc-900 text-white" 
                : "text-zinc-400 group-hover:text-zinc-600"
            )}>
              <item.icon size={20} strokeWidth={activeTab === item.id ? 2.5 : 2} />
            </div>
            <span className={cn(
              "text-[10px] font-medium transition-colors duration-200",
              activeTab === item.id ? "text-zinc-900" : "text-zinc-400"
            )}>
              {item.label}
            </span>
            {activeTab === item.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute -top-2 w-1 h-1 bg-zinc-900 rounded-full"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
