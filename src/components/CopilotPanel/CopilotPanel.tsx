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
import styles from './CopilotPanel.module.css';

/**
 * Renders the co-pilot panel for text commands to edit the page.
 */
export function CopilotPanel() {
    const wallpaperId = useCurrentWallpaperId();
    const wallpaperSubject = useWallpaperSubject(wallpaperId);
    const [isRunning, setRunning] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handlePrompt = useCallback(async () => {
        if (isRunning) {
            return;
        }

        setRunning(true);
        let prompt = inputRef.current?.value || '';

        // TODO: [🍛] Make same normalization as in the backend
        prompt = spaceTrim(prompt);

        if (!prompt) {
            alert('Please enter a command');
            setRunning(false);
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

        wallpaperSubject.next({ ...wallpaperSubject.value, saveStage: 'EDITED', content: updatedWallpaper.content });

        inputRef.current!.value = '';
        setRunning(false);
    }, [wallpaperSubject, isRunning, inputRef]);

    return (
        <div
            // Note: It is intended to have two divs embedded in each other
            className={classNames('aiai-controls', styles.CopilotPanel)}
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
            <button
                disabled={isRunning}
                onClick={() => {
                    handlePrompt();
                }}
            >
                Apply
            </button>
        </div>
    );
}

/**
 * TODO: !! Add more options like Close (OWNER_AS_VISITOR), Share (VISITOR), Edit colors, Get the web, How it works?, Pricing, Gallery, Back
 *       ( ⏣ | Write prompt | Apply | More | Close )
 */
