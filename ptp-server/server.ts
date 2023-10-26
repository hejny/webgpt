import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

import { createRemoteServer, OpenAiExecutionTools, PromptTemplatePipelineLibrary } from '@gptp/core';
import { IS_DEVELOPMENT, OPENAI_API_KEY } from '../config';
import { SupabaseLoggerWrapperOfNaturalExecutionTools } from '../src/ai/prompt-templates/logger/SupabaseLoggerWrapperOfNaturalExecutionTools';
// [🎛] import { ptpLibrary } from '../src/ai/text-to-text/prompt-templates/ptpLibrary';

const naturalExecutionTools = new OpenAiExecutionTools({
    isVerbose: IS_DEVELOPMENT /* <- Note: [3] */,
    openAiApiKey: OPENAI_API_KEY!,
});

createRemoteServer({
    isVerbose: false /* <- Note: [3] We want server to be silent and OpenAiExecutionTools to be verbose */,
    port: 4445 /* <- TODO: Unhardcode (all ports) */,

    ptpLibrary: PromptTemplatePipelineLibrary.fromSources({
        /* <- TODO: [🎛] Use here real webgptPtpLibrary */
    }),

    createNaturalExecutionTools(clientId) {
        return new SupabaseLoggerWrapperOfNaturalExecutionTools({
            isVerbose: false /* <- Note: [3] */,
            naturalExecutionTools,
            clientId,
        });
    },
});

/**
 * TODO: !!! Put this as a sample for @ptp/remote
 * TODO: [🃏] Pass here some security token to prevent DDoS
 */
