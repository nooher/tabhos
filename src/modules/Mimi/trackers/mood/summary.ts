import type { MoodReading } from './schema';
export function summarize(list: MoodReading[]): string {
  if (!list.length) return 'Start a short check-in each evening.';
  const avg = list.reduce((s, r) => s + r.score, 0) / list.length;
  if (avg <= 3) return `Mood is low (avg ${avg.toFixed(1)}). Your companion is with you — consider talking to a professional.`;
  if (avg <= 5) return `Mood is in the middle (avg ${avg.toFixed(1)}). A few small skills each day can help.`;
  return `Mood looks steady (avg ${avg.toFixed(1)}). Keep tracking.`;
}
