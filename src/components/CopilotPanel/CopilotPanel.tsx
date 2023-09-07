import { useCallback, useRef, useState } from 'react';
import spaceTrim from 'spacetrim';
import { forTime } from 'waitasecond';
import { classNames } from '../../utils/classNames';
import { focusRef } from '../../utils/focusRef';
import styles from './CopilotPanel.module.css';

/**
 * Renders the co-pilot panel for text commands to edit the page.
 */
export function CopilotPanel() {
    const [isRunning, setRunning] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handlePrompt = useCallback(async () => {
        if (isRunning) {
            return;
        }

        setRunning(true);
        let prompt = inputRef.current?.value || '';
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

        await forTime(1000);

        inputRef.current!.value = '';
        setRunning(false);
    }, [isRunning, inputRef]);

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
 * TODO: !!! Finish
 */
