import type { NextApiRequest, NextApiResponse } from 'next';
import { getHardcodedWallpapers } from '../../../scripts/utils/hardcoded-wallpaper/getHardcodedWallpapers';
import type { string_color, string_wallpaper_id } from '../../utils/typeAliases';

interface WallpapersResponse {
    wallpapers: Array<{ id: string_wallpaper_id; primaryColor: string_color }>;
}
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
