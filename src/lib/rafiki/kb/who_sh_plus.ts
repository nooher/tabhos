/**
 * WHO Self-Help Plus (SH+) — group-based stress management course.
 *
 * Source: "Self Help Plus (SH+): a group-based stress management course
 * for adults" — Generic field-trial version 1.0, 2021 (Series on
 * low-intensity psychological interventions, No. 5). ISBN
 * 978-92-4-003511-9, © WHO 2021. CC BY-NC-SA 3.0 IGO.
 * Source PDF: iris.who.int (item f17819a9-724f-4129-90f9-d489010fa9d5).
 *
 * SH+ is built on Acceptance and Commitment Therapy (ACT) and has 5 core
 * skills delivered in 5 sessions:
 *   1. Grounding
 *   2. Unhooking
 *   3. Acting on your values
 *   4. Being kind
 *   5. Making room
 *
 * This module surfaces the techniques + safety practices a Tanzanian
 * facilitator (CHW, lay counsellor, peer) would actually use.
 */

export interface ShPlusEntry {
  id: string
  topic: string
  summary_sw: string
  summary_en: string
  q_patterns: RegExp[]
  next_step_sw: string
  citation: string
}

const SRC = 'WHO Self-Help Plus (SH+) v1.0 2021'

export const WHO_SH_PLUS: ShPlusEntry[] = [
  {
    id: 'shp-overview',
    topic: 'overview',
    summary_sw:
      'SH+ ni kozi ya kikundi ya kushughulikia msongo wa mawazo iliyojengwa kwenye ACT (Acceptance and Commitment Therapy). Vipindi 5 vya masaa 2 kila kimoja. Inaweza kuendeshwa na facilitator asiye mtaalam (CHW, lay counsellor, peer). Imejaribiwa na kufanikiwa kwa: wakimbizi, watu walio katika dhiki ya msongo wa kawaida, jamii zinazokumbwa na mzozo.',
    summary_en:
      'SH+ is a group stress management course built on Acceptance and Commitment Therapy (ACT). Five 2-hour sessions. Can be delivered by non-specialist facilitator (CHW, lay counsellor, peer). Field-tested with refugees, populations under daily stress, conflict-affected communities.',
    q_patterns: [/(SH\+|Self.Help Plus|kozi ya msongo|group.*stress)/i],
    next_step_sw: 'Tanzania ina lay-counsellor network (Friendship Bench, BAKWATA mental health committee) inayoweza kupokea facilitator training.',
    citation: `${SRC} · Part 2.1 Overview`,
  },
  {
    id: 'shp-grounding',
    topic: 'grounding',
    summary_sw:
      'SKILL 1 — Grounding: kurudisha umakini kwa wakati huu (sasa hivi), badala ya kufuatwa na mawazo magumu. Mbinu: TOA UMAKINI MIWILINI (push feet into floor, push hands together), NOTICE 5 things you can see, 4 things you can hear, 3 things you can feel, 2 things you can smell, 1 thing you can taste. Sio kwa kupumzika — ni kuvunja msururu wa mawazo magumu.',
    summary_en:
      'SKILL 1 — Grounding: bringing attention back to the present moment instead of being caught in difficult thoughts. Techniques: push feet into floor, hands together; notice 5 things you see, 4 hear, 3 feel, 2 smell, 1 taste. NOT for relaxation — for breaking the chain of difficult thoughts.',
    q_patterns: [/(grounding|kurudisha umakini|5.4.3.2.1)/i, /(mawazo magumu|difficult thoughts)/i],
    next_step_sw: 'Fanya dakika 2-3 mara kadhaa kwa siku — sio mara moja tu.',
    citation: `${SRC} · Session 1 — Grounding`,
  },
  {
    id: 'shp-unhooking',
    topic: 'unhooking',
    summary_sw:
      'SKILL 2 — Unhooking: kujifunza KUTAMBUA na KUTAJA mawazo magumu (e.g. "Nina wazo la kushindwa") badala ya kushikamana nayo (e.g. "NIMESHINDWA"). Hatua: (1) Notice — naona wazo hili. (2) Name — ni wazo la wasiwasi/hasira/kushindwa. (3) Refocus — rudisha umakini kwa sasa. Hii inakupa nafasi ya kuchagua nini cha kufanya, sio mawazo kukutawala.',
    summary_en:
      'SKILL 2 — Unhooking: noticing and naming difficult thoughts (e.g. "I notice a thought of failure") instead of fusing with them (e.g. "I AM A FAILURE"). Steps: Notice → Name → Refocus. Gives you space to choose action instead of being controlled by thoughts.',
    q_patterns: [/(unhooking|kujitenga.*mawazo|cognitive defusion)/i],
    next_step_sw: 'Andika mawazo yako siku 7 — andika "Naona wazo la ___". Patua kila siku.',
    citation: `${SRC} · Session 2 — Unhooking`,
  },
  {
    id: 'shp-values',
    topic: 'values',
    summary_sw:
      'SKILL 3 — Acting on Your Values: tambua VALUES zako (familia, kazi, afya, faith, jamii) na chukua hatua hata ndogo zinazoonyesha values hizo. Mfano: kama familia ni value yako, piga simu mtoto wako leo hata ukiwa na msongo. Values si malengo (yanayofikiwa kisha hayako); ni mwelekeo wa kuendelea kuelekeza maisha.',
    summary_en:
      'SKILL 3 — Acting on Your Values: identify your values (family, work, health, faith, community) and take small actions aligned with them. Example: if family is your value, call your child today even if stressed. Values are directions, not goals.',
    q_patterns: [/(values|maadili|mwelekeo wa maisha)/i, /(ninataka nini.*maisha)/i],
    next_step_sw: 'Andika values 3 muhimu kwako, na hatua 1 ndogo ya kila value kwa wiki hii.',
    citation: `${SRC} · Session 3 — Acting on values`,
  },
  {
    id: 'shp-being-kind',
    topic: 'self_compassion',
    summary_sw:
      'SKILL 4 — Being Kind: kujifanyia upole mwenyewe na kwa wengine. Wewe ukikosea, badala ya kujishtaki ("nimekosea — sina maana"), jiulize: "Ningemwambia nini rafiki yangu wa karibu katika hali hii?" Mara nyingi tunazidi kujikataa. Kufanya kindness imeunganishwa na kupungua kwa sonona na wasiwasi.',
    summary_en:
      'SKILL 4 — Being Kind: directing kindness toward yourself AND others. When you make a mistake, instead of self-criticism ("I failed — I am worthless"), ask: "What would I say to my close friend in this situation?" Self-compassion is linked to reduced depression + anxiety.',
    q_patterns: [/(being kind|self.compassion|kujifanyia upole|kujishtaki)/i],
    next_step_sw: 'Jaribu kifungu cha self-compassion (Kristin Neff): "Hili ni wakati wa kuumia. Kuumia ni sehemu ya maisha. Naweza kuwa mpole kwangu mwenyewe."',
    citation: `${SRC} · Session 4 — Being kind`,
  },
  {
    id: 'shp-making-room',
    topic: 'acceptance',
    summary_sw:
      'SKILL 5 — Making Room: kupokea hisia ngumu (huzuni, hasira, woga) badala ya kupambana nazo. Hatua: (1) Notice mahali mwilini hisia inajisikia. (2) Pumua kuelekea mahali pale. (3) Iruhusu iwepo — kama wingu lipitalo angani. Sio kukubali hali mbaya, ni kuacha hisia ipite badala ya kushikamana nayo.',
    summary_en:
      'SKILL 5 — Making Room: accommodating difficult feelings (sadness, anger, fear) instead of fighting them. Steps: (1) Notice where in the body it sits. (2) Breathe toward that place. (3) Allow it to be — like a cloud passing through sky. Not resignation — letting feelings pass instead of fusing with them.',
    q_patterns: [/(making room|acceptance|kupokea hisia|huzuni inashinda)/i],
    next_step_sw: 'Fanya dakika 5 kila asubuhi — andika hisia, mahali mwilini, na pumzi.',
    citation: `${SRC} · Session 5 — Making room`,
  },
  {
    id: 'shp-facilitator-confidentiality',
    topic: 'safety',
    summary_sw:
      'Facilitator wa SH+: hifadhi siri ya washiriki — taarifa za kibinafsi za vipindi HAZISHIRIKIWI nje ya kikundi. Mwanzoni mwa kozi, eleza wazi kwamba kile washiriki wanachoshiriki kinabaki kikundini, isipokuwa kuna hatari ya kujidhuru au kudhuru wengine.',
    summary_en:
      'SH+ Facilitator: maintain participant confidentiality — personal information shared in sessions is NOT discussed outside the group. At course start, explicitly explain confidentiality, except where there is risk of harm to self or others.',
    q_patterns: [/(confidentiality|siri).*(facilitator|kikundi|group|SH\+)/i],
    next_step_sw: 'Andika confidentiality agreement na sahihi ya washiriki wote katika kikao 1.',
    citation: `${SRC} · §5.2 Confidentiality`,
  },
  {
    id: 'shp-suicide-protocol',
    topic: 'safety',
    summary_sw:
      'Mtu wa SH+ akionyesha mawazo ya kujiua: (1) Muulize moja kwa moja kuhusu mawazo + mpango. (2) Kama kuna mpango wa karibu wa kufanya hivyo: KAA NAYE, usimwache peke. (3) Wasiliana na supervisor + huduma ya mtaalam (Lifeline 0800 110 014, 116 watoto, 112 dharura). (4) Mpango wa usalama (means restriction). Facilitator ASIONGEZE mtihani wa CBT/therapy — wamefundishwa kufanya elimu na rufaa tu.',
    summary_en:
      'SH+ participant with suicidal ideation: (1) Ask directly about thoughts + plan. (2) If imminent plan: stay with them. (3) Contact supervisor + professional services (Lifeline 0800 110 014, 116 child, 112 emergency). (4) Safety plan (means restriction). Facilitator does NOT provide therapy — only education + referral.',
    q_patterns: [/(SH\+|kikundi|facilitator).*(kujiua|suicide|self.harm)/i],
    next_step_sw: 'Hii ni dharura — wasiliana na supervisor wa SH+ + huduma ya mtaalam mara moja.',
    citation: `${SRC} · §7.2 Asking about suicide`,
  },
  {
    id: 'shp-intoxication',
    topic: 'safety',
    summary_sw:
      'Mshiriki wa SH+ akiwa amelewa kwenye kipindi: usimuingize kwenye kikundi. Mwambie kwa upole arudi tukio lingine. Hakikisha usalama wake (sio kumwacha aende mwenyewe). Wasiliana na supervisor. Pombe na bangi vinaweza kupunguza ufanisi wa SH+ na kuathiri washiriki wengine.',
    summary_en:
      'SH+ participant arrives intoxicated: do not include in session. Politely ask them to return another time. Ensure their safety (don\'t let them leave alone). Contact supervisor. Alcohol/cannabis reduce SH+ efficacy and may distress other participants.',
    q_patterns: [/(intoxicated|amelewa|pombe).*(SH\+|kikundi|facilitator)/i],
    next_step_sw: 'Mwambie atatibiwa SUB (substance) module ya mhGAP au AUDIT screening.',
    citation: `${SRC} · §8.3 Intoxicated participants`,
  },
  {
    id: 'shp-language-adaptation',
    topic: 'implementation',
    summary_sw:
      'Kuandaa SH+ kwa Kiswahili cha Tanzania: NSITAFSIRI MOJA KWA MOJA — adapt vifungu na mifano ya kitamaduni. Mfano badala ya "park" tumia "soko"; badala ya "office" tumia "kazi". Hakikisha facilitator anatumia lugha ya kawaida ya jamii, sio Kiswahili sanifu pekee. Tafsiri lazima ipitiwe na mtu mwingine wa lugha hiyo.',
    summary_en:
      'Adapting SH+ for Tanzania Swahili: DO NOT directly translate — adapt phrases and cultural examples. Use local Swahili register, not only standard. Translations must be back-translated and reviewed.',
    q_patterns: [/(translate|adapt|adapting|kutafsiri).*(SH\+|kikundi)/i],
    next_step_sw: 'Wasiliana na mtaalam wa lugha + jamii husika kabla ya kuanza kozi.',
    citation: `${SRC} · §2.5 Adapting`,
  },
  {
    id: 'shp-target-population',
    topic: 'eligibility',
    summary_sw:
      'SH+ inafaa kwa: watu wazima walio na msongo wa kawaida wa kila siku. SIO matibabu ya psychiatric — sio kwa watu wenye hali ya akili kali (saikosi, bipolar acute, sonona kali na hatari ya kujiua). Hawa wanahitaji mtaalam. SH+ inafaa kwa: jamii walio na shida za maisha (poverty, displacement, migration, GBV recovery, perinatal stress).',
    summary_en:
      'SH+ targets: adults with everyday stress. NOT psychiatric treatment — not for severe mental illness (psychosis, acute mania, severe depression with suicide risk). Those need specialist. SH+ fits: populations with life stressors (poverty, displacement, migration, GBV recovery, perinatal stress).',
    q_patterns: [/(SH\+).*(nani|who.*for|fits|eligibility|inafaa)/i],
    next_step_sw: 'Hali kali ya akili = mtaalam. Stress ya kawaida = SH+.',
    citation: `${SRC} · §2.2 Who is SH+ for`,
  },
  {
    id: 'shp-facilitator-training',
    topic: 'training',
    summary_sw:
      'Mafunzo ya facilitator: siku 5-8 za training intensive + supervised sessions 2-4. Facilitator HAITAKIWI kuwa mtaalam wa afya ya akili — anaweza kuwa CHW, lay counsellor, mwalimu, mtoa-huduma wa NGO, mtu wa imani. Lazima awe na: stadi za mawasiliano, uvumilivu, ufafanuzi, na uwezo wa kuongoza kikundi.',
    summary_en:
      'Facilitator training: 5-8 days intensive + 2-4 supervised sessions. Facilitator does NOT need to be MH professional — can be CHW, lay counsellor, teacher, NGO worker, faith leader. Must have: communication, patience, clarity, group management skills.',
    q_patterns: [/(facilitator|kukabidhi).*(training|mafunzo).*(SH\+|kikundi)/i],
    next_step_sw: 'Tanzania: BAKWATA, TEC, ELCT, Friendship Bench wanaweza kushikilia training.',
    citation: `${SRC} · §3.1 Facilitator training`,
  },
  {
    id: 'shp-evidence',
    topic: 'evidence',
    summary_sw:
      'Ushahidi wa SH+: RCTs (randomized controlled trials) Uganda, Italy, Türkiye, na nchi nyingine vimeonyesha SH+ ina ufanisi kupunguza msongo wa kawaida na sonona ya kati. Kwa watu wenye sonona kali, SH+ inaweza kuwa hatua ya kwanza ila inahitaji rufaa kwa mtaalam.',
    summary_en:
      'SH+ evidence: RCTs in Uganda, Italy, Türkiye and elsewhere show efficacy in reducing common psychological distress and moderate depression. For severe depression, SH+ can be first step but requires specialist referral.',
    q_patterns: [/(ushahidi|evidence|RCT).*(SH\+)/i, /(SH\+).*(works|inafanya kazi)/i],
    next_step_sw: 'Kwa hali kali, SH+ + mtaalam kwa pamoja ni bora.',
    citation: `${SRC} · Evidence base`,
  },
]

export function findShPlusAnswer(query: string): ShPlusEntry | null {
  const q = query.toLowerCase()
  for (const e of WHO_SH_PLUS) {
    for (const rx of e.q_patterns) {
      if (rx.test(q)) return e
    }
  }
  return null
}

export function askShPlus(query: string): { domain: string; respond: string; next_step: string; citation: string } | null {
  const hit = findShPlusAnswer(query)
  if (!hit) return null
  return {
    domain: 'WHO Self-Help Plus (SH+)',
    respond: hit.summary_sw,
    next_step: `Hatua: ${hit.next_step_sw}`,
    citation: `${SRC} · ${hit.citation.split(' · ').slice(1).join(' · ')}`,
  }
}
