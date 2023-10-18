import { string_template } from '../../../../../../utils/typeAliases';

/**
 * Replaces params in template with values from params object
 *
 * @param template the template with params in {curly} braces
 * @param params the object with params
 * @returns the template with replaced params
 *
 * @private within the library
 */
export function replaceParams(template: string_template, params: {}): string {
    let result = '';
    let openedParamName: string | null = null;

    // Note: We dont want params with index signature here because it wont be compatible with PromptTemplateParams which has its own reasons to not have index signature
    const paramsChecked = params as Record<string, string>; /* <- TODO: Make here some util validateTemplateParams */

    for (const char of template.split('')) {
        if (char === '{') {
            if (openedParamName !== null) {
                throw new Error(`Parameter is already opened`);
            }
            openedParamName = '';
        } else if (char === '}') {
            if (openedParamName === null) {
                throw new Error(`Parameter is not opened`);
            }
            if (paramsChecked[openedParamName] === undefined) {
                throw new Error(`Parameter {${openedParamName}} is not defined`);
            }
            result += paramsChecked[openedParamName];
            openedParamName = null;
        } else if (openedParamName === null) {
            result += char;
        } else if (openedParamName !== null) {
            openedParamName += char;
        }
    }

    if (openedParamName !== null) {
        throw new Error(`Parameter is not closed`);
    }

    return result;
}

/**
 * TODO: [🧠] More advanced templating
 * TODO: [🧠] Maybe use some template engine / library not own simple implementation
 */
