import spaceTrim from 'spacetrim';
import { validateMaxdown } from './validateMaxdown';

/**
 * Use maxdown as a template literal tag function
 *
 * If content is not a valid maxdown, throws an error
 * If content is a valid maxdown:
 * - It will be spaceTrimmed
 */
export function maxdown(strings: TemplateStringsArray, ...values: any[]) {
    const content = strings.reduce((result, string, index) => {
        return result + string + (values[index] ?? '');
    }, '');

    return validateMaxdown(spaceTrim(content));
}
