import writeWebsiteContentExecutorPtp from '../../../../prompts/templates/write-website-content.cs.ptp.md';
import { PromptTemplatePipeline } from './lib/src/classes/PromptTemplatePipeline';
import { PromptTemplatePipelineLibrary } from './lib/src/classes/PromptTemplatePipelineLibrary';
import { promptTemplatePipelineStringToJson } from './lib/src/conversion/promptTemplatePipelineStringToJson';

/**
 * This is The main library of prompt template pipelines for WebGPT app
 *
 * @singleton
 */
export const ptpLibrary = new PromptTemplatePipelineLibrary({
    // TODO: PromptTemplatePipelineLibrary.fromStrings

    writeWebsiteContent: PromptTemplatePipeline.fromJson(
        promptTemplatePipelineStringToJson(writeWebsiteContentExecutorPtp),
    ),
});

export interface ptpLibrary_writeWebsiteContent_InputParams {
    readonly title: string;
    readonly assigment: string;
}

export interface ptpLibrary_writeWebsiteContent_OutputParams {
    readonly contentBody: string;
    readonly keywords: string;
    readonly enhancedTitle: string;
    readonly claim: string;
}

/**
 * TODO: [🧠] !! This it should be code-generated WITH types by @ptp/generator library
 */
