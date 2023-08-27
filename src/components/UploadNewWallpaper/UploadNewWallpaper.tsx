import { useRouter } from 'next/router';
import { useState } from 'react';
import { logDialogue } from '../../utils/dialogues/logDialogue';
import { provideClientId } from '../../utils/supabase/provideClientId';
import { UploadZone } from '../UploadZone/UploadZone';
import { WorkInProgress } from '../WorkInProgress/WorkInProgress';
import { IMessage_CreateNewWallpaper_Request, IMessage_CreateNewWallpaper_Result } from './createNewWallpaper.worker';
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
                onFilesOver={() => {
                    /* not await */ logDialogue('Drop image to make web!');
                }}
                onFiles={async ([file]) => {
                    if (!file) {
                        return;
                    }

                    setWorking(true);

                    /* not await */ logDialogue('Uploading image and making web...');

                    const worker = new Worker(new URL('./createNewWallpaper.worker.ts', import.meta.url));

                    worker.postMessage({
                        type: 'CREATE_NEW_WALLPAPER_REQUEST',
                        author: provideClientId(),
                        wallpaperImage: file,
                    } satisfies IMessage_CreateNewWallpaper_Request);

                    worker.addEventListener('message', (event: MessageEvent<IMessage_CreateNewWallpaper_Result>) => {
                        const { wallpaperId } = event.data;
                        router.push(`/${wallpaperId}`);
                        // Note: No need to setWorking(false); because we are redirecting to another page
                    });
                }}
            >
                Upload image and make web:
            </UploadZone>
            {isWorking && <WorkInProgress />}
        </>
    );
}

/**
 * TODO: !! Error handling in worker
 * TODO: Send progress from worker to UI
 * TODO: !!! Speed up the computation of colorstats
 * TODO: Detect image content and write content dynamically just for this image
 * TODO: Compute colorstats in worker
 * TODO: Upload image and Compute colorstats in parallel + remove the comment blocks
 * TODO: Maybe it is not very efficient to first convert image to dataurl and create image from the dataurl - maybe just createImageFromFile / createImageFromBlob
 * TODO: !! It Should be possible to list private wallpapers via getSupabaseForBrowser().from('Wallpaper').select('*').eq('isPublic', false)
 */
