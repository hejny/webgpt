import { unstable_createNodejsStream } from '@vercel/og';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getHardcodedWallpapers } from '../../../scripts/utils/hardcoded-wallpaper/getHardcodedWallpapers';
import { IWallpaperSerialized } from '../../utils/IWallpaper';
import { getSupabaseForServer } from '../../utils/supabase/getSupabaseForServer';
import { isValidWallpaperId } from '../../utils/validators/isValidWallpaperId';
import { validateUuid } from '../../utils/validators/validateUuid';

export default async function ogImageHandler(request: NextApiRequest, response: NextApiResponse) {
    const wallpaperId = request.query.wallpaperId as string;

    if (!isValidWallpaperId(wallpaperId)) {
        return response.status(400).json({ message: 'GET param wallpaperId is not valid UUID' });
    }

    // TODO: [🥽] DRY - getWallpaper
    const wallpapers: Array<IWallpaperSerialized> = await getHardcodedWallpapers().catch((error) => [
        /* Note: On server, "Error: Could not find assets folder" will happen */
    ]);
    let wallpaper = wallpapers.find(({ id }) => id === wallpaperId) || null;
    if (!wallpaper) {
        const selectResult = await getSupabaseForServer().from('Wallpaper').select('*').eq('id', wallpaperId);
        if (selectResult && selectResult.data && selectResult.data.length > 0) {
            wallpaper = {
                ...selectResult.data[0],
                author: validateUuid(selectResult.data[0].author),
            };
        }
    }

    if (!wallpaper) {
        // TODO: On runtime there occurs an error "TypeError: response.status is not a function" (maybe because of experimental-edge?)
        return response.status(404).json({ message: 'Wallpaper not found' });
    }

    const imageStream = await unstable_createNodejsStream(
        <div
            style={{
                display: 'flex',
                fontSize: 100,
                background: 'white',
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',

                // TODO: !! Cleanup + add primary color as a fallback
                backgroundColor: '#7e6161',
                backgroundImage: `url(https://collboard.fra1.cdn.digitaloceanspaces.com/testaicontent/1/f/1f2d82cb-e59c-485d-9f7a-92ecdaeded3e)`,
                //backgroundImage: `url(${wallpaper.src})`,
                //backgroundImage: `url(${NEXT_PUBLIC_URL.href}api/wallpaper-image?wallpaperId=${wallpaperId})`,
            }}
        >
            {/*wallpaper.title*/}
        </div>,
        { width: 1200, height: 627, debug: true /* emoji: 'openmoji' */ },
    );

    response.setHeader('Content-Type', 'image/png');
    response.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    response.statusCode = 200;
    response.statusMessage = 'OK';
    return imageStream.pipe(response);
}

/**
 * TODO: [🦋] Do simmilar thing for icons
 * TODO: [👔] This is not working on edge runtime - fix after @see https://github.com/vercel/satori/issues/475 @see https://github.com/nzws/nzws.me/issues/574
 * TODO: [🦺] Maybe we need robots.txt @see https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation
 * TODO: Maybe make some <ShowcasePreviewImage>
 * TODO: Maybe run some endpoints on edge runtime:
 *     > const url = new URL(request.url!);
 *     > const wallpaperId = url.searchParams.get('wallpaperId');
 *     >
 *     >
 *     > export const config = {runtime: 'experimental-edge'};
 *     + Use ImageResponse not unstable_createNodejsStream
 *     + Is there a better way to parse GET params from request in edge
 *     + Edge do not have access to private env vars like SUPABASE_SERVICE_ROLE_KEY
 */
