import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser-side Supabase client. Uses the public URL + anon key only —
 * access to data is enforced by Row Level Security (see supabase/schema.sql),
 * not by keeping this client secret.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
