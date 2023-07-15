import type { NextApiRequest, NextApiResponse } from 'next';
import { getHardcodedWallpapers } from '../../../scripts/utils/hardcoded-wallpaper/getHardcodedWallpapers';
import { fetchImageWithBypass } from '../../utils/fetchImageWithBypass';
import { IWallpaperSerialized } from '../../utils/IWallpaper';
import { getSupabaseForServer } from '../../utils/supabase/getSupabaseForServer';
import { validateUuid } from '../../utils/validateUuid';
import { isValidWallpaperId } from '../../utils/validators/isValidWallpaperId';

export default async function ogImageHandler(request: NextApiRequest, response: NextApiResponse) {
    /*
    // TODO: [⌚] Is there a better way to parse GET params from request? (maybe because of experimental-edge not working request.query?)
    const url = new URL(request.url!);
    const wallpaperId = url.searchParams.get('wallpaperId');
    */
    const wallpaperId = request.query.wallpaperId as string;

    if (!isValidWallpaperId(wallpaperId)) {
        // TODO: On runtime there occurs an error "TypeError: response.status is not a function" (maybe because of experimental-edge?)
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

    const wallpaperResponseBuffer = await fetchImageWithBypass(wallpaper.src);

    response.setHeader('Content-Type', 'image/png');
    response.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    response.statusCode = 200;
    response.statusMessage = 'OK';
    return response.send(wallpaperResponseBuffer);

    /*
    const wallpaperResponse = await fetch(wallpaper.src);

    const { src } = wallpaper;
    const { status, statusText } = wallpaperResponse;

    if (status !== 200) {
        response.setHeader('Content-Type', 'text/plain');
        return response.send(await wallpaperResponse.text());
        // return response.send({ src, status, statusText });
    }

    const wallpaperResponseArrayBuffer = await wallpaperResponse.arrayBuffer();
    const wallpaperResponseBuffer = Buffer.from(wallpaperResponseArrayBuffer);

    response.setHeader('Content-Type', 'image/png');
    response.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    response.statusCode = 200;
    response.statusMessage = 'OK';
    return response.send(wallpaperResponseBuffer);

    */
}

/**
 * TODO: !!!! Cleanup puppeteer dependency
 */
