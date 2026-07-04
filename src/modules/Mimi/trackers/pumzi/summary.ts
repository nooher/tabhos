import type { PumziReading } from './schema';
export function summarize(list: PumziReading[]): string {
  if (!list.length) return 'Five minutes of breathing a day builds emotional resilience.';
  const min = list.reduce((s, r) => s + r.minutes, 0);
  if (min >= 35) return `You’ve done ${min} minutes of breathing this week — great.`;
  return `${min} minutes of breathing this week — aim for 5 minutes a day.`;
}
