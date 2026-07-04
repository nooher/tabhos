import type { MtotoReading } from './schema';
export function summarize(list: MtotoReading[]): string {
  if (!list.length) return 'Start tracking milestones and immunisations.';
  const last = list[0];
  if (last.sdq_total && last.sdq_total >= 17) return 'SDQ high — consider a behavioural assessment.';
  return `A ${last.age_months}-month-old with ${last.milestones.length} milestones. Keep attending RCH.`;
}
