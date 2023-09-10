import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';
import spaceTrim from 'spacetrim';
import type {
    UpdateWallpaperContentRequest,
    UpdateWallpaperContentResponse,
} from '../../pages/api/update-wallpaper-content';
import { classNames } from '../../utils/classNames';
import { focusRef } from '../../utils/focusRef';
import { useCurrentWallpaperId } from '../../utils/hooks/useCurrentWallpaperId';
import { useWallpaperSubject } from '../../utils/hooks/useWallpaperSubject';
import { Hint } from '../Hint/Hint';
import { WallpaperLink } from '../WallpaperLink/WallpaperLink';
import styles from './CopilotPanel.module.css';

/**
 * Renders the co-pilot panel for text commands to edit the page.
 */
export function CopilotPanel() {
    const wallpaperId = useCurrentWallpaperId();
    const wallpaperSubject = useWallpaperSubject(wallpaperId);
    const [isRunning, setRunning] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false); /* <- TODO: useToggle */
    const inputRef = useRef<HTMLInputElement | null>(null);

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

            const { content } = wallpaperSubject.value;

            const response = await fetch('/api/update-wallpaper-content', {
                method: 'POST',
                body: JSON.stringify({ prompt, wallpaper: { content } } satisfies UpdateWallpaperContentRequest),
                signal: AbortSignal.timeout(60000 /* <- TODO: Maybe in sync with vercel.json */),
            });

            if (response.ok === false) {
                // TODO: [🈵] If 4XX error, show also the message from json body
                throw new Error(`Prompt failed with status ${response.status}`);
            }

            const { updatedWallpaper } = (await response.json()) as UpdateWallpaperContentResponse;

            wallpaperSubject.next({
                ...wallpaperSubject.value,
                saveStage: 'EDITED',
                content: updatedWallpaper.content,
            });

            inputRef.current!.value = '';
        } finally {
            setRunning(false);
        }
    }, [wallpaperSubject, isRunning, inputRef]);

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
                    placeholder={'Describe the change> Add email contact pavol@hejny.org'}
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
                            width={35}
                            height={35} /* <-[🧥] */
                        />
                    </button>
                </Hint>

                <div
                    className={classNames(styles.Button, styles.MenuBar /* <- !!! ACRY MenuBar -> MenuTofuburger */)}
                    onClick={() => setMenuOpen(!isMenuOpen)}
                >
                    {/**
                     * Note: Not using AI Components in this menu !!!!
                     * Note: It is intended to have two divs embedded in each other one useing setMenuOpen and inner one using isMenuOpen
                     */}

                    <div className={classNames(styles.MenuBarInner, isMenuOpen && styles.open)}>
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
                        <li className={styles.featured}>sss</li>

                        {/*
                        TODO:
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
