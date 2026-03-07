import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../utils';

interface StatCardProps {
  label: string;
  value: string;
  subValue?: string;
  icon?: React.ReactNode;
  trend?: number;
  className?: string;
}

export default function StatCard({ label, value, subValue, icon, trend, className }: StatCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className={cn(
        "bg-white rounded-2xl p-6 shadow-sm border border-zinc-100 relative overflow-hidden",
        className
      )}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-zinc-50 rounded-xl text-zinc-900">
          {icon}
        </div>
        {trend !== undefined && (
          <div className={cn(
            "text-xs font-medium px-2 py-1 rounded-full",
            trend > 0 ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"
          )}>
            {trend > 0 ? '+' : ''}{trend}
          </div>
        )}
      </div>
      
      <div>
        <p className="text-sm font-medium text-zinc-500 mb-1">{label}</p>
        <h3 className="text-2xl font-semibold text-zinc-900 tracking-tight">{value}</h3>
        {subValue && (
          <p className="text-xs text-zinc-400 mt-2 font-medium">
            {subValue}
          </p>
        )}
      </div>
    </motion.div>
  );
}
