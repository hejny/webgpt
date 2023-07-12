import type { NextApiRequest, NextApiResponse } from 'next';
import { getHardcodedWallpapers } from '../../../scripts/utils/hardcoded-wallpaper/getHardcodedWallpapers';
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
    const wallpapers = await getHardcodedWallpapers().catch((error) => [
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

    const wallpaperResponse = await fetch(wallpaper.src);

    const { src } = wallpaper;
    const { status, statusText } = wallpaperResponse;

    if (status !== 200) {
        return response.send({ src, status, statusText });
    }

    const wallpaperResponseArrayBuffer = await wallpaperResponse.arrayBuffer();
    const wallpaperResponseBuffer = Buffer.from(wallpaperResponseArrayBuffer);

    response.setHeader('Content-Type', 'image/png');
    response.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    response.statusCode = 200;
    response.statusMessage = 'OK';
    return response.send(wallpaperResponseBuffer);

    /*
    const wallpaperResponse = await axios(wallpaper.src);

    response.setHeader('Content-Type', 'image/png');
    response.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    response.statusCode = 200;
    response.statusMessage = 'OK';
    return response.send(wallpaperResponse.data);
    */

    /* 
    wallpaperResponse.body?.pipeTo(response);

    const wallpaperResponseReader = wallpaperResponse.body!.getReader();

    const wallpaperResponseRead =  await wallpaperResponseReader.read();
    wallpaperResponseRead.value!

    const wallpaperResponseContentType = wallpaperResponse.headers.get('content-type');

    wallpaperResponse.body;
    return response.status(200).send({ src: wallpaper.src, wallpaperResponseContentType });

    /* 
    const wallpaperResponse = await fetch(wallpaper.src);
    return response.status(200).send(wallpaperResponse.body);
    */
}
