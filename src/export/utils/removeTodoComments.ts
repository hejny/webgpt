import { string_css, string_html, string_javascript, string_svg } from '../../utils/typeAliases';

/**
 * Remove TODO comments from HTML, CSS or JavaScript
 *
 * @param source with TODO comments
 */
export function removeTodoComments(source: string_html | string_svg | string_css | string_javascript): string {
    // Remove TODO comments from HTML
    source = source.replace(/<!--\s*TODO:.*?-->/gs, '');

    // Remove TODO comments from CSS
    source = source.replace(/\/\*\s*TODO:.*?\*\//gs, '');

    // Remove TODO comments from JavaScript
    source = source.replace(/\/\/\s*TODO:.*?(?=\n|$)/g, '');
    source = source.replace(/\/\*\s*TODO:.*?\*\//gs, '');

    return source;
}
