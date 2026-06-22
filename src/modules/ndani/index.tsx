import type React from 'react'
import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Card, ModuleShell, Table, Td, type SubNav } from '../_shared/Layout'
import { JEWEL, RADII, TEXT } from '../../lib/glass'
import { useLang } from '../../lib/i18n/Provider'
import { hasBackend, supabase } from '../../lib/supabase'
import { audit } from '../../lib/db'
import {
  WHO_MHGAP, TZ_STG_MH_2021, WHO_SH_PLUS, WHO_ATLAS_2024,
  ICD_MENTAL_CODES, MH_REG_2016, TZ_MH_ACT_2008, TUMAINI_FAQ,
} from '../../lib/rafiki'
import CrisisMonitor from './screens/Crisis'
import FounderConsole from './screens/Founder'
import Providers from './screens/Providers'
import Insurers from './screens/Insurers'
import Finance from './screens/Finance'
import Config from './screens/Config'

interface VerifyRow { id: string; name: string; kind: string; submitted: string; status: 'pending' | 'verified' | 'rejected' }
const VERIFY_INITIAL: VerifyRow[] = [
  { id: 'v1', name: 'Dr. Asha Mwema, MD', kind: 'Psychiatrist (MCT-licensed)', submitted: '2026-06-10', status: 'pending' },
  { id: 'v2', name: 'Bibi Salima — Lay counsellor', kind: 'Friendship Bench trained', submitted: '2026-06-12', status: 'pending' },
  { id: 'v3', name: 'Sheikh Yunus', kind: 'Faith provider — Muslim', submitted: '2026-06-13', status: 'pending' },
  { id: 'v4', name: 'Ms. Neema — school counsellor', kind: 'Diploma in counselling', submitted: '2026-06-14', status: 'pending' },
]

const MOD_QUEUE = [
  { id: 'r1', kind: 'Journal entry', preview: '“Sitaki kuendelea…”', flagged_by: 'auto-CSSRS', action: 'Mwenza crisis mode + offer hotline' },
  { id: 'r2', kind: 'Provider bio', preview: 'Anasema atatibu UKIMWI kwa dua…', flagged_by: 'auto-keywords', action: 'Verify or remove' },
  { id: 'r3', kind: 'Community post', preview: 'Spam — link ya nje', flagged_by: 'user-report', action: 'Remove' },
]

const EQUITY_REPORT = [
  { dim: 'Jinsia', balanced: '52% wanawake / 48% wanaume', note: 'Inafanana na sensa' },
  { dim: 'Mkoa', balanced: 'Dar 38% · Mwanza 14% · Arusha 9% · Mwingine 39%', note: 'Mkoa wa Kigoma + Kagera chini ya wastani' },
  { dim: 'Umri', balanced: '15-24: 28%, 25-44: 48%, 45+: 24%', note: 'Wazee chini ya wastani — kazi inaendelea' },
  { dim: 'Lugha', balanced: 'sw 78% · sw_mtaa 14% · en 8%', note: '' },
  { dim: 'Imani', balanced: 'Kikristo 51% · Kiislamu 42% · Asili 4% · Hakuna 3%', note: 'Inafanana na sensa' },
]

const IRB_LIBRARY = [
  { name: 'TR-001 — PhD primary outcome', irb: 'MUHAS IRB-2026-04-PSY-018', version: 'v3.2' },
  { name: 'TR-002 — Implementation', irb: 'UAMS IRB-26-04-1129', version: 'v2.1' },
  { name: 'TR-003 — Cost-effectiveness', irb: 'Pending', version: 'v1.0' },
]

const AUDIT_LOG = [
  { ts: '2026-06-20 09:01', actor: 'admin@laetoli', action: 'Verified provider v1', entity: 'tr_providers' },
  { ts: '2026-06-20 08:44', actor: 'system', action: 'Auto-flagged journal r1 (CSSRS)', entity: 'tr_journal_entries' },
  { ts: '2026-06-19 22:11', actor: 'researcher@muhas', action: 'Export TR-001 PHQ-9 (de-identified)', entity: 'tr_outcomes' },
  { ts: '2026-06-19 14:30', actor: 'admin@laetoli', action: 'Schema migration v0.4 applied', entity: 'tr_*' },
]

function Overview(): React.JSX.Element {
  const { t } = useLang()
  return (
    <Card title={t('ndani.overview.title', 'Ndani — Uongozi')}>
      <p>{t('ndani.overview.body', 'Sehemu ya admin kwa wafanyakazi wa Laetoli. Inajumuisha foleni ya kuthibitisha wahudumu, moderation, ripoti ya equity, IRB library, na audit log.')}</p>
    </Card>
  )
}

interface LiveVerifyRow {
  credentialId: string
  providerId: string
  name: string
  kind: string
  licenseAuthority: string
  licenseRef: string
  submitted: string
  status: 'pending' | 'verified' | 'rejected' | 'expired'
  source: 'db' | 'seed'
}

function Verify(): React.JSX.Element {
  const { t } = useLang()
  const [rows, setRows] = useState<LiveVerifyRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [source, setSource] = useState<'db' | 'seed'>('seed')

  useEffect(() => {
    let cancelled = false
    void (async () => {
      if (!hasBackend || !supabase) {
        if (cancelled) return
        setRows(VERIFY_INITIAL.map((r) => ({
          credentialId: r.id,
          providerId: r.id,
          name: r.name,
          kind: r.kind,
          licenseAuthority: '—',
          licenseRef: '—',
          submitted: r.submitted,
          status: r.status,
          source: 'seed',
        })))
        setLoading(false)
        return
      }
      const { data, error: e } = await supabase
        .from('tr_provider_credentials')
        .select('id, provider_id, kind, status, document_url, issued_by, reviewed_at, tr_providers!inner(id, kind, user_id, tr_users!inner(display_name)), created_at:reviewed_at')
        .in('status', ['pending'])
        .order('reviewed_at', { ascending: false, nullsFirst: true })
        .limit(100)
      if (cancelled) return
      if (e) {
        setError(e.message)
        setLoading(false)
        return
      }
      const live = ((data ?? []) as unknown as Array<{
        id: string
        provider_id: string
        status: 'pending' | 'verified' | 'rejected' | 'expired'
        document_url: string | null
        issued_by: string | null
        reviewed_at: string | null
        tr_providers: { id: string; kind: string; tr_users: { display_name: string | null } | null } | null
      }>).map<LiveVerifyRow>((r) => ({
        credentialId: r.id,
        providerId: r.provider_id,
        name: r.tr_providers?.tr_users?.display_name ?? '—',
        kind: r.tr_providers?.kind ?? '—',
        licenseAuthority: r.issued_by ?? '—',
        licenseRef: r.document_url ?? '—',
        submitted: r.reviewed_at?.slice(0, 10) ?? '—',
        status: r.status,
        source: 'db',
      }))
      if (live.length === 0) {
        setRows(VERIFY_INITIAL.map((r) => ({
          credentialId: r.id, providerId: r.id, name: r.name, kind: r.kind,
          licenseAuthority: '—', licenseRef: '—', submitted: r.submitted,
          status: r.status, source: 'seed',
        })))
        setSource('seed')
      } else {
        setRows(live)
        setSource('db')
      }
      setLoading(false)
    })()
    return () => { cancelled = true }
  }, [])

  const act = async (row: LiveVerifyRow, status: 'verified' | 'rejected'): Promise<void> => {
    if (row.source === 'seed' || !hasBackend || !supabase) {
      setRows((rs) => rs.map((r) => r.credentialId === row.credentialId ? { ...r, status } : r))
      return
    }
    const credUp = await supabase
      .from('tr_provider_credentials')
      .update({ status, reviewed_at: new Date().toISOString() })
      .eq('id', row.credentialId)
    if (credUp.error) { setError(credUp.error.message); return }
    if (status === 'verified') {
      const provUp = await supabase
        .from('tr_providers')
        .update({ verified: true })
        .eq('id', row.providerId)
      if (provUp.error) { setError(provUp.error.message); return }
    }
    void audit(`provider.${status}`, 'tr_providers', row.providerId, { credentialId: row.credentialId })
    // Fire-and-forget email notification — never block UI on it.
    void supabase.functions.invoke('notify-provider-decision', {
      body: { providerId: row.providerId, decision: status },
    }).catch(() => { /* best-effort notification */ })
    setRows((rs) => rs.map((r) => r.credentialId === row.credentialId ? { ...r, status } : r))
  }

  return (
    <Card title={t('ndani.verify.title', 'Foleni ya kuthibitisha wahudumu')}>
      <div style={{ marginBottom: 10, fontSize: 12, color: TEXT.muted }}>
        {loading
          ? t('ndani.verify.loading', 'Inapakia maombi…')
          : `${rows.filter((r) => r.status === 'pending').length} ${t('ndani.verify.pending_count', 'yanasubiri')}`}
        {source === 'seed' && !loading && (
          <span style={{ marginLeft: 8, fontSize: 11, padding: '2px 8px', borderRadius: 999, background: 'rgba(0,0,0,0.05)' }}>
            {t('ndani.verify.demo_data', 'data ya mfano — hakuna pending DB')}
          </span>
        )}
        {error && <span style={{ color: '#8C2222', marginLeft: 8 }}>· {error}</span>}
      </div>
      <Table headers={[t('ndani.verify.col.name', 'Jina'), t('ndani.verify.col.kind', 'Aina'), t('ndani.verify.col.authority', 'Mamlaka'), t('ndani.verify.col.ref', 'Cheti #'), t('ndani.verify.col.date', 'Tarehe'), t('ndani.verify.col.status', 'Hali'), t('ndani.verify.col.action', 'Hatua')]}>
        {rows.map((r) => (
          <tr key={r.credentialId}>
            <Td><strong>{r.name}</strong></Td>
            <Td>{r.kind}</Td>
            <Td style={{ color: TEXT.muted }}>{r.licenseAuthority}</Td>
            <Td><code style={{ fontSize: 11 }}>{r.licenseRef}</code></Td>
            <Td>{r.submitted}</Td>
            <Td>{r.status}</Td>
            <Td>
              {r.status === 'pending' ? (
                <div style={{ display: 'flex', gap: 6 }}>
                  <button onClick={() => void act(r, 'verified')} style={{ ...btnStyle, background: JEWEL.tealRoho }}>{t('ndani.verify.approve', 'Thibitisha')}</button>
                  <button onClick={() => void act(r, 'rejected')} style={{ ...btnStyle, background: JEWEL.maroonCrisis }}>{t('ndani.verify.reject', 'Kataa')}</button>
                </div>
              ) : '—'}
            </Td>
          </tr>
        ))}
      </Table>
    </Card>
  )
}

const btnStyle = {
  padding: '6px 12px', borderRadius: RADII.chip, color: JEWEL.cream,
  border: 'none', cursor: 'pointer', fontSize: 12,
}

function Moderation(): React.JSX.Element {
  const { t } = useLang()
  return (
    <Card title={t('ndani.moderation.title', 'Foleni ya moderation')}>
      <Table headers={[t('ndani.moderation.col.kind', 'Aina'), t('ndani.moderation.col.content', 'Maudhui'), t('ndani.moderation.col.flagged_by', 'Imegunduliwa na'), t('ndani.moderation.col.suggested', 'Hatua iliyopendekezwa')]}>
        {MOD_QUEUE.map((r) => (
          <tr key={r.id}>
            <Td>{r.kind}</Td>
            <Td style={{ color: TEXT.muted }}>{r.preview}</Td>
            <Td>{r.flagged_by}</Td>
            <Td>{r.action}</Td>
          </tr>
        ))}
      </Table>
    </Card>
  )
}

function Equity(): React.JSX.Element {
  const { t } = useLang()
  return (
    <Card title={t('ndani.equity.title', 'Ripoti ya equity')}>
      <Table headers={[t('ndani.equity.col.axis', 'Mhimili'), t('ndani.equity.col.distribution', 'Mgawanyo'), t('ndani.equity.col.notes', 'Maelezo')]}>
        {EQUITY_REPORT.map((r) => (
          <tr key={r.dim}><Td><strong>{r.dim}</strong></Td><Td>{r.balanced}</Td><Td>{r.note}</Td></tr>
        ))}
      </Table>
    </Card>
  )
}

function IrbLib(): React.JSX.Element {
  const { t } = useLang()
  return (
    <Card title={t('ndani.irb.title', 'Maktaba ya IRB')}>
      <Table headers={[t('ndani.irb.col.protocol', 'Itifaki'), t('ndani.irb.col.irb', 'IRB'), t('ndani.irb.col.version', 'Toleo')]}>
        {IRB_LIBRARY.map((r) => (
          <tr key={r.name}><Td>{r.name}</Td><Td>{r.irb}</Td><Td>{r.version}</Td></tr>
        ))}
      </Table>
    </Card>
  )
}

interface LiveAuditRow {
  id: string
  ts: string
  actor: string
  action: string
  entity: string
  entity_id?: string | null
  source: 'db' | 'seed'
}

function AuditView(): React.JSX.Element {
  const { t } = useLang()
  const [rows, setRows] = useState<LiveAuditRow[]>([])
  const [loading, setLoading] = useState(true)
  const [actionFilter, setActionFilter] = useState('')
  const [source, setSource] = useState<'db' | 'seed'>('seed')

  useEffect(() => {
    let on = true
    void (async () => {
      if (!hasBackend || !supabase) {
        if (on) {
          setRows(AUDIT_LOG.map((r, i) => ({
            id: `seed-${i}`, ts: r.ts, actor: r.actor, action: r.action,
            entity: r.entity, source: 'seed',
          })))
          setLoading(false)
        }
        return
      }
      const { data, error } = await supabase
        .from('tr_audit_log')
        .select('id, created_at, actor_id, action, entity, entity_id, tr_users:actor_id(display_name)')
        .order('created_at', { ascending: false })
        .limit(200)
      if (!on) return
      if (error || !data || data.length === 0) {
        setRows(AUDIT_LOG.map((r, i) => ({
          id: `seed-${i}`, ts: r.ts, actor: r.actor, action: r.action,
          entity: r.entity, source: 'seed',
        })))
        setSource('seed')
      } else {
        setRows((data as unknown as Array<{
          id: string; created_at: string; actor_id?: string | null;
          action: string; entity: string; entity_id?: string | null;
          tr_users?: { display_name?: string | null } | null;
        }>).map((r) => ({
          id: r.id,
          ts: r.created_at.slice(0, 19).replace('T', ' '),
          actor: r.tr_users?.display_name ?? r.actor_id?.slice(0, 8) ?? 'system',
          action: r.action,
          entity: r.entity,
          entity_id: r.entity_id,
          source: 'db' as const,
        })))
        setSource('db')
      }
      setLoading(false)
    })()
    return () => { on = false }
  }, [])

  const filtered = actionFilter
    ? rows.filter((r) => r.action.toLowerCase().includes(actionFilter.toLowerCase()))
    : rows

  return (
    <Card title={t('ndani.audit.title', 'Audit log')}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
        <input
          value={actionFilter}
          onChange={(e) => setActionFilter(e.target.value)}
          placeholder={t('ndani.audit.filter', 'Chuja kwa hatua (e.g. provider.verified)')}
          style={{
            flex: 1, minWidth: 220, padding: '8px 12px', borderRadius: 8,
            border: '1px solid rgba(11,9,8,0.18)', background: '#FAF5E5', fontSize: 13,
          }}
        />
        <span style={{ fontSize: 12, color: TEXT.muted }}>
          {loading ? t('ndani.audit.loading', 'Inapakia…') : `${filtered.length} ${t('ndani.audit.entries', 'kumbukumbu')}`}
        </span>
        {source === 'seed' && !loading && (
          <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 999, background: 'rgba(0,0,0,0.05)' }}>
            {t('ndani.audit.demo_data', 'data ya mfano')}
          </span>
        )}
      </div>
      <Table headers={[t('ndani.audit.col.time', 'Wakati'), t('ndani.audit.col.actor', 'Mhusika'), t('ndani.audit.col.action', 'Hatua'), t('ndani.audit.col.entity', 'Entity'), t('ndani.audit.col.entity_id', 'Ref')]}>
        {filtered.map((r) => (
          <tr key={r.id}>
            <Td>{r.ts}</Td>
            <Td>{r.actor}</Td>
            <Td><code style={{ fontSize: 11 }}>{r.action}</code></Td>
            <Td><code style={{ fontSize: 11 }}>{r.entity}</code></Td>
            <Td><code style={{ fontSize: 11, color: TEXT.muted }}>{r.entity_id?.slice(0, 8) ?? '—'}</code></Td>
          </tr>
        ))}
      </Table>
    </Card>
  )
}

function KbView(): React.JSX.Element {
  const { t } = useLang()
  const [src, setSrc] = useState<'all' | 'mhgap' | 'tzstg' | 'shplus' | 'atlas' | 'icd' | 'mhreg' | 'mhact' | 'faq'>('all')

  // Static aggregate over the in-memory KB modules — they're code-resident so
  // we can introspect counts and module/section distribution without a DB.
  const counts: Record<string, number> = {
    mhgap:  WHO_MHGAP.length,
    tzstg:  TZ_STG_MH_2021.length,
    shplus: WHO_SH_PLUS.length,
    atlas:  WHO_ATLAS_2024.length,
    icd:    ICD_MENTAL_CODES.length,
    mhreg:  MH_REG_2016.length,
    mhact:  TZ_MH_ACT_2008.length,
    faq:    TUMAINI_FAQ.length,
  }
  const total = Object.values(counts).reduce((s, n) => s + n, 0)

  const entries: Array<{ id: string; src: string; title: string; key?: string; cite?: string }> = []
  if (src === 'all' || src === 'mhgap')  WHO_MHGAP.forEach((e)        => entries.push({ id: e.id, src: 'WHO mhGAP IG v2.0', title: e.summary_sw.slice(0, 140), key: `${e.module} ${e.section}`, cite: e.citation }))
  if (src === 'all' || src === 'tzstg')  TZ_STG_MH_2021.forEach((e)   => entries.push({ id: e.id, src: 'TZ STG-NEMLIT 2021', title: e.summary_sw.slice(0, 140), key: e.section, cite: e.citation }))
  if (src === 'all' || src === 'shplus') WHO_SH_PLUS.forEach((e)      => entries.push({ id: e.id, src: 'WHO SH+ v1.0',       title: e.summary_sw.slice(0, 140), key: e.topic, cite: e.citation }))
  if (src === 'all' || src === 'atlas')  WHO_ATLAS_2024.forEach((e)   => entries.push({ id: e.id, src: 'WHO MH Atlas 2024',  title: e.summary_sw.slice(0, 140), key: e.topic, cite: e.citation }))
  if (src === 'all' || src === 'icd')    ICD_MENTAL_CODES.forEach((e) => entries.push({ id: e.id, src: 'ICD-10/11 codes',    title: `${e.title_sw} — ${e.definition_sw.slice(0, 100)}`, key: `${e.icd10}/${e.icd11}` }))
  if (src === 'all' || src === 'mhreg')  MH_REG_2016.forEach((e)      => entries.push({ id: e.id, src: 'MH Regulations 2016', title: e.summary_sw.slice(0, 140), cite: e.citation }))
  if (src === 'all' || src === 'mhact')  TZ_MH_ACT_2008.forEach((e)   => entries.push({ id: e.id, src: 'MH Act 2008',         title: e.summary_sw.slice(0, 140), cite: e.citation }))
  if (src === 'all' || src === 'faq')    TUMAINI_FAQ.forEach((e)      => entries.push({ id: e.id, src: 'TABHOS FAQ',          title: e.summary_sw.slice(0, 140) }))

  return (
    <Card title={t('ndani.kb.title', 'Maktaba ya Rafiki — KB')}>
      <p style={{ marginTop: 0, color: TEXT.muted, fontSize: 13 }}>
        {t('ndani.kb.lede', 'Rafiki KB inakaa katika code (src/lib/rafiki/kb). Hapa unaweza kuvinjari. Hariri kwa sasa zinahitajika kuwa code commits.')}
      </p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
        {([
          ['all',    `${t('ndani.kb.all', 'Vyote')} (${total})`],
          ['mhgap',  `mhGAP (${counts.mhgap})`],
          ['tzstg',  `TZ STG (${counts.tzstg})`],
          ['shplus', `SH+ (${counts.shplus})`],
          ['atlas',  `Atlas (${counts.atlas})`],
          ['icd',    `ICD (${counts.icd})`],
          ['mhreg',  `MH Reg (${counts.mhreg})`],
          ['mhact',  `MH Act (${counts.mhact})`],
          ['faq',    `FAQ (${counts.faq})`],
        ] as const).map(([k, label]) => (
          <button
            key={k}
            onClick={() => setSrc(k)}
            aria-pressed={src === k}
            style={{
              padding: '6px 12px', borderRadius: 999, fontSize: 12, fontWeight: 600,
              border: src === k ? `1px solid ${JEWEL.tealMwenza}` : '1px solid rgba(11,9,8,0.18)',
              background: src === k ? JEWEL.tealMwenza : 'transparent',
              color: src === k ? '#FAF5E5' : TEXT.body, cursor: 'pointer',
            }}
          >{label}</button>
        ))}
      </div>
      <Table headers={[t('ndani.kb.col.src', 'Chanzo'), t('ndani.kb.col.key', 'Ufunguo'), t('ndani.kb.col.summary', 'Muhtasari'), t('ndani.kb.col.cite', 'Citation')]}>
        {entries.slice(0, 300).map((e) => (
          <tr key={`${e.src}-${e.id}`}>
            <Td><span style={{ fontSize: 11, color: TEXT.muted }}>{e.src}</span></Td>
            <Td><code style={{ fontSize: 11 }}>{e.key ?? '—'}</code></Td>
            <Td style={{ fontSize: 13, color: TEXT.body }}>{e.title}…</Td>
            <Td><span style={{ fontSize: 11, color: TEXT.muted }}>{e.cite ?? '—'}</span></Td>
          </tr>
        ))}
      </Table>
      {entries.length > 300 && (
        <p style={{ marginTop: 10, fontSize: 12, color: TEXT.muted }}>
          {t('ndani.kb.truncated', `Inaonyesha 300 ya kwanza kati ya ${entries.length}. Tumia kichungi.`)}
        </p>
      )}
    </Card>
  )
}

const SUBS: SubNav[] = [
  { to: '.', label: 'Mwongozo' },
  { to: 'dharura', label: 'Dharura hai' },
  { to: 'thibitisha', label: 'Thibitisha wahudumu' },
  { to: 'wahudumu', label: 'Wahudumu (soko)' },
  { to: 'bima', label: 'Bima' },
  { to: 'fedha', label: 'Fedha' },
  { to: 'moderation', label: 'Moderation' },
  { to: 'equity', label: 'Equity' },
  { to: 'irb', label: 'IRB library' },
  { to: 'audit', label: 'Audit log' },
  { to: 'kb', label: 'Maktaba ya Rafiki' },
  { to: 'mipangilio', label: 'Mipangilio' },
  { to: 'mwanzilishi', label: 'Mwanzilishi' },
]

export default function Ndani(): React.JSX.Element {
  return (
    <ModuleShell slug="ndani" subs={SUBS}>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="dharura" element={<CrisisMonitor />} />
        <Route path="thibitisha" element={<Verify />} />
        <Route path="wahudumu" element={<Providers />} />
        <Route path="bima" element={<Insurers />} />
        <Route path="fedha" element={<Finance />} />
        <Route path="moderation" element={<Moderation />} />
        <Route path="equity" element={<Equity />} />
        <Route path="irb" element={<IrbLib />} />
        <Route path="audit" element={<AuditView />} />
        <Route path="kb" element={<KbView />} />
        <Route path="mipangilio" element={<Config />} />
        <Route path="mwanzilishi" element={<FounderConsole />} />
      </Routes>
    </ModuleShell>
  )
}
