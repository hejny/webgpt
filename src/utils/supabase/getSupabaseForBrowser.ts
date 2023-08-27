import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { NEXT_PUBLIC_SUPABASE_ANON_KEY, NEXT_PUBLIC_SUPABASE_URL } from '../../../config';
import { isRunningInBrowser, isRunningInWebWorker } from '../isRunningInWhatever';
import { Database } from './types';

/**
 * Internal cache for getSupabaseForBrowser
 * @private
 * @singleton
 */
let supabase: SupabaseClient<Database>;

/**
 * Get supabase client
 *
 * Note: The client is cached, so it's safe to call this function multiple times
 * Note: This function is available ONLY in browser, use getSupabaseForServer in node
 *
 * @returns instance of supabase client
 */
export function getSupabaseForBrowser(): typeof supabase {
    if (
        !isRunningInBrowser() &&
        !(isRunningInWebWorker(/* <- TODO: [🚵‍♂️] !! Remove this option to run getSupabaseForBrowser in worker */))
    ) {
        throw new Error('Use getSupabaseForServer');
    }

    if (!supabase) {
        // Create a single supabase client for interacting with your database
        supabase = createClient<Database>(NEXT_PUBLIC_SUPABASE_URL.href, NEXT_PUBLIC_SUPABASE_ANON_KEY);
    }

    return supabase;
}
