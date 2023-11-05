import MonacoEditor from '@monaco-editor/react';
import { createPtpExecutor, PromptTemplatePipeline } from '@promptbook/core';
import { TaskProgress } from '@promptbook/types';
import { useCallback, useState } from 'react';
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
    const [inputText, setInputText] = useState<string>('Ahoj, jak se máš?');
    const [isRunning, setRunning] = useState(false);
    const [ptbkSource, setPtbkSource] = useState(enhanceTextCs);
    const [outputText, setOutputText] = useState<null | string>(null);
    const [tasksProgress, setTasksProgress] = useState<Array<TaskProgress>>(
        [],
    ); /* <- TODO: [🌄] useTasksProgress + DRY */
    const executePtbk = useCallback(async () => {
        setRunning(true);
        const executor = createPtpExecutor({
            ptp: PromptTemplatePipeline.fromSource(ptbkSource),
            tools: getExecutionTools(
                await provideClientId({
                    isVerifiedEmailRequired: true,
                }),
            ),
        });

        const result = await executor({ inputText }, (newTaskProgress: TaskProgress) => {
            console.info('☑', newTaskProgress);
            // TODO: !!
            // setTasksProgress((tasksProgress) => joinTasksProgress(...tasksProgress, newTaskProgress));
        });

        console.info('☑', { result });
        const { outputText } = result;

        setOutputText(outputText || null);
        setRunning(false);
    }, [ptbkSource, inputText]);
    const copyOutputHandler = useCallback(() => {
        navigator.clipboard.writeText(outputText || '');
    }, [outputText]);

    return (
        <>
            <div className={styles.PromptCook}>
                <div className={styles.input}>
                    <MonacoEditor
                        className={classNames(styles.fill, styles.textarea)}
                        theme="vs-dark"
                        language={'markdown'}
                        options={{
                            wordWrap: 'on',
                            contextmenu: false,
                            lineNumbers: 'off',
                            minimap: { enabled: false },
                        }}
                        defaultValue={inputText}
                        onChange={(newContent) => {
                            if (typeof newContent !== 'string') {
                                return;
                            }

                            setInputText(newContent);
                        }}
                    />
                </div>

                <div className={styles.controls}>
                    <button className={styles.button} onClick={executePtbk}>
                        🚀 Run
                    </button>
                    <button className={styles.button} onClick={copyOutputHandler}>
                        Copy output
                    </button>
                </div>

                <div className={styles.output}>
                    <MonacoEditor
                        className={classNames(styles.fill, styles.textarea)}
                        theme="vs-dark"
                        language={'markdown'}
                        options={{
                            wordWrap: 'on',
                            readOnly: true,
                            readOnlyMessage: {
                                value: 'Output can not be edited.',
                                isTrusted: true,
                            },
                            contextmenu: false,
                            lineNumbers: 'off',
                            minimap: { enabled: false },
                        }}
                        value={outputText || ''}
                    />
                </div>

                <div className={styles.promptbook}>
                    <MonacoEditor
                        className={styles.fill}
                        theme="vs-dark"
                        language={'markdown'}
                        options={{
                            wordWrap: 'on',
                            contextmenu: false,
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
 * TODO: Make a separate repository for promptcook
 * TODO: Make a electron app for promptcook
 * TODO: Resizable panels
 * TODO: [🧠] Should be the props readonly (for all react components)?
 */
