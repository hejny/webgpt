import { PromptTemplatePipelineJson } from './PromptTemplatePipelineJson';

export function parsePtpString(ptpContent: string): PromptTemplatePipelineJson {
    const source: PromptTemplatePipelineJson = { promptTemplates: [] };

    const templates = ptpContent.split(/^(---)+$/gm);

    return source;
}
