/**
 * Step 4b — ASSIST, the substance screen.
 *
 * ── Why it is its own step ───────────────────────────────────────────────
 *
 * `Step4Vipimo` runs a battery of flat instruments: a list of items, one scale,
 * one total, next instrument. ASSIST does not have that shape. It asks eight
 * questions about each of ten substance classes, skips the remaining seven for
 * anything the person has never used, weights each question differently, and
 * scores every class on its own. Folding it into that loop would mean either
 * flattening ASSIST into one meaningless total or bending the loop until it
 * served one instrument badly and the other six worse.
 *
 * ── The shape of the asking ──────────────────────────────────────────────
 *
 * Two passes, which is how the WHO's own card is laid out and is also the
 * kinder order.
 *
 * First the person marks what they have ever used, all ten at once, as chips.
 * That is Question 1 for every substance in a single screen, and a person who
 * has used nothing is finished in one press rather than being asked ten times
 * whether they inject heroin.
 *
 * Then, for each thing they marked, the remaining questions. Nothing is asked
 * about a substance they did not mark.
 *
 * ── What it will not do ──────────────────────────────────────────────────
 *
 * It will not diagnose. ASSIST produces a risk band and a conversation, and
 * `lib/assist.ts` carries the words for each band: the moderate band offers a
 * short counselling conversation and the high band names the MAT clinics,
 * because for opioid dependence methadone is the thing that works and telling
 * somebody to stop is advice that sends them back to the street.
 *
 * It will not tell anybody to stop abruptly. For alcohol and sedatives, abrupt
 * withdrawal can kill, and an application that says "just stop" to somebody
 * drinking at dependence level has given dangerous advice in a friendly voice.
 *
 * It is skippable. A person in the middle of a wizard who does not want to
 * answer questions about drugs today should not be trapped, and a coerced
 * answer is a false answer. Skipping records nothing, which `assistRead`
 * reports as `hakujaulizwa` — its own state, distinct from a nought.
 */

import { useState } from 'react'
import { JEWEL, NEUTRAL, TEXT, hexToRgba } from '../../../lib/glass'
import {
  ASSIST_ACTIONS, ASSIST_INJECTION_NOTE, ASSIST_META,
  ASSIST_QUESTIONS, ASSIST_SUBSTANCES,
  assistRead, type AssistAnswers, type AssistSubstanceId,
} from '../lib/assist'
import type { KaribuProfile } from '../lib/storage'
import { cardStyle, chipStyle, ghostBtn, primaryBtn, subStyle, titleStyle } from '../lib/ui'
import { useLang } from '../../../lib/i18n/Provider'

interface Props {
  profile: KaribuProfile
  update: (p: Partial<KaribuProfile>) => void
  next: () => void
  back: () => void
}

/** The seven asked per substance, plus the one asked once. */
const PER_SUBSTANCE = ASSIST_QUESTIONS.filter((q) => q.id !== 'q1' && !q.once)
const ONCE = ASSIST_QUESTIONS.find((q) => q.once)

export default function Step4bUraibu({ profile, update, next, back }: Props) {
  const { lang } = useLang()
  const sw = lang === 'sw'

  /* Which substances the person has ever used. The first pass. */
  const [used, setUsed] = useState<AssistSubstanceId[]>(() => {
    const prev = profile.step4?.assist
    if (!prev) return []
    return ASSIST_SUBSTANCES
      .filter((s) => (prev[s.id]?.q1 ?? 0) > 0)
      .map((s) => s.id)
  })
  const [phase, setPhase] = useState<'chagua' | 'maswali' | 'jibu'>('chagua')
  const [answers, setAnswers] = useState<AssistAnswers>(() => profile.step4?.assist ?? {})
  /* Where we are in the second pass: which marked substance, which question. */
  const [at, setAt] = useState(0)
  const [qAt, setQAt] = useState(0)
  const [injected, setInjected] = useState<number | null>(() => {
    const prev = profile.step4?.assist
    if (!prev) return null
    const found = Object.values(prev).map((a) => a?.q8).find((v) => v !== undefined)
    return found ?? null
  })

  const toggle = (id: AssistSubstanceId) => {
    setUsed((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  /** The marked substances, in the register's order rather than press order. */
  const queue = ASSIST_SUBSTANCES.filter((s) => used.includes(s.id))

  const beginQuestions = () => {
    /* Q1 for all ten, including the noughts: a recorded "never" is what makes
       `hakujaulizwa` mean something different from a clean screen. */
    const seeded: AssistAnswers = {}
    for (const s of ASSIST_SUBSTANCES) {
      seeded[s.id] = { ...(answers[s.id] ?? {}), q1: used.includes(s.id) ? 1 : 0 }
    }
    setAnswers(seeded)
    if (queue.length === 0) {
      /* Nothing used. There is nothing to ask, and the injecting question
         belongs here rather than being skipped with the rest: somebody may
         have injected a drug they no longer count among what they use. */
      setPhase('jibu')
      return
    }
    setAt(0)
    setQAt(0)
    setPhase('maswali')
  }

  const answer = (value: number) => {
    const substance = queue[at]
    if (!substance) return
    const q = PER_SUBSTANCE[qAt]
    setAnswers((prev) => ({
      ...prev,
      [substance.id]: { ...(prev[substance.id] ?? {}), [q.id]: value },
    }))
    if (qAt < PER_SUBSTANCE.length - 1) { setQAt(qAt + 1); return }
    if (at < queue.length - 1) { setAt(at + 1); setQAt(0); return }
    setPhase('jibu')
  }

  const finish = () => {
    /* The injecting answer is stored against the first substance, which is
       where `assistRead` looks for it: it is a fact about the person and not
       about any one drug, and it has nowhere else to live in this shape. */
    const first = ASSIST_SUBSTANCES[0].id
    const withQ8: AssistAnswers = {
      ...answers,
      [first]: { ...(answers[first] ?? {}), q8: injected ?? 0 },
    }
    const step4 = profile.step4
    if (step4) update({ step4: { ...step4, assist: withQ8 } })
    next()
  }

  const skip = () => {
    /* Records nothing. A screen nobody answered must not read as a screen
       that came back clean. */
    next()
  }

  const read = assistRead(
    phase === 'jibu'
      ? { ...answers, [ASSIST_SUBSTANCES[0].id]: { ...(answers[ASSIST_SUBSTANCES[0].id] ?? {}), q8: injected ?? 0 } }
      : undefined,
  )

  return (
    <div style={cardStyle}>
      <h2 style={titleStyle}>
        {sw ? 'Dawa na vilevi' : 'Alcohol and other substances'}
      </h2>
      <p style={subStyle}>
        {sw
          ? 'Maswali haya ni ya WHO na tunayauliza kila mtu. Hakuna jibu linalomwambia polisi, na hakuna jibu linalokufanya ukose huduma. Unaweza kuyaruka kama hutaki kuyajibu leo.'
          : 'These questions are the WHO’s and we ask everybody. No answer here reaches the police, and no answer costs you care. You can skip them if you would rather not answer today.'}
      </p>

      {/* ── Pass one: what has ever been used ─────────────────────────── */}
      {phase === 'chagua' && (
        <>
          <p style={{ ...subStyle, color: NEUTRAL.ink, fontWeight: 600 }}>
            {sw
              ? 'Katika maisha yako yote, umewahi kutumia chochote cha hivi?'
              : 'In your life, have you ever used any of these?'}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
            {ASSIST_SUBSTANCES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => toggle(s.id)}
                aria-pressed={used.includes(s.id)}
                style={{ ...chipStyle(used.includes(s.id)), textAlign: 'left' }}
              >
                <span style={{ display: 'block' }}>{sw ? s.name_sw : s.name_en}</span>
                <span style={{ display: 'block', fontSize: 12, opacity: 0.75 }}>
                  {sw ? s.note_sw : s.note_en}
                </span>
              </button>
            ))}
          </div>
          <p style={{ ...subStyle, fontSize: 13 }}>
            {used.length === 0
              ? (sw ? 'Hujachagua chochote. Hiyo ni jibu kamili.' : 'You have marked nothing. That is a complete answer.')
              : (sw ? `Umechagua ${used.length}. Tutauliza maswali machache kuhusu kila kimoja.`
                    : `You marked ${used.length}. We will ask a few questions about each.`)}
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button type="button" style={primaryBtn()} onClick={beginQuestions}>
              {sw ? 'Endelea' : 'Continue'}
            </button>
            <button type="button" style={ghostBtn()} onClick={skip}>
              {sw ? 'Ruka hatua hii' : 'Skip this step'}
            </button>
            <button type="button" style={ghostBtn()} onClick={back}>
              {sw ? 'Nyuma' : 'Back'}
            </button>
          </div>
        </>
      )}

      {/* ── Pass two: the seven, per marked substance ─────────────────── */}
      {phase === 'maswali' && queue[at] && (
        <>
          <p style={{ fontSize: 13, color: TEXT.muted, margin: '0 0 6px' }}>
            {sw ? queue[at].name_sw : queue[at].name_en}
            {' · '}
            {at + 1}/{queue.length}
            {' · '}
            {sw ? 'swali' : 'question'} {qAt + 1}/{PER_SUBSTANCE.length}
          </p>
          <p style={{ ...subStyle, color: NEUTRAL.ink, fontSize: 16, fontWeight: 600 }}>
            {sw ? PER_SUBSTANCE[qAt].text_sw : PER_SUBSTANCE[qAt].text_en}
          </p>
          <div style={{ display: 'grid', gap: 8, marginBottom: 16 }}>
            {PER_SUBSTANCE[qAt].choices.map((c) => {
              const chosen = (answers[queue[at].id]?.[PER_SUBSTANCE[qAt].id] ?? -1) === c.value
              return (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => answer(c.value)}
                  aria-pressed={chosen}
                  style={{
                    ...chipStyle(chosen),
                    textAlign: 'left',
                    borderRadius: 12,
                    minHeight: 44,
                  }}
                >
                  {sw ? c.label_sw : c.label_en}
                </button>
              )
            })}
          </div>
          <button type="button" style={ghostBtn()} onClick={() => setPhase('chagua')}>
            {sw ? 'Rudi kwenye orodha' : 'Back to the list'}
          </button>
        </>
      )}

      {/* ── The injecting question, and what the answers come to ──────── */}
      {phase === 'jibu' && (
        <>
          {ONCE && (
            <div style={{ marginBottom: 20 }}>
              <p style={{ ...subStyle, color: NEUTRAL.ink, fontSize: 16, fontWeight: 600 }}>
                {sw ? ONCE.text_sw : ONCE.text_en}
              </p>
              <div style={{ display: 'grid', gap: 8 }}>
                {ONCE.choices.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setInjected(c.value)}
                    aria-pressed={injected === c.value}
                    style={{ ...chipStyle(injected === c.value), textAlign: 'left', borderRadius: 12, minHeight: 44 }}
                  >
                    {sw ? c.label_sw : c.label_en}
                  </button>
                ))}
              </div>
            </div>
          )}

          {read.state === 'imesomwa' && (
            <div
              style={{
                /* The register's own three, not new colours: the crisis ink
                   for likely dependence, the gold for harmful use, the teal
                   for lower risk. A band is a clinical state and the palette
                   already has a name for each. */
                borderInlineStart: `3px solid ${
                  read.highest === 'juu' ? JEWEL.maroonCrisis
                    : read.highest === 'wastani' ? JEWEL.goldHope
                      : JEWEL.tealMwenza}`,
                paddingInlineStart: 14,
                marginBottom: 18,
                background: hexToRgba(NEUTRAL.ink, 0.02),
                borderRadius: 8,
                paddingBlock: 12,
                paddingInlineEnd: 12,
              }}
            >
              <p style={{ margin: '0 0 6px', fontWeight: 700, color: NEUTRAL.ink }}>
                {sw ? ASSIST_ACTIONS[read.highest].title_sw : ASSIST_ACTIONS[read.highest].title_en}
              </p>
              <p style={{ margin: '0 0 10px', fontSize: 14, lineHeight: 1.55, color: NEUTRAL.ink }}>
                {sw ? ASSIST_ACTIONS[read.highest].body_sw : ASSIST_ACTIONS[read.highest].body_en}
              </p>

              {/* Each substance of concern by name. A band with no substance
                  beside it tells a counsellor nothing actionable. */}
              {read.concerns.length > 0 && (
                <ul style={{ margin: '0 0 10px', paddingInlineStart: 18, fontSize: 13.5, color: NEUTRAL.ink }}>
                  {read.concerns.map((c) => {
                    const s = ASSIST_SUBSTANCES.find((x) => x.id === c.id)
                    if (!s) return null
                    return (
                      <li key={c.id}>
                        {sw ? s.name_sw : s.name_en}
                        {' — '}
                        {sw ? ASSIST_ACTIONS[c.band].title_sw : ASSIST_ACTIONS[c.band].title_en}
                        {` (${c.score})`}
                      </li>
                    )
                  })}
                </ul>
              )}

              {read.injected && (
                <>
                  <p style={{ margin: '0 0 4px', fontWeight: 700, color: JEWEL.maroonCrisis }}>
                    {sw ? ASSIST_INJECTION_NOTE.title_sw : ASSIST_INJECTION_NOTE.title_en}
                  </p>
                  <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: NEUTRAL.ink }}>
                    {sw ? ASSIST_INJECTION_NOTE.body_sw : ASSIST_INJECTION_NOTE.body_en}
                  </p>
                </>
              )}
            </div>
          )}

          <p style={{ fontSize: 12, color: TEXT.muted, margin: '0 0 14px' }}>
            {ASSIST_META.source}
            {' · '}
            {sw
              ? 'Kiswahili ni tafsiri yetu ya uaminifu; hakuna uthibitisho wa Kiswahili uliochapishwa.'
              : 'The Kiswahili is a faithful rendering; no published Kiswahili validation exists.'}
          </p>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button type="button" style={primaryBtn()} onClick={finish} disabled={injected === null}>
              {sw ? 'Hifadhi na endelea' : 'Save and continue'}
            </button>
            <button type="button" style={ghostBtn()} onClick={() => setPhase('chagua')}>
              {sw ? 'Rudi kwenye orodha' : 'Back to the list'}
            </button>
          </div>
          {injected === null && (
            <p style={{ fontSize: 13, color: TEXT.muted, marginTop: 10 }}>
              {sw
                ? 'Jibu swali la sindano kwanza. Ni swali moja na linabadilisha ushauri.'
                : 'Answer the injecting question first. It is one question and it changes the advice.'}
            </p>
          )}
        </>
      )}
    </div>
  )
}
