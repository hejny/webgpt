import writeWebsiteContentExecutorPtp from '../../../../prompts/templates/write-website-content.cs.ptp.md';
import { PromptTemplatePipeline } from './lib/src/classes/PromptTemplatePipeline';
import { PromptTemplatePipelineLibrary } from './lib/src/classes/PromptTemplatePipelineLibrary';
import { promptTemplatePipelineStringToJson } from './lib/src/conversion/promptTemplatePipelineStringToJson';

/**
 * This is The main library of prompt template pipelines for 1-2i app
 *
 * @singleton
 */
export const ptpLibrary = new PromptTemplatePipelineLibrary({
    // TODO: PromptTemplatePipelineLibrary.fromStrings

    writeWebsiteContent: PromptTemplatePipeline.fromJson(
        promptTemplatePipelineStringToJson(writeWebsiteContentExecutorPtp),
    ),
});

export interface ptpLibrary_writeWebsiteContent_EntryParams {
    assigment: string;
}

export interface ptpLibrary_writeWebsiteContent_ResultParams {
    contentBody: string;
}

/**
 * TODO: [🧠] !!! This it should be code generatror WITH types
 */
