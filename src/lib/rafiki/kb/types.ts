// kb/types.ts — National knowledge-base entry shape for Rafiki.
// Sources: Tanzania Mental Health Act Ch. 98 (2008), WHO mhGAP IG v2.0,
// IASC MHPSS Guidelines, Tanzania HSSP V (2021–26), Jenkins et al. IJMHS.

export type KbDomain =
  | 'sonona'      // depression
  | 'wasiwasi'    // anxiety
  | 'crisis'      // suicide / self-harm
  | 'ulevi'       // substance use
  | 'mama-mtoto'  // perinatal
  | 'watoto'      // children
  | 'vijana'      // adolescents
  | 'wazee'       // elderly
  | 'familia'     // family / caregivers
  | 'imani'       // faith / traditional healing
  | 'mwili'       // somatic / HIV / chronic illness
  | 'mhgap'       // mhGAP modules (general)
  | 'sera'        // policy / programmes
  | 'haki'        // rights / Mental Health Act
  | 'dharura'     // emergency MHPSS
  | 'kiwewe'      // trauma / PTSD
  | 'saikosi'     // psychosis
  | 'mtoa-huduma'; // provider-facing

export type KbRouting =
  | 'crisis_path'
  | 'provider_referral'
  | 'self_help'
  | 'wait_and_see'
  | 'legal_pathway'
  | 'info_only';

export type KbRedFlag =
  | 'suicidality'
  | 'homicidality'
  | 'psychosis'
  | 'pregnancy'
  | 'postpartum'
  | 'child'
  | 'adolescent'
  | 'elderly'
  | 'ipv'
  | 'withdrawal'
  | 'hiv'
  | 'legal_capacity';

export interface KbEntry {
  /** Stable slug, e.g. 'mha-s15-involuntary-admission'. */
  id: string;
  domain: KbDomain;
  /** Swahili matching patterns — natural Tanzania Swahili. */
  questions_sw: string[];
  /** English matching patterns. */
  questions_en: string[];
  /** Answer in natural Tanzania Swahili — ≤ 240 chars. */
  answer_sw: string;
  /** Answer in English — ≤ 240 chars. */
  answer_en: string;
  /** Verifiable citations — e.g. 'Tanzania Mental Health Act Ch.98 (2008) §15'. */
  citations: string[];
  followups?: string[];
  routing?: KbRouting;
  red_flags?: KbRedFlag[];
}

/** Sources canonical labels — reuse exactly when citing. */
export const KB_SOURCES = {
  MHA: 'Tanzania Mental Health Act Ch.98 (2008)',
  MHGAP: 'WHO mhGAP IG v2.0',
  IASC: 'IASC MHPSS Guidelines in Emergency Settings (2007)',
  HSSP5: 'Tanzania HSSP V (2021–2026)',
  JENKINS: 'Jenkins et al., BMC IJMHS — Zanzibar MH Policy (2011)',
  EPDS: 'Cox et al., EPDS (1987) / WHO Perinatal Guide',
  EBMH: 'BMJ Evidence-Based Mental Health (2021)',
  WHO_POLICY: 'WHO Mental Health Policy, Plans & Programmes',
  MNH: 'Muhimbili National Hospital — Psychiatry Dept.',
  MIREMBE: 'Mirembe National Mental Hospital — Dodoma',
} as const;
