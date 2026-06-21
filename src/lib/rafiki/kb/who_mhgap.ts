/**
 * WHO mhGAP Intervention Guide v2.0 — sovereign KB extract.
 *
 * Source: World Health Organization, mhGAP Intervention Guide for mental,
 * neurological and substance use disorders in non-specialized health
 * settings — Version 2.0 (ISBN 978-92-4-154979-0, © WHO 2016).
 * Hand-authored from the verbatim English text at
 * iris.who.int/handle/10665/250239.
 *
 * Honesty: every entry is anchored to a specific module + section so a
 * clinician can trace the answer back to the source PDF. Drug dosing,
 * contraindications and management protocols are paraphrased close to
 * mhGAP wording. Swahili is hand-written for natural TZ register —
 * not machine-translated.
 */

export interface MhgapEntry {
  id: string
  module:
    | 'PRINCIPLES'
    | 'DEP'    // Depression
    | 'PSY'    // Psychoses
    | 'BPD'    // Bipolar
    | 'EPI'    // Epilepsy
    | 'CMH'    // Child & adolescent mental & behavioural disorders
    | 'DEM'    // Dementia
    | 'SUB'    // Substance use disorders
    | 'SUI'    // Self-harm / suicide
    | 'OTH'    // Other significant MH complaints
  section: string
  summary_sw: string
  summary_en: string
  q_patterns: RegExp[]
  next_step_sw: string
  citation: string
}

const SRC = 'WHO mhGAP IG v2.0'
const C = (m: string) => `${SRC} · ${m}`

export const WHO_MHGAP: MhgapEntry[] = [
  // ─── PRINCIPLES ─────────────────────────────────────────────────────────
  { id: 'princ-respect-dignity', module: 'PRINCIPLES', section: 'ECP §1 Principles of care',
    summary_sw: 'Mtu mwenye matatizo ya kiakili, kihisia au kitabia ANAHESHIMIWA NA KUSHUGHULIKIWA KWA HESHIMA — kama mtu mwingine yeyote anayetafuta matibabu. Hawapaswi kusengenywa, kunyimwa haki zao, au kushikwa bila msingi wa kisheria.',
    summary_en: 'Anyone with a mental, neurological or substance use condition must be treated with respect and dignity, like anyone else seeking care. No stigma, no rights violations, no restraint without lawful basis.',
    q_patterns: [/(heshima|dignity|haki).*(akili|mental|psychiatric)/i],
    next_step_sw: 'Ikiwa unaona ukiukwaji, ripoti kwa Mental Health Board ya Tanzania kupitia Wizara ya Afya.',
    citation: C('ECP §1') },
  { id: 'princ-confidentiality', module: 'PRINCIPLES', section: 'ECP — Confidentiality',
    summary_sw: 'Siri ya mteja inalindwa. Taarifa zake za matibabu HAZISHIRIKIWI na ndugu/mwajiri/jamii bila ridhaa, isipokuwa kwa hatari ya kujidhuru au kudhuru wengine.',
    summary_en: 'Patient confidentiality is protected. Information is not shared with family/employer/community without consent, except where there is risk of self-harm or harm to others.',
    q_patterns: [/(siri|confidential|usiri).*(matibabu|akili|mental)/i],
    next_step_sw: 'Una haki ya kuomba ufafanuzi wa nani anaona faili yako.',
    citation: C('ECP §1') },
  { id: 'princ-physical-first', module: 'PRINCIPLES', section: 'ECP §2.1 Differential',
    summary_sw: 'KABLA ya kuhukumu hali ya kiakili, LAZIMA tathmini sababu za kimwili: maambukizo (malaria ya ubongo), hypoglycaemia, hyponatraemia, madhara ya dawa (steroids, antimalarials), kupungua maji mwilini. Dalili nyingi za "akili" zinaweza kuwa za kimwili.',
    summary_en: 'Before attributing symptoms to a mental health condition, FIRST evaluate medical causes: infections (cerebral malaria), hypoglycaemia, hyponatraemia, medication side effects, dehydration. Many "psychiatric" presentations have physical causes.',
    q_patterns: [/(physical|mwili|kimwili).*(sababu|akili|mental|psychiatric)/i, /(delirium|fahamu kuvurugika)/i],
    next_step_sw: 'Kabla ya kuanza dawa za akili, fanya FBC + RBS + Na/K + uchunguzi wa maambukizo.',
    citation: C('ECP §2.1') },
  { id: 'princ-carer-involvement', module: 'PRINCIPLES', section: 'ECP §3 Carers',
    summary_sw: 'Walezi (familia, ndugu, marafiki) ni sehemu ya tiba. Wahitaji elimu kuhusu hali ya mgonjwa, wajulishwe mpango wa matibabu, na wasaidiwe na rasilimali za jamii. Pia chunguza msongo wao — burnout ya mlezi ni hatari.',
    summary_en: 'Carers (family, friends) are part of treatment. They need education about the condition, the treatment plan, and connection to community resources. Also assess carer stress.',
    q_patterns: [/(mlezi|walezi|caregiver|familia).*(akili|matatizo|mental)/i],
    next_step_sw: 'Mlezi pia ana haki ya msaada — angalia Family Therapy au support group ya karibu.',
    citation: C('ECP §3') },
  { id: 'princ-self-harm-screen', module: 'PRINCIPLES', section: 'ECP §2.3 Risk screen',
    summary_sw: 'KWA KILA mteja, MUULIZE moja kwa moja kuhusu mawazo ya kujidhuru au kujiua. KUMUULIZA SI KUMSHURUTISHA — ni hatua ya kawaida ya tathmini. Akiwa na mawazo, fuata SUI module.',
    summary_en: 'For EVERY person, ASK directly about thoughts of self-harm or suicide. Asking does NOT plant the idea — it is standard assessment. If present, follow SUI module.',
    q_patterns: [/(mawazo.*kujiua|suicidal.*thoughts|kujidhuru).*(uliza|ask|screen)/i],
    next_step_sw: 'Tumia C-SSRS au PHQ-9 Q9. Kama positive, fuata mpango wa usalama; piga 0800 110 014.',
    citation: C('ECP §2.3') },

  // ─── DEP — Depression ───────────────────────────────────────────────────
  { id: 'dep-what', module: 'DEP', section: 'DEP 1 Common presentation',
    summary_sw: 'Sonona (Depression) ni hali ya ugonjwa, sio udhaifu wala uvivu. Dalili kuu: huzuni inayoendelea, kupoteza hamu/raha (anhedonia), nguvu kidogo. Lazima ziwepo karibu kila siku kwa AGALAU WIKI MBILI na kuathiri utendaji wa kazi.',
    summary_en: 'Depression is a health condition, not weakness or laziness. Core: persistent low mood, anhedonia, low energy. Must be present nearly every day for AT LEAST 2 WEEKS and impair functioning.',
    q_patterns: [/(sonona|depression|huzuni.*muda mrefu)/i, /(nini.*sonona|what.*depression)/i],
    next_step_sw: 'Pima na PHQ-9. Score 10+ = wastani; 20+ = kali. Peleka kituo cha karibu.',
    citation: C('DEP 1 §1') },
  { id: 'dep-rule-out', module: 'DEP', section: 'DEP 1 §2 Differential',
    summary_sw: 'Kabla ya kuhukumu sonona: KATALIE (1) magonjwa ya kimwili (anaemia, ugonjwa wa tezi, maambukizo, dawa); (2) ulevi wa pombe/madawa au withdrawal; (3) majonzi ya kawaida ya msiba (wiki 2 baada ya kifo). Sonona kweli inashinda muda na kuathiri kazi.',
    summary_en: 'Before diagnosing depression, RULE OUT: medical causes (anaemia, thyroid, infections, medications); substance use/withdrawal; normal bereavement (first 2 weeks). True depression persists and impairs function.',
    q_patterns: [/(rule out|katalia|kabla.*sonona)/i, /(majonzi|grief|msiba).*(sonona|depression)/i],
    next_step_sw: 'FBC + TSH + RBS + uchunguzi wa pombe kabla ya dawa.',
    citation: C('DEP 1 §2') },
  { id: 'dep-psychoeducation', module: 'DEP', section: 'DEP 2.1 Psychoeducation',
    summary_sw: 'Elimu muhimu: (1) Sonona ni ya kawaida — inampata mtu yeyote. (2) SIO udhaifu au uvivu. (3) Hisia za "siwezi", "sina thamani", "siko na matumaini" zitabadilika sonona ikipona. (4) Mawazo ya kujidhuru ni dalili — ongelea na mtu unayemwamini na rudi kwa msaada haraka.',
    summary_en: 'Key messages: Depression is common; NOT weakness; negative views improve as depression resolves; self-harm thoughts are symptoms — tell trusted person and return for help.',
    q_patterns: [/(psychoeducation|elimu).*(sonona|depression)/i, /(udhaifu|weakness).*(sonona|depression)/i],
    next_step_sw: 'Mpe brochure ya sonona kwa Kiswahili; mshirikishe mlezi.',
    citation: C('DEP 2.1') },
  { id: 'dep-daily-activities', module: 'DEP', section: 'DEP 2.3 Daily functioning',
    summary_sw: 'Tabia za kupambana na sonona: (1) Anza tena shughuli ulizopenda. (2) Lala na uamke saa zile zile. (3) Mazoezi — hata kutembea. (4) Kula mara kwa mara hata bila hamu. (5) Tumia muda na ndugu/marafiki. (6) Hudhuria shughuli za jamii (misikiti, makanisa, mikutano).',
    summary_en: 'Daily habits: restart pleasurable activities; regular sleep/wake; physical activity; eat regularly; time with trusted others; community participation.',
    q_patterns: [/(behavioral activation|shughuli.*kila siku|kupambana.*sonona)/i],
    next_step_sw: 'Tengeneza ratiba ya wiki + panga shughuli 1-2 ndogo kila siku.',
    citation: C('DEP 2.3') },
  { id: 'dep-antidepressant-counsel', module: 'DEP', section: 'DEP 2.5 Pharmacological',
    summary_sw: 'Dawa za sonona zinatolewa PAMOJA na elimu + msaada — sio peke yake. HAZINA UTEGEMEZI; zinawekwa kila siku; madhara wiki ya kwanza yanapotea; INACHUKUA WIKI KADHAA kabla ya kuona faida; usisitishe ghafla — TAPER taratibu kwa wiki 4 minimum.',
    summary_en: 'Antidepressants alongside psychoeducation + social support. NOT addictive; take daily; side effects in first days resolve; takes WEEKS for mood improvement; do not stop suddenly — taper over minimum 4 weeks.',
    q_patterns: [/(dawa.*sonona|antidepressant)/i],
    next_step_sw: 'Tanzania STG inafanya fluoxetine first-line: 10mg × wiki 1 → 20mg/siku.',
    citation: C('DEP 2.5') },
  { id: 'dep-amitriptyline', module: 'DEP', section: 'DEP Table 1 — Amitriptyline',
    summary_sw: 'AMITRIPTYLINE (TCA): Anza 25mg kabla ya kulala. Ongeza 25-50mg/wiki hadi 100-150mg/siku (max 300mg). Wazee/wagonjwa: 25mg → 50-75mg (max 100mg). USITUMIE kwa watoto. EPUKA kwa: ugonjwa wa moyo, historia ya degedege, glaucoma, BPD bila mood stabilizer. Overdose ni HATARI ya kifo.',
    summary_en: 'AMITRIPTYLINE: Start 25mg HS, increase 25-50mg/week to 100-150mg/day (max 300mg). Elderly: 25mg → 50-75mg (max 100mg). DO NOT USE in children. AVOID: cardiac disease, seizure history, glaucoma, BPD without mood stabilizer. Overdose FATAL.',
    q_patterns: [/(amitriptyline|amitryp|TCA)/i],
    next_step_sw: 'Wagonjwa wa hatari ya kujidhuru — TUMIA SSRI (fluoxetine) badala yake.',
    citation: C('DEP Table 1') },
  { id: 'dep-fluoxetine', module: 'DEP', section: 'DEP Table 1 — Fluoxetine',
    summary_sw: 'FLUOXETINE (SSRI): Anza 10mg/siku × wiki 1, kisha 20mg/siku. Bila response wiki 6, ongeza 40mg (max 80mg). Wazee: max 40mg. Vijana 12+: 10→20mg max 40mg, arudi kila wiki kwa wiki 4 za kwanza. USICHANGANYE na warfarin, tramadol, codeine, tamoxifen.',
    summary_en: 'FLUOXETINE: Start 10mg/day × 1 week, then 20mg/day. No response at 6 weeks → 40mg (max 80mg). Elderly: max 40mg. Adolescents 12+: 10→20mg max 40mg, weekly review for first 4 weeks. Do NOT combine with warfarin, tramadol, codeine, tamoxifen.',
    q_patterns: [/(fluoxetine|prozac|SSRI)/i],
    next_step_sw: 'Fluoxetine ni first-line kwa hatari ya kujidhuru au shida ya moyo.',
    citation: C('DEP Table 1') },
  { id: 'dep-perinatal', module: 'DEP', section: 'DEP 2 Pregnant/breastfeeding',
    summary_sw: 'Sonona kwa wajawazito au wanaonyonyesha: kwa awali, EPUKA dawa — anza Thinking Healthy, PM+, IPT. Bila response, fikiria dawa kipimo cha CHINI. Wakati wa kunyonyesha, EPUKA fluoxetine ya muda mrefu. Mshauri mtaalam.',
    summary_en: 'Pregnancy/breastfeeding: AVOID antidepressants initially — start Thinking Healthy, PM+, IPT. If no response, lowest effective dose. Breastfeeding: avoid long-acting fluoxetine. Consult specialist.',
    q_patterns: [/(wajawazito|pregnan).*(sonona|depression)/i, /(kunyonyesha|breastfeed).*(antidepressant|dawa)/i],
    next_step_sw: 'Thinking Healthy ipo kupitia RCH clinic.',
    citation: C('DEP 2 Special populations') },
  { id: 'dep-mania-warning', module: 'DEP', section: 'DEP — Bipolar caution',
    summary_sw: 'HATARI: Sonona inaweza kuwa sehemu ya BIPOLAR. Akipata dalili za mania (kulala kidogo, nguvu nyingi, matumizi mabaya ya pesa) baada ya dawa, SITISHA antidepressant MARA MOJA. Antidepressant peke yake bila mood stabilizer ni hatari kwa BPD.',
    summary_en: 'CRITICAL: Depression may be bipolar. If mania emerges (decreased sleep, increased energy, reckless spending) after antidepressant, STOP it IMMEDIATELY. Antidepressant alone without mood stabilizer is dangerous in BPD.',
    q_patterns: [/(mania|bipolar).*(dawa|antidepressant)/i],
    next_step_sw: 'Acha antidepressant + nenda hospitali ya akili haraka.',
    citation: C('DEP 1 Bipolar caution') },
  { id: 'dep-followup', module: 'DEP', section: 'DEP 3 Follow-up',
    summary_sw: 'Mawasiliano: mkutano wa 2 ndani ya wiki 1. Kisha kila mwezi kwa miezi 3 ya kwanza. Tiba inaendelea HADI dalili zimekwisha kwa miezi 9-12. Kisha TAPER taratibu kwa wiki 4 minimum.',
    summary_en: 'Follow-up: 2nd appointment within 1 week. Monthly for first 3 months. Continue until symptom-free 9-12 months. Then taper over minimum 4 weeks.',
    q_patterns: [/(follow.?up|kufuatilia).*(sonona|depression)/i, /(muda gani.*sonona)/i],
    next_step_sw: 'Weka simu/SMS reminder. Mlezi ahudhurie ufuatiliaji.',
    citation: C('DEP 3') },

  // ─── PSY — Psychoses ────────────────────────────────────────────────────
  { id: 'psy-presentation', module: 'PSY', section: 'PSY 1 Common presentation',
    summary_sw: 'Dalili za saikosi: (1) imani za uongo zilizothibiti (delusions); (2) kusikia sauti au kuona vitu visivyokuwepo; (3) kuongea kwa kuvurugika au tabia ya ajabu; (4) kupuuza majukumu ya kawaida; (5) kutoona kuwa una tatizo.',
    summary_en: 'Psychosis: (1) fixed false beliefs (delusions); (2) hallucinations; (3) disorganised speech/behaviour; (4) neglecting normal responsibilities; (5) lack of insight.',
    q_patterns: [/(saikosi|psychosis|kusikia sauti|hearing voices|delusion)/i, /(dalili.*saikosi)/i],
    next_step_sw: 'Peleka Mirembe (Dodoma), Muhimbili NIMH, au regional hospital haraka.',
    citation: C('PSY 1') },
  { id: 'psy-rule-out', module: 'PSY', section: 'PSY 1 Step 1',
    summary_sw: 'Kabla ya kuhukumu saikosi: kataa delirium ya hali ya kimwili: maambukizo, malaria ya ubongo, meningitis, hypoglycaemia, hyponatraemia, dawa. Pia kataa dementia, ulevi/withdrawal.',
    summary_en: 'Rule out medical delirium: infection, cerebral malaria, meningitis, hypoglycaemia, hyponatraemia, medications. Also rule out dementia, substance intoxication/withdrawal.',
    q_patterns: [/(delirium|fahamu kuvurugika).*(saikosi|psychosis)/i],
    next_step_sw: 'RBS, malaria RDT, Na/K, FBC kabla ya antipsychotic.',
    citation: C('PSY 1 §1') },
  { id: 'psy-antipsychotic-init', module: 'PSY', section: 'PSY 2.5 Initiation',
    summary_sw: 'Antipsychotic MOJA kwa wakati. Anza kipimo cha CHINI cha therapeutic, ongeza taratibu. Jaribu kipimo cha kawaida kwa WIKI 4-6 kabla ya kuamua haifanyi kazi. Fuatilia uzito, BP, sukari ya kufunga, cholesterol, ECG kama unaweza.',
    summary_en: 'ONE antipsychotic at a time. Start lowest therapeutic dose, titrate slowly. Try at typical effective dose for 4-6 WEEKS before concluding ineffective. Monitor weight, BP, fasting sugar, cholesterol, ECG.',
    q_patterns: [/(antipsychotic).*(anza|initiation|start|kipimo)/i],
    next_step_sw: 'Tanzania STG: haloperidol/chlorpromazine first-line; risperidone kama ipo.',
    citation: C('PSY 2.5') },
  { id: 'psy-acute-agitation', module: 'PSY', section: 'PSY Table 5 Agitation',
    summary_sw: 'Fadhaa kali: (1) Hakikisha usalama — ondoa silaha. (2) Ongea kwa upole, mahali pa tulivu. (3) Bila kufaa, diazepam 5-10mg PO/IM AU haloperidol 2-5mg IM. Epuka kushikilia kwa nguvu isipokuwa kwa lazima.',
    summary_en: 'Acute agitation: (1) Safety — remove weapons. (2) Calm verbal de-escalation. (3) If fails, diazepam 5-10mg PO/IM OR haloperidol 2-5mg IM. Avoid physical restraint except last resort.',
    q_patterns: [/(fadhaa|agitation|uchokozi|aggression)/i, /(haloperidol|diazepam).*(IM|sindano)/i],
    next_step_sw: 'Piga 112 + Mental Health Officer. Restraint = last resort.',
    citation: C('PSY Table 5') },
  { id: 'psy-haloperidol', module: 'PSY', section: 'PSY Table 1 — Haloperidol',
    summary_sw: 'HALOPERIDOL: Anza 1.5-3mg/siku PO. Ongeza taratibu hadi 3-10mg/siku (max 20mg; 30mg highly resistant). Madhara: rigidity, tremor, akathisia (EPS); hatari: tardive dyskinesia, QT prolongation. EPUKA kwa wazee wa dementia — huongeza vifo.',
    summary_en: 'HALOPERIDOL: Start 1.5-3mg/day PO. Titrate to 3-10mg/day (max 20mg; 30mg resistant). SE: rigidity, tremor, akathisia (EPS); serious: tardive dyskinesia, QT prolongation. AVOID in dementia — increases mortality.',
    q_patterns: [/(haloperidol|serenace)/i],
    next_step_sw: 'EPS yapo? Punguza dose au ongeza biperiden.',
    citation: C('PSY Table 1') },
  { id: 'psy-pregnancy', module: 'PSY', section: 'PSY 2 Pregnancy',
    summary_sw: 'Mwanamke mwenye saikosi anayepanga ujauzito, mjamzito, au ananyonyesha: low-dose haloperidol PO au chlorpromazine. EPUKA anticholinergics. EPUKA depot antipsychotics. Eleza hatari ya kurudia symptom kama dawa imesimama.',
    summary_en: 'Pregnant/breastfeeding with psychosis: low-dose oral haloperidol or chlorpromazine. AVOID anticholinergics. AVOID depot antipsychotics. Explain relapse risk if stopped.',
    q_patterns: [/(mjamzito|pregnan).*(saikosi|psychosis|antipsychotic)/i],
    next_step_sw: 'OB-GYN + mtaalam wa akili pamoja.',
    citation: C('PSY 2 Pregnant') },
  { id: 'psy-dementia-caution', module: 'PSY', section: 'PSY 2 Older adults',
    summary_sw: 'TAHADHARI: Antipsychotics ZINAONGEZA hatari ya kiharusi na kifo kwa wazee wa dementia. Hazipaswi kutolewa kwa BPSD bila tathmini ya specialist. Anza na mbinu za kitabia.',
    summary_en: 'CAUTION: Antipsychotics INCREASE stroke/death risk in elderly with dementia. Should not be used in dementia-BPSD without specialist evaluation. Try behavioural approaches first.',
    q_patterns: [/(wazee|elderly|dementia).*(antipsychotic|haloperidol)/i],
    next_step_sw: 'Sababu za kimwili kwanza (UTI, maumivu). Antipsychotic = last resort.',
    citation: C('PSY 2 Older') },
  { id: 'psy-carer-advice', module: 'PSY', section: 'PSY 2.4 Carer advice',
    summary_sw: 'Ushauri kwa mlezi: USIJADILIANE kuhusu imani zake za uongo. Kaa upande wa neutral. Epuka kukosoa. Mpe uhuru wa kutembea. Hospitali ya muda mrefu HAIPENDEKEZWI — bora kuishi na familia.',
    summary_en: 'Carer advice: DO NOT argue with false beliefs. Stay neutral. Avoid criticism. Allow freedom of movement. AVOID long-term hospitalisation — better with family/community.',
    q_patterns: [/(mlezi|carer|family).*(saikosi|psychosis)/i, /(ndugu yangu.*saikosi)/i],
    next_step_sw: 'Family education + community support; usimfungie ndani.',
    citation: C('PSY 2.4') },
  { id: 'psy-substance-warning', module: 'PSY', section: 'PSY 2.4',
    summary_sw: 'Mgonjwa wa saikosi/BPD: EPUKA pombe, bangi, kokeni, methamphetamine. Hivi vinaweza kuzidisha dalili na kufanya tiba isifanye kazi.',
    summary_en: 'Psychosis/BPD: avoid alcohol, cannabis, cocaine, methamphetamine — WORSEN symptoms and reduce treatment efficacy.',
    q_patterns: [/(bangi|cannabis|pombe|alcohol).*(saikosi|psychosis)/i],
    next_step_sw: 'Saikosi + uraibu = dual diagnosis treatment.',
    citation: C('PSY 2.4') },

  // ─── BPD — Bipolar ──────────────────────────────────────────────────────
  { id: 'bpd-mania-symptoms', module: 'BPD', section: 'PSY 1 Step 2 Mania',
    summary_sw: 'Episode ya MANIA: kuwepo kwa wakati MMOJA kwa AGALAU WIKI MOJA: hisia kupanda/hasira; kupunguza haja ya kulala; nguvu/kuongea/mawazo ya kasi; kupoteza inhibitions (matumizi mabaya, kingono); tabia za hatari; kupotea umakini; kujiona mkuu. Inaharibu kazi.',
    summary_en: 'Manic episode: SEVERAL simultaneously for ≥1 WEEK: elevated/irritable mood; decreased sleep need; increased energy/talkativeness/rapid speech; loss of inhibitions (spending, sexual); impulsivity; distractibility; inflated self-esteem. Disrupts function.',
    q_patterns: [/(mania|hisia.*panda|haja.*lala|kujiona mkuu)/i, /(dalili.*bipolar|bipolar.*symptoms)/i],
    next_step_sw: 'BPD diagnosis baada ya episode ya kwanza — peleka mtaalam wa akili haraka.',
    citation: C('PSY 1 Step 2') },
  { id: 'bpd-management', module: 'BPD', section: 'PSY 2 Protocol 1',
    summary_sw: 'Tiba ya mania: (1) Elimu kwa mgonjwa + mlezi. (2) KAMA YUKO KWENYE ANTIDEPRESSANT — SITISHA MARA MOJA. (3) Anza mood stabilizer (lithium, sodium valproate, carbamazepine) AU antipsychotic. (4) Benzodiazepine muda mfupi (max wiki 2-4) kwa fadhaa. (5) Usalama + ufuatiliaji + rehabilitation.',
    summary_en: 'Manic episode mgmt: (1) Psychoeducation. (2) IF ON ANTIDEPRESSANT — DISCONTINUE IMMEDIATELY. (3) Start mood stabilizer (lithium, sodium valproate, carbamazepine) OR antipsychotic. (4) Short-term benzo (max 2-4 weeks) for agitation. (5) Safety + follow-up + rehabilitation.',
    q_patterns: [/(tiba.*mania|management.*mania)/i, /(lithium|valproate|carbamazepine)/i],
    next_step_sw: 'Lithium = ufuatiliaji wa damu (lithium level + kidney function). Peleka mahali penye lab.',
    citation: C('PSY 2 Protocol 1') },
  { id: 'bpd-valproate-women', module: 'BPD', section: 'mhGAP Addendum 2023',
    summary_sw: 'TAHADHARI 2023: Sodium valproate HAITUMIKI kwa wanawake/wasichana wenye uwezo wa kuzaa — husababisha matatizo ya kuzaliwa na maendeleo ya ubongo wa mtoto. Tumia lamotrigine au levetiracetam. Wanaotumia valproate: uzazi wa mpango wa uhakika lazima.',
    summary_en: 'CRITICAL 2023 addendum: Sodium valproate must NOT be used in women/girls of childbearing potential — high risk birth defects + developmental disorders. Use lamotrigine or levetiracetam. Current users: effective contraception mandatory.',
    q_patterns: [/(valproate|valproic).*(mwanamke|woman|mjamzito|pregnan|childbearing)/i],
    next_step_sw: 'Mhamishe kwa lamotrigine au levetiracetam kabla ya kupanga ujauzito.',
    citation: C('mhGAP-IG 2.0 Valproate Addendum, January 2023') },
  { id: 'bpd-pregnancy', module: 'BPD', section: 'PSY 2 Pregnancy',
    summary_sw: 'Mwanamke mjamzito mwenye mania: EPUKA valproate, lithium, carbamazepine (matatizo ya kuzaliwa). Fikiria low-dose haloperidol pamoja na specialist. Pima faida/hatari kwa wenye umri wa kuzaa.',
    summary_en: 'Pregnant with mania: AVOID valproate, lithium, carbamazepine (birth defects). Consider low-dose haloperidol with specialist. Weigh risk/benefit in childbearing-age women.',
    q_patterns: [/(mjamzito|pregnan).*(mania|bipolar)/i],
    next_step_sw: 'OB-GYN + mtaalam wa akili pamoja kabla ya dawa.',
    citation: C('PSY 2 Pregnant') },

  // ─── EPI — Epilepsy ─────────────────────────────────────────────────────
  { id: 'epi-what', module: 'EPI', section: 'EPI Common presentation',
    summary_sw: 'Kifafa (epilepsy) ni ugonjwa wa muda mrefu wa ubongo, unaonyeshwa na degedege (seizures) zinazorudia bila sababu ya wakati huo. Sababu: kijenetiki, jeraha la kuzaliwa/kichwa, kiharusi, maambukizo. Ukitibiwa vizuri, watu wengi wanaweza kushinda. KIFAFA SI UCHAWI.',
    summary_en: 'Epilepsy: chronic brain disorder with recurrent unprovoked seizures. Causes: genetic, birth/head trauma, stroke, infections. With proper treatment, most well-controlled. Epilepsy is NOT witchcraft.',
    q_patterns: [/(kifafa|epilepsy|degedege.*kurudi|recurrent.*seizure)/i, /(kifafa.*uchawi)/i],
    next_step_sw: 'Tanzania ina dawa za kifafa bure katika hospitali za serikali.',
    citation: C('EPI Common presentation') },
  { id: 'epi-emergency-abc', module: 'EPI', section: 'EPI Emergency Step 2',
    summary_sw: 'Mtu anadegedeka SASA: (1) Hifadhi kichwa+shingo. (2) Hakikisha hewa/kupumua/mzunguko (ABCs). (3) Mlaze upande wake. (4) Funguza nguo shingoni; ondoa miwani. (5) Kitu laini chini ya kichwa. (6) Anza kupima muda. (7) USIMUACHE PEKE. (8) USIMUWEKE KITU MDOMONI. Jeraha la kichwa/homa kali → peleka hospitali HARAKA.',
    summary_en: 'Active seizure: (1) Stabilise head+neck. (2) Check ABCs. (3) Side position. (4) Loosen tight clothing, remove glasses. (5) Soft under head. (6) Time it. (7) DO NOT LEAVE ALONE. (8) NOTHING IN MOUTH. Head injury/fever → urgent hospital.',
    q_patterns: [/(degedege.*sasa|seizure.*now|convulsion.*emergency)/i, /(mtu.*anadegedeka)/i],
    next_step_sw: 'Piga 112 kama degedege inazidi dakika 5.',
    citation: C('EPI Emergency Step 2') },
  { id: 'epi-emergency-meds', module: 'EPI', section: 'EPI Emergency Step 4',
    summary_sw: 'Dawa za dharura: HAKUNA IV: diazepam rectally (mtu mzima 10mg, mtoto 1mg/mwaka) AU midazolam buccal/intranasal (mtu mzima 5-10mg, mtoto 0.2mg/kg). KUNA IV: diazepam 10mg IV (mtoto 1mg/mwaka) AU lorazepam 4mg IV (mtoto 0.1mg/kg). Glucose IV (mtu mzima 5ml ya 50%; mtoto 2-5ml/kg ya 10%).',
    summary_en: 'Emergency: NO IV: rectal diazepam (adult 10mg, child 1mg/yr) OR buccal/intranasal midazolam (adult 5-10mg, child 0.2mg/kg). IF IV: diazepam 10mg IV (child 1mg/yr) OR lorazepam 4mg IV (child 0.1mg/kg). Glucose IV.',
    q_patterns: [/(diazepam|lorazepam|midazolam).*(degedege|seizure|emergency)/i],
    next_step_sw: 'Bila kukoma dakika 10 baada ya dose 1, mpe dose 2.',
    citation: C('EPI Emergency Step 4') },
  { id: 'epi-eclampsia', module: 'EPI', section: 'EPI Emergency — Eclampsia',
    summary_sw: 'Mjamzito (nusu ya pili) AU ndani ya wiki 1 baada ya kujifungua ana degedege + hana historia ya kifafa: SHUKU ECLAMPSIA. MAGNESIUM SULPHATE 10g IM. BP diastolic >110 mmHg → hydralazine 5mg IV slowly (dakika 3-4). Rudia kila 30 min hadi ≤90 mmHg; max 20mg jumla. HOSPITALI MARA MOJA.',
    summary_en: 'Pregnant (2nd half) OR ≤1wk postpartum + seizure + no epilepsy history: SUSPECT ECLAMPSIA. Magnesium sulphate 10g IM. Diastolic BP >110 → hydralazine 5mg IV slow (3-4 min). Repeat every 30 min until ≤90; max 20mg total. URGENT HOSPITAL.',
    q_patterns: [
      /(mjamzito|pregnan).*(dege|seizure|eclamps|degedeka|degedege)/i,
      /(dege|seizure).*(mjamzito|pregnan|baada.*jifungua|postpartum)/i,
      /(magnesium sulphate|hydralazine)/i,
    ],
    next_step_sw: 'Hospitali ya mama-mtoto MARA MOJA — eclampsia ni dharura ya kifo.',
    citation: C('EPI Emergency Step 3') },
  { id: 'epi-status-epilepticus', module: 'EPI', section: 'EPI Step 7 Status epilepticus',
    summary_sw: 'Status epilepticus: degedege inaendelea baada ya dose 2 za dharura. MOJA WAPO IV: (a) Valproic acid 20mg/kg IV kwa dakika 30, max 1g; (b) Phenobarbital 15-20mg/kg IV kwa 100mg/dak, max 1g; (c) Phenytoin 15-20mg/kg IV kwa dakika 60 — line tofauti na diazepam.',
    summary_en: 'Status epilepticus: seizures continue after 2 emergency doses. ONE OF IV: (a) Valproic acid 20mg/kg IV over 30 min, max 1g; (b) Phenobarbital 15-20mg/kg IV over 100mg/min, max 1g; (c) Phenytoin 15-20mg/kg IV over 60 min — separate IV line from diazepam.',
    q_patterns: [/(status epilepticus|degedege.*haina kukoma)/i],
    next_step_sw: 'Dharura ya hospitali tu — airway + oxygen + ufuatiliaji.',
    citation: C('EPI Step 7') },
  { id: 'epi-diagnosis-criteria', module: 'EPI', section: 'EPI 1 §1 Diagnosis',
    summary_sw: 'Tathmini ya kifafa: angalau 2 ya hizi wakati wa degedege: (1) kupoteza/kuvurugika fahamu; (2) ugumu/kukakamaa; (3) kuuma ulimi/jeraha; (4) kushindwa kushikilia mkojo/kinyesi; (5) baada: uchovu, usingizi, kuchanganyikiwa, udhaifu wa upande mmoja. KIFAFA = degedege 2 zisizo na sababu.',
    summary_en: 'Diagnosis: ≥2 during episode: (1) loss/impaired consciousness; (2) stiffness/rigidity; (3) tongue bite/injury; (4) incontinence; (5) post-ictal fatigue/drowsiness/confusion/hemiparesis. EPILEPSY = ≥2 unprovoked seizures.',
    q_patterns: [/(uchunguzi.*kifafa|epilepsy.*diagnosis|criteria)/i],
    next_step_sw: 'Andika historia: muda, dalili kabla/baada, mara ngapi.',
    citation: C('EPI 1 §1') },
  { id: 'epi-children-pregnancy', module: 'EPI', section: 'EPI 2 Special populations',
    summary_sw: 'Watoto wenye kifafa: dose kwa uzito (mg/kg). Wanawake wa kuzaa: panga ujauzito mapema — baadhi ya AEDs huharibu kijusi. Lamotrigine/levetiracetam first-line wajawazito. EPUKA valproate. PLWH: angalia mwingiliano AED-ART.',
    summary_en: 'Children: dose by weight (mg/kg). Women childbearing age: plan pregnancy — some AEDs cause birth defects. Lamotrigine/levetiracetam first-line in pregnancy. AVOID valproate. PLWH: check AED-ART interactions.',
    q_patterns: [/(watoto|children).*(kifafa|epilepsy)/i, /(VVU|HIV|ART).*(kifafa|epilepsy)/i],
    next_step_sw: 'Tanzania National Treatment Guidelines + pharmacist wa hospitali.',
    citation: C('EPI 2') },

  // ─── SUI — Self-harm / Suicide ──────────────────────────────────────────
  { id: 'sui-ask-directly', module: 'SUI', section: 'SUI Assessment',
    summary_sw: 'Kumuuliza mtu kuhusu kujiua SIO kumshurutisha. Ni hatua ya kawaida ya tathmini. Uliza: "Umewahi kuwa na mawazo ya kuwa bora ungefariki? Mawazo ya kujidhuru? Mpango wa kufanya hivyo?" Mpango + njia inapatikana = HATARI YA HARAKA.',
    summary_en: 'Asking does NOT plant the idea. Standard assessment. Ask: "Have you had thoughts you would be better off dead? Self-harm thoughts? A plan?" Plan + means accessible = IMMINENT RISK.',
    q_patterns: [/(kuuliza|ask).*(kujiua|suicide|kujidhuru)/i],
    next_step_sw: 'Mpango halisi = piga 0800 110 014 (Lifeline) au 116 (watoto), peleka hospitali.',
    citation: C('SUI 1') },
  { id: 'sui-means-restriction', module: 'SUI', section: 'SUI 2 Means restriction',
    summary_sw: 'KIPENGELE muhimu KABISA: ONDOA njia za kujidhuru. Sumu za kilimo (Tanzania = sababu kuu), dawa nyingi (paracetamol), silaha, kamba — funga au ondoa nyumbani. Mlezi achukue jukumu la kuhifadhi dawa.',
    summary_en: 'Most critical: RESTRICT MEANS. Agricultural poisons (Tanzania = leading cause), medications (paracetamol), weapons, ropes — remove or lock. Carer safekeeps medications.',
    q_patterns: [/(means restriction|sumu.*kilimo|pesticide).*(kujiua|suicide)/i],
    next_step_sw: 'Familia + kijiji wachukue jukumu — funga sumu, dawa, silaha siri.',
    citation: C('SUI 2') },
  { id: 'sui-safety-plan', module: 'SUI', section: 'SUI 2 Safety plan',
    summary_sw: 'Mpango wa usalama (Stanley-Brown) wa hatua 6: (1) Ishara zangu za onyo. (2) Mbinu zangu binafsi (kupumua, kutembea, sala). (3) Watu/maeneo yanayonipa hali nzuri. (4) Watu wa kupiga simu. (5) Mtaalam + hotline (0800 110 014). (6) Mazingira salama — ondoa silaha/sumu/dawa.',
    summary_en: 'Safety plan (Stanley-Brown) — 6 steps: (1) Warning signs. (2) Internal coping (breathing, walking, prayer). (3) People/places that lift. (4) People to call. (5) Professional + hotline. (6) Make environment safe.',
    q_patterns: [/(safety plan|mpango.*usalama|stanley.brown)/i],
    next_step_sw: 'Andika karatasi pamoja na mteja + mlezi.',
    citation: C('SUI 2') },
  { id: 'sui-followup', module: 'SUI', section: 'SUI 3 Follow-up',
    summary_sw: 'Baada ya tukio: ufuatiliaji wa karibu — simu/ziara ndani ya wiki 1. Endelea kila wiki kwa wiki 4-12. SMS reminders. Kupunguza upweke = muhimu. Mlezi ahudhurie kila ufuatiliaji.',
    summary_en: 'After event: close follow-up — phone/visit within 1 week. Weekly for 4-12 weeks. SMS reminders. Reducing isolation key. Carer attends each.',
    q_patterns: [/(follow.up|kufuatilia).*(kujiua|self.harm|suicide)/i],
    next_step_sw: 'Tanzania 0800 110 014 (Lifeline) — shiriki nambari.',
    citation: C('SUI 3') },

  // ─── SUB — Substance use ────────────────────────────────────────────────
  { id: 'sub-alcohol-screen', module: 'SUB', section: 'SUB 1 Assessment',
    summary_sw: 'Pima pombe na AUDIT (10 maswali) au AUDIT-C (3). Score AUDIT 8+ = matatizo. Tanzania: Konyagi + bia ni shida ya afya ya umma. Uliza: umri wa kuanza, lini unakunywa, kunywa asubuhi?',
    summary_en: 'Screen alcohol with AUDIT (10) or AUDIT-C (3). Score 8+ = problematic. Tanzania: Konyagi + beer = public health burden. Ask: age of onset, drinking time, eye-opener?',
    q_patterns: [/(pima.*pombe|alcohol.*screen|AUDIT)/i, /(konyagi)/i],
    next_step_sw: 'AUDIT-C 4+ wanaume au 3+ wanawake = brief intervention.',
    citation: C('SUB 1') },
  { id: 'sub-alcohol-withdrawal', module: 'SUB', section: 'SUB 2 Withdrawal',
    summary_sw: 'Withdrawal ya pombe: tremor, jasho, mapigo ya moyo, wasiwasi, kichefuchefu masaa 6-24. Hatari: hallucinations, degedege, delirium tremens 48-96hr — KIFO. Matibabu: thiamine 100mg/siku × siku 5 KABLA ya glucose. Diazepam 10mg PO/IV per CIWA-Ar.',
    summary_en: 'Alcohol withdrawal: tremor, sweating, tachycardia, anxiety, nausea 6-24hr post-last-dose. Risks: hallucinations, seizures, delirium tremens 48-96hr — FATAL. Treatment: thiamine 100mg/day × 5 days BEFORE glucose. Diazepam 10mg PO/IV per CIWA-Ar.',
    q_patterns: [/(withdrawal|kupunguza ghafla).*(pombe|alcohol)/i, /(delirium tremens|DT|thiamine)/i],
    next_step_sw: 'Withdrawal kali = hospitali. DT = ICU.',
    citation: C('SUB 2 Alcohol withdrawal') },
  { id: 'sub-brief-intervention', module: 'SUB', section: 'SUB 2 Brief intervention',
    summary_sw: 'Brief intervention: mazungumzo mafupi (10-15 min). Hatua: (1) Soma matokeo ya AUDIT. (2) Eleza athari. (3) Mshauri kupunguza/kukoma. (4) Wekeni malengo. (5) Panga ufuatiliaji. Motivational Interviewing (MI) inaongoza.',
    summary_en: 'Brief intervention: 10-15 min conversation. Steps: (1) Review AUDIT. (2) Explain consequences. (3) Advise reduction. (4) Set goals. (5) Schedule follow-up. MI guides this.',
    q_patterns: [/(brief intervention|BI).*(pombe|alcohol|substance)/i, /(motivational interview|MI)/i],
    next_step_sw: 'CHW au mtaalam wa kawaida wanaweza kufanya BI — sio specialist tu.',
    citation: C('SUB 2') },
  { id: 'sub-cannabis', module: 'SUB', section: 'SUB — Cannabis',
    summary_sw: 'Bangi: huongeza hatari ya saikosi (hasa vijana), wasiwasi, kupungua umakini. Tanzania: bangi ni illegal ila inatumika sana. Hakuna dawa maalum — tiba ni mazungumzo (MI), CBT, kushiriki familia/jamii.',
    summary_en: 'Cannabis: increased psychosis risk (especially adolescents), anxiety, impaired concentration. Tanzania: illegal but widely used. No specific medication — talk therapy (MI), CBT, family/community engagement.',
    q_patterns: [/(bangi|cannabis|marijuana|weed)/i],
    next_step_sw: 'Vijana = ushiriki wa mzazi + shule muhimu.',
    citation: C('SUB Cannabis') },
  { id: 'sub-opioid-overdose', module: 'SUB', section: 'SUB Emergency — Opioid',
    summary_sw: 'Overdose ya opioid (heroin, tramadol nyingi, codeine): unconscious, kupumua polepole, lips bluish, pinpoint pupils. NALOXONE 0.4-2mg IM/IV/intranasal MARA MOJA — rudia kila dakika 2-3. Hakikisha airway + breathing. Peleka hospitali.',
    summary_en: 'Opioid overdose (heroin, large tramadol/codeine): unconscious, respiratory depression, cyanotic lips, pinpoint pupils. NALOXONE 0.4-2mg IM/IV/intranasal IMMEDIATELY — repeat every 2-3 min. Maintain airway + breathing. Hospital.',
    q_patterns: [/(overdose|kuzidi).*(opioid|heroin|tramadol|codeine)/i, /(naloxone)/i],
    next_step_sw: 'Piga 112 + naloxone kila 2-3 min.',
    citation: C('SUB Opioid emergency') },

  // ─── DEM — Dementia ─────────────────────────────────────────────────────
  { id: 'dem-what', module: 'DEM', section: 'DEM Common presentation',
    summary_sw: 'Dementia ni hali sugu ya kuendelea ya ubongo — kupungua kwa kumbukumbu, fikra, mwelekeo, ufahamu, hesabu, lugha, hukumu. Inaathiri shughuli za kila siku. SIO sehemu ya kawaida ya kuzeeka. Sababu: Alzheimer, vascular (kiharusi), Lewy body, frontotemporal.',
    summary_en: 'Dementia: chronic progressive brain syndrome — decline in memory, thinking, orientation, comprehension, calculation, language, judgement. Interferes with daily activities. NOT normal aging. Causes: Alzheimer, vascular, Lewy body, frontotemporal.',
    q_patterns: [/(dementia|kupoteza kumbukumbu|memory loss|alzheimer)/i, /(mzee.*amesahau)/i],
    next_step_sw: 'Pima MMSE/MoCA. Kataa depression, B12 deficiency, hypothyroid.',
    citation: C('DEM Common presentation') },
  { id: 'dem-carer-support', module: 'DEM', section: 'DEM 2 Carer support',
    summary_sw: 'Walezi wa dementia wana mzigo mkubwa — chunguza burnout, sonona, pombe. Elimu kuhusu hali. Mazingira salama (epuka kuanguka). Ratiba ya kawaida. Tafuta msaada wa kijamii (familia, mfanyakazi).',
    summary_en: 'Dementia carers heavy burden — screen burnout, depression, problematic alcohol. Education. Safe environment (fall prevention). Routines. Social support (family rotation, paid caregiver).',
    q_patterns: [/(mlezi|carer).*(dementia|mzee.*amesahau)/i],
    next_step_sw: 'Mlezi ana haki ya pumziko + support group.',
    citation: C('DEM 2') },
  { id: 'dem-bpsd', module: 'DEM', section: 'DEM 2 BPSD',
    summary_sw: 'BPSD (Behavioural and Psychological Symptoms of Dementia): fadhaa, uchokozi, hallucinations, wasiwasi, kutembea ovyo. KWANZA chunguza sababu za kimwili (UTI, choo, maumivu, dehydration, dawa). MBINU YA KITABIA kwanza. EPUKA antipsychotics — huongeza kiharusi + kifo kwa wazee wa dementia.',
    summary_en: 'BPSD: agitation, aggression, hallucinations, anxiety, wandering. FIRST physical causes (UTI, constipation, pain, dehydration, meds). Behavioural FIRST. AVOID antipsychotics — increase stroke/death in elderly dementia.',
    q_patterns: [/(BPSD|fadhaa.*mzee|dementia.*behaviour|wandering)/i],
    next_step_sw: 'Sababu za kimwili kwanza. Antipsychotic = last resort, specialist tu.',
    citation: C('DEM 2 BPSD') },

  // ─── CMH — Child & adolescent ───────────────────────────────────────────
  { id: 'cmh-developmental', module: 'CMH', section: 'CMH Developmental',
    summary_sw: 'Mtoto akiwa anaviiendelea taratibu kuliko wenzake — chunguza sikio/macho, historia ya ujauzito/kuzaliwa, malnutrition, kifafa, lead poisoning. Mtoto hasiongei umri wa 2, au yuko nyuma — peleka daktari mtoto.',
    summary_en: 'Child developing slower than peers — check hearing/vision, pregnancy/birth history, malnutrition, epilepsy, lead poisoning. Not talking by age 2 or behind milestones — paediatrician.',
    q_patterns: [/(mtoto.*halafu|child.*delay|developmental)/i, /(autism|usonji)/i],
    next_step_sw: 'RCH clinic = developmental screening. Mapema = matokeo bora.',
    citation: C('CMH Developmental') },
  { id: 'cmh-adhd', module: 'CMH', section: 'CMH — Behavioural',
    summary_sw: 'Mtoto/kijana mwenye dalili za ADHD: kupotea umakini, hyperactive, msukumo. Pima SDQ. Anza elimu kwa mzazi + mwalimu. Dawa (methylphenidate) = specialist tu, kesi za kati-kali tu, umri 6+.',
    summary_en: 'Child/adolescent ADHD: inattention, hyperactivity, impulsivity. Screen SDQ. Start parent + teacher education. Medication (methylphenidate) = specialist only, moderate-severe, age 6+.',
    q_patterns: [/(adhd|attention deficit|hyperactiv).*(mtoto|child)/i],
    next_step_sw: 'Mwalimu mlezi + RCH + kliniki ya watoto.',
    citation: C('CMH ADHD') },
  { id: 'cmh-trauma', module: 'CMH', section: 'CMH — Trauma',
    summary_sw: 'Mtoto/kijana aliyepatwa na kiwewe (jeraha, dhuluma, msiba, vita): pima PTSD. Trauma-Focused CBT (TF-CBT) ni effective. Kuingiliza mzazi/mlezi muhimu. Watoto onyesha trauma kupitia tabia (kulia, kutoka shule, kupungukiwa hamu, ndoto mbaya).',
    summary_en: 'Child/adolescent trauma exposure: screen PTSD. Trauma-Focused CBT (TF-CBT) effective. Parent involvement essential. Children show trauma via behaviour.',
    q_patterns: [/(mtoto.*kiwewe|child.*trauma|ptsd.*mtoto)/i],
    next_step_sw: 'Shule + mwalimu mlezi ni nguzo.',
    citation: C('CMH Trauma') },
  { id: 'cmh-bullying', module: 'CMH', section: 'CMH — School',
    summary_sw: 'Bullying shuleni inaweza kusababisha sonona, wasiwasi, hata mawazo ya kujiua kwa mtoto. Uliza moja kwa moja kuhusu uzoefu shuleni. Wasiliana na mwalimu mlezi. Hakikisha mazingira salama nyumbani. Pima PHQ-A au RCADS.',
    summary_en: 'Bullying can cause depression, anxiety, suicidal thoughts. Ask child directly about school. Engage school. Ensure safe home. Screen PHQ-A or RCADS.',
    q_patterns: [/(bullying|kunyanyaswa shuleni|onevu shuleni)/i],
    next_step_sw: 'Anti-bullying policy ipo Tanzania kwa shule za serikali.',
    citation: C('CMH School') },

  // ─── OTH — Other ────────────────────────────────────────────────────────
  { id: 'oth-anxiety', module: 'OTH', section: 'OTH — Anxiety',
    summary_sw: 'Wasiwasi mkubwa (anxiety disorder): pima GAD-7. 10+ wastani; 15+ mkubwa. Psychoeducation, kupumua (4-7-8), tai chi/yoga/kutembea. Bila response: fluoxetine first-line. CBT effective. EPUKA benzo za muda mrefu (utegemezi).',
    summary_en: 'Anxiety disorder: GAD-7. 10+ moderate; 15+ severe. Psychoeducation, breathing (4-7-8), tai chi/yoga/walking. No response: fluoxetine first-line. CBT effective. AVOID long-term benzo (dependence).',
    q_patterns: [/(generalised anxiety|GAD|wasiwasi mkubwa)/i],
    next_step_sw: 'Fluoxetine 10mg → 20mg + CBT. Benzo muda mfupi tu.',
    citation: C('OTH Anxiety') },
  { id: 'oth-ptsd', module: 'OTH', section: 'OTH — PTSD',
    summary_sw: 'PTSD: pima PCL-5. Flashbacks, ndoto mbaya, kuepuka, hypervigilance, woga. Hutokea wiki/miezi baada ya tukio. Tiba: TF-CBT, EMDR, SSRI (sertraline/fluoxetine).',
    summary_en: 'PTSD: PCL-5. Flashbacks, nightmares, avoidance, hypervigilance, persistent fear. Weeks/months post-trauma. Treatment: TF-CBT, EMDR, SSRI (sertraline/fluoxetine).',
    q_patterns: [/(PTSD|post.traumatic|kiwewe.*baada|trauma.*stress)/i],
    next_step_sw: 'TF-CBT — Muhimbili au KCMC kwa rufaa.',
    citation: C('OTH PTSD') },
  { id: 'oth-medically-unexplained', module: 'OTH', section: 'OTH — Somatic',
    summary_sw: 'Maumivu/dalili za mwili ZISIZOPATA SABABU ya kimatibabu (medically unexplained): kichwa, tumbo, mgongo. Inaweza kuwa sonona, wasiwasi, kiwewe. SIO "hauamini mimi". Mara nyingi inaisha vizuri kwa psychotherapy.',
    summary_en: 'Medically unexplained symptoms: headache, abdominal, back pain. May manifest depression, anxiety, trauma. NOT "you don\'t believe me". Often responds to psychotherapy.',
    q_patterns: [/(maumivu.*sababu|medically unexplained|psychosomatic)/i],
    next_step_sw: 'Mpe mtaalam wa CBT au counsellor.',
    citation: C('OTH Somatic') },
  { id: 'oth-sleep', module: 'OTH', section: 'OTH — Sleep',
    summary_sw: 'Matatizo ya usingizi: kushindwa kuanza kulala, kuamka mara kwa mara, kuamka mapema. KABLA ya dawa: SLEEP HYGIENE: (1) saa za kawaida. (2) kitanda kwa kulala tu — sio simu. (3) epuka kahawa baada ya 2 PM. (4) hakuna pombe kabla ya kulala. (5) chumba kimya, giza. (6) mazoezi mchana. AVOID benzo za muda mrefu.',
    summary_en: 'Insomnia: difficulty initiating, frequent waking, early waking. BEFORE meds: SLEEP HYGIENE: (1) regular times. (2) bed for sleep only. (3) no caffeine after 2 PM. (4) no alcohol pre-bed. (5) quiet dark room. (6) daytime exercise. AVOID long-term benzo.',
    q_patterns: [/(usingizi|insomnia|sleep|kulala vibaya)/i],
    next_step_sw: 'Sleep hygiene wiki 2-4 kabla ya dawa.',
    citation: C('OTH Sleep') },
]

/** Find the best-matching mhGAP entry for a query, or null. */
export function findMhgapAnswer(query: string): MhgapEntry | null {
  const q = query.toLowerCase()
  for (const e of WHO_MHGAP) {
    for (const rx of e.q_patterns) {
      if (rx.test(q)) return e
    }
  }
  return null
}

/** Rafiki-style shaped reply. */
export function askMhgap(query: string): {
  domain: string
  respond: string
  next_step: string
  citation: string
} | null {
  const hit = findMhgapAnswer(query)
  if (!hit) return null
  return {
    domain: `WHO mhGAP IG v2.0 · ${hit.module}`,
    respond: hit.summary_sw,
    next_step: `Hatua: ${hit.next_step_sw}`,
    citation: hit.citation,
  }
}
