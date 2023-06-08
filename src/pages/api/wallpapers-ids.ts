import type { NextApiRequest, NextApiResponse } from 'next';
import { getWallpapers } from '../../../scripts/utils/wallpaper/getWallpapers';
import { string_wallpaper_id } from '../../utils/typeAliases';

type WallpapersResponse = Array<string_wallpaper_id>;

export default async function wallpapersIdsHandler(
    request: NextApiRequest,
    response: NextApiResponse<WallpapersResponse>,
) {
    response.status(200).json((await getWallpapers()).map(({ id }) => id));
}
