create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  service text not null,
  preferred_date date not null,
  preferred_time time,
  message text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create table if not exists public.portfolio_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  description text,
  image_url text not null,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.bookings enable row level security;
alter table public.portfolio_items enable row level security;

create policy "Published portfolio items are public"
on public.portfolio_items
for select
using (is_published = true);

insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do update set public = true;

create policy "Public portfolio images are readable"
on storage.objects
for select
using (bucket_id = 'portfolio');
