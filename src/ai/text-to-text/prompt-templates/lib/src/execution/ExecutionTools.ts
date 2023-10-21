import { NaturalExecutionTools } from './NaturalExecutionTools';
import { ScriptExecutionTools } from './ScriptExecutionTools';
import { UserInterfaceTools } from './UserInterfaceTools';

/**
 * All the tools needed to execute prompts (template pipelines).
 *
 * @see https://github.com/webgptorg/ptp#execution-tools
 */
export interface ExecutionTools {
    /**
     * Tools for executing prompts to large language models like GPT-4
     */
    natural: NaturalExecutionTools;

    /**
     * Tools for executing scripts
     */
    script: ScriptExecutionTools;

    /**
     * Tools for interacting with the user
     */
    userInterface: UserInterfaceTools;
}
