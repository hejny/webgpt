import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

import { OPENAI_API_KEY } from '../config';
import { PromptTemplatePipelineLibrary } from '../src/ai/text-to-text/prompt-templates/lib/src/classes/PromptTemplatePipelineLibrary';
import { OpenAiExecutionTools } from '../src/ai/text-to-text/prompt-templates/lib/src/execution/plugins/natural-execution-tools/openai/OpenAiExecutionTools';
import { createRemoteServer } from '../src/ai/text-to-text/prompt-templates/lib/src/execution/plugins/natural-execution-tools/remote/createRemoteServer';
// import { ptpLibrary } from '../src/ai/text-to-text/prompt-templates/ptpLibrary';

createRemoteServer({
    isVerbose: true,
    port: 4445 /* <- TODO: Unhardcode (all ports) */,
    ptpLibrary: new PromptTemplatePipelineLibrary({
        /* <- TODO: !!! Use here real PTP library */
    }),
    naturalExecutionTools: new OpenAiExecutionTools(OPENAI_API_KEY!),
});

/**
 * TODO: Put this as a sample for @ptp/remote
 * TODO: [🃏] Pass here some security token to prevent DDoS
 */
