import { parsePtpString } from './parsePtpString';
import { PromptTemplatePipeline } from './PromptTemplatePipeline';

export function createPtpFromString(ptpContent: string): PromptTemplatePipeline {
    const source = parsePtpString(ptpContent);
    return PromptTemplatePipeline.createFromJson(source);
}
