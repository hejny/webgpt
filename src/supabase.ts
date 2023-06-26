import { createClient } from '@supabase/supabase-js';
import { NEXT_PUBLIC_SUPABASE_ANON_KEY, NEXT_PUBLIC_SUPABASE_URL } from '../config';

// Create a single supabase client for interacting with your database
export const supabase = createClient(NEXT_PUBLIC_SUPABASE_URL.href, NEXT_PUBLIC_SUPABASE_ANON_KEY);
