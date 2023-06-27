import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { NEXT_PUBLIC_SUPABASE_ANON_KEY, NEXT_PUBLIC_SUPABASE_URL } from '../../../config';

let supabase: SupabaseClient<any, 'public', any>;

export function getSupabaseForBrowser() {
    if (!supabase) {
        // Create a single supabase client for interacting with your database
        supabase = createClient(NEXT_PUBLIC_SUPABASE_URL.href, NEXT_PUBLIC_SUPABASE_ANON_KEY);
    }

    return supabase;
}

/**
 * TODO: Add types @see https://supabase.com/docs/reference/javascript/typescript-support
 */
