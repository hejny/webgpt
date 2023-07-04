import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { NEXT_PUBLIC_SUPABASE_ANON_KEY, NEXT_PUBLIC_SUPABASE_URL } from '../../../config';
import { Database } from './types';

let supabase: SupabaseClient<Database>;

export function getSupabaseForBrowser(): typeof supabase {
    if (!supabase) {
        // Create a single supabase client for interacting with your database
        supabase = createClient<Database>(NEXT_PUBLIC_SUPABASE_URL.href, NEXT_PUBLIC_SUPABASE_ANON_KEY);
    }

    return supabase;
}
