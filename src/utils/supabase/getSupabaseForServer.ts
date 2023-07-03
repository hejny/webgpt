import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } from '../../../config';
import { Database } from './types';

let supabase: SupabaseClient<Database, 'public', any>;

export function getSupabaseForServer(): typeof supabase {
    if (!supabase) {
        // Create a single supabase client for interacting with your database
        supabase = createClient<Database>(NEXT_PUBLIC_SUPABASE_URL.href, SUPABASE_SERVICE_ROLE_KEY!, {
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
