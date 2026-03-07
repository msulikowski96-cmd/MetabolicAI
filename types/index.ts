export type Gender = 'male' | 'female';
export type ActivityLevel = 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'super_active';

export interface UserProfile {
  age: number;
  gender: Gender;
  height: number; // cm
  weight: number; // kg
  activityLevel: ActivityLevel;
  targetWeight?: number; // kg
}

export interface Measurement {
  id: string;
  date: string;
  weight: number;
  height: number;
  bmi: number;
  notes?: string;
}

export const ACTIVITY_LABELS: Record<ActivityLevel, string> = {
  sedentary: 'Siedzący tryb życia (brak ćwiczeń)',
  lightly_active: 'Lekka aktywność (ćwiczenia 1-3 razy w tygodniu)',
  moderately_active: 'Umiarkowana aktywność (ćwiczenia 3-5 razy w tygodniu)',
  very_active: 'Duża aktywność (ćwiczenia 6-7 razy w tygodniu)',
  super_active: 'Bardzo duża aktywność (praca fizyczna, treningi 2x dziennie)',
};

export const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  lightly_active: 1.375,
  moderately_active: 1.55,
  very_active: 1.725,
  super_active: 1.9,
};
