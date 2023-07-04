import type { NextApiRequest, NextApiResponse } from 'next';
import { getHardcodedWallpapers } from '../../../scripts/utils/hardcoded-wallpaper/getHardcodedWallpapers';
import { IWallpaperSerialized } from '../../../src/utils/IWallpaper';

interface WallpapersResponse {
    wallpapers: Array<IWallpaperSerialized>;
}

export default async function wallpapersHandler(
    request: NextApiRequest,
    response: NextApiResponse<WallpapersResponse>,
) {
    return response.status(200).json({ wallpapers: await getHardcodedWallpapers() });
}
