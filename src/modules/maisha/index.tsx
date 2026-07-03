import type React from 'react'
import { useMemo, useState } from 'react'
import { Link, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { Card, ModuleShell, type SubNav } from '../_shared/Layout'
import { JEWEL, TEXT, BRAND, CREAM, RADII, TYPE, hexToRgba } from '../../lib/glass'
import { useLang } from '../../lib/i18n/Provider'
import {
  TRACKS, LEVEL_LABELS, PROGRAMS, KITS, BADGES,
  lessonById, programById, lessonsByTrack,
} from '../../lib/maisha/data'
import {
  getState, completeLesson, enroll, advanceMilestone, checkIn,
  stats, eligibility, earnedLevel,
} from '../../lib/maisha/store'

type Lg = 'sw' | 'en'

const chip = (bg: string, ink: string = TEXT.onJewel): React.CSSProperties => ({ fontSize: 10, padding: '3px 9px', borderRadius: RADII.chip, background: bg, color: ink, letterSpacing: 1, fontWeight: 700, textTransform: 'uppercase' })
const grid = (min = 260): React.CSSProperties => ({ display: 'grid', gap: 16, gridTemplateColumns: `repeat(auto-fit, minmax(${min}px, 1fr))` })

function Bar({ current, target }: { current: number; target: number }): React.JSX.Element {
  const pct = Math.min(100, Math.round((current / target) * 100))
  return (
    <div style={{ height: 8, borderRadius: 999, background: hexToRgba(BRAND.ink, 0.08), overflow: 'hidden' }}>
      <div style={{ width: `${pct}%`, height: '100%', background: pct >= 100 ? BRAND.green : JEWEL.goldHope, borderRadius: 999 }} />
    </div>
  )
}

// ── Overview + daily check-in ────────────────────────────────────────────────
function Overview(): React.JSX.Element {
  const { t, lang } = useLang()
  const L = (sw: string, en: string) => (lang as Lg) === 'en' ? en : sw
  const [, force] = useState(0)
  const st = stats()
  const level = earnedLevel()
  const badge = BADGES.find((b) => b.level === level)
  const [craving, setCraving] = useState(0)
  const [note, setNote] = useState('')
  const today = new Date().toISOString().slice(0, 10)
  const checkedToday = getState().checkins.some((c) => c.date === today)

  function doCheckIn(stable: boolean) {
    checkIn(stable, craving, note)
    setNote('')
    force((n) => n + 1)
  }

  return (
    <>
      <Card title={t('maisha.over.title', 'Safari yako ya kupona na kujitegemea')} accent={JEWEL.goldHope}>
        {t('maisha.over.body', 'Maisha huunganisha kupona (afya ya akili) na kujitegemea kiuchumi — programu za ushahidi, masomo ya ujuzi wa kilimo na biashara, na beji zinazokufungulia vitendeakazi vya kuanzia. Bure, kwa Kiswahili, bila mtandao.')}
      </Card>

      <div style={grid(200)}>
        <Card><Stat label={t('maisha.stat.badge', 'Beji yako')} value={badge ? `${badge.emoji} ${L(badge.title_sw, badge.title_en)}` : L('Bado hujaanza', 'Not started')} /></Card>
        <Card><Stat label={t('maisha.stat.lessons', 'Masomo yaliyokamilika')} value={`${st.lessonsCompleted}`} /></Card>
        <Card><Stat label={t('maisha.stat.streak', 'Mfululizo wa kujiandikisha')} value={`${st.checkinStreak} ${L('siku', 'days')}`} /></Card>
        <Card><Stat label={t('maisha.stat.stable', 'Siku za utulivu')} value={`${st.stableDays}`} /></Card>
      </div>

      <Card title={t('maisha.checkin.title', 'Utulivu wa leo')} accent={JEWEL.tealMwenza}>
        {checkedToday ? (
          <p style={{ color: TEXT.muted }}>{t('maisha.checkin.done', 'Umeshajiandikisha leo. Asante kwa kujitunza. Rudi kesho.')}</p>
        ) : (
          <>
            <p style={{ marginTop: 0 }}>{t('maisha.checkin.q', 'Tamaa yako ya leo iko kiasi gani? (0 = Hakuna · 10 = Kali sana)')}</p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
              {Array.from({ length: 11 }, (_, n) => {
                const on = craving === n
                const tone = n <= 3 ? BRAND.green : n <= 6 ? JEWEL.goldHope : JEWEL.maroonCrisis
                return (
                  <button key={n} onClick={() => setCraving(n)} style={{ width: 38, height: 38, borderRadius: 10, cursor: 'pointer', fontWeight: 700, fontFamily: 'inherit', border: `1px solid ${on ? tone : hexToRgba(BRAND.ink, 0.16)}`, background: on ? tone : CREAM.ivory, color: on ? '#fff' : TEXT.body }}>{n}</button>
                )
              })}
            </div>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder={t('maisha.checkin.note', 'Tafakari moja ya leo (hiari)…')} rows={2}
              style={{ width: '100%', padding: '10px 12px', borderRadius: RADII.chip, background: CREAM.milk, border: `1px solid ${hexToRgba(BRAND.ink, 0.2)}`, color: TEXT.body, fontFamily: 'inherit', fontSize: 14, marginBottom: 12, boxSizing: 'border-box' }} />
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button onClick={() => doCheckIn(true)} style={btn(BRAND.green)}>{t('maisha.checkin.stable', 'Nimetulia leo')}</button>
              <button onClick={() => doCheckIn(false)} style={btn(JEWEL.maroonCrisis)}>{t('maisha.checkin.hard', 'Leo ilikuwa ngumu')}</button>
            </div>
          </>
        )}
      </Card>
    </>
  )
}

function Stat({ label, value }: { label: string; value: string }): React.JSX.Element {
  return <><div className="serif" style={{ fontSize: 22, color: TEXT.heading, lineHeight: 1.15 }}>{value}</div><div style={{ fontSize: 12, color: TEXT.muted, marginTop: 4 }}>{label}</div></>
}
function btn(bg: string): React.CSSProperties {
  return { padding: '11px 18px', borderRadius: RADII.chip, background: bg, color: TEXT.onJewel, border: 'none', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }
}

// ── Recovery programmes ──────────────────────────────────────────────────────
function Programs(): React.JSX.Element {
  const { t, lang } = useLang()
  const L = (sw: string, en: string) => (lang as Lg) === 'en' ? en : sw
  const enrolled = getState().enrollments
  return (
    <>
      <Card title={t('maisha.prog.title', 'Programu za kupona')} accent={JEWEL.indigoWisdom}>
        {t('maisha.prog.body', 'Programu za ushahidi wa kisayansi kwa uraibu, huzuni, wasiwasi na utulivu wa akili. Chagua moja, jiandikishe, na fuata hatua wiki kwa wiki.')}
      </Card>
      <div style={grid()}>
        {PROGRAMS.map((p) => (
          <Link key={p.id} to={`./${p.id}`} style={{ background: CREAM.ivory, border: `1px solid ${hexToRgba(BRAND.ink, 0.1)}`, borderTop: `3px solid ${JEWEL.indigoWisdom}`, borderRadius: RADII.sheet, padding: 18, textDecoration: 'none', color: TEXT.body }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6, flexWrap: 'wrap' }}>
              <span className="serif" style={{ fontSize: 19, color: TEXT.heading }}>{L(p.name_sw, p.name_en)}</span>
              {enrolled[p.id] && <span style={chip(BRAND.green)}>{t('maisha.prog.enrolled', 'Umejiandikisha')}</span>}
            </div>
            <div style={{ fontSize: 12, color: TEXT.muted, marginBottom: 8 }}>{p.duration_weeks} {t('maisha.prog.weeks', 'wiki')} · {p.daily_minutes} {t('maisha.prog.min', 'dakika/siku')}</div>
            <p style={{ margin: 0, fontSize: 13.5, lineHeight: TYPE.bodyLeading }}>{L(p.short_desc_sw, p.short_desc_en)}</p>
          </Link>
        ))}
      </div>
    </>
  )
}

function ProgramDetail(): React.JSX.Element {
  const { t, lang } = useLang()
  const L = (sw: string, en: string) => (lang as Lg) === 'en' ? en : sw
  const { id } = useParams<{ id: string }>()
  const p = id ? programById(id) : undefined
  const [, force] = useState(0)
  if (!p) return <Card title={t('maisha.prog.notfound', 'Programu haipatikani')}><Link to=".." style={{ color: TEXT.link }}>{t('maisha.back', '← Rudi')}</Link></Card>
  const e = getState().enrollments[p.id]
  const done = e ? e.current_milestone_index : 0

  return (
    <>
      <Link to=".." style={{ color: TEXT.link, fontSize: 13 }}>{t('maisha.prog.backlist', '← Rudi kwenye programu')}</Link>
      <div style={{ height: 14 }} />
      <Card title={L(p.name_sw, p.name_en)} accent={JEWEL.indigoWisdom}>
        <p style={{ marginTop: 0 }}>{L(p.short_desc_sw, p.short_desc_en)}</p>
        <p style={{ fontSize: 13, color: TEXT.muted }}>{t('maisha.prog.origin', 'Asili')}: {p.origin} · {p.duration_weeks} {t('maisha.prog.weeks', 'wiki')} · {t('maisha.prog.free', 'BURE (TZS 0)')}</p>
        <p style={{ fontSize: 13.5 }}><strong>{t('maisha.prog.bestfor', 'Inafaa kwa')}:</strong> {L(p.best_for_sw, p.best_for_en)}</p>
        {!e ? (
          <button onClick={() => { enroll(p.id); force((n) => n + 1) }} style={btn(BRAND.green)}>{t('maisha.prog.enroll', 'Jiandikishe kwenye programu hii')}</button>
        ) : (
          <div style={{ fontSize: 13, color: TEXT.body }}>{t('maisha.prog.progress', 'Maendeleo')}: {done}/{p.milestones.length} {e.status === 'completed' ? `· ${t('maisha.prog.completed', 'Imekamilika 🎉')}` : ''}</div>
        )}
      </Card>

      <Card title={t('maisha.prog.milestones', 'Hatua za wiki')}>
        <ol style={{ margin: 0, padding: 0, listStyle: 'none' }}>
          {p.milestones.map((m, i) => {
            const complete = i < done
            const current = e && i === done && e.status !== 'completed'
            return (
              <li key={i} style={{ borderTop: `1px solid ${hexToRgba(BRAND.ink, 0.1)}`, padding: '14px 0', display: 'flex', gap: 12 }}>
                <span className="serif" style={{ fontSize: 15, minWidth: 60, color: complete ? BRAND.green : TEXT.muted }}>{m.unit === 'week' ? t('maisha.prog.wk', 'Wk') : t('maisha.prog.d', 'Siku')} {m.day_or_week}</span>
                <div style={{ flex: 1 }}>
                  <div className="serif" style={{ fontSize: 16, color: TEXT.heading }}>{complete ? '✓ ' : ''}{L(m.title_sw, m.title_en)}</div>
                  <p style={{ margin: '4px 0 0', fontSize: 13.5, color: TEXT.body }}>{m.description_sw}</p>
                  {current && <button onClick={() => { advanceMilestone(p.id, p.milestones.length); force((n) => n + 1) }} style={{ ...btn(JEWEL.goldHope), marginTop: 8, padding: '8px 14px', fontSize: 13 }}>{t('maisha.prog.markdone', 'Nimekamilisha hatua hii')}</button>}
                </div>
              </li>
            )
          })}
        </ol>
      </Card>

      <Card title={t('maisha.prog.evidence', 'Ushahidi + Marejeo')}>
        {p.citations.map((c, i) => (
          <p key={i} style={{ margin: '0 0 10px', fontSize: 13, color: TEXT.body }}>
            <strong>{c.authors} ({c.year}).</strong> {c.title}. {c.source ? <em>{c.source}. </em> : ''}{c.note ? <span style={{ color: TEXT.muted }}>{c.note}</span> : ''}
          </p>
        ))}
      </Card>
    </>
  )
}

// ── Learning tracks + lesson + quiz ──────────────────────────────────────────
function Learn(): React.JSX.Element {
  const { t, lang } = useLang()
  const L = (sw: string, en: string) => (lang as Lg) === 'en' ? en : sw
  const prog = getState().lessons
  return (
    <>
      <Card title={t('maisha.learn.title', 'Kujifunza ujuzi wa maisha')} accent={JEWEL.tealMwenza}>
        {t('maisha.learn.body', 'Njia ya kutoka kupona hadi kujitegemea: kilimo, ufugaji, biashara, maji, hali ya hewa na lishe. Kila somo lina jaribio dogo — 70% hukupitisha.')}
      </Card>
      <div style={grid(220)}>
        {TRACKS.map((tr) => {
          const ls = lessonsByTrack(tr.key)
          const done = ls.filter((l) => prog[l.id]?.completed).length
          return (
            <Link key={tr.key} to={`./${tr.key}`} style={{ background: CREAM.ivory, border: `1px solid ${hexToRgba(BRAND.ink, 0.1)}`, borderTop: `3px solid ${BRAND.green}`, borderRadius: RADII.sheet, padding: 18, textDecoration: 'none', color: TEXT.body }}>
              <div style={{ fontSize: 30 }}>{tr.emoji}</div>
              <div className="serif" style={{ fontSize: 18, color: TEXT.heading, marginTop: 6 }}>{L(tr.sw, tr.en)}</div>
              <div style={{ fontSize: 12, color: TEXT.muted, marginTop: 4 }}>{done}/{ls.length} {t('maisha.learn.done', 'yamekamilika')}</div>
            </Link>
          )
        })}
      </div>
    </>
  )
}

function TrackLessons(): React.JSX.Element {
  const { t, lang } = useLang()
  const L = (sw: string, en: string) => (lang as Lg) === 'en' ? en : sw
  const { track } = useParams<{ track: string }>()
  const tr = TRACKS.find((x) => x.key === track)
  const ls = track ? lessonsByTrack(track) : []
  const prog = getState().lessons
  return (
    <>
      <Link to=".." style={{ color: TEXT.link, fontSize: 13 }}>{t('maisha.learn.backtracks', '← Rudi kwenye mada')}</Link>
      <div style={{ height: 14 }} />
      <Card title={tr ? `${tr.emoji} ${L(tr.sw, tr.en)}` : ''} accent={BRAND.green}>
        <ol style={{ margin: 0, padding: 0, listStyle: 'none' }}>
          {ls.map((l) => {
            const p = prog[l.id]
            return (
              <li key={l.id} style={{ borderTop: `1px solid ${hexToRgba(BRAND.ink, 0.1)}`, padding: '12px 0' }}>
                <Link to={`/maisha/somo/${l.id}`} style={{ textDecoration: 'none', color: TEXT.body, display: 'flex', gap: 12, alignItems: 'center' }}>
                  <span style={chip(hexToRgba(JEWEL.goldHope, 0.2), TEXT.heading)}>{L(LEVEL_LABELS[l.level].sw, LEVEL_LABELS[l.level].en)}</span>
                  <div style={{ flex: 1 }}>
                    <div className="serif" style={{ fontSize: 16, color: TEXT.heading }}>{p?.completed ? '✓ ' : ''}{L(l.title_sw, l.title_en)}</div>
                    <div style={{ fontSize: 12, color: TEXT.muted }}>{l.duration_min} {t('maisha.learn.min', 'dakika')}{p?.completed ? ` · ${t('maisha.learn.score', 'alama')} ${p.score}%` : ''}</div>
                  </div>
                  <span style={{ color: TEXT.muted }}>→</span>
                </Link>
              </li>
            )
          })}
        </ol>
      </Card>
    </>
  )
}

function LessonView(): React.JSX.Element {
  const { t, lang } = useLang()
  const L = (sw: string, en: string) => (lang as Lg) === 'en' ? en : sw
  const { id } = useParams<{ id: string }>()
  const nav = useNavigate()
  const l = id ? lessonById(id) : undefined
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [awarded, setAwarded] = useState<number[]>([])
  if (!l) return <Card title={t('maisha.learn.nolesson', 'Somo halipatikani')}><Link to="/maisha/jifunze" style={{ color: TEXT.link }}>{t('maisha.back', '← Rudi')}</Link></Card>

  const total = l.quiz.length
  const correct = l.quiz.filter((q, i) => answers[i] === q.correct).length
  const score = total > 0 ? Math.round((correct / total) * 100) : 100
  const passed = score >= 70

  function submit() {
    setSubmitted(true)
    const newly = completeLesson(l!.id, score)
    setAwarded(newly)
  }

  return (
    <>
      <Link to={`/maisha/jifunze/${l.track}`} style={{ color: TEXT.link, fontSize: 13 }}>{t('maisha.learn.backlessons', '← Rudi kwenye masomo')}</Link>
      <div style={{ height: 14 }} />
      <Card title={L(l.title_sw, l.title_en)} accent={BRAND.green}>
        <p style={{ marginTop: 0 }}>{L(l.summary_sw, l.summary_en)}</p>
        <h3 className="serif" style={{ fontSize: 16, color: TEXT.heading, margin: '10px 0 6px' }}>{t('maisha.learn.takeaways', 'Mambo muhimu')}</h3>
        <ul style={{ margin: 0, paddingLeft: 18 }}>{l.key_takeaways.map((k) => <li key={k} style={{ marginBottom: 6, fontSize: 14 }}>{k}</li>)}</ul>
      </Card>

      <Card title={t('maisha.quiz.title', 'Jaribio dogo')} accent={JEWEL.goldHope}>
        {l.quiz.map((q, qi) => (
          <div key={qi} style={{ marginBottom: 18 }}>
            <p style={{ fontWeight: 700, margin: '0 0 8px' }}>{qi + 1}. {L(q.q_sw, q.q_en)}</p>
            <div style={{ display: 'grid', gap: 8 }}>
              {q.options.map((o, oi) => {
                const chosen = answers[qi] === oi
                const showRight = submitted && oi === q.correct
                const showWrong = submitted && chosen && oi !== q.correct
                const bg = showRight ? hexToRgba(BRAND.green, 0.16) : showWrong ? hexToRgba(JEWEL.maroonCrisis, 0.16) : chosen ? hexToRgba(JEWEL.indigoWisdom, 0.12) : CREAM.milk
                const bd = showRight ? BRAND.green : showWrong ? JEWEL.maroonCrisis : chosen ? JEWEL.indigoWisdom : hexToRgba(BRAND.ink, 0.14)
                return (
                  <button key={oi} disabled={submitted} onClick={() => setAnswers((a) => ({ ...a, [qi]: oi }))}
                    style={{ textAlign: 'left', padding: '11px 14px', borderRadius: RADII.chip, border: `1px solid ${bd}`, background: bg, color: TEXT.body, cursor: submitted ? 'default' : 'pointer', fontFamily: 'inherit', fontSize: 14 }}>
                    {L(o.sw, o.en)}{showRight ? '  ✓' : ''}
                  </button>
                )
              })}
            </div>
            {submitted && <p style={{ fontSize: 13, color: TEXT.muted, marginTop: 8 }}>{q.explanation_sw}</p>}
          </div>
        ))}
        {!submitted ? (
          <button onClick={submit} disabled={Object.keys(answers).length < total} style={{ ...btn(BRAND.green), opacity: Object.keys(answers).length < total ? 0.5 : 1 }}>{t('maisha.quiz.submit', 'Wasilisha majibu')}</button>
        ) : (
          <div>
            <p style={{ fontSize: 18, fontWeight: 800, color: passed ? BRAND.green : JEWEL.maroonCrisis }}>{t('maisha.quiz.score', 'Alama')}: {score}% — {passed ? t('maisha.quiz.pass', 'UMEMALIZA 🎉') : t('maisha.quiz.retry', 'JARIBU TENA')}</p>
            {awarded.length > 0 && <p style={{ color: BRAND.green, fontWeight: 700 }}>{t('maisha.quiz.badge', 'Umepata beji mpya! Angalia ukurasa wa Beji.')}</p>}
            {passed
              ? <button onClick={() => nav(`/maisha/jifunze/${l.track}`)} style={btn(BRAND.green)}>{t('maisha.quiz.next', 'Endelea')}</button>
              : <button onClick={() => { setSubmitted(false); setAnswers({}) }} style={btn(JEWEL.goldHope)}>{t('maisha.quiz.again', 'Jaribu tena')}</button>}
          </div>
        )}
      </Card>
    </>
  )
}

// ── Livelihood kits (gated by badge level) ───────────────────────────────────
function Kits(): React.JSX.Element {
  const { t, lang } = useLang()
  const L = (sw: string, en: string) => (lang as Lg) === 'en' ? en : sw
  const level = earnedLevel()
  return (
    <>
      <Card title={t('maisha.kits.title', 'Vitendeakazi vya kuanzia')} accent={JEWEL.goldHope}>
        {t('maisha.kits.body', 'Ukishafikia beji fulani, unafungua vitendeakazi vya kuanza mradi wako mwenyewe. Hii ndiyo hatua ya mwisho: kutoka kupona hadi kipato.')}
        <div style={{ marginTop: 8, fontSize: 13, color: TEXT.muted }}>{t('maisha.kits.your', 'Beji yako ya sasa')}: {level > 0 ? `Level ${level}` : t('maisha.kits.none', 'bado')}.</div>
      </Card>
      <div style={grid()}>
        {KITS.map((k) => {
          const unlocked = level >= k.requires_level
          return (
            <Card key={k.id} accent={unlocked ? BRAND.green : hexToRgba(BRAND.ink, 0.25)}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontSize: 28, opacity: unlocked ? 1 : 0.4 }}>{k.emoji}</span>
                <span className="serif" style={{ fontSize: 18, color: TEXT.heading }}>{L(k.title_sw, k.title_en)}</span>
              </div>
              <p style={{ fontSize: 13.5, margin: '0 0 8px' }}>{L(k.description_sw, k.description_en)}</p>
              <div style={{ fontSize: 13, color: TEXT.body }}>{t('maisha.kits.cost', 'Makadirio ya gharama')}: <strong>TSh {k.cost_estimate_tsh.toLocaleString()}</strong></div>
              <div style={{ marginTop: 8 }}>
                {unlocked
                  ? <span style={chip(BRAND.green)}>{t('maisha.kits.unlocked', 'Imefunguliwa')}</span>
                  : <span style={chip(hexToRgba(BRAND.ink, 0.5))}>🔒 {t('maisha.kits.needs', 'Inahitaji')} Level {k.requires_level} + {L(k.extra_sw, k.extra_en)}</span>}
              </div>
            </Card>
          )
        })}
      </div>
    </>
  )
}

// ── Badge ladder ─────────────────────────────────────────────────────────────
function Badges(): React.JSX.Element {
  const { t, lang } = useLang()
  const L = (sw: string, en: string) => (lang as Lg) === 'en' ? en : sw
  const st = stats()
  const earned = new Set(getState().badges)
  const reqLabel: Record<string, string> = {
    lessons: t('maisha.badge.lessons', 'Masomo'),
    checkin: t('maisha.badge.checkin', 'Mfululizo wa kujiandikisha'),
    reflections: t('maisha.badge.reflections', 'Tafakari'),
    stable: t('maisha.badge.stable', 'Siku za utulivu'),
  }
  return (
    <>
      <Card title={t('maisha.badge.title', 'Ngazi za beji')} accent={JEWEL.goldHope}>
        {t('maisha.badge.body', 'Beji zinafunguka zenyewe unapoendelea: kukamilisha masomo, kujiandikisha kila siku, kuandika tafakari, na kudumisha utulivu. Kila ngazi hufungua vitendeakazi vipya.')}
      </Card>
      <div style={{ display: 'grid', gap: 16 }}>
        {BADGES.map((b) => {
          const have = earned.has(b.level)
          const { missing } = eligibility(b, st)
          return (
            <Card key={b.level} accent={have ? BRAND.green : JEWEL.goldHope}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 34, opacity: have ? 1 : 0.5 }}>{b.emoji}</span>
                <div>
                  <div className="serif" style={{ fontSize: 19, color: TEXT.heading }}>{L(b.title_sw, b.title_en)} {have && <span style={chip(BRAND.green)}>{t('maisha.badge.earned', 'Umepata')}</span>}</div>
                  <div style={{ fontSize: 13, color: TEXT.muted }}>{L(b.description_sw, b.description_en)}</div>
                </div>
              </div>
              {!have && (
                <div style={{ display: 'grid', gap: 10, marginTop: 8 }}>
                  {([['lessons', st.lessonsCompleted, b.lessons_required], ['checkin', st.checkinStreak, b.checkin_streak_days], ['reflections', st.reflections, b.reflections], ['stable', st.stableDays, b.stable_days]] as [string, number, number][]).map(([k, cur, tgt]) => (
                    <div key={k}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: TEXT.muted, marginBottom: 4 }}><span>{reqLabel[k]}</span><span>{Math.min(cur, tgt)}/{tgt}</span></div>
                      <Bar current={cur} target={tgt} />
                    </div>
                  ))}
                  {missing.length === 0 && <p style={{ color: BRAND.green, fontWeight: 700, margin: 0 }}>{t('maisha.badge.ready', 'Tayari! Itafunguka wakati ujao utakapojiandikisha au kumaliza somo.')}</p>}
                </div>
              )}
            </Card>
          )
        })}
      </div>
    </>
  )
}

// ── Module shell ─────────────────────────────────────────────────────────────
export default function Maisha(): React.JSX.Element {
  const { t } = useLang()
  const subs: SubNav[] = useMemo(() => [
    { to: '.', label: t('maisha.nav.over', 'Mwanzo') },
    { to: 'programu', label: t('maisha.nav.prog', 'Programu') },
    { to: 'jifunze', label: t('maisha.nav.learn', 'Kujifunza') },
    { to: 'kazi', label: t('maisha.nav.kits', 'Vitendeakazi') },
    { to: 'beji', label: t('maisha.nav.badge', 'Beji') },
  ], [t])
  return (
    <ModuleShell slug="maisha" subs={subs}>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="programu" element={<Programs />} />
        <Route path="programu/:id" element={<ProgramDetail />} />
        <Route path="jifunze" element={<Learn />} />
        <Route path="jifunze/:track" element={<TrackLessons />} />
        <Route path="somo/:id" element={<LessonView />} />
        <Route path="kazi" element={<Kits />} />
        <Route path="beji" element={<Badges />} />
      </Routes>
    </ModuleShell>
  )
}
