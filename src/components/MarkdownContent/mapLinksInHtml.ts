import { string_href, string_html } from '../../utils/typeAliases';

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

        const { href } = match.groups as { href: string_href };

        content = content.replace(href, replacer(href));
    }

    return content;
}
