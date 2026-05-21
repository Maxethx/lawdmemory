import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { embed } from "@/lib/openai";

const MEMORY_TYPES = ["commit", "pr", "issue", "incident", "decision", "note"] as const;

const CreateMemorySchema = z.object({
  type:     z.enum(MEMORY_TYPES),
  label:    z.string().min(1).max(280),
  content:  z.string().min(1).max(8000),
  metadata: z.record(z.string(), z.unknown()).optional(),
  source_at: z.string().datetime().optional(),
});

/** GET /api/memories — list current user's memories (most recent first). */
export async function GET(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "20", 10), 100);
  const type  = searchParams.get("type");

  let q = supabase
    .from("memories")
    .select("id, type, label, content, metadata, created_at, source_at")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (type && MEMORY_TYPES.includes(type as typeof MEMORY_TYPES[number])) {
    q = q.eq("type", type);
  }

  const { data, error } = await q;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ memories: data });
}

/** POST /api/memories — create a new memory (embeds content via OpenAI). */
export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  let body;
  try {
    body = CreateMemorySchema.parse(await request.json());
  } catch (e) {
    return NextResponse.json({ error: "invalid_body", details: (e as Error).message }, { status: 400 });
  }

  // Embed the content (label + content for richer context)
  const textToEmbed = `${body.label}\n\n${body.content}`;
  let embedding: number[];
  try {
    embedding = await embed(textToEmbed);
  } catch (e) {
    return NextResponse.json({ error: "embedding_failed", details: (e as Error).message }, { status: 500 });
  }

  const { data, error } = await supabase
    .from("memories")
    .insert({
      user_id:   user.id,
      type:      body.type,
      label:     body.label,
      content:   body.content,
      metadata:  body.metadata ?? {},
      source_at: body.source_at ?? null,
      embedding,
    })
    .select("id, type, label, content, metadata, created_at, source_at")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ memory: data }, { status: 201 });
}
