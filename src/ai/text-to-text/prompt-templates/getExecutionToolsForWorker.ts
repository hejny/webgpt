import spaceTrim from 'spacetrim';
import { NEXT_PUBLIC_PTP_SERVER_URL } from '../../../../config';
import { promptDialogue } from '../../../components/Dialogues/dialogues/promptDialogue';
import { isRunningInWebWorker } from '../../../utils/isRunningInWhatever';
import { uuid } from '../../../utils/typeAliases';
import { ExecutionTools } from './lib/src/execution/ExecutionTools';
import { RemoteNaturalExecutionTools } from './lib/src/execution/plugins/natural-execution-tools/remote/RemoteNaturalExecutionTools';
import { JavascriptEvalExecutionTools } from './lib/src/execution/plugins/script-execution-tools/javascript/JavascriptEvalExecutionTools';
import { CallbackInterfaceTools } from './lib/src/execution/plugins/user-interface-execution-tools/callback/CallbackInterfaceTools';

/**
 * Theese are tools for PTP execution
 * Internal cache for getPtpToolsForWorker
 *
 * @private
 * @singleton
 */
let executionTools: ExecutionTools;

/**
 * Get PTP execution tools
 *
 * Note: Tools are cached, so it's safe to call this function multiple times
 * Note: This function is available ONLY in worker
 *
 * @returns ExecutionTools
 */
export function getExecutionToolsForWorker(clientId: uuid): ExecutionTools {
    if (!isRunningInWebWorker()) {
        throw new Error('This function is available ONLY in worker');
    }

    if (!executionTools) {
        executionTools = {
            natural: new RemoteNaturalExecutionTools(NEXT_PUBLIC_PTP_SERVER_URL, clientId),
            script: [new JavascriptEvalExecutionTools(/* <- TODO: !! Change to JavascriptExecutionTools */)],
            userInterface: new CallbackInterfaceTools(async (options) => {
                // TODO: !! Make util promptDialogueRequired
                let answer: null | string = null;

                // TODO: Configure how many retries
                for (let i = 0; i < 3; i++) {
                    answer = await promptDialogue({
                        ...options,
                        prompt: i === 0 ? options.prompt : options.prompt + ` (You need to put answer)`,
                    });

                    if (answer !== null && spaceTrim(answer) !== '') {
                        break;
                    }
                }

                if (answer === null) {
                    throw new Error('User cancelled prompt or provided empty answers');
                }

                return answer;
            }),
        };
    }

    return executionTools;
}

/**
 * TODO: [🧠] Maybe cache every clientId
 */
