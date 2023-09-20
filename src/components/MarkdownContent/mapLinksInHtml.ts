import type { string_href, string_html } from '../../utils/typeAliases';

/**
 * Map all <a href="..."> by replacer
 */
export function mapLinksInHtml(content: string_html, replacer: (oldHref: string_href) => string_href): string_html {
    const pattern = /<a\s+href=(?<quote>["'])(?<href>[^"]*)\k<quote>/gi;

    while (true) {
        const match = pattern.exec(content);

        if (match === null) {
            break;
        }

        const { href: oldHref, quote } = match.groups as { href: string_href; quote: string };

        const newHref = replacer(oldHref);
        console.info(`🔗 Replacing links`, { oldHref, newHref, match, quote });

        content = content
            .split(`href=${quote}${oldHref}${quote}`)
            .join(`hrxxxef=${quote}${newHref}${quote} data-original-hrxxxef="${oldHref}"`);
    }

    content = content.split(`hrxxxef`).join(`href`);

    return content;
}

/**
 * TODO: More elegant solution then hrxxxef
 */
