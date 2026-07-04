import type { MaumivuReading } from './schema';
export function summarize(list: MaumivuReading[]): string {
  if (!list.length) return 'Log pain as it happens to spot a pattern.';
  const avg = list.reduce((s, r) => s + r.vas, 0) / list.length;
  if (avg >= 7) return `Average ${avg.toFixed(1)} — severe. Talk to a doctor about analgesia.`;
  if (avg >= 4) return `Average ${avg.toFixed(1)} — moderate. Identify triggers.`;
  return `Average ${avg.toFixed(1)} — mild. Keep going.`;
}
