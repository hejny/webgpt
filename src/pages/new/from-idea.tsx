import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import spaceTrim from 'spacetrim';
import { IS_VERIFIED_EMAIL_REQUIRED } from '../../../config';
import webgptLogo from '../../../public/logo/webgpt.white.svg';
import { StaticAppHead } from '../../components/AppHead/StaticAppHead';
import { CopilotInput } from '../../components/CopilotInput/CopilotInput';
import { LanguagePickerWithHint } from '../../components/LanguagePicker/LanguagePickerWithHint';
import { Center } from '../../components/SimpleLayout/Center';
import { joinTasksProgress } from '../../components/TaskInProgress/task/joinTasksProgress';
import { TaskProgress } from '../../components/TaskInProgress/task/TaskProgress';
import { TasksInProgress } from '../../components/TaskInProgress/TasksInProgress';
import { Translate } from '../../components/Translate/Translate';
import styles from '../../styles/static.module.css' /* <- TODO: [🤶] Get rid of page css and only use components (as <StaticLayout/>) */;
import { useLocale } from '../../utils/hooks/useLocale';
import { shuffleItems } from '../../utils/shuffleItems';
import { provideClientId } from '../../utils/supabase/provideClientId';
import { createNewWallpaperForBrowser } from '../../workers/createNewWallpaper/createNewWallpaperForBrowser';

export default function NewWallpaperFromIdeaPage() {
    const router = useRouter();
    const locale = useLocale();
    const [isWorking, setWorking] = useState(false);
    const [tasksProgress, setTasksProgress] = useState<Array<TaskProgress>>(
        [],
    ); /* <- TODO: [🌄] useTasksProgress + DRY */
    const placeholders = useMemo(() => shuffleItems('Restaurace', 'Osobní web', 'Kavárna'), []);

    return (
        <>
            <StaticAppHead subtitle={null} />
            <LanguagePickerWithHint />

            <div className={styles.page}>
                <main>
                    <Center>
                        <h1
                            style={{
                                transform: 'translate(0,-20px)',
                            }}
                        >
                            <Image alt="WebGPT logo" src={webgptLogo} />
                        </h1>
                        <CopilotInput
                            {...{ placeholders }}
                            label={
                                <>
                                    {/* [⛳] */}
                                    <Translate locale="en">What web do you want to make:</Translate>
                                    <Translate locale="cs">Jaký web chcete vytvořit:</Translate>
                                </>
                            }
                            onPrompt={async (idea) => {
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
                                    const { wallpaperId } = await createNewWallpaperForBrowser(
                                        {
                                            locale,
                                            idea,
                                            author: await provideClientId({
                                                isVerifiedEmailRequired: IS_VERIFIED_EMAIL_REQUIRED.CREATE,
                                            }),
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
                            <>
                                {/* [⛳] */}
                                <Translate locale="en">Rád bych se inspiroval</Translate>
                                <Translate locale="cs">I need an inspiration</Translate>
                            </>
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
