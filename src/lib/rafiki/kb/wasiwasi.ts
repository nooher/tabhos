// kb/wasiwasi.ts — Anxiety / GAD / Panic (mhGAP OTH module + WHO PM+).

import type { KbEntry } from './types';
import { KB_SOURCES as S } from './types';

export const WASIWASI_ENTRIES: KbEntry[] = [
  {
    id: 'anx-what-is',
    domain: 'wasiwasi',
    questions_sw: [
      'wasiwasi ni nini',
      'hofu nyingi',
      'anxiety ni nini',
    ],
    questions_en: ['what is anxiety', 'explain gad'],
    answer_sw:
      'Wasiwasi ni hisia ya kawaida — lakini ukiwa wa muda mrefu (miezi 6+) na kuvuruga maisha, ni Wasiwasi wa Jumla (GAD). Dalili: mawazo yanayozunguka, moyo kupiga haraka, kushindwa kulala, misuli kukaza, kusumbuka kuhusu mambo mengi.',
    answer_en:
      'Anxiety is a normal feeling — but when prolonged (≥6 months) and disrupting life, it is Generalised Anxiety Disorder (GAD). Symptoms: racing thoughts, fast heart, poor sleep, muscle tension, worrying about many things.',
    citations: [`${S.MHGAP} — OTH (Anxiety)`],
    followups: ['Nipime GAD-7', 'Nipe stadi ya kupumua'],
    routing: 'self_help',
  },
  {
    id: 'anx-gad7-intro',
    domain: 'wasiwasi',
    questions_sw: ['gad-7', 'gad7', 'nipime wasiwasi'],
    questions_en: ['gad-7', 'anxiety screen'],
    answer_sw:
      'GAD-7 ni maswali 7 kuhusu wiki mbili zilizopita. Alama 0–4 kawaida; 5–9 nyepesi; 10–14 wastani; 15–21 nzito. Alama ≥10 inaonyesha kuwa GAD inaweza kuwepo — daktari atakupima zaidi.',
    answer_en:
      'GAD-7 is 7 items about the past 2 weeks. Score 0–4 minimal; 5–9 mild; 10–14 moderate; 15–21 severe. ≥10 suggests probable GAD — a clinician will assess further.',
    citations: ['GAD-7 (Spitzer 2006)', `${S.MHGAP}`],
    routing: 'self_help',
  },
  {
    id: 'anx-panic-attack',
    domain: 'wasiwasi',
    questions_sw: [
      'shambulizi la hofu',
      'panic attack',
      'moyo unapiga kana kwamba ninakufa',
      'pumzi kushindikana ghafla',
    ],
    questions_en: [
      'panic attack',
      'heart racing think dying',
    ],
    answer_sw:
      'Shambulizi la hofu (panic attack): moyo kupiga sana, pumzi kushindikana, kizunguzungu, hofu ya kufa. Dakika 10–20 huisha lenyewe. SI hatari kwa moyo — ni mfumo wa neva kuamka kupita kiasi. Stadi: pumua kwa kina 4-7-8, taja vitu 5 unavyoona karibu nawe (grounding).',
    answer_en:
      'Panic attack: racing heart, shortness of breath, dizziness, fear of dying. Resolves in 10–20 minutes. NOT a heart attack — it is the nervous system over-firing. Skills: 4-7-8 breathing, name 5 things you see (grounding).',
    citations: [`${S.MHGAP} — Panic`, 'WHO PM+'],
    followups: ['Fundisha 4-7-8', 'Lini panic ni dharura ya kweli?'],
    routing: 'self_help',
  },
  {
    id: 'anx-panic-vs-heart',
    domain: 'wasiwasi',
    questions_sw: [
      'panic au shambulizi la moyo',
      'jinsi ya kutofautisha panic na heart attack',
    ],
    questions_en: ['panic vs heart attack'],
    answer_sw:
      'Panic huja kwa dakika 10–20 na hupotea peke yake; mara nyingi na hofu ya kufa, hisia za "kuruka" kwenye kifua. Shambulizi la moyo: maumivu yanayoshukia mkono wa kushoto, jasho jingi, kichefuchefu, dalili haziondoki haraka. Ikiwa una shaka — nenda hospitali. Vipi salama kuliko kujuta.',
    answer_en:
      'Panic peaks in 10–20 min and resolves; often with fear of dying, fluttering chest. Heart attack: pain radiating to left arm, heavy sweating, nausea, not resolving. If unsure — go to hospital. Better safe than sorry.',
    citations: [`${S.MHGAP} — Panic Differential`],
    routing: 'provider_referral',
  },
  {
    id: 'anx-breathing-478',
    domain: 'wasiwasi',
    questions_sw: [
      'kupumua kwa kina',
      'fundisha kupumua',
      '4-7-8',
      'pumzi ya kutuliza',
    ],
    questions_en: ['breathing exercise', 'how to breathe to calm'],
    answer_sw:
      'Stadi ya 4-7-8: 1) Pumua ndani kupitia pua hesabu nne, 2) Shikilia hewa hesabu saba, 3) Toa polepole kupitia mdomo hesabu nane. Rudia mara 4. Hii inashusha mfumo wa "fight-or-flight". Tumia wakati wowote moyo unapiga kwa kasi.',
    answer_en:
      '4-7-8 skill: 1) Inhale through nose for 4, 2) Hold for 7, 3) Exhale slowly through mouth for 8. Repeat 4 times. This calms fight-or-flight. Use it whenever your heart is racing.',
    citations: ['t-CBT', 'WHO PM+'],
    routing: 'self_help',
  },
  {
    id: 'anx-grounding-54321',
    domain: 'wasiwasi',
    questions_sw: [
      'grounding',
      'kushusha hisia',
      'najisikia kupotea',
      'najisikia siyo hapa',
    ],
    questions_en: ['grounding', 'feel disconnected'],
    answer_sw:
      'Stadi ya 5-4-3-2-1: Taja 5 unavyoona, 4 unavyovigusa, 3 unavyovisikia, 2 unavyovinukia, 1 unaonja. Hii inarudisha akili "hapa na sasa". Faida zaidi: weka miguu kwenye sakafu, sikia ardhi.',
    answer_en:
      '5-4-3-2-1: name 5 things you see, 4 you touch, 3 you hear, 2 you smell, 1 you taste. Brings the mind to "here and now". Bonus: feel the floor under your feet.',
    citations: ['Trauma-informed grounding', `${S.MHGAP}`],
    routing: 'self_help',
  },
  {
    id: 'anx-treatment-mild',
    domain: 'wasiwasi',
    questions_sw: [
      'wasiwasi tiba',
      'gad treatment tanzania',
      'matibabu ya hofu',
    ],
    questions_en: ['gad treatment', 'anxiety treatment'],
    answer_sw:
      'Wasiwasi nyepesi-wastani: tiba ya mazungumzo (CBT, PM+) kwanza. Stadi kuu: kupumua, kutambua mawazo ya kuzunguka, kuwekewa wakati maalum wa kuwaza, kuepuka pombe na kafiyini. Dawa kama fluoxetine au sertraline husaidia ikiwa hali ni nzito au ya kuendelea.',
    answer_en:
      'Mild–moderate anxiety: talk therapy first (CBT, PM+). Core skills: breathing, naming circling thoughts, scheduled "worry time", avoiding alcohol and caffeine. SSRIs (fluoxetine, sertraline) help if severe or persistent.',
    citations: [`${S.MHGAP} — OTH`, 'WHO PM+'],
    routing: 'self_help',
  },
  {
    id: 'anx-benzo-warning',
    domain: 'wasiwasi',
    questions_sw: [
      'diazepam kwa wasiwasi',
      'valium kwa hofu',
      'benzo wasiwasi',
    ],
    questions_en: ['diazepam anxiety', 'benzodiazepines'],
    answer_sw:
      'Diazepam (Valium) na dawa zinazofanana hutuliza haraka — lakini huleta utegemezi ndani ya wiki 2–4. Hutumika kwa muda mfupi tu (chini ya wiki 2–4) na chini ya daktari. Si tiba ya muda mrefu wa GAD. Acha taratibu — usisimame ghafla.',
    answer_en:
      'Diazepam (Valium) and similar drugs calm quickly — but cause dependence within 2–4 weeks. Use only short term (under 2–4 weeks) and under a clinician. Not a long-term treatment for GAD. Taper — do not stop abruptly.',
    citations: [`${S.MHGAP} — Caution Benzo`],
    routing: 'provider_referral',
    red_flags: ['withdrawal'],
  },
  {
    id: 'anx-social-phobia',
    domain: 'wasiwasi',
    questions_sw: [
      'naogopa kuongea na watu',
      'social anxiety',
      'naogopa watu wengi',
    ],
    questions_en: ['social anxiety', 'fear of speaking'],
    answer_sw:
      'Hofu ya kuongea hadharani au mbele ya watu ni ya kawaida. Inakuwa shida ikizuia kazi, shule, mahusiano. Tiba: kufichua taratibu (exposure) — anza na hatua ndogo, kupumua kabla, kuandaa kile cha kusema. Inawezekana kushinda.',
    answer_en:
      'Fear of public speaking or social situations is common. It becomes a disorder when it blocks work, school, relationships. Treatment: graded exposure — start small, breathe before, prepare what to say. It can be overcome.',
    citations: [`${S.MHGAP}`, 'CBT — Social Anxiety'],
    routing: 'self_help',
  },
  {
    id: 'anx-health-anxiety',
    domain: 'wasiwasi',
    questions_sw: [
      'naogopa nina ugonjwa',
      'kila wakati nadhani nina kansa',
      'health anxiety',
    ],
    questions_en: ['health anxiety', 'hypochondria'],
    answer_sw:
      'Kuogopa kuwa una ugonjwa mzito licha ya vipimo vya kuhakikisha ni "afya-wasiwasi". Husababisha kutembelea madaktari mara nyingi. Tiba: kupunguza tabia ya kuangalia mwili kila wakati, kuepuka "Dr. Google", kufuata daktari mmoja anayekuaminisha.',
    answer_en:
      'Persistent fear of serious illness despite reassuring tests is "health anxiety". Causes repeated doctor visits. Treatment: reduce body-checking, avoid "Dr. Google", stick with one trusted clinician.',
    citations: [`${S.MHGAP}`, 'CBT-Health Anxiety'],
    routing: 'self_help',
  },
  {
    id: 'anx-worry-time',
    domain: 'wasiwasi',
    questions_sw: [
      'mawazo yanayozunguka',
      'siwezi kuacha kuwaza',
      'worry time',
    ],
    questions_en: ['cant stop worrying'],
    answer_sw:
      'Stadi ya "wakati wa wasiwasi": chagua dakika 15 kila siku (mfano saa 12 jioni) — hiyo tu ndiyo wakati wa kuwaza. Wakati mwingine ukiwaza, andika tu kwenye karatasi: "Nitakuwaza saa 12". Akili hujifunza kushikilia.',
    answer_en:
      '"Worry time" skill: pick a fixed 15 minutes each day (e.g. 6 pm) — that is the only time to worry. Outside it, when worries come, just note them on paper: "I will think about this at 6". The mind learns to hold off.',
    citations: ['CBT', 'WHO PM+'],
    routing: 'self_help',
  },
];
