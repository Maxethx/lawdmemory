import OpenAI from "openai";

const KEY = process.env.OPENAI_API_KEY;
const HAS_REAL_KEY = !!KEY && KEY.startsWith("sk-") && KEY.length > 20;
const MODEL = "text-embedding-3-small"; // 1536 dims
const DIMS = 1536;

let _client: OpenAI | null = null;
function client() {
  if (!_client) _client = new OpenAI({ apiKey: KEY });
  return _client;
}

/**
 * Embed text into a 1536-dim vector.
 * If OPENAI_API_KEY is set → real OpenAI embedding (semantic).
 * Otherwise → bag-of-words hashed vector (dev fallback).
 */
export async function embed(text: string): Promise<number[]> {
  const trimmed = text.trim().slice(0, 8000);
  if (!trimmed) throw new Error("Cannot embed empty text");

  if (!HAS_REAL_KEY) {
    if (!warnedOnce) {
      console.warn("[lawdmemory] OPENAI_API_KEY not set — using dummy bag-of-words embedding.");
      console.warn("[lawdmemory] Recall will only match on shared keywords, not semantic similarity.");
      warnedOnce = true;
    }
    return dummyEmbed(trimmed);
  }

  const res = await client().embeddings.create({ model: MODEL, input: trimmed });
  return res.data[0].embedding;
}

/** Batch embed — same fallback logic. */
export async function embedBatch(texts: string[]): Promise<number[][]> {
  if (texts.length === 0) return [];
  const inputs = texts.map((t) => t.trim().slice(0, 8000));

  if (!HAS_REAL_KEY) {
    return inputs.map(dummyEmbed);
  }

  const res = await client().embeddings.create({ model: MODEL, input: inputs });
  return res.data.map((d) => d.embedding);
}

/** True when running on real OpenAI (used by UI to show mode indicator if desired). */
export const usingRealEmbeddings = HAS_REAL_KEY;

// ─── Dummy fallback: hashed bag-of-words ─────────────────────
// Splits text into words, hashes each to an index in [0, 1535],
// then L2-normalizes. Shared words → non-zero cosine similarity.
let warnedOnce = false;
function dummyEmbed(text: string): number[] {
  const words = text.toLowerCase().match(/[a-z0-9]+/g) ?? [];
  const v = new Array<number>(DIMS).fill(0);

  for (const w of words) {
    if (w.length < 2) continue;
    // DJB2 string hash
    let hash = 5381;
    for (let i = 0; i < w.length; i++) {
      hash = ((hash * 33) ^ w.charCodeAt(i)) >>> 0;
    }
    v[hash % DIMS] += 1;
  }

  const mag = Math.sqrt(v.reduce((s, x) => s + x * x, 0));
  if (mag === 0) {
    v[0] = 1;
    return v;
  }
  return v.map((x) => x / mag);
}
