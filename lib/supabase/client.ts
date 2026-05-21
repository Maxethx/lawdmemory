import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser-side Supabase client — for use in Client Components.
 * Anon key is safe to ship to the browser; RLS protects the data.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
