import { NaturalExecutionTools } from '@promptbook/types';
import { useCallback, useRef } from 'react';
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
     * Optional CSS class name which will be added to root element
     */
    className?: string_css_class;
}

/**
 * Renders a @@
 */
export function CompletionTextarea(props: CompletionTextareaProps) {
    const { children, onChange, naturalExecutionTools, className } = props;

    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const gptComplete = useCallback(async () => {
        if (textAreaRef.current === null) {
            throw new Error('textAreaRef.current must be defined before calling gptComplete');
        }

        const prompt = {
            content: textAreaRef.current.value,
            modelRequirements: {
                variant: 'COMPLETION',
            },
            ptbkUrl: 'https://ai-sovicka.webgpt.cz/',
            parameters: {},
        } as const;

        const response = await naturalExecutionTools.gptComplete(prompt);

        console.log({ response });

        if (onChange) {
            onChange(response.content, 'COPILOT');
        }

        textAreaRef.current.value = prompt.content + response.content;
    }, [textAreaRef, onChange, naturalExecutionTools]);

    return (
        <>
            <textarea
                ref={textAreaRef}
                className={classNames(className, styles.CompletionTextarea)}
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
            <button onClick={gptComplete}>Write</button>
        </>
    );
}

/**
 * TODO: [🧠] Should be the props readonly (for all react components)?
 */
