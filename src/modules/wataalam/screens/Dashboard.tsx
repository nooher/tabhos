import { useEffect, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { JEWEL, RADII, TYPE, hexToRgba } from '../../../lib/glass'
import { Card, H1 } from '../components/Card'
import type { Appointment, OutcomeEntry, SupervisionCase } from '../lib/storage'
import {
  loadAppointments, loadAppointmentsAsync,
  loadOutcomes, loadOutcomesAsync,
  loadSupervision,
} from '../lib/storage'
import { ArchitectureBadge } from '../../../components/ArchitectureBadge'
import { subscribeTable } from '../../../lib/realtime'
import { toast } from '../../../lib/notify'
import { useLang } from '../../../lib/i18n/Provider'

export default function Dashboard() {
  const { t } = useLang()
  const [appts, setAppts] = useState<Appointment[]>(() => loadAppointments())
  const [outcomes, setOutcomes] = useState<OutcomeEntry[]>(() => loadOutcomes())
  const [supervision] = useState<SupervisionCase[]>(() => loadSupervision())

  useEffect(() => {
    let mounted = true
    void loadAppointmentsAsync().then((rows) => { if (mounted) setAppts(rows) })
    void loadOutcomesAsync().then((rows) => { if (mounted) setOutcomes(rows) })

    // Realtime: any new appointment / outcome → refresh + ping the provider.
    const offAppt = subscribeTable('tr_appointments', {}, (evt) => {
      if (!mounted) return
      void loadAppointmentsAsync().then((rows) => { if (mounted) setAppts(rows) })
      if (evt.event === 'INSERT') toast(t('wataalam.dashboard.toast_new_appt', 'Miadi mpya imeingia'), 'info')
      else if (evt.event === 'UPDATE') toast(t('wataalam.dashboard.toast_appt_changed', 'Miadi imebadilishwa'), 'info')
    })
    const offOutcome = subscribeTable('tr_outcomes', {}, () => {
      if (!mounted) return
      void loadOutcomesAsync().then((rows) => { if (mounted) setOutcomes(rows) })
    })

    return () => { mounted = false; offAppt(); offOutcome() }
  }, [])

  const today = new Date().toDateString()
  const todays = appts.filter((a) => new Date(a.startISO).toDateString() === today)
  const queue = todays.filter((a) => a.status === 'scheduled')

  // Average PHQ-9 change per patient (latest − earliest).
  const phqChange = (() => {
    const byPt: Record<string, number[]> = {}
    outcomes
      .filter((o) => o.instrument === 'PHQ-9')
      .sort((a, b) => +new Date(a.dateISO) - +new Date(b.dateISO))
      .forEach((o) => {
        byPt[o.patientPseudonym] = byPt[o.patientPseudonym] || []
        byPt[o.patientPseudonym]!.push(o.score)
      })
    const deltas = Object.values(byPt)
      .filter((arr) => arr.length >= 2)
      .map((arr) => arr[arr.length - 1]! - arr[0]!)
    if (!deltas.length) return null
    return deltas.reduce((a, b) => a + b, 0) / deltas.length
  })()

  const pendingSup = supervision.filter((s) => s.status === 'pending').length

  return (
    <div>
      <H1 english="Dashboard">{t('wataalam.dashboard.greeting', 'Habari za asubuhi, Mtaalamu.')}</H1>
      <div style={{ marginTop: -6, marginBottom: 16 }}>
        <ArchitectureBadge moduleSlug="wataalam" />
      </div>

      <PublicPageCard />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 14,
          marginBottom: 18,
        }}
      >
        <Stat label={t('wataalam.dashboard.stat_today', 'Miadi leo')} value={String(todays.length)} accent={JEWEL.tealRoho} />
        <Stat label={t('wataalam.dashboard.stat_queue', 'Foleni')} value={String(queue.length)} accent={JEWEL.goldHope} />
        <Stat
          label={t('wataalam.dashboard.stat_phq9', 'Wastani wa PHQ-9 (Δ)')}
          value={phqChange === null ? '—' : phqChange.toFixed(1)}
          subtitle={phqChange === null ? '' : t('wataalam.dashboard.phq9_subtitle', 'punguzo bora ni hasi')}
          accent={JEWEL.indigoWisdom}
        />
        <Stat
          label={t('wataalam.dashboard.stat_supervision', 'Usimamizi unaongoja')}
          value={String(pendingSup)}
          accent={pendingSup > 0 ? JEWEL.maroonCrisis : JEWEL.tealDeep}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 14 }}>
        <Card title={t('wataalam.dashboard.today_card', 'Miadi ya leo')} english="Today">
          {todays.length === 0 ? (
            <p style={{ opacity: 0.7, margin: 0 }}>{t('wataalam.dashboard.no_today', 'Hakuna miadi leo.')}</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
              {todays.map((a) => (
                <li
                  key={a.id}
                  style={{
                    padding: 12,
                    borderRadius: RADII.card,
                    background: 'rgba(250,245,229,0.85)',
                    border: `1px solid ${hexToRgba(JEWEL.tealMwenza, 0.20)}`,
                    color: '#0A0808',
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 10,
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <div style={{ fontFamily: TYPE.serif, fontSize: 15, color: '#0A0808', fontWeight: 700 }}>
                      {a.patientPseudonym}
                    </div>
                    <div style={{ fontSize: 12, color: '#3B3B3B' }}>
                      {new Date(a.startISO).toLocaleTimeString('sw-TZ', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}{' '}
                      · {a.mode === 'virtual' ? t('wataalam.common.virtual', 'Mtandaoni') : t('wataalam.common.in_person', 'Ana kwa ana')} · {a.reasonSw}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                    {a.mode === 'virtual' ? (
                      <Link
                        to="../video"
                        style={{
                          padding: '6px 12px',
                          borderRadius: 999,
                          background: '#C99700',
                          color: '#0A0808',
                          fontSize: 12,
                          textDecoration: 'none',
                          fontWeight: 600,
                        }}
                      >
                        {t('wataalam.dashboard.start_video', 'Anza video')}
                      </Link>
                    ) : (
                      <Link
                        to="../intake"
                        style={{
                          padding: '6px 12px',
                          borderRadius: 999,
                          background: '#0F4D1F',
                          color: '#F4EAC9',
                          fontSize: 12,
                          textDecoration: 'none',
                        }}
                      >
                        {t('wataalam.dashboard.intake_link', 'Mapokezi')}
                      </Link>
                    )}
                    <Link
                      to={`kipindi/${a.id}/maliza`}
                      style={{
                        padding: '6px 12px',
                        borderRadius: 999,
                        background: 'rgba(11,9,8,0.08)',
                        color: '#0A0808',
                        fontSize: 12,
                        textDecoration: 'none',
                        fontWeight: 600,
                        border: '1px solid rgba(11,9,8,0.18)',
                      }}
                    >
                      {t('wataalam.dashboard.complete', 'Maliza')}
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card title={t('wataalam.dashboard.supervision_card', 'Usimamizi')} english="Supervision queue" accent={JEWEL.maroonCrisis}>
          {pendingSup === 0 ? (
            <p style={{ color: '#3B3B3B', margin: 0 }}>{t('wataalam.dashboard.no_supervision', 'Hakuna kesi za usimamizi.')}</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
              {supervision
                .filter((s) => s.status === 'pending')
                .map((s) => (
                  <li
                    key={s.id}
                    style={{
                      padding: 12,
                      borderRadius: RADII.card,
                      background: 'rgba(250,245,229,0.85)',
                      border: '1px solid rgba(11,9,8,0.10)',
                    }}
                  >
                    <div style={{ fontSize: 14, fontFamily: TYPE.serif, color: '#0A0808', fontWeight: 700 }}>
                      {s.supervisee} — {s.patientPseudonym}
                    </div>
                    <div style={{ fontSize: 12, color: '#3B3B3B', marginTop: 4 }}>{s.summarySw}</div>
                  </li>
                ))}
            </ul>
          )}
          <div style={{ marginTop: 12 }}>
            <Link to="../usimamizi" style={{ color: '#0F4D1F', fontSize: 13, fontWeight: 700, textDecoration: 'underline' }}>
              {t('wataalam.dashboard.view_all', 'Tazama zote →')}
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}

function Stat({
  label,
  value,
  subtitle,
  accent,
}: {
  label: string
  value: string
  subtitle?: string
  accent: string
}) {
  return (
    <div
      style={{
        padding: 16,
        background: hexToRgba(accent, 0.2),
        border: `1px solid ${hexToRgba(accent, 0.5)}`,
        borderRadius: RADII.sheet,
      }}
    >
      <div style={{ fontSize: 11, letterSpacing: 0.6, textTransform: 'uppercase', color: '#3B3B3B', fontWeight: 700 }}>
        {label}
      </div>
      <div
        style={{
          fontFamily: TYPE.serif,
          fontSize: 32,
          fontWeight: 600,
          letterSpacing: TYPE.tighterTrack,
          marginTop: 4,
          color: '#0A0808',
        }}
      >
        {value}
      </div>
      {subtitle && <div style={{ fontSize: 11, color: '#3B3B3B', marginTop: 2 }}>{subtitle}</div>}
    </div>
  )
}

// The provider's own public page — the shareable link they post to reach clients.
const MY_SLUG = 'dr-asha-mwakalinga'
function pillBtn(bg: string, color: string): CSSProperties {
  return { display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 16px', borderRadius: 999, background: bg, color, border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', textDecoration: 'none', fontFamily: TYPE.sans }
}
function PublicPageCard() {
  const url = (typeof window !== 'undefined' ? window.location.origin : 'https://tabhos.tz') + '/p/' + MY_SLUG
  const copy = () => { try { void navigator.clipboard.writeText(url); toast('Link copied', 'info') } catch { /* noop */ } }
  const share = () => { const n = navigator as Navigator & { share?: (d: { title: string; url: string }) => Promise<void> }; if (n.share) void n.share({ title: 'Book with me on TABHOS', url }).catch(() => {}); else copy() }
  return (
    <div style={{ background: `linear-gradient(120deg, ${JEWEL.tealRoho} 0%, ${hexToRgba(JEWEL.tealRoho, 0.85)} 100%)`, color: '#FAF5E5', borderRadius: RADII.sheet, padding: '18px 20px', marginBottom: 18, display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.85, fontWeight: 700 }}>Your public page</div>
        <div style={{ fontFamily: TYPE.serif, fontSize: 20, fontWeight: 800, margin: '3px 0 4px', letterSpacing: TYPE.tighterTrack }}>Share your link — clients book directly</div>
        <div style={{ fontSize: 12.5, opacity: 0.92, maxWidth: 540 }}>Post this on Instagram, WhatsApp or your website. Clients see your services, rates and reviews, and complete intake + a screening before your first session.</div>
        <div style={{ marginTop: 10, fontSize: 12.5, fontFamily: 'monospace', background: 'rgba(0,0,0,0.18)', padding: '7px 10px', borderRadius: 8, display: 'inline-block', wordBreak: 'break-all' }}>{url}</div>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Link to={`/p/${MY_SLUG}`} style={pillBtn('#FAF5E5', JEWEL.tealRoho)}>View public page</Link>
        <button onClick={copy} style={pillBtn('rgba(255,255,255,0.16)', '#FAF5E5')}>Copy link</button>
        <button onClick={share} style={pillBtn('rgba(255,255,255,0.16)', '#FAF5E5')}>Share</button>
      </div>
    </div>
  )
}
