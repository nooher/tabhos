-- Tumaini storage buckets — provisioned via SQL so they live in migrations
-- and don't drift from the codebase.
--
--   avatars       public read (profile pictures)
--   voice-notes   private (Pumzi recordings + Rafiki voice clips)
--   lab-images    private (lab photo uploads)
--   journal-media private (Mimi journal attachments)

insert into storage.buckets (id, name, public)
values
  ('avatars',       'avatars',       true),
  ('voice-notes',   'voice-notes',   false),
  ('lab-images',    'lab-images',    false),
  ('journal-media', 'journal-media', false)
on conflict (id) do nothing;

-- Owner-scoped policies. The convention is that the first folder in the
-- object key is the auth uid, so a user can only touch their own folder.
--   storage://avatars/<auth.uid()>/profile.png

drop policy if exists "tr avatars read"    on storage.objects;
drop policy if exists "tr avatars write"   on storage.objects;
drop policy if exists "tr voice-notes rw"  on storage.objects;
drop policy if exists "tr lab-images rw"   on storage.objects;
drop policy if exists "tr journal-media rw" on storage.objects;

create policy "tr avatars read"
  on storage.objects for select
  using (bucket_id = 'avatars');

create policy "tr avatars write"
  on storage.objects for all
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  )
  with check (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "tr voice-notes rw"
  on storage.objects for all
  using (
    bucket_id = 'voice-notes'
    and (storage.foldername(name))[1] = auth.uid()::text
  )
  with check (
    bucket_id = 'voice-notes'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "tr lab-images rw"
  on storage.objects for all
  using (
    bucket_id = 'lab-images'
    and (storage.foldername(name))[1] = auth.uid()::text
  )
  with check (
    bucket_id = 'lab-images'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "tr journal-media rw"
  on storage.objects for all
  using (
    bucket_id = 'journal-media'
    and (storage.foldername(name))[1] = auth.uid()::text
  )
  with check (
    bucket_id = 'journal-media'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
