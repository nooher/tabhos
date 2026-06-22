import { Link } from 'react-router-dom'
import { JEWEL } from '../lib/glass'
import { useLang } from '../lib/i18n/Provider'

export default function NotFound() {
  const { t } = useLang()
  return (
    <main className="container fade-in" style={{ padding: '120px 24px', textAlign: 'center' }}>
      <h1
        style={{
          fontFamily: "'Tinos', Georgia, serif",
          fontSize: 72,
          letterSpacing: '-0.6px',
          color: JEWEL.cream,
          margin: 0,
        }}
      >
        {t('notfound.title', 'Hatuipati')}
      </h1>
      <p style={{ marginTop: 12, color: 'rgba(244,234,201,0.75)' }}>
        {t('notfound.body', 'Ukurasa huu haupo. Rudi nyumbani uendelee.')}
      </p>
      <Link
        to="/"
        style={{
          display: 'inline-block',
          marginTop: 28,
          padding: '10px 22px',
          borderRadius: 999,
          background: JEWEL.goldHope,
          color: JEWEL.tealDeep,
          fontWeight: 700,
        }}
      >
        {t('notfound.home', 'Nyumbani')}
      </Link>
    </main>
  )
}
