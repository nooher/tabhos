/**
 * TABHOS · Maisha — recovery + learning + livelihood.
 *
 * Ported from THOSPamoja (the retired substance-use/depression recovery app):
 * its distinctive "recovery + economic reintegration" pillar that the rest of
 * TABHOS did not carry — evidence-based recovery programmes with milestones, an
 * agriculture/livelihood curriculum with quizzes, a 4-level badge ladder, and
 * livelihood starter kits gated by that ladder. Content is faithful to the
 * original; bilingual inline (Swahili-first), no external deps.
 */

// ── Curriculum ───────────────────────────────────────────────────────────────
export type LessonLevel = 1 | 2 | 3 | 4
export interface QuizQuestion {
  q_sw: string; q_en: string
  options: { sw: string; en: string }[]
  correct: number
  explanation_sw: string
}
export interface Lesson {
  id: string
  track: string
  level: LessonLevel
  order: number
  title_sw: string; title_en: string
  summary_sw: string; summary_en: string
  duration_min: number
  key_takeaways: string[]
  quiz: QuizQuestion[]
}

export const LEVEL_LABELS: Record<LessonLevel, { sw: string; en: string }> = {
  1: { sw: 'Hatua ya Utulivu', en: 'Stabilization Phase' },
  2: { sw: 'Kujenga Ujuzi', en: 'Skill Building Phase' },
  3: { sw: 'Tayari kwa Kazi', en: 'Livelihood Readiness' },
  4: { sw: 'Mchangiaji wa Jamii', en: 'Community Contributor' },
}

export const TRACKS = [
  { key: 'kilimo', emoji: '🌱', sw: 'Kilimo cha Kisasa', en: 'Modern Agriculture' },
  { key: 'ufugaji', emoji: '🐔', sw: 'Ufugaji', en: 'Livestock' },
  { key: 'biashara', emoji: '📊', sw: 'Biashara ya Shambani', en: 'Farm Business' },
  { key: 'maji', emoji: '💧', sw: 'Maji na Umwagiliaji', en: 'Water & Irrigation' },
  { key: 'hali_ya_hewa', emoji: '🌿', sw: 'Kilimo cha Hali ya Hewa', en: 'Climate-Smart Farming' },
  { key: 'lishe', emoji: '🥗', sw: 'Lishe na Usalama wa Chakula', en: 'Nutrition & Food Security' },
] as const

export const LESSONS: Lesson[] = [
  {
    id: 'kilimo-1-1', track: 'kilimo', level: 1, order: 1,
    title_sw: 'Karibu shambani: Misingi ya Udongo', title_en: 'Welcome to the Farm: Soil Basics',
    summary_sw: 'Jifunze aina za udongo zilizopo Tanzania na ni mazao gani yanafaa kwa kila aina.',
    summary_en: 'Learn Tanzanian soil types and which crops thrive in each.',
    duration_min: 5,
    key_takeaways: [
      'Udongo wa mfinyanzi (clay) — mahindi, mpunga',
      'Udongo wa kichanga (sandy) — karoti, viazi vitamu',
      'Udongo wa lomu (loam) — mbogamboga zote',
      'Pima udongo: shika kiasi mkononi, ukinata = mfinyanzi, ukibomoka = kichanga',
    ],
    quiz: [{
      q_sw: 'Ukishika udongo mkononi unanata kabisa. Ni aina gani?',
      q_en: 'You squeeze soil in your hand and it sticks firmly. What type?',
      options: [
        { sw: 'Udongo wa mfinyanzi (clay)', en: 'Clay soil' },
        { sw: 'Udongo wa kichanga (sandy)', en: 'Sandy soil' },
        { sw: 'Udongo wa lomu', en: 'Loam' },
        { sw: 'Udongo wa kokoto', en: 'Gravel' },
      ],
      correct: 0,
      explanation_sw: 'Udongo wa mfinyanzi unashikamana kwa sababu una chembe ndogo sana. Unafaa kwa mpunga lakini si mzuri kwa mboga ndogo.',
    }],
  },
  {
    id: 'kilimo-1-2', track: 'kilimo', level: 1, order: 2,
    title_sw: 'Kupanda Mahindi: Hatua kwa Hatua', title_en: 'Planting Maize: Step by Step',
    summary_sw: 'Mchakato kamili wa kupanda mahindi — kuanzia kuchagua mbegu hadi mavuno.',
    summary_en: 'Complete process from seed selection to harvest.',
    duration_min: 7,
    key_takeaways: [
      'Mbegu bora: nunua kwa mawakala wa serikali (kama SeedCo, ASA)',
      'Nafasi: cm 75 kati ya mistari, cm 30 kati ya mimea',
      'Mbolea ya kupandia: NPK 17:17:17 kijiko kimoja kwa shimo',
      'Subiri mvua ya kweli (sio za kwanza) kabla ya kupanda',
    ],
    quiz: [{
      q_sw: 'Nafasi sahihi kati ya mistari ya mahindi ni ipi?',
      q_en: 'What is the correct spacing between maize rows?',
      options: [{ sw: 'cm 75', en: '75 cm' }, { sw: 'cm 30', en: '30 cm' }, { sw: 'cm 150', en: '150 cm' }, { sw: 'cm 10', en: '10 cm' }],
      correct: 0,
      explanation_sw: 'Cm 75 kati ya mistari na cm 30 kati ya mimea huipa mahindi nafasi ya kutosha ya mwanga na virutubisho.',
    }],
  },
  {
    id: 'ufugaji-1-1', track: 'ufugaji', level: 1, order: 1,
    title_sw: 'Ufugaji wa Kuku wa Kienyeji', title_en: 'Free-range Chicken Farming',
    summary_sw: 'Anza na kuku 10 — banda, chakula, na kinga ya magonjwa.',
    summary_en: 'Start with 10 chickens — coop, feed, disease prevention.',
    duration_min: 6,
    key_takeaways: [
      'Banda: usalama dhidi ya wanyama, hewa ya kutosha',
      'Chakula: pumba, mahindi, mboga, mabaki ya jikoni',
      'Chanjo: Newcastle (Mwezi 1, 3, 6), Gumboro (siku 14)',
      'Maji safi kila siku — pia ni kinga muhimu',
    ],
    quiz: [{
      q_sw: 'Chanjo ipi ni muhimu zaidi kwa kuku dhidi ya ugonjwa unaoua kundi zima?',
      q_en: 'Which vaccine is most important against the disease that wipes out a whole flock?',
      options: [{ sw: 'Newcastle', en: 'Newcastle' }, { sw: 'Gumboro', en: 'Gumboro' }, { sw: 'Hakuna', en: 'None' }, { sw: 'Kichaa cha mbwa', en: 'Rabies' }],
      correct: 0,
      explanation_sw: 'Newcastle (mdondo) huua kundi zima haraka. Chanja mwezi 1, 3 na 6 bila kukosa.',
    }],
  },
  {
    id: 'biashara-2-1', track: 'biashara', level: 2, order: 1,
    title_sw: 'Kuhesabu Faida ya Shamba', title_en: 'Calculating Farm Profit',
    summary_sw: 'Mapato − Gharama = Faida. Jifunze kuandika kila shilingi.',
    summary_en: 'Income − Costs = Profit. Track every shilling.',
    duration_min: 8,
    key_takeaways: [
      'Gharama zote: mbegu, mbolea, kazi, usafiri',
      'Mapato: kiasi cha mauzo + matumizi ya nyumbani',
      'Tumia kitabu kidogo au app kuandika kila siku',
      'Faida = Mapato − Gharama. Kama hasara, jiulize ni nini kibadilike',
    ],
    quiz: [{
      q_sw: 'Umeuza mazao TSh 500,000; gharama zote zilikuwa TSh 320,000. Faida ni?',
      q_en: 'You sold produce for TSh 500,000; total costs were TSh 320,000. Profit is?',
      options: [{ sw: 'TSh 180,000', en: 'TSh 180,000' }, { sw: 'TSh 820,000', en: 'TSh 820,000' }, { sw: 'TSh 320,000', en: 'TSh 320,000' }, { sw: 'TSh 500,000', en: 'TSh 500,000' }],
      correct: 0,
      explanation_sw: 'Faida = Mapato (500,000) − Gharama (320,000) = TSh 180,000.',
    }],
  },
  {
    id: 'maji-2-1', track: 'maji', level: 2, order: 1,
    title_sw: 'Umwagiliaji wa Matone (Drip)', title_en: 'Drip Irrigation',
    summary_sw: 'Tumia maji kidogo kupata mavuno makubwa — mbinu ya matone.',
    summary_en: 'Use little water for a big harvest — the drip method.',
    duration_min: 6,
    key_takeaways: [
      'Matone hupeleka maji moja kwa moja kwenye mzizi — hakuna upotevu',
      'Inatumia maji 40–60% pungufu kuliko kumwagilia kwa jembe la maji',
      'Bomba za bei nafuu zinapatikana; unaweza kuanza na chupa za plastiki',
      'Mwagilia asubuhi au jioni — jua kali hupoteza maji',
    ],
    quiz: [{
      q_sw: 'Kwa nini umwagiliaji wa matone ni bora wakati wa uhaba wa maji?',
      q_en: 'Why is drip irrigation better when water is scarce?',
      options: [
        { sw: 'Hupeleka maji kwenye mzizi, hakuna upotevu', en: 'Delivers water to the root, no waste' },
        { sw: 'Ni ghali zaidi', en: 'It is more expensive' },
        { sw: 'Hutumia maji zaidi', en: 'It uses more water' },
        { sw: 'Hauhitaji jua', en: 'Needs no sun' },
      ],
      correct: 0,
      explanation_sw: 'Matone huweka maji pale yanapohitajika — mizizini — hivyo hata maji kidogo yanatosha.',
    }],
  },
  {
    id: 'hali-3-1', track: 'hali_ya_hewa', level: 3, order: 1,
    title_sw: 'Kilimo Wakati wa Ukame', title_en: 'Farming During Drought',
    summary_sw: 'Mbinu za kuokoa mavuno wakati mvua hazitabiriki.',
    summary_en: 'Save the harvest when rains are unpredictable.',
    duration_min: 7,
    key_takeaways: [
      'Mazao yanayostahimili: mtama, ulezi, viazi vitamu, mihogo',
      'Funika udongo kwa nyasi (mulching) — inahifadhi unyevu',
      'Tumia chembechembe ndogo za maji (drip)',
      'Panda safu mara kwa mara — sio shamba lote kwa siku moja',
    ],
    quiz: [{
      q_sw: 'Zao lipi hustahimili ukame vizuri zaidi?',
      q_en: 'Which crop best withstands drought?',
      options: [{ sw: 'Mtama', en: 'Sorghum' }, { sw: 'Mpunga', en: 'Rice' }, { sw: 'Kabichi', en: 'Cabbage' }, { sw: 'Nyanya', en: 'Tomato' }],
      correct: 0,
      explanation_sw: 'Mtama, ulezi, mihogo na viazi vitamu hustahimili ukame — hupenda joto na maji kidogo.',
    }],
  },
  {
    id: 'lishe-1-1', track: 'lishe', level: 1, order: 1,
    title_sw: 'Sahani ya Afya kwa Familia', title_en: 'A Healthy Plate for the Family',
    summary_sw: 'Chakula bora kutoka shambani lako — bila gharama kubwa.',
    summary_en: 'Good nutrition from your own farm — without big cost.',
    duration_min: 5,
    key_takeaways: [
      'Sahani bora: wanga (ugali/wali), protini (maharage/samaki), mboga za majani, tunda',
      'Mboga za majani (mchicha, sukuma) zina madini ya chuma — huzuia upungufu wa damu',
      'Mtoto chini ya miaka 5 anahitaji mlo wa mara 5 kwa siku',
      'Kausha mbogamboga za ziada kwa matumizi ya kiangazi',
    ],
    quiz: [{
      q_sw: 'Ni kikundi kipi cha chakula hutoa madini ya chuma yanayozuia upungufu wa damu?',
      q_en: 'Which food group provides the iron that prevents anaemia?',
      options: [
        { sw: 'Mboga za majani (mchicha, sukuma)', en: 'Leafy greens (spinach, kale)' },
        { sw: 'Sukari', en: 'Sugar' },
        { sw: 'Mafuta', en: 'Oil' },
        { sw: 'Chumvi', en: 'Salt' },
      ],
      correct: 0,
      explanation_sw: 'Mboga za majani zina madini ya chuma na folate — muhimu kwa damu, hasa kwa wajawazito na watoto.',
    }],
  },
]

// ── Recovery programmes (with milestones + evidence) ─────────────────────────
export type MilestoneUnit = 'day' | 'week'
export interface Milestone { day_or_week: number; unit: MilestoneUnit; title_sw: string; title_en: string; description_sw: string }
export interface Citation { authors: string; year: number; title: string; source?: string; note?: string }
export interface Program {
  id: string
  category: string
  name_sw: string; name_en: string
  short_desc_sw: string; short_desc_en: string
  duration_weeks: number
  daily_minutes: number
  origin: string
  best_for_sw: string; best_for_en: string
  milestones: Milestone[]
  citations: Citation[]
}

export const PROGRAMS: Program[] = [
  {
    id: 'smart', category: 'substance', name_sw: 'SMART Recovery — Wiki 12', name_en: 'SMART Recovery — 12 Weeks',
    short_desc_sw: 'Mfumo wa kisayansi wa kujikomboa kutoka pombe/madawa, hauhitaji imani ya kidini.',
    short_desc_en: 'Science-based path to freedom from substances; secular alternative to 12-step.',
    duration_weeks: 12, daily_minutes: 15, origin: 'SMART Recovery International (1994)',
    best_for_sw: 'Watu wanaopendelea mfumo wa CBT/REBT, sio wa kidini.', best_for_en: 'People who prefer CBT/REBT framework over spiritual model.',
    milestones: [
      { day_or_week: 1, unit: 'week', title_sw: 'Kujenga Motisha', title_en: 'Building Motivation', description_sw: 'Pima faida na hasara za kuendelea. Andika sababu zako 5 za kuacha.' },
      { day_or_week: 2, unit: 'week', title_sw: 'Kupambana na Tamaa', title_en: 'Coping with Urges', description_sw: 'Jifunze DEADS: Deny, Escape, Avoid, Distract, Substitute.' },
      { day_or_week: 3, unit: 'week', title_sw: 'Kubadilisha Mawazo', title_en: 'Managing Thoughts', description_sw: 'CBT thought records kwa kila tamaa kubwa.' },
      { day_or_week: 4, unit: 'week', title_sw: 'Kuishi kwa Usawa', title_en: 'Living a Balanced Life', description_sw: 'Jaza kalenda yako na shughuli za maana zinazoondoa nafasi ya kurudi.' },
      { day_or_week: 6, unit: 'week', title_sw: 'Tathmini ya Nusu', title_en: 'Halfway Review', description_sw: 'Tafakari kuhusu maendeleo. Rekebisha mpango wako.' },
      { day_or_week: 9, unit: 'week', title_sw: 'Kuzuia Kurudia', title_en: 'Relapse Prevention', description_sw: 'Tambua ishara za hatari na utengeneze mpango wa dharura.' },
      { day_or_week: 12, unit: 'week', title_sw: 'Sherehe + Hatua Inayofuata', title_en: 'Celebrate + Next Steps', description_sw: 'Hatua 12 zimekamilika. Endelea na kikundi cha kila wiki.' },
    ],
    citations: [
      { authors: 'Beck AK, Forbes E, Baker AL, et al.', year: 2017, title: 'Systematic review of SMART Recovery: Outcomes, process variables, and implications', source: 'Psychology of Addictive Behaviors 31(1)', note: 'Comparable outcomes to 12-step, better for non-religious participants.' },
      { authors: 'Ellis A', year: 1994, title: 'Rational Emotive Behavior Therapy', note: 'Theoretical foundation: irrational beliefs drive addictive behavior.' },
    ],
  },
  {
    id: '12step', category: 'substance', name_sw: 'Hatua 12 (AA / NA) — Wiki 16', name_en: '12-Step Program — 16 Weeks',
    short_desc_sw: 'Mfumo wa kawaida wa kupona kupitia kikundi cha rika na imani.',
    short_desc_en: 'Traditional peer-based spiritual recovery framework (AA/NA).',
    duration_weeks: 16, daily_minutes: 20, origin: 'Alcoholics Anonymous (1939)',
    best_for_sw: 'Watu wanaopenda mfumo wa kikundi, mwongozo wa kiroho, na mlezi (sponsor).', best_for_en: 'People who value group identity, spiritual framework, and sponsorship.',
    milestones: [
      { day_or_week: 1, unit: 'week', title_sw: 'Hatua 1 — Kukubali', title_en: 'Step 1 — Acceptance', description_sw: 'Kukubali kwamba pombe/madawa imekuwa nguvu juu yako.' },
      { day_or_week: 2, unit: 'week', title_sw: 'Hatua 2-3 — Tumaini', title_en: 'Steps 2-3 — Hope', description_sw: 'Tafuta nguvu kubwa kuliko wewe.' },
      { day_or_week: 4, unit: 'week', title_sw: 'Hatua 4-5 — Tafakari', title_en: 'Steps 4-5 — Inventory', description_sw: 'Andika kile ulichofanya. Shiriki na mlezi.' },
      { day_or_week: 7, unit: 'week', title_sw: 'Hatua 6-9 — Marekebisho', title_en: 'Steps 6-9 — Amends', description_sw: 'Tafuta msamaha kwa watu uliowakwaza.' },
      { day_or_week: 12, unit: 'week', title_sw: 'Hatua 10-12 — Maisha Mapya', title_en: 'Steps 10-12 — Service', description_sw: 'Kuishi kwa kuwasaidia wengine wanaopona.' },
      { day_or_week: 16, unit: 'week', title_sw: 'Maisha ya Kazi', title_en: 'Ongoing Practice', description_sw: 'Endelea na vikundi vya kila wiki.' },
    ],
    citations: [
      { authors: 'Kelly JF, Humphreys K, Ferri M', year: 2020, title: 'Alcoholics Anonymous and other 12-step programs for alcohol use disorder', source: 'Cochrane Database of Systematic Reviews', note: 'Review of 27 studies (10,565 participants): AA more effective than CBT for abstinence at 12 months.' },
    ],
  },
  {
    id: 'ba_4w', category: 'depression', name_sw: 'Behavioral Activation — Wiki 4', name_en: 'Behavioral Activation — 4 Weeks',
    short_desc_sw: 'Rudisha furaha kupitia matendo madogo madogo ya kila siku.', short_desc_en: 'Restore joy through small daily actions.',
    duration_weeks: 4, daily_minutes: 10, origin: 'Lewinsohn, Dimidjian (2006)',
    best_for_sw: 'Huzuni ya wastani. Inafanya kazi haraka — wiki 2 unaona mabadiliko.', best_for_en: 'Mild-moderate depression. Often works in 2 weeks.',
    milestones: [
      { day_or_week: 1, unit: 'week', title_sw: 'Andika Shughuli + Hisia', title_en: 'Activity + Mood Tracking', description_sw: 'Andika kila kitu unachofanya na hisia zako saa kwa saa.' },
      { day_or_week: 2, unit: 'week', title_sw: 'Chagua 3 Shughuli za Furaha', title_en: 'Schedule 3 Joy Activities', description_sw: 'Wiki nzima, panga shughuli 3 zinazokuletea furaha hata kidogo.' },
      { day_or_week: 3, unit: 'week', title_sw: 'Ongeza Shughuli za Kuwajibika', title_en: 'Add Mastery Activities', description_sw: 'Shughuli zinazokupa hisia ya "nimefanya".' },
      { day_or_week: 4, unit: 'week', title_sw: 'Tathmini + Mpango wa Kudumu', title_en: 'Review + Sustaining Plan', description_sw: 'Linganisha hisia wiki 1 vs wiki 4. Tengeneza ratiba ya kudumu.' },
    ],
    citations: [
      { authors: 'Dimidjian S, Hollon SD, Dobson KS, et al.', year: 2006, title: 'Randomized trial of behavioral activation, cognitive therapy, and antidepressant medication in major depression', source: 'Journal of Consulting and Clinical Psychology', note: 'BA matched or exceeded CBT and antidepressants for moderate-severe depression.' },
      { authors: 'Ekers D, Webster L, Van Straten A, et al.', year: 2014, title: 'Behavioural activation for depression: an update of meta-analysis', source: 'PLoS One', note: '26 studies, effect size 0.74 vs control.' },
    ],
  },
  {
    id: 'cbt_anxiety_8w', category: 'anxiety', name_sw: 'CBT kwa Wasiwasi — Wiki 8', name_en: 'CBT for Anxiety — 8 Weeks',
    short_desc_sw: 'Mfumo wa kisayansi wa kupambana na hofu na wasiwasi.', short_desc_en: 'Evidence-based path through fear and anxiety.',
    duration_weeks: 8, daily_minutes: 15, origin: 'Beck, Clark, Barlow',
    best_for_sw: 'Wasiwasi wa kawaida (GAD), hofu (panic), hofu ya kijamii.', best_for_en: 'Generalised anxiety, panic, social anxiety.',
    milestones: [
      { day_or_week: 1, unit: 'week', title_sw: 'Elimu kuhusu Wasiwasi', title_en: 'Anxiety Education', description_sw: 'Jifunze jinsi mwili wako unavyojibu hofu. Sio ugonjwa, ni mfumo wa kinga uliopita kiasi.' },
      { day_or_week: 2, unit: 'week', title_sw: 'Pumzi + Utulivu wa Mwili', title_en: 'Breathing + Relaxation', description_sw: 'Pumzi za 4-7-8, body scan.' },
      { day_or_week: 3, unit: 'week', title_sw: 'Kutambua Mawazo Mabaya', title_en: 'Identify Distorted Thoughts', description_sw: 'CBT thought records kila siku.' },
      { day_or_week: 5, unit: 'week', title_sw: 'Kupinga Mawazo', title_en: 'Challenging Thoughts', description_sw: 'Tafuta ushahidi dhidi ya mawazo ya hofu.' },
      { day_or_week: 6, unit: 'week', title_sw: 'Exposure Pole pole', title_en: 'Gradual Exposure', description_sw: 'Kukabiliana na mambo unayoogopa, kidogo kidogo.' },
      { day_or_week: 8, unit: 'week', title_sw: 'Mpango wa Kudumu', title_en: 'Maintenance Plan', description_sw: 'Ratiba ya kuendelea bila kurudi nyuma.' },
    ],
    citations: [
      { authors: 'Hofmann SG, Asnaani A, Vonk IJJ, et al.', year: 2012, title: 'The Efficacy of Cognitive Behavioral Therapy: A Review of Meta-analyses', source: 'Cognitive Therapy and Research 36', note: 'Strongest evidence base of any psychotherapy for anxiety.' },
    ],
  },
  {
    id: 'mbsr_4w', category: 'mindfulness', name_sw: 'MBSR ya Kifupi — Wiki 4', name_en: 'Short MBSR — 4 Weeks',
    short_desc_sw: 'Mindfulness-Based Stress Reduction ya muda mfupi — programu ya kawaida ni wiki 8.', short_desc_en: 'Adapted from the standard 8-week MBSR programme.',
    duration_weeks: 4, daily_minutes: 20, origin: 'Jon Kabat-Zinn, U-Mass Medical (1979)',
    best_for_sw: 'Stress ya muda mrefu, maumivu ya muda mrefu, kujifunza kuwa hapa sasa.', best_for_en: 'Chronic stress, chronic pain, learning to be present.',
    milestones: [
      { day_or_week: 1, unit: 'week', title_sw: 'Body Scan ya Kila Siku', title_en: 'Daily Body Scan', description_sw: 'Dakika 20 kuangalia mwili sehemu kwa sehemu, bila hukumu.' },
      { day_or_week: 2, unit: 'week', title_sw: 'Pumzi kama Nanga', title_en: 'Breath as Anchor', description_sw: 'Mindful breathing 15 min/siku. Akili itatangatanga — rudi kwa pumzi.' },
      { day_or_week: 3, unit: 'week', title_sw: 'Hisia bila Kujibu', title_en: 'Sitting with Sensations', description_sw: 'Tambua hisia mwilini bila kujaribu kuzibadilisha.' },
      { day_or_week: 4, unit: 'week', title_sw: 'Ushirikiano wa Mazoezi', title_en: 'Integration', description_sw: 'Unganisha mindfulness na maisha ya kila siku — chakula, kazi, mahusiano.' },
    ],
    citations: [
      { authors: 'Goyal M, Singh S, Sibinga EM, et al.', year: 2014, title: 'Meditation programs for psychological stress and well-being: a systematic review and meta-analysis', source: 'JAMA Internal Medicine 174(3)', note: 'Strong evidence for MBSR reducing anxiety, depression, and pain.' },
    ],
  },
  {
    id: 'wrap', category: 'recovery_general', name_sw: 'WRAP — Mpango wa Maisha Bora', name_en: 'WRAP — Wellness Recovery Action Plan',
    short_desc_sw: 'Mpango kamili wa kibinafsi wa kupona na kuishi vyema kila siku.', short_desc_en: 'Comprehensive personal plan for daily wellness and recovery.',
    duration_weeks: 6, daily_minutes: 15, origin: 'Mary Ellen Copeland (1997)',
    best_for_sw: 'Wagonjwa wa afya ya akili wanaotaka mfumo wa kibinafsi wa kudumu.', best_for_en: 'Anyone in mental health recovery who wants their own ongoing plan.',
    milestones: [
      { day_or_week: 1, unit: 'week', title_sw: 'Sanduku la Vifaa vya Maisha Bora', title_en: 'Wellness Toolbox', description_sw: 'Orodha ya vitu vinavyokufanya ujisikie vizuri (mtu, mahali, shughuli).' },
      { day_or_week: 2, unit: 'week', title_sw: 'Ratiba ya Kila Siku', title_en: 'Daily Maintenance List', description_sw: 'Mambo ya kila siku yanayokuweka katika afya.' },
      { day_or_week: 3, unit: 'week', title_sw: 'Vichocheo + Ishara za Onyo', title_en: 'Triggers + Early Warning Signs', description_sw: 'Tambua dalili kabla mambo hayajazidi.' },
      { day_or_week: 4, unit: 'week', title_sw: 'Wakati Mambo Yanapozidi', title_en: 'When Things Break Down', description_sw: 'Mpango wa hatua za haraka.' },
      { day_or_week: 5, unit: 'week', title_sw: 'Mpango wa Dharura (Crisis)', title_en: 'Crisis Plan', description_sw: 'Maagizo kwa wapendwa wakati hauwezi kuamua mwenyewe.' },
      { day_or_week: 6, unit: 'week', title_sw: 'Mpango wa Baada ya Dharura', title_en: 'Post-Crisis Plan', description_sw: 'Jinsi ya kurudi kwenye maisha ya kawaida.' },
    ],
    citations: [
      { authors: 'Cook JA, Copeland ME, Hamilton MM, et al.', year: 2012, title: 'RCT of Effects of Wellness Recovery Action Planning on Depression, Anxiety, and Recovery', source: 'Psychiatric Services 63(6)', note: 'Significant reduction in symptoms and increase in self-perceived recovery.' },
    ],
  },
]

// ── Livelihood starter kits (gated by badge level) ───────────────────────────
export interface Kit { id: string; emoji: string; title_sw: string; title_en: string; description_sw: string; description_en: string; requires_level: number; extra_sw: string; extra_en: string; cost_estimate_tsh: number }
export const KITS: Kit[] = [
  { id: 'veg_plot', emoji: '🥬', title_sw: 'Bustani ya Mbogamboga', title_en: 'Vegetable Garden Plot', description_sw: 'Eneo dogo la mbogamboga: nyanya, sukuma wiki, kabichi. Inarudisha pesa haraka.', description_en: 'A small plot for vegetables: tomato, sukuma wiki, cabbage. Quick return.', requires_level: 1, extra_sw: 'maji ya umwagiliaji', extra_en: 'irrigation water', cost_estimate_tsh: 150000 },
  { id: 'poultry_starter', emoji: '🐔', title_sw: 'Kuku Kumi (Poultry Starter)', title_en: 'Ten Chickens Starter Kit', description_sw: 'Kuku 10, banda, chakula cha mwezi mmoja, na mentor wa karibu.', description_en: '10 chickens, coop, one month of feed, and a local mentor.', requires_level: 2, extra_sw: 'kibali cha kikundi', extra_en: 'group endorsement', cost_estimate_tsh: 280000 },
  { id: 'cooperative', emoji: '🤝', title_sw: 'Kikundi cha Ushirika', title_en: 'Farming Cooperative Member', description_sw: 'Jiunge na kikundi cha wanachama 8–12. Mavuno yanagawanywa.', description_en: 'Join a group of 8–12 members. Harvest is shared.', requires_level: 2, extra_sw: 'mahojiano', extra_en: 'interview', cost_estimate_tsh: 50000 },
  { id: 'goat_pair', emoji: '🐐', title_sw: 'Mbuzi Wawili (Goat Pair)', title_en: 'Goat Pair Program', description_sw: 'Mbuzi 2 (jike na dume), banda, na ushauri wa daktari wa mifugo.', description_en: '2 goats (doe + buck), shelter, and veterinary guidance.', requires_level: 3, extra_sw: 'ardhi ya kutosha', extra_en: 'sufficient land', cost_estimate_tsh: 450000 },
]

// ── Badge ladder ─────────────────────────────────────────────────────────────
export interface BadgeReq {
  level: number; emoji: string; title_sw: string; title_en: string; description_sw: string; description_en: string
  lessons_required: number; checkin_streak_days: number; reflections: number; stable_days: number
}
export const BADGES: BadgeReq[] = [
  { level: 1, emoji: '🌱', title_sw: 'Hatua ya Utulivu', title_en: 'Stabilization Phase', description_sw: 'Umejifunza misingi na umeweka rekodi ya utulivu wako. Ni mwanzo mzuri.', description_en: 'You have learned the basics and tracked your steadiness. A strong start.', lessons_required: 3, checkin_streak_days: 14, reflections: 5, stable_days: 14 },
  { level: 2, emoji: '🌿', title_sw: 'Kujenga Ujuzi', title_en: 'Skill Building Phase', description_sw: 'Umeendelea kujifunza na unaonyesha utulivu wa kihisia. Ujuzi unakua.', description_en: 'You keep learning and show emotional steadiness. Skills are growing.', lessons_required: 8, checkin_streak_days: 30, reflections: 15, stable_days: 30 },
  { level: 3, emoji: '🌳', title_sw: 'Tayari kwa Kazi', title_en: 'Livelihood Readiness', description_sw: 'Unajua kuhesabu faida, kupanda, na kufuga. Unaweza kuanza shamba la kwanza.', description_en: 'You can count profit, plant, and raise livestock. You can start your first plot.', lessons_required: 16, checkin_streak_days: 60, reflections: 30, stable_days: 60 },
  { level: 4, emoji: '🌾', title_sw: 'Mchangiaji wa Jamii', title_en: 'Community Contributor', description_sw: 'Wewe ni mfano kwa wengine. Unaweza kuwa mentor kwa wanaorudi nyumbani.', description_en: 'You are an example for others. You can mentor those returning home.', lessons_required: 24, checkin_streak_days: 90, reflections: 60, stable_days: 90 },
]

export const lessonById = (id: string) => LESSONS.find((l) => l.id === id)
export const programById = (id: string) => PROGRAMS.find((p) => p.id === id)
export const lessonsByTrack = (track: string) => LESSONS.filter((l) => l.track === track).sort((a, b) => a.level - b.level || a.order - b.order)
