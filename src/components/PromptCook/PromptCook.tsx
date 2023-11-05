import MonacoEditor from '@monaco-editor/react';
import { createPtpExecutor, PromptTemplatePipeline } from '@promptbook/core';
import { TaskProgress } from '@promptbook/types';
import { useCallback, useRef, useState } from 'react';
import enhanceTextCs from '../../../promptbook/other/enhance-text.cs.ptbk.md';
import { getExecutionTools } from '../../ai/prompt-templates/getExecutionTools';
import { TasksInProgress } from '../../components/TaskInProgress/TasksInProgress';
import { classNames } from '../../utils/classNames';
import { provideClientId } from '../../utils/supabase/provideClientId';
import styles from './PromptCook.module.css';

/**
 * Renders a prompt cook - testing ground for prompt book
 */
export function PromptCook() {
    const inputTextareaRef = useRef<HTMLTextAreaElement>(null);
    const [isRunning, setRunning] = useState(false);
    const [ptbkSource, setPtbkSource] = useState(enhanceTextCs);
    const [outputText, setOutputText] = useState<null | string>(null);
    const [tasksProgress, setTasksProgress] = useState<Array<TaskProgress>>(
        [],
    ); /* <- TODO: [🌄] useTasksProgress + DRY */
    const enhanceTextHandler = useCallback(async () => {
        setRunning(true);
        const executor = createPtpExecutor({
            ptp: PromptTemplatePipeline.fromSource(ptbkSource),
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
    }, [ptbkSource, inputTextareaRef]);
    const copyOutputHandler = useCallback(() => {
        navigator.clipboard.writeText(outputText || '');
    }, [outputText]);

    return (
        <>
            <div className={styles.PromptCook}>
                <div className={styles.input}>
                    <textarea className={classNames(styles.fill, styles.textarea)} ref={inputTextareaRef}>
                        ahoj jak se máš
                    </textarea>
                </div>

                <div className={styles.controls}>
                    <button className={styles.button} onClick={enhanceTextHandler}>
                        🚀 Run
                    </button>
                    <button className={styles.button} onClick={copyOutputHandler}>
                        Copy output
                    </button>
                </div>

                <div className={styles.output}>
                    <pre className={classNames(styles.fill, styles.textarea)}>{outputText}</pre>
                </div>

                <div className={styles.promptbook}>
                    <MonacoEditor
                        className={styles.fill}
                        theme="vs-dark"
                        language={'markdown'}
                        options={{
                            wordWrap: 'on',
                        }}
                        defaultValue={enhanceTextCs}
                        onChange={(newContent) => {
                            if (typeof newContent !== 'string') {
                                return;
                            }

                            setPtbkSource(newContent);
                        }}
                    />
                </div>
            </div>
            {isRunning && <TasksInProgress {...{ tasksProgress }} />}
        </>
    );
}

/**
 * TODO: [🧠] Should be the props readonly (for all react components)?
 */
