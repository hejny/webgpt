import { PromptTemplatePipelineLibrary } from '@promptbook/core';
import updateWebsiteContentCs from '../../../promptbook/update-website-content-cs.ptbk.md';
import updateWebsiteContent from '../../../promptbook/update-website-content.ptbk.md';
import writeWebsiteContentCs from '../../../promptbook/write-website-content-cs.ptbk.md';
import writeWebsiteContent from '../../../promptbook/write-website-content.ptbk.md';

/**
 * This is The main library of prompt template pipelines for WebGPT app
 *
 * @singleton
 */
export const webgptPtpLibrary = PromptTemplatePipelineLibrary.fromSources({
    writeWebsiteContentCs,
    writeWebsiteContent,
    updateWebsiteContent,
    updateWebsiteContentCs,
});

/*
TODO: [👧]

interface ptbkLibrary_writeWebsiteContent_InputParams {
    readonly title: string;
    readonly assignment: string;
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
