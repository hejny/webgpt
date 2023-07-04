import type { NextApiRequest, NextApiResponse } from 'next';
import { getWallpapers } from '../../../scripts/utils/wallpaper/getWallpapers';
import { IWallpaperSerialized } from '../../../src/utils/IWallpaper';

interface WallpapersResponse {
    wallpapers: Array<IWallpaperSerialized>;
}

export default async function wallpapersHandler(
    request: NextApiRequest,
    response: NextApiResponse<WallpapersResponse>,
) {
    return response.status(200).json({ wallpapers: await getWallpapers() });
}
