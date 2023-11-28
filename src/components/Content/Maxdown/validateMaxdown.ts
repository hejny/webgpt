import { string_maxdown } from '../../../utils/typeAliases';

/**
 * Validate maxdown content
 *
 * If content is not a valid maxdown, throws an error
 * If content is a valid maxdown,
 */
export function validateMaxdown(content: unknown): string_maxdown {
    if (typeof content !== 'string') {
        throw new Error('Content is not a string');
    }

    return content as string_maxdown;
}

/**
 * TODO: !! Do here a real validation / sanitization
 * TODO: [🧠][🚓] Is/which combination it better to use asserts/check, validate or is utility function?
 */
