import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } from '../../../config';
import { isRunningInNode } from '../isRunningInWhatever';
import { Database } from './types';

/**
 * Internal cache for getSupabaseForServer
 * @private
 * @singleton
 */
let supabase: SupabaseClient<Database>;

/**
 * Get supabase client
 *
 * Note: The client is cached, so it's safe to call this function multiple times
 * Note: This function is available ONLY in server/node, use getSupabaseForClient in browser
 *
 * @returns instance of supabase client
 */
export function getSupabaseForServer(): typeof supabase {
    if (!isRunningInNode()) {
        throw new Error('Use getSupabaseForServer');
    }

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
