import { string_html, string_title } from '../typeAliases';

/**
 * Extract the first heading from HTML using regex
 *
 * @param contentText HTML
 * @returns heading
 */
export function extractTitleFromHtml(contentHtml: string_html): string_title | null {
    const parser = new DOMParser();
    const document = parser.parseFromString(contentHtml, 'text/html');

    for (const headingType of ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']) {
        const headings = Array.from(document.querySelectorAll(headingType));

        if (headings.length === 0) {
            continue;
        }

        return headings.map((heading) => heading.textContent).join('\n');
    }

    return null;
}
