import { igApi as InstagramApi } from 'insta-fetcher';
import { INSTAGRAM_COOKIE } from '../../../config';
import { isRunningInNode } from '../isRunningInWhatever';

/**
 * Internal cache for getInstagramApiForServer
 * @private
 * @singleton
 */
let instagramApi: InstanceType<typeof InstagramApi>;

/**
 * Get instagramApi which is used for scraping information from Instagram
 *
 * Note: The client is cached, so it's safe to call this function multiple times
 * Note: This function is available ONLY in server/node, use getSupabaseForClient in browser
 *
 * @returns instance of supabase client
 */
export function getInstagramApiForServer(): InstanceType<typeof InstagramApi> {
    if (!isRunningInNode()) {
        throw new Error('InstagramApi is available only in server/node');
    }

    instagramApi = new InstagramApi(INSTAGRAM_COOKIE);

    return instagramApi;
}
