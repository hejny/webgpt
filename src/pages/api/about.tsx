import type { NextApiRequest, NextApiResponse } from 'next';
import { APP_VERSION } from '../../../config';
import { getHardcodedWallpapers } from '../../../scripts/utils/hardcoded-wallpaper/getHardcodedWallpapers';
import { getSupabaseForServer } from '../../utils/supabase/getSupabaseForServer';
import { string_version } from '../../utils/typeAliases';

interface AboutResponse {
    /**
     * Version of the application
     */
    readonly version: string_version;

    /**
     * Number of hardcoded wallpapers (from the filesystem)
     */
    readonly hardcodedWallpapersCount: number;

    /**
     * Number of dynamic wallpapers (from Supabase)
     */
    readonly dynamicWallpapersCount: number;
}

/**
 * API endpoint handler which returns information about the application
 */
export default async function aboutHandler(request: NextApiRequest, response: NextApiResponse<AboutResponse>) {
    const hardcodedWallpapersCount = (await getHardcodedWallpapers()).length;
    let { count: dynamicWallpapersCount } = await getSupabaseForServer()
        .from('Wallpaper')
        .select('*', { count: 'exact', head: true });

    if (dynamicWallpapersCount === null) {
        dynamicWallpapersCount = 0;
    }

    return response.status(200).json({
        version: APP_VERSION,
        hardcodedWallpapersCount,
        dynamicWallpapersCount,
    } satisfies AboutResponse);
}

/**
 * TODO: Expose more information (look at Signastamp)
 * TODO: Page with this information
 */
