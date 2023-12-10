import { promptTemplatePipelineStringToJson } from '@promptbook/core';
import type { PromptTemplatePipelineJson, PromptTemplatePipelineString } from '@promptbook/types';
import { useState } from 'react';
import writeWebsiteContentCs from '../../../promptbook/write-website-content-cs.ptbk.md';
import { classNames } from '../../utils/classNames';
import type { string_name } from '../../utils/typeAliases';
import { CodeEditor } from '../CodeEditor/CodeEditor';
import commonStyles from '../PromptCook/PromptCook.module.css';
import styles from './PromptbookCompiler.module.css';

interface IFileInStorage {
    name: string_name;
    ptbkSource: PromptTemplatePipelineString;
    inputParams: /* Parameters & */ { inputText: string };
    outputParams?: /*Parameters & */ { outputText: string };
}

/**
 * Renders a prompt cook - testing ground for prompt book
 */
export function PromptbookCompiler() {
    const [ptbkString, setPtbkString] = useState<PromptTemplatePipelineString>(writeWebsiteContentCs);
    const [ptbkJson, setPtbkJson] = useState<PromptTemplatePipelineJson>(
        promptTemplatePipelineStringToJson(
            writeWebsiteContentCs as PromptTemplatePipelineString,
        ) /* <- TODO: [0] DRY */,
    );

    return (
        <>
            <div className={styles.PromptbookCompiler}>
                <div className={styles.ptbkString}>
                    <CodeEditor
                        className={classNames(commonStyles.fill, commonStyles.textarea)}
                        defaultValue={ptbkString}
                        onChange={(newContent) => {
                            // TODO: DRY [0]

                            setPtbkString(newContent as PromptTemplatePipelineString);
                            setPtbkJson(
                                promptTemplatePipelineStringToJson(
                                    newContent as PromptTemplatePipelineString,
                                ) /* <- TODO: [0] DRY */,
                            );
                        }}
                    />
                </div>
                <div className={styles.ptbkJson}>
                    <CodeEditor
                        // !!! key={currentFile.name}
                        className={classNames(commonStyles.fill, commonStyles.textarea)}
                        isReadonly
                        value={JSON.stringify(ptbkJson, null, 4)}
                    />
                </div>
            </div>
        </>
    );
}

/**
 * TODO: Mobile layout
 * TODO: Allow to edit real files
 * TODO: Make a separate repository for PromptbookIDE
 * TODO: Make a electron app for PromptbookIDE
 * TODO: Resizable panels
 */
