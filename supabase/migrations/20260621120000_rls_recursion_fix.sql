-- Fix infinite RLS recursion: tr_users SELECT policy called tr_is_role()
-- which itself queries tr_users, retriggering the policy. Result was
--   "stack depth limit exceeded"
-- on every authenticated read.
--
-- Fix: make both helper functions SECURITY DEFINER so they bypass RLS,
-- and explicitly pin search_path = public, pg_temp so callers can't
-- inject a shadow tr_users via search_path tricks.

create or replace function tr_current_user_id() returns uuid
language sql stable security definer set search_path = public, pg_temp as $$
  select id from tr_users where auth_id = auth.uid() limit 1;
$$;

create or replace function tr_is_role(r tr_role) returns boolean
language sql stable security definer set search_path = public, pg_temp as $$
  select exists (select 1 from tr_users where auth_id = auth.uid() and role = r);
$$;

revoke all on function tr_current_user_id() from public;
revoke all on function tr_is_role(tr_role)  from public;
grant execute on function tr_current_user_id() to authenticated;
grant execute on function tr_is_role(tr_role)  to authenticated;

-- ---------------------------------------------------------------------------
-- Auto-mirror auth.users → tr_users on first session.
-- ---------------------------------------------------------------------------
create or replace function tr_handle_new_user() returns trigger
language plpgsql security definer set search_path = public, pg_temp as $$
declare
  v_persona text;
  v_role    tr_role;
  v_display text;
begin
  v_persona := new.raw_user_meta_data->>'persona';
  v_display := coalesce(new.raw_user_meta_data->>'display_name', new.email);

  v_role := case v_persona
              when 'asha'      then 'provider'::tr_role
              when 'salima'    then 'provider'::tr_role
              when 'kalumuna'  then 'employer'::tr_role
              when 'komba'     then 'school'::tr_role
              when 'mtumbe'    then 'researcher'::tr_role
              when 'baloh'     then 'researcher'::tr_role
              when 'ps'        then 'admin'::tr_role
              when 'nooher'    then 'admin'::tr_role
              else 'patient'::tr_role
            end;

  insert into tr_users (auth_id, role, display_name, lang, region)
  values (new.id, v_role, v_display, 'sw', 'Dar')
  on conflict (auth_id) do nothing;

  return new;
end$$;

drop trigger if exists tr_on_auth_user_created on auth.users;
create trigger tr_on_auth_user_created
  after insert on auth.users
  for each row execute function tr_handle_new_user();
