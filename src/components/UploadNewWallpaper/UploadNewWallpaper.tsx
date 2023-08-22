import { useRouter } from 'next/router';
import { useState } from 'react';
import { COLORSTATS_DEFAULT_COMPUTE } from '../../../config';
import { blobToDataurl } from '../../export/utils/blobToDataurl';
import { UploadWallpaperResponse } from '../../pages/api/upload-wallpaper';
import { addWallpaperComputables } from '../../utils/addWallpaperComputables';
import { serializeWallpaper } from '../../utils/hydrateWallpaper';
import { createImageInBrowser } from '../../utils/image/createImageInBrowser';
import { getSupabaseForBrowser } from '../../utils/supabase/getSupabaseForBrowser';
import { provideClientId } from '../../utils/supabase/provideClientId';
import { UploadZone } from '../UploadZone/UploadZone';
import { WorkInProgress } from '../WorkInProgress/WorkInProgress';
import styles from './UploadNewWallpaper.module.css';

export function UploadNewWallpaper() {
    const router = useRouter();
    const [isWorking, setWorking] = useState(false);

    return (
        <>
            <UploadZone
                className={styles.UploadNewWallpaper}
                isClickable
                isMultipleAllowed={false}
                accept="image/*"
                onFiles={async ([file]) => {
                    if (!file) {
                        return;
                    }

                    setWorking(true);

                    //-------[ Upload image: ]---
                    const formData = new FormData();
                    formData.append('wallpaper', file!);

                    const response = await fetch('/api/upload-wallpaper', {
                        method: 'POST',
                        body: formData,
                    });

                    const { wallpaperUrl } = (await response.json()) as UploadWallpaperResponse;
                    console.log(wallpaperUrl);
                    //-------[ /Upload image ]---

                    //-------[ Compute colorstats: ]---
                    COLORSTATS_DEFAULT_COMPUTE;
                    blobToDataurl;
                    createImageInBrowser;
                    /**/
                    const compute = COLORSTATS_DEFAULT_COMPUTE;
                    const colorStats = await Promise.resolve(file!)
                        .then(blobToDataurl)
                        .then(createImageInBrowser)
                        .then(compute);
                    console.log(colorStats);
                    /**/
                    //-------[ /Compute colorstats ]---

                    const { data: randomWallpaperData } = await getSupabaseForBrowser()
                        .from('Wallpaper_random')
                        .select('*')
                        .eq('isPublic', true)
                        .limit(1 /* <- TODO: [🤺] Tweak this number */)
                        .single();

                    if (!randomWallpaperData) {
                        throw new Error('No random wallpaper found');
                    }
                    const title = randomWallpaperData.title!; /* <- !!! Compute in addWallpaperComputables */
                    const content = randomWallpaperData.content!;
                    /*/
                    const colorStats = hydrateColorStats(
                        randomWallpaperData.colorStats!,
                    ); /* <- !!! Hardcode this mock in json file mocked-dark.colors.yml */
                    /**/

                    const newWallpaper = addWallpaperComputables({
                        parent: null /* <- TODO: Computable */,
                        author: provideClientId(),
                        isPublic: false /* <- TODO: Computable */,
                        src: wallpaperUrl,
                        prompt: null,
                        colorStats,
                        title,
                        content,
                        keywords: [], // <- TODO: !!! Array.from(parseKeywordsFromWallpaper(modifiedWallpaper))
                        // <- TODO: Computable
                        saveStage: 'SAVING' /* <- TODO: Computable */,
                    });

                    const insertResult = await getSupabaseForBrowser()
                        .from('Wallpaper')
                        .insert(serializeWallpaper(newWallpaper));

                    // TODO: !! Util isInsertSuccessfull (status===201)
                    console.log({ newWallpaper, insertResult });

                    router.push(`/${newWallpaper.id}`);

                    // Note: No need to setWorking(false); because we are redirecting to another page
                }}
            >
                Upload image and make web:
            </UploadZone>
            {isWorking && <WorkInProgress />}
        </>
    );
}

/**
 * TODO: !!! Use here loading
 * TODO: !!! Speed up the computation of colorstats
 * TODO: !!! Extract (the logic part) of onFiles to util generateNewWallpaper(file: File): Promise<IWallpaper> + saveWallpaper/persistWallpaper(wallpaper: IWallpaper): Promise<void>
 * TODO: !!! Mock the computation of colorstats for development
 * TODO: Detect image content and write content dynamically just for this image
 * TODO: Compute colorstats in worker
 * TODO: Upload image and Compute colorstats in parallel + remove the comment blocks
 * TODO: Maybe it is not very efficient to first convert image to dataurl and create image from the dataurl - maybe just createImageFromFile / createImageFromBlob
 * TODO: !! It Should be possible to list private wallpapers via getSupabaseForBrowser().from('Wallpaper').select('*').eq('isPublic', false)
 */
