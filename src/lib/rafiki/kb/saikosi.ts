// kb/saikosi.ts — Psychosis (mhGAP PSY module).

import type { KbEntry } from './types';
import { KB_SOURCES as S } from './types';

export const SAIKOSI_ENTRIES: KbEntry[] = [
  {
    id: 'psy-what-is',
    domain: 'saikosi',
    questions_sw: [
      'saikosi ni nini',
      'mtu anaona vitu visivyokuwepo',
      'psychosis ni nini',
      'kichaa cha kweli',
    ],
    questions_en: ['what is psychosis', 'hearing voices'],
    answer_sw:
      'Saikosi ni hali ambapo akili inapoteza ushikamano na ukweli kwa muda. Dalili: kusikia sauti zisizopo (hallucinations), kuamini mambo yasiyo ya kweli (delusions), mawazo yaliyovurugika, kujitenga. Si laana wala kuchaguliwa — ni hali ya ubongo, na inatibika.',
    answer_en:
      'Psychosis is when the mind temporarily loses touch with reality. Symptoms: hearing voices that are not there (hallucinations), false fixed beliefs (delusions), disorganised thoughts, withdrawal. Not a curse — it is a brain condition, and it is treatable.',
    citations: [`${S.MHGAP} — PSY`],
    routing: 'provider_referral',
    red_flags: ['psychosis'],
  },
  {
    id: 'psy-first-episode',
    domain: 'saikosi',
    questions_sw: [
      'saikosi ya mara ya kwanza',
      'mwanangu anaongea peke yake',
      'first episode psychosis',
    ],
    questions_en: ['first episode psychosis', 'son talking to himself'],
    answer_sw:
      'Saikosi ya kwanza inahitaji msaada wa daktari haraka — kuanza tiba mapema kunabadilisha matokeo ya maisha. Peleka hospitali ya wilaya au moja kwa moja Muhimbili/Mirembe. Dawa (mfano haloperidol, risperidone) zinasaidia. Familia inahitaji pia msaada.',
    answer_en:
      'A first episode of psychosis needs urgent clinical care — early treatment changes lifetime outcomes. Take them to the district hospital or directly to Muhimbili/Mirembe. Medications (e.g. haloperidol, risperidone) help. Family also needs support.',
    citations: [`${S.MHGAP} — PSY 2.1`],
    routing: 'provider_referral',
    red_flags: ['psychosis'],
  },
  {
    id: 'psy-haloperidol',
    domain: 'saikosi',
    questions_sw: [
      'haloperidol kazi yake',
      'haloperidol madhara',
    ],
    questions_en: ['haloperidol'],
    answer_sw:
      'Haloperidol ni dawa ya kawaida ya saikosi nchini Tanzania (ipo katika orodha ya dawa muhimu). Hupunguza sauti na delusions. Madhara: misuli kukaza, kutetemeka, kutochochea (hii inaitwa "extrapyramidal"). Daktari atatoa dawa nyingine (procyclidine) kuzuia hii.',
    answer_en:
      'Haloperidol is a common antipsychotic in Tanzania (on the essential medicines list). Reduces voices and delusions. Side effects: muscle stiffness, tremor, slowing (extrapyramidal symptoms). The clinician may add procyclidine to prevent these.',
    citations: [`${S.MHGAP} — PSY Pharm`, 'Tanzania EML'],
    routing: 'provider_referral',
  },
  {
    id: 'psy-risperidone',
    domain: 'saikosi',
    questions_sw: ['risperidone', 'risperidone tanzania'],
    questions_en: ['risperidone'],
    answer_sw:
      'Risperidone ni dawa ya kisasa ya saikosi yenye madhara machache ya misuli kuliko haloperidol. Inaweza kuongeza uzito na sukari ya damu — kufuatiliwa ni muhimu. Inafanya kazi vizuri kwa saikosi ya kwanza.',
    answer_en:
      'Risperidone is a newer antipsychotic with fewer muscle side effects than haloperidol. Can increase weight and blood sugar — monitoring needed. Works well for first-episode psychosis.',
    citations: [`${S.MHGAP} — PSY Pharm`],
    routing: 'provider_referral',
  },
  {
    id: 'psy-bipolar-mania',
    domain: 'saikosi',
    questions_sw: [
      'mania ni nini',
      'bipolar ni nini',
      'kichocheo kikubwa cha akili',
      'kupanda na kushuka kwa hisia',
    ],
    questions_en: ['mania', 'bipolar disorder'],
    answer_sw:
      'Bipolar ni mzunguko wa hali ya juu (mania) na sonona. Mania: kulala kidogo lakini hujihisi nguvu, kuongea sana, kufanya maamuzi makubwa, kutumia pesa nyingi. Inahitaji dawa za kuimarisha hisia (mood stabiliser) — mfano lithium au sodium valproate. Onana na daktari.',
    answer_en:
      'Bipolar is a cycle between elevated mood (mania) and depression. Mania: little sleep but high energy, fast speech, big decisions, overspending. Needs mood-stabilising medication — e.g. lithium or sodium valproate. See a clinician.',
    citations: [`${S.MHGAP} — PSY 1.2 (Bipolar)`],
    routing: 'provider_referral',
    red_flags: ['psychosis'],
  },
  {
    id: 'psy-family-support',
    domain: 'saikosi',
    questions_sw: [
      'familia ya mtu mwenye saikosi',
      'jinsi ya kumsaidia mwenye saikosi',
    ],
    questions_en: ['family of psychosis patient'],
    answer_sw:
      'Familia inaweza kusaidia kwa: kuendelea kumtibu kama mtu wa kawaida (anasikia hata kama anaonekana mbali), kupunguza ugomvi nyumbani, kumkumbusha dawa, kuwepo wakati anasikia sauti. Familia pia inahitaji mapumziko — afya yenu nayo ni muhimu.',
    answer_en:
      'Family can help by: continuing to treat them as a normal person (they hear even when distant), reducing arguments at home, reminding medication, being present when they hear voices. Family also needs rest — your wellbeing matters too.',
    citations: [`${S.MHGAP} — PSY Psychosocial`],
    routing: 'self_help',
  },
  {
    id: 'psy-stop-meds',
    domain: 'saikosi',
    questions_sw: [
      'naweza kuacha dawa za saikosi',
      'nimepona naweza kuacha haloperidol',
    ],
    questions_en: [
      'can i stop antipsychotic',
    ],
    answer_sw:
      'USIACHE dawa za saikosi mwenyewe. Mara nyingi mtu hujihisi vizuri sababu dawa inafanya kazi — kuacha kunaleta kurudia ndani ya miezi. Kwa mara ya kwanza, dawa hutumika miezi 12+ baada ya kupona. Mzungumzeni daktari kuhusu kupunguza.',
    answer_en:
      'Do NOT stop antipsychotics on your own. People often feel well because the medicine is working — stopping causes relapse within months. After a first episode, medicine continues 12+ months after recovery. Discuss tapering with your clinician.',
    citations: [`${S.MHGAP} — PSY Follow-up`],
    routing: 'provider_referral',
  },
  {
    id: 'psy-traditional-conflict',
    domain: 'saikosi',
    questions_sw: [
      'saikosi ni mashetani',
      'saikosi na ushirikina',
      'mganga wa kienyeji saikosi',
    ],
    questions_en: ['psychosis spirits witchcraft'],
    answer_sw:
      'Jamii nyingi za Tanzania huelewa saikosi kama ushawishi wa kiroho. Tunaheshimu imani yako. Pia ni hali ya ubongo inayoweza kutibiwa kwa dawa — wengi walio na saikosi wamerudi kuwa wenzetu wa kawaida kabisa. Tiba ya kliniki na imani vinaweza kwenda pamoja.',
    answer_en:
      'Many Tanzanian communities understand psychosis through a spiritual lens. We respect your beliefs. It is also a brain condition that responds to medication — many people with psychosis have returned to fully normal lives. Clinical care and faith can go together.',
    citations: [`${S.JENKINS}`, `${S.MHGAP}`],
    routing: 'provider_referral',
    red_flags: ['psychosis'],
  },
];
