import spaceTrim from 'spacetrim';
import { removeContentComments } from '../../../../../utils/content/removeContentComments';
import { PromptTemplatePipelineJson } from './PromptTemplatePipelineJson';

export function parsePromptTemplatePipelineString(promptTemplatePipelineContent: string): PromptTemplatePipelineJson {
    const promptTemplates: PromptTemplatePipelineJson['promptTemplates'] = [];

    for (let templateContent of promptTemplatePipelineContent.split(/^(---)+$/gm)) {
        templateContent = removeContentComments(templateContent);
        templateContent = spaceTrim(templateContent);

        const lines = templateContent.split('\n');

        if (!(lines.length >= 2)) {
            throw new Error(
                'Invalid template - each section must have at least 2 lines (template and resulting variable name)',
            );
        }

        const lastLine = lines.pop()!;

        const match = /^->\s*{(?<resultingParamName>[a-z0-9_])}\s*/i.exec(lastLine);

        if (!match || match.groups === undefined || match.groups.resultingParamName === undefined) {
            throw new Error('Invalid template - each section must end with "-> {...}"');
        }

        const resultingParamName = match.groups.resultingParamName;

        promptTemplates.push({
            promptTemplateContent: lines.join('\n'),
            resultingParamName,
        });
    }

    return { promptTemplates };
}
