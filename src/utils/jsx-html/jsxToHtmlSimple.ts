import type { message, string_html } from '../typeAliases';

/**
 * Converts jsx to simple provisional html without using react-dom
 *
 * Note: There are functions:
 *    - **jsxToHtml** uses react-dom to render the jsx to html
 *    - **jsxToHtmlSimple** does not use react-dom to render the jsx to html and it tryes to extract essential information from the jsx
 *    @see ./jsxToHtml.test.tsx vs. ./jsxToHtmlSimple.test.tsx
 *
 * @param element JSX element
 * @returns html string
 */
export function jsxToHtmlSimple(element?: message): string_html {
    if (!element) {
        return '';
    }

    if (typeof element === 'string') {
        return element;
    }

    if (typeof element === 'number') {
        return String(element);
    }

    if (Array.isArray(element)) {
        return element.map((subElement) => jsxToHtmlSimple(subElement as JSX.Element)).join('');
    }

    if (element.props && element.props.children) {
        if (typeof element.type === 'string') {
            return `<${element.type}>${jsxToHtmlSimple(element.props.children)}</${element.type}>`;
        } else {
            return jsxToHtmlSimple(element.props.children);
        }
    }

    if (element.props.alt) {
        return element.props.alt;
    }

    if (element.props && !element.props.children) {
        if (typeof element.type === 'string') {
            // TODO: What behaviour is better to return "<div/>" or "<div></div>"?
            return `<${element.type}/>`;
        } else {
            return '';
        }
    }

    return '';
}

/**
 * TODO: Probably just use ReactDOMServer.renderToStaticMarkup
 */
