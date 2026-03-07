import { UserProfile, ACTIVITY_MULTIPLIERS } from '../types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateBMI(weight: number, height: number): number {
  const heightInMeters = height / 100;
  return Number((weight / (heightInMeters * heightInMeters)).toFixed(1));
}

export function calculateBMR(profile: UserProfile): number {
  const { weight, height, age, gender } = profile;
  // Mifflin-St Jeor Equation
  if (gender === 'male') {
    return Math.round(10 * weight + 6.25 * height - 5 * age + 5);
  } else {
    return Math.round(10 * weight + 6.25 * height - 5 * age - 161);
  }
}

export function calculateTDEE(bmr: number, activityLevel: UserProfile['activityLevel']): number {
  return Math.round(bmr * ACTIVITY_MULTIPLIERS[activityLevel]);
}

export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return 'Niedowaga';
  if (bmi < 25) return 'Waga prawidłowa';
  if (bmi < 30) return 'Nadwaga';
  return 'Otyłość';
}

export function getBMICategoryColor(bmi: number): string {
  if (bmi < 18.5) return 'text-blue-500';
  if (bmi < 25) return 'text-green-500';
  if (bmi < 30) return 'text-yellow-500';
  return 'text-red-500';
}
