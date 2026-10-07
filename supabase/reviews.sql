-- Run once in your Supabase SQL Editor. Keys stay on the Next.js server.
create table if not exists public.reviews (
 id bigint generated always as identity primary key,
 name text not null check (char_length(name) between 2 and 80),
 email text not null,
 city text not null,
 service text not null,
 rating integer not null check (rating between 1 and 5),
 body text not null check (char_length(body) between 20 and 2000),
 consent integer not null default 1 check (consent=1),
 approved integer not null default 0 check (approved in (0,1)),
 created_at bigint not null
);
create index if not exists reviews_email_created_idx on public.reviews(email,created_at);
alter table public.reviews enable row level security;
revoke all on public.reviews from anon, authenticated;
grant select,insert,update on public.reviews to service_role;
grant usage,select on sequence public.reviews_id_seq to service_role;
