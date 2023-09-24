import { string_template } from '../../../../../../utils/typeAliases';

/**
 * Replaces params in template with values from params object
 *
 * @param template the template with params in {curly} braces
 * @param params the object with params
 * @returns the template with replaced params
 */

export function replaceParams(template: string_template, params: Record<string, string>): string {
    let result = '';
    let openedParamName: string | null = null;

    for (const char of template.split('')) {
        if (char === '{') {
            if (openedParamName !== null) {
                throw new Error(`Param is already opened`);
            }
            openedParamName = '';
        } else if (char === '}') {
            if (openedParamName === null) {
                throw new Error(`Param is not opened`);
            }
            if (params[openedParamName] === undefined) {
                throw new Error(`Param "${openedParamName}" is not defined`);
            }
            result += params[openedParamName];
            openedParamName = null;
        } else if (openedParamName === null) {
            result += char;
        } else if (openedParamName !== null) {
            openedParamName += char;
        }
    }

    if (openedParamName !== null) {
        throw new Error(`Param is not closed`);
    }

    return result;
}
