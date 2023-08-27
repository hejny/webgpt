/**
 * Removes quotes from a string
 * Note: This function removes only the same quotes from the beginning and the end of the string
 *
 * @param text optionally quoted text
 * @returns text without quotes
 */
export function removeQuotes(text: string): string {
    if (text.startsWith('"') && text.endsWith('"')) {
        return text.slice(1, -1);
    }

    if (text.startsWith("'") && text.endsWith("'")) {
        return text.slice(1, -1);
    }

    return text;
}

