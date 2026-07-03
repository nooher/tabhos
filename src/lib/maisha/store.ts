/**
 * TABHOS · Maisha — local-first store (offline, no backend required).
 *
 * Faithful to THOSPamoja's SQLite model, reimplemented on localStorage so the
 * recovery + livelihood loop works entirely offline: complete lessons + quizzes,
 * keep a daily stability check-in, and the badge ladder auto-awards; badge level
 * gates the livelihood starter kits.
 */
import { BADGES, LESSONS, type BadgeReq } from './data'

const KEY = 'tabhos.maisha.v1'

export interface LessonProg { completed: boolean; score: number; attempts: number; at?: string }
export interface Enrollment { program_id: string; started_at: string; current_milestone_index: number; status: 'active' | 'paused' | 'completed' }
export interface Checkin { date: string; stable: boolean; craving: number; note?: string }

interface State {
  lessons: Record<string, LessonProg>
  enrollments: Record<string, Enrollment>
  badges: number[]            // earned levels
  checkins: Checkin[]         // daily stability log
  reflections: number         // count of reflection notes written
}

const empty: State = { lessons: {}, enrollments: {}, badges: [], checkins: [], reflections: 0 }

function read(): State {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { ...empty }
    return { ...empty, ...(JSON.parse(raw) as State) }
  } catch {
    return { ...empty }
  }
}
function write(s: State) {
  try { localStorage.setItem(KEY, JSON.stringify(s)) } catch { /* noop */ }
}
const todayIso = () => new Date().toISOString().slice(0, 10)

export function getState(): State { return read() }

// ── Lessons + quiz ───────────────────────────────────────────────────────────
export function completeLesson(id: string, score: number): number[] {
  const s = read()
  const prev = s.lessons[id] || { completed: false, score: 0, attempts: 0 }
  const passed = score >= 70
  s.lessons[id] = { completed: prev.completed || passed, score: Math.max(prev.score, score), attempts: prev.attempts + 1, at: passed ? todayIso() : prev.at }
  write(s)
  return award()
}

// ── Programme enrollment ─────────────────────────────────────────────────────
export function enroll(program_id: string) {
  const s = read()
  if (!s.enrollments[program_id]) {
    s.enrollments[program_id] = { program_id, started_at: todayIso(), current_milestone_index: 0, status: 'active' }
    write(s)
  }
}
export function advanceMilestone(program_id: string, total: number) {
  const s = read()
  const e = s.enrollments[program_id]
  if (!e) return
  e.current_milestone_index = Math.min(e.current_milestone_index + 1, total)
  if (e.current_milestone_index >= total) e.status = 'completed'
  write(s)
}
export function unenroll(program_id: string) {
  const s = read(); delete s.enrollments[program_id]; write(s)
}

// ── Daily stability check-in ─────────────────────────────────────────────────
export function checkIn(stable: boolean, craving: number, note?: string): number[] {
  const s = read()
  const today = todayIso()
  const existing = s.checkins.find((c) => c.date === today)
  if (existing) { existing.stable = stable; existing.craving = craving; existing.note = note }
  else s.checkins.push({ date: today, stable, craving, note })
  if (note && note.trim()) s.reflections += 1
  write(s)
  return award()
}

// ── Stats + streaks (mirror THOSPamoja's mood-streak / no-relapse logic) ──────
function consecutiveFromToday(dates: string[]): number {
  const set = new Set(dates)
  let streak = 0
  const d = new Date()
  for (let i = 0; i < 400; i++) {
    const iso = new Date(d.getTime() - i * 86400000).toISOString().slice(0, 10)
    if (set.has(iso)) streak++
    else break
  }
  return streak
}

export interface Stats { lessonsCompleted: number; checkinStreak: number; reflections: number; stableDays: number }
export function stats(): Stats {
  const s = read()
  const lessonsCompleted = Object.values(s.lessons).filter((l) => l.completed).length
  const checkinStreak = consecutiveFromToday(s.checkins.map((c) => c.date))
  // stable day = checked in, marked stable, craving < 4 (THOSPamoja's no-relapse rule)
  const stableDates = s.checkins.filter((c) => c.stable && c.craving < 4).map((c) => c.date)
  const stableDays = consecutiveFromToday(stableDates)
  return { lessonsCompleted, checkinStreak, reflections: s.reflections, stableDays }
}

export function eligibility(b: BadgeReq, st: Stats): { eligible: boolean; missing: { key: string; current: number; target: number }[] } {
  const missing: { key: string; current: number; target: number }[] = []
  if (st.lessonsCompleted < b.lessons_required) missing.push({ key: 'lessons', current: st.lessonsCompleted, target: b.lessons_required })
  if (st.checkinStreak < b.checkin_streak_days) missing.push({ key: 'checkin', current: st.checkinStreak, target: b.checkin_streak_days })
  if (st.reflections < b.reflections) missing.push({ key: 'reflections', current: st.reflections, target: b.reflections })
  if (st.stableDays < b.stable_days) missing.push({ key: 'stable', current: st.stableDays, target: b.stable_days })
  return { eligible: missing.length === 0, missing }
}

/** Auto-award any newly-eligible badges; returns the newly-earned levels. */
export function award(): number[] {
  const s = read()
  const st = stats()
  const have = new Set(s.badges)
  const newly: number[] = []
  for (const b of BADGES) {
    if (have.has(b.level)) continue
    if (eligibility(b, st).eligible) { s.badges.push(b.level); newly.push(b.level) }
  }
  if (newly.length) write(s)
  return newly
}

export function earnedLevel(): number {
  const s = read()
  return s.badges.length ? Math.max(...s.badges) : 0
}

export const totalLessons = LESSONS.length
