/**
 * Tanzania Standard Treatment Guidelines + National Essential Medicines
 * List (STG-NEMLIT) 2021 — Chapter 23: MENTAL HEALTH CONDITIONS.
 *
 * Source: STG-NEMLIT 2021, Wizara ya Afya, Maendeleo ya Jamii, Jinsia,
 * Wazee na Watoto (MoHCDGEC). Chapter 23, pp. 537-559. Sections
 * 23.1 – 23.24.
 *
 * Drug-level dosing in this file comes DIRECTLY from STG-NEMLIT 2021
 * Chapter 23 — no memory, no fabrication. Source-line citations are
 * preserved in each entry's `citation` field for traceability.
 *
 * Drug-level letter codes (A/B/C/D/S) follow STG-NEMLIT NEML category:
 *   A = lowest tier (primary care), B/C = district/region, D/S = specialist.
 *
 * This module sits in Rafiki's federation chain BEFORE WHO mhGAP — TZ
 * STG is the country-of-jurisdiction source, mhGAP is the international
 * companion.
 */

export interface TzStgMhEntry {
  id: string
  section: string
  topic: string
  summary_sw: string
  summary_en: string
  drugs: string[]
  q_patterns: RegExp[]
  next_step_sw: string
  citation: string
}

const SRC = 'TZ STG-NEMLIT 2021 Ch.23'

export const TZ_STG_MH_2021: TzStgMhEntry[] = [
  {
    id: 'tzstg-23-1-agitation',
    section: '23.1',
    topic: 'agitation',
    summary_sw:
      'Mgonjwa anayetabia ya uchokozi/wasiwasi mkubwa: kwanza de-escalation (mtuize, mahali salama, walinzi salama). Kama cooperative: PO promethazine 25-50mg STAT AU PO diazepam 10mg STAT AU PO lorazepam 4mg STAT. Kama uncooperative (baada ya dakika 30-60 PO imeshindwa, au hatari kubwa): IM haloperidol 2.5-5mg STAT (rudia baada ya 30-60min, max 20mg/24h) PAMOJA NA IV/IM diazepam 10mg STAT (max 60mg/24h) AU deep IM promethazine 25-50mg.',
    summary_en:
      'Aggressive/disruptive patient: de-escalate first (calm, safe environment, staff safety). If cooperative: PO promethazine 25-50mg stat OR PO diazepam 10mg stat OR PO lorazepam 4mg stat. If uncooperative (after 30-60min PO fails, or significant risk): IM haloperidol 2.5-5mg stat (repeat 30-60min, max 20mg/24h) AND IV/IM diazepam 10mg stat (max 60mg/24h) OR deep IM promethazine 25-50mg.',
    drugs: ['promethazine', 'diazepam', 'lorazepam', 'haloperidol', 'midazolam', 'chlorpromazine'],
    q_patterns: [
      /(agitat|uchokozi|wasiwasi mkubwa|aggressive|disruptive|kuchokoza|amekasirika sana)/i,
      /(restraint|kushikilia|sedation|kutuliza dharura)/i,
    ],
    next_step_sw: 'Wazee na frail: punguza dozi nusu (risk ya respiratory depression). Daima monitor vital signs. Kama hakuna haloperidol, tumia chlorpromazine deep IM 25-50mg (max 4x/24h, 2000mg max).',
    citation: `${SRC} §23.1 — Aggressive/Disruptive Behaviours (p.537)`,
  },
  {
    id: 'tzstg-23-2-delirium',
    section: '23.2',
    topic: 'delirium',
    summary_sw:
      'Delirium (acute confusion): altered consciousness + disorientation. Tafuta sababu ya msingi (medical) na utibu. Acute management: IM haloperidol 5mg STAT (rudia 30-60min, max 20mg/24h) AU/NA IV diazepam 10mg AU IM lorazepam 1-4mg. Badilisha kwa oral baada ya kutulia. Wazee/frail: punguza dozi nusu. Tumia haloperidol badala ya benzodiazepine ikiwa kuna respiratory insufficiency.',
    summary_en:
      'Delirium (acute confusion): altered consciousness + disorientation. Find and treat underlying medical cause. Acute: IM haloperidol 5mg stat (repeat 30-60min, max 20mg/24h) AND/OR IV diazepam 10mg OR IM lorazepam 1-4mg. Switch to oral once contained. Elderly/frail: halve the dose. Use haloperidol over benzodiazepine if respiratory insufficiency.',
    drugs: ['haloperidol', 'diazepam', 'lorazepam'],
    q_patterns: [/(delirium|acute confusion|kuchanganyikiwa ghafla|disorient)/i],
    next_step_sw: 'IV route ina hatari kubwa ya respiratory depression — tumia PO/IM kwanza. Subiri dakika 15-30 kabla ya kurudia IM ili kuepuka toxicity.',
    citation: `${SRC} §23.2 — Delirium (p.538)`,
  },
  {
    id: 'tzstg-23-3-dementia',
    section: '23.3',
    topic: 'dementia',
    summary_sw:
      'Dementia: cognitive decline (kumbukumbu, lugha, executive function) inayoathiri uhuru wa kila siku. Non-pharma: psychoeducation kwa mgonjwa+familia, MMSE + functional assessment kila miezi 6. Mild-moderate na moderate-severe: PO donepezil 5mg STAT, baada ya wiki 4-6 ongeza hadi 10mg/24h. Severe inaweza kuongezewa hadi 23mg/day baada ya miezi 3.',
    summary_en:
      'Dementia: cognitive decline (memory, language, executive function) affecting daily independence. Non-pharma: psychoeducation patient+family, MMSE+functional assessment every 6 months. Mild-moderate and moderate-severe: PO donepezil 5mg initial, after 4-6 weeks increase to 10mg/24h. Severe: can increase to 23mg/day after 3 months.',
    drugs: ['donepezil'],
    q_patterns: [/(dementia|kupoteza kumbukumbu|cognitive decline|MMSE|alzheimer)/i],
    next_step_sw: 'Hii ni S-tier dawa (specialist level kwa NEMLIT) — referral kwa daktari bingwa kabla ya kuanza.',
    citation: `${SRC} §23.3 — Dementia (p.539)`,
  },
  {
    id: 'tzstg-23-4-schizophrenia',
    section: '23.4',
    topic: 'schizophrenia',
    summary_sw:
      'Schizophrenia (DSM-5): >=2 symptoms (delusions, hallucinations, disorganized speech/behaviour, negative symptoms) kwa mwezi 1, na >=6 miezi ya impairment. Acute: kama §23.1 (aggressive). Maintenance: PO haloperidol 3-4.5mg 12-hourly AU PO chlorpromazine 100-600mg/24h katika dozi za kugawa AU PO olanzapine 5-10mg titrate hadi 20mg/24h AU PO risperidone 1mg 12-hourly, ongeza 1mg kila siku 2-3 hadi 2-3mg 12-hourly (max 16mg/day). USICHANGANYE dawa hizi.',
    summary_en:
      'Schizophrenia (DSM-5): ≥2 symptoms (delusions, hallucinations, disorganized speech/behaviour, negative) for 1 month, ≥6 months impairment. Acute: per §23.1. Maintenance: PO haloperidol 3-4.5mg 12h OR PO chlorpromazine 100-600mg/24h divided OR PO olanzapine 5-10mg titrate to 20mg/24h OR PO risperidone 1mg 12h, increase by 1mg every 2-3 days to 2-3mg 12h (max 16mg/day). DO NOT combine.',
    drugs: ['haloperidol', 'chlorpromazine', 'olanzapine', 'risperidone', 'fluphenazine', 'zuclopenthixol', 'flupenthixol'],
    q_patterns: [/(schizophrenia|sikizofrenia|psychos|saikosi|delusion|hallucination|kuyaona|kusikia sauti)/i],
    next_step_sw: 'Compliance dhaifu → depot IM: fluphenazine decanoate 6.25-50mg 2-4 wiki AU zuclopenthixol decanoate 100-600mg 2-4 wiki AU flupenthixol decanoate 20-40mg kila wiki 4. Daima toa test dose kwanza. EPSE → PO promethazine 25-50mg/24h AU PO benzhexol 5mg 24h/12h (dozi ya mwisho kabla ya 1400 ili kuepuka insomnia).',
    citation: `${SRC} §23.4 — Schizophrenia (pp.539-541)`,
  },
  {
    id: 'tzstg-23-5-catatonia',
    section: '23.5',
    topic: 'catatonia',
    summary_sw:
      'Catatonia: ambitendency, waxy flexibility, negativism, stereotypy, mannerism, echolalia, echopraxia. Sababu: schizophrenia, severe depression, bipolar, CNS infection/tumour, CVA, drug intoxication, lethal catatonia. Investigation: FBP, RFT, LFT, TFT, glucose, CK, UDS, ECG, CT/MRI, EEG, blood culture, syphilis, HIV, heavy metal, auto-antibody, LP. Non-pharma: hydration, mobilization, ICU ikiwa anazidi kuwa mbaya. Pharma: IV/IM diazepam 10-20mg/24h AU IM lorazepam 1-4mg/24h. Kama benzo haitoshi na ni severe → ECT.',
    summary_en:
      'Catatonia: ambitendency, waxy flexibility, negativism, stereotypy. Causes: schizophrenia, severe depression, bipolar, CNS infection/tumour, CVA, drug intoxication, lethal catatonia. Workup: FBP, RFT, LFT, TFT, glucose, CK, UDS, ECG, CT/MRI, EEG, culture, syphilis, HIV, heavy metals, auto-antibody, LP. Pharma: IV/IM diazepam 10-20mg/24h OR IM lorazepam 1-4mg/24h. If benzo fails + severe → ECT.',
    drugs: ['diazepam', 'lorazepam'],
    q_patterns: [/(catatonia|catatoni|waxy flexib|echolalia|echopraxia|negativism)/i],
    next_step_sw: 'Catatonia ni dharura — pelekea ICU + specialist psychiatric care haraka.',
    citation: `${SRC} §23.5 — Catatonia (p.541)`,
  },
  {
    id: 'tzstg-23-6-schizoaffective',
    section: '23.6',
    topic: 'schizoaffective',
    summary_sw:
      'Schizoaffective Disorder (DSM-5): hallucinations/delusions kwa >=2 wiki bila affective episode + period ya symptoms zinazoungana na affective disorder. Subtypes: Bipolar type (na manic episode), Depressive type (na MDD). Psychotic symptoms: PO chlorpromazine 100-1000mg/day divided (max 1000mg) AU PO haloperidol 1.5-6mg/day divided (max 20mg). Manic subtype: PO carbamazepine 200-1000mg/24h AU PO sodium valproate 500-1000mg/24h. Depressive subtype: PO amitriptyline 12.5-75mg nocte AU PO fluoxetine 10-20mg nocte.',
    summary_en:
      'Schizoaffective Disorder (DSM-5): hallucinations/delusions ≥2 weeks without affective episode + period of concurrent affective+schizophrenia symptoms. Subtypes: Bipolar, Depressive. Psychotic Sx: PO chlorpromazine 100-1000mg/day OR PO haloperidol 1.5-6mg/day. Manic subtype: PO carbamazepine 200-1000mg/24h OR PO valproate 500-1000mg/24h. Depressive: PO amitriptyline 12.5-75mg nocte OR PO fluoxetine 10-20mg nocte.',
    drugs: ['chlorpromazine', 'haloperidol', 'carbamazepine', 'sodium valproate', 'amitriptyline', 'fluoxetine'],
    q_patterns: [/(schizoaffective|schizoafekti|psychos.*mood|mood.*psychos)/i],
    next_step_sw: 'Subtype determination ni muhimu — kama bipolar type, EPUKA antidepressant monotherapy (tazama §23.8).',
    citation: `${SRC} §23.6 — Schizoaffective Disorder (pp.541-542)`,
  },
  {
    id: 'tzstg-23-7-brief-psychotic',
    section: '23.7',
    topic: 'brief_psychotic',
    summary_sw:
      'Brief/Acute Transient Psychotic Disorder: siku 1 hadi mwezi 1 ya delusions, hallucinations, disorganized speech, catatonic behaviour. Excluding MDD/bipolar with psychotic features, schizophrenia, na substance/medical causes. Treat sawa na schizophrenia (§23.4) — non-pharma + pharma.',
    summary_en:
      'Brief/Acute Transient Psychotic Disorder: 1 day to 1 month of delusions, hallucinations, disorganized speech/catatonic behaviour. Exclude MDD/bipolar with psychotic features, schizophrenia, substance/medical. Manage as Schizophrenia (§23.4).',
    drugs: [],
    q_patterns: [/(brief psychot|transient psychot|acute psychot|psychos.*ghafla)/i],
    next_step_sw: 'Hii ni transient — punguza dawa baada ya kupona na monitor relapse.',
    citation: `${SRC} §23.7 — Brief/Acute Transient Psychotic Disorder (p.542)`,
  },
  {
    id: 'tzstg-23-8-bipolar',
    section: '23.8',
    topic: 'bipolar',
    summary_sw:
      'Bipolar I (DSM-5): >=1 manic episode (>=1 wiki ya extreme happiness/irritability + >=3 symptoms: grandiosity, decreased sleep need, pressured speech, racing thoughts, distractibility, increased activity, risky behaviour). Acute mania: kama §23.1. Maintenance: PO carbamazepine 600mg/24h divided (ongeza 200mg kila siku 3, max 2000mg) AU PO sodium valproate 20mg/kg/day divided (max 2000mg) AU PO lamotrigine 600mg/day (ongeza 200mg kila siku 3, max 2000mg). Severe depressive episode katika bipolar: tumia antidepressant PAMOJA na mood stabilizer + antipsychotic (kama psychosis ipo). USITUMIE monotherapy antidepressant katika bipolar.',
    summary_en:
      'Bipolar I (DSM-5): ≥1 manic episode (≥1 week extreme happiness/irritability + ≥3 symptoms). Acute mania: per §23.1. Maintenance: PO carbamazepine 600mg/24h (max 2000mg) OR PO valproate 20mg/kg/day (max 2000mg) OR PO lamotrigine 600mg/day. Severe bipolar depression: antidepressant + mood stabilizer + antipsychotic (if psychosis). DO NOT use monotherapy antidepressant in bipolar.',
    drugs: ['carbamazepine', 'sodium valproate', 'lamotrigine', 'lithium carbonate', 'amitriptyline', 'fluoxetine', 'chlorpromazine', 'haloperidol'],
    q_patterns: [/(bipolar|bipola|mania|manic|hypomania|mood swing|kupanda kushuka kwa hisia)/i],
    next_step_sw: 'Combo ya mood stabilizers (sodium valproate + lithium) inaruhusiwa katika S-level. Refer: mixed/rapid-cycling, depression/mania zisizojibu treatment.',
    citation: `${SRC} §23.8 — Bipolar Mood Disorders (pp.542-543)`,
  },
  {
    id: 'tzstg-23-9-mdd',
    section: '23.9',
    topic: 'depression',
    summary_sw:
      'Major Depressive Disorder: >=2 wiki za depressed mood na/au diminished interest, na impairment ya functional. Symptoms: depressed mood, worthlessness, guilt, decreased concentration, suicidal thoughts, appetite/sleep changes, agitation, retardation, fatigue. Non-pharma: CBT, IPT, stress management, marital/family work, sleep hygiene. Pharma: PO amitriptyline 12.5-75mg nocte (ongeza hadi 150mg max; wazee max 75mg) AU PO citalopram 10-60mg/24h AU PO fluoxetine 20-60mg/24h (asubuhi). Monitor vijana <25 kwa increased agitation+suicidality wiki za kwanza.',
    summary_en:
      'Major Depressive Disorder: ≥2 weeks depressed mood and/or diminished interest, with functional impairment. Non-pharma: CBT, IPT, stress management, marital/family, sleep hygiene. Pharma: PO amitriptyline 12.5-75mg nocte (max 150mg; elderly max 75mg) OR PO citalopram 10-60mg/24h OR PO fluoxetine 20-60mg/24h morning. Monitor <25yo for agitation+suicidality early on.',
    drugs: ['amitriptyline', 'citalopram', 'fluoxetine'],
    q_patterns: [/(depress|sonona|huzuni|major depressive|MDD|amitriptyline|fluoxetine|citalopram)/i],
    next_step_sw: 'Refer: suicidal ideation, psychotic depression, treatment failure, comorbid medical (CHF/epilepsy), poor support, pregnancy/lactation.',
    citation: `${SRC} §23.9 — Major Depressive Disorder (pp.543-544)`,
  },
  {
    id: 'tzstg-23-10-suicide',
    section: '23.10',
    topic: 'suicide',
    summary_sw:
      'Suicide: act of intentionally causing one\'s own death. Risk factors: depression, bipolar, autism spectrum, schizophrenia, personality disorders, anxiety, chronic fatigue, alcohol/substance use, benzodiazepine withdrawal. Impulsive acts: stress (kifedha/kielimu), relationship problems, harassment/bullying. Prior attempt = highest risk. Prevention: (1) means restriction (kujitundika, silaha, dawa, sumu), (2) treat mental illness + substance use, (3) careful media reporting, (4) improve economic conditions.',
    summary_en:
      'Suicide: act of intentionally causing one\'s own death. Risk factors: depression, bipolar, ASD, schizophrenia, PD, anxiety, CFS, alcohol/substance use, benzo withdrawal, impulsive stressors. Prior attempt = highest risk. Prevention: means restriction (hanging, firearms, drugs, poisons), treat MH+substance use, careful media reporting, improve economic conditions.',
    drugs: [],
    q_patterns: [/(suicide|kujiua|self.harm|kujidhuru|kujitoa uhai)/i],
    next_step_sw: 'Tanzania hotlines: Lifeline 0800 110 014 + 116 (watoto) + 112 (dharura). Means restriction ndio intervention yenye ushahidi mkubwa zaidi.',
    citation: `${SRC} §23.10 — Suicide (p.544)`,
  },
  {
    id: 'tzstg-23-11-gad',
    section: '23.11',
    topic: 'anxiety',
    summary_sw:
      'Generalized Anxiety Disorder: excessive anxiety + worry juu ya everyday events bila sababu wazi. Symptoms: persistent worry, sleep disturbance, poor concentration, mood disturbance, muscle tension, tremors. Non-pharma: psychotherapy (outpatient mostly). Acute episode: PO diazepam 2-5mg STAT, rudia 12-hourly (wiki 2 max, taper hadi 0 ndani ya wiki 6). Maintenance: PO amitriptyline 25-75mg nocte AU PO citalopram 10-40mg/24h AU PO clonazepam 0.5-4mg/24h AU PO fluoxetine 20-40mg/24h. Comorbid drug/alcohol dependence au MDD → antidepressant.',
    summary_en:
      'GAD: excessive anxiety + worry about everyday events without clear cause. Symptoms: persistent worry, sleep disturbance, poor concentration, mood disturbance, muscle tension, tremors. Non-pharma: psychotherapy (mostly outpatient). Acute: PO diazepam 2-5mg stat, repeat 12h (max 2 weeks, taper over 6 weeks). Maintenance: PO amitriptyline 25-75mg nocte OR PO citalopram 10-40mg/24h OR PO clonazepam 0.5-4mg/24h OR PO fluoxetine 20-40mg/24h.',
    drugs: ['diazepam', 'amitriptyline', 'citalopram', 'clonazepam', 'fluoxetine'],
    q_patterns: [/(GAD|generalized anxiety|wasiwasi mwingi|anxiety disorder|hofu ya kawaida|persistent worry)/i],
    next_step_sw: 'Epuka benzodiazepine prolonged use → tolerance + withdrawal. Usichanganye benzo zaidi ya moja.',
    citation: `${SRC} §23.11 — Generalized Anxiety Disorder (pp.544-545)`,
  },
  {
    id: 'tzstg-23-12-panic',
    section: '23.12',
    topic: 'panic',
    summary_sw:
      'Panic Disorder: recurrent unexpected panic attacks. Attack: intense anxiety + dread, peaking dakika 10, kupungua ndani ya dakika 30. Physical symptoms: palpitations, dyspnoea, dizziness, sweating. Non-pharma: psychoeducation, CBT, exclude medical (e.g. thyrotoxicosis). Acute attack: PO diazepam 5-10mg 12h AU PO lorazepam 2-4mg 12h AU PO clonazepam 0.5-3mg 12h. Panic disorder maintenance: PO amitriptyline 25-75mg nocte AU PO citalopram 10-40mg/24h AU PO fluoxetine 20-40mg/24h. Anza dozi ndogo, ongeza taratibu. Duration: miezi 6-1 mwaka. Refer: treatment-resistant au benzo zaidi ya wiki 6.',
    summary_en:
      'Panic Disorder: recurrent unexpected panic attacks. Attack: intense anxiety + dread, peaking 10 min, resolving 30 min. Physical: palpitations, dyspnoea, dizziness, sweating. Non-pharma: psychoeducation, CBT, exclude medical (e.g. thyrotoxicosis). Acute: PO diazepam 5-10mg 12h OR PO lorazepam 2-4mg 12h OR PO clonazepam 0.5-3mg 12h. Maintenance: PO amitriptyline 25-75mg nocte OR PO citalopram 10-40mg/24h OR PO fluoxetine 20-40mg/24h. Start low, titrate. Duration: 6 months-1 year. Refer: treatment-resistant or benzo >6 weeks.',
    drugs: ['diazepam', 'lorazepam', 'clonazepam', 'amitriptyline', 'citalopram', 'fluoxetine'],
    q_patterns: [/(panic|panic attack|panic disorder|wasiwasi mkali ghafla|moyo kwenda mbio ghafla)/i],
    next_step_sw: 'Consider short-term benzo co-admin mwanzoni (antidepressant ni polepole kuanza kufanya kazi).',
    citation: `${SRC} §23.12 — Panic Disorder (pp.545-546)`,
  },
  {
    id: 'tzstg-23-13-ocd',
    section: '23.13',
    topic: 'ocd',
    summary_sw:
      'Obsessive-Compulsive Disorder: persistent intrusive thoughts + compulsions (mental acts/behaviours kupunguza obsession), e.g. excessive hand washing. Inaathiri daily functioning. Non-pharma: psychoeducation, psychotherapy, behaviour therapy. Pharma: PO citalopram 20mg STAT, baada ya wiki 4-8 kama hakuna jibu ongeza hadi 40mg. AU PO fluoxetine 20mg STAT, baada ya wiki 4-8 ongeza hadi 40mg. Refer: inadequate response.',
    summary_en:
      'OCD: persistent intrusive thoughts + compulsions (mental acts/behaviours to relieve obsessions), e.g. excessive hand washing. Impairs daily functioning. Non-pharma: psychoeducation, psychotherapy, behaviour therapy. Pharma: PO citalopram 20mg initial → 40mg after 4-8 weeks if no response. OR PO fluoxetine 20mg → 40mg. Refer: inadequate response.',
    drugs: ['citalopram', 'fluoxetine'],
    q_patterns: [/(OCD|obsessive.compulsive|mawazo yanayorudia|kujiosha mikono mara nyingi|kuangalia mara kwa mara)/i],
    next_step_sw: 'Exposure-Response Prevention (ERP) ni gold-standard CBT modality kwa OCD.',
    citation: `${SRC} §23.13 — OCD (p.546)`,
  },
  {
    id: 'tzstg-23-14-ptsd',
    section: '23.14',
    topic: 'ptsd',
    summary_sw:
      'Acute Stress Disorder + PTSD: response kwa life-threatening event. Symptoms: re-experiencing (flashbacks, dreams), avoidance, hyperarousal (hypervigilance, startle response, insomnia). ASD: wiki 4 baada ya tukio, hudumu wiki 4. PTSD: hudumu zaidi ya wiki 4, inaweza kuanza zaidi ya wiki 4 baada ya tukio. Non-pharma: reassurance, supportive/CBT. ASD acute anxiety/agitation: PO clonazepam 0.5-2mg 24h-12h kwa wiki 2 (taper baada ya 26 wiki). PTSD: PO amitriptyline 50-150mg nocte (wazee 25-75mg) kwa wiki 4-8 AU PO citalopram 20-40mg/24h AU PO fluoxetine 20-40mg/24h. Adequate trial: wiki 8-12.',
    summary_en:
      'Acute Stress Disorder + PTSD: response to life-threatening event. Re-experiencing (flashbacks, dreams), avoidance, hyperarousal (hypervigilance, startle, insomnia). ASD: ≤4 weeks post-event, ≤4 weeks duration. PTSD: >4 weeks duration, may onset >4 weeks post-event. Non-pharma: reassurance, supportive/CBT. ASD acute: PO clonazepam 0.5-2mg 24h-12h ×2 weeks (taper). PTSD: PO amitriptyline 50-150mg nocte (elderly 25-75mg) ×4-8 weeks OR PO citalopram 20-40mg/24h OR PO fluoxetine 20-40mg/24h. Adequate trial: 8-12 weeks.',
    drugs: ['clonazepam', 'amitriptyline', 'citalopram', 'fluoxetine'],
    q_patterns: [/(PTSD|trauma|post.traumatic|flashback|hypervigilan|hofu baada ya tukio|kumbukumbu za tukio|mshtuko)/i],
    next_step_sw: 'Prolonged benzo (>1 wiki) inaweza KUONGEZA risk ya kuendeleza PTSD — epuka.',
    citation: `${SRC} §23.14 — Acute Stress + PTSD (p.547)`,
  },
  {
    id: 'tzstg-23-15-alcohol-withdrawal',
    section: '23.15',
    topic: 'alcohol_withdrawal',
    summary_sw:
      'Alcohol Withdrawal: insomnia, tremors, chills, anxiety. Pharma: IM thiamine 300mg/24h NA PO diazepam 10mg kila masaa 4-6 kwa siku ya 1, punguza 20% kwa siku 5 (inpatient tu). Relapse prevention post-detox: PO naltrexone 50mg/24h titrate. DELIRIUM TREMENS (siku 2-3 baada ya kuacha, peak siku 5): visual hallucinations, disorientation, fluctuating consciousness, agitation, tachycardia, HTN, low-grade fever, withdrawal seizures (masaa 24-48). Dharura: IV diazepam 10mg (rudia kama hakuna jibu) AU IV/IM lorazepam 2mg AU IV chlordiazepoxide 20-60mg taper kwa mwezi mmoja. PAMOJA na IM thiamine 100-300mg/24h AU IV vitamin B complex 1ampoule katika 500ml 5% Dextrose.',
    summary_en:
      'Alcohol Withdrawal: insomnia, tremors, chills, anxiety. Pharma: IM thiamine 300mg/24h AND PO diazepam 10mg q4-6h day 1, reduce 20% over 5 days (inpatient only). Relapse prevention: PO naltrexone 50mg/24h titrate. DELIRIUM TREMENS (2-3 days post-cessation, peaks day 5): visual hallucinations, disorientation, fluctuating consciousness, agitation, tachycardia, HTN, low-grade fever, withdrawal seizures (24-48h). Emergency: IV diazepam 10mg (repeat PRN) OR IV/IM lorazepam 2mg OR IV chlordiazepoxide 20-60mg tapered ×1 month. AND IM thiamine 100-300mg/24h OR IV vitamin B complex 1amp in 500ml 5% Dextrose.',
    drugs: ['thiamine', 'diazepam', 'lorazepam', 'chlordiazepoxide', 'vitamin B complex', 'naltrexone'],
    q_patterns: [/(alcohol withdraw|kuacha pombe|delirium tremens|DT|withdrawal seizure|kutetemeka.*pombe)/i],
    next_step_sw: 'DT ni emergency ya ICU. Usinywe IV diazepam zaidi ya 5mg/min. Thiamine BEFORE glucose ili kuepuka Wernicke encephalopathy.',
    citation: `${SRC} §23.15.2.2 — Alcohol Withdrawal + Delirium Tremens (pp.550-551)`,
  },
  {
    id: 'tzstg-23-15-opioid-substitution',
    section: '23.15',
    topic: 'opioid_use',
    summary_sw:
      'Opioid Use Disorder + Heroin Withdrawal: PO methadone 10-30mg STAT (kulingana na clinical+UDS), ongeza 5-10mg kila siku 3-5 hadi withdrawal inadhibitiwa. Minimum miaka 2 ya treatment. AU PO buprenorphine 8-32mg 8-hourly titrate. Heroin withdrawal prevention: PO methadone 30-120mg/24h kwa minimum mwaka 1 AU PO buprenorphine 2-8mg/24h kwa minimum mwaka 1 AU PO naltrexone 25-50mg/24h kwa miezi 6. Opioid intoxication: IM/IV naloxone 0.04-15mg, kama hakuna jibu ongeza kila dakika 2. Symptomatic: insomnia → PO diazepam 5-20mg/24h x7 siku, abdominal cramps → PO hyoscine butyl bromide 20mg 8-24h AU PO diclofenac 50mg 8h, diarrhoea → PO loperamide 4mg STAT then 2mg/loose stool.',
    summary_en:
      'Opioid Use Disorder + Heroin Withdrawal: PO methadone 10-30mg stat (clinical+UDS), titrate 5-10mg every 3-5 days until withdrawal controlled. Minimum 2 years treatment. OR PO buprenorphine 8-32mg 8h. Heroin withdrawal: PO methadone 30-120mg/24h ×1 year minimum OR PO buprenorphine 2-8mg/24h ×1 year OR PO naltrexone 25-50mg/24h ×6 months. Opioid intoxication: IM/IV naloxone 0.04-15mg, repeat q2min if no response. Symptomatic: insomnia → PO diazepam 5-20mg/24h ×7d, cramps → PO hyoscine butyl bromide 20mg 8-24h OR PO diclofenac 50mg 8h, diarrhoea → PO loperamide 4mg stat then 2mg/loose stool.',
    drugs: ['methadone', 'buprenorphine', 'naltrexone', 'naloxone', 'diazepam', 'hyoscine butyl bromide', 'diclofenac', 'loperamide'],
    q_patterns: [/(opioid|heroin|methadone|buprenorphine|naltrexone|naloxone|bangi.*kuacha|afyuni)/i],
    next_step_sw: 'Refer to national guidelines for comprehensive management of opioid use disorder. Psychoeducation juu ya HIV transmission via shared needles ni muhimu.',
    citation: `${SRC} §23.15.1.2 + §23.15.2.2 — Opioid Use + Withdrawal (pp.548-551)`,
  },
  {
    id: 'tzstg-23-15-cocaine-stimulant',
    section: '23.15',
    topic: 'stimulant_use',
    summary_sw:
      'Cocaine/Stimulant Intoxication: tachycardia/bradycardia, mydriasis, BP changes, sweating/chills, nausea/vomiting, weight loss, psychomotor changes, weakness, respiratory depression, chest pain, arrhythmia, confusion, seizures, coma. Agitation → §23.1. Cocaine psychosis: PO chlorpromazine 100-1000mg/day divided AU PO haloperidol 1.5-6mg/day. Amphetamine intoxication: agitation → §23.1; post-detox depression → §23.9. Cannabis intoxication: PO chlorpromazine 100-1000mg/day AU PO haloperidol 1.5-6mg/day. Cocaine withdrawal: hakuna substitute, lakini PO diazepam 5-10mg 8h x5-7 siku. Beware depression + suicide risk.',
    summary_en:
      'Cocaine/Stimulant Intoxication: HR changes, mydriasis, BP changes, sweating/chills, N/V, weight loss, psychomotor changes, weakness, respiratory depression, chest pain, arrhythmia, confusion, seizures, coma. Agitation → §23.1. Cocaine psychosis: PO chlorpromazine 100-1000mg/day OR PO haloperidol 1.5-6mg/day. Amphetamine: agitation → §23.1; post-detox depression → §23.9. Cannabis: PO chlorpromazine OR haloperidol same doses. Cocaine withdrawal: no substitute; PO diazepam 5-10mg 8h ×5-7 days. Beware depression + suicide risk.',
    drugs: ['chlorpromazine', 'haloperidol', 'diazepam'],
    q_patterns: [/(cocaine|amphetamine|stimulant|cannabis|bangi|crack|meth|cokeini)/i],
    next_step_sw: 'Refer cocaine patients kwa specialized clinic. Stimulant-induced psychosis inaweza kufanana na schizophrenia — chukua historia ya substance use makini.',
    citation: `${SRC} §23.15.2.1 — Substance Intoxication (pp.549-550)`,
  },
  {
    id: 'tzstg-23-16-epilepsy-psych',
    section: '23.16',
    topic: 'epilepsy_psych',
    summary_sw:
      'Psychiatric disorders comorbid with epilepsy: MDD, bipolar, anxiety, psychoses, suicidality. AEDs zinaweza kusababisha psychiatric symptoms; psychotropics zingine zinaweza kupunguza seizure threshold. Psychotic disorders + epilepsy: PO carbamazepine 200-1000mg/day divided AU PO phenobarbitone 30-200mg/day AU PO sodium valproate 500-2000mg/day. Kama psychosis inakaa: PO haloperidol 0.75-4.5mg 12h (max 20mg) AU PO olanzapine 5-10mg/day (max 20mg) AU PO risperidone 0.5mg 12h titrate hadi 2-3mg (max 16mg). Postictal psychosis hupungua mwenyewe; interictal psychosis inahitaji antipsychotic. Depression + epilepsy: AED PAMOJA na PO amitriptyline 12.5-75mg nocte AU PO fluoxetine 10-20mg/day. Phenobarbital inaweza kusababisha depression — chagua AED nyingine. Sodium valproate/gabapentin/carbamazepine/lamotrigine zina antidepressant effect.',
    summary_en:
      'Psych comorbidity with epilepsy: MDD, bipolar, anxiety, psychoses, suicidality. AEDs may cause psych symptoms; some psychotropics lower seizure threshold. Psychotic + epilepsy: PO carbamazepine 200-1000mg/day OR PO phenobarbitone 30-200mg/day OR PO valproate 500-2000mg/day. Persistent psychosis: PO haloperidol 0.75-4.5mg 12h OR PO olanzapine 5-10mg/day OR PO risperidone 0.5mg 12h titrate. Postictal psychosis self-resolves; interictal needs antipsychotic. Depression + epilepsy: AED + PO amitriptyline 12.5-75mg nocte OR PO fluoxetine 10-20mg/day. Phenobarbital → depression; pick alternative. Valproate/gabapentin/carbamazepine/lamotrigine have antidepressant effect.',
    drugs: ['carbamazepine', 'phenobarbitone', 'sodium valproate', 'haloperidol', 'olanzapine', 'risperidone', 'amitriptyline', 'fluoxetine'],
    q_patterns: [/(epileps|kifafa).*(psych|depress|sonona|mania|psychos|anxiet)/i, /(psychiatr).*(epilep|kifafa)/i],
    next_step_sw: 'Priority: optimize seizure control kwanza — improved psychosocial functioning kwa kawaida hufuata seizure remission. Epuka medications zinazoshusha seizure threshold.',
    citation: `${SRC} §23.16 — Psychiatric Disorders with Epilepsy (pp.552-553)`,
  },
  {
    id: 'tzstg-23-17-perinatal',
    section: '23.17',
    topic: 'perinatal',
    summary_sw:
      'Psychiatric Disorders in Pregnancy: depression, anxiety, eating disorders, panic, bipolar, psychosis — mara nyingi underdiagnosed (kuhusishwa na pregnancy) na undertreated (concerns za fetal harm). Risk factors za perinatal depression: prior depression, kuacha dawa, postpartum history, family history, negative attitude kuhusu mimba, ukosefu wa support, maternal stress, partner/family unhappy. PERINATAL MDD: psychotherapy (CBT, IPT, education+support). Pharma kama indicated: PO amitriptyline 12.5-75mg nocte AU PO citalopram 10-60mg/24h AU PO fluoxetine 20-60mg/24h. Full disclosure ya risk+benefit kwa mgonjwa + partner. Anza dozi ndogo. Panic in pregnancy: screen thyroid kwanza. Bipolar: low-dose mood stabilizer baada ya risk/benefit assessment. Schizophrenia in pregnancy: mandatory treatment + mobilization of supports + hospitalization; ECT inaweza kutumika kwa psychotic depression.',
    summary_en:
      'Psychiatric Disorders in Pregnancy: depression, anxiety, eating disorders, panic, bipolar, psychosis — often underdiagnosed (attributed to pregnancy) and undertreated (fetal safety concerns). Perinatal depression risk: prior depression, med discontinuation, postpartum history, family history, negative attitude, lack of support, maternal stress, unhappy partner. Perinatal MDD: psychotherapy (CBT, IPT, education+support). Pharma if indicated: PO amitriptyline 12.5-75mg nocte OR PO citalopram 10-60mg/24h OR PO fluoxetine 20-60mg/24h. Full disclosure to patient + partner. Start low. Panic in pregnancy: screen thyroid. Bipolar: low-dose mood stabilizer after risk/benefit. Schizophrenia in pregnancy: mandatory treatment + supports + hospitalization; ECT may be used for psychotic depression.',
    drugs: ['amitriptyline', 'citalopram', 'fluoxetine'],
    q_patterns: [/(mimba|pregnant|perinatal|antenatal|postpartum|postnatal).*(depress|anxiet|bipolar|psychos|sonona|wasiwasi)/i],
    next_step_sw: 'Tumia TibaMama integration kwa antenatal mental health screening + EPDS. Maternal depression inaweza kuathiri early childhood development — refer for family-based intervention.',
    citation: `${SRC} §23.17 — Psychiatric Disorders in Pregnancy (pp.554-556)`,
  },
  {
    id: 'tzstg-23-18-autism',
    section: '23.18',
    topic: 'autism',
    summary_sw:
      'Autism Spectrum Disorder (DSM-5): marked difficulties katika communication+social engagement (multiple social situations), na repetitive behavioural patterns. Lazima ianze early developmental period. Non-pharma (watoto): individualised intervention plan, comprehensive early intervention, parent engagement, alternative-augmentative communication, visual strategies, social skills programmes. Parents: practical+emotional support, professional consultation kuhusu educational placement. Pharma: PO haloperidol 1.5-3mg/24h titrate AU PO methylphenidate 18-54mg/24h titrate (kwa ADHD overlap).',
    summary_en:
      'Autism Spectrum Disorder (DSM-5): marked communication+social difficulties across multiple settings, plus repetitive behavioural patterns. Must onset in early development. Non-pharma (children): individualised intervention plan, comprehensive early intervention, parent engagement, AAC, visual strategies, social skills programmes. Parents: practical+emotional support, professional consult re: educational placement. Pharma: PO haloperidol 1.5-3mg/24h titrate OR PO methylphenidate 18-54mg/24h titrate (ADHD overlap).',
    drugs: ['haloperidol', 'methylphenidate'],
    q_patterns: [/(autism|ASD|autistic|usonji|kuto.*ongea|spectrum disorder)/i],
    next_step_sw: 'Pharmacotherapy kwa autism ni adjunct tu — early behavioural intervention + AAC ni gold-standard. Refer kwa multi-disciplinary team (SLT, OT, special education).',
    citation: `${SRC} §23.18 — Autism Spectrum Disorder (pp.556-557)`,
  },
  {
    id: 'tzstg-23-19-adhd',
    section: '23.19',
    topic: 'adhd',
    summary_sw:
      'ADHD (DSM-5): inattention na/au hyperactivity-impulsivity kabla ya umri wa miaka 12, katika settings >=2 za kijamii. >=6 symptoms za inattention (>=5 kwa wenye umri >=17) NA/AU >=6 za hyperactivity-impulsivity. Non-pharma: (a) parent-training/education programmes (individual au group), CBT/social skills kwa watoto+vijana, classroom behavioural interventions kwa walimu. (b) Behaviour therapy: positive reinforcement (star chart, rewards, praises), environmental modifications (mbele ya darasa, kupunguza distractions). Combo ya behaviour therapy + medication ni bora kuliko medication peke yake.',
    summary_en:
      'ADHD (DSM-5): inattention and/or hyperactivity-impulsivity before age 12, in ≥2 settings. ≥6 inattention symptoms (≥5 if ≥17yo) AND/OR ≥6 hyperactivity-impulsivity. Non-pharma: (a) parent-training/education (individual or group), CBT/social skills for children/youth, teacher training in classroom behavioural interventions. (b) Behaviour therapy: positive reinforcement (star chart, rewards, praise), environmental mods (front of class, fewer distractions). Combo behaviour therapy + medication > medication alone.',
    drugs: ['methylphenidate'],
    q_patterns: [/(ADHD|attention deficit|hyperactivity|kutoangalia|kucheza sana|impulsiv)/i],
    next_step_sw: 'Methylphenidate iko §23.18 (autism overlap) — kwa pure ADHD, refer kwa specialist kwa diagnostic confirmation na medication initiation.',
    citation: `${SRC} §23.19 — ADHD (pp.557-558)`,
  },
  {
    id: 'tzstg-23-20-enuresis',
    section: '23.20',
    topic: 'enuresis',
    summary_sw:
      'Enuresis (DSM-5): repeated voiding ya mkojo kitandani/nguoni (mara 2/wiki x miezi 3 minimum) au significant distress/impairment. Umri >=5 (au developmental equivalent). Sio kutokana na diuretic au medical condition (diabetes, spina bifida, seizure). Non-pharma: fluid restriction usiku (saa 1 kabla ya desmopressin dose hadi asubuhi, au >=8h baada ya dose), star chart (effective 1/3 cases), alarm (mtoto lazima amke aende choo). Pharma: PO amitriptyline 25mg nocte titrate AU PO imipramine 100mg nocte titrate.',
    summary_en:
      'Enuresis (DSM-5): repeated voiding in bed/clothes (≥2x/week ×3 months) or significant distress/impairment. Age ≥5 (or equivalent). Not due to diuretic or medical condition. Non-pharma: fluid restriction at night (1h before desmopressin until next morning, or ≥8h after), star chart (1/3 effective), alarm (child must wake to urinate). Pharma: PO amitriptyline 25mg nocte titrate OR PO imipramine 100mg nocte titrate.',
    drugs: ['amitriptyline', 'imipramine', 'desmopressin'],
    q_patterns: [/(enuresis|kukojoa kitandani|bedwetting|bed.wetting|nocturnal)/i],
    next_step_sw: 'Hii ni clinically significant distress — usimuaibishe mtoto. Alarm therapy ina ushahidi mkubwa zaidi long-term kuliko pharmacotherapy.',
    citation: `${SRC} §23.20 — Enuresis (p.558)`,
  },
  {
    id: 'tzstg-23-21-nms',
    section: '23.21',
    topic: 'nms',
    summary_sw:
      'Neuroleptic Malignant Syndrome (NMS): mara nyingi inasababishwa na dozi kubwa za antipsychotics (haloperidol IV/IM). DALILI: muscle rigidity, fever, altered consciousness, mutism, dysphagia, diaphoresis, tachycardia, labile BP, tremor, incontinence, leukocytosis, increased CK. CLINICAL EMERGENCY → ICU. Hatua: (1) STOP antipsychotic mara moja. (2) Supportive: bed rest, rapid cooling (tepid water spray, IV fluids). (3) IV diazepam 10mg AU IM/IV lorazepam 2mg sedative AU PO bromocriptine 2.5mg 8h. Ventilator/intubation kwa severe respiratory difficulty.',
    summary_en:
      'Neuroleptic Malignant Syndrome (NMS): often from high-dose antipsychotics (haloperidol IV/IM). SIGNS: muscle rigidity, fever, altered consciousness, mutism, dysphagia, diaphoresis, tachycardia, labile BP, tremor, incontinence, leukocytosis, ↑CK. CLINICAL EMERGENCY → ICU. Steps: (1) STOP antipsychotic immediately. (2) Supportive: bed rest, rapid cooling (tepid water spray, IV fluids). (3) IV diazepam 10mg OR IM/IV lorazepam 2mg sedative OR PO bromocriptine 2.5mg 8h. Ventilator/intubation if severe.',
    drugs: ['diazepam', 'lorazepam', 'bromocriptine'],
    q_patterns: [/(neuroleptic malignant|NMS|antipsychotic.*fever|muscle rigid.*antipsychotic|hyperthermia.*antipsychotic)/i],
    next_step_sw: 'NMS ina mortality kubwa kama haijadhibitiwa — emergency ICU referral. Risk factors: high-potency typical antipsychotics, IM/IV route, dehydration, agitation.',
    citation: `${SRC} §23.21 — NMS (p.558)`,
  },
  {
    id: 'tzstg-23-22-somatic',
    section: '23.22',
    topic: 'somatic',
    summary_sw:
      'Somatic Symptom Disorder (DSM-5): >=1 somatic symptom inayoleta distress au disruption + excessive thoughts/feelings/behaviours kuhusu symptoms (disproportionate persistent thoughts, high anxiety, excessive time/energy). Duration >=miezi 6. Non-pharma: regular appointments na physician mmoja, EPUKA unnecessary investigations (lakini physical exam kwa complaints mpya), empathy, psychotherapy (self-help, supportive, CBT — challenge cognitive distortions, activity scheduling), increased social/occupational function. Pharma: PO amitriptyline 25-50mg/24h titrate AU PO imipramine 100mg/24h titrate AU PO fluoxetine 10-20mg/24h titrate.',
    summary_en:
      'Somatic Symptom Disorder (DSM-5): ≥1 somatic symptom causing distress/disruption + excessive thoughts/feelings/behaviours (disproportionate persistent thoughts, high anxiety, excessive time/energy). Duration ≥6 months. Non-pharma: regular appointments with fixed physician, AVOID unnecessary investigations (but physical exam for new complaints), empathy, psychotherapy (self-help, supportive, CBT — challenge cognitive distortions, activity scheduling), increased social/occupational function. Pharma: PO amitriptyline 25-50mg/24h titrate OR PO imipramine 100mg/24h titrate OR PO fluoxetine 10-20mg/24h titrate.',
    drugs: ['amitriptyline', 'imipramine', 'fluoxetine'],
    q_patterns: [/(somatic|somatization|psychosomatic|maumivu yasiyoelezeka|magonjwa mengi yasiyofahamika)/i],
    next_step_sw: 'Investigations zisizo na sababu zinaweza KUONGEZA symptoms — therapeutic alliance + scheduled visits ndio msingi.',
    citation: `${SRC} §23.22 — Somatic Symptom Disorder (p.559)`,
  },
  {
    id: 'tzstg-23-24-conversion',
    section: '23.24',
    topic: 'conversion',
    summary_sw:
      'Conversion Disorder (DSM-5): >=1 dalili ya altered voluntary motor au sensory function. Clinical findings evidence ya incompatibility kati ya symptom na neurological/medical conditions zinazojulikana. Sio better explained na medical/mental disorder nyingine. Inasababisha distress/impairment au inaitaji medical evaluation. Non-pharma: psychoeducation, cognitive psychotherapy. Pharma: PO amitriptyline 25-50mg/24h titrate AU PO imipramine 100mg once daily titrate AU PO fluoxetine 10-20mg/24h titrate.',
    summary_en:
      'Conversion Disorder (DSM-5): ≥1 symptom of altered voluntary motor/sensory function. Clinical evidence of incompatibility with neurological/medical conditions. Not better explained. Causes significant distress/impairment or warrants medical evaluation. Non-pharma: psychoeducation, cognitive-psychotherapy. Pharma: PO amitriptyline 25-50mg/24h titrate OR PO imipramine 100mg once daily titrate OR PO fluoxetine 10-20mg/24h titrate.',
    drugs: ['amitriptyline', 'imipramine', 'fluoxetine'],
    q_patterns: [/(conversion disorder|functional neurolog|pseudoneurolog|kupoteza hisia bila sababu)/i],
    next_step_sw: 'Ni muhimu kuondoa neurological cause kwanza (CT, MRI, EEG) — diagnosis ya exclusion sio elimination.',
    citation: `${SRC} §23.24 — Conversion Disorder (p.559)`,
  },
]

export function findTzStgMhAnswer(query: string): TzStgMhEntry | null {
  const q = query.toLowerCase()
  for (const e of TZ_STG_MH_2021) {
    for (const rx of e.q_patterns) {
      if (rx.test(q)) return e
    }
  }
  return null
}

export function askTzStgMh(query: string): { domain: string; respond: string; next_step: string; citation: string } | null {
  const hit = findTzStgMhAnswer(query)
  if (!hit) return null
  return {
    domain: 'TZ STG-NEMLIT 2021 — Mental Health',
    respond: hit.summary_sw,
    next_step: `Hatua: ${hit.next_step_sw}`,
    citation: hit.citation,
  }
}
