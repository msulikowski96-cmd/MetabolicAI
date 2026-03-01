/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Gender = 'male' | 'female';

export type ActivityLevel = 
  | 'sedentary' 
  | 'lightly_active' 
  | 'moderately_active' 
  | 'very_active' 
  | 'extra_active';

export interface UserProfile {
  age: number;
  gender: Gender;
  height: number; // in cm
  weight: number; // in kg
  activityLevel: ActivityLevel;
}

export interface Measurement {
  id: string;
  date: string;
  weight: number;
  bmi: number;
  bmr: number;
  tdee: number;
}

export const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  lightly_active: 1.375,
  moderately_active: 1.55,
  very_active: 1.725,
  extra_active: 1.9,
};

export const ACTIVITY_LABELS: Record<ActivityLevel, string> = {
  sedentary: 'Siedzący (brak ćwiczeń)',
  lightly_active: 'Lekko aktywny (1-3 dni/tydz)',
  moderately_active: 'Umiarkowanie aktywny (3-5 dni/tydz)',
  very_active: 'Bardzo aktywny (6-7 dni/tydz)',
  extra_active: 'Ekstra aktywny (fizyczna praca + trening)',
};
