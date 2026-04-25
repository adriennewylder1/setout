import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!

// Browser-safe client — respects RLS
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client — bypasses RLS, server-side only
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
