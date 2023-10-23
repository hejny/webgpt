import type { NextApiRequest, NextApiResponse } from 'next';
import { APP_VERSION } from '../../../config';
import { getHardcodedWallpapers } from '../../../scripts/utils/hardcoded-wallpaper/getHardcodedWallpapers';
import { getSupabaseForServer } from '../../utils/supabase/getSupabaseForServer';

/*
TODO:
interface AboutResponse {
    readonly result: WhoisSearchResult;
}
*/

/**
 * API endpoint handler which returns information about the application
 */
export default async function aboutHandler(request: NextApiRequest, response: NextApiResponse /*<RegisterResponse>*/) {
    const hardcodedWallpapersCount = (await getHardcodedWallpapers()).length;
    const { count: dynamicWallpapersCount } = await getSupabaseForServer()
        .from('Wallpaper')
        .select('*', { count: 'exact', head: true });

    return response.status(200).json({
        version: APP_VERSION,
        hardcodedWallpapersCount,
        dynamicWallpapersCount,
    });
}

/**
 * TODO: Expose more information (look at Signastamp)
 * TODO: Page with this information
 */
