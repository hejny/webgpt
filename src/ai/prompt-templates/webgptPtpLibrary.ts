import { PromptTemplatePipelineLibrary } from '@promptbook/core';
import updateWebsiteContent from '../../../../promptbooks/update-website-content.ptp.md';
import writeWebsiteContentCs from '../../../../promptbooks/write-website-content.cs.ptp.md';
import writeWebsiteContent from '../../../../promptbooks/write-website-content.ptp.md';

/**
 * This is The main library of prompt template pipelines for WebGPT app
 *
 * @singleton
 */
export const webgptPtpLibrary = PromptTemplatePipelineLibrary.fromSources({
    writeWebsiteContentCs,
    writeWebsiteContent,
    updateWebsiteContent,
});

/*
TODO: [👧]

interface ptpLibrary_writeWebsiteContent_InputParams {
    readonly title: string;
    readonly assigment: string;
}

interface ptpLibrary_writeWebsiteContent_OutputParams {
    readonly contentBody: string;
    readonly keywords: string;
    readonly enhancedTitle: string;
    readonly claim: string;
}

*/

/**
 * TODO: [🧠] !! This it should be code-generated WITH types by @ptp/generator library
 */
