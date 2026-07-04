import type { DawaReading } from './schema';

export function summarize(list: DawaReading[]): string {
  if (!list.length) return 'No medication recorded yet.';
  const adherence = list.filter((l) => l.taken).length / list.length;
  if (adherence >= 0.95) return 'Your adherence is excellent. Keep it up — viral suppression/control depends on this.';
  if (adherence >= 0.85) return 'Your adherence is good. Aim to take every dose at the same time each day.';
  if (adherence >= 0.7) return 'Adherence could improve. Set a phone reminder and ask your companion for tips.';
  return 'Adherence is low — this can affect your health. Talk to your provider soon.';
}
