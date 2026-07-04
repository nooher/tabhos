import type { TamaaReading } from './schema';
export function summarize(list: TamaaReading[]): string {
  if (!list.length) return 'Log cravings, even if you didn’t use. This is an MI skill.';
  const sober = list.filter((r) => r.episodes === 0).length;
  return `${sober}/${list.length} days you didn’t use. Every day is a win. Reflect on the value guiding you.`;
}
