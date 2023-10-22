import { spaceTrim as _spaceTrim } from 'spacetrim';
import { removeQuotes as _removeQuotes } from '../../../../../../../../../utils/content/removeQuotes';
import { unwrapResult as _unwrapResult } from '../../../../../../../../../utils/content/unwrapResult';
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
        const { scriptLanguage, parameters } = options;
        let { script } = options;

        if (scriptLanguage !== 'javascript') {
            throw new Error(
                `Script language ${scriptLanguage} not supported to be executed by JavascriptEvalExecutionTools`,
            );
        }

        // Note: Using direct eval, following variables are in same scope as eval call so they are accessible from inside the evaluated script:
        const spaceTrim = _spaceTrim;
        spaceTrim;
        const removeQuotes = _removeQuotes;
        removeQuotes;
        const unwrapResult = _unwrapResult;
        unwrapResult;

        if (!script.includes('return')) {
            script = `return ${script}`;
        }

        const statementToEvaluate = spaceTrim(
            (block) => `
                ${block(
                    Object.entries(parameters)
                        .map(([key, value]) => `const ${key} = ${JSON.stringify(value)};`)
                        .join('\n'),
                )}
                (()=>{ ${script} })()
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
