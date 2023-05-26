import { format } from 'prettier';
import parserHtml from 'prettier/parser-html';
import { string_html } from '../../utils/typeAliases';

/**
 * Prettify the html code
 *
 * @param html raw html code
 * @returns formatted html code
 *
 * @collboard-modules-sdk
 */
export function prettifyHtml(html: string_html): string_html {
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
    });
}

/**
 * TODO: [Optimization][InitialLoading] Optimize this for initial loading
 * TODO: [🐾] Optimize HTML native export
 */
