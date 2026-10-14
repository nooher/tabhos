/**
 * Today's methadone dose, as the clinic gave it.
 *
 * ── What this records and what it refuses to do ──────────────────────────
 *
 * It records. The dose is typed in because the clinic set it; nothing here
 * suggests a number, offers a default above nought, or proposes an increase.
 * `lib/uraibu/matibabu.ts` opens with the reason and it is the one rule in
 * this product worth repeating out loud: methadone is the medicine where a
 * wrong number kills somebody who was getting better, and the first fortnight
 * of induction is when that happens.
 *
 * ── The missed day is the entry that matters ─────────────────────────────
 *
 * A tracker that only records success is a tracker people stop opening the
 * first week they slip. So missing is a first-class answer with a place to say
 * why, and the summary counts consecutive misses rather than a total, because
 * three in a row is the number with a clinical meaning: after three days
 * tolerance can no longer be assumed, and the dose that was safe last week can
 * be too much. The screen says so where somebody marks the third one, rather
 * than leaving it in a document.
 */
import { useState } from 'react';
import { Card, Chips, NumberField, TextField, SaveBar, useReading } from '../common';
import { loadReadings } from '../types';
import { useLang } from '../../../../lib/i18n/Provider';
import { JEWEL } from '../../../../lib/glass';
import { MAT_CENTRES } from '../../../../lib/uraibu/matibabu';
import type { MatReading } from './schema';

export default function Entry() {
  const { t, lang } = useLang();
  const sw = lang === 'sw';

  const [dose, setDose] = useState(0);
  const [taken, setTaken] = useState<'ndiyo' | 'hapana'>('ndiyo');
  const [why, setWhy] = useState('');
  const [place, setPlace] = useState<'kliniki' | 'nyumbani'>('kliniki');
  const [centre, setCentre] = useState<string>(MAT_CENTRES[0].id);
  const [craving, setCraving] = useState(0);
  const [note, setNote] = useState('');
  const save = useReading<MatReading>('mat');

  /* How many days have already been missed in a row, read before this entry is
     added, so the warning appears on the one that makes it three. */
  const priorRun = (() => {
    let run = 0;
    for (const r of loadReadings<MatReading>('mat')) { if (r.taken) break; run += 1; }
    return run;
  })();
  const wouldBeThird = taken === 'hapana' && priorRun >= 2;

  const submit = (): void => {
    save({
      dose_mg: dose,
      taken: taken === 'ndiyo',
      missed_why: taken === 'hapana' ? why : undefined,
      place,
      centre,
      craving,
      note,
    });
    setNote(''); setWhy('');
  };

  return (
    <Card>
      <h3 style={{ margin: '0 0 10px', fontFamily: 'Georgia, serif', fontSize: 20 }}>
        {t('mimi.mat.title', sw ? 'Methadone (MAT)' : 'Methadone (MAT)')}
      </h3>

      <Chips<'ndiyo' | 'hapana'>
        label={t('mimi.mat.taken', sw ? 'Umeichukua leo?' : 'Did you take it today?')}
        value={taken}
        options={[
          { v: 'ndiyo', label: t('mimi.mat.yes', sw ? 'Ndiyo' : 'Yes') },
          { v: 'hapana', label: t('mimi.mat.no', sw ? 'Hapana' : 'No') },
        ]}
        onChange={(v) => setTaken(v as 'ndiyo' | 'hapana')}
      />

      {taken === 'ndiyo' && (
        <>
          <NumberField
            label={t('mimi.mat.dose', sw ? 'Dozi kliniki ilikupa' : 'The dose the clinic gave you')}
            value={dose}
            onChange={setDose}
            unit="mg"
          />
          <Chips<'kliniki' | 'nyumbani'>
            label={t('mimi.mat.place', sw ? 'Wapi' : 'Where')}
            value={place}
            options={[
              { v: 'kliniki', label: t('mimi.mat.at-clinic', sw ? 'Kliniki' : 'At the clinic') },
              { v: 'nyumbani', label: t('mimi.mat.take-home', sw ? 'Dozi ya kubeba' : 'Take-home dose') },
            ]}
            onChange={(v) => setPlace(v as 'kliniki' | 'nyumbani')}
          />
          <Chips<string>
            label={t('mimi.mat.centre', sw ? 'Kituo' : 'Centre')}
            value={centre}
            options={MAT_CENTRES.map((c) => ({ v: c.id, label: sw ? c.name.sw : c.name.en }))}
            onChange={(v) => setCentre(v as string)}
          />
        </>
      )}

      {taken === 'hapana' && (
        <>
          <TextField
            label={t('mimi.mat.why', sw ? 'Kwa nini? (si lazima)' : 'Why not? (optional)')}
            value={why}
            onChange={setWhy}
            placeholder={sw ? 'nauli, kazi, nilikuwa mgonjwa…' : 'fare, work, I was unwell…'}
          />
          {wouldBeThird && (
            <p
              role="alert"
              style={{
                borderInlineStart: `3px solid ${JEWEL.maroonCrisis}`,
                paddingInlineStart: 12,
                margin: '0 0 12px',
                fontSize: 13.5,
                lineHeight: 1.55,
              }}
            >
              {sw
                ? 'Hii ni siku ya tatu mfululizo. Baada ya siku tatu mwili wako hauvumilii dozi uliyokuwa ukitumia, na kuirudia inaweza kukuzidi. Nenda kliniki wakupange upya — na usijirudishie dozi ulizokosa.'
                : 'That is three days in a row. After three days your body no longer tolerates the dose you were on, and taking it again could be too much. Go to the clinic to be restarted, and never make up the doses you missed.'}
            </p>
          )}
        </>
      )}

      <NumberField
        label={t('mimi.mat.craving', sw ? 'Tamaa leo (0-10)' : 'Craving today (0-10)')}
        value={craving}
        onChange={setCraving}
      />
      <TextField
        label={t('mimi.mat.note', sw ? 'Lolote lingine' : 'Anything else')}
        value={note}
        onChange={setNote}
      />
      <SaveBar onSave={submit} disabled={taken === 'ndiyo' && dose <= 0} />
      {taken === 'ndiyo' && dose <= 0 && (
        <p style={{ fontSize: 12.5, marginTop: 8, opacity: 0.75 }}>
          {sw
            ? 'Andika dozi kliniki ilikupa. Hatuikisii, na hatuipendekezi — tunaihifadhi tu.'
            : 'Enter the dose the clinic gave you. We do not guess it and we do not suggest one; we only keep it.'}
        </p>
      )}
    </Card>
  );
}
