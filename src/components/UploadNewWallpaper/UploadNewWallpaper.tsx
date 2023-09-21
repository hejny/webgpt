import { useRouter } from 'next/router';
import { ReactNode, useState } from 'react';
import spaceTrim from 'spacetrim';
import { IS_VERIFIED_EMAIL_REQUIRED } from '../../../config';
import { classNames } from '../../utils/classNames';
import { provideClientId } from '../../utils/supabase/provideClientId';
import { string_css_class } from '../../utils/typeAliases';
import { createNewWallpaperForBrowser } from '../../workers/createNewWallpaper/createNewWallpaperForBrowser';
import { joinTasksProgress } from '../TaskInProgress/task/joinTasksProgress';
import { TaskProgress } from '../TaskInProgress/task/TaskProgress';
import { TasksInProgress } from '../TaskInProgress/TasksInProgress';
import { UploadZone } from '../UploadZone/UploadZone';
import styles from './UploadNewWallpaper.module.css';

interface UploadZoneProps {
    /**
     * Content of the UploadZone
     * If not provided, default content will be used
     */
    children?: ReactNode;

    /**
     * Optional CSS class name which will be added to root element
     */
    className?: string_css_class;
}

export function UploadNewWallpaper(props: UploadZoneProps) {
    const { children, className } = props;
    const router = useRouter();
    const [isWorking, setWorking] = useState(false);
    const [tasksProgress, setTasksProgress] = useState<Array<TaskProgress>>(
        [],
    ); /* <- TODO: [🌄] useTasksProgress + DRY */

    return (
        <>
            <UploadZone
                className={classNames(className, styles.UploadNewWallpaper)}
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
                        const { wallpaperId } = await createNewWallpaperForBrowser(
                            {
                                author: await provideClientId({
                                    isVerifiedEmailRequired: IS_VERIFIED_EMAIL_REQUIRED.CREATE,
                                }),
                                wallpaperImage: file,
                                title: null,
                                description: null,
                                addSections: [],
                                links: [],
                            },
                            (newTaskProgress: TaskProgress) => {
                                console.info('☑', newTaskProgress);
                                setTasksProgress((tasksProgress) =>
                                    joinTasksProgress(...tasksProgress, newTaskProgress),
                                );
                            },
                        );
                        router.push(
                            `/${wallpaperId}` /* <- Note: Not passing ?scenario=from-something here because FROM_SOMETHING is default scenario */,
                        );
                        // Note: No need to setWorking(false); because we are redirecting to another page
                    } catch (error) {
                        if (!(error instanceof Error)) {
                            throw error;
                        }

                        alert(
                            // <- TODO: Use here alertDialogue
                            // TODO: [🏔] DRY
                            spaceTrim(
                                (block) => `
                                    Sorry for the inconvenience 😔
                                    Something went wrong while making your website.
                                    Please try it again or write me an email to me@pavolhejny.com
                        
                                    ${block((error as Error).message)}
                                
                                `,
                            ),
                        );
                        setWorking(false);
                        setTasksProgress([]);
                    }
                }}
            >
                {children ? (
                    children
                ) : (
                    <>
                        Drop image to
                        <br />
                        <b>make your web</b>
                    </>
                )}
            </UploadZone>
            {isWorking && <TasksInProgress {...{ tasksProgress }} />}
        </>
    );
}

/**
 * TODO: [🧠] !! Speed up the computation of colorstats
 * TODO: [🧠] !! Compute ONLY colorstats in worker, rest here - split workers into multiple parts
 * TODO: [🧠] !! Upload image and Compute colorstats in parallel + remove the comment blocks
 * TODO: [☃] Maybe derive isWorking from taskProgress
 * TODO: Maybe it is not very efficient to first convert image to dataurl and create image from the dataurl - maybe just createImageFromFile / createImageFromBlob
 * TODO: !! It Should be possible to list private wallpapers via getSupabaseForBrowser().from('Wallpaper').select('*').eq('isPublic', false)
 * TODO: [🏍] Standardize process of getting input data for new wallpaper
 */
