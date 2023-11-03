import { NaturalExecutionTools } from '@promptbook/types';
import { useCallback, useRef, useState } from 'react';
import { classNames } from '../../utils/classNames';
import { string_css_class } from '../../utils/typeAliases';
import styles from './CompletionTextarea.module.css';

interface CompletionTextareaProps {
    /**
     * Default value of the textarea
     */
    children?: string;

    /**
     * Callback function which will be called when the content of the textarea changes
     */
    onChange?: (content: string, changeType: 'USER' | 'COPILOT') => void;

    /**
     * Tools for executing GPT completions
     */
    naturalExecutionTools: NaturalExecutionTools;

    /**
     * Optional CSS class name which will be added to <textarea/> element (which is NOT the root element)
     */
    className?: string_css_class;
}

/**
 * Renders a @@
 *
 * Note: This is aviable ONLY in client-side rendering (CSR)
 */
export function CompletionTextarea(props: CompletionTextareaProps) {
    const { children, onChange, naturalExecutionTools, className } = props;

    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [isWorking, setWorking] = useState(false);
    const gptComplete = useCallback(
        async (maxTokens: number) => {
            if (isWorking) {
                return;
            }

            if (textAreaRef.current === null) {
                throw new Error('textAreaRef.current must be defined before calling gptComplete');
            }

            const prompt = {
                content: textAreaRef.current.value,
                modelRequirements: {
                    variant: 'COMPLETION',
                    maxTokens,
                },
                ptbkUrl: 'https://ai-sovicka.webgpt.cz/',
                parameters: {},
            } as const;

            setWorking(true);
            const response = await naturalExecutionTools.gptComplete(prompt);

            console.log({ response });

            const responseContentParts = response.content.split(' ');
            responseContentParts.pop();
            const responseContent = responseContentParts.join(' ');

            textAreaRef.current.value = prompt.content + responseContent;

            if (onChange) {
                onChange(textAreaRef.current.value, 'COPILOT');
            }

            setWorking(false);

            if (textAreaRef.current === null) {
                throw new Error('textAreaRef.current is null but fired onChange event');
            }
        },
        [isWorking, textAreaRef, onChange, naturalExecutionTools],
    );

    /*
    useEffect(() => {
        window.onbeforeunload = () => {
            // TODO: !! Allow to save and then leave
            return 'You have unsaved changes. Are you sure you want to leave?';
        };

        return () => {
            window.onbeforeunload = null;
        };
    }, []);
    */

    return (
        <div className={styles.CompletionTextarea}>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Kelly+Slab&display=swap');`}</style>
            <textarea
                ref={textAreaRef}
                className={classNames(className, styles.textarea)}
                onChange={() => {
                    if (textAreaRef.current === null) {
                        throw new Error('textAreaRef.current is null but fired onChange event');
                    }

                    if (onChange) {
                        onChange(textAreaRef.current.value, 'USER');
                    }
                }}
            >
                {children}
            </textarea>

            <nav className={classNames(styles.controls, isWorking && styles.isWorking)}>
                <button onClick={() => gptComplete(10)}>🦉</button>
                <button onClick={() => gptComplete(100)}>🐌</button>
            </nav>
        </div>
    );
}

/**
 * TODO: [🧠] Should be the props readonly (for all react components)?
 */
