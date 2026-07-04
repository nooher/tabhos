import type { ShinikizoReading } from './schema';
export function summarize(list: ShinikizoReading[]): string {
  if (!list.length) return 'Measure BP once a day, in the morning, before medication.';
  const avgS = list.reduce((s, r) => s + r.sbp, 0) / list.length;
  const avgD = list.reduce((s, r) => s + r.dbp, 0) / list.length;
  if (avgS >= 160 || avgD >= 100) return `Average BP ${avgS.toFixed(0)}/${avgD.toFixed(0)} — very high. Contact a doctor soon.`;
  if (avgS >= 140 || avgD >= 90) return `Average BP ${avgS.toFixed(0)}/${avgD.toFixed(0)} — above target (<140/90).`;
  return `Average BP ${avgS.toFixed(0)}/${avgD.toFixed(0)} — within target. Keep going.`;
}
