import type { NextApiRequest, NextApiResponse } from 'next';
import { getHardcodedWallpapers } from '../../../scripts/utils/hardcoded-wallpaper/getHardcodedWallpapers';
import { string_color, string_wallpaper_id } from '../../utils/typeAliases';

interface WallpapersResponse {
    readonly wallpapers: Array<{ id: string_wallpaper_id; primaryColor: string_color }>;
}

/**
 * API endpoint handler for getting all wallpapers IDs with primary colors
 * It is usefull to generate gallery of <iframe/> previews
 */
export default async function wallpapersIdsHandler(
    request: NextApiRequest,
    response: NextApiResponse<WallpapersResponse>,
) {
    return response.status(200).json({
        wallpapers: (await getHardcodedWallpapers()).map(({ id, colorStats }) => ({
            id,
            primaryColor: (colorStats as any).palette[0].value as any as string,
        })),
    } satisfies WallpapersResponse);
}
