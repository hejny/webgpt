import { useRouter } from 'next/router';
import { useState } from 'react';
import { createNewWallpaper } from '../../workers/createNewWallpaper';
import { TaskProgress } from '../TaskInProgress/task/TaskProgress';
import { TasksInProgress } from '../TaskInProgress/TasksInProgress';
import { UploadZone } from '../UploadZone/UploadZone';
import styles from './UploadNewWallpaper.module.css';

export function UploadNewWallpaper() {
    const router = useRouter();
    const [isWorking, setWorking] = useState(false);
    const [tasksProgress, setTasksProgress] = useState<Array<TaskProgress>>([]);

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
                    setTasksProgress([]);

                    try {
                        const wallpaperId = await createNewWallpaper(file, (newTaskProgress: TaskProgress) => {
                            console.info('☑', newTaskProgress);

                            setTasksProgress((tasksProgress) =>
                                // TODO: !!! Preserve order of tasksProgress
                                // TODO: Make from the code bellow util joinTasksProgress(...tasksProgress: Array<TaskProgress>): Array<TaskProgress>
                                [...tasksProgress.filter(({ name }) => newTaskProgress.name !== name), newTaskProgress],
                            );
                        });
                        router.push(`/${wallpaperId}`);
                        // Note: No need to setWorking(false); because we are redirecting to another page
                    } catch (error) {
                        if (!(error instanceof Error)) {
                            throw error;
                        }

                        alert(error.message);
                        setWorking(false);
                        setTasksProgress([]);
                    }
                }}
            >
                Drop image to
                <br />
                <b>make new web</b>
            </UploadZone>
            {isWorking && <TasksInProgress {...{ tasksProgress }} />}
        </>
    );
}

/**
 * TODO: [🧠] !! Speed up the computation of colorstats
 * TODO: [🧠] !! Compute ONLY colorstats in worker, rest here - split workers into multiple parts
 * TODO: [🧠] !! Upload image and Compute colorstats in parallel + remove the comment blocks
 * TODO: Maybe derive isWorking from taskProgress
 * TODO: Maybe it is not very efficient to first convert image to dataurl and create image from the dataurl - maybe just createImageFromFile / createImageFromBlob
 * TODO: !! It Should be possible to list private wallpapers via getSupabaseForBrowser().from('Wallpaper').select('*').eq('isPublic', false)
 */
