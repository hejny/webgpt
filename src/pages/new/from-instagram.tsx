import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import spaceTrim from 'spacetrim';
import { INSTAGRAM_PLACEHOLDERS, IS_VERIFIED_EMAIL_REQUIRED } from '../../../config';
import { StaticAppHead } from '../../components/AppHead/StaticAppHead';
import { CopilotInput } from '../../components/CopilotInput/CopilotInput';
import { HandwrittenText } from '../../components/HandwrittenText/HandwrittenText';
import { Center } from '../../components/SimpleLayout/Center';
import { joinTasksProgress } from '../../components/TaskInProgress/task/joinTasksProgress';
import { TaskProgress } from '../../components/TaskInProgress/task/TaskProgress';
import { TasksInProgress } from '../../components/TaskInProgress/TasksInProgress';
import styles from '../../styles/static.module.css' /* <- TODO: [🤶] Get rid of page css and only use components (as <StaticLayout/>) */;
import { Color } from '../../utils/color/Color';
import { normalizeInstagramName } from '../../utils/normalizeInstagramName';
import { randomItem } from '../../utils/randomItem';
import { fetchImage } from '../../utils/scraping/fetchImage';
import { shuffleItems } from '../../utils/shuffleItems';
import { provideClientId } from '../../utils/supabase/provideClientId';
import { createNewWallpaperForBrowser } from '../../workers/createNewWallpaper/createNewWallpaperForBrowser';
import type { ScrapeInstagramUserResponse } from '../api/scrape/scrape-instagram-user';

export default function NewWallpaperFromInstagramPage() {
    const router = useRouter();
    const [isWorking, setWorking] = useState(false);
    const [tasksProgress, setTasksProgress] = useState<Array<TaskProgress>>(
        [],
    ); /* <- TODO: [🌄] useTasksProgress + DRY */
    const placeholders = useMemo(() => shuffleItems(...INSTAGRAM_PLACEHOLDERS), []);

    return (
        <>
            <StaticAppHead subtitle={null} />

            <div className={styles.page}>
                <main>
                    <Center>
                        <h1
                            style={{
                                maxWidth: '400px',
                                // outline: '1px solid red',
                                // transform: 'translate(0,20px)',
                            }}
                        >
                            <HandwrittenText color={Color.from('#fff')} style={'BigPartiallyPartiallyJoined'}>
                                AI Web Maker
                            </HandwrittenText>
                        </h1>

                        <CopilotInput
                            {...{ placeholders }}
                            label="Enter your Instagram:"
                            onPrompt={async (prompt) => {
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
                                    const instagramName = normalizeInstagramName(prompt);

                                    // TODO: Use here taskify instead
                                    setTasksProgress((tasksProgress) =>
                                        joinTasksProgress(...tasksProgress, {
                                            name: 'scrape-instagram-user',
                                            // TODO: Maybe split more granularly - scrape the data vs download the images
                                            title: 'Looking on Instagram',
                                            isDone: false,
                                        }),
                                    );

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

                                    // logImage(randomTimelineImage);

                                    // TODO: Use here taskify instead
                                    setTasksProgress((tasksProgress) =>
                                        joinTasksProgress(...tasksProgress, {
                                            name: 'scrape-instagram-user',
                                            isDone: true,
                                        }),
                                    );

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
                                                ${instagramUser.business_category_name || ''} ${
                                                    instagramUser.full_name || ''
                                                } 
                                                ${block(instagramUser.biography)}
                                            `,
                                            ),

                                            // TODO: [🧠] !!! Go through instagramUser which info to pass
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
                        />
                        <Link
                            href="/"
                            style={
                                {
                                    // outline: '1px solid red'
                                }
                            }
                        >
                            I have no Instagram account
                        </Link>
                    </Center>
                </main>

                {isWorking && <TasksInProgress {...{ tasksProgress }} />}
            </div>
        </>
    );
}

/**
 * TODO: Enhance the design of the page (and generally every page with <CopilotInput/>)
 * TODO: [👐] Unite design of all /new/* pages
 * TODO: [🏍] Standardize process of getting input data for new wallpaper
 * TODO: [☃] Maybe derive isWorking from taskProgress
 */
