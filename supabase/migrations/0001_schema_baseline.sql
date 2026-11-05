-- =============================================================================
-- Global Solutions — schéma de référence (projet global-solutions)
-- =============================================================================
-- Ce fichier décrit l'état du schéma tel qu'il existe dans le projet Supabase
-- `zjfrxfddrzkvpgtaorqp`. Il sert de sauvegarde lisible et permet de recréer la
-- base sur un projet vierge :
--
--   psql "$SUPABASE_DB_URL" -f 0001_schema_baseline.sql
--
-- Ne pas rejouer sur le projet de production : les objets existent déjà.
-- Les migrations réellement appliquées sont listées via `supabase migration list`.
-- =============================================================================

create extension if not exists pgcrypto;

-- -----------------------------------------------------------------------------
-- Helpers de rôle (SECURITY DEFINER : évite la récursion RLS sur profiles)
-- -----------------------------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
$$;

create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'editor'))
$$;

-- -----------------------------------------------------------------------------
-- Profils (rôles liés à auth.users)
-- -----------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'editor'
);

alter table public.profiles enable row level security;

create policy profiles_self on public.profiles
  for select to authenticated
  using (id = auth.uid() or public.is_admin());

-- -----------------------------------------------------------------------------
-- Réalisations
-- -----------------------------------------------------------------------------
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  title_en text,
  category text not null,
  category_en text,
  location text,
  year integer,
  client text,
  description text,
  description_en text,
  status text,
  image_urls text[] not null default '{}',
  featured boolean not null default false,
  sort_order integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.projects enable row level security;

create policy projects_read on public.projects
  for select to public
  using (published or public.is_staff());

create policy projects_write on public.projects
  for all to authenticated
  using (public.is_staff())
  with check (public.is_staff());

-- -----------------------------------------------------------------------------
-- Équipe
-- -----------------------------------------------------------------------------
create table if not exists public.team (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  position text not null,
  position_en text,
  bio text,
  bio_en text,
  photo_url text,
  sort_order integer not null default 0,
  published boolean not null default false
);

alter table public.team enable row level security;

create policy team_read on public.team
  for select to public
  using (published or public.is_staff());

create policy team_write on public.team
  for all to authenticated
  using (public.is_staff())
  with check (public.is_staff());

-- -----------------------------------------------------------------------------
-- Actualités
-- -----------------------------------------------------------------------------
create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  title_en text,
  body text not null default '',
  body_en text,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.articles enable row level security;

create policy articles_read on public.articles
  for select to public
  using (published or public.is_staff());

create policy articles_write on public.articles
  for all to authenticated
  using (public.is_staff())
  with check (public.is_staff());

-- -----------------------------------------------------------------------------
-- Documents téléchargeables
-- -----------------------------------------------------------------------------
create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  title_en text,
  file_url text not null,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.documents enable row level security;

create policy documents_read on public.documents
  for select to public
  using (published or public.is_staff());

create policy documents_write on public.documents
  for all to authenticated
  using (public.is_staff())
  with check (public.is_staff());

-- -----------------------------------------------------------------------------
-- Réglages éditoriaux (JSONB : homepage, contact)
-- -----------------------------------------------------------------------------
create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null,
  published boolean not null default true
);

alter table public.site_settings enable row level security;

create policy settings_read on public.site_settings
  for select to public
  using (published or public.is_staff());

create policy settings_write on public.site_settings
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- -----------------------------------------------------------------------------
-- Demandes de contact : écriture réservée à la fonction edge (service_role)
-- -----------------------------------------------------------------------------
create table if not exists public.contact_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  organisation text,
  email text not null,
  phone text,
  service text not null,
  message text not null,
  status text not null default 'nouveau',
  created_at timestamptz not null default now(),
  attachment_path text,
  attachment_name text,
  notification_status text not null default 'pending',
  notification_error text
);

alter table public.contact_requests enable row level security;

create policy contact_staff_read on public.contact_requests
  for select to authenticated
  using (public.is_staff());

create policy contact_staff_update on public.contact_requests
  for update to authenticated
  using (public.is_staff())
  with check (public.is_staff());

-- Aucun droit d'écriture direct pour anon / authenticated : seul le service_role
-- (utilisé par la fonction contact-submit) peut insérer.
revoke insert, update, delete on public.contact_requests from anon;
revoke insert, delete on public.contact_requests from authenticated;

-- -----------------------------------------------------------------------------
-- Limitation de débit du formulaire (5 demandes / 15 min par empreinte IP)
-- -----------------------------------------------------------------------------
create table if not exists public.contact_rate_limits (
  key text primary key,
  window_start timestamptz not null,
  hits integer not null default 0
);

alter table public.contact_rate_limits enable row level security;

create or replace function public.check_contact_rate(p_key text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  current_hits integer;
begin
  if p_key is null or length(p_key) <> 64 then
    return false;
  end if;

  delete from public.contact_rate_limits where window_start < now() - interval '1 day';

  insert into public.contact_rate_limits as r (key, window_start, hits)
  values (p_key, now(), 1)
  on conflict (key) do update
    set window_start = case
          when r.window_start < now() - interval '15 minutes' then now()
          else r.window_start
        end,
        hits = case
          when r.window_start < now() - interval '15 minutes' then 1
          else r.hits + 1
        end
  returning hits into current_hits;

  return current_hits <= 5;
end;
$$;

-- -----------------------------------------------------------------------------
-- Stockage
-- -----------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('site-media', 'site-media', false, 10485760,
   array['image/jpeg', 'image/png', 'image/webp', 'application/pdf']),
  ('contact-attachments', 'contact-attachments', false, 5242880,
   array['application/pdf', 'image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

-- Médias : lecture publique uniquement pour les fichiers référencés par un
-- contenu publié (URLs signées à l'affichage), écriture réservée au personnel.
create policy site_media_published_read on storage.objects
  for select to anon, authenticated
  using (
    bucket_id = 'site-media' and (
      exists (select 1 from public.projects p where p.published and objects.name = any (p.image_urls))
      or exists (select 1 from public.documents d where d.published and d.file_url = objects.name)
      or exists (select 1 from public.team t where t.published and t.photo_url = objects.name)
    )
  );

create policy site_media_staff_read on storage.objects
  for select to authenticated
  using (bucket_id = 'site-media' and public.is_staff());

create policy site_media_staff_insert on storage.objects
  for insert to authenticated
  with check (bucket_id = 'site-media' and public.is_staff());

create policy site_media_staff_update on storage.objects
  for update to authenticated
  using (bucket_id = 'site-media' and public.is_staff())
  with check (bucket_id = 'site-media' and public.is_staff());

create policy site_media_staff_delete on storage.objects
  for delete to authenticated
  using (bucket_id = 'site-media' and public.is_staff());

create policy contact_attachment_staff_read on storage.objects
  for select to authenticated
  using (bucket_id = 'contact-attachments' and public.is_staff());

-- -----------------------------------------------------------------------------
-- Contenus initiaux
-- -----------------------------------------------------------------------------
insert into public.site_settings (key, value, published) values
  ('homepage', jsonb_build_object(
     'year', '2017',
     'location', 'Niger',
     'team_size', '~10',
     'expertise_count', '6',
     'headline_first', 'Construire aujourd’hui.',
     'headline_second', 'Servir demain.',
     'headline_first_en', 'Building today.',
     'headline_second_en', 'Serving tomorrow.',
     'subtitle', 'À vos côtés pour concevoir et réaliser des projets durables en génie civil, hydraulique et énergie.',
     'subtitle_en', 'Supporting civil engineering, water and energy projects in Niger.'
   ), true),
  ('contact', jsonb_build_object(
     'address', 'Quartier Kouara Kano, N° 80, rue KK 33',
     'postal', 'BP 11661, Niamey, Niger',
     'phone_primary', '+227 90 39 31 32',
     'phone_secondary', '+227 98 33 61 91',
     'email_primary', 'info@globalsolutions.one',
     'email_secondary', '',
     'notification_email', 'globalsolution877@gmail.com',
     'notification_from', '',
     'whatsapp', '22790393132',
     'facebook', '',
     'linkedin', '',
     'youtube', ''
   ), true)
on conflict (key) do nothing;
