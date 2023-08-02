import { string_href, string_html } from '../../utils/typeAliases';

/**
 * Map all <a href="..."> by replacer
 */
export function mapLinksInHtml(content: string_html, replacer: (oldHref: string_href) => string_href): string_html {
    return content.replace(/<a href="([^"]*)">/g, (match, oldHref) => {
        const newHref = replacer(oldHref);

        return `<a href="${newHref}">`;
    });
}


