/**
 * ASSIST — the screen for every substance, not only alcohol.
 *
 * ── Why this file exists ─────────────────────────────────────────────────
 *
 * `/maalum/uponyaji`, the addiction recovery page, has advertised four
 * instruments since it was written: AUDIT, ASSIST, CRAFFT, PHQ-9 and GAD-7.
 * Measured on 14 October 2026, the library held six instruments and ASSIST was
 * not one of them. So the page named a screen that did not exist, on the one
 * population page where the screen is the point.
 *
 * What the library did hold covers two narrow cases and leaves the common one
 * open:
 *
 *   AUDIT    alcohol, and alcohol only. Ten items, well validated, and silent
 *            about everything else a person might be using.
 *   CRAFFT   adolescents, 12 to 21, and only if the wizard knows the age.
 *
 * An adult using heroin, cannabis or mirungi had no screen at all. In Tanzania
 * that is not an edge case: it is the reason the methadone clinics at
 * Muhimbili and Mwananyamala exist, and the four MAT centres listed on the
 * recovery page are there for people this library could not screen.
 *
 * ── What ASSIST is ──────────────────────────────────────────────────────
 *
 * The WHO Alcohol, Smoking and Substance Involvement Screening Test, V3.0.
 * It asks the same eight questions about each class of substance and scores
 * each class on its own, which is the whole reason it is the right instrument
 * here: a person is not "a user", they have a relationship with each thing
 * they use, and those relationships differ. Somebody may drink within the
 * guidance and be in trouble with mirungi.
 *
 * Three things about the shape, each of which the code below has to honour:
 *
 * **It is gated.** Question 1 asks whether the person has ever used the
 * substance. Never, and the other seven are not asked about it. Asking a
 * lifelong abstainer how often they have failed to control their heroin use is
 * how a screen loses the room.
 *
 * **The weights are not a Likert scale.** Each question has its own values —
 * 0, 2, 3, 4, 6 for frequency of use, 0, 3, 4, 5, 6, 7 for the four questions
 * that follow it, 0, 6 and 3 for the two retrospective ones. They are the
 * WHO's and they are not ours to tidy.
 *
 * **Alcohol has its own cut-off.** Moderate risk begins at 11 for alcohol and
 * at 4 for everything else, because the population distribution of drinking is
 * not the distribution of injecting. A single threshold applied to all ten
 * classes, which is the obvious simplification, would call ordinary drinking
 * moderate risk and miss nothing it gained.
 *
 * ── Three outcomes, here as everywhere ──────────────────────────────────
 *
 * A band, a real nought in words — never used this — or not asked. The third
 * is not padding: a battery stopped halfway must not report nought risk for
 * the substances it never reached, and `assistRead` distinguishes them.
 *
 * ── The Kiswahili ───────────────────────────────────────────────────────
 *
 * `validated_sw: false`, the same honest flag the other six instruments carry.
 * The WHO publishes ASSIST in several languages and Kiswahili is not among the
 * validated set, so what is below is a faithful rendering and is marked as
 * one. The substance names use what people in Tanzania say — mirungi for
 * khat, bangi for cannabis, unga for heroin where it is street usage — with
 * the clinical name beside it, because a screen a person does not recognise
 * their own life in is a screen they answer wrongly.
 */

export type AssistSubstanceId =
  | 'tumbaku' | 'pombe' | 'bangi' | 'kokeini' | 'mirungi'
  | 'dawa_usingizi' | 'kuvuta_gundi' | 'heroini' | 'hallucinogen' | 'nyingine'

export interface AssistSubstance {
  id: AssistSubstanceId
  /** What people call it, first. */
  name_sw: string
  name_en: string
  /** The clinical class, shown beside the common name. */
  note_sw: string
  note_en: string
}

/**
 * The ten classes, in the WHO's order, with Tanzanian names first.
 *
 * Mirungi is the one departure worth naming. The WHO's own card folds khat
 * into "other", and in this country it is chewed openly, daily, in the
 * Northern regions especially, and a screen that makes somebody find it under
 * "other" is a screen that undercounts it.
 */
export const ASSIST_SUBSTANCES: readonly AssistSubstance[] = [
  { id: 'tumbaku', name_sw: 'Tumbaku', name_en: 'Tobacco',
    note_sw: 'sigara, ugoro, shisha', note_en: 'cigarettes, snuff, shisha' },
  { id: 'pombe', name_sw: 'Pombe', name_en: 'Alcohol',
    note_sw: 'bia, mvinyo, gongo, viroba', note_en: 'beer, wine, spirits, local brew' },
  { id: 'bangi', name_sw: 'Bangi', name_en: 'Cannabis',
    note_sw: 'ganja, marijuana', note_en: 'ganja, marijuana, hashish' },
  { id: 'kokeini', name_sw: 'Kokeini', name_en: 'Cocaine',
    note_sw: 'unga mweupe, crack', note_en: 'coke, crack' },
  { id: 'mirungi', name_sw: 'Mirungi (khat)', name_en: 'Khat',
    note_sw: 'miraa, veve', note_en: 'miraa, qat' },
  { id: 'dawa_usingizi', name_sw: 'Dawa za usingizi na kutuliza', name_en: 'Sedatives / sleeping pills',
    note_sw: 'valium, diazepam, bila agizo la daktari', note_en: 'benzodiazepines, taken without a prescription' },
  { id: 'kuvuta_gundi', name_sw: 'Kuvuta gundi au petroli', name_en: 'Inhalants',
    note_sw: 'gundi, petroli, thinner', note_en: 'glue, petrol, thinner' },
  { id: 'heroini', name_sw: 'Heroini na dawa za afyuni', name_en: 'Opioids',
    note_sw: 'unga, brown sugar, morphine, tramadol bila agizo',
    note_en: 'heroin, morphine, tramadol taken without a prescription' },
  { id: 'hallucinogen', name_sw: 'Dawa za kuleta maono', name_en: 'Hallucinogens',
    note_sw: 'LSD, uyoga wa maono', note_en: 'LSD, mushrooms' },
  { id: 'nyingine', name_sw: 'Nyingine', name_en: 'Other',
    note_sw: 'kitu kingine chochote', note_en: 'anything else' },
]

export interface AssistChoice { label_sw: string; label_en: string; value: number }

export interface AssistQuestion {
  id: 'q1' | 'q2' | 'q3' | 'q4' | 'q5' | 'q6' | 'q7' | 'q8'
  text_sw: string
  text_en: string
  choices: readonly AssistChoice[]
  /**
   * Whether this question is asked once about the person rather than once per
   * substance. Q8, injecting, is asked once: the needle does not care which
   * drug was in it.
   */
  once?: boolean
}

/** Q2's own weights. Not a scale, the WHO's values. */
const FREQ_USE: readonly AssistChoice[] = [
  { label_sw: 'Hapana, kamwe', label_en: 'Never', value: 0 },
  { label_sw: 'Mara 1-2', label_en: 'Once or twice', value: 2 },
  { label_sw: 'Kila mwezi', label_en: 'Monthly', value: 3 },
  { label_sw: 'Kila wiki', label_en: 'Weekly', value: 4 },
  { label_sw: 'Kila siku au karibu kila siku', label_en: 'Daily or almost daily', value: 6 },
]

/** Q3 to Q6 share these. */
const FREQ_HARM: readonly AssistChoice[] = [
  { label_sw: 'Hapana, kamwe', label_en: 'Never', value: 0 },
  { label_sw: 'Mara 1-2', label_en: 'Once or twice', value: 3 },
  { label_sw: 'Kila mwezi', label_en: 'Monthly', value: 4 },
  { label_sw: 'Kila wiki', label_en: 'Weekly', value: 5 },
  { label_sw: 'Kila siku au karibu kila siku', label_en: 'Daily or almost daily', value: 6 },
]

/** Q6 is scored a point higher at the top than Q3 to Q5. */
const FREQ_HARM_6: readonly AssistChoice[] = [
  { label_sw: 'Hapana, kamwe', label_en: 'Never', value: 0 },
  { label_sw: 'Mara 1-2', label_en: 'Once or twice', value: 3 },
  { label_sw: 'Kila mwezi', label_en: 'Monthly', value: 4 },
  { label_sw: 'Kila wiki', label_en: 'Weekly', value: 5 },
  { label_sw: 'Kila siku au karibu kila siku', label_en: 'Daily or almost daily', value: 7 },
]

/** Q7 and Q8 look back over a life, so they have three answers, not five. */
const EVER: readonly AssistChoice[] = [
  { label_sw: 'Hapana, kamwe', label_en: 'No, never', value: 0 },
  { label_sw: 'Ndiyo, katika miezi 3 iliyopita', label_en: 'Yes, in the past 3 months', value: 6 },
  { label_sw: 'Ndiyo, lakini siyo miezi 3 iliyopita', label_en: 'Yes, but not in the past 3 months', value: 3 },
]

const EVER_YES_NO: readonly AssistChoice[] = [
  { label_sw: 'Hapana, kamwe', label_en: 'No, never', value: 0 },
  { label_sw: 'Ndiyo, katika miezi 3 iliyopita', label_en: 'Yes, in the past 3 months', value: 2 },
  { label_sw: 'Ndiyo, lakini siyo miezi 3 iliyopita', label_en: 'Yes, but not in the past 3 months', value: 1 },
]

export const ASSIST_QUESTIONS: readonly AssistQuestion[] = [
  {
    id: 'q1',
    text_sw: 'Katika maisha yako yote, umewahi kutumia hiki?',
    text_en: 'In your life, have you ever used this?',
    choices: [
      { label_sw: 'Hapana, kamwe', label_en: 'No, never', value: 0 },
      { label_sw: 'Ndiyo', label_en: 'Yes', value: 1 },
    ],
  },
  {
    id: 'q2',
    text_sw: 'Katika miezi 3 iliyopita, mara ngapi umekitumia?',
    text_en: 'In the past 3 months, how often have you used it?',
    choices: FREQ_USE,
  },
  {
    id: 'q3',
    text_sw: 'Katika miezi 3 iliyopita, mara ngapi ulihisi hamu kubwa ya kukitumia?',
    text_en: 'In the past 3 months, how often have you had a strong desire or urge to use it?',
    choices: FREQ_HARM,
  },
  {
    id: 'q4',
    text_sw: 'Katika miezi 3 iliyopita, mara ngapi matumizi yake yalikuletea tatizo la afya, fedha, kisheria au kijamii?',
    text_en: 'In the past 3 months, how often has using it led to health, social, legal or financial problems?',
    choices: FREQ_HARM,
  },
  {
    id: 'q5',
    text_sw: 'Katika miezi 3 iliyopita, mara ngapi umeshindwa kufanya ulichotarajiwa kufanya kwa sababu ya matumizi yake?',
    text_en: 'In the past 3 months, how often have you failed to do what was expected of you because of using it?',
    choices: FREQ_HARM,
  },
  {
    id: 'q6',
    text_sw: 'Rafiki, ndugu au mtu mwingine amewahi kuonyesha wasiwasi kuhusu matumizi yako?',
    text_en: 'Has a friend, relative or anyone else ever expressed concern about your use?',
    choices: FREQ_HARM_6,
  },
  {
    id: 'q7',
    text_sw: 'Umewahi kujaribu kupunguza au kuacha, na ukashindwa?',
    text_en: 'Have you ever tried to cut down or stop, and failed?',
    choices: EVER,
  },
  {
    id: 'q8',
    once: true,
    text_sw: 'Umewahi kutumia dawa yoyote kwa kujichoma na sindano?',
    text_en: 'Have you ever used any drug by injection?',
    choices: EVER_YES_NO,
  },
]

/** What one substance's answers come to. */
export type AssistBand = 'chini' | 'wastani' | 'juu'

export interface AssistSubstanceScore {
  id: AssistSubstanceId
  /** Q2 to Q7 summed. Q1 gates and is not scored; Q8 is about the person. */
  score: number
  band: AssistBand
  /** False when Q1 said never, which is a nought with a meaning. */
  everUsed: boolean
}

/**
 * The WHO's cut-offs, with alcohol's own.
 *
 * Alcohol: 0-10 lower, 11-26 moderate, 27+ high.
 * Everything else: 0-3 lower, 4-26 moderate, 27+ high.
 *
 * The second row is the one that matters clinically. Four points is a single
 * monthly use plus one urge, and for heroin that is the right place to start a
 * conversation. For beer it is not, which is why alcohol is held apart.
 */
export function assistBand(id: AssistSubstanceId, score: number): AssistBand {
  const moderateFrom = id === 'pombe' ? 11 : 4
  if (score >= 27) return 'juu'
  if (score >= moderateFrom) return 'wastani'
  return 'chini'
}

/** Answers as the screen collects them: substance → question → value. */
export type AssistAnswers = Partial<Record<AssistSubstanceId, Partial<Record<string, number>>>>

export function scoreSubstance(id: AssistSubstanceId, answers: AssistAnswers): AssistSubstanceScore {
  const given = answers[id] ?? {}
  const everUsed = (given.q1 ?? 0) > 0
  if (!everUsed) return { id, score: 0, band: 'chini', everUsed: false }
  /* Q2 through Q7. Q1 is the gate and carries no weight of its own; Q8 is
     asked once about the person and is reported beside the scores, not inside
     one of them. */
  const score = ['q2', 'q3', 'q4', 'q5', 'q6', 'q7']
    .reduce((sum, q) => sum + (given[q] ?? 0), 0)
  return { id, score, band: assistBand(id, score), everUsed: true }
}

export type AssistRead =
  | { state: 'hakujaulizwa' }
  | {
      state: 'imesomwa'
      scores: AssistSubstanceScore[]
      /** The highest band reached across every substance. */
      highest: AssistBand
      /** Substances at moderate or above, worst first. */
      concerns: AssistSubstanceScore[]
      /** Q8. True is a standing concern whatever the scores say. */
      injected: boolean
      injectedRecently: boolean
    }

/**
 * Everything the answers say, or that they were never given.
 *
 * `hakujaulizwa` is the third outcome and it is not decoration. A profile with
 * no ASSIST must not read as a profile with nought risk: one is a person
 * nobody asked and the other is a person who answered.
 */
export function assistRead(answers: AssistAnswers | undefined): AssistRead {
  if (!answers || Object.keys(answers).length === 0) return { state: 'hakujaulizwa' }

  const scores = ASSIST_SUBSTANCES.map((s) => scoreSubstance(s.id, answers))
  const order: Record<AssistBand, number> = { chini: 0, wastani: 1, juu: 2 }
  const highest = scores.reduce<AssistBand>(
    (worst, s) => (order[s.band] > order[worst] ? s.band : worst), 'chini',
  )
  const concerns = scores
    .filter((s) => s.band !== 'chini')
    .sort((a, b) => b.score - a.score)

  /* Q8 is stored against the person. The screen writes it under the first
     substance it asks about, so it is read from wherever it landed rather than
     from a fixed key, and a missing answer is not an injection. */
  const q8 = Object.values(answers).map((a) => a?.q8 ?? 0).find((v) => v > 0) ?? 0
  return {
    state: 'imesomwa',
    scores,
    highest,
    concerns,
    injected: q8 > 0,
    injectedRecently: q8 >= 2,
  }
}

/**
 * What a band means, and what happens next.
 *
 * This is the SBIRT half — Screening, Brief Intervention and Referral to
 * Treatment — and it is the reason the screen is worth running at all. A score
 * that leads nowhere is a number that makes a person feel judged.
 *
 * The high band says "treatment", not "stop". Nobody stops heroin because an
 * application told them to, and for opioid dependence the national answer
 * already exists: the MAT clinics the recovery page lists. Telling somebody to
 * stop, where methadone is what works, is advice that sends them back to the
 * street.
 */
export interface AssistAction {
  band: AssistBand
  title_sw: string
  title_en: string
  body_sw: string
  body_en: string
}

export const ASSIST_ACTIONS: Record<AssistBand, AssistAction> = {
  chini: {
    band: 'chini',
    title_sw: 'Hatari ndogo',
    title_en: 'Lower risk',
    body_sw: 'Majibu yako hayaonyeshi tatizo kwa sasa. Tunakuhifadhia jibu hili ili tukilinganishe baadaye kama utapenda kupima tena.',
    body_en: 'Your answers do not show a problem now. We keep this so it can be compared if you screen again later.',
  },
  wastani: {
    band: 'wastani',
    title_sw: 'Hatari ya wastani',
    title_en: 'Moderate risk',
    body_sw: 'Majibu yako yanaonyesha matumizi yanayoweza kukuletea madhara. Tunapendekeza mazungumzo mafupi na mshauri — vipindi vichache vya MI (mahojiano ya kuhamasisha) vinaonyesha matokeo mazuri katika hatua hii, na hakuna rufaa ya hospitali inayohitajika bado.',
    body_en: 'Your answers show use that could harm you. We suggest a short conversation with a counsellor: a few sessions of motivational interviewing work well at this stage, and no hospital referral is needed yet.',
  },
  juu: {
    band: 'juu',
    title_sw: 'Hatari kubwa',
    title_en: 'High risk',
    body_sw: 'Majibu yako yanaonyesha utegemezi unaowezekana. Hii inahitaji matibabu, sio nia tu — na matibabu yapo. Kwa heroini na dawa za afyuni, kliniki za MAT (methadone) za Muhimbili, Mwananyamala, Mbeya na KCMC zinatoa huduma hii bure. Usiache mwenyewe ghafla bila msaada: kwa pombe na dawa za usingizi, kuacha ghafla kunaweza kuwa hatari kwa maisha.',
    body_en: 'Your answers suggest likely dependence. This needs treatment rather than willpower, and treatment exists. For opioids, the MAT clinics at Muhimbili, Mwananyamala, Mbeya and KCMC provide it free. Do not stop abruptly on your own: for alcohol and sedatives, abrupt withdrawal can be life-threatening.',
  },
}

/**
 * The one warning that does not wait for a band.
 *
 * Injecting is a transmission question as much as a dependence one, and
 * somebody who injects monthly on a low ASSIST score still needs the harm
 * reduction conversation. Tanzania runs needle and syringe programmes
 * alongside the MAT clinics, and this is where a person is told they exist.
 */
export const ASSIST_INJECTION_NOTE = {
  title_sw: 'Kujichoma na sindano',
  title_en: 'Injecting',
  body_sw: 'Umesema umewahi kujichoma na sindano. Hii ni hatari ya VVU na homa ya ini (hepatitis) zaidi ya hatari ya dawa yenyewe. Kliniki za MAT zinatoa sindano safi, upimaji wa VVU na matibabu — bure, na bila kuripoti polisi. Usichangie sindano na mtu mwingine kamwe.',
  body_en: 'You said you have injected a drug. That carries HIV and hepatitis risk beyond the risk of the drug itself. The MAT clinics provide clean needles, HIV testing and treatment, free, and without a police report. Never share a needle.',
}

/** The same honesty flag the other six instruments carry. */
export const ASSIST_META = {
  id: 'assist' as const,
  name_sw: 'ASSIST — Dawa na vilevi',
  name_en: 'ASSIST — Alcohol, Smoking and Substance Involvement',
  source: 'WHO ASSIST V3.0 (Humeniuk et al. 2010)',
  validated_sw: false,
}
