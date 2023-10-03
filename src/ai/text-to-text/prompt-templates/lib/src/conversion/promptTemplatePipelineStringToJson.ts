import spaceTrim from 'spacetrim';
import { removeContentComments } from '../../../../../../utils/content/removeContentComments';
import { PromptTemplatePipelineJson } from '../types/PromptTemplatePipelineJson';
import { PromptTemplatePipelineString } from '../types/PromptTemplatePipelineString';

/**
 * Converts prompt template pipeline from string format to JSON format
 */
export function promptTemplatePipelineStringToJson(
    promptTemplatePipelineString: PromptTemplatePipelineString,
): PromptTemplatePipelineJson {
    const promptTemplates: PromptTemplatePipelineJson['promptTemplates'] = [];

    promptTemplatePipelineString = removeContentComments(promptTemplatePipelineString);

    for (let templateContent of promptTemplatePipelineString.split(/^\-{3,}?\s*$/gm)) {
        templateContent = spaceTrim(templateContent);
        const lines = templateContent.split('\n');

        // TODO: [🚲] !!! Parse newest format
        // TODO: [🚲] !!! Parse Model requirements

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
                //             <- TODO: [🚲] !!! Unhardcode
            },
            promptTemplate: spaceTrim(lines.join('\n')),
            resultingParamName,
        });
    }

    return { promptTemplates };
}

/**
 * TODO: Report here line/column of error
 * TODO: Use spaceTrim more effectively
 */
