-- ─────────────────────────────────────────────────────────────
-- LawdMemory v0.1 schema
-- Run this in: Supabase Dashboard → SQL Editor → New query
-- ─────────────────────────────────────────────────────────────

-- 1. Enable pgvector for embeddings
create extension if not exists vector;

-- 2. Memories table
create table if not exists public.memories (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users(id) on delete cascade not null,

  type        text not null check (type in (
    'commit', 'pr', 'issue', 'incident', 'decision', 'note'
  )),
  label       text not null,
  content     text not null,
  metadata    jsonb default '{}'::jsonb,

  -- OpenAI text-embedding-3-small → 1536 dims
  embedding   vector(1536),

  created_at  timestamptz default now(),
  source_at   timestamptz
);

create index if not exists memories_user_created_idx
  on public.memories (user_id, created_at desc);

-- Vector similarity index (IVFFlat, cosine distance)
-- NOTE: rebuild after ingesting ~1000+ rows for better quality
create index if not exists memories_embedding_idx
  on public.memories
  using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

-- 3. Row-Level Security — users can only see their own memories
alter table public.memories enable row level security;

drop policy if exists "memories: select own" on public.memories;
create policy "memories: select own"
  on public.memories for select
  using (auth.uid() = user_id);

drop policy if exists "memories: insert own" on public.memories;
create policy "memories: insert own"
  on public.memories for insert
  with check (auth.uid() = user_id);

drop policy if exists "memories: update own" on public.memories;
create policy "memories: update own"
  on public.memories for update
  using (auth.uid() = user_id);

drop policy if exists "memories: delete own" on public.memories;
create policy "memories: delete own"
  on public.memories for delete
  using (auth.uid() = user_id);

-- 4. RPC for semantic search via cosine similarity
create or replace function public.match_memories(
  query_embedding vector(1536),
  match_count     int default 10,
  match_threshold float default 0.2,
  filter_user_id  uuid default null
)
returns table (
  id          uuid,
  type        text,
  label       text,
  content     text,
  metadata    jsonb,
  created_at  timestamptz,
  similarity  float
)
language sql stable
as $$
  select
    m.id,
    m.type,
    m.label,
    m.content,
    m.metadata,
    m.created_at,
    1 - (m.embedding <=> query_embedding) as similarity
  from public.memories m
  where
    (filter_user_id is null or m.user_id = filter_user_id)
    and m.embedding is not null
    and 1 - (m.embedding <=> query_embedding) > match_threshold
  order by m.embedding <=> query_embedding
  limit match_count;
$$;
