/**
 * Behavioral-health provider directory — the shared source for the public
 * profile page (/p/:slug) and the Find-care directory (/find). Illustrative
 * data for now; the live directory reads from the practice console (wataalam).
 */

export interface Service { name: string; mins: number; price: number; modes: string[] }
export interface Review { name: string; stars: number; when: string; text: string }
export interface Provider {
  slug: string
  name: string
  credential: string
  registration: string
  verified: boolean
  rating: number
  reviewCount: number
  languages: string[]
  location: string
  region: string
  telehealth: boolean
  photo?: string
  clinic: string
  bio: string
  focus: string[]
  approaches: string[]
  services: Service[]
  insurers: string[]
  cash: boolean
  nextSlots: string[]
  reviews: Review[]
}

const REVIEWS_A: Review[] = [
  { name: 'A. K.', stars: 5, when: '2 weeks ago', text: 'Made me feel heard from the first session. Practical tools, real progress.' },
  { name: 'J. M.', stars: 5, when: '1 month ago', text: 'Professional, warm and flexible with video sessions. Highly recommend.' },
  { name: 'S. N.', stars: 4, when: '2 months ago', text: 'Helped me through a very hard time with my anxiety. Grateful.' },
]

export const PROVIDERS: Provider[] = [
  {
    slug: 'dr-asha-mwakalinga', name: 'Dr. Asha Mwakalinga', credential: 'Clinical Psychologist · PhD',
    registration: 'Registered · Medical Council of Tanganyika (MCT-PSY-2214)', verified: true,
    rating: 4.9, reviewCount: 128, languages: ['English', 'Kiswahili'], location: 'Masaki, Dar es Salaam', region: 'Dar es Salaam', telehealth: true,
    clinic: 'Utulivu Mind Practice',
    bio: 'I help adults and adolescents work through anxiety, depression, trauma and life transitions. My approach is warm, practical and evidence-based — we set clear goals, track your progress with validated measures, and move at a pace that feels safe. Sessions are confidential and judgement-free.',
    focus: ['Anxiety', 'Depression', 'Trauma & PTSD', 'Relationships', 'Grief & loss', 'Work stress & burnout', 'Adolescents'],
    approaches: ['Cognitive Behavioural Therapy (CBT)', 'Acceptance & Commitment (ACT)', 'Trauma-focused CBT', 'Motivational Interviewing'],
    services: [
      { name: 'Initial assessment', mins: 60, price: 60000, modes: ['In person', 'Video'] },
      { name: 'Individual therapy', mins: 50, price: 45000, modes: ['In person', 'Video', 'Phone'] },
      { name: 'Couples therapy', mins: 60, price: 70000, modes: ['In person', 'Video'] },
      { name: 'Brief check-in', mins: 20, price: 20000, modes: ['Video', 'Phone', 'Chat'] },
    ],
    insurers: ['NHIF', 'Jubilee Health', 'Britam', 'AAR', 'Strategis'], cash: true,
    nextSlots: ['Today · 4:30 PM', 'Tomorrow · 9:00 AM', 'Tue · 2:00 PM'], reviews: REVIEWS_A,
  },
  {
    slug: 'dr-john-mushi', name: 'Dr. John Mushi', credential: 'Psychiatrist · MMed', registration: 'Registered · Medical Council of Tanganyika (MCT-PSY-1180)',
    verified: true, rating: 4.8, reviewCount: 94, languages: ['English', 'Kiswahili'], location: 'Upanga, Dar es Salaam', region: 'Dar es Salaam', telehealth: true,
    clinic: 'Amani Psychiatry & Wellness',
    bio: 'Consultant psychiatrist supporting adults with mood disorders, psychosis, ADHD and medication management. I combine careful diagnosis, evidence-based prescribing and collaborative care with your therapist and family.',
    focus: ['Depression', 'Bipolar disorder', 'Psychosis', 'ADHD', 'Medication management', 'Anxiety'],
    approaches: ['Measurement-based psychiatric care', 'Collaborative care', 'Psychoeducation'],
    services: [
      { name: 'Psychiatric evaluation', mins: 60, price: 90000, modes: ['In person', 'Video'] },
      { name: 'Medication review', mins: 30, price: 45000, modes: ['In person', 'Video'] },
    ],
    insurers: ['NHIF', 'Jubilee Health', 'AAR'], cash: true, nextSlots: ['Tomorrow · 11:00 AM', 'Thu · 3:30 PM'], reviews: REVIEWS_A,
  },
  {
    slug: 'neema-kileo', name: 'Neema Kileo', credential: 'Counselling Psychologist · MSc', registration: 'Registered counsellor · TACOP-0442',
    verified: true, rating: 4.9, reviewCount: 76, languages: ['Kiswahili', 'English'], location: 'Arusha', region: 'Arusha', telehealth: true,
    clinic: 'Tulia Counselling',
    bio: 'I walk with young adults and couples through anxiety, relationships, self-esteem and burnout. Sessions are unhurried, confidential and grounded in what matters to you.',
    focus: ['Anxiety', 'Relationships', 'Self-esteem', 'Work stress & burnout', 'Grief & loss', 'Students'],
    approaches: ['Person-centred therapy', 'CBT', 'Solution-focused'],
    services: [
      { name: 'Individual counselling', mins: 50, price: 35000, modes: ['In person', 'Video', 'Chat'] },
      { name: 'Couples counselling', mins: 60, price: 55000, modes: ['In person', 'Video'] },
      { name: 'Student check-in', mins: 30, price: 15000, modes: ['Video', 'Chat'] },
    ],
    insurers: ['NHIF', 'Strategis'], cash: true, nextSlots: ['Today · 6:00 PM', 'Wed · 10:00 AM'], reviews: REVIEWS_A,
  },
  {
    slug: 'dr-fatma-said', name: 'Dr. Fatma Said', credential: 'Clinical Psychologist · PhD', registration: 'Registered · MCT-PSY-1902',
    verified: true, rating: 4.7, reviewCount: 51, languages: ['Kiswahili', 'English'], location: 'Zanzibar Town', region: 'Zanzibar', telehealth: true,
    clinic: 'Bahari Mind Health',
    bio: 'Specialist in trauma, women’s mental health and perinatal care. I offer a calm, culturally-grounded space with practical, evidence-based support.',
    focus: ['Trauma & PTSD', 'Women’s mental health', 'Perinatal / postnatal', 'Anxiety', 'Depression'],
    approaches: ['Trauma-focused CBT', 'EMDR', 'Compassion-focused therapy'],
    services: [
      { name: 'Initial assessment', mins: 60, price: 50000, modes: ['In person', 'Video'] },
      { name: 'Therapy session', mins: 50, price: 40000, modes: ['In person', 'Video'] },
    ],
    insurers: ['NHIF', 'Jubilee Health'], cash: true, nextSlots: ['Tomorrow · 2:00 PM', 'Fri · 9:30 AM'], reviews: REVIEWS_A,
  },
  {
    slug: 'baraka-nyoni', name: 'Baraka Nyoni', credential: 'Addiction Counsellor · Adv. Dip.', registration: 'Certified addiction counsellor · TACADA-231',
    verified: false, rating: 4.6, reviewCount: 38, languages: ['Kiswahili', 'English'], location: 'Mwanza', region: 'Mwanza', telehealth: true,
    clinic: 'New Path Recovery',
    bio: 'I support people and families affected by alcohol and substance use, using non-judgemental, stepped care and relapse-prevention planning.',
    focus: ['Addiction', 'Alcohol use', 'Substance use', 'Relapse prevention', 'Family support'],
    approaches: ['Motivational Interviewing', 'Relapse prevention', '12-step facilitation'],
    services: [
      { name: 'Intake & assessment', mins: 60, price: 30000, modes: ['In person', 'Video'] },
      { name: 'Counselling session', mins: 50, price: 25000, modes: ['In person', 'Video', 'Phone'] },
      { name: 'Family session', mins: 60, price: 35000, modes: ['In person', 'Video'] },
    ],
    insurers: ['NHIF'], cash: true, nextSlots: ['Today · 5:00 PM', 'Thu · 1:00 PM'], reviews: REVIEWS_A,
  },
  {
    slug: 'grace-mbwana', name: 'Grace Mbwana', credential: 'Child & Adolescent Therapist · MSc', registration: 'Registered · TACOP-0511',
    verified: true, rating: 5.0, reviewCount: 64, languages: ['English', 'Kiswahili'], location: 'Dodoma', region: 'Dodoma', telehealth: true,
    clinic: 'Kizazi Child Therapy',
    bio: 'I help children, teens and their parents with anxiety, behaviour, school stress and family change — playful, practical and family-centred.',
    focus: ['Children', 'Adolescents', 'Anxiety', 'Behaviour', 'School stress', 'Family therapy'],
    approaches: ['Play therapy', 'CBT for children', 'Parent coaching'],
    services: [
      { name: 'Parent consultation', mins: 45, price: 30000, modes: ['In person', 'Video'] },
      { name: 'Child / teen session', mins: 50, price: 40000, modes: ['In person', 'Video'] },
    ],
    insurers: ['NHIF', 'Britam', 'AAR'], cash: true, nextSlots: ['Tomorrow · 10:30 AM', 'Wed · 4:00 PM'], reviews: REVIEWS_A,
  },
]

export function findProvider(slug?: string): Provider {
  return PROVIDERS.find((p) => p.slug === slug) ?? PROVIDERS[0]
}

export const ALL_FOCUS: string[] = Array.from(new Set(PROVIDERS.flatMap((p) => p.focus))).sort()
export const ALL_INSURERS: string[] = Array.from(new Set(PROVIDERS.flatMap((p) => p.insurers))).sort()
export function startingPrice(p: Provider): number { return Math.min(...p.services.map((s) => s.price)) }
