// kb/ulevi.ts — Substance use (mhGAP SUB module).
// Tanzania focus: alcohol (commonest), cannabis, opioids (heroin Dar/coast).

import type { KbEntry } from './types';
import { KB_SOURCES as S } from './types';

export const ULEVI_ENTRIES: KbEntry[] = [
  {
    id: 'sub-alcohol-when-problem',
    domain: 'ulevi',
    questions_sw: [
      'naunywa sana pombe',
      'pombe imekuwa shida',
      'lini pombe ni shida',
    ],
    questions_en: [
      'am i drinking too much',
      'alcohol problem',
    ],
    answer_sw:
      'Pombe ni shida ukiwa: unataka kupunguza lakini hushindwi, watu wanasumbuka, unahisi hatia, unaanza siku kwa kinywaji ("eye-opener"). AUDIT ni tathmini fupi — alama ≥8 inaonyesha hatari. Hii inatibika.',
    answer_en:
      'Alcohol is a problem if: you want to cut down but cannot, others are worried, you feel guilty, you need an "eye-opener" to start the day. AUDIT is a brief screen — ≥8 indicates risk. This is treatable.',
    citations: [`${S.MHGAP} — SUB`, 'AUDIT (Babor 2001)'],
    followups: ['Nipime AUDIT', 'Naweza kuachaje pombe?'],
    routing: 'self_help',
  },
  {
    id: 'sub-alcohol-withdrawal-danger',
    domain: 'ulevi',
    questions_sw: [
      'nikiacha pombe ghafla',
      'kutetemeka baada ya kuacha pombe',
      'alcohol withdrawal',
      'delirium tremens',
    ],
    questions_en: ['alcohol withdrawal'],
    answer_sw:
      'Kuacha pombe ghafla baada ya kunywa kwa muda mrefu na kwa wingi ni HATARI — kunaweza kuleta degedege au delirium tremens (kuchafuka, kutetemeka, kuona vitu). Hii ni dharura ya hospitali. Usisimame mwenyewe — onana na daktari kwa msaada salama.',
    answer_en:
      'Stopping alcohol abruptly after heavy long-term use is DANGEROUS — can cause seizures or delirium tremens (confusion, tremor, hallucinations). A hospital emergency. Do not stop alone — see a clinician for safe detoxification.',
    citations: [`${S.MHGAP} — SUB Withdrawal`],
    routing: 'provider_referral',
    red_flags: ['withdrawal'],
  },
  {
    id: 'sub-alcohol-detox-tanzania',
    domain: 'ulevi',
    questions_sw: [
      'kuacha pombe kwa msaada',
      'detox pombe tanzania',
      'matibabu ya pombe',
    ],
    questions_en: ['alcohol detox tanzania'],
    answer_sw:
      'Detox salama ya pombe hufanyika hospitalini — diazepam hutumika kwa siku 5–7 kushusha mwili. Baada ya hapo: ushauri (CBT, MI), familia, msaada wa kijamii (AA — Alcoholics Anonymous ipo Dar/Arusha). Dawa ya naltrexone husaidia kuzuia kurudia.',
    answer_en:
      'Safe alcohol detox happens in hospital — diazepam for 5–7 days to stabilise. After: counselling (CBT, MI), family, community support (AA exists in Dar/Arusha). Naltrexone medication helps prevent relapse.',
    citations: [`${S.MHGAP} — SUB Treatment`],
    routing: 'provider_referral',
  },
  {
    id: 'sub-audit-intro',
    domain: 'ulevi',
    questions_sw: ['audit ya pombe', 'tathmini ya pombe'],
    questions_en: ['audit alcohol screen'],
    answer_sw:
      'AUDIT ina maswali 10 kuhusu unywaji wako mwaka uliopita. 0–7 ni hatari ndogo; 8–15 hatari ya kati (mshauri); 16–19 hatari kubwa; 20+ utegemezi. Hata 8 ni ishara ya kupunguza.',
    answer_en:
      'AUDIT is 10 questions about the past year. 0–7 low risk; 8–15 medium (counsel); 16–19 high; 20+ likely dependence. Even 8 is a signal to cut back.',
    citations: ['AUDIT (Babor 2001)', `${S.MHGAP}`],
    routing: 'self_help',
  },
  {
    id: 'sub-cannabis-bangi',
    domain: 'ulevi',
    questions_sw: [
      'bangi ni hatari',
      'bangi athari',
      'cannabis tanzania',
    ],
    questions_en: ['cannabis effects', 'bangi'],
    answer_sw:
      'Bangi (cannabis) ni kinyume cha sheria Tanzania. Hatari: kuongeza hatari ya saikosi (haswa kwa vijana), kushuka kwa kumbukumbu, msongo wa kuendelea, na utegemezi. Acha ni rahisi zaidi ukiwa peke yako kuliko kwa kundi linalovuta — badilisha mazingira.',
    answer_en:
      'Cannabis is illegal in Tanzania. Risks: increased psychosis risk (especially in youth), memory decline, ongoing anxiety, dependence. Quitting is easier alone than in a using peer group — change the environment.',
    citations: [`${S.MHGAP} — SUB`, 'Tanzania DCEA'],
    routing: 'self_help',
  },
  {
    id: 'sub-heroin-mat',
    domain: 'ulevi',
    questions_sw: [
      'heroini tanzania',
      'methadone tanzania',
      'mat clinic',
      'unga',
    ],
    questions_en: ['heroin tanzania', 'methadone clinic'],
    answer_sw:
      'Tanzania ina kliniki za Methadone (MAT) — Muhimbili, Mwananyamala, Temeke, Mbeya, Mwanza. Methadone ni dawa ya kuokoa maisha kwa watu wanaotumia heroini — inashusha hamu na kuzuia withdrawal. Kliniki ni za bure. Ni huduma, si hukumu.',
    answer_en:
      'Tanzania has Methadone (MAT) clinics — Muhimbili, Mwananyamala, Temeke, Mbeya, Mwanza. Methadone is a life-saving medication for heroin users — reduces cravings and prevents withdrawal. Clinics are free. This is care, not judgment.',
    citations: [`${S.HSSP5}`, 'Tanzania MAT Programme'],
    routing: 'provider_referral',
  },
  {
    id: 'sub-opioid-overdose',
    domain: 'ulevi',
    questions_sw: [
      'overdose ya unga',
      'overdose ya heroini',
      'naloxone',
    ],
    questions_en: ['opioid overdose', 'naloxone'],
    answer_sw:
      'Overdose ya opioidi (heroini, tramadol): kupumua polepole sana, mdomo bluu, kushindwa kuamka. NI DHARURA — piga 112. Naloxone ndio dawa ya kupinga — ipo kwenye kliniki za MAT. Wakati ukimsubiri msaada: mlaze upande, mthibitishe anapumua.',
    answer_en:
      'Opioid overdose (heroin, tramadol): very slow breathing, blue lips, cannot wake. AN EMERGENCY — call 112. Naloxone reverses it — available at MAT clinics. While waiting for help: place them on their side, check breathing.',
    citations: [`${S.MHGAP} — SUB Overdose`, 'WHO Naloxone'],
    routing: 'crisis_path',
    red_flags: ['withdrawal'],
  },
  {
    id: 'sub-stages-change',
    domain: 'ulevi',
    questions_sw: [
      'hatua za kuacha pombe',
      'hatua za mabadiliko',
      'sijui niache au la',
    ],
    questions_en: ['stages of change', 'ambivalent about quitting'],
    answer_sw:
      'Hatua za mabadiliko: 1) Kutofikiri — bado huelewi tatizo, 2) Kufikiri — unaona faida na hasara, 3) Kujiandaa — unapanga tarehe, 4) Kutenda — unaacha, 5) Kuendeleza — wiki na miezi baada. Hata kufikiria tu ni hatua ya kweli. Wewe uko wapi?',
    answer_en:
      'Stages of change: 1) Pre-contemplation — not yet seeing it, 2) Contemplation — weighing pros and cons, 3) Preparation — picking a date, 4) Action — quitting, 5) Maintenance — weeks and months after. Just thinking about it is a real step. Where are you?',
    citations: ['Prochaska & DiClemente', 'WHO ASSIST/SBIRT'],
    routing: 'self_help',
  },
  {
    id: 'sub-family-help-drinker',
    domain: 'ulevi',
    questions_sw: [
      'mume wangu anaunywa pombe sana',
      'mtoto wangu anatumia bangi',
      'jinsi ya kumsaidia mlevi',
    ],
    questions_en: [
      'husband drinks too much',
      'helping a drinker',
    ],
    answer_sw:
      'Usiingie kwenye ugomvi akiwa amelewa. Ongea wakati mwenye akili timamu. Eleza athari unazoona bila kushtumu ("Nimeona unalala mapema, sijawahi kukuona umechoka hivi"). Pendekeza kuona daktari — usitoe maagizo. Familia inaweza kupata msaada Al-Anon.',
    answer_en:
      'Do not argue when they are drunk. Talk when they are sober. Describe effects you see without blaming ("I noticed you sleep early, I have not seen you this tired"). Suggest a clinician — do not order. Family can find support in Al-Anon.',
    citations: ['CRAFT (Community Reinforcement and Family Training)', `${S.MHGAP}`],
    routing: 'self_help',
  },
  {
    id: 'sub-relapse-normal',
    domain: 'ulevi',
    questions_sw: [
      'nimerudi kunywa baada ya kuacha',
      'nimeshindwa kuacha pombe',
      'relapse',
    ],
    questions_en: ['relapse alcohol', 'started drinking again'],
    answer_sw:
      'Kurudia ni sehemu ya kawaida ya safari — si kushindwa. Watu wengi huacha mara 3–5 kabla ya kuacha kabisa. Kila kurudia kuna funzo: nini kilichokichocheza? Mazingira gani? Hisia gani? Anza tena leo — usisubiri Jumatatu, tarehe 1, au mwaka ujao.',
    answer_en:
      'Relapse is a normal part of the journey — not failure. Most people quit 3–5 times before lasting recovery. Each lapse teaches: what triggered it? What setting? What feeling? Start again today — do not wait for Monday, the 1st, or next year.',
    citations: ['Marlatt — Relapse Prevention', `${S.MHGAP}`],
    routing: 'self_help',
  },
];
