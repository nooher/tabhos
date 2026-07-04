/**
 * ArchitectureBadge — retired from the product surface.
 *
 * This previously rendered an "Arkitekti · ⓘ" chip on module heroes that
 * opened a panel exposing sub-engines, tech stack, EBM citations and mock
 * SQL / FHIR / routing source. That is investor-demo material — a real
 * patient-facing clinical platform never shows users its own architecture.
 * Kept as a no-op so existing call sites compile unchanged; the badge simply
 * no longer appears anywhere in the product.
 */
export function ArchitectureBadge(_props: { moduleSlug: string }): null {
  return null
}

export default ArchitectureBadge
