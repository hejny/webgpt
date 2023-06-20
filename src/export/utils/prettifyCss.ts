import { format } from 'prettier';
import parserPostcss from 'prettier/parser-postcss';
import { string_css } from '../../utils/typeAliases';

/**
 * Prettify the css code
 *
 * @param css raw css code
 * @returns formatted css code
 *
 * @collboard-modules-sdk
 */
export function prettifyCss(css: string_css): string_css {
    try {
        return format(css, {
            parser: 'css',
            plugins: [parserPostcss],

            // TODO: DRY - make some import or auto-copy of .prettierrc
            endOfLine: 'lf',
            tabWidth: 4,
            singleQuote: true,
            trailingComma: 'all',
            arrowParens: 'always',
            printWidth: 120,
        });
    } catch (error) {
        console.error('There was an error with prettifying the css, using the original as the fallback', error, css);
        return css;
    }
}

/**
 * TODO: [Optimization][InitialLoading] Optimize this for initial loading
 */
