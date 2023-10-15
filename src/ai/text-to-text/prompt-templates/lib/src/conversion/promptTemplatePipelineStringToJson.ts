import spaceTrim from 'spacetrim';
import { removeContentComments } from '../../../../../../utils/content/removeContentComments';
import { DEFAULT_MODEL_REQUIREMENTS, PTP_VERSION } from '../config';
import { ModelRequirements } from '../types/ModelRequirements';
import { PromptTemplatePipelineJson } from '../types/PromptTemplatePipelineJson';
import { PromptTemplatePipelineString } from '../types/PromptTemplatePipelineString';
import { countMarkdownStructureDeepness } from '../utils/markdown-json/countMarkdownStructureDeepness';
import { markdownToMarkdownStructure } from '../utils/markdown-json/markdownToMarkdownStructure';
import { extractAllListItemsFromMarkdown } from '../utils/markdown/extractAllListItemsFromMarkdown';
import { extractOneBlockFromMarkdown } from '../utils/markdown/extractOneBlockFromMarkdown';

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
    // Note: 2️⃣ Parse the static part - the parameters
    //console.log('!!! promptTemplatePipelineString', promptTemplatePipelineString);
    const parametersMatches = Array.from(
        promptTemplatePipelineString.matchAll(/\{(?<paramName>[a-z0-9_]+)\}[^\S\r\n]*(?<paramDescription>.*)$/gim) ||
            [],
    );
    //console.log('!!! parametersMatch', parametersMatches);
    //console.log('!!!  Array.from(parametersMatch).length', parametersMatches.length);
    if (parametersMatches.length === 0) {
        throw new Error('No parameters found');
    }
    for (const match of parametersMatches) {
        //console.log('!!! match', match);
        const name = match.groups!.paramName!;
        const description = spaceTrim(match.groups!.paramDescription || '') || undefined;
        //console.log('!!!', { name, description });
        const existingParameter = ptpJson.parameters.find((parameter) => parameter.name === name);
        if (existingParameter && existingParameter.description && existingParameter.description !== description) {
            throw new Error(
                spaceTrim(
                    (block) => `
                        Parameter {${name}} is defined multiple times with different description.

                        First definition:
                        ${block(existingParameter.description!)}

                        Second definition:
                        ${block(description!)}
                    `,
                ),
            );
        }

        if (existingParameter) {
            existingParameter.description = description;
        } else {
            ptpJson.parameters.push({ name, description });
        }
    }

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

    const defaultModelRequirements: ModelRequirements = { ...DEFAULT_MODEL_REQUIREMENTS };
    const listItems = extractAllListItemsFromMarkdown(markdownStructure.content);
    for (const listItem of listItems) {
        // TODO: !!! Parse description
        // TODO: !!! Parse version
        // TODO: !!! Parse defaultModelRequirements
    }

    for (const section of markdownStructure.sections) {
        const listItems = extractAllListItemsFromMarkdown(section.content);
        for (const listItem of listItems) {
            // TODO: !!! Parse description
            // TODO: !!! Parse defaultModelRequirements
        }

        const { language, content } = extractOneBlockFromMarkdown(section.content);

        ptpJson.promptTemplates.push({
            executionType: 'PROMPT_TEMPLATE' /* <- !!! Unhardcode */,
            modelRequirements: defaultModelRequirements /* <- !!! More specific */,
            /*  !!! Add language */
            promptTemplate: content,
            resultingParameterName: 'result' /* <- !!! Unhardcode */,
        });
    }

    // =============================================================
    return ptpJson;

    /*
    =============================================
    TODO: !!!last Remove the code below

    const promptTemplates: PromptTemplatePipelineJson['promptTemplates'] = [];


    
    promptTemplatePipelineString = removeContentComments(promptTemplatePipelineString);

    for (let templateContent of promptTemplatePipelineString.split(/^\-{3,}?\s*$/gm)) {
        templateContent = spaceTrim(templateContent);
        const lines = templateContent.split('\n');

        // TODO: [🚲] !! Parse newest format
        // TODO: [🚲] !! Parse Model requirements

        if (!(lines.length >= 2)) {
            throw new Error(
                spaceTrim(
                    (block) => `
                        Invalid template - each section must have at least 2 lines
                        (template + resulting variable name)
                        
                        Invalid section:
                        ${block(
                            templateContent
                                .split('\n')
                                .map((line) => `> ${line}`)
                                //               <- TODO: Put here line numbers from original promptTemplatePipelineString
                                .join('\n'),
                        )}


                        ${
                            templateContent.trim() !== ''
                                ? ''
                                : 'The section is completely empty (containing only white space and comments)'
                        }
                    `,
                ),
            );
        }

        const lastLine = lines.pop()!;

        const match = /^\-\>\s*\{(?<resultingParamName>[a-z0-9_]+)\}\s*$/im.exec(lastLine);

        if (!match || match.groups === undefined || match.groups.resultingParamName === undefined) {
            throw new Error(
                spaceTrim(
                    (block) => `
                        Invalid template - each section must end with "-> {...}"
                        
                        Invalid section:
                        ${block(
                            templateContent
                                .split('\n')
                                .map((line) => `> ${line}`)
                                //               <- TODO: Put here line numbers from original promptTemplatePipelineString
                                .join('\n'),
                        )}
                    `,
                ),
            );
        }

        const resultingParamName = match.groups.resultingParamName;

        promptTemplates.push({
            modelRequirements: {
                variant: 'CHAT',
                //             <- TODO: [🚲] !! Unhardcode
            },
            promptTemplate: spaceTrim(lines.join('\n')),
            resultingParamName,
        });
    }

    return { promptTemplates };
    */
}

/**
 * TODO: Report here line/column of error
 * TODO: Use spaceTrim more effectively
 */
