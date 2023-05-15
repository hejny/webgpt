// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getWallpapers } from '../../../scripts/utils/wallpaper/getWallpapers';
import { IWallpaper } from '../../../src/utils/IWallpaper';

const wallpapers: Array<IWallpaper> = [];

interface WallpapersResponse {
    wallpapers: Array<IWallpaper>;
}

export default async function wallpapersHandler(
    request: NextApiRequest,
    response: NextApiResponse<WallpapersResponse>,
) {
    if (wallpapers.length === 0) {
        wallpapers.push(...(await getWallpapers()));
    }

    response.status(200).json({ wallpapers });
}

/**
 * TODO: !! This is unused - maybe delete it?
 */
