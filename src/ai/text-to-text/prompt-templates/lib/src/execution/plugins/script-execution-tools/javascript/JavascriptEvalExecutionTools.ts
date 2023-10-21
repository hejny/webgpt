import spaceTrim from 'spacetrim';
import { ScriptExecutionTools, ScriptExecutionToolsExecuteOptions } from '../../../ScriptExecutionTools';

/**
 * ScriptExecutionTools for JavaScript implemented via eval
 *
 * Warning: It is used for testing and mocking
 *          **NOT intended to use in the production** due to its unsafe nature, use `JavascriptExecutionTools` instead.
 */
export class JavascriptEvalExecutionTools implements ScriptExecutionTools {
    /**
     * Executes a JavaScript
     */
    public async execute(options: ScriptExecutionToolsExecuteOptions): Promise<string> {
        const { scriptLanguage, script, parameters } = options;

        if (scriptLanguage !== 'javascript') {
            throw new Error(
                `Script language ${scriptLanguage} not supported to be executed by JavascriptEvalExecutionTools`,
            );
        }
        const statementToEvaluate = spaceTrim(
            (block) => `
                ${block(
                    Object.entries(parameters)
                        .map(([key, value]) => `const ${key} = ${JSON.stringify(value)};`)
                        .join('\n'),
                )})
                (function() { ${script} })()
            `,
        );
        const result = eval(statementToEvaluate);

        if (typeof result !== 'string') {
            throw new Error(`Script must return a string, but returned ${typeof result}`);
        }

        return result;
    }
}

/**
 * TODO: !!! Implement
 * TODO: !!! Put here some predefined functions like removeQuotes, spaceTrim, etc.
 *           + Put it into annotation OR pass into constructor
 */
