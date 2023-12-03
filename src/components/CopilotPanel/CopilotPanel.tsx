import type { string_prompt } from '@promptbook/types';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useMemo, useRef, useState } from 'react';
import spaceTrim from 'spacetrim';
import { COPILOT_PLACEHOLDERS, FONTS, IS_VERIFIED_EMAIL_REQUIRED } from '../../../config';
import { getExecutionTools } from '../../ai/prompt-templates/getExecutionTools';
import { webgptPtpLibrary } from '../../ai/prompt-templates/webgptPtpLibrary';
import { classNames } from '../../utils/classNames';
import { computeWallpaperUriid } from '../../utils/computeWallpaperUriid';
import { removeContentComments } from '../../utils/content/removeContentComments';
import { focusRef } from '../../utils/focusRef';
import { useCurrentWallpaper } from '../../utils/hooks/useCurrentWallpaper';
import type { LikedStatus } from '../../utils/hooks/useLikedStatusOfCurrentWallpaper';
import { useLocale } from '../../utils/hooks/useLocale';
import { useRotatingPlaceholder } from '../../utils/hooks/useRotatingPlaceholder';
import { serializeWallpaper } from '../../utils/hydrateWallpaper';
import { randomItem } from '../../utils/randomItem';
import { shuffleItems } from '../../utils/shuffleItems';
import { getSupabaseForBrowser } from '../../utils/supabase/getSupabaseForBrowser';
import { provideClientId } from '../../utils/supabase/provideClientId';
import { validateMaxdown } from '../Content/Maxdown/validateMaxdown';
import { parseKeywordsFromWallpaper } from '../Gallery/GalleryFilter/utils/parseKeywordsFromWallpaper';
import { Hint } from '../Hint/Hint';
import { addFontToContent } from '../ImportFonts/addFontToContent';
import { changeFontsInContent } from '../ImportFonts/changeFontInContent';
import { extractFontsFromContent } from '../ImportFonts/extractFontsFromContent';
import { PublishLink } from '../PublishModal/PublishLink';
import { LoadingInteractiveImage } from '../TaskInProgress/LoadingInteractiveImage';
import { WallpaperLink } from '../WallpaperLink/WallpaperLink';
import styles from './CopilotPanel.module.css';
import { CopilotPanelChangeFont } from './CopilotPanelChangeFont';
import { CopilotPanelRotateColors } from './CopilotPanelRotateColors';

/**
 * Renders the co-pilot panel for text commands to edit the page.
 */
export function CopilotPanel() {
    const router = useRouter();
    const locale = useLocale();
    const [wallpaper, modifyWallpaper] = useCurrentWallpaper();
    const [runningPrompt, setRunningPrompt] = useState<null | string_prompt>(null);
    const [isMenuOpen, setMenuOpen] = useState(false); /* <- TODO: useToggle */
    const inputRef = useRef<HTMLInputElement | null>(null);
    const placeholders = useMemo(() => shuffleItems(...COPILOT_PLACEHOLDERS), []);
    const placeholder = useRotatingPlaceholder(...placeholders);
    const randomFont = useMemo(
        () => randomItem(...FONTS) /* <- TODO: [🧠][🔠] Some better heurictic than pure random */,
        // Note: Wallpaper is dependency because we want to offer new font after each change of the font
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
        [wallpaper],
    );
    const modifyWallpaperFont = useCallback(() => {
        modifyWallpaper((modifiedWallpaper) => {
            modifiedWallpaper.content = changeFontsInContent(modifiedWallpaper.content, randomFont.fontFamily);
            modifiedWallpaper.saveStage = 'EDITED';
            return modifiedWallpaper;
        });
    }, [modifyWallpaper, randomFont]);

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

            let { content: oldContent } = wallpaper;

            const fonts = extractFontsFromContent(oldContent);
            if (fonts.size !== 1) {
                throw new Error(`Expected exactly one font in the content, got ${fonts.size}`);
            }
            const font = Array.from(fonts)[0]!;

            oldContent = removeContentComments(oldContent);

            const updateWebsiteContentLocaleMap = {
                en: 'updateWebsiteContent',
                cs: 'updateWebsiteContentCs',
                /* <- TODO: [👧] Constrain key to only existing PTPs in the library */
            };

            const { newContent } = await webgptPtpLibrary.createExecutor(
                updateWebsiteContentLocaleMap[
                    locale
                ] /* <- TODO: !! Deal here with locale better - detect from content NOT app */,
                getExecutionTools(
                    await provideClientId({
                        isVerifiedEmailRequired: IS_VERIFIED_EMAIL_REQUIRED.EDIT,
                    }),
                ),
            )(
                {
                    oldContent,
                    rawAssignment: prompt,
                },
                (taskProgress) => {
                    console.info('CopilotPanel: Update wallpaper content: ', { taskProgress });
                },
            );

            const newContentWithFont = addFontToContent(validateMaxdown(newContent || ''), font);

            /*/
            const newContentWithMetadata = spaceTrim(
                (block) => `
                    ${block(newContentWithFont)}

                    --- 

                    <div style="opacity: 0.5">

                    ## Old content:

                    ${block(oldContent)}

                    </div>
                `, // <- TODO: !! Just newContent, maybe use this in some debug mode
            );
            /**/
            /**/
            const newContentWithMetadata = newContentWithFont;
            /**/

            console.info('CopilotPanel: Update wallpaper content: ', { oldContent, newContent });

            const newWallpaper = modifyWallpaper((modifiedWallpaper) => {
                // Note: [🗄] title is computed after each change id+parent+author+keywords are computed just once before save
                // TODO: Use here addWallpaperComputables
                modifiedWallpaper.parent = modifiedWallpaper.id;
                modifiedWallpaper.content = newContentWithMetadata;
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
    }, [locale, router, wallpaper, modifyWallpaper, runningPrompt, inputRef]);

    return (
        <div className={classNames('webgpt-controls', styles.CopilotPanel)}>
            <div className={styles.CopilotPanelChat}>
                {/* TODO: Use here <ChatThreadComponent isTransparent><ChatMessageComponent isFeedbackCollected></ChatMessageComponent></ChatThreadComponent> */}
                <div className={styles.ChatMessageComponent}>
                    <div className={styles.author}>
                        <LoadingInteractiveImage width={55} height={55} />
                    </div>
                    <div className={styles.messageArrow} />
                    <div className={styles.message}>Do you like your new web?</div>
                </div>
            </div>

            <div
                className={styles.CopilotPanelInner}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        handlePrompt();
                    }
                }}
            >
                <input
                    type="text"
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
                            <LoadingInteractiveImage width={55} height={55} />
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
                            <li className={styles.extraFeatured}>
                                <button
                                    onClick={async () => {
                                        const clientId = await provideClientId({
                                            isVerifiedEmailRequired: IS_VERIFIED_EMAIL_REQUIRED.EDIT,
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
                                </button>
                            </li>
                        )}
                        <li className={styles.featured}>
                            <PublishLink />
                        </li>
                        <li>
                            <WallpaperLink modal="edit-content" role="OWNER" prefetch={false}>
                                Edit markdown
                                {/*           <- TODO: [🧠] Should be here "Edit markdown" or "Edit content" or "Advanced edit"
                                                       + It should be in the submenu of "Advanced edits"
                                */}
                            </WallpaperLink>
                        </li>
                        <li className={styles.auto}>
                            <CopilotPanelChangeFont />
                        </li>
                        <li className={styles.auto}>
                            <CopilotPanelRotateColors />
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
                        <li className={styles.feedback}>
                            <a href="#feedback">Feedback</a>
                        </li>
                        <li>
                            <a href="mailto:me@pavolhejny.com">Contact</a>
                        </li>

                        {/*
                        TODO: !! The menu should be like this: 

                        - [x] Show as visitor
                        - [~] Share
                        - [x] Get the web
                        - [x] Edit
                        - [ ] - advanced prompting
                        - [ ] - colors
                        - [ ] - content
                        - [~] Support

                        + [🧠] How to do all of this in gallery scenario?


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
 * TODO: [🌂] DRY <CopilotPanel/> and <CopilotInput/> (also css)
 * TODO: !! CopilotPanel: Fully line design
 * TODO: !! CopilotPanel: Show errors
 * TODO: !! CopilotPanel: Log errors into Sentry
 * TODO: [🧠] In future queue the prompts and have deamon for it
 * TODO: !! Add more options like Close (OWNER_AS_VISITOR), Share (VISITOR), Edit colors, Get the web, How it works?, Pricing, Gallery, Back
 *       ( ⏣ | Write prompt | Apply | More | Close )
 */
