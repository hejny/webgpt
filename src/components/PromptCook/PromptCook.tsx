import { createPtpExecutor, PromptTemplatePipeline } from '@promptbook/core';
import { TaskProgress } from '@promptbook/types';
import { useCallback, useRef, useState } from 'react';
import enhanceTextCs from '../../../promptbook/other/enhance-text.cs.ptbk.md';
import { getExecutionTools } from '../../ai/prompt-templates/getExecutionTools';
import { TasksInProgress } from '../../components/TaskInProgress/TasksInProgress';
import { provideClientId } from '../../utils/supabase/provideClientId';
import styles from './PromptCook.module.css';

/**
 * Renders a prompt cook - testing ground for prompt book
 */
export function PromptCook() {
    const inputTextareaRef = useRef<HTMLTextAreaElement>(null);
    const [isRunning, setRunning] = useState(false);
    const [outputText, setOutputText] = useState<null | string>(null);
    const [tasksProgress, setTasksProgress] = useState<Array<TaskProgress>>(
        [],
    ); /* <- TODO: [🌄] useTasksProgress + DRY */
    const enhanceTextHandler = useCallback(async () => {
        setRunning(true);
        const executor = createPtpExecutor({
            ptp: PromptTemplatePipeline.fromSource(enhanceTextCs),
            tools: getExecutionTools(
                await provideClientId({
                    isVerifiedEmailRequired: true,
                }),
            ),
        });

        const inputText = inputTextareaRef.current?.value || '';
        const result = await executor({ inputText }, (newTaskProgress: TaskProgress) => {
            console.info('☑', newTaskProgress);
            // TODO: !!
            // setTasksProgress((tasksProgress) => joinTasksProgress(...tasksProgress, newTaskProgress));
        });

        console.info('☑', { result });
        const { outputText } = result;

        setOutputText(outputText || null);
        setRunning(false);
    }, [inputTextareaRef]);
    const copyOutputHandler = useCallback( () => {
        navigator.clipboard.writeText(outputText || '');
    },[outputText]);

    return (
        <>
            <div className={styles.PromptCook}>
                <textarea className={styles.input} ref={inputTextareaRef}>
                    Hello
                </textarea>
                <button className={styles.execute} onClick={enhanceTextHandler}>
                    Enhance
                </button>
                <div className={styles.output}>{outputText}</div>
                <button className={styles.copy} onClick={copyOutputHandler}>
                    Copy
                </button>
            </div>
            {isRunning && <TasksInProgress {...{ tasksProgress }} />}
        </>
    );
}

/**
 * TODO: [🧠] Should be the props readonly (for all react components)?
 */
