import { format } from 'prettier';
import parserBabel from 'prettier/parser-babel';
import type { string_javascript } from '../../utils/typeAliases';

/**
 * Prettify the css code
 *
 * @param javascript raw css code
 * @returns formatted css code
 */
export function prettifyJavascript(javascript: string_javascript): string_javascript {
    try {
        return format(javascript, {
            parser: 'babel',
            plugins: [parserBabel],

            // TODO: DRY - make some import or auto-copy of .prettierrc
            endOfLine: 'lf',
            tabWidth: 4,
            singleQuote: true,
            trailingComma: 'all',
            arrowParens: 'always',
            printWidth: 120,
        });
    } catch (error) {
        console.error('There was an error with prettifying the javascript, using the original as the fallback', {
            error,
            javascript,
        });
        return javascript;
    }
}
