import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useMemo, useRef, useState } from 'react';
import spaceTrim from 'spacetrim';
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
import { parseKeywordsFromWallpaper } from '../Gallery/GalleryFilter/utils/parseKeywordsFromWallpaper';
import { Hint } from '../Hint/Hint';
import { WallpaperLink } from '../WallpaperLink/WallpaperLink';
import styles from './CopilotPanel.module.css';

/**
 * Renders the co-pilot panel for text commands to edit the page.
 */
export function CopilotPanel() {
    const router = useRouter();
    const [wallpaper, modifyWallpaper] = useCurrentWallpaper();
    const [isRunning, setRunning] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false); /* <- TODO: useToggle */
    const inputRef = useRef<HTMLInputElement | null>(null);
    const placeholders = useMemo(
        () =>
            shuffleItems(
                // TODO: Put into config
                // '⏣ Describe the change>'
                'Translate to Chinese',
                'Translate to English',
                'Translate to French',
                'Translate to German',
                'Translate to Italian',
                'Translate to Japanese',
                'Translate to Korean',
                'Translate to Portuguese',
                'Translate to Ukrainian',
                'Add email contact pavol@hejny.org',
                'Add phone contact +420 123 456 789',
                'Add a link to website www.pavolhejny.com',
                'Change opening hours on friday to 10:00-12:00',
                `We are temporarily closed due to vacation till tomorrow`,
                `Make better claim`,
                `Make better title`,
                `Shorten text about the company`,
                `Add new product - 3D printer`,
                `Delete the product - 3D printer`,
                'Change phone number to +007 123 456 789',
                'Make the text more friendly',
                'Make the text more formal',
                'Make the text more funny',
                'Make the text more serious',
                'Make the text more professional',
                'Make the text more personal',
                'Make the text more technical',
                'Make the text more simple',
                'Add a new paragraph - "We are the best"',
                'Add a new paragraph - "We are the cheapest"',
                'Add a new paragraph - "We are the fastest"',
                'Add a new paragraph - "We are the most reliable"',
                'Add bullet points why we are the best',
                'Add pricing table',
            ),
        [],
    );
    const placeholder = useRotatingPlaceholder(...placeholders);

    const handlePrompt = useCallback(async () => {
        if (isRunning) {
            return;
        }

        setRunning(true);

        try {
            let prompt = inputRef.current?.value || '';

            // TODO: [🍛] Make same normalization as in the backend
            prompt = spaceTrim(prompt);

            if (!prompt) {
                alert('Please enter a command');
                setRunning(false);
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

            const response = await fetch('/api/update-wallpaper-content', {
                method: 'POST',
                body: JSON.stringify({
                    prompt,
                    wallpaper: { content: oldContent },
                } satisfies UpdateWallpaperContentRequest),
                signal: AbortSignal.timeout(60000 /* <- TODO: Maybe in sync with vercel.json */),
            });

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
            setRunning(false);
        }
    }, [router, wallpaper, modifyWallpaper, isRunning, inputRef]);

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
                    ref={(element) => {
                        // TODO: [🍘] Use joinRefs
                        focusRef(element);
                        inputRef.current = element;
                    }}
                    disabled={isRunning}
                />

                <Hint className={styles.Button} id="prompt-copilot" title="Apply your change" reapearCount={0}>
                    <button
                        disabled={isRunning}
                        onClick={() => {
                            handlePrompt();
                        }}
                    >
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
                    </button>
                </Hint>

                <div
                    className={classNames(
                        styles.Button,
                        styles.MenuHamburger ,
                    )}
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
                            <WallpaperLink
                                role="OWNER_AS_VISITOR"
                                /* Note: Keeping prefetch because we want to be this as-fast-as-possible */
                            >
                                Show as visitor
                            </WallpaperLink>
                        </li>
                        <li>
                            <WallpaperLink
                                // TODO: !!! With QR and explanation

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
 * TODO: !! Add more options like Close (OWNER_AS_VISITOR), Share (VISITOR), Edit colors, Get the web, How it works?, Pricing, Gallery, Back
 *       ( ⏣ | Write prompt | Apply | More | Close )
 */
