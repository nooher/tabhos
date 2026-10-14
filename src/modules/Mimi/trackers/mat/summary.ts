import type { MatReading } from './schema';

/**
 * What the record says, and what it cannot say.
 *
 * Three outcomes. Days counted, a real nought in words, or nothing recorded
 * yet — and the last of those is not a nought: somebody starting methadone
 * tomorrow has taken nought doses and somebody who never opened the tracker
 * has taken an unknown number, and a line that read "0 of 0" for both would
 * be telling a clinician the wrong thing about the second.
 *
 * Consecutive misses are counted rather than totalled, because that is the
 * number with a clinical meaning: three in a row changes what a safe dose is,
 * and three spread over a month does not.
 */
export function summarize(list: MatReading[]): string {
  if (!list.length) return 'Hakuna dozi iliyorekodiwa bado. Rekodi ya kwanza ni ya kesho.';
  const taken = list.filter((r) => r.taken).length;
  /* The list arrives newest first, so a run from the head is the current run. */
  let run = 0;
  for (const r of list) { if (r.taken) break; run += 1; }
  const head = `Dozi ${taken} kati ya siku ${list.length} zilizorekodiwa.`;
  if (run >= 3) {
    return `${head} Umekosa siku ${run} mfululizo — nenda kliniki kwa tathmini kabla ya kuanza tena. Usijirudishie dozi uliyokosa.`;
  }
  if (run > 0) return `${head} Umekosa siku ${run}. Rudi kesho; usiongeze dozi.`;
  return `${head} Hongera — mfululizo haujakatika.`;
}
