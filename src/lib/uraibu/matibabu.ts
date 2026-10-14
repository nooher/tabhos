/**
 * Treating dependence, not only finding it.
 *
 * ── What was missing ─────────────────────────────────────────────────────
 *
 * Measured on 14 October 2026, Tumaini could screen for substance use and
 * could track a craving, and had nothing at all for the treatment.
 *
 *   `tamaa`              a craving tracker: strength, episodes, triggers, and
 *                        what the person did instead. Good, and it is relapse
 *                        prevention rather than treatment.
 *   `/maalum/uponyaji`   named the four MAT clinics — Muhimbili, Mwananyamala,
 *                        Mbeya, KCMC — with nothing behind the names.
 *
 * So a person whose ASSIST comes back at likely opioid dependence was shown a
 * clinic list and a craving diary. Methadone is what treats opioid dependence
 * and it is free at those four clinics, and the system that sent them there
 * could not hold a single thing about the treatment afterwards: not the dose,
 * not a missed day, not the withdrawal that brings somebody back to the
 * street at three in the morning.
 *
 * ── The line this file does not cross ────────────────────────────────────
 *
 * It does not dose. THOS's own statement of intended use puts it plainly for
 * the estate: "It never calculates, recommends or adjusts a dose. It displays
 * a dose a clinician prescribed." That holds here and it holds hardest here,
 * because methadone is the one medicine in this system where a wrong number
 * kills a person who was getting better. The first two weeks of induction are
 * when people die of methadone, and they die of too much.
 *
 * So: the dose a clinic set is recorded. The guidance below is the shape of
 * the national programme, written so a person knows what to expect and can
 * tell when something is wrong — never as a number to act on.
 *
 * ── The withdrawal scales are a clinician's instruments ──────────────────
 *
 * CIWA-Ar and COWS decide whether somebody is admitted and whether a
 * medicine is given. They are scored by somebody trained, on an examination,
 * and `audience: 'mtaalam'` says so on each. What a person gets is the
 * symptom diary — the same ten or eleven domains in their own words — which a
 * clinician can then read and score. A citizen who scores their own CIWA-Ar
 * at 19 and is told they are in moderate withdrawal has been handed a
 * diagnosis by a telephone.
 *
 * And one thing is said to everybody, not only to clinicians, because it is
 * the single most dangerous fact in addiction care: **stopping alcohol or
 * sedatives abruptly can kill.** Opioid withdrawal is agony and is survivable;
 * alcohol withdrawal has a mortality. Every piece of copy in this file that
 * touches stopping says so.
 */

export type Audience = 'mtu' | 'mtaalam'

export interface Phrase { sw: string; en: string }

/* ─────────────────────────────────────────────────────────────────────────
 * 1. The national programme, as one list
 * ───────────────────────────────────────────────────────────────────────── */

export interface MatCentre {
  id: string
  name: Phrase
  city: Phrase
  /** What the centre offers, beyond the daily dose. */
  offers: readonly ('methadone' | 'sindano_safi' | 'vvu' | 'ushauri')[]
  /**
   * Whether Laetoli has confirmed the details with the centre itself.
   *
   * False everywhere, and shown as false. A clinic list a person travels on
   * must say which entries were verified: somebody who takes three buses to a
   * closed door does not come back, and that is a relapse the software caused.
   */
  verified: boolean
}

/**
 * The MAT clinics, promoted out of `/maalum/uponyaji`'s own table.
 *
 * It held four rows and nothing else could read them. A screen that sends
 * somebody to methadone and a tracker that records their dose have to agree
 * about which clinics exist, and two lists would not.
 */
export const MAT_CENTRES: readonly MatCentre[] = [
  {
    id: 'muhimbili',
    name: { sw: 'Muhimbili — Kliniki ya Methadone', en: 'Muhimbili — Methadone Clinic' },
    city: { sw: 'Dar es Salaam', en: 'Dar es Salaam' },
    offers: ['methadone', 'sindano_safi', 'vvu', 'ushauri'],
    verified: false,
  },
  {
    id: 'mwananyamala',
    name: { sw: 'Mwananyamala — Kliniki ya Methadone', en: 'Mwananyamala — Methadone Clinic' },
    city: { sw: 'Dar es Salaam', en: 'Dar es Salaam' },
    offers: ['methadone', 'sindano_safi', 'vvu', 'ushauri'],
    verified: false,
  },
  {
    id: 'mbeya',
    name: { sw: 'Hospitali ya Rufaa Mbeya — Kitengo cha MAT', en: 'Mbeya Referral Hospital — MAT Unit' },
    city: { sw: 'Mbeya', en: 'Mbeya' },
    offers: ['methadone', 'vvu', 'ushauri'],
    verified: false,
  },
  {
    id: 'kcmc',
    name: { sw: 'KCMC — Kitengo cha MAT', en: 'KCMC — MAT Unit' },
    city: { sw: 'Moshi', en: 'Moshi' },
    offers: ['methadone', 'vvu', 'ushauri'],
    verified: false,
  },
]

/**
 * What the state does about drugs, which a person asks about before they ask
 * about treatment.
 *
 * DCEA is the authority, and its presence here is deliberate: the first
 * question somebody with a heroin dependence asks is whether walking into a
 * clinic gets them arrested. At the MAT clinics it does not, and that sentence
 * belongs beside the clinic list rather than in a policy document.
 */
export const DCEA_NOTE: Phrase = {
  sw: 'Kliniki za MAT ni huduma za afya, sio vituo vya polisi. Hakuna ripoti inayotolewa kwa polisi kwa sababu umeomba msaada, na huduma ni bure. Mamlaka ya Kudhibiti Dawa za Kulevya (DCEA) inashughulikia biashara ya dawa; matumizi yako ni swala la afya.',
  en: 'The MAT clinics are health services, not police posts. No report is made to the police because you asked for help, and the service is free. The Drug Control and Enforcement Authority deals with trafficking; your own use is a health matter.',
}

/* ─────────────────────────────────────────────────────────────────────────
 * 2. Methadone, as a person experiences it
 * ───────────────────────────────────────────────────────────────────────── */

export interface MatFact {
  id: string
  title: Phrase
  body: Phrase
  /** Who the fact is written for. */
  audience: Audience
}

/**
 * What to expect, and when something is wrong.
 *
 * Every one of these is about recognising a problem, not about choosing a
 * dose. The one number that appears is the three missed days after which
 * tolerance can no longer be assumed, and it appears as a reason to be
 * reassessed rather than as an instruction to take less.
 */
export const MAT_FACTS: readonly MatFact[] = [
  {
    id: 'kila_siku',
    audience: 'mtu',
    title: { sw: 'Ni ya kila siku, na hiyo ni kazi', en: 'It is daily, and that is the hard part' },
    body: {
      sw: 'Methadone inachukuliwa kila siku, kwenye kliniki, mwanzoni mbele ya mtaalam. Siku za mwanzo ni ngumu kwa sababu ya safari, sio kwa sababu ya dawa. Kliniki inaweza kukuruhusu kubeba dozi za siku kadhaa baada ya kuonyesha utulivu — hiyo ni uamuzi wao, sio wa programu hii.',
      en: 'Methadone is taken daily, at the clinic, supervised at first. The early weeks are hard because of the journey, not because of the medicine. The clinic may later allow take-home doses once you are stable; that is their decision and not this application’s.',
    },
  },
  {
    id: 'wiki_mbili',
    audience: 'mtu',
    title: { sw: 'Wiki mbili za mwanzo ni hatari zaidi', en: 'The first two weeks carry the most risk' },
    body: {
      sw: 'Methadone inajikusanya mwilini kwa siku kadhaa, kwa hiyo dozi ya leo inaongezea ya jana. Hapa ndipo watu wanaweza kuzidiwa. Dalili za hatari: usingizi mkubwa usio wa kawaida, kupumua kwa taratibu sana, kushindwa kuamshwa. Hiyo ni dharura — piga 112 au 199.',
      en: 'Methadone builds up over several days, so today’s dose adds to yesterday’s. This is when people are at risk of overdose. Danger signs: unusual heavy drowsiness, very slow breathing, being hard to wake. That is an emergency: call 112 or 199.',
    },
  },
  {
    id: 'usichangie',
    audience: 'mtu',
    title: { sw: 'Usiichangie na mtu mwingine', en: 'Never share your dose' },
    body: {
      sw: 'Dozi iliyopangwa kwa mwili wako inaweza kumuua mtu ambaye mwili wake haujazoea afyuni, hasa mtoto. Hifadhi mahali salama ambapo mtoto hawezi kufikia.',
      en: 'A dose set for your body can kill somebody whose body is not used to opioids, a child above all. Keep it where a child cannot reach it.',
    },
  },
  {
    id: 'siku_tatu',
    audience: 'mtu',
    title: { sw: 'Ukikosa siku tatu, rudi kwa tathmini', en: 'Three missed days means being reassessed' },
    body: {
      sw: 'Baada ya siku tatu bila dozi, uvumilivu wa mwili unapungua, na dozi uliyokuwa ukitumia inaweza kuwa kubwa kuliko mwili unaweza kuhimili. Usijirudishie dozi uliyokosa. Nenda kliniki na waambie siku ulizokosa; watakupanga upya.',
      en: 'After three days without a dose your tolerance falls, and the dose you were on can be more than your body can take. Never make up a missed dose. Go to the clinic and say how many days you missed; they will restart you safely.',
    },
  },
  {
    id: 'sio_kubadilisha',
    audience: 'mtu',
    title: { sw: 'Methadone sio "kubadilisha uraibu mmoja kwa mwingine"', en: 'Methadone is not swapping one addiction for another' },
    body: {
      sw: 'Hili ni jambo ambalo watu wa familia husema, na linaumiza. Kwa dozi iliyopangwa vizuri, methadone haikuletei "high" — inaondoa dalili za kukosa na hamu, ili uweze kufanya kazi, kulea, na kurudi kwenye maisha. Ni matibabu, kama insulin kwa kisukari.',
      en: 'Families say this, and it hurts. At a properly set dose methadone does not make you high: it removes withdrawal and craving so you can work, parent and have a life. It is treatment, the way insulin is treatment.',
    },
  },
  {
    id: 'muda',
    audience: 'mtu',
    title: { sw: 'Hakuna haraka ya kuacha', en: 'There is no hurry to come off' },
    body: {
      sw: 'Watu wengi wanafanya vizuri zaidi wakiendelea na methadone kwa miaka, sio miezi. Kuacha haraka ndiyo sababu kubwa ya kurudia. Uamuzi wa kupunguza ni wako na wa kliniki pamoja, bila shinikizo.',
      en: 'Most people do better staying on methadone for years rather than months. Coming off quickly is the commonest reason people relapse. Any decision to reduce is yours and the clinic’s together, without pressure.',
    },
  },
]

/* ─────────────────────────────────────────────────────────────────────────
 * 3. Withdrawal — the part that can kill, and the part that cannot
 * ───────────────────────────────────────────────────────────────────────── */

export interface WithdrawalScale {
  id: 'ciwa' | 'cows'
  name: Phrase
  /** What it is for, and who scores it. */
  purpose: Phrase
  audience: Audience
  /** Domains, in the person's words, so a symptom diary can use the same ten. */
  domains: readonly Phrase[]
  /** Bands, worst last. */
  bands: readonly { from: number; to: number; label: Phrase; action: Phrase }[]
  source: string
}

/**
 * CIWA-Ar — alcohol withdrawal, and the one scale in this file with a
 * mortality behind it.
 *
 * Ten domains, each scored 0 to 7 except orientation which is 0 to 4, so the
 * maximum is 67. Scored by a clinician on examination. The reason it exists is
 * symptom-triggered treatment: medicate on the score rather than on a fixed
 * schedule, which gives less medicine overall and catches the person who is
 * heading for a seizure.
 */
export const CIWA: WithdrawalScale = {
  id: 'ciwa',
  name: { sw: 'CIWA-Ar — kukosa pombe', en: 'CIWA-Ar — alcohol withdrawal' },
  purpose: {
    sw: 'Hupima ukali wa dalili za kukosa pombe, ili matibabu yatolewe kwa kiwango kinachohitajika. Hupimwa na mtaalam aliyefunzwa, kwa uchunguzi, sio kwa mtu mwenyewe.',
    en: 'Measures the severity of alcohol withdrawal so treatment is given to the level needed. Scored by a trained clinician on examination, not by the person themselves.',
  },
  audience: 'mtaalam',
  domains: [
    { sw: 'Kichefuchefu na kutapika', en: 'Nausea and vomiting' },
    { sw: 'Kutetemeka', en: 'Tremor' },
    { sw: 'Jasho', en: 'Sweating' },
    { sw: 'Wasiwasi', en: 'Anxiety' },
    { sw: 'Kutotulia', en: 'Agitation' },
    { sw: 'Hisia kwenye ngozi (kuchoma, kuwashwa)', en: 'Tactile disturbance' },
    { sw: 'Kusikia vitu visivyopo', en: 'Auditory disturbance' },
    { sw: 'Kuona vitu visivyopo', en: 'Visual disturbance' },
    { sw: 'Maumivu ya kichwa', en: 'Headache' },
    { sw: 'Kujua mahali na wakati', en: 'Orientation and clouding of sensorium' },
  ],
  bands: [
    {
      from: 0, to: 7,
      label: { sw: 'Dalili ndogo', en: 'Minimal' },
      action: {
        sw: 'Ufuatiliaji wa kawaida. Pima tena baada ya saa nne.',
        en: 'Routine monitoring. Rescore in four hours.',
      },
    },
    {
      from: 8, to: 15,
      label: { sw: 'Dalili za wastani', en: 'Mild to moderate' },
      action: {
        sw: 'Hapa ndipo matibabu huanza: benzodiazepine kwa kufuata alama, na kupima tena kila saa moja hadi mbili.',
        en: 'This is where treatment starts: symptom-triggered benzodiazepine, rescored every one to two hours.',
      },
    },
    {
      from: 16, to: 20,
      label: { sw: 'Dalili kali', en: 'Moderate to severe' },
      action: {
        sw: 'Matibabu ya haraka na ufuatiliaji wa karibu. Hatari ya kifafa cha kukosa pombe.',
        en: 'Prompt treatment and close monitoring. Risk of a withdrawal seizure.',
      },
    },
    {
      from: 21, to: 67,
      label: { sw: 'Hatari ya delirium tremens', en: 'Risk of delirium tremens' },
      action: {
        sw: 'Kulazwa. DT ina kiwango cha vifo kinachofikia asilimia 5 hata ikitibiwa, na zaidi isipotibiwa. Hii sio hali ya kutibiwa nyumbani.',
        en: 'Admission. Delirium tremens carries a mortality of around 5 per cent even when treated, and higher untreated. This is not treated at home.',
      },
    },
  ],
  source: 'Sullivan et al. 1989 · WHO mhGAP · Tanzania STG',
}

/**
 * COWS — opioid withdrawal.
 *
 * Eleven domains, maximum 48. Its clinical job is different from CIWA's: it is
 * not deciding whether somebody might die, it is deciding whether they are
 * withdrawn enough to start buprenorphine without being thrown into
 * precipitated withdrawal, which is the mistake that makes somebody refuse
 * treatment for ever.
 */
export const COWS: WithdrawalScale = {
  id: 'cows',
  name: { sw: 'COWS — kukosa afyuni', en: 'COWS — opioid withdrawal' },
  purpose: {
    sw: 'Hupima ukali wa dalili za kukosa afyuni, na hutumika kupanga wakati wa kuanzisha dawa. Hupimwa na mtaalam, kwa uchunguzi.',
    en: 'Measures the severity of opioid withdrawal and is used to time the start of medication. Scored by a clinician on examination.',
  },
  audience: 'mtaalam',
  domains: [
    { sw: 'Mapigo ya moyo', en: 'Resting pulse rate' },
    { sw: 'Jasho', en: 'Sweating' },
    { sw: 'Kutotulia', en: 'Restlessness' },
    { sw: 'Ukubwa wa kioo cha jicho', en: 'Pupil size' },
    { sw: 'Maumivu ya mifupa na viungo', en: 'Bone or joint aches' },
    { sw: 'Mafua na macho ya maji', en: 'Runny nose or tearing' },
    { sw: 'Tumbo kuharibika', en: 'GI upset' },
    { sw: 'Kutetemeka', en: 'Tremor' },
    { sw: 'Kupiga chafya na kupata homa ya ngozi', en: 'Yawning' },
    { sw: 'Wasiwasi au hasira', en: 'Anxiety or irritability' },
    { sw: 'Ngozi kusimama (goose flesh)', en: 'Gooseflesh skin' },
  ],
  bands: [
    {
      from: 0, to: 4,
      label: { sw: 'Hakuna dalili za kutosha', en: 'None to minimal' },
      action: {
        sw: 'Si wakati wa kuanzisha buprenorphine: kuanzisha mapema sana huleta dalili kali zaidi ghafla (precipitated withdrawal). Subiri na pima tena.',
        en: 'Not yet the moment to start buprenorphine: starting too early precipitates worse withdrawal. Wait and rescore.',
      },
    },
    {
      from: 5, to: 12,
      label: { sw: 'Dalili ndogo', en: 'Mild' },
      action: { sw: 'Endelea kupima. Tibu dalili zinazoudhi.', en: 'Keep rescoring. Treat symptoms for comfort.' },
    },
    {
      from: 13, to: 24,
      label: { sw: 'Dalili za wastani', en: 'Moderate' },
      action: {
        sw: 'Kwa kawaida ni wakati wa kuanzisha matibabu. Uamuzi ni wa mtaalam aliyemchunguza.',
        en: 'Usually the window to start treatment. The decision belongs to the clinician who examined the person.',
      },
    },
    {
      from: 25, to: 36,
      label: { sw: 'Dalili kali', en: 'Moderately severe' },
      action: { sw: 'Matibabu ya haraka; mtu huyu anateseka.', en: 'Treat promptly; this person is suffering.' },
    },
    {
      from: 37, to: 48,
      label: { sw: 'Dalili kali sana', en: 'Severe' },
      action: {
        sw: 'Matibabu ya haraka na maji. Kukosa afyuni si hatari kwa maisha kama kukosa pombe, lakini kutapika na kuharisha kwa muda mrefu kunaweza kusababisha upungufu wa maji hatari.',
        en: 'Treat promptly with fluids. Opioid withdrawal is not life-threatening the way alcohol withdrawal is, but prolonged vomiting and diarrhoea can cause dangerous dehydration.',
      },
    },
  ],
  source: 'Wesson & Ling 2003 · WHO',
}

export const WITHDRAWAL_SCALES: readonly WithdrawalScale[] = [CIWA, COWS]

export function bandFor(scale: WithdrawalScale, score: number) {
  return scale.bands.find((b) => score >= b.from && score <= b.to) ?? scale.bands[scale.bands.length - 1]
}

/**
 * The warning that goes to everybody, in both faces, wherever stopping is
 * mentioned.
 *
 * It is separated out rather than written into each piece of copy so that it
 * cannot drift: one sentence, one place, and a reader who meets it twice meets
 * the same words.
 */
export const KUACHA_GHAFLA: Phrase = {
  sw: 'Usiache pombe au dawa za usingizi ghafla bila msaada. Kukosa pombe kunaweza kusababisha kifafa na delirium tremens, na kuna hatari ya kifo — hii ni tofauti na kukosa afyuni, ambayo ni maumivu makali lakini sio ya kuua. Kama unatumia pombe kila siku na unataka kuacha, nenda kituo cha afya kwanza.',
  en: 'Do not stop alcohol or sedatives abruptly without help. Alcohol withdrawal can cause seizures and delirium tremens and carries a risk of death, unlike opioid withdrawal, which is severe pain but not a killer. If you drink daily and want to stop, see a health facility first.',
}

/* ─────────────────────────────────────────────────────────────────────────
 * 4. Recovery, counted in days the person chose
 * ───────────────────────────────────────────────────────────────────────── */

export interface Milestone { days: number; label: Phrase; why: Phrase }

/**
 * Milestones, and why each one is where it is.
 *
 * Not round numbers for their own sake. Each is a point where something
 * measurable changes, because "30 days" with no reason behind it is a sticker,
 * and a person who relapses on day 29 and loses a sticker has been given one
 * more reason to stop counting.
 */
export const MILESTONES: readonly Milestone[] = [
  { days: 1, label: { sw: 'Siku moja', en: 'One day' },
    why: { sw: 'Siku ya kwanza ni ngumu kuliko zote. Umeishinda.', en: 'The first day is the hardest there is. You got through it.' } },
  { days: 3, label: { sw: 'Siku tatu', en: 'Three days' },
    why: { sw: 'Dalili kali za kukosa huanza kupungua hapa kwa vilevi vingi.', en: 'For most substances the worst of withdrawal starts to ease here.' } },
  { days: 7, label: { sw: 'Wiki moja', en: 'One week' },
    why: { sw: 'Usingizi huanza kurudi. Watu wengi husema hapa ndipo walianza kujihisi kama wao wenyewe.', en: 'Sleep starts to return. Most people say this is when they began to feel like themselves.' } },
  { days: 30, label: { sw: 'Mwezi mmoja', en: 'One month' },
    why: { sw: 'Hatari kubwa ya kurudia ni mwezi wa kwanza. Umeupita.', en: 'The highest risk of relapse is the first month. You are through it.' } },
  { days: 90, label: { sw: 'Miezi mitatu', en: 'Three months' },
    why: { sw: 'Hapa ndipo tafiti zinaonyesha nafasi ya kudumu inaongezeka kwa kiasi kikubwa.', en: 'This is where the research shows the chance of lasting change rises sharply.' } },
  { days: 365, label: { sw: 'Mwaka mmoja', en: 'One year' },
    why: { sw: 'Mwaka. Kuna watu waliokuwa hawakuamini ungefika hapa, na wewe ni mmoja wao.', en: 'A year. Some people did not believe you would get here, and you were one of them.' } },
]

/**
 * How far somebody has come, and the next thing to reach.
 *
 * Three outcomes. A count, a nought said as a day rather than as a zero, or
 * no date set at all — which is a person who has not chosen to count, and that
 * is allowed. A tracker that insists on a sobriety date excludes everybody on
 * maintenance treatment, which is most of the people this module is for.
 */
export type RecoveryRead =
  | { state: 'haijawekwa' }
  | { state: 'inahesabiwa'; days: number; reached: Milestone[]; next: Milestone | null }

export function recoveryRead(since: string | null | undefined, now = new Date()): RecoveryRead {
  if (!since) return { state: 'haijawekwa' }
  const start = new Date(since)
  if (Number.isNaN(start.getTime())) return { state: 'haijawekwa' }
  const days = Math.max(0, Math.floor((now.getTime() - start.getTime()) / 86_400_000))
  const reached = MILESTONES.filter((m) => days >= m.days)
  const next = MILESTONES.find((m) => days < m.days) ?? null
  return { state: 'inahesabiwa', days, reached, next }
}
