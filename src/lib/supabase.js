import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// diagnostic logging
console.log('[Supabase Init] URL:', supabaseUrl || 'MISSING');
console.log('[Supabase Init] Key Length:', supabaseAnonKey ? supabaseAnonKey.length : 0);

export const isSupabaseConfigured = !!(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://placeholder.supabase.co' && 
  supabaseUrl.startsWith('http')
);

// Create a client that will fail gracefully if env vars are missing
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);
