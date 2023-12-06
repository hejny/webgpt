import type { NextApiRequest, NextApiResponse } from 'next';
import { IS_DEVELOPMENT, NEXT_PUBLIC_DEBUG, NEXT_PUBLIC_URL } from '../../../config';
import type { LikedStatus } from '../../ai/recommendation/LikedStatus';
import { LIKED_STATUS_LIKENESS } from '../../ai/recommendation/LikedStatus';
import { pickMostRecommended } from '../../ai/recommendation/pickMostRecommended';
import { hydrateWallpaper } from '../../utils/hydrateWallpaper';
import { IWallpaper, IWallpaperSerialized } from '../../utils/IWallpaper';
import { getSupabaseForServer } from '../../utils/supabase/getSupabaseForServer';
import { number_likeness, string_url } from '../../utils/typeAliases';
import { isValidUuid } from '../../utils/validators/isValidUuid';

export interface RecommendWallpaperResponse {
    // TODO: [🌋] ErrorableResponse
    readonly recommendedWallpaper: IWallpaperSerialized;
}

/**
 * API endpoint handler to recommend new wallpaper to the user according to his previous reactions
 */
export default async function recommendWallpaperHandler(
    request: NextApiRequest,
    response: NextApiResponse<RecommendWallpaperResponse>,
) {
    const author = request.query.author;

    if (!isValidUuid(author)) {
        return response.status(400).json(
            {
                message:
                    'GET param author is not set or not a valid UUID' /* <- TODO: [🌻] Unite wrong GET param message */,
            } as any /* <- [🌋]  */,
        );
    }

    try {
        const previousWallpaperFeedbacks: Array<{ url: string_url; likedStatus: LikedStatus }> = [];
        const wallpapersWithLikeness: Array<IWallpaper & { likeness: number_likeness }> = [];
        for (const likedStatus of ['LOVE', 'LIKE', 'DISLIKE'] as const) {
            const { data: wallpapersWithLikenessData } = await getSupabaseForServer()
                .from('WallpaperFeedback')
                .select(
                    `
                        createdAt,
                        Wallpaper( * ) 
                    `,
                )
                .eq('author', author)
                .eq('likedStatus', likedStatus)
                .order('createdAt', { ascending: false })
                .limit(10 /* <- TODO:  [🤺] Tweak this number */);

            const likeness = LIKED_STATUS_LIKENESS[likedStatus];

            for (const { Wallpaper } of wallpapersWithLikenessData || []) {
                previousWallpaperFeedbacks.push({
                    url: NEXT_PUBLIC_URL.href + Wallpaper!.id,
                    likedStatus,
                });
                wallpapersWithLikeness.push({
                    likeness,
                    ...hydrateWallpaper(Wallpaper as any),
                });
            }
        }

        const { data: wallpapersToPickData } = await getSupabaseForServer()
            .from('Wallpaper_random')
            .select('*')
            .eq('isPublic', true)
            .limit(10 /* <- TODO: [🤺] Tweak this number */);
        if (wallpapersToPickData === null) {
            throw new Error(`No Wallpapers found in view Wallpaper_random`);
        }
        const wallpapersToPick = wallpapersToPickData.map((wallpaper) => hydrateWallpaper(wallpaper as any));

        if (IS_DEVELOPMENT) {
            console.info({
                wallpapersWithLikeness,
                wallpapersToPickData,
                wallpapersToPick,
            });
        }

        const recommendedWallpaper = pickMostRecommended({
            wallpapersWithLikeness,
            wallpapersToPick,
        });

        return response.status(200).json(
            {
                recommendedWallpaper,
                debug: !NEXT_PUBLIC_DEBUG
                    ? undefined
                    : {
                          previousWallpaperFeedbacks,
                      },
            } as any /* TODO: satisfies RecommendWallpaperResponse */,
        );
    } catch (error) {
        if (!(error instanceof Error)) {
            throw error;
        }

        console.error(error);
        return response.status(500).json({ message: error.message } as any /* <- [🌋]  */);
    }
}

/**
 * TODO: [🤺] Optimize, maybe cache inputs and results
 */
