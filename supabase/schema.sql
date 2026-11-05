-- SHO Equine Sports Medicine — database schema + Row Level Security.
-- Run this once in the Supabase SQL editor of a fresh project.
-- RLS is what actually protects patient data: the NEXT_PUBLIC_SUPABASE_ANON_KEY
-- is safe to ship to the browser only because every table below has it enabled.

-- 1. Profiles -----------------------------------------------------------
-- Extends auth.users with an application role. A real vet account must be
-- promoted manually: update profiles set role = 'veterinario' where id = '<uuid>';
create table if not exists profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'propietario' check (role in ('propietario', 'veterinario')),
  nombre_completo text,
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;

create policy "profiles: ver el propio" on profiles
  for select using (auth.uid() = id);

-- Auto-create a profile row whenever someone signs up.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id) values (new.id);
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Helper: is the current user a vet?
create or replace function public.is_veterinario()
returns boolean as $$
  select exists (select 1 from profiles where id = auth.uid() and role = 'veterinario');
$$ language sql stable security definer;

-- 2. Caballos (patients) -------------------------------------------------
create table if not exists caballos (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade,
  nombre text not null,
  foto_url text,
  edad int,
  peso_kg numeric,
  disciplina text,
  created_at timestamptz not null default now()
);

alter table caballos enable row level security;

create policy "caballos: propietario ve los suyos" on caballos
  for select using (owner_id = auth.uid() or public.is_veterinario());

create policy "caballos: veterinario administra" on caballos
  for insert with check (public.is_veterinario());

create policy "caballos: veterinario actualiza" on caballos
  for update using (public.is_veterinario());

-- 3. Registros clínicos ---------------------------------------------------
create table if not exists registros_clinicos (
  id uuid primary key default gen_random_uuid(),
  caballo_id uuid not null references caballos (id) on delete cascade,
  tipo text not null check (tipo in ('consulta', 'vacunacion', 'procedimiento', 'seguimiento')),
  titulo text not null,
  descripcion text,
  fecha date not null default current_date,
  veterinario text
);

alter table registros_clinicos enable row level security;

create policy "registros: ver si es mi caballo o soy vet" on registros_clinicos
  for select using (
    public.is_veterinario()
    or exists (select 1 from caballos c where c.id = caballo_id and c.owner_id = auth.uid())
  );

create policy "registros: solo el veterinario escribe" on registros_clinicos
  for insert with check (public.is_veterinario());

-- 4. Imágenes diagnósticas -------------------------------------------------
create table if not exists imagenes_diagnosticas (
  id uuid primary key default gen_random_uuid(),
  caballo_id uuid not null references caballos (id) on delete cascade,
  tipo text not null check (tipo in ('radiografia', 'ecografia', 'endoscopia')),
  url text not null,
  descripcion text,
  fecha date not null default current_date
);

alter table imagenes_diagnosticas enable row level security;

create policy "imagenes: ver si es mi caballo o soy vet" on imagenes_diagnosticas
  for select using (
    public.is_veterinario()
    or exists (select 1 from caballos c where c.id = caballo_id and c.owner_id = auth.uid())
  );

create policy "imagenes: solo el veterinario sube" on imagenes_diagnosticas
  for insert with check (public.is_veterinario());

-- Storage: create a private bucket for these images from the Supabase dashboard
-- (Storage > New bucket > "diagnosticas", Public = off), then add a matching
-- storage.objects policy restricting access the same way as the table above.

-- 5. Chat interno (propietario <-> veterinario) ----------------------------
create table if not exists mensajes_chat (
  id uuid primary key default gen_random_uuid(),
  caballo_id uuid not null references caballos (id) on delete cascade,
  autor_id uuid not null references auth.users (id),
  autor_rol text not null check (autor_rol in ('propietario', 'veterinario')),
  contenido text not null,
  created_at timestamptz not null default now()
);

alter table mensajes_chat enable row level security;

create policy "chat: ver si es mi caballo o soy vet" on mensajes_chat
  for select using (
    public.is_veterinario()
    or exists (select 1 from caballos c where c.id = caballo_id and c.owner_id = auth.uid())
  );

create policy "chat: escribir si es mi caballo o soy vet" on mensajes_chat
  for insert with check (
    autor_id = auth.uid()
    and (
      public.is_veterinario()
      or exists (select 1 from caballos c where c.id = caballo_id and c.owner_id = auth.uid())
    )
  );

-- Enable Realtime on this table from Database > Replication in the dashboard
-- so ChatPanel's `postgres_changes` subscription receives new messages.
