import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import spaceTrim from 'spacetrim';
import { IS_VERIFIED_EMAIL_REQUIRED } from '../../../config';
import { StaticAppHead } from '../../components/AppHead/StaticAppHead';
import { Center } from '../../components/SimpleLayout/Center';
import { joinTasksProgress } from '../../components/TaskInProgress/task/joinTasksProgress';
import { TaskProgress } from '../../components/TaskInProgress/task/TaskProgress';
import { TasksInProgress } from '../../components/TaskInProgress/TasksInProgress';
import styles from '../../styles/static.module.css' /* <- TODO: [🤶] Get rid of page css and only use components (as <StaticLayout/>) */;
import { randomItem } from '../../utils/randomItem';
import { fetchImage } from '../../utils/scraping/fetchImage';
import { provideClientId } from '../../utils/supabase/provideClientId';
import { createNewWallpaperForBrowser } from '../../workers/createNewWallpaper/createNewWallpaperForBrowser';
import type { ScrapeInstagramUserResponse } from '../api/scrape/scrape-instagram-user';

export default function NewWallpaperFromInstagramPage() {
    const instagramNameInputRef = useRef<HTMLInputElement | null>(null);
    const router = useRouter();
    const [isWorking, setWorking] = useState(false);
    const [tasksProgress, setTasksProgress] = useState<Array<TaskProgress>>(
        [],
    ); /* <- TODO: [🌄] useTasksProgress + DRY */

    return (
        <>
            <StaticAppHead subtitle={null} />

            <div className={styles.page}>
                <main>
                    <Center>
                        <h1>AI Web Maker</h1>
                        Write your Instagram name to make new web from:
                        <br />
                        <input
                            type="text"
                            placeholder="@pavolhejny"
                            ref={instagramNameInputRef}
                            defaultValue="michelangelato.zmrzlinarna" // <- TODO: !!! Remove or to config
                        />
                        <button
                            className="button-TODO"
                            onClick={async () => {
                                setWorking(true);
                                setTasksProgress([
                                    {
                                        // TODO: Use here taskify instead
                                        // TODO: [🧠][🚔] DEFAULT_STARTING_TASK
                                        name: 'start-worker',
                                        title: 'Spinning up',
                                        isDone: false,
                                    },
                                ]);

                                try {
                                    const instagramName = instagramNameInputRef.current?.value!;

                                    // TODO: [7] Normalize instagramName
                                    //      https://www.instagram.com/michelangelato.zmrzlinarna/ -> michelangelato.zmrzlinarna
                                    //      https://www.instagram.com/michelangelato.zmrzlinarna/?whatever=foo#bar -> michelangelato.zmrzlinarna
                                    //      @michelangelato.zmrzlinarna -> michelangelato.zmrzlinarna
                                    //      michelangelato.zmrzlinarna -> michelangelato.zmrzlinarna

                                    const reponse = await fetch(
                                        // TODO: [🌺][3] Make some wrapper for this apiClient to construct requests + parse them and handle errors
                                        `/api/scrape/scrape-instagram-user?clientId=${await provideClientId({
                                            isVerifiedEmailRequired: IS_VERIFIED_EMAIL_REQUIRED.CREATE,
                                        })}&instagramName=${encodeURIComponent(instagramName)}`,
                                    );
                                    const { instagramUser } = (await reponse.json()) as ScrapeInstagramUserResponse;

                                    console.info('👤', { instagramUser });

                                    // instagramUser.biography;
                                    // instagramUser.business_category_name;
                                    // const profileImage = await fetchImage(instagramUser.profile_pic_url_hd);
                                    const randomTimelinePost = randomItem(
                                        ...instagramUser.edge_owner_to_timeline_media.edges,
                                    ).node;
                                    const randomTimelineImage = await fetchImage(randomTimelinePost.display_url);

                                    //logImage(randomTimelineImage);

                                    const { wallpaperId } = await createNewWallpaperForBrowser(
                                        {
                                            author: await provideClientId({
                                                isVerifiedEmailRequired: IS_VERIFIED_EMAIL_REQUIRED.CREATE,
                                            }),
                                            wallpaperImage: randomTimelineImage,
                                            description: spaceTrim(
                                                // TODO: [🧠] Maybe pass business_category_name as separate field?
                                                // TODO: [🧠] This is kind of part of PromptTemplate, how to work with it?
                                                (block) => `
                                                    ${block((instagramUser.business_category_name || '').toLowerCase())}
                                                    ${block(instagramUser.biography)}
                                                `,
                                            ),

                                            // TODO: [🧠] !!! Go through instagramUser which info to pass
                                            // TODO: !!! Pass here instagramUser to make AI Instagram Gallery Component
                                            // TODO: !!! Add instagram and facebook link to contacts automatically
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
                            Create
                        </button>
                    </Center>
                </main>

                {isWorking && <TasksInProgress {...{ tasksProgress }} />}

                {/* TODO: Make here some footer
                <footer>
                    <FooterSection />
                </footer>
                */}
            </div>
        </>
    );
}

/**
 * TODO: [7] Work with @ without @ (and with https://www.instagram.com/...)
 * TODO: [👐] Unite design of all /new/* pages
 * TODO: [🏍] Standardize process of getting input data for new wallpaper
 * TODO: [☃] Maybe derive isWorking from taskProgress
 */
