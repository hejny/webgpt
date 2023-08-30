import { useRouter } from 'next/router';
import { useState } from 'react';
import { createNewWallpaper } from '../../workers/createNewWallpaper';
import { TaskInProgress } from '../TaskInProgress/TaskInProgress';
import { UploadZone } from '../UploadZone/UploadZone';
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

                    try {
                        const wallpaperId = await createNewWallpaper(file);
                        router.push(`/${wallpaperId}`);
                        // Note: No need to setWorking(false); because we are redirecting to another page
                    } catch (error) {
                        if (!(error instanceof Error)) {
                            throw error;
                        }

                        alert(error.message);
                    }
                }}
            >
                Drop image to
                <br />
                <b>make new web</b>
            </UploadZone>
            {isWorking && <TaskInProgress />}
        </>
    );
}

/**
 * TODO: Show progress checkmarks
 * TODO: !!! Error handling in worker
 * TODO: !!! Send progress from worker to UI
 * TODO: !!! Speed up the computation of colorstats
 * TODO: Detect image content and write content dynamically just for this image
 * TODO: !!! Compute ONLY colorstats in worker, rest here - split workers into multiple parts
 * TODO: Upload image and Compute colorstats in parallel + remove the comment blocks
 * TODO: Maybe it is not very efficient to first convert image to dataurl and create image from the dataurl - maybe just createImageFromFile / createImageFromBlob
 * TODO: !! It Should be possible to list private wallpapers via getSupabaseForBrowser().from('Wallpaper').select('*').eq('isPublic', false)
 */
