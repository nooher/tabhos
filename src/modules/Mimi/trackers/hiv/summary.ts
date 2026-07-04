import type { HivReading } from './schema';
export function summarize(list: HivReading[]): string {
  if (!list.length) return 'Tracking hasn’t started yet. Log daily — adherence is everything.';
  const adh = list.filter((l) => l.art_taken).length / list.length;
  const lastVL = list.find((l) => l.viral_load !== undefined)?.viral_load;
  const parts: string[] = [];
  if (adh >= 0.95) parts.push('Adherence of 95%+ — excellent, U=U is achievable.'); else parts.push('Adherence below 95% — viral load may rise.');
  if (lastVL !== undefined) parts.push(lastVL < 50 ? `Undetectable viral load (${lastVL}) — great.` : `Viral load ${lastVL} — speak with your CTC for review.`);
  return parts.join(' ');
}
