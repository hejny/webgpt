import type { NextApiRequest, NextApiResponse } from 'next';
import { likedStatusToLikeness } from '../../recommendation/likedStatusToLikeness';
import { pickMostRecommended } from '../../recommendation/pickMostRecommended';
import { LikedStatus } from '../../utils/hooks/useLikedStatusOfCurrentWallpaper';
import { hydrateWallpaper } from '../../utils/hydrateWallpaper';
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

    try {
        const { data: wallpapersWithLikenessData } = await getSupabaseForServer()
            .from('Reaction')
            .select(
                `
                likedStatus,
                createdAt,
                Wallpaper( * ) 
            `,
            )
            .eq('author', author)
            .order('createdAt', { ascending: false })
            // <- TODO: !!!! [🤺][🧠] Take ONLY current reactions NOT overwritten ones
            // <- TODO: !!!  [🤺]     Allow older LOVE reactions
            // <- TODO: !!!! [🤺]     Filter here NONE and NEUTRAL reactions
            .limit(10 /* <- TODO:  [🤺] Tweak this number */);
        if (wallpapersWithLikenessData === null) {
            // TODO: !!!! [🧠] This error will happen - think about how to solve it - ?fallback to just pure random OR hardcoded likes/loves
            throw new Error(`No reactions found for user ${author}`);
        }
        const wallpapersWithLikeness = wallpapersWithLikenessData.map(({ likedStatus, Wallpaper }) => ({
            likeness: likedStatusToLikeness(likedStatus as keyof typeof LikedStatus),
            ...hydrateWallpaper(Wallpaper as any),
        }));

        const { data: wallpapersToPickData } = await getSupabaseForServer()
            .from('Wallpaper_random')
            .select('*')
            .eq('isPublic', true)
            .limit(5 /* <- TODO: [🤺] Tweak this number */);
        if (wallpapersToPickData === null) {
            throw new Error(`No Wallpapers found in view Wallpaper_random`);
        }
        const wallpapersToPick = wallpapersToPickData.map((wallpaper) => hydrateWallpaper(wallpaper as any));

        console.log({
            // TODO: !!!! Connect Next js to debugger
            wallpapersWithLikenessData,
            wallpapersWithLikeness,
            wallpapersToPickData,
            wallpapersToPick,
        });

        const recommendedWallpaper = pickMostRecommended({
            wallpapersWithLikeness,
            wallpapersToPick,
        });

        return response
            .status(200)
            .json({ author, recommendedWallpaper, wallpapersWithLikenessData, wallpapersToPickData } as any);
    } catch (error) {
        if (!(error instanceof Error)) {
            throw error;
        }

        console.error(error);
        return response.status(500).json({ message: error.message } as any /* <- [🌋]  */);
    }
}

/* 
!!! [1]
type NullablePartial<
    T,
    NK extends keyof T = { [K in keyof T]: null extends T[K] ? K : never }[keyof T],
    NP = Partial<Pick<T, NK>> & Pick<T, Exclude<keyof T, NK>>,
> = { [K in keyof NP]: NP[K] };


*/

/**
 * TODO: [🤺] Optimize, maybe cache inputs and results
 */
