import { useRouter } from 'next/router';
import { useCallback, useMemo, useState } from 'react';
import spaceTrim from 'spacetrim';
import { IS_VERIFIED_EMAIL_REQUIRED } from '../../../config';
import { StaticAppHead } from '../../components/AppHead/StaticAppHead';
import { SimpleChat } from '../../components/Chat/SimpleChat/SimpleChat';
import { joinTasksProgress } from '../../components/TaskInProgress/task/joinTasksProgress';
import { WebgptTaskProgress } from '../../components/TaskInProgress/task/WebgptTaskProgress';
import { TasksInProgress } from '../../components/TaskInProgress/TasksInProgress';
import styles from '../../styles/static.module.css' /* <- TODO: [🤶] Get rid of page css and only use components (as <StaticLayout/>) */;
import { useLocale } from '../../utils/hooks/useLocale';
import { shuffleItems } from '../../utils/shuffleItems';
import { provideClientId } from '../../utils/supabase/provideClientId';
import { createNewWallpaperForBrowser } from '../../workers/functions/createNewWallpaper/workerify/createNewWallpaperForBrowser';

export default function NewWallpaperFromIdeaPage() {
    const router = useRouter();
    const locale = useLocale();
    const [isRunning, setRunning] = useState(false);
    const [tasksProgress, setTasksProgress] = useState<Array<WebgptTaskProgress>>(
        [],
    ); /* <- TODO: [🌄] useTasksProgress + DRY */
    const placeholders = useMemo(
        () =>
            shuffleItems(
                ...{ en: ['Restaurant', 'Personal website', 'Café'], cs: ['Restaurace', 'Osobní web', 'Kavárna'] }[
                    locale
                ],
            ),
        [locale],
    );

    const runWallpaperCreation = useCallback(
        async (idea: string) => {
            if (isRunning) {
                alert(
                    spaceTrim(`
                        WebGPT website creation is already running.
                        
                        Please wait until it finishes or refresh the page.
                    `),
                );
                return;
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
                    },
                    (newTaskProgress: WebgptTaskProgress) => {
                        console.info('☑', newTaskProgress);
                        setTasksProgress((tasksProgress) => joinTasksProgress(...tasksProgress, newTaskProgress));
                    },
                );
                router.push(
                    `/${wallpaperId}` /* <- Note: Not passing ?scenario=from-something here because FROM_SOMETHING is default scenario */,
                );
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
                setRunning(false);
                setTasksProgress([]);
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
                    <SimpleChat
                        style={{
                            // outline: '1px dotted #ff0000',
                            width: '100vw',
                            height: '100vh',
                        }}
                        isVoiceEnabled
                        voiceLanguage="cs"
                        initialMessage="Jaký web chcete vytvořit?"
                        onMessage={(message) =>
                            spaceTrim(
                                (block) => `
                                    Řekli jste: 

                                    > ${block(message)}  
                                `,
                            )
                        }
                    />
                </main>

                {isRunning && <TasksInProgress {...{ tasksProgress }} />}
            </div>
        </>
    );
}

/**
 * TODO: !!! cs/en
 * TODO: !!! Better layout - link back + WebGPT logo etc.
 * TODO: [👐] Unite design of all /new/* pages
 */
