import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { BRAND, CREAM, NEUTRAL, RADII, TEXT, TYPE, hexToRgba } from '../lib/glass'
import { PROVIDERS, ALL_FOCUS, ALL_INSURERS, startingPrice, type Provider } from '../lib/providers'

/**
 * Find care — the public directory. Clients search and filter verified
 * behavioral-health providers across Tanzania; each card opens the provider's
 * shareable page. Client-facing, English-primary, executive; chromeless.
 */

const GREEN = BRAND.green
const ORANGE = BRAND.creamOrange
const INK = NEUTRAL.ink
const tzs = (n: number) => 'TZS ' + n.toLocaleString('en-US')
type Sort = 'rating' | 'price'

function Stars({ n }: { n: number }) {
  return <span aria-label={`${n} of 5`} style={{ color: ORANGE, fontSize: 12, letterSpacing: 0.5 }}>{'★★★★★'.slice(0, n)}<span style={{ color: hexToRgba(INK, 0.2) }}>{'★★★★★'.slice(n)}</span></span>
}

function ProviderCard({ p }: { p: Provider }) {
  const initials = p.name.split(' ').filter(Boolean).slice(0, 2).map((x) => x[0]).join('')
  return (
    <Link to={`/p/${p.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <article style={{ background: CREAM.milk, border: `1px solid ${hexToRgba(INK, 0.09)}`, borderRadius: RADII.card, padding: 18, height: '100%', display: 'flex', flexDirection: 'column', gap: 12, transition: 'transform .16s, border-color .16s' }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = hexToRgba(GREEN, 0.4) }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = hexToRgba(INK, 0.09) }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ width: 54, height: 54, borderRadius: 16, background: CREAM.ivory, border: `1px solid ${hexToRgba(INK, 0.1)}`, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
            <span style={{ fontFamily: TYPE.serif, fontSize: 20, fontWeight: 800, color: GREEN }}>{initials}</span>
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: TYPE.serif, fontSize: 16, fontWeight: 800, color: INK }}>{p.name}</span>
              {p.verified && <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: GREEN, background: hexToRgba(GREEN, 0.1), padding: '2px 6px', borderRadius: 999 }}>✓</span>}
            </div>
            <div style={{ fontSize: 12, color: TEXT.muted, marginTop: 1 }}>{p.credential}</div>
            <div style={{ fontSize: 11.5, color: TEXT.muted, marginTop: 3, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <span><Stars n={Math.round(p.rating)} /> <strong style={{ color: INK }}>{p.rating}</strong> ({p.reviewCount})</span>
              <span>· {p.location}</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {p.focus.slice(0, 3).map((f) => <span key={f} style={{ fontSize: 11, color: INK, background: CREAM.ivory, border: `1px solid ${hexToRgba(INK, 0.09)}`, padding: '4px 9px', borderRadius: 999 }}>{f}</span>)}
          {p.focus.length > 3 && <span style={{ fontSize: 11, color: TEXT.muted, alignSelf: 'center' }}>+{p.focus.length - 3}</span>}
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 8, paddingTop: 4 }}>
          <div>
            <div style={{ fontSize: 11, color: TEXT.muted }}>from</div>
            <div style={{ fontFamily: TYPE.serif, fontWeight: 800, color: INK, fontSize: 15 }}>{tzs(startingPrice(p))}</div>
            <div style={{ fontSize: 10.5, color: TEXT.muted, marginTop: 2 }}>{p.telehealth ? 'Video & in person' : 'In person'} · {p.insurers.slice(0, 2).join(', ')}{p.insurers.length > 2 ? '…' : ''}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, color: GREEN, fontWeight: 700 }}>{p.nextSlots[0]}</div>
            <div style={{ fontSize: 12.5, color: GREEN, fontWeight: 800, marginTop: 6 }}>View profile →</div>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default function FindCare() {
  const [q, setQ] = useState('')
  const [focus, setFocus] = useState<string | null>(null)
  const [insurer, setInsurer] = useState('')
  const [sort, setSort] = useState<Sort>('rating')

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase()
    let list = PROVIDERS.filter((p) => {
      if (focus && !p.focus.includes(focus)) return false
      if (insurer && !p.insurers.includes(insurer)) return false
      if (needle) {
        const hay = (p.name + ' ' + p.credential + ' ' + p.clinic + ' ' + p.location + ' ' + p.focus.join(' ')).toLowerCase()
        if (!hay.includes(needle)) return false
      }
      return true
    })
    list = [...list].sort((a, b) => (sort === 'rating' ? b.rating - a.rating : startingPrice(a) - startingPrice(b)))
    return list
  }, [q, focus, insurer, sort])

  const input: React.CSSProperties = { padding: '10px 12px', borderRadius: 12, border: `1px solid ${hexToRgba(INK, 0.15)}`, background: CREAM.milk, color: INK, fontSize: 13.5, fontFamily: TYPE.sans, outline: 'none' }

  return (
    <main style={{ minHeight: '100vh', background: CREAM.paper ?? '#FAF5E5', color: TEXT.body, fontFamily: TYPE.sans, paddingBottom: 64 }}>
      <div style={{ background: `linear-gradient(120deg, ${GREEN} 0%, ${hexToRgba(GREEN, 0.82)} 100%)`, color: CREAM.cream, padding: '40px 20px 30px' }}>
        <div style={{ maxWidth: 1040, margin: '0 auto' }}>
          <div style={{ fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.85, fontWeight: 700 }}>TABHOS · Find care</div>
          <h1 style={{ margin: '8px 0 8px', fontFamily: TYPE.serif, fontSize: 'clamp(26px,4vw,38px)', fontWeight: 800, letterSpacing: '-0.5px' }}>Find mental-health care you can trust.</h1>
          <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, opacity: 0.92, maxWidth: 620 }}>Verified therapists, psychiatrists and counsellors across Tanzania — in person or by secure video, in English or Kiswahili, with insurance or cash.</p>
        </div>
      </div>

      <div style={{ maxWidth: 1040, margin: '0 auto', padding: '0 20px' }}>
        {/* Search + filters */}
        <div style={{ background: CREAM.milk, border: `1px solid ${hexToRgba(INK, 0.09)}`, borderRadius: RADII.card, padding: 16, marginTop: -22, boxShadow: '0 8px 24px rgba(11,9,8,0.08)', display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name, concern or place…" aria-label="Search providers" style={{ ...input, flex: 1, minWidth: 200 }} />
          <select value={insurer} onChange={(e) => setInsurer(e.target.value)} aria-label="Insurance" style={input}>
            <option value="">Any insurance</option>
            {ALL_INSURERS.map((x) => <option key={x} value={x}>{x}</option>)}
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} aria-label="Sort" style={input}>
            <option value="rating">Top rated</option>
            <option value="price">Lowest price</option>
          </select>
        </div>

        {/* Focus chips */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 16 }}>
          <button onClick={() => setFocus(null)} style={chip(!focus)}>All concerns</button>
          {ALL_FOCUS.map((f) => <button key={f} onClick={() => setFocus(focus === f ? null : f)} style={chip(focus === f)}>{f}</button>)}
        </div>

        <div style={{ fontSize: 12.5, color: TEXT.muted, margin: '18px 0 12px' }}>{results.length} provider{results.length === 1 ? '' : 's'}{focus ? ` for ${focus}` : ''}</div>

        {results.length === 0 ? (
          <div style={{ background: CREAM.milk, border: `1px dashed ${hexToRgba(INK, 0.2)}`, borderRadius: RADII.card, padding: '40px 20px', textAlign: 'center', color: TEXT.muted }}>
            No providers match yet. Try clearing a filter — or <Link to="/sajili-kama-mtaalam" style={{ color: GREEN, fontWeight: 700 }}>join as a provider</Link>.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
            {results.map((p) => <ProviderCard key={p.slug} p={p} />)}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: 30, fontSize: 12.5, color: TEXT.muted }}>
          Are you a practitioner? <Link to="/sajili-kama-mtaalam" style={{ color: GREEN, fontWeight: 700 }}>Set up your practice on TABHOS →</Link>
        </div>
      </div>
    </main>
  )
}

function chip(active: boolean): React.CSSProperties {
  return {
    fontSize: 12, fontWeight: 700, padding: '7px 13px', borderRadius: 999, cursor: 'pointer',
    background: active ? GREEN : CREAM.milk, color: active ? CREAM.cream : INK,
    border: `1px solid ${active ? GREEN : hexToRgba(INK, 0.12)}`, fontFamily: TYPE.sans,
  }
}
