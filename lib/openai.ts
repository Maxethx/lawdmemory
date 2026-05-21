import OpenAI from "openai";

let _client: OpenAI | null = null;

function client() {
  if (!_client) {
    _client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return _client;
}

const MODEL = "text-embedding-3-small"; // 1536 dims, ~$0.02 / 1M tokens

/** Embed a single piece of text. Returns 1536-dim Float32 array. */
export async function embed(text: string): Promise<number[]> {
  const trimmed = text.trim().slice(0, 8000); // model limit; safe trim
  if (!trimmed) throw new Error("Cannot embed empty text");

  const res = await client().embeddings.create({
    model: MODEL,
    input: trimmed,
  });
  return res.data[0].embedding;
}

/** Batch embed (one request per chunk of 100). */
export async function embedBatch(texts: string[]): Promise<number[][]> {
  if (texts.length === 0) return [];
  const inputs = texts.map((t) => t.trim().slice(0, 8000));
  const res = await client().embeddings.create({
    model: MODEL,
    input: inputs,
  });
  return res.data.map((d) => d.embedding);
}
