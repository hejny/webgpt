import { COLORSTATS_DEFAULT_COMPUTE_IN_FRONTEND, IMAGE_NATURAL_SIZE } from '../../../config';
import { UploadWallpaperResponse } from '../../pages/api/upload-wallpaper';
import { addWallpaperComputables } from '../../utils/addWallpaperComputables';
import { serializeWallpaper } from '../../utils/hydrateWallpaper';
import { createImageInWorker } from '../../utils/image/createImageInWorker';
import { getSupabaseForBrowser } from '../../utils/supabase/getSupabaseForBrowser';
import { string_wallpaper_id, uuid } from '../../utils/typeAliases';

export interface IMessage_CreateNewWallpaper_Request {
    type: 'CREATE_NEW_WALLPAPER_REQUEST';
    author: uuid;
    wallpaperImage: Blob;
}

export interface IMessage_CreateNewWallpaper_Result {
    type: 'CREATE_NEW_WALLPAPER_RESULT';
    wallpaperId: string_wallpaper_id;
}

addEventListener('message', async (event: MessageEvent<IMessage_CreateNewWallpaper_Request>) => {
    // COLORSTATS_COMPUTE_METHODS
    const { author, wallpaperImage } = event.data;
    const newWallpaper = await createNewWallpaper(author, wallpaperImage);

    postMessage({
        type: 'CREATE_NEW_WALLPAPER_RESULT',
        wallpaperId: newWallpaper.id,
    } satisfies IMessage_CreateNewWallpaper_Result);
});

async function createNewWallpaper(author: uuid, wallpaperBlob: Blob) {
    //-------[ Upload image: ]---
    performance.mark('upload-image-and-write-content-start');
    const formData = new FormData();
    formData.append('wallpaper', wallpaperBlob);

    const response = await fetch('/api/upload-wallpaper', {
        method: 'POST',
        body: formData,
    });

    const { wallpaperUrl, wallpaperDescription, wallpaperContent } = (await response.json()) as UploadWallpaperResponse;
    performance.mark('upload-image-and-write-content-end');
    performance.measure(
        'upload-image-and-write-content',
        'upload-image-and-write-content-start',
        'upload-image-and-write-content-end',
    );
    console.log({ wallpaperUrl, wallpaperDescription, wallpaperContent });
    //-------[ /Upload image ]---

    //-------[ Compute colorstats: ]---
    performance.mark('compute-colorstats-start');
    COLORSTATS_DEFAULT_COMPUTE_IN_FRONTEND;
    createImageInWorker;
    /**/
    const compute = COLORSTATS_DEFAULT_COMPUTE_IN_FRONTEND;

    const wallpaperImage = await createImageInWorker(
        wallpaperBlob,
        IMAGE_NATURAL_SIZE.scale(0.1) /* <- TODO: This should be exposed as compute.preferredSize */,
    );
    const colorStats = await compute(wallpaperImage);
    performance.mark('compute-colorstats-end');
    performance.measure('compute-colorstats', 'compute-colorstats-start', 'compute-colorstats-end');
    console.log(colorStats);
    /**/
    //-------[ /Compute colorstats ]---

    /*/
    const { data: randomWallpaperData } = await getSupabaseForBrowser()
        .from('Wallpaper_random')
        .select('*')
        .eq('isPublic', true)
        .limit(1)
        .single();

    if (!randomWallpaperData) {
        throw new Error('No random wallpaper found');
    }
    const title = randomWallpaperData.title!; // <- !!! Compute in addWallpaperComputables
    const content = randomWallpaperData.content!;
    /**/

    /*/
       const colorStats = hydrateColorStats(
           randomWallpaperData.colorStats!,
       ); /* <- !!! Hardcode this mock in json file mocked-dark.colors.yml */
    /**/

    const newWallpaper = addWallpaperComputables({
        parent: null /* <- TODO: Computable */,
        author,
        isPublic: false /* <- TODO: Computable */,
        src: wallpaperUrl,
        prompt: null,
        colorStats,
        content: wallpaperContent,
        keywords: [], // <- TODO: !!! Array.from(parseKeywordsFromWallpaper(modifiedWallpaper))
        // <- TODO: Computable
        saveStage: 'SAVING' /* <- TODO: Computable */,
    });

    const insertResult = await getSupabaseForBrowser().from('Wallpaper').insert(serializeWallpaper(newWallpaper));

    // TODO: !! Util isInsertSuccessfull (status===201)
    console.log({ newWallpaper, insertResult, performance: performance.getEntries() });

    return newWallpaper;
}
/**
 * Note:
 */
export const _nonce = null;

/**
 * TODO: !!! Save wallpaperDescription in wallpaper (and maybe whole Azure response)
 * TODO: !!! getSupabaseForWorker
 */
