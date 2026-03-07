export type UnitSystem = 'metric' | 'imperial';

export function kgToLbs(kg: number): number {
  return Number((kg * 2.20462).toFixed(1));
}

export function lbsToKg(lbs: number): number {
  return Number((lbs / 2.20462).toFixed(1));
}

export function cmToFtIn(cm: number): { ft: number; in: number } {
  const totalInches = cm / 2.54;
  const ft = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return { ft, in: inches };
}

export function ftInToCm(ft: number, inches: number): number {
  return Math.round((ft * 12 + inches) * 2.54);
}

export function formatWeight(weight: number, system: UnitSystem): string {
  if (system === 'metric') {
    return `${weight} kg`;
  }
  return `${kgToLbs(weight)} lbs`;
}

export function formatHeight(height: number, system: UnitSystem): string {
  if (system === 'metric') {
    return `${height} cm`;
  }
  const { ft, in: inches } = cmToFtIn(height);
  return `${ft}'${inches}"`;
}
