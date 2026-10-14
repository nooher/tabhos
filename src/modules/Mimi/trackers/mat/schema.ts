import type { Reading } from '../types';

/**
 * One day of medication-assisted treatment.
 *
 * `dose_mg` is the dose the clinic gave, recorded, never suggested: this
 * estate's rule is that it displays a dose a clinician prescribed and never
 * calculates one, and methadone is the medicine where that rule earns its
 * keep. `taken` false with a reason is the entry that matters most — three
 * consecutive misses means tolerance can no longer be assumed, and
 * `lib/uraibu/matibabu.ts` carries why.
 */
export interface MatReading extends Reading {
  /** The dose in milligrams, as the clinic set it. */
  dose_mg: number;
  /** Whether it was actually taken that day. */
  taken: boolean;
  /** Why not, when it was missed. Free text, in the person's words. */
  missed_why?: string;
  /** Where: at the clinic under supervision, or a take-home dose. */
  place: 'kliniki' | 'nyumbani';
  /** Which centre, from MAT_CENTRES. */
  centre?: string;
  /** Craving 0-10 that day, so the dose and the craving can be read together. */
  craving: number;
  note?: string;
}
