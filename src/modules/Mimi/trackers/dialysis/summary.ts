import type { DialysisReading } from './schema';

export function summarize(list: DialysisReading[]): string {
  if (!list.length) return 'No session recorded yet. Log every session — pre/post weight and BP.';
  const k = list.filter((r) => r.k_mmol).map((r) => r.k_mmol as number);
  const phos = list.filter((r) => r.phos_mmol).map((r) => r.phos_mmol as number);
  const avgK = k.length ? k.reduce((a, b) => a + b, 0) / k.length : 0;
  const avgPhos = phos.length ? phos.reduce((a, b) => a + b, 0) / phos.length : 0;
  const parts: string[] = [];
  if (avgK > 5.5) parts.push('Potassium is high — cut back on bananas, tomatoes, coconut.');
  if (avgPhos > 5) parts.push('Phosphorus is high — remember phosphate binders with meals.');
  if (!parts.length) parts.push('Results are within target. Keep going.');
  return parts.join(' ');
}
