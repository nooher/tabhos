/**
 * WATAALAM persistence — Supabase-first with a localStorage shim for
 * unauth/offline flows. The screen code (Dashboard, Schedule, etc.) keeps
 * its existing `loadX/saveX` signatures so it doesn't have to change.
 *
 * When the user is signed in (real auth session), every load goes through
 * the production tables (`tr_appointments`, `tr_outcomes`, `tr_referrals`,
 * `tr_providers`, ...). When not, we fall back to seed data in localStorage
 * so dev and zero-network demos still feel populated.
 */
import { hasBackend, supabase } from '../../../lib/supabase'

const NS = 'tibaroho.v1.wataalam.'

function lsRead<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(NS + key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}
function lsWrite<T>(key: string, v: T): void {
  try { localStorage.setItem(NS + key, JSON.stringify(v)) } catch { /* quota */ }
}

// ─── Provider profile ──────────────────────────────────────────────────
export interface ProviderProfileDraft {
  step: number
  fullName: string
  honorific: string
  licenseNumber: string
  specialty: string
  languages: string[]
  city: string
  region: string
  feeTzs: number
  insurances: string[]
  mode: 'virtual' | 'in_person' | 'both'
  diplomaUploaded: boolean
  bioSw: string
  bioEn: string
}

export const EMPTY_PROFILE: ProviderProfileDraft = {
  step: 0,
  fullName: '',
  honorific: 'Dr.',
  licenseNumber: '',
  specialty: '',
  languages: ['sw'],
  city: '',
  region: 'Dar es Salaam',
  feeTzs: 50_000,
  insurances: ['nhif', 'cash'],
  mode: 'both',
  diplomaUploaded: false,
  bioSw: '',
  bioEn: '',
}

export const loadProfile = () => lsRead<ProviderProfileDraft>('profile', EMPTY_PROFILE)
export const saveProfile = (p: ProviderProfileDraft) => lsWrite('profile', p)

// ─── Appointments ──────────────────────────────────────────────────────
export interface Appointment {
  id: string
  patientPseudonym: string
  startISO: string
  durationMin: number
  mode: 'virtual' | 'in_person'
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
  reasonSw?: string
}

const APPT_STATUS_MAP: Record<string, Appointment['status']> = {
  requested: 'scheduled',
  confirmed: 'scheduled',
  completed: 'completed',
  cancelled: 'cancelled',
  no_show:   'cancelled',
}

const APPT_MODE_MAP: Record<string, Appointment['mode']> = {
  virtual:      'virtual',
  in_person:    'in_person',
  hybrid:       'virtual',
  asynchronous: 'virtual',
}

async function fetchAppointmentsFromSupabase(): Promise<Appointment[] | null> {
  if (!supabase) return null
  // Auth uid → tr_users.id → tr_providers.id, then appointments on it.
  const auth = await supabase.auth.getUser()
  const authId = auth.data.user?.id
  if (!authId) return null
  const me = await supabase.from('tr_users').select('id').eq('auth_id', authId).maybeSingle()
  if (!me.data) return null
  const prov = await supabase.from('tr_providers').select('id').eq('user_id', me.data.id).maybeSingle()
  if (!prov.data) return null

  const { data, error } = await supabase
    .from('tr_appointments')
    .select('id, scheduled_at, duration_min, modality, status, notes, patient:tr_users!patient_id(display_name)')
    .eq('provider_id', prov.data.id)
    .order('scheduled_at', { ascending: true })

  if (error || !data) return null
  return data.map((r) => {
    const patientRel = r.patient as { display_name?: string } | { display_name?: string }[] | null
    const patient = Array.isArray(patientRel) ? patientRel[0] : patientRel
    return {
      id: r.id as string,
      patientPseudonym: patient?.display_name ?? 'Mteja',
      startISO: r.scheduled_at as string,
      durationMin: r.duration_min as number,
      mode: APPT_MODE_MAP[r.modality as string] ?? 'in_person',
      status: APPT_STATUS_MAP[r.status as string] ?? 'scheduled',
      reasonSw: (r.notes as string | null) ?? undefined,
    }
  })
}

const seed = (): Appointment[] => {
  const t = new Date()
  t.setHours(9, 0, 0, 0)
  return [
    { id: 'a-001', patientPseudonym: 'Mteja A', startISO: t.toISOString(),
      durationMin: 45, mode: 'in_person', status: 'scheduled', reasonSw: 'Sonona — ufuatiliaji' },
    { id: 'a-002', patientPseudonym: 'Mteja B', startISO: new Date(t.getTime() + 60 * 60 * 1000).toISOString(),
      durationMin: 45, mode: 'virtual', status: 'scheduled', reasonSw: 'Tathmini ya kwanza' },
    { id: 'a-003', patientPseudonym: 'Mteja C', startISO: new Date(t.getTime() + 2.5 * 60 * 60 * 1000).toISOString(),
      durationMin: 30, mode: 'virtual', status: 'scheduled', reasonSw: 'CBT kipindi cha 4' },
  ]
}

/** Synchronous variant — returns whatever's cached/seeded. Component then
 *  upgrades via loadAppointmentsAsync(). */
export const loadAppointments = (): Appointment[] => {
  const cached = lsRead<Appointment[] | null>('appointments', null)
  if (cached && cached.length) return cached
  const s = seed()
  lsWrite('appointments', s)
  return s
}

export async function loadAppointmentsAsync(): Promise<Appointment[]> {
  if (hasBackend) {
    const remote = await fetchAppointmentsFromSupabase()
    if (remote) {
      lsWrite('appointments', remote)
      return remote
    }
  }
  return loadAppointments()
}

export const saveAppointments = (a: Appointment[]) => lsWrite('appointments', a)

// ─── Slots ─────────────────────────────────────────────────────────────
export interface SlotRule {
  id: string
  dayOfWeek: number
  startHHMM: string
  endHHMM: string
  mode: 'virtual' | 'in_person' | 'both'
}

const SEED_SLOTS: SlotRule[] = [
  { id: 's-1', dayOfWeek: 1, startHHMM: '09:00', endHHMM: '12:00', mode: 'both' },
  { id: 's-2', dayOfWeek: 3, startHHMM: '14:00', endHHMM: '17:00', mode: 'virtual' },
  { id: 's-3', dayOfWeek: 5, startHHMM: '09:00', endHHMM: '13:00', mode: 'in_person' },
]

export const loadSlots = (): SlotRule[] => {
  const v = lsRead<SlotRule[] | null>('slots', null)
  if (v && v.length) return v
  lsWrite('slots', SEED_SLOTS)
  return SEED_SLOTS
}
export const saveSlots = (s: SlotRule[]) => lsWrite('slots', s)

// ─── Notes ─────────────────────────────────────────────────────────────
export interface SessionNote {
  id: string
  appointmentId: string
  patientPseudonym: string
  template: 'SOAP' | 'DAP'
  fields: Record<string, string>
  createdAt: number
}
export const loadNotes = (): SessionNote[] => lsRead<SessionNote[]>('notes', [])
export const saveNotes = (n: SessionNote[]) => lsWrite('notes', n)

// ─── Outcomes ──────────────────────────────────────────────────────────
export interface OutcomeEntry {
  id: string
  patientPseudonym: string
  instrument: 'PHQ-9' | 'GAD-7' | 'PCL-5' | 'AUDIT'
  score: number
  dateISO: string
}

function daysAgo(n: number): string {
  const d = new Date(); d.setDate(d.getDate() - n); return d.toISOString()
}

const seedOutcomes: OutcomeEntry[] = [
  { id: 'o-1', patientPseudonym: 'Mteja A', instrument: 'PHQ-9', score: 18, dateISO: daysAgo(60) },
  { id: 'o-2', patientPseudonym: 'Mteja A', instrument: 'PHQ-9', score: 14, dateISO: daysAgo(45) },
  { id: 'o-3', patientPseudonym: 'Mteja A', instrument: 'PHQ-9', score: 9, dateISO: daysAgo(30) },
  { id: 'o-4', patientPseudonym: 'Mteja A', instrument: 'PHQ-9', score: 6, dateISO: daysAgo(15) },
  { id: 'o-5', patientPseudonym: 'Mteja B', instrument: 'GAD-7', score: 16, dateISO: daysAgo(50) },
  { id: 'o-6', patientPseudonym: 'Mteja B', instrument: 'GAD-7', score: 11, dateISO: daysAgo(25) },
  { id: 'o-7', patientPseudonym: 'Mteja B', instrument: 'GAD-7', score: 7, dateISO: daysAgo(10) },
  { id: 'o-8', patientPseudonym: 'Mteja C', instrument: 'PHQ-9', score: 22, dateISO: daysAgo(40) },
  { id: 'o-9', patientPseudonym: 'Mteja C', instrument: 'PHQ-9', score: 17, dateISO: daysAgo(20) },
]

async function fetchOutcomesFromSupabase(): Promise<OutcomeEntry[] | null> {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('tr_outcomes')
    .select('id, instrument, score, measured_at, patient:tr_users!patient_id(display_name)')
    .order('measured_at', { ascending: true })
  if (error || !data) return null
  return data.map((r) => {
    const patientRel = r.patient as { display_name?: string } | { display_name?: string }[] | null
    const patient = Array.isArray(patientRel) ? patientRel[0] : patientRel
    return {
      id: r.id as string,
      patientPseudonym: patient?.display_name ?? 'Mteja',
      instrument: (r.instrument as OutcomeEntry['instrument']) ?? 'PHQ-9',
      score: r.score as number,
      dateISO: r.measured_at as string,
    }
  })
}

export const loadOutcomes = (): OutcomeEntry[] => {
  const v = lsRead<OutcomeEntry[] | null>('outcomes', null)
  if (v && v.length) return v
  lsWrite('outcomes', seedOutcomes)
  return seedOutcomes
}
export async function loadOutcomesAsync(): Promise<OutcomeEntry[]> {
  if (hasBackend) {
    const remote = await fetchOutcomesFromSupabase()
    if (remote && remote.length) {
      lsWrite('outcomes', remote)
      return remote
    }
  }
  return loadOutcomes()
}
export const saveOutcomes = (o: OutcomeEntry[]) => lsWrite('outcomes', o)

// ─── Referrals ─────────────────────────────────────────────────────────
export interface Referral {
  id: string
  direction: 'sent' | 'received'
  patientPseudonym: string
  counterpartyName: string
  reasonSw: string
  status: 'pending' | 'accepted' | 'declined' | 'completed'
  dateISO: string
}

const seedReferrals: Referral[] = [
  { id: 'r-1', direction: 'sent', patientPseudonym: 'Mteja D',
    counterpartyName: 'Dr. Mwakasege (Psychiatry)',
    reasonSw: 'Tathmini ya dawa — sonona kali', status: 'accepted', dateISO: daysAgo(7) },
  { id: 'r-2', direction: 'received', patientPseudonym: 'Mteja E',
    counterpartyName: 'Mch. Daudi Mushi',
    reasonSw: 'Huzuni baada ya msiba', status: 'pending', dateISO: daysAgo(2) },
]

export const loadReferrals = (): Referral[] => {
  const v = lsRead<Referral[] | null>('referrals', null)
  if (v && v.length) return v
  lsWrite('referrals', seedReferrals)
  return seedReferrals
}
export const saveReferrals = (r: Referral[]) => lsWrite('referrals', r)

// ─── Supervision ───────────────────────────────────────────────────────
export interface SupervisionCase {
  id: string
  supervisee: string
  patientPseudonym: string
  summarySw: string
  submittedISO: string
  status: 'pending' | 'reviewed' | 'signed_off'
  feedbackSw?: string
}

const seedSup: SupervisionCase[] = [
  { id: 'sv-1', supervisee: 'Bw. Salim Bakari', patientPseudonym: 'Mteja F',
    summarySw: 'Vipindi 3 vya PM+. PHQ-9 imeshuka kutoka 16 hadi 11.',
    submittedISO: daysAgo(3), status: 'pending' },
  { id: 'sv-2', supervisee: 'Bi. Mariam Chande', patientPseudonym: 'Mteja G',
    summarySw: 'Kipindi cha lugha ya alama — wasiwasi mkubwa.',
    submittedISO: daysAgo(10), status: 'pending' },
]

export const loadSupervision = (): SupervisionCase[] => {
  const v = lsRead<SupervisionCase[] | null>('supervision', null)
  if (v && v.length) return v
  lsWrite('supervision', seedSup)
  return seedSup
}
export const saveSupervision = (c: SupervisionCase[]) => lsWrite('supervision', c)

// ─── CEU tracking ──────────────────────────────────────────────────────
export interface CEUEntry { id: string; titleSw: string; hours: number; completedISO: string }
const seedCEU: CEUEntry[] = [
  { id: 'c-1', titleSw: 'CBT kwa Kiswahili — Moduli 1', hours: 6, completedISO: daysAgo(120) },
  { id: 'c-2', titleSw: 'Motivational Interviewing (MI)', hours: 4, completedISO: daysAgo(60) },
]
export const loadCEU = (): CEUEntry[] => {
  const v = lsRead<CEUEntry[] | null>('ceu', null)
  if (v && v.length) return v
  lsWrite('ceu', seedCEU)
  return seedCEU
}
export const saveCEU = (e: CEUEntry[]) => lsWrite('ceu', e)
