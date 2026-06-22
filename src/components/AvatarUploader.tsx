/**
 * AvatarUploader — picks a file, uploads to storage://avatars/<auth.uid()>/profile.png,
 * and emits the public URL.
 *
 * Bucket is public-read; write policy restricts to the owning uid.
 */
import { useEffect, useRef, useState } from 'react'
import { hasBackend, supabase } from '../lib/supabase'
import { useLang } from '../lib/i18n/Provider'
import { BRAND, CREAM, NEUTRAL, TEXT, hexToRgba } from '../lib/glass'

interface Props {
  initialUrl?: string
  initials?: string
  size?: number
  onUploaded?: (publicUrl: string) => void
}

export function AvatarUploader({ initialUrl, initials = '?', size = 96, onUploaded }: Props) {
  const { t } = useLang()
  const inputRef = useRef<HTMLInputElement>(null)
  const [url, setUrl] = useState<string | undefined>(initialUrl)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => { setUrl(initialUrl) }, [initialUrl])

  const pick = () => { inputRef.current?.click() }

  const upload = async (file: File): Promise<void> => {
    setErr(null)
    if (!hasBackend || !supabase) {
      setErr(t('avatar.no_backend', 'Backend bado haijasanidiwa'))
      return
    }
    setBusy(true)
    try {
      const { data: auth } = await supabase.auth.getUser()
      const uid = auth.user?.id
      if (!uid) { setErr(t('avatar.sign_in', 'Ingia kwanza')); return }
      const ext = file.name.split('.').pop()?.toLowerCase() === 'jpg' ? 'jpg'
                : file.name.split('.').pop()?.toLowerCase() === 'webp' ? 'webp'
                : 'png'
      const path = `${uid}/profile.${ext}`
      const up = await supabase.storage.from('avatars').upload(path, file, {
        upsert: true,
        contentType: file.type || `image/${ext}`,
        cacheControl: '3600',
      })
      if (up.error) throw up.error
      const { data: pub } = supabase.storage.from('avatars').getPublicUrl(path)
      const cacheBust = `${pub.publicUrl}?t=${Date.now()}`
      setUrl(cacheBust)
      onUploaded?.(cacheBust)
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e))
    } finally {
      setBusy(false)
    }
  }

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) void upload(f)
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <button
        type="button"
        onClick={pick}
        aria-label={t('avatar.pick_aria', 'Chagua picha mpya')}
        style={{
          width: size, height: size, borderRadius: 999, padding: 0,
          background: url ? CREAM.milk : hexToRgba(BRAND.green, 0.18),
          border: `1px solid ${hexToRgba(NEUTRAL.ink, 0.18)}`,
          overflow: 'hidden', cursor: 'pointer', position: 'relative',
          display: 'grid', placeItems: 'center',
        }}
      >
        {url ? (
          <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <span style={{ fontSize: size * 0.32, fontWeight: 800, color: BRAND.green, letterSpacing: '-0.02em' }}>
            {initials}
          </span>
        )}
        {busy && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(0,0,0,0.45)', color: '#fff',
            display: 'grid', placeItems: 'center', fontSize: 11, fontWeight: 700,
          }}>{t('avatar.uploading', 'Inapakia…')}</div>
        )}
      </button>
      <div>
        <button type="button" onClick={pick}
          style={{
            padding: '8px 14px', borderRadius: 999, background: BRAND.green, color: CREAM.milk,
            border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer',
          }}>
          {url ? t('avatar.replace', 'Badilisha picha') : t('avatar.choose', 'Pakia picha')}
        </button>
        {err && <div role="alert" style={{ marginTop: 6, fontSize: 12, color: '#8C2222' }}>{err}</div>}
        <div style={{ marginTop: 4, fontSize: 11, color: TEXT.hint }}>
          {t('avatar.hint', 'JPG/PNG/WebP · 5 MB max · square 512×512+ inashauriwa')}
        </div>
      </div>
      <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/webp" onChange={onFile} hidden />
    </div>
  )
}
