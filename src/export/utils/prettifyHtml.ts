import { format } from 'prettier';
import parserHtml from 'prettier/parser-html';
import { string_html } from '../../utils/typeAliases';

/**
 * Prettify the html code
 *
 * @param html raw html code
 * @returns formatted html code
 */
export function prettifyHtml(html: string_html): string_html {
    try {
        return format(html, {
            parser: 'html',
            plugins: [parserHtml],

            // TODO: DRY - make some import or auto-copy of .prettierrc
            endOfLine: 'lf',
            tabWidth: 4,
            singleQuote: true,
            trailingComma: 'all',
            arrowParens: 'always',
            printWidth: 120,
            htmlWhitespaceSensitivity: 'ignore',
            jsxBracketSameLine: false,
            bracketSpacing: true,
        });
    } catch (error) {
        console.error('There was an error with prettifying the html, using the original as the fallback', {
            error,
            html,
        });
        return html;
    }
}
