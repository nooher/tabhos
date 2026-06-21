-- Seed clinical demo data so every persona, on first sign-in, lands inside
-- a workspace with realistic content.
-- Idempotent: deterministic UUIDs + ON CONFLICT DO NOTHING.

do $$
declare
  asha_uid     uuid := (select id from auth.users where email = 'asha@tumaini.demo');
  salima_uid   uuid := (select id from auth.users where email = 'salima@tumaini.demo');
  asha_pid     uuid := (select id from tr_users where auth_id = asha_uid);
  salima_pid   uuid := (select id from tr_users where auth_id = salima_uid);

  mteja_ids   uuid[] := array[
    '11111111-aaaa-1111-aaaa-000000000001'::uuid,
    '11111111-aaaa-1111-aaaa-000000000002'::uuid,
    '11111111-aaaa-1111-aaaa-000000000003'::uuid,
    '11111111-aaaa-1111-aaaa-000000000004'::uuid,
    '11111111-aaaa-1111-aaaa-000000000005'::uuid,
    '11111111-aaaa-1111-aaaa-000000000006'::uuid,
    '11111111-aaaa-1111-aaaa-000000000007'::uuid
  ];
  mteja_labels text[] := array['Mteja A','Mteja B','Mteja C','Mteja D','Mteja E','Mteja F','Mteja G'];

  asha_provider_id   uuid := '22222222-bbbb-2222-bbbb-000000000001'::uuid;
  salima_provider_id uuid := '22222222-bbbb-2222-bbbb-000000000002'::uuid;

  i int;
  pid uuid;
begin
  -- 7 anonymous patient rows.
  for i in 1 .. array_length(mteja_ids, 1) loop
    insert into tr_users (id, auth_id, role, display_name, lang, region)
    values (mteja_ids[i], null, 'patient', mteja_labels[i], 'sw', 'Dar')
    on conflict (id) do nothing;
  end loop;

  -- Provider rows.
  if asha_pid is not null then
    insert into tr_providers (id, user_id, kind, bio_sw, bio_en, languages, regions, fee_default, accepts_insurance, modalities, verified)
    values (asha_provider_id, asha_pid, 'clinician',
            'Daktari wa magonjwa ya akili — Dar es Salaam.',
            'Psychiatrist based in Dar es Salaam.',
            array['sw','en'], array['Dar es Salaam'], 50000, array['NHIF','Jubilee'],
            array['virtual','in_person']::tr_modality[], true)
    on conflict (id) do nothing;
  end if;

  if salima_pid is not null then
    insert into tr_providers (id, user_id, kind, bio_sw, languages, regions, fee_default, accepts_insurance, modalities, verified)
    values (salima_provider_id, salima_pid, 'lay_counsellor',
            'Mshauri wa kijamii — Friendship Bench, Mwanza.',
            array['sw'], array['Mwanza'], 0, array['cash'],
            array['in_person']::tr_modality[], true)
    on conflict (id) do nothing;
  end if;

  -- Appointments today.
  if asha_pid is not null then
    insert into tr_appointments (id, patient_id, provider_id, modality, status, scheduled_at, duration_min, notes)
    values
      ('33333333-cccc-3333-cccc-000000000001'::uuid, mteja_ids[1], asha_provider_id,
       'in_person'::tr_modality, 'confirmed'::tr_appt_status,
       date_trunc('day', now()) + interval '9 hours', 45,
       'Sonona — ufuatiliaji'),
      ('33333333-cccc-3333-cccc-000000000002'::uuid, mteja_ids[2], asha_provider_id,
       'virtual'::tr_modality, 'confirmed'::tr_appt_status,
       date_trunc('day', now()) + interval '10 hours', 45,
       'Tathmini ya kwanza'),
      ('33333333-cccc-3333-cccc-000000000003'::uuid, mteja_ids[3], asha_provider_id,
       'virtual'::tr_modality, 'confirmed'::tr_appt_status,
       date_trunc('day', now()) + interval '11 hours 30 minutes', 30,
       'CBT kipindi cha 4')
    on conflict (id) do nothing;
  end if;

  -- Outcomes — PHQ-9 trajectory dropping (treatment working).
  insert into tr_outcomes (id, patient_id, instrument, score, delta, measured_at)
  values
    ('44444444-dddd-4444-dddd-000000000001'::uuid, mteja_ids[1], 'PHQ-9', 18, null,  now() - interval '60 days'),
    ('44444444-dddd-4444-dddd-000000000002'::uuid, mteja_ids[1], 'PHQ-9', 14, -4,    now() - interval '45 days'),
    ('44444444-dddd-4444-dddd-000000000003'::uuid, mteja_ids[1], 'PHQ-9',  9, -5,    now() - interval '30 days'),
    ('44444444-dddd-4444-dddd-000000000004'::uuid, mteja_ids[1], 'PHQ-9',  6, -3,    now() - interval '15 days'),
    ('44444444-dddd-4444-dddd-000000000005'::uuid, mteja_ids[2], 'GAD-7', 16, null,  now() - interval '50 days'),
    ('44444444-dddd-4444-dddd-000000000006'::uuid, mteja_ids[2], 'GAD-7', 11, -5,    now() - interval '25 days'),
    ('44444444-dddd-4444-dddd-000000000007'::uuid, mteja_ids[2], 'GAD-7',  7, -4,    now() - interval '10 days'),
    ('44444444-dddd-4444-dddd-000000000008'::uuid, mteja_ids[3], 'PHQ-9', 22, null,  now() - interval '40 days'),
    ('44444444-dddd-4444-dddd-000000000009'::uuid, mteja_ids[3], 'PHQ-9', 17, -5,    now() - interval '20 days')
  on conflict (id) do nothing;

  -- Maria's screening + journal.
  pid := (select id from tr_users where auth_id = (select id from auth.users where email = 'maria@tumaini.demo'));
  if pid is not null then
    insert into tr_screen_results (id, user_id, instrument, score, severity, taken_at)
    values
      ('55555555-eeee-5555-eeee-000000000001'::uuid, pid, 'phq9', 17, 'moderate',  now() - interval '80 days'),
      ('55555555-eeee-5555-eeee-000000000002'::uuid, pid, 'phq9', 14, 'moderate',  now() - interval '50 days'),
      ('55555555-eeee-5555-eeee-000000000003'::uuid, pid, 'phq9', 11, 'mild',      now() - interval '20 days'),
      ('55555555-eeee-5555-eeee-000000000004'::uuid, pid, 'phq9',  9, 'mild',      now() - interval '3 days')
    on conflict (id) do nothing;

    insert into tr_journal_entries (id, user_id, body, mood, tags, created_at)
    values
      ('66666666-ffff-6666-ffff-000000000001'::uuid, pid,
       'Leo nimepata amani sana baada ya maombi ya alfajiri.',
       7, array['shukrani','imani'], now() - interval '2 days'),
      ('66666666-ffff-6666-ffff-000000000002'::uuid, pid,
       'Kazi ilikuwa ngumu lakini nilijivuta. Mood ipo katikati.',
       5, array['kazi','mvumilivu'], now() - interval '5 days')
    on conflict (id) do nothing;
  end if;

  -- Research consents (3 Mteja patients consenting to PhD study).
  for i in 1 .. 3 loop
    insert into tr_research_consents (id, user_id, protocol_id, irb_ref, granted, granted_at)
    values
      (gen_random_uuid(), mteja_ids[i],
       'Tumaini-HSSR-PhD-001', 'UAMS-IRB-2026-014', true,
       now() - interval '90 days')
    on conflict do nothing;
  end loop;

  -- Audit log entry.
  insert into tr_audit_log (id, actor_id, action, entity, entity_id, meta, at)
  values
    ('77777777-7777-7777-7777-000000000001'::uuid, asha_pid, 'seed_demo', 'tr_outcomes', null,
     jsonb_build_object('seeded_by','migration','note','Tumaini clinical demo'), now())
  on conflict (id) do nothing;
end$$;
