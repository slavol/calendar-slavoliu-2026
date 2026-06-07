-- Calendar 2026 - reset complet pentru Supabase
-- Rulează tot fișierul în Supabase -> SQL Editor -> Run.
-- ATENȚIE: acest script șterge tabelul vechi calendar_events și îl recreează curat.
-- Asta elimină duplicatele și repară structura pentru aplicația nouă.

begin;

drop table if exists public.calendar_events cascade;

drop function if exists public.is_calendar_admin() cascade;
drop function if exists public.touch_updated_at() cascade;

create table public.calendar_events (
  id text primary key,
  title text not null,
  type text not null check (type in ('examen', 'proiect', 'licenta', 'invatat', 'predare', 'liber')),
  start_date date not null,
  end_date date not null,
  notes text default '',
  priority integer not null default 2 check (priority between 1 and 5),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint valid_calendar_range check (start_date <= end_date)
);

create index calendar_events_start_date_idx on public.calendar_events (start_date);
create index calendar_events_end_date_idx on public.calendar_events (end_date);
create index calendar_events_type_idx on public.calendar_events (type);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger calendar_events_touch_updated_at
before update on public.calendar_events
for each row
execute function public.touch_updated_at();

create or replace function public.is_calendar_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((auth.jwt() ->> 'email') = any (array[
    'slavoliu.preda24@gmail.com'
  ]), false);
$$;

alter table public.calendar_events enable row level security;
alter table public.calendar_events force row level security;

create policy "admin_select_calendar_events"
on public.calendar_events
for select
to authenticated
using (public.is_calendar_admin());

create policy "admin_insert_calendar_events"
on public.calendar_events
for insert
to authenticated
with check (public.is_calendar_admin());

create policy "admin_update_calendar_events"
on public.calendar_events
for update
to authenticated
using (public.is_calendar_admin())
with check (public.is_calendar_admin());

create policy "admin_delete_calendar_events"
on public.calendar_events
for delete
to authenticated
using (public.is_calendar_admin());

grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on public.calendar_events to authenticated;

insert into public.calendar_events (id, title, type, start_date, end_date, notes, priority) values
  ('2026-06-08-inchidere-pw', 'Închidere proiect PW', 'proiect', '2026-06-08', '2026-06-08', 'Finalizare și predare proiect PW.', 4),
  ('2026-06-09-examen-pw', 'Examen PW', 'examen', '2026-06-09', '2026-06-09', '', 5),
  ('2026-06-11-examen-ics', 'Examen ICS', 'examen', '2026-06-11', '2026-06-11', '', 5),
  ('2026-06-11-14-proiect-dotnet', 'Proiect .NET', 'proiect', '2026-06-11', '2026-06-14', 'Lucru concentrat pe proiectul .NET.', 4),
  ('2026-06-14-17-proiect-giu', 'Proiect GIU', 'proiect', '2026-06-14', '2026-06-17', 'Lucru concentrat pe proiectul GIU.', 4),
  ('2026-06-18-examen-giu', 'Examen GIU', 'examen', '2026-06-18', '2026-06-18', '', 5),
  ('2026-06-19-21-invatat-dotnet-licenta-liber', 'Învățat pentru .NET / licență / timp liber', 'invatat', '2026-06-19', '2026-06-21', 'Dacă e cazul: învățat pentru .NET. Dacă nu: licență sau timp liber.', 3),
  ('2026-06-22-examen-dotnet', 'Examen .NET', 'examen', '2026-06-22', '2026-06-22', '', 5),
  ('2026-06-23-25-licenta', 'Licență', 'licenta', '2026-06-23', '2026-06-25', 'Perioadă principală pentru licență.', 5),
  ('2026-06-26-examen-cell', 'Examen CELL', 'examen', '2026-06-26', '2026-06-26', '', 5),
  ('2026-06-27-2026-07-20-sisteme-operare', 'Învățat pentru Sisteme de Operare', 'invatat', '2026-06-27', '2026-07-20', 'Pregătire pentru restanță / examen la Sisteme de Operare.', 4),
  ('2026-07-22-predare-licenta-toamna', 'Predare licență pentru sesiunea de toamnă', 'predare', '2026-07-22', '2026-07-22', '', 5),
  ('2026-07-23-2026-09-08-pregatire-licenta', 'Pregătire pentru examenul de licență', 'licenta', '2026-07-23', '2026-09-08', 'Pregătire susținută pentru examenul de licență.', 5)
on conflict (id) do update set
  title = excluded.title,
  type = excluded.type,
  start_date = excluded.start_date,
  end_date = excluded.end_date,
  notes = excluded.notes,
  priority = excluded.priority;

commit;
