/**
 * The dose record, and the recovery count beside it.
 *
 * The milestones come from `lib/uraibu/matibabu.ts` and each carries why it is
 * where it is, because a round number with no reason behind it is a sticker,
 * and a person who slips on day 29 and loses a sticker has one more reason to
 * stop counting.
 */
import { Card } from '../common';
import { loadReadings } from '../types';
import { useLang } from '../../../../lib/i18n/Provider';
import { KUACHA_GHAFLA, MAT_CENTRES, recoveryRead } from '../../../../lib/uraibu/matibabu';
import type { MatReading } from './schema';
import { summarize } from './summary';

export default function Views() {
  const { t, lang } = useLang();
  const sw = lang === 'sw';
  const list = loadReadings<MatReading>('mat').slice(0, 30);

  /* Counted from the oldest dose actually taken that this tracker holds. It is
     not a sobriety date and is not asked for as one: most people this tracker
     is for are on maintenance treatment, and a counter that insists on
     abstinence would exclude them from their own recovery. */
  const firstTaken = [...list].reverse().find((r) => r.taken);
  const recovery = recoveryRead(firstTaken?.ts ?? null);
  const centreName = (id?: string) => {
    const c = MAT_CENTRES.find((x) => x.id === id);
    return c ? (sw ? c.name.sw : c.name.en) : '';
  };

  return (
    <Card>
      <h3 style={{ margin: '0 0 6px', fontFamily: 'Georgia, serif', fontSize: 20 }}>
        {t('mimi.mat.title', 'Methadone (MAT)')}
      </h3>
      <p style={{ margin: '0 0 12px', fontSize: 14, lineHeight: 1.5 }}>{summarize(list)}</p>

      {recovery.state === 'inahesabiwa' && (
        <p style={{ margin: '0 0 12px', fontSize: 13.5, lineHeight: 1.55 }}>
          {sw ? `Siku ${recovery.days} kwenye matibabu.` : `${recovery.days} days in treatment.`}
          {recovery.next && (
            <>
              {' '}
              {sw
                ? `Ijayo: ${recovery.next.label.sw} — ${recovery.next.why.sw}`
                : `Next: ${recovery.next.label.en} — ${recovery.next.why.en}`}
            </>
          )}
        </p>
      )}

      <ul style={{ margin: '0 0 12px', paddingLeft: 18, fontSize: 13, lineHeight: 1.6 }}>
        {list.map((r) => (
          <li key={r.id}>
            {new Date(r.ts).toLocaleDateString(sw ? 'sw-TZ' : 'en-GB')}
            {' · '}
            {r.taken
              ? `${r.dose_mg} mg · ${r.place === 'kliniki' ? (sw ? 'kliniki' : 'clinic') : (sw ? 'ya kubeba' : 'take-home')}${r.centre ? ` · ${centreName(r.centre)}` : ''}`
              : (sw ? 'haikuchukuliwa' : 'not taken')}
            {' · '}
            {sw ? 'tamaa' : 'craving'} {r.craving}
          </li>
        ))}
      </ul>

      <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.55, opacity: 0.85 }}>
        {sw ? KUACHA_GHAFLA.sw : KUACHA_GHAFLA.en}
      </p>
    </Card>
  );
}
