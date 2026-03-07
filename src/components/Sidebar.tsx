import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Calculator, 
  History, 
  Utensils, 
  Settings, 
  Sparkles,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '../utils';

type Tab = 'dashboard' | 'calculator' | 'history' | 'settings' | 'demo' | 'calories';

interface SidebarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  onLogout: () => void;
  userProfile: {
    gender: 'male' | 'female';
    age: number;
    height: number;
    weight: number;
  };
}

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  isCollapsed, 
  setIsCollapsed, 
  onLogout,
  userProfile 
}: SidebarProps) {
  
  const NavButton = ({ id, icon: Icon, label }: { id: Tab, icon: any, label: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
        activeTab === id 
          ? "bg-zinc-900 text-white shadow-md shadow-zinc-900/10" 
          : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
      )}
    >
      <Icon size={20} strokeWidth={activeTab === id ? 2.5 : 2} />
      {!isCollapsed && (
        <span className="font-medium text-sm">{label}</span>
      )}
      {isCollapsed && (
        <div className="absolute left-full ml-2 px-2 py-1 bg-zinc-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
          {label}
        </div>
      )}
    </button>
  );

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      className="hidden md:flex flex-col h-screen sticky top-0 bg-white border-r border-zinc-100 z-40 transition-all duration-300 ease-in-out"
    >
      <div className="p-6 flex items-center justify-between">
        <div className={cn("flex items-center gap-3 overflow-hidden", isCollapsed && "justify-center w-full")}>
          <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center shrink-0">
            <span className="text-white font-serif italic font-bold text-lg">M</span>
          </div>
          {!isCollapsed && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="flex flex-col"
            >
              <span className="font-serif italic font-bold text-lg leading-none">MetabolicAI</span>
              <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-medium">Pro</span>
            </motion.div>
          )}
        </div>
        
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "p-1.5 rounded-lg hover:bg-zinc-50 text-zinc-400 transition-colors absolute -right-3 top-8 bg-white border border-zinc-100 shadow-sm",
            isCollapsed && "rotate-180"
          )}
        >
          <ChevronLeft size={14} />
        </button>
      </div>

      <div className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
        <div className="px-3 py-2">
          <p className={cn("text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2", isCollapsed && "text-center")}>
            {isCollapsed ? "Menu" : "Główne"}
          </p>
          <div className="space-y-1">
            <NavButton id="dashboard" icon={LayoutDashboard} label="Pulpit" />
            <NavButton id="calories" icon={Utensils} label="Dziennik Kalorii" />
            <NavButton id="calculator" icon={Calculator} label="Kalkulator" />
            <NavButton id="history" icon={History} label="Historia Pomiarów" />
          </div>
        </div>

        <div className="px-3 py-2 mt-4">
          <p className={cn("text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2", isCollapsed && "text-center")}>
            {isCollapsed ? "Ustaw." : "Ustawienia"}
          </p>
          <div className="space-y-1">
            <NavButton id="settings" icon={Settings} label="Profil Użytkownika" />
            <NavButton id="demo" icon={Sparkles} label="Tryb Demo" />
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-zinc-100">
        <div className={cn(
          "bg-zinc-50 rounded-2xl p-3 flex items-center gap-3 transition-all",
          isCollapsed ? "justify-center" : ""
        )}>
          <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-zinc-900 font-serif italic text-lg shrink-0 border border-zinc-100">
            {userProfile.gender === 'male' ? 'M' : 'K'}
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-zinc-900 truncate">Twój Profil</p>
              <p className="text-xs text-zinc-500 truncate">{userProfile.age} lat • {userProfile.weight} kg</p>
            </div>
          )}
          {!isCollapsed && (
            <button 
              onClick={onLogout}
              className="p-2 hover:bg-white hover:shadow-sm rounded-lg text-zinc-400 hover:text-red-500 transition-all"
              title="Wyloguj się"
            >
              <LogOut size={16} />
            </button>
          )}
        </div>
        {isCollapsed && (
             <button 
             onClick={onLogout}
             className="w-full mt-2 p-2 hover:bg-red-50 rounded-lg text-zinc-400 hover:text-red-500 transition-all flex justify-center"
             title="Wyloguj się"
           >
             <LogOut size={16} />
           </button>
        )}
      </div>
    </motion.aside>
  );
}
