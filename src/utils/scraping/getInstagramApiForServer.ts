import { getCookie, igApi as InstagramApi } from 'insta-fetcher';
import { INSTAGRAM_PASSWORD, INSTAGRAM_USERNAME } from '../../../config';
import { explainError } from '../extraMessage';
import { isRunningInNode } from '../isRunningInWhatever';
import { getServerStorage } from '../supabase/getServerStorage';

/**
 * Internal cache for getInstagramApiForServer
 * @private
 * @singleton
 */
let instagramApi: null | InstanceType<typeof InstagramApi> = null;

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

    if (instagramApi === null) {
        // TODO: Make some bank of server storages:
        //      > const cookiesStorage = new PrefixStorage<{ value: string_token }>(getServerStorage(), 'Cookies');

        let instagramCookieItem = await getServerStorage().getItem('instagramCookie');

        if (!instagramCookieItem) {
            const instagramCookie = await getCookie(INSTAGRAM_USERNAME!, INSTAGRAM_PASSWORD!).catch(
                explainError('Can not get Instagram cookie'),
            );
            console.info('🍪 New Instagram cookie', { instagramCookie });
            instagramCookieItem = { value: instagramCookie.toString() };
            await getServerStorage().setItem('instagramCookie', instagramCookieItem);
        }

        instagramApi = new InstagramApi(instagramCookieItem.value, false);
    }
    return instagramApi;
}

/**
 * Reset instagramApi instance + clear cookies
 */
export async function resetInstagramApiForServer(): Promise<void> {
    instagramApi = null;
    await getServerStorage().removeItem('instagramCookie');
}

/**
 * TODO: !! Cache instagramCookie in the database
 */
