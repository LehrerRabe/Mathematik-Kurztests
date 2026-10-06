-- ============================================================
-- Mathe-Kurztests  |  Supabase-Schema
-- Einmalig im Supabase SQL-Editor ausfuehren (Run).
-- ============================================================

create table if not exists classes (
  id          text primary key,
  name        text not null,
  students    jsonb not null default '[]'::jsonb,
  created_at  timestamptz not null default now()
);

create table if not exists tests (
  id          text primary key,
  name        text not null,
  grade       int  not null,
  topics      jsonb not null default '[]'::jsonb,
  items       jsonb not null default '[]'::jsonb,
  scale       jsonb,
  created_at  timestamptz not null default now()
);

create table if not exists assignments (
  id          text primary key,
  test_id     text not null references tests(id) on delete cascade,
  class_id    text not null references classes(id) on delete cascade,
  code        text not null unique,
  date        date not null default current_date,
  active      boolean not null default true,
  created_at  timestamptz not null default now()
);

create table if not exists results (
  id            text primary key,
  assignment_id text references assignments(id) on delete cascade,
  class_id      text references classes(id) on delete cascade,
  test_id       text references tests(id) on delete cascade,
  test_name     text,
  student       text not null,
  date          date not null default current_date,
  points        numeric,
  max_points    numeric,
  percent       numeric,
  grade_text    text,
  grade_nk      numeric,
  answers       jsonb,
  created_at    timestamptz not null default now()
);

create index if not exists results_class_idx on results(class_id, date);
create index if not exists assignments_code_idx on assignments(code);

-- ------------------------------------------------------------
-- Zugriff: Die App arbeitet ohne Login mit dem oeffentlichen
-- "anon"-Schluessel. Deshalb sind die Policies bewusst offen.
-- Bitte keine sensiblen Daten speichern (Vornamen oder Kuerzel
-- genuegen). Wer den Link und den Schluessel hat, kann die
-- Daten lesen und schreiben.
-- ------------------------------------------------------------
alter table classes     enable row level security;
alter table tests       enable row level security;
alter table assignments enable row level security;
alter table results     enable row level security;

drop policy if exists p_classes     on classes;
drop policy if exists p_tests       on tests;
drop policy if exists p_assignments on assignments;
drop policy if exists p_results     on results;

create policy p_classes     on classes     for all using (true) with check (true);
create policy p_tests       on tests       for all using (true) with check (true);
create policy p_assignments on assignments for all using (true) with check (true);
create policy p_results     on results     for all using (true) with check (true);
