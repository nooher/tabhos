-- Expand tr_users SELECT policy so providers can see the display_name of
-- patients they have a relationship with (appointment / care plan /
-- referral / supervision). Without this, joins like
--   tr_appointments JOIN tr_users ON patient_id
-- silently return NULL for patient.display_name even though the provider
-- legitimately owns the appointment row.

drop policy if exists tr_users_self on tr_users;

create policy tr_users_self on tr_users for select
  using (
    auth_id = auth.uid()
    or tr_is_role('admin')
    or exists (
      -- Provider sees patients they have an appointment / care plan / referral with.
      select 1
      from tr_providers p
      where p.user_id = tr_current_user_id()
        and (
          exists (select 1 from tr_appointments a where a.provider_id = p.id and a.patient_id = tr_users.id)
          or exists (select 1 from tr_care_plans cp where cp.provider_id = p.id and cp.patient_id = tr_users.id)
          or exists (
            select 1 from tr_referrals r
            where (r.from_provider_id = p.id or r.to_provider_id = p.id) and r.patient_id = tr_users.id
          )
        )
    )
  );
