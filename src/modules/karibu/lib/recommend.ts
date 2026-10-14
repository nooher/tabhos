// karibu/lib/recommend.ts — turn profile into tracker bundle + care plan + Mwenza tone.

import type { KaribuProfile, KaribuTone } from './storage';
import { classifyRisk, type RiskTier } from './risk';
import { ASSIST_SUBSTANCES, assistRead } from './assist';

export interface CarePlanItem {
  id: string;
  title_sw: string;
  body_sw: string;
  source: string;
}

export interface Recommendation {
  trackers: string[];          // tracker ids to activate
  care_plan: CarePlanItem[];
  mwenza_mode: KaribuTone;
  risk_tier: RiskTier;
}

export function recommend(p: KaribuProfile): Recommendation {
  const risk = classifyRisk(p);
  const trackers = new Set<string>(['mood']);          // mood always on
  const plan: CarePlanItem[] = [];

  const c = p.step3?.conditions ?? [];
  if (c.includes('hiv')) {
    trackers.add('hiv'); trackers.add('dawa');
    plan.push({ id: 'art', title_sw: 'ART ya kila siku', body_sw: 'Meza ART kwa wakati ule ule kila siku. Lengo: viral load isiyoonekana (<50). U=U.',
      source: 'NACP Tanzania ART Guidelines 2023' });
  }
  if (c.includes('kisukari')) {
    trackers.add('sukari'); trackers.add('dawa');
    plan.push({ id: 'dm-control', title_sw: 'Udhibiti wa sukari', body_sw: 'Lengo HbA1c <7%, fasting 4-7 mmol/L. Andika sukari mara 2 kwa siku.',
      source: 'WHO PEN + Tanzania STG' });
  }
  if (c.includes('shinikizo')) {
    trackers.add('shinikizo'); trackers.add('dawa');
    plan.push({ id: 'bp-control', title_sw: 'Udhibiti wa shinikizo', body_sw: 'Lengo BP <140/90 (ICR <130/80). Pima BP nyumbani mara 1 kwa siku.',
      source: 'NICE NG136 + Tanzania STG' });
  }
  if (c.includes('pumu') || c.includes('copd')) {
    trackers.add('pumzi'); trackers.add('dawa');
    plan.push({ id: 'asthma', title_sw: 'Pumu/COPD', body_sw: 'Inhaler ya kuzuia kila siku. Inhaler ya dharura ikiwa pumzi inakuwa nzito.',
      source: 'GINA 2024 + GOLD 2024' });
  }
  if (c.includes('saratani')) {
    trackers.add('saratani'); trackers.add('maumivu'); trackers.add('dawa');
    plan.push({ id: 'cancer-symptom', title_sw: 'Ufuatiliaji wa saratani', body_sw: 'Andika maumivu, kichefuchefu, na uchovu kila siku. Mwambie daktari kabla ya kila chemo.',
      source: 'WHO Cancer Control + Tanzania STG' });
  }
  if (c.includes('figo')) {
    trackers.add('dawa'); trackers.add('shinikizo');
    if (p.step3?.dialysis) {
      trackers.add('dialysis');
      plan.push({ id: 'dialysis', title_sw: 'Dialysis ratiba', body_sw: 'Hudhuria session zote. Andika uzito kabla/baada, BP, na ulaji wa maji.',
        source: 'KDIGO Hemodialysis 2018' });
    } else {
      plan.push({ id: 'ckd', title_sw: 'Lishe ya CKD', body_sw: 'Punguza chumvi, fosforasi (nyama nyekundu), na potassium (ndizi, nazi). Kunywa maji kwa kiasi.',
        source: 'KDIGO 2024' });
    }
  }
  if (c.includes('tb')) {
    trackers.add('dawa');
    plan.push({ id: 'tb', title_sw: 'TB DOTS', body_sw: 'Meza RIPE kila siku miezi 2 + RH miezi 4. Hudhuria DOT clinic.',
      source: 'NTLP Tanzania 2023' });
  }
  if (c.includes('sicklecell')) {
    trackers.add('maumivu'); trackers.add('dawa');
  }
  if (c.includes('kifafa')) {
    trackers.add('dawa');
    plan.push({ id: 'epilepsy', title_sw: 'Kifafa', body_sw: 'Meza dawa kila siku. Epuka pombe na ukosefu wa usingizi.',
      source: 'WHO mhGAP EPI' });
  }
  if (c.includes('moyo')) {
    trackers.add('shinikizo'); trackers.add('dawa');
  }
  if (c.includes('anemia')) {
    trackers.add('dawa');
  }

  if (p.step3?.pregnant) {
    trackers.add('mimba');
    plan.push({ id: 'anc', title_sw: 'ANC visit 8', body_sw: 'Anza ANC kabla wiki 12. Folic acid 5mg + iron + tetanus + IPTp.',
      source: 'WHO ANC 2016 + Tanzania RCH' });
  }

  // Mood disorders dominate
  const phq = p.step4?.phq9.total ?? 0;
  const gad = p.step4?.gad7.total ?? 0;
  if (phq >= 10 || gad >= 10) {
    plan.push({ id: 'mh-basic', title_sw: 'Stadi za afya ya akili', body_sw: 'Stadi 3 kila siku: kupumua, kuandika hisia, na tendo moja zuri.',
      source: 'WHO mhGAP DEP/ANX' });
    trackers.add('mood');
  }

  // Substance
  const audit = p.step4?.audit.total ?? 0;
  if (audit >= 8) {
    trackers.add('tamaa');
    plan.push({ id: 'mi', title_sw: 'Motivational Interviewing', body_sw: 'Tafakari thamani zako: pombe inakuwezesha au inakuzuia?',
      source: 'Miller & Rollnick 2013' });
  }
  /*
   * Alcohol withdrawal, where AUDIT says daily dependence.
   *
   * The craving tracker above is relapse prevention and it is the right answer
   * at 8 to 19. At 20 and over the person is probably physically dependent,
   * and the one thing they must not do is what an application would otherwise
   * encourage: stop on their own. Alcohol withdrawal has a mortality and
   * opioid withdrawal does not, which is the most counter-intuitive fact in
   * this whole module and the reason it is stated rather than implied.
   */
  if (audit >= 20) {
    plan.push({
      id: 'pombe-kuacha',
      title_sw: 'Kuacha pombe kwa usalama',
      body_sw: 'Usiache ghafla mwenyewe. Kukosa pombe kunaweza kusababisha kifafa na delirium tremens, na kuna hatari ya kifo. Nenda kituo cha afya kwanza — wanaweza kukusaidia kuacha kwa usalama.',
      source: 'WHO mhGAP · CIWA-Ar (Sullivan 1989)',
    });
  }

  /*
   * ASSIST, per substance, and this is where a screen becomes treatment.
   *
   * Before this the pathway ended at a craving diary for everybody: somebody
   * whose ASSIST came back at likely opioid dependence was offered the same
   * thing as somebody drinking a little too much on Fridays. The methadone
   * programme is the treatment for the first of those and it is free at four
   * centres, and nothing in this file knew the centres existed.
   */
  const assist = assistRead(p.step4?.assist);
  if (assist.state === 'imesomwa') {
    const name = (id: string) => ASSIST_SUBSTANCES.find((s) => s.id === id)?.name_sw ?? id;
    const worstOf = (id: string) => assist.concerns.find((c) => c.id === id);

    /* Anything at moderate or above earns the craving diary and the MI work,
       whatever the substance: that is the brief intervention of SBIRT. */
    if (assist.concerns.length > 0) {
      trackers.add('tamaa');
      plan.push({
        id: 'assist-mi',
        title_sw: 'Mazungumzo mafupi',
        body_sw: `Majibu yako yanaonyesha hatari kwenye: ${assist.concerns.map((c) => name(c.id)).join(', ')}. Vipindi vichache vya mahojiano ya kuhamasisha (MI) ni hatua ya kwanza, na yanafanya kazi.`,
        source: 'WHO ASSIST-linked brief intervention',
      });
    }

    /* Opioids at the high band: this is the MAT referral, named. */
    const opioid = worstOf('heroini');
    if (opioid?.band === 'juu') {
      trackers.add('mat');
      plan.push({
        id: 'mat',
        title_sw: 'Matibabu ya methadone (MAT)',
        body_sw: 'Utegemezi wa afyuni hutibiwa kwa methadone, na ni bure. Vituo: Muhimbili na Mwananyamala (Dar), Hospitali ya Rufaa Mbeya, na KCMC (Moshi). Ni huduma ya afya, sio polisi — hakuna ripoti inayotolewa kwa sababu umeomba msaada.',
        source: 'Tanzania MAT programme · WHO',
      });
    }

    /* And injecting, which is a transmission question rather than a
       dependence one and needs its own line whatever the scores were. */
    if (assist.injected) {
      trackers.add('mat');
      plan.push({
        id: 'sindano',
        title_sw: 'Sindano salama na upimaji',
        body_sw: 'Kujichoma na sindano ni hatari ya VVU na homa ya ini zaidi ya hatari ya dawa yenyewe. Kliniki za MAT zinatoa sindano safi, upimaji wa VVU na matibabu, bure. Usichangie sindano kamwe.',
        source: 'WHO harm reduction · NACP Tanzania',
      });
    }
  }

  // Reasons-driven extras
  const reasons = p.step2?.reasons ?? [];
  if (reasons.includes('amani') || reasons.includes('najua tu')) {
    trackers.add('bidii');
  }

  // Mwenza tone — default to user choice or "shangazi" warmth
  const mwenza_mode: KaribuTone = p.step6?.tone ?? 'shangazi';

  if (risk.tier === 'dharura' || risk.ercRequired) {
    plan.unshift({ id: 'safety', title_sw: 'Mpango wa usalama', body_sw: 'Piga 112 au nenda hospitali sasa. Mwambie mtu wa duara la usalama.',
      source: 'WHO mhGAP SUI + Tanzania STG' });
  }

  return {
    trackers: Array.from(trackers),
    care_plan: plan,
    mwenza_mode,
    risk_tier: risk.tier,
  };
}
