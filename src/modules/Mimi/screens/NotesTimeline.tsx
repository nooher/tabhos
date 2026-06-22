/**
 * Notes Timeline — chronological feed of every clinician summary the
 * patient has received. Reads tr_appointments WHERE patient_id=me AND
 * status='completed', parses `summary=<text>` out of the notes column
 * (provider writes it through CompleteSession), and shows it newest-first.
 */
import { useEffect, useState } from 'react'
import { PageShell, Card } from '../components/Shell'
import { JEWEL, TYPE, TEXT, hexToRgba } from '../../../lib/glass'
import { useLang } from '../../../lib/i18n/Provider'
import { db } from '../../../lib/db'
import { getMeId } from '../../../lib/me'

interface NoteRow {
  appointmentId: string
  whenIso: string
  modality: string
  summary: string
}

function parseSummary(notes: string | null | undefined): string | null {
  if (!notes) return null
  const m = /summary=(.+?)(?:;|$)/.exec(notes)
  return m && m[1] ? m[1].trim() : null
}

export default function NotesTimeline() {
  const { t } = useLang()
  const [rows, setRows] = useState<NoteRow[]>([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    let on = true
    void (async () => {
      try {
        const me = await getMeId()
        const appts = await db.list('tr_appointments', { patient_id: me, status: 'completed' })
        if (!on) return
        const mapped: NoteRow[] = []
        for (const a of appts) {
          const summary = parseSummary(a.notes)
          if (!summary) continue
          mapped.push({
            appointmentId: a.id,
            whenIso: a.scheduled_at,
            modality: String(a.modality),
            summary,
          })
        }
        mapped.sort((a, b) => b.whenIso.localeCompare(a.whenIso))
        setRows(mapped)
      } catch (e) {
        if (on) setErr(e instanceof Error ? e.message : String(e))
      } finally {
        if (on) setLoading(false)
      }
    })()
    return () => { on = false }
  }, [])

  return (
    <PageShell
      title={t('mimi.notes.title', 'Muhtasari wa daktari')}
      subtitle={t('mimi.notes.subtitle', 'Vidokezo vya wataalam kutoka vipindi vyako vilivyokamilika.')}
      back={{ to: '/mimi', label: t('mimi.nav.back', 'Mimi') }}
    >
      {loading && <Card><p style={{ margin: 0, color: TEXT.muted }}>{t('mimi.notes.loading', 'Inapakia…')}</p></Card>}
      {err && <Card><p style={{ margin: 0, color: '#8C2222' }}>{err}</p></Card>}
      {!loading && !err && rows.length === 0 && (
        <Card>
          <p style={{ margin: 0, color: TEXT.muted }}>
            {t('mimi.notes.empty', 'Bado huna muhtasari. Mtaalam akamilisha kipindi nawe, atatumia hapa.')}
          </p>
        </Card>
      )}
      {!loading && !err && rows.length > 0 && (
        <div style={{ display: 'grid', gap: 12 }}>
          {rows.map((r) => {
            const d = new Date(r.whenIso)
            return (
              <Card key={r.appointmentId}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'baseline', marginBottom: 8, gap: 10, flexWrap: 'wrap',
                }}>
                  <strong style={{ fontFamily: TYPE.serif, color: JEWEL.tealDeep, fontSize: 15 }}>
                    {d.toLocaleDateString('sw-TZ', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </strong>
                  <span style={{
                    fontSize: 11, fontWeight: 700, letterSpacing: '0.06em',
                    textTransform: 'uppercase', color: JEWEL.goldHope,
                  }}>
                    {r.modality === 'virtual' ? t('mimi.notes.virtual', 'Mtandaoni') : t('mimi.notes.in_person', 'Ana kwa ana')}
                  </span>
                </div>
                <p style={{
                  margin: 0, padding: 12, borderRadius: 10,
                  background: hexToRgba(JEWEL.tealMwenza, 0.07),
                  borderLeft: `3px solid ${JEWEL.tealMwenza}`,
                  fontSize: 14, color: TEXT.body, lineHeight: 1.6,
                }}>
                  {r.summary}
                </p>
              </Card>
            )
          })}
        </div>
      )}
    </PageShell>
  )
}
