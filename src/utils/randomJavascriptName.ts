import { normalizeTo_camelCase } from 'n12';
import { randomString } from './randomString';
import { string_javascript_name } from './typeAliases';

/**
 *
 * Generates a random javascript name like "randomJavascriptName", "randomJavascriptNameAdasjd", "randomJavascriptNameAasfsdff"...
 *
 */
export function randomJavascriptName({
    length,
    prefix,
}: {
    length?: number;
    prefix?: string;
    // TODO: Numbers?: boolean;
}): string_javascript_name {
    return `${prefix || ''}${normalizeTo_camelCase(randomString(length || 7, 'abcdefghijklmnopqrstuvwxyz'), !!prefix)}`;
}
