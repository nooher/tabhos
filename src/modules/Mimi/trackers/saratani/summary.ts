import type { SarataniReading } from './schema';
export function summarize(list: SarataniReading[]): string {
  if (!list.length) return 'Log symptoms daily so your clinician can adjust chemo.';
  const vas = list.reduce((s, r) => s + r.pain_vas, 0) / list.length;
  const parts: string[] = [];
  if (vas >= 7) parts.push('Severe pain — talk to your clinician about palliative pain control.');
  else if (vas >= 4) parts.push('Moderate pain — use step-2 analgesia.');
  const ec = list[0]?.ecog ?? 0;
  if (ec >= 3) parts.push('ECOG high — consider adjusting the chemo plan.');
  if (!parts.length) parts.push('Symptoms are understood. Keep logging.');
  return parts.join(' ');
}
