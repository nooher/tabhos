import type { MimbaReading } from './schema';
export function summarize(list: MimbaReading[]): string {
  if (!list.length) return 'Start counting your baby’s movements from week 18.';
  const last = list[0];
  if (last.trimester === 3 && last.kicks_2h < 10) return 'Kicks under 10 in 2h — go to a maternity clinic.';
  if (last.epds_week && last.epds_week >= 13) return 'EPDS ≥13 — possible perinatal depression. Tell your midwife.';
  return 'Tracking is going well. Keep attending ANC.';
}
