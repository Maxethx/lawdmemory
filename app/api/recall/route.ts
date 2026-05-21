import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { embed } from "@/lib/openai";

const RecallSchema = z.object({
  query:           z.string().min(1).max(2000),
  match_count:     z.number().int().min(1).max(50).optional(),
  match_threshold: z.number().min(0).max(1).optional(),
});

/** POST /api/recall — semantic search via cosine similarity. */
export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  let body;
  try {
    body = RecallSchema.parse(await request.json());
  } catch (e) {
    return NextResponse.json({ error: "invalid_body", details: (e as Error).message }, { status: 400 });
  }

  const started = Date.now();

  let queryEmbedding: number[];
  try {
    queryEmbedding = await embed(body.query);
  } catch (e) {
    return NextResponse.json({ error: "embedding_failed", details: (e as Error).message }, { status: 500 });
  }

  const { data, error } = await supabase.rpc("match_memories", {
    query_embedding: queryEmbedding,
    match_count:     body.match_count     ?? 10,
    match_threshold: body.match_threshold ?? 0.2,
    filter_user_id:  user.id,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({
    query:      body.query,
    memories:   data,
    count:      data?.length ?? 0,
    latency_ms: Date.now() - started,
  });
}
