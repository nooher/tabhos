import { useEffect, useState } from 'react'

/**
 * EntranceBrain — the sign-in centerpiece for TABHOS.
 *
 * Restrained and clinical: the behavioral-health mark sits still inside a
 * single quiet concentric frame with a soft breath. No orbiting balls, no
 * pulsing multi-colour rings — this is a national health platform entrance,
 * not a consumer wellness splash.
 */
export default function EntranceBrain({ size = 260 }: { size?: number }) {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])

  const FRAME = Math.round(size * 1.7)
  const cx = FRAME / 2

  return (
    <div
      data-eb
      aria-hidden
      style={{ position: 'relative', width: FRAME, height: FRAME, display: 'grid', placeItems: 'center' }}
    >
      {/* Two quiet static concentric rings — a clinical frame, not decoration. */}
      <svg
        viewBox={`0 0 ${FRAME} ${FRAME}`} width={FRAME} height={FRAME}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} aria-hidden
      >
        <circle cx={cx} cy={cx} r={size * 0.72} fill="none" stroke="rgba(11,9,8,0.06)" strokeWidth={1} />
        <circle cx={cx} cy={cx} r={size * 0.60} fill="none" stroke="rgba(11,9,8,0.05)" strokeWidth={1} />
      </svg>

      {/* Mark — still, with a soft breath only (no busy motion). */}
      <div
        style={{
          width: size, height: size, display: 'grid', placeItems: 'center',
          animation: reduced ? 'none' : 'eb-breath 5.2s ease-in-out infinite',
          willChange: 'transform', position: 'relative', zIndex: 2,
        }}
      >
        <img
          src="/brand/rafiki.png"
          width={size} height={size}
          alt=""
          draggable={false}
          style={{
            display: 'block', width: size, height: size, objectFit: 'contain',
            userSelect: 'none', pointerEvents: 'none',
            filter: 'drop-shadow(0 14px 30px rgba(11,9,8,0.16))',
          }}
        />
      </div>

      <style>{`
        @keyframes eb-breath {
          0%,100% { transform: scale(1.000); }
          50%     { transform: scale(1.018); }
        }
      `}</style>
    </div>
  )
}
