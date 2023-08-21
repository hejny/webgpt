import { useRouter } from 'next/router';
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
                    const compute = COLORSTATS_DEFAULT_COMPUTE;
                    const colorStats = await Promise.resolve(file!)
                        .then(blobToDataurl)
                        .then(createImageInBrowser)
                        .then(compute);
                    console.log(colorStats);
                    //-------[ /Compute colorstats ]---

                    const newWallpaper = addWallpaperComputables({
                        parent: null /* <- TODO: Computable */,
                        author: provideClientId(),
                        isPublic: false /* <- TODO: Computable */,
                        src: wallpaperUrl,
                        prompt: null,
                        colorStats,

                        title: '!!!' /* <- TODO: Computable */,
                        content: '!!!',
                        keywords:
                            [] /* <- TODO: !!! Array.from(parseKeywordsFromWallpaper(modifiedWallpaper)) */ /* <- TODO: Computable */,
                        saveStage: 'SAVING' /* <- TODO: Computable */,
                    });

                    const insertResult = await getSupabaseForBrowser()
                        .from('Wallpaper')
                        .insert(serializeWallpaper(newWallpaper));

                    // TODO: !! Util isInsertSuccessfull (status===201)
                    console.log({ newWallpaper, insertResult });

                    router.push(`/${newWallpaper.id}`);
                }}
            >
                Upload image and make web:
            </UploadZone>
            <WorkInProgress />
        </>
    );
}

/**
 * TODO: Compute colorstats in worker
 * TODO: Upload image and Compute colorstats in parallel + remove the comment blocks
 * TODO: Maybe it is not very efficient to first convert image to dataurl and create image from the dataurl - maybe just createImageFromFile / createImageFromBlob
 */
