import { COLORSTATS_DEFAULT_COMPUTE } from '../../../config';
import { blobToDataurl } from '../../export/utils/blobToDataurl';
import { UploadWallpaperResponse } from '../../pages/api/upload-wallpaper';
import { createImageInBrowser } from '../../utils/image/createImageInBrowser';
import { UploadZone } from '../UploadZone/UploadZone';
import { WorkInProgress } from '../WorkInProgress/WorkInProgress';
import styles from './UploadNewWallpaper.module.css';

export function UploadNewWallpaper() {
    return (
        <>
            <UploadZone
                className={styles.UploadNewWallpaper}
                isClickable
                isMultipleAllowed={false}
                accept="image/*"
                onFiles={async ([file]) => {
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
 * TODO: Upload image and Compute colorstats in parallel
 * TODO: Maybe it is not very efficient to first convert image to dataurl and create image from the dataurl - maybe just createImageFromFile / createImageFromBlob
 */
