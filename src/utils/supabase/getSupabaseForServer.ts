import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } from '../../../config';

let supabase: SupabaseClient<any, 'public', any>;

export function getSupabaseForServer() {
    if (!supabase) {
        // Create a single supabase client for interacting with your database
        supabase = createClient(NEXT_PUBLIC_SUPABASE_URL.href, SUPABASE_SERVICE_ROLE_KEY!, {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
            },
        });
    }

    /*
    // Access auth admin api
    const adminAuthClient = supabase.auth.admin;
    */

    return supabase;
}

/**
 * TODO: Add types @see https://supabase.com/docs/reference/javascript/typescript-support
 */
