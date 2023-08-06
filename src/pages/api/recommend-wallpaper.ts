import type { NextApiRequest, NextApiResponse } from 'next';
import { IWallpaperSerialized } from '../../utils/IWallpaper';
import { getSupabaseForServer } from '../../utils/supabase/getSupabaseForServer';
import { isValidUuid } from '../../utils/validators/isValidUuid';

export interface RecommendWallpaperResponse {
    // TODO: [🌋] ErrorableResponse
    recommendedWallpaper: IWallpaperSerialized;
}

export default async function recommendWallpaperHandler(
    request: NextApiRequest,
    response: NextApiResponse<RecommendWallpaperResponse>,
) {
    const author = request.query.author;

    if (!isValidUuid(author)) {
        return response
            .status(400)
            .json({ message: 'GET param author is not set or not a valid UUID' } as any /* <- [🌋]  */);
    }

    const { data: wallpapers } = await getSupabaseForServer()
        .from('Wallpaper_random')
        .select('*')
        .eq('isPublic', true)
        .limit(5 /* <- TODO: Tweak this number */);

    const recommendLeverOfWallpaper = (
        wallpaper: IWallpaperSerialized /* !!! [1] Database['public']['Tables']['Wallpaper']['Row']*/ /*NullablePartial<IWallpaperSerialized>*/,
    ): number => {
        // TODO: !!!! Implement (with wallpaper) + create new util (and subutils) pickMostRecommended(options: {previousReactions, haystack})
        return 0;
    };

    wallpapers!.sort((a, b) => recommendLeverOfWallpaper(a as any) - recommendLeverOfWallpaper(b as any));

    return response.status(200).json({ author, recommendedWallpaper: wallpapers![0], wallpapers } as any);
}

/* 
!!! [1]
type NullablePartial<
    T,
    NK extends keyof T = { [K in keyof T]: null extends T[K] ? K : never }[keyof T],
    NP = Partial<Pick<T, NK>> & Pick<T, Exclude<keyof T, NK>>,
> = { [K in keyof NP]: NP[K] };


*/
