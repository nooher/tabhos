import { Link } from 'react-router-dom'
import { BRAND, CREAM, NEUTRAL, RADII, TEXT, TYPE, hexToRgba, glass } from '../../../lib/glass'
import { useLang } from '../../../lib/i18n/Provider'

export default function Press() {
  const { t } = useLang()
  return (
    <main
      className="fade-in"
      style={{ background: CREAM.milk, minHeight: '100vh', paddingTop: 48, paddingBottom: 80 }}
    >
      <section className="container" style={{ maxWidth: 760 }}>
        <Link
          to="/welcome"
          style={{ color: BRAND.green, fontSize: 13, textDecoration: 'none' }}
        >
          &larr; {t('press.back', 'Rudi kwa Welcome')}
        </Link>
        <h1
          style={{
            fontFamily: TYPE.serif,
            fontSize: 'clamp(40px, 6vw, 64px)',
            color: BRAND.creamOrange,
            margin: '12px 0 8px',
            letterSpacing: TYPE.tighterTrack,
          }}
        >
          Press kit
        </h1>
        <p style={{ fontSize: 16, lineHeight: TYPE.bodyLeading, color: TEXT.body }}>
          {t('press.intro', 'Logos, screenshots, na bio za mwanzilishi kwa wandishi wa habari na watayarishi wa hadithi. Pakua faili zilizo tayari hapa chini.')}
        </p>

        <div style={{ display: 'grid', gap: 14, marginTop: 28 }}>
          <a
            href="/press/tumaini-press-kit.zip"
            download
            style={{
              ...glass(BRAND.blue, 0.06),
              padding: '18px 22px',
              borderRadius: RADII.card,
              textDecoration: 'none',
              color: NEUTRAL.ink,
            }}
          >
            <strong style={{ fontFamily: TYPE.serif, fontSize: 18 }}>
              {t('press.kit-title', 'Pakua Press Kit (.zip)')}
            </strong>
            <div style={{ fontSize: 13, color: TEXT.muted }}>
              Logos PNG/SVG, screenshots, fonts &middot; ~12&nbsp;MB
            </div>
          </a>
          <a
            href="/press/founder-bio.pdf"
            download
            style={{
              ...glass(BRAND.green, 0.06),
              padding: '18px 22px',
              borderRadius: RADII.card,
              textDecoration: 'none',
              color: NEUTRAL.ink,
            }}
          >
            <strong style={{ fontFamily: TYPE.serif, fontSize: 18 }}>
              {t('press.bio-title', 'Bio ya Mwanzilishi (PDF)')}
            </strong>
            <div style={{ fontSize: 13, color: TEXT.muted }}>
              Dr. Ally A. Nooher &middot; {t('press.bio-pages', 'ukurasa 2')}
            </div>
          </a>
        </div>
      </section>
    </main>
  )
}
