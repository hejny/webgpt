import { renderToStaticMarkup } from 'react-dom/server';
import type { string_html, string_xml } from '../typeAliases';

/**
 * Renders jsx to html / xml
 *
 * Note: There are functions:
 *    - **jsxToHtml** uses react-dom to render the jsx to html
 *    - **jsxToHtmlSimple** does not use react-dom to render the jsx to html and it tryes to extract essential information from the js
 *    @see ./jsxToHtml.test.tsx vs. ./jsxToHtmlSimple.test.tsx
 *
 * @param element JSX element
 * @returns html string
 */
export function jsxToHtml(jsx: JSX.Element): string_xml | string_html {
    return renderToStaticMarkup(jsx);
}
