import * as dotenv from 'dotenv';
import { OPENAI_API_KEY } from '../config';
import { OpenAiExecutionTools } from '../src/ai/text-to-text/prompt-templates/lib/src/execution/plugins/openai/OpenAiExecutionTools';

dotenv.config({ path: '.env' });

import { createRemoteServer } from '../src/ai/text-to-text/prompt-templates/lib/src/execution/plugins/remote/createRemoteServer';
import { ptpLibrary } from '../src/ai/text-to-text/prompt-templates/ptpLibrary';

createRemoteServer({
    isVerbose: true,
    port: 4445 /* <- TODO: Unhardcode (all ports) */,
    ptpLibrary,
    executionTools: new OpenAiExecutionTools(OPENAI_API_KEY!),
});

/**
 * TODO: Put this as a sample for @ptp/remote
 * TODO: [🃏] Pass here some security token to prevent DDoS
 */
