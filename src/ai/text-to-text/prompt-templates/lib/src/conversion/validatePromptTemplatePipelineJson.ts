import { PromptTemplatePipelineJson } from '../types/PromptTemplatePipelineJson';

/**
 * Validates PromptTemplatePipelineJson if it is logically valid.
 *
 * It checks:
 * -   if it has correct parameters dependency
 *
 * It does NOT check:
 * -   if it is valid json
 * -   if it is meaningful
 *
 * @param ptp valid or invalid PromptTemplatePipelineJson
 * @throws {Error} if invalid
 */
export function validatePromptTemplatePipelineJson(ptp: PromptTemplatePipelineJson): void {
    if (typeof ptp !== 'object') {
        throw new Error(`Prompt template pipeline must be an object`);
    }
    if (Array.isArray(ptp)) {
        throw new Error(`Prompt template pipeline must have promptTemplates property`);
    }
}

/**
 * TODO: Use here some json-schema, Zod or something similar and change it to:
 *     > /**
 *     >  * Validates PromptTemplatePipelineJson if it is logically valid.
 *     >  *
 *     >  * It checks:
 *     >  * -   it has a valid structure
 *     >  * -   ...
 *     >  export function validatePromptTemplatePipelineJson(ptp: unknown): asserts ptp is PromptTemplatePipelineJson {
 */
