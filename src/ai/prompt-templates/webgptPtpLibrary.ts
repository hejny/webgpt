import { PromptTemplatePipelineLibrary } from '@promptbook/core';
import updateWebsiteContent from '../../../../promptbooks/update-website-content.ptbk.md';
import writeWebsiteContentCs from '../../../../promptbooks/write-website-content.cs.ptbk.md';
import writeWebsiteContent from '../../../../promptbooks/write-website-content.ptbk.md';

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

interface ptbkLibrary_writeWebsiteContent_InputParams {
    readonly title: string;
    readonly assigment: string;
}

interface ptbkLibrary_writeWebsiteContent_OutputParams {
    readonly contentBody: string;
    readonly keywords: string;
    readonly enhancedTitle: string;
    readonly claim: string;
}

*/

/**
 * TODO: [🧠] !! This it should be code-generated WITH types by @promptbook/generator library
 */
