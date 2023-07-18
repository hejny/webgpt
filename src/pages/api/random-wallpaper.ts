import type { NextApiRequest, NextApiResponse } from 'next';
import { IWallpaperSerialized } from '../../utils/IWallpaper';
import { getSupabaseForServer } from '../../utils/supabase/getSupabaseForServer';

export interface RandomWallpaperResponse {
    randomWallpaper: IWallpaperSerialized;
}

export default async function randomWallpaperHandler(
    request: NextApiRequest,
    response: NextApiResponse<RandomWallpaperResponse>,
) {
    const result = await getSupabaseForServer()
        .from('Wallpaper_random')
        .select('*')
        .eq('isPublic', true)
        .limit(1)
        .single();

    return response.status(200).json({ randomWallpaper: result.data } as any);
}
