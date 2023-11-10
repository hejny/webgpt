import MonacoEditor from '@monaco-editor/react';
import { createPtpExecutor, PromptTemplatePipeline } from '@promptbook/core';
import type { TaskProgress } from '@promptbook/types';
import { PromptTemplatePipelineString } from '@promptbook/types';
import { normalizeToKebabCase } from 'n12';
import { useCallback, useState } from 'react';
import spaceTrim from 'spacetrim';
import enhanceTextCs from '../../../promptbook/other/enhance-text-cs.ptbk.md';
import promptcookSample from '../../../promptbook/other/promptcook-sample.ptbk.md';
import { getExecutionTools } from '../../ai/prompt-templates/getExecutionTools';
import { TasksInProgress } from '../../components/TaskInProgress/TasksInProgress';
import { induceFileDownload } from '../../export/utils/induceFileDownload';
import { classNames } from '../../utils/classNames';
import { useJsonStateInLocalstorage } from '../../utils/hooks/useJsonStateInLocalstorage';
import { useStateInLocalstorage } from '../../utils/hooks/useStateInLocalstorage';
import { provideClientId } from '../../utils/supabase/provideClientId';
import { string_name } from '../../utils/typeAliases';
import { CodeEditor } from '../CodeEditor/CodeEditor';
import { Select } from '../Select/Select';
import styles from './PromptCook.module.css';

/**
 * Renders a prompt cook - testing ground for prompt book
 */
export function PromptCook() {
    const [currentFileName, setCurrentFileName] = useStateInLocalstorage(
        'promptcook-currentFileName',
        'enhance-text.cs.ptbk' as string_name,
    );

    const [files, setFiles] = useJsonStateInLocalstorage<
        Array<{
            name: string_name;
            ptbkSource: PromptTemplatePipelineString;
            inputParams: /* Parameters & */ { inputText: string };
            outputParams?: /*Parameters & */ { outputText: string };
        }>
    >('promptcook-files', [
        {
            name: 'enhance-text.cs.ptbk',
            ptbkSource: enhanceTextCs,
            inputParams: {
                inputText: 'hello',
            },
            outputParams: {
                outputText: 'Hello',
            },
        },
    ]);

    const currentFile = files.find((file) => file.name === currentFileName);

    if (!currentFile) {
        setCurrentFileName(files[0]?.name!);
        throw new Error(
            spaceTrim(`
                File ${currentFileName} not found

                - Refresh the page
            
            `),
        );
    }

    const [isRunning, setRunning] = useState(false);
    const [tasksProgress, setTasksProgress] = useState<Array<TaskProgress>>(
        [],
    ); /* <- TODO: [🌄] useTasksProgress + DRY */
    const executePtbk = useCallback(
        async () => {
            setRunning(true);
            const executor = createPtpExecutor({
                ptp: PromptTemplatePipeline.fromSource(currentFile.ptbkSource),
                tools: getExecutionTools(
                    await provideClientId({
                        isVerifiedEmailRequired: true,
                    }),
                ),
            });

            const result = await executor(
                {
                    inputText: currentFile.inputParams.inputText,
                },
                (newTaskProgress: TaskProgress) => {
                    console.info('☑', newTaskProgress);
                    // TODO: !!
                    // setTasksProgress((tasksProgress) => joinTasksProgress(...tasksProgress, newTaskProgress));
                },
            );

            console.info('☑', { result });
            const { outputText } = result;

            // TODO: DRY [0]
            currentFile.outputParams = { outputText: outputText || '' };
            setFiles(files.map((file) => (file.name === currentFileName ? currentFile : file)));
            setRunning(false);
            setPanel('OUTPUT');
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [currentFile.ptbkSource, currentFile.inputParams.inputText],
    );

    const [panel, setPanel] = useState<'INPUT' | 'OUTPUT' | 'PROMPTBOOK'>('INPUT');

    return (
        <>
            <div className={styles.PromptCook}>
                <div className={styles.menu}>
                    <input
                        type="text"
                        value={currentFile.name}
                        onChange={(event) => {
                            const name = event.target.value;

                            // TODO: DRY [0]
                            currentFile.name = name;
                            setFiles(files.map((file) => (file.name === currentFileName ? currentFile : file)));
                            setCurrentFileName(name);
                        }}
                    />
                    <Select
                        value={currentFileName}
                        options={Object.fromEntries([...files.map((file) => [file.name, file.name]), ['__NEW__', '+']])}
                        visibleButtons={Infinity}
                        onChange={(value) => {
                            if (value === '__NEW__') {
                                const newFileName = prompt('New file name', 'new-file.cs.ptbk');

                                if (!newFileName) {
                                    return;
                                }

                                if (files.some((file) => file.name === newFileName)) {
                                    alert(`File ${newFileName} already exists`);
                                    return;
                                }

                                setFiles([
                                    ...files,
                                    {
                                        name: newFileName,
                                        ptbkSource: promptcookSample,
                                        inputParams: {
                                            inputText: '',
                                        },
                                    },
                                ]);
                                setCurrentFileName(newFileName);
                            } else {
                                setCurrentFileName(value);
                            }
                        }}
                    />
                </div>

                <div className={styles.panelSwitcher}>
                    <Select
                        value={panel as any}
                        options={
                            {
                                INPUT: 'Input',
                                OUTPUT: 'Output',
                                PROMPTBOOK: 'Promptbook',
                            } as const
                        }
                        visibleButtons={Infinity}
                        onChange={setPanel}
                    />
                </div>

                <div className={classNames(styles.input, panel === 'INPUT' && styles.isFocused)}>
                    <CodeEditor
                        // TODO: !! Here experimenting with mobile friendly options
                        //          Then ACRY use <CodeEditor/> not <MonacoEditor/>
                        key={currentFile.name}
                        className={classNames(styles.fill, styles.textarea)}
                        defaultValue={currentFile.inputParams.inputText}
                        onChange={(newContent) => {
                            // TODO: DRY [0]
                            currentFile.inputParams.inputText = newContent;
                            setFiles(files.map((file) => (file.name === currentFileName ? currentFile : file)));
                        }}
                    />
                </div>

                <div className={styles.controls}>
                    <button className={styles.button} onClick={executePtbk}>
                        🚀 Run
                    </button>
                    <button
                        className={styles.button}
                        onClick={() => {
                            navigator.clipboard.writeText(currentFile.outputParams?.outputText || '');
                        }}
                    >
                        Copy output
                    </button>
                    <button
                        className={styles.button}
                        onClick={async () => {
                            let filename = currentFile.name;
                            filename = filename.replace(/\.ptbk(\.md)?$/, '');
                            filename = normalizeToKebabCase(filename);

                            filename = filename + '.ptbk.md';

                            const ptbkFile = new File([currentFile.ptbkSource], filename, {
                                type: 'text/markdown',
                            });
                            await induceFileDownload(ptbkFile);
                        }}
                    >
                        Download .ptbk file
                    </button>
                </div>

                <div className={classNames(styles.output, panel === 'OUTPUT' && styles.isFocused)}>
                    <MonacoEditor
                        key={currentFile.name}
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
                            contextmenu: true,
                            //           <- Note: [📳] Context menu needs to be on to allow copy/paste on touch devices
                            lineNumbers: 'off',
                            minimap: { enabled: false },
                        }}
                        value={currentFile.outputParams?.outputText || ''}
                    />
                </div>

                <div className={classNames(styles.promptbook, panel === 'PROMPTBOOK' && styles.isFocused)}>
                    <MonacoEditor
                        key={currentFile.name}
                        className={styles.fill}
                        theme="vs-dark"
                        language={'markdown'}
                        options={{
                            wordWrap: 'on',
                            contextmenu: true,
                            //           <- Note: [📳] Context menu needs to be on to allow copy/paste on touch devices
                        }}
                        defaultValue={currentFile.ptbkSource}
                        onChange={(newContent) => {
                            if (typeof newContent !== 'string') {
                                return;
                            }

                            // TODO: DRY [0]
                            currentFile.ptbkSource = newContent as PromptTemplatePipelineString; // <- TODO: !! Validate the source
                            setFiles(files.map((file) => (file.name === currentFileName ? currentFile : file)));
                        }}
                    />
                </div>
            </div>
            {isRunning && <TasksInProgress {...{ tasksProgress }} />}
        </>
    );
}

/**
 * TODO: !! Mobile layout
 * TODO: Allow to drop file(s)
 * TODO: Allow to edit real files
 * TODO: Integrate with cloud storages
 * TODO: Allow to edit files in the cloud
 * TODO: Allow to edit files in the cloud in real time
 * TODO: Allow to edit files in the cloud in real time with other people
 * TODO: Allow to edit files in the cloud in real time on Collboard
 * TODO: Make nicer UI
 * TODO: Make nicer loading
 * TODO: Show task progress
 * TODO: Custom / WebGPT apiKey
 * TODO: API key management
 * TODO: Make a separate repository for promptcook
 * TODO: Make a electron app for promptcook
 * TODO: Resizable panels
 * TODO: [🧠] Should be the props readonly (for all react components)?
 */
