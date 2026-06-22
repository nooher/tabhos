/**
 * Audience — the working identity of the user as it affects nav + module
 * visibility. Drawn from the persona-picker (demo mode) or from
 * tr_users.role (real account). Not the same as `Role` in db.ts — that's
 * a permissions value; this is a UX bucket.
 *
 * Default audience is 'patient' when no signal is available.
 */
import { useEffect, useState } from 'react'
import { getMeRole } from './me'
import { usePersona, type PersonaId } from './personas'

export type Audience =
  | 'patient'
  | 'provider'
  | 'admin'
  | 'researcher'
  | 'school'
  | 'employer'

const PERSONA_AUDIENCE: Record<PersonaId, Audience> = {
  maria:     'patient',
  asha:      'provider',
  salima:    'provider',
  kalumuna:  'employer',
  komba:     'school',
  mtumbe:    'researcher',
  ps_health: 'admin',
  nooher:    'admin',
  baloh:     'researcher',
  mpya:      'patient',
}

function roleToAudience(role: string | null | undefined): Audience {
  switch (role) {
    case 'provider':   return 'provider'
    case 'admin':      return 'admin'
    case 'researcher': return 'researcher'
    case 'school':     return 'school'
    case 'employer':   return 'employer'
    default:           return 'patient'
  }
}

/**
 * Resolve the current user's audience. Persona wins (demo flow), then
 * tr_users.role from Supabase, then default 'patient'.
 */
export function useAudience(): Audience {
  const persona = usePersona()
  const [audience, setAudience] = useState<Audience>(() =>
    persona ? PERSONA_AUDIENCE[persona.id] : 'patient'
  )

  useEffect(() => {
    if (persona) {
      setAudience(PERSONA_AUDIENCE[persona.id])
      return
    }
    let cancelled = false
    void (async () => {
      const role = await getMeRole()
      if (!cancelled) setAudience(roleToAudience(role))
    })()
    return () => { cancelled = true }
  }, [persona])

  return audience
}

/**
 * Module → audiences that should see it. 'all' = every audience.
 *
 * Primary nav (top bar) is computed by `primaryModulesFor(audience)`;
 * everything else lives on the Landing grid for click-through.
 */
const MODULE_AUDIENCES: Record<string, readonly Audience[] | 'all'> = {
  mimi:        ['patient', 'provider'],
  roho:        'all',
  rafiki:      'all',
  wataalam:    ['provider', 'admin'],
  gundua:      ['patient'],
  huduma:      'all',
  miradi:     ['patient', 'provider'],
  maalum:     ['patient', 'provider', 'admin'],
  shuleplus:  ['school', 'admin'],
  wafanyakazi:['employer', 'admin'],
  mashirika:  ['admin'],
  utafiti:    ['researcher', 'admin'],
  sera:       ['admin'],
  pumzi:      'all',
  ndani:      ['admin'],
}

/**
 * Top-of-bar primary nav per audience. Capped at ~5 to stay focused.
 * `roho` is included as the AI companion. Other modules remain reachable
 * via the landing grid + URL.
 */
const PRIMARY_MODULES: Record<Audience, readonly string[]> = {
  patient:    ['mimi',     'roho', 'gundua',  'pumzi',     'huduma'],
  provider:   ['wataalam', 'roho', 'miradi',  'mimi',      'huduma'],
  admin:      ['ndani',    'roho', 'sera',    'mashirika', 'utafiti'],
  researcher: ['utafiti',  'roho', 'mimi',    'huduma',    'sera'],
  school:     ['shuleplus','roho', 'huduma',  'pumzi',     'gundua'],
  employer:   ['wafanyakazi','roho','huduma', 'pumzi',     'gundua'],
}

export function visibleModuleSlugs(audience: Audience): Set<string> {
  const set = new Set<string>()
  for (const [slug, aud] of Object.entries(MODULE_AUDIENCES)) {
    if (aud === 'all') { set.add(slug); continue }
    if (aud.includes(audience)) set.add(slug)
  }
  return set
}

export function primaryModulesFor(audience: Audience): readonly string[] {
  return PRIMARY_MODULES[audience]
}

export function isModuleVisible(slug: string, audience: Audience): boolean {
  const aud = MODULE_AUDIENCES[slug]
  if (!aud) return true   // unknown slug → render (don't hide)
  if (aud === 'all') return true
  return aud.includes(audience)
}
