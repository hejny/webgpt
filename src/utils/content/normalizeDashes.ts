const EXCLUDED_WORDS = ['H-edu'];

/**
 * Normalize minus as dashes (- U+0014) to propper dashes (– U+2013)
 *
 * @param contentText text with minus as dashes (- U+0014)
 * @returns text with en dashes (– U+2013)
 */
export function normalizeDashes(contentText: string): string {
    let normalizedText = contentText.split(/*/(?<=[a-z]+)\-(?=[a-z]+)/gi*/ '-').join('–');

    for (const word of EXCLUDED_WORDS) {
        normalizedText = normalizedText.split(word.split('-').join('–')).join(word);
    }
    return normalizedText;
}

/**
 * TODO: !! Also change ... to …
 */
