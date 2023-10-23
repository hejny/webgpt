import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

import { IS_DEVELOPMENT, OPENAI_API_KEY } from '../config';
import { PromptTemplatePipelineLibrary } from '../src/ai/text-to-text/prompt-templates/lib/src/classes/PromptTemplatePipelineLibrary';
import { OpenAiExecutionTools } from '../src/ai/text-to-text/prompt-templates/lib/src/execution/plugins/natural-execution-tools/openai/OpenAiExecutionTools';
import { createRemoteServer } from '../src/ai/text-to-text/prompt-templates/lib/src/execution/plugins/natural-execution-tools/remote/createRemoteServer';
// [🎛] import { ptpLibrary } from '../src/ai/text-to-text/prompt-templates/ptpLibrary';

createRemoteServer({
    isVerbose: false /* <- Note: We want server to be silent and OpenAiExecutionTools to be verbose */,
    port: 4445 /* <- TODO: Unhardcode (all ports) */,
    ptpLibrary: PromptTemplatePipelineLibrary.fromSources({
        /* <- TODO: [🎛] Use here real webgptPtpLibrary */
    }),
    naturalExecutionTools: new OpenAiExecutionTools({ isVerbose: IS_DEVELOPMENT, openAiApiKey: OPENAI_API_KEY! }),
});

/**
 * TODO: Put this as a sample for @ptp/remote
 * TODO: [🃏] Pass here some security token to prevent DDoS
 */
