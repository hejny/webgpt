/**
 * Wraps an SVG string in an HTML document, optionally preserving an XML declaration if present.
 * 
 * @param {string} svg - The SVG string to wrap.
 * @returns {string} An HTML string that wraps the input SVG.
 *
 * @generator https://sharegpt.com/c/7FO5wfz
 */
export function wrapSvgInHtml(svg: string): string {
    /**
     * Determines whether the SVG string includes an XML declaration.
     * @type {boolean}
     */
    const xmlDeclaration = svg.includes('<?xml');

    /**
     * The XML declaration from the SVG string, wrapped in an HTML comment if present.
     * @type {string}
     */
    const xmlComment = xmlDeclaration ? `<!--${(svg.match(/<\?xml.*?\?>/) ?? [''])[0]}-->` : '';

    /**
     * The HTML string that wraps the input SVG.
     * @type {string}
     */
    const html = `
      <html>
        <head>
        </head>
        <body>
          ${xmlComment}
          ${svg.replace(/<\?xml.*?\?>/, '').trim()}
        </body>
      </html>
    `;

    return html;
}
