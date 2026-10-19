-- ============================================================================
-- Sales Tracker — Supabase setup SQL
-- Run this whole file once in the Supabase Dashboard: SQL Editor → New query.
-- ============================================================================

-- 1) Main table: one row per user, ALL app data lives in the JSONB column.
create table if not exists public.user_data (
  user_id    uuid primary key default auth.uid() references auth.users on delete cascade,
  data       jsonb,
  updated_at timestamptz default now()
);

-- 2) Managers table: user_ids that may read the whole team.
create table if not exists public.managers (
  user_id uuid primary key references auth.users on delete cascade
);

-- 3) Row Level Security on user_data.
alter table public.user_data enable row level security;

-- Drop old policies if re-running.
drop policy if exists "Users can read own row"   on public.user_data;
drop policy if exists "Users can insert own row" on public.user_data;
drop policy if exists "Users can update own row" on public.user_data;
drop policy if exists "Managers can read all rows" on public.user_data;

-- Users can only SELECT their own row.
create policy "Users can read own row"
  on public.user_data for select
  using (auth.uid() = user_id);

-- Users can only INSERT their own row.
create policy "Users can insert own row"
  on public.user_data for insert
  with check (auth.uid() = user_id);

-- Users can only UPDATE their own row.
create policy "Users can update own row"
  on public.user_data for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Managers can read ALL rows.
create policy "Managers can read all rows"
  on public.user_data for select
  using (
    exists (select 1 from public.managers where managers.user_id = auth.uid())
  );

-- 4) Keep updated_at fresh.
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists trg_touch_updated_at on public.user_data;
create trigger trg_touch_updated_at
  before update on public.user_data
  for each row execute function public.touch_updated_at();

-- ============================================================================
-- 5) ADD A MANAGER BY EMAIL
-- The manager must already have created an account in the app (signed up once).
-- Then run this (replace the email), as a project owner in the SQL editor:
-- ============================================================================
-- insert into public.managers (user_id)
-- select id from auth.users where email = 'manager@example.com'
-- on conflict (user_id) do nothing;
