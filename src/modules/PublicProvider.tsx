import { useParams } from 'react-router-dom'
import { BRAND, CREAM, NEUTRAL, RADII, TEXT, TYPE, hexToRgba } from '../lib/glass'

/**
 * Public provider page — the shareable link a practitioner posts to Instagram,
 * WhatsApp or their website. Clients land here, read the practice, and act:
 * book, message, follow, or save to their home screen.
 *
 * Client-facing, English-primary, executive. No app chrome (rendered on a
 * chromeless route). Data is illustrative for now; the real page reads the
 * provider's own profile from the practice console (wataalam).
 */

const GREEN = BRAND.green
const ORANGE = BRAND.creamOrange
const INK = NEUTRAL.ink

interface Service { name: string; mins: number; price: number; modes: string[] }
interface Review { name: string; stars: number; when: string; text: string }
interface Provider {
  slug: string
  name: string
  credential: string
  registration: string
  verified: boolean
  rating: number
  reviewCount: number
  languages: string[]
  location: string
  telehealth: boolean
  photo?: string
  clinic: string
  bio: string
  focus: string[]
  approaches: string[]
  services: Service[]
  insurers: string[]
  cash: boolean
  nextSlots: string[]
  reviews: Review[]
}

const SAMPLE: Provider = {
  slug: 'dr-asha-mwakalinga',
  name: 'Dr. Asha Mwakalinga',
  credential: 'Clinical Psychologist · PhD',
  registration: 'Registered · Medical Council of Tanganyika (MCT-PSY-2214)',
  verified: true,
  rating: 4.9,
  reviewCount: 128,
  languages: ['English', 'Kiswahili'],
  location: 'Masaki, Dar es Salaam',
  telehealth: true,
  clinic: 'Utulivu Mind Practice',
  bio: 'I help adults and adolescents work through anxiety, depression, trauma and life transitions. My approach is warm, practical and evidence-based — we set clear goals, track your progress with validated measures, and move at a pace that feels safe. Sessions are confidential and judgement-free.',
  focus: ['Anxiety', 'Depression', 'Trauma & PTSD', 'Relationships', 'Grief & loss', 'Work stress & burnout', 'Adolescents'],
  approaches: ['Cognitive Behavioural Therapy (CBT)', 'Acceptance & Commitment (ACT)', 'Trauma-focused CBT', 'Motivational Interviewing'],
  services: [
    { name: 'Initial assessment', mins: 60, price: 60000, modes: ['In person', 'Video'] },
    { name: 'Individual therapy', mins: 50, price: 45000, modes: ['In person', 'Video', 'Phone'] },
    { name: 'Couples therapy', mins: 60, price: 70000, modes: ['In person', 'Video'] },
    { name: 'Brief check-in', mins: 20, price: 20000, modes: ['Video', 'Phone', 'Chat'] },
  ],
  insurers: ['NHIF', 'Jubilee Health', 'Britam', 'AAR', 'Strategis'],
  cash: true,
  nextSlots: ['Today · 4:30 PM', 'Tomorrow · 9:00 AM', 'Tue · 2:00 PM'],
  reviews: [
    { name: 'A. K.', stars: 5, when: '2 weeks ago', text: 'Dr. Asha made me feel heard from the first session. Practical tools, real progress.' },
    { name: 'J. M.', stars: 5, when: '1 month ago', text: 'Professional, warm and flexible with video sessions. Highly recommend.' },
    { name: 'S. N.', stars: 4, when: '2 months ago', text: 'Helped me through a very hard time with my anxiety. Grateful.' },
  ],
}

const tzs = (n: number) => 'TZS ' + n.toLocaleString('en-US')

function Stars({ n }: { n: number }) {
  return (
    <span aria-label={`${n} out of 5`} style={{ color: ORANGE, letterSpacing: 1, fontSize: 13 }}>
      {'★★★★★'.slice(0, n)}<span style={{ color: hexToRgba(INK, 0.2) }}>{'★★★★★'.slice(n)}</span>
    </span>
  )
}

function Card({ children, accent }: { children: React.ReactNode; accent?: string }) {
  return (
    <section style={{ background: CREAM.milk, border: `1px solid ${hexToRgba(INK, 0.08)}`, borderTop: accent ? `2px solid ${accent}` : undefined, borderRadius: RADII.card, padding: '20px 22px', boxShadow: '0 1px 2px rgba(11,9,8,0.04)' }}>
      {children}
    </section>
  )
}

function Heading({ children }: { children: React.ReactNode }) {
  return <h2 style={{ margin: '0 0 12px', fontFamily: TYPE.serif, fontSize: 18, fontWeight: 800, color: INK, letterSpacing: '-0.2px' }}>{children}</h2>
}

export default function PublicProvider() {
  useParams<{ slug: string }>() // real lookup by slug lands with the backend; sample for now
  const p = SAMPLE
  const initials = p.name.split(' ').filter(Boolean).slice(0, 2).map((x) => x[0]).join('')

  const btn = (bg: string, color: string): React.CSSProperties => ({
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    padding: '12px 18px', borderRadius: 999, background: bg, color, border: bg === 'transparent' ? `1px solid ${hexToRgba(INK, 0.2)}` : 'none',
    fontSize: 14, fontWeight: 700, cursor: 'pointer', textDecoration: 'none', fontFamily: TYPE.sans,
  })

  return (
    <main style={{ minHeight: '100vh', background: CREAM.paper ?? '#FAF5E5', color: TEXT.body, fontFamily: TYPE.sans, paddingBottom: 64 }}>
      {/* Cover band */}
      <div style={{ height: 132, background: `linear-gradient(120deg, ${GREEN} 0%, ${hexToRgba(GREEN, 0.82)} 100%)` }} />

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 20px' }}>
        {/* Identity header */}
        <header style={{ display: 'flex', gap: 18, alignItems: 'flex-end', marginTop: -48, flexWrap: 'wrap' }}>
          <div style={{ width: 104, height: 104, borderRadius: 26, background: CREAM.ivory, border: `3px solid ${CREAM.milk}`, boxShadow: '0 8px 24px rgba(11,9,8,0.14)', display: 'grid', placeItems: 'center', overflow: 'hidden', flexShrink: 0 }}>
            {p.photo ? <img src={p.photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span style={{ fontFamily: TYPE.serif, fontSize: 34, fontWeight: 800, color: GREEN }}>{initials}</span>}
          </div>
          <div style={{ flex: 1, minWidth: 220, paddingBottom: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <h1 style={{ margin: 0, fontFamily: TYPE.serif, fontSize: 26, fontWeight: 800, color: INK, letterSpacing: '-0.4px' }}>{p.name}</h1>
              {p.verified && <span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: GREEN, background: hexToRgba(GREEN, 0.1), padding: '3px 8px', borderRadius: 999 }}>✓ Verified</span>}
            </div>
            <div style={{ fontSize: 14, color: TEXT.body, marginTop: 2 }}>{p.credential} · {p.clinic}</div>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 8, fontSize: 12.5, color: TEXT.muted }}>
              <span><Stars n={Math.round(p.rating)} /> <strong style={{ color: INK }}>{p.rating}</strong> ({p.reviewCount})</span>
              <span>· {p.location}</span>
              {p.telehealth && <span>· Video &amp; in person</span>}
              <span>· {p.languages.join(' / ')}</span>
            </div>
          </div>
        </header>

        {/* Primary actions */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 18 }}>
          <a href="#book" style={btn(GREEN, CREAM.cream)}>Book appointment</a>
          <a href="#book" style={btn('transparent', INK)}>Message</a>
          <a href="#book" style={btn('transparent', INK)}>Follow</a>
          <button onClick={() => alert('Use your browser menu → “Add to Home Screen” to save this practice.')} style={btn(hexToRgba(ORANGE, 0.16), '#9A5B24')}>Save to home</button>
        </div>
        <div style={{ fontSize: 11.5, color: TEXT.muted, marginTop: 8 }}>{p.registration}</div>

        {/* Body grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.6fr) minmax(0,1fr)', gap: 16, marginTop: 22 }} className="pp-grid">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }}>
            <Card><Heading>About</Heading><p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.65, color: TEXT.body }}>{p.bio}</p></Card>

            <Card accent={GREEN}>
              <Heading>Focus areas</Heading>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {p.focus.map((f) => <span key={f} style={{ fontSize: 12.5, color: INK, background: CREAM.ivory, border: `1px solid ${hexToRgba(INK, 0.1)}`, padding: '6px 11px', borderRadius: 999 }}>{f}</span>)}
              </div>
              <div style={{ fontSize: 12, color: TEXT.muted, marginTop: 14, marginBottom: 6, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Approaches</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {p.approaches.map((a) => <span key={a} style={{ fontSize: 12, color: TEXT.body }}>· {a}</span>)}
              </div>
            </Card>

            <Card accent={ORANGE}>
              <div id="book" />
              <Heading>Services &amp; fees</Heading>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {p.services.map((s) => (
                  <div key={s.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '12px 14px', background: CREAM.ivory, borderRadius: 14, border: `1px solid ${hexToRgba(INK, 0.07)}` }}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: 700, color: INK, fontSize: 14 }}>{s.name} <span style={{ color: TEXT.muted, fontWeight: 400 }}>· {s.mins} min</span></div>
                      <div style={{ fontSize: 12, color: TEXT.muted, marginTop: 2 }}>{s.modes.join(' · ')}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
                      <div style={{ fontFamily: TYPE.serif, fontWeight: 800, color: INK, fontSize: 15 }}>{tzs(s.price)}</div>
                      <button style={{ ...btn(GREEN, CREAM.cream), padding: '8px 14px', fontSize: 13 }}>Book</button>
                    </div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 11.5, color: TEXT.muted, marginTop: 12, marginBottom: 0 }}>Booking includes a short, confidential intake and a brief assessment (e.g. PHQ-9 / GAD-7) so your first session starts informed.</p>
            </Card>

            <Card>
              <Heading>Reviews</Heading>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {p.reviews.map((r, i) => (
                  <div key={i} style={{ borderTop: i ? `1px solid ${hexToRgba(INK, 0.07)}` : 'none', paddingTop: i ? 12 : 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                      <span style={{ fontWeight: 700, color: INK, fontSize: 13 }}>{r.name}</span>
                      <span style={{ fontSize: 11.5, color: TEXT.muted }}>{r.when}</span>
                    </div>
                    <div style={{ marginTop: 2 }}><Stars n={r.stars} /></div>
                    <p style={{ margin: '6px 0 0', fontSize: 13.5, color: TEXT.body, lineHeight: 1.55 }}>{r.text}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }}>
            <Card accent={GREEN}>
              <Heading>Next availability</Heading>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {p.nextSlots.map((s) => (
                  <a key={s} href="#book" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 13px', background: CREAM.ivory, borderRadius: 12, border: `1px solid ${hexToRgba(INK, 0.08)}`, color: INK, textDecoration: 'none', fontSize: 13.5, fontWeight: 600 }}>
                    {s} <span style={{ color: GREEN }}>Book →</span>
                  </a>
                ))}
              </div>
            </Card>

            <Card>
              <Heading>Payment &amp; insurance</Heading>
              <div style={{ fontSize: 12, color: TEXT.muted, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 6 }}>Insurance accepted</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {p.insurers.map((x) => <span key={x} style={{ fontSize: 12, color: INK, background: CREAM.ivory, border: `1px solid ${hexToRgba(INK, 0.1)}`, padding: '5px 10px', borderRadius: 999 }}>{x}</span>)}
              </div>
              {p.cash && <div style={{ marginTop: 12, fontSize: 13, color: TEXT.body }}>Cash &amp; <strong>M-Pesa / Tigo Pesa / Airtel Money</strong> accepted.</div>}
            </Card>

            <Card>
              <Heading>Practice</Heading>
              <div style={{ fontSize: 13.5, color: TEXT.body, lineHeight: 1.7 }}>
                <div><strong>{p.clinic}</strong></div>
                <div>{p.location}</div>
                <div style={{ marginTop: 6, color: GREEN, fontWeight: 700 }}>{p.telehealth ? 'Secure video sessions available' : 'In-person only'}</div>
              </div>
            </Card>

            <Card accent={ORANGE}>
              <Heading>In a crisis?</Heading>
              <p style={{ margin: 0, fontSize: 13, color: TEXT.body, lineHeight: 1.6 }}>
                If you or someone else is in immediate danger, call <strong>112</strong> or go to the nearest emergency department. This page is not for emergencies.
              </p>
            </Card>
          </div>
        </div>

        <footer style={{ textAlign: 'center', marginTop: 34, fontSize: 11.5, color: TEXT.muted }}>
          <span style={{ fontFamily: TYPE.serif, fontWeight: 800, color: GREEN }}>TABHOS</span> · Tanzania Behavioral Health Operating System · part of the THOS network
        </footer>
      </div>

      <style>{`@media (max-width: 720px){ .pp-grid{ grid-template-columns: 1fr !important } }`}</style>
    </main>
  )
}
