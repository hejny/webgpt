import { getCookie, igApi as InstagramApi } from 'insta-fetcher';
import { INSTAGRAM_PASSWORD, INSTAGRAM_USERNAME } from '../../../config';
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
export async function getInstagramApiForServer(): Promise<InstanceType<typeof InstagramApi>> {
    if (!isRunningInNode()) {
        throw new Error('InstagramApi is available only in server/node');
    }

    if (!instagramApi) {
        const instagramCookie = await getCookie(INSTAGRAM_USERNAME!, INSTAGRAM_PASSWORD!);

        console.info('🍪 New Instagram cookie', { instagramCookie });
        instagramApi = new InstagramApi(instagramCookie.toString());
    }
    return instagramApi;
}

/**
 * TODO: !! Cache instagramCookie in the database
 */
