// kb/crisis.ts — Suicide, self-harm, safety planning (mhGAP SUI module).
// Tanzania hotlines: Lifeline 0800 110 014, Child 116, Emergency 112.

import type { KbEntry } from './types';
import { KB_SOURCES as S } from './types';

const HOTLINES =
  'Lifeline 0800 110 014 · Msaada wa watoto 116 · Dharura 112';

export const CRISIS_ENTRIES: KbEntry[] = [
  {
    id: 'sui-thoughts-now',
    domain: 'crisis',
    questions_sw: [
      'nataka kufa',
      'najiua',
      'sina sababu ya kuishi',
      'nimechoka maisha',
      'natamani kufa',
    ],
    questions_en: [
      'want to die',
      'kill myself',
      'end my life',
      'no reason to live',
    ],
    answer_sw: `Nakusikia. Mawazo haya ni mazito, na uko salama hapa. Kwa sasa: piga 0800 110 014 — wapo 24/7. Kama una njia ya kujidhuru karibu nawe, omba mtu wa karibu aichukue. Twende hospitali ya karibu pamoja. Maisha yako yana thamani.`,
    answer_en: `I hear you. These thoughts are heavy, and you are safe here. Right now: call Lifeline 0800 110 014 — they are there 24/7. If a means to harm yourself is near, ask someone to take it away. Let us go to the nearest hospital together. Your life matters.`,
    citations: [`${S.MHGAP} — SUI`, 'TZ Lifeline'],
    followups: ['Niko salama kwa sasa', 'Niko peke yangu'],
    routing: 'crisis_path',
    red_flags: ['suicidality'],
  },
  {
    id: 'sui-friend-suicidal',
    domain: 'crisis',
    questions_sw: [
      'rafiki yangu anataka kujiua',
      'mtu wa karibu nami anasema atajidhuru',
      'mwanangu anasema atajiua',
    ],
    questions_en: [
      'friend wants to die',
      'someone is suicidal',
      'son wants to kill himself',
    ],
    answer_sw: `Asante kwa kuwa nao. Hatua: 1) Kaa nao, USIWAACHE peke yao, 2) Sikiliza bila kuhukumu — usiseme "usiwe mjinga", 3) Uliza moja kwa moja: "Una mpango wa kujidhuru?" — kuuliza HAKUONGEZI hatari, 4) Ondoa silaha/dawa karibu, 5) Piga 0800 110 014 au peleka hospitali sasa.`,
    answer_en: `Thank you for being there. Steps: 1) Stay with them, do NOT leave them alone, 2) Listen without judging — do not say "don't be silly", 3) Ask directly: "Do you have a plan to hurt yourself?" — asking does NOT increase risk, 4) Remove weapons/medications nearby, 5) Call Lifeline 0800 110 014 or take them to hospital now.`,
    citations: [`${S.MHGAP} — SUI Family Action`],
    routing: 'crisis_path',
    red_flags: ['suicidality'],
  },
  {
    id: 'sui-cssrs-explainer',
    domain: 'crisis',
    questions_sw: [
      'c-ssrs',
      'tathmini ya hatari ya kujiua',
      'jinsi ya kupima nia ya kujiua',
    ],
    questions_en: ['c-ssrs', 'suicide risk assessment'],
    answer_sw:
      'C-SSRS ni tathmini ya maswali 5: 1) Umewahi kutamani kuwa umelala usimame? 2) Umewahi kutaka kujidhuru? 3) Umefikiria njia? 4) Umepanga njia maalum? 5) Umejaribu? Kuanzia swali la 3 hatari inazidi. Asipojibu salama — peleka mtu hospitali.',
    answer_en:
      'C-SSRS is a 5-question screen: 1) Have you wished you were dead? 2) Have you wanted to hurt yourself? 3) Have you thought of a method? 4) Have you planned a specific method? 5) Have you attempted? From Q3 onwards risk escalates. If not safe — get them to hospital.',
    citations: ['Columbia Suicide Severity Rating Scale', `${S.MHGAP}`],
    routing: 'crisis_path',
    red_flags: ['suicidality'],
  },
  {
    id: 'sui-safety-plan',
    domain: 'crisis',
    questions_sw: [
      'mpango wa usalama',
      'safety plan',
      'jinsi ya kujilinda nikiwa katika hali ya hatari',
    ],
    questions_en: ['safety plan', 'staying safe'],
    answer_sw:
      'Mpango wa usalama una hatua 6: 1) Ishara zangu za onyo (mawazo, hisia), 2) Stadi zangu za kibinafsi (kupumua, kutembea), 3) Watu/maeneo yanayonipa hali nzuri, 4) Watu wa kupiga simu, 5) Wataalamu na hotline 0800 110 014, 6) Kufanya mazingira salama (ondoa silaha/dawa).',
    answer_en:
      'A safety plan has 6 steps: 1) My warning signs (thoughts, feelings), 2) My own coping skills (breathing, walking), 3) People/places that lift me, 4) People I can call, 5) Professionals and Lifeline 0800 110 014, 6) Make environment safe (remove weapons/medications).',
    citations: ['Stanley-Brown Safety Plan', `${S.MHGAP}`],
    followups: ['Tujaze mpango wangu sasa'],
    routing: 'crisis_path',
    red_flags: ['suicidality'],
  },
  {
    id: 'sui-means-restriction',
    domain: 'crisis',
    questions_sw: [
      'kuondoa silaha nyumbani',
      'kuficha dawa nyingi',
      'means restriction',
    ],
    questions_en: ['means restriction', 'remove weapons home'],
    answer_sw:
      'Kuondoa njia za kujidhuru kunaokoa maisha — hatari ya muda mfupi (saa au siku chache) ndiyo wakati hatari zaidi. Hatua: ondoa silaha za moto kwa ndugu, weka dawa nyingi (paracetamol pia) chini ya kufuli, ondoa sumu za kilimo nje ya nyumba. Ni hatua ya wakati wa hatari, si kudumu.',
    answer_en:
      'Restricting means of harm saves lives — the short-term window (hours to days) is the most dangerous. Steps: remove firearms to relatives, lock up medications (including paracetamol), keep agricultural poisons out of the house. A temporary measure for the dangerous window.',
    citations: [`${S.MHGAP} — SUI`, 'WHO LIVE LIFE'],
    routing: 'crisis_path',
    red_flags: ['suicidality'],
  },
  {
    id: 'sui-self-harm-cutting',
    domain: 'crisis',
    questions_sw: [
      'najikatakata',
      'kujidhuru bila nia ya kufa',
      'self harm cutting',
    ],
    questions_en: ['self harm', 'cutting myself'],
    answer_sw:
      'Kujidhuru (kujikata, kujichoma) mara nyingi ni njia ya kushughulikia maumivu ya ndani — si daima nia ya kufa, lakini ni hatari na ishara ya maumivu mazito. Stadi za muda mfupi: barafu mkononi, kuchora kwa kalamu nyekundu, mazoezi makali. Tafuta mtaalamu.',
    answer_en:
      'Self-harm (cutting, burning) is often a way to manage inner pain — not always with intent to die, but dangerous and a sign of serious distress. Short-term alternatives: ice in hand, drawing on skin with red pen, intense exercise. Seek professional help.',
    citations: [`${S.MHGAP} — SUI`, 'DBT Distress Tolerance'],
    routing: 'provider_referral',
    red_flags: ['suicidality'],
  },
  {
    id: 'sui-after-attempt',
    domain: 'crisis',
    questions_sw: [
      'baada ya jaribio la kujiua',
      'nimejaribu kujiua hapo awali',
      'after suicide attempt',
    ],
    questions_en: ['after suicide attempt'],
    answer_sw:
      'Mara baada ya jaribio, miezi 3 ya kwanza ni hatari zaidi. Hatua muhimu: kuona daktari wa akili mara kwa mara, mpango wa usalama, kuondoa njia za kujidhuru nyumbani, kuwajulisha 1–2 watu wa karibu. Hauko peke yako — wengi wamepita hapa na sasa wana maisha mazuri.',
    answer_en:
      'After an attempt, the first 3 months are the highest risk period. Critical steps: regular psychiatric follow-up, a safety plan, removing means at home, telling 1–2 trusted people. You are not alone — many have come through this and now have meaningful lives.',
    citations: [`${S.MHGAP} — SUI Follow-up`, 'WHO LIVE LIFE'],
    routing: 'crisis_path',
    red_flags: ['suicidality'],
  },
  {
    id: 'sui-child-helpline',
    domain: 'crisis',
    questions_sw: [
      'mtoto anataka kujiua',
      'mtoto wangu anajidhuru',
      'msaada wa watoto',
    ],
    questions_en: [
      'child suicidal',
      'child helpline tanzania',
    ],
    answer_sw:
      'Mtoto au kijana mwenye mawazo ya kujidhuru anahitaji msaada wa haraka. Piga simu ya watoto 116 (C-Sema) — bure, 24/7. Au peleka hospitali. Kaa naye, msiache peke yake, ondoa dawa na silaha. Watoto wanahitaji wazazi wao kuamini hisia zao.',
    answer_en:
      'A child or teen with self-harm thoughts needs urgent help. Call the child helpline 116 (C-Sema) — free, 24/7. Or take them to hospital. Stay with them, do not leave them alone, remove medications and weapons. Children need parents who believe their feelings.',
    citations: ['C-Sema 116', `${S.MHGAP} — CMH`],
    routing: 'crisis_path',
    red_flags: ['suicidality', 'child'],
  },
  {
    id: 'crisis-no-hotline-access',
    domain: 'crisis',
    questions_sw: [
      'simu haifanyi kazi sehemu yangu',
      'simu hailipiwi',
      'sina mtandao kupiga simu',
    ],
    questions_en: ['no phone access crisis'],
    answer_sw:
      'Ikiwa simu haifanyi kazi: 1) Nenda kituo cha afya cha karibu zaidi — fungua 24/7, 2) Mwambie jirani au mtu wa familia, 3) Piga 112 kutoka simu yoyote (bila salio), 4) Polisi wakitokea, waeleze "ninahitaji msaada wa afya ya akili".',
    answer_en:
      'If phones do not work: 1) Go to the nearest health centre — open 24/7, 2) Tell a neighbour or family member, 3) Call 112 from any phone (no airtime needed), 4) When police arrive, say "I need mental health help".',
    citations: ['TZ Emergency 112', `${S.MHGAP}`],
    routing: 'crisis_path',
  },
  {
    id: 'crisis-rural-access',
    domain: 'crisis',
    questions_sw: [
      'msaada vijijini',
      'kituo cha afya kiko mbali',
      'sina daktari karibu',
    ],
    questions_en: ['rural mental health access tanzania'],
    answer_sw:
      'Vijijini: 1) Mwanasayansi wa afya ya jamii (Community Health Worker, CHW) ana mafunzo ya kimsingi ya afya ya akili, 2) Dispensari ina huduma za awali, 3) Mwambie kiongozi wa kijiji ahusike kupata usafiri wa dharura, 4) Hospitali ya wilaya ndio mahali pa rufaa.',
    answer_en:
      'In rural areas: 1) Community Health Workers have basic mental-health training, 2) the dispensary provides first-line care, 3) ask the village leader for emergency transport help, 4) the district hospital is the referral point.',
    citations: [`${S.HSSP5}`, `${S.MHGAP}`],
    routing: 'provider_referral',
  },
];
