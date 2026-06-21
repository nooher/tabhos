// kb/haki.ts — Tanzania Mental Health Act Ch.98 (2008) — patient rights,
// involuntary admission, Mental Health Review Board, capacity, consent.
// Source: The Mental Health Act, Chapter 98, United Republic of Tanzania.

import type { KbEntry } from './types';
import { KB_SOURCES as S } from './types';

export const HAKI_ENTRIES: KbEntry[] = [
  {
    id: 'mha-overview',
    domain: 'haki',
    questions_sw: [
      'sheria ya afya ya akili tanzania',
      'sheria ya mental health',
      'sheria gani inalinda mtu mwenye ugonjwa wa akili',
    ],
    questions_en: [
      'tanzania mental health act',
      'what law protects mental health patients',
      'mental health law tanzania',
    ],
    answer_sw:
      'Tanzania ina Sheria ya Afya ya Akili (Mental Health Act, Sura ya 98 ya 2008). Inalinda haki za mtu mwenye matatizo ya akili, inaeleza utaratibu wa kulazwa kwa hiari na bila hiari, na kuanzisha Bodi ya Marejeo (Mental Health Review Board).',
    answer_en:
      'Tanzania has the Mental Health Act, Chapter 98 of 2008. It protects the rights of people with mental illness, sets out voluntary and involuntary admission procedures, and establishes the Mental Health Review Board.',
    citations: [`${S.MHA}`],
    followups: [
      'Niambie haki zangu nilipolazwa',
      'Bodi ya Marejeo ni nini?',
      'Nawezaje kukata rufaa?',
    ],
    routing: 'info_only',
  },
  {
    id: 'mha-patient-rights-core',
    domain: 'haki',
    questions_sw: [
      'haki zangu hospitalini kwa magonjwa ya akili',
      'mgonjwa wa akili ana haki gani',
      'haki za mgonjwa wa akili tanzania',
    ],
    questions_en: [
      'patient rights mental health tanzania',
      'what rights does a mental health patient have',
    ],
    answer_sw:
      'Una haki ya: heshima na utu, faragha, kupata habari kuhusu hali yako, kukubali au kukataa matibabu (ukiwa na uwezo), kupata wakili, kuwasiliana na familia, na kukata rufaa Bodi ya Marejeo. Hakuna mtu wa kulazwa kwa nguvu bila utaratibu wa sheria.',
    answer_en:
      'You have the right to: dignity, privacy, information about your condition, to consent to or refuse treatment (when you have capacity), legal representation, family contact, and to appeal to the Review Board. No one may be admitted by force outside the legal procedure.',
    citations: [`${S.MHA} — Part III (Rights of Persons with Mental Illness)`],
    followups: ['Naweza kukataa dawa?', 'Wakili gani anaweza kunisaidia?'],
    routing: 'info_only',
  },
  {
    id: 'mha-voluntary-admission',
    domain: 'haki',
    questions_sw: [
      'kulazwa kwa hiari afya ya akili',
      'voluntary admission tanzania',
      'naweza kujilazwa mwenyewe',
    ],
    questions_en: [
      'voluntary admission mental health',
      'can i admit myself',
      'self admission psychiatric',
    ],
    answer_sw:
      'Kulazwa kwa hiari ni unapokubali mwenyewe kupata matibabu. Unasaini fomu ya idhini ukiwa na ufahamu. Una haki ya kutoka wakati wowote — isipokuwa daktari aone kuwa kuondoka kunaweza kuhatarisha maisha yako au ya wengine, hapo utaratibu wa kulazwa bila hiari unaanza.',
    answer_en:
      'Voluntary admission is when you agree to treatment yourself. You sign an informed consent form. You may discharge yourself anytime — unless a clinician judges that leaving endangers your life or others, which triggers the involuntary admission process.',
    citations: [`${S.MHA} — Part IV (Voluntary Admission)`],
    routing: 'info_only',
  },
  {
    id: 'mha-involuntary-admission',
    domain: 'haki',
    questions_sw: [
      'kulazwa bila hiari',
      'kulazwa kwa nguvu hospitali ya akili',
      'involuntary admission tanzania',
      'kupelekwa mirembe kwa nguvu',
    ],
    questions_en: [
      'involuntary admission tanzania',
      'forced psychiatric admission',
      'committed against will',
    ],
    answer_sw:
      'Kulazwa bila hiari hufanyika tu wakati: mtu ana ugonjwa mzito wa akili, anaweza kujidhuru au kuwadhuru wengine, na hakubali matibabu. Inahitaji vyeti vya madaktari WAWILI walioandikishwa, na kesi inapelekwa Bodi ya Marejeo ndani ya muda mfupi.',
    answer_en:
      'Involuntary admission only happens when: a person has a serious mental illness, is a danger to self or others, and refuses treatment. It requires certificates from TWO registered medical practitioners, and the case must go to the Review Board promptly.',
    citations: [`${S.MHA} — Part V (Involuntary Admission)`],
    followups: ['Bodi ya Marejeo inafanya nini?', 'Naweza kukata rufaa?'],
    routing: 'legal_pathway',
    red_flags: ['legal_capacity'],
  },
  {
    id: 'mha-review-board',
    domain: 'haki',
    questions_sw: [
      'bodi ya marejeo ya afya ya akili',
      'mental health review board tanzania',
      'nani anasimamia hospitali za akili',
    ],
    questions_en: [
      'mental health review board tanzania',
      'who oversees psychiatric admissions',
    ],
    answer_sw:
      'Bodi ya Marejeo ya Afya ya Akili (Mental Health Review Board) ni chombo cha kisheria kinachosimamia kulazwa bila hiari, kupokea malalamiko, na kulinda haki za wagonjwa. Wajumbe ni pamoja na daktari wa akili, jaji/wakili, na mwakilishi wa jamii. Una haki ya kuhutubia Bodi.',
    answer_en:
      'The Mental Health Review Board is a statutory body that supervises involuntary admissions, hears complaints, and protects patient rights. Members include a psychiatrist, a judge/lawyer, and a community representative. You have the right to address the Board.',
    citations: [`${S.MHA} — Part VII (Mental Health Review Board)`],
    routing: 'legal_pathway',
  },
  {
    id: 'mha-appeal-rights',
    domain: 'haki',
    questions_sw: [
      'kukata rufaa kulazwa bila hiari',
      'sikubaliani na kulazwa kwangu',
      'naweza kupingaje matibabu ya akili',
    ],
    questions_en: [
      'appeal involuntary admission',
      'how to challenge psychiatric detention',
    ],
    answer_sw:
      'Unaweza kukata rufaa kwa Bodi ya Marejeo wewe mwenyewe, kupitia ndugu, au wakili. Unaweza pia kuomba msaada wa kisheria bure kupitia Tanganyika Law Society au LHRC. Bodi lazima isikilize kesi yako bila kuchelewa, na uamuzi wake unaweza kupelekwa Mahakama Kuu.',
    answer_en:
      'You may appeal to the Review Board directly, through family, or via a lawyer. You can also seek free legal aid through the Tanganyika Law Society or LHRC. The Board must hear your case promptly, and its decisions may be taken to the High Court.',
    citations: [`${S.MHA} — Part VII`, 'Legal Aid Act (Tanzania, 2017)'],
    routing: 'legal_pathway',
  },
  {
    id: 'mha-consent-capacity',
    domain: 'haki',
    questions_sw: [
      'uwezo wa kufanya maamuzi ya matibabu',
      'idhini ya matibabu ya akili',
      'consent matibabu ya akili',
    ],
    questions_en: [
      'consent capacity mental health',
      'who can refuse treatment',
    ],
    answer_sw:
      'Una uwezo wa kufanya maamuzi (capacity) ikiwa unaweza kuelewa habari, kukumbuka, kupima chaguzi, na kuwasiliana uamuzi wako. Daktari hupima hivi. Hata ukiwa na ugonjwa wa akili, huwezi kufutiwa haki ya kuamua kiotomatiki — lazima ithibitishwe.',
    answer_en:
      'You have decision-making capacity if you can understand information, retain it, weigh choices, and communicate your decision. A clinician assesses this. Having a mental illness does not automatically remove your right to decide — it must be specifically assessed.',
    citations: [`${S.MHA} — Part III §§ on Consent`, `${S.MHGAP} — General Principles`],
    routing: 'info_only',
    red_flags: ['legal_capacity'],
  },
  {
    id: 'mha-refuse-medication',
    domain: 'haki',
    questions_sw: [
      'naweza kukataa dawa za akili',
      'sitaki dawa za akili',
      'haki ya kukataa matibabu',
    ],
    questions_en: [
      'can i refuse psychiatric medication',
      'right to refuse treatment',
    ],
    answer_sw:
      'Ndio — ukiwa na uwezo wa kufanya maamuzi, una haki ya kukataa dawa. Daktari lazima akueleze hatari na faida. Kwa wagonjwa waliolazwa bila hiari, matibabu ya dharura tu yanaweza kutolewa bila idhini, na hata hapo kwa muda mfupi na kwa kuripotiwa Bodi.',
    answer_en:
      'Yes — if you have capacity, you may refuse medication. The clinician must explain risks and benefits. For involuntarily admitted patients, only emergency treatment may be given without consent, and only briefly, with reporting to the Board.',
    citations: [`${S.MHA} — Part III`, `${S.MHGAP} — Principles of Care`],
    routing: 'info_only',
  },
  {
    id: 'mha-restraint-seclusion',
    domain: 'haki',
    questions_sw: [
      'kufungwa hospitali ya akili',
      'kutengwa peke yako hospitali',
      'seclusion restraint tanzania',
    ],
    questions_en: [
      'restraint seclusion mental hospital',
      'tied up psychiatric ward',
    ],
    answer_sw:
      'Kufungwa au kutengwa ni vya hatari na vinaruhusiwa tu kama hatua ya mwisho kuzuia madhara ya haraka — si adhabu. Lazima viandikwe katika rekodi, viangaliwe kila baada ya muda mfupi, na vipunguzwe haraka iwezekanavyo. Una haki ya kulalamika ukifanyiwa vibaya.',
    answer_en:
      'Restraint or seclusion is dangerous and only permitted as a last resort to prevent imminent harm — never as punishment. It must be documented, reviewed frequently, and stopped as soon as possible. You may complain if mistreated.',
    citations: [`${S.MHA} — Part VI`, 'WHO QualityRights Toolkit'],
    routing: 'legal_pathway',
  },
  {
    id: 'mha-privacy-confidentiality',
    domain: 'haki',
    questions_sw: [
      'usiri wa habari za afya ya akili',
      'nani anaweza kuona rekodi yangu',
      'confidentiality afya ya akili',
    ],
    questions_en: [
      'mental health confidentiality tanzania',
      'who can see my mental health records',
    ],
    answer_sw:
      'Habari zako za afya ya akili ni siri. Daktari hawezi kuzitoa kwa mwajiri, jamaa, au mtu mwingine bila idhini yako ya maandishi — isipokuwa pale sheria inalazimisha (mfano hatari kubwa kwa maisha, au amri ya mahakama).',
    answer_en:
      'Your mental health information is confidential. A clinician cannot share it with an employer, relative, or anyone else without your written consent — except where the law requires (e.g. imminent serious risk, or court order).',
    citations: [`${S.MHA} — Part III`, 'Data Protection Act (Tanzania, 2022)'],
    routing: 'info_only',
  },
  {
    id: 'mha-discrimination-employment',
    domain: 'haki',
    questions_sw: [
      'kunyanyapaliwa kazini kwa magonjwa ya akili',
      'kufukuzwa kazi kwa sababu ya akili',
      'ubaguzi wa afya ya akili',
    ],
    questions_en: [
      'discrimination employment mental illness tanzania',
      'fired because of mental health',
    ],
    answer_sw:
      'Sheria inakataza ubaguzi kwa sababu ya ulemavu au ugonjwa wa akili. Ukifukuzwa au kunyimwa kazi kwa sababu hiyo unaweza kupeleka malalamiko CMA (Commission for Mediation and Arbitration) au kwa Tume ya Haki za Binadamu (CHRAGG).',
    answer_en:
      'The law prohibits discrimination based on disability or mental illness. If you are fired or denied work for this reason you may file a complaint with the CMA (Commission for Mediation and Arbitration) or the Commission for Human Rights (CHRAGG).',
    citations: [
      `${S.MHA}`,
      'Persons with Disabilities Act (Tanzania, 2010)',
      'Employment and Labour Relations Act 2004',
    ],
    routing: 'legal_pathway',
  },
  {
    id: 'mha-children-admission',
    domain: 'haki',
    questions_sw: [
      'mtoto kulazwa hospitali ya akili',
      'mtoto wangu ana matatizo ya akili',
      'admission ya mtoto kwa akili',
    ],
    questions_en: [
      'child psychiatric admission tanzania',
      'minor mental health admission',
    ],
    answer_sw:
      'Mtoto chini ya miaka 18 anaweza kulazwa kwa idhini ya mzazi/mlezi pamoja na tathmini ya daktari. Maoni ya mtoto lazima yasikilizwe kulingana na umri wake. Matibabu lazima yawe ya hekima zaidi (least restrictive). Bodi ya Marejeo inaweza kuhusishwa.',
    answer_en:
      'A child under 18 may be admitted with parent/guardian consent plus clinical assessment. The child\'s views must be heard according to their age. Treatment must be the least restrictive option. The Review Board may be involved.',
    citations: [`${S.MHA}`, 'Law of the Child Act (Tanzania, 2009)'],
    routing: 'legal_pathway',
    red_flags: ['child'],
  },
  {
    id: 'mha-forensic-criminal',
    domain: 'haki',
    questions_sw: [
      'ugonjwa wa akili na uhalifu',
      'mtuhumiwa mwenye akili tete',
      'forensic mental health tanzania',
      'mirembe forensic',
    ],
    questions_en: [
      'mental illness and crime tanzania',
      'forensic psychiatric tanzania',
    ],
    answer_sw:
      'Mtu anayetuhumiwa kosa la jinai akiwa na ugonjwa wa akili anaweza kupelekwa Mirembe (Dodoma) kwa tathmini ya kisaikolojia (forensic assessment). Mahakama inaweza kuagiza matibabu badala ya kifungo. Una haki ya wakili na kupokea matibabu kabla na wakati wa kesi.',
    answer_en:
      'A criminal suspect with mental illness may be sent to Mirembe (Dodoma) for forensic assessment. The court may order treatment instead of imprisonment. You have the right to a lawyer and to treatment before and during proceedings.',
    citations: [`${S.MHA} — Part VIII (Forensic)`, `${S.MIREMBE}`],
    routing: 'legal_pathway',
    red_flags: ['legal_capacity'],
  },
  {
    id: 'mha-traditional-healers',
    domain: 'haki',
    questions_sw: [
      'mganga wa kienyeji na afya ya akili',
      'sheria kuhusu waganga wa kienyeji',
      'traditional healer mental health',
    ],
    questions_en: [
      'traditional healer mental health tanzania law',
    ],
    answer_sw:
      'Sheria ya Tiba Asili (2002) inaratibu waganga wa kienyeji. Wengi Tanzania huenda kwa waganga kwanza. Sheria ya Afya ya Akili haikatazi tiba asili — lakini matibabu yanayodhuru (kufungwa minyororo, kupigwa) ni kosa la jinai. Tafuta msaada wa kliniki sambamba.',
    answer_en:
      'The Traditional Medicines Act (2002) regulates traditional healers. Many Tanzanians consult them first. The Mental Health Act does not forbid traditional care — but harmful practices (chaining, beating) are crimes. Seek clinical help in parallel.',
    citations: [
      `${S.MHA}`,
      'Traditional and Alternative Medicines Act (Tanzania, 2002)',
      `${S.JENKINS}`,
    ],
    routing: 'provider_referral',
  },
  {
    id: 'haki-free-mh-care',
    domain: 'haki',
    questions_sw: [
      'matibabu ya akili bure tanzania',
      'gharama ya matibabu ya akili',
      'nhif inalipia akili',
    ],
    questions_en: [
      'free mental health care tanzania',
      'nhif mental health coverage',
    ],
    answer_sw:
      'Sera ya afya ya Tanzania inatambua afya ya akili kama huduma muhimu. Vituo vya umma (Muhimbili, Mirembe, hospitali za mkoa) hutoa huduma kwa bei nafuu au bure. NHIF/Bima ya Afya hulipia tathmini, kulazwa, na baadhi ya dawa za akili — uliza kituo chako.',
    answer_en:
      'Tanzania health policy recognises mental health as essential care. Public facilities (Muhimbili, Mirembe, regional hospitals) provide services at low cost or free. NHIF covers assessments, admission, and some psychiatric medicines — ask your facility.',
    citations: [`${S.HSSP5}`, 'NHIF Benefit Package'],
    routing: 'info_only',
  },
  {
    id: 'haki-complain-mistreatment',
    domain: 'haki',
    questions_sw: [
      'nimetendewa vibaya hospitalini',
      'kulalamika juu ya daktari wa akili',
      'malalamiko ya kibinadamu afya',
    ],
    questions_en: [
      'complain mistreatment psychiatric tanzania',
      'report bad doctor mental',
    ],
    answer_sw:
      'Unaweza kupeleka malalamiko: 1) Mkuu wa kituo, 2) Bodi ya Marejeo ya Afya ya Akili, 3) Medical Council of Tanganyika (kwa daktari), 4) CHRAGG (Tume ya Haki za Binadamu), 5) Polisi kama ni kosa la jinai. Andika tarehe, mahali, na shahidi.',
    answer_en:
      'You may file complaints with: 1) facility head, 2) Mental Health Review Board, 3) Medical Council of Tanganyika (against a doctor), 4) CHRAGG (Human Rights Commission), 5) Police if it is a crime. Record date, place, witnesses.',
    citations: [`${S.MHA}`, 'CHRAGG Act'],
    routing: 'legal_pathway',
  },
  {
    id: 'haki-mh-and-marriage',
    domain: 'haki',
    questions_sw: [
      'naweza kuoa nikiwa na ugonjwa wa akili',
      'ndoa na akili',
      'mental illness marriage tanzania',
    ],
    questions_en: [
      'can i marry with mental illness tanzania',
    ],
    answer_sw:
      'Ugonjwa wa akili hauondoi haki ya kuoa au kuolewa. Sheria inahitaji idhini ya hiari ya kweli (informed consent). Ikiwa mtu hana uwezo wa kuelewa maana ya ndoa wakati huo, ndoa inaweza kupingwa — lakini ugonjwa peke yake si sababu.',
    answer_en:
      'Mental illness does not remove the right to marry. The law requires genuine informed consent. If a person lacks capacity to understand marriage at that time, the marriage may be challenged — but illness alone is not a bar.',
    citations: [`${S.MHA}`, 'Law of Marriage Act 1971'],
    routing: 'info_only',
  },
  {
    id: 'haki-property-decisions',
    domain: 'haki',
    questions_sw: [
      'mali yangu nikiwa na ugonjwa wa akili',
      'usimamizi wa mali akili tete',
      'guardian mali tanzania',
    ],
    questions_en: [
      'property guardian mental illness tanzania',
    ],
    answer_sw:
      'Ukikosa uwezo wa kusimamia mali, mahakama inaweza kuteua msimamizi (guardian). Hii ni kwa muda — uwezo wako utapimwa upya. Una haki ya kupinga uteuzi, na kupata wakili. Bila amri ya mahakama, hakuna ndugu anayeweza kuchukua mali yako kwa sababu ya ugonjwa.',
    answer_en:
      'If you lack capacity to manage property, the court may appoint a guardian. This is temporary — capacity is re-assessed. You have the right to challenge appointment and to legal counsel. Without a court order, no relative may take your property because of illness.',
    citations: [`${S.MHA} — Part IX`, 'Mental Treatment Act (predecessor)'],
    routing: 'legal_pathway',
  },
  {
    id: 'haki-discharge-process',
    domain: 'haki',
    questions_sw: [
      'kuachiliwa hospitali ya akili',
      'discharge hospitali ya akili',
      'kumaliza matibabu mirembe',
    ],
    questions_en: [
      'discharge from psychiatric hospital tanzania',
    ],
    answer_sw:
      'Kwa kulazwa kwa hiari — unaweza kuomba kuachiliwa wakati wowote. Kwa kulazwa bila hiari — kuachiliwa hutokea wakati daktari anaona huna tena hatari, au Bodi ya Marejeo inaamuru. Mpango wa baada ya hospitali (after-care) ni haki yako: dawa, kliniki ya nje, msaada wa familia.',
    answer_en:
      'Voluntary admission — you may request discharge anytime. Involuntary — discharge occurs when the clinician finds you are no longer a danger, or the Review Board orders it. An after-care plan (medication, outpatient clinic, family support) is your right.',
    citations: [`${S.MHA} — Parts IV–VII`],
    followups: ['Niambie mpango wa baada ya hospitali', 'Kliniki ya nje karibu nami'],
    routing: 'provider_referral',
  },
  {
    id: 'haki-voting-rights',
    domain: 'haki',
    questions_sw: [
      'kupiga kura na ugonjwa wa akili',
      'naweza kupiga kura nikiwa mgonjwa wa akili',
    ],
    questions_en: [
      'voting rights mental illness tanzania',
    ],
    answer_sw:
      'Katiba ya Tanzania inalinda haki ya kupiga kura. Ugonjwa wa akili haukuondolei haki hii kiotomatiki. Unaweza kupiga kura ukiwa na ufahamu wa nini unafanya. Kanuni za uchaguzi zinaweza kuhitaji tathmini katika hali maalum — uliza Tume ya Uchaguzi.',
    answer_en:
      'The Constitution of Tanzania protects the right to vote. Mental illness does not automatically remove this right. You may vote if you understand what you are doing. Electoral rules may require assessment in specific cases — ask the Electoral Commission.',
    citations: ['Constitution of Tanzania Art.5', `${S.MHA}`],
    routing: 'info_only',
  },
  {
    id: 'haki-driving-license',
    domain: 'haki',
    questions_sw: [
      'leseni ya udereva na ugonjwa wa akili',
      'kuendesha gari nikiwa na akili tete',
    ],
    questions_en: [
      'driving license mental illness tanzania',
    ],
    answer_sw:
      'Sheria za usalama barabarani huzuia uendeshaji wakati hali ya akili inaweza kuhatarisha. Hii inajumuisha saikosi isiyodhibitiwa, kifafa kisichodhibitiwa, au athari za dawa. Wakati hali imedhibitiwa na daktari amekupa hati, unaweza kurudi kuendesha.',
    answer_en:
      'Road-safety law restricts driving when a mental condition would create danger. This includes uncontrolled psychosis, uncontrolled seizures, or medication side effects. When stable and certified by a doctor, you may resume driving.',
    citations: ['Road Traffic Act (Tanzania)', `${S.MHA}`],
    routing: 'provider_referral',
  },
  {
    id: 'haki-children-custody',
    domain: 'haki',
    questions_sw: [
      'malezi ya mtoto na ugonjwa wa akili',
      'sitanyangwa mtoto wangu',
      'custody mental illness tanzania',
    ],
    questions_en: [
      'child custody mental illness tanzania',
    ],
    answer_sw:
      'Ugonjwa wa akili peke yake hauondoi haki ya malezi. Mahakama hupima uwezo wako wa kumtunza mtoto, msaada wa familia, na kufuata matibabu. Tafuta wakili na uonyeshe ushahidi wa matibabu, hati za daktari, na utulivu wa hali. Watoto huhitaji wazazi wao.',
    answer_en:
      'Mental illness alone does not remove custody rights. Courts weigh your ability to care for the child, family support, and treatment adherence. Seek a lawyer; show treatment records, doctor letters, stability. Children need their parents.',
    citations: ['Law of the Child Act 2009', `${S.MHA}`, 'Law of Marriage Act 1971'],
    routing: 'legal_pathway',
    red_flags: ['child'],
  },
  {
    id: 'haki-stigma-act',
    domain: 'haki',
    questions_sw: [
      'unyanyapaa sheria tanzania',
      'stigma sheria afya ya akili',
    ],
    questions_en: [
      'stigma law tanzania mental',
    ],
    answer_sw:
      'Sheria inahimiza kupunguza unyanyapaa. Kuita mtu "kichaa" hadharani kwa lengo la kumdhalilisha kunaweza kuwa kashfa. Waajiri, shule, na watoa huduma hawapaswi kubagua. Mpango wa kitaifa wa afya ya akili (HSSP V) unalenga kupunguza unyanyapaa kwa elimu na rufaa ya jamii.',
    answer_en:
      'Law promotes stigma reduction. Publicly calling someone "mad" with intent to demean can be defamation. Employers, schools, and providers must not discriminate. The national mental-health plan (HSSP V) targets stigma reduction through education and community pathways.',
    citations: [`${S.HSSP5}`, `${S.MHA}`, 'Persons with Disabilities Act 2010'],
    routing: 'info_only',
  },
  {
    id: 'haki-research-consent',
    domain: 'haki',
    questions_sw: [
      'utafiti wa afya ya akili',
      'kushiriki research ya akili',
    ],
    questions_en: [
      'mental health research consent tanzania',
    ],
    answer_sw:
      'Utafiti wowote wa afya ya akili lazima upitishwe na IRB ya NIMR. Una haki ya: kueleweshwa hatari na faida, kukubali kwa hiari, kujiondoa wakati wowote bila kupoteza matibabu, na faragha. Kamwe huwezi kulazimishwa kushiriki utafiti — hata ukiwa hospitalini.',
    answer_en:
      'Any mental health research must be approved by NIMR\'s IRB. You have the right to: be informed of risks and benefits, consent voluntarily, withdraw anytime without losing treatment, and confidentiality. You can never be forced into research — even while admitted.',
    citations: ['NIMR Research Ethics Guidelines', `${S.MHA}`, 'WHO QualityRights'],
    routing: 'info_only',
  },
];
