-- Rulează tot fișierul în Supabase -> SQL Editor -> New query -> Run.
-- Înlocuiește slavoliu.preda24@gmail.com cu emailul tău real înainte de Run.

create extension if not exists pgcrypto;

create table if not exists public.calendar_events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  start_date date not null,
  end_date date not null,
  category text not null default 'invatat',
  priority text not null default 'medie',
  description text default '',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  updated_by text
);

alter table public.calendar_events enable row level security;

drop policy if exists "Public can read calendar events" on public.calendar_events;
drop policy if exists "Admins can insert calendar events" on public.calendar_events;
drop policy if exists "Admins can update calendar events" on public.calendar_events;
drop policy if exists "Admins can delete calendar events" on public.calendar_events;

create policy "Public can read calendar events"
on public.calendar_events
for select
using (true);

create policy "Admins can insert calendar events"
on public.calendar_events
for insert
to authenticated
with check ((auth.jwt() ->> 'email') in ('slavoliu.preda24@gmail.com'));

create policy "Admins can update calendar events"
on public.calendar_events
for update
to authenticated
using ((auth.jwt() ->> 'email') in ('slavoliu.preda24@gmail.com'))
with check ((auth.jwt() ->> 'email') in ('slavoliu.preda24@gmail.com'));

create policy "Admins can delete calendar events"
on public.calendar_events
for delete
to authenticated
using ((auth.jwt() ->> 'email') in ('slavoliu.preda24@gmail.com'));

-- Date inițiale. Dacă ai rulat deja seed din site, nu mai rula partea de mai jos.
insert into public.calendar_events (title, start_date, end_date, category, priority, description) values
('Închidere proiect PW', '2026-06-08', '2026-06-08', 'proiect', 'mare', 'Finalizează și verifică proiectul de PW înainte de examen.'),
('Examen PW', '2026-06-09', '2026-06-09', 'examen', 'mare', 'Zi de examen. Repetă rapid înainte, fără să te obosești inutil.'),
('Examen ICS', '2026-06-11', '2026-06-11', 'examen', 'mare', 'Examen ICS.'),
('Proiect .NET', '2026-06-11', '2026-06-14', 'proiect', 'mare', 'Perioadă dedicată proiectului .NET.'),
('Proiect GIU', '2026-06-14', '2026-06-17', 'proiect', 'mare', 'Perioadă dedicată proiectului GIU.'),
('Examen GIU', '2026-06-18', '2026-06-18', 'examen', 'mare', 'Zi de examen GIU.'),
('Învățat pentru .NET / licență / timp liber', '2026-06-19', '2026-06-21', 'invatat', 'medie', 'Dacă este cazul, înveți pentru .NET. Dacă nu, lucrezi la licență sau iei timp liber.'),
('Examen .NET', '2026-06-22', '2026-06-22', 'examen', 'mare', 'Zi de examen .NET.'),
('Licență', '2026-06-23', '2026-06-25', 'licenta', 'mare', 'Perioadă blocată pentru licență.'),
('Examen CELL', '2026-06-26', '2026-06-26', 'examen', 'mare', 'Zi de examen CELL.'),
('Învățat pentru Sisteme de Operare', '2026-06-27', '2026-07-20', 'invatat', 'mare', 'Bloc mare de pregătire pentru Sisteme de Operare.'),
('Predare licență pentru sesiunea de toamnă', '2026-07-22', '2026-07-22', 'predare', 'mare', 'Deadline de predare pentru sesiunea de toamnă.'),
('Pregătire pentru examenul de licență', '2026-07-23', '2026-09-08', 'licenta', 'mare', 'Pregătire susținută pentru examenul de licență.');
