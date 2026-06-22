/**
 * ICD-10 Chapter V (F00-F99) + ICD-11 Chapter 06 — Mental, behavioural
 * or neurodevelopmental disorders. Cross-walk module.
 *
 * Sources:
 * - WHO ICD-10 Chapter V — F00-F99 (open clinical use)
 * - WHO ICD-11 MMS Chapter 06 — Mental, behavioural or neurodevelopmental
 *   disorders (CC BY-ND 3.0 IGO)
 *
 * Why both: Tanzania currently codes in ICD-10 (NHIF claims, DHIS2,
 * mortality reporting). ICD-11 became effective globally 2022-01-01;
 * Tanzania is on the migration path. Tumaini surfaces BOTH codes so
 * clinicians can document today and futureproof tomorrow.
 *
 * Cross-references back to TZ STG-NEMLIT 2021 Ch.23 sections for
 * Tanzania-specific treatment guidance.
 */

export interface IcdEntry {
  id: string
  icd10: string
  icd11: string
  title_en: string
  title_sw: string
  definition_sw: string
  definition_en: string
  stg_section?: string
  q_patterns: RegExp[]
  next_step_sw: string
}

const SRC10 = 'WHO ICD-10 Ch.V'
const SRC11 = 'WHO ICD-11 MMS Ch.06'

export const ICD_MENTAL_CODES: IcdEntry[] = [
  {
    id: 'icd-f00-alzheimer',
    icd10: 'F00',
    icd11: '6D80',
    title_en: "Dementia in Alzheimer's disease",
    title_sw: 'Dementia katika ugonjwa wa Alzheimer',
    definition_sw:
      'Ugonjwa wa kupungua kwa cognitive function (kumbukumbu, fikra, lugha, judgment) unaosababishwa na primary degenerative cerebral disease ya Alzheimer. Onset ni polepole na kuendelea miaka kadhaa. Consciousness haijatabaruka.',
    definition_en:
      'A degenerative cerebral disease causing progressive decline in cognitive function (memory, thinking, language, judgment). Insidious onset over years. Consciousness not clouded.',
    stg_section: '§23.3',
    q_patterns: [/(alzheimer|dementia.*alzheimer|F00|6D80)/i],
    next_step_sw: 'TZ STG §23.3: PO donepezil 5mg → 10mg/24h baada ya wiki 4-6.',
  },
  {
    id: 'icd-f01-vascular-dementia',
    icd10: 'F01',
    icd11: '6D81',
    title_en: 'Vascular dementia',
    title_sw: 'Dementia ya mishipa',
    definition_sw:
      'Dementia inayotokana na infarction ya ubongo kutokana na ugonjwa wa vascular (mishipa). Sub-cortical au multi-infarct presentation. Onset mara nyingi ghafla baada ya TIA/CVA.',
    definition_en:
      'Dementia resulting from cerebral infarction due to vascular disease. Sub-cortical or multi-infarct presentation. Often acute onset after TIA/CVA.',
    stg_section: '§23.3',
    q_patterns: [/(vascular dementia|multi.infarct|F01|6D81|stroke.*dementia)/i],
    next_step_sw: 'Vascular risk factor control (BP, glucose, lipids) ni primary. Donepezil per STG §23.3 kama AD overlay.',
  },
  {
    id: 'icd-f05-delirium',
    icd10: 'F05',
    icd11: '6D70',
    title_en: 'Delirium, not induced by alcohol/psychoactive substance',
    title_sw: 'Delirium isiyotokana na pombe au dawa za kulewa',
    definition_sw:
      'Acute confusional state ya etiology isiyo-substance: altered consciousness, disorientation kwa wakati/mahali, fluctuating course, perceptual disturbance (hallucinations), psychomotor changes. Mara nyingi sababu: infection, metabolic, electrolyte, hypoxia, surgery, hospitalization.',
    definition_en:
      'Acute confusional state of non-substance etiology: altered consciousness, disorientation in time/place, fluctuating course, perceptual disturbance, psychomotor changes. Common causes: infection, metabolic, electrolyte, hypoxia, surgery.',
    stg_section: '§23.2',
    q_patterns: [/(delirium|F05|6D70|acute confusional)/i],
    next_step_sw: 'Tafuta + tibu sababu ya msingi. STG §23.2: IM haloperidol 5mg STAT, max 20mg/24h.',
  },
  {
    id: 'icd-f10-alcohol',
    icd10: 'F10',
    icd11: '6C40',
    title_en: 'Mental and behavioural disorders due to alcohol use',
    title_sw: 'Matatizo ya akili na tabia kutokana na matumizi ya pombe',
    definition_sw:
      'Spectrum ya intoxication, harmful use, dependence syndrome, withdrawal state, withdrawal with delirium (DT), psychotic disorder, amnesic syndrome, residual disorder. Subcodes: F10.0 acute intoxication, F10.1 harmful use, F10.2 dependence, F10.3 withdrawal, F10.4 withdrawal+delirium, F10.5 psychotic.',
    definition_en:
      'Spectrum: intoxication, harmful use, dependence, withdrawal, withdrawal with delirium (DT), psychotic disorder, amnesic syndrome. Subcodes: .0 intoxication, .1 harmful use, .2 dependence, .3 withdrawal, .4 withdrawal+delirium, .5 psychotic.',
    stg_section: '§23.15.1.1, §23.15.2.2',
    q_patterns: [/(alcohol|F10|6C40|pombe|delirium tremens|alcohol use|AUD|alcoholism)/i],
    next_step_sw: 'Screen na AUDIT. STG §23.15: thiamine 300mg/24h + diazepam taper. DT → emergency ICU.',
  },
  {
    id: 'icd-f11-opioid',
    icd10: 'F11',
    icd11: '6C43',
    title_en: 'Mental and behavioural disorders due to opioid use',
    title_sw: 'Matatizo ya akili kutokana na matumizi ya opioid (heroin/afyuni)',
    definition_sw:
      'Heroin, morphine, methadone, codeine, tramadol, fentanyl. Subcodes: .0 intoxication, .1 harmful use, .2 dependence, .3 withdrawal. Withdrawal: myalgia, gooseflesh, diarrhoea, rhinorrhoea, lacrimation, mydriasis, anxiety, insomnia.',
    definition_en:
      'Heroin, morphine, methadone, codeine, tramadol, fentanyl. Subcodes: .0 intoxication, .1 harmful use, .2 dependence, .3 withdrawal. Withdrawal: myalgia, gooseflesh, diarrhoea, rhinorrhoea, lacrimation, mydriasis, anxiety, insomnia.',
    stg_section: '§23.15.1.2, §23.15.2.2',
    q_patterns: [/(opioid|F11|6C43|heroin|methadone|buprenorphine|fentanyl|naloxone)/i],
    next_step_sw: 'STG §23.15: PO methadone 30-120mg/24h OR buprenorphine 2-8mg/24h ≥1 year. Intoxication → IM naloxone.',
  },
  {
    id: 'icd-f12-cannabis',
    icd10: 'F12',
    icd11: '6C41',
    title_en: 'Mental and behavioural disorders due to cannabinoid use',
    title_sw: 'Matatizo ya akili kutokana na bangi',
    definition_sw:
      'Cannabis (bangi), THC. Subcodes: .0 intoxication, .1 harmful, .2 dependence, .3 withdrawal, .5 psychotic (cannabis-induced psychosis). Tanzania: bangi haramu, lakini matumizi yamekuwa yameongezeka miongoni mwa vijana.',
    definition_en:
      'Cannabis (bangi), THC. Subcodes: .0 intoxication, .1 harmful, .2 dependence, .3 withdrawal, .5 psychotic (cannabis-induced psychosis). Use rising among Tanzanian youth.',
    stg_section: '§23.15.2.1',
    q_patterns: [/(cannabis|F12|6C41|bangi|THC|marijuana|ganja)/i],
    next_step_sw: 'STG §23.15.2.1 (cannabis intoxication): PO chlorpromazine 100-1000mg/day OR PO haloperidol 1.5-6mg/day.',
  },
  {
    id: 'icd-f14-cocaine',
    icd10: 'F14',
    icd11: '6C45',
    title_en: 'Mental and behavioural disorders due to cocaine use',
    title_sw: 'Matatizo ya akili kutokana na cocaine',
    definition_sw:
      'Cocaine (powder, crack). Intoxication: euphoria, mydriasis, tachycardia/HTN, agitation. Severe: arrhythmia, MI, seizures, stroke. Withdrawal: depression, anhedonia, fatigue, hypersomnia, increased appetite, suicide risk.',
    definition_en:
      'Cocaine (powder, crack). Intoxication: euphoria, mydriasis, tachycardia/HTN, agitation. Severe: arrhythmia, MI, seizures, stroke. Withdrawal: depression, anhedonia, fatigue, hypersomnia, increased appetite, suicide risk.',
    stg_section: '§23.15.2.1, §23.15.2.2',
    q_patterns: [/(cocaine|F14|6C45|crack|coke|cokeini)/i],
    next_step_sw: 'STG §23.15: hakuna substitute; PO diazepam 5-10mg 8h ×5-7 siku. Monitor depression+suicide.',
  },
  {
    id: 'icd-f15-stimulant',
    icd10: 'F15',
    icd11: '6C46',
    title_en: 'Mental disorders due to other stimulants (incl. methamphetamine)',
    title_sw: 'Matatizo ya akili kutokana na stimulants nyingine (incl. methamphetamine)',
    definition_sw:
      'Amphetamine, methamphetamine, MDMA, khat, methylphenidate. Stimulant psychosis hufanana na schizophrenia (paranoid delusions, hallucinations). Tanzania: khat (mirungi) inatumika hasa kanda za pwani.',
    definition_en:
      'Amphetamine, methamphetamine, MDMA, khat, methylphenidate. Stimulant psychosis mimics schizophrenia (paranoid delusions, hallucinations). Tanzania: khat (mirungi) is used in coastal regions.',
    stg_section: '§23.15.2.1',
    q_patterns: [/(amphetamine|methamphetamine|F15|6C46|khat|mirungi|MDMA|meth|stimulant)/i],
    next_step_sw: 'STG §23.15.2.1: agitation → §23.1 protocol. Post-detox depression → §23.9 protocol.',
  },
  {
    id: 'icd-f17-nicotine',
    icd10: 'F17',
    icd11: '6C4A',
    title_en: 'Mental and behavioural disorders due to tobacco/nicotine',
    title_sw: 'Matatizo ya akili kutokana na sigara/nikotini',
    definition_sw:
      'Tobacco smoking, vaping, nicotine pouches. Subcodes: .1 harmful, .2 dependence, .3 withdrawal. Withdrawal: restlessness, tremors, insomnia, anxiety, loss of appetite, irritability.',
    definition_en:
      'Tobacco, vaping, nicotine pouches. Subcodes: .1 harmful, .2 dependence, .3 withdrawal. Withdrawal: restlessness, tremors, insomnia, anxiety, loss of appetite, irritability.',
    stg_section: '§23.15.1.3',
    q_patterns: [/(nicotine|tobacco|F17|6C4A|smoking|sigara|tumbaku)/i],
    next_step_sw: 'STG §23.15.1.3: support group + inpatient rehab kama necessary. NRT (gum/patch) sio sehemu ya NEML rasmi bado.',
  },
  {
    id: 'icd-f20-schizophrenia',
    icd10: 'F20',
    icd11: '6A20',
    title_en: 'Schizophrenia',
    title_sw: 'Skizofrenia',
    definition_sw:
      'Chronic psychotic disorder: delusions, hallucinations, disorganized speech/behaviour, negative symptoms (avolition, flat affect, alogia). Subtypes (ICD-10): F20.0 paranoid, F20.1 hebephrenic, F20.2 catatonic, F20.3 undifferentiated, F20.5 residual, F20.6 simple. ICD-11 inaondoa subtypes hizi.',
    definition_en:
      'Chronic psychotic disorder: delusions, hallucinations, disorganized speech/behaviour, negative symptoms. ICD-10 subtypes: .0 paranoid, .1 hebephrenic, .2 catatonic, .3 undifferentiated, .5 residual, .6 simple. ICD-11 removes subtype distinctions.',
    stg_section: '§23.4',
    q_patterns: [/(schizophren|F20|6A20|skizofren|hebephren|paranoid schiz)/i],
    next_step_sw: 'STG §23.4: PO haloperidol 3-4.5mg 12h OR olanzapine 5-10mg/24h OR risperidone 1mg 12h. Depot kwa compliance dhaifu.',
  },
  {
    id: 'icd-f22-delusional',
    icd10: 'F22',
    icd11: '6A24',
    title_en: 'Persistent delusional disorder',
    title_sw: 'Delusional disorder ya kudumu',
    definition_sw:
      'Single delusion au seti ya delusions zinazoungana (persecutory, jealousy, somatic, grandiose, erotomanic) kudumu ≥3 miezi, bila hallucinations prominent au mood disturbance. Functioning katika maeneo mengine kawaida ni preserved.',
    definition_en:
      'Single delusion or related set (persecutory, jealousy, somatic, grandiose, erotomanic) lasting ≥3 months, without prominent hallucinations or mood disturbance. Functioning in other areas often preserved.',
    stg_section: '§23.4',
    q_patterns: [/(delusional disorder|F22|6A24|persistent delusion|paranoid disorder)/i],
    next_step_sw: 'Differentiate na schizophrenia (functioning preserved hapa). Treat per STG §23.4 schizophrenia protocol.',
  },
  {
    id: 'icd-f23-brief-psychotic',
    icd10: 'F23',
    icd11: '6A23',
    title_en: 'Acute and transient psychotic disorders',
    title_sw: 'Saikosi za muda mfupi',
    definition_sw:
      'Acute onset psychotic symptoms (delusions, hallucinations, disorganization, catatonic features) kudumu ≥1 siku hadi <1 mwezi, na full return to premorbid functioning. Mara nyingi precipitated na acute stress.',
    definition_en:
      'Acute-onset psychotic symptoms lasting ≥1 day to <1 month with full return to premorbid functioning. Often precipitated by acute stress.',
    stg_section: '§23.7',
    q_patterns: [/(brief psychotic|F23|6A23|transient psychotic|acute psychotic)/i],
    next_step_sw: 'STG §23.7: manage as schizophrenia, taper antipsychotic baada ya remission. Monitor relapse.',
  },
  {
    id: 'icd-f25-schizoaffective',
    icd10: 'F25',
    icd11: '6A21',
    title_en: 'Schizoaffective disorders',
    title_sw: 'Schizoaffective disorder',
    definition_sw:
      'Episode ya schizophrenia + mood disorder (manic au depressive) simultaneously au within few days of each other. Subtypes: .0 manic type, .1 depressive type, .2 mixed.',
    definition_en:
      'Episode of schizophrenia + mood disorder (manic or depressive) simultaneously or within a few days. Subtypes: .0 manic, .1 depressive, .2 mixed.',
    stg_section: '§23.6',
    q_patterns: [/(schizoaffective|F25|6A21)/i],
    next_step_sw: 'STG §23.6: antipsychotic + mood stabilizer (carbamazepine/valproate) au antidepressant kulingana na subtype.',
  },
  {
    id: 'icd-f31-bipolar',
    icd10: 'F31',
    icd11: '6A60',
    title_en: 'Bipolar affective disorder',
    title_sw: 'Bipolar (mood swings)',
    definition_sw:
      'Two or more episodes (one of which must be manic/hypomanic). Subcodes ICD-10: .0 hypomanic, .1 manic without psychotic, .2 manic with psychotic, .3 depressive, .4 mixed, .5 remission, .6 in remission. ICD-11 inawasilisha 6A60 Bipolar I + 6A61 Bipolar II separately.',
    definition_en:
      'Two or more episodes (one must be manic/hypomanic). ICD-10 subcodes: .0 hypomanic, .1 manic w/o psychotic, .2 manic w/ psychotic, .3 depressive, .4 mixed, .5/.6 remission. ICD-11 splits into 6A60 Bipolar I + 6A61 Bipolar II.',
    stg_section: '§23.8',
    q_patterns: [/(bipolar|F31|6A60|6A61|mania|manic|hypomanic|mood swing)/i],
    next_step_sw: 'STG §23.8: mood stabilizer (carbamazepine/valproate/lamotrigine). Bipolar depression → combo na antidepressant + antipsychotic. NEVER monotherapy antidepressant.',
  },
  {
    id: 'icd-f32-depression',
    icd10: 'F32',
    icd11: '6A70',
    title_en: 'Depressive episode (single)',
    title_sw: 'Sonona (single episode)',
    definition_sw:
      'Depressed mood, anhedonia, reduced energy kwa ≥2 wiki + somatic + cognitive features. Severity codes ICD-10: F32.0 mild, F32.1 moderate, F32.2 severe without psychotic, F32.3 severe with psychotic. PHQ-9: 5-9 mild, 10-14 moderate, 15-19 moderately severe, 20+ severe.',
    definition_en:
      'Depressed mood, anhedonia, reduced energy ≥2 weeks + somatic + cognitive features. Severity ICD-10: .0 mild, .1 moderate, .2 severe w/o psychotic, .3 severe w/ psychotic. PHQ-9: 5-9 mild, 10-14 moderate, 15-19 mod-severe, 20+ severe.',
    stg_section: '§23.9',
    q_patterns: [/(depress.*episode|F32|6A70|single episode depress|MDE|major depressive)/i],
    next_step_sw: 'PHQ-9 screen. STG §23.9: amitriptyline 25-150mg nocte OR citalopram 10-60mg OR fluoxetine 20-60mg AM.',
  },
  {
    id: 'icd-f33-recurrent-depression',
    icd10: 'F33',
    icd11: '6A71',
    title_en: 'Recurrent depressive disorder',
    title_sw: 'Sonona inayorudia',
    definition_sw:
      'Repeated depressive episodes per F32 criteria, with no manic/hypomanic episode (which would shift to F31 Bipolar). Maintenance therapy mara nyingi inahitajika ≥6 miezi baada ya remission ya episode ya kwanza, ≥2 miaka kwa recurrent.',
    definition_en:
      'Repeated depressive episodes per F32 criteria, with no manic/hypomanic episode (which would shift to F31). Maintenance often needed ≥6 months after first episode remission, ≥2 years for recurrent.',
    stg_section: '§23.9',
    q_patterns: [/(recurrent depress|F33|6A71|MDD recurrent|sonona inayorudia)/i],
    next_step_sw: 'Continuation phase per STG §23.9. Episode ≥3 → consider lifelong maintenance + psychotherapy adjunct.',
  },
  {
    id: 'icd-f40-phobic',
    icd10: 'F40',
    icd11: '6B03',
    title_en: 'Phobic anxiety disorders',
    title_sw: 'Hofu (phobic) za anxiety',
    definition_sw:
      'Anxiety + avoidance ya specific situations/objects. Subcodes: F40.0 agoraphobia, F40.1 social phobia, F40.2 specific phobias. ICD-11: 6B00 GAD, 6B01 Panic, 6B02 Agoraphobia, 6B03 Specific Phobia, 6B04 Social Anxiety, 6B05 Separation Anxiety.',
    definition_en:
      'Anxiety + avoidance of specific situations/objects. ICD-10: .0 agoraphobia, .1 social phobia, .2 specific. ICD-11: 6B00 GAD, 6B01 Panic, 6B02 Agoraphobia, 6B03 Specific Phobia, 6B04 Social Anxiety, 6B05 Separation.',
    stg_section: '§23.11',
    q_patterns: [/(phobi|F40|6B03|agoraphobi|social anxiety|social phobia|hofu specifi)/i],
    next_step_sw: 'CBT + exposure therapy ndiyo first-line. SSRI per STG §23.11 kwa severe au treatment-resistant.',
  },
  {
    id: 'icd-f41-anxiety',
    icd10: 'F41',
    icd11: '6B00',
    title_en: 'Other anxiety disorders (GAD, Panic)',
    title_sw: 'Anxiety disorders nyingine (GAD, Panic)',
    definition_sw:
      'F41.0 Panic disorder (recurrent unexpected panic attacks). F41.1 GAD (persistent worry + somatic). F41.2 Mixed anxiety+depressive. GAD-7: 5-9 mild, 10-14 moderate, 15+ severe.',
    definition_en:
      'F41.0 Panic disorder, F41.1 GAD, F41.2 Mixed anxiety+depressive. GAD-7: 5-9 mild, 10-14 moderate, 15+ severe.',
    stg_section: '§23.11, §23.12',
    q_patterns: [/(GAD|F41|6B00|6B01|generalized anxiety|panic disorder|wasiwasi)/i],
    next_step_sw: 'GAD-7 screen. STG §23.11 (GAD) + §23.12 (panic): SSRI/TCA first-line, benzodiazepine acute only.',
  },
  {
    id: 'icd-f42-ocd',
    icd10: 'F42',
    icd11: '6B20',
    title_en: 'Obsessive-compulsive disorder',
    title_sw: 'OCD (obsessions + compulsions)',
    definition_sw:
      'Persistent intrusive thoughts (obsessions) + ritualized behaviours (compulsions) inayoathiri functioning. Subcodes ICD-10: .0 obsessions predominant, .1 compulsions predominant, .2 mixed. ICD-11: 6B20 OCD, 6B21 BDD, 6B22 Olfactory reference, 6B23 Hypochondriasis, 6B24 Hoarding.',
    definition_en:
      'Persistent intrusive thoughts (obsessions) + ritualized behaviours (compulsions) affecting functioning. ICD-11 OCD spectrum: 6B20 OCD, 6B21 BDD, 6B22 Olfactory reference, 6B23 Hypochondriasis, 6B24 Hoarding.',
    stg_section: '§23.13',
    q_patterns: [/(OCD|F42|6B20|obsessive.compulsive|obsession|compulsion)/i],
    next_step_sw: 'ERP (exposure-response prevention) gold-standard CBT. STG §23.13: SSRI dose mara nyingi >MDD dose (citalopram→40mg, fluoxetine→40-80mg).',
  },
  {
    id: 'icd-f43-stress-ptsd',
    icd10: 'F43',
    icd11: '6B40',
    title_en: 'Reaction to severe stress, and adjustment disorders',
    title_sw: 'Stress-related disorders (ASD, PTSD, Adjustment)',
    definition_sw:
      'F43.0 Acute stress reaction (<48h). F43.1 Acute stress disorder (≤4 wiki). F43.2 Adjustment disorder. F43.10 PTSD. ICD-11: 6B40 PTSD, 6B41 Complex PTSD, 6B42 Prolonged grief, 6B43 Adjustment disorder, 6B44 Reactive attachment.',
    definition_en:
      'F43.0 Acute stress reaction (<48h), F43.1 ASD (≤4 weeks), F43.2 Adjustment, F43.10 PTSD. ICD-11: 6B40 PTSD, 6B41 Complex PTSD, 6B42 Prolonged grief, 6B43 Adjustment, 6B44 Reactive attachment.',
    stg_section: '§23.14',
    q_patterns: [/(PTSD|F43|6B40|6B41|acute stress|complex PTSD|adjustment disorder|trauma)/i],
    next_step_sw: 'STG §23.14: trauma-focused CBT ndio first-line. SSRI (fluoxetine 20-40mg) au TCA (amitriptyline) kwa pharmacotherapy.',
  },
  {
    id: 'icd-f44-dissociative',
    icd10: 'F44',
    icd11: '6B60',
    title_en: 'Dissociative (conversion) disorders',
    title_sw: 'Dissociative + conversion disorders',
    definition_sw:
      'Loss of integration kati ya memory, identity, sensation, motor control. F44.0 amnesia, F44.1 fugue, F44.2 stupor, F44.3 trance/possession, F44.4-7 motor/sensory/convulsion (conversion). ICD-11: 6B60 Dissociative neurological symptom (= conversion), 6B61 amnesia, 6B62 trance, 6B64 DID, 6B65 depersonalization.',
    definition_en:
      'Loss of integration among memory, identity, sensation, motor. ICD-11: 6B60 Dissociative neurological symptom (= conversion), 6B61 amnesia, 6B62 trance, 6B64 DID, 6B65 depersonalization.',
    stg_section: '§23.24',
    q_patterns: [/(dissociative|F44|6B60|6B64|conversion disorder|DID|amnesia.*psychogenic)/i],
    next_step_sw: 'STG §23.24 (conversion): rule out neurological. Non-pharma + SSRI/TCA per STG.',
  },
  {
    id: 'icd-f45-somatoform',
    icd10: 'F45',
    icd11: '6C20',
    title_en: 'Somatoform / Bodily distress disorders',
    title_sw: 'Somatoform / bodily distress',
    definition_sw:
      'Physical symptoms zisizoelezeka na medical findings. F45.0 somatization, F45.1 undifferentiated, F45.2 hypochondriacal, F45.3 autonomic, F45.4 persistent somatoform pain. ICD-11: 6C20 Bodily distress disorder, 6B23 Hypochondriasis (sasa katika OCD spectrum).',
    definition_en:
      'Physical symptoms not explained by medical findings. ICD-11: 6C20 Bodily distress disorder, 6B23 Hypochondriasis (now in OCD spectrum).',
    stg_section: '§23.22',
    q_patterns: [/(somatoform|F45|6C20|somatization|bodily distress|hypochondria|psychosomatic)/i],
    next_step_sw: 'STG §23.22: regular appointments + empathy + CBT. SSRI/TCA per STG.',
  },
  {
    id: 'icd-f50-eating',
    icd10: 'F50',
    icd11: '6B80',
    title_en: 'Eating disorders',
    title_sw: 'Eating disorders (Anorexia, Bulimia, Binge)',
    definition_sw:
      'F50.0 Anorexia nervosa, F50.2 Bulimia, F50.4 BED (binge eating). ICD-11: 6B80 AN, 6B81 BN, 6B82 BED, 6B83 ARFID, 6B84 Pica. Tanzania: prevalence ndogo kuliko HIC lakini inaongezeka miongoni mwa vijana wa mijini.',
    definition_en:
      'F50.0 AN, F50.2 BN, F50.4 BED. ICD-11: 6B80 AN, 6B81 BN, 6B82 BED, 6B83 ARFID, 6B84 Pica. Tanzania prevalence rising in urban youth.',
    q_patterns: [/(anorexia|bulimia|F50|6B80|6B81|6B82|eating disorder|binge eating)/i],
    next_step_sw: 'Refer specialist + dietitian. Family-Based Therapy (FBT) gold-standard kwa adolescent AN.',
  },
  {
    id: 'icd-f60-personality',
    icd10: 'F60',
    icd11: '6D10',
    title_en: 'Specific personality disorders',
    title_sw: 'Personality disorders',
    definition_sw:
      'F60.0 paranoid, F60.1 schizoid, F60.2 dissocial (antisocial), F60.3 EUPD (borderline), F60.4 histrionic, F60.5 anankastic (OCPD), F60.6 anxious (avoidant), F60.7 dependent. ICD-11 inaondoa subtypes, inatumia severity (mild/moderate/severe) + 5 trait domains (negative affectivity, detachment, dissociality, disinhibition, anankastia).',
    definition_en:
      'ICD-10: 8 subtypes (paranoid, schizoid, antisocial, borderline, histrionic, OCPD, avoidant, dependent). ICD-11 dimensional: severity (mild/moderate/severe) + 5 trait domains (negative affectivity, detachment, dissociality, disinhibition, anankastia).',
    q_patterns: [/(personality disorder|F60|6D10|EUPD|borderline|antisocial|schizoid|narcissistic)/i],
    next_step_sw: 'DBT (Linehan) au MBT (Bateman) kwa BPD. Pharmacotherapy targets symptoms tu (mood lability, impulsivity), sio PD yenyewe.',
  },
  {
    id: 'icd-f70-id',
    icd10: 'F70-F79',
    icd11: '6A00',
    title_en: 'Disorders of intellectual development (Intellectual Disability)',
    title_sw: 'Disorders of intellectual development (ulemavu wa akili)',
    definition_sw:
      'IQ + adaptive function deficits. ICD-10: F70 mild (IQ 50-69), F71 moderate (35-49), F72 severe (20-34), F73 profound (<20). ICD-11: 6A00.0 mild, 6A00.1 moderate, 6A00.2 severe, 6A00.3 profound, 6A00.4 provisional, 6A00.Z unspecified. Diagnosis inahitaji onset kabla ya age 18.',
    definition_en:
      'IQ + adaptive function deficits, onset <18yo. ICD-10: F70 mild (IQ 50-69), F71 moderate (35-49), F72 severe (20-34), F73 profound (<20). ICD-11: 6A00.0-.3 mild→profound.',
    q_patterns: [/(intellectual disability|F70|F71|F72|F73|6A00|mental retardation|ulemavu wa akili|low IQ)/i],
    next_step_sw: 'Tanzania: Patandi Special School (Arusha) + special-needs network. Refer pediatric developmental specialist.',
  },
  {
    id: 'icd-f84-autism',
    icd10: 'F84',
    icd11: '6A02',
    title_en: 'Pervasive developmental / Autism spectrum disorders',
    title_sw: 'Autism spectrum disorder (usonji)',
    definition_sw:
      'ICD-10: F84.0 Autism (Kanner), F84.1 Atypical, F84.2 Rett, F84.3 CDD, F84.5 Asperger. ICD-11 inakwenda single category: 6A02 Autism Spectrum Disorder na sub-codes za intellectual development + functional language.',
    definition_en:
      'ICD-10: F84.0 Kanner autism, F84.1 atypical, F84.2 Rett, F84.3 CDD, F84.5 Asperger. ICD-11 single category: 6A02 ASD with intellectual + language sub-codes.',
    stg_section: '§23.18',
    q_patterns: [/(autism|ASD|F84|6A02|asperger|usonji|spectrum disorder)/i],
    next_step_sw: 'STG §23.18: individualised intervention plan, AAC, social skills. Haloperidol/methylphenidate kwa comorbid agitation/ADHD.',
  },
  {
    id: 'icd-f90-adhd',
    icd10: 'F90',
    icd11: '6A05',
    title_en: 'Hyperkinetic disorders / ADHD',
    title_sw: 'ADHD (Attention Deficit Hyperactivity Disorder)',
    definition_sw:
      'F90.0 Disturbance of activity+attention. F90.1 Hyperkinetic conduct disorder. ICD-11: 6A05 ADHD, na sub-codes 6A05.0 inattentive, 6A05.1 hyperactive-impulsive, 6A05.2 combined. Onset <12 yrs.',
    definition_en:
      'F90.0 disturbance of activity+attention. ICD-11: 6A05 ADHD, with 6A05.0 inattentive, 6A05.1 hyperactive-impulsive, 6A05.2 combined. Onset <12 yrs.',
    stg_section: '§23.19',
    q_patterns: [/(ADHD|F90|6A05|hyperkinetic|attention deficit|hyperactivity)/i],
    next_step_sw: 'STG §23.19: parent training + behavioural therapy. Methylphenidate refer specialist.',
  },
  {
    id: 'icd-f98-enuresis',
    icd10: 'F98.0',
    icd11: '6C00',
    title_en: 'Nonorganic enuresis',
    title_sw: 'Enuresis (kukojoa kitandani)',
    definition_sw:
      'Repeated involuntary voiding ya mkojo, age ≥5 (au developmental equivalent). Sio kutokana na medical condition au substance. ICD-11: 6C00 Enuresis (involuntary) — diurnal, nocturnal, both.',
    definition_en:
      'Repeated involuntary voiding, age ≥5, not due to medical or substance. ICD-11: 6C00 Enuresis — diurnal, nocturnal, both.',
    stg_section: '§23.20',
    q_patterns: [/(enuresis|F98|6C00|bedwetting|bed.wetting|kukojoa kitandani)/i],
    next_step_sw: 'STG §23.20: fluid restriction + alarm + star chart. Amitriptyline/imipramine pharma.',
  },
  {
    id: 'icd-f99-unspecified',
    icd10: 'F99',
    icd11: '6E8Z',
    title_en: 'Mental disorder, not otherwise specified',
    title_sw: 'Mental disorder isiyojulikana wazi',
    definition_sw:
      'Code ya placeholder kwa wakati diagnosis specific haijafika. Inapaswa kutumika kidogo (limited use) — clinical impression inahitaji kuwa ndani ya wiki chache.',
    definition_en:
      'Placeholder code when specific diagnosis not yet reached. Limited use only — should resolve to a specific code within weeks.',
    q_patterns: [/(F99|6E8Z|unspecified mental|NOS|not otherwise specified)/i],
    next_step_sw: 'Specifying diagnosis ndani ya wiki 2-4 ni best practice — F99 sio long-term code.',
  },
]

export function findIcdAnswer(query: string): IcdEntry | null {
  const q = query.toLowerCase()
  for (const e of ICD_MENTAL_CODES) {
    for (const rx of e.q_patterns) {
      if (rx.test(q)) return e
    }
  }
  return null
}

export function askIcd(query: string): { domain: string; respond: string; next_step: string; citation: string } | null {
  const hit = findIcdAnswer(query)
  if (!hit) return null
  const respond = `ICD-10 ${hit.icd10} / ICD-11 ${hit.icd11} — ${hit.title_sw}\n\n${hit.definition_sw}`
  const stgRef = hit.stg_section ? ` → TZ STG-NEMLIT 2021 Ch.23 ${hit.stg_section}` : ''
  return {
    domain: 'ICD-10 + ICD-11 Mental Health Codes',
    respond,
    next_step: `Hatua: ${hit.next_step_sw}`,
    citation: `${SRC10} ${hit.icd10} · ${SRC11} ${hit.icd11}${stgRef}`,
  }
}
