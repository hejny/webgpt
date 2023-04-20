/**
 * Removes markdown comments from the given string.
 *
 * @param {string} hackingsDocumentFileContent - The string that contains markdown comments.
 * @return {string} - The string with markdown comments removed.
 */
export function removeMarkdownComments(hackingsDocumentFileContent: string) {
    hackingsDocumentFileContent = hackingsDocumentFileContent.split(/\<\!--.*?--\>/gs).join('');
    return hackingsDocumentFileContent;
}
