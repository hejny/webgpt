import { VERSION } from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getHardcodedWallpapers } from '../../../scripts/utils/hardcoded-wallpaper/getHardcodedWallpapers';
import { getSupabaseForServer } from '../../utils/supabase/getSupabaseForServer';

/*
TODO:
interface AboutResponse {
    result: WhoisSearchResult;
}
*/

export default async function aboutHandler(request: NextApiRequest, response: NextApiResponse /*<RegisterResponse>*/) {
    const hardcodedWallpapersCount = (await getHardcodedWallpapers()).length;
    const dynamicWallpapersCount = await getSupabaseForServer()
        .from('Wallpaper')
        .select('id')
        .then((result) => result.data?.length);

    return response.status(200).json({
        version: VERSION,
        hardcodedWallpapersCount,
        dynamicWallpapersCount,
    });
}

/**
 * TODO: Expose more information (look at Signastamp)
 * TODO: Page with this information
 */
