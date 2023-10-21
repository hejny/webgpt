import { ScriptExecutionTools, ScriptExecutionToolsExecuteOptions } from '../../../ScriptExecutionTools';

/**
 * ScriptExecutionTools for Python
 * 
 * Warning: This is not implemented yet
 */
export class PythonExecutionTools implements ScriptExecutionTools {

    /**
     * Executes a Python
     */
    public async execute(options: ScriptExecutionToolsExecuteOptions): Promise<string> {
        const { scriptLanguage, script, parameters } = options;

        if (scriptLanguage !== 'python') {
            throw new Error(
                `Script language ${scriptLanguage} not supported to be executed by PythonExecutionTools`,
            );
        }

        throw new Error('Not implemented');
    }
}
