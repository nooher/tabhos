/**
 * Mental Health (General) Regulations, 2016 — Government Notice No. 122
 * published 22/4/2016 in pursuance of Mental Health Act Cap.98 §38.
 *
 * Source: Tanzania official government gazette PDF, signed Dar es Salaam,
 * 21 March 2016 by UMMY A. MWALIMU, Minister for Health, Community
 * Development, Gender, the Elderly and Children.
 *
 * Sovereign sourcing: every entry below is anchored to a specific
 * regulation number (Reg X[.subreg]) so a clinician, lawyer, family member
 * or admin can verify it against the official document.
 */

export interface MHRegEntry {
  /** Stable slug. */
  id: string
  /** Tanzania regulation reference. */
  reg: string
  /** Plain-Swahili summary of what the regulation says. */
  summary_sw: string
  /** Plain-English summary. */
  summary_en: string
  /** Patterns Rafiki matches against (Swahili + English). */
  q_patterns: RegExp[]
  /** Routing hint: who should the user be referred to / what action follows. */
  next_step_sw: string
  /** Citation string for the answer footer. */
  citation: string
}

const CITE = 'Mental Health (General) Regulations 2016 · GN No. 122 · Cap.98'

export const MH_REG_2016: MHRegEntry[] = [
  // ─── PART II — Care & treatment ─────────────────────────────────────────
  {
    id: 'reg3-provision',
    reg: 'Reg 3',
    summary_sw:
      'Mtaalam wa afya ya akili lazima amchunguze mgonjwa, aandike taarifa zote (yake na za mzazi/mlezi), atoe matibabu ifaayo HAPO HAPO au amrudishe kwenye kituo cha juu zaidi cha huduma. Ni lazima ashirikishe jamii na mlezi wakati wa matibabu na huduma za baada ya kurudi nyumbani.',
    summary_en:
      'A mental health care provider must assess the patient, document particulars (patient + parent/guardian), provide suitable treatment OR refer to appropriate level. Community + guardian must be involved during medication and aftercare.',
    q_patterns: [
      /(matibabu|huduma|huduma za baadaye|aftercare).*(akili|mental)/i,
      /(community|jamii|mlezi).*(akili|mental)/i,
    ],
    next_step_sw:
      'Ongea na mtaalam wa karibu wa afya ya akili au CHW wako — kila kituo cha afya kinatakiwa kuwa na utaratibu huu.',
    citation: `${CITE} · Reg 3`,
  },

  // ─── PART III — Application + assessment ────────────────────────────────
  {
    id: 'reg4-emergency',
    reg: 'Reg 4 + Act §11',
    summary_sw:
      'Emergency admission au matibabu bila ridhaa: hospitali yoyote inayopokea mgonjwa katika mazingira ya dharura (per section 11 ya Act) LAZIMA itoe ripoti kwa MAANDISHI.',
    summary_en:
      'Emergency admission or treatment without consent: any hospital must report in writing per Mental Health Act §11.',
    q_patterns: [
      /(emergency|dharura).*(admission|kulazwa|hospitali)/i,
      /(bila ridhaa|without consent).*(akili|mental)/i,
    ],
    next_step_sw:
      'Familia inaweza kuomba kuona ripoti ya maandishi — ni haki yako kisheria.',
    citation: `${CITE} · Reg 4 (Act Cap.98 §11)`,
  },
  {
    id: 'reg5-reception-order',
    reg: 'Reg 5',
    summary_sw:
      'Fomu ya reception order (ya kulazwa kwa amri) inapatikana KILA SEHEMU: vituo vya afya, ofisi ya ustawi wa jamii, vituo vya polisi, ofisi za wakuu wa kata na ofisi za wakuu wa kijiji.',
    summary_en:
      'Reception order application form must be available at all health facilities, social welfare offices, police stations + posts, ward executive offices, and village executive offices.',
    q_patterns: [
      /(reception order|fomu ya kulazwa)/i,
      /(wapi.*fomu|where.*form).*(akili|mental)/i,
    ],
    next_step_sw:
      'Nenda kituo chochote cha afya, ofisi ya ustawi wa jamii, polisi au mwenyekiti wa kijiji — wote wanatakiwa kuwa na fomu hizi.',
    citation: `${CITE} · Reg 5`,
  },
  {
    id: 'reg7-temporary-admission',
    reg: 'Reg 7',
    summary_sw:
      'Temporary admission: Form 6 hujazwa na mfanyakazi wa ustawi, ndugu, polisi, kiongozi wa dini, au mkuu wa kata/kijiji. Mtaalam wa afya hujaza Form 7 akipendekeza temporary admission. KIKOMO: miezi 12 — sio zaidi.',
    summary_en:
      'Temporary admission: Form 6 filled by social worker, relative, police officer, religious leader, ward or village executive officer. Health practitioner fills Form 7 recommending temporary admission, capped at 12 months.',
    q_patterns: [
      /(temporary admission|kulazwa muda)/i,
      /(form 6|form 7|fomu ya 6|fomu ya 7)/i,
      /(miezi mingapi.*kulazwa)/i,
    ],
    next_step_sw:
      'Kikomo ni miezi 12. Baada ya hapo, status lazima irudiwe — ongea na mtaalamu au Patient Welfare Board.',
    citation: `${CITE} · Reg 7`,
  },
  {
    id: 'reg9-offender-panel',
    reg: 'Reg 9',
    summary_sw:
      'Kwa mhalifu aliyelazwa hospitali ya afya ya akili, paneli ya wataalam wanatakiwa kumchunguza: (a) forensic psychiatrist/psychiatrist, (b) forensic psychologist/psychologist, (c) forensic psychiatric nurse/psychiatric nurse, (d) community psychiatric nurse, (e) occupational therapist, (f) social welfare officer. Paneli inapendekeza kwa mahakama hali ya mgonjwa wakati alipotenda kosa.',
    summary_en:
      'For an offender admitted to a mental health facility, the assessment panel must include: forensic psychiatrist, forensic psychologist, forensic psychiatric nurse, community psychiatric nurse, occupational therapist, and social welfare officer. The panel reports to court on the patient\'s mental state at the time of the offence.',
    q_patterns: [
      /(mhalifu|criminal|offender).*(akili|mental)/i,
      /(forensic).*(psychiat|psycholog|nurse)/i,
    ],
    next_step_sw:
      'Familia ya mhalifu inaweza kuomba kupata ripoti ya paneli kupitia wakili.',
    citation: `${CITE} · Reg 9`,
  },
  {
    id: 'reg10-presidents-pleasure',
    reg: 'Reg 10',
    summary_sw:
      'Mtu aliyehukumiwa kuwekwa kizuizini "kwa raha ya Rais" anaweza kuachiliwa baada ya: (1) mtu aliyeteuliwa na Waziri wa Sheria kuandaa ripoti ya kupona; (2) Patient Welfare Board ku-asses; (3) Mental Health Board ku-recommend; (4) Waziri ku-approve per Criminal Procedure Act (Cap.20).',
    summary_en:
      'Release of a person detained during the President\'s pleasure: progress report by Minister of Legal Affairs designee → Patient Welfare Board → Mental Health Board → Minister approval per Criminal Procedure Act (Cap.20).',
    q_patterns: [
      /(president.*pleasure|raha ya rais|presidential)/i,
      /(kuachiliwa|release).*(kizuizini|detained)/i,
    ],
    next_step_sw:
      'Familia/mwakilishi wanaweza kuwasiliana na Patient Welfare Board kwa hatua ya kwanza.',
    citation: `${CITE} · Reg 10 (Cap.20)`,
  },
  {
    id: 'reg11-discharge',
    reg: 'Reg 11',
    summary_sw:
      'Daktari Mkuu Anayehusika ndiye anayehusika kumtoa mgonjwa. SHARTI: (a) mgonjwa atatakiwa kusindikizwa nyumbani, hatatolewa mpaka msindikizaji apatikane; (b) Daktari ataridhika kwamba kutolewa hakuna hatari kwa afya ya mgonjwa au jamii.',
    summary_en:
      'The medical officer in charge is responsible for discharge. Conditions: (a) escort must be available if patient is to be escorted; (b) medical officer must be satisfied that discharge is safe for patient and community.',
    q_patterns: [
      /(discharge|kutolewa|kurudishwa).*(hospitali|akili|mental)/i,
      /(lini.*nirudi nyumbani|when.*go home).*(akili|mental)/i,
    ],
    next_step_sw:
      'Ongea na Daktari Mkuu (Medical Officer in Charge) wa wodi ya akili — yeye ndiye anaye-approve.',
    citation: `${CITE} · Reg 11`,
  },
  {
    id: 'reg12-72hour',
    reg: 'Reg 12 + Act §4',
    summary_sw:
      '72-hour assessment: wataalam WAWILI wa afya wa akili (lazima wawe medical practitioners) wakuchunguze kwa masaa 72 mfululizo. Hatua: (1) waamue programu ya matibabu + mahali pa kukaa; (2) monitor kila masaa 24, wandike ripoti; (3) ndani ya masaa 12 baada ya assessment, watume ripoti ya recommendation. Mkuu wa kituo anaweza kukutoa au kukubadili kuwa voluntary status. Kama unahitaji huduma za zaidi za involuntary, lazima Patient Welfare Board iidhinishe.',
    summary_en:
      '72-hour assessment (per Act §4): TWO mental health care practitioners (both medical practitioners) assess continuously for 72 hours, determine treatment programme + place, monitor every 24 hours with written reports, submit final recommendation within 12 hours of expiry. Head may discharge or transfer to voluntary status. Further involuntary care needs Patient Welfare Board approval.',
    q_patterns: [
      /(72.*hour|72.*saa).*assessment/i,
      /(involuntary|kwa nguvu).*(akili|mental)/i,
      /(uchunguzi.*saa 72|72.*hour check)/i,
    ],
    next_step_sw:
      'Una haki ya kuomba ripoti ya assessment ya 72-hour. Pia familia inaweza ku-appeal kwa Patient Welfare Board.',
    citation: `${CITE} · Reg 12 (Act Cap.98 §4)`,
  },
  {
    id: 'reg13-police',
    reg: 'Reg 13',
    summary_sw:
      'Polisi watasaidia kulinda wagonjwa walio-admit chini ya Regulations hizi, kulingana na Criminal Procedure Act (Cap.20).',
    summary_en:
      'Police shall assist in guarding patients admitted under these Regulations per Criminal Procedure Act (Cap.20).',
    q_patterns: [
      /(polisi|police).*(akili|mental|hospitali)/i,
    ],
    next_step_sw: 'Polisi wa karibu wanaweza kuombwa msaada na hospitali — sio na familia moja kwa moja.',
    citation: `${CITE} · Reg 13 (Cap.20)`,
  },

  // ─── PART IV — Records ───────────────────────────────────────────────────
  {
    id: 'reg16-records',
    reg: 'Reg 16',
    summary_sw:
      'Kumbukumbu zinazohifadhiwa: (a) medical record — ward round books + faili la mgonjwa; (b) registers — admission, discharge, vifo, transfer, leaves, absconders; (c) administrative records (cabinet iliyofungwa, ofisi ya manager); (d) incident records; (e) quality improvement records — quarterly + annual. Kila ingizo lazima liwe na tarehe, saa, jina kamili na sahihi.',
    summary_en:
      'Records kept: medical records (ward round books + patient files), registers (admission/discharge/deaths/transfer/leaves/absconders), administrative records in locked cabinet, incident records, QI records. Every entry must have date, time, full name and signature.',
    q_patterns: [
      /(rekodi|records|kumbukumbu).*(akili|mental|hospitali)/i,
      /(quarterly|annual).*(akili|mental)/i,
    ],
    next_step_sw:
      'Mgonjwa au familia ina haki ya kuomba kupata medical record — wasiliana na records officer wa hospitali.',
    citation: `${CITE} · Reg 16`,
  },

  // ─── PART V — Designated mental hospital ─────────────────────────────────
  {
    id: 'reg18-admission-designated',
    reg: 'Reg 18',
    summary_sw:
      'Designated mental hospital (mfano: Isanga): mtu HATALAZWA mpaka awe na (1) warrant authenticated, au (2) reception order, au (3) amri ya Waziri. Atachukuliwa fingerprints + photo, atapekuliwa na mtu wa jinsia yake (sio mbele ya mgonjwa mwingine), prohibited articles zitachukuliwa, na atapatiwa nguo zilizo-approve.',
    summary_en:
      'Designated mental hospital: no admission without authenticated warrant, reception order, or Minister\'s order. Fingerprints + photo taken. Search by same-sex staff (not in presence of other patients). Prohibited articles removed. Approved clothing provided.',
    q_patterns: [
      /(designated|isanga).*(hospital|hospitali)/i,
      /(warrant|reception order|amri).*(akili|mental)/i,
    ],
    next_step_sw: 'Bila warrant au reception order, hospitali hii ya designated haitamlaza mgonjwa.',
    citation: `${CITE} · Reg 18`,
  },
  {
    id: 'reg20-death',
    reg: 'Reg 20 + Cap.24',
    summary_sw:
      'Mgonjwa akifariki: Officer in Charge LAZIMA atoe taarifa MARA MOJA kwa: (1) Chief Medical Officer, (2) polisi, (3) hakimu wa karibu mwenye mamlaka ya kufanya inquest (per Inquest Act Cap.24).',
    summary_en:
      'On death of a patient: officer in charge must IMMEDIATELY notify the Chief Medical Officer, police, and nearest magistrate empowered to hold inquests (per Inquest Act Cap.24).',
    q_patterns: [
      /(kifo|death|mfariki).*(hospitali.*akili|mental)/i,
    ],
    next_step_sw: 'Familia ina haki ya kuhudhuria inquest na kupata sababu ya kifo iliyothibitishwa kisheria.',
    citation: `${CITE} · Reg 20 (Inquest Act Cap.24)`,
  },
  {
    id: 'reg22-religious',
    reg: 'Reg 22',
    summary_sw:
      'Mgonjwa ANA HAKI ya kupokea wahudumu wa dini (kasisi, sheikh, padri, mtu wa imani yake): Officer in Charge anaweza kuwakubali waje "kwa nyakati zinazofaa na za kawaida" na kufanya ibada kwenye mahali na muda alioruhusu.',
    summary_en:
      'Patient has the right to receive religious ministers: officer in charge may admit ministers of religion at proper and reasonable times to visit + hold religious services at permitted places and times.',
    q_patterns: [
      /(dini|kasisi|sheikh|padri|imam|religious).*(hospitali|akili)/i,
      /(sala|kuomba).*(hospitali.*akili)/i,
    ],
    next_step_sw: 'Mzungumze na officer in charge wa wodi ku-arrange wakati wa kuhudhuria.',
    citation: `${CITE} · Reg 22`,
  },
  {
    id: 'reg23-discharge-designated',
    reg: 'Reg 23',
    summary_sw:
      'Kutolewa kutoka designated mental hospital: (1) mgonjwa atarudishwa kwa gharama ya Serikali hadi wilaya yake (au atapewa fedha za kufika kijijini); (2) atakabidhiwa kwa ndugu na escort/social worker mbele ya kiongozi wa kijiji; (3) Handing-over forms zitajazwa pande zote mbili; (4) kama hana kitu, anaweza kupewa gratuity (kibali cha CMO).',
    summary_en:
      'Discharge from designated mental hospital: (1) returned at Government expense to home district, or given money sufficient to reach village of domicile; (2) handed over to relatives by escort/social worker in presence of village government leader; (3) handing-over forms signed by both parties; (4) gratuity allowed if no means of subsistence (CMO approval).',
    q_patterns: [
      /(kurudishwa|return).*(hospitali|hospital).*(akili|mental)/i,
      /(gharama|fedha|expense).*(serikali|government).*(akili|mental)/i,
    ],
    next_step_sw: 'Familia inaweza kuthibitishwa kabla mgonjwa kutolewa — wasiliana na social worker.',
    citation: `${CITE} · Reg 23`,
  },

  // ─── PART VI — General ──────────────────────────────────────────────────
  {
    id: 'reg26-search',
    reg: 'Reg 26',
    summary_sw:
      'Mgonjwa atapekuliwa wakati anapolazwa na muda mwingine ambao Medical Officer in Charge anaweza kuagiza — na ATAPEKULIWA NA STAFF WA JINSIA YAKE TU, sio mbele ya mgonjwa mwingine. Prohibited articles zitachukuliwa.',
    summary_en:
      'Patient searched on admission + subsequently as ordered. Search MUST be by same-sex staff, NOT in presence of other patients. Prohibited articles confiscated.',
    q_patterns: [
      /(search|kupekuliwa|peku).*(hospitali|hospital).*(akili|mental)/i,
    ],
    next_step_sw: 'Kama umepekuliwa vibaya, ripoti kwa officer in charge na/au Patient Welfare Board.',
    citation: `${CITE} · Reg 26`,
  },
  {
    id: 'reg28-escape',
    reg: 'Reg 28',
    summary_sw:
      'Mgonjwa akitoroka kituo cha afya ya akili, Medical Officer in Charge ATALAZIMIKA MARA MOJA kutoa taarifa kwa kituo cha polisi cha karibu.',
    summary_en:
      'If a patient escapes from a health care facility, the medical officer in charge MUST immediately report the incident to the nearest police station.',
    q_patterns: [
      /(toroka|escape|enda zake).*(hospitali|hospital).*(akili|mental)/i,
    ],
    next_step_sw: 'Familia inaweza kupiga simu 112 na ku-coordinate na hospitali.',
    citation: `${CITE} · Reg 28`,
  },
  {
    id: 'reg29-visitors',
    reg: 'Reg 29',
    summary_sw:
      'Wageni: mgonjwa atapokea wageni kwa muda ulioagizwa na Medical Officer in Charge. Mgeni anaweza KUKATALIWA kuingia kama Officer anaona si kwa maslahi ya afya ya mgonjwa. Jina na anwani ya mgeni vitaandikwa kwenye kitabu. Wageni wanaweza kupekuliwa na staff wa jinsia yao (sio mbele ya mgonjwa mwingine au mgeni mwingine). Mgeni akikataa kupekuliwa, hatakubaliwa kuingia.',
    summary_en:
      'Visitors: patient may receive visitors at time prescribed by medical officer. Visitor may be denied admission if not in patient\'s interest. Visitor name + address entered in book. Visitors may be searched by same-sex staff (not in presence of other patient or visitor). Refusing search = denied admission.',
    q_patterns: [
      /(wageni|visitors|kutembelea).*(hospitali|hospital).*(akili|mental)/i,
      /(naweza.*kumtembelea).*(akili|mental)/i,
    ],
    next_step_sw: 'Piga simu wodi mapema kuomba ratiba ya wageni.',
    citation: `${CITE} · Reg 29`,
  },
  {
    id: 'reg30-penalty',
    reg: 'Reg 30',
    summary_sw:
      'ADHABU YA KUVUNJA: Mtu yeyote anayevunja Regulations hizi anatenda kosa na akipatikana na hatia: faini ISIYOPUNGUA TZS 500,000 au kifungo cha mwaka MMOJA, au yote MAWILI.',
    summary_en:
      'PENALTY: Any person who contravenes these Regulations commits an offence. On conviction: fine of NOT LESS than TZS 500,000 or one year imprisonment, or both.',
    q_patterns: [
      /(adhabu|penalty|faini|kifungo).*(akili|mental)/i,
      /(kuvunja|contravene|breach).*(akili|mental)/i,
    ],
    next_step_sw: 'Kwa wasiwasi wa ukiukwaji, ripoti kwa Mental Health Board kupitia ofisi ya Wizara.',
    citation: `${CITE} · Reg 30`,
  },
]

/** Pattern-match a query against the regulation KB. Returns the best entry
 *  or null if nothing matches. */
export function findRegulationAnswer(query: string): MHRegEntry | null {
  const q = query.toLowerCase()
  for (const e of MH_REG_2016) {
    for (const rx of e.q_patterns) {
      if (rx.test(q)) return e
    }
  }
  return null
}

/** Public entry: returns a formatted answer for the Rafiki UI, or null. */
export function askMHRegulation(query: string): {
  domain: string
  respond: string
  next_step: string
  citation: string
} | null {
  const hit = findRegulationAnswer(query)
  if (!hit) return null
  return {
    domain: 'Tanzania Mental Health Regulations 2016',
    respond: `${hit.reg}: ${hit.summary_sw}`,
    next_step: `Hatua: ${hit.next_step_sw}`,
    citation: hit.citation,
  }
}
