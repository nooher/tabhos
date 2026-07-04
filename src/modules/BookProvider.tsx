import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BRAND, CREAM, NEUTRAL, RADII, TEXT, TYPE, hexToRgba } from '../lib/glass'
import { findProvider, type Service } from '../lib/providers'

/**
 * Book a provider — a confidential, screening-gated, crisis-aware intake and
 * booking flow. Pick a service & time → tell your story → a brief validated
 * check-in (PHQ-9) → review → request. If the check-in flags risk, the flow
 * surfaces immediate support before anything else. Client-facing, English-
 * primary, executive; chromeless.
 */

const GREEN = BRAND.green
const ORANGE = BRAND.creamOrange
const INK = NEUTRAL.ink
const tzs = (n: number) => 'TZS ' + n.toLocaleString('en-US')
const firstName = (full: string) => { const skip = /^(dr|mr|mrs|ms|prof|dkt|bibi|mama)\.?$/i; const parts = full.split(' ').filter(Boolean); return parts.find((w) => !skip.test(w)) ?? parts[0] }

const PHQ9 = [
  'Little interest or pleasure in doing things',
  'Feeling down, depressed, or hopeless',
  'Trouble falling or staying asleep, or sleeping too much',
  'Feeling tired or having little energy',
  'Poor appetite or overeating',
  'Feeling bad about yourself — or that you are a failure',
  'Trouble concentrating on things',
  'Moving/speaking slowly, or being restless & fidgety',
  'Thoughts that you would be better off dead, or of hurting yourself',
]
const OPTS = ['Not at all', 'Several days', 'More than half the days', 'Nearly every day']

function severity(score: number): { band: string; color: string } {
  if (score >= 20) return { band: 'severe', color: '#9E455A' }
  if (score >= 15) return { band: 'moderately severe', color: '#B4603A' }
  if (score >= 10) return { band: 'moderate', color: ORANGE }
  if (score >= 5) return { band: 'mild', color: GREEN }
  return { band: 'minimal', color: GREEN }
}

type Step = 'service' | 'about' | 'screen' | 'crisis' | 'review' | 'done'

export default function BookProvider() {
  const { slug } = useParams<{ slug: string }>()
  const nav = useNavigate()
  const p = findProvider(slug)

  const [step, setStep] = useState<Step>('service')
  const [svc, setSvc] = useState<Service | null>(null)
  const [mode, setMode] = useState('')
  const [slot, setSlot] = useState('')
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [reason, setReason] = useState('')
  const [consent, setConsent] = useState(false)
  const [phq, setPhq] = useState<number[]>(Array(9).fill(-1))

  const score = useMemo(() => phq.reduce((a, b) => a + Math.max(0, b), 0), [phq])
  const riskFlag = phq[8] > 0
  const sev = severity(score)
  const phqDone = phq.every((v) => v >= 0)

  const card: React.CSSProperties = { background: CREAM.milk, border: `1px solid ${hexToRgba(INK, 0.09)}`, borderRadius: RADII.card, padding: '22px 22px' }
  const btn = (bg: string, color: string, disabled = false): React.CSSProperties => ({
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px 20px', borderRadius: 999,
    background: disabled ? hexToRgba(INK, 0.12) : bg, color: disabled ? hexToRgba(INK, 0.4) : color,
    border: bg === 'transparent' && !disabled ? `1px solid ${hexToRgba(INK, 0.2)}` : 'none',
    fontSize: 14, fontWeight: 700, cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: TYPE.sans,
  })
  const input: React.CSSProperties = { width: '100%', padding: '11px 13px', borderRadius: 12, border: `1px solid ${hexToRgba(INK, 0.15)}`, background: CREAM.ivory, color: INK, fontSize: 14, fontFamily: TYPE.sans, outline: 'none', boxSizing: 'border-box' }

  const steps: { key: Step; label: string }[] = [
    { key: 'service', label: 'Service' }, { key: 'about', label: 'About you' }, { key: 'screen', label: 'Check-in' }, { key: 'review', label: 'Confirm' },
  ]
  const stepIdx = Math.min(steps.findIndex((s) => s.key === step), 3)

  function proceedFromScreen() { setStep(riskFlag ? 'crisis' : 'review') }

  return (
    <main style={{ minHeight: '100vh', background: CREAM.paper ?? '#FAF5E5', color: TEXT.body, fontFamily: TYPE.sans, paddingBottom: 60 }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(120deg, ${GREEN} 0%, ${hexToRgba(GREEN, 0.82)} 100%)`, color: CREAM.cream, padding: '20px 20px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => nav(`/p/${p.slug}`)} aria-label="Back to profile" style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: CREAM.cream, borderRadius: 999, width: 34, height: 34, cursor: 'pointer', fontSize: 16 }}>←</button>
          <div>
            <div style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.85, fontWeight: 700 }}>Book · {p.name}</div>
            <div style={{ fontFamily: TYPE.serif, fontSize: 18, fontWeight: 800 }}>{p.credential}</div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 20px' }}>
        {/* Progress */}
        {step !== 'done' && step !== 'crisis' && (
          <div style={{ display: 'flex', gap: 6, margin: '18px 0 20px' }}>
            {steps.map((s, i) => (
              <div key={s.key} style={{ flex: 1 }}>
                <div style={{ height: 4, borderRadius: 999, background: i <= stepIdx ? GREEN : hexToRgba(INK, 0.12) }} />
                <div style={{ fontSize: 10.5, color: i <= stepIdx ? INK : TEXT.muted, marginTop: 5, fontWeight: i === stepIdx ? 700 : 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* STEP: service + time */}
        {step === 'service' && (
          <div style={{ ...card }}>
            <h1 style={{ margin: '0 0 4px', fontFamily: TYPE.serif, fontSize: 22, fontWeight: 800, color: INK }}>Choose a session</h1>
            <p style={{ margin: '0 0 16px', fontSize: 13.5, color: TEXT.muted }}>Confidential. You can pay by cash, M-Pesa, or your insurance at the visit.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {p.services.map((s) => {
                const on = svc?.name === s.name
                return (
                  <button key={s.name} onClick={() => { setSvc(s); setMode(s.modes[0]) }} style={{ textAlign: 'left', cursor: 'pointer', background: on ? hexToRgba(GREEN, 0.08) : CREAM.ivory, border: `1.5px solid ${on ? GREEN : hexToRgba(INK, 0.1)}`, borderRadius: 14, padding: '13px 15px', display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                    <span><span style={{ fontWeight: 700, color: INK }}>{s.name}</span> <span style={{ color: TEXT.muted }}>· {s.mins} min</span><br /><span style={{ fontSize: 12, color: TEXT.muted }}>{s.modes.join(' · ')}</span></span>
                    <span style={{ fontFamily: TYPE.serif, fontWeight: 800, color: INK }}>{tzs(s.price)}</span>
                  </button>
                )
              })}
            </div>
            {svc && (
              <>
                <div style={{ marginTop: 18, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: TEXT.muted, marginBottom: 8 }}>How</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{svc.modes.map((m) => <button key={m} onClick={() => setMode(m)} style={pill(mode === m)}>{m}</button>)}</div>
                <div style={{ marginTop: 18, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: TEXT.muted, marginBottom: 8 }}>When</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{p.nextSlots.map((s) => <button key={s} onClick={() => setSlot(s)} style={pill(slot === s)}>{s}</button>)}</div>
              </>
            )}
            <div style={{ marginTop: 22, textAlign: 'right' }}>
              <button style={btn(GREEN, CREAM.cream, !(svc && mode && slot))} disabled={!(svc && mode && slot)} onClick={() => setStep('about')}>Continue →</button>
            </div>
          </div>
        )}

        {/* STEP: about you */}
        {step === 'about' && (
          <div style={{ ...card }}>
            <h1 style={{ margin: '0 0 4px', fontFamily: TYPE.serif, fontSize: 22, fontWeight: 800, color: INK }}>Tell {firstName(p.name)} a little about you</h1>
            <p style={{ margin: '0 0 16px', fontSize: 13.5, color: TEXT.muted }}>Only your provider sees this. Share as much or as little as you like.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12 }}>
              <label style={lbl}>Your name<input style={input} value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" /></label>
              <label style={lbl}>Age<input style={input} value={age} onChange={(e) => setAge(e.target.value.replace(/\D/g, ''))} placeholder="e.g. 29" inputMode="numeric" /></label>
            </div>
            <label style={{ ...lbl, marginTop: 12 }}>What brings you in? <span style={{ color: TEXT.muted, fontWeight: 400 }}>(symptoms, what you'd like help with)</span>
              <textarea style={{ ...input, minHeight: 96, resize: 'vertical' }} value={reason} onChange={(e) => setReason(e.target.value)} placeholder="You can also share prior history, medication, or send a voice note / photo in chat after booking." />
            </label>
            <label style={{ display: 'flex', gap: 10, marginTop: 14, fontSize: 12.5, color: TEXT.body, alignItems: 'flex-start' }}>
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} style={{ marginTop: 2 }} />
              <span>I consent to share this information with my provider for the purpose of care. My data is confidential and never sold.</span>
            </label>
            <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between' }}>
              <button style={btn('transparent', INK)} onClick={() => setStep('service')}>← Back</button>
              <button style={btn(GREEN, CREAM.cream, !(name && reason && consent))} disabled={!(name && reason && consent)} onClick={() => setStep('screen')}>Continue →</button>
            </div>
          </div>
        )}

        {/* STEP: screening (PHQ-9) */}
        {step === 'screen' && (
          <div style={{ ...card }}>
            <h1 style={{ margin: '0 0 4px', fontFamily: TYPE.serif, fontSize: 22, fontWeight: 800, color: INK }}>A quick, confidential check-in</h1>
            <p style={{ margin: '0 0 16px', fontSize: 13.5, color: TEXT.muted }}>Over the last 2 weeks, how often have you been bothered by the following? This is the PHQ-9 — it helps your provider start informed. ~2 minutes.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {PHQ9.map((q, qi) => (
                <div key={qi} style={{ borderTop: qi ? `1px solid ${hexToRgba(INK, 0.07)}` : 'none', paddingTop: qi ? 12 : 0 }}>
                  <div style={{ fontSize: 13.5, color: INK, fontWeight: 600, marginBottom: 8 }}>{qi + 1}. {q}</div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {OPTS.map((o, oi) => (
                      <button key={oi} onClick={() => setPhq((prev) => prev.map((v, i) => (i === qi ? oi : v)))}
                        style={{ ...pill(phq[qi] === oi), fontSize: 11.5, padding: '6px 10px' }}>{o}</button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
              <button style={btn('transparent', INK)} onClick={() => setStep('about')}>← Back</button>
              <button style={btn(GREEN, CREAM.cream, !phqDone)} disabled={!phqDone} onClick={proceedFromScreen}>Continue →</button>
            </div>
          </div>
        )}

        {/* Crisis interstitial */}
        {step === 'crisis' && (
          <div style={{ ...card, borderTop: `3px solid #9E455A` }}>
            <h1 style={{ margin: '0 0 8px', fontFamily: TYPE.serif, fontSize: 22, fontWeight: 800, color: INK }}>You&rsquo;re not alone.</h1>
            <p style={{ margin: '0 0 14px', fontSize: 14, color: TEXT.body, lineHeight: 1.6 }}>
              Your answers suggest you may be going through something very hard right now. Your safety comes first. If you are in immediate danger or thinking about acting on thoughts of harming yourself:
            </p>
            <div style={{ background: hexToRgba('#9E455A', 0.08), border: `1px solid ${hexToRgba('#9E455A', 0.25)}`, borderRadius: 14, padding: '14px 16px', fontSize: 14, color: INK, lineHeight: 1.7 }}>
              <div>• Call <strong>112</strong> (emergency) now, or go to the nearest emergency department.</div>
              <div>• Reach out to someone you trust and ask them to stay with you.</div>
              <div>• You can also ask <strong>{firstName(p.name)}</strong> for an urgent slot — we&rsquo;ll flag your request as priority.</div>
            </div>
            <p style={{ margin: '16px 0 0', fontSize: 13, color: TEXT.muted }}>You can still book below. This page is not a substitute for emergency care.</p>
            <div style={{ marginTop: 18, display: 'flex', justifyContent: 'space-between' }}>
              <button style={btn('transparent', INK)} onClick={() => setStep('screen')}>← Back</button>
              <button style={btn(GREEN, CREAM.cream)} onClick={() => setStep('review')}>Continue to booking →</button>
            </div>
          </div>
        )}

        {/* STEP: review */}
        {step === 'review' && svc && (
          <div style={{ ...card }}>
            <h1 style={{ margin: '0 0 12px', fontFamily: TYPE.serif, fontSize: 22, fontWeight: 800, color: INK }}>Review &amp; request</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
              {[['Provider', p.name], ['Service', `${svc.name} · ${svc.mins} min`], ['How', mode], ['When', slot], ['Fee', `${tzs(svc.price)} · cash, M-Pesa or insurance`], ['For', name]].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, borderBottom: `1px solid ${hexToRgba(INK, 0.06)}`, paddingBottom: 8 }}>
                  <span style={{ color: TEXT.muted }}>{k}</span><span style={{ color: INK, fontWeight: 600, textAlign: 'right' }}>{v}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                <span style={{ color: TEXT.muted }}>Check-in (PHQ-9)</span>
                <span style={{ fontWeight: 700, color: sev.color }}>{score} / 27 · {sev.band}{riskFlag ? ' · flagged priority' : ''}</span>
              </div>
            </div>
            <p style={{ fontSize: 12, color: TEXT.muted, marginTop: 14 }}>Your provider receives your intake and PHQ-9 so your first session starts informed. You&rsquo;ll get a confirmation and can message, reschedule or cancel anytime.</p>
            <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between' }}>
              <button style={btn('transparent', INK)} onClick={() => setStep('screen')}>← Back</button>
              <button style={btn(GREEN, CREAM.cream)} onClick={() => setStep('done')}>Request appointment</button>
            </div>
          </div>
        )}

        {/* STEP: done */}
        {step === 'done' && svc && (
          <div style={{ ...card, textAlign: 'center', marginTop: 24 }}>
            <div style={{ width: 60, height: 60, borderRadius: 999, background: hexToRgba(GREEN, 0.12), display: 'grid', placeItems: 'center', margin: '0 auto 14px', color: GREEN, fontSize: 30 }}>✓</div>
            <h1 style={{ margin: '0 0 8px', fontFamily: TYPE.serif, fontSize: 24, fontWeight: 800, color: INK }}>Request sent</h1>
            <p style={{ margin: '0 auto 18px', fontSize: 14.5, color: TEXT.body, lineHeight: 1.6, maxWidth: 420 }}>
              <strong>{p.name}</strong> will confirm your <strong>{svc.name}</strong> ({mode}) for <strong>{slot}</strong>. You&rsquo;ll be notified here and can message {firstName(p.name)} anytime.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button style={btn(GREEN, CREAM.cream)} onClick={() => nav('/mimi')}>Go to my space</button>
              <button style={btn('transparent', INK)} onClick={() => nav(`/p/${p.slug}`)}>Back to profile</button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

const lbl: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12.5, fontWeight: 700, color: NEUTRAL.ink }
function pill(active: boolean): React.CSSProperties {
  return { fontSize: 13, fontWeight: 700, padding: '8px 13px', borderRadius: 999, cursor: 'pointer', background: active ? BRAND.green : CREAM.ivory, color: active ? CREAM.cream : NEUTRAL.ink, border: `1px solid ${active ? BRAND.green : hexToRgba(NEUTRAL.ink, 0.12)}`, fontFamily: TYPE.sans }
}
