import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';
import spaceTrim from 'spacetrim';
import { classNames } from '../../utils/classNames';
import { focusRef } from '../../utils/focusRef';
import { useRotatingPlaceholder } from '../../utils/hooks/useRotatingPlaceholder';
import { string_prompt } from '../../utils/typeAliases';
import { TorusInteractiveImage } from '../TaskInProgress/TorusInteractiveImage';
import styles from './CopilotInput.module.css';

interface useRouterProps {
    /**
     * Label for the input
     */
    label: string;

    /**
     * The html comment to export
     */
    onPrompt(prompt: string_prompt): Promise<void>;

    /**
     * The placeholders to rotate through when the input is empty
     */
    placeholders: Array<string>;
}

/**
 * Renders the co-pilot panel for text commands to edit the page.
 */
export function CopilotInput(props: useRouterProps) {
    const { label, onPrompt, placeholders } = props;
    const [isRunning, setRunning] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const placeholder = useRotatingPlaceholder(...placeholders);

    const handlePrompt = useCallback(async () => {
        if (isRunning) {
            console.error('Prompt is already running' /* <- TODO: Pass this textation as prop */);
            return;
        }

        let prompt = inputRef.current?.value || '';

        try {
            setRunning(true);

            // TODO: [🍛] Make same normalization as in the backend
            prompt = spaceTrim(prompt);

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

            await onPrompt(prompt);
        } finally {
            setRunning(false);
        }
    }, [inputRef, onPrompt, isRunning]);

    return (
        <div className={classNames('webgpt-controls', styles.CopilotInput)}>
            <label htmlFor="copilot-input">{label}</label>
            <div
                // Note: It is intended to have two divs embedded in each other
                className={styles.CopilotInputInner}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        handlePrompt();
                    }
                }}
            >
                <input
                    name="copilot-input"
                    type="text"
                    placeholder={placeholder}
                    ref={(element) => {
                        // TODO: [🍘] Use joinRefs
                        focusRef(element);
                        inputRef.current = element;
                    }}
                    disabled={isRunning}
                />

                <button
                    className={styles.Button}
                    disabled={isRunning}
                    title="Submit" // <- TODO: Pass this textation as prop
                    onClick={() => {
                        handlePrompt();
                    }}
                >
                    {!isRunning ? (
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
            </div>
        </div>
    );
}

/**
 * TODO: Name "copilot-input" should be generated and memoized
 * TODO: [🌂] DRY <CopilotPanel/> and <CopilotInput/> (also css)
 * TODO: [🧠] Maybe somehow integrate here <TasksInProgress/>
 */
