#!/usr/bin/env node
/**
 * Every instrument a population page advertises exists.
 *
 * ── Why this exists ──────────────────────────────────────────────────────
 *
 * `/maalum/uponyaji`, the addiction recovery page, listed five assessments and
 * one of them had never been built. ASSIST is the WHO's screen for substances
 * other than alcohol, it was named on the one page where that screen is the
 * whole point, and the library held six instruments without it. AUDIT covers
 * alcohol and CRAFFT covers adolescents, so an adult using heroin, bangi or
 * mirungi had nothing at all — on the page that names the four methadone
 * clinics.
 *
 * Nobody had lied. A page listed what it ought to offer, the library grew
 * separately, and no code connected the two, so the claim and the capability
 * drifted quietly for as long as the files existed.
 *
 * Measured on 14 October 2026: fourteen distinct assessments advertised across
 * fifteen population pages, and nine of them not in the library. ASSIST was
 * built the same day. The other eight are named in the ceiling below, which
 * may only fall.
 *
 * ── What it reads ────────────────────────────────────────────────────────
 *
 * The `assessments` arrays in `src/modules/maalum/index.tsx`, which is what a
 * reader of those pages is promised, against the instrument ids the library
 * declares: the union type in `karibu/lib/instruments.ts` plus any instrument
 * with a module of its own, which ASSIST has because its shape is per
 * substance rather than a flat list with one total.
 *
 * Names are matched loosely — case, hyphens, spaces and a parenthetical are
 * ignored — because a page writes "EPDS (kwa mama)" and the library writes
 * `epds`, and failing a gate over a bracket teaches people to switch gates
 * off.
 *
 * Usage: node tools/check-assessments.mjs
 */
import { readFileSync } from 'node:fs'

const PAGES = 'src/modules/maalum/index.tsx'
const LIBRARY = 'src/modules/karibu/lib/instruments.ts'
const CEILING = 'docs/assessments.expected.json'

let failed = false
const fail = (m) => { console.error('FAIL  ' + m); failed = true }

/* ── What the library actually holds ─────────────────────────────────────── */
const lib = readFileSync(LIBRARY, 'utf8')
const union = /id:\s*((?:'[a-z0-9]+'\s*\|\s*)*'[a-z0-9]+');/.exec(lib)
if (!union) {
  fail(`${LIBRARY} no longer declares its instrument ids as a union type. Update this gate with the file.`)
  process.exit(1)
}
const built = new Set([...union[1].matchAll(/'([a-z0-9]+)'/g)].map((m) => m[1]))

/*
 * Instruments with a module of their own rather than a row in that union.
 * ASSIST is the first: eight questions about each of ten substance classes,
 * scored per class, which the flat `Instrument` shape cannot express.
 */
const OWN_MODULE = [
  { id: 'assist', file: 'src/modules/karibu/lib/assist.ts', token: 'ASSIST_QUESTIONS' },
]
for (const own of OWN_MODULE) {
  let src = ''
  try { src = readFileSync(own.file, 'utf8') } catch { /* missing */ }
  if (!src.includes(own.token)) {
    fail(`${own.id} is counted as built because ${own.file} should define ${own.token}, and it does not.`)
    continue
  }
  built.add(own.id)
}

/* ── What the pages promise ──────────────────────────────────────────────── */
const pages = readFileSync(PAGES, 'utf8')
const promised = new Map()
for (const [, slug, list] of pages.matchAll(
  /slug: '([a-z0-9-]+)',[\s\S]{0,800}?assessments: \[([^\]]*)\]/g,
)) {
  for (const [, name] of list.matchAll(/'([^']+)'/g)) {
    if (!promised.has(name)) promised.set(name, [])
    promised.get(name).push(slug)
  }
}

if (promised.size === 0) {
  fail(`no assessments array found in ${PAGES}. Either the pages stopped promising anything, or this gate stopped reading them.`)
  process.exit(1)
}

/* A page writes "GDS-15 (Geriatric Depression Scale)" and the library writes
   `gds15`. Compare on letters and digits alone, and ignore a parenthetical. */
const norm = (s) => s.replace(/\(.*?\)/g, '').toLowerCase().replace(/[^a-z0-9]/g, '')
const builtNorm = new Set([...built].map(norm))

const owed = [...promised.entries()]
  .filter(([name]) => !builtNorm.has(norm(name)))
  .map(([name, slugs]) => `${name}  ·  ${[...new Set(slugs)].sort().join(', ')}`)
  .sort()

/* ── Against the ceiling ─────────────────────────────────────────────────── */
let ceiling
try {
  ceiling = JSON.parse(readFileSync(CEILING, 'utf8'))
} catch {
  fail(`${CEILING} is missing. It names every advertised instrument that is not built, and the count may only fall.`)
  process.exit(1)
}

if (process.argv.includes('--write')) {
  ceiling.owed = owed
  ceiling.generated = new Date().toISOString().slice(0, 10)
  const { writeFileSync } = await import('node:fs')
  writeFileSync(CEILING, `${JSON.stringify(ceiling, null, 2)}\n`)
  console.log(`check-assessments: wrote ${owed.length} owed instrument(s) to ${CEILING}.`)
  process.exit(0)
}

const known = new Set(ceiling.owed.map((row) => row.split('  ·  ')[0]))
const fresh = owed.filter((row) => !known.has(row.split('  ·  ')[0]))

if (fresh.length > 0 || owed.length > ceiling.owed.length) {
  fail(
    `${owed.length} advertised instrument(s) are not built, against ${ceiling.owed.length} named in ${CEILING}.`,
  )
  for (const row of fresh) console.error(`  new: ${row}`)
  console.error(
    '\nBuild the instrument, or stop advertising it on that page. A page that names a\n'
    + 'screen the library does not have is a promise to somebody who came looking for it,\n'
    + 'and `--write` is the only way the list is edited so a new one shows up by name.',
  )
}

for (const row of ceiling.owed) {
  const name = row.split('  ·  ')[0]
  if (!owed.some((o) => o.split('  ·  ')[0] === name)) {
    fail(`${name} is in ${CEILING} as unbuilt, and it is built now or no page advertises it. Remove the row and lower the count.`)
  }
}

if (!failed) {
  console.log(
    `check-assessments: ${promised.size} instrument(s) advertised across the population pages, `
    + `${promised.size - owed.length} built, ${owed.length} owed at the ceiling in ${CEILING}.`,
  )
}
process.exit(failed ? 1 : 0)
