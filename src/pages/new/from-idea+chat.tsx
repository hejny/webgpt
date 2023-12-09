import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import spaceTrim from 'spacetrim';
import { forEver } from 'waitasecond';
import { IS_VERIFIED_EMAIL_REQUIRED } from '../../../config';
import { StaticAppHead } from '../../components/AppHead/StaticAppHead';
import { WorkerChat } from '../../components/Chat/WorkerChat/WorkerChat';
import { joinTasksProgress } from '../../components/TaskInProgress/task/joinTasksProgress';
import { WebgptTaskProgress } from '../../components/TaskInProgress/task/WebgptTaskProgress';
import styles from '../../styles/static.module.css' /* <- TODO: [🤶] Get rid of page css and only use components (as <StaticLayout/>) */;
import { useLocale } from '../../utils/hooks/useLocale';
import { provideClientId } from '../../utils/supabase/provideClientId';
import { createNewWallpaperForBrowser } from '../../workers/functions/createNewWallpaper/workerify/createNewWallpaperForBrowser';

export default function NewWallpaperFromIdeaPage() {
    const router = useRouter();
    const locale = useLocale();

    // TODO: !!! [🧠] Maybe remove isRunning from chat interface
    const [isRunning, setRunning] = useState(false);
    // TODO: !!! [🧠] Maybe remove tasksProgress from chat interface
    const [tasksProgress, setTasksProgress] = useState<Array<WebgptTaskProgress>>(
        [],
    ); /* <- TODO: [🌄] useTasksProgress + DRY */

    // TODO: !!! [🧠] How to put in chat interface placehokders and default values?
    /*
    const placeholders = useMemo(
        () =>
            shuffleItems(
                ...{ en: ['Restaurant', 'Personal website', 'Café'], cs: ['Restaurace', 'Osobní web', 'Kavárna'] }[
                    locale
                ],
            ),
        [locale],
    );
    */

    const runWallpaperCreation = useCallback<(idea: string) => Promise<never>>(
        async (idea: string) => {
            if (isRunning) {
                alert(
                    spaceTrim(`
                        WebGPT website creation is already running.
                        
                        Please wait until it finishes or refresh the page.
                    `),
                );
                // TODO: !!! [🧠] Propper way how to handle "WebGPT website creation is already running." in chat interface
                return forEver();
            }

            setRunning(true);
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
                const { wallpaperId } = await createNewWallpaperForBrowser(
                    {
                        locale,
                        idea,
                        author: await provideClientId({
                            isVerifiedEmailRequired: IS_VERIFIED_EMAIL_REQUIRED.CREATE,
                        }),
                        // TODO: !!! isImageGeneratedWithoutAsking: true
                    },
                    (newTaskProgress: WebgptTaskProgress) => {
                        console.info('☑', newTaskProgress);
                        setTasksProgress((tasksProgress) => joinTasksProgress(...tasksProgress, newTaskProgress));
                    },
                );
                router.push(
                    `/${wallpaperId}` /* <- Note: Not passing ?scenario=from-something here because FROM_SOMETHING is default scenario */,
                );
                return forEver();

                // Note: No need to setWorking(false); because we are redirecting to another page
                //       [0] OR to do it in the finally block
            } catch (error) {
                if (!(error instanceof Error)) {
                    throw error;
                }

                alert(
                    // <- TODO: Use here alertDialogue
                    spaceTrim(
                        // TODO: [🦻] DRY User error message
                        (block) => `
                            Sorry for the inconvenience 😔
                            Something went wrong while making your website.
                            Please try it again or write me an email to me@pavolhejny.com
                
                            ${block((error as Error).message)}
                        
                        `,
                    ),
                );

                // TODO: !!! [🧠] Propper way how to handle errors in chat interface
                setRunning(false);
                setTasksProgress([]);
                window.location.reload();

                return forEver();
            } // <- Note: [0] No finally block because we are redirecting to another page
        },
        [isRunning, locale, router],
    );

    return (
        <>
            <StaticAppHead subtitle={null} />
            {/* !!! 
            <LanguagePickerWithHint />*/}

            <div className={styles.page}>
                <main>
                    <WorkerChat
                        style={{
                            // TODO: !! Better layout - link back + WebGPT logo etc. + use css modules
                            // outline: '1px dotted #00ff00',
                            position: 'fixed',
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                        }}
                        isVoiceEnabled
                        voiceLanguage="cs"
                        initialMessage="Jaký web chcete vytvořit?"
                        workFunction={runWallpaperCreation}
                    />
                </main>

                {/* !!! [🧠]  
                {isRunning && <TasksInProgress {...{ tasksProgress }} />}
                */}
            </div>
        </>
    );
}

/**
 * TODO: !!! cs/en
 * TODO: !!! Better layout - link back + WebGPT logo etc.
 * TODO: [👐] Unite design of all /new/* pages
 */
