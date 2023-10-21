import { string_script } from '../../../../../../utils/typeAliases';
import { ScriptLanguage } from '../types/ScriptLanguage';

/**
 * Represents all the tools needed to execute scripts
 *
 * @see https://github.com/webgptorg/ptp#script-execution-tools
 */
export interface ScriptExecutionTools {
    execute(options: ScriptExecutionToolsExecuteOptions): Promise<string>;
}

interface ScriptExecutionToolsExecuteOptions {
    script: string_script;
    scriptLanguage: ScriptLanguage;
    parameters: Record<string, string>;
}

/**
 * !!! Annotate
 */
