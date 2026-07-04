import { useState } from 'react'
import { JEWEL, RADII, TYPE, TEXT, CREAM, hexToRgba } from '../../../lib/glass'
import { Card, H1, buttonStyle } from '../components/Card'
import { useLang } from '../../../lib/i18n/Provider'

interface AssessmentResult {
  instrument: string
  score: number
  band: string
  dateISO: string
}

const SEED_RESULTS: AssessmentResult[] = [
  { instrument: 'PHQ-9', score: 14, band: 'Moderate depression', dateISO: '2026-06-12' },
  { instrument: 'GAD-7', score: 11, band: 'Moderate anxiety', dateISO: '2026-06-12' },
  { instrument: 'C-SSRS', score: 0, band: 'No current risk', dateISO: '2026-06-12' },
]

const SEED_PRESENTING = [
  'Reports a loss of interest in work since last month.',
  'Sleep is disturbed — falls asleep around 9pm but wakes at 3am.',
  'No alcohol or cannabis use.',
]

export default function Intake() {
  const { t } = useLang()
  const [pseudonym] = useState('Client A')
  const [brief, setBrief] = useState(
    'Female client, 32, teacher. Seeking support after suicidal thoughts two weeks ago.\n\n' +
      'Assessments indicate moderate depression and moderate anxiety. No current suicide risk.\n\n' +
      'No prior mental-health history. No current medication.',
  )

  return (
    <div>
      <H1 english="Intake">{t('wataalam.intake.title', 'Mapokezi ya')} {pseudonym}</H1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <Card title={t('wataalam.intake.assessment_results', 'Matokeo ya tathmini')}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
            {SEED_RESULTS.map((r) => (
              <li
                key={r.instrument}
                style={{
                  padding: 12,
                  borderRadius: RADII.card,
                  background: 'rgba(250,245,229,0.85)',
                  border: '1px solid rgba(11,9,8,0.10)',
                  color: TEXT.body,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontFamily: TYPE.serif,
                  }}
                >
                  <span>{r.instrument}</span>
                  <span style={{ fontWeight: 600 }}>{r.score}</span>
                </div>
                <div style={{ fontSize: 12, color: TEXT.muted, marginTop: 2 }}>{r.band}</div>
                <div style={{ fontSize: 11, color: TEXT.hint, marginTop: 2 }}>{r.dateISO}</div>
              </li>
            ))}
          </ul>
        </Card>

        <Card title={t('wataalam.intake.presenting', 'Malalamiko ya kuanzia')}>
          <ul style={{ margin: 0, paddingLeft: 18, display: 'grid', gap: 6 }}>
            {SEED_PRESENTING.map((p, i) => (
              <li key={i} style={{ fontFamily: TYPE.serif, lineHeight: 1.55 }}>
                {p}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card title={t('wataalam.intake.brief_card', 'Muhtasari wa kliniki — uliojazwa awali')} style={{ marginTop: 14 }}>
        <textarea
          value={brief}
          onChange={(e) => setBrief(e.target.value)}
          rows={10}
          style={{
            width: '100%',
            background: CREAM.milk,
            color: TEXT.body,
            border: '1px solid rgba(11,9,8,0.22)',
            borderRadius: RADII.card,
            padding: 12,
            fontFamily: TYPE.serif,
            fontSize: 14,
            lineHeight: 1.55,
            resize: 'vertical',
            outline: 'none',
          }}
        />
        <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
          <button style={buttonStyle(JEWEL.goldHope, true)}>{t('wataalam.intake.save_brief', 'Hifadhi muhtasari')}</button>
          <button style={buttonStyle(JEWEL.indigoWisdom)}>{t('wataalam.intake.send_notes', 'Tuma kwenye Kumbukumbu →')}</button>
        </div>
      </Card>
    </div>
  )
}
