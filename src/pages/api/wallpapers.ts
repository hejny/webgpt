import type { NextApiRequest, NextApiResponse } from 'next';
import { getWallpapers } from '../../../scripts/utils/wallpaper/getWallpapers';
import { IWallpaper } from '../../../src/utils/IWallpaper';

interface WallpapersResponse {
    wallpapers: Array<IWallpaper>;
}

export default async function wallpapersHandler(
    request: NextApiRequest,
    response: NextApiResponse<WallpapersResponse>,
) {
    response.status(200).json({ wallpapers: await getWallpapers() });
}
