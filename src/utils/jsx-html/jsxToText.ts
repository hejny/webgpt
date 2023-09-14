import { message } from "../typeAliases";


/**
 * Converts jsx to simple provisional text without using react-dom
 *
 * @param element JSX element
 * @returns text string
 *
 * @collboard-modules-sdk
 */
export function jsxToText(element?: message): string {
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
        return element.map((subElement) => jsxToText(subElement as JSX.Element)).join('');
    }

    if (element.props.alt) {
        return element.props.alt;
    }

    if (element.props && element.props.children) {
        return jsxToText(element.props.children);
    }

    return '';
}
