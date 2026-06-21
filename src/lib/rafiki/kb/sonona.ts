// kb/sonona.ts — Depression (mhGAP-DEP module v2.0).
// Tanzania context: PM+, Friendship Bench, Muhimbili psychiatry referral.

import type { KbEntry } from './types';
import { KB_SOURCES as S } from './types';

export const SONONA_ENTRIES: KbEntry[] = [
  {
    id: 'dep-what-is',
    domain: 'sonona',
    questions_sw: [
      'sonona ni nini',
      'unyogovu ni nini',
      'huzuni ya muda mrefu',
      'depression ni nini',
    ],
    questions_en: [
      'what is depression',
      'explain depression',
    ],
    answer_sw:
      'Sonona (unyogovu) ni ugonjwa wa kweli, si udhaifu wa moyo wala dhambi. Dalili kuu: huzuni au utupu wa muda mrefu (wiki 2+), kupoteza furaha, kukosa nguvu, kulala vibaya au kupita kiasi, hamu kushuka, hatia, na wakati mwingine mawazo ya kifo. Inatibika.',
    answer_en:
      'Depression is a real illness, not weakness or sin. Core symptoms (≥2 weeks): persistent sadness or emptiness, loss of pleasure, low energy, sleep too little/too much, appetite changes, guilt, sometimes thoughts of death. It is treatable.',
    citations: [`${S.MHGAP} — DEP Module`],
    followups: ['Nipime PHQ-9', 'Tiba ipi ipo Tanzania?'],
    routing: 'self_help',
  },
  {
    id: 'dep-phq9-intro',
    domain: 'sonona',
    questions_sw: ['phq-9', 'phq9', 'nipime sonona', 'tathmini ya sonona'],
    questions_en: ['phq-9', 'depression screen', 'assess depression'],
    answer_sw:
      'PHQ-9 ni tathmini fupi ya maswali 9 kuhusu wiki mbili zilizopita. Alama 0–4 ni kawaida; 5–9 nyepesi; 10–14 wastani; 15–19 nzito; 20–27 nzito sana. Swali la 9 (mawazo ya kifo) likiwa chanya, ni dharura ya tathmini.',
    answer_en:
      'PHQ-9 is a 9-item screen about the past two weeks. Scores 0–4 minimal; 5–9 mild; 10–14 moderate; 15–19 moderately severe; 20–27 severe. Item 9 positive (death thoughts) requires immediate safety assessment.',
    citations: [`${S.MHGAP} — DEP Assessment`, 'PHQ-9 (Kroenke 2001)'],
    followups: ['Anza tathmini sasa', 'Alama yangu ina maana gani?'],
    routing: 'self_help',
  },
  {
    id: 'dep-phq9-item9-positive',
    domain: 'sonona',
    questions_sw: [
      'swali la 9 phq9',
      'phq9 mawazo ya kifo',
      'phq-9 item 9 positive',
    ],
    questions_en: ['phq9 question 9 positive', 'phq-9 suicide item'],
    answer_sw:
      'Ukijibu chanya katika swali la 9 (mawazo ya kifo au kujidhuru), hii ni ishara ya hatari. Tafadhali piga Lifeline 0800 110 014 sasa, au nenda hospitali ya karibu. Kama una mtu wa karibu, mwambie. Maisha yako ni muhimu — tutapita hii pamoja.',
    answer_en:
      'A positive answer to item 9 (death or self-harm thoughts) is a danger sign. Please call Lifeline 0800 110 014 now, or go to the nearest hospital. Tell someone close to you. Your life matters — we will get through this together.',
    citations: [`${S.MHGAP} — SUI Module`, 'TZ Lifeline'],
    routing: 'crisis_path',
    red_flags: ['suicidality'],
  },
  {
    id: 'dep-mild-treatment',
    domain: 'sonona',
    questions_sw: [
      'sonona nyepesi tiba',
      'depression mild treatment',
      'phq9 alama 5 hadi 9',
    ],
    questions_en: [
      'mild depression treatment',
      'phq9 score 5 to 9',
    ],
    answer_sw:
      'Sonona nyepesi (PHQ-9 5–9): mara nyingi haitaji dawa kwanza. Hatua: shughuli za kawaida (behavioural activation), usingizi mzuri, kuongea na mtu wa karibu, mazoezi mepesi mara 3/wiki, na ufuatiliaji wa wiki 2–4. Programu ya PM+ inafanya kazi Tanzania.',
    answer_en:
      'Mild depression (PHQ-9 5–9): often does not need medication first. Steps: behavioural activation, good sleep, talking to someone trusted, light exercise 3×/week, and re-check in 2–4 weeks. The PM+ programme works well in Tanzania.',
    citations: [`${S.MHGAP} — DEP 1.1 (Psychosocial)`, 'WHO PM+'],
    followups: ['Nieleze behavioural activation', 'PM+ inapatikana wapi?'],
    routing: 'self_help',
  },
  {
    id: 'dep-moderate-treatment',
    domain: 'sonona',
    questions_sw: [
      'sonona wastani tiba',
      'depression moderate treatment',
      'phq9 alama 10 hadi 14',
    ],
    questions_en: [
      'moderate depression treatment',
      'phq9 score 10 to 14',
    ],
    answer_sw:
      'Sonona wastani (PHQ-9 10–14): tiba ya mazungumzo (CBT au IPT) inapendekezwa, na dawa inaweza kuongezwa kama hakuna mabadiliko ndani ya wiki 4–6. Onana na daktari wa kituo cha afya — atakuandikishia rufaa kama inahitajika.',
    answer_en:
      'Moderate depression (PHQ-9 10–14): structured talk therapy (CBT or IPT) is recommended; medication may be added if no improvement in 4–6 weeks. See your health-centre clinician — they can refer if needed.',
    citations: [`${S.MHGAP} — DEP 2.1`],
    routing: 'provider_referral',
  },
  {
    id: 'dep-severe-treatment',
    domain: 'sonona',
    questions_sw: [
      'sonona nzito tiba',
      'severe depression treatment',
      'phq9 alama 15 au zaidi',
    ],
    questions_en: ['severe depression', 'phq9 score over 15'],
    answer_sw:
      'Sonona nzito (PHQ-9 ≥15) inahitaji daktari haraka. Dawa ya kupambana na sonona (kawaida fluoxetine au amitriptyline) pamoja na tiba ya mazungumzo. Kama una mawazo ya kifo, ni dharura — Lifeline 0800 110 014 au hospitali sasa.',
    answer_en:
      'Severe depression (PHQ-9 ≥15) needs prompt clinical care. Antidepressant medication (commonly fluoxetine or amitriptyline) plus talk therapy. If you have death thoughts, this is an emergency — Lifeline 0800 110 014 or hospital now.',
    citations: [`${S.MHGAP} — DEP 2.2`, 'Tanzania STG (Antidepressants)'],
    routing: 'provider_referral',
    red_flags: ['suicidality'],
  },
  {
    id: 'dep-fluoxetine-basics',
    domain: 'sonona',
    questions_sw: [
      'fluoxetine ni dawa gani',
      'fluoxetine sonona',
      'prozac kazi yake',
    ],
    questions_en: ['fluoxetine for depression', 'how does fluoxetine work'],
    answer_sw:
      'Fluoxetine ni dawa ya kawaida ya sonona (SSRI). Huanza kufanya kazi baada ya wiki 2–4, athari kamili wiki 6–8. Madhara ya mwanzo: kichefuchefu, usingizi mbaya, wasiwasi. Kawaida hupungua. USIACHE ghafla — punguza taratibu chini ya daktari.',
    answer_en:
      'Fluoxetine is a common antidepressant (SSRI). Starts working in 2–4 weeks; full effect 6–8 weeks. Early side effects: nausea, sleep disturbance, anxiety. Usually pass. NEVER stop abruptly — taper under a clinician.',
    citations: [`${S.MHGAP} — DEP Pharm`, 'Tanzania STG'],
    followups: ['Madhara ya kawaida?', 'Kwa muda gani nitumie?'],
    routing: 'provider_referral',
  },
  {
    id: 'dep-amitriptyline-basics',
    domain: 'sonona',
    questions_sw: [
      'amitriptyline ni dawa gani',
      'amitriptyline kwa sonona',
    ],
    questions_en: ['amitriptyline for depression'],
    answer_sw:
      'Amitriptyline ni dawa ya jadi ya sonona (TCA), ipo katika orodha ya dawa muhimu Tanzania. Huanza kidogo kidogo. Madhara: usingizi, mdomo mkavu, kuvimbiwa, ongezeko la uzito. Inaweza kuwa hatari ikitumika kwa kiwango kikubwa — daktari huangalia.',
    answer_en:
      'Amitriptyline is a traditional antidepressant (TCA) on Tanzania\'s essential medicines list. Starts gradually. Side effects: drowsiness, dry mouth, constipation, weight gain. Dangerous in overdose — clinician monitors.',
    citations: [`${S.MHGAP} — DEP Pharm`, 'Tanzania National EML'],
    routing: 'provider_referral',
  },
  {
    id: 'dep-how-long-meds',
    domain: 'sonona',
    questions_sw: [
      'kwa muda gani nitumie dawa za sonona',
      'lini niache dawa za sonona',
    ],
    questions_en: [
      'how long take antidepressants',
      'when stop antidepressants',
    ],
    answer_sw:
      'Kwa kawaida miezi 9–12 baada ya kupona — kuzuia kurudia. Ikiwa hii ni mara ya pili au zaidi, daktari anaweza kushauri muda mrefu zaidi. Usiache mwenyewe — kuacha ghafla kunaleta dalili za kujiondoa. Mzungumzeni daktari.',
    answer_en:
      'Usually 9–12 months after recovery — to prevent relapse. If this is a 2nd or later episode, longer may be advised. Do not stop on your own — abrupt stop causes discontinuation symptoms. Discuss with your clinician.',
    citations: [`${S.MHGAP} — DEP 2.5`],
    routing: 'provider_referral',
  },
  {
    id: 'dep-behavioural-activation',
    domain: 'sonona',
    questions_sw: [
      'behavioural activation',
      'kujiamsha kwa shughuli',
      'nifanye nini sonona',
    ],
    questions_en: ['behavioural activation', 'depression activities'],
    answer_sw:
      'Behavioural activation: rudisha shughuli ndogo ndogo zenye maana hata kama hujisikii. Anza moja kwa siku: kutembea dakika 10, kuoga, kumpigia rafiki, kupika chakula. Hisia hufuata vitendo — si kinyume chake. Andika nini ulifanya na ulijisikiaje.',
    answer_en:
      'Behavioural activation: re-introduce small meaningful actions even when you don\'t feel like it. Start with one per day: 10-min walk, shower, call a friend, cook. Feelings follow action — not the other way. Track what you did and how you felt.',
    citations: [`${S.MHGAP} — DEP Psychosocial`, 'WHO PM+'],
    followups: ['Nipe ratiba ya shughuli wiki hii'],
    routing: 'self_help',
  },
  {
    id: 'dep-sleep-depression',
    domain: 'sonona',
    questions_sw: [
      'kushindwa kulala kwa sonona',
      'sonona na usingizi',
      'sleep depression',
    ],
    questions_en: [
      'depression sleep problems',
      'cant sleep depression',
    ],
    answer_sw:
      'Usingizi mbaya ni dalili ya sonona — na unaifanya iwe mbaya zaidi. Sheria 5: muda mmoja wa kulala/kuamka, hakuna kafiyini baada ya saa 6 mchana, skrini chini saa 1 kabla, kitanda = usingizi tu, kama hujalala dakika 20 amka fanya jambo tulivu.',
    answer_en:
      'Poor sleep is a depression symptom and worsens it. 5 rules: same sleep/wake time, no caffeine after noon, screens off 1 hr before bed, bed = sleep only, if you cannot sleep in 20 min get up, do something calm.',
    citations: [`${S.MHGAP} — DEP Psychosocial`, 'CBT-I'],
    routing: 'self_help',
  },
  {
    id: 'dep-recurrence',
    domain: 'sonona',
    questions_sw: [
      'sonona imerudi',
      'kurudia kwa sonona',
      'relapse depression',
    ],
    questions_en: ['depression relapse', 'depression came back'],
    answer_sw:
      'Sonona inaweza kurudia — si kwamba umeshindwa. Sababu za kawaida: kuacha dawa mapema, msongo mpya, kupoteza usingizi, pombe. Anza tena haraka: ona daktari, rudi katika ratiba ya shughuli, ongea na mtu wa karibu. Kurudia mara nyingi ni rahisi kuliko mara ya kwanza.',
    answer_en:
      'Depression can relapse — it does not mean you failed. Common triggers: stopping medication early, new stress, sleep loss, alcohol. Restart promptly: see your clinician, rebuild activity routine, talk to someone close. Repeat episodes are often easier than the first.',
    citations: [`${S.MHGAP} — DEP Follow-up`],
    routing: 'provider_referral',
  },
  {
    id: 'dep-friends-family-help',
    domain: 'sonona',
    questions_sw: [
      'rafiki yangu ana sonona',
      'jinsi ya kumsaidia mtu mwenye sonona',
      'mke wangu ana huzuni',
    ],
    questions_en: [
      'how to help someone with depression',
      'friend has depression',
    ],
    answer_sw:
      'Sikiliza bila kuhukumu. Epuka kusema "jiongezee nguvu" au "wengine wana matatizo makubwa". Sema "Nakuamini, niko nawe". Saidia kufanya jambo dogo pamoja — kutembea, kupika. Wahimize kuona daktari. Kama wana mawazo ya kifo — kaa nao, piga Lifeline 0800 110 014.',
    answer_en:
      'Listen without judging. Avoid "snap out of it" or "others have it worse". Say "I believe you, I am here." Help with small things together — walking, cooking. Encourage them to see a clinician. If they have death thoughts — stay with them, call Lifeline 0800 110 014.',
    citations: [`${S.MHGAP} — Family Support`, 'TZ Lifeline'],
    routing: 'provider_referral',
    red_flags: ['suicidality'],
  },
  {
    id: 'dep-hiv-comorbid',
    domain: 'sonona',
    questions_sw: [
      'sonona na vvu',
      'depression and hiv',
      'mtu mwenye vvu na huzuni',
    ],
    questions_en: ['depression hiv tanzania', 'mental health plwh'],
    answer_sw:
      'Sonona ni ya kawaida kwa watu wanaoishi na VVU — hadi 1 kati ya 3. Inapunguza ufuasi wa ARV na inazidisha ugonjwa. Ukipata huzuni ya muda mrefu, ueleze kliniki yako ya CTC — wanaweza kupima na kushirikisha mtaalamu wa akili. Tiba inafanya kazi.',
    answer_en:
      'Depression is common in people living with HIV — up to 1 in 3. It reduces ART adherence and worsens disease. Tell your CTC clinic if you have persistent sadness — they can screen and link to mental-health care. Treatment works.',
    citations: [`${S.MHGAP} — DEP & HIV`, 'NACP Guidelines'],
    followups: ['ARV na dawa za sonona?'],
    routing: 'provider_referral',
    red_flags: ['hiv'],
  },
  {
    id: 'dep-arv-interactions',
    domain: 'sonona',
    questions_sw: [
      'dawa za sonona na arv',
      'fluoxetine na arv',
      'antidepressants arv',
    ],
    questions_en: ['antidepressants arv interactions'],
    answer_sw:
      'Kwa ujumla fluoxetine na sertraline husafiri salama na ARV nyingi za Tanzania (TLD = tenofovir/lamivudine/dolutegravir). Efavirenz inaweza kuongeza wasiwasi/usingizi mbaya — ueleze daktari. Daima mwambie mfamasia ARV unazotumia.',
    answer_en:
      'In general fluoxetine and sertraline are safe with most Tanzania ARV regimens (TLD = tenofovir/lamivudine/dolutegravir). Efavirenz can worsen anxiety/sleep — tell your clinician. Always inform the pharmacist of your ARVs.',
    citations: [`${S.MHGAP}`, 'Tanzania NACP ART Guidelines'],
    routing: 'provider_referral',
    red_flags: ['hiv'],
  },
  {
    id: 'dep-male-stigma',
    domain: 'sonona',
    questions_sw: [
      'mwanaume na huzuni',
      'huzuni ya wanaume',
      'wanaume hawalii',
    ],
    questions_en: ['men depression tanzania', 'masculinity depression'],
    answer_sw:
      'Wanaume wengi Tanzania hujificha sonona — kwa sababu jamii inawapa shinikizo la "kuwa hodari". Dalili kwa wanaume mara nyingi: hasira, pombe, kazi kupita kiasi, kukimya. Kutafuta msaada si udhaifu — ni busara. Wanaume wengi mashujaa wamepokea tiba.',
    answer_en:
      'Many Tanzanian men hide depression — pressured by "be strong" expectations. In men it often shows as: anger, alcohol, overworking, silence. Seeking help is not weakness — it is wisdom. Many strong men have received treatment.',
    citations: [`${S.MHGAP} — DEP`, `${S.HSSP5}`],
    routing: 'self_help',
  },
  {
    id: 'dep-elderly',
    domain: 'sonona',
    questions_sw: [
      'sonona ya wazee',
      'mzee wangu ana huzuni',
      'depression in elderly',
    ],
    questions_en: ['depression elderly tanzania'],
    answer_sw:
      'Kwa wazee sonona mara nyingi inaonekana kama maumivu ya mwili, kupoteza kumbukumbu, au kujitenga — si huzuni iliyo wazi. Si "uzee tu". Inatibika. Dawa zinapaswa kuanza kidogo (start low go slow) kwa sababu wazee wana athari nyingi za dawa.',
    answer_en:
      'In older adults depression often shows as bodily pain, memory loss, or withdrawal — not obvious sadness. It is not "just old age". It is treatable. Medications must be started low and titrated slowly because elders are more sensitive.',
    citations: [`${S.MHGAP} — DEP in Older Adults`],
    routing: 'provider_referral',
    red_flags: ['elderly'],
  },
];
