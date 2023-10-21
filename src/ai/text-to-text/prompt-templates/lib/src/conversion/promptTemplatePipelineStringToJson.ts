import { normalizeTo_PascalCase } from 'n12';
import spaceTrim from 'spacetrim';
import { Writable } from 'type-fest';
import { removeContentComments } from '../../../../../../utils/content/removeContentComments';
import { DEFAULT_MODEL_REQUIREMENTS, PTP_VERSION } from '../config';
import { ParameterCommand } from '../types/Command';
import { ExecutionType } from '../types/ExecutionTypes';
import { ModelRequirements } from '../types/ModelRequirements';
import { PromptTemplatePipelineJson } from '../types/PromptTemplatePipelineJson/PromptTemplatePipelineJson';
import { PromptTemplatePipelineString } from '../types/PromptTemplatePipelineString';
import { ScriptLanguage, SUPPORTED_SCRIPT_LANGUAGES } from '../types/ScriptLanguage';
import { countMarkdownStructureDeepness } from '../utils/markdown-json/countMarkdownStructureDeepness';
import { markdownToMarkdownStructure } from '../utils/markdown-json/markdownToMarkdownStructure';
import { extractAllListItemsFromMarkdown } from '../utils/markdown/extractAllListItemsFromMarkdown';
import { extractOneBlockFromMarkdown } from '../utils/markdown/extractOneBlockFromMarkdown';
import { parseCommand } from './parseCommand';

/**
 * Parse prompt template pipeline from string format to JSON format
 *
 * Note: This function does not validate logic of the pipeline only the syntax
 */
export function promptTemplatePipelineStringToJson(
    promptTemplatePipelineString: PromptTemplatePipelineString,
): PromptTemplatePipelineJson {
    const ptpJson: PromptTemplatePipelineJson = { ptpVersion: PTP_VERSION, parameters: [], promptTemplates: [] };

    // =============================================================
    // Note: 1️⃣ Normalization of the PTP string
    promptTemplatePipelineString = removeContentComments(promptTemplatePipelineString);
    promptTemplatePipelineString = promptTemplatePipelineString.replaceAll(
        /`\{(?<paramName>[a-z0-9_]+)\}`/gi,
        '{$<paramName>}',
    ) as PromptTemplatePipelineString;
    promptTemplatePipelineString = promptTemplatePipelineString.replaceAll(
        /`->\s+\{(?<paramName>[a-z0-9_]+)\}`/gi,
        '-> {$<paramName>}',
    ) as PromptTemplatePipelineString;

    // =============================================================
    ///Note: 2️⃣ Function for adding parameters
    const addParam = (parameterCommand: ParameterCommand) => {
        const { parameterName, parameterDescription, isInputParameter } = parameterCommand;

        const existingParameter = ptpJson.parameters.find((parameter) => parameter.name === parameterName);
        if (
            existingParameter &&
            existingParameter.description &&
            existingParameter.description !== parameterDescription &&
            parameterDescription
        ) {
            throw new Error(
                spaceTrim(
                    (block) => `
                        Parameter {${parameterName}} is defined multiple times with different description.

                        First definition:
                        ${block(existingParameter.description || '[undefined]')}

                        Second definition:
                        ${block(parameterDescription || '[undefined]')}
                    `,
                ),
            );
        }

        if (existingParameter) {
            if (parameterDescription) {
                existingParameter.description = parameterDescription;
            }
        } else {
            ptpJson.parameters.push({
                name: parameterName,
                description: parameterDescription || undefined,
                isInput: isInputParameter,
            });
        }
    };

    // =============================================================
    // Note: 3️⃣ Parse the dynamic part - the template pipeline
    const markdownStructure = markdownToMarkdownStructure(promptTemplatePipelineString);
    const markdownStructureDeepness = countMarkdownStructureDeepness(markdownStructure);

    if (markdownStructureDeepness !== 2) {
        throw new Error(
            spaceTrim(`
                Invalid markdown structure.
                The markdown must have exactly 2 levels of headings (one top-level section and one section for each template).
                Now it has ${markdownStructureDeepness} levels of headings.
            `),
        );
    }

    const defaultModelRequirements: Writable<ModelRequirements> = { ...DEFAULT_MODEL_REQUIREMENTS };
    const listItems = extractAllListItemsFromMarkdown(markdownStructure.content);
    for (const listItem of listItems) {
        const command = parseCommand(listItem);

        switch (command.type) {
            case 'USE':
                defaultModelRequirements[command.key] = command.value;
                break;

            case 'PTP_VERSION':
                ptpJson.ptpVersion = command.ptpVersion;
                break;

            case 'PARAMETER':
                addParam(command);
                break;

            default:
                throw new Error(
                    `Command ${command.type} is not allowed in the head of the prompt template pipeline ONLY at the prompt template block`,
                );
        }
    }

    for (const section of markdownStructure.sections) {
        // TODO: Parse prompt template description (the content out of the codeblock and lists)

        const templateModelRequirements: Writable<ModelRequirements> = { ...defaultModelRequirements };
        const listItems = extractAllListItemsFromMarkdown(section.content);
        let executionType: ExecutionType = 'PROMPT_TEMPLATE';
        let isExecutionTypeChanged = false;

        for (const listItem of listItems) {
            const command = parseCommand(listItem);
            switch (command.type) {
                case 'EXECUTE':
                    if (isExecutionTypeChanged) {
                        throw new Error(
                            `Execution type is already defined in the prompt template. It can be defined only once.`,
                        );
                    }
                    executionType = command.executionType;
                    isExecutionTypeChanged = true;
                    break;

                case 'USE':
                    templateModelRequirements[command.key] = command.value;
                    break;

                case 'PARAMETER':
                    addParam(command);
                    break;

                default:
                    throw new Error(
                        `Command ${command.type} is not allowed in the block of the prompt template ONLY at the head of the prompt template pipeline`,
                    );
            }
        }

        const { language, content } = extractOneBlockFromMarkdown(section.content);

        if (executionType === 'SCRIPT') {
            if (!language) {
                throw new Error(`You must specify the language of the script in the prompt template`);
            } else if (!SUPPORTED_SCRIPT_LANGUAGES.includes(language as ScriptLanguage)) {
                throw new Error(
                    spaceTrim(
                        (block) => `
                            Script language ${language} is not supported.
                            
                            Supported languages are:
                            ${block(SUPPORTED_SCRIPT_LANGUAGES.join(', '))}
                            
                        `,
                    ),
                );
            }
        }

        const lastLine = section.content.split('\n').pop()!;
        const match = /^\-\>\s*\{(?<resultingParamName>[a-z0-9_]+)\}/im.exec(lastLine);
        if (!match || match.groups === undefined || match.groups.resultingParamName === undefined) {
            throw new Error(
                spaceTrim(
                    (block) => `
                        Invalid template - each section must end with "-> {...}"
                        
                        Invalid section:
                        ${block(
                            // TODO: Show code of invalid sections each time + DRY
                            section.content
                                .split('\n')
                                .map((line) => `> ${line}`)
                                .join('\n'),
                        )}
                        `,
                ),
            );
        }
        const resultingParameterName = match.groups.resultingParamName;

        let description: string | undefined = section.content;
        // Note: Remove codeblocks
        description = description.split(/^```.*^```/gms).join('');
        //Note: Remove lists and return statement
        description = description.split(/^(?:(?:-)|(?:\d\))|(?:`?->))\s+.*$/gm).join('');
        description = spaceTrim(description);
        if (description === '') {
            description = undefined;
        }

        ptpJson.promptTemplates.push({
            name: normalizeTo_PascalCase(section.title),
            title: section.title,
            description,
            executionType,
            modelRequirements: templateModelRequirements,
            contentLanguage: executionType === 'SCRIPT' ? (language as ScriptLanguage) : undefined,
            content,
            resultingParameterName,
        });
    }

    // =============================================================
    return ptpJson;
}

/**
 * TODO: Report here line/column of error
 * TODO: Use spaceTrim more effectively
 */
