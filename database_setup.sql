-- Run this in your Supabase SQL Editor

create table responses (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  response text not null
);

-- Enable Row Level Security (RLS) so people can write to it
alter table responses enable row level security;

-- Allow anyone (anon) to insert data
create policy "Enable insert for everyone" on responses
for insert
with check (true);

-- Allow everyone to read (optional, if you want to show results later)
create policy "Enable read for everyone" on responses
for select
using (true);
