import { CommonExecutionToolsOptions, string_token } from '@promptbook/types';

/**
 * Options for Dalle image generator by OpenAI
 */
export interface DalleImageGeneratorOptions extends CommonExecutionToolsOptions {
    /**
     * OpenAI API key
     */
    openAiApiKey: string_token;

    /**
     * A unique identifier representing your end-user, which can help OpenAI to monitor
     * and detect abuse. [Learn more](/docs/guides/safety-best-practices/end-user-ids).
     */
    user?: string_token;
}

