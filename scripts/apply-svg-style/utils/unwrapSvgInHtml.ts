/**
 * Extracts the SVG string from an HTML document wrapped by `wrapSvgInHtml()`.
 *
 * @param {string} html - The HTML string to unwrap.
 * @returns {string} The original SVG string.
 *
 * @generator https://sharegpt.com/c/7FO5wfz
 */
export function unwrapSvgInHtml(html: string): string {
    // Check for XML declaration
    const xmlDeclaration = html.match(/<\?xml.*?\?>/);

    // Extract SVG string from HTML
    const svgMatch = html.match(/<svg.*?>.*?<\/svg>/is);
    if (!svgMatch) {
        throw new Error('No SVG found in HTML string');
    }

    if (!xmlDeclaration) {
        return svgMatch[0];
    } else {
        return xmlDeclaration[0] + '\n' + svgMatch[0];
    }
}
