import type { SukariReading } from './schema';
export function summarize(list: SukariReading[]): string {
  if (!list.length) return 'Start checking glucose twice a day.';
  const fasting = list.filter((r) => r.context === 'fasting');
  const hypos = list.filter((r) => r.hypo).length;
  const parts: string[] = [];
  if (fasting.length) {
    const avg = fasting.reduce((s, r) => s + r.glucose_mmol, 0) / fasting.length;
    if (avg > 8) parts.push(`Average fasting ${avg.toFixed(1)} — above target (4-7).`);
    else if (avg < 4) parts.push(`Average fasting ${avg.toFixed(1)} — below target. Hypos are possible.`);
    else parts.push(`Average fasting ${avg.toFixed(1)} — within target.`);
  }
  if (hypos >= 2) parts.push(`${hypos} hypos recently — talk to a doctor about lowering the dose.`);
  return parts.join(' ');
}
