import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useMemo, useRef, useState } from 'react';
import spaceTrim from 'spacetrim';
import { COPILOT_PLACEHOLDERS } from '../../../config';
import type {
    UpdateWallpaperContentRequest,
    UpdateWallpaperContentResponse,
} from '../../pages/api/update-wallpaper-content';
import { classNames } from '../../utils/classNames';
import { computeWallpaperUriid } from '../../utils/computeWallpaperUriid';
import { focusRef } from '../../utils/focusRef';
import { useCurrentWallpaper } from '../../utils/hooks/useCurrentWallpaper';
import { useRotatingPlaceholder } from '../../utils/hooks/useRotatingPlaceholder';
import { serializeWallpaper } from '../../utils/hydrateWallpaper';
import { shuffleItems } from '../../utils/shuffleItems';
import { getSupabaseForBrowser } from '../../utils/supabase/getSupabaseForBrowser';
import { provideClientId } from '../../utils/supabase/provideClientId';
import { string_prompt } from '../../utils/typeAliases';
import { parseKeywordsFromWallpaper } from '../Gallery/GalleryFilter/utils/parseKeywordsFromWallpaper';
import { Hint } from '../Hint/Hint';
import { TorusInteractiveImage } from '../TaskInProgress/TorusInteractiveImage';
import { WallpaperLink } from '../WallpaperLink/WallpaperLink';
import styles from './CopilotPanel.module.css';

/**
 * Renders the co-pilot panel for text commands to edit the page.
 */
export function CopilotPanel() {
    const router = useRouter();
    const [wallpaper, modifyWallpaper] = useCurrentWallpaper();
    const [runningPrompt, setRunningPrompt] = useState<null | string_prompt>(null);
    const [isMenuOpen, setMenuOpen] = useState(false); /* <- TODO: useToggle */
    const inputRef = useRef<HTMLInputElement | null>(null);
    const placeholders = useMemo(() => shuffleItems(...COPILOT_PLACEHOLDERS), []);
    const placeholder = useRotatingPlaceholder(...placeholders);

    const handlePrompt = useCallback(async () => {
        if (runningPrompt !== null) {
            console.error('Prompt is already running');
            return;
        }

        try {
            let prompt = inputRef.current?.value || '';
            setRunningPrompt(prompt);

            // TODO: [🍛] Make same normalization as in the backend
            prompt = spaceTrim(prompt);

            if (!prompt) {
                alert('Please enter a command');
                setRunningPrompt(null);
                return;
            }

            console.info(
                `%c${prompt}`,
                spaceTrim(`
                display: block;
                background: #067597;
                color: #FFFFFF;
                padding: 5px;
                border-radius: 3px;
            `),
            );

            const { content: oldContent } = wallpaper;

            const response = await fetch(
                `/api/update-wallpaper-content?clientId=${await provideClientId({ isVerifiedEmailRequired: true })}`,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        prompt,
                        wallpaper: { content: oldContent },
                    } satisfies UpdateWallpaperContentRequest),
                    signal: AbortSignal.timeout(60000 /* <- TODO: Maybe in sync with vercel.json */),
                },
            );

            if (response.ok === false) {
                // TODO: [🈵] If 4XX error, show also the message from json body
                throw new Error(`Prompt failed with status ${response.status}`);
            }

            const {
                updatedWallpaper: { content: newContent },
            } = (await response.json()) as UpdateWallpaperContentResponse;

            console.info({ oldContent, newContent });

            const newWallpaper = modifyWallpaper((modifiedWallpaper) => {
                // Note: [🗄] title is computed after each change id+parent+author+keywords are computed just once before save
                // TODO: Use here addWallpaperComputables
                modifiedWallpaper.parent = modifiedWallpaper.id;
                modifiedWallpaper.content = newContent + '\n\n<hr/>' + prompt;
                modifiedWallpaper.saveStage = 'SAVING';
                modifiedWallpaper.keywords = Array.from(parseKeywordsFromWallpaper(modifiedWallpaper));
                modifiedWallpaper.id = computeWallpaperUriid(modifiedWallpaper);
                return modifiedWallpaper;
            });

            const insertResult = await getSupabaseForBrowser()
                .from('Wallpaper')
                .insert(serializeWallpaper(newWallpaper));

            // TODO: !! Util isInsertSuccessfull (status===201)
            console.info({ newWallpaper, insertResult });

            router.push(`/${newWallpaper.id}`);

            inputRef.current!.value = '';
        } finally {
            setRunningPrompt(null);
        }
    }, [router, wallpaper, modifyWallpaper, runningPrompt, inputRef]);

    return (
        <div className={classNames('aiai-controls', styles.CopilotPanel)}>
            <div
                // Note: It is intended to have two divs embedded in each other
                className={styles.CopilotPanelInner}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        handlePrompt();
                    }
                }}
            >
                <input
                    type={'text'}
                    placeholder={placeholder}
                    value={runningPrompt === null ? undefined : `Working on "${runningPrompt}"...`}
                    ref={(element) => {
                        // TODO: [🍘] Use joinRefs
                        focusRef(element);
                        inputRef.current = element;
                    }}
                    disabled={runningPrompt !== null}
                />

                <Hint
                    className={styles.Button}
                    id="prompt-copilot"
                    title="Apply your change"
                    reapearCount={0}
                    isDisabled
                >
                    <button
                        disabled={runningPrompt !== null}
                        title="Apply your change"
                        onClick={() => {
                            handlePrompt();
                        }}
                    >
                        {runningPrompt === null ? (
                            <Image
                                alt="✈"
                                src="/icons/other/paper-plane.white.png"
                                /*
                                alt="🚀"
                                src="/icons/openmoji/1F680.black.svg"
                                */
                                width={25}
                                height={25} /* <-[🧥] */
                            />
                        ) : (
                            <TorusInteractiveImage width={55} height={55} />
                        )}
                    </button>
                </Hint>

                <div
                    className={classNames(styles.Button, styles.MenuHamburger)}
                    onClick={() => setMenuOpen(!isMenuOpen)}
                >
                    {/**
                     * Note: Not using AI Components in this menu because we want such a different look&feel
                     * Note: It is intended to have two divs embedded in each other one useing setMenuOpen and inner one using isMenuOpen
                     */}

                    <div className={classNames(styles.MenuHamburgerInner, isMenuOpen && styles.open)}>
                        <div className={classNames(styles.bar, styles.bar1)}></div>
                        <div className={classNames(styles.bar, styles.bar2)}></div>
                        <div className={classNames(styles.bar, styles.bar3)}></div>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <nav className={styles.MenuContent}>
                    <ul>
                        {wallpaper.saveStage === 'EDITED' && (
                            // TODO: [🌨] DRY - Maybe <SaveButton> or saveWallpaper() function
                            <li
                                className={styles.extraFeatured}
                                onClick={async () => {
                                    const clientId = await provideClientId({
                                        isVerifiedEmailRequired: false,
                                    });
                                    const newWallpaper = modifyWallpaper((modifiedWallpaper) => {
                                        // Note: [🗄] title is computed after each change id+parent+author+keywords are computed just once before save
                                        // TODO: Use here addWallpaperComputables
                                        modifiedWallpaper.parent = modifiedWallpaper.id;
                                        modifiedWallpaper.author = clientId;
                                        modifiedWallpaper.isPublic = false;
                                        modifiedWallpaper.saveStage = 'SAVING';
                                        modifiedWallpaper.keywords = Array.from(
                                            parseKeywordsFromWallpaper(modifiedWallpaper),
                                        );
                                        modifiedWallpaper.id = computeWallpaperUriid(modifiedWallpaper);
                                        return modifiedWallpaper;
                                    });

                                    const insertResult = await getSupabaseForBrowser()
                                        .from('Wallpaper')
                                        .insert(serializeWallpaper(newWallpaper));

                                    // TODO: !! Util isInsertSuccessfull (status===201)
                                    console.info({ newWallpaper, insertResult });

                                    /*
                                    Note: Wallpapers should not be explicitly saved, they automatically appear as saved after router.push is loaded
                                    modifyWallpaper((modifiedWallpaper) => {
                                        modifiedWallpaper.saveStage = 'SAVED';
                                        return modifiedWallpaper;
                                    });
                                    */

                                    try {
                                        const parentKey = `likedStatus_${wallpaper.id}`;
                                        const currentKey = `likedStatus_${newWallpaper.id}`;

                                        if (window.localStorage.getItem(parentKey)) {
                                            window.localStorage.setItem(
                                                currentKey,
                                                window.localStorage.getItem(parentKey)!,
                                            );
                                        } else if (!window.localStorage.getItem(currentKey)) {
                                            window.localStorage.setItem(
                                                currentKey,
                                                'LIKE' satisfies keyof typeof LikedStatus,
                                            );
                                        }
                                    } catch (error) {
                                        // TODO: [🧠] Handle situation when window.localStorage is exceeded
                                        console.error(error);
                                    }

                                    router.push(`/${newWallpaper.id}`);
                                }}
                            >
                                Save
                            </li>
                        )}
                        <li className={styles.featured}>
                            <WallpaperLink
                                modal="export"
                                role="OWNER"
                                /* Note: Keeping prefetch because we want to be this as-fast-as-possible */
                            >
                                Get the web
                            </WallpaperLink>
                        </li>
                        <li>
                            <WallpaperLink modal="edit-content" role="OWNER" prefetch={false}>
                                Edit markdown
                                {/*           <- TODO: Should be here "Edit markdown" or "Edit content" */}
                            </WallpaperLink>
                        </li>
                        <li>
                            <WallpaperLink
                                role="OWNER_AS_VISITOR"
                                /* Note: Keeping prefetch because we want to be this as-fast-as-possible */
                            >
                                Show as visitor
                            </WallpaperLink>
                        </li>
                        <li>
                            <WallpaperLink
                                // TODO: With QR and explanation
                                role="VISITOR"
                                /* Note: Keeping prefetch because we want to be this as-fast-as-possible */
                            >
                                Share
                            </WallpaperLink>
                        </li>
                        <li>
                            <a href="mailto:me@pavolhejny.com">Contact</a>
                        </li>
                        {/*
                        TODO: !! The menu should be like this: 

                        - [x] Show as visitor
                        - [~] Share
                        - [x] Get the web
                        - [ ] Edit
                        - [ ] - advanced prompting
                        - [ ] - colors
                        - [ ] - content
                        - [~] Support


                        <li>
                            <WallpaperLink page="contact">Contact</WallpaperLink>
                        </li>
                        */}
                    </ul>
                </nav>
            )}
        </div>
    );
}

/**
 * TODO: !! CopilotPanel: Fully line design
 * TODO: !! CopilotPanel: Show errors
 * TODO: !! CopilotPanel: Log errors into Sentry
 * TODO: [🧠] In future queue the prompts and have deamon for it
 * TODO: !! Add more options like Close (OWNER_AS_VISITOR), Share (VISITOR), Edit colors, Get the web, How it works?, Pricing, Gallery, Back
 *       ( ⏣ | Write prompt | Apply | More | Close )
 */
