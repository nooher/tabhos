import type { BidiiReading } from './schema';
export function summarize(list: BidiiReading[]): string {
  if (!list.length) return 'Aim for 7,000 steps a day and 7 hours of sleep.';
  const avgSteps = list.reduce((s, r) => s + r.steps, 0) / list.length;
  if (avgSteps >= 7000) return `Average steps ${avgSteps.toFixed(0)} — great.`;
  return `Average steps ${avgSteps.toFixed(0)} — aim for 7,000.`;
}
